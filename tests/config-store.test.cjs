const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const Settings=require('../public/settings.js');
const Store=require('../public/config-store.js');
const defaults=require('../public/config/defaults.json');
function memory(){const data=new Map();return {data,getItem:k=>data.has(k)?data.get(k):null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)};}
function model(options={}){return new Store(defaults,{storage:null,...options});}

test('sparse defaults, clone protection and independent draft/apply/save phases',()=>{
  const storage=memory(),s=model({storage});
  assert.equal(s.lastSaveSucceeded,null);
  assert.deepEqual(s.current,{});assert.equal(s.get('characters','b1','cash'),6000);
  s.set('characters','b1','cash',12000);s.set('properties','1','cash',37);s.set('numbers','rules.houseCash',321);
  assert.equal(s.stats().changed,3);assert.equal(s.stats().draftChanged,3);assert.deepEqual(s.active,{});assert.equal(storage.data.size,0);
  const exposed=s.current;exposed.characters.b1.cash=1;assert.equal(s.get('characters','b1','cash'),12000);
  s.apply();assert.equal(s.stats().draftChanged,0);assert.equal(s.stats().unsavedChanges,3);assert.equal(storage.data.size,0);
  assert.equal(s.saveActive(),true);assert.equal(s.lastSaveSucceeded,true);assert.equal(s.stats().unsavedChanges,0);
  s.set('characters','b1','cash',15000);assert.equal(s.active.characters.b1.cash,12000);
  const restored=model({storage});assert.equal(restored.get('characters','b1','cash'),12000);assert.equal(restored.get('properties','1','cash'),37);
  assert.equal(restored.get('numbers','rules.houseCash'),321);
});

test('file configuration is a base; a changed file signature overrides stale browser settings but preserves presets',()=>{
  const storage=memory(),fileBase={characters:{b1:{cash:7000,diamonds:2}},numbers:{'rules.houseCash':400}};
  const s=model({storage,fileBase});assert.equal(s.get('characters','b1','cash'),7000);
  s.set('characters','b1','cash',9000);s.apply();s.saveActive();s.savePreset('prior configuration');
  assert.equal(model({storage,fileBase}).get('characters','b1','cash'),9000);
  const changedFile={characters:{b1:{cash:8000,diamonds:4}},numbers:{'rules.houseCash':500}};
  const restored=model({storage,fileBase:changedFile});
  assert.equal(restored.get('characters','b1','cash'),8000);assert.equal(restored.get('characters','b1','diamonds'),4);assert.equal(restored.get('numbers','rules.houseCash'),500);
  assert.equal(restored.listPresets().length,1);assert.match(restored.warnings[0],/File configuration changed/);
  const copy=restored.fileBase;copy.characters.b1.cash=1;assert.equal(restored.fileBase.characters.b1.cash,8000);
});

test('reset-all persists original values even when file base contains overrides; browser reset preserves file and presets',()=>{
  const storage=memory(),fileBase={characters:{b1:{cash:7777}},numbers:{'rules.houseCash':350}};
  const s=model({storage,fileBase});s.savePreset('base');s.resetAll();
  assert.equal(s.get('characters','b1','cash'),6000);assert.equal(s.active.characters.b1.cash,7777);
  s.apply();assert.equal(s.saveActive(),true);
  let restored=model({storage,fileBase});assert.deepEqual(restored.current,{});assert.equal(restored.get('numbers','rules.houseCash'),200);
  restored.resetBrowser();assert.equal(restored.get('characters','b1','cash'),7777);assert.equal(restored.listPresets().length,1);
  restored=model({storage,fileBase});assert.equal(restored.get('characters','b1','cash'),7777);assert.equal(restored.listPresets()[0].name,'base');
});

test('remove override returns a field to original rather than silently reapplying file base',()=>{
  const s=model({fileBase:{characters:{b1:{cash:7000}}}});s.remove('characters','b1','cash');assert.deepEqual(s.current,{});assert.equal(s.get('characters','b1','cash'),6000);
  s.set('numbers','rules.houseCash',321);s.remove('numbers','rules.houseCash');assert.equal(s.get('numbers','rules.houseCash'),200);
  s.resetDraftToFile();assert.equal(s.get('characters','b1','cash'),7000);
});

