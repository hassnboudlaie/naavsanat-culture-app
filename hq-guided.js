/* NaavSanat HQ session 1: guided, self-paced, distraction-free route.
 * All existing cases, case labs, materials and later sessions remain available.
 */
var HQ_LESSON_STEPS=['شروع','موقعیت','یادگیری','اقدام'];
function hqLessonState(){
 var v=readState('naavsanat_hq_first_v1',{step:0,choice:null,commitment:'',completed:false});
 return v&&typeof v==='object'?v:{step:0,choice:null,commitment:'',completed:false}
}
function hqSaveProgress(update){
 var v=hqLessonState();Object.keys(update).forEach(function(k){v[k]=update[k]});
 if(!saveState('naavsanat_hq_first_v1',v))announce('پیشرفت شما در این مرورگر قابل ذخیره نیست.');
 return v;
}
function hqLearnGo(step){
 if(!Number.isInteger(step)||step<0||step>3)return;
 var state=hqLessonState();
 if(step>=2&&(state.choice===null||!Number.isInteger(state.choice))){goRoute('hq-start/1');return}
 hqSaveProgress({step:step});goRoute('hq-start/'+step)
}
function hqLearnChoose(index){
 var data=NAV_ROLE_LABS.hq[1];
 if(!data||!Number.isInteger(index)||index<0||index>=data.o.length)return;
 hqSaveProgress({choice:index,step:2});goRoute('hq-start/2')
}
function hqLessonFinish(){
 var input=document.getElementById('hq-lesson-message');
 var message=input?String(input.value||'').trim().slice(0,600):hqLessonState().commitment||'';
 var s=hqSaveProgress({step:3,commitment:message,completed:true});
 var visited=getVisited();visited['hq-0']=true;saveState('naavsanat_v2_visited',visited);
 render()
}
function hqLessonHeader(step){
 var current=step+1,pct=step*25+(step===3&&hqLessonState().completed?25:0);
 return '<div class="hq-guided-shell"><header class="hq-guided-header">'+
 '<button class="hq-subtle-back" onclick="goRoute(\'hq\')" aria-label="بازگشت به مسیر کارکنان ستاد">‹ مسیر کارکنان ستاد</button>'+
 '<span>جلسه اول · گام '+fa(current)+' از ۴</span></header>'+
 '<div class="hq-steps-caption"><span>'+HQ_LESSON_STEPS.map(function(label,i){return '<span class="'+(i===step?'on':'')+'">'+(i===step?'<b>'+esc(label)+'</b>':esc(label))+'</span>'}).join('')+'</span><span>'+fa(pct)+'٪</span></div>'+
 '<div class="hq-progress" role="progressbar" aria-label="موقعیت در مسیر یادگیری" aria-valuenow="'+pct+'" aria-valuemin="0" aria-valuemax="100"><span style="width:'+pct+'%"></span></div>';
}
function hqLessonFooter(step){
 if(step===3&&hqLessonState().completed)return '</div>';
 return '<nav class="hq-step-actions" aria-label="حرکت در جلسه">'+(step>0?'<button class="hq-text-back" onclick="hqLearnGo('+ (step-1)+')">مرحله قبل</button>':'<span></span>')+
 (step===0?'<button class="hq-main-action" onclick="hqLearnGo(1)">شروع جلسه ←</button>':
 step===1?'<span class="hq-step-hint">برای ادامه، یکی از واکنش‌ها را انتخاب کنید.</span>':
 step===2?'<button class="hq-main-action" onclick="hqLearnGo(3)">ادامه و تمرین کوتاه ←</button>':
 '<span class="hq-step-hint">یک کار قابل انجام برای این هفته کافی است.</span>')+'</nav></div>';
}
function hqLessonPage(step){
 chooseRole('hq');
 step=Number.isInteger(step)?Math.max(0,Math.min(3,step)):0;
 var progress=hqLessonState(),scenario=NAV_ROLE_LABS.hq[1];
 if(step>=2&&(progress.choice===null||progress.choice===undefined))step=1;
 var main='';
 if(step===0){
  main='<section class="hq-guided-card hq-intro"><span class="hq-eyebrow">آموزش مستقل · بدون نیاز به مدرس</span>'+
  '<div class="hq-simple-graphic" aria-hidden="true"><span>درخواست سایت</span><i>←</i><span>بررسی ستاد</span><i>←</i><span>پاسخ روشن</span></div>'+
  '<h1>نقش من در فرهنگ سازمان</h1>'+
  '<p class="hq-lead">فرهنگ سازمان در رفتارهای کوچک ما ساخته می‌شود؛ مثلاً وقتی درخواستی مبهم به ستاد می‌رسد.</p>'+
  '<div class="hq-one-goal"><b>در پایان این جلسه می‌توانید:</b><p>یک درخواست مبهم را به یک پاسخ روشن و قابل‌پیگیری تبدیل کنید.</p></div>'+
  '<p class="hq-time">حدود ۸ تا ۱۲ دقیقه · یک موقعیت، یک تصمیم، یک اقدام</p></section>';
 }else if(step===1){
  main='<section class="hq-guided-card"><span class="hq-eyebrow">یک موقعیت آشنا از کار ستاد</span>'+
  '<h1>وقتی دو سایت، یک قطعه را می‌خواهند</h1>'+
  '<p class="hq-lead">سایت الف تلفنی سفارش داده، سایت ب در گروه پیام فرستاده. هنوز مشخص نیست درخواست اول ثبت شده یا نه.</p>'+
  '<div class="hq-conversation">'+scenario.v.slice(0,3).map(function(v){return '<div class="hq-speech"><b>'+esc(v[0])+'</b><p>'+esc(v[1])+'</p></div>'}).join('')+'</div>'+
  '<h2>'+esc(scenario.q)+'</h2>'+
  '<div class="hq-answer-list" role="group" aria-label="انتخاب یک واکنش">'+scenario.o.map(function(o,i){return '<button class="hq-answer" onclick="hqLearnChoose('+i+')"><span class="hq-answer-index">'+fa(i+1)+'</span><span>'+esc(o[0])+'</span><span aria-hidden="true" class="hq-chevron">‹</span></button>'}).join('')+'</div></section>';
 }else if(step===2){
  var chosen=scenario.o[progress.choice]||scenario.o[0];
  main='<section class="hq-guided-card"><span class="hq-eyebrow">نتیجه تصمیم شما</span>'+
  '<h1>این تصمیم چه اثری دارد؟</h1>'+
  '<div class="hq-selected"><small>انتخاب شما</small><p>'+esc(chosen[0])+'</p></div>'+
  '<div class="hq-feedback"><b>پیامد محتمل</b><p>'+esc(chosen[1])+'</p></div>'+
  '<div class="hq-one-goal"><b>گام حرفه‌ای‌تر</b><p>'+esc(chosen[2])+'</p></div>'+
  '<div class="hq-takeaway"><strong>یادمان بماند</strong><p>«در حال پیگیری است» کافی نیست؛ طرف مقابل باید بداند کار الان کجاست، نفر بعدی کیست و چه زمانی خبر می‌دهیم.</p></div></section>';
 }else{
  main='<section class="hq-guided-card"><span class="hq-eyebrow">آخرین مرحله · انتقال به محیط کار</span>'+
  '<h1>'+(progress.completed?'جلسه اول را به پایان رساندید':'فقط یک کار را تمرین کنید')+'</h1>'+
  '<p class="hq-lead">این هفته وقتی یکی از درخواست‌ها مبهم بود، وضعیت آن را با یک پیام روشن اعلام کنید.</p>'+
  '<div class="hq-one-goal"><b>پیام خوب، سه چیز دارد:</b><p>وضعیت فعلی ← مسئول قدم بعدی ← زمان اعلام نتیجه</p></div>'+
  (progress.completed?'<div class="hq-success" role="status">✓ یادگیری این جلسه در همین مرورگر ثبت شد.</div>'+
  (progress.commitment?'<div class="hq-selected"><small>متن تمرین شما</small><p>'+esc(progress.commitment)+'</p></div>':'')+
  '<button class="hq-main-action hq-finish-action" onclick="goRoute(\'hq-1\')">رفتن به جلسه دوم ←</button>':
  '<label class="hq-action-label" for="hq-lesson-message">اگر می‌خواهید، یک نمونه پیام کوتاه بنویسید (اختیاری).</label>'+
  '<textarea id="hq-lesson-message" maxlength="600" rows="3" placeholder="درخواست را دریافت کردم. فعلاً... / قدم بعدی با... / تا... اطلاع می‌دهم.">'+esc(progress.commitment||'')+'</textarea>'+
  '<button class="hq-main-action hq-finish-action" onclick="hqLessonFinish()">پایان و ثبت این جلسه ✓</button>')+
  '</section>';
 }
 return hqLessonHeader(step)+main+hqLessonFooter(step);
}
function hqSimpleOverview(){
 chooseRole('hq');
 var s=hqLessonState(),last=s.completed?3:Math.max(0,Math.min(3,Number(s.step)||0));
 return '<div class="fade hq-overview"><div class="hq-course-overline">ناوصنعت مس · مسیر کارکنان ستاد</div>'+
 '<h1>از اینجا شروع کنید</h1><p class="hq-overview-lead">مطالب را به ترتیب دنبال کنید. هر بار فقط یک مرحله را انجام می‌دهید.</p>'+
 '<section class="hq-primary-course"><span class="hq-eyebrow">جلسه ۱ از ۶</span><h2>نقش من در فرهنگ سازمان</h2>'+
 '<p>یک مثال ساده از کار ستاد، یک تصمیم و یک اقدام عملی.</p>'+
 '<div class="hq-mini-progress"><div><span style="width:'+(s.completed?100:((last)/4*100))+'%"></span></div><small>'+(s.completed?'این جلسه مرور شده است':'می‌توانید از جایی که مانده‌اید ادامه دهید')+'</small></div>'+
 '<button class="hq-main-action" onclick="hqLearnGo('+last+')">'+(s.completed?'مرور جلسه اول':last>0?'ادامه جلسه اول':'شروع جلسه اول')+' ←</button></section>'+
 '<details class="hq-extras"><summary>سایر جلسه‌ها و محتوای تکمیلی</summary>'+
 '<div class="hq-extra-items">'+hq.map(function(item,i){return '<button onclick="goRoute(\'hq-'+i+'\')"><b>جلسه '+fa(i+1)+'</b><span>'+esc(item.t)+'</span></button>'}).join('')+'</div>'+
 '<details><summary>کتابخانه ۱۵ کیس و منابع کامل</summary>'+roleCaseList('hq')+'</details></details>'+
 footer()+'</div>';
}
