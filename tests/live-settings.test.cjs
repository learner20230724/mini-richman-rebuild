const {test}=require('node:test'),assert=require('node:assert/strict');
const {RichmanGame}=require('../public/runtime.js'),Settings=require('../public/settings.js'),Live=require('../public/live-settings.js');
const data=require('../public/game-data.json'),scripts=require('../public/generated-game.js'),defaults=require('../public/config/defaults.json');
function menu(overrides={}){return new RichmanGame(data,scripts,{seed:0x1758,settings:new Settings(defaults,overrides)});}
function game(overrides={}){const g=menu(overrides);g.root.vars.ppp1='b6';g.root.vars.ppp2='b1';g.root.proxy.gotoAndPlay(2);return g;}
function dialog(g,name,p=1){const v=g.root.vars;v.shui=p;v.xingqi=0;v.pp=p+'P';return g.root.attach(name,name,88,{_x:340,_y:180});}
function controls(g){return {root:g.root,turn:g.root.vars.shui,position:[g.root.named.renwu1,g.root.named.renwu2].map(c=>c.matrix.slice()),ownership:g.root.vars.shuyu.slice(),levels:g.root.vars.jibie.slice(),seed:g.seed,queue:g.randomQueue.slice(),time:g.now};}

test('hot changes retain the running game, root, turn, positions, ownership and RNG',()=>{
  const g=game(),v=g.root.vars,live=new Live(defaults);v.xianjin1=5432;v.shuyu[1]=1;v.jibie[1]=2;g.randomQueue=[0.5];
  const before=controls(g),settings=g.options.settings,result=live.apply(g,{characters:{b6:{bankBonus:888}},properties:{'2':{cash:37,diamonds:0}},numbers:{'rules.houseCash':321}});
  assert.equal(result.status,'applied');assert.equal(result.pending,false);assert.notEqual(g.options.settings,settings);assert.equal(g.builtins._config,g.options.settings);
  assert.deepEqual(controls(g),before);assert.equal(v.jiangjin1,888);assert.equal(v.xianjin1,5432);assert.equal(v.xianjin[2],37);assert.equal(v.zuanshi[2],0);assert.equal(g.builtins._config.number('rules.houseCash'),321);
});

test('only changed role fields write current state; cash changes explicitly set, and reverting defaults is a change',()=>{
  const live=new Live(defaults),g=game({characters:{b6:{cash:12000,bankBonus:400}}}),v=g.root.vars;
  v.xianjin1=15555;v.wuxing1=9;v.shuilv1=31;
  live.apply(g,{characters:{b6:{cash:12000,bankBonus:800,name:'当前角色'}}});
  assert.equal(v.xianjin1,15555);assert.equal(v.wuxing1,9);assert.equal(v.shuilv1,31);assert.equal(v.jiangjin1,800);assert.equal(v.name1,'当前角色');
  live.apply(g,{characters:{b6:{cash:20000,bankBonus:800,name:'当前角色'}}});assert.equal(v.xianjin1,20000);
  v.xianjin1=20222;const revert=live.apply(g,{});
  assert.equal(v.xianjin1,2000);assert.equal(v.jiangjin1,300);assert.equal(v.name1,'小镁');assert.equal(v.wuxing1,9);assert.equal(v.shuilv1,31);
  assert.ok(revert.changes.some(change=>change.field==='cash'&&change.value===2000));
});

test('all supported selected-character fields apply directly; unselected roles never replace players',()=>{
  const g=game(),live=new Live(defaults),patch={name:'热改角色',cash:30000,overdraft:900,bankBonus:800,taxPercent:10,diamonds:6,stars:7,charms:8,mines:9};
  const result=live.apply(g,{characters:{b6:patch,b2:{cash:50000}}}),binding={name:'name',cash:'xianjin',overdraft:'touzhi',bankBonus:'jiangjin',taxPercent:'shuilv',diamonds:'zuanshi',stars:'wuxing',charms:'yumao',mines:'dilei'};
  for(const [field,key]of Object.entries(binding))assert.equal(g.root.vars[key+'1'],patch[field]);
  assert.equal(g.root.vars.ppp2,'b1');assert.equal(g.root.vars.xianjin2,6000);assert.equal(result.changes.find(c=>c.id==='b2').effect,'new-game');
});

test('hot property prices are actually charged by the original purchase script and reversal restores original',()=>{
  const g=game(),live=new Live(defaults),v=g.root.vars;
  live.apply(g,{properties:{'1':{cash:37,diamonds:0}}});v.weizhi=1;const before=v.xianjin1;dialog(g,'maidi');
  assert.equal(v.wenben,'买地：37元，0钻石？');g.keyDown(87);assert.equal(v.xianjin1,before-37);assert.equal(v.shuyu[1],1);
  live.apply(g,{});assert.equal(v.xianjin[1],400);assert.equal(v.zuanshi[1],3);assert.equal(v.shuyu[1],1);
});