test('clearing browser active save preserves this page draft, active game configuration and presets',()=>{
  const storage=memory(),fileBase={characters:{b1:{cash:7000}}},s=model({storage,fileBase});
  s.set('characters','b1','cash',9000);s.apply();s.saveActive();s.savePreset('retained');
  s.set('characters','b1','cash',11000);const before=s.current,active=s.active;
  assert.equal(s.clearSaved(),true);assert.deepEqual(s.current,before);assert.deepEqual(s.active,active);assert.equal(s.listPresets().length,1);assert.equal(s.stats().unsavedChanges,1);
  const restored=model({storage,fileBase});assert.equal(restored.get('characters','b1','cash'),7000);assert.equal(restored.listPresets()[0].name,'retained');
});

test('import accepts raw and versioned sparse JSON, exports portable versioned JSON, and is atomic',()=>{
  const s=model();s.importJSON('{"characters":{"b1":{"cash":12345}}}');
  const exported=s.exportJSON(),parsed=JSON.parse(exported);assert.equal(parsed.schemaVersion,1);assert.equal(parsed.overrides.characters.b1.cash,12345);
  const second=model();second.importJSON(exported);assert.deepEqual(second.current,s.current);
  second.importJSON('{"overrides":{"properties":{"1":{"cash":37,"diamonds":0}}}}');assert.equal(second.get('properties','1','cash'),37);
  const before=second.current;
  for(const value of [
    '{"characters":{"b1":{"cash":111},"b2":{"cash":-1}}}',
    '{"schemaVersion":2,"overrides":{}}','{"schemaVersion":1,"overrides":{},"other":0}',
    '{"schemaVersion":1}','{"numbers":{"rules.houseCash":""}}','{"characters":[]}',
    '{"__proto__":{"polluted":true}}','{"characters":{"constructor":{"cash":1}}}',
    '{"characters":{"b1":{"__proto__":{"polluted":true}}}}',
    '{"characters":{"b1":{"cash":1e999}}}','not-json',
  ]){assert.throws(()=>second.importJSON(value));assert.deepEqual(second.current,before);}
  assert.equal({}.polluted,undefined);
});

test('JSON import size limit is byte based, enforced before parsing, and does not mutate the draft',()=>{
  const s=model();s.set('numbers','rules.houseCash',321);const before=s.current;
  assert.throws(()=>s.importJSON(' '.repeat(Store.MAX_JSON_BYTES+1)),/2 MiB/);
  assert.throws(()=>s.importJSON('中'.repeat(Math.floor(Store.MAX_JSON_BYTES/3)+1)),/2 MiB/);
  assert.deepEqual(s.current,before);
});

test('presets are named snapshots; saving presets never persists unapplied or unsaved active configuration',()=>{
  const storage=memory(),s=model({storage});s.set('numbers','rules.houseCash',321);s.savePreset('test');
  assert.deepEqual(model({storage}).current,{});assert.equal(model({storage}).listPresets()[0].overrides.numbers['rules.houseCash'],321);
  s.apply();s.set('numbers','rules.houseCash',555);s.savePreset('test');
  assert.deepEqual(model({storage}).active,{});assert.equal(s.listPresets().length,1);assert.equal(s.loadPreset('test').numbers['rules.houseCash'],555);
  const preset=s.listPresets();preset[0].name='mutated';assert.equal(s.listPresets()[0].name,'test');
  assert.equal(s.removePreset('missing'),false);assert.equal(s.removePreset('test'),true);assert.throws(()=>s.loadPreset('test'));
});

test('preset cap, names and invalid snapshot rejection are atomic',()=>{
  const s=model({storage:memory()});for(let i=0;i<25;i++)s.savePreset('preset '+i);
  assert.equal(s.listPresets().length,25);assert.throws(()=>s.savePreset('overflow'),/25/);
  s.savePreset('preset 0',{numbers:{'rules.houseCash':321}});assert.equal(s.listPresets().length,25);
  const before=s.listPresets();
  for(const name of ['', '  ', ' padded ', 'a'.repeat(49),'bad\nname',12])assert.throws(()=>s.savePreset(name));
  assert.throws(()=>s.savePreset('preset 0',{numbers:{'rules.houseCash':-1}}));assert.deepEqual(s.listPresets(),before);
});

