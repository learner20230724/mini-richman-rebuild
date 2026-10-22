/* Playwright CLI run-code helper. No @playwright/test dependency.
 * Browser software must already be open at the target build's loopback URL.
 * State injection below is explicitly controlled fixture setup, never reported
 * as natural original-game parity or a natural rendered full-game completion.
 */
async (page) => {
  const checks=[],errors=[];
  page.on('pageerror',e=>errors.push(String(e)));
  const check=(name,condition,detail)=>{checks.push({name,pass:!!condition,detail});if(!condition)throw new Error(name+': '+JSON.stringify(detail));};
  await page.reload();await page.waitForFunction(()=>!!window.richman);
  check('game-only document',await page.locator('canvas').count()===1&&(await page.locator('body > :not(canvas):not(script):not(pre)').count())===0);
  for(const [width,height]of [[600,450],[1280,720],[1920,1080]]){
    await page.setViewportSize({width,height});await page.waitForTimeout(100);
    const b=await page.locator('canvas').boundingBox();
    check('aspect and bounds '+width+'x'+height,Math.abs(b.width/b.height-4/3)<0.005&&b.x>=-0.5&&b.y>=-0.5&&b.x+b.width<=width+0.5&&b.y+b.height<=height+0.5,b);
    await page.mouse.click(b.x+b.width*0.7,b.y+b.height*0.3);
    const p=await page.evaluate(()=>richman.pointer);check('scaled pointer '+width+'x'+height,Math.abs(p.x-420)<1&&Math.abs(p.y-135)<1,p);
  }
  await page.keyboard.press('Alt+Enter');await page.waitForTimeout(100);
  check('fullscreen enters',await page.evaluate(()=>!!document.fullscreenElement));
  await page.keyboard.press('Alt+Enter');await page.waitForTimeout(100);
  check('fullscreen exits',await page.evaluate(()=>!document.fullscreenElement));
  await page.setViewportSize({width:1280,height:720});
  for(let i=0;i<4;i++)await page.keyboard.press('d');
  await page.keyboard.press('w');await page.keyboard.press('ArrowUp');
  await page.waitForFunction(()=>richman.root.frame===2);
  check('real menu selects b6/b2',await page.evaluate(()=>richman.root.vars.ppp1==='b6'&&richman.root.vars.ppp2==='b2'));
  await page.screenshot({path:'output/playwright/verified-board.png'});
  // Controlled dice value only; actual movement timer, popup, keyboard and debit.
  await page.evaluate(()=>{richman.randomQueue=[0.1];});await page.keyboard.press('w');
  await page.waitForFunction(()=>richman.root.vars.tanchu===1);
  check('purchase popup visible',await page.evaluate(()=>richman.root.named.maidi?.alive===true));
  await page.screenshot({path:'output/playwright/verified-purchase.png'});
  await page.keyboard.press('w');
  const purchase=await page.evaluate(()=>({cash:richman.root.vars.xianjin1,diamonds:richman.root.vars.zuanshi1,owners:richman.root.vars.shuyu.slice(1,6),turn:richman.root.vars.shui}));
  check('real keyboard purchase changes whole band',purchase.cash===1600&&purchase.diamonds===0&&purchase.owners.every(x=>x===1)&&purchase.turn===2,purchase);
  // Controlled bankruptcy setup, not a natural full-game victory claim.
  await page.evaluate(()=>{const v=richman.root.vars;v.xianjin2=-50;v.touzhi2=0;v.jibie[1]=1;richman.root.named.renwu2.proxy._x=258;richman.root.named.renwu2.proxy._y=1;richman.randomQueue=[0.1];});
  await page.keyboard.press('ArrowUp');await page.waitForFunction(()=>richman.root.frame===3);
  check('winner scene from real rent handler',await page.evaluate(()=>richman.root.vars.jieguo==='胜利者是小镁'));
  await page.screenshot({path:'output/playwright/verified-winner.png'});
  check('no runtime errors',await page.evaluate(()=>richman.errors.length===0&&document.getElementById('error').textContent===''));
  // Separate controlled configuration UI fixture, same settings path as file.
  await page.reload();await page.waitForFunction(()=>!!window.richman);
  await page.evaluate(()=>{richman.options.settings.overrides.characters={b6:{cash:12000}};});
  await page.screenshot({path:'output/playwright/verified-custom-menu.png'});
  for(let i=0;i<4;i++)await page.keyboard.press('d');
  await page.keyboard.press('w');await page.keyboard.press('ArrowUp');await page.waitForFunction(()=>richman.root.frame===2);
  check('configured starting cash on board',await page.evaluate(()=>richman.root.vars.xianjin1===12000));
  check('no browser exceptions',errors.length===0,errors);
  return {pass:true,checks,fixtureScope:'Real keyboard UI with explicitly injected dice/bankruptcy/config fixtures. Not natural rendered full-game proof or original-runtime differential.'};
}
