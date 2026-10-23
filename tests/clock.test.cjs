const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {RichmanClock}=require('../public/clock.js');

function clock(options){const steps=[];return {clock:new RichmanClock(ms=>steps.push(ms),options),steps};}

test('clock defaults to original 20 ms fixed ticks at 1x',()=>{
  const {clock:c,steps}=clock();assert.equal(c.speed,1);assert.equal(RichmanClock.STEP_MS,20);
  assert.equal(c.frame(100),0);assert.equal(c.frame(119),0);assert.equal(c.frame(120),1);
  assert.equal(c.frame(161),2);assert.deepEqual(steps,[20,20,20]);assert.equal(c.remainderMs,1);
});
test('1x accumulates exactly 50 original ticks per second at 60 rendered frames',()=>{
  const {clock:c,steps}=clock();c.frame(0);for(let i=1;i<=60;i++)c.frame(i*1000/60);
  assert.equal(steps.length,50);assert.ok(c.remainderMs<1e-6);
});
test('20x changes scheduling only, retaining all original 20 ms steps',()=>{
  const {clock:c,steps}=clock({speed:20});c.frame(0);assert.equal(c.frame(100),100);
  assert.equal(steps.length,100);assert.ok(steps.every(ms=>ms===20));
});
test('20x runs 1000 ticks per visible second at 60 rendered frames',()=>{
  const {clock:c,steps}=clock({speed:20});c.frame(0);for(let i=1;i<=60;i++)c.frame(i*1000/60);
  assert.equal(steps.length,1000);assert.ok(c.remainderMs<1e-6);
});
test('0.1x accumulates fractions without changing original tick length',()=>{
  const {clock:c,steps}=clock({speed:0.1});c.frame(0);for(let i=1;i<=60;i++)c.frame(i*1000/60);
  assert.deepEqual(steps,[20,20,20,20,20]);assert.ok(c.remainderMs<1e-6);
});
test('fractional 1.3x and 19.9x remain deterministic over a second',()=>{
  for(const speed of [1.3,19.9]){
    const {clock:c,steps}=clock({speed});c.frame(0);for(let i=1;i<=100;i++)c.frame(i*10);
    assert.equal(steps.length,Math.round(speed*50));assert.ok(steps.every(ms=>ms===20));assert.ok(c.remainderMs<1e-6);
  }
});
test('0x is a true timer pause and does not accumulate dormant wall time',()=>{
  const {clock:c,steps}=clock({speed:0});c.frame(0);c.frame(500);c.frame(10000);
  assert.equal(c.remainderMs,0);assert.deepEqual(steps,[]);
  c.setSpeed(1,10000);assert.equal(c.frame(10019),0);assert.equal(c.frame(10020),1);
  assert.deepEqual(steps,[20]);
});
test('switching speed discards both fractional debt and old-speed elapsed time',()=>{
  const {clock:c,steps}=clock();c.frame(0);c.frame(19);assert.equal(c.remainderMs,19);
  c.setSpeed(20,119);assert.equal(c.remainderMs,0);assert.equal(c.frame(120),1);assert.deepEqual(steps,[20]);
  c.setSpeed(0,121);assert.equal(c.frame(1000),0);c.setSpeed(1,1000);
  assert.equal(c.frame(1019),0);assert.equal(c.frame(1020),1);
});
test('switching without a timestamp rebuilds a baseline rather than catching up',()=>{
  const {clock:c,steps}=clock();c.frame(0);c.frame(19);c.setSpeed(20);
  assert.equal(c.frame(10000),0);assert.equal(c.frame(10001),1);assert.deepEqual(steps,[20]);
});
test('hidden pages do not simulate and restoring visibility never catches up',()=>{
  const {clock:c,steps}=clock();c.frame(0);c.frame(19);c.setHidden(true,20);
  assert.equal(c.hidden,true);assert.equal(c.frame(10000),0);assert.equal(c.stepOnce(),0);
  c.setHidden(false,20000);assert.equal(c.hidden,false);assert.equal(c.frame(20019),0);assert.equal(c.frame(20020),1);
  assert.deepEqual(steps,[20]);
});
test('visibility restoration without a timestamp starts afresh',()=>{
  const {clock:c,steps}=clock({speed:20});c.frame(0);c.setHidden(true);c.frame(1000);
  c.setHidden(false);assert.equal(c.frame(100000),0);assert.equal(c.frame(100001),1);assert.deepEqual(steps,[20]);
});
test('visible stalls use the 100 ms cap and do not retain discarded lag',()=>{
  const {clock:c,steps}=clock();c.frame(0);assert.equal(c.frame(10000),5);
  assert.equal(c.frame(10000),0);assert.equal(c.frame(10020),1);assert.equal(steps.length,6);
});
test('manual stepping at 0x advances exactly one tick and leaves the clock paused',()=>{
  const {clock:c,steps}=clock({speed:0});c.frame(0);assert.equal(c.stepOnce(),1);assert.equal(c.speed,0);
  c.frame(10000);assert.deepEqual(steps,[20]);assert.equal(c.remainderMs,0);
});
test('backward wall time drops fractional debt instead of running negative steps',()=>{
  const {clock:c,steps}=clock();c.frame(100);c.frame(119);assert.equal(c.frame(110),0);
  assert.equal(c.remainderMs,0);assert.equal(c.frame(129),0);assert.equal(c.frame(130),1);assert.deepEqual(steps,[20]);
});
test('reset preserves speed and drops accumulated fractions',()=>{
  const {clock:c,steps}=clock({speed:2});c.frame(0);c.frame(9);assert.equal(c.remainderMs,18);
  c.reset(1000);assert.equal(c.speed,2);assert.equal(c.frame(1009),0);assert.equal(c.frame(1010),1);
  c.reset();assert.equal(c.frame(100000),0);assert.deepEqual(steps,[20]);
});
test('all 201 supported tenth increments are accepted, normalizing floating-point input',()=>{
  const {clock:c}=clock();for(let tenths=0;tenths<=200;tenths++)assert.equal(c.setSpeed(tenths/10),tenths/10);
  assert.equal(c.setSpeed(0.1+0.2),0.3);
});
test('invalid speeds are rejected without mutating time or speed state',()=>{
  const {clock:c}=clock();c.frame(0);c.frame(19);
  for(const invalid of [-0.1,20.1,NaN,Infinity,-Infinity,'2',null,undefined,{},0.15]){
    assert.throws(()=>c.setSpeed(invalid));assert.equal(c.speed,1);assert.equal(c.remainderMs,19);
  }
  assert.equal(c.frame(20),1);
});
test('invalid timestamps and hidden-state types are rejected transactionally',()=>{
  const {clock:c}=clock();c.frame(10);c.frame(29);
  for(const invalid of [-1,NaN,Infinity,'30',null]){
    assert.throws(()=>c.frame(invalid));assert.throws(()=>c.reset(invalid));
    assert.throws(()=>c.setSpeed(2,invalid));assert.equal(c.speed,1);
    assert.throws(()=>c.setHidden(true,invalid));assert.equal(c.hidden,false);assert.equal(c.remainderMs,19);
  }
  for(const invalid of [0,1,'false',null,undefined])assert.throws(()=>c.setHidden(invalid));
  assert.equal(c.frame(30),1);
});
test('constructor validates callback, speed and stall cap',()=>{
  assert.throws(()=>new RichmanClock());assert.throws(()=>new RichmanClock(()=>{},{speed:-1}));assert.throws(()=>new RichmanClock(()=>{},{speed:null}));
  for(const invalid of [0,-1,NaN,Infinity,'100',null])assert.throws(()=>new RichmanClock(()=>{},{maxFrameMs:invalid}));
  const {clock:c}=clock({maxFrameMs:40});c.frame(0);assert.equal(c.frame(1000),2);
});
test('browser script exposes the same RichmanClock API without module dependencies',()=>{
  const context=vm.createContext({});vm.runInContext(fs.readFileSync(path.join(__dirname,'../public/clock.js'),'utf8'),context);
  const steps=[],c=new context.RichmanClock(ms=>steps.push(ms));c.frame(0);c.frame(20);
  assert.deepEqual(steps,[20]);assert.equal(c.speed,1);
});
