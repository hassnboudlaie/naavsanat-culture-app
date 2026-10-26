/* NAAVSANAT supplemental modules: shared-screen, no private instructor guidance */
(function(){
"use strict";
var d=window.NAAV_INDUSTRY_DATA||{med:[],behavior:[]};
var name={medicator:"مدیکاتور",behavior:"هنر رفتار با افراد دشوار"};
var roleNames={managers:"مدیران ستاد",hq:"کارکنان ستاد",operations:"کارکنان عملیاتی"};
var stageNames=["موقعیت","انتخاب","تحلیل","تمرین"];
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
 return '<div class="crumb">'+a("track/"+r,roleNames[r])+'</div><section class="section-intro"><span class="kicker">تمرین‌های تکمیلی</span><h1>'+name[type]+'</h1><p>'+ (type==="medicator"?"از تصویر و موقعیت تا تصمیم و رفتار حرفه‌ای.":"مهارت گفت‌وگو در موقعیت‌های دشوار کاری.")+'</p></section>'+
 '<div class="module-filter">'+a(type+"/"+r, "مناسب "+roleNames[r],!all?"module-pill active":"module-pill")+
 a(type+"/"+r+"/all","همه موقعیت‌ها",all?"module-pill active":"module-pill")+'</div>'+
 '<div class="case-grid">'+selected.map(function(x){return '<a class="case-tile" href="#/'+type+'/'+r+'/'+x.id+'/0"><span class="tiny-label">'+(type==="medicator"?"تصویر "+fa(x.id):"موقعیت "+fa(x.id))+'</span><strong>'+e(x.title)+'</strong><p>'+e(x.context)+'</p><span class="case-link">بازکردن موقعیت ←</span></a>'}).join("")+'</div>'+
 (selected.length?"":'<p class="quiet-note">در این دسته موردی تعریف نشده است؛ همه موقعیت‌ها را ببینید.</p>');
}
function stageNav(type,r,id,step){
 return '<nav class="case-steps" aria-label="مراحل تمرین" style="grid-template-columns:repeat(4,1fr)">'+stageNames.map(function(t,i){return a(type+"/"+r+"/"+id+"/"+i,'<span>'+fa(i+1)+'</span><strong>'+t+'</strong>',"step "+(step===i?"active":""))}).join("")+'</nav>';
}
function detail(type,r,id,stage){
 var x=items(type).find(function(y){return y.id===+id});if(!x)return list(type,r,false);
 var med=type==="medicator",s=Math.max(0,Math.min(3,stage|0));
 var key="naav_industry_"+(med?"med":"behavior")+"_"+id;
 var chosen=saved(key,-1);
 var content="";
 if(s===0)content='<span class="kicker">موقعیت کاری</span><h2>'+e(x.title)+'</h2><div class="situation">'+e(x.context)+'</div>'+
 (med?'<div class="reflection"><span class="qmark">؟</span><p>'+e(x.question)+'</p></div>':'<div class="voice"><strong>جمله‌ای که گفت‌وگو را دشوار می‌کند</strong><p>«'+e(x.quote)+'»</p></div>');
 if(s===1){
  content='<span class="kicker">انتخاب</span><h2>'+(med?e(x.question):"شما چه پاسخی می‌دهید؟")+'</h2>';
  if(med){content+='<div class="choices">'+x.options.map(function(o,i){return '<button class="pick '+(chosen===i?"chosen":"")+'" data-mod-choice="'+i+'" data-mod-key="'+key+'" data-mod-type="'+type+'" data-mod-role="'+r+'" data-mod-id="'+id+'" type="button"><span class="pick-letter">'+["الف","ب","ج"][i]+'</span><span>'+e(o)+'</span></button>'}).join("")+'</div>';
  if(chosen>=0)content+='<div class="module-feedback"><strong>پیامد این انتخاب</strong><p>'+e(x.feedback[chosen])+'</p></div>';
  }else content+='<div class="situation">«'+e(x.quote)+'»</div><div class="reflection"><span class="qmark">؟</span><p>چه پاسخی هم احترام را حفظ می‌کند و هم مسئله واقعی را روشن می‌سازد؟</p></div><details class="fold"><summary>یک پاسخ پیشنهادی</summary><p>«'+e(x.line)+'»</p></details>';
 }
 if(s===2)content='<span class="kicker">فنون رفتار سازمانی</span><h2>'+e(x.technique)+'</h2>'+
 '<div class="takeaway">'+e(med?x.lens:x.line)+'</div>'+
 (!med?'<div class="module-alert"><strong>چه رویکردی ممکن است تنش را افزایش دهد؟</strong><p>'+e(x.pitfall)+'</p></div>':'')+
 '<section class="rule"><span>قاعده رفتاری</span><p>'+e(x.rule)+'</p></section>';
 if(s===3)content='<span class="kicker">تمرین</span><h2>این گفت‌وگو را اجرا کنیم.</h2><div class="practice-problem">'+e(x.roleplay)+'</div>'+
 '<div class="line-example"><span>جمله پیشنهادی برای شروع</span><p>«'+e(x.line)+'»</p></div>'+
 '<div class="reflection"><span class="qmark">؟</span><p>چه چیزی در گفت‌وگو باعث شد مسئله روشن‌تر شود و همکاری ادامه پیدا کند؟</p></div>';
 var base=type+"/"+r+"/"+id+"/";
 return '<div class="crumb">'+a("track/"+r,roleNames[r])+' <span> / </span> '+a(type+"/"+r,name[type])+'</div>'+
 '<section class="case-heading"><span class="kicker">'+name[type]+'</span><h1>'+e(x.title)+'</h1></section>'+
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