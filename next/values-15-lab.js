/* NAAVSANAT — fifteen challenges → fifteen classroom value selections → five value families.
   Standalone content inside the EXISTING culture tab. No extra route or dashboard. */
(function(){
"use strict";
var KEY="naav_values15_agreed_v1",index=0,notice="",lastRole=null;
function source(){return window.NAAV_VALUE_CHALLENGES_15||[]}
function families(){return window.NAAV_VALUES_SOURCE&&window.NAAV_VALUES_SOURCE.pillars||[]}
function safe(v){return String(v==null?"":v).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function fa(v){return String(v).replace(/\d/g,function(c){return "۰۱۲۳۴۵۶۷۸۹"[+c]})}
function store(){try{var x=JSON.parse(localStorage.getItem(KEY));return x&&typeof x==="object"&&!Array.isArray(x)?x:{}}catch(e){return {}}}
function persist(x){try{localStorage.setItem(KEY,JSON.stringify(x));return true}catch(e){return false}}
function records(role){return store()[role]||{}}
function selectOptions(q,answer){return q.options.map(function(o,i){return '<option value="'+i+'"'+(String(answer)===String(i)?" selected":"")+'>'+["الف","ب","ج","د"][i]+" ـ "+safe(o.label)+'</option>'}).join("")}
function selected(q,rec){return rec&&Number.isInteger(+rec.option)&&q.options[Number(rec.option)]||null}
function count(role){var r=records(role);return source().filter(function(q){return !!selected(q,r[q.id])}).length}
function statement(role){
 var all=source(),r=records(role),p=families();
 if(count(role)!==15)return "";
 return "پیش‌نویس بیانیه ارزش‌های کسب‌وکار ناوصنعت مس\n\n"+
 "ما در ناوصنعت مس ارزش‌هایمان را در تصمیم‌ها، تعهدها و رفتارهای روزمره نشان می‌دهیم:\n\n"+
 p.map(function(group,i){return group.title+"\n"+all.filter(function(q){return q.pillar===i}).map(function(q){return "• "+selected(q,r[q.id]).principle}).join("\n")}).join("\n\n")+
 "\n\nمصادیق ارزش‌ها در محیط شرکت\n"+
 all.map(function(q){var o=selected(q,r[q.id]);return fa(q.caseId)+" ـ "+o.value+": "+o.example}).join("\n")+
 "\n\nاین بیانیه حاصل انتخاب‌های ثبت‌شده در گفت‌وگوی آموزشی است و تا تأیید مرجع صلاحیت‌دار شرکت، پیش‌نویس محسوب می‌شود.";
}
function results(role){
 var q=source(),r=records(role),p=families(),done=count(role),ready=done===15;
 return '<section class="v15-results" aria-labelledby="v15-results-title"><div class="v15-result-head"><div><h2 id="v15-results-title">از ۱۵ چالش تا ارزش‌های شرکت</h2><p>'+fa(done)+' از ۱۵ ارزش انتخاب شده</p></div>'+
 (done?'<button type="button" class="cl-secondary" data-v15-csv>دریافت ۱۵ انتخاب (CSV)</button>':'')+'</div>'+
 (!done?'<p class="v15-pending">با ثبت اولین پاسخ، ارزش پیشنهادی و مصداق آن اینجا نمایش داده می‌شود.</p>':
 '<div class="v15-families">'+p.map(function(group,i){var items=q.filter(function(x){return x.pillar===i}),picked=items.filter(function(x){return !!selected(x,r[x.id])});
 return '<details class="v15-family"><summary><strong>'+safe(group.title)+'</strong><small>'+fa(picked.length)+' از '+fa(items.length)+' ارزش</small></summary><div>'+
 (picked.length?picked.map(function(x){var o=selected(x,r[x.id]);return '<article><small>چالش '+fa(x.caseId)+' · '+safe(x.title)+'</small><strong>'+safe(o.value)+'</strong><p>'+safe(o.principle)+'</p><p><b>مصداق:</b> '+safe(o.example)+'</p></article>'}).join(""):'<p>هنوز ارزشی از این دسته انتخاب نشده است.</p>')+
 '</div></details>'}).join("")+'</div>')+
 (ready?'<section class="v15-statement"><h3>پیش‌نویس بیانیه ارزش‌های ناوصنعت مس</h3>'+
 '<p>ما در ناوصنعت مس ارزش‌هایمان را در تصمیم‌ها، تعهدها و رفتارهای روزمره نشان می‌دهیم:</p>'+
 p.map(function(group,i){return '<p><strong>'+safe(group.title)+':</strong> '+q.filter(function(x){return x.pillar===i}).map(function(x){return safe(selected(x,r[x.id]).principle)}).join(" ")+'</p>'}).join("")+
 '<p class="v15-disclaimer">پیش‌نویس آموزشی بر پایه ۱۵ انتخاب کلاسی؛ برای تصویب رسمی نیازمند بررسی و تأیید شرکت است.</p>'+
 '<button type="button" class="cl-secondary" data-v15-statement>دریافت بیانیه و مصادیق (TXT)</button></section>':
 '<p class="v15-disclaimer">با تکمیل هر ۱۵ انتخاب، بیانیه ارزش‌ها و مصادیق کاری از همین پاسخ‌ها تولید می‌شود؛ هیچ پاسخ فرضی به نتیجه اضافه نمی‌شود.</p>')+
 '<p class="v15-storage">پاسخ‌ها در مرورگر همین دستگاه ذخیره می‌شوند؛ برای نگهداری از فایل خروجی استفاده کنید.</p></section>';
}
function render(role){
 if(lastRole!==role){lastRole=role;index=0;notice=""}
 var all=source(),q=all[index]||all[0];
 if(!q)return '<p>داده‌های پانزده چالش در دسترس نیست.</p>';
 var r=records(role),sel=selected(q,r[q.id]);
 return '<div id="naav-value15" class="v15-root" data-v15-role="'+safe(role)+'">'+
 '<section class="cl-stage v15-stage"><div class="cl-stage-head"><span class="cl-eyebrow">چالش '+fa(index+1)+' از ۱۵</span><span class="v15-progress">'+fa(count(role))+' انتخاب ثبت‌شده</span></div>'+
 '<label class="cl-field-label" for="v15-question">چالش موردنظر</label><select id="v15-question">'+all.map(function(o,i){return '<option value="'+i+'"'+(index===i?' selected':'')+'>'+fa(i+1)+' ـ '+safe(o.title)+'</option>'}).join("")+'</select>'+
 '<div class="cl-story"><div class="cl-story-eyebrow">موقعیت آشنا در ناوصنعت</div><p>'+safe(q.scene)+'</p><h2>'+safe(q.ask)+'</h2></div>'+
 '<label class="cl-field-label" for="v15-choice">گروه روی کدام ارزش توافق می‌کند؟</label>'+
 '<select id="v15-choice"><option value="">ارزش را انتخاب کنید...</option>'+selectOptions(q,r[q.id]&&r[q.id].option)+'</select>'+
 (sel?'<div class="v15-saved"><strong>انتخاب ثبت‌شده:</strong> '+safe(sel.value)+'</div>':'')+
 '<div class="v15-controls"><button type="button" class="cl-save" data-v15-save>ثبت انتخاب و '+(index===14?'مشاهده نتیجه':'ادامه')+' ←</button><button type="button" class="cl-secondary" data-v15-next>سؤال بعدی</button></div>'+
 '<p role="status" aria-live="polite" id="v15-message">'+safe(notice)+'</p></section>'+
 results(role)+'</div>';
}
function refresh(){var node=document.getElementById("naav-value15");if(node)node.outerHTML=render(node.dataset.v15Role)}
function csvCell(x){var s=String(x==null?"":x);if(/^\s*[=+\-@]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"'}
function exportFile(filename,content,type){var blob=new Blob(["\uFEFF"+content],{type:type||"text/plain;charset=utf-8"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url)},1000)}
function exportCSV(role){
 var r=records(role),famil=families(),head=["شماره چالش","چالش سازمانی","دسته ارزش","ارزش منتخب","گزاره رفتاری","مصداق در ناوصنعت","وضعیت"];
 var data=source().map(function(q){var o=selected(q,r[q.id]);return [q.caseId,q.title,famil[q.pillar].title,o&&o.value||"",o&&o.principle||"",o&&o.example||"",o?"انتخاب کلاسی":"انتخاب نشده"]});
 exportFile("naavsanat-15-selected-values.csv",[head].concat(data).map(function(x){return x.map(csvCell).join(",")}).join("\r\n"),"text/csv;charset=utf-8");
}
document.addEventListener("click",function(e){
 var b=e.target.closest("[data-v15-save]");if(b){
  var root=b.closest("#naav-value15"),role=root.dataset.v15Role,q=source()[index],choice=root.querySelector("#v15-choice").value;
  if(choice===""||!q.options[+choice]){root.querySelector("#v15-message").textContent="ابتدا یکی از گزینه‌های ارزشی را انتخاب کنید.";root.querySelector("#v15-choice").focus();return}
  var db=store();if(!db[role])db[role]={};db[role][q.id]={option:+choice,updatedAt:new Date().toISOString()};
  var ok=persist(db);notice=ok?"انتخاب ثبت شد.":"ذخیره‌سازی مرورگر در دسترس نیست؛ نتیجه ممکن است پس از بستن صفحه باقی نماند.";
  var last=index===14;if(!last)index++;refresh();if(last){var heading=document.getElementById("v15-results-title");if(heading)heading.scrollIntoView({block:"start",behavior:"smooth"})}
  return;
 }
 b=e.target.closest("[data-v15-next]");if(b){index=(index+1)%source().length;notice="";refresh();return}
 b=e.target.closest("[data-v15-csv]");if(b){exportCSV(b.closest("#naav-value15").dataset.v15Role);return}
 b=e.target.closest("[data-v15-statement]");if(b){var txt=statement(b.closest("#naav-value15").dataset.v15Role);if(txt)exportFile("naavsanat-proposed-values-statement.txt",txt);return}
});
document.addEventListener("change",function(e){if(e.target.matches("#v15-question")){index=Number(e.target.value)||0;notice="";refresh()}});
window.NaavValues15={render:render,questions:source,statement:statement};
})();