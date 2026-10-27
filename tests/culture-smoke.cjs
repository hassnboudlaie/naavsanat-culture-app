/* Classroom regression: preserve approved learning architecture; values questions fully closed. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('fs'),http=require('http'),path=require('path');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{
 const file=path.join(root,decodeURIComponent(req.url.split('?')[0]).replace(/\/$/,'/index.html'));
 if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return}
 fs.readFile(file,(err,data)=>{
  if(err){res.writeHead(404).end();return}
  res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html');
  res.end(data);
 });
});
(async()=>{
 await new Promise(r=>server.listen(8766,'127.0.0.1',r));
 const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 const page=await browser.newPage({viewport:{width:1366,height:900},acceptDownloads:true});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const visit=async(route)=>{await page.goto('http://127.0.0.1:8766/#/'+route);await page.waitForSelector('#app')};
 try{
  await visit('session/managers/0');
  assert.equal(await page.locator('.session-one-steps a').count(),6);
  assert.equal(await page.locator('.source-session-strip').count(),0);
  assert.equal(await page.locator('.case-list').count(),0);
  assert.equal(await page.locator('#session-close').count(),1);
  for(const role of ['managers','hq','operations']){
   await visit('case/'+role+'/2/4');
   assert.equal(await page.locator('.source-case-learning,.source-case-prompt').count(),0);
  }
  await visit('behavior/managers/12/2');
  assert.equal(await page.locator('.source-case-prompt').count(),0);
  await visit('medicator/managers/5/2');
  assert.equal(await page.locator('.source-case-prompt').count(),0);
  await visit('culture/managers/1');await page.waitForSelector('#naav-culture-lab');
  assert.equal(await page.locator('.cl-topic').count(),3);
  assert.equal(await page.locator('.cl-candidate.cl-framework-row').count(),5);
  assert.equal(await page.locator('#cl-question option').count(),10);
  assert.equal(await page.locator('#cl-choice option').count(),4);
  assert.equal(await page.locator('#naav-culture-lab textarea').count(),0);
  assert.equal(await page.locator('.source-culture-map,.source-rule-bank,.cl-references').count(),0);
  assert.match(await page.locator('.cl-outcomes-head').innerText(),/چارچوب پیشنهادی/);
  for(const role of ['managers','hq','operations']){
   await visit('culture/'+role);await page.locator('#naav-culture-lab').waitFor();
   await page.locator('[data-cl-group="values"]').click();
   assert.equal(await page.locator('#cl-question option').count(),10);
   assert.equal(await page.locator('textarea').count(),0);
   await page.locator('#cl-question').selectOption('v1');
   await page.locator('#cl-choice').selectOption('0');
   await page.locator('#cl-consensus').selectOption('agreed');
   await page.locator('[data-cl-save]').click();
   assert.match(await page.locator('.cl-candidate').first().innerText(),/۱ از ۲/);
   await page.reload();await page.waitForSelector('#naav-culture-lab');
   await page.locator('[data-cl-group="values"]').click();
   await page.locator('.cl-history>summary').click();
   assert.equal(await page.locator('[data-cl-edit]').count(),1);
   await page.locator('[data-cl-edit]').click();
   assert.equal(await page.locator('#cl-choice').inputValue(),'0');
   await page.locator('#cl-choice').selectOption('1');
   await page.locator('[data-cl-save]').click();
   await page.locator('.cl-history>summary').click();
   assert.match(await page.locator('.cl-history').innerText(),/انتخاب/);
   await page.locator('[data-cl-next]').click();
   assert.equal(await page.locator('textarea').count(),0);
  }
  await visit('culture/managers/1');
  await page.locator('#cl-scope').selectOption('all');
  assert.match(await page.locator('.cl-summary').innerText(),/۳/);
  const promise=page.waitForEvent('download');
  await page.locator('[data-cl-export-values]').click();
  const downloaded=await promise;assert.match(downloaded.suggestedFilename(),/business-values/);
  await visit('culture/hq');
  await page.locator('[data-cl-group="ethics"]').click();
  assert.equal(await page.locator('.cl-form-grid textarea').count(),2); // untouched other modules
  for(const width of [360,768,1440]){
   await page.setViewportSize({width,height:900});
   for(const route of ['session/managers/0','culture/managers/1','case/managers/5/4']){
    await visit(route);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),width+' overflow '+route);
   }
  }
  assert.deepEqual(errors,[]);
  console.log('PASS: old six-stage learning UI intact; 10 closed values questions; five candidate values; all three roles; save/edit/reload/export; responsive');
 }finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);server.close();process.exitCode=1});
