/* Playwright CLI run-code helper; root opens the built game's loopback page.
 * Real DOM changes / blur commits, real menu and keyboard transactions.
 * Explicit fixtures: queued dice outcomes; later position/turn arrangements;
 * property ownership via the public sandbox; explicit manual 0x pauses solely
 * for exact-state/timer-phase assertions. F2 itself must never pause the game.
 * Never reconstructs a game to make a transaction pass. This is not native
 * Flash differential/full-game proof; browser-playback covers running editing.
 */
async(page)=>{
  const checks=[],errors=[],dialogs=[];
  let report,dialogPolicy='accept',fixtureResumeSpeed=20;
  const onError=error=>errors.push(String(error));
  const onDialog=dialog=>{dialogs.push({type:dialog.type(),message:dialog.message()});return dialogPolicy==='dismiss'?dialog.dismiss():dialog.accept();};
  page.on('pageerror',onError);page.on('dialog',onDialog);
  const check=(name,pass,detail)=>{checks.push({name,pass:!!pass,detail});if(!pass)throw new Error(name+': '+JSON.stringify(detail));};
  const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
  const ready=()=>page.waitForFunction(()=>!!window.richman&&!!window.richmanControls&&!!window.richmanEditor);
  const opened=()=>page.evaluate(()=>richmanEditor.opened);
  async function open(){
    // Explicit test-user pause, not an editor-open side effect: exact snapshots
    // need a stopped clock while browser-playback separately verifies live F2.
    const current=await page.evaluate(()=>richmanControls.getSpeed());if(current>0)fixtureResumeSpeed=current;
    await page.evaluate(()=>richmanControls.setSpeed(0));
    if(!await opened())await page.keyboard.press('F2');await page.waitForFunction(()=>richmanEditor.opened);
  }
  async function close(speed=fixtureResumeSpeed){
    if(await opened())await page.keyboard.press('F2');
    fixtureResumeSpeed=speed;await page.evaluate(speed=>richmanControls.setSpeed(speed),speed);
    await page.locator('#game').focus();
  }
  async function tab(name){await open();await page.locator('[data-tab="'+name+'"]').click();}
  async function commit(key,value){
    // DOM paths include the numbers group; readable fixture callers use rules.*.
    const path=key.startsWith('rules.')?'numbers.'+key:key;
    const input=page.locator('input[data-field="'+path+'"]');await input.fill(String(value));await input.press('Tab');
  }
  const snapshot=()=>page.evaluate(()=>{
    const v=richman.root.vars;
    return {sameGame:richman===window.__liveGame,frame:richman.root.frame,now:richman.now,
      positions:[1,2].map(p=>richman.root.named['renwu'+p]?.matrix.slice(4)),turn:[v.shui,v.xingqi,v.pp],
      owners:v.shuyu?.slice(),levels:v.jibie?.slice(),cash:[v.xianjin1,v.xianjin2],diamonds:[v.zuanshi1,v.zuanshi2]};
  });
  const stable=()=>page.waitForFunction(()=>richmanControls.getStatus().canEdit===true);
  // Controlled later-turn fixture: use unchanged runtime, retain resources,
  // timers, buildings and logic; only place the selected player before a roll.
  async function arrange(player,x,y){
    await open();await stable();
    await page.evaluate(({player,x,y})=>{
      const v=richman.root.vars;v.shui=player;v.xingqi=player;v.pp=player+'P';
      richman.root.named['renwu'+player].proxy._x=x;richman.root.named['renwu'+player].proxy._y=y;
    },{player,x,y});
  }
  async function dice(player,face=1){
    await page.evaluate(face=>{richman.randomQueue=[(face-0.5)/6];},face);
    await close(20);await page.keyboard.press(player===1?'w':'ArrowUp');
  }
  async function sandboxProperty(id,owner,level){
    await open();await stable();
    await page.evaluate(payload=>richmanControls.sandbox('property',payload),{id,owner,level});
  }
  const liveStatus=()=>page.evaluate(()=>({live:richmanControls.getStatus().liveSettings,
    text:document.querySelector('[data-live-status]')?.textContent||'',
    active:richmanControls.store.active,draft:richmanControls.store.current}));
  try{
    await page.reload();await ready();
    await page.evaluate(()=>localStorage.removeItem(richmanControls.store.storageKey));
    await page.reload();await ready();await page.setViewportSize({width:1280,height:720});
    check('live verification starts with unchanged original rules',await page.evaluate(()=>JSON.stringify(richmanControls.store.active)==='{}'&&richmanControls.getSpeed()===1));
    await page.evaluate(()=>richmanControls.setSpeed(20));await page.locator('#game').focus();
    for(let i=0;i<4;i++)await page.keyboard.press('d');
    await page.keyboard.press('w');await page.keyboard.press('ArrowUp');
    await page.waitForFunction(()=>richman.root.frame===2);await open();await stable();
    await page.evaluate(()=>{window.__liveGame=richman;});
    check('real keyboard selects b6/b2 before any live update',await page.evaluate(()=>richman.root.vars.ppp1==='b6'&&richman.root.vars.ppp2==='b2'));
    check('automatic change commit defaults to enabled',await page.locator('[data-auto-apply]').isChecked());
    const initial=await snapshot(),initialDialogs=dialogs.length;
    await tab('characters');await page.locator('select[aria-label="选择角色"]').selectOption('b6');
    await commit('characters.b6.cash',12000);await commit('characters.b6.bankBonus',555);
    await commit('characters.b6.overdraft',888);await commit('characters.b6.taxPercent',27);
    const changed=await snapshot();
    check('blur-committed character edits update the live selected player without replacing the game',changed.sameGame&&changed.cash[0]===12000&&await page.evaluate(()=>richman.root.vars.jiangjin1===555&&richman.root.vars.touzhi1===888&&richman.root.vars.shuilv1===27),changed);
    check('live character updates preserve board frame, clock, positions, turn and ownership',initial.frame===changed.frame&&initial.now===changed.now&&same(initial.positions,changed.positions)&&same(initial.turn,changed.turn)&&same(initial.owners,changed.owners)&&same(initial.levels,changed.levels),{initial,changed});
    check('automatic live apply does not show a restart confirmation',dialogs.length===initialDialogs,dialogs);
    await tab('building');await commit('rules.houseCash',321);
    const buildingApplied=await snapshot();
    check('global house-cost edit does not restore character starting cash or restart',buildingApplied.sameGame&&buildingApplied.cash[0]===12000&&buildingApplied.now===changed.now&&await page.evaluate(()=>richman.options.settings.number('rules.houseCash')===321),buildingApplied);
    await tab('properties');await page.locator('select[aria-label="选择地产"]').selectOption('1');
    await commit('properties.1.cash',37);await commit('properties.1.diamonds',0);
    check('37/0 property price is applied on the existing board before the first roll',await page.evaluate(()=>richman===window.__liveGame&&richman.root.vars.xianjin[1]===37&&richman.root.vars.zuanshi[1]===0&&richmanControls.store.active.properties['1'].cash===37&&richmanControls.store.active.properties['1'].diamonds===0));
    await dice(1);await page.waitForFunction(()=>richman.root.named.maidi?.alive===true);
    check('live property price appears in the original purchase popup',await page.evaluate(()=>richman.root.vars.wenben==='买地：37元，0钻石？'));
    await page.keyboard.press('w');await stable();
    const purchase=await snapshot();
    check('real keyboard purchase debits 37/0 and grants the complete original band',purchase.sameGame&&purchase.cash[0]===11963&&purchase.diamonds[0]===3&&purchase.owners.slice(1,6).every(owner=>owner===1),purchase);

    // Earn an actual source-rule bank reward, then change an unrelated rule.
    await arrange(1,201,5);const bankBefore=(await snapshot()).cash[0];
    await dice(1);await stable();await open();const bankAfter=await snapshot();
    check('live bank bonus is used by the next original bank-crossing action',bankAfter.cash[0]===bankBefore+555&&bankAfter.sameGame,{bankBefore,bankAfter});
    await tab('building');const earned=await snapshot();await commit('rules.houseCash',322);
    check('later unrelated changes preserve already earned and spent cash',await page.evaluate(cash=>richman===window.__liveGame&&richman.root.vars.xianjin1===cash&&richman.options.settings.number('rules.houseCash')===322,earned.cash[0]),earned);

    // Controlled position and public-sandbox ownership; original dice/build handler.
    await sandboxProperty(1,1,0);await arrange(1,254,1);const buildBefore=(await snapshot()).cash[0];
    await dice(1);await page.waitForFunction(()=>richman.root.named.jianfang?.alive===true);await page.keyboard.press('w');await stable();await open();
    const built=await snapshot();check('next real house purchase uses hot-updated 322 cost',built.sameGame&&built.cash[0]===buildBefore-322&&built.levels[1]===1,{buildBefore,built});
    await tab('building');await commit('rules.rentHouse',133);
    await arrange(2,254,1);const rentBefore=await snapshot();await dice(2);await stable();await open();const rented=await snapshot();
    check('next original rent event uses hot-updated rent and live owner tax',rented.sameGame&&rented.cash[1]===rentBefore.cash[1]-133&&Math.abs(rented.cash[0]-(rentBefore.cash[0]+133*0.73))<1e-7,{rentBefore,rented});
    await tab('shop');await commit('rules.shopStarCash',123);
    // One original step reaches the top-right corner and opens its real shop.
    await arrange(1,501,1);const shopBefore=await snapshot();
    await dice(1);await page.waitForFunction(()=>richman.root.named.chaoshi?.alive===true);
    const starsBefore=await page.evaluate(()=>richman.root.vars.wuxing1);
    await page.keyboard.press('d');await page.keyboard.press('w');await stable();await open();const shopped=await snapshot();
    check('next real corner-shop purchase uses hot-updated item cost',shopped.sameGame&&shopped.cash[0]===shopBefore.cash[0]-123&&await page.evaluate(stars=>richman.root.vars.wuxing1===stars+1,starsBefore),{shopBefore,shopped,starsBefore});

    // Start a real three-cell move, pause after ~200 simulated milliseconds,
    // then change only the named period. Verify timer phase and no new roll.
    await arrange(1,254,1);await page.evaluate(()=>{richman.randomQueue=[2.5/6];});
    await close(1);await page.keyboard.press('w');
    await page.waitForFunction(()=>{
      const timer=[...richman.timers].find(([id])=>id!==richman.root.vars.shijian)?.[1];
      return richman.root.vars.xingqi===0&&timer&&timer.next-richman.now<=500&&timer.next-richman.now>100;
    });await open();
    const movingBefore=await page.evaluate(()=>{
      const [id,t]=[...richman.timers].find(([id])=>id!==richman.root.vars.shijian);
      return {id,ms:t.ms,remaining:t.next-richman.now,now:richman.now,position:richman.root.named.renwu1.matrix.slice(4),dice:richman.root.named.shaizi.frame,random:richman.randomQueue.slice(),turn:richman.root.vars.shui};
    });
    await tab('advanced');await commit('rules.stepMilliseconds',1400);
    const movingAfter=await page.evaluate(id=>{
      const t=richman.timers.get(id);
      return {sameGame:richman===window.__liveGame,ms:t?.ms,remaining:t?.next-richman.now,now:richman.now,position:richman.root.named.renwu1.matrix.slice(4),dice:richman.root.named.shaizi.frame,random:richman.randomQueue.slice(),turn:richman.root.vars.shui};
    },movingBefore.id);
    check('moving 700-to-1400 ms edit preserves remaining timer progress',movingAfter.sameGame&&movingBefore.ms===700&&movingAfter.ms===1400&&Math.abs(movingAfter.remaining-movingBefore.remaining*2)<0.001,{movingBefore,movingAfter});
    check('movement timing update never jumps a cell, rerolls, resets time or changes turn',movingAfter.now===movingBefore.now&&same(movingAfter.position,movingBefore.position)&&movingAfter.dice===movingBefore.dice&&same(movingAfter.random,movingBefore.random)&&movingAfter.turn===movingBefore.turn,{movingBefore,movingAfter});
    await close(20);
    await page.waitForFunction(()=>richman.root.named.jianfang?.alive===true);await page.keyboard.press('s');
    // Original b6 owns mines: declining a house offers planting a mine next.
    // Decline that real second dialog instead of changing inventory or rules.
    if(await page.evaluate(()=>richman.root.named.fanglei?.alive===true))await page.keyboard.press('s');
    await stable();await open();

    // A real purchase popup is an atomic old-rule transaction. Multiple edits
    // queue as a full candidate and are promoted only after it has settled.
    await arrange(1,551,1);const queuedCash=(await snapshot()).cash[0];
    await dice(1);await page.waitForFunction(()=>richman.root.named.maidi?.alive===true);await open();
    const queuedBefore=await snapshot();
    await tab('properties');await page.locator('select[aria-label="选择地产"]').selectOption('6');
    await commit('properties.6.cash',73);await commit('properties.6.diamonds',0);
    await tab('building');await commit('rules.houseCash',777);
    const queued=await liveStatus();
    check('popup edits show pending safe-point status instead of replacing transaction values',!!queued.live?.pending&&/待|排队|pending|safe/i.test(queued.text)&&await page.evaluate(()=>richman.root.vars.xianjin[6]===300&&richman.root.vars.zuanshi[6]===1&&richman.options.settings.number('rules.houseCash')===322),queued);
    check('queued full candidate is a draft while active rules remain the old complete set',queued.draft.properties['6'].cash===73&&queued.draft.properties['6'].diamonds===0&&queued.draft.numbers['rules.houseCash']===777&&queued.active.properties?.['6']===undefined&&queued.active.numbers['rules.houseCash']===322,queued);
    const duringQueue=await snapshot();check('queueing leaves popup scene, clock, positions and turn intact',duringQueue.sameGame&&duringQueue.now===queuedBefore.now&&same(duringQueue.positions,queuedBefore.positions)&&same(duringQueue.turn,queuedBefore.turn),{queuedBefore,duringQueue});
    await close();await page.keyboard.press('w');
    await page.waitForFunction(()=>!richmanControls.getStatus().liveSettings?.pending&&richmanControls.store.active.properties?.['6']?.cash===73);await stable();await open();
    const settled=await snapshot(),settledStatus=await liveStatus();
    check('current purchase settles with old 300 cash / 1 diamond before queued rules apply',settled.sameGame&&settled.cash[0]===queuedCash-300&&settled.diamonds[0]===queuedBefore.diamonds[0]-1&&settled.owners[6]===1&&settled.owners[7]===1,{queuedCash,queuedBefore,settled});
    check('safe-point promotion atomically aligns active, board prices, global rule and UI status',!settledStatus.live?.pending&&settledStatus.active.properties['6'].cash===73&&settledStatus.active.properties['6'].diamonds===0&&settledStatus.active.numbers['rules.houseCash']===777&&await page.evaluate(()=>richman.root.vars.xianjin[6]===73&&richman.root.vars.zuanshi[6]===0&&richman.options.settings.number('rules.houseCash')===777)&&!/待安全|排队中|queued/i.test(settledStatus.text),settledStatus);
    await sandboxProperty(6,0,0);await sandboxProperty(7,0,0);await arrange(1,551,1);
    const nextBefore=await snapshot();await dice(1);await page.waitForFunction(()=>richman.root.named.maidi?.alive===true);await page.keyboard.press('w');await stable();await open();const nextAfter=await snapshot();
    check('next actual purchase uses newly promoted 73 cash / 0 diamond rules',nextAfter.sameGame&&nextAfter.cash[0]===nextBefore.cash[0]-73&&nextAfter.diamonds[0]===nextBefore.diamonds[0],{nextBefore,nextAfter});

    // Main Apply is not a Restart. Explicit Restart retains its confirmation.
    const beforeApply=await snapshot(),dialogsBeforeApply=dialogs.length;
    await page.locator('[data-apply-config]').click();const afterApply=await snapshot();
    check('explicit live Apply neither confirms nor rebuilds an already running board',dialogs.length===dialogsBeforeApply&&afterApply.sameGame&&same(beforeApply,afterApply),{beforeApply,afterApply,dialogs});
    dialogPolicy='dismiss';const dialogsBeforeRestart=dialogs.length;
    await page.locator('[data-restart-config]').click();
    check('manual restart is separate and still asks for confirmation',dialogs.length===dialogsBeforeRestart+1&&dialogs.at(-1).type==='confirm'&&await page.evaluate(()=>richman===window.__liveGame&&richman.root.frame===2),dialogs.at(-1));dialogPolicy='accept';
    const speedInput=page.locator('[data-speed-number]');
    for(const value of [0,0.1,1,20]){
      await speedInput.fill(String(value));await speedInput.press('Tab');
      check('live-update editor retains real '+value+'x speed control',await page.evaluate(value=>richmanControls.getSpeed()===value,value));
    }
    await page.locator('[data-speed="0"]').click();await close(0);
    const pausedTime=await page.evaluate(()=>richman.now);await page.keyboard.press('w');await page.waitForTimeout(120);
    check('0x still freezes time and gameplay keys after live updates',await page.evaluate(time=>richman.now===time,pausedTime));
    check('all automatic and explicit live applications ran without confirmation',dialogs.filter(dialog=>dialog.type==='confirm').length===1,dialogs);
    check('live update verification has no browser/runtime errors',errors.length===0&&await page.evaluate(()=>richman.errors.length===0&&!document.querySelector('#error').textContent),errors);
    report={pass:true,checks,browserErrors:errors,dialogs,fixtureScope:'Real editor change/blur controls, menu and original keyboard transactions. Exact-state assertions explicitly use manual user 0x pauses, never an F2 editor pause; browser-playback independently tests editing while running. Later controlled turn/position, public-sandbox ownership and seeded-dice fixtures. No game reconstruction during assertions; not native Flash differential/full-game proof.'};
    return report;
  }catch(error){
    let runtimeState;
    try{runtimeState=await page.evaluate(()=>{
      const game=window.richman,root=game?.root,v=root?.vars||{},popup=root?.children.get(16384+88);
      return {frame:root?.frame,now:game?.now,sameGame:game===window.__liveGame,
        turn:{shui:v.shui,xingqi:v.xingqi,pp:v.pp,weizhi:v.weizhi,tanchu:v.tanchu},
        popup:popup?{id:popup.id,name:popup.name,alive:popup.alive,exports:Object.entries(game.data.exports).filter(([,id])=>id===popup.id).map(([name])=>name)}:null,
        positions:[1,2].map(p=>root?.named['renwu'+p]?.matrix.slice(4)),
        timers:game?[...game.timers].map(([id,t])=>({id,ms:t.ms,next:t.next,remaining:t.next-game.now})):[],
        status:window.richmanControls?.getStatus(),message:document.querySelector('.rm-editor-message')?.textContent};
    });}catch(diagnosticError){runtimeState={diagnosticError:String(diagnosticError)};}
    report={pass:false,message:String(error?.message||error),checks,browserErrors:errors,dialogs,runtimeState};throw error;
  }finally{
    try{
      await page.evaluate(()=>localStorage.removeItem(window.richmanControls?.store.storageKey||'mini-richman.config.v1'));
      await page.reload();await ready();
    }catch(error){report={pass:false,message:'Live verification cleanup failed: '+String(error?.message||error),checks,browserErrors:errors,dialogs,previousReport:report};throw error;}
    finally{
      try{if(report)await page.evaluate(value=>{window.__liveVerification=value;},report);}
      finally{page.off('pageerror',onError);page.off('dialog',onDialog);}
    }
  }
}
