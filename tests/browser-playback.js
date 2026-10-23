/* Real-browser regression for editing while the game keeps running.
 * No editor-pause checkbox/API, synthetic pause解除, or rebuilt game is used.
 * One controlled six-face dice result makes the original movement repeatable.
 * Playback buttons, numeric speed, range dragging and F2 are actual UI input.
 */
async(page)=>{
  const checks=[],errors=[],dialogs=[];let report;
  const onError=error=>errors.push(String(error));
  const onDialog=dialog=>{dialogs.push({type:dialog.type(),message:dialog.message()});return dialog.dismiss();};
  page.on('pageerror',onError);page.on('dialog',onDialog);
  const check=(name,pass,detail)=>{checks.push({name,pass:!!pass,detail});if(!pass)throw new Error(name+': '+JSON.stringify(detail));};
  const ready=()=>page.waitForFunction(()=>!!window.richman&&!!window.richmanControls&&!!window.richmanEditor);
  const read=()=>page.evaluate(()=>{
    const v=richman.root.vars,popup=richman.root.children.get(16384+88);
    return {sameGame:richman===window.__playbackGame,frame:richman.root.frame,now:richman.now,wall:performance.now(),
      speed:richmanControls.getSpeed(),opened:richmanEditor.opened,paused:richmanControls.getStatus().paused,
      n:v.n,positions:[1,2].map(p=>richman.root.named['renwu'+p]?.matrix.slice(4)),
      turn:[v.shui,v.xingqi,v.pp],owners:v.shuyu?.slice(),cash:[v.xianjin1,v.xianjin2],
      popup:popup?{id:popup.id,alive:popup.alive}:null,heartbeat:window.__playbackHeartbeat?.frames};
  });
  async function open(){if(!await page.evaluate(()=>richmanEditor.opened))await page.keyboard.press('F2');await page.waitForFunction(()=>richmanEditor.opened);}
  async function close(){if(await page.evaluate(()=>richmanEditor.opened))await page.keyboard.press('F2');await page.waitForFunction(()=>!richmanEditor.opened);}
  async function advancing(name,wait=140){
    const before=await read();await page.waitForTimeout(wait);const after=await read();
    check(name,after.sameGame&&after.now>before.now&&after.speed===before.speed&&!after.paused&&after.heartbeat>before.heartbeat,{before,after});return {before,after};
  }
  try{
    await page.reload();await ready();await page.evaluate(()=>localStorage.removeItem(richmanControls.store.storageKey));
    await page.reload();await ready();await page.setViewportSize({width:1280,height:720});
    await page.evaluate(()=>{
      window.__playbackGame=richman;
      const heart=window.__playbackHeartbeat={frames:0,last:performance.now()};
      function tick(now){heart.frames++;heart.last=now;requestAnimationFrame(tick);}requestAnimationFrame(tick);
    });
    check('game starts at original 1x without editor-pause machinery',await page.evaluate(()=>richmanControls.getSpeed()===1&&typeof richmanControls.pauseEditor==='undefined')&&await page.locator('[data-pause-editor]').count()===0);
    await page.locator('#game').focus();for(let i=0;i<4;i++)await page.keyboard.press('d');
    await page.keyboard.press('w');await page.keyboard.press('ArrowUp');
    const selected=await read();check('real keyboard starts the original two-second selection countdown',selected.frame===1&&selected.n>0&&selected.n<=20,selected);
    await open();const openedMenu=await read();
    check('opening F2 at 1x does not change user speed or mark playback paused',openedMenu.speed===1&&!openedMenu.paused&&openedMenu.sameGame,openedMenu);
    const countdown=await advancing('menu countdown clock continues while settings stay open',260);
    check('actual countdown ticks decrease while editing',countdown.after.frame===2||countdown.after.n<countdown.before.n,countdown);
    await page.waitForFunction(()=>richman.root.frame===2,null,{timeout:5000});
    const board=await read();
    check('1x countdown enters the board with F2 still open and original selected roles',board.opened&&board.speed===1&&!board.paused&&board.sameGame&&await page.evaluate(()=>richman.root.vars.ppp1==='b6'&&richman.root.vars.ppp2==='b2'),board);
    check('editing never exposes the removed editor-pause checkbox',await page.locator('[data-pause-editor]').count()===0);

    // Enter must commit immediately while focus remains in the numeric field;
    // do not blur or click a different button to accidentally make this pass.
    const speedNumber=page.locator('[data-speed-number]');
    await speedNumber.fill('2');await speedNumber.press('Enter');
    check('numeric 2 Enter commits speed immediately without blurring',await page.evaluate(()=>richmanControls.getSpeed()===2&&document.activeElement===document.querySelector('[data-speed-number]')));
    await advancing('numeric Enter speed advances while focus remains inside settings');
    await speedNumber.fill('0');await speedNumber.press('Enter');const numericZero=await read();
    await page.waitForTimeout(120);const numericStopped=await read();
    check('numeric 0 Enter immediately produces a real manual pause',numericZero.speed===0&&numericStopped.speed===0&&numericStopped.now===numericZero.now&&numericStopped.paused,{numericZero,numericStopped});
    for(const speed of [2,20]){
      await speedNumber.fill(String(speed));await speedNumber.press('Enter');
      check('numeric '+speed+' Enter immediately resumes the paused game',await page.evaluate(speed=>richmanControls.getSpeed()===speed&&!richmanControls.getStatus().paused&&document.activeElement===document.querySelector('[data-speed-number]'),speed));
      await advancing('numeric '+speed+' Enter actually restores simulation progress');
    }
    await speedNumber.fill('1');await speedNumber.press('Enter');

    // Real roll while the dock is already visible; click canvas to direct the
    // keyboard to the game, not an editor field. No positions/turns are injected.
    await page.evaluate(()=>{richman.randomQueue=[5.5/6];});await page.locator('#game').click();await page.keyboard.press('w');
    await page.waitForFunction(()=>richman.root.vars.xingqi===0&&[...richman.timers.keys()].some(id=>id!==richman.root.vars.shijian));
    const roll=await read();
    check('real dice starts movement while settings remain visible',roll.opened&&roll.sameGame&&roll.speed===1&&roll.turn[0]===1&&roll.turn[1]===0,roll);
    // Close/open during actual movement rather than only at a stable board.
    await close();const closingMove=await read();await open();const reopeningMove=await read();
    check('closing and reopening F2 during movement preserves active turn, game and speed',closingMove.sameGame&&reopeningMove.sameGame&&closingMove.speed===1&&reopeningMove.speed===1&&reopeningMove.turn[0]===1&&!reopeningMove.paused,{closingMove,reopeningMove});
    for(const speed of [2,5,20]){
      await page.locator('[data-speed="'+speed+'"]').click();
      check('UI '+speed+'x changes only user pacing while dock stays open',await page.evaluate(speed=>richmanControls.getSpeed()===speed&&richmanEditor.opened&&!richmanControls.getStatus().paused&&richman===window.__playbackGame,speed));
      await advancing('simulation and animation heartbeat continue at '+speed+'x');
    }

    // Native range input events from an actual pointer drag, not a direct call
    // to setSpeed or an event fabricated in page.evaluate.
    const slider=page.locator('[data-speed-range]'),box=await slider.boundingBox(),rangeBefore=await read();
    await page.mouse.move(box.x+box.width*0.9,box.y+box.height/2);await page.mouse.down();
    for(const ratio of [0.8,0.65,0.4,0.25,0.35,0.55,0.75,0.95]){
      await page.mouse.move(box.x+box.width*ratio,box.y+box.height/2,{steps:3});await page.waitForTimeout(25);
    }
    await page.mouse.up();const rangeAfter=await read();
    check('continuous speed-slider changes keep the page, clock and current game alive',rangeAfter.sameGame&&rangeAfter.speed>0&&rangeAfter.speed<=20&&rangeAfter.now>rangeBefore.now&&rangeAfter.heartbeat>rangeBefore.heartbeat&&!rangeAfter.paused,{rangeBefore,rangeAfter});
    await page.locator('[data-speed="20"]').click();
    // b6 starts at (254,1): six original steps end at the corner shop (554,1),
    // not at purchasable tile 6, which is one more step down the right edge.
    await page.waitForFunction(()=>richman.root.named.chaoshi?.alive===true,null,{timeout:6000});
    const destination=await read();
    check('unpaused dock reaches the original six-step corner without rerolling or losing the turn',destination.sameGame&&destination.speed===20&&destination.turn[0]===1&&destination.turn[1]===0&&destination.positions[0][0]===554&&destination.positions[0][1]===1&&await page.evaluate(()=>richman.root.vars.weizhi===0&&richman.randomQueue.length===0),destination);
    await close();const closed=await read();
    check('closing running settings retains 20x, corner-shop scene, position and unpaid resources',closed.sameGame&&closed.speed===20&&!closed.paused&&!closed.opened&&JSON.stringify(closed.positions)===JSON.stringify(destination.positions)&&JSON.stringify(closed.turn)===JSON.stringify(destination.turn)&&JSON.stringify(closed.cash)===JSON.stringify(destination.cash),{destination,closed});
    await advancing('closed game continues running at the selected 20x');

    // Only the user's explicit pause selects 0x. F2 cannot create or release it.
    await open();await page.locator('[data-speed="0"]').click();const zero=await read();
    await page.waitForTimeout(160);const zeroOpen=await read();
    check('explicit UI 0x manually pauses while settings stay open',zeroOpen.speed===0&&zeroOpen.paused&&zeroOpen.now===zero.now&&JSON.stringify(zeroOpen.positions)===JSON.stringify(zero.positions),{zero,zeroOpen});
    await close();await page.waitForTimeout(140);const zeroClosed=await read();
    check('closing settings cannot undo the user-selected 0x pause',zeroClosed.speed===0&&zeroClosed.paused&&zeroClosed.now===zero.now&&JSON.stringify(zeroClosed.turn)===JSON.stringify(zero.turn),zeroClosed);
    await open();await page.waitForTimeout(100);const zeroReopened=await read();
    check('reopening settings also preserves manual 0x and exact scene state',zeroReopened.speed===0&&zeroReopened.now===zero.now&&JSON.stringify(zeroReopened.positions)===JSON.stringify(zero.positions),zeroReopened);
    check('manual pause renders an explicit Continue action',/继续|恢复/.test(await page.locator('[data-pause-speed]').textContent()));
    await page.locator('[data-pause-speed]').click();
    check('clicking Continue restores prior positive 20x without closing settings',await page.evaluate(()=>richmanControls.getSpeed()===20&&richmanEditor.opened&&!richmanControls.getStatus().paused));
    await advancing('Continue actually resumes game time and rendered heartbeat');
    // The compact outside control is also an explicit user pause/resume pair.
    await close();await page.locator('.rm-editor-compact-speed').click();const compactPaused=await read();
    await page.waitForTimeout(100);check('compact Pause is a real user-selected 0x',compactPaused.speed===0&&await page.evaluate(now=>richman.now===now,compactPaused.now),compactPaused);
    await page.locator('.rm-editor-compact-speed').click();await advancing('compact Resume restores a live responsive game');
    const heartbeat=await page.evaluate(async()=>{
      const before={frames:__playbackHeartbeat.frames,time:richman.now,wall:performance.now()};
      await new Promise((resolve,reject)=>{
        const deadline=setTimeout(()=>reject(new Error('Rendered heartbeat deadline exceeded')),2000),target=__playbackHeartbeat.frames+4;
        function poll(){if(__playbackHeartbeat.frames>=target){clearTimeout(deadline);resolve();}else requestAnimationFrame(poll);}requestAnimationFrame(poll);
      });
      return {before,after:{frames:__playbackHeartbeat.frames,time:richman.now,wall:performance.now()}};
    });
    check('rendered heartbeat responds within deadline after repeated F2 and slider input',heartbeat.after.frames>=heartbeat.before.frames+4&&heartbeat.after.time>heartbeat.before.time&&heartbeat.after.wall-heartbeat.before.wall<2000,heartbeat);
    check('playback interactions never require a confirmation dialog',dialogs.length===0,dialogs);
    check('playback regression has no browser or runtime exceptions',errors.length===0&&await page.evaluate(()=>richman.errors.length===0&&!document.querySelector('#error').textContent),errors);
    report={pass:true,checks,browserErrors:errors,dialogs,fixtureScope:'Real 1x menu, F2, keyboard movement, speed buttons, pointer slider, explicit manual 0x pause/Continue and rendered heartbeats. Only a six-face dice result is controlled; no position/resource/turn injection or editor-pause mechanism. Not native Flash differential/full-game proof.'};return report;
  }catch(error){
    let runtimeState;try{runtimeState=await read();}catch(diagnosticError){runtimeState={diagnosticError:String(diagnosticError)};}
    report={pass:false,message:String(error?.message||error),checks,browserErrors:errors,dialogs,runtimeState};throw error;
  }finally{
    try{await page.evaluate(()=>localStorage.removeItem(window.richmanControls?.store.storageKey||'mini-richman.config.v1'));await page.reload();await ready();}
    catch(error){report={pass:false,message:'Playback verification cleanup failed: '+String(error?.message||error),checks,browserErrors:errors,dialogs,previousReport:report};throw error;}
    finally{try{if(report)await page.evaluate(value=>{window.__playbackVerification=value;},report);}finally{page.off('pageerror',onError);page.off('dialog',onDialog);}}
  }
}
