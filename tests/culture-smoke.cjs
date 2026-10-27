const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs'),http=require('node:http'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{
 const p=path.join(root,decodeURIComponent(req.url.split('?')[0]).replace(/\/$/,'/index.html'));
 if(!p.startsWith(root+path.sep)){res.writeHead(403).end();return}
 fs.readFile(p,(err,data)=>{if(err){res.writeHead(404).end();return}res.setHeader('Content-Type',p.endsWith('.js')?'text/javascript':p.endsWith('.css')?'text/css':p.endsWith('.jpg')?'image/jpeg':'text/html');res.end(data)})
});
(async()=>{
 await new Promise(resolve=>server.listen(8766,'127.0.0.1',resolve));
 const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 const page=await browser.newPage({viewport:{width:1366,height:900},acceptDownloads:true});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const visit=async(route)=>{await page.goto('http://127.0.0.1:8766/#/'+route);await page.waitForSelector('#app')};
 try{
 await visit('session/managers/0');
 await page.locator('.session-one-route').waitFor();
 assert.equal(await page.locator('.session-one-steps a').count(),6);
 assert.equal(await page.locator('.case-list').count(),0);
 assert.equal(await page.locator('#session-close').count(),1);

 assert.equal(await page.locator('.source-session-strip').count(),1);
 assert.equal(await page.evaluate(()=>window.NAAV_PDF_SOURCE.cases.length),15);
 assert.equal(await page.evaluate(()=>window.NAAV_PDF_SOURCE.laws.length),8);
 assert.equal(await page.evaluate(()=>window.NAAV_PDF_SOURCE.pillars.length),5);
 for(let id=1;id<=15;id++){
   await visit('case/managers/'+id+'/0');assert.equal(await page.locator('.source-case-mini').count(),1,'booklet case '+id);
   await visit('case/managers/'+id+'/4');assert.equal(await page.locator('.source-case-learning').count(),1,'booklet reflection '+id);
 }
 await visit('case/hq/6/4');assert.equal(await page.locator('.source-case-prompt').count(),1);
 await visit('case/operations/12/4');assert.equal(await page.locator('.source-case-prompt').count(),1);
 await visit('case/managers/5/5');assert.equal(await page.locator('.source-action').count(),1);
 await page.locator('.source-discussion-link').click();
 await page.locator('#naav-culture-lab').waitFor();
 assert.equal(await page.locator('.cl-back a').getAttribute('href'),'#/case/managers/5/5');
 await visit('session/managers/0');
 await page.locator('.session-one-steps a').last().click();
 await page.waitForSelector('#naav-culture-lab');
 assert.equal(await page.locator('[data-cl-group="values"]').getAttribute('aria-pressed'),'true');
 assert.equal(await page.locator('.source-pillar').count(),5);
 await page.locator('.source-rule-bank>summary').click();
 assert.equal(await page.locator('[data-source-question]').count(),8);
 await page.locator('[data-source-question]').last().click();
 assert.match(await page.locator('#cl-title').innerText(),/معیار/);
 assert.match(await page.locator('.cl-source-tags').innerText(),/ستون/);
 await visit('culture/managers/1');

 for(const role of ['managers','hq','operations']){
  await visit('culture/'+role);
  await page.locator('#naav-culture-lab').waitFor();
  assert.equal(await page.locator('.cl-topic').count(),3);
  assert.equal(await page.locator('.cl-empty').count(),1);
  await page.locator('[data-cl-group="values"]').click();
  await page.locator('#cl-choice').selectOption('0');
  await page.locator('#cl-consensus').selectOption('agreed');
  await page.locator('#cl-note').fill('گفت‌وگو درباره هماهنگی و مسئولیت مشترک');
  await page.locator('#cl-action').fill('در جلسه آینده شرط تعهد روشن اعلام شود.');
  await page.locator('[data-cl-save]').click();
  assert.equal(await page.locator('.cl-empty').count(),0);
  assert.equal(await page.locator('.cl-candidate').count(),1);
  await page.reload();await page.locator('#naav-culture-lab').waitFor();
  await page.locator('.cl-history>summary').click();
  await page.locator('[data-cl-edit]').first().click();
  assert.match(await page.locator('#cl-note').inputValue(),/هماهنگی/);
  await page.locator('#cl-note').fill('جمع‌بندی ویرایش‌شده');
  await page.locator('[data-cl-save]').click();
  await page.locator('.cl-history>summary').click();
  assert.match(await page.locator('.cl-history').innerText(),/ویرایش‌شده/);
  await page.locator('.cl-candidate>summary').first().click();
  await page.locator('[data-cl-status]').first().selectOption('needs');
  await page.locator('[data-cl-review]').first().click();
  await page.locator('.cl-candidate>summary').first().click();
  assert.equal(await page.locator('[data-cl-status]').first().inputValue(),'needs');
 }
 await visit('culture/managers');
 await page.locator('#cl-scope').selectOption('all');
 assert.match(await page.locator('.cl-summary').innerText(),/۳/);
 assert.equal(await page.locator('.cl-candidate').count(),1);
 await page.locator('[data-cl-export-values]').click();
 await page.locator('[data-cl-export]').click();
 await visit('behavior/managers/12/1');
 assert.equal(await page.locator('[data-mod-choice]').count(),3);
 await page.locator('[data-mod-choice]').first().click();
 assert.match(await page.locator('.module-feedback').innerText(),/مرز تخصصی/);
 await visit('medicator/managers/5/3');
 await page.locator('.stage-foot .primary-btn').click();
 assert.equal(new URL(page.url()).hash,'#/session/managers/0');
 for(const width of [360,768,1440]){
  await page.setViewportSize({width,height:900});
  for(const route of ['culture/managers','session/managers/0']){
   await visit(route);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Horizontal overflow at '+width+' '+route);
  }
 }
 assert.deepEqual(errors,[]);
 console.log('CULTURE_SMOKE_PASS: 3 roles, questionnaire, save/reload/edit/review, three-choice behavior, navigation, widths 360/768/1440');
 }finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);server.close();process.exitCode=1});
