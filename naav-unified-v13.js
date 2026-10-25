/* NAAVSANAT / DESIGN SYSTEM V13
 * Unifies legacy six-step case reports, all sessions, context and OKR with the
 * simplified high-contrast homepage and 3 job-role tracks.
 * Content, 15×3 cases, evidence, notes, printing, sessions and OKR retained.
 */
function nsUnifiedShell(route,html){
 var label=route==='culture-okr'?'مدل تحول فرهنگ':route==='context'?'درباره برنامه':route==='cases'?'کیس‌های آموزشی':
 /^case-/.test(route)?'مطالعه کامل کیس':
 /^(?:managers|hq)-\d+$/.test(route)?'جلسات آموزشی':'آموزش رفتار سازمانی';
 return '<div class="ns-simple ns-full-page" dir="rtl">'+nsTop(label)+
 '<div class="ns-full-content">'+html+'</div>'+nsPageEnd()+'</div>';
}
function nsSessionCard(id,role){
 var info=role==='hq'&&typeof NHQ_CASES!=='undefined'?NHQ_CASES[id-1]:null;
 var c=CASES[id-1],label=info?info.short:c.title,summary=info?info.desc:c.concept;
 var route=role==='hq'?'hq-case/'+id:'ns-case/'+role+'/'+id;
 return '<button class="ns-session-case" onclick="goRoute(\''+route+'\')"><span class="ns-session-index">'+fa(id)+'</span>'+
 '<span><b>'+esc(label)+'</b><small>'+esc(summary)+'</small></span><strong aria-hidden="true">←</strong></button>';
}
function sessionPage(role,index){
 if(!ROLES[role]||role==='operations')return nsRolePage('operations');
 if(role==='hq'&&index===0)return hqLessonPage(0);
 var lessons=role==='managers'?managers:hq;
 if(!Number.isInteger(index)||index<0||index>=lessons.length)return nsRolePage(role);
 var s=lessons[index],cases=sessionCases[role][index],visited=getVisited();
 chooseRole(role);
 return '<div class="ns-session fade">'+
 '<button class="ns-inline-back" onclick="goRoute(\''+role+'\')">← بازگشت به '+ROLES[role].title+'</button>'+
 '<header class="ns-session-head"><span class="ns-overline">'+ROLES[role].title+' · جلسه '+fa(index+1)+' از '+fa(lessons.length)+'</span>'+
 '<h1>'+esc(s.t)+'</h1><p>'+esc(s.d)+'</p></header>'+
 '<section class="ns-session-goal"><span>هدف این جلسه</span><h2>'+esc(s.k)+'</h2></section>'+
 '<section class="ns-session-list"><h2>از یک کیس شروع کنید</h2><p>یکی را انتخاب کنید؛ ابتدا موقعیت، سپس انتخاب و پیامد را می‌بینید.</p>'+
 '<div class="ns-session-case-list">'+cases.map(function(id){return nsSessionCard(id,role)}).join('')+'</div></section>'+
 '<details class="ns-session-extra"><summary>راهنمای تکمیلی و موضوع‌های جلسه</summary><ul>'+s.topics.map(function(v){return '<li>'+esc(v)+'</li>'}).join('')+'</ul>'+
 '<p>این راهنما برای مطالعه بیشتر یا اجرای جلسه با مدرس است.</p></details>'+
 '<div class="ns-session-end"><button class="ns-primary" onclick="markDone(\''+role+'-'+index+'\')">'+(visited[role+'-'+index]?'جلسه مرور شده ✓':'این جلسه را مرور کردم ✓')+'</button>'+
 (index+1<lessons.length?'<button class="ns-inline-back" onclick="goRoute(\''+role+'-'+(index+1)+'\')">جلسه بعد ←</button>':'')+'</div></div>';
}
function casePage(gi,ci,role,step){
 var id=gi*5+ci+1,c=CASES[id-1];
 if(!c||!Number.isInteger(gi)||gi<0||gi>2||ci<0||ci>4)return casesPage();
 role=ROLES[role]?role:selectedRole();
 step=Number.isInteger(step)&&step>=0&&step<6?step:0;
 var done=isDone(id,role);
 chooseRole(role);
 var backRoute=role==='hq'?'hq-case/'+id:'ns-case/'+role+'/'+id;
 return '<div class="ns-deep-case fade"><button class="ns-inline-back" onclick="goRoute(\''+backRoute+'\')">← بازگشت به کیس '+fa(id)+'</button>'+
 '<header class="ns-deep-heading"><span class="ns-overline">مطالعه تکمیلی · '+ROLES[role].title+' · کیس '+fa(id)+'</span>'+
 '<h1>'+esc(c.title)+'</h1><p>'+esc(c.concept)+'</p></header>'+
 '<div class="ns-deep-progress"><div class="ns-deep-step"><span>بخش '+fa(step+1)+' از ۶</span><strong>'+STEPS[step]+'</strong></div>'+
 '<div class="ns-deep-track"><i style="width:'+((step+1)/6*100)+'%"></i></div></div>'+
 '<article class="ns-deep-reading"><h2>'+STEPS[step]+'</h2>'+caseBody(c,role,step)+'</article>'+
 '<nav class="ns-deep-actions" aria-label="جابه‌جایی در آموزش">'+
 (step>0?'<button class="ns-light-action" onclick="goRoute(\''+caseRoute(id,role,step-1)+'\')">→ مرحله قبل</button>':'<span></span>')+
 (step<5?'<button class="ns-primary" onclick="goRoute(\''+caseRoute(id,role,step+1)+'\')">مرحله بعد ←</button>':
 '<button class="ns-primary" onclick="toggleCaseDone('+id+',\''+role+'\')">'+(done?'علامت مرور شده ✓':'ثبت پایان کیس ✓')+'</button>')+
 '</nav>'+
 '<details class="ns-deep-more"><summary>رفتن به یکی از شش بخش</summary><div class="ns-deep-jump">'+STEPS.map(function(title,i){return '<button class="'+(i===step?'active':'')+'" onclick="goRoute(\''+caseRoute(id,role,i)+'\')">'+fa(i+1)+' · '+esc(title)+'</button>'}).join('')+'</div></details>'+
 '<details class="ns-deep-more"><summary>چاپ و نگهداری یادداشت‌ها</summary><p>یادداشت‌ها فقط در مرورگر شما ذخیره می‌شوند.</p>'+
 '<div class="ns-deep-jump"><button onclick="exportNotes(\''+role+'\')">دریافت یادداشت‌ها</button>'+
 '<button onclick="printCase('+id+',\''+role+'\')">چاپ محتوای کیس</button></div></details>'+
 '<div class="ns-deep-home"><button onclick="goRoute(\''+role+'\')">بازگشت به ۱۵ کیس ←</button></div></div>';
}
