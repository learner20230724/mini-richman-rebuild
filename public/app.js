(async function(){
  const canvas=document.getElementById('game'),ctx=canvas.getContext('2d'),assets=new Map();
  let game,clock;
  const warnings=[];
  const fail=error=>{const panel=document.getElementById('error');panel.style.display='block';panel.textContent='运行错误 / Runtime error\n'+error.stack;};
  try{
    await Promise.all(Object.entries(RichmanData.definitions).filter(([,d])=>d.kind==='asset').map(async([id,d])=>{
      const svg=RichmanAssetData.svg[id].replace(/__RICHMAN_BITMAP_([0-9a-f]+)__/g,(_m,hash)=>RichmanAssetData.bitmaps[hash]);
      const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));
      const img=new Image();try{await new Promise((ok,no)=>{img.onload=ok;img.onerror=()=>no(new Error('Cannot load '+d.url));img.src=url;});assets.set(Number(id),img);}finally{URL.revokeObjectURL(url);}
    }));
    await Promise.all(Object.entries(RichmanData.fonts).map(async([id,url])=>{
      const face=new FontFace('RichmanFont'+id,`url("${RichmanAssetData.fonts[id]||url}")`);await face.load();document.fonts.add(face);
    }));
    let storage;
    try{storage=window.localStorage;}catch{warnings.push('浏览器存储不可用；本次配置仍可使用，建议导出 JSON。');}
    const store=new RichmanConfigStore(RichmanDefaults,{fileBase:RichmanOverrides,storage,onWarning:message=>warnings.push(String(message))});
    function createGame(config){
      const candidate=new RichmanGame(RichmanData,RichmanScripts,{onError:fail,settings:new RichmanSettings(RichmanDefaults,config),extensions:RichmanExtensions});
      RichmanExtensions.onReady?.(candidate);return candidate;
    }
    game=createGame(store.active);
    // Explicit development APIs, not a substitute for real UI verification.
    window.richman=game;
    let lastLiveResult=null;
    const live=new RichmanLiveSettings(RichmanDefaults,{onApplied:({game:target,config,result})=>{
      if(target!==game)return;store.setActive(config);lastLiveResult=result;
      window.richmanEditor?.refreshState();
    }});
    function step(ms){live.flush(game);game.step(ms);live.flush(game);}
    clock=new RichmanClock(step);
    const sandbox=new RichmanSandbox(()=>game);
    const adapter={
      store,defaults:RichmanDefaults,getGame:()=>game,
      getSpeed:()=>clock.speed,
      setSpeed:value=>{clock.setSpeed(value,performance.now());return clock.speed;},
      stepOnce:()=>{if(document.hidden)throw new Error('页面隐藏时不能单步');if(clock.speed!==0)throw new Error('请先将速度设为 0 或点击暂停，再单步');step(20);render();},
      apply:config=>{
        const candidate=createGame(config);
        live.cancel();store.replace(config);store.apply();game=candidate;window.richman=game;lastLiveResult=null;
        sandbox.reset?.();clock.reset(performance.now());render();return true;
      },
      applyLive:config=>{
        const result=live.apply(game,config);store.replace(config);lastLiveResult=result;render();return result;
      },
      cancelPending:()=>{live.cancel();lastLiveResult=null;},
      previewLive:config=>live.preview(game,config),
      sandbox:(action,payload)=>{const result=sandbox.run(action,payload);render();return result;},
      getStatus:()=>({...sandbox.snapshot(),turn:game.root.vars.shui,simulationTime:game.now,speed:clock.speed,paused:clock.speed===0||document.hidden,editorPaused:false,warnings:[...warnings],liveSettings:{pending:!!live.pending,reason:live.pending?.reason||'',lastResult:lastLiveResult,request:live.pending}})
    };
    window.richmanControls=adapter;
    function draw(clip){
      if(!clip.alive||!clip.visible)return;
      ctx.save();ctx.transform(...clip.matrix);ctx.globalAlpha*=clip.color[3];
      if(clip.def.kind==='asset'){
        const d=clip.def,b=d.bounds,binding=clip.configurationText;
        let override=binding?.character?game.options.settings.overrides.characters?.[binding.character]?.[binding.field]:undefined;
        if(binding?.properties&&binding.properties.some(id=>game.options.settings.overrides.properties?.[id]?.cash!==undefined)){
          const prices=binding.properties.map(id=>game.options.settings.overrides.properties?.[id]?.cash??game.options.settings.defaults.properties[id].cash),lo=Math.min(...prices),hi=Math.max(...prices);override=lo===hi?lo:lo+'–'+hi;
        }
        if(override!==undefined){
          const style=d.textStyle;ctx.fillStyle=style.color;ctx.font=`${style.size}px "RichmanFont${style.font}", KaiTi, SimKai, serif`;ctx.textBaseline='top';ctx.textAlign='center';ctx.fillText(String(override)+(binding.suffix||''),(b[0]+b[2])/2,b[1],binding.properties?95:65);
        }else ctx.drawImage(assets.get(clip.id),b[0],b[1],d.width,d.height);
      }else if(clip.def.kind==='edit'){
        const d=clip.def,b=d.bounds,value=clip.parent.get(d.variable),text=value===undefined?d.initial:String(value);
        ctx.beginPath();ctx.rect(b[0],b[1],b[2]-b[0],b[3]-b[1]);ctx.clip();
        ctx.fillStyle=d.color;ctx.font=`${d.size}px "RichmanFont${d.font}", KaiTi, SimKai, serif`;
        ctx.textBaseline='top';ctx.textAlign=['left','right','center'][d.align]||'left';
        const x=d.align===2?(b[0]+b[2])/2:d.align===1?b[2]-2:b[0]+2;
        const lines=text.split(/\r\n|\r|\n/);for(let i=0;i<lines.length;i++)ctx.fillText(lines[i],x,b[1]+2+i*(d.size+d.leading));
      }else{
        let maskEnd=null;
        for(const child of [...clip.children.values()].sort((a,b)=>a.depth-b.depth)){
          if(maskEnd!==null&&child.depth>maskEnd){ctx.restore();maskEnd=null;}
          if(child.clipDepth){
            const rect=child.def.maskRect;if(!rect)throw new Error('Unsupported mask '+child.id);
            ctx.save();ctx.save();ctx.transform(...child.matrix);ctx.beginPath();ctx.rect(...rect);ctx.restore();ctx.clip();maskEnd=child.clipDepth;
          }else draw(child);
        }
        if(maskEnd!==null)ctx.restore();
      }
      ctx.restore();
    }
    function render(){const b=canvas.getBoundingClientRect(),dpr=window.devicePixelRatio||1,w=Math.round(b.width*dpr),h=Math.round(b.height*dpr);if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}ctx.setTransform(w/600,0,0,h/450,0,0);ctx.globalAlpha=1;ctx.fillStyle=RichmanData.background;ctx.fillRect(0,0,600,450);draw(game.root);}
    function frame(now){
      try{live.flush(game);clock.frame(now);live.flush(game);if(!document.hidden)render();requestAnimationFrame(frame);}catch(e){fail(e);}
    }
    document.addEventListener('visibilitychange',()=>clock.setHidden(document.hidden,performance.now()));
    clock.setHidden(document.hidden,performance.now());
    window.richmanEditor=new RichmanEditor(adapter);
    window.addEventListener('keydown',event=>{
      if(event.altKey&&event.key==='Enter'){event.preventDefault();if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen();return;}
      if(event.defaultPrevented||event.target?.closest?.('input,textarea,select,button,[contenteditable=\"true\"]'))return;
      if(clock.speed===0||document.hidden)return;
      const codes={a:65,d:68,w:87,s:83,ArrowLeft:37,ArrowRight:39,ArrowUp:38,ArrowDown:40,'0':48,'1':49,'2':50};
      const code=codes[event.key]??codes[event.key.toLowerCase()];if(code){event.preventDefault();if(!event.repeat)try{game.keyDown(code);live.flush(game);render();}catch(e){fail(e);}}
    });
    // The original is keyboard-only. Pointer coordinates are nevertheless mapped
    // to the stage, independent of viewport scale, for future non-generated extensions.
    canvas.addEventListener('pointerdown',event=>{const b=canvas.getBoundingClientRect();game.pointer={x:(event.clientX-b.left)*600/b.width,y:(event.clientY-b.top)*450/b.height};canvas.focus();});
    canvas.focus();render();requestAnimationFrame(frame);
  }catch(e){fail(e);}
})();
