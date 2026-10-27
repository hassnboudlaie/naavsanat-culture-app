/* NAAVSANAT — Shared Learning Experience. All screens are learner-facing. */
(function(){
"use strict";
var roleNames={managers:"مدیران شرکت",hq:"کارکنان ستاد",operations:"کارکنان عملیاتی"};
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
function saved(k,def){if(memoryState&&Object.prototype.hasOwnProperty.call(memoryState,k))return memoryState[k];try{var v=JSON.parse(localStorage.getItem(k));return v===null?def:v}catch(e){return def}}
var memoryState={};
function store(k,v){memoryState[k]=v;try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}}
function selection(k,count){var n=saved(k,-1);return Number.isInteger(n)&&n>=0&&n<count?n:-1}
function sessionIndex(r,id){return sessions(r).findIndex(function(s){return s.ids.indexOf(id)>=0})}
function sessionPath(r,id){var i=sessionIndex(r,id);return i<0?"track/"+r:"session/"+r+"/"+i}
function caseExit(r,id){var i=sessionIndex(r,id),ss=sessions(r),ids=i>=0?ss[i].ids:[],n=ids.indexOf(id);return n>=0&&n<ids.length-1?["case/"+r+"/"+ids[n+1]+"/0","کیس بعدی ←"]:[sessionPath(r,id)+(r==="managers"?"/close":""),r==="managers"?"جمع‌بندی جلسه ←":"بازگشت به جلسه ←"]}
function decisionNotes(id,i){var sc=strategicCase("managers",id);if(sc)return [sc.choices[i][0],sc.choices[i][1],sc.choices[i][2]];var f=window.NAAV_MANAGER_FOCUS;return f&&f.decisionNotes&&f.decisionNotes[id-1][i]}
function noteMarkup(id,i){var n=decisionNotes(id,i);return n?'<dl class="decision-notes"><dt>منطق تصمیم</dt><dd>'+safe(n[0])+'</dd><dt>محدودیت</dt><dd>'+safe(n[1])+'</dd><dt>چه زمانی مناسب است؟</dt><dd>'+safe(n[2])+'</dd></dl>':""}
function techniqueDebrief(id){var sc=strategicCase("managers",id);if(sc)return '<details class="fold council-script"><summary>پس از اجرا: گفت‌وگوی نمونه مدیران</summary>'+window.NaavIndustryModule.dialogueMarkup(sc.dialogue)+'<p>چه کسی مسئله را از منفعت واحد به تصمیم شرکت برگرداند؟ کدام اختلاف هنوز نیازمند تصمیم مرجع مجاز است؟</p></details>';var f=window.NAAV_MANAGER_FOCUS,lines=f.dialogues[id-1],labels=f.techniques[id-1];return '<details class="fold"><summary>پس از اجرا: یک گفت‌وگوی ممکن و فنون آن</summary><p>این نمونه، پاسخ واحد یا متن حفظ‌کردنی نیست؛ با اجرای خود مقایسه کنید.</p>'+lines.map(function(t,i){return '<div class="voice"><strong>'+ (i===1?'نقش دوم':'نقش اول')+'</strong><p>«'+safe(t)+'»</p></div>'}).join('')+'<h3>چه رفتاری به گفت‌وگو کمک کرد؟</h3><p><strong>'+safe(labels[0])+'</strong> · در جمله اول، مسئله پیش از قضاوت روشن می‌شود.</p><p><strong>'+safe(labels[1])+'</strong> · جمله پایانی بحث را به تصمیم قابل پیگیری می‌رساند.</p><p>در اجرای شما کدام جمله اثر مشابه داشت؟ کجا هنوز توافق مبهم بود؟</p><p class="science-note">برای شنیدن فعال: بازتاب معنا، سؤال روشن‌کننده و بررسی فهم مشترک؛ منبع تکمیلی: فصل ارتباطات کتاب Managing Human Behavior، ویرایش پنجم.</p></details>'}
function sessionClosing(r,num){var f=num===0?["رشد شرکت به تصمیم هماهنگ و اختیار روشن نیاز دارد.","یک تصمیم توسعه‌ای را با فرض‌های مشترک، مرجع تصویب و مرز اختیار روشن کنید.","آیا تعهد مشترک روی یک نسخه تأیید شد و تصمیم داخل اختیار بدون اجازه اضافه پیش رفت؟"]:window.NAAV_MANAGER_FOCUS.sessionClose[num];return '<details class="fold session-close" id="session-close"><summary>جمع‌بندی و پیگیری جلسه</summary><h2>'+safe(f[0])+'</h2><p><strong>اقدام مدیریتی:</strong> '+safe(f[1])+'</p><p><strong>معیار مرور بعدی:</strong> '+safe(f[2])+'</p><p>هر مدیر یک اقدام از کیس‌های امروز را انتخاب کند؛ مسئول، موعد و نشانه اجرای آن را روشن بگوید.</p>'+sessions(r)[num].ids.map(function(id){var n=selection(actionKey(r,id),3),v=CASES[id-1].variants[r];return '<div class="session-record"><strong>'+safe(practical(id).title)+'</strong><p>'+safe(n>=0?actionOptions(r,id)[n]:'هنوز اقدامی انتخاب نشده است.')+'</p><p>'+safe(saved(proofKey(r,id),''))+'</p>'+a('case/'+r+'/'+id+'/5','ثبت یا مرور اقدام','text-link')+'</div>'}).join('')+'</details>'}

function safe(s){return String(s==null?"":s).replace(/[&<>"']/g,function(a){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[a]})}
function rich(s){return safe(s).replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>")}
function depth(id,r){var sc=strategicCase(r,id);return sc?Object.assign({},window.NAAV_DEPTH&&window.NAAV_DEPTH[id],sc.depth):window.NAAV_DEPTH&&window.NAAV_DEPTH[id]||{}}
function fa(n){return String(n).replace(/\d/g,function(d){return "۰۱۲۳۴۵۶۷۸۹"[+d]})}
function path(){return (location.hash||"#/home").replace(/^#\/?/,"").split("/")}
function go(p){location.hash="#/"+p}
function a(p,t,cls){return '<a class="'+(cls||"link")+'" href="#/'+p+'">'+t+'</a>'}
function choiceKey(r,id){return "naav_studio_choice_"+r+"_"+id+(strategicCase(r,id)?"_strategy_v1":"")}
function actionKey(r,id){return "naav_studio_action_"+r+"_"+id+(strategicCase(r,id)?"_strategy_v1":"")}
function proofKey(r,id){return "naav_studio_proof_"+r+"_"+id+(strategicCase(r,id)?"_strategy_v1":"")}
function roleOf(p){return roleNames[p[1]]?p[1]:role}
function strategicCase(r,id){return r==="managers"&&window.NAAV_STRATEGIC&&window.NAAV_STRATEGIC.cases[id]}
function currCase(r,id){var c=CASES[id-1];if(!c||!c.variants[r])return null;var sc=strategicCase(r,id);if(!sc)return c;var variants=Object.assign({},c.variants);variants[r]=Object.assign({},variants[r],{problem:sc.scene,questions:[sc.ask],dialogue:sc.dialogue[0][1],lesson:sc.lesson});return Object.assign({},c,{title:sc.title,theory:sc.theory,concept:sc.lesson,variants:variants})}
function lab(id,r){var source=NAV_ROLE_LABS[r]&&NAV_ROLE_LABS[r][String(id)];if(!source||r!=="managers")return source;var sc=strategicCase(r,id);if(sc)return Object.assign({},source,{o:sc.choices,v:sc.voices,q:sc.ask,r:sc.prompt,t:sc.lesson});return Object.assign({},source,{o:source.o.map(function(o,i){return [window.NAAV_MANAGER_FOCUS.plainChoices[id-1][i],o[1],o[2]]})})}
function actionOptions(r,id){var sc=strategicCase(r,id);if(sc)return sc.actions;return r==="managers"?window.NAAV_MANAGER_FOCUS.plainActions[id-1]:CASES[id-1].variants[r].solution.slice(0,3)}
function managerFocus(id){var sc=strategicCase("managers",id);if(sc)return sc.roles;return window.NAAV_MANAGER_FOCUS&&window.NAAV_MANAGER_FOCUS.cases[id-1]}
function practical(id){var sc=strategicCase("managers",id);if(sc)return sc;return window.NAAV_MANAGER_FOCUS.practical[id-1]}
function managerSession(i){if(i===0)return {issue:"رشد شرکت، تصمیم مشترک درباره منابع و تعهد و اختیار مدیران می‌خواهد."};return window.NAAV_MANAGER_FOCUS&&window.NAAV_MANAGER_FOCUS.sessions[i]}
function clearPrompt(r,id,index,fallback){var sc=strategicCase(r,id);if(sc)return index===2?sc.prompt:sc.ask;var items=window.NAAV_CONTENT_CLARITY&&window.NAAV_CONTENT_CLARITY[r];return items&&items[id-1]&&items[id-1][index]||fallback}
function simpleCore(id,fallback){var core=window.NAAV_CONTENT_CLARITY&&window.NAAV_CONTENT_CLARITY.core;return core&&core[id-1]||fallback}
function sessions(r){
 if(r==="operations")return ops.filter(function(o){return !o.break}).map(function(o,i){return {title:o.title,desc:o.desc,topics:o.items,ids:i<5?(opsCaseBlocks[i]||[]):[],time:o.time,final:i===5}});
 var data=r==="managers"?managers:hq;
 return data.map(function(s,i){return {title:s.t,desc:s.d,topics:s.topics,ids:sessionCases[r][i]||[],time:"جلسه "+fa(i+1)+(r==="managers"?" · ۲ ساعت":""),final:false}});
}
function header(p){
 var inner=p[0]!=="home",r=roleOf(p);
 var back=p[0]==="case"?sessionPath(r,+p[2]):p[0]==="session"?"track/"+r:"home";
 return '<header class="mast"><div class="mast-inner"><a class="identity" href="#/home"><img src="'+LOGO_DATA+'" alt="نشان ناوصنعت مس"><span><strong>ناوصنعت مس</strong><small>رفتار و فرهنگ سازمانی</small></span></a>'+
 (inner?'<div class="mast-tools">'+a(back,'بازگشت','head-link')+a("home","تغییر گروه","head-link outline")+'</div>':'<span class="mast-caption">یادگیری از تجربه کار</span>')+'</div></header>';
}
/* Quiet navigation: right side on desktop and a single expandable row on smaller screens. */
function learningLinks(p){
 var r=roleOf(p),page=p[0],rolePage=page==="track"||page==="case"||page==="session"||page==="library";
 var items=[
  ["home","🏠","خانه","home",page==="home"],
  ["managers","🧭","مدیران شرکت","track/managers",rolePage&&r==="managers"],
  ["hq","🗂️","کارکنان ستاد","track/hq",rolePage&&r==="hq"],
  ["operations","🦺","کارکنان عملیاتی","track/operations",rolePage&&r==="operations"],
  ["culture","📜","اخلاق، ارزش‌ها و فرهنگ","culture/"+r,page==="culture"],
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
 '<main id="app" class="container '+(cls||"")+(p[1]==="managers"?" manager-classroom":"")+'" tabindex="-1">'+body+'</main></div>'+
 '<footer class="site-foot">ناوصنعت مس <span aria-hidden="true">·</span> یادگیری، گفت‌وگو، اقدام</footer>'+mobileDashboard(p);
}
function landing(){
 var items=[
  ["managers","🧭","مدیران شرکت","تصمیم، اختیار و پاسخگویی","track/managers",false],
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
 '<section class="session-list" aria-label="جلسات آموزشی">'+ss.map(function(s,i){return '<a class="session-tile" href="#/session/'+r+'/'+i+'"><span class="session-index" aria-hidden="true">'+sessionIcon(r,i)+'</span><span class="session-info"><strong>'+safe(s.title)+'</strong><span>'+safe(r==="managers"?managerSession(i).issue:s.desc)+'</span></span><span class="session-end"><small>'+safe(s.time)+'</small><b aria-hidden="true">←</b></span></a>'}).join("")+'</section>'+
 '<div class="subtle-footline">'+a("library/"+r,"مشاهده هر ۱۵ کیس","text-link")+a("culture/"+r,"قواعد رفتار و فرهنگ","text-link")+'</div>'+glossary(r);
}
function actionExercise(){
 return '<div class="action-focus"><h2>یک رفتار را انتخاب کنیم</h2><div class="action-three">'+["شروع می‌کنم","متوقف می‌کنم","ادامه می‌دهم"].map(function(x,i){return '<div><span>'+fa(i+1)+'</span><strong>'+x+'</strong></div>'}).join("")+'</div><p class="prompt-question">در موقعیت کاری بعدی، چه رفتار مشخصی را تغییر می‌دهیم؟</p></div>';
}
function lesson(r,num){
 var s=sessions(r)[num];if(!s)return track(r);
 var ids=s.ids||[],anchor=ids.length?depth(ids[0]):{},mf=r==="managers"?managerSession(num):null;
 return '<div class="crumb">'+a("track/"+r,roleNames[r],'text-link')+' <span> / </span> '+fa(num+1)+'</div>'+
 '<section class="section-intro lesson-intro"><div class="kicker">'+safe(s.time)+'</div><h1>'+safe(s.title)+'</h1>'+(mf?'':'<p>'+safe(s.desc)+'</p>')+'</section>'+
 (s.final?actionExercise():
 (mf?'<section class="classroom-opening"><span class="kicker">از اینجا شروع کنیم</span><p>'+safe(practical(ids[0]).scene)+'</p><h2>'+safe(practical(ids[0]).ask)+'</h2><span class="opening-instruction">اول نظر خودتان را بگویید؛ بعد تصمیم‌ها را مقایسه می‌کنیم.</span></section>':
 '<section class="question-box"><span>پرسش محوری</span><strong>'+safe(s.topics[0]||"در این موقعیت چه رفتاری اهمیت دارد؟")+'</strong></section>'+
 (anchor.tension?'<div class="session-dilemma"><strong>چالش واقعی این بحث</strong><p>'+rich(anchor.tension)+'</p></div>':''))+
 '<section class="case-list"><h2>موقعیت‌های این جلسه</h2><div class="case-grid">'+ids.map(function(id){var c=CASES[id-1],d=depth(id);return '<a class="case-tile" href="#/case/'+r+'/'+id+'/0">'+caseTopline(id,'کیس '+fa(id))+'<strong>'+safe(r==="managers"?practical(id).title:c.title)+'</strong><p>'+safe(r==="managers"?practical(id).ask:c.concept)+'</p><span class="case-link">بررسی این موقعیت ←</span></a>'}).join("")+'</div></section>')+
 (mf?'<p class="session-pacing">برنامه پیشنهادی ۱۲۰ دقیقه‌ای: ۱۰ دقیقه شروع · '+(ids.length===3?'۳ کیس، هرکدام ۳۰ دقیقه':'۲ کیس، هرکدام ۴۵ دقیقه')+' · ۲۰ دقیقه جمع‌بندی و تعهد</p>'+sessionClosing(r,num):'')+
 '<div class="page-bottom">'+a("track/"+r,"همه جلسات","text-link")+'</div>';
}
function caseStages(r,id,step){
 return '<nav aria-label="شش گام یادگیری" class="case-steps six-steps">'+steps.map(function(t,i){
 return '<a class="step '+(i===step?"active":i<step?"visited":"")+'" href="#/case/'+r+'/'+id+'/'+i+'" '+(i===step?'aria-current="step"':'')+' title="گام '+fa(i+1)+': '+t+'"><span class="step-index">'+fa(i+1)+'</span><strong><span class="step-emoji" aria-hidden="true">'+stepIcons[i]+'</span>'+t+'</strong></a>';
 }).join("")+'</nav>';
}
function scenario(c,v,l,r){
 var lines=l.v||[];
 return '<section class="content-section step-scene"><span class="kicker">گام ۱ · موقعیت</span><h2>اگر شما جای این افراد بودید…</h2>'+
 '<div class="situation scene-focus">'+safe(r==="managers"?practical(c.id).scene:v.problem)+'</div>'+
 '<div class="people-conversation">'+lines.slice(0,2).map(function(x){return '<div class="voice"><strong>'+safe(x[0])+'</strong><p>«'+safe(x[1])+'»</p></div>'}).join("")+'</div>'+
 (lines.length>2?'<details class="fold discreet-fold"><summary>صدای دیگر این موقعیت</summary><div class="voice extra-voice"><strong>'+safe(lines[2][0])+'</strong><p>«'+safe(lines[2][1])+'»</p></div></details>':'')+
 '<div class="reflection"><span class="qmark">؟</span><p>'+safe(r==="managers"?practical(c.id).ask:clearPrompt(r,c.id,0,"برای تصمیم درست، چه اطلاعاتی کم داریم؟"))+'</p></div>'+
 '<p class="context-note">موقعیت فرضی برای گفت‌وگو؛ گزارش یک اتفاق واقعی شرکت نیست.</p></section>';
}
function decision(c,r,l){
 var chosen=selection(choiceKey(r,c.id),l.o.length);
 return '<section class="content-section step-decision"><span class="kicker">گام ۲ · انتخاب</span><h2>'+safe(clearPrompt(r,c.id,1,l.q))+'</h2>'+
 '<div class="choices">'+l.o.map(function(o,i){return '<button type="button" class="pick '+(chosen===i?"chosen":"")+'" data-choice="'+i+'" data-role="'+r+'" data-case="'+c.id+'" aria-pressed="'+(chosen===i)+'"><span class="pick-letter">'+["الف","ب","ج"][i]+'</span><span>'+safe(o[0])+'</span></button>'}).join("")+'</div>'+
 '<div class="choice-status" data-choice-status aria-live="polite">'+(chosen<0?'یک گزینه را انتخاب کنید؛ پیامد آن در گام بعد دیده می‌شود.':'انتخاب ثبت شد: گزینه '+["الف","ب","ج"][chosen]+' · اکنون پیامد آن را ببینید.')+'</div>'+
 (r==="managers"?'<p class="manager-decision-hint">هیچ گزینه‌ای بی‌هزینه نیست؛ سرعت، اختیار، اعتماد و پیامد آن را بسنجید.</p>':'')+'</section>';
}
function consequence(c,r,l){
 var chosen=selection(choiceKey(r,c.id),l.o.length),d=depth(c.id,r);
 if(chosen<0)return '<section class="content-section"><span class="kicker">گام ۳ · پیامد</span><h2>ابتدا یک تصمیم بگیریم.</h2><div class="empty-decision"><p>برای دیدن پیامد، از گام «انتخاب» یکی از سه تصمیم را انتخاب کنید.</p>'+a("case/"+r+"/"+c.id+"/1","رفتن به انتخاب ←","primary-btn")+'</div></section>';
 var picked=l.o[chosen];
 return '<section class="content-section step-impact"><span class="kicker">گام ۳ · پیامد</span><h2>این تصمیم چه چیزی را تغییر می‌دهد؟</h2>'+
 '<div class="selected-decision"><small>انتخاب گروه · گزینه '+["الف","ب","ج"][chosen]+'</small><strong>'+safe(picked[0])+'</strong></div>'+
 '<div class="impact-card"><span>مزیت و ریسک احتمالی</span><p>'+safe(picked[1])+'</p></div>'+
 (r==="managers"?'<details class="fold"><summary>منطق، محدودیت و شرایط اجرای این تصمیم</summary>'+noteMarkup(c.id,chosen)+'</details>':'')+
 '<div class="impact-condition"><strong>نقطه حساس تصمیم</strong><p>'+safe(picked[2])+'</p></div>'+
 '<details class="fold discreet-fold"><summary>اگر مسیر دیگری انتخاب می‌کردیم چه می‌شد؟</summary>'+
 l.o.map(function(o,i){if(i===chosen)return "";return '<div class="alt-path"><strong>گزینه '+["الف","ب","ج"][i]+'</strong><p>'+safe(o[0])+'</p><p>'+safe(o[1])+'</p><p>'+safe(o[2])+'</p>'+(r==="managers"?noteMarkup(c.id,i):'')+'</div>'}).join("")+'</details>'+
 '<div class="reflection"><span class="qmark">؟</span><p>آیا با دانستن این پیامد، باز هم همین تصمیم را انتخاب می‌کنیم؟</p></div></section>';
}
function practice(c,v,l,r){
 var d=depth(c.id,r),mf=r==="managers"?managerFocus(c.id):null,voices=[];
 (l.v||[]).forEach(function(person){var existing=voices.find(function(x){return x[0]===person[0]});if(existing){existing[1]+=" "+person[1]}else voices.push([person[0],person[1]])});
 return '<section class="content-section step-roleplay"><span class="kicker">گام ۴ · نقش‌آفرینی</span><h2>حالا در این موقعیت گفت‌وگو کنیم.</h2>'+
 (mf?'<div class="manager-role-grid"><div class="manager-role-card"><small>'+(strategicCase(r,c.id)?'اداره جلسه':'نقش اول · تصمیم‌گیر')+'</small><p>'+safe(mf.lead)+'</p></div><div class="manager-role-card"><small>'+(strategicCase(r,c.id)?'چهار عضو دیگر شورا':'نقش دوم · طرف گفت‌وگو')+'</small><p>'+safe(mf.counterpart)+'</p></div></div>':
 '<div class="role-play-grid">'+voices.map(function(x,i){return '<div class="play-person"><small>نقش '+fa(i+1)+'</small><strong>'+safe(x[0])+'</strong><p>«'+safe(x[1])+'»</p></div>'}).join("")+'</div>')+
 '<div class="speech-task"><span>'+ (strategicCase(r,c.id)?'تمرین شورای راهبردی · ۸ دقیقه':'تمرین گفت‌وگو · ۲ تا ۳ دقیقه')+'</span><strong>'+safe(clearPrompt(r,c.id,2,l.r||v.questions[0]))+'</strong></div>'+
 '<details class="pressure-reveal"><summary><span aria-hidden="true">⚡</span> اتفاق غیرمنتظره در گفت‌وگو را آشکار کنید</summary><div><p>'+rich(mf?mf.pressure:d.pressure||"طرف مقابل به تصمیم اعتراض جدی می‌کند.")+'</p><strong>گفت‌وگو را ادامه دهید؛ بدون عقب‌نشینی غیرموجه یا حمله شخصی.</strong></div></details>'+
 (mf?'<div class="manager-role-outcome"><span>در پایان روی این توافق کنید</span><strong>'+safe(mf.proof)+'</strong></div>':'')+
 (mf?techniqueDebrief(c.id):'')+
 '<details class="fold discreet-fold"><summary>یک عبارت پیشنهادی برای شروع</summary><p>«'+safe(v.dialogue)+'»</p></details>'+
 '<div class="reflection"><span class="qmark">؟</span><p>'+(mf?'آیا در پایان، تصمیم و مسئولیت اجرا برای همه روشن شد؟':'کدام جمله توانست هم رابطه را حفظ کند و هم مسئولیت را روشن کند؟')+'</p></div></section>';
}
function reflect(c,r,v,g){
 var d=depth(c.id,r),mf=r==="managers"?managerFocus(c.id):null;
 return '<section class="content-section step-reflect"><span class="kicker">گام ۵ · واکاوی</span><h2>برای دفعه بعد چه چیزی را عوض کنیم؟</h2>'+
 '<div class="analysis-lead"><strong>اصل ماجرا، در یک جمله</strong><p>'+safe(mf?practical(c.id).lesson:simpleCore(c.id,g.rule))+'</p></div>'+
 (mf?'<p class="manager-evidence">در کار خودمان: '+safe(practical(c.id).action)+'</p>':'')+
 (mf?'<details class="fold"><summary>اگر بخواهیم بیشتر بررسی کنیم</summary>':'')+
 '<details class="fold discreet-fold"><summary>بررسی عمیق‌تر رفتار و دلیل آن</summary><p>'+rich(d.mechanism||c.theory.explanation)+'</p><p>'+rich(d.tension||"میان خواسته‌های افراد تعارض وجود دارد.")+'</p></details>'+
 '<details class="fold"><summary>چه شواهدی برای قضاوت لازم است؟</summary><p>'+rich(d.test||c.evidence)+'</p></details>'+
 '<details class="fold"><summary>مفهوم علمی · '+safe(c.theory.name)+'</summary><p>'+safe(c.theory.explanation)+'</p><p class="science-note">این مفهوم یک چارچوب تحلیل است، نه تشخیص قطعی علت رفتار افراد.</p></details>'+
 (strategicCase(r,c.id)?'<p class="science-note">این سناریو برای بحث درباره تصمیم‌های کلان شرکت طراحی شده؛ نقل داستان کتاب یا گزارش یک واقعه واقعی نیست.</p>':'<details class="fold"><summary>از کتاب «حقایق تلخ» چه می‌آموزیم؟</summary><strong>'+safe(d.book||g.book)+'</strong><p>'+safe(g.bridge)+'</p><p class="science-note">اقتباس مفهومی است، نه ادعای وقوع داستان کتاب در شرکت.</p></details>')+
 (mf?'</details>':'')+
 '<div class="reflection"><span class="qmark">؟</span><p>'+ (strategicCase(r,c.id)?safe(d.debrief):mf?'آخرین بار این مسئله در کار شما کجا پیش آمد؟ دفعه بعد چه جمله یا تصمیمی را عوض می‌کنید؟':rich(d.debrief||v.questions[0]))+'</p></div></section>';
}
function conclude(c,r,v,g){
 var d=depth(c.id,r),old=selection(actionKey(r,c.id),3),pr=saved(proofKey(r,c.id),"");
 var options=actionOptions(r,c.id);
 return '<section class="content-section step-action"><span class="kicker">گام ۶ · اقدام</span><h2>از این تجربه، چه رفتاری وارد کار کنیم؟</h2>'+
 '<div class="takeaway action-rule">'+rich(r==="managers"?practical(c.id).lesson:d.shift||g.rule)+'</div>'+
 '<p class="action-prompt">'+(r==="managers"?'این هفته کدام کار را انجام می‌دهید؟':'یک اقدام مشخص برای موقعیت کاری بعدی انتخاب کنیم:')+'</p>'+
 '<div class="action-choices">'+options.map(function(text,i){return '<button type="button" class="action-option '+(old===i?"chosen":"")+'" data-action-choice="'+i+'" data-role="'+r+'" data-case="'+c.id+'" aria-pressed="'+(old===i)+'"><span class="action-no">'+fa(i+1)+'</span><span>'+safe(text)+'</span></button>'}).join("")+'</div>'+
 '<div class="proof-panel"><label for="proof-field">'+(r==="managers"?'با چه کسی، چه کاری و تا چه روزی؟':'از کجا بفهمیم این رفتار واقعاً اجرا شده است؟')+'</label><textarea id="proof-field" class="proof-field" rows="2" maxlength="240" placeholder="'+(r==="managers"?(strategicCase(r,c.id)?'مثلاً: در شورای بعد، شروط یک تصمیم توسعه‌ای و مسئول هر تأیید را ثبت می‌کنیم.':'مثلاً: فردا با مدیر سایت، زمان تحویل قطعه را قطعی می‌کنم.'):'یک نشانه قابل مشاهده؛ مثلاً تأیید تحویل توسط شیفت بعد...')+'">'+safe(pr)+'</textarea><div class="proof-bottom"><button type="button" class="save-proof" data-save-proof="'+c.id+'" data-role="'+r+'">ثبت نتیجه گروه</button><span class="proof-status" role="status">'+(old>=0?"اقدام انتخاب‌شده: "+fa(old+1):"")+'</span></div></div>'+
 '<details class="fold discreet-fold"><summary>چند نکته تکمیلی برای انتقال به کار</summary><p>'+safe(v.lesson)+'</p><p>'+rich(d.trade||"نتیجه نیازمند پیگیری است.")+'</p></details>'+
 '<p class="context-note">انتخاب و نوشته فقط در همین مرورگر ثبت می‌شود؛ اطلاعات به سرور ارسال نمی‌شود.</p></section>';
}
function caseView(r,id,step){
 var c=currCase(r,id);if(!c)return track(r);
 var parent=sessionPath(r,id),exit=caseExit(r,id);
 var v=c.variants[r],l=lab(id,r),g=NAAV_GUIDE[id-1],s=Math.max(0,Math.min(5,step|0));
 if(!l||!g)return track(r);
 var screens=[
 function(){return scenario(c,v,l,r)},
 function(){return decision(c,r,l)},
 function(){return consequence(c,r,l)},
 function(){return practice(c,v,l,r)},
 function(){return reflect(c,r,v,g)},
 function(){return conclude(c,r,v,g)}
 ];
 return '<div class="crumb">'+a(parent,"جلسه مربوط","text-link")+' <span> / </span> کیس '+fa(id)+'</div>'+
 '<section class="case-heading"><span class="kicker">کیس '+fa(id)+' از ۱۵ · '+safe(roleNames[r])+'</span><h1><span class="heading-sticker" aria-hidden="true">'+caseIcon(id)+'</span>'+safe(r==="managers"?practical(id).title:c.title)+'</h1></section>'+
 caseStages(r,id,s)+'<div class="case-content" data-current-stage="'+s+'">'+screens[s]()+'</div>'+
 '<nav class="stage-foot" aria-label="حرکت بین مراحل">'+
 (s>0?a("case/"+r+"/"+id+"/"+(s-1),"گام قبل","secondary-btn"):a(parent,"بازگشت به جلسه","secondary-btn"))+
 '<span class="stage-progress">'+fa(s+1)+' / ۶</span>'+
 (s<5?a("case/"+r+"/"+id+"/"+(s+1),"ادامه: "+steps[s+1]+" ←","primary-btn"):a(exit[0],exit[1],"primary-btn"))+'</nav>';
}
function library(r){
 return '<section class="section-intro"><span class="kicker">'+roleNames[r]+'</span><h1>۱۵ کیس رفتار سازمانی</h1><p>یک موقعیت آشنا از کار را انتخاب کنید؛ ببینید شما چه تصمیمی می‌گیرید.</p></section>'+
 '<div class="case-grid">'+CASES.map(function(c){return '<a class="case-tile" href="#/case/'+r+'/'+c.id+'/0">'+caseTopline(c.id,'کیس '+fa(c.id))+'<strong>'+safe(r==="managers"?practical(c.id).title:c.title)+'</strong><p>'+safe(r==="managers"?practical(c.id).ask:c.concept)+'</p><span class="case-link">بازکردن ←</span></a>'}).join("")+'</div>';
}
function culture(r){
 var model=window.NAAV_STRATEGIC.evc;
 return '<section class="section-intro"><span class="kicker">قواعد رفتار و فرهنگ</span><h1>'+safe(model.title)+'</h1><p>'+safe(model.purpose)+'</p></section><p class="context-note">'+safe(model.basis)+'</p>'+
 '<div class="evc-map" aria-label="اخلاق، ارزش‌ها و فرهنگ"><div><bdi>E · Ethics</bdi><h2>اخلاق</h2><p>چه مرزی را حتی زیر فشار رد نمی‌کنیم؟</p></div><div><bdi>V · Values</bdi><h2>ارزش‌ها</h2><p>وقتی هدف‌ها تعارض دارند، با چه معیاری انتخاب می‌کنیم؟</p></div><div><bdi>C · Culture</bdi><h2>فرهنگ</h2><p>این انتخاب در رفتار، روال و پاداش روزمره چگونه تکرار می‌شود؟</p></div></div>'+
 '<p class="evc-link">مرز اخلاقی ← معیار تصمیم ← رفتار و روال مشترک ← بازخورد و اصلاح</p>'+
 '<details class="fold"><summary>این مدل برای چه مرحله‌ای از رشد شرکت طراحی شده؟</summary><p>'+safe(model.lifecycle)+'</p><p>'+safe(model.validate)+'</p></details>'+
 '<section class="evc-values"><h2>گزاره‌های پیشنهادی فرهنگ ناوصنعت</h2>'+model.values.map(function(v,i){return '<details class="fold evc-value"><summary>'+fa(i+1)+' · '+safe(v.value)+'</summary><p class="evc-statement">'+safe(v.culture)+'</p><dl><dt>مرز اخلاقی</dt><dd>'+safe(v.ethic)+'</dd><dt>در تصمیم واقعی</dt><dd>'+safe(v.example)+'</dd><dt>رفتار ناسازگار</dt><dd>'+safe(v.redline)+'</dd><dt>روال تثبیت فرهنگ</dt><dd>'+safe(v.ritual)+'</dd><dt>از کجا بفهمیم اجرا شده؟</dt><dd>'+safe(v.evidence)+'</dd><dt>مسئولیت پیشنهادی</dt><dd>'+safe(v.owner)+'</dd></dl><p>موقعیت‌های مرتبط: '+v.ids.map(function(id){return a('case/'+r+'/'+id+'/0','کیس '+fa(id),'text-link')}).join(' · ')+'</p></details>'}).join('')+'</section>'+
 '<details class="fold"><summary>نقشه پوشش چالش‌های مطرح‌شده و ۱۵ کیس</summary><p>این نقشه، پوشش اطلاعات در دسترس پروژه است؛ ادعای بازیابی همه گفتگوهای گذشته نیست.</p><div class="evc-coverage">'+model.challengeMap.map(function(x){return '<div><strong>'+safe(x[0])+'</strong><p>'+safe(x[1])+'</p></div>'}).join('')+'</div><div class="evc-case-links">'+CASES.map(function(c){return a('case/'+r+'/'+c.id+'/0','کیس '+fa(c.id)+' · '+safe(r==='managers'?practical(c.id).title:c.title),'text-link')}).join('')+'</div></details>'+
 '<section class="question-box"><span>از گزاره به عمل</span><strong>'+safe(model.review)+'</strong></section>';
}
function render(){
 var p=path(),r=roleOf(p);if(p[0]==="home")r=role;
 if(p[0]==="track"||p[0]==="case"||p[0]==="session"||p[0]==="library"||p[0]==="culture"||p[0]==="medicator"||p[0]==="behavior"){role=r;store("ns_role",r)}
 var body=p[0]==="home"?landing():p[0]==="track"?track(r):p[0]==="session"?lesson(r,+p[2]||0):p[0]==="case"?caseView(r,+p[2]||1,+p[3]||0):p[0]==="library"?library(r):p[0]==="culture"?culture(r):(p[0]==="medicator"||p[0]==="behavior")&&window.NaavIndustryModule?window.NaavIndustryModule.render(p[0],r,p[2],+p[3]||0):landing();
 document.body.classList.add("has-learning-dash");
 document.getElementById("root").innerHTML=frame(p,body,p[0]==="home"?"home-view":"content-view");
 document.title=(p[0]==="case"?"کیس "+fa(+p[2]||1)+" | ":"")+"ناوصنعت مس — یادگیری رفتار سازمانی";
 window.scrollTo(0,0);
 var main=document.getElementById("app");main.focus({preventScroll:true});
 if(p[0]==="session"&&p[3]==="close"){var close=document.getElementById("session-close");if(close){close.open=true;close.scrollIntoView({block:"start"});close.querySelector("summary").focus({preventScroll:true})}}
}
document.addEventListener("click",function(e){
 if(e.target.closest(".skip")){e.preventDefault();document.getElementById("app").focus();return}
 var menu=document.querySelector(".mobile-dash[open]");if(menu&&!menu.contains(e.target))menu.open=false;


 var choice=e.target.closest("[data-choice]");if(choice){var r=choice.dataset.role,id=+choice.dataset.case,n=+choice.dataset.choice;var persisted=store(choiceKey(r,id),n);
 document.querySelectorAll("[data-choice]").forEach(function(x){var sel=x===choice;x.classList.toggle("chosen",sel);x.setAttribute("aria-pressed",String(sel))});
 var status=document.querySelector("[data-choice-status]");if(status)status.textContent=(persisted?"":"ذخیره مرورگر در دسترس نیست؛ انتخاب موقت است. ")+"انتخاب ثبت شد: گزینه "+["الف","ب","ج"][n]+" · اکنون پیامد آن را ببینید.";
 }
 var action=e.target.closest("[data-action-choice]");
 if(action){var ar=action.dataset.role,id=+action.dataset.case,i=+action.dataset.actionChoice;var persisted=store(actionKey(ar,id),i);
 document.querySelectorAll("[data-action-choice]").forEach(function(x){var sel=x===action;x.classList.toggle("chosen",sel);x.setAttribute("aria-pressed",String(sel))});
 var info=document.querySelector(".proof-status");if(info)info.textContent="اقدام انتخاب‌شده: "+fa(i+1)+(persisted?"":" · موقت؛ ذخیره مرورگر در دسترس نیست.");
 }
 var save=e.target.closest("[data-save-proof]");
 if(save){var value=document.getElementById("proof-field").value.trim(),cr=save.dataset.role,id=+save.dataset.saveProof;
 var persisted=store(proofKey(cr,id),value);var message=document.querySelector(".proof-status");if(message)message.textContent=value?(persisted?"✓ نشانه تغییر در همین مرورگر ثبت شد.":"ذخیره مرورگر در دسترس نیست؛ نوشته فقط تا بستن صفحه حفظ می‌شود."):"برای ثبت، یک نشانه قابل مشاهده بنویسید.";
 }

});
document.addEventListener("keydown",function(e){if(e.key==="Escape"){var menu=document.querySelector(".mobile-dash[open]");if(menu){menu.open=false;menu.querySelector("summary").focus()}}});
document.addEventListener("input",function(e){if(e.target.id==="proof-field"){var p=path();memoryState[proofKey(roleOf(p),+p[2])]=e.target.value}});
window.addEventListener("hashchange",render);
render();
})();