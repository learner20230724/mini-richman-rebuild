const {test,after}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {RichmanGame}=require('../public/runtime.js'),Settings=require('../public/settings.js');
const data=require('../public/game-data.json'),scripts=require('../public/generated-game.js'),defaults=require('../public/config/defaults.js');
const observed=[];
function game(p1='b6',p2='b1',overrides={}){
  const g=new RichmanGame(data,scripts,{seed:0x1758,settings:new Settings(defaults,overrides)});
  observed.push(g);
  // Explicit fixture: initialize a chosen pair without replaying the menu.
  g.root.vars.ppp1=p1;g.root.vars.ppp2=p2;g.root.proxy.gotoAndPlay(2);return g;
}
function roll(g,p,face=1){g.randomQueue=[(face-0.5)/6];g.keyDown(p===1?87:38);g.step(face*700);}
function land(g,opts={}){
  const p=opts.p||1,r=g.root;
  r.vars.shui=p;r.vars.xingqi=p;r.vars.pp=p+'P';
  r.named['renwu'+p].proxy._x=254;r.named['renwu'+p].proxy._y=1;
  if(opts.owner!==undefined)r.vars.shuyu[1]=opts.owner;
  if(opts.level!==undefined)r.vars.jibie[1]=opts.level;
  roll(g,p);return r.vars;
}
test('real menu input, exclusive choices, two-second transition and stopped gameplay frame',()=>{
  const g=new RichmanGame(data,scripts,{settings:new Settings(defaults)});
  observed.push(g);
  assert.equal(g.root.named.p1.proxy._x,50);assert.equal(g.root.named.p2.proxy._x,120);
  g.keyDown(68);assert.equal(g.root.named.p1.proxy._x,190); // skips P2
  g.keyDown(87);g.keyDown(38);g.step(1900);assert.equal(g.root.frame,1);
  g.step(100);assert.equal(g.root.frame,2);assert.equal(g.root.vars.name1,'丽丽');
  g.step(2000);assert.equal(g.root.frame,2);assert.equal(g.root.vars.name2,'忍者');
});
for(const p of [1,2])for(let id=1;id<=30;id++)test(`original whole-band purchase P${p}, tile ${id}`,()=>{
  const g=game(),r=g.root,v=r.vars;v.shui=p;v.xingqi=0;v.weizhi=id;v['xianjin'+p]=10000;v['zuanshi'+p]=10;
  r.proxy.attachMovie('maidi','maidi',88,{_x:340,_y:180});g.keyDown(p===1?87:38);
  assert.equal(v['xianjin'+p],10000-defaults.properties[id].cash);
  assert.equal(v['zuanshi'+p],10-defaults.properties[id].diamonds);
  const bands=[[1,5],[6,7],[8,11],[12,12],[13,15],[16,20],[21,22],[23,26],[27,29],[30,30]];
  const [lo,hi]=bands.find(([lo,hi])=>id>=lo&&id<=hi);
  for(let i=1;i<=30;i++)assert.equal(v.shuyu[i],i>=lo&&i<=hi?p:0);
});
function dialog(g,name,p=1){const r=g.root;r.vars.shui=p;r.vars.xingqi=0;r.vars.pp=p+'P';r.proxy.attachMovie(name,name,88,{_x:340,_y:180});return r.named[name];}
for(const p of [1,2])for(const [index,item,cost,payout]of [[0,'zuanshi',200,2000],[1,'wuxing',100,1000],[2,'yumao',200,2000],[3,'dilei',300,3000]]){
  for(const redeem of [false,true])test(`shop ${redeem?'redeem':'buy'} ${item}, P${p}`,()=>{
    const g=game(),v=g.root.vars;v[item+p]=redeem?5:0;const cash=v['xianjin'+p],shop=dialog(g,'chaoshi',p);
    for(let i=0;i<index;i++)g.keyDown(p===1?68:39);
    assert.equal(shop.named.kuang.proxy._x,index*50);g.keyDown(p===1?87:38);
    assert.equal(v[item+p],redeem?0:1);assert.equal(v['xianjin'+p],cash+(redeem?payout:-cost));assert.equal(v.shui,3-p);
  });
}
for(const p of [1,2])test('mine planting and charm protection P'+p,()=>{
  const g=game(),v=g.root.vars;v['xianjin'+p]=100;v['dilei'+p]=1;
  land(g,{p,owner:p,level:0});g.keyDown(p===1?87:38);assert.equal(v.jibie[1],4);assert.equal(v['dilei'+p],0);
  const opponent=3-p;v['yumao'+opponent]=1;land(g,{p:opponent});assert.equal(g.root.named.baohulei.alive,true);
  g.keyDown(opponent===1?87:38);assert.equal(v['yumao'+opponent],0);assert.equal(v['zhuyuan'+opponent],0);assert.equal(v.jibie[1],4);
});
for(const p of [1,2])test('unprotected mine sends P'+p+' to hospital',()=>{
  const g=game('b1','b2'),v=g.root.vars;g.randomQueue=[0,0];
  land(g,{p,owner:3-p,level:4});assert.ok(v['zhuyuan'+p]>=3);assert.equal(v.jibie[1],0);
  assert.ok(g.root.named['renwu'+p].proxy._y>400);
});
for(const p of [1,2])test('charm avoids house rent P'+p,()=>{
  const g=game(),v=g.root.vars;v['yumao'+p]=1;const cash=v['xianjin'+p];land(g,{p,owner:3-p,level:1});
  assert.equal(g.root.named.baohu.alive,true);g.keyDown(p===1?87:38);assert.equal(v['yumao'+p],0);assert.equal(v['xianjin'+p],cash);
});
for(const p of [1,2])for(const name of ['ducheng1','ducheng2'])test(`casino real stake + controlled spin, ${name}, P${p}`,()=>{
  const g=game(),v=g.root.vars;const cash=v['xianjin'+p],casino=dialog(g,name,p);
  if(name==='ducheng1')g.keyDown(p===1?68:39); // odd/even choice: odd-winning placement for controlled result 6
  g.keyDown(p===1?87:38);assert.equal(v['xianjin'+p],cash-100);assert.equal(casino.vars.keyizhuan,1);
  g.randomQueue=Array(12).fill(name==='ducheng1'?10.5/30:10.5/50);g.step(240);
  assert.equal(casino.vars.keyizhuan,0);assert.equal(v['xianjin'+p],cash-100+(name==='ducheng1'?200:600));assert.equal(v.shui,3-p);
});
for(const p of [1,2])test('villa roulette charges taxed rent P'+p,()=>{
  const g=game('b1','b2'),v=g.root.vars,cash=v['xianjin'+p];land(g,{p,owner:3-p,level:3});
  assert.equal(g.root.named.lunzi.alive,true);g.randomQueue=Array(8).fill(10.5/30);g.step(160);
  assert.equal(v['xianjin'+p],cash-100);assert.equal(v.shui,3-p);
});
for(const p of [1,2])for(let outcome=0;outcome<15;outcome++)test(`fortune source branch ${outcome}, P${p}`,()=>{
  const g=game(),v=g.root.vars;g.root.named['renwu'+p].proxy._x=4;g.root.named['renwu'+p].proxy._y=251;
  const cash=v['xianjin'+p];dialog(g,'mingyun',p);g.randomQueue=[(outcome+0.5)/15];g.step(6000);
  assert.equal(g.root.named.mingyun.vars.aa,outcome);assert.equal(g.root.named.mingyun.playing,false);assert.equal(v.shui,3-p);assert.equal(g.errors.length,0);
  if(outcome===5)assert.equal(v['xianjin'+p],cash+300);
  if(outcome===11)for(const field of ['wuxing','zuanshi','yumao','dilei'])assert.equal(v[field+p],0);
  if(outcome===14)assert.equal(v['zhuyuan'+p],3);
});
test('original 0/1/2 sound controls and bounded missing-sound diagnostics',()=>{
  const g=game();g.keyDown(48);g.keyDown(49);g.keyDown(50);assert.equal(g.soundCalls.at(-1).name,'bei3');assert.equal(data.missingSounds,true);
});
test('casino choice dialog and cancel use original keyboard handlers',()=>{
  const g=game();dialog(g,'ducheng');g.keyDown(68);g.keyDown(87);assert.equal(g.root.named.ducheng2.alive,true);
  dialog(g,'ducheng');g.keyDown(83);assert.equal(g.root.vars.shui,2);
});
test('explosion completion and winner parade execute their frame callbacks',()=>{
  const g=game();dialog(g,'baozha');g.step(440);assert.equal(g.root.named.baozha.playing,false);
  g.root.vars.xianjin1=-10000;g.root.proxy.gotoAndPlay(3);g.step(40);assert.equal(g.root.frame,3);
  const winner=g.root.named[g.root.vars.ppp2];assert.ok(Math.abs(winner.proxy._width-160)<1e-8);assert.ok(Math.abs(winner.proxy._height-160)<1e-8);
});
after(()=>{
  const exercised=[...new Set(observed.flatMap(g=>[...g.executed]))].sort((a,b)=>a-b);
  const report={sourceSHA256:data.sourceSHA256,scriptCount:scripts.length,exercisedScripts:exercised,
    missingScripts:scripts.map((_,i)=>i).filter(i=>!exercised.includes(i)),
    scope:'Controlled source-based fixtures plus a real-menu keyboard test; not independent original-runtime differential parity or natural complete-game proof.',
    errors:observed.flatMap(g=>g.errors)};
  fs.mkdirSync(path.join(__dirname,'../output'),{recursive:true});fs.writeFileSync(path.join(__dirname,'../output/controlled-coverage.json'),JSON.stringify(report,null,2));
});
for(const [id,c]of Object.entries(defaults.characters))test('source default character '+id,()=>{
  const g=game(id,id==='b1'?'b2':'b1'),v=g.root.vars;
  for(const [field,variable]of Object.entries({cash:'xianjin',overdraft:'touzhi',bankBonus:'jiangjin',taxPercent:'shuilv',diamonds:'zuanshi',stars:'wuxing',charms:'yumao',mines:'dilei'}))assert.equal(v[variable+'1'],c[field]);
});
test('all 30 source property prices initialize',()=>{
  const g=game();for(const [id,p]of Object.entries(defaults.properties)){assert.equal(g.root.vars.xianjin[id],p.cash);assert.equal(g.root.vars.zuanshi[id],p.diamonds);}
});
for(const p of [1,2])test('P'+p+' real dice, property purchase and turn handoff',()=>{
  const g=game('b6','b6'),v=land(g,{p});
  assert.equal(v.tanchu,1);assert.equal(v.weizhi,1);
  const cash=v['xianjin'+p],diamonds=v['zuanshi'+p];
  g.keyDown(p===1?87:38);
  assert.equal(v.shuyu[1],p);assert.equal(v['xianjin'+p],cash-400);assert.equal(v['zuanshi'+p],diamonds-3);
  assert.equal(v.shui,3-p);assert.equal(g.errors.length,0);
});
test('unaffordable land does not open a purchase dialog',()=>{
  const g=game('b1','b2'),v=land(g);assert.equal(v.tanchu,0);assert.equal(v.shuyu[1],0);assert.equal(v.shui,2);
});
test('build house then spend upgrade stars without altering original levels',()=>{
  const g=game(),v=land(g,{owner:1});const cash=v.xianjin1;
  g.keyDown(87);assert.equal(v.jibie[1],1);assert.equal(v.xianjin1,cash-200);assert.equal(v.f11,1);
  land(g,{owner:1,level:1});const stars=v.wuxing1;g.keyDown(87);
  assert.equal(v.jibie[1],2);assert.equal(v.wuxing1,stars-1);assert.equal(v.f11,0);assert.equal(v.f12,1);
  land(g,{owner:1,level:2});g.keyDown(87);assert.equal(v.jibie[1],3);assert.equal(v.f12,0);assert.equal(v.f13,1);
});
for(const [level,rent]of [[1,100],[2,200]])test('taxed rent level '+level,()=>{
  const g=game('b1','b2'),v=g.root.vars,cash1=v.xianjin1,cash2=v.xianjin2;
  land(g,{owner:2,level});assert.equal(v.xianjin1,cash1-rent);assert.equal(v.xianjin2,cash2+rent*0.7);
});
test('bank bonus occurs on crossing, not on every turn',()=>{
  const g=game('b1','b2'),r=g.root,v=r.vars;
  r.named.renwu1.proxy._x=201;r.named.renwu1.proxy._y=5;
  roll(g,1);assert.equal(v.xianjin1,6200);assert.equal(v.weizhi,0);
});
test('rent bankruptcy reaches winner scene',()=>{
  const g=game('b1','b2'),v=g.root.vars;v.xianjin1=-250;
  land(g,{owner:2,level:1});assert.equal(g.root.frame,3);assert.equal(v.jieguo,'胜利者是忍者');
});
test('character and property overrides affect real payment',()=>{
  const g=game('b6','b1',{characters:{b6:{cash:9999}},properties:{'1':{cash:37,diamonds:0}}}),v=land(g);
  assert.equal(v.xianjin1,9999);assert.equal(v.wenben,'买地：37元，0钻石？');g.keyDown(87);assert.equal(v.xianjin1,9962);assert.equal(v.zuanshi1,3);
});
test('named houseCost override affects both affordability and actual debit',()=>{
  const g=game('b6','b1',{numbers:{'rules.houseCash':321}}),v=g.root.vars;v.xianjin1=320;
  land(g,{owner:1}); // original mine fallback is allowed; there must not be a house offer
  assert.notEqual(g.root.named.jianfang?.alive,true);
  v.xianjin1=500;land(g,{owner:1});g.keyDown(87);assert.equal(v.xianjin1,179);assert.equal(v.jibie[1],1);
});
test('invalid or unknown configuration is rejected',()=>{
  assert.throws(()=>new Settings(defaults,{numbers:{'rules.noSuchParameter':1}}));
  assert.throws(()=>new Settings(defaults,{numbers:{'rules.stepMilliseconds':0}}));
  assert.throws(()=>new Settings(defaults,{characters:{b0:{cash:1}}}));
});
test('named upgrade-star setting controls gate and consumption',()=>{
  const g=game('b6','b1',{numbers:{'rules.upgradeStars':2}}),v=land(g,{owner:1,level:1});
  g.keyDown(87);assert.equal(v.jibie[1],2);assert.equal(v.wuxing1,1);
  land(g,{owner:1,level:2});assert.equal(v.tanchu,0);assert.equal(v.jibie[1],2);
});
test('named shop price setting controls affordability and actual debit',()=>{
  const g=game('b6','b1',{numbers:{'rules.shopDiamondCash':321}}),v=g.root.vars;v.xianjin1=320;dialog(g,'chaoshi');g.keyDown(87);
  assert.equal(v.xianjin1,320);assert.equal(g.root.named.chaoshi.named.kuang.vars.h,1);
  v.xianjin1=500;g.keyDown(87);assert.equal(v.xianjin1,179);assert.equal(v.zuanshi1,4);
});
