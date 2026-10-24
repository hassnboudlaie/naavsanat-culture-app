/* Premium UX facelift – actual working HQ staff learning path (V10).
 Retains hq-guided.js state, four-step flow and all 45 existing role-based cases.
 Visual complexity is layered; navigation stays one primary choice per step. */
var hqPremiumStageNames=['شروع','موقعیت','یادگیری','اقدام'];
var hqPremiumIcons=['▶','💬','💡','✓'];
function hqPremiumStageRail(step){
 return '<div class="hp-stage-rail" role="group" aria-label="پیشرفت جلسه اول">'+hqPremiumStageNames.map(function(title,i){
 return '<div class="hp-stage '+(i<step?'is-done':i===step?'is-active':'')+'"><span class="hp-stage-bubble" aria-hidden="true">'+hqPremiumIcons[i]+'</span><span class="hp-stage-label">'+esc(title)+'</span></div>'
 }).join('')+'</div>';
}
function hqPremiumShellMain(step,body){
 var s=hqLessonState();
 return '<div class="hp-app fade" dir="rtl">'+
 '<div class="hp-header"><div class="hp-brand"><div class="hp-mark" aria-hidden="true">◈</div><div><b>ناوصنعت مس</b><small>آکادمی یادگیری سازمانی</small></div></div>'+
 '<div class="hp-top-context">👥 کارکنان ستاد <span>·</span> جلسه اول</div>'+
 '<button type="button" class="hp-cases-shortcut" onclick="goRoute(\'hq\');setTimeout(nhqJumpCases,70)">📚 ۱۵ کیس</button>'+
 '<button type="button" class="hp-top-back" onclick="goRoute(\'hq\')" aria-label="بازگشت به مسیر ستاد">‹ <span>بازگشت به درس‌ها</span></button></div>'+
 '<div class="hp-content-grid"><aside class="hp-rail">'+
 '<div class="hp-rail-brand">🎓 <span>مسیر آموزشی کارکنان ستاد</span></div>'+
 '<div class="hp-rail-panel"><span class="hp-small-label">📘 درس جاری</span><b>نقش من در فرهنگ سازمان</b><p>وقتی دو سایت، یک قطعه را می‌خواهند</p><div class="hp-rail-progress"><span style="width:'+(s.completed?100:step*25)+'%"></span></div>'+
 '<small>'+fa(step+1)+' از ۴ مرحله</small></div>'+
 '<div class="hp-rail-purpose"><span>🎯</span><b>امروز فقط یک هدف داریم</b><p>یک درخواست مبهم را به یک اقدام روشن و قابل پیگیری تبدیل کنیم.</p></div>'+
 '<div class="hp-rail-trust"><span class="hp-rail-trust-icon">🏗️</span><p>یادگیری از مسائل نزدیک به محیط کارِ ستاد و عملیات</p></div>'+
 '</aside><div class="hp-primary">'+
 '<section class="hp-hero '+(step>=2?'hp-hero-compact':'')+'">'+
 '<div class="hp-hero-image" role="img" aria-label="تصویرسازی صنعتی از سایت معدن، خطوط انتقال و کارکنان با کلاه ایمنی"></div>'+
 '<div class="hp-hero-gradient" aria-hidden="true"></div>'+
 '<div class="hp-hero-content"><div class="hp-hero-chip">📍 جلسه اول <span>•</span> آموزش مستقل</div>'+
 '<h1>'+(step===0?'نقش من در <em>فرهنگ سازمان</em>':'وقتی دو سایت، <em>یک قطعه را می‌خواهند</em>')+'</h1>'+
 '<p>'+(step===0?'از یک اتفاق آشنا در ستاد شروع می‌کنیم؛ فقط یک موقعیت، یک تصمیم، یک اقدام.':'سایت الف تلفنی درخواست داده، سایت ب در گروه پیام گذاشته؛ کدام درخواست باید پیگیری شود؟')+'</p>'+
 (step<=1?'<div class="hp-hero-site-tags" aria-hidden="true"><span>🏢 درخواست سایت الف</span><span>🏭 درخواست سایت ب</span></div>':'')+
 '</div></section>'+
 '<div class="hp-stepbar"><div class="hp-stepbar-meta"><span>🧭 مسیر یادگیری</span><span>گام '+fa(step+1)+' از ۴</span></div>'+
 hqPremiumStageRail(step)+'</div>'+
 '<div class="hp-lesson-body">'+body+'</div>'+
 '<div class="hp-bottom">'+(step>0?'<button class="hp-back" onclick="hqLearnGo('+(step-1)+')">↩ مرحله قبل</button>':'<span></span>')+
 '<span class="hp-bottom-counter">'+(s.completed&&step===3?'✅ پایان جلسه':'جلسه اول · '+hqPremiumStageNames[step])+'</span>'+
 (step===0?'<button class="hp-next" onclick="hqLearnGo(1)">شروع یادگیری <span>←</span></button>':
 step===2?'<button class="hp-next" onclick="hqLearnGo(3)">مرحله بعد <span>←</span></button>':
 '<span class="hp-bottom-hint">'+(step===1?'یک واکنش انتخاب کنید':step===3&&!s.completed?'گام پایانی':'')+'</span>')+
 '</div>'+
 '<div class="hp-art-credit"><span>تصویر صنعتی طراحی‌شده برای تجربه یادگیری؛ بازسازی و نه تصویر مستند شرکت</span></div>'+
 '</div></div></div>';
}
function hqLessonPage(step){
 chooseRole('hq');
 step=Number.isInteger(step)?Math.min(3,Math.max(0,step)):0;
 var data=NAV_ROLE_LABS&&NAV_ROLE_LABS.hq&&NAV_ROLE_LABS.hq[1];
 if(!data)return '<section><h1>سناریوی آموزشی در دسترس نیست</h1><button onclick="goRoute(\'hq\')">بازگشت</button></section>';
 var state=hqLessonState();
 if(step>=2&&(state.choice===null||state.choice===undefined||!Number.isInteger(state.choice)))step=1;
 var body='';
 if(step===0){
  body='<section class="hp-main-card hp-start-panel"><div class="hp-card-heading"><span class="hp-heading-icon">🎯</span><div><div class="hp-kicker">شروع جلسه</div><h2>قرار است چه چیزی یاد بگیریم؟</h2></div></div>'+
  '<p class="hp-large-copy">گاهی همه کارشان را انجام داده‌اند، اما درخواستِ یک سایت هنوز بلاتکلیف است. چرا؟</p>'+
  '<div class="hp-infographic"><div><span class="hp-mini-icon">🏢</span><b>درخواست</b><small>از سایت</small></div><span class="hp-mini-arrow">←</span><div><span class="hp-mini-icon">🤝</span><b>هماهنگی</b><small>در ستاد</small></div><span class="hp-mini-arrow">←</span><div><span class="hp-mini-icon">✅</span><b>پاسخ روشن</b><small>برای پیگیری</small></div></div>'+
  '<div class="hp-split-info"><div><span>💡 چرا مهم است؟</span><p>شفافیت در درخواست‌ها، پایه اعتماد میان ستاد و عملیات است.</p></div><div><span>🏁 هدف امروز</span><p>یاد بگیریم وضعیت یک درخواست را روشن و قابل پیگیری اعلام کنیم.</p></div></div>'+
  '<div class="hp-time-chip">⏱ حدود ۱۰ دقیقه · بدون نیاز به مدرس</div></section>';
 } else if(step===1){
  body='<section class="hp-main-card"><div class="hp-card-heading"><span class="hp-heading-icon">📋</span><div><div class="hp-kicker">موقعیت از جنس کار ستاد</div><h2>درخواست مشابه از دو سایت</h2></div></div>'+
  '<p class="hp-task-copy">گفت‌وگوی زیر را بخوانید و خودتان تصمیم بگیرید. قرار نیست جواب را از حفظ بدانید.</p>'+
  '<div class="hp-chat">'+data.v.map(function(line,i){return '<div class="hp-chat-item hp-chat-'+(i%3)+'"><div class="hp-avatar" aria-hidden="true">'+(i===0?'🏢':i===1?'🧑‍💼':'📦')+'</div><div class="hp-bubble"><strong>'+esc(line[0])+'</strong><p>'+esc(line[1])+'</p></div></div>'}).join('')+'</div>'+
  '<div class="hp-question-header"><span class="hp-qmark">❔</span><div><h3>'+esc(data.q)+'</h3><small>یک گزینه را انتخاب کنید تا نتیجه‌اش را ببینید.</small></div></div>'+
  '<div class="hp-choice-list">'+data.o.map(function(o,i){return '<button type="button" class="hp-choice" onclick="hqLearnChoose('+i+')"><span class="hp-choice-badge">'+fa(i+1)+'</span><span class="hp-choice-desc">'+esc(o[0])+'</span><span class="hp-choice-icon" aria-hidden="true">'+['📋','🤝','🕒'][i]+'</span></button>'}).join('')+'</div></section>';
 }else if(step===2){
  var selected=data.o[state.choice]||data.o[0];
  body='<section class="hp-main-card"><div class="hp-card-heading"><span class="hp-heading-icon">💡</span><div><div class="hp-kicker">بازخورد تصمیم شما</div><h2>این انتخاب چه نتیجه‌ای دارد؟</h2></div></div>'+
  '<div class="hp-your-choice"><span>📌 انتخاب شما</span><p>'+esc(selected[0])+'</p></div>'+
  '<div class="hp-analysis-card"><span>🔎 پیامد احتمالی</span><p>'+esc(selected[1])+'</p></div>'+
  '<div class="hp-best-next"><span>✅ قدم حرفه‌ای‌تر</span><p>'+esc(selected[2])+'</p></div>'+
  '<div class="hp-takeaway"><span>⭐ یک نکته برای کار واقعی</span><p>پاسخ حرفه‌ای فقط «در حال پیگیری است» نیست؛ وضعیت، مسئولِ قدم بعدی و زمان اطلاع‌رسانی را روشن می‌کند.</p></div></section>';
 }else{
  body='<section class="hp-main-card"><div class="hp-card-heading"><span class="hp-heading-icon">📝</span><div><div class="hp-kicker">آخرین گام</div><h2>'+(state.completed?'جلسه اول را تمام کردید!':'این هفته فقط یک کار را تمرین کنید')+'</h2></div></div>'+
  '<p class="hp-large-copy">وقتی درخواست مبهمی رسید، در یک پیام کوتاه وضعیت آن را با سه نکته روشن کنید.</p>'+
  '<div class="hp-infographic hp-formula"><div><span class="hp-mini-icon">📍</span><b>وضعیت</b></div><span class="hp-mini-arrow">←</span><div><span class="hp-mini-icon">👤</span><b>مسئول</b></div><span class="hp-mini-arrow">←</span><div><span class="hp-mini-icon">🕒</span><b>زمان پاسخ</b></div></div>'+
  (state.completed?
  '<div class="hp-success">✅ این جلسه در مرورگر شما تکمیل شده است.</div>'+
  (state.commitment?'<div class="hp-your-choice"><span>متن تمرین شما</span><p>'+esc(state.commitment)+'</p></div>':'')+
  '<button class="hp-next hp-done-button" onclick="goRoute(\'hq-1\')">رفتن به جلسه دوم ←</button>':
  '<label class="hp-writing-label" for="hq-lesson-message">✍️ اگر مایلید، یک پیام کوتاه تمرین کنید (اختیاری)</label>'+
  '<textarea id="hq-lesson-message" rows="3" maxlength="600" placeholder="درخواست شما را دریافت کردم؛ فعلاً ... مسئول قدم بعدی ... است و تا ... خبر می‌دهم.">'+esc(state.commitment||'')+'</textarea>'+
  '<button class="hp-next hp-done-button" onclick="hqLessonFinish()">✅ پایان و ثبت جلسه</button>')+'</section>';
 }
 return hqPremiumShellMain(step,body);
}
function hqSimpleOverview(){
 chooseRole('hq');var s=hqLessonState();
 var next=s.completed?3:Math.max(0,Math.min(3,Number(s.step)||0));
 return '<div class="hp-overview fade" dir="rtl">'+
 '<div class="hp-overview-hero"><div class="hp-overview-image"></div><div class="hp-overview-overlay"></div>'+
 '<div class="hp-overview-content"><span class="hp-overview-eyebrow">🎓 ناوصنعت مس | کارکنان ستاد</span><h1>یادگیری از <em>کار واقعی</em></h1>'+
 '<p>بدون نیاز به مدرس. مسیر را قدم‌به‌قدم جلو بروید.</p>'+
 '<div class="hp-overview-stats"><span>💬 یک موقعیت</span><span>💡 یک یادگیری</span><span>✅ یک اقدام</span></div></div></div>'+
 '<div class="hp-overview-start"><span class="hp-overview-tag">📍 جلسه اول از شش جلسه</span><h2>نقش من در فرهنگ سازمان</h2>'+
 '<p>وقتی دو سایت، یک قطعه را می‌خواهند؛ تصمیم شما چیست؟</p>'+
 '<div class="hp-overview-progress"><div><span style="width:'+(s.completed?100:next*25)+'%"></span></div><small>'+(s.completed?'✅ این جلسه تکمیل شده است':'⏱ حدود ۱۰ دقیقه')+'</small></div>'+
 '<button class="hp-next" onclick="hqLearnGo('+next+')">'+(s.completed?'مرور جلسه اول':next>0?'ادامه جلسه اول':'شروع جلسه اول')+' <span>←</span></button></div>'+
 '<details class="hp-other-sessions"><summary>📚 جلسات بعدی و محتوای تکمیلی (در صورت نیاز)</summary>'+
 '<div class="hp-more-grid">'+hq.map(function(item,i){return '<button onclick="goRoute(\'hq-'+i+'\')"><span>جلسه '+fa(i+1)+'</span><b>'+esc(item.t)+'</b><i>←</i></button>'}).join('')+'</div>'+
 '<details><summary>کتابخانه ۱۵ کیس و جزوه‌های آموزشی</summary>'+roleCaseList('hq')+'</details></details>'+footer()+'</div>';
}
