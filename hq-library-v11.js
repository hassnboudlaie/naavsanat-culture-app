/* NaavSanat staff experience V11 — visible case library and contextual guided cases.
 * This supplements rather than deletes the six-step source lessons.
 */
var NHQ_CASES=[
 {id:1,icon:'🏢',short:'تلفن یا ثبت رسمی؟',desc:'دو سایت یک قطعه را می‌خواهند؛ چه پاسخی می‌دهید؟',topic:'نظم و هماهنگی'},
 {id:2,icon:'🧭',short:'درخواست از بالای سر مدیر',desc:'دستور مدیر ارشد با مسیر رسمی هماهنگ نیست.',topic:'نظم و هماهنگی'},
 {id:3,icon:'⚖️',short:'اولویت برای آشنای مدیر',desc:'همکار می‌خواهد یک پرونده زودتر رسیدگی شود.',topic:'اعتماد و انصاف'},
 {id:4,icon:'📅',short:'قولی که قطعی نبود',desc:'برای فردا وعده داده‌ایم، اما تأیید هنوز نیامده.',topic:'نظم و هماهنگی'},
 {id:5,icon:'🤝',short:'اختلاف دو واحد',desc:'مدیر شما می‌خواهد همکاری با واحد دیگر متوقف شود.',topic:'اعتماد و انصاف'},
 {id:6,icon:'🧰',short:'درخواست ناقص از سایت',desc:'عملیات عجله دارد، ستاد بدون مدارک نمی‌تواند پاسخ دهد.',topic:'نظم و هماهنگی'},
 {id:7,icon:'📣',short:'تغییر برنامه بدون اطلاع',desc:'فایل اصلاح شده اما سایت هنوز برنامه قبلی را دارد.',topic:'نظم و هماهنگی'},
 {id:8,icon:'⏱️',short:'سه کار فوری در یک روز',desc:'همه می‌گویند کارشان فوری است؛ اولویت با کدام است؟',topic:'فشار و پاسخگویی'},
 {id:9,icon:'🛡️',short:'موعد تحویل یا ایمنی؟',desc:'قول تحویل نزدیک است، تأیید ایمنی هنوز کامل نیست.',topic:'فشار و پاسخگویی'},
 {id:10,icon:'📊',short:'گزارش زیاد، پیشرفت کم',desc:'مدیر گزارش می‌خواهد؛ مانع واقعی هنوز روشن نیست.',topic:'فشار و پاسخگویی'},
 {id:11,icon:'💬',short:'قولِ قطعیِ بدون تأیید',desc:'از شما خواسته شده وضعیت نامطمئن را قطعی اعلام کنید.',topic:'اعتماد و انصاف'},
 {id:12,icon:'👥',short:'شروع کار قبل از تأیید',desc:'برای یک داوطلب قول استخدام داده‌اند، HR هنوز تأیید نکرده.',topic:'اعتماد و انصاف'},
 {id:13,icon:'🔐',short:'یک نگرانی محرمانه',desc:'همکار نگران افشاشدن شکایت خود در محیط کار است.',topic:'اعتماد و انصاف'},
 {id:14,icon:'🎯',short:'پیگیری یا اختیار تصمیم؟',desc:'درخواست فوری است ولی معلوم نیست چه کسی تأیید می‌کند.',topic:'فشار و پاسخگویی'},
 {id:15,icon:'📦',short:'ارسال شد، تحویل نشد',desc:'سند فرستاده شده، اما واحد دریافت‌کننده هنوز منتظر است.',topic:'نظم و هماهنگی'}
];
function nhqCaseMeta(id){return NHQ_CASES[id-1]||NHQ_CASES[0]}
function nhqDoneCount(){
 var answers=readState('naavsanat_v6_decisions',{});
 return NHQ_CASES.reduce(function(n,item){return n+(Object.prototype.hasOwnProperty.call(answers,caseKey(item.id,'hq'))?1:0)},0);
}
function nhqCaseTile(item){
 var answered=Object.prototype.hasOwnProperty.call(readState('naavsanat_v6_decisions',{}),caseKey(item.id,'hq'));
 return '<button type="button" class="nhq-case-tile" onclick="goRoute(\'hq-case/'+item.id+'\')" aria-label="بازکردن کیس '+fa(item.id)+'، '+esc(item.short)+'">'+
 '<span class="nhq-case-number">'+fa(item.id).padStart(2,'۰')+'</span>'+
 '<span class="nhq-case-symbol" aria-hidden="true">'+item.icon+'</span>'+
 '<span class="nhq-case-title">'+esc(item.short)+'</span>'+
 '<span class="nhq-case-desc">'+esc(item.desc)+'</span>'+
 '<span class="nhq-tile-bottom"><span class="nhq-case-topic">'+esc(item.topic)+'</span><strong>'+(answered?'✓ بررسی شده':'دیدن کیس ←')+'</strong></span></button>';
}
function nhqJumpCases(){
 var el=document.getElementById('nhq-case-library');
 if(el&&el.scrollIntoView){el.scrollIntoView({behavior:window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});return}
 goRoute('hq')
}
function nhqNav(section){
 return '<div class="nhq-nav">'+
 '<div class="nhq-brand"><span class="nhq-logo">◈</span><div><b>ناوصنعت مس</b><small>آموزش کارکنان ستاد</small></div></div>'+
 '<nav class="nhq-nav-links" aria-label="مسیرهای یادگیری">'+
 '<button class="'+(section==='overview'?'is-current':'')+'" onclick="goRoute(\'hq\')">🏠 خانه آموزش</button>'+
 '<button class="'+(section==='cases'?'is-current':'')+'" onclick="goRoute(\'hq\');setTimeout(nhqJumpCases,70)">📚 ۱۵ کیس</button>'+
 '<button onclick="goRoute(\'hq-start/0\')">🎓 جلسه اول</button>'+
 '</nav><button class="nhq-return" onclick="goRoute(\'home\')">← صفحه اصلی</button></div>';
}
function hqSimpleOverview(){
 chooseRole('hq');
 var state=hqLessonState(),step=state.completed?3:Math.min(3,Math.max(0,Number(state.step)||0));
 var groups=[
  {title:'هماهنگی و تحویل کار',icon:'🔗',subtitle:'درخواست، وعده و انتقال درست کار',ids:[1,2,4,6,7,15]},
  {title:'اعتماد و همکاری',icon:'🤝',subtitle:'انصاف، گفت‌وگو و مسئولیت حرفه‌ای',ids:[3,5,11,12,13]},
  {title:'فشار و تصمیم حرفه‌ای',icon:'⚡',subtitle:'اولویت، اختیار و رفتار ایمن',ids:[8,9,10,14]}
 ];
 return '<div class="nhq-page fade" dir="rtl">'+nhqNav('overview')+
 '<section class="nhq-hero"><div class="nhq-hero-image" aria-hidden="true"></div><div class="nhq-hero-mask"></div><div class="nhq-hero-inner">'+
 '<div class="nhq-overline">✦ آکادمی رفتار و فرهنگ سازمانی</div>'+
 '<h1>در ستاد، <em>هر اقدام مهم است.</em></h1>'+
 '<p>درخواست را روشن دریافت کنیم، مسئولانه پیگیری کنیم و کار را درست تحویل بدهیم.</p>'+
 '<div class="nhq-hero-stats"><span>📖 ۶ جلسه</span><span>📚 ۱۵ کیس اختصاصی</span><span>🧩 تصمیم و بازخورد</span></div>'+
 '<div class="nhq-hero-ctas"><button class="nhq-hero-main" onclick="hqLearnGo('+step+')">'+(state.completed?'مرور جلسه اول':'شروع / ادامه جلسه اول')+' ←</button>'+
 '<button class="nhq-hero-secondary" onclick="nhqJumpCases()">مشاهده ۱۵ کیس ↓</button></div></div>'+
 '<div class="nhq-hero-caption">تصویر مرتبط با محیط معدن؛ نه تصویر مستند شرکت</div></section>'+
 '<div class="nhq-journey"><div class="nhq-journey-card"><span class="nhq-j-icon">🎓</span><div><small>پیشنهاد شروع</small><b>جلسه اول · نقش من در فرهنگ سازمان</b><p>یک گفت‌وگو، یک تصمیم، یک اقدام</p></div><button onclick="hqLearnGo('+step+')">شروع ←</button></div>'+
 '<div class="nhq-journey-card nhq-journey-cases"><span class="nhq-j-icon">📚</span><div><small>یادگیری از مسائل واقعی‌نما</small><b>۱۵ کیس ویژه کارکنان ستاد</b><p>همه کیس‌ها همین پایین هستند؛ هرکدام را خواستید باز کنید.</p></div><button onclick="nhqJumpCases()">دیدن همه ↓</button></div></div>'+
 '<section class="nhq-library" id="nhq-case-library"><header class="nhq-section-head"><div><span>CASE LIBRARY / کتابخانه کیس‌ها</span><h2>۱۵ کیس کارکنان ستاد</h2><p>از یک مسئله آشنا شروع کنید. برای دیدن هر کیس، همان کارت را لمس کنید.</p></div><div class="nhq-library-count"><strong>۱۵</strong><small>کیس در دسترس</small><span>'+fa(nhqDoneCount())+' انتخاب ثبت‌شده</span></div></header>'+
 groups.map(function(group){return '<div class="nhq-group"><div class="nhq-group-heading"><span class="nhq-group-icon">'+group.icon+'</span><div><h3>'+group.title+'</h3><p>'+group.subtitle+'</p></div></div><div class="nhq-case-grid">'+group.ids.map(function(id){return nhqCaseTile(NHQ_CASES[id-1])}).join('')+'</div></div>'}).join('')+
 '</section><section class="nhq-more"><div><span>📌 محتوای آموزشی حفظ شده است</span><h2>جلسات بعدی و جزئیات آموزشی</h2><p>برای مطالعه عمیق‌تر، شش جلسه و تحلیل کامل کیس‌ها در دسترس‌اند.</p></div><div class="nhq-lesson-links">'+hq.map(function(s,i){return '<button onclick="goRoute(\'hq-'+i+'\')"><span>'+fa(i+1)+'</span><b>'+esc(s.t)+'</b><i>←</i></button>'}).join('')+'</div></section>'+
 '<div class="nhq-bottom-note">سناریوها برای تمرین رفتار حرفه‌ای بازسازی شده‌اند؛ گزارش رخداد تأییدشده شرکت نیستند.</div>'+footer()+'</div>';
}
function hqCasePage(id){
 id=Number(id);if(!Number.isInteger(id)||id<1||id>15)return hqSimpleOverview();
 chooseRole('hq');
 var meta=NHQ_CASES[id-1],c=CASES[id-1],d=NAV_ROLE_LABS.hq[id];
 var prev=id>1?id-1:null,next=id<15?id+1:null;
 return '<div class="nhq-page nhq-case-screen fade" dir="rtl">'+nhqNav('cases')+
 '<header class="nhq-case-hero"><div class="nhq-case-art"></div><div class="nhq-case-shade"></div><div class="nhq-case-hero-inner">'+
 '<button class="nhq-breadcrumb" onclick="goRoute(\'hq\');setTimeout(nhqJumpCases,70)">⌂ کارکنان ستاد / ۱۵ کیس</button>'+
 '<div class="nhq-case-label">📚 کیس '+fa(id)+' از ۱۵ <span>·</span> '+esc(meta.topic)+'</div>'+
 '<h1>'+meta.icon+' '+esc(meta.short)+'</h1><p>'+esc(meta.desc)+'</p></div></header>'+
 '<div class="nhq-case-content"><article class="nhq-case-main"><div class="nhq-context-pill">💬 موقعیت شغلی: '+esc(ROLES.hq.title)+' <span>•</span> ۳ واکنش قابل بررسی</div>'+
 decisionLab(c,'hq')+
 '<div class="nhq-case-lesson"><div><span>💡 نکته این کیس</span><p>'+esc(c.variants.hq.lesson)+'</p></div></div>'+
 '<details class="nhq-case-extra"><summary>📖 تحلیل کامل، تمرین و جزوه این کیس</summary><p>اگر می‌خواهید مسئله را عمیق‌تر مطالعه کنید، شش بخش آموزشی اصلی همچنان حفظ شده‌اند.</p>'+
 '<button onclick="goRoute(\''+caseRoute(id,'hq',0)+'\')">رفتن به تحلیل کامل کیس ←</button></details></article>'+
 '<aside class="nhq-case-side"><div class="nhq-side-card"><span>🎯 فقط روی یک موضوع تمرکز کنید</span><h2>تصمیم شما چه اثری روی اعتماد و هماهنگی دارد؟</h2><p>یک گزینه را انتخاب کنید؛ سپس نتیجه و گام عملی را در همان صفحه ببینید.</p></div>'+
 '<div class="nhq-side-progress"><span>📚 پیشرفت مطالعه</span><strong>'+fa(id)+' / ۱۵</strong><div><i style="width:'+(id/15*100)+'%"></i></div></div></aside></div>'+
 '<nav class="nhq-case-pagination" aria-label="جابجایی بین کیس‌ها">'+
 '<button class="nhq-case-prev" onclick="goRoute(\'hq\');setTimeout(nhqJumpCases,70)">↩ همه ۱۵ کیس</button>'+
 (prev?'<button class="nhq-case-prev" onclick="goRoute(\'hq-case/'+prev+'\')">کیس قبلی →</button>':'')+
 (next?'<button class="nhq-case-next" onclick="goRoute(\'hq-case/'+next+'\')">کیس بعدی ←</button>':'<button class="nhq-case-next" onclick="goRoute(\'hq\');setTimeout(nhqJumpCases,70)">بازگشت به کتابخانه ✓</button>')+'</nav></div>';
}
