/* NAAVSANAT — Shared Learning Experience. All screens are learner-facing. */
(function(){
"use strict";
var roleNames={managers:"مدیران ستاد",hq:"کارکنان ستاد",operations:"کارکنان عملیاتی"};
var roleIcons={managers:"🧭",hq:"🏢",operations:"⚙️"};
var steps=["موقعیت","انتخاب","تحلیل","تمرین","جمع‌بندی"];
var storedRole=saved("ns_role","managers");
var role=roleNames[storedRole]?storedRole:"managers";
function saved(k,def){try{var v=JSON.parse(localStorage.getItem(k));return v===null?def:v}catch(e){return def}}
function store(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function safe(s){return String(s==null?"":s).replace(/[&<>"']/g,function(a){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[a]})}
function fa(n){return String(n).replace(/\d/g,function(d){return "۰۱۲۳۴۵۶۷۸۹"[+d]})}
function path(){return (location.hash||"#/home").replace(/^#\/?/,"").split("/")}
function go(p){location.hash="#/"+p}
function a(p,t,cls){return '<a class="'+(cls||"link")+'" href="#/'+p+'">'+t+'</a>'}
function choiceKey(r,id){return "naav_studio_choice_"+r+"_"+id}
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
function frame(p,body,cls){return header(p)+'<main id="app" class="container '+(cls||"")+'" tabindex="-1">'+body+'</main><footer class="site-foot">ناوصنعت مس <span aria-hidden="true">·</span> یادگیری، گفت‌وگو، اقدام</footer>'}
function landing(){
 var roles=[["managers","تصمیم‌گیری، مسئولیت و الگوی رفتاری"],["hq","همکاری، تعهد و ارتباط بین واحدها"],["operations","رفتار حرفه‌ای، هماهنگی و ایمنی در کار"]];
 return '<section class="landing-head"><div class="copper-line"></div><span class="kicker">NAAVSANAT LEARNING EXPERIENCE</span><h1>رفتار سازمانی را<br><em>در موقعیت واقعی تمرین کنیم.</em></h1><p>مسئله را می‌بینیم، تصمیم می‌گیریم، پیامدها را بررسی می‌کنیم و گفت‌وگو را تمرین می‌کنیم.</p></section>'+
 '<section class="home-roles" aria-label="انتخاب گروه"><h2>گروه خود را انتخاب کنید</h2><div class="role-grid">'+roles.map(function(x){return '<button type="button" class="role-tile" data-role="'+x[0]+'"><span class="role-icon">'+roleIcons[x[0]]+'</span><strong>'+roleNames[x[0]]+'</strong><span class="role-desc">'+x[1]+'</span><span class="role-enter">ورود به مسیر <span aria-hidden="true">←</span></span></button>'}).join("")+'</div></section>';
}
function addOns(){return '<section class="module-bridges" aria-label="آزمایشگاه‌های مکمل"><h2>دو ماژول تکمیلی</h2><div class="module-bridge-list"><a href="#/medicator"><b>🎨 مدیکاتور</b><span>تصویر مدیریتی، تحلیل رفتار، تصمیم</span></a><a href="#/behavior"><b>💬 هنر رفتار</b><span>گفت‌وگو، موقعیت دشوار، نقش‌آفرینی</span></a></div></section>'}
function track(r){
 var ss=sessions(r);
 return '<section class="section-intro"><div class="kicker">مسیر یادگیری</div><h1>'+roleNames[r]+'</h1><p>'+safe(ROLES[r].focus)+'</p></section>'+
 '<section class="session-list" aria-label="جلسات آموزشی">'+ss.map(function(s,i){return '<a class="session-tile" href="#/session/'+r+'/'+i+'"><span class="session-index">'+fa(i+1)+'</span><span class="session-info"><strong>'+safe(s.title)+'</strong><span>'+safe(s.desc)+'</span></span><span class="session-end"><small>'+safe(s.time)+'</small><b aria-hidden="true">←</b></span></a>'}).join("")+'</section>'+
 '<div class="subtle-footline">'+a("library/"+r,"مشاهده هر ۱۵ کیس","text-link")+a("culture/"+r,"قواعد رفتار و فرهنگ","text-link")+a("medicator","مدیکاتور","text-link")+a("behavior","هنر رفتار","text-link")+'</div>';
}
function actionExercise(){
 return '<div class="action-focus"><h2>یک رفتار را انتخاب کنیم</h2><div class="action-three">'+["شروع می‌کنم","متوقف می‌کنم","ادامه می‌دهم"].map(function(x,i){return '<div><span>'+fa(i+1)+'</span><strong>'+x+'</strong></div>'}).join("")+'</div><p class="prompt-question">در موقعیت کاری بعدی، چه رفتار مشخصی را تغییر می‌دهیم؟</p></div>';
}
function lesson(r,num){
 var s=sessions(r)[num];if(!s)return track(r);
 return '<div class="crumb">'+a("track/"+r,roleNames[r],'text-link')+' <span> / </span> '+fa(num+1)+'</div>'+
 '<section class="section-intro lesson-intro"><div class="kicker">'+safe(s.time)+'</div><h1>'+safe(s.title)+'</h1><p>'+safe(s.desc)+'</p></section>'+
 (s.final?actionExercise():
 '<section class="question-box"><span>پرسش محوری</span><strong>'+safe(s.topics[0]||"در این موقعیت چه رفتاری اهمیت دارد؟")+'</strong></section>'+
 '<section class="case-list"><h2>موقعیت‌های این جلسه</h2><div class="case-grid">'+s.ids.map(function(id){var c=CASES[id-1];return '<a class="case-tile" href="#/case/'+r+'/'+id+'/0"><span class="tiny-label">کیس '+fa(id)+'</span><strong>'+safe(c.title)+'</strong><p>'+safe(c.concept)+'</p><span class="case-link">بازکردن موقعیت <span aria-hidden="true">←</span></span></a>'}).join("")+'</div></section>')+
 '<div class="page-bottom">'+a("track/"+r,"همه جلسات","text-link")+'</div>';
}
function caseStages(r,id,step){return '<nav aria-label="مراحل کیس" class="case-steps">'+steps.map(function(s,i){return '<a class="step '+(i===step?"active":"")+'" href="#/case/'+r+'/'+id+'/'+i+'" '+(i===step?'aria-current="step"':'')+'><span>'+fa(i+1)+'</span><strong>'+s+'</strong></a>'}).join("")+'</nav>'}
function scenario(c,v,l){
 return '<div class="content-section"><span class="kicker">موقعیت</span><h2>چه اتفاقی افتاده است؟</h2><div class="situation">'+safe(v.problem)+'</div>'+
 '<div class="voices">'+(l.v||[]).map(function(u){return '<div class="voice"><strong>'+safe(u[0])+'</strong><p>«'+safe(u[1])+'»</p></div>'}).join("")+'</div>'+
 '<div class="reflection"><span class="qmark">؟</span><p>'+safe((v.questions&&v.questions[0])||l.q)+'</p></div></div>';
}
function decision(c,r,l){
 var chosen=saved(choiceKey(r,c.id),-1);
 return '<div class="content-section"><span class="kicker">تصمیم</span><h2>'+safe(l.q)+'</h2><div class="choices">'+l.o.map(function(o,i){return '<button type="button" class="pick '+(chosen===i?"chosen":"")+'" data-choice="'+i+'" data-role="'+r+'" data-case="'+c.id+'" aria-pressed="'+(chosen===i)+'"><span class="pick-letter">'+["الف","ب","ج"][i]+'</span><span>'+safe(o[0])+'</span></button>'}).join("")+'</div><p class="quiet-note">سه رویکرد، با پیامدهای متفاوت؛ انتخاب خود را بررسی کنید.</p></div>';
}
function analyse(c,r,v,l){
 var chosen=saved(choiceKey(r,c.id),-1);
 return '<div class="content-section"><span class="kicker">تحلیل تصمیم‌ها</span><h2>هر انتخاب چه پیامدی دارد؟</h2><div class="outcomes">'+l.o.map(function(o,i){return '<article class="outcome '+(i===chosen?"chosen":"")+'"><div class="outcome-title"><span class="mini-number">'+["الف","ب","ج"][i]+'</span><h3>'+safe(o[0])+'</h3></div><p>'+safe(o[1])+'</p><div class="better"><strong>چگونه می‌توان بهتر عمل کرد؟</strong><span>'+safe(o[2])+'</span></div></article>'}).join("")+'</div>'+
 '<details class="fold"><summary>ریشه‌های احتمالی مسئله</summary><ul>'+v.analysis.map(function(x){return '<li>'+safe(x)+'</li>'}).join("")+'</ul></details>'+
 '<details class="fold"><summary>مفهوم علمی: '+safe(c.theory.name)+'</summary><p>'+safe(c.theory.explanation)+'</p></details></div>';
}
function practice(c,v,l){
 var voices=(l.v||[]).slice(0,3);
 return '<div class="content-section"><span class="kicker">تمرین تعاملی</span><h2>گفت‌وگو را در این موقعیت تجربه کنیم.</h2>'+
 '<div class="practice-problem">'+safe(l.q)+'</div><div class="role-play-grid">'+voices.map(function(x,i){return '<div class="play-person"><small>نقش '+fa(i+1)+'</small><strong>'+safe(x[0])+'</strong><p>'+safe(x[1])+'</p></div>'}).join("")+'</div>'+
 '<div class="speech-task"><span>چالش گفت‌وگو</span><strong>'+safe(l.r||v.questions[0])+'</strong></div>'+
 '<div class="line-example"><span>یک شروع پیشنهادی</span><p>«'+safe(v.dialogue)+'»</p></div>'+
 '<div class="reflection"><span class="qmark">؟</span><p>کدام جمله، رفتار یا پرسش می‌تواند نتیجه این گفت‌وگو را تغییر دهد؟</p></div></div>';
}
function conclude(c,v,g){
 return '<div class="content-section"><span class="kicker">جمع‌بندی</span><h2>چه چیزی از این موقعیت می‌آموزیم؟</h2><div class="takeaway">'+safe(v.lesson)+'</div>'+
 '<section class="rule"><span>قاعده رفتاری</span><p>'+safe(g.rule)+'</p></section>'+
 '<div class="reflection"><span class="qmark">؟</span><p>'+safe(v.questions[1]||"در کار روزمره چه رفتاری را تغییر می‌دهیم؟")+'</p></div>'+
 '<details class="fold"><summary>اقدام‌های پیشنهادی</summary><ul>'+v.solution.map(function(s){return '<li>'+safe(s)+'</li>'}).join("")+'</ul></details>'+
 '<details class="fold"><summary>ارتباط با یک داستان مدیریتی</summary><strong>'+safe(g.book)+'</strong><p>'+safe(g.bridge)+'</p></details></div>';
}
function caseView(r,id,step){
 var c=currCase(r,id);if(!c)return track(r);
 var v=c.variants[r],l=lab(id,r),g=NAAV_GUIDE[id-1],s=Math.max(0,Math.min(4,step|0));if(!l||!g)return track(r);
 var content=[function(){return scenario(c,v,l)},function(){return decision(c,r,l)},function(){return analyse(c,r,v,l)},function(){return practice(c,v,l)},function(){return conclude(c,v,g)}][s]();
 return '<div class="crumb">'+a("track/"+r,roleNames[r],"text-link")+' <span> / </span> کیس '+fa(id)+'</div>'+
 '<section class="case-heading"><span class="kicker">کیس '+fa(id)+' از ۱۵</span><h1>'+safe(c.title)+'</h1><p>'+safe(c.concept)+'</p></section>'+
 caseStages(r,id,s)+'<div class="case-content">'+content+'</div>'+
 '<nav class="stage-foot" aria-label="حرکت بین مراحل">'+(s>0?a("case/"+r+"/"+id+"/"+(s-1),"مرحله قبل","secondary-btn"):a("track/"+r,"بازگشت به جلسات","secondary-btn"))+
 (s<4?a("case/"+r+"/"+id+"/"+(s+1),"ادامه: "+steps[s+1]+" ←","primary-btn"):a("track/"+r,"بازگشت به جلسات ←","primary-btn"))+'</nav>';
}
function library(r){
 return '<section class="section-intro"><span class="kicker">'+roleNames[r]+'</span><h1>۱۵ کیس رفتار سازمانی</h1><p>از یک موقعیت شروع کنید و تصمیم‌ها را بررسی کنید.</p></section>'+
 '<div class="case-grid">'+CASES.map(function(c){return '<a class="case-tile" href="#/case/'+r+'/'+c.id+'/0"><span class="tiny-label">کیس '+fa(c.id)+'</span><strong>'+safe(c.title)+'</strong><p>'+safe(c.concept)+'</p><span class="case-link">بازکردن ←</span></a>'}).join("")+'</div>';
}
function culture(r){
 return '<section class="section-intro"><span class="kicker">'+roleNames[r]+'</span><h1>قواعد رفتار و فرهنگ</h1><p>۱۵ قاعده پیشنهادی برای گفت‌وگو و تمرین؛ نه دستورالعمل مصوب شرکت.</p></section>'+
 '<div class="rules-grid">'+CASES.map(function(c,i){return '<a href="#/case/'+r+'/'+c.id+'/4" class="rule-row"><span>'+fa(c.id)+'</span><div><strong>'+safe(c.title)+'</strong><p>'+safe(NAAV_GUIDE[i].rule)+'</p></div></a>'}).join("")+'</div>';
}
function render(){
 var p=path(),r=roleOf(p);if(p[0]==="home")r=role;
 if(p[0]==="track"||p[0]==="case"||p[0]==="session"||p[0]==="library"||p[0]==="culture"){role=r;store("ns_role",r)}
 var body=p[0]==="home"?landing()+addOns():p[0]==="track"?track(r):p[0]==="session"?lesson(r,+p[2]||0):p[0]==="case"?caseView(r,+p[2]||1,+p[3]||0):p[0]==="library"?library(r):p[0]==="culture"?culture(r):p[0]==="medicator"?window.NaavIndustryModule.render("med",r,p[1]):p[0]==="behavior"?window.NaavIndustryModule.render("behavior",r,p[1]):landing();
 document.getElementById("root").innerHTML=frame(p,body,p[0]==="home"?"home-view":"content-view");
 document.title=(p[0]==="case"?"کیس "+fa(+p[2]||1)+" | ":"")+"ناوصنعت مس — یادگیری رفتار سازمانی";
 window.scrollTo(0,0);
}
document.addEventListener("click",function(e){
 var roleBtn=e.target.closest("[data-role]");if(roleBtn&&!roleBtn.hasAttribute("data-choice")){var r=roleBtn.getAttribute("data-role");if(roleNames[r]){role=r;store("ns_role",r);go("track/"+r)}return}
 var choice=e.target.closest("[data-choice]");if(choice){var r=choice.dataset.role,id=+choice.dataset.case,n=+choice.dataset.choice;store(choiceKey(r,id),n);
 document.querySelectorAll("[data-choice]").forEach(function(x){var sel=x===choice;x.classList.toggle("chosen",sel);x.setAttribute("aria-pressed",String(sel))})}
});
window.addEventListener("hashchange",render);
render();
})();