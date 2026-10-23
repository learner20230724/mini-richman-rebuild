/* Browser regression checks for editor focus, navigation and failure feedback. */
async(page)=>{
  const checks=[],check=(name,pass,detail)=>{checks.push({name,pass:!!pass,detail});if(!pass)throw new Error(name+': '+JSON.stringify(detail));};
  await page.reload();await page.waitForFunction(()=>!!window.richmanEditor);
  await page.getByRole('button',{name:'⚙ 设置',exact:true}).click();
  await page.getByRole('button',{name:'关闭 · Esc',exact:true}).click();
  check('mouse-opened editor returns focus to game',await page.locator('#game').evaluate(e=>document.activeElement===e));
  await page.keyboard.press('d');check('keyboard works immediately after mouse editor close',await page.evaluate(()=>richman.root.named.p1.proxy._x===190));
  await page.locator('.rm-editor-compact-speed').click();const before=await page.evaluate(()=>richman.now);
  await page.keyboard.press('d');await page.waitForTimeout(100);
  check('compact pause freezes time and keys',await page.evaluate(before=>richman.now===before&&richman.root.named.p1.proxy._x===190,before));
  await page.locator('.rm-editor-compact-speed').click();await page.keyboard.press('d');
  check('compact resume returns focus and game keys',await page.evaluate(()=>document.activeElement.id==='game'&&richman.root.named.p1.proxy._x===260));
  await page.keyboard.press('F2');
  for(const [width,height]of [[1280,720],[600,450]]){
    await page.setViewportSize({width,height});const box=await page.locator('#game').boundingBox();
    await page.mouse.click(box.x+box.width*.7,box.y+box.height*.3);
    const p=await page.evaluate(()=>richman.pointer);check('pointer maps with editor open '+width,Math.abs(p.x-420)<1&&Math.abs(p.y-135)<1,p);
  }
  await page.setViewportSize({width:1280,height:720});
  await page.getByRole('tab',{name:'本局沙盒',exact:true}).focus();await page.keyboard.press('ArrowRight');
  check('tab arrows navigate within editor',await page.getByRole('tab',{name:'角色',exact:true}).getAttribute('aria-selected')==='true');
  await page.getByRole('tab',{name:'时间 / 高级',exact:true}).click();
  await page.getByRole('checkbox',{name:'我了解风险，显示源数字编辑器',exact:true}).check();
  check('advanced numbers are paginated not a 2277-input dump',await page.locator('.rm-editor-advanced-results [data-field]').count()===24);
  await page.getByRole('searchbox',{name:'搜索源数字',exact:true}).fill('src.s0.l2.n1');
  check('advanced source keys can be searched',await page.locator('.rm-editor-advanced-results [data-field]').count()===1);
  const original=await page.evaluate(()=>richmanControls.getSpeed());const number=page.locator('[data-speed-number]');await number.fill('1.05');await number.blur();
  check('non-tenth speed is rejected without changing target',await page.evaluate(original=>richmanControls.getSpeed()===original,original)&&await page.locator('.rm-editor-message').getAttribute('role')==='alert');
  await page.evaluate(()=>{richmanControls.store.storage={setItem(){throw new Error('verification quota');}};});
  await page.locator('[data-save-active]').click();
  check('browser save failure is visible and never claims success',await page.locator('.rm-editor-message').getAttribute('role')==='alert'&&(await page.locator('.rm-editor-message').textContent()).includes('无法保存到本机'));
  await page.screenshot({path:'output/playwright/verified-editor-advanced.png'});
  await page.reload();await page.waitForFunction(()=>!!window.richmanEditor);
  return {pass:true,checks,scope:'Real game-control focus, open-panel pointer mapping, advanced UI and explicit storage failure fixture.'};
}