test('malformed saved data is rejected as a whole, without partially loading active configuration or presets',()=>{
  const storage=memory(),key='mini-richman.config.v1';
  for(const saved of [
    {schemaVersion:1,activeOverrides:{numbers:{'rules.houseCash':321}},presets:[{name:'bad',overrides:{x:1}}]},
    {schemaVersion:2,activeOverrides:{}},
    {schemaVersion:1,activeOverrides:{},presets:[{name:'same',overrides:{}},{name:'same',overrides:{}}]},
    {schemaVersion:1,activeOverrides:{},presets:[{name:'ok',overrides:{},extra:1}]},
    {schemaVersion:1,activeOverrides:{},unexpected:0},
  ]){
    storage.setItem(key,JSON.stringify(saved));const s=model({storage,fileBase:{numbers:{'rules.houseCash':400}}});
    assert.equal(s.get('numbers','rules.houseCash'),400);assert.deepEqual(s.listPresets(),[]);assert.equal(s.warnings.length,1);
  }
});

test('storage read/write errors keep an editable, applicable memory draft and expose warnings',()=>{
  const messages=[],storage={getItem(){throw new Error('blocked');},setItem(){throw new Error('quota');}};
  const s=model({storage,onWarning:m=>messages.push(m)});assert.equal(s.warnings.length,1);
  s.set('characters','b1','cash',12000);s.apply();assert.equal(s.saveActive(),false);
  assert.equal(s.lastSaveSucceeded,false);
  assert.equal(s.active.characters.b1.cash,12000);assert.equal(s.stats().unsavedChanges,1);
  s.savePreset('in memory');assert.equal(s.listPresets().length,1);assert.equal(messages.length,3);
  const list=s.warnings;list.length=0;assert.equal(s.warnings.length,3);
  const callbacks=model({storage,onWarning(){throw new Error('callback');}});assert.doesNotThrow(()=>callbacks.saveActive());
});

test('settings strictly reject unknown groups, fields, arrays, inherited data, getters and prototype pollution',()=>{
  const invalid=[null,[],new Date(),{unknown:{}},{characters:[]},{properties:[]},{numbers:[]},
    {characters:{unknown:{cash:1}}},{characters:{b1:{unknown:1}}},{properties:{'999':{cash:1}}},
    {properties:{'1':{unknown:1}}},{numbers:{'rules.unknown':1}},Object.create({characters:{b1:{cash:1}}}),
    JSON.parse('{"__proto__":{}}'),JSON.parse('{"numbers":{"constructor":1}}'),
    Object.defineProperty({},'characters',{get(){throw new Error('must not execute');},enumerable:true}),
    Object.assign(Object.create(null),{numbers:{'rules.houseCash':''}}),
  ];
  for(const input of invalid)assert.throws(()=>new Settings(defaults,input));
  const symbol={};symbol[Symbol('hidden')]=1;assert.throws(()=>new Settings(defaults,symbol));
});

for(const field of ['cash','overdraft','bankBonus'])test('bounded nonnegative character amount: '+field,()=>{
  for(const value of [-1,Infinity,NaN,1e10,'','0',null,false,{},[]])assert.throws(()=>new Settings(defaults,{characters:{b1:{[field]:value}}}));
  assert.doesNotThrow(()=>new Settings(defaults,{characters:{b1:{[field]:0}}}));
});
for(const field of ['diamonds','stars','charms','mines'])test('bounded integer item count: '+field,()=>{
  for(const value of [-1,1.5,1e7,Infinity,'2'])assert.throws(()=>new Settings(defaults,{characters:{b1:{[field]:value}}}));
  assert.doesNotThrow(()=>new Settings(defaults,{characters:{b1:{[field]:12}}}));
});
test('name, tax and property bounds preserve valid zero and reject invalid strings/numbers',()=>{
  for(const name of ['', ' ', ' a','a ', 'a'.repeat(25),'x\ny',null,12])assert.throws(()=>new Settings(defaults,{characters:{b1:{name}}}));
  assert.doesNotThrow(()=>new Settings(defaults,{characters:{b1:{name:'自定义角色',taxPercent:0}}}));
  assert.doesNotThrow(()=>new Settings(defaults,{characters:{b1:{taxPercent:100}}}));
  for(const taxPercent of [-1,100.01,NaN,'30'])assert.throws(()=>new Settings(defaults,{characters:{b1:{taxPercent}}}));
  for(const cash of [-1,NaN,'',1e10])assert.throws(()=>new Settings(defaults,{properties:{'1':{cash}}}));
  for(const diamonds of [-1,1.1,'2',1e7])assert.throws(()=>new Settings(defaults,{properties:{'1':{diamonds}}}));
  assert.doesNotThrow(()=>new Settings(defaults,{properties:{'1':{cash:0,diamonds:0}}}));
});