test('house cost changes affect both actual affordability and payment without a new game',()=>{
  const g=game(),live=new Live(defaults),v=g.root.vars;live.apply(g,{numbers:{'rules.houseCash':321}});
  v.shuyu[1]=1;v.jibie[1]=0;v.xianjin1=500;v.weizhi=1;dialog(g,'jianfang');g.keyDown(87);
  assert.equal(v.xianjin1,179);assert.equal(v.jibie[1],1);
});

test('a pending purchase is completed at its old price; the queued bundle applies atomically afterwards',()=>{
  const g=game(),live=new Live(defaults),v=g.root.vars;v.weizhi=1;dialog(g,'maidi');const before=v.xianjin1;
  const result=live.apply(g,{properties:{'1':{cash:37,diamonds:0}},characters:{b6:{bankBonus:888}}});
  assert.equal(result.status,'queued');assert.equal(result.pending,true);assert.equal(v.xianjin[1],400);assert.equal(v.jiangjin1,300);assert.equal(g.options.settings.overrides.properties,undefined);
  assert.equal(live.flush(g).status,'queued');g.keyDown(87);assert.equal(v.xianjin1,before-400);assert.equal(live.flush(g).status,'applied');
  assert.equal(v.xianjin[1],37);assert.equal(v.jiangjin1,888);assert.equal(v.shuyu[1],1);assert.equal(live.pending,null);
});

test('movement interval is proportionally retimed; current dice, remaining steps and RNG are untouched',()=>{
  const g=game(),live=new Live(defaults);g.randomQueue=[5.5/6];g.keyDown(87);g.step(200);
  const mover=g.walk().find(c=>typeof c.vars.xingzou==='function'),timer=g.timers.get(mover.vars.mm),before=controls(g),p=mover.vars.p,face=g.root.named.shaizi.frame;
  assert.equal(timer.ms,700);assert.equal(timer.next-g.now,500);
  const result=live.apply(g,{numbers:{'rules.stepMilliseconds':1400,'rules.diceFaces':2,'rules.houseCash':321}});
  assert.equal(result.status,'applied');assert.equal(timer.ms,1400);assert.equal(timer.next-g.now,1000);assert.equal(mover.vars.p,p);assert.equal(g.root.named.shaizi.frame,face);assert.deepEqual(controls(g),before);
  assert.equal(result.changes.find(c=>c.id==='rules.diceFaces').effect,'next-trigger');
  g.step(980);assert.equal(mover.vars.p,p);g.step(20);assert.equal(mover.vars.p,p-1);
});

test('movement with a role/property bundle queues the whole request until the landing decision is completed',()=>{
  const g=game(),live=new Live(defaults);g.randomQueue=[0];g.keyDown(87);g.step(200);const settings=g.options.settings;
  const result=live.apply(g,{characters:{b6:{bankBonus:999}},properties:{'1':{cash:37}},numbers:{'rules.stepMilliseconds':1400}});
  assert.equal(result.status,'queued');assert.equal(g.options.settings,settings);const movement=[...g.timers.values()].find(t=>t.fn.name==='xingzou');assert.equal(movement.ms,700);
  g.step(500);assert.equal(g.root.children.get(16384+88).id,data.exports.maidi);assert.equal(live.flush(g).status,'queued');
  g.keyDown(83);assert.equal(live.flush(g).status,'applied');assert.equal(g.root.vars.jiangjin1,999);assert.equal(g.root.vars.xianjin[1],37);
});

test('menu countdown duration and interval preserve progress, with integer remaining ticks rounded upward',()=>{
  const g=menu(),live=new Live(defaults);g.keyDown(87);g.keyDown(38);g.step(560);
  const timer=g.timers.get(g.root.vars.mm1);assert.equal(g.root.vars.n,15);assert.equal(timer.next-g.now,40);
  live.apply(g,{numbers:{'rules.selectionTicks':10,'rules.selectionTickMilliseconds':200}});
  assert.equal(g.root.vars.n,8);assert.equal(timer.ms,200);assert.equal(timer.next-g.now,80);
  g.step(60);assert.equal(g.root.vars.n,8);g.step(20);assert.equal(g.root.vars.n,7);g.step(1400);assert.equal(g.root.frame,2);
});

test('minute timer keeps elapsed fraction rather than resetting the displayed minutes or interval',()=>{
  const g=game(),live=new Live(defaults),v=g.root.vars;g.step(15000);v.yongshi=3;const timer=g.timers.get(v.shijian);
  assert.equal(timer.next-g.now,45000);live.apply(g,{numbers:{'rules.minuteMilliseconds':120000}});
  assert.equal(timer.ms,120000);assert.equal(timer.next-g.now,90000);assert.equal(v.yongshi,3);
  g.step(90000);assert.equal(v.yongshi,4);
});

