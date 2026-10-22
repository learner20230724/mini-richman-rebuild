/* Natural headless game: keys + time only. No position, money, dice queue or
 * ownership injection. This is not a rendered-browser or Flash differential. */
const {RichmanGame}=require('../public/runtime.js'),Settings=require('../public/settings.js');
const data=require('../public/game-data.json'),scripts=require('../public/generated-game.js'),defaults=require('../public/config/defaults.js');
const fs=require('node:fs'),path=require('node:path');
const results=[];
for(const seed of [0x1758,42,123456]){
  const g=new RichmanGame(data,scripts,{seed,settings:new Settings(defaults)});
  // Real menu selection: P1=b6, P2=b7. The asymmetric key policy invests
  // for P1 and declines investments for P2, to exercise an attainable ending.
  // It does NOT change either player's original stats or force an outcome.
  for(let i=0;i<4;i++)g.keyDown(68);
  for(let i=0;i<4;i++)g.keyDown(39);
  g.keyDown(87);g.keyDown(38);g.step(2000);
  let decisions=0,rolls=0,waits=0,lastRoll=0;const dialogs={};
  try{
    for(let i=0;i<20000&&g.root.frame===2;i++){
      const v=g.root.vars,p=v.shui,key=p===1?87:38;
      if(v.xingqi===1||v.xingqi===2){g.keyDown(v.xingqi===1?87:38);rolls++;lastRoll=g.now;}
      else {
        const popup=g.root.children.get(16384+88),name=popup?.name;
        if(popup?.alive&&['maidi','jianfang','shengji','bieshu','fanglei','baohu','baohulei','ducheng'].includes(name)){
          g.keyDown(name==='ducheng'||(p===2&&!['baohu','baohulei'].includes(name))?(p===1?83:40):key);decisions++;dialogs[name]=(dialogs[name]||0)+1;
        }else if(popup?.alive&&name==='chaoshi'&&popup.named.kuang.vars.h===1){
          // P1 buys diamonds when short, otherwise upgrade stars. P2 leaves.
          if(p===1&&v.zuanshi1>=3)g.keyDown(68);
          g.keyDown(p===1&&v.xianjin1>=200?key:p===1?83:40);
          decisions++;dialogs[name]=(dialogs[name]||0)+1;
        }else if(popup?.alive&&['ducheng1','ducheng2'].includes(name)&&popup.named.dukuang.vars.dong===1){
          g.keyDown(key);decisions++;dialogs[name]=(dialogs[name]||0)+1;
        }else waits++;
      }
      g.step(100);
      if(g.now-lastRoll>180000)throw new Error('No roll for 180 simulated seconds: '+JSON.stringify({vars:g.root.vars,popup:g.root.children.get(16472)?.name}));
    }
    if(g.root.frame!==3)throw new Error('Natural game did not finish within the declared cap');
    results.push({seed,pass:true,winner:g.root.vars.jieguo,elapsedMilliseconds:g.now,rolls,decisions,waits,dialogs,scripts:[...g.executed].sort((a,b)=>a-b)});
  }catch(error){results.push({seed,pass:false,message:String(error.stack||error),rolls,decisions,waits,dialogs,snapshot:g.snapshot()});}
}
fs.mkdirSync(path.join(__dirname,'../output'),{recursive:true});fs.writeFileSync(path.join(__dirname,'../output/natural-journey-v2.json'),JSON.stringify({scope:'Headless reconstructed game, original character stats and key-only asymmetric investing/declining policy; no Flash/rendered-browser differential.',results},null,2));
for(const r of results)console.log(JSON.stringify({seed:r.seed,pass:r.pass,rolls:r.rolls,winner:r.winner,message:r.message?.slice(0,150)}));
if(results.some(r=>!r.pass))process.exitCode=1;