test('named rule costs, counters and timers have semantic bounds; sub-20ms timers are advisory',()=>{
  for(const [key,original]of Object.entries(defaults.numbers).filter(([key])=>!key.startsWith('src.'))){
    assert.doesNotThrow(()=>new Settings(defaults,{numbers:{[key]:original}}));
    for(const value of [-1,NaN,Infinity,'',null,[],{}])assert.throws(()=>new Settings(defaults,{numbers:{[key]:value}}));
  }
  for(const key of ['rules.itemCap','rules.selectionTicks','rules.diceFaces','rules.stepMilliseconds','rules.selectionTickMilliseconds','rules.minuteMilliseconds']){
    for(const value of [0,1.5])assert.throws(()=>new Settings(defaults,{numbers:{[key]:value}}));
  }
  assert.throws(()=>new Settings(defaults,{numbers:{'rules.upgradeStars':1.5}}));
  assert.throws(()=>new Settings(defaults,{numbers:{'rules.diceFaces':7}}));
  assert.doesNotThrow(()=>new Settings(defaults,{numbers:{'rules.diceFaces':6}}));
  const s=model();s.set('numbers','rules.stepMilliseconds',1);assert.equal(s.validationWarnings().length,1);
  s.set('numbers','rules.stepMilliseconds',20);assert.equal(s.validationWarnings().length,0);
});

test('advanced source literals accept bounded finite numbers only, with no implicit coercion',()=>{
  const key=Object.keys(defaults.numbers).find(k=>k.startsWith('src.'));
  for(const value of [NaN,Infinity,-Infinity,'',true,null,1000001,-1000001])assert.throws(()=>new Settings(defaults,{numbers:{[key]:value}}));
  assert.doesNotThrow(()=>new Settings(defaults,{numbers:{[key]:-0.5}}));
});

test('default-valued fields are pruned; changes compare original values and report all numeric categories',()=>{
  const s=model();s.replace({characters:{b1:{cash:6000}},properties:{'1':{cash:400}},numbers:{'rules.houseCash':200}});assert.deepEqual(s.current,{});
  const key=Object.keys(defaults.numbers).find(k=>k.startsWith('src.'));
  s.set('characters','b1','cash',12000);s.set('properties','1','cash',37);s.set('numbers','rules.houseCash',321);s.set('numbers',key,12);
  const stats=s.stats();assert.equal(stats.changed,4);assert.equal(stats.characters,1);assert.equal(stats.properties,1);assert.equal(stats.numbers,2);assert.equal(stats.namedNumbers,1);assert.equal(stats.advancedNumbers,1);assert.ok(stats.total>2200);
  assert.equal(s.changes().find(c=>c.group==='characters').original,6000);
  assert.equal(s.get('characters').b1.cash,12000);assert.equal(s.get('characters','b1').name,'阿布');assert.equal(s.get('numbers')['rules.houseCash'],321);
});

test('browser globals load without Node, and unavailable localStorage is caught',()=>{
  const context=vm.createContext({TextEncoder});
  vm.runInContext('Object.defineProperty(globalThis,"localStorage",{get(){throw new Error("SecurityError");}})',context);
  vm.runInContext(fs.readFileSync(path.join(__dirname,'../public/settings.js'),'utf8'),context);
  vm.runInContext(fs.readFileSync(path.join(__dirname,'../public/config-store.js'),'utf8'),context);
  vm.runInContext('this.defaults='+JSON.stringify(defaults)+';this.store=new RichmanConfigStore(defaults);store.set("numbers","rules.houseCash",321);store.apply();',context);
  assert.equal(context.store.active.numbers['rules.houseCash'],321);assert.equal(context.store.warnings.length,1);
});
