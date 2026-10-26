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
function rich(s){return safe(s).replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>")}
function depth(id){return window.NAAV_DEPTH&&window.NAAV_DEPTH[id]||{}}
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
 var items=[
  ["managers","🧭","مدیران ستاد","تصمیم، اختیار و پاسخگویی","track/managers",false],
  ["hq","🏢","کارکنان ستاد","همکاری بین‌واحدی و تعهد حرفه‌ای","track/hq",false],
  ["operations","⚙️","کارکنان عملیاتی","هماهنگی، تحویل کار و ایمنی","track/operations",false],
  ["medicator","🎨","مدیکاتور","تصویر مدیریتی، تحلیل و تصمیم","medicator/"+role,true],
  ["behavior","💬","هنر رفتار با افراد دشوار","موقعیت دشوار، گفت‌وگو و Role Play","behavior/"+role,true]
 ];
 return '<section class="landing-head"><div class="copper-line"></div><span class="kicker">NAAVSANAT · CONTEXTUAL LEARNING</span><h1>رفتار سازمانی را<br><em>در موقعیت واقعی تمرین کنیم.</em></h1><p>تجربه واقعیِ کار، نقطه شروع یادگیری است؛ با انتخاب، تحلیل و گفت‌وگو به یک رفتار حرفه‌ای‌تر می‌رسیم.</p></section>'+
 '<section class="home-roles" aria-label="انتخاب مسیر"><h2>مسیر یادگیری را انتخاب کنید</h2><div class="role-grid">'+items.map(function(x){
 return '<a class="role-tile'+(x[5]?" module-tile":"")+'" href="#/'+x[4]+'"><span class="role-icon" aria-hidden="true">'+x[1]+'</span><strong>'+x[2]+'</strong><span class="role-desc">'+x[3]+'</span>'+(x[5]?'<span class="module-tag">ماژول مستقل</span>':'')+'<span class="role-enter">ورود <span aria-hidden="true">←</span></span></a>';
 }).join("")+'</div></section>';
}
function addOns(){return '<section class="module-bridges" aria-label="آزمایشگاه‌های مکمل"><h2>دو ماژول تکمیلی</h2><div class="module-bridge-list"><a href="#/medicator"><b>🎨 مدیکاتور</b><span>تصویر مدیریتی، تحلیل رفتار، تصمیم</span></a><a href="#/behavior"><b>💬 هنر رفتار</b><span>گفت‌وگو، موقعیت دشوار، نقش‌آفرینی</span></a></div></section>'}
function track(r){
 var ss=sessions(r);
 return '<section class="section-intro"><div class="kicker">مسیر یادگیری</div><h1>'+roleNames[r]+'</h1><p>'+safe(ROLES[r].focus)+'</p></section>'+
 '<section class="session-list" aria-label="جلسات آموزشی">'+ss.map(function(s,i){return '<a class="session-tile" href="#/session/'+r+'/'+i+'"><span class="session-index">'+fa(i+1)+'</span><span class="session-info"><strong>'+safe(s.title)+'</strong><span>'+safe(s.desc)+'</span></span><span class="session-end"><small>'+safe(s.time)+'</small><b aria-hidden="true">←</b></span></a>'}).join("")+'</section>'+
 '<div class="subtle-footline">'+a("library/"+r,"مشاهده هر ۱۵ کیس","text-link")+a("culture/"+r,"قواعد رفتار و فرهنگ","text-link")+'<details class="extra-tools"><summary>تمرین‌های تکمیلی</summary><div>'+a("medicator/"+r,"مدیکاتور","text-link")+a("behavior/"+r,"هنر رفتار با افراد دشوار","text-link")+'</div></details>'+'</div>';
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
 '<section class="case-list"><h2>موقعیت‌های این جلسه</h2><div class="case-grid">'+ids.map(function(id){var c=CASES[id-1],d=depth(id);return '<a class="case-tile" href="#/case/'+r+'/'+id+'/0"><span class="tiny-label">کیس '+fa(id)+'</span><strong>'+safe(c.title)+'</strong><p>'+safe(c.concept)+'</p><span class="case-link">بررسی معمای رفتاری ←</span></a>'}).join("")+'</div></section>')+
 '<div class="page-bottom">'+a("track/"+r,"همه جلسات","text-link")+'</div>';
}
function scenario(c,v,l){
 var d=depth(c.id);
 return '<div class="content-section"><span class="kicker">موقعیت</span><h2>چه اتفاقی افتاده است؟</h2><div class="situation">'+safe(v.problem)+'</div>'+
 '<div class="voices">'+(l.v||[]).map(function(u){return '<div class="voice"><strong>'+safe(u[0])+'</strong><p>«'+safe(u[1])+'»</p></div>'}).join("")+'</div>'+
 '<div class="depth-spotlight"><span>تعارض اصلی</span><p>'+rich(d.tension||"در این موقعیت، کدام دو خواسته مشروع با هم تعارض دارند؟")+'</p></div>'+
 '<div class="reflection"><span class="qmark">؟</span><p>'+safe(d.test||((v.questions&&v.questions[0])||l.q))+'</p></div></div>';
}
function decision(c,r,l){
 var d=depth(c.id),chosen=saved(choiceKey(r,c.id),-1);
 return '<div class="content-section"><span class="kicker">تصمیم</span><h2>'+safe(l.q)+'</h2><div class="choices">'+l.o.map(function(o,i){return '<button type="button" class="pick '+(chosen===i?"chosen":"")+'" data-choice="'+i+'" data-role="'+r+'" data-case="'+c.id+'" aria-pressed="'+(chosen===i)+'"><span class="pick-letter">'+["الف","ب","ج"][i]+'</span><span>'+safe(o[0])+'</span></button>'}).join("")+'</div>'+
 '<div class="decision-nuance"><strong>پیش از تصمیم، این Trade-off را ببینیم:</strong><p>'+rich(d.trade||"هر گزینه هم فرصت دارد و هم ریسک؛ کدام شواهد انتخاب را قابل دفاع می‌کند؟")+'</p></div>'+
 '<p class="quiet-note">یک پاسخِ ظاهراً خوب، بدون درنظرگرفتن زمینه و محدودیت‌ها، ممکن است پیامد نامطلوب ایجاد کند.</p></div>';
}
function analyse(c,r,v,l){
 var d=depth(c.id),chosen=saved(choiceKey(r,c.id),-1);
 var cards=l.o.map(function(o,i){return '<article class="outcome '+(i===chosen?"chosen":"")+'"><div class="outcome-title"><span class="mini-number">'+["الف","ب","ج"][i]+'</span><h3>'+safe(o[0])+'</h3></div><p>'+safe(o[1])+'</p><div class="better"><strong>شرط اثربخشی این انتخاب</strong><span>'+safe(o[2])+'</span></div></article>'});
 return '<div class="content-section"><span class="kicker">تحلیل مدیریتی</span><h2>پشت تصمیم چه سازوکاری فعال می‌شود؟</h2>'+
 '<div class="analysis-lead"><strong>نکته کلیدی</strong><p>'+rich(d.mechanism||c.theory.explanation)+'</p></div>'+
 (chosen>=0?'<h3>پیامد انتخاب شما</h3>'+cards[chosen]+'<details class="fold"><summary>دو تصمیم دیگر چه پیامدی دارند؟</summary>'+cards.filter(function(_,i){return i!==chosen}).join("")+'</details>':'<div class="outcomes">'+cards.join("")+'</div>')+
 '<div class="analysis-two"><div><strong>شواهد مورد نیاز</strong><p>'+rich(d.test||c.evidence)+'</p></div><div><strong>مرز تصمیم حرفه‌ای</strong><p>'+rich(d.trade||"محدودیت‌های اجرایی و معیارهای پاسخگویی باید روشن باشند.")+'</p></div></div>'+
 '<details class="fold"><summary>تحلیل عمیق‌تر: فرضیه‌های رفتاری</summary><ul>'+v.analysis.map(function(x){return '<li>'+safe(x)+'</li>'}).join("")+'</ul></details>'+
 '<details class="fold"><summary>پشتوانه علمی · '+safe(c.theory.name)+'</summary><p>'+safe(c.theory.explanation)+'</p><p class="science-note">نظریه، چارچوب تفسیر است؛ درباره علت واقعی در ناوصنعت فقط با داده و گفت‌وگو می‌توان قضاوت کرد.</p></details></div>';
}
function practice(c,v,l){
 var d=depth(c.id),voices=(l.v||[]).slice(0,3);
 return '<div class="content-section"><span class="kicker">تمرین تعاملی · Role Play</span><h2>گفت‌وگوی دشوار؛ با فشار واقعی</h2>'+
 '<div class="practice-problem">'+safe(l.q)+'</div><div class="role-play-grid">'+voices.map(function(x,i){return '<div class="play-person"><small>نقش '+fa(i+1)+'</small><strong>'+safe(x[0])+'</strong><p>'+safe(x[1])+'</p></div>'}).join("")+'</div>'+
 '<div class="role-pressure"><strong>پیچ جدید در گفت‌وگو</strong><p>'+rich(d.pressure||"فرد مقابل نسبت به تصمیم اعتراض جدی می‌کند.")+'</p></div>'+
 '<div class="speech-task"><span>گره اصلی گفت‌وگو</span><strong>'+safe(l.r||v.questions[0])+'</strong></div>'+
 '<details class="fold"><summary>یک شروع پیشنهادی برای گفت‌وگو</summary><p>«'+safe(v.dialogue)+'»</p></details>'+
 '<div class="reflection"><span class="qmark">؟</span><p>'+rich(d.debrief||"کدام جمله یا سؤال نتیجه گفت‌وگو را تغییر داد؟")+'</p></div></div>';
}
function conclude(c,v,g){
 var d=depth(c.id);
 return '<div class="content-section"><span class="kicker">جمع‌بندی</span><h2>از این تجربه چه رفتاری می‌سازیم؟</h2><div class="takeaway">'+safe(v.lesson)+'</div>'+
 '<section class="rule"><span>قاعده رفتاری پیشنهادی</span><p>'+rich(d.shift||g.rule)+'</p></section>'+
 '<div class="reflection"><span class="qmark">؟</span><p>'+rich(d.debrief||v.questions[1]||"در کار روزمره چه رفتاری را تغییر می‌دهیم؟")+'</p></div>'+
 '<details class="fold"><summary>اقدام‌های تکمیلی در موقعیت کار</summary><ul>'+v.solution.map(function(t){return '<li>'+safe(t)+'</li>'}).join("")+'</ul></details>'+
 '<details class="fold"><summary>پیوند با کتاب «حقایق تلخ»</summary><p><strong>'+safe(d.book||g.book)+'</strong></p><p>'+safe(g.bridge)+'</p><p class="science-note">اقتباس مفهومی از تجربه مدیریتی؛ رویداد کتاب به‌منزله گزارش واقعی از ناوصنعت نیست.</p></details></div>';
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
 if(p[0]==="track"||p[0]==="case"||p[0]==="session"||p[0]==="library"||p[0]==="culture"||p[0]==="medicator"||p[0]==="behavior"){role=r;store("ns_role",r)}
 var body=p[0]==="home"?landing():p[0]==="track"?track(r):p[0]==="session"?lesson(r,+p[2]||0):p[0]==="case"?caseView(r,+p[2]||1,+p[3]||0):p[0]==="library"?library(r):p[0]==="culture"?culture(r):(p[0]==="medicator"||p[0]==="behavior")&&window.NaavIndustryModule?window.NaavIndustryModule.render(p[0],r,p[2],+p[3]||0):landing();
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