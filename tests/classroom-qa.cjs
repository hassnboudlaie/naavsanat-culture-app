/* Run: CHROMIUM_PATH=/path/to/chromium node tests/classroom-qa.cjs
   Requires Playwright. BASE_URL optionally tests a deployed build. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http'),path=require('node:path');
const root=path.resolve(__dirname,'..'),out=process.env.QA_OUTPUT||'/tmp/naav-classroom-qa';fs.mkdirSync(out,{recursive:true});
const server=http.createServer((req,res)=>{const file=path.join(root,decodeURIComponent(req.url.split('?')[0]).replace(/\/$/,'/index.html'));if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return}fs.readFile(file,(err,data)=>{if(err){res.writeHead(404).end();return}res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.jpg')?'image/jpeg':'text/html');res.end(data)})});
(async()=>{
 if(!process.env.BASE_URL)await new Promise(r=>server.listen(8765,'127.0.0.1',r));
 const base=process.env.BASE_URL||'http://127.0.0.1:8765/';
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox','--disable-dev-shm-usage']});
 const errors=[],results={base,stages:0,choices:0,actions:0,widths:[],screenshots:[]};
 try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}});page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base);await page.waitForSelector('.home-roles');
 const goto=async hash=>{await page.evaluate(h=>{location.hash=h},'#/'+hash);await page.waitForFunction(h=>location.hash===h,'#/'+hash);await page.waitForTimeout(12)};
 assert.equal(await page.evaluate(()=>CASES.length),15);assert.equal(await page.evaluate(()=>managers.length),6);
 for(const role of ['managers','hq','operations'])for(let id=1;id<=15;id++){
  for(let stage=0;stage<6;stage++){await goto(`case/${role}/${id}/${stage}`);assert.equal(await page.locator('[data-current-stage]').getAttribute('data-current-stage'),String(stage));results.stages++}
  for(let option=0;option<3;option++){await goto(`case/${role}/${id}/1`);await page.locator('[data-choice]').nth(option).click();await goto(`case/${role}/${id}/2`);const expected=await page.evaluate(({role,id,option})=>(role==='managers'&&window.NAAV_STRATEGIC?.cases[id]?window.NAAV_STRATEGIC.cases[id].choices:NAV_ROLE_LABS[role][id].o)[option][1],{role,id,option});assert.equal(await page.locator('.impact-card p').innerText(),expected);results.choices++}
  await goto(`case/${role}/${id}/5`);await page.locator('[data-action-choice]').nth(1).click();assert(page.url().endsWith(`/case/${role}/${id}/5`));await page.locator('#proof-field').fill(`مرور تصمیم ${role} ${id} در جلسه بعد`);await page.locator('[data-save-proof]').click();assert.match(await page.locator('.proof-status').innerText(),/ثبت شد/);await page.reload();await page.waitForSelector('[data-action-choice]');assert.equal(await page.locator('[data-action-choice]').nth(1).getAttribute('aria-pressed'),'true');assert.equal(await page.locator('#proof-field').inputValue(),`مرور تصمیم ${role} ${id} در جلسه بعد`);results.actions++;
 }
 for(let i=0;i<6;i++){await goto(`session/managers/${i}`);if(i===0){assert.match(await page.locator('.session-one-route').innerText(),/۱۲۰/);assert.equal(await page.locator('.session-one-steps a').count(),6)}else assert.match(await page.locator('.session-pacing').innerText(),/۱۲۰/);await page.locator(i===0?'.session-one-steps a[href*="/case/"]':'.case-tile').first().click();await page.locator('.head-link').first().click();assert(page.url().endsWith(`/session/managers/${i}`));const ids=await page.evaluate(i=>sessionCases.managers[i],i);await goto(`case/managers/${ids.at(-1)}/5`);await page.locator('.stage-foot .primary-btn').click();await page.waitForSelector('#session-close[open]')}
 // Dialogue lab: no artificial results, role-specific situations, save/edit/export/reload.
 for(const role of ['managers','hq','operations']){
  await goto('culture/'+role);await page.waitForSelector('#naav-culture-lab');
  assert.equal(await page.locator('.cl-topic').count(),3);
  assert.equal(await page.locator('.cl-empty').count(),1);
  await page.locator('[data-cl-group="values"]').click();
  await page.locator('#cl-choice').selectOption('0');
  await page.locator('#cl-consensus').selectOption('agreed');
  await page.locator('#cl-note').fill('توافق گروه: پیش از تعهد، وابستگی‌ها را روشن کنیم.');
  await page.locator('#cl-action').fill('مسئول هر تعهد پیش از جلسه بعد مشخص شود.');
  await page.locator('[data-cl-save]').click();
  assert.equal(await page.locator('.cl-empty').count(),0);
  assert.match(await page.locator('.cl-candidate').first().innerText(),/گفت‌وگوی دارای توافق/);
  await page.reload();await page.waitForSelector('#naav-culture-lab');
  assert.match(await page.locator('.cl-summary').innerText(),/۱/);
  await page.locator('.cl-history summary').first().click();
  await page.locator('[data-cl-edit]').first().click();
  assert.match(await page.locator('#cl-note').inputValue(),/توافق گروه/);
  await page.locator('#cl-note').fill('جمع‌بندی اصلاح‌شده کلاس');
  await page.locator('[data-cl-save]').click();
  await page.locator('.cl-history>summary').click();
  assert.match(await page.locator('.cl-history').innerText(),/جمع‌بندی اصلاح‌شده/);
 }
 await goto('culture/managers/1');assert.equal(await page.locator('[data-cl-group="values"]').getAttribute('aria-pressed'),'true');
 await goto('behavior/managers/12/1');assert.equal(await page.locator('[data-mod-choice]').count(),3);
 await page.locator('[data-mod-choice]').first().click();assert.match(await page.locator('.module-feedback').innerText(),/مرز تخصصی/);
 await goto('medicator/managers/5/3');await page.locator('.stage-foot .primary-btn').click();assert(page.url().endsWith('/session/managers/0'));
 // All original supplemental exercises, for each role, including filtered lists.
 for(const role of ['managers','hq','operations'])for(const type of ['medicator','behavior']){
  await goto(`${type}/${role}/all`);const links=await page.locator('.case-tile').evaluateAll(els=>els.map(e=>e.getAttribute('href')));
  for(const link of links)for(let stage=0;stage<4;stage++){await goto(link.replace('#/','').replace(/\/0$/,`/${stage}`));assert.equal(await page.locator('.case-steps .active').count(),1)}
 }
 await goto('medicator/managers/5/0');assert(await page.locator('.source-illustration img').evaluate(img=>img.complete&&img.naturalWidth>0));
 await goto('case/managers/1/5');await page.locator('#proof-field').fill('یادداشت موقت کلاس');await page.locator('.stage-foot .secondary-btn').click();await page.locator('.stage-foot .primary-btn').click();assert.equal(await page.locator('#proof-field').inputValue(),'یادداشت موقت کلاس');
 await page.locator('.skip').evaluate(el=>el.click());assert(page.url().endsWith('/5'));assert.equal(await page.evaluate(()=>document.activeElement.id),'app');
 // Invalid stored choices must not crash render after reload.
 await page.evaluate(()=>localStorage.setItem('naav_studio_choice_managers_1_strategy_v1','999'));await goto('case/managers/1/2');await page.reload();await page.waitForSelector('.empty-decision');
 for(const width of [360,390,768,1280,1440]){
  await page.setViewportSize({width,height:900});
  for(const route of ['home','session/managers/0','case/managers/1/1','case/managers/1/3','case/managers/1/5','medicator/managers/5/0','behavior/managers/1/0','culture/managers','culture/hq']){
   await goto(route);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`overflow ${width} ${route}`);
   if(['session/managers/0','case/managers/1/3','medicator/managers/5/0'].includes(route)){const name=`${width}-${route.replaceAll('/','-')}.png`;await page.screenshot({path:path.join(out,name),fullPage:true});results.screenshots.push(name)}
  }
  if(width<=768){await page.locator('.mobile-dash summary').click();await page.waitForSelector('.mobile-dash[open]');await page.keyboard.press('Escape');assert.equal(await page.locator('.mobile-dash[open]').count(),0);await page.locator('.mobile-dash summary').click();await page.locator('.mobile-dash-panel a').first().click();await page.waitForSelector('.home-roles');assert.equal(await page.locator('.mobile-dash[open]').count(),0)}
  results.widths.push(width);
 }
 const blocked=await browser.newPage();blocked.on('pageerror',e=>errors.push(e.message));await blocked.addInitScript(()=>{Storage.prototype.setItem=function(){throw new DOMException('Blocked','SecurityError')}});await blocked.goto(base+'#/case/managers/1/5');await blocked.locator('[data-action-choice]').first().click();assert.match(await blocked.locator('.proof-status').innerText(),/موقت/);await blocked.locator('#proof-field').fill('آزمون');await blocked.locator('[data-save-proof]').click();assert.match(await blocked.locator('.proof-status').innerText(),/در دسترس نیست/);
 assert.deepEqual(errors,[]);results.errors=errors;results.passed=true;fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
 }finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);server.close();process.exitCode=1});
