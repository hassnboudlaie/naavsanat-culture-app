/* Regression: existing learning stays intact; values use exactly fifteen closed choices and no KPI cards. */
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{const filename=path.join(root,decodeURIComponent(req.url.split('?')[0]).replace(/\/$/,'/index.html'));if(!filename.startsWith(root+path.sep)){res.writeHead(403).end();return}fs.readFile(filename,(err,data)=>{if(err){res.writeHead(404).end();return}res.setHeader('Content-Type',filename.endsWith('.js')?'text/javascript':filename.endsWith('.css')?'text/css':filename.endsWith('.png')?'image/png':'text/html');res.end(data)})});
(async()=>{
 await new Promise(resolve=>server.listen(8766,'127.0.0.1',resolve));
 const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 const page=await browser.newPage({viewport:{width:1366,height:900},acceptDownloads:true});
 const errors=[];page.on('pageerror',err=>errors.push(err.message));
 const visit=async(route)=>{await page.goto('http://127.0.0.1:8766/#/'+route);await page.waitForSelector('#app')};
 try{
  await visit('session/managers/0');assert.equal(await page.locator('.session-one-steps a').count(),6);
  for(const role of ['managers','hq','operations']){
   await visit('case/'+role+'/2/4');assert.equal(await page.locator('.source-case-learning,.source-case-prompt').count(),0);
  }
  await visit('culture/managers/1');await page.waitForSelector('#naav-value15');
  assert.equal(await page.locator('.cl-topic').count(),3);
  assert.equal(await page.locator('.cl-summary,.cl-scope').count(),0);
  assert.equal(await page.locator('#v15-question option').count(),15);
  assert.equal(await page.locator('#v15-choice option').count(),4);
  assert.equal(await page.locator('#naav-value15 textarea').count(),0);
  assert.equal(await page.locator('.v15-family').count(),0);
  assert.equal(await page.locator('.source-culture-map,.source-rule-bank').count(),0);
  assert.equal(await page.evaluate(()=>NAAV_VALUE_CHALLENGES_15.length),15);
  for(let i=0;i<15;i++){
   await page.locator('#v15-question').selectOption(String(i));
   await page.locator('#v15-choice').selectOption(String(i%3));
   await page.locator('[data-v15-save]').click();
  }
  assert.match(await page.locator('.v15-result-head').innerText(),/۱۵ از ۱۵/);
  assert.equal(await page.locator('.v15-family').count(),5);
  assert.equal(await page.locator('.v15-family article').count(),15);
  assert.equal(await page.locator('.v15-statement').count(),1);
  assert.match(await page.locator('.v15-statement').innerText(),/پیش‌نویس بیانیه/);
  await page.locator('.v15-family>summary').first().click();
  assert.match(await page.locator('.v15-family').first().innerText(),/مصداق/);
  const csvWait=page.waitForEvent('download');await page.locator('[data-v15-csv]').click();assert.match((await csvWait).suggestedFilename(),/15-selected-values.csv/);
  const txtWait=page.waitForEvent('download');await page.locator('[data-v15-statement]').click();assert.match((await txtWait).suggestedFilename(),/values-statement.txt/);
  await page.reload();await page.waitForSelector('#naav-value15');
  assert.match(await page.locator('.v15-result-head').innerText(),/۱۵ از ۱۵/);
  await page.locator('#v15-choice').selectOption('2');await page.locator('[data-v15-save]').click();
  assert.equal(await page.locator('#naav-value15').count(),1);
  for(const role of ['hq','operations']){
   await visit('culture/'+role);await page.locator('[data-cl-group="values"]').click();
   assert.equal(await page.locator('#v15-question option').count(),15);
   assert.equal(await page.locator('.v15-statement').count(),0);
   await page.locator('#v15-choice').selectOption('1');await page.locator('[data-v15-save]').click();
   assert.match(await page.locator('.v15-result-head').innerText(),/۱ از ۱۵/);
  }
  await visit('culture/hq');await page.locator('[data-cl-group="ethics"]').click();assert.equal(await page.locator('textarea').count(),2);
  for(const width of [360,390,768,1440]){
   await page.setViewportSize({width,height:900});
   for(const route of ['culture/managers/1','session/managers/0','case/managers/5/4']){
    await visit(route);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Overflow at '+width+' '+route);
   }
  }
  assert.deepEqual(errors,[]);
  console.log('PASS fifteen challenges, one selected value each, five categories, generated statement with examples, save/edit/reload, CSV/TXT, 4 viewport widths, unchanged cases');
 }finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);server.close();process.exitCode=1});