for(const name of ['ducheng1','ducheng2'])test('paid '+name+' settles under old rules before queued cash changes, and retained results are safe',()=>{
  const g=game(),live=new Live(defaults),v=g.root.vars,cash=v.xianjin1;dialog(g,name);
  if(name==='ducheng1')g.keyDown(68);g.keyDown(87);assert.equal(v.xianjin1,cash-100);
  const result=live.apply(g,{characters:{b6:{cash:9000}},numbers:{'rules.houseCash':321}});
  assert.equal(result.status,'queued');assert.equal(v.xianjin1,cash-100);
  g.randomQueue=Array(12).fill(name==='ducheng1'?10.5/30:10.5/50);g.step(240);
  assert.equal(v.xianjin1,cash-100+(name==='ducheng1'?200:600));assert.equal(v.shui,2);
  assert.equal(live.flush(g).status,'applied');assert.equal(v.xianjin1,9000);assert.equal(v.shui,2);
});

for(const player of [1,2])for(const outcome of ['buy','redeem','cancel'])test(`shop P${player} ${outcome} immediately becomes a safe boundary without another dice roll or payment`,()=>{
  const g=game(),live=new Live(defaults),v=g.root.vars;
  v['wuxing'+player]=outcome==='redeem'?5:0;dialog(g,'chaoshi',player);
  const shop=g.root.children.get(16384+88),selector=shop.named.kuang;
  g.keyDown(player===1?68:39);assert.equal(selector.vars.h,1);assert.equal(selector.visible,true);
  const before=v['xianjin'+player],seed=g.seed,face=g.root.named.shaizi.frame;
  const queued=live.apply(g,{characters:{b6:{bankBonus:888}},numbers:{'rules.shopStarCash':321,'rules.shopStarRedeem':4321}});
  assert.equal(queued.status,'queued');assert.equal(g.options.settings.number('rules.shopStarCash'),100);
  g.keyDown(outcome==='cancel'?(player===1?83:40):(player===1?87:38));
  const expected=before+(outcome==='buy'?-100:outcome==='redeem'?1000:0);
  assert.equal(v['xianjin'+player],expected);assert.equal(v['wuxing'+player],outcome==='buy'?1:0);
  assert.equal(v.shui,3-player);assert.equal(v.xingqi,3-player);
  // P2 cancel replaces the popup with tt; buy/redemption preserve the shop.
  if(shop.alive){assert.equal(selector.vars.h,0);assert.equal(selector.visible,false);}
  assert.equal(live.flush(g).status,'applied');assert.equal(v.jiangjin1,888);assert.equal(v['xianjin'+player],expected);
  assert.equal(g.options.settings.number('rules.shopStarCash'),321);assert.equal(g.options.settings.number('rules.shopStarRedeem'),4321);
  assert.equal(live.flush(g),null);g.step(40);assert.equal(v['xianjin'+player],expected);assert.equal(g.seed,seed);
  assert.equal(g.root.named.shaizi.frame===face||g.root.named.shaizi.playing,true);
});

for(const player of [1,2])test(`shop P${player} selection and an unaffordable purchase remain busy`,()=>{
  const g=game(),live=new Live(defaults),v=g.root.vars;v['xianjin'+player]=0;v['wuxing'+player]=0;dialog(g,'chaoshi',player);
  g.keyDown(player===1?68:39);live.apply(g,{numbers:{'rules.shopStarCash':321}});g.keyDown(player===1?87:38);
  const selector=g.root.children.get(16384+88).named.kuang;
  assert.equal(selector.vars.h,1);assert.equal(selector.visible,true);assert.equal(v['xianjin'+player],0);assert.equal(live.flush(g).status,'queued');assert.equal(g.options.settings.number('rules.shopStarCash'),100);
});

test('advanced source values apply in the menu without replaying initialization and board busy edits queue',()=>{
  const g=menu(),live=new Live(defaults),key='src.s40.l103.n1',originalRoot=g.root;
  const result=live.apply(g,{numbers:{[key]:12345}});assert.equal(result.status,'applied');assert.equal(g.root,originalRoot);assert.equal(g.root.frame,1);assert.equal(g.builtins._config.number(key),12345);assert.equal(result.changes[0].effect,'next-trigger');
  g.keyDown(87);g.keyDown(38);g.step(2000);assert.equal(g.root.vars.xianjin1,12345);
  const future='src.s42.l9.n1';g.randomQueue=[0];g.keyDown(87);const waiting=live.apply(g,{numbers:{[key]:12345,[future]:51}});assert.equal(waiting.pending,true);assert.equal(g.builtins._config.number(future),defaults.numbers[future]);
});

