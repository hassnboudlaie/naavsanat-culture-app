/* NAAVSANAT supplemental modules: shared-screen, no private instructor guidance */
(function(){
"use strict";
var d=window.NAAV_INDUSTRY_DATA||{med:[],behavior:[]};
var name={medicator:"مدیکاتور",behavior:"هنر رفتار با افراد دشوار"};
var roleNames={managers:"مدیران ستاد",hq:"کارکنان ستاد",operations:"کارکنان عملیاتی"};
var stageNames=["موقعیت","انتخاب","تحلیل","تمرین"];
var stageEmoji=["🧩","🧭","🔎","🎭"];
/* Plain-language skill headlines; source terminology remains available on demand. */
var techniqueTitles={
 medicator:{
 3:"از ارجاع تا نتیجه، مسئول کار را روشن کنیم",
 5:"سه واحد، یک برنامه مشترک",
 17:"به‌جای «نمی‌شود»، راه بعدی را پیدا کنیم",
 28:"کار ساده‌تر، بدون دورزدن ایمنی",
 31:"قبل از تصمیم، حرف دیگران را بشنویم",
 40:"فقط فرد را نبینیم؛ مسیر کار را هم بررسی کنیم",
 42:"جلسه را با مسئول و موعد تمام کنیم",
 51:"یک واژه، یک برداشت مشترک",
 55:"تحویل شیفت؛ گفتن، شنیدن، تأییدکردن",
 57:"کار انجام‌شده مهم است یا اثر آن؟",
 60:"تغییر برنامه را به همه برسانیم",
 68:"درباره ظرفیت واقعی کار، روشن حرف بزنیم"
 },
 behavior:{
 1:"جلوی بی‌احترامی را بگیریم؛ بحث را به مسئله برگردانیم",
 2:"اول گوش بدهیم، بعد مسئله را روشن کنیم",
 3:"برای «کافی است» معیار مشخص داشته باشیم",
 4:"نگرانی از تغییر را بشنویم",
 5:"به فرد کم‌حرف فرصت امن بدهیم",
 6:"گفتن نگرانی را آسان‌تر کنیم",
 7:"مسئول و مرز کار را روشن کنیم",
 8:"واقعیت را از حدس جدا کنیم",
 9:"به‌جای پیش‌داوری، شواهد بخواهیم",
 10:"تعهد، مانع و موعد را روشن کنیم",
 11:"نقد را به یک پیشنهاد قابل بررسی تبدیل کنیم",
 12:"نظر واحدهای درگیر را هم بشنویم",
 13:"قدرشناسی همراه با مرز کار",
 14:"اشتباه را بررسی کنیم، نه شخصیت فرد را",
 15:"برای شنیدن همه، وقت گفت‌وگو را تقسیم کنیم",
 16:"کار، مسئول و موعد را یک‌جا ثبت کنیم",
 17:"به‌جای مقصر، نقطه قطع همکاری را پیدا کنیم",
 18:"کار را با اختیار روشن واگذار کنیم",
 19:"بازخورد مشخص و در فضای مناسب بدهیم",
 20:"قبل از «بله»، ظرفیت واقعی را بپرسیم"
 }
};
function plainTechnique(type,x){return techniqueTitles[type]&&techniqueTitles[type][x.id]||x.technique}

function topicSticker(type){return type==="medicator"?"🖼️":"🎭"}
function e(v){return String(v==null?"":v).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function fa(v){return String(v).replace(/\d/g,function(x){return "۰۱۲۳۴۵۶۷۸۹"[+x]})}
function saved(k,def){try{var a=JSON.parse(localStorage.getItem(k));return a==null?def:a}catch(er){return def}}
function store(k,val){try{localStorage.setItem(k,JSON.stringify(val))}catch(er){}}
function items(type){
 if(type==="medicator")return d.med||[];
 return (d.behavior||[]).map(function(a,i){return {id:i+1,title:a[0],role:a[1],context:a[2],technique:a[3],quote:a[4],line:a[5],pitfall:a[6],roleplay:a[7],rule:a[8],slide:a[9]}})
}
function a(url,text,cls){return '<a class="'+(cls||"text-link")+'" href="#/'+url+'">'+text+'</a>'}
function list(type,r,all){
 var selected=items(type).filter(function(x){return all||x.role===r||x.role==="all"});
 return '<div class="crumb">'+a("home","پنج مسیر یادگیری")+'</div><section class="section-intro"><span class="kicker">ماژول مستقل</span><h1><span class="heading-sticker" aria-hidden="true">'+topicSticker(type)+'</span>'+name[type]+'</h1><p>'+ (type==="medicator"?"از یک تصویر شروع می‌کنیم، تصمیم می‌گیریم و اثر آن را می‌بینیم.":"یک موقعیت آشنا را می‌بینیم و پاسخ حرفه‌ای را تمرین می‌کنیم.")+'</p></section>'+
 '<div class="module-filter">'+a(type+"/"+r, "مناسب "+roleNames[r],!all?"module-pill active":"module-pill")+
 a(type+"/"+r+"/all","همه موقعیت‌ها",all?"module-pill active":"module-pill")+'</div>'+
 '<div class="case-grid">'+selected.map(function(x){return '<a class="case-tile" href="#/'+type+'/'+r+'/'+x.id+'/0"><span class="case-topline"><span class="tiny-label">'+(type==="medicator"?"تصویر "+fa(x.id):"موقعیت "+fa(x.id))+'</span><span class="case-sticker" aria-hidden="true">'+topicSticker(type)+'</span></span><strong>'+e(x.title)+'</strong><p>'+e(x.context)+'</p><span class="case-link">بازکردن موقعیت ←</span></a>'}).join("")+'</div>'+
 (selected.length?"":'<p class="quiet-note">در این دسته موردی تعریف نشده است؛ همه موقعیت‌ها را ببینید.</p>');
}
function stageNav(type,r,id,step){
 return '<nav class="case-steps" aria-label="مراحل تمرین" style="grid-template-columns:repeat(4,1fr)">'+stageNames.map(function(t,i){return a(type+"/"+r+"/"+id+"/"+i,'<span>'+fa(i+1)+'</span><strong><span class="step-emoji" aria-hidden="true">'+stageEmoji[i]+'</span>'+t+'</strong>',"step "+(step===i?"active":""))}).join("")+'</nav>';
}
function illustration(x,med){
 var kind=med?x.motif:"conversation";
 var shapes={
 mail:'<rect x="40" y="55" width="110" height="82" rx="12" fill="#fff" stroke="#0e5262" stroke-width="5"/><path d="m44 63 50 37 52-37" fill="none" stroke="#aa603b" stroke-width="5"/><path d="M167 96h63" stroke="#0e5262" stroke-width="7"/><path d="m217 82 16 14-16 14" fill="none" stroke="#0e5262" stroke-width="5"/><rect x="255" y="62" width="105" height="74" rx="12" fill="#d8e7e0" stroke="#0e5262" stroke-width="5"/><path d="m275 97 18 16 47-39" fill="none" stroke="#aa603b" stroke-width="6"/>',
 stairs:'<path d="M45 155h78v-35h75V87h75V53h83" fill="none" stroke="#0e5262" stroke-width="10"/><path d="m340 40 17 13-17 15" fill="none" stroke="#aa603b" stroke-width="6"/>',
 meeting:'<ellipse cx="204" cy="111" rx="99" ry="38" fill="#aa603b"/><circle cx="164" cy="45" r="20" fill="#0e5262"/><circle cx="251" cy="45" r="20" fill="#0e5262"/><circle cx="84" cy="110" r="20" fill="#0e5262"/><circle cx="321" cy="110" r="20" fill="#0e5262"/><rect x="177" y="97" width="55" height="30" rx="8" fill="#fff"/><path d="m189 110 10 9 19-17" stroke="#35806c" stroke-width="5" fill="none"/>',
 load:'<rect x="59" y="86" width="66" height="68" rx="7" fill="#c1d5cd"/><rect x="142" y="62" width="66" height="92" rx="7" fill="#a0c3b8"/><rect x="227" y="40" width="66" height="114" rx="7" fill="#0e5262"/><path d="M310 102h42m-13-14 16 14-16 14" stroke="#aa603b" stroke-width="6" fill="none"/>',
 conversation:'<rect x="37" y="37" width="146" height="95" rx="15" fill="#cce5dc" stroke="#0e5262" stroke-width="5"/><path d="m106 132-20 25v-25" fill="#cce5dc" stroke="#0e5262" stroke-width="5"/><rect x="213" y="56" width="156" height="91" rx="15" fill="#fff" stroke="#aa603b" stroke-width="5"/><path d="m287 147 22 22v-22" fill="#fff" stroke="#aa603b" stroke-width="5"/><path d="M59 72h99m-99 26h71M236 88h112m-112 25h74" stroke="#468a7c" stroke-width="6" stroke-linecap="round"/>',
 general:'<rect x="54" y="66" width="99" height="78" rx="12" fill="#d6e8df" stroke="#0e5262" stroke-width="5"/><rect x="258" y="66" width="99" height="78" rx="12" fill="#fff" stroke="#aa603b" stroke-width="5"/><path d="M164 105h86m-16-13 16 13-16 13" fill="none" stroke="#aa603b" stroke-width="6"/>'
 };
 return '<figure class="module-illustration"><svg viewBox="0 0 410 190" role="img" aria-label="تصویر مفهومی مرتبط با موقعیت" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="406" height="186" rx="18" fill="#f1f7f3"/>'+(shapes[kind]||shapes.general)+'</svg><figcaption>'+(med?'استعاره تصویری بازطراحی‌شده · اسلاید '+fa(x.id)+' مدیکاتور':'تصویر مفهومی گفت‌وگوی حرفه‌ای')+'</figcaption></figure>';
}
function detail(type,r,id,stage){
 var x=items(type).find(function(y){return y.id===+id});if(!x)return list(type,r,false);
 var med=type==="medicator",s=Math.max(0,Math.min(3,stage|0));
 var key="naav_industry_"+(med?"med":"behavior")+"_"+id;
 var chosen=saved(key,-1);
 var content="";
 if(s===0)content=illustration(x,med)+'<span class="kicker">موقعیت کاری</span><h2>'+e(x.title)+'</h2><div class="situation">'+e(x.context)+'</div>'+
 (med?'<div class="reflection"><span class="qmark">؟</span><p>'+e(x.question)+'</p></div>':'<div class="voice"><strong>جمله‌ای که گفت‌وگو را دشوار می‌کند</strong><p>«'+e(x.quote)+'»</p></div>');
 if(s===1){
  content='<span class="kicker">انتخاب</span><h2>'+(med?e(x.question):"شما چه پاسخی می‌دهید؟")+'</h2>';
  if(med){content+='<div class="choices">'+x.options.map(function(o,i){return '<button class="pick '+(chosen===i?"chosen":"")+'" data-mod-choice="'+i+'" data-mod-key="'+key+'" data-mod-type="'+type+'" data-mod-role="'+r+'" data-mod-id="'+id+'" type="button"><span class="pick-letter">'+["الف","ب","ج"][i]+'</span><span>'+e(o)+'</span></button>'}).join("")+'</div>';
  if(chosen>=0)content+='<div class="module-feedback"><strong>پیامد این انتخاب</strong><p>'+e(x.feedback[chosen])+'</p></div>';
  }else content+='<div class="situation">«'+e(x.quote)+'»</div><div class="reflection"><span class="qmark">؟</span><p>چه پاسخی هم احترام را حفظ می‌کند و هم مسئله واقعی را روشن می‌سازد؟</p></div><details class="fold"><summary>یک پاسخ پیشنهادی</summary><p>«'+e(x.line)+'»</p></details>';
 }
 if(s===2)content='<span class="kicker">در عمل چه کمکی می‌کند؟</span><h2>'+e(plainTechnique(type,x))+'</h2>'+
 '<details class="fold discreet-fold"><summary>نام تخصصی این فن</summary><p dir="ltr">'+e(x.technique)+'</p></details>'+
 '<div class="takeaway">'+e(med?x.lens:x.line)+'</div>'+ 
 (med?'<div class="analysis-two"><div><strong>نقطه کور تصمیم</strong><p>اگر صرفاً رفتار یک واحد را مقصر بدانیم، وابستگی‌ها و معیارهای تصمیم را از قلم می‌اندازیم.</p></div><div><strong>نشانه موفقیت</strong><p>'+e(x.rule)+'</p></div></div>':
 '<div class="analysis-two"><div><strong>رفتار قابل مشاهده، نه برچسب شخصیت</strong><p>«'+e(x.quote)+'»؛ روی رفتار و اثر آن بر همکاری متمرکز شویم، نه حدس‌زدن درباره نیت یا ویژگی پایدار فرد.</p></div><div><strong>مرز پاسخ حرفه‌ای</strong><p>'+e(x.pitfall)+'</p></div></div>')+
 (!med?'<div class="module-alert"><strong>چه رویکردی ممکن است تنش را افزایش دهد؟</strong><p>'+e(x.pitfall)+'</p></div>':'')+
 '<section class="rule"><span>قاعده رفتاری</span><p>'+e(x.rule)+'</p></section>';
 if(s===3)content='<span class="kicker">تمرین</span><h2>این گفت‌وگو را اجرا کنیم.</h2><div class="practice-problem">'+e(x.roleplay)+'</div>'+
 '<div class="line-example"><span>جمله پیشنهادی برای شروع</span><p>«'+e(x.line)+'»</p></div>'+
 '<div class="role-pressure"><strong>معیار تمرین حرفه‌ای</strong><p>'+(med?'آیا مسئول تصمیم، نقطه وابستگی و زمان بازبینی روشن شد؛ بدون ساده‌سازی مسئله به مقصر فردی؟':'آیا گفت‌وگو هم‌زمان سه کار انجام داد: شنیدن نگرانی، تعیین مرز محترمانه، و رسیدن به تعهد قابل پیگیری؟')+'</p></div>'+
 '<div class="reflection"><span class="qmark">؟</span><p>چه چیزی در گفت‌وگو باعث شد مسئله روشن‌تر شود و همکاری ادامه پیدا کند؟</p></div>';
 var base=type+"/"+r+"/"+id+"/";
 return '<div class="crumb">'+a("home","پنج مسیر یادگیری")+' <span> / </span> '+a(type+"/"+r,name[type])+'</div>'+
 '<section class="case-heading"><span class="kicker">'+name[type]+'</span><h1><span class="heading-sticker" aria-hidden="true">'+topicSticker(type)+'</span>'+e(x.title)+'</h1></section>'+
 stageNav(type,r,id,s)+'<div class="case-content"><section class="content-section">'+content+'</section></div>'+
 '<nav class="stage-foot">'+(s>0?a(base+(s-1),"مرحله قبل","secondary-btn"):a(type+"/"+r,"همه موقعیت‌ها","secondary-btn"))+
 (s<3?a(base+(s+1),"ادامه: "+stageNames[s+1]+" ←","primary-btn"):a(type+"/"+r,"بازگشت به فهرست ←","primary-btn"))+'</nav>';
}
window.NaavIndustryModule={render:function(type,r,id,stage){return id&&id!=="all"?detail(type,r,id,stage):list(type,r,id==="all")}};
document.addEventListener("click",function(ev){
 var b=ev.target.closest("[data-mod-choice]");if(!b)return;
 store(b.dataset.modKey,+b.dataset.modChoice);
 window.dispatchEvent(new Event("hashchange"));
});
})();