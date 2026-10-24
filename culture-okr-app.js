/* NaavSanat / Culture & Behavioral Strategy to OKR v7
 * Complementary to learning tracks. Explicitly local-only pilot; no asserted company performance.
 */
var cultureTab='map';
function coEsc(x){return typeof esc==='function'?esc(x):String(x==null?'':x).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function coState(){return readState('naavsanat_culture_okr_v7',{measurements:{},checkins:{},initiatives:{}})}
function coSave(s){return saveState('naavsanat_culture_okr_v7',s)}
function coMeasured(id){var v=coState().measurements[id];return v&&typeof v.value==='number'&&Number.isFinite(v.value)?v:null}
function coPersian(x){return typeof fa==='function'?fa(x):String(x)}
function coNumber(x){return x==null||!Number.isFinite(x)?'ثبت نشده':coPersian((Math.round(x*10)/10).toLocaleString('en-US',{maximumFractionDigits:1}))+'٪'}
function coTarget(x){return coPersian(String(x))+'٪'}
function coTabs(){
 var tabs=[['map','تصویر کلی'],['okrs','۳ هدف اصلی'],['metrics','سنجش پیشرفت'],['roadmap','برنامه اجرا'],['cases','۱۵ کیس واقعی‌نما'],['sources','راهنما و منابع']];
 return '<nav class="co-tabs" aria-label="بخش‌های برنامه تحول">'+tabs.map(function(t){return '<button class="'+(cultureTab===t[0]?'active':'')+'" aria-pressed="'+(cultureTab===t[0])+'" onclick="cultureGo(\''+t[0]+'\')">'+coEsc(t[1])+'</button>'}).join('')+'</nav>'
}
function cultureGo(tab){if(!['map','okrs','metrics','roadmap','cases','sources'].includes(tab))return;cultureTab=tab;render()}
function coTag(x){return '<span class="co-pill">'+coEsc(x)+'</span>'}
function coHero(){
 return '<header class="co-hero"><div class="co-hero-pattern" aria-hidden="true">◎</div><div><div class="co-eyebrow">CULTURE & BEHAVIOR · ناوصنعت مس</div><h1>از وضع موجود به فرهنگ مطلوب</h1><p>یک نقشه ساده برای اینکه مدیران، ستاد و عملیات هماهنگ‌تر و پاسخگوتر کار کنند.</p><div class="co-badges">'+coTag('۳ هدف تغییر')+coTag('۴ رفتار کلیدی')+coTag('برنامه ۶ ماهه')+'</div></div></header>'
}
function coIntro(){
 return '<div class="co-notice"><b>نکته مهم:</b> «وضع موجود» فعلاً فرضیه برآمده از کیس‌هاست، نه نتیجه ارزیابی رسمی. عددهای هدف پیشنهادی‌اند و عملکرد واقعی شرکت تا زمان ثبت شواهد، «نامشخص» می‌ماند.</div>'
}
function coMetricLink(id,label){return '<button class="co-link" onclick="cultureGo(\'metrics\')">'+coEsc(label||id)+' ←</button>'}
function coPillarCard(p){return '<article class="co-pillar"><div class="co-pillar-head"><b>'+coEsc(p.title)+'</b><span>'+coEsc(p.id)+'</span></div><small>'+coEsc(p.subtitle)+'</small><div class="co-two-row"><div><em>الگوی مسئله</em><p>'+coEsc(p.problem)+'</p></div><div><em>رفتار مطلوب</em><p>'+coEsc(p.desired)+'</p></div></div><details><summary>رفتارهای قابل مشاهده و کیس‌های مرتبط</summary><ul>'+p.behaviors.map(function(b){return '<li>'+coEsc(b)+'</li>'}).join('')+'</ul>'+coCasesInline(p.cases)+'</details></article>'}
function coCasesInline(ids){return '<div class="co-case-links">'+ids.map(function(id){return '<button type="button" onclick="openCase('+id+',\'managers\')">کیس '+coPersian(id)+'</button>'}).join('')+'</div>'}
function coScoreProgress(id,target){
 var s=coMeasured(id);
 if(!s)return '<div class="co-no-data">هنوز مقدار واقعی ثبت نشده است.</div>';
 var base=s.baseline,hasBaseline=base!=null&&Number.isFinite(base);
 var progress=hasBaseline&&target>base?Math.max(0,Math.min(100,Math.round((s.value-base)/(target-base)*100))):null;
 var a='<div class="co-measure"><span>مقدار ثبت‌شده: <b>'+coNumber(s.value)+'</b></span><span>هدف پیشنهادی: '+coTarget(target)+'</span></div>';
 if(progress!==null){
  a+='<div class="co-meter" role="progressbar" aria-label="پیشرفت نسبت به خط مبنا" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+progress+'"><span style="width:'+progress+'%"></span></div><small>میزان حرکت از Baseline ثبت‌شده به Target پیشنهادی: '+coPersian(progress)+'٪</small>'
 }else if(hasBaseline&&base>=target){
  a+='<div class="co-no-data">خط مبنای واردشده از هدف پیشنهادی کمتر نیست؛ هدف را پس از اعتبارسنجی بازنگری کنید.</div>';
 }else{
  a+='<div class="co-no-data">برای محاسبه میزان تغییر، خط مبنای معتبر لازم است.</div>';
 }
 return a;
}
function coNorth(){var m=CULTURE_OKR_MODEL,s=coMeasured('NS');return '<section class="co-north"><div class="co-kicker">NORTH STAR / ULTIMATE GOAL</div><h2>'+coEsc(m.north.headline)+'</h2><p>'+coEsc(m.north.ultimate)+'</p><div class="co-northmetric"><b>شاخص محوری پیشنهادی: مأموریت ایمن و قابل‌اتکا</b><p>'+coEsc(m.north.metric)+'</p><div class="co-measure"><span>اندازه‌گیری واقعی: <b>'+(s?coNumber(s.value):'بدون داده')+'</b></span><button class="co-link" onclick="cultureGo(\'metrics\')">ثبت و مشاهده شاخص ←</button></div></div><details><summary>تعریف دقیق Numerator / Denominator و محدودیت تفسیر</summary><p><b>صورت:</b> '+coEsc(m.north.numerator)+'</p><p><b>مخرج:</b> '+coEsc(m.north.denominator)+'</p><p>'+coEsc(m.north.caveat)+'</p></details></section>'}

function coRoleDefinitions(){return {
 managers:{label:'مدیران ستاد',tasks:[
  {title:'یک تعهد مهم این هفته را با مسئول، موعد و شرط انجام روشن می‌کنم.',caseId:4},
  {title:'برای یک تصمیم تأخیردار، مرز اختیار و فرد پاسخگو را مشخص می‌کنم.',caseId:14},
  {title:'در گفت‌وگوی تیمی، یک نگرانی را بدون سرزنش می‌شنوم و پیگیری می‌کنم.',caseId:13}
 ]},
 hq:{label:'کارکنان ستاد',tasks:[
  {title:'برای یک درخواست، وضعیت واقعی و قدم بعدی را روشن اطلاع می‌دهم.',caseId:4},
  {title:'در یک تحویل بین‌واحدی، دریافت و کامل‌بودن کار را تأیید می‌گیرم.',caseId:15},
  {title:'وقتی اولویت‌ها تعارض دارند، به‌جای سه قول مبهم، تعیین اولویت می‌خواهم.',caseId:8}
 ]},
 operations:{label:'کارکنان عملیاتی',tasks:[
  {title:'پیش از مأموریت، آخرین برنامه تأییدشده را مطابق رویه بررسی می‌کنم.',caseId:1},
  {title:'هر نگرانی ایمنی یا عدم آمادگی را به‌موقع از مسیر HSE مطرح می‌کنم.',caseId:9},
  {title:'در تحویل شیفت، موارد باز را ثبت و دریافت آن را تأیید می‌گیرم.',caseId:15}
 ]}
}}
function coSelectedRole(){
 var s=coState(),role=s.practiceRole;return Object.prototype.hasOwnProperty.call(coRoleDefinitions(),role)?role:'managers'
}
function coRolePlanInner(){
 var role=coSelectedRole(),r=coRoleDefinitions()[role],s=coState(),done=s.habitChecks||{},checks=done[role]||{};
 var count=r.tasks.filter(function(x,i){return !!checks[i]}).length;
 return '<div class="co-habit-top"><b>تمرین یک‌هفته‌ای '+coEsc(r.label)+'</b><small>'+coPersian(count)+' از ۳ رفتار تمرین‌شده</small></div>'+
 '<div class="co-habit-items">'+r.tasks.map(function(t,i){return '<div class="co-habit-item"><label><input type="checkbox" '+(checks[i]?'checked':'')+' onchange="coToggleHabit('+i+',this.checked)"><span>'+coEsc(t.title)+'</span></label><button onclick="openCase('+t.caseId+',\''+role+'\')">کیس '+coPersian(t.caseId)+' ←</button></div>'}).join('')+'</div>'+
 '<p class="co-habit-footnote">این چک‌لیست فقط یادآور تمرین شخصی است؛ ثبت آن معادل تأیید انجام کار، ایمنی یا عملکرد سازمان نیست.</p>'
}
function coRolePlan(){
 var roles=coRoleDefinitions(),current=coSelectedRole();
 return '<section class="co-section co-start"><div class="co-heading"><h2>از این هفته چه کاری متفاوت انجام دهیم؟</h2><p>سه رفتار کوتاه، متناسب با شغل شما؛ به‌جای یک برنامه سنگین.</p></div><div class="co-role-picker" role="group" aria-label="انتخاب نقش">'+Object.keys(roles).map(function(role){return '<button type="button" class="'+(current===role?'active':'')+'" aria-pressed="'+(current===role)+'" onclick="coSelectRole(\''+role+'\')">'+coEsc(roles[role].label)+'</button>'}).join('')+'</div><div id="co-role-practice">'+coRolePlanInner()+'</div></section>'
}
function coRefreshRolePractice(){
 var el=document.getElementById('co-role-practice');if(el)el.innerHTML=coRolePlanInner();
 var tabs=document.querySelectorAll('.co-role-picker button'),role=coSelectedRole();
 if(tabs&&tabs.forEach)tabs.forEach(function(btn){var selected=(btn.textContent||'')===coRoleDefinitions()[role].label;btn.classList.toggle('active',selected);btn.setAttribute('aria-pressed',String(selected))})
}
function coSelectRole(role){
 if(!Object.prototype.hasOwnProperty.call(coRoleDefinitions(),role))return;
 var s=coState();s.practiceRole=role;
 if(!coSave(s)){announce('تنظیمات این دستگاه قابل ذخیره نیست.');return}
 coRefreshRolePractice()
}
function coToggleHabit(i,checked){
 var role=coSelectedRole(),tasks=coRoleDefinitions()[role].tasks;
 if(!Number.isInteger(i)||i<0||i>=tasks.length)return;
 var s=coState();if(!s.habitChecks)s.habitChecks={};if(!s.habitChecks[role])s.habitChecks[role]={};
 s.habitChecks[role][i]=!!checked;
 if(!coSave(s)){announce('ذخیره چک‌لیست ممکن نشد.');return}
 var counter=document.querySelector('#co-role-practice .co-habit-top small');
 if(counter){var count=Object.keys(s.habitChecks[role]).filter(function(j){return !!s.habitChecks[role][j]}).length;counter.textContent=coPersian(count)+' از ۳ رفتار تمرین‌شده'}
}
function coQuickExample(){
 return '<section class="co-simple-example"><div class="co-kicker">یک مثال از کار واقعی‌نما، نه گزارش یک رخداد تأییدشده</div>'+
 '<h2>وقتی به یک خودرو، برای دو کار قول داده‌ایم...</h2>'+
 '<div class="co-example-row"><div><small>چالش</small><b>دو قول؛ یک ظرفیت</b><p>تلفن و پیام‌ها با هم هماهنگ نیستند.</p></div><div><small>رفتار مطلوب</small><b>هر قول، صاحب و موعد دارد</b><p>قبل از وعده، ظرفیت و مسئول پاسخ‌گویی روشن می‌شود.</p></div><div><small>نشانه تغییر</small><b>تعهدهای قابل‌پیگیری</b><p>سهم قول‌های دارای مالک و موعد را می‌سنجیم؛ مقدار فعلی نامشخص است.</p></div></div>'+
 '<div class="co-example-actions"><button onclick="openCase(1,\'managers\')">تجربه کیس ۱ ←</button><button onclick="cultureGo(\'okrs\')">دیدن هدف مرتبط ←</button></div></section>'
}
function coConceptHelp(){
 return '<details class="co-glossary"><summary>North Star، OKR و KPI به زبان ساده یعنی چه؟</summary><div class="co-glossary-grid">'+
 '<div><b>North Star · جهت حرکت</b><p>می‌خواهیم ناوصنعت به چه سازمانی تبدیل شود؟</p></div>'+
 '<div><b>OKR · تغییری که می‌خواهیم ایجاد کنیم</b><p>در این دوره چه چیزی بهتر شود و از کجا بفهمیم؟</p></div>'+
 '<div><b>KPI · علامت سلامت کار</b><p>کدام عدد را مرتب نگاه کنیم تا از کیفیت کار مطمئن شویم؟</p></div>'+
 '<div><b>Initiative · اقدام عملی</b><p>این هفته چه کاری انجام دهیم تا نتیجه تغییر کند؟</p></div>'+
 '</div></details>'
}

function coStrategyMap(){
 var m=CULTURE_OKR_MODEL;
 return '<section class="co-section"><div class="co-heading"><h2>اصل موضوع در یک نگاه</h2><p>بدون نیاز به آشنایی قبلی با OKR</p></div>'+
 '<div class="co-simple-journey"><div><small>وضع موجود · فرضیه برای بررسی</small><b>کار به ارتباط شخصی و پیگیری فردی متکی است</b><p>قول‌های دوگانه، ابهام اختیار و فاصله بین ستاد و میدان در کیس‌ها مطرح شده‌اند.</p></div><span aria-hidden="true">←</span><div><small>وضع مطلوب · جهت مورد نظر</small><b>کار هماهنگ، ایمن و قابل‌اتکا پیش می‌رود</b><p>هر تعهد مالک دارد، نگرانی‌ها شنیده می‌شود و تحویل کار تأیید می‌شود.</p></div></div></section>'+
 coQuickExample()+coRolePlan()+
 '<section class="co-section"><div class="co-heading"><h2>چهار رفتار کلیدی برای ساختن این فرهنگ</h2><p>از شعار به رفتار قابل مشاهده می‌رسیم.</p></div><div class="co-simple-pillars">'+m.pillars.map(function(p){return '<details class="co-simple-pillar"><summary><span>'+coEsc(p.id)+'</span><b>'+coEsc(p.title)+'</b><small>مشاهده رفتارها</small></summary><p>'+coEsc(p.desired)+'</p><ul>'+p.behaviors.map(function(b){return '<li>'+coEsc(b)+'</li>'}).join('')+'</ul>'+coCasesInline(p.cases)+'</details>'}).join('')+'</div></section>'+
 '<section class="co-section"><div class="co-heading"><h2>مسیر تحول در سه مرحله</h2></div><div class="co-three-stages"><div><b>۱. شناخت</b><span>هفته ۱ تا ۴</span><p>واقعیت را می‌سنجیم، حدس نمی‌زنیم.</p></div><div><b>۲. تمرین</b><span>هفته ۵ تا ۱۲</span><p>سه تغییر مهم را آزمایش می‌کنیم.</p></div><div><b>۳. تثبیت</b><span>هفته ۱۳ تا ۲۴</span><p>رفتارهای مؤثر را گسترش می‌دهیم.</p></div></div><div class="co-example-actions"><button onclick="cultureGo(\'roadmap\')">مشاهده برنامه اجرا ←</button></div></section>'+
 '<details class="co-deeper"><summary>نقشه راهبرد کامل، North Star و سطوح بلوغ</summary>'+coNorth()+'<p class="co-description">'+coEsc(m.context.lifecycle)+' · '+coEsc(m.context.diagnostic)+'</p><div class="co-levels">'+m.maturity.map(function(x){return '<div><span>'+coPersian(x.level)+'</span><b>'+coEsc(x.name)+'</b><small>'+coEsc(x.behavior)+'</small></div>'}).join('')+'</div></details>'+coConceptHelp()
}
function coOkrs(){
 var m=CULTURE_OKR_MODEL;
 return '<section class="co-section"><div class="co-heading"><h2>سه تغییر اصلی برای ۹۰ روز</h2><p>قرار نیست همه مشکلات را هم‌زمان حل کنیم.</p></div>'+
 '<div class="co-plain-language"><b>هدف (Objective)</b> یعنی چه چیزی بهتر شود؛ <b>نتیجه کلیدی (KR)</b> یعنی نشانه قابل اندازه‌گیری آن. عددها فعلاً پیشنهادی‌اند و پس از سنجش خط مبنا بازتنظیم می‌شوند.</div>'+
 '<div class="co-objectives">'+m.okrs.map(function(o,i){
  var check=coState().checkins[o.id]||{},pillar=m.pillars.find(function(p){return p.id===o.pillar});
  return '<article class="co-objective co-goal-slim"><div class="co-objective-top"><span>هدف '+coPersian(i+1)+' از ۳</span><span>چرخه آزمایشی ۹۰ روزه</span></div><h3>'+coEsc(o.title)+'</h3><p>'+coEsc(o.summary)+'</p>'+
  '<div class="co-goal-at-glance"><span>مسئول پیگیری: <b>'+coEsc(o.owner)+'</b></span><span>خط مبنا: <b>هنوز تأیید نشده</b></span></div>'+
  '<details class="co-goal-details"><summary>مشاهده ۳ نتیجه قابل‌سنجش و ثبت گزارش دوره‌ای</summary><div class="co-kr-list">'+o.kr.map(function(k){return '<div class="co-kr"><b>'+coEsc(k.id)+' · '+coEsc(k.title)+'</b><small>شاخص مرتبط: '+coEsc(k.metric)+' | هدف پیشنهادی: '+coTarget(k.target)+'</small>'+coScoreProgress(k.metric,k.target)+'</div>'}).join('')+'</div>'+
  '<details class="co-check"><summary>گزارش کوتاه وضعیت / Check-in '+(check.period?'— '+coEsc(check.period):'')+'</summary>'+
  '<form onsubmit="coSaveCheckin(event,\''+o.id+'\')"><label>دوره گزارش<input name="period" maxlength="40" value="'+coEsc(check.period||'')+'" placeholder="مثلاً هفته چهارم"></label>'+
  '<label>اعتماد به تحقق هدف<select name="confidence"><option value="" '+(!check.confidence?'selected':'')+'>هنوز ارزیابی نشده</option><option value="بالا" '+(check.confidence==='بالا'?'selected':'')+'>بالا</option><option value="متوسط" '+(check.confidence==='متوسط'?'selected':'')+'>متوسط</option><option value="پایین" '+(check.confidence==='پایین'?'selected':'')+'>پایین</option></select></label>'+
  '<label>مانع اصلی و تصمیم بعدی<textarea rows="3" name="decision" maxlength="900" placeholder="بدون نام اشخاص یا داده محرمانه">'+coEsc(check.decision||'')+'</textarea></label>'+
  '<button type="submit" class="co-primary">ثبت گزارش کوتاه</button><span class="co-form-status" role="status"></span></form></details>'+
  '<div class="co-case-links"><span>کیس‌های مرتبط:</span>'+o.cases.map(function(id){return '<button onclick="openCase('+id+',\'managers\')">کیس '+coPersian(id)+'</button>'}).join('')+'</div></details></article>'
 }).join('')+'</div></section>'+
 '<details class="co-deeper"><summary>۱۰ اقدام اجرایی پشتیبان این اهداف</summary><p>اقدام را با نتیجه اشتباه نگیریم؛ این کارها به تغییر شاخص‌ها کمک می‌کنند.</p>'+coInitiatives()+'</details>'
}
function coInitiatives(){return '<div class="co-initiative-list">'+CULTURE_OKR_MODEL.initiatives.map(function(i){var status=coState().initiatives[i.id]||'برنامه‌ریزی‌شده';return '<div class="co-initiative"><div><strong>'+coEsc(i.id)+' · '+coEsc(i.title)+'</strong><small>مربوط به '+coEsc(i.okr)+' · '+coEsc(i.owner)+' · '+coEsc(i.phase)+'</small></div><select aria-label="وضعیت '+coEsc(i.id)+'" onchange="coSetInitiative(\''+i.id+'\',this.value)"><option value="برنامه‌ریزی‌شده" '+(status==='برنامه‌ریزی‌شده'?'selected':'')+'>برنامه‌ریزی‌شده</option><option value="در حال اجرا" '+(status==='در حال اجرا'?'selected':'')+'>در حال اجرا</option><option value="انجام‌شده" '+(status==='انجام‌شده'?'selected':'')+'>انجام‌شده</option></select></div>'}).join('')+'</div>'}
function coKpiForm(k){var raw=coState().measurements[k.id]||{},baseline=raw.baseline==null?'':String(raw.baseline);return '<form class="co-data-form" onsubmit="coSaveKpi(event,\''+k.id+'\')"><div class="co-form-grid"><label>Baseline معتبر (٪)<input name="baseline" type="number" step="0.1" min="0" max="100" placeholder="نامشخص" value="'+coEsc(baseline)+'"></label><label>صورت کسر (تعداد)<input name="num" type="number" min="0" step="1" placeholder="تعداد موارد منطبق" value="'+coEsc(raw.num==null?'':raw.num)+'"></label><label>مخرج کسر (تعداد)<input name="den" type="number" min="1" step="1" placeholder="کل موارد واجد شرایط" value="'+coEsc(raw.den==null?'':raw.den)+'"></label><label>دوره داده<input name="period" maxlength="60" placeholder="مثلاً آبان ۱۴۰۵" value="'+coEsc(raw.period||'')+'"></label></div><label>منبع و دامنه نمونه (بدون مشخصات فردی)<input name="evidence" maxlength="180" placeholder="مثلاً صورت‌جلسات ۳ واحد در آبان" value="'+coEsc(raw.evidence||'')+'"></label><button class="co-primary" type="submit">ثبت مقدار و محاسبه شاخص</button><span class="co-form-status" role="status"></span></form>'}
function coMetricCard(k){var x=coMeasured(k.id);return '<article class="co-kpi"><div class="co-kpi-head"><span>'+coEsc(k.id)+' · '+coEsc(k.pillar)+'</span><span>Target آزمایشی '+coTarget(k.target)+'</span></div><h3>'+coEsc(k.title)+'</h3><div class="co-kpi-value"><b>'+coNumber(x?x.value:null)+'</b><span>'+(x?'مقدار ثبت‌شده توسط کاربر':'عملکرد شرکت نامشخص')+'</span></div>'+coScoreProgress(k.id,k.target)+'<details><summary>تعریف شاخص، مالک و ورود داده</summary><div class="co-kpi-def"><b>Formula:</b> '+coEsc(k.formula)+'<br><b>مالک:</b> '+coEsc(k.owner)+'<br><b>بسامد:</b> '+coEsc(k.frequency)+'<br><b>منبع:</b> '+coEsc(k.source)+'<br><b>احتیاط:</b> '+coEsc(k.quality)+'</div>'+coKpiForm(k)+'</details></article>'}
function coMetrics(){
 var m=CULTURE_OKR_MODEL;
 var ns={id:'NS',pillar:'North Star',title:'نرخ مأموریت ایمن، به‌موقع و با تحویل معتبر',unit:'%',formula:m.north.numerator+' ÷ '+m.north.denominator+' × ۱۰۰',owner:'مدیریت عملیات + HSE',frequency:'ماهانه',target:90,source:'سامانه مأموریت، تأیید ایمنی و تحویل',quality:m.north.caveat};
 var essentials=['K1','K2','K5'],main=m.kpis.filter(function(k){return essentials.includes(k.id)}),more=m.kpis.filter(function(k){return !essentials.includes(k.id)});
 return '<section class="co-section"><div class="co-heading"><h2>پیشرفت را از کجا بفهمیم؟</h2><p>از چند عدد مهم شروع می‌کنیم؛ بقیه شاخص‌ها در صورت نیاز قابل مشاهده‌اند.</p></div>'+
 '<div class="co-plain-language">برای محاسبه، <b>تعداد موارد انجام‌شده</b> و <b>کل موارد بررسی‌شده</b> را با دوره و منبع وارد کنید؛ درصد خودکار حساب می‌شود. فعلاً هیچ داده واقعی شرکت بارگذاری نشده است.</div>'+
 '<div class="co-guard">Targetهای زیر نمونه پیشنهادی برای تصمیم‌گیری‌اند، نه آمار شرکت یا اهداف مصوب. در واردکردن اطلاعات، از نام و داده محرمانه کارکنان استفاده نکنید.</div>'+
 '<div class="co-metrics-grid">'+coMetricCard(ns)+main.map(coMetricCard).join('')+'</div>'+
 '<details class="co-deeper co-more-metrics"><summary>مشاهده '+coPersian(more.length)+' شاخص تکمیلی و فرم ثبت داده آن‌ها</summary><div class="co-metrics-grid">'+more.map(coMetricCard).join('')+'</div></details>'+
 '<div class="co-export-row"><button class="co-secondary" onclick="coExport()">دریافت نسخه پشتیبان داده‌های همین دستگاه</button></div></section>'
}
function coRoadmap(){
 var m=CULTURE_OKR_MODEL;
 return '<section class="co-section"><div class="co-heading"><h2>برنامه ساده شش‌ماهه</h2><p>ابتدا بدانیم کجاییم، بعد محدود و واقعی تمرین کنیم، سپس رفتارهای موفق را گسترش دهیم.</p></div>'+
 '<div class="co-phase-grid">'+m.phases.map(function(p,i){return '<article class="co-phase"><div class="co-phase-head"><span>'+coPersian(i+1)+'</span><div><b>'+coEsc(p.label)+'</b><small>'+coEsc(p.weeks)+'</small></div></div>'+
 '<p>'+coEsc(p.goal)+'</p><details class="co-step-details"><summary>اقدام‌های این مرحله و شرط عبور</summary><ol>'+p.actions.map(function(x){return '<li>'+coEsc(x)+'</li>'}).join('')+'</ol><div class="co-phase-gate"><b>شرط عبور:</b> '+coEsc(p.gate)+'</div></details></article>'}).join('')+'</div></section>'+
 '<section class="co-section"><div class="co-heading"><h2>جلسه‌های پیگیری، مختصر و منظم</h2></div>'+
 '<div class="co-cadence"><div><b>هفتگی</b><p>مرور یک کیس و اقدام باز</p></div><div><b>هر دو هفته</b><p>کوچینگ گروهی و بررسی سه هدف</p></div><div><b>ماهانه</b><p>مرور اعداد و کیفیت داده</p></div><div><b>هر ۹۰ روز</b><p>تصمیم برای ادامه، اصلاح یا گسترش</p></div></div></section>'+
 '<details class="co-deeper"><summary>اقدامات اجرایی، مسئولان و وضعیت پیگیری</summary>'+coInitiatives()+'</details>'
}
function coCases(){var m=CULTURE_OKR_MODEL;return '<section class="co-section"><div class="co-heading"><h2>۱۵ کیس؛ پل میان تشخیص و OKR</h2><p>برای هر کیس می‌توانید تجربه متفاوت مدیران، ستاد یا عملیات را باز کنید.</p></div><div class="co-case-matrix">'+CASES.map(function(c){var pids=m.casePillars[c.id]||[];return '<article class="co-case-item"><div><b>'+coPersian(c.id)+' · '+coEsc(c.title)+'</b><small>'+pids.map(function(id){var p=m.pillars.find(function(z){return z.id===id});return p?coEsc(p.title):id}).join(' · ')+'</small></div><div class="co-role-buttons"><button onclick="openCase('+c.id+',\'managers\')">مدیران</button><button onclick="openCase('+c.id+',\'hq\')">ستاد</button><button onclick="openCase('+c.id+',\'operations\')">عملیات</button></div></article>'}).join('')+'</div></section>'}
function coSources(){
 var m=CULTURE_OKR_MODEL;
 return '<section class="co-section"><div class="co-heading"><h2>راهنمای استفاده؛ کمتر از سه دقیقه</h2><p>برای استفاده لازم نیست متخصص OKR باشید.</p></div>'+
 '<div class="co-three-stages co-guide-steps">'+
 '<div><b>۱. تصویر کلی</b><p>از «وضع موجود» به «رفتار مطلوب» نگاه کنید و نقش خود را انتخاب کنید.</p><button class="co-link" onclick="cultureGo(\'map\')">شروع از تصویر کلی ←</button></div>'+
 '<div><b>۲. سه هدف</b><p>فقط سه تغییر مهم را ببینید؛ لازم نیست از ابتدا تمام شاخص‌ها را بخوانید.</p><button class="co-link" onclick="cultureGo(\'okrs\')">دیدن اهداف ←</button></div>'+
 '<div><b>۳. اجرا و سنجش</b><p>یک اقدام واقعی انجام دهید؛ سپس فقط اگر داده معتبر دارید، مقدار شاخص را ثبت کنید.</p><button class="co-link" onclick="cultureGo(\'metrics\')">سنجش پیشرفت ←</button></div>'+
 '</div></section>'+
 '<details class="co-deeper"><summary>منشور رفتاری پیشنهادی ناوصنعت؛ شش جمله برای کار روزانه</summary><ol class="co-guard-list">'+
 '<li>پیش از قول‌دادن، ظرفیت و هماهنگی لازم را بررسی می‌کنیم.</li>'+
 '<li>تعهد مهم بدون مسئول، موعد و روش پیگیری نمی‌ماند.</li>'+
 '<li>تغییر برنامه را به‌موقع به افراد درگیر اطلاع می‌دهیم.</li>'+
 '<li>درباره خطر و نگرانی، بی‌تلافی و طبق مسیر ایمن حرف می‌زنیم.</li>'+
 '<li>تحویل کار وقتی کامل است که گیرنده وضعیت و موارد باز را تأیید کند.</li>'+
 '<li>مدیران همان قواعدی را رعایت می‌کنند که از دیگران انتظار دارند.</li></ol><p>این منشور، پیش‌نویس است؛ برای تصویب باید با مدیران و کارکنان گفت‌وگو شود.</p></details>'+
 '<details class="co-deeper"><summary>پشتوانه مدل، فرضیه‌ها و داده‌های هنوز ناموجود</summary><div class="co-evidence"><article><b>شواهد بیرونی</b><p>معرفی شرکت در زنجیره صنعت مس و مفاهیم Strategy Map، KPI و OKR در منابع Perdoo.</p></article><article><b>فرضیه‌های قابل بررسی</b><p>'+coEsc(m.context.diagnostic)+'</p></article><article><b>داده‌هایی که نداریم</b><p>اندازه ناوگان فعال، وضعیت امروز فرایندها، نرخ واقعی تحویل، داده معتبر HSE، نظر کارکنان و Baseline فرهنگ.</p></article></div></details>'+
 '<details class="co-deeper"><summary>منابع و محدودیت‌های ایمنی و محرمانگی</summary><div class="co-source-list">'+m.context.sources.map(function(r){return '<a href="'+coEsc(r.url)+'" target="_blank" rel="noopener noreferrer">'+coEsc(r.label)+' ↗</a>'}).join('')+'</div><ol class="co-guard-list">'+m.guardrails.map(function(x){return '<li>'+coEsc(x)+'</li>'}).join('')+'</ol></details>'
}
function cultureOkrPage(){if(typeof CULTURE_OKR_MODEL==='undefined')return '<div class="content-card"><h1>ماژول تحول فرهنگ بارگذاری نشد</h1><p>دسترسی به فایل داده را بررسی کنید.</p></div>';var views={map:coStrategyMap,okrs:coOkrs,metrics:coMetrics,roadmap:coRoadmap,cases:coCases,sources:coSources};return '<div class="fade co-app">'+coHero()+coIntro()+coTabs()+(views[cultureTab]||views.map)()+'<footer class="co-foot">CULTURE → LEADERSHIP → BEHAVIOR → RESULT · نسخه آزمایشی و مستقل از سامانه سازمانی</footer>'+footer()+'</div>'}
function coSaveKpi(ev,id){ev.preventDefault();var f=ev.target,e=function(n){return f.elements.namedItem(n).value.trim()},bn=e('baseline'),nn=e('num'),dd=e('den'),per=e('period'),src=e('evidence');var status=f.querySelector('.co-form-status');
var baseline=bn===''?null:Number(bn),isBaseValid=baseline===null||(Number.isFinite(baseline)&&baseline>=0&&baseline<=100);
if(!isBaseValid){status.textContent='Baseline باید عدد ۰ تا ۱۰۰ باشد.';return}
var hasCount=nn!==''||dd!=='';
if(hasCount&&(nn===''||dd===''||!Number.isInteger(Number(nn))||!Number.isInteger(Number(dd))||Number(nn)<0||Number(dd)<1||Number(nn)>Number(dd))){status.textContent='صورت و مخرج باید تعداد صحیح، غیرمنفی و صورت کمتر یا برابر مخرج باشد.';return}
if((hasCount||baseline!==null)&&(!per||!src)){status.textContent='برای ثبت خط مبنا یا عملکرد، دوره و منبع اندازه‌گیری را وارد کنید.';return}
var s=coState(),value=hasCount?Math.round(Number(nn)/Number(dd)*10000)/100:null;
s.measurements[id]={baseline:baseline,num:hasCount?Number(nn):null,den:hasCount?Number(dd):null,value:value,period:per,evidence:src};
if(!coSave(s)){status.textContent='ذخیره محلی ممکن نشد؛ از داده‌های محرمانه استفاده نکنید.';return}
var card=document.getElementById('co-kpi-'+id);
if(card){
 var k=id==='NS'?{id:'NS',pillar:'North Star',title:'نرخ مأموریت ایمن، به‌موقع و با تحویل معتبر',unit:'%',formula:CULTURE_OKR_MODEL.north.numerator+' ÷ '+CULTURE_OKR_MODEL.north.denominator+' × ۱۰۰',owner:'مدیریت عملیات + HSE',frequency:'ماهانه',target:90,source:'سامانه مأموریت، تأیید ایمنی و تحویل',quality:CULTURE_OKR_MODEL.north.caveat}:CULTURE_OKR_MODEL.kpis.find(function(q){return q.id===id});
 if(k){card.outerHTML=coMetricCard(k);var updated=document.getElementById('co-kpi-'+id);if(updated){var details=updated.querySelector('details');if(details)details.open=true;var msg=updated.querySelector('.co-form-status');if(msg)msg.textContent='ثبت شد. این عدد فقط داده واردشده در همین دستگاه است.'}}
}else if(status)status.textContent='داده ذخیره شد؛ برای دیدن نتیجه این بخش را دوباره باز کنید.';
}
function coSaveCheckin(ev,id){ev.preventDefault();var f=ev.target,s=coState(),x=function(n){return f.elements.namedItem(n).value.trim()};
s.checkins[id]={period:x('period'),confidence:x('confidence'),decision:x('decision')};
var ok=coSave(s),msg=f.querySelector('.co-form-status');if(msg)msg.textContent=ok?'Check-in فقط در همین مرورگر ذخیره شد.':'ذخیره ممکن نیست.'}
function coSetInitiative(id,value){var allowed=['برنامه‌ریزی‌شده','در حال اجرا','انجام‌شده'];if(!allowed.includes(value))return;var s=coState();s.initiatives[id]=value;if(!coSave(s))announce('ذخیره محلی اقدام ممکن نشد.')}
function coExport(){var d={model:"NaavSanat Culture-OKR v7",notice:"Local pilot data; not verified organizational reporting.",data:coState()};var blob=new Blob([JSON.stringify(d,null,2)],{type:'application/json;charset=utf-8'});var url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='naavsanat-culture-okr-local.json';a.click();setTimeout(function(){URL.revokeObjectURL(url)},800)}
