/* Explicit, session-only development tools. These are not original game rules. */
(function(global){
  'use strict';
  const OFFSET=16384,MAX=1000000000,LOG_LIMIT=50;
  const FIELDS=Object.freeze({cash:'xianjin',overdraft:'touzhi',bankBonus:'jiangjin',taxPercent:'shuilv',diamonds:'zuanshi',stars:'wuxing',charms:'yumao',mines:'dilei'});
  const ITEMS=new Set(['diamonds','stars','charms','mines']);
  function record(value,allowed,label){
    if(!value||typeof value!=='object'||Array.isArray(value)||![Object.prototype,null].includes(Object.getPrototypeOf(value)))throw new Error('Expected plain data: '+label);
    for(const key of Reflect.ownKeys(value)){
      const descriptor=Object.getOwnPropertyDescriptor(value,key);
      if(typeof key!=='string'||!allowed.includes(key)||!descriptor.enumerable||!Object.hasOwn(descriptor,'value'))throw new Error('Unsupported field: '+label+'.'+String(key));
    }
    return value;
  }
  function number(value,min,max,label,integer=false){
    if(typeof value!=='number'||!Number.isFinite(value)||value<min||value>max||(integer&&!Number.isInteger(value)))throw new Error('Invalid '+label+' ('+min+'…'+max+(integer?', integer':'')+')');
    return value;
  }
  // Coordinates and dynamic depths match the original maidi/build/mine scripts.
  function tilePoint(id){
    if(id<=5)return [251+id*50,1];
    if(id<=7)return [551,id*50-249];
    if(id<=11)return [551,id*50-199];
    if(id===12)return [501,401];
    if(id<=15)return [1101-id*50,401];
    if(id<=20)return [1051-id*50,401];
    if(id<=22)return [1,1401-id*50];
    if(id<=26)return [1,1351-id*50];
    if(id<=29)return [id*50-1299,1];
    return [201,1];
  }
  class RichmanSandbox {
    constructor(getGame){
      if(typeof getGame!=='function')throw new TypeError('getGame must be a function');
      this.getGame=getGame;this.game=null;this.modified=false;this.log=[];this.sequence=0;
    }
    current(){
      const game=this.getGame();
      if(game!==this.game){this.game=game;this.modified=false;this.log=[];this.sequence=0;}
      return game;
    }
    reason(game){
      if(!game?.root||game.root.frame!==2)return '仅可在棋盘局中修改 / Board scene only';
      const v=game.root.vars;
      if(![1,2].includes(v.xingqi)||![1,2].includes(v.shui)||v.xingqi!==v.shui)return '请等待移动或事件结束 / Wait for movement or event';
      const popup=game.root.children.get(OFFSET+88);
      if(popup?.alive&&popup.id!==game.data.exports.tt)return '请先完成当前弹窗 / Complete the current dialog';
      // tanchu is deliberately not used: original confirmation leaves it at 1.
      for(const [id]of game.timers)if(id!==v.shijian)return '请等待计时事件结束 / Wait for the timed event';
      for(const clip of game.walk())if(clip.alive&&clip.vars.keyizhuan>0)return '请等待转盘结束 / Wait for the spinner';
      if(!Array.isArray(v.shuyu)||!Array.isArray(v.jibie))return '棋盘状态未就绪 / Board state is not ready';
      return '';
    }
    snapshot(){
      const game=this.current(),root=game?.root,v=root?.vars||{},frame=root?.frame||0,reason=this.reason(game);
      const players=frame===2?[1,2].map(id=>{
        const player={id,name:String(v['name'+id]||''),hospital:Number(v['zhuyuan'+id])||0};
        for(const [field,key]of Object.entries(FIELDS))player[field]=v[key+id];
        return player;
      }):[];
      const properties=frame===2&&Array.isArray(v.shuyu)&&Array.isArray(v.jibie)?Array.from({length:30},(_,i)=>({id:i+1,owner:v.shuyu[i+1],level:v.jibie[i+1]})):[];
      return {frame,players,properties,canEdit:!reason,reason,modified:this.modified,
        log:this.log.map(entry=>({...entry,payload:JSON.parse(JSON.stringify(entry.payload))}))};
    }
    run(action,payload){
      const game=this.current(),reason=this.reason(game);
      if(reason)throw new Error(reason);
      let clean;
      if(action==='player')clean=this.player(game,payload);
      else if(action==='property')clean=this.property(game,payload);
      else throw new Error('Unsupported sandbox action: '+String(action));
      this.modified=true;
      this.log.push({sequence:++this.sequence,time:game.now,action,payload:clean});
      if(this.log.length>LOG_LIMIT)this.log.shift();
      return this.snapshot();
    }
    player(game,payload){
      record(payload,['player','values'],'player');
      const id=number(payload.player,1,2,'player',true),values=record(payload.values,Object.keys(FIELDS),'values'),clean={};
      if(!Object.keys(values).length)throw new Error('No player fields supplied');
      // Validate the complete patch before changing any live values.
      for(const [field,value]of Object.entries(values))clean[field]=number(value,field==='cash'?-MAX:0,field==='taxPercent'?100:MAX,field,ITEMS.has(field));
      for(const [field,value]of Object.entries(clean))game.root.vars[FIELDS[field]+id]=value;
      // Do not invoke bankruptcy checks here: the original scripts keep their
      // original check points, including the strict cash + overdraft < 0 test.
      return {player:id,values:clean};
    }
    property(game,payload){
      record(payload,['id','owner','level'],'property');
      const id=number(payload.id,1,30,'tile',true),owner=number(payload.owner,0,2,'owner',true),level=number(payload.level,0,4,'level',true);
      if(owner===0&&level!==0)throw new Error('Unowned land must have level 0');
      const root=game.root,v=root.vars,[x,y]=tilePoint(id),avatar=owner?v['ppp'+owner]:null,building=level===4?'lei':level?'f'+level:null;
      // Preflight all assets before replacing any existing display object.
      const required=[];if(owner)required.push(avatar);if(building)required.push(building);
      for(const link of required)if(typeof link!=='string'||!Object.hasOwn(game.data.exports,link)||!game.data.definitions[game.data.exports[link]])throw new Error('Missing sandbox display asset: '+String(link));
      root.remove(OFFSET+id);root.remove(OFFSET+50+id);
      if(owner)root.attach(avatar,avatar,id,{_x:x,_y:y,_alpha:20});
      if(building)root.attach(building,building,50+id,{_x:Math.trunc(x/50)*50+(level===4?5:0),_y:Math.trunc(y/50)*50+(level===4?4:0)});
      v.shuyu[id]=owner;v.jibie[id]=level;
      // These six visible statistics must agree with the newly edited board.
      for(const player of [1,2])for(const tier of [1,2,3])v['f'+player+tier]=0;
      for(let tile=1;tile<=30;tile++)if([1,2].includes(v.shuyu[tile])&&[1,2,3].includes(v.jibie[tile]))v['f'+v.shuyu[tile]+v.jibie[tile]]++;
      return {id,owner,level};
    }
  }
  if(typeof module!=='undefined')module.exports={RichmanSandbox};else global.RichmanSandbox=RichmanSandbox;
})(typeof globalThis!=='undefined'?globalThis:this);
