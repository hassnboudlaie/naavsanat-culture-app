/* NavSanat Clarity Edition v12
   Strict one-task-at-a-time navigation, 15 immediately discoverable cases per role.
   The legacy sessions, case-analysis steps, OKR, data and storage remain unchanged.
*/
var NS_SIMPLE_ICONS={hq:'▦',managers:'◇',operations:'◉'};
function nsTop(label){
 return '<header class="ns-header"><button class="ns-wordmark" onclick="goRoute(\'home\')" aria-label="ناوصنعت، خانه"><span class="ns-mark"><img src="'+LOGO_DATA+'" alt="نشان ناوصنعت مس"></span><span>ناوصنعت مس</span></button>'+
 '<span class="ns-header-label">'+esc(label||'آموزش رفتار سازمانی')+'</span>'+
 '<button class="ns-header-home" onclick="goRoute(\'home\')">خانه</button></header>'
}
function nsPageEnd(){return '<div class="ns-page-foot">آموزش رفتار و فرهنگ سازمانی · ناوصنعت مس</div>'}
function landing(){
 return '<div class="ns-simple ns-home fade" dir="rtl">'+nsTop('آموزش و یادگیری')+
 '<section class="ns-home-intro"><div class="ns-overline">ناوصنعت مس / یادگیری سازمانی</div>'+
 '<h1>رفتار ما، <span>فرهنگ ما.</span></h1>'+
 '<p>برای شروع، فقط نقش خود را انتخاب کنید.</p></section>'+
 '<section class="ns-home-tracks" aria-label="انتخاب مسیر آموزشی">'+
 '<button onclick="goRoute(\'managers\')" class="ns-track"><span class="ns-track-icon">01</span><span class="ns-track-text"><strong>مدیران ستاد</strong><small>رهبری، تصمیم و پاسخگویی</small></span><span class="ns-track-arrow">←</span></button>'+
 '<button onclick="goRoute(\'hq\')" class="ns-track"><span class="ns-track-icon">02</span><span class="ns-track-text"><strong>کارکنان ستاد</strong><small>هماهنگی، پیگیری و همکاری</small></span><span class="ns-track-arrow">←</span></button>'+
 '<button onclick="goRoute(\'operations\')" class="ns-track"><span class="ns-track-icon">03</span><span class="ns-track-text"><strong>کارکنان عملیاتی</strong><small>رفتار حرفه‌ای در شیفت و سایت</small></span><span class="ns-track-arrow">←</span></button>'+
 '</section>'+
 '<div class="ns-home-secondary"><button onclick="goRoute(\'culture-okr\')">نقشه تحول فرهنگ و اهداف سازمانی <span>←</span></button></div>'+
 nsPageEnd()+'</div>'
}
function nsCaseRow(id,role){
 var c=CASES[id-1],isHQ=role==='hq',info=isHQ?NHQ_CASES[id-1]:null;
 var title=info?info.short:c.title;
 var desc=info?info.desc:c.concept;
 var href=isHQ?'hq-case/'+id:caseRoute(id,role,0);
 return '<button type="button" class="ns-case-row" onclick="goRoute(\''+href+'\')" aria-label="کیس '+fa(id)+'، '+esc(title)+'">'+
 '<span class="ns-case-n">'+fa(id)+'</span><span class="ns-case-info"><b>'+esc(title)+'</b><small>'+esc(desc)+'</small></span><span class="ns-arrow">←</span></button>'
}
function nsCaseGroups(role){
 return '<section class="ns-cases" id="ns-cases"><div class="ns-cases-title"><div><span>۱۵ موقعیت کاری</span><h2>کیس‌های '+esc(ROLES[role].title)+'</h2></div><strong>۱۵ کیس</strong></div>'+
 '<p class="ns-cases-note">روی عنوان هر مورد بزنید و تصمیم خود را بررسی کنید.</p>'+
 [0,5,10].map(function(start){
  return '<div class="ns-case-group"><h3>'+(['کار و هماهنگی','همکاری و تصمیم','اعتماد و پاسخگویی'][start/5])+'</h3>'+
  '<div class="ns-case-rows">'+[1,2,3,4,5].map(function(x){return nsCaseRow(start+x,role)}).join('')+'</div></div>'
 }).join('')+'</section>'
}
function nsScrollCases(){
 var el=document.getElementById('ns-cases');
 if(el&&el.scrollIntoView)el.scrollIntoView({behavior:'smooth',block:'start'})
}
function nsRolePage(role){
 chooseRole(role);
 var type=ROLES[role];
 var top=role==='hq'?'در ستاد، کار را روشن پیش ببریم.':role==='managers'?'رهبری در عمل دیده می‌شود.':'هر شیفت، فرصتی برای همکاری بهتر.';
 var sub=role==='hq'?'از یک درخواست ساده تا تحویل درست کار.':role==='managers'?'از تصمیم‌های روزانه تا اعتماد و پاسخگویی.':'از یک موقعیت کاری تا رفتار ایمن و مسئولانه.';
 var count=role==='hq'?0:null;
 var session=role==='hq'?'<section class="ns-start"><span>پیشنهاد شروع · جلسه اول</span><h2>نقش من در فرهنگ سازمان</h2><p>یک موقعیت، یک تصمیم و یک اقدام کوتاه.</p><button class="ns-primary" onclick="hqLearnGo(0)">شروع جلسه اول ←</button></section>':
 role==='managers'?'<section class="ns-start"><span>پیشنهاد شروع · جلسه اول</span><h2>از سازمان غیررسمی تا حرفه‌ای</h2><p>رفتار مدیر چه پیامی به تیم می‌دهد؟</p><button class="ns-primary" onclick="goRoute(\'managers-0\')">شروع جلسه اول ←</button></section>':
 '<section class="ns-start"><span>راهنمای مسیر</span><h2>از یک مسئله آشنا شروع کنید</h2><p>۱۵ موقعیت از محیط شیفت، مأموریت و سایت در ادامه آمده است.</p><button class="ns-primary" onclick="nsScrollCases()">دیدن ۱۵ کیس ←</button></section>';
 var extra=role==='hq'?'<details class="ns-resources"><summary>سایر جلسات و محتوای کامل</summary>'+
 hq.map(function(s,i){return '<button onclick="goRoute(\'hq-'+i+'\')">جلسه '+fa(i+1)+' · '+esc(s.t)+'</button>'}).join('')+'</details>':
 role==='managers'?'<details class="ns-resources"><summary>جلسات آموزشی مدیران</summary>'+managers.map(function(s,i){return '<button onclick="goRoute(\'managers-'+i+'\')">جلسه '+fa(i+1)+' · '+esc(s.t)+'</button>'}).join('')+'</details>':
 '<details class="ns-resources"><summary>راهنمای تمرین گروهی</summary><p>در هر بار یادگیری، فقط یک کیس را بخوانید؛ تصمیم خود را بگویید و پیامد آن را بررسی کنید.</p></details>';
 return '<div class="ns-simple ns-role fade" dir="rtl">'+nsTop(type.title)+
 '<section class="ns-role-intro"><span class="ns-overline">مسیر یادگیری / '+esc(type.title)+'</span><h1>'+esc(top)+'</h1><p>'+esc(sub)+'</p></section>'+
 session+nsCaseGroups(role)+extra+nsPageEnd()+'</div>'
}
function hqSimpleOverview(){return nsRolePage('hq')}
function trackPage(role){return nsRolePage(role==='hq'?'hq':'managers')}
function operationsPage(){return nsRolePage('operations')}
function hqCasePage(id){
 id=Number(id);if(!Number.isInteger(id)||id<1||id>15)return nsRolePage('hq');
 chooseRole('hq');
 var c=CASES[id-1],x=NHQ_CASES[id-1];
 return '<div class="ns-simple ns-case fade" dir="rtl">'+nsTop('کارکنان ستاد')+
 '<div class="ns-case-top"><button class="ns-back" onclick="goRoute(\'hq\')">← بازگشت به ۱۵ کیس</button><span>کیس '+fa(id)+' از ۱۵</span></div>'+
 '<section class="ns-case-heading"><h1>'+esc(x.short)+'</h1><p>'+esc(x.desc)+'</p></section>'+
 '<section class="ns-case-content"><div class="ns-reading"><h2>شما چه می‌کنید؟</h2>'+decisionLab(c,'hq')+'</div>'+
 '<details class="ns-resources"><summary>توضیحات و تمرین‌های تکمیلی</summary>'+
 '<p>'+esc(c.variants.hq.lesson)+'</p><button onclick="goRoute(\''+caseRoute(id,'hq',0)+'\')">مطالعه کامل کیس ←</button></details></section>'+
 '<div class="ns-pagination"><button onclick="goRoute(\'hq\')">همه کیس‌ها</button>'+
 (id<15?'<button class="ns-primary" onclick="goRoute(\'hq-case/'+(id+1)+'\')">کیس بعدی ←</button>':'')+'</div>'+
 nsPageEnd()+'</div>'
}
function hqLessonPage(step){
 chooseRole('hq');step=Math.max(0,Math.min(3,Number(step)||0));
 var s=hqLessonState(),d=NAV_ROLE_LABS.hq[1];
 if(step>=2&&!Number.isInteger(s.choice))step=1;
 var headings=['نقش من در فرهنگ سازمان','وقتی دو سایت یک قطعه می‌خواهند','این انتخاب چه پیامدی دارد؟','این هفته یک کار را تغییر بدهید'];
 var inner='';
 if(step===0){
  inner='<span class="ns-overline">جلسه اول · شروع</span><h1>'+headings[0]+'</h1>'+
  '<p class="ns-lesson-lead">وقتی درخواستی مبهم به ستاد می‌رسد، چطور کمک کنیم کار روشن پیش برود؟</p>'+
  '<div class="ns-lesson-key">هدف این جلسه: یک پاسخ روشن و قابل‌پیگیری.</div>'+
  '<button class="ns-primary" onclick="hqLearnGo(1)">شروع جلسه ←</button>'
 }else if(step===1){
  inner='<span class="ns-overline">جلسه اول · موقعیت</span><h1>'+headings[1]+'</h1>'+
  '<div class="ns-chat">'+d.v.map(function(v){return '<div><b>'+esc(v[0])+'</b><p>'+esc(v[1])+'</p></div>'}).join('')+'</div>'+
  '<h2>'+esc(d.q)+'</h2><div class="ns-choices">'+d.o.map(function(v,i){return '<button onclick="hqLearnChoose('+i+')"><span>'+fa(i+1)+'</span><b>'+esc(v[0])+'</b><i>←</i></button>'}).join('')+'</div>'
 }else if(step===2){
  var o=d.o[s.choice];inner='<span class="ns-overline">جلسه اول · یادگیری</span><h1>'+headings[2]+'</h1>'+
  '<div class="ns-feedback"><b>پیامد تصمیم شما</b><p>'+esc(o[1])+'</p></div>'+
  '<div class="ns-lesson-key"><b>گام بهتر</b><p>'+esc(o[2])+'</p></div>'+
  '<button class="ns-primary" onclick="hqLearnGo(3)">ادامه ←</button>'
 }else{
  inner='<span class="ns-overline">جلسه اول · اقدام</span><h1>'+(s.completed?'جلسه اول تمام شد.':headings[3])+'</h1>'+
  '<p class="ns-lesson-lead">یک درخواست واقعی را با وضعیت فعلی، مسئول پیگیری و زمان پاسخ روشن کنید.</p>'+
  (s.completed?'<div class="ns-feedback"><b>جلسه تکمیل شد.</b><p>می‌توانید کیس دیگری را تمرین کنید.</p></div><button class="ns-primary" onclick="goRoute(\'hq\')">مشاهده ۱۵ کیس ←</button>':
   '<label for="hq-lesson-message" class="ns-label">یک پیام کوتاه تمرین کنید (اختیاری)</label><textarea id="hq-lesson-message" rows="3" maxlength="600" placeholder="وضعیت فعلی... / مسئول... / زمان پاسخ...">'+esc(s.commitment||'')+'</textarea>'+
   '<button class="ns-primary" onclick="hqLessonFinish()">پایان جلسه ✓</button>')
 }
 return '<div class="ns-simple ns-lesson fade" dir="rtl">'+nsTop('جلسه اول کارکنان ستاد')+
 '<div class="ns-lesson-progress"><span>مرحله '+fa(step+1)+' از ۴</span><div><i style="width:'+(s.completed?100:step*25)+'%"></i></div></div>'+
 '<section class="ns-lesson-sheet">'+inner+'</section>'+
 '<div class="ns-pagination"><button onclick="goRoute(\'hq\')">بازگشت به کارکنان ستاد</button>'+
 (step>0&&!(step===3&&s.completed)?'<button onclick="hqLearnGo('+(step-1)+')">مرحله قبل</button>':'')+'</div>'+nsPageEnd()+'</div>'
}
