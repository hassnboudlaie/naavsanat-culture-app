/* NAAVSANAT — Shared Learning Experience. All screens are learner-facing. */
(function(){
"use strict";
var roleNames={managers:"مدیران ستاد",hq:"کارکنان ستاد",operations:"کارکنان عملیاتی"};
var roleIcons={managers:"🧭",hq:"🗂️",operations:"🦺"};
var steps=["موقعیت","انتخاب","پیامد","نقش‌آفرینی","واکاوی","اقدام"];
var stepIcons=["🧩","🧭","🔎","🎭","🧠","🎯"];
var storedRole=saved("ns_role","managers");
var role=roleNames[storedRole]?storedRole:"managers";
/* Contextual icons and optional glossary: training aids, not official safety signage. */
var caseIcons=["🏗️","🧭","⚖️","✅","🤝","🔗","🗣️","⏱️","🦺","🎛️","🪞","👥","🛡️","🎯","🔄"];
var sessionIcons={
 managers:["🏗️","🧭","⚖️","✅","🤝","🌱"],
 hq:["🪞","📌","🔗","✅","🤝","🎯"],
 operations:["🦺","🛡️","🔧","🚧","🎭","🎯"]
};
function caseIcon(id){return caseIcons[id-1]||"🧩"}
function sessionIcon(r,i){return (sessionIcons[r]||[])[i]||"📘"}
function caseTopline(id,caption){return '<span class="case-topline"><span class="tiny-label">'+safe(caption)+'</span><span class="case-sticker" aria-hidden="true">'+caseIcon(id)+'</span></span>'}
var shorthand={
 managers:[
  ["RACI","Responsible · Accountable · Consulted · Informed","تعیین مسئول اجرا، پاسخگو، مشورت‌شونده و مطلع"],
  ["OB","Organizational Behavior","رفتار افراد و گروه‌ها در محیط کار"],
  ["OC","Organizational Culture","هنجارها و الگوهای رفتاری مشترک"]
 ],
 hq:[
  ["RACI","Responsible · Accountable · Consulted · Informed","روشن‌کردن مسئولیت و مرز نقش‌ها"],
  ["F/U","Follow-Up","پیگیری تعهد تا حصول نتیجه"],
  ["SOP","Standard Operating Procedure","روش اجرایی استاندارد برای انجام کار"]
 ],
 operations:[
  ["HSE","Health, Safety & Environment","بهداشت، ایمنی و محیط زیست"],
  ["SOP","Standard Operating Procedure","روش اجرایی استاندارد"],
  ["RP","Role Play","تمرین گفت‌وگو در یک موقعیت شغلی"]
 ]
};
function glossary(r){
 return '<details class="work-glossary"><summary>🔤 اختصارات کاربردی این مسیر <span aria-hidden="true">⌄</span></summary><div class="glossary-items">'+
 shorthand[r].map(function(x){return '<div class="glossary-item"><bdi dir="ltr" class="glossary-code">'+x[0]+'</bdi><div><strong dir="ltr">'+x[1]+'</strong><span>'+x[2]+'</span></div></div>'}).join("")+
 '</div><p>این اصطلاحات آموزشی‌اند؛ به‌معنای وجود رویه مصوب در ناوصنعت نیستند.</p></details>';
}
function saved(k,def){try{var v=JSON.parse(localStorage.getItem(k));return v===null?def:v}catch(e){return def}}
function store(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function safe(s){return String(s==null?"":s).replace(/[&<>"']/g,function(a){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[a]})}
function rich(s){return safe(s).replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>")}
function depth(id){return window.NAAV_DEPTH&&window.NAAV_DEPTH[id]||{}}
function fa(n){return String(n).replace(/\d/g,function(d){return "۰۱۲۳۴۵۶۷۸۹"[+d]})}
function path(){return (location.hash||"#/home").replace(/^#\/?/,"").split("/")}
function go(p){location.hash="#/"+p}
function a(p,t,cls){return '<a class="'+(cls||"link")+'" href="#/'+p+'">'+t+'</a>'}
function choiceKey(r,id){return "naav_studio_choice_"+r+"_"+id}
function actionKey(r,id){return "naav_studio_action_"+r+"_"+id}
function proofKey(r,id){return "naav_studio_proof_"+r+"_"+id}
function roleOf(p){return roleNames[p[1]]?p[1]:role}
function currCase(r,id){return CASES[id-1]&&CASES[id-1].variants[r]?CASES[id-1]:null}
function lab(id,r){return NAV_ROLE_LABS[r]&&NAV_ROLE_LABS[r][String(id)]}
function sessions(r){
 if(r==="operations")return ops.filter(function(o){return !o.break}).map(function(o,i){return {title:o.title,desc:o.desc,topics:o.items,ids:i<5?(opsCaseBlocks[i]||[]):[],time:o.time,final:i===5}});
 var data=r==="managers"?managers:hq;
 return data.map(function(s,i){return {title:s.t,desc:s.d,topics:s.topics,ids:sessionCases[r][i]||[],time:"جلسه "+fa(i+1),final:false}});
}
function header(p){
 var inner=p[0]!=="home",r=roleOf(p);
 var back=p[0]==="case"?"track/"+r:p[0]==="session"?"track/"+r:"home";
 return '<header class="mast"><div class="mast-inner"><a class="identity" href="#/home"><img src="'+LOGO_DATA+'" alt="نشان ناوصنعت مس"><span><strong>ناوصنعت مس</strong><small>رفتار و فرهنگ سازمانی</small></span></a>'+
 (inner?'<div class="mast-tools">'+a(back,'بازگشت','head-link')+a("home","تغییر گروه","head-link outline")+'</div>':'<span class="mast-caption">یادگیری از تجربه کار</span>')+'</div></header>';
}
/* Quiet navigation: right side on desktop and a single expandable row on smaller screens. */
function learningLinks(p){
 var r=roleOf(p),page=p[0],rolePage=page==="track"||page==="case"||page==="session"||page==="library";
 var items=[
  ["home","🏠","خانه","home",page==="home"],
  ["managers","🧭","مدیران ستاد","track/managers",rolePage&&r==="managers"],
  ["hq","🗂️","کارکنان ستاد","track/hq",rolePage&&r==="hq"],
  ["operations","🦺","کارکنان عملیاتی","track/operations",rolePage&&r==="operations"],
  ["culture","📜","قواعد رفتار و فرهنگ","culture/"+r,page==="culture"],
  ["medicator","🖼️","مدیکاتور","medicator/"+r,page==="medicator"],
  ["behavior","🎭","هنر رفتار","behavior/"+r,page==="behavior"]
 ];
 return items.map(function(item){
  var selected=item[4],cls="dashboard-link"+(selected?" is-active":"")+(item[0]==="culture"?" dashboard-section-start":"");
  return '<a class="'+cls+'" href="#/'+item[3]+'"'+(selected?' aria-current="page"':'')+'><span class="dashboard-glyph" aria-hidden="true">'+item[1]+'</span><span>'+item[2]+'</span></a>';
 }).join("");
}
function dashboard(p){
 var r=roleOf(p);
 return '<aside class="dashboard-rail" aria-label="داشبورد یادگیری"><div class="dashboard-heading"><span>بخش‌های یادگیری</span><small>'+roleNames[r]+'</small></div><nav aria-label="ناوبری اصلی">'+learningLinks(p)+'</nav></aside>';
}
function mobileDashboard(p){
 var section=p[0],current=section==="case"?"کیس "+fa(+p[2]||1)+" · "+steps[Math.max(0,Math.min(5,+p[3]||0))]:section==="session"?"جلسه "+fa((+p[2]||0)+1):section==="track"?roleNames[roleOf(p)]:section==="culture"?"قواعد رفتار و فرهنگ":section==="medicator"?"مدیکاتور":section==="behavior"?"هنر رفتار":"خانه";
 return '<details class="mobile-dash"><summary><span class="mobile-dash-control">☰ بخش‌ها</span><strong class="mobile-dash-name">'+current+'</strong><span class="mobile-dash-chevron" aria-hidden="true">⌃</span></summary><nav class="mobile-dash-panel" aria-label="انتخاب بخش">'+learningLinks(p)+'</nav></details>';
}
function frame(p,body,cls){
 return header(p)+'<div class="app-layout">'+dashboard(p)+
 '<main id="app" class="container '+(cls||"")+'" tabindex="-1">'+body+'</main></div>'+
 '<footer class="site-foot">ناوصنعت مس <span aria-hidden="true">·</span> یادگیری، گفت‌وگو، اقدام</footer>'+mobileDashboard(p);
}
function landing(){
 var items=[
  ["managers","🧭","مدیران ستاد","تصمیم، اختیار و پاسخگویی","track/managers",false],
  ["hq","🗂️","کارکنان ستاد","همکاری بین‌واحدی و تعهد حرفه‌ای","track/hq",false],
  ["operations","🦺","کارکنان عملیاتی","هماهنگی، تحویل کار و ایمنی","track/operations",false],
  ["medicator","🖼️","مدیکاتور","تصویر مدیریتی، تحلیل و تصمیم","medicator/"+role,true],
  ["behavior","🎭","هنر رفتار با افراد دشوار","موقعیت دشوار، گفت‌وگو و Role Play","behavior/"+role,true]
 ];
 return '<section class="landing-head"><div class="copper-line"></div><div class="hero-stickers" aria-label="مفاهیم یادگیری"><span>⚙️ محیط صنعتی</span><span>🤝 همکاری</span><span>🎯 اقدام</span></div><span class="kicker">NAAVSANAT · CONTEXTUAL LEARNING</span><h1>رفتار سازمانی را<br><em>در موقعیت واقعی تمرین کنیم.</em></h1><p>تجربه واقعیِ کار، نقطه شروع یادگیری است؛ با انتخاب، تحلیل و گفت‌وگو به یک رفتار حرفه‌ای‌تر می‌رسیم.</p></section>'+
 '<section class="home-roles" aria-label="انتخاب مسیر"><h2>مسیر یادگیری را انتخاب کنید</h2><div class="role-grid">'+items.map(function(x){
 return '<a class="role-tile'+(x[5]?" module-tile":"")+'" href="#/'+x[4]+'"><span class="role-icon" aria-hidden="true">'+x[1]+'</span><strong>'+x[2]+'</strong><span class="role-desc">'+x[3]+'</span>'+(x[5]?'<span class="module-tag">ماژول مستقل</span>':'')+'<span class="role-enter">ورود <span aria-hidden="true">←</span></span></a>';
 }).join("")+'</div></section>';
}
function addOns(){return '<section class="module-bridges" aria-label="آزمایشگاه‌های مکمل"><h2>دو ماژول تکمیلی</h2><div class="module-bridge-list"><a href="#/medicator"><b>🎨 مدیکاتور</b><span>تصویر مدیریتی، تحلیل رفتار، تصمیم</span></a><a href="#/behavior"><b>💬 هنر رفتار</b><span>گفت‌وگو، موقعیت دشوار، نقش‌آفرینی</span></a></div></section>'}
function track(r){
 var ss=sessions(r);
 return '<section class="section-intro"><div class="kicker">مسیر یادگیری</div><h1>'+roleNames[r]+'</h1><p>'+safe(ROLES[r].focus)+'</p></section>'+
 '<section class="session-list" aria-label="جلسات آموزشی">'+ss.map(function(s,i){return '<a class="session-tile" href="#/session/'+r+'/'+i+'"><span class="session-index" aria-hidden="true">'+sessionIcon(r,i)+'</span><span class="session-info"><strong>'+safe(s.title)+'</strong><span>'+safe(s.desc)+'</span></span><span class="session-end"><small>'+safe(s.time)+'</small><b aria-hidden="true">←</b></span></a>'}).join("")+'</section>'+
 '<div class="subtle-footline">'+a("library/"+r,"مشاهده هر ۱۵ کیس","text-link")+a("culture/"+r,"قواعد رفتار و فرهنگ","text-link")+'</div>'+glossary(r);
}
function actionExercise(){
 return '<div class="action-focus"><h2>یک رفتار را انتخاب کنیم</h2><div class="action-three">'+["شروع می‌کنم","متوقف می‌کنم","ادامه می‌دهم"].map(function(x,i){return '<div><span>'+fa(i+1)+'</span><strong>'+x+'</strong></div>'}).join("")+'</div><p class="prompt-question">در موقعیت کاری بعدی، چه رفتار مشخصی را تغییر می‌دهیم؟</p></div>';
}
function lesson(r,num){
 var s=sessions(r)[num];if(!s)return track(r);
 var ids=s.ids||[],anchor=ids.length?depth(ids[0]):{};
 return '<div class="crumb">'+a("track/"+r,roleNames[r],'text-link')+' <span> / </span> '+fa(num+1)+'</div>'+
 '<section class="section-intro lesson-intro"><div class="kicker">'+safe(s.time)+'</div><h1>'+safe(s.title)+'</h1><p>'+safe(s.desc)+'</p></section>'+
 (s.final?actionExercise():
 '<section class="question-box"><span>پرسش محوری</span><strong>'+safe(s.topics[0]||"در این موقعیت چه رفتاری اهمیت دارد؟")+'</strong></section>'+
 (anchor.tension?'<div class="session-dilemma"><strong>چالش واقعی این بحث</strong><p>'+rich(anchor.tension)+'</p></div>':'')+
 '<section class="case-list"><h2>موقعیت‌های این جلسه</h2><div class="case-grid">'+ids.map(function(id){var c=CASES[id-1],d=depth(id);return '<a class="case-tile" href="#/case/'+r+'/'+id+'/0">'+caseTopline(id,'کیس '+fa(id))+'<strong>'+safe(c.title)+'</strong><p>'+safe(c.concept)+'</p><span class="case-link">بررسی معمای رفتاری ←</span></a>'}).join("")+'</div></section>')+
 '<div class="page-bottom">'+a("track/"+r,"همه جلسات","text-link")+'</div>';
}
function caseStages(r,id,step){
 return '<nav aria-label="شش گام یادگیری" class="case-steps six-steps">'+steps.map(function(t,i){
 return '<a class="step '+(i===step?"active":i<step?"visited":"")+'" href="#/case/'+r+'/'+id+'/'+i+'" '+(i===step?'aria-current="step"':'')+' title="گام '+fa(i+1)+': '+t+'"><span class="step-index">'+fa(i+1)+'</span><strong><span class="step-emoji" aria-hidden="true">'+stepIcons[i]+'</span>'+t+'</strong></a>';
 }).join("")+'</nav>';
}
function scenario(c,v,l){
 var lines=l.v||[];
 return '<section class="content-section step-scene"><span class="kicker">گام ۱ · موقعیت</span><h2>اگر شما جای این افراد بودید…</h2>'+
 '<div class="situation scene-focus">'+safe(v.problem)+'</div>'+
 '<div class="people-conversation">'+lines.slice(0,2).map(function(x){return '<div class="voice"><strong>'+safe(x[0])+'</strong><p>«'+safe(x[1])+'»</p></div>'}).join("")+'</div>'+
 (lines.length>2?'<details class="fold discreet-fold"><summary>صدای دیگر این موقعیت</summary><div class="voice extra-voice"><strong>'+safe(lines[2][0])+'</strong><p>«'+safe(lines[2][1])+'»</p></div></details>':'')+
 '<div class="reflection"><span class="qmark">؟</span><p>پیش از قضاوت درباره افراد، چه اطلاعات مهمی در این روایت نداریم؟</p></div>'+
 '<p class="context-note">این موقعیت، بازسازی آموزشی از مسائل صنعت و سازمان است؛ جزئیات آن گزارش قطعی یک رخداد نیست.</p></section>';
}
function decision(c,r,l){
 var chosen=saved(choiceKey(r,c.id),-1);
 return '<section class="content-section step-decision"><span class="kicker">گام ۲ · انتخاب</span><h2>'+safe(l.q)+'</h2>'+
 '<div class="choices">'+l.o.map(function(o,i){return '<button type="button" class="pick '+(chosen===i?"chosen":"")+'" data-choice="'+i+'" data-role="'+r+'" data-case="'+c.id+'" aria-pressed="'+(chosen===i)+'"><span class="pick-letter">'+["الف","ب","ج"][i]+'</span><span>'+safe(o[0])+'</span></button>'}).join("")+'</div>'+
 '<div class="choice-status" data-choice-status aria-live="polite">'+(chosen<0?'یک گزینه را انتخاب کنید؛ پیامد آن در گام بعد دیده می‌شود.':'انتخاب ثبت شد: گزینه '+["الف","ب","ج"][chosen]+' · اکنون پیامد آن را ببینید.')+'</div></section>';
}
function consequence(c,r,l){
 var chosen=saved(choiceKey(r,c.id),-1),d=depth(c.id);
 if(chosen<0)return '<section class="content-section"><span class="kicker">گام ۳ · پیامد</span><h2>ابتدا یک تصمیم بگیریم.</h2><div class="empty-decision"><p>برای دیدن پیامد، از گام «انتخاب» یکی از سه تصمیم را انتخاب کنید.</p>'+a("case/"+r+"/"+c.id+"/1","رفتن به انتخاب ←","primary-btn")+'</div></section>';
 var picked=l.o[chosen];
 return '<section class="content-section step-impact"><span class="kicker">گام ۳ · پیامد</span><h2>این تصمیم چه چیزی را تغییر می‌دهد؟</h2>'+
 '<div class="selected-decision"><small>انتخاب گروه · گزینه '+["الف","ب","ج"][chosen]+'</small><strong>'+safe(picked[0])+'</strong></div>'+
 '<div class="impact-card"><span>پیامد محتمل</span><p>'+safe(picked[1])+'</p></div>'+
 '<div class="impact-condition"><strong>نقطه حساس تصمیم</strong><p>'+safe(picked[2])+'</p></div>'+
 '<details class="fold discreet-fold"><summary>اگر مسیر دیگری انتخاب می‌کردیم چه می‌شد؟</summary>'+
 l.o.map(function(o,i){if(i===chosen)return "";return '<div class="alt-path"><strong>گزینه '+["الف","ب","ج"][i]+'</strong><p>'+safe(o[1])+'</p></div>'}).join("")+'</details>'+
 '<div class="reflection"><span class="qmark">؟</span><p>آیا با دانستن این پیامد، باز هم همین تصمیم را انتخاب می‌کنیم؟</p></div></section>';
}
function practice(c,v,l){
 var d=depth(c.id),voices=[];
 (l.v||[]).forEach(function(person){var existing=voices.find(function(x){return x[0]===person[0]});if(existing){existing[1]+=" "+person[1]}else voices.push([person[0],person[1]])});
 return '<section class="content-section step-roleplay"><span class="kicker">گام ۴ · نقش‌آفرینی</span><h2>حالا در این موقعیت گفت‌وگو کنیم.</h2>'+
 '<div class="role-play-grid">'+voices.map(function(x,i){return '<div class="play-person"><small>نقش '+fa(i+1)+'</small><strong>'+safe(x[0])+'</strong><p>«'+safe(x[1])+'»</p></div>'}).join("")+'</div>'+
 '<div class="speech-task"><span>چالش اصلی گفت‌وگو</span><strong>'+safe(l.r||v.questions[0])+'</strong></div>'+
 '<details class="pressure-reveal"><summary><span aria-hidden="true">⚡</span> اتفاق غیرمنتظره در گفت‌وگو را آشکار کنید</summary><div><p>'+rich(d.pressure||"طرف مقابل به تصمیم اعتراض جدی می‌کند.")+'</p><strong>گفت‌وگو را ادامه دهید؛ بدون عقب‌نشینی غیرموجه یا حمله شخصی.</strong></div></details>'+
 '<details class="fold discreet-fold"><summary>یک عبارت پیشنهادی برای شروع</summary><p>«'+safe(v.dialogue)+'»</p></details>'+
 '<div class="reflection"><span class="qmark">؟</span><p>کدام جمله توانست هم رابطه را حفظ کند و هم مسئولیت را روشن کند؟</p></div></section>';
}
function reflect(c,r,v,g){
 var d=depth(c.id);
 return '<section class="content-section step-reflect"><span class="kicker">گام ۵ · واکاوی</span><h2>ریشه رفتاری مسئله کجاست؟</h2>'+
 '<div class="analysis-lead"><strong>بینش کلیدی</strong><p>'+rich(d.mechanism||c.theory.explanation)+'</p></div>'+
 '<div class="depth-spotlight"><span>تعارضی که باید بشناسیم</span><p>'+rich(d.tension||"میان خواسته‌های مشروع ذی‌نفعان تعارض وجود دارد.")+'</p></div>'+
 '<details class="fold"><summary>چه شواهدی برای قضاوت لازم است؟</summary><p>'+rich(d.test||c.evidence)+'</p></details>'+
 '<details class="fold"><summary>مفهوم علمی · '+safe(c.theory.name)+'</summary><p>'+safe(c.theory.explanation)+'</p><p class="science-note">این مفهوم یک چارچوب تحلیل است، نه تشخیص قطعی علت رفتار افراد.</p></details>'+
 '<details class="fold"><summary>از کتاب «حقایق تلخ» چه می‌آموزیم؟</summary><strong>'+safe(d.book||g.book)+'</strong><p>'+safe(g.bridge)+'</p><p class="science-note">اقتباس مفهومی است، نه ادعای وقوع داستان کتاب در شرکت.</p></details>'+
 '<div class="reflection"><span class="qmark">؟</span><p>'+rich(d.debrief||v.questions[0])+'</p></div></section>';
}
function conclude(c,r,v,g){
 var d=depth(c.id),old=saved(actionKey(r,c.id),-1),pr=saved(proofKey(r,c.id),"");
 var options=(v.solution||[]).slice(0,3);
 return '<section class="content-section step-action"><span class="kicker">گام ۶ · اقدام</span><h2>از این تجربه، چه رفتاری وارد کار کنیم؟</h2>'+
 '<div class="takeaway action-rule">'+rich(d.shift||g.rule)+'</div>'+
 '<p class="action-prompt">یک اقدام مشخص برای موقعیت کاری بعدی انتخاب کنیم:</p>'+
 '<div class="action-choices">'+options.map(function(text,i){return '<button type="button" class="action-option '+(old===i?"chosen":"")+'" data-action-choice="'+i+'" data-role="'+r+'" data-case="'+c.id+'" aria-pressed="'+(old===i)+'"><span class="action-no">'+fa(i+1)+'</span><span>'+safe(text)+'</span></button>'}).join("")+'</div>'+
 '<div class="proof-panel"><label for="proof-field">از کجا بفهمیم این رفتار واقعاً اجرا شده است؟</label><textarea id="proof-field" class="proof-field" rows="2" maxlength="240" placeholder="یک نشانه قابل مشاهده؛ مثلاً تأیید تحویل توسط شیفت بعد...">'+safe(pr)+'</textarea><div class="proof-bottom"><button type="button" class="save-proof" data-save-proof="'+c.id+'" data-role="'+r+'">ثبت نتیجه گروه</button><span class="proof-status" role="status">'+(old>=0?"اقدام انتخاب‌شده: "+fa(old+1):"")+'</span></div></div>'+
 '<details class="fold discreet-fold"><summary>چند نکته تکمیلی برای انتقال به کار</summary><p>'+safe(v.lesson)+'</p><p>'+rich(d.trade||"نتیجه نیازمند پیگیری است.")+'</p></details>'+
 '<p class="context-note">انتخاب و نوشته فقط در همین مرورگر ثبت می‌شود؛ اطلاعات به سرور ارسال نمی‌شود.</p></section>';
}
function caseView(r,id,step){
 var c=currCase(r,id);if(!c)return track(r);
 var v=c.variants[r],l=lab(id,r),g=NAAV_GUIDE[id-1],s=Math.max(0,Math.min(5,step|0));
 if(!l||!g)return track(r);
 var screens=[
 function(){return scenario(c,v,l)},
 function(){return decision(c,r,l)},
 function(){return consequence(c,r,l)},
 function(){return practice(c,v,l)},
 function(){return reflect(c,r,v,g)},
 function(){return conclude(c,r,v,g)}
 ];
 return '<div class="crumb">'+a("track/"+r,roleNames[r],"text-link")+' <span> / </span> کیس '+fa(id)+'</div>'+
 '<section class="case-heading"><span class="kicker">کیس '+fa(id)+' از ۱۵ · '+safe(roleNames[r])+'</span><h1><span class="heading-sticker" aria-hidden="true">'+caseIcon(id)+'</span>'+safe(c.title)+'</h1></section>'+
 caseStages(r,id,s)+'<div class="case-content" data-current-stage="'+s+'">'+screens[s]()+'</div>'+
 '<nav class="stage-foot" aria-label="حرکت بین مراحل">'+
 (s>0?a("case/"+r+"/"+id+"/"+(s-1),"مرحله قبل","secondary-btn"):a("track/"+r,"بازگشت به جلسه‌ها","secondary-btn"))+
 '<span class="stage-progress">'+fa(s+1)+' / ۶</span>'+
 (s<5?a("case/"+r+"/"+id+"/"+(s+1),"ادامه: "+steps[s+1]+" ←","primary-btn"):a("track/"+r,"بازگشت به جلسه‌ها ←","primary-btn"))+'</nav>';
}
function library(r){
 return '<section class="section-intro"><span class="kicker">'+roleNames[r]+'</span><h1>۱۵ کیس رفتار سازمانی</h1><p>از یک موقعیت شروع کنید و تصمیم‌ها را بررسی کنید.</p></section>'+
 '<div class="case-grid">'+CASES.map(function(c){return '<a class="case-tile" href="#/case/'+r+'/'+c.id+'/0">'+caseTopline(c.id,'کیس '+fa(c.id))+'<strong>'+safe(c.title)+'</strong><p>'+safe(c.concept)+'</p><span class="case-link">بازکردن ←</span></a>'}).join("")+'</div>';
}
function culture(r){
 return '<section class="section-intro"><span class="kicker">'+roleNames[r]+'</span><h1>قواعد رفتار و فرهنگ</h1><p>۱۵ قاعده پیشنهادی برای گفت‌وگو و تمرین؛ نه دستورالعمل مصوب شرکت.</p></section>'+
 '<div class="rules-grid">'+CASES.map(function(c,i){return '<a href="#/case/'+r+'/'+c.id+'/5" class="rule-row"><span class="rule-sticker" aria-hidden="true">'+caseIcon(c.id)+'</span><div><strong>'+safe(c.title)+'</strong><p>'+safe(NAAV_GUIDE[i].rule)+'</p></div></a>'}).join("")+'</div>';
}
function render(){
 var p=path(),r=roleOf(p);if(p[0]==="home")r=role;
 if(p[0]==="track"||p[0]==="case"||p[0]==="session"||p[0]==="library"||p[0]==="culture"||p[0]==="medicator"||p[0]==="behavior"){role=r;store("ns_role",r)}
 var body=p[0]==="home"?landing():p[0]==="track"?track(r):p[0]==="session"?lesson(r,+p[2]||0):p[0]==="case"?caseView(r,+p[2]||1,+p[3]||0):p[0]==="library"?library(r):p[0]==="culture"?culture(r):(p[0]==="medicator"||p[0]==="behavior")&&window.NaavIndustryModule?window.NaavIndustryModule.render(p[0],r,p[2],+p[3]||0):landing();
 document.body.classList.add("has-learning-dash");
 document.getElementById("root").innerHTML=frame(p,body,p[0]==="home"?"home-view":"content-view");
 document.title=(p[0]==="case"?"کیس "+fa(+p[2]||1)+" | ":"")+"ناوصنعت مس — یادگیری رفتار سازمانی";
 window.scrollTo(0,0);
}
document.addEventListener("click",function(e){
 var roleBtn=e.target.closest("[data-role]");if(roleBtn&&!roleBtn.hasAttribute("data-choice")){var r=roleBtn.getAttribute("data-role");if(roleNames[r]){role=r;store("ns_role",r);go("track/"+r)}return}
 var choice=e.target.closest("[data-choice]");if(choice){var r=choice.dataset.role,id=+choice.dataset.case,n=+choice.dataset.choice;store(choiceKey(r,id),n);
 document.querySelectorAll("[data-choice]").forEach(function(x){var sel=x===choice;x.classList.toggle("chosen",sel);x.setAttribute("aria-pressed",String(sel))});
 var status=document.querySelector("[data-choice-status]");if(status)status.textContent="انتخاب ثبت شد: گزینه "+["الف","ب","ج"][n]+" · اکنون پیامد آن را ببینید.";
 }
 var action=e.target.closest("[data-action-choice]");
 if(action){var ar=action.dataset.role,id=+action.dataset.case,i=+action.dataset.actionChoice;store(actionKey(ar,id),i);
 document.querySelectorAll("[data-action-choice]").forEach(function(x){var sel=x===action;x.classList.toggle("chosen",sel);x.setAttribute("aria-pressed",String(sel))});
 var info=document.querySelector(".proof-status");if(info)info.textContent="اقدام انتخاب‌شده: "+fa(i+1);
 }
 var save=e.target.closest("[data-save-proof]");
 if(save){var value=document.getElementById("proof-field").value.trim(),cr=save.dataset.role,id=+save.dataset.saveProof;
 store(proofKey(cr,id),value);var message=document.querySelector(".proof-status");if(message)message.textContent=value?"✓ نشانه تغییر در همین مرورگر ثبت شد.":"برای ثبت، یک نشانه قابل مشاهده بنویسید.";
 }

});
window.addEventListener("hashchange",render);
render();
})();