test('advanced changes at a stable board boundary replace future reads but never recreate already-built state',()=>{
  const g=game(),live=new Live(defaults),key='src.s40.l103.n1',before=controls(g),cash=g.root.vars.xianjin2;
  const result=live.apply(g,{numbers:{[key]:12345}});assert.equal(result.status,'applied');assert.equal(result.deferred,true);assert.equal(result.changes[0].effect,'new-game');assert.equal(g.root.vars.xianjin2,cash);assert.deepEqual(controls(g),before);
});

test('invalid configuration never changes state, active settings, timer phases or an existing valid queue',()=>{
  const g=game(),live=new Live(defaults);g.root.vars.weizhi=1;dialog(g,'maidi');live.apply(g,{characters:{b6:{bankBonus:888}}});
  const pending=live.pending,settings=g.options.settings,snapshot=g.snapshot(),timers=[...g.timers].map(([id,t])=>({id,ms:t.ms,next:t.next}));
  for(const config of [{characters:{b6:{cash:1234,bankBonus:-1}}},{numbers:{'rules.stepMilliseconds':0}},{properties:{'1':{cash:''}}},JSON.parse('{"__proto__":{}}')]){
    assert.throws(()=>live.apply(g,config));assert.equal(g.options.settings,settings);assert.deepEqual(g.snapshot(),snapshot);assert.deepEqual([...g.timers].map(([id,t])=>({id,ms:t.ms,next:t.next})),timers);assert.deepEqual(live.pending,pending);
  }
});

test('pending snapshots are isolated; a new game drops the old request; cancellation and unchanged apply clear it',()=>{
  const g=game(),live=new Live(defaults);g.root.vars.weizhi=1;dialog(g,'maidi');live.apply(g,{characters:{b6:{bankBonus:888}}});
  const pending=live.pending;pending.config.characters.b6.bankBonus=1;assert.equal(live.pending.config.characters.b6.bankBonus,888);
  assert.equal(live.flush(game()),null);assert.equal(live.pending,null);
  live.apply(g,{characters:{b6:{bankBonus:888}}});assert.ok(live.cancel());assert.equal(live.pending,null);
  live.apply(g,{characters:{b6:{bankBonus:888}}});assert.equal(live.apply(g,{}).status,'unchanged');assert.equal(live.pending,null);
});

test('a later queued request replaces the entire earlier request, not a partially merged patch',()=>{
  const g=game(),live=new Live(defaults);g.root.vars.weizhi=1;dialog(g,'maidi');
  live.apply(g,{characters:{b6:{bankBonus:888,cash:12345}}});live.apply(g,{characters:{b6:{bankBonus:999}}});
  assert.deepEqual(live.pending.config,{characters:{b6:{bankBonus:999}}});g.keyDown(83);const cash=g.root.vars.xianjin1;
  live.flush(g);assert.equal(g.root.vars.jiangjin1,999);assert.equal(g.root.vars.xianjin1,cash);
});

test('invalid running-timer preflight keeps both settings and all proposed live assignments unchanged',()=>{
  const g=game(),live=new Live(defaults),settings=g.options.settings,timer=g.timers.get(g.root.vars.shijian),cash=g.root.vars.xianjin1;timer.ms=NaN;
  assert.throws(()=>live.apply(g,{characters:{b6:{cash:12345}},numbers:{'rules.minuteMilliseconds':120000}}),/invalid running interval/);
  assert.equal(g.options.settings,settings);assert.equal(g.builtins._config,settings);assert.equal(g.root.vars.xianjin1,cash);
});

test('winner scene accepts future configuration without rerunning initialization or modifying the completed state',()=>{
  const g=game(),live=new Live(defaults);g.root.vars.xianjin1=-10000;g.root.proxy.gotoAndPlay(3);const before=g.snapshot();
  const result=live.apply(g,{characters:{b6:{cash:12000}},numbers:{'rules.minuteMilliseconds':120000}});
  assert.equal(result.status,'applied');assert.equal(result.pending,false);assert.equal(result.deferred,true);assert.ok(result.changes.every(change=>change.effect==='new-game'));assert.deepEqual(g.snapshot(),before);
});

test('preview is read-only, reports each effect, and onApplied fires only when a request commits',()=>{
  const calls=[],g=game(),live=new Live(defaults,{onApplied:event=>calls.push(event)}),config={characters:{b6:{cash:9000}},numbers:{'rules.diceFaces':2}},snapshot=g.snapshot();
  assert.equal(live.preview(g,config).status,'ready');assert.deepEqual(g.snapshot(),snapshot);assert.equal(calls.length,0);
  live.apply(g,config);assert.equal(calls.length,1);assert.equal(calls[0].game,g);assert.deepEqual(calls[0].config,config);assert.equal(calls[0].result.applied,true);
  assert.equal(live.lastResult.status,'applied');assert.equal(live.getStatus().pending,false);
});
