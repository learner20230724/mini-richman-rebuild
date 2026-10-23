/* Playwright CLI run-code helper. Reuse an already-open loopback game page.
 * Tests use real editor DOM, keyboard events and wall-clock pacing. Only a
 * single deterministic dice outcome is injected for the actual purchase test.
 * The game's own browser configuration key is cleared before and after testing.
 */
async(page)=>{
  const checks=[],errors=[];
  let report;
  const onError=e=>errors.push(String(e)),onDialog=dialog=>dialog.accept();
  page.on('pageerror',onError);page.on('dialog',onDialog);
  const check=(name,pass,detail)=>{checks.push({name,pass:!!pass,detail});if(!pass)throw new Error(name+': '+JSON.stringify(detail));};
  const ready=()=>page.waitForFunction(()=>!!window.richman&&!!window.richmanControls&&!!window.richmanEditor);
  const storeState=()=>page.evaluate(()=>({draft:richmanControls.store.current,active:richmanControls.store.active,stats:richmanControls.store.stats()}));
  const json=value=>JSON.stringify(value);
  const readTime=()=>page.evaluate(()=>({wall:performance.now(),game:richman.now}));
  async function pace(value){
    await page.evaluate(value=>richmanControls.setSpeed(value),value);
    await page.waitForTimeout(100);
    const before=await readTime();await page.waitForTimeout(400);const after=await readTime();
    // Samples may straddle different RAF phases. One capped 100 ms wall-clock
    // frame can appear at either edge, amplified by the selected target speed.
    return {wallMs:after.wall-before.wall,gameMs:after.game-before.game,target:value,samplingToleranceMs:value*100+20};
  }
  try{
    await page.reload();await ready();
    await page.evaluate(()=>localStorage.removeItem(richmanControls.store.storageKey));
    await page.reload();await ready();await page.setViewportSize({width:1280,height:720});
    check('editor defaults preserve original rules',json((await storeState()).active)==='{}');
    const at1=await pace(1);
    check('1x advances original fixed-step simulation in real wall time',at1.gameMs>=100&&at1.gameMs<=at1.wallMs+at1.samplingToleranceMs,at1);
    const at20=await pace(20);
    check('20x target advances faster without changing original tick length',at20.gameMs>=1000&&at20.gameMs<=at20.wallMs*20+at20.samplingToleranceMs&&at20.gameMs>at1.gameMs*2,at20);
    await page.evaluate(()=>richmanControls.setSpeed(0));
    const stopped=await page.evaluate(()=>({time:richman.now,x:richman.root.named.p1.proxy._x,selected:richman.root.vars.ppp1,frame:richman.root.frame}));
    await page.locator('#game').focus();await page.keyboard.press('d');await page.keyboard.press('w');await page.waitForTimeout(250);
    const still=await page.evaluate(()=>({time:richman.now,x:richman.root.named.p1.proxy._x,selected:richman.root.vars.ppp1,frame:richman.root.frame}));
    check('0x freezes simulation and game keyboard input',json(stopped)===json(still),{stopped,still});
    await page.keyboard.press('F2');
    // This regression intentionally exercises the optional manual-draft mode.
    // Default automatic live application is verified separately.
    await page.locator('[data-auto-apply]').uncheck();
    await page.waitForFunction(()=>richmanControls.getStatus().editorPaused===true);
    const beforeStep=await page.evaluate(()=>richman.now);await page.evaluate(()=>richmanControls.stepOnce());
    check('paused manual step advances exactly one original 20 ms tick',await page.evaluate(()=>richman.now)===beforeStep+20);
    await page.keyboard.press('F2');
    check('closing editor does not clear user 0x pause',await page.evaluate(()=>richmanControls.getSpeed()===0&&!richmanControls.getStatus().editorPaused));
    await page.evaluate(()=>richmanControls.setSpeed(1));await page.keyboard.press('F2');
    await page.waitForFunction(()=>richmanControls.getStatus().editorPaused===true);
    const editorTime=await page.evaluate(()=>richman.now);await page.waitForTimeout(200);
    check('F2 independently pauses a running game',await page.evaluate(()=>richman.now)===editorTime);
    const panel=page.locator('#rm-editor-panel');
    check('F2 opens the real editor panel',await panel.isVisible());
    for(const [width,height]of [[1280,720],[600,450]]){
      await page.setViewportSize({width,height});await page.waitForTimeout(100);
      const canvas=await page.locator('#game').boundingBox(),editor=await panel.boundingBox();
      const overlapWidth=Math.max(0,Math.min(canvas.x+canvas.width,editor.x+editor.width)-Math.max(canvas.x,editor.x));
      const overlapHeight=Math.max(0,Math.min(canvas.y+canvas.height,editor.y+editor.height)-Math.max(canvas.y,editor.y));
      check('editor reserves non-overlapping 4:3 game space '+width+'x'+height,
        Math.abs(canvas.width/canvas.height-4/3)<0.005&&canvas.width>150&&canvas.height>100&&canvas.x>=-0.5&&canvas.y>=-0.5&&canvas.x+canvas.width<=width+0.5&&canvas.y+canvas.height<=height+0.5&&overlapWidth*overlapHeight<1,
        {canvas,editor,overlapWidth,overlapHeight});
      await page.screenshot({path:'output/playwright/verified-editor-'+width+'x'+height+'.png'});
    }
    await page.setViewportSize({width:1280,height:720});
    await page.locator('[data-tab="characters"]').click();
    await page.locator('select[aria-label="选择角色"]').selectOption('b6');
    // Turn off the editor's own pause so this proves keyboard isolation rather
    // than relying accidentally on the fact that a paused game ignores input.
    await page.locator('[data-pause-editor]').uncheck();
    const menuBefore=await page.evaluate(()=>({x:richman.root.named.p1.proxy._x,selected:richman.root.vars.ppp1,frame:richman.root.frame}));
    const name=page.locator('input[data-field="characters.b6.name"]');
    await name.fill('');await name.pressSequentially('wads');
    const menuAfter=await page.evaluate(()=>({x:richman.root.named.p1.proxy._x,selected:richman.root.vars.ppp1,frame:richman.root.frame}));
    check('typing W/A/D/S into an editor input never reaches a running game',json(menuBefore)===json(menuAfter),{menuBefore,menuAfter});
    await name.fill('小镁');await page.locator('[data-pause-editor]').check();
    const activeBefore=json((await storeState()).active);
    const cash=page.locator('input[data-field="characters.b6.cash"]');
    await cash.fill('12000');await cash.fill('12100');await page.getByRole('button',{name:'撤销一项',exact:true}).click();
    check('draft undo restores the previous edit without applying',await page.evaluate(()=>richmanControls.store.get('characters','b6','cash')===12000&&JSON.stringify(richmanControls.store.active)==='{}'));
    await page.locator('[data-tab="properties"]').click();
    await page.locator('select[aria-label="选择地产"]').selectOption('1');
    await page.locator('input[data-field="properties.1.cash"]').fill('37');
    await page.locator('input[data-field="properties.1.diamonds"]').fill('0');
    const drafted=await storeState();
    check('12000 cash and 37/0 land prices remain an unapplied draft',json(drafted.active)===activeBefore&&drafted.draft.characters.b6.cash===12000&&drafted.draft.properties['1'].cash===37&&drafted.draft.properties['1'].diamonds===0&&drafted.stats.draftChanged===3,drafted);
    await page.locator('[data-restart-config]').click();
    check('explicit restart creates a fresh menu with the selected active rules',await page.evaluate(()=>richman.root.frame===1&&richman.now===0&&richmanControls.store.active.characters.b6.cash===12000&&richmanControls.store.stats().draftChanged===0));
    await page.keyboard.press('F2');await page.locator('#game').focus();await page.evaluate(()=>richmanControls.setSpeed(20));
    for(let i=0;i<4;i++)await page.keyboard.press('d');
    await page.keyboard.press('w');await page.keyboard.press('ArrowUp');
    await page.waitForFunction(()=>richman.root.frame===2);
    check('real keyboard starts configured b6/b2 game',await page.evaluate(()=>richman.root.vars.ppp1==='b6'&&richman.root.vars.ppp2==='b2'&&richman.root.vars.xianjin1===12000));
    // Controlled dice value only. No cash, position, owner or turn injection.
    await page.evaluate(()=>{richman.randomQueue=[0.1];});await page.keyboard.press('w');
    await page.waitForFunction(()=>richman.root.named.maidi?.alive===true);
    check('configured land price appears in the real original purchase popup',await page.evaluate(()=>richman.root.vars.wenben==='买地：37元，0钻石？'));
    await page.keyboard.press('w');
    const purchase=await page.evaluate(()=>({cash:richman.root.vars.xianjin1,diamonds:richman.root.vars.zuanshi1,owners:richman.root.vars.shuyu.slice(1,6),turn:richman.root.vars.shui}));
    check('configured purchase actually debits 37 cash and 0 diamonds for the whole band',purchase.cash===11963&&purchase.diamonds===3&&purchase.owners.every(owner=>owner===1)&&purchase.turn===2,purchase);
    await page.screenshot({path:'output/playwright/verified-editor-purchase.png'});
    await page.keyboard.press('F2');await page.locator('[data-tab="sandbox"]').click();
    await page.waitForFunction(()=>richmanControls.getStatus().canEdit===true);
    await page.locator('select[aria-label="本局玩家"]').selectOption('1');
    await page.locator('input[data-sandbox-field="cash"]').fill('13000');
    await page.getByRole('button',{name:'修改本局玩家数值',exact:true}).click();
    check('explicit sandbox UI changes live cash without changing active or draft rules',await page.evaluate(()=>richman.root.vars.xianjin1===13000&&richmanControls.getStatus().players[0].cash===13000&&richmanControls.store.active.characters.b6.cash===12000&&richmanControls.store.current.characters.b6.cash===12000));
    await page.locator('select[aria-label="本局地产编号"]').selectOption('2');
    await page.locator('select[aria-label="本局地产所有者"]').selectOption('2');
    await page.locator('select[aria-label="本局建筑等级"]').selectOption('2');
    await page.getByRole('button',{name:'修改本局这块地产',exact:true}).click();
    check('explicit sandbox property UI updates ownership, building display and statistics coherently',await page.evaluate(()=>{
      const root=richman.root,v=root.vars,owner=root.children.get(16384+2),building=root.children.get(16384+52),tile=richmanControls.getStatus().properties.find(p=>p.id===2);
      return v.shuyu[2]===2&&v.jibie[2]===2&&v.f22===1&&tile.owner===2&&tile.level===2&&owner?.id===RichmanData.exports.b2&&building?.id===RichmanData.exports.f2&&richmanControls.store.active.properties['1'].cash===37;
    }));
    await page.screenshot({path:'output/playwright/verified-editor-sandbox.png'});
    await page.locator('[data-save-active]').click();
    check('explicit save writes applied rules rather than game progress',await page.evaluate(()=>{
      const saved=JSON.parse(localStorage.getItem(richmanControls.store.storageKey));
      return saved.activeOverrides.characters.b6.cash===12000&&saved.activeOverrides.properties['1'].cash===37&&!Object.hasOwn(saved,'game')&&!Object.hasOwn(saved,'turn');
    }));
    await page.reload();await ready();
    check('saved rules reload into a fresh game, not a saved in-progress match',await page.evaluate(()=>richman.root.frame===1&&richmanControls.store.active.characters.b6.cash===12000&&richmanControls.store.active.properties['1'].cash===37&&richmanControls.store.stats().unsavedChanges===0));
    await page.keyboard.press('F2');await page.locator('[data-auto-apply]').uncheck();await page.locator('[data-tab="characters"]').click();
    await page.locator('select[aria-label="选择角色"]').selectOption('b6');
    await page.locator('input[data-field="characters.b6.cash"]').fill('12500');
    await page.locator('.rm-editor-presets > summary').click();
    await page.locator('input[aria-label="预设名称"]').fill('Browser verification');
    await page.getByRole('button',{name:'保存命名草稿',exact:true}).click();
    check('named preset saves only draft rules and does not apply them',await page.evaluate(()=>richmanControls.store.listPresets().some(p=>p.name==='Browser verification'&&p.overrides.characters.b6.cash===12500)&&richmanControls.store.active.characters.b6.cash===12000));
    await page.locator('input[data-field="characters.b6.cash"]').fill('13000');
    await page.locator('select[aria-label="命名预设"]').selectOption('');
    await page.locator('select[aria-label="命名预设"]').selectOption('Browser verification');
    check('loading a named preset replaces only the draft',await page.evaluate(()=>richmanControls.store.get('characters','b6','cash')===12500&&richmanControls.store.active.characters.b6.cash===12000));
    const pendingDownload=page.waitForEvent('download');
    await page.getByRole('button',{name:'导出草稿 JSON',exact:true}).click();
    const download=await pendingDownload,stream=await download.createReadStream();let exported='';
    for await(const chunk of stream)exported+=chunk.toString();
    const exportedConfig=JSON.parse(exported);
    check('JSON export downloads the actual unapplied draft',exportedConfig.schemaVersion===1&&exportedConfig.overrides.characters.b6.cash===12500&&exportedConfig.overrides.properties['1'].cash===37,exportedConfig);
    const beforeInvalid=await storeState();
    const importFile=page.locator('.rm-editor-file');
    await importFile.setInputFiles({name:'invalid-verification.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({schemaVersion:1,overrides:{characters:{b6:{cash:14000}},properties:{'1':{cash:-1}}}}))});
    await page.waitForFunction(()=>document.querySelector('.rm-editor-message').getAttribute('role')==='alert');
    const afterInvalid=await storeState();
    check('invalid JSON import is rejected atomically without partial draft or active changes',json(beforeInvalid.draft)===json(afterInvalid.draft)&&json(beforeInvalid.active)===json(afterInvalid.active),{beforeInvalid,afterInvalid});
    await importFile.setInputFiles({name:'valid-verification.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({schemaVersion:1,overrides:{characters:{b6:{cash:13500}},properties:{'1':{cash:37,diamonds:0}}}}))});
    await page.waitForFunction(()=>richmanControls.store.current.characters?.b6?.cash===13500);
    check('valid JSON import replaces only the draft and does not apply or save',await page.evaluate(()=>richmanControls.store.active.characters.b6.cash===12000&&JSON.parse(localStorage.getItem(richmanControls.store.storageKey)).activeOverrides.characters.b6.cash===12000));
    await page.locator('select[aria-label="命名预设"]').selectOption('Browser verification');
    await page.getByRole('button',{name:'删除命名预设',exact:true}).click();
    check('named preset deletion does not modify the current game',await page.evaluate(()=>richmanControls.store.listPresets().length===0&&richmanControls.store.active.characters.b6.cash===12000));
    await page.locator('.rm-editor-reset > summary').click();
    await page.getByRole('button',{name:'草稿恢复原版',exact:true}).click();
    check('restoring original defaults resets only the draft until apply',await page.evaluate(()=>JSON.stringify(richmanControls.store.current)==='{}'&&richmanControls.store.active.characters.b6.cash===12000));
    await page.locator('[data-restart-config]').click();await page.locator('[data-save-active]').click();
    check('explicitly restarting with restored defaults returns active rules to original',await page.evaluate(()=>JSON.stringify(richmanControls.store.active)==='{}'&&richman.root.frame===1));
    await page.evaluate(()=>localStorage.removeItem(richmanControls.store.storageKey));await page.reload();await ready();
    check('verification finishes with clean original configuration and default 1x',await page.evaluate(()=>JSON.stringify(richmanControls.store.current)==='{}'&&JSON.stringify(richmanControls.store.active)==='{}'&&richmanControls.getSpeed()===1&&localStorage.getItem(richmanControls.store.storageKey)===null));
    check('no game or browser errors during editor verification',errors.length===0&&await page.evaluate(()=>richman.errors.length===0&&document.querySelector('#error').textContent===''),errors);
    report={pass:true,checks,fixtureScope:'Real editor controls, keyboard and wall-clock pacing; not native Flash differential or rendered full-game completion.',browserErrors:errors};
    return report;
  }catch(error){
    report={pass:false,message:String(error?.message||error),checks,browserErrors:errors};
    throw error;
  }finally{
    try{
      await page.evaluate(()=>localStorage.removeItem(window.richmanControls?.store.storageKey||'mini-richman.config.v1'));await page.reload();await ready();
    }catch(error){
      report={pass:false,message:'Verification cleanup failed: '+String(error?.message||error),checks,browserErrors:errors,previousReport:report};
      throw error;
    }finally{
      try{if(report)await page.evaluate(value=>{window.__editorVerification=value;},report);}
      finally{page.off('pageerror',onError);page.off('dialog',onDialog);}
    }
  }
}
