const {test}=require('node:test'),assert=require('node:assert/strict');
const {RichmanGame}=require('../public/runtime.js'),{RichmanSandbox}=require('../public/sandbox.js'),Settings=require('../public/settings.js');
const data=require('../public/game-data.json'),scripts=require('../public/generated-game.js'),defaults=require('../public/config/defaults.js');
function fresh(){return new RichmanGame(data,scripts,{seed:0x1758,settings:new Settings(defaults)});}
function board(){const g=fresh();g.keyDown(68);g.keyDown(87);g.keyDown(38);g.step(2000);assert.equal(g.root.frame,2);return g;}
function player(s,values,id=1){return s.run('player',{player:id,values});}
test('sandbox starts with unmodified state and detached, read-only snapshots',()=>{
  const g=board(),s=new RichmanSandbox(()=>g),before=g.snapshot(),snap=s.snapshot();
  assert.equal(snap.modified,false);assert.equal(snap.canEdit,true);assert.equal(snap.players.length,2);assert.equal(snap.properties.length,30);
  assert.equal(snap.players[0].name,'丽丽');assert.equal(snap.players[0].hospital,0);
  snap.players[0].cash=999; snap.properties[0].owner=2;assert.deepEqual(g.snapshot(),before);
});
test('sandbox atomically changes every supported player field and leaves turn/position/timers intact',()=>{
  const g=board(),s=new RichmanSandbox(()=>g),v=g.root.vars,position=g.root.named.renwu1.matrix.slice(),turn=v.xingqi,timers=[...g.timers];
  const values={cash:-123.25,overdraft:999,bankBonus:888,taxPercent:12.5,diamonds:7,stars:8,charms:9,mines:10};
  player(s,values);const snap=s.snapshot();
  for(const [key,value]of Object.entries(values))assert.equal(snap.players[0][key],value);
  assert.equal(g.root.frame,2);assert.equal(v.xingqi,turn);assert.deepEqual(g.root.named.renwu1.matrix,position);assert.deepEqual([...g.timers],timers);
  assert.equal(snap.modified,true);assert.equal(snap.log.length,1);snap.log[0].payload.values.cash=42;assert.equal(s.snapshot().log[0].payload.values.cash,-123.25);
});
test('sandbox rejects invalid patches without partially updating cash',()=>{
  const g=board(),s=new RichmanSandbox(()=>g),cash=g.root.vars.xianjin1;
  for(const values of [{cash:123,diamonds:-1},{cash:NaN},{cash:Infinity},{cash:1e9+1},{cash:'1'},{stars:1.5},{taxPercent:101},{overdraft:-1},{hospital:3},{constructor:1},{},{cash:1,unknown:3},JSON.parse('{"__proto__":1}')]){
    assert.throws(()=>player(s,values));assert.equal(g.root.vars.xianjin1,cash);assert.equal(s.modified,false);
  }
  assert.throws(()=>s.run('player',{player:3,values:{cash:1}}));assert.throws(()=>s.run('eval',{code:'anything'}));
  assert.throws(()=>s.run('player',{player:1,values:{cash:1},unknown:1}));
  assert.throws(()=>player(s,Object.defineProperty({},'cash',{enumerable:true,get(){throw new Error('must not run');}})),/Unsupported field/);
});
test('sandbox accepts finite boundary values and nonnegative integer item quantities',()=>{
  const g=board(),s=new RichmanSandbox(()=>g);player(s,{cash:-1e9,overdraft:1e9,bankBonus:0,taxPercent:100,diamonds:1e9,stars:0,charms:0,mines:0},2);
  assert.equal(s.snapshot().players[1].cash,-1e9);assert.equal(s.snapshot().players[1].diamonds,1e9);assert.equal(g.root.frame,2);
});
test('sandbox refuses menu, winner, moving and modal scenes',()=>{
  let g=fresh();const s=new RichmanSandbox(()=>g);assert.equal(s.snapshot().canEdit,false);assert.throws(()=>player(s,{cash:1}));
  g=board();g.randomQueue=[0];g.keyDown(87);assert.equal(s.snapshot().canEdit,false);assert.throws(()=>player(s,{cash:1}));
  g=board();g.root.attach('maidi','maidi',88,{_x:340,_y:180});assert.match(s.snapshot().reason,/弹窗/);assert.throws(()=>s.run('property',{id:1,owner:1,level:0}));
  g=board();g.root.vars.xianjin1=-10000;g.root.proxy.gotoAndStop(3);assert.equal(s.snapshot().canEdit,false);assert.throws(()=>player(s,{cash:1}));
});
test('sandbox requires timer events to finish, but accepts the original stale tanchu flag',()=>{
  const g=board(),s=new RichmanSandbox(()=>g);g.root.vars.tanchu=1;assert.equal(s.snapshot().canEdit,true);
  g.timers.set(999,{fn(){},ms:100,next:g.now+100});assert.equal(s.snapshot().canEdit,false);g.timers.delete(999);
  assert.equal(s.snapshot().canEdit,true);
});
function shop(g,p,index=0){
  const v=g.root.vars;v.shui=p;v.xingqi=0;v.pp=p+'P';
  g.root.attach('chaoshi','chaoshi',88,{_x:340,_y:180});
  for(let i=0;i<index;i++)g.keyDown(p===1?68:39);
  return g.root.named.chaoshi;
}
for(const p of [1,2])for(const [index,item,cost,payout]of [[0,'zuanshi',200,2000],[1,'wuxing',100,1000],[2,'yumao',200,2000],[3,'dilei',300,3000]])for(const redeem of [false,true])test(`sandbox permits settled shop ${redeem?'redemption':'purchase'} P${p}, ${item}, without replaying the transaction`,()=>{
  const g=board(),s=new RichmanSandbox(()=>g),v=g.root.vars;v[item+p]=redeem?5:0;
  const cash=v['xianjin'+p],panel=shop(g,p,index),selector=panel.named.kuang;
  assert.equal(s.snapshot().canEdit,false);g.keyDown(p===1?87:38);
  assert.equal(v['xianjin'+p],cash+(redeem?payout:-cost));assert.equal(v[item+p],redeem?0:1);
  assert.equal(selector.vars.h,0);assert.equal(selector.visible,false);assert.equal(v.shui,3-p);assert.equal(v.xingqi,3-p);
  assert.equal(g.root.children.get(16384+88),panel);assert.equal(s.snapshot().canEdit,true);
  const afterCash=[v.xianjin1,v.xianjin2],afterItems=[v[item+'1'],v[item+'2']];
  // Directly exercise retained panel handlers, without initiating a new board
  // roll first. Neither old nor next player's confirm/cancel reopens the shop.
  for(const code of [87,38,83,40]){g.key=code;g.run(selector.events.keyDown,selector);}
  assert.deepEqual([v.xianjin1,v.xianjin2],afterCash);assert.deepEqual([v[item+'1'],v[item+'2']],afterItems);
  player(s,{bankBonus:777},p);assert.equal(v['jiangjin'+p],777);assert.deepEqual([v.xianjin1,v.xianjin2],afterCash);
});
for(const p of [1,2])test('sandbox keeps unconfirmed, unaffordable and partly closed shop states locked P'+p,()=>{
  const g=board(),s=new RichmanSandbox(()=>g),v=g.root.vars;v['xianjin'+p]=0;v['zuanshi'+p]=0;
  const panel=shop(g,p),selector=panel.named.kuang;assert.equal(s.snapshot().canEdit,false);
  g.keyDown(p===1?87:38);assert.equal(v['xianjin'+p],0);assert.equal(v['zuanshi'+p],0);assert.equal(selector.vars.h,1);assert.equal(selector.visible,true);assert.equal(s.snapshot().canEdit,false);
  // A stable-looking turn flag must not by itself unlock a live selector.
  v.xingqi=v.shui;assert.equal(s.snapshot().canEdit,false);selector.vars.h=0;assert.equal(s.snapshot().canEdit,false);
  selector.vars.h=1;selector.visible=false;assert.equal(s.snapshot().canEdit,false);
  assert.throws(()=>player(s,{cash:99},p));assert.equal(v['xianjin'+p],0);
});
for(const p of [1,2])test('sandbox shop cancel leaves no transaction or stale lock P'+p,()=>{
  const g=board(),s=new RichmanSandbox(()=>g),v=g.root.vars,cash=[v.xianjin1,v.xianjin2],items=[v.zuanshi1,v.zuanshi2];
  const panel=shop(g,p);g.keyDown(p===1?83:40);
  assert.equal(panel.alive,false);assert.equal(g.root.children.get(16384+88).id,data.exports.tt);assert.equal(s.snapshot().canEdit,true);
  assert.deepEqual([v.xianjin1,v.xianjin2],cash);assert.deepEqual([v.zuanshi1,v.zuanshi2],items);
});
test('settled shop never bypasses movement, interval or spinner guards',()=>{
  const g=board(),s=new RichmanSandbox(()=>g),v=g.root.vars;shop(g,1);g.keyDown(87);assert.equal(s.snapshot().canEdit,true);
  v.xingqi=0;assert.equal(s.snapshot().canEdit,false);v.xingqi=v.shui;
  g.timers.set(999,{fn(){},ms:100,next:g.now+100});assert.equal(s.snapshot().canEdit,false);g.timers.delete(999);
  v.keyizhuan=1;assert.equal(s.snapshot().canEdit,false);v.keyizhuan=0;assert.equal(s.snapshot().canEdit,true);
});
const points=[[301,1],[351,1],[401,1],[451,1],[501,1],[551,51],[551,101],[551,201],[551,251],[551,301],[551,351],[501,401],[451,401],[401,401],[351,401],[251,401],[201,401],[151,401],[101,401],[51,401],[1,351],[1,301],[1,201],[1,151],[1,101],[1,51],[51,1],[101,1],[151,1],[201,1]];
for(let id=1;id<=30;id++)test('sandbox property '+id+' synchronizes owner/building/mine display, counters, removal and isolated state',()=>{
  const g=board(),s=new RichmanSandbox(()=>g),root=g.root,v=root.vars,cash=[v.xianjin1,v.xianjin2];
  for(const level of [0,1,2,3,4]){
    s.run('property',{id,owner:1,level});const mark=root.children.get(16384+id),building=root.children.get(16384+50+id);
    assert.equal(v.shuyu[id],1);assert.equal(v.jibie[id],level);assert.equal(mark.id,data.exports[v.ppp1]);assert.equal(mark.color[3],0.2);assert.deepEqual(mark.matrix.slice(4),points[id-1]);
    if(level){assert.equal(building.id,data.exports[level===4?'lei':'f'+level]);assert.deepEqual(building.matrix.slice(4),points[id-1].map((x,i)=>Math.trunc(x/50)*50+(level===4?[5,4][i]:0)));}else assert.equal(building,undefined);
    for(const tier of [1,2,3])assert.equal(v['f1'+tier],level===tier?1:0);
  }
  s.run('property',{id,owner:2,level:2});assert.equal(v.f22,1);assert.equal(root.children.get(16384+id).id,data.exports[v.ppp2]);assert.equal(v.f12,0);
  s.run('property',{id,owner:0,level:0});assert.equal(root.children.has(16384+id),false);assert.equal(root.children.has(16384+50+id),false);assert.equal(v.f22,0);
  for(let tile=1;tile<=30;tile++){assert.equal(v.shuyu[tile],0);assert.equal(v.jibie[tile],0);}assert.deepEqual([v.xianjin1,v.xianjin2],cash);
});
test('sandbox invalid property edits have no side effects',()=>{
  const g=board(),s=new RichmanSandbox(()=>g),before=g.snapshot();
  for(const payload of [{id:0,owner:1,level:0},{id:31,owner:1,level:0},{id:1,owner:3,level:0},{id:1,owner:0,level:1},{id:1,owner:1,level:5},{id:1,owner:1,level:1.5},{id:1,owner:1,level:0,x:1}]){
    assert.throws(()=>s.run('property',payload));assert.deepEqual(g.snapshot(),before);
  }
});
test('sandbox missing owner asset is rejected before replacing any display content',()=>{
  const g=board(),s=new RichmanSandbox(()=>g);s.run('property',{id:1,owner:1,level:1});
  const marker=g.root.children.get(16385),building=g.root.children.get(16435);
  delete g.root.vars.ppp2; // Deliberately corrupted external fixture, not a supported action.
  assert.throws(()=>s.run('property',{id:1,owner:2,level:2}),/Missing sandbox display asset/);
  assert.equal(g.root.children.get(16385),marker);assert.equal(g.root.children.get(16435),building);
  assert.equal(g.root.vars.shuyu[1],1);assert.equal(g.root.vars.jibie[1],1);assert.equal(s.snapshot().log.length,1);
});
test('sandbox-edited house is charged by the unchanged original landing logic',()=>{
  const g=board(),s=new RichmanSandbox(()=>g),root=g.root,v=root.vars;
  s.run('property',{id:1,owner:2,level:2});root.named.renwu1.proxy._x=254;root.named.renwu1.proxy._y=1;
  const cash1=v.xianjin1,cash2=v.xianjin2;g.randomQueue=[0];g.keyDown(87);g.step(700);
  assert.equal(v.xianjin1,cash1-200);assert.equal(v.xianjin2,cash2+200*(1-v.shuilv2/100));assert.equal(g.errors.length,0);
});
test('sandbox history is bounded, does not become a save game and resets for a new runtime',()=>{
  let g=board();const s=new RichmanSandbox(()=>g);for(let i=0;i<70;i++)player(s,{cash:i});
  assert.equal(s.snapshot().log.length,50);assert.equal(s.snapshot().log[0].sequence,21);assert.equal(s.snapshot().log.at(-1).sequence,70);
  g=board();assert.equal(s.snapshot().modified,false);assert.equal(s.snapshot().log.length,0);assert.equal(g.root.vars.xianjin1,5000);
});
