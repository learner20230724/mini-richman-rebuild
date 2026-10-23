const {test}=require('node:test'),assert=require('node:assert/strict');
const {RichmanClock}=require('../public/clock.js'),{RichmanGame}=require('../public/runtime.js');
const Settings=require('../public/settings.js'),defaults=require('../public/config/defaults.js');
const data=require('../public/game-data.json'),scripts=require('../public/generated-game.js');

test('0.1x, 1x and 20x produce identical seeded gameplay after equal original simulation ticks',()=>{
  function play(speed){
    const game=new RichmanGame(data,scripts,{seed:0x1758,settings:new Settings(defaults)}),clock=new RichmanClock(ms=>game.step(ms),{speed});
    let wall=0;clock.frame(wall);
    const advance=milliseconds=>{const target=game.now+milliseconds;while(game.now<target){wall+=20;clock.frame(wall);}};
    // Real menu keys; no cash, position, dice or source-rule injection.
    for(let i=0;i<4;i++)game.keyDown(68);
    game.keyDown(87);game.keyDown(38);advance(2000);
    assert.equal(game.root.frame,2);game.keyDown(87);advance(6000);
    assert.equal(game.now,8000);assert.deepEqual(game.errors,[]);
    return {snapshot:game.snapshot(),seed:game.seed,sounds:game.soundCalls};
  }
  const original=play(1);assert.deepEqual(play(0.1),original);assert.deepEqual(play(20),original);
});
