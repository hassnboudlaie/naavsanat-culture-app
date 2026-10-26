/* NAAVSANAT - two embedded instructor-led modules */
(function(){
"use strict";
var data=window.NAAV_INDUSTRY_DATA||{med:[],behavior:[]};
var roles={managers:"مدیران ستاد",hq:"کارکنان ستاد",operations:"کارکنان عملیاتی",all:"هر سه گروه"};
var label={med:"مدیکاتور",behavior:"هنر رفتار"};
var selectedFilter={med:"recommended",behavior:"recommended"},queries={med:"",behavior:""};
function e(v){return String(v==null?"":v).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function fa(v){return String(v).replace(/\d/g,function(c){return "۰۱۲۳۴۵۶۷۸۹"[+c]})}
function itemList(type){return type==="med"?data.med:data.behavior.map(function(a,i){return {id:i+1,title:a[0],role:a[1],context:a[2],technique:a[3],quote:a[4],line:a[5],pitfall:a[6],roleplay:a[7],rule:a[8],slide:a[9]}})}
function found(type,id){return itemList(type).find(function(x){return x.id===+id})}
function key(type,id){return "naav_industry_"+type+"_"+id}
function saved(type,id){try{return JSON.parse(localStorage.getItem(key(type,id)))||{}}catch(err){return {}}}
function save(type,id,patch){var n=Object.assign({},saved(type,id),patch);try{localStorage.setItem(key(type,id),JSON.stringify(n));return true}catch(err){return false}}
function source(type,slide){return (type==="med"?"مدیکاتور":"هنر ارتباط با افراد دشوار")+" · اسلاید "+fa(slide)}
function roleBadge(r){return '<span class="nvmod-audience">'+e(roles[r]||roles.all)+'</span>'}
function art(kind,compact){
var shapes={
 mail:'<rect x="38" y="60" width="130" height="88" rx="12" fill="#fff" stroke="#155c66" stroke-width="4"/><path d="m43 69 59 42 60-42" stroke="#a7653d" stroke-width="5" fill="none"/><path d="M185 103h67" stroke="#155c66" stroke-width="7" stroke-linecap="round"/><path d="m238 89 19 14-19 15" stroke="#155c66" stroke-width="6" fill="none"/><rect x="270" y="70" width="90" height="66" rx="10" fill="#e4edea" stroke="#155c66" stroke-width="4"/><path d="m285 95 18 20 41-37" fill="none" stroke="#ad6d47" stroke-width="5"/>',
 bridge:'<rect x="34" y="68" width="98" height="64" rx="10" fill="#fff" stroke="#155c66" stroke-width="4"/><rect x="273" y="68" width="98" height="64" rx="10" fill="#fff" stroke="#155c66" stroke-width="4"/><path d="M140 105h45m35 0h45" stroke="#ad6d47" stroke-width="7" stroke-linecap="round"/><path d="m173 93 13 12-13 12m62-24-13 12 13 12" stroke="#ad6d47" stroke-width="4" fill="none"/><circle cx="203" cy="105" r="15" fill="#a7653d"/>',
 stairs:'<path d="M44 155h77v-30h72V96h72V67h91" stroke="#155c66" stroke-width="10" fill="none" stroke-linejoin="round"/><path d="m333 51 24 16-24 16" stroke="#ae6b43" stroke-width="7" fill="none"/><circle cx="80" cy="125" r="15" fill="#d8e6e2"/><circle cx="228" cy="74" r="15" fill="#cba084"/>',
 gear:'<circle cx="119" cy="104" r="53" fill="#dfece7" stroke="#155c66" stroke-width="9"/><circle cx="119" cy="104" r="19" fill="#fff" stroke="#a7653d" stroke-width="7"/><path d="M194 108h56" stroke="#a7653d" stroke-width="7" stroke-linecap="round"/><path d="m240 94 17 14-17 15" fill="none" stroke="#a7653d" stroke-width="5"/><rect x="276" y="65" width="95" height="85" rx="16" fill="#fff" stroke="#155c66" stroke-width="5"/><path d="m294 107 17 17 40-44" fill="none" stroke="#338269" stroke-width="7"/>',
 leader:'<circle cx="201" cy="51" r="22" fill="#a7653d"/><rect x="159" y="81" width="84" height="73" rx="26" fill="#155c66"/><circle cx="89" cy="127" r="16" fill="#b5d5cd"/><circle cx="312" cy="127" r="16" fill="#b5d5cd"/><path d="M108 125h44M248 125h44" stroke="#a7653d" stroke-width="5" stroke-dasharray="10 7"/>',
 barrier:'<path d="M45 143h70V66h83v77h71V66h88" fill="none" stroke="#155c66" stroke-width="11" stroke-linecap="square"/><path d="M48 90q73-91 154 0t155 0" fill="none" stroke="#b56e47" stroke-width="6" stroke-dasharray="8 8"/>',
 meeting:'<rect x="122" y="94" width="163" height="52" rx="25" fill="#a7653d"/><circle cx="150" cy="63" r="18" fill="#155c66"/><circle cx="256" cy="63" r="18" fill="#155c66"/><circle cx="85" cy="116" r="18" fill="#155c66"/><circle cx="325" cy="116" r="18" fill="#155c66"/><rect x="171" y="103" width="65" height="33" rx="8" fill="#fff"/><path d="m182 119 10 9 17-18" stroke="#388064" stroke-width="4" fill="none"/>',
 target:'<circle cx="201" cy="105" r="73" fill="#dbe9e5" stroke="#155c66" stroke-width="6"/><circle cx="201" cy="105" r="50" fill="#fff" stroke="#ad6d47" stroke-width="6"/><circle cx="201" cy="105" r="24" fill="#b46b43"/><path d="M48 105h82m143 0h85" stroke="#155c66" stroke-width="5" stroke-dasharray="8 7"/>',
 team:'<circle cx="98" cy="75" r="25" fill="#155c66"/><circle cx="306" cy="75" r="25" fill="#a7653d"/><circle cx="202" cy="138" r="25" fill="#6c9a8c"/><path d="M119 88 179 124m47 0 59-36M125 74h152" fill="none" stroke="#a5bcb6" stroke-width="7" stroke-linecap="round"/>',
 activity:'<rect x="46" y="52" width="50" height="105" rx="8" fill="#9ebdb4"/><rect x="112" y="34" width="50" height="123" rx="8" fill="#9ebdb4"/><rect x="178" y="68" width="50" height="89" rx="8" fill="#9ebdb4"/><path d="m252 142 39-49 30 25 45-68" stroke="#a7653d" stroke-width="9" fill="none"/><path d="m342 52 25-3-4 24" fill="none" stroke="#a7653d" stroke-width="7"/>',
 load:'<path d="M55 155V70h58v85M139 155V45h58v110M225 155V88h58v67" stroke="#155c66" stroke-width="8" fill="#dfece7"/><path d="M302 117h61" stroke="#a7653d" stroke-width="8"/><path d="m347 102 17 15-17 15" stroke="#a7653d" stroke-width="6" fill="none"/>'
};
var s=shapes[kind]||shapes.team;
return '<svg viewBox="0 0 410 198" class="nvmod-svg '+(compact?'compact':'')+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="تصویر مفهومی بازطراحی‌شده از موضوع اسلاید"><rect x="5" y="5" width="400" height="188" rx="22" fill="#f4f8f5"/><path d="M0 171q100-40 210 0t200 0" stroke="#e1ece6" stroke-width="4" fill="none"/>'+s+'</svg>'
}
function behaviorArt(){
return '<svg viewBox="0 0 410 198" class="nvmod-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="تصویر مفهومی گفت‌وگوی حرفه‌ای"><rect x="5" y="5" width="400" height="188" rx="22" fill="#f4f8f5"/><path d="M46 53h141q16 0 16 16v50q0 16-16 16h-56l-25 25v-25H46q-16 0-16-16V69q0-16 16-16z" fill="#d6e9e3" stroke="#155c66" stroke-width="5"/><path d="M224 36h142q16 0 16 16v61q0 16-16 16h-57l-28 24v-24h-57q-16 0-16-16V52q0-16 16-16z" fill="#fff" stroke="#b46b43" stroke-width="5"/><path d="M63 84h111M63 106h78M240 69h110M240 92h71" stroke="#5b8e84" stroke-width="6" stroke-linecap="round"/></svg>'
}
function intro(type,r){
var med=type==="med",count=itemList(type).length;
return '<section class="nvmod-hero"><div class="nvmod-lead"><span class="nvmod-overline">'+(med?'MANAGEMENT CARTOONS · VISUAL THINKING':'BEHAVIORAL SKILLS · DIFFICULT CONVERSATIONS')+'</span><h1>'+(med?'مدیکاتور | ببین، تحلیل کن، تصمیم بگیر':'هنر رفتار | گفت‌وگو در موقعیت دشوار')+'</h1><p>'+(med?'استعاره‌های تصویری مدیریت را به موقعیت‌های واقعی‌نما در گردش کار ناوصنعت مس پیوند می‌دهیم؛ تمرکز بر رفتار، همکاری و فرهنگ است؛ نه راه‌حل فنی.':'۲۰ الگوی رفتاری از منبع آموزشی، بازنویسی‌شده برای روابط کاری ستاد، تحویل شیفت و هماهنگی در یک شرکت صنعتی؛ بدون برچسب‌زدن به شخصیت افراد.')+'</p><div class="nvmod-meta"><span>'+fa(count)+' موقعیت آموزشی</span><span>'+e(roles[r])+'</span><span>تمرین گروهی و Role Play</span></div></div><div class="nvmod-heroart">'+(med?art("bridge",false):behaviorArt())+'</div></section>';
}
function list(type,r){
var items=itemList(type),current=selectedFilter[type];
var filtered=items.filter(function(x){return (current!=="recommended"||x.role===r||x.role==="all")&&(!queries[type]||(x.title+" "+x.context+" "+x.technique).includes(queries[type]))});
var med=type==="med";
return '<div class="nvmod">'+intro(type,r)+
'<div class="nvmod-sectionhead"><div><h2>موقعیت‌های پیشنهادی</h2><p>یک کارت را باز کنید، تصمیم بگیرید و گفت‌وگو را در کلاس تمرین کنید.</p></div></div>'+
'<div class="nvmod-controls"><button type="button" class="nvmod-pill '+(current==="recommended"?'chosen':'')+'" data-industry-filter="recommended" data-type="'+type+'">متناسب با '+e(roles[r])+'</button><button type="button" class="nvmod-pill '+(current==="all"?'chosen':'')+'" data-industry-filter="all" data-type="'+type+'">نمایش همه '+fa(items.length)+' موضوع</button><input aria-label="جست‌وجو در ماژول" type="search" placeholder="جست‌وجوی موقعیت یا تکنیک..." data-industry-query="'+type+'" value="'+e(queries[type])+'"></div>'+
'<div class="nvmod-grid" id="nvmod-grid">'+(filtered.length?filtered.map(function(x){
return '<a class="nvmod-card" href="#/'+(med?'medicator':'behavior')+'/'+x.id+'"><div class="nvmod-cardart">'+(med?art(x.motif,true):behaviorArt())+'</div><div class="nvmod-cardbody"><div class="nvmod-kicker">'+(med?'اسلاید '+fa(x.id):'رفتار '+fa(x.id))+' · '+e(x.technique)+'</div><h3>'+e(x.title)+'</h3><p>'+e(x.context)+'</p><div class="nvmod-cardfoot">'+roleBadge(x.role)+'<span>مشاهده و تمرین ←</span></div></div></a>'
}).join(''):'<p class="nvmod-empty">برای این فیلتر موردی پیدا نشد؛ همه موضوع‌ها را انتخاب کنید.</p>')+'</div>'+
'<p class="nvmod-note">این موقعیت‌ها برای یادگیری، بومی‌سازی و شبیه‌سازی شده‌اند؛ گزارش وقوع واقعی در شرکت نیستند. تصویرها بازطراحی مفهومی هستند. '+(med?'مرجع: مجموعه مدیکاتور، ۷۵ اسلاید.':'مرجع: هنر ارتباط با افراد دشوار، ۲۷ اسلاید.')+'</p></div>'
}
function behaviorOptions(x){
return [
["راه نخست: حل سریع و دستوری","برای پایان‌دادن به تنش، مستقیماً رفتار را متوقف کنیم و بدون بررسی کامل، راه‌حل خود را اعلام کنیم.","ممکن است در کوتاه‌مدت نظم ظاهری ایجاد شود، اما اطلاعات، انگیزه‌ها و محدودیت‌های واقعی روشن نمی‌شوند. در خطر فوری، توقف کار طبق مقررات لازم است."],
["راه دوم: گفت‌وگوی هدفمند",x.line,"ابتدا شواهد، احساس یا محدودیت را می‌شنویم و بعد یک انتظار و اقدام روشن تعیین می‌کنیم. اگر خطر ایمنی، آزار یا تخلف جدی مطرح باشد، ارجاع از مجرای رسمی هم ضروری است."],
["راه سوم: ارجاع کامل","موضوع را فوراً به مدیر یا واحد دیگر ارجاع دهیم و گفت‌وگوی مستقیم را کنار بگذاریم.","در موضوعات خارج از اختیار یا پرریسک، ارجاع لازم است؛ اما اگر گفت‌وگوی حرفه‌ای در اختیار ماست، ارجاع زودهنگام ممکن است مسئولیت را مبهم بگذارد."]
]}
function choiceSection(type,x){
var d=saved(type,x.id),med=type==="med",opts=med?x.options.map(function(q,i){return ["گزینه "+["الف","ب","ج"][i],q,x.feedback[i]]}):behaviorOptions(x);
return '<section class="nvmod-panel" id="nvmod-decision"><span class="nvmod-overline">DECISION LAB</span><h2>اگر جای شما بود، چه می‌کردید؟</h2><p>'+(med?e(x.question):'کدام مسیر در این شرایط احتمال گفت‌وگوی مؤثر و پاسخ‌گویی را بیشتر می‌کند؟')+'</p><div class="nvmod-options">'+opts.map(function(q,i){var active=d.choice===i;return '<button type="button" class="nvmod-option '+(active?'is-chosen':'')+'" data-industry-choice="'+i+'" data-type="'+type+'" data-id="'+x.id+'"><b>'+e(q[0])+'</b><span>'+e(q[1])+'</span></button>'}).join('')+'</div>'+
(d.choice===undefined?'':'<div class="nvmod-feedback" role="status"><b>'+(med?(d.choice===x.correct?'✓ انتخاب مناسب این موقعیت':'نکته تحلیلی گزینه انتخاب‌شده'):'تحلیل مسیر انتخاب‌شده')+'</b><p>'+e(opts[d.choice][2])+'</p><small>'+(med?'بهتر است تحلیل هر سه گزینه با گروه انجام شود.':'این گزینه‌ها بسته به سطح ریسک، اختیار و شواهد قابل بازنگری‌اند.')+'</small><details><summary>تحلیل دیگر گزینه‌ها</summary>'+opts.map(function(o,i){return '<p><b>'+e(o[0])+': </b>'+e(o[2])+'</p>'}).join('')+'</details></div>')+
'</section>'
}
function detail(type,r,id){
var x=found(type,id);if(!x)return list(type,r);var med=type==="med",array=itemList(type),ix=array.findIndex(function(q){return q.id===x.id}),prev=array[ix-1],next=array[ix+1],d=saved(type,id);
return '<div class="nvmod"><div class="nvmod-return"><a href="#/'+(med?'medicator':'behavior')+'" class="nvmod-back">→ بازگشت به فهرست '+label[type]+'</a><span>'+roleBadge(x.role)+' · '+source(type,med?x.id:x.slide)+'</span></div>'+
'<div class="nvmod-detailhead"><div><span class="nvmod-overline">'+(med?'VISUAL MANAGEMENT CASE':'DIFFICULT CONVERSATION LAB')+'</span><h1>'+e(x.title)+'</h1><p>'+e(med?x.en:x.technique)+'</p></div></div>'+
'<div class="nvmod-detailgrid"><div class="nvmod-maincol"><section class="nvmod-panel nvmod-visual"><div class="nvmod-fullart">'+(med?art(x.motif,false):behaviorArt())+'</div><div class="nvmod-kicker">تصویر مفهومی · اقتباس آموزشی از '+source(type,med?x.id:x.slide)+'</div><h2>موقعیت کاری ناوصنعت</h2><p>'+e(x.context)+'</p><div class="nvmod-callout"><b>زاویه تحلیل سازمانی</b><p>'+e(med?x.lens:'رفتاری را که می‌بینیم توصیف کنیم؛ نیت و شخصیت افراد را بدون شواهد قطعی قضاوت نکنیم.')+'</p></div></section>'+
choiceSection(type,x)+
'<section class="nvmod-panel"><span class="nvmod-overline">ROLE PLAY · PRACTICE</span><h2>🎭 تمرین گفت‌وگوی حرفه‌ای</h2><p>'+e(x.roleplay)+'</p><div class="nvmod-script"><b>جمله پیشنهادی برای شروع</b><p>«'+e(x.line)+'»</p></div><div class="nvmod-exercise"><b>چارچوب اجرای تمرین</b><ol><li>یک نفر نقش مسئول یا سرپرست و نفر دیگر نقش همکار را بگیرد.</li><li>ابتدا مسئله، محدودیت و رابطه را روشن کنید؛ از راه‌حل فوری بپرهیزید.</li><li>در پایان، توافق را با اقدام، مسئول پیگیری و زمان بازبینی ببندید.</li></ol></div><label class="nvmod-fieldlabel" for="nvmod-note">بازخورد مدرس / یادداشت شخصی</label><textarea id="nvmod-note" rows="3" placeholder="چه رفتار یا جمله‌ای مؤثر بود و چه چیزی باید اصلاح شود؟">'+e(d.note||"")+'</textarea><button type="button" class="nvmod-save" data-industry-save="'+type+'" data-id="'+x.id+'">ذخیره یادداشت در این مرورگر</button><span class="nvmod-status" id="nvmod-status" aria-live="polite"></span></section>'+
'</div><aside class="nvmod-side"><div class="nvmod-sidecard"><span class="nvmod-overline">FACILITATOR DESK</span><h3>راهنمای اجرای مدرس</h3><div class="nvmod-info"><b>تکنیک محوری</b><p>'+e(x.technique)+'</p></div><div class="nvmod-info"><b>قاعده رفتار پیشنهادی</b><p>'+e(x.rule)+'</p></div>'+(!med?'<div class="nvmod-info"><b>پرهیز از</b><p>'+e(x.pitfall)+'</p></div><div class="nvmod-info"><b>عبارت موقعیت</b><p>«'+e(x.quote)+'»</p></div>':'')+'<div class="nvmod-info"><b>پرسش Reflective Learning</b><p>چه فرضی را در این موقعیت بدیهی گرفته‌ایم و چه شواهدی آن را تأیید می‌کند؟</p></div><p class="nvmod-small">قاعده پیشنهادی آموزشی است و جایگزین روش‌های مصوب شرکت، الزامات ایمنی یا تصمیم منابع انسانی نمی‌شود.</p></div></aside></div>'+
'<nav class="nvmod-next" aria-label="جابه‌جایی بین موقعیت‌ها">'+(prev?'<a href="#/'+(med?'medicator':'behavior')+'/'+prev.id+'">→ '+e(prev.title)+'</a>':'<span></span>')+(next?'<a href="#/'+(med?'medicator':'behavior')+'/'+next.id+'">'+e(next.title)+' ←</a>':'<span></span>')+'</nav></div>';
}
window.NaavIndustryModule={render:function(type,role,id){return id?detail(type,role,id):list(type,role)},ready:true};
document.addEventListener("click",function(ev){
var c=ev.target.closest("[data-industry-choice]");if(c){var type=c.dataset.type,id=+c.dataset.id,num=+c.dataset.industryChoice;save(type,id,{choice:num});var el=document.getElementById("nvmod-decision");if(el){el.outerHTML=choiceSection(type,found(type,id));document.getElementById("nvmod-decision").scrollIntoView({block:"nearest",behavior:"smooth"})}return}
var f=ev.target.closest("[data-industry-filter]");if(f){selectedFilter[f.dataset.type]=f.dataset.industryFilter;window.dispatchEvent(new Event("hashchange"));return}
var s=ev.target.closest("[data-industry-save]");if(s){var el=document.getElementById("nvmod-note"),ok=save(s.dataset.industrySave,+s.dataset.id,{note:el?el.value:""}),st=document.getElementById("nvmod-status");if(st)st.textContent=ok?"✓ یادداشت در همین مرورگر ذخیره شد.":"امکان ذخیره محلی وجود ندارد.";return}
});
document.addEventListener("input",function(ev){var q=ev.target.dataset&&ev.target.dataset.industryQuery;if(q){queries[q]=ev.target.value;var r;try{r=JSON.parse(localStorage.getItem("naav_studio_role"))||"managers"}catch(er){r="managers"}var dst=document.getElementById("nvmod-grid");if(dst){var tmp=document.createElement("div");tmp.innerHTML=list(q,r);var n=tmp.querySelector("#nvmod-grid");if(n)dst.innerHTML=n.innerHTML}}});
})();
