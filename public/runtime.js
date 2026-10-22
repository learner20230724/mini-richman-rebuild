/* Game-specific display/timer/input adapter. No SWF parser or bytecode engine. */
(function(global) {
  const IDENTITY=[1,0,0,1,0,0];
  class Clip {
    constructor(game,id,parent=null,depth=0,name='') {
      this.game=game;this.id=id;this.parent=parent;this.depth=depth;this.name=name;
      this.def=game.data.definitions[id];
      if(!this.def)throw new Error('Missing display definition '+id);
      this.matrix=IDENTITY.slice();this.color=[1,1,1,1,0,0,0,0];
      this.vars=Object.create(null);this.children=new Map();this.named=Object.create(null);
      this.events={};this.frame=0;this.playing=true;this.alive=true;this.visible=true;
      this.birth=game.ticks;this.version=0;
      const self=this;
      this.proxy=new Proxy(Object.create(null),{
        has(_t,key){return key!=='__scope';},
        get(_t,key){if(key===Symbol.unscopables)return undefined;return self.get(key);},
        set(_t,key,value){self.set(key,value);return true;}
      });
    }
    get(key) {
      if(key==='_root')return this.game.root.proxy;
      if(key==='_parent')return this.parent?.proxy;
      if(key==='_x')return this.matrix[4];if(key==='_y')return this.matrix[5];
      if(key==='_visible')return this.visible;
      if(key==='_alpha')return this.color[3]*100;
      if(key==='_rotation')return Math.atan2(this.matrix[1],this.matrix[0])*180/Math.PI;
      if(key==='_width'||key==='_height')return this.boundsSize(key==='_width'?0:1);
      if(key==='_currentframe')return this.frame;
      if(key==='_totalframes')return this.def.frames?.length||1;
      if(key==='stop')return ()=>{this.playing=false;};
      if(key==='play')return ()=>{this.playing=true;};
      if(key==='gotoAndPlay')return f=>{this.playing=true;this.goto(f);};
      if(key==='gotoAndStop')return f=>{this.playing=false;this.goto(f);};
      if(key==='attachMovie')return (link,name,depth,init)=>this.attach(link,name,depth,init);
      if(Object.hasOwn(this.vars,key))return this.vars[key];
      if(this.named[key]?.alive)return this.named[key].proxy;
      if(Object.hasOwn(this.game.builtins,key))return this.game.builtins[key];
      return this.parent?.get(key);
    }
    set(key,value) {
      if(key==='_x'){this.matrix[4]=Number(value);return;}
      if(key==='_y'){this.matrix[5]=Number(value);return;}
      if(key==='_visible'){this.visible=!!value;return;}
      if(key==='_alpha'){this.color[3]=Number(value)/100;return;}
      if(key==='_rotation'){
        const r=Number(value)*Math.PI/180,sx=Math.hypot(this.matrix[0],this.matrix[1]),sy=Math.hypot(this.matrix[2],this.matrix[3]);
        this.matrix[0]=Math.cos(r)*sx;this.matrix[1]=Math.sin(r)*sx;
        this.matrix[2]=-Math.sin(r)*sy;this.matrix[3]=Math.cos(r)*sy;return;
      }
      if(key==='_width'||key==='_height'){
        const axis=key==='_width'?0:1,old=this.boundsSize(axis),factor=old?Number(value)/old:1;
        if(axis===0){this.matrix[0]*=factor;this.matrix[2]*=factor;}
        else{this.matrix[1]*=factor;this.matrix[3]*=factor;}return;
      }
      this.vars[key]=value;
    }
    localBounds() {
      if(this.def.bounds)return this.def.bounds;
      let xmin=Infinity,ymin=Infinity,xmax=-Infinity,ymax=-Infinity;
      for(const child of this.children.values()){
        const b=child.localBounds(),m=child.matrix;
        for(const [x,y]of [[b[0],b[1]],[b[0],b[3]],[b[2],b[1]],[b[2],b[3]]]){
          const xx=m[0]*x+m[2]*y+m[4],yy=m[1]*x+m[3]*y+m[5];
          xmin=Math.min(xmin,xx);ymin=Math.min(ymin,yy);xmax=Math.max(xmax,xx);ymax=Math.max(ymax,yy);
        }
      }
      return xmin===Infinity?[0,0,0,0]:[xmin,ymin,xmax,ymax];
    }
    boundsSize(axis){const b=this.localBounds(),m=this.matrix;return axis===0?Math.abs(m[0])*(b[2]-b[0])+Math.abs(m[2])*(b[3]-b[1]):Math.abs(m[1])*(b[2]-b[0])+Math.abs(m[3])*(b[3]-b[1]);}
    remove(depth){const child=this.children.get(depth);if(!child)return;child.destroy();this.children.delete(depth);if(this.named[child.name]===child)delete this.named[child.name];}
    destroy(){this.alive=false;for(const c of this.children.values())c.destroy();}
    attach(link,name,depth,init={}) {
      const id=this.game.data.exports[link];
      if(id===undefined)throw new Error('Unknown exported movie '+link);
      const slot=16384+Number(depth);this.remove(slot);
      const child=new Clip(this.game,id,this,slot,name);
      this.children.set(slot,child);if(name)this.named[name]=child;
      for(const [key,value]of Object.entries(init))if(key!=='_width'&&key!=='_height')child.set(key,value);
      child.initialize();
      // AVM1 initializer dimensions act on the constructed symbol's bounds,
      // not the still-empty display list of a newly allocated sprite.
      for(const key of ['_width','_height'])if(Object.hasOwn(init,key))child.set(key,init[key]);
      return child.proxy;
    }
    initialize(){if(this.def.kind==='sprite')this.goto(1);else if(this.def.kind==='edit'){
      const variable=this.def.variable;if(variable&&this.parent.get(variable)===undefined)this.parent.vars[variable]=this.def.initial;
    }}
    goto(frame) {
      if(this.def.kind!=='sprite')return;
      const n=Math.max(1,Math.min(this.def.frames.length,Math.trunc(Number(frame))||1));
      if(n===this.frame)return;
      this.version++;
      // Reconstruct timeline depths, retaining matching instances and preserving
      // independent dynamic attachMovie depths. Never run skipped frame scripts.
      const display=new Map();
      for(let i=0;i<n;i++)for(const command of this.def.frames[i]){
        if(command.op==='remove')display.delete(command.depth);
        if(command.op==='place'){
          const old=display.get(command.depth);
          display.set(command.depth,{...(command.move?old:{}),...command});
        }
      }
      for(const [depth,child]of this.children)if(depth<16384&&!display.has(depth))this.remove(depth);
      const newChildren=[];
      for(const [depth,c]of display){
        let child=this.children.get(depth);
        // A non-move placement after the current frame is a fresh instance even
        // if it happens to have the same symbol ID at that depth.
        let replaced=false;
        if(n>this.frame)for(let f=this.frame;f<n;f++)for(const cmd of this.def.frames[f])if(cmd.op==='place'&&cmd.depth===depth&&!cmd.move)replaced=true;
        if(!child||child.id!==c.id||replaced){
          this.remove(depth);child=new Clip(this.game,c.id,this,depth,c.name||'');this.children.set(depth,child);newChildren.push(child);
        }
        // Only fields explicitly modified on the traversed timeline overwrite
        // script-owned transforms. Unchanged placements must not snap back.
        const fields=new Set();
        const start=n>this.frame?this.frame:0;
        for(let f=start;f<n;f++)for(const cmd of this.def.frames[f])if(cmd.op==='place'&&cmd.depth===depth)for(const k of Object.keys(cmd))fields.add(k);
        const fresh=newChildren.includes(child);
        if(c.matrix&&(fresh||fields.has('matrix')))child.matrix=c.matrix.slice();
        if(c.color&&(fresh||fields.has('color')))child.color=c.color.slice();
        if(c.events)child.events=c.events;
        if(c.configurationText)child.configurationText=c.configurationText;
        if(c.name){child.name=c.name;this.named[c.name]=child;}
        if(c.clipDepth)child.clipDepth=c.clipDepth;
      }
      this.frame=n;
      // Construct all siblings before running child frame actions and parent
      // actions, so scripts can address named objects placed later in the frame.
      for(const child of newChildren)child.initialize();
      const version=this.version;
      for(const c of this.def.frames[n-1])if(c.op==='script'){
        this.game.run(c.id,this);
        if(this.version!==version)break;
      }
    }
  }
  class RichmanGame {
    constructor(data,scripts,options={}) {
      this.data=data;this.scripts=scripts;this.now=0;this.ticks=0;this.key=0;
      this.timers=new Map();this.nextTimer=1;this.errors=[];this.executed=new Set();
      this.soundCalls=[];this.options=options;this.seed=(options.seed??Math.floor(Math.random()*4294967296))>>>0;
      if(this.seed===0)this.seed=0x1758;
      this.randomQueue=[];
      const game=this;
      this.builtins={
        _config:options.settings,
        _invoke:(object,method,...args)=>{const fn=object?.[method];return typeof fn==='function'?fn.apply(object,args):undefined;},
        Array,NaN,Infinity,undefined,Math,
        int:v=>Math.trunc(Number(v))||0,
        random:n=>{n=Number(n);if(!(n>0))return 0;const value=this.randomQueue.length?this.randomQueue.shift():this.rng();return Math.floor(value*n);},
        Key:{getCode:()=>this.key},
        setInterval:(fn,ms)=>{if(typeof fn!=='function')throw new TypeError('Interval callback is not a function');const id=this.nextTimer++;this.timers.set(id,{fn,ms:Number(ms),next:this.now+Number(ms)});return id;},
        clearInterval:id=>this.timers.delete(id),
        Sound:class {attachSound(name){this.name=name;}start(offset=0,loops=1){game.soundCalls.push({name:this.name,offset,loops,time:game.now,available:false});if(game.soundCalls.length>256)game.soundCalls.shift();}stop(){}}
      };
      this.root=new Clip(this,0);
      this.root.initialize();
    }
    rng(){let x=this.seed;x^=x<<13;x^=x>>>17;x^=x<<5;this.seed=x>>>0;return this.seed/4294967296;}
    run(id,clip){
      this.executed.add(id);
      try{this.scripts[id].call(clip.proxy,clip.proxy);
        if(clip===this.root&&id===this.options.settings?.defaults.initializationScript)this.options.settings.initialized(this);
        this.options.settings?.afterScript(this,id,clip);
        this.options.extensions?.afterScript?.(this,clip.proxy,id);
      }catch(error){
        this.errors.push({id,clip:clip.id,frame:clip.frame,time:this.now,message:String(error.stack||error)});
        this.options.onError?.(error,this.errors.at(-1));throw error;
      }
    }
    walk(clip=this.root,out=[]){out.push(clip);for(const c of [...clip.children.values()].sort((a,b)=>a.depth-b.depth))this.walk(c,out);return out;}
    keyDown(code){this.key=code;const targets=this.walk();for(const clip of targets)if(clip.alive&&clip.events.keyDown!==undefined)this.run(clip.events.keyDown,clip);}
    step(ms=20) {
      const end=this.now+ms;
      while(this.now+20<=end){
        this.options.extensions?.beforeStep?.(this);
        this.now+=20;this.ticks++;
        const targets=this.walk();
        for(const clip of targets)if(clip.alive&&clip.events.enterFrame!==undefined)this.run(clip.events.enterFrame,clip);
        for(const clip of targets)if(clip.alive&&clip.playing&&clip.def.kind==='sprite'&&clip.birth<this.ticks&&clip.def.frames.length>1){
          const next=clip.frame%clip.def.frames.length+1;clip.goto(next);
        }
        for(const [id,t]of [...this.timers])if(this.timers.has(id)&&t.next<=this.now){t.next+=t.ms;t.fn();}
      }
    }
    snapshot(){const v=this.root.vars;return {frame:this.root.frame,time:this.now,vars:JSON.parse(JSON.stringify(v,(_k,x)=>typeof x==='function'?undefined:x)),
      positions:[this.root.named.renwu1,this.root.named.renwu2].map(c=>c?c.matrix.slice(4):null),
      scripts:[...this.executed].sort((a,b)=>a-b),errors:this.errors.slice()};}
  }
  if(typeof module!=='undefined')module.exports={RichmanGame,Clip};else global.RichmanGame=RichmanGame;
})(typeof globalThis!=='undefined'?globalThis:this);
