/* Controlled browser fixtures for the remaining major screens. */
async(page)=>{
  const checks=[];const check=(name,pass)=>{checks.push({name,pass:!!pass});if(!pass)throw new Error(name);};
  await page.reload();await page.waitForFunction(()=>!!window.richman);
  for(let i=0;i<4;i++)await page.keyboard.press('d');
  await page.keyboard.press('w');await page.keyboard.press('ArrowUp');await page.waitForFunction(()=>richman.root.frame===2);
  await page.evaluate(()=>{richman.root.vars.shui=1;richman.root.vars.xingqi=0;richman.root.proxy.attachMovie('chaoshi','chaoshi',88,{_x:320,_y:260});});
  await page.keyboard.press('d');await page.keyboard.press('w');
  check('shop buys star with keyboard',await page.evaluate(()=>richman.root.vars.wuxing1===4&&richman.root.vars.xianjin1===1900));
  await page.screenshot({path:'output/playwright/verified-shop.png'});
  await page.evaluate(()=>{richman.root.vars.shui=1;richman.root.vars.xingqi=0;richman.root.proxy.attachMovie('ducheng','ducheng',88,{_x:340,_y:240});});
  await page.keyboard.press('w');await page.keyboard.press('w');
  check('casino deducts actual wager',await page.evaluate(()=>richman.root.vars.xianjin1===1800));
  await page.evaluate(()=>{richman.randomQueue=Array(12).fill(10.5/30);});
  await page.waitForFunction(()=>richman.root.vars.xingqi===2);
  check('casino spin resolves',await page.evaluate(()=>richman.root.named.ducheng1.vars.keyizhuan===0));
  await page.screenshot({path:'output/playwright/verified-casino.png'});
  await page.evaluate(()=>{richman.root.vars.shui=1;richman.root.vars.xingqi=0;richman.root.proxy.attachMovie('mingyun','mingyun',88,{_x:430,_y:250});richman.randomQueue=[5.5/15];});
  await page.waitForFunction(()=>!richman.root.named.mingyun.playing,null,{timeout:12000});
  check('fortune animation pays recovered 300',await page.evaluate(()=>richman.root.named.mingyun.vars.aa===5&&richman.root.vars.xianjin1===2100));
  await page.screenshot({path:'output/playwright/verified-fortune.png'});
  await page.evaluate(()=>{const r=richman.root,v=r.vars;v.shui=1;v.xingqi=1;v.yumao1=0;v.shuyu[1]=2;v.jibie[1]=4;r.named.renwu1.proxy._x=254;r.named.renwu1.proxy._y=1;richman.randomQueue=[0.1,0.1];});
  await page.keyboard.press('w');await page.waitForFunction(()=>richman.root.vars.zhuyuan1>0);
  check('mine moves player into hospital',await page.evaluate(()=>richman.root.named.renwu1.proxy._y>400&&richman.root.vars.jibie[1]===0));
  await page.screenshot({path:'output/playwright/verified-hospital.png'});
  check('no runtime errors',await page.evaluate(()=>!richman.errors.length&&!document.querySelector('#error').textContent));
  return {pass:true,checks,fixtureScope:'Controlled browser state setup plus real keyboard and original timing; not a natural full-game run or Flash differential.'};
}
