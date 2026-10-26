/* NaavSanat Instructor Field Guide V14 – primary UI, canonical 15 manager cases.
 No legacy data discarded. Case variants remain role-specific.
 Book connections are conceptual adaptations, NOT claims that a book story happened here.
*/
(function(){
"use strict";
const priorRender=render;
const sc=[
 {i:"🧭",rule:"برای هر درخواست مشترک، تعهد، مسئول تصمیم و روش ثبت را روشن کنیم.",book:"داستان ۱ «و ناگهان من مدیر شدم»",bridge:"در داستان آغازین کتاب، مدیر تازه‌کار با تکیه بر تجربه کارکنان و پذیرفتن مسئولیت، اعتبار به دست می‌آورد. در این کیس نیز تغییر روش باید با احترام به تجربه مجریان همراه باشد."},
 {i:"↗",rule:"مسیر پاسخ و زمان ارجاع مشخص باشد؛ هیچ‌کس به دلیل گزارش خطر یا بی‌پاسخی ساکت نماند.",book:"داستان ۱۳ «نمی‌دانستم رئیسم چه چیزی می‌خواهد»",bridge:"داستان ۱۳ نشان می‌دهد دستورهای روزمره و معیار ارزیابی وقتی ناهمخوان باشند، اعتماد از بین می‌رود؛ مدیر باید انتظارات و پاسخگویی را همسو کند."},
 {i:"⚖️",rule:"صمیمیت امتیاز تصمیم‌گیری نیست؛ یک معیار برای همه و رسیدگی منصفانه.",book:"داستان ۲۸ «بهترین کارمندم را اخراج کردم»",bridge:"داستان ۲۸ هشدار می‌دهد که اجرای خشک یک قاعده بدون بررسی شواهد ممکن است بی‌عدالتی ایجاد کند؛ انصاف با بررسی و امکان اصلاح رویه همراه است."},
 {i:"✓",rule:"قول حرفه‌ای فقط با وضعیت، صاحب پیگیری و زمان پاسخ معتبر است.",book:"داستان ۱۳ «نمی‌دانستم رئیسم چه چیزی می‌خواهد»",bridge:"در داستان ۱۳، انجام کار مورد درخواست مدیر با معیار رسمی عملکرد یکی نبود. درباره تعهدات هم باید تعریف «انجام‌شده» برای همه یکی باشد."},
 {i:"🤝",rule:"اختلافِ مدیران نباید همکاری کارکنان یا تحویل خدمت را متوقف کند.",book:"داستان ۱۸ «باید به یک راه‌حل توافق‌شده می‌رسیدیم»",bridge:"موضوع توافق، به بحث تعارض و مصالحه کمک می‌کند؛ در ناوصنعت توافق باید همراه با اختیار و تعهد مشخص باشد، نه صرفاً آشتی نمایشی."},
 {i:"🔗",rule:"هر واحد در قبال نتیجه مشترک مسئول است؛ تخصص مجوز بی‌تفاوتی نسبت به مقصد کار نیست.",book:"داستان ۲۶ «از آن‌ها سؤالات صحیح را بپرس»",bridge:"پیوند آموزشی این داستان با پرسشگری مدیریتی است؛ به‌جای متهم‌کردن واحد دیگر، باید مانع واقعی و گزینه‌های در اختیارش را فهمید."},
 {i:"👥",rule:"پیش از تصمیم اثرگذار، صدای مجریان و ذی‌نفعان اصلی را بشنویم.",book:"داستان ۱ «و ناگهان من مدیر شدم»",bridge:"راوی داستان ۱ ابتدا دانش کارگران باتجربه را شناخت و سپس برای بهبود فرایند اقدام کرد؛ مشارکت با مسئولیت نهایی مدیر تعارضی ندارد."},
 {i:"⏱",rule:"فوریت با اولویت یکی نیست؛ تصمیم فوری هم باید معیار، مالک و موعد داشته باشد.",book:"داستان ۱۰ «مدیریت در بحران»",bridge:"درون‌مایه بحران‌مدیریتی این داستان برای بحث تصمیم تحت فشار به کار می‌رود؛ در این کیس فشار نباید جای شواهد و تعیین مسئول را بگیرد."},
 {i:"🛡️",rule:"نگرانی ایمنی باید بدون سرزنش شنیده و از مجرای صلاحیت تخصصی پیگیری شود.",book:"داستان ۲۸ «بهترین کارمندم را اخراج کردم»",bridge:"این روایت نشان می‌دهد رفتار ظاهراً خلاف قاعده باید منصفانه و با بررسی واقعیت رسیدگی شود؛ رسیدگی ایمنی نیز نیازمند شواهد، اختیار و انصاف است."},
 {i:"🎛",rule:"کنترل را با اختیار متناسب، بازبینی و پاسخگویی جایگزین ریزمدیریت کنیم.",book:"داستان ۱ «و ناگهان من مدیر شدم»",bridge:"مدیر داستان ۱ با کمک به کار واقعی تیم و یادگیری از تجربه آنان اعتماد ساخت؛ اعتبار مدیریت الزاماً به کنترل لحظه‌به‌لحظه وابسته نیست."},
 {i:"💬",rule:"واکنش روزمره مدیر به خبر بد، پیام واقعی فرهنگ سازمان است.",book:"داستان ۴۲ «از ما به آن‌ها»",bridge:"عنوان این داستان نقطه شروع بحث مرزبندی «ما/آن‌ها» است؛ تحلیل فرهنگیِ این کیس یک برداشت آموزشی تطبیقی است، نه بازگویی آن روایت."},
 {i:"🧑‍💼",rule:"جذب و ارزیابی بر مبنای شایستگی، صلاحیت و اختیار مصوب انجام شود، نه توصیه شخصی.",book:"داستان ۲۸ «بهترین کارمندم را اخراج کردم»",bridge:"تعارض میان سیاست و عدالت در داستان ۲۸ یادآور ضرورت معیار روشن، بررسی بی‌طرفانه و امکان بازنگری رویه منابع انسانی است."},
 {i:"🗣️",rule:"بیان نگرانی و گزارش خطر بدون تلافی یا برچسب‌زنی امکان‌پذیر باشد.",book:"داستان ۳۳ «زورگویی مدیر به من»",bridge:"عنوان این داستان برای بحث آسیب قدرت و سکوت کارکنان به‌کار می‌رود؛ تحلیل حاضر اقتباس آموزشی است و معادل رویداد کتاب نیست."},
 {i:"📌",rule:"هیچ پاسخگویی‌ای بدون اختیار، اطلاعات و معیار روشن مطالبه نشود.",book:"داستان ۱۳ «نمی‌دانستم رئیسم چه چیزی می‌خواهد»",bridge:"فرد داستان ۱۳ به درخواست مدیر کار ارزشمند انجام داد، اما با معیاری دیگر ارزیابی شد. مسئولیت، اختیار و معیار سنجش باید پیشاپیش همخوان باشند."},
 {i:"📦",rule:"تحویل زمانی تمام است که طرف بعدی دریافت و وضعیت را تأیید کرده باشد.",book:"داستان ۱۳ «نمی‌دانستم رئیسم چه چیزی می‌خواهد»",bridge:"تفاوت میان فعالیت انجام‌شده و خروجیِ مورد انتظار، همان مسئله‌ای است که در داستان ۱۳ به بی‌عدالتی در ارزیابی منجر شد."}
];
const guideOrder=sessionCases.managers.flat();
const findSession=id=>sessionCases.managers.findIndex(xs=>xs.includes(id));
const enrole={managers:"مدیران ستاد",hq:"کارکنان ستاد",operations:"کارکنان عملیاتی"};
function e(x){return esc(String(x==null?'':x))}
function fa14(n){return Number(n).toLocaleString("fa-IR")}
function header(label,teacher){
 return '<header class="nv-header"><button type="button" onclick="goRoute(\'home\')" class="nv-brand"><img src="'+LOGO_DATA+'" alt="لوگوی اصلی ناوصنعت مس"><span>ناوصنعت مس<small>رفتار و فرهنگ سازمانی</small></span></button>'+
 '<span class="nv-top-label">'+e(label)+'</span><div class="nv-head-actions">'+
 '<button class="'+(teacher?'is-active':'')+'" onclick="goRoute(\'teach\')">🎓 مسیر مدرس</button>'+
 '<button onclick="goRoute(\'home\')">⌂ خانه</button></div></header>';
}
function footer(){return '<footer class="nv-foot">سناریوها برای یادگیری و تمرین بازسازی شده‌اند؛ گزارش وقایع تأییدشده شرکت نیستند.</footer>'}
function shell(body,label,teacher){
 return '<div class="nv-app fade" dir="rtl">'+header(label,teacher)+'<main class="nv-main">'+body+'</main>'+footer()+'</div>';
}
function home(){
 let content='<section class="nv-welcome"><div class="nv-welcome-photo" aria-hidden="true"></div><div class="nv-welcome-shade"></div>'+
 '<div class="nv-welcome-text"><span class="nv-overline">شرکت بین‌المللی ناوصنعت مس</span><h1>مدیریت رفتار<br><em>و فرهنگ سازمانی</em></h1>'+
 '<p>۱۵ موقعیت واقعی‌نما از کار ستاد و عملیات. برای یادگیری، فقط یکی را انتخاب کنید.</p></div></section>'+
 '<div class="nv-hero-actions"><button class="nv-primary" onclick="goRoute(\'teach\')">🎓 ورود مدرس و شروع کلاس ←</button>'+
 '<button class="nv-light" onclick="goRoute(\'managers\')">ورود مدیران ←</button></div>'+
 '<section class="nv-home-other"><h2>شما در کدام گروه هستید؟</h2><div class="nv-three">'+
 [['managers','👔','مدیران ستاد'],['hq','🏢','کارکنان ستاد'],['operations','⛏','کارکنان عملیاتی']].map(a=>'<button onclick="goRoute(\''+a[0]+'\')"><span>'+a[1]+'</span><strong>'+a[2]+'</strong><span>←</span></button>').join('')+'</div></section>'+
 '<details class="nv-secondary"><summary>ابزار تحول فرهنگ و منابع آموزشی</summary><button onclick="goRoute(\'culture-okr\')">🎯 نقشه فرهنگ و OKR سازمان ←</button><button onclick="goRoute(\'context\')">درباره برنامه آموزشی ←</button></details>';
 return shell(content,'شروع',false);
}
function listItem(id,role,teacher){
 let c=CASES[id-1],sym=sc[id-1],url=teacher?'teach/c/'+id:'ns-case/'+role+'/'+id;
 return '<button type="button" class="nv-case-row" onclick="goRoute(\''+url+'\')"><span class="nv-list-n">'+fa14(id)+'</span>'+
 '<span class="nv-row-icon" aria-hidden="true">'+sym.i+'</span><span class="nv-row-text"><b>'+e(c.title)+'</b><small>'+e(c.concept)+'</small></span><span class="nv-row-arrow">←</span></button>';
}
function sessionPicker(role,teacher){
 return '<div class="nv-session-tiles">'+managers.map((s,i)=>'<button type="button" onclick="goRoute(\''+(teacher?'teach/s/':'learn/'+role+'/')+i+'\')">'+
 '<span>جلسه '+fa14(i+1)+'</span><b>'+e(s.t)+'</b><small>'+fa14(sessionCases.managers[i].length)+' کیس</small><strong>←</strong></button>').join('')+'</div>';
}
function homeForRole(role){
 chooseRole(role);
 let title=enrole[role]||enrole.managers;
 let content='<div class="nv-page-intro"><span class="nv-overline">مسیر '+e(title)+'</span><h1>از یک موقعیت شروع کنید.</h1><p>همان ۱۵ کیس اصلی سازمان، با گفت‌وگوی متناسب با نقش شما.</p></div>'+
 '<section class="nv-section"><div class="nv-section-title"><h2>۶ جلسه آموزشی</h2><small>یک جلسه را انتخاب کنید</small></div>'+sessionPicker(role,false)+'</section>'+
 '<details class="nv-secondary nv-all"><summary>مشاهده مستقیم هر ۱۵ کیس</summary><div class="nv-case-list">'+guideOrder.map(id=>listItem(id,role,false)).join('')+'</div></details>';
 return shell(content,title,false)
}
function teach(){
 let out='<div class="nv-page-intro"><span class="nv-overline">پنل ساده مدرس · ۶ جلسه</span><h1>کلاس از اینجا شروع می‌شود.</h1>'+
 '<p>جلسه را انتخاب کنید، بعد روی کیس بزنید. همه مطالب تدریس در همان صفحه کیس است.</p></div>'+
 '<div class="nv-teacher-start"><span>🎓</span><div><b>جلسه اول را اجرا می‌کنید؟</b><small>از سازمان غیررسمی به سازمان حرفه‌ای</small></div>'+
 '<button class="nv-primary" onclick="goRoute(\'teach/s/0\')">شروع جلسه اول ←</button></div>'+
 '<section class="nv-section"><div class="nv-section-title"><h2>جلسات دوره</h2><small>۶ جلسه · ۱۵ کیس اصلی</small></div>'+sessionPicker('managers',true)+'</section>'+
 '<details class="nv-secondary"><summary>فهرست سریع همه ۱۵ کیس</summary><div class="nv-case-list">'+guideOrder.map(id=>listItem(id,'managers',true)).join('')+'</div></details>';
 return shell(out,'راهنمای مدرس',true);
}
function lectureSession(index,role,teacher){
 let i=Number(index);if(!Number.isInteger(i)||i<0||i>5)return teacher?teach():homeForRole(role);
 let s=managers[i],ids=sessionCases.managers[i],back=teacher?'teach':role;
 let out='<div class="nv-crumb"><button onclick="goRoute(\''+back+'\')">→ بازگشت به جلسات</button><span>جلسه '+fa14(i+1)+' از ۶</span></div>'+
 '<div class="nv-session-heading"><span class="nv-overline">'+(teacher?'راهنمای تدریس':'مسیر '+enrole[role])+'</span><h1>'+e(s.t)+'</h1><p>'+e(s.d)+'</p></div>'+
 '<div class="nv-session-goal"><span>💡 پیام کلیدی این جلسه</span><strong>'+e(s.k)+'</strong></div>'+
 '<section class="nv-section"><div class="nv-section-title"><h2>کیس‌های این جلسه</h2><small>به‌ترتیب باز کنید</small></div>'+
 '<div class="nv-case-list">'+ids.map(id=>listItem(id,role,teacher)).join('')+'</div></section>'+
 '<div class="nv-next-session">'+(i>0?'<button class="nv-light" onclick="goRoute(\''+(teacher?'teach/s/':'learn/'+role+'/')+(i-1)+'\')">→ جلسه قبل</button>':'<span></span>')+
 (i<5?'<button class="nv-light" onclick="goRoute(\''+(teacher?'teach/s/':'learn/'+role+'/')+(i+1)+'\')">جلسه بعد ←</button>':'<span></span>')+'</div>'+
 '<details class="nv-secondary"><summary>موضوع‌ها و راهنمای مدرس (اختیاری)</summary><ul>'+s.topics.map(t=>'<li>'+e(t)+'</li>').join('')+'</ul></details>';
 return shell(out,'جلسه '+fa14(i+1),teacher);
}
function picked(id,role){
 let d=readState('naavsanat_v6_decisions',{}),key=caseKey(id,role);
 let v=Object.prototype.hasOwnProperty.call(NAV_DECISION_MEMORY,key)?NAV_DECISION_MEMORY[key]:d[key];
 let num=Number(v);return v!==undefined&&Number.isInteger(num)&&num>=0&&num<=2?num:null
}
function fullCase(id,role,teacher){
 id=Number(id);if(!Number.isInteger(id)||id<1||id>15)return teacher?teach():homeForRole(role);
 if(!enrole[role])role='managers';chooseRole(role);
 const c=CASES[id-1],s=sc[id-1],d=NAV_ROLE_LABS[role][id],session=findSession(id),pair=sessionCases.managers[session],pos=pair.indexOf(id);
 const prev=guideOrder.indexOf(id)>0?guideOrder[guideOrder.indexOf(id)-1]:null;
 const next=guideOrder.indexOf(id)<14?guideOrder[guideOrder.indexOf(id)+1]:null;
 const link=x=>teacher?'teach/c/'+x:'ns-case/'+role+'/'+x;
 const goBack=teacher?'teach/s/'+session:'learn/'+role+'/'+session;
 const val=picked(id,role);
 const scene=d.v.map((v,i)=>'<div class="nv-dialogue-line"><div class="nv-speaker">'+['💬','👤','📣','🗣'][i%4]+' '+e(v[0])+'</div><p>'+e(v[1])+'</p></div>').join('');
 const options=d.o.map((opt,i)=>'<button type="button" class="nv-option '+(val===i?'chosen':'')+'" onclick="nvPick('+id+',\''+role+'\','+i+')" aria-pressed="'+(val===i)+'">'+
 '<span class="nv-number">'+fa14(i+1)+'</span><span>'+e(opt[0])+'</span><b>'+(val===i?'✓':'')+'</b></button>').join('');
 const analysis=val===null?'<p class="nv-helper">یکی از سه گزینه را انتخاب کنید تا تحلیل هر سه را با هم ببینید.</p>':
 '<div id="nv-analysis" class="nv-analysis"><div class="nv-analysis-heading"><span>🔍 تحلیل هر گزینه</span><small>جواب مطلق وجود ندارد؛ پیامد و محدودیت را ببینید.</small></div>'+
 d.o.map((opt,i)=>'<div class="nv-analysis-item '+(val===i?'chosen':'')+'"><div class="nv-analysis-num">گزینه '+fa14(i+1)+(val===i?' · انتخاب شما':'')+'</div>'+
 '<p><strong>پیامد محتمل:</strong> '+e(opt[1])+'</p><p><strong>گام حرفه‌ای‌تر:</strong> '+e(opt[2])+'</p></div>').join('')+'</div>';
 let out='<div class="nv-case-breadcrumb"><button onclick="goRoute(\''+goBack+'\')">→ کیس‌های جلسه '+fa14(session+1)+'</button><div class="nv-quick-nav"><span>کیس '+fa14(id)+' از ۱۵</span>'+'<button class="nv-quick-next" onclick="goRoute(\''+(next?link(next):goBack)+'\')">'+(next?'کیس بعدی ←':'پایان جلسه ✓')+'</button></div></div>'+
 '<section class="nv-case-head"><div><span class="nv-overline">'+enrole[role]+' · جلسه '+fa14(session+1)+'</span>'+
 '<h1>'+s.i+' '+e(c.title)+'</h1><p>'+e(c.concept)+'</p></div><div class="nv-case-count">'+fa14(id)+'<small>/ ۱۵</small></div></section>'+
 '<div class="nv-case-layout"><article class="nv-case-main">'+
 '<section class="nv-part"><h2><span>۱</span> مسئله و گفت‌وگو</h2><div class="nv-dialogue">'+scene+'</div>'+
 '<details class="nv-context"><summary>زمینه بیشتر برای مدرس</summary><p>'+e(c.variants[role].problem)+'</p></details></section>'+
 '<section class="nv-part nv-choice-area"><h2><span>۲</span> اگر شما بودید چه می‌کردید؟</h2><p class="nv-decision-q">'+e(d.q)+'</p><div class="nv-options">'+options+'</div>'+analysis+'</section>'+
 '<section class="nv-part nv-takeaways"><h2><span>۳</span> درس و قاعده مدیریتی</h2>'+
 '<div class="nv-lesson"><span>💡 درس مدیریتی</span><p>'+e(c.variants[role].lesson)+'</p></div>'+
 '<div class="nv-rule"><span>📌 قاعده پیشنهادی فرهنگ ناوصنعت</span><p>'+e(s.rule)+'</p></div>'+
 '<div class="nv-key"><span>⭐ نکته برای گفت‌وگو در کلاس</span><p>'+e(d.r||c.variants[role].note||'')+'</p></div></section>'+
 '<details class="nv-book"><summary>📚 پیوند با کتاب «حقایق تلخ درباره مدیریت منابع انسانی»</summary><p><strong>'+e(s.book)+'</strong></p><p>'+e(s.bridge)+'</p><small>برداشت و تطبیق آموزشی؛ روایت کتاب رخداد ناوصنعت نیست.</small></details>'+
 '<details class="nv-secondary"><summary>محتوا و تمرین تکمیلی قبلی (اختیاری)</summary>'+
 '<button class="nv-link" onclick="goRoute(\''+caseRoute(id,role,0)+'\')">ورود به مطالعه شش‌بخشی اصلی کیس ←</button></details>'+
 '<nav class="nv-case-nav"><button class="nv-light" onclick="goRoute(\''+goBack+'\')">همه کیس‌های این جلسه</button>'+
 '<div>'+(prev?'<button class="nv-light" onclick="goRoute(\''+link(prev)+'\')">→ کیس قبل</button>':'')+
 (next?'<button class="nv-primary" onclick="goRoute(\''+link(next)+'\')">کیس بعد ←</button>':'<button class="nv-primary" onclick="goRoute(\''+goBack+'\')">پایان مرور ✓</button>')+'</div></nav></article>'+
 '<aside class="nv-teach-aside"><div class="nv-aside-title">🎓 نقشه کلاس</div><div class="nv-aside-caption">جلسه '+fa14(session+1)+' · '+fa14(pair.length)+' کیس</div>'+
 pair.map(cid=>'<button class="'+(cid===id?'selected':'')+'" onclick="goRoute(\''+link(cid)+'\')"><span>'+fa14(cid)+'</span>'+e(CASES[cid-1].title)+'</button>').join('')+
 '<div class="nv-aside-caption">جابجایی سریع</div><button onclick="goRoute(\''+(teacher?'teach':role)+'\')">↗ فهرست جلسات</button>'+
 '</aside></div>';
 return shell(out,'کیس '+fa14(id),teacher);
}
window.nvPick=function(id,role,idx){
 let answers=readState('naavsanat_v6_decisions',{}),key=caseKey(id,role);
 answers[key]=idx;NAV_DECISION_MEMORY[key]=idx;saveState('naavsanat_v6_decisions',answers);
 render();
 if(typeof requestAnimationFrame==='function')requestAnimationFrame(()=>document.getElementById('nv-analysis')?.scrollIntoView({block:'nearest',behavior:'smooth'}));
};
window.nvShow=()=>{};
window.nvFieldRender=function(){
 const route=(location.hash||'#home').slice(1);
 let page=null;
 if(!route||route==='home')page=home();
 else if(route==='teach'||route==='cases')page=teach();
 else if(['managers','hq','operations'].includes(route))page=homeForRole(route);
 else if(/^teach\/s\/[0-5]$/.test(route))page=lectureSession(route.split('/')[2],'managers',true);
 else if(/^learn\/(managers|hq|operations)\/[0-5]$/.test(route)){const bits=route.split('/');page=lectureSession(bits[2],bits[1],false)}
 else if(/^teach\/c\/(?:[1-9]|1[0-5])$/.test(route))page=fullCase(Number(route.split('/')[2]),'managers',true);
 else if(/^hq-case\/(?:[1-9]|1[0-5])$/.test(route))page=fullCase(Number(route.split('/')[1]),'hq',false);
 else if(/^ns-case\/(?:managers|hq|operations)\/(?:[1-9]|1[0-5])$/.test(route)){let p=route.split('/');page=fullCase(Number(p[2]),p[1],false)}
 else if(/^(managers|hq)-[0-5]$/.test(route)){let p=route.split('-');page=lectureSession(p[1],p[0],false)}
 if(page!==null){
  document.body.classList.add('nv-field-mode');
  document.body.classList.remove('ns-unified-route','ns-simple-route','hq-learning-focus');
  document.getElementById('app').innerHTML=page;document.title="ناوصنعت مس | "+(route==='teach'?'راهنمای مدرس':route==='home'?'خانه':'یادگیری سازمانی');
  return;
 }
 document.body.classList.remove('nv-field-mode');priorRender();
};
render=window.nvFieldRender;
})();