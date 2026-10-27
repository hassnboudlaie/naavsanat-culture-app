/* NAAVSANAT — participatory culture dialogue. Local, device-bound classroom data. */
(function(){
"use strict";
var KEY="naav_culture_dialogue_v1", REVIEW="naav_culture_pdf_review_v1";
var roles={managers:"مدیران شرکت",hq:"کارکنان ستاد",operations:"کارکنان عملیاتی"};
var groups=[
 {id:"ethics",icon:"⚖️",name:"اخلاق حرفه‌ای",sub:"زیر فشار، چه مرزی را رعایت کنیم؟"},
 {id:"values",icon:"🧭",name:"ارزش‌های مشترک",sub:"هنگام تعارض، چه چیزی راهنمای تصمیم است؟"},
 {id:"culture",icon:"🤝",name:"فرهنگ در عمل",sub:"چه رفتاری را تکرار یا اصلاح کنیم؟"}
];
var questions=[
 {id:"e1",group:"ethics",tag:0,title:"گزارشی که کامل نیست",
 scene:{managers:"گزارشی برای تصمیم مدیران فرستاده شده، اما یکی از فرض‌های مهم آن درست نبوده. اصلاحش می‌تواند تصمیم را عقب بیندازد.",hq:"گزارش واحد شما ارسال شده، اما متوجه می‌شوید یک عدد مهم نیاز به اصلاح دارد. واحد دریافت‌کننده با همین گزارش مشغول تصمیم است.",operations:"در تحویل شیفت، یک ثبت مهم ناقص مانده است. اگر اصلاحش کنید، احتمالاً برنامه بعدی کمی تغییر می‌کند."},
 ask:"چه واکنشی مسئولانه‌تر است؟",
 options:["موضوع و اثر احتمالی را به‌موقع اعلام کنیم و گزارش را اصلاح کنیم.","ابتدا در واحد خودمان بررسی کنیم؛ سپس با زمان مشخص اطلاع بدهیم.","اگر اثر قابل‌توجهی ندیدیم، اصلاح را در گزارش بعدی بیاوریم."],
 feedback:["از تصمیم مبتنی بر داده نادرست جلوگیری می‌کند؛ هم‌زمان باید میزان اطمینان و اثر تغییر روشن گفته شود.","برای جلوگیری از هشدار بی‌دلیل مفید است، به شرط اینکه بررسی کوتاه باشد و تصمیم مهم در این فاصله بر اطلاعات مشکوک تکیه نکند.","ممکن است وقت حفظ شود، اما اگر اثر را اشتباه برآورد کرده باشیم اعتماد آسیب می‌بیند. برای تغییر بی‌اهمیت هم باید معیار مشخص داشته باشیم."],
 insight:"اصل رفتاری: اگر اطلاعات ما می‌تواند بر تصمیم دیگری اثر بگذارد، ابهام را پنهان نمی‌کنیم. اصلاح به‌موقع همراه با توضیح اثر، از سرزنش‌کردن مفیدتر است."},
 {id:"e2",group:"ethics",tag:4,title:"وقتی موعد با ایمنی تعارض دارد",
 scene:{managers:"برای حفظ موعد مشتری، پیشنهاد می‌شود یک تأیید ایمنی را بعد از شروع کار تکمیل کنند.",hq:"برای سرعت‌دادن به کار، از شما می‌خواهند تأیید ضروری را بدون بررسی معمول ثبت کنید.",operations:"کار عقب افتاده و کسی پیشنهاد می‌کند کنترل ایمنی لازم را کوتاه کنیم تا شیفت به موعد برسد."},
 ask:"در برابر فشار زمان چه کنیم؟",
 options:["کار پرخطر را تا تعیین تکلیف مرجع صلاحیت‌دار جلو نبریم و راه جایگزین پیشنهاد بدهیم.","موضوع را به مدیر بالاتر ببریم و تا پاسخ او برنامه را آماده نگه داریم.","اگر تجربه قبلی نشان داده مشکلی پیش نمی‌آید، با احتیاط بیشتر پیش برویم."],
 feedback:["مرز ایمنی حفظ می‌شود؛ لازم است پیامد زمانی و پیشنهاد اجرایی جایگزین هم گفته شود.","ارجاع درست است، اما برای خطر فوری، صرف ارجاع مجوز ادامه کار نیست. وضعیت ایمن باید حفظ شود.","تجربه جای کنترل معتبر را نمی‌گیرد؛ این انتخاب خطر و مسئولیت ناموجه ایجاد می‌کند."],
 insight:"ایمنی یک شرط تصمیم است، نه مانع شخصی یک واحد. مسیر مصوب ایمنی و اختیار افراد صلاحیت‌دار مقدم است."},
 {id:"e3",group:"ethics",tag:3,title:"رابطه شخصی و تصمیم منصفانه",
 scene:{managers:"در یک تصمیم مرتبط با انتخاب تأمین‌کننده یا جذب نیرو، یکی از گزینه‌ها به یک مدیر معرفی شده است.",hq:"یکی از همکاران از شما می‌خواهد کار آشنای او را زودتر و بدون معیار مشترک جلو ببرید.",operations:"توزیع کار بین افراد شیفت به‌گونه‌ای پیشنهاد شده که به نفع یک همکار نزدیک است."},
 ask:"چطور هم رابطه را حفظ کنیم و هم انصاف را؟",
 options:["معیار مشترک و تعارض منافع را آشکار کنیم و همان معیار را برای همه اجرا کنیم.","برای جلوگیری از حساسیت، تصمیم را به فرد دیگری واگذار کنیم بدون توضیح درباره معیار.","با توجه به شناخت فرد معرفی‌شده، روند عادی ارزیابی را کوتاه کنیم."],
 feedback:["فرصت معرفی را حذف نمی‌کند؛ ولی ارزیابی و تصمیم قابل دفاع می‌ماند.","کناره‌گیری ممکن است لازم باشد، اما بدون ثبت معیار و مدیریت تعارض، شفافیت کافی ایجاد نمی‌کند.","شناخت شخصی می‌تواند یک داده اولیه باشد، نه جایگزین معیار و بررسی یکسان."],
 insight:"معیار منصفانه باید برای فرد مشابه نیز قابل اجرا و توضیح باشد."},
 {id:"v1",group:"values",tag:1,title:"موفقیت یک واحد، فشار روی واحد دیگر",
 scene:{managers:"بازرگانی می‌تواند فرصت تازه‌ای را قطعی کند؛ اما مالی و عملیات می‌گویند منابع و تعهدهای قبلی هنوز روشن نیست.",hq:"واحد شما می‌تواند کار را سریع تحویل بدهد، اما بخشی از ابهام‌ها و دوباره‌کاری به واحد بعد منتقل می‌شود.",operations:"یک شیفت با تمام‌کردن سریع کار خود، تحویل ناقصی به شیفت بعد می‌دهد."},
 ask:"به کدام معیار برای تصمیم مشترک تکیه کنیم؟",
 options:["نتیجه کل شرکت و اثر بر واحدهای درگیر را همراه با مرز اختیار بررسی کنیم.","هر واحد مطابق شاخص عملکرد خودش جلو برود و بعد اختلاف‌ها حل شود.","ابتدا اختلاف را به مقام بالاتر ارجاع دهیم و تا آن زمان کار مشترک متوقف شود."],
 feedback:["وابستگی‌ها را آشکار می‌کند و امکان تصمیم سریع ولی مسئولانه می‌دهد؛ باید مسئول، موعد و شرط تعهد مشخص شود.","ممکن است شاخص یک واحد بهتر شود ولی هزینه پنهان به سازمان منتقل می‌شود.","در اختلاف خارج از اختیار ضروری است، اما استفاده دائمی از ارجاع، توان همکاری را ضعیف می‌کند."],
 insight:"همکاری یعنی تصمیمی که هزینه پنهان آن به دوش واحد بعدی نیفتد؛ نه اینکه اختلاف‌ها نادیده گرفته شوند."},
 {id:"v2",group:"values",tag:2,title:"اختیار بدون پاسخگویی؟",
 scene:{managers:"به مدیری گفته‌اند تصمیم را خودش بگیرد؛ اما هر بار برای اجرای همان تصمیم، دوباره تأیید می‌خواهند.",hq:"مسئول یک کار مشخص هستید، ولی معلوم نیست تا کجا می‌توانید بدون اجازه تصمیم بگیرید.",operations:"در شیفت، مسئولیت کار روشن است اما هنگام تغییر شرایط، مرز تصمیم فرد مشخص نیست."},
 ask:"برای روشن شدن اختیار از کجا شروع کنیم؟",
 options:["دامنه تصمیم، استثناها، مسئول پاسخگو و زمان گزارش را مشخص کنیم.","همه تصمیم‌های حساس را برای جلوگیری از خطا به مدیر بالاتر منتقل کنیم.","اختیار کامل بدهیم و فقط اگر خطایی رخ داد درباره آن بحث کنیم."],
 feedback:["سرعت و accountability را توأم نگه می‌دارد؛ شرط موفقیت، مرز قابل فهم و پیگیری متناسب است.","ممکن است یک خطا را کم کند، اما گلوگاه و مسئولیت مبهم می‌سازد.","اعتماد مهم است، اما بدون حد تصمیم و مسیر گزارش خطر، واگذاری پایدار نمی‌ماند."],
 insight:"واگذاری مؤثر یعنی اختیار قابل استفاده + مرز روشن + گزارش متناسب، نه اجازه‌خواهی دوباره برای هر اقدام."},
 {id:"v3",group:"values",tag:5,title:"قولی که باید بتوانیم انجام دهیم",
 scene:{managers:"مشتری پاسخ سریع می‌خواهد، ولی زمان وصول پول و ظرفیت اجرای تعهد کاملاً مشخص نیست.",hq:"برای همکاری با یک واحد، موعدی پیشنهاد شده که انجام آن به دریافت اطلاعات از چند نفر وابسته است.",operations:"برای پایان کار، زمان کوتاهی قول داده شده اما تجهیزات و هماهنگی شیفت بعد قطعی نیست."},
 ask:"تعهد حرفه‌ای را چطور تعریف کنیم؟",
 options:["شرط‌ها و وابستگی‌ها را صریح بگوییم و قول قابل پیگیری بدهیم.","برای حفظ رابطه موعد خوش‌بینانه بدهیم و بعد برای جبران تلاش کنیم.","تا رفع تمام ابهام‌ها هیچ پاسخ یا زمان تقریبی ندهیم."],
 feedback:["به طرف مقابل تصویر قابل اعتماد می‌دهد و مانع توافق مبهم می‌شود.","انگیزه می‌سازد ولی توقعی ایجاد می‌کند که شاید قابل تحقق نباشد.","احتیاط مفید است، ولی می‌توان پاسخ مشروط و زمان بررسی مشخص ارائه کرد."],
 insight:"تعهد شفاف، هم فرصت را حفظ می‌کند و هم شرط‌های واقعی اجرا را پنهان نمی‌کند."},
 {id:"c1",group:"culture",tag:3,title:"مخالفتی که فقط بعد از جلسه شنیده می‌شود",
 scene:{managers:"در جلسه مدیران کسی مخالفت نمی‌کند، اما بعداً چند نفر می‌گویند تصمیم عملی نیست.",hq:"در جلسه هماهنگی همه ساکت‌اند؛ بعد از جلسه اعتراض‌ها در پیام‌های جداگانه مطرح می‌شود.",operations:"در تحویل شیفت، ابهام را همان‌جا مطرح نمی‌کنند؛ بعداً اختلاف برداشت پیش می‌آید."},
 ask:"کدام تغییر احتمال گفت‌وگوی سالم را بیشتر می‌کند؟",
 options:["پیش از جمع‌بندی، وقت مشخصی برای بیان نگرانی و ثبت اختلاف باقی‌مانده بگذاریم.","در پایان جلسه از همه بخواهیم موافقت خود را تأیید کنند.","از افراد منتقد بخواهیم اعتراضشان را فقط بعداً خصوصی مطرح کنند."],
 feedback:["مخالفت محترمانه را به بخشی از تصمیم تبدیل می‌کند؛ مدیر جلسه باید از تحقیر و تلافی جلوگیری کند.","موافقت ظاهری می‌سازد مگر اینکه افراد بتوانند بدون فشار مخالفت کنند.","برای موضوع شخصی مفید است، اما اختلاف مرتبط با تصمیم جمعی باید در مسیر تصمیم شنیده شود."],
 insight:"فرهنگ گفت‌وگو با دعوت واقعی به مخالفت و روشن‌کردن نتیجه اختلاف ساخته می‌شود، نه فقط درخواست تأیید."},
 {id:"c2",group:"culture",tag:6,title:"دانشی که فقط یک نفر دارد",
 scene:{managers:"برای تصمیم‌های تکراری، همه منتظر حضور یک مدیر باتجربه می‌مانند.",hq:"کار وقتی درست پیش می‌رود که یک همکار خاص حضور داشته باشد؛ دیگران روش پیگیری را نمی‌دانند.",operations:"در تحویل شیفت، نکته مهم فقط شفاهی منتقل می‌شود و با نبودن یک نفر کار گره می‌خورد."},
 ask:"اولین تغییر عملی چیست؟",
 options:["چند نکته ضروریِ تصمیم و تحویل را ثبت و با فرد بعدی آزمایش کنیم.","یک دستورالعمل طولانی برای تمام موقعیت‌ها تدوین کنیم.","همه موارد خاص را همچنان به فرد باتجربه بسپاریم."],
 feedback:["یادگیری را بدون بوروکراسی اضافه قابل انتقال می‌کند؛ باید ببینیم فرد دیگر واقعاً قادر به اجرا هست یا نه.","اگر از نیاز واقعی شروع نکنیم، مستندات حجیم استفاده نمی‌شوند.","در کوتاه‌مدت سریع است، اما وابستگی فردی و آسیب‌پذیری را ادامه می‌دهد."],
 insight:"فرهنگ یادگیری زمانی شکل می‌گیرد که تجربه به یک روال کم‌هزینه و قابل استفاده تبدیل شود."},
 {id:"c3",group:"culture",tag:4,title:"گفتن نگرانی بدون ترس",
 scene:{managers:"یکی از مدیران از پیامد اعلام یک ریسک ناراحت است؛ نگران است که بیان مسئله به‌عنوان مخالفت تلقی شود.",hq:"یک همکار از اعلام خطا خودداری می‌کند چون تجربه قبلی او با سرزنش همراه بوده است.",operations:"یکی از کارکنان متوجه نگرانی ایمنی شده اما مطمئن نیست حرفش با احترام شنیده شود."},
 ask:"چه پاسخی فرهنگ گزارش‌دهی مسئولانه را تقویت می‌کند؟",
 options:["نگرانی را بدون سرزنش بشنویم، مسیر بررسی را روشن کنیم و نتیجه را بازگردانیم.","برای جلوگیری از تنش، از فرد بخواهیم موضوع را فعلاً بین خودمان نگه دارد.","فقط اگر نگرانی ثابت شد، درباره آن اقدام کنیم."],
 feedback:["گزارش‌دهی را حمایت می‌کند؛ رعایت محرمانگی مجاز و اقدام فوری در خطر هم ضروری است.","ممکن است گفت‌وگوی خصوصی لازم باشد، اما پنهان‌سازی خطر یا تأخیر ناموجه قابل دفاع نیست.","برای تشخیص باید بررسی کنیم؛ اما شنیدن و ثبت اولیه نباید مشروط به اثبات از سوی گزارش‌دهنده باشد."],
 insight:"واکنش مدیر به اولین خبر نامطلوب، معیار قدرتمندی برای رفتارهای آینده گروه است."}
];
questions.push.apply(questions,[{"id":"v4","group":"values","tag":0,"title":"همکاری حرفه‌ای · وقتی اختلاف شخصی می‌شود","scene":{"managers":"در جلسه، دو مدیر درباره اولویت کار اختلاف دارند. یکی می‌گوید: «شما همیشه کار ما را عقب می‌اندازید».","hq":"دو واحد درباره زمان تحویل اختلاف دارند و بحث به سابقه برخورد همکاران کشیده شده است.","operations":"دو شیفت درباره کار باقی‌مانده اختلاف دارند و طرفین همدیگر را مقصر می‌دانند."},"ask":"کدام پاسخ، اختلاف را به همکاری تبدیل می‌کند؟","options":["موضوع، اثر هر تصمیم و مسئول اقدام بعدی را روشن کنیم.","برای جلوگیری از تنش، اختلاف را به جلسه دیگری موکول کنیم.","از مدیر بالاتر بخواهیم بین دو نفر داوری کند."],"feedback":["بحث از شخص به مسئله برمی‌گردد؛ اگر اختیار حل اختلاف کافی نباشد، ارجاع هم با صورت‌مسئله روشن انجام شود.","فرصت آرام‌شدن می‌دهد، اما اگر موعد و مسئول نداشته باشد مسئله باقی می‌ماند.","برای اختلاف خارج از اختیار مفید است، ولی جای گفت‌وگوی تخصصی اولیه را نمی‌گیرد."],"insight":"همکاری حرفه‌ای به معنای موافقت همیشگی نیست؛ اختلاف درباره مسئله، با احترام و مسئولیت پیگیری می‌شود."},{"id":"v5","group":"values","tag":1,"title":"قانون‌مداری و انصاف · استثنا برای فرد باتجربه","scene":{"managers":"همکاری باسابقه برای یک امتیاز یا استثنا درخواست داده؛ سایر افراد درباره معیار تصمیم سؤال دارند.","hq":"درخواست یک همکار آشنا زودتر از بقیه بررسی شده و دیگران علت را نمی‌دانند.","operations":"در برنامه شیفت برای یک نفر استثنایی در نظر گرفته‌اند و همکاران درباره انصاف آن می‌پرسند."},"ask":"کدام روش هم انسانی است و هم منصفانه؟","options":["شرایط استثنا را با معیار قابل توضیح و یکسان بررسی کنیم.","به خاطر سابقه فرد، بدون اعلام معیار استثنا بدهیم.","برای جلوگیری از اعتراض، هیچ استثنایی را نپذیریم."],"feedback":["منعطف و منصفانه است، به شرط رعایت ضوابط مصوب و حریم افراد.","رابطه را حفظ می‌کند اما اعتماد به معیارهای مشترک را تضعیف می‌کند.","ظاهراً برابر است، اما تفاوت شرایط واقعی را نادیده می‌گیرد."],"insight":"رابطه خوب و انصاف با معیار شفاف قابل جمع‌اند؛ استثنا نباید بی‌قاعده باشد."},{"id":"v6","group":"values","tag":1,"title":"قانون‌مداری و انصاف · تصمیم در شرایط مشابه","scene":{"managers":"برای دو واحد با نیاز مشابه، تصمیم‌های متفاوتی گرفته شده و هر دو مدیر درباره علت سؤال دارند.","hq":"دو درخواست با شرایط نزدیک، جواب‌های متفاوت گرفته‌اند.","operations":"برای دو موقعیت کاری مشابه، یک نفر مجاز است و دیگری نه؛ معیار روشن نیست."},"ask":"اولین قدم برای تصمیم قابل دفاع چیست؟","options":["معیار مشترک و تفاوت واقعی شرایط را بررسی و توضیح دهیم.","همان تصمیم قبلی را برای همه تکرار کنیم، حتی اگر شرایط متفاوت باشد.","هر مدیر بر اساس شناخت خودش تصمیم بگیرد."],"feedback":["برابری معیار را با توجه به تفاوت‌های واقعی حفظ می‌کند.","ثبات ظاهری می‌آورد اما ممکن است تفاوت مهم را نادیده بگیرد.","تصمیم سریع است ولی پیش‌بینی‌پذیری و عدالت رویه‌ای را کاهش می‌دهد."],"insight":"انصاف یعنی تصمیم‌های مشابه با معیار یکسان؛ نه تصمیم یکسان بدون توجه به شرایط."},{"id":"v7","group":"values","tag":2,"title":"پاسخگویی · دستور مستقیم مدیر بالاتر","scene":{"managers":"مدیر ارشد مستقیماً به یکی از کارکنان واحد شما دستور داده، اما مسئول نتیجه همچنان شما هستید.","hq":"برای یک کار از دو مدیر پیام متفاوت گرفته‌اید و نمی‌دانید مسئول تأیید کدام است.","operations":"از بیرون شیفت دستوری رسیده که با برنامه مسئول شیفت متفاوت است."},"ask":"چه کاری مسیر پاسخگویی را حفظ می‌کند؟","options":["دستور و حدود اختیار را به مسئول مربوط منعکس و تصمیم نهایی را ثبت کنیم.","دستور فرد بالاتر را اجرا کنیم و بعد اگر مسئله‌ای شد توضیح بدهیم.","فعلاً کار را متوقف کنیم تا دو مدیر شخصاً اختلاف را حل کنند."],"feedback":["هم سرعت را در حد مجاز نگه می‌دارد و هم نقش‌ها را روشن می‌کند.","شاید زمان حفظ شود اما مالک تصمیم و پاسخگویی مبهم می‌ماند.","در ریسک یا تعارض جدی ضروری است، ولی برای موارد عادی مسیر سریعِ روشن بهتر است."],"insight":"دسترسی آزاد با دورزدن مسئولیت فرق دارد؛ مرز اختیار و صاحب تصمیم روشن بماند."},{"id":"v8","group":"values","tag":3,"title":"حرفه‌ای‌گری · هر مشکل یک فرم تازه؟","scene":{"managers":"بعد از چند اختلاف کاری پیشنهاد شده برای همه تصمیم‌ها فرم و تأیید تازه بگذارند.","hq":"هر بار اشتباهی رخ می‌دهد، یک مرحله امضا به فرایند اضافه می‌شود.","operations":"برای یک کار تکراری، تأییدهای متعدد گرفته می‌شود اما باز هم خطا رخ می‌دهد."},"ask":"چطور قواعد ضروری را از بوروکراسی جدا کنیم؟","options":["ابتدا خطای تکراری را مشخص و کم‌هزینه‌ترین قاعده مؤثر را امتحان کنیم.","برای جلوگیری از هر خطا، تأیید مدیر را برای همه مراحل الزامی کنیم.","چون شرکت قبلاً سریع بوده، از قواعد مکتوب صرف‌نظر کنیم."],"feedback":["قاعده را به مسئله واقعی وصل می‌کند؛ اثر آن باید بعداً بررسی شود.","ممکن است کنترل را زیاد کند اما سرعت و مالکیت افراد را کاهش می‌دهد.","سرعت را حفظ می‌کند، ولی بدون حداقل قواعد، وابستگی به افراد و خطا ادامه می‌یابد."],"insight":"رسمی‌ترشدن نباید معادل پیچیده‌ترشدن باشد؛ قاعده به اندازه مسئله."},{"id":"v9","group":"values","tag":3,"title":"حرفه‌ای‌گری · همه کارها فوری‌اند","scene":{"managers":"سه مدیر هم‌زمان می‌گویند کارشان فوری است؛ منابع برای انجام هر سه کافی نیست.","hq":"چند واحد روی همه درخواست‌ها برچسب فوری می‌زنند.","operations":"در شیفت دو کار فوری مطرح شده، اما هم‌زمان فقط یکی قابل انجام است."},"ask":"با فوریت‌های هم‌زمان چه کنیم؟","options":["اثر تأخیر، تعهدهای قبلی و صاحب تصمیم اولویت را روشن کنیم.","کاری را که مدیر پیگیرتر دارد اول انجام دهیم.","همه کارها را فوری اعلام کنیم و از تیم تلاش بیشتر بخواهیم."],"feedback":["معیار تصمیم و هزینه جابه‌جایی اولویت را روشن می‌کند.","احتمالاً صدای بلندتر جای اولویت واقعی را می‌گیرد.","ممکن است فشار را افزایش دهد، بدون آنکه محدودیت منابع حل شود."],"insight":"چابکی یعنی اولویت روشن و انعطاف مسئولانه، نه فوریت دائمی."},{"id":"v10","group":"values","tag":4,"title":"قابلیت اتکا · قول داده‌ایم؛ کار هنوز باز است","scene":{"managers":"مدیری تعهد داده اما پیش از موعد متوجه می‌شود شرط اجرای آن تأمین نشده است.","hq":"درخواست واحد دیگر هنوز پاسخ نهایی ندارد، ولی برای موعد قبلی برنامه‌ریزی کرده‌اند.","operations":"شیفت بعد روی وعده تحویل حساب کرده، اما بخشی از کار باقی مانده است."},"ask":"در این وضعیت چه رفتاری قابلیت اتکا را حفظ می‌کند؟","options":["وضعیت واقعی، مسئول پیگیری و موعد تازه را به‌موقع اعلام کنیم.","تا پایان موعد تلاش کنیم و فقط در صورت تأخیر اطلاع دهیم.","کار را به واحد دیگر ارجاع دهیم و مسئولیت اعلام نتیجه را به او بسپاریم."],"feedback":["شفافیت و پیش‌بینی‌پذیری را حفظ می‌کند و امکان هماهنگی می‌دهد.","ممکن است زمان برای جبران ایجاد کند، اما طرف مقابل فرصت برنامه‌ریزی را از دست می‌دهد.","ارجاع لازم است اما مالکیت نتیجه تا بسته‌شدن تعهد باید روشن بماند."],"insight":"قابل اتکابودن یعنی قول واقع‌بینانه، پیگیری تا نتیجه و اعلام به‌موقع تغییر."}]);
var state={group:"ethics",q:"e1",session:"1",editId:null,scope:"role"},lastLocation="",memory=[],reviewMemory={},persistent=true;
function esc(v){return String(v==null?"":v).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function fa(v){return String(v).replace(/\d/g,function(d){return "۰۱۲۳۴۵۶۷۸۹"[+d]})}
function read(key,fallback){try{var v=JSON.parse(localStorage.getItem(key));return v===null?fallback:v}catch(e){return fallback}}
function write(key,v){try{localStorage.setItem(key,JSON.stringify(v));return true}catch(e){persistent=false;return false}}
function records(){var v=read(KEY,memory);return Array.isArray(v)?v:[]}
function reviews(){var v=read(REVIEW,reviewMemory);return v&&typeof v==="object"&&!Array.isArray(v)?v:{}}
function option(label,value,chosen){return '<option value="'+esc(value)+'"'+(String(value)===String(chosen)?' selected':'')+'>'+esc(label)+'</option>'}
function listOptions(arr,chosen){return arr.map(function(x,i){return option(x,i,chosen)}).join("")}
function groupQuestions(group){return questions.filter(function(q){return q.group===group})}

var pillarsIndex={v1:0,v4:0,v5:1,v6:1,v2:2,v7:2,v8:3,v9:3,v3:4,v10:4};
function pillarOf(q){return q&&Object.prototype.hasOwnProperty.call(pillarsIndex,q.id)?pillarsIndex[q.id]:-1}
function uniqueValueRecords(list){
 var seen={};list.filter(function(x){return x.group==="values"}).forEach(function(x){
   var key=[x.role,x.q,x.session||"1"].join("|");
   if(!seen[key]||String(x.id)>String(seen[key].id))seen[key]=x;
 });
 return Object.keys(seen).map(function(k){return seen[k]});
}

function activeQuestion(){return questions.find(function(x){return x.id===state.q})||questions[0]}
function roleRecords(role){return records().filter(function(x){return x.role===role})}
function visibleRecords(role){return state.scope==="all"?records():roleRecords(role)}
function summary(role){
 var list=visibleRecords(role),agree=list.filter(function(x){return x.consensus==="agreed"}).length,open=list.filter(function(x){return x.consensus==="open"||x.consensus==="review"}).length;
 return '<section class="cl-summary" aria-label="وضعیت گفت‌وگوهای ثبت‌شده">'+
 '<div><span>گفت‌وگوهای ثبت‌شده</span><strong>'+fa(list.length)+'</strong></div>'+
 '<div><span>توافق‌های گروه</span><strong>'+fa(agree)+'</strong></div>'+
 '<div><span>موضوعات باز</span><strong>'+fa(open)+'</strong></div></section>';
}
function topicTabs(){
 return '<nav class="cl-topics" aria-label="انتخاب محور گفت‌وگو">'+groups.map(function(g){return '<button type="button" class="cl-topic '+(g.id===state.group?"active":"")+'" data-cl-group="'+g.id+'" aria-pressed="'+(g.id===state.group)+'"><span class="cl-topic-icon" aria-hidden="true">'+g.icon+'</span><strong>'+g.name+'</strong><small>'+g.sub+'</small></button>'}).join("")+'</nav>';
}
function dialogue(role){
 var g=groups.find(function(x){return x.id===state.group}),q=activeQuestion(),isValues=state.group==="values";
 var editing=state.editId?records().find(function(x){return x.id===state.editId}):null,answer=editing?editing.option:"",cons=editing?editing.consensus:"";
 var pillar=window.NAAV_VALUES_SOURCE&&isValues?window.NAAV_VALUES_SOURCE.pillars[pillarOf(q)]:null;
 return '<section class="cl-stage" aria-labelledby="cl-title">'+
 '<div class="cl-stage-head"><span class="cl-eyebrow">گفت‌وگوی کلاسی · '+esc(g.name)+'</span><span class="cl-index">'+fa(groupQuestions(state.group).findIndex(function(x){return x.id===q.id})+1)+' / '+fa(groupQuestions(state.group).length)+'</span></div>'+
 (isValues?'<p class="cl-value-guide">در هر ارزش دو موقعیت داریم. سؤال را انتخاب کنید، نظر گروه را بپرسید و فقط گزینه منتخب و وضعیت توافق را ثبت کنید.</p>':'')+
 '<label class="cl-field-label" for="cl-question">'+(isValues?'کدام سؤال ارزش‌ها را بررسی کنیم؟':'موضوع امروز را انتخاب کنیم')+'</label><select id="cl-question" data-cl-question>'+groupQuestions(state.group).map(function(item){return option(item.title,item.id,q.id)}).join("")+'</select>'+
 (pillar?'<p class="cl-value-link">ارزش مرتبط: <strong>'+esc(pillar.title)+'</strong></p>':'')+
 '<div class="cl-story"><div class="cl-story-eyebrow"><span class="cl-story-mark">؟</span>موقعیت برای گفت‌وگو</div><p>'+esc(q.scene[role])+'</p><h2 id="cl-title">'+esc(q.ask)+'</h2><small>موقعیت آموزشی برگرفته از دغدغه‌های سازمان؛ نه نقل یک رویداد قطعی</small></div>'+
 '<div class="cl-form-grid"><div class="cl-field"><label for="cl-choice">گروه کدام گزینه را انتخاب کرد؟</label><select id="cl-choice"><option value="">انتخاب کنید...</option>'+q.options.map(function(v,i){return option(["الف","ب","ج"][i]+" ـ "+v,i,answer)}).join("")+'</select></div>'+
 '<div class="cl-field"><label for="cl-consensus">نتیجه گفت‌وگو</label><select id="cl-consensus"><option value="">انتخاب کنید...</option>'+option("به توافق رسیدیم","agreed",cons)+option("توافق مشروط","conditional",cons)+option("اختلاف‌نظر باقی ماند","open",cons)+option("نیازمند بررسی بیشتر","review",cons)+'</select></div></div>'+
 '<details class="cl-insight"><summary>پاسخ و نکته · تحلیل گزینه‌ها</summary><div class="cl-insight-inner">'+q.options.map(function(v,i){return '<div><strong>'+fa(i+1)+' · '+esc(v)+'</strong><p>'+esc(q.feedback[i])+'</p></div>'}).join("")+'<p class="cl-core"><strong>جمع‌بندی:</strong> '+esc(q.insight)+'</p></div></details>'+
 (isValues?'':'<div class="cl-form-grid cl-notes"><div class="cl-field"><label for="cl-note">جمع‌بندی مدرس <small>اختیاری</small></label><textarea id="cl-note" rows="2" maxlength="900" placeholder="دلیل توافق یا اختلاف را در چند جمله بنویسید...">'+esc(editing?editing.note:"")+'</textarea></div>'+
 '<div class="cl-field"><label for="cl-action">قاعده یا اقدام مورد توافق</label><textarea id="cl-action" rows="2" maxlength="500" placeholder="از فردا چه رفتار مشخصی را تغییر می‌دهیم؟">'+esc(editing?editing.action:"")+'</textarea></div></div>')+
 '<div class="cl-stage-actions"><label for="cl-session">جلسه <select id="cl-session">'+[1,2,3,4,5,6].map(function(i){return option("جلسه "+fa(i),i,state.session)}).join("")+'</select></label>'+
 '<div class="cl-save-wrap"><button class="cl-save" type="button" data-cl-save>'+(editing?"ذخیره اصلاح ←":"ثبت انتخاب گروه ←")+'</button>'+
 (isValues?'<button type="button" class="cl-secondary" data-cl-next>سؤال بعدی</button>':'')+'</div></div>'+
 '<p class="cl-feedback" id="cl-feedback" role="status" aria-live="polite"></p></section>';
}
function valueInsights(role){
 var source=window.NAAV_VALUES_SOURCE,pillars=source?source.pillars:[],history=uniqueValueRecords(visibleRecords(role));
 var rows=pillars.map(function(p,i){
  var recordsForPillar=history.filter(function(x){return pillarOf(questions.find(function(q){return q.id===x.q}))===i});
  var covered={};recordsForPillar.forEach(function(x){covered[x.q]=true});
  var done=Object.keys(covered).length;
  var agree=recordsForPillar.filter(function(x){return x.consensus==="agreed"||x.consensus==="conditional"}).length;
  var open=recordsForPillar.filter(function(x){return x.consensus==="open"||x.consensus==="review"}).length;
  var status=!done?"هنوز بررسی نشده":open?"نیازمند گفت‌وگوی بیشتر":done>=2&&agree>=2?"دو موضوع با توافق آموزشی بررسی شد":"در حال شکل‌گیری";
  return {pillar:p,index:i,done:done,agree:agree,open:open,status:status,answers:recordsForPillar};
 });
 return '<section class="cl-outcomes" aria-labelledby="cl-results-title">'+
 '<div class="cl-outcomes-head"><div><span class="cl-eyebrow">نتیجه سؤال‌های انتخابی</span><h2 id="cl-results-title">چارچوب پیشنهادی ارزش‌های کسب‌وکار ناوصنعت</h2></div><div class="cl-export-actions">'+
 '<button type="button" data-cl-export-values class="cl-secondary" '+(!history.length?'disabled':'')+'>خروجی ارزش‌ها CSV</button>'+
 '<button type="button" data-cl-export class="cl-secondary" '+(!history.length?'disabled':'')+'>خروجی پاسخ‌ها CSV</button></div></div>'+
 '<p class="cl-value-framework-note">این پنج ارزش در کتابچه حاصل مصاحبه‌ها و گفت‌وگوهای سازمان معرفی شده‌اند. پاسخ‌های کلاس برای بررسی و تکمیل چارچوب جمع می‌شوند؛ توافق آموزشی به معنی تصویب رسمی شرکت نیست.</p>'+
 '<div class="cl-value-framework">'+rows.map(function(r){
  var p=r.pillar;
  return '<details class="cl-candidate cl-framework-row"><summary><span class="cl-candidate-mark">'+fa(r.index+1)+'</span><span class="cl-framework-desc"><strong>'+esc(p.title)+'</strong><small>'+esc(r.status)+' · '+fa(r.done)+' از ۲ موضوع بررسی شده</small><span class="cl-mini-meter" aria-hidden="true"><i style="width:'+(r.done*50)+'%"></i></span></span></summary>'+
  '<p>'+esc(p.definition)+'</p><p><strong>رفتارهای قابل مشاهده:</strong> '+p.behaviors.map(esc).join(" | ")+'</p>'+
 (r.answers.length?'<div class="cl-pillar-evidence"><strong>گزینه‌های منتخب در کلاس:</strong>'+r.answers.map(function(ans){var q=questions.find(function(x){return x.id===ans.q});var selection=q&&q.options[Number(ans.option)]||"نامشخص";return '<p>'+esc(selection)+' <small>('+esc({"agreed":"توافق","conditional":"توافق مشروط","open":"اختلاف‌نظر","review":"نیازمند بررسی"}[ans.consensus]||"نامشخص")+')</small></p>'}).join("")+'</div>':'<p>هنوز انتخابی برای این ارزش ثبت نشده است.</p>')+'</details>';
 }).join("")+'</div>'+
 '<details class="cl-history"><summary>پاسخ‌های ثبت‌شده ('+fa(history.length)+')</summary><div class="cl-history-items">'+history.slice().reverse().slice(0,30).map(function(x){
  var q=questions.find(function(q){return q.id===x.q}),v=q&&q.options[+x.option];
  return '<article><div><strong>'+esc(q?q.title:"گفت‌وگو")+'</strong><small>'+esc(roles[x.role]||x.role)+' · جلسه '+fa(x.session||1)+'</small></div>'+
  '<p><b>انتخاب:</b> '+esc(v||"ثبت نشده")+'</p><p><b>نتیجه:</b> '+esc({"agreed":"توافق","conditional":"توافق مشروط","open":"اختلاف‌نظر","review":"نیازمند بررسی"}[x.consensus]||"نامشخص")+'</p>'+
  (x.role===role?'<button type="button" class="cl-secondary" data-cl-edit="'+esc(x.id)+'">اصلاح انتخاب</button>':'')+
  ' <button type="button" class="cl-delete" data-cl-delete="'+esc(x.id)+'">حذف</button></article>';
 }).join("")+'</div></details>'+
 '<p class="cl-storage-notice">نتایج فقط در همین مرورگر ذخیره می‌شوند. برای نگهداری یا استفاده در دستگاه دیگر، فایل CSV را بگیرید.</p></section>';
}
function insights(role,model){
 if(state.group==="values"&&window.NAAV_VALUES_SOURCE)return valueInsights(role);

 var list=visibleRecords(role),counts=groups.map(function(g){return {g:g,count:list.filter(function(x){return x.group===g.id}).length}});
 var max=Math.max(1,counts.reduce(function(a,c){return Math.max(a,c.count)},0));
 var source=window.NAAV_PDF_SOURCE,reference=source?source.pillars.map(function(p){return {value:p.title,culture:p.behavior}}):model.values||[],rank={};
 list.forEach(function(x){if(x.consensus==="agreed"||x.consensus==="conditional"){var q=questions.find(function(q){return q.id===x.q});if(q){var tag=source&&source.questionPillars[x.q]!==undefined?source.questionPillars[x.q]:q.tag;if(!rank[tag])rank[tag]={count:0,ids:[]};rank[tag].count++;rank[tag].ids.push(x.id)}}});
 var rows=Object.keys(rank).sort(function(a,b){return rank[b].count-rank[a].count}).slice(0,7),rev=reviews();
 return '<section class="cl-outcomes" aria-labelledby="cl-results-title"><div class="cl-outcomes-head"><div><span class="cl-eyebrow">از گفت‌وگو تا ارزش مشترک</span><h2 id="cl-results-title">آنچه از کلاس بیرون آمده</h2></div><div class="cl-export-actions"><button type="button" data-cl-export class="cl-secondary" '+(!list.length?'disabled':'')+'>صورت‌جلسه‌ها CSV</button><button type="button" data-cl-export-values class="cl-secondary" '+(!rows.length?'disabled':'')+'>ارزش‌های پیشنهادی CSV</button></div></div>'+
 (!list.length?'<div class="cl-empty"><span aria-hidden="true">✧</span><strong>هنوز نتیجه‌ای ثبت نشده است</strong><p>پس از اولین گفت‌وگو، شواهد و ارزش‌های پیشنهادی اینجا ظاهر می‌شوند؛ بدون عدد یا نمودار فرضی.</p></div>':
 '<div class="cl-outcome-layout"><div class="cl-chart"><h3>تعداد گفت‌وگوها در هر محور</h3>'+counts.map(function(o){return '<div class="cl-bar-row"><span>'+o.g.name+'</span><div class="cl-bar-track"><i style="width:'+(100*o.count/max)+'%"></i></div><b>'+fa(o.count)+'</b></div>'}).join("")+'<p>این نمودار فقط تعداد ثبت‌ها را نشان می‌دهد، نه میزان موافقت افراد.</p></div>'+
 '<div class="cl-candidates"><h3>۵ ستون فرهنگ پیشنهادی · شواهد گفت‌وگوها</h3>'+
 (!rows.length?'<p>هنوز توافق قطعی یا مشروط ثبت نشده؛ جمع‌بندی زودهنگام نکنیم.</p>':
 rows.map(function(k){var v=reference[+k]||{},status=rev[k]&&rev[k].status||"draft",name=rev[k]&&rev[k].name||v.value||"ارزش پیشنهادی",definition=rev[k]&&rev[k].definition||v.culture||"";
 return '<details class="cl-candidate"><summary><span class="cl-candidate-mark">◆</span><span><strong>'+esc(name)+'</strong><small>'+fa(rank[k].count)+' گفت‌وگوی دارای توافق · پیش‌نویس آموزشی</small></span></summary>'+
 '<p>'+esc(definition)+'</p><div class="cl-edit"><label>نام پیشنهادی<input data-cl-name="'+k+'" maxlength="120" value="'+esc(name)+'"></label><label>رفتار قابل مشاهده<textarea data-cl-definition="'+k+'" maxlength="600" rows="2">'+esc(definition)+'</textarea></label><label>وضعیت بررسی<select data-cl-status="'+k+'">'+option("پیشنهادی","draft",status)+option("تأیید برای بررسی مدیریتی","reviewed",status)+option("نیازمند گفت‌وگوی بیشتر","needs",status)+option("رد پیشنهاد","rejected",status)+'</select></label><button type="button" data-cl-review="'+k+'" class="cl-secondary">ذخیره بازبینی</button></div></details>'}).join(""))+
 '<p class="cl-small">این پنج ستون از کتابچه ناوصنعت (اسلاید ۴۰) گرفته شده‌اند. شمارش صرفاً نشان‌دهنده تعداد گفت‌وگوهای دارای توافق در هر موضوع است، نه رأی افراد یا تصویب رسمی ارزش‌ها. دسته‌بندی با قواعد مشخص انجام شده است.</p></div></div>')+
 '<details class="cl-history"><summary>صورت‌جلسه‌های ثبت‌شده ('+fa(list.length)+')</summary><div class="cl-history-items">'+list.slice().reverse().slice(0,12).map(function(x){var q=questions.find(function(q){return q.id===x.q}),v=q&&q.options[+x.option];return '<article><div><strong>'+esc(q?q.title:"گفت‌وگو")+'</strong><small>'+esc(roles[x.role]||x.role)+' · '+esc(x.date||"")+' · جلسه '+fa(x.session||1)+'</small></div><p><b>گزینه منتخب:</b> '+esc(v||"ثبت نشده")+'</p><p><b>جمع‌بندی:</b> '+esc(x.note||"بدون توضیح تکمیلی")+'</p><p><b>اقدام:</b> '+esc(x.action||"ثبت نشده")+'</p>'+(x.role===role?'<button type="button" class="cl-secondary" data-cl-edit="'+esc(x.id)+'">ویرایش</button>':'<a class="cl-secondary" href="#/culture/'+esc(x.role)+'">ویرایش در مسیر همان گروه</a>')+' <button type="button" class="cl-delete" data-cl-delete="'+esc(x.id)+'">حذف این ثبت</button></article>'}).join("")+'</div></details>'+
 '<div class="cl-storage-notice">🔒 نتایج فقط در همین مرورگر ذخیره می‌شوند و بین دستگاه‌ها همگام نیستند. برای نگهداری سازمانی، خروجی CSV را ذخیره کنید؛ پاک‌کردن داده مرورگر ممکن است ثبت‌ها را از بین ببرد.</div></section>';
}
function references(role,model){
 return '<details class="cl-references"><summary>آرشیو آموزشی · ۷ گزاره پیشنهادی قبلی (غیررسمی)</summary><p>این هفت گزاره، نقطه شروع گفت‌وگو هستند؛ نه ارزش‌های مصوب شرکت یا یافته‌های حاصل از داده کلاسی.</p>'+model.values.map(function(v,i){return '<details><summary>'+fa(i+1)+' · '+esc(v.value)+'</summary><p>'+esc(v.culture)+'</p><p><b>رفتار ناسازگار:</b> '+esc(v.redline)+'</p><p><b>نشانه اجرای واقعی:</b> '+esc(v.evidence)+'</p><p><b>روال پیشنهادی:</b> '+esc(v.ritual)+'</p></details>'}).join("")+'</details>';
}
function render(role,model){
 if(location.hash!==lastLocation&&location.hash.indexOf("/culture/managers/1")>=0){state.group="values";state.q="v1"}lastLocation=location.hash;
 role=roles[role]?role:"managers";model=model||window.NAAV_STRATEGIC.evc;
 return '<div id="naav-culture-lab" class="cl-root" data-cl-role="'+role+'" dir="rtl">'+
 '<div class="cl-hero"><span class="cl-kicker">NAAVSANAT · CULTURE DIALOGUE LAB</span><h1>ارزش‌ها را با گفت‌وگو بسازیم.</h1><p>یک موقعیت آشنا، چند انتخاب قابل دفاع، یک جمع‌بندی روشن؛ آنچه توافق می‌کنیم به رفتار روزمره تبدیل شود.</p><div class="cl-hero-orbit" aria-hidden="true"><span>گفت‌وگو</span><span>توافق</span><span>اقدام</span></div></div>'+
 '<div class="cl-back">'+(location.hash.indexOf("/culture/managers/1")>=0?'<a href="#/session/managers/0">← بازگشت به جلسه اول مدیران</a>':'<a href="#/track/'+role+'">← بازگشت به جلسات '+roles[role]+'</a>')+'</div>'+
 '<div class="cl-scope"><strong>مرور نتایج گفت‌وگو</strong><label for="cl-scope">نمایش نتایج <select id="cl-scope">'+option("همین گروه: "+roles[role],"role",state.scope)+option("هر سه گروه با هم","all",state.scope)+'</select></label></div>'+summary(role)+topicTabs()+dialogue(role)+insights(role,model)+(state.group==="values"?"":references(role,model))+'</div>';
}
function redraw(){var node=document.getElementById("naav-culture-lab");if(node){node.outerHTML=render(node.dataset.clRole,window.NAAV_STRATEGIC.evc)}}
function say(s){var e=document.getElementById("cl-feedback");if(e)e.textContent=s}
function csvValue(v){var s=String(v==null?"":v);if(/^[\s]*[=+\-@]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"'}
function download(){
 var a=records(),head=["تاریخ","گروه","جلسه","محور","موضوع","گزینه منتخب","وضعیت توافق","جمع‌بندی مدرس","اقدام"];
 var lines=[head].concat(a.map(function(x){var q=questions.find(function(q){return q.id===x.q});return [x.date,roles[x.role]||x.role,x.session,groups.find(function(g){return g.id===x.group}).name,q?q.title:"",q&&q.options[+x.option]||"",{"agreed":"توافق","conditional":"توافق مشروط","open":"اختلاف باقی‌مانده","review":"نیازمند بررسی"}[x.consensus]||"",x.note,x.action]}));
 var blob=new Blob(["\uFEFF"+lines.map(function(row){return row.map(csvValue).join(",")}).join("\r\n")],{type:"text/csv;charset=utf-8"}),url=URL.createObjectURL(blob),el=document.createElement("a");el.href=url;el.download="naavsanat-culture-dialogues.csv";document.body.appendChild(el);el.click();el.remove();setTimeout(function(){URL.revokeObjectURL(url)},1000);
}

function exportValues(role){
 var source=window.NAAV_VALUES_SOURCE;if(!source)return;
 var list=uniqueValueRecords(visibleRecords(role));
 var header=["ارزش پیشنهادی","تعریف","رفتارهای قابل مشاهده","موضوعات بررسی‌شده","توافق‌های ثبت‌شده","موضوعات باز","وضعیت","منبع"];
 var rows=source.pillars.map(function(p,i){
  var valueRecords=list.filter(function(x){return pillarOf(questions.find(function(q){return q.id===x.q}))===i});
  var unique={};valueRecords.forEach(function(x){unique[x.q]=true});
  var done=Object.keys(unique).length,agree=valueRecords.filter(function(x){return x.consensus==="agreed"||x.consensus==="conditional"}).length,open=valueRecords.filter(function(x){return x.consensus==="open"||x.consensus==="review"}).length;
  var status=!done?"بررسی‌نشده":open?"نیازمند گفت‌وگوی بیشتر":done===2&&agree>=2?"بررسی آموزشی با توافق":"در حال بررسی";
  return [p.title,p.definition,p.behaviors.join(" / "),done,agree,open,status,"کتابچه ناوصنعت، اسلاید ۴۰؛ پیشنهادی و غیرمصوب"];
 });
 var lines=[header].concat(rows).map(function(r){return r.map(csvValue).join(",")}).join("\r\n");
 var blob=new Blob(["\uFEFF"+lines],{type:"text/csv;charset=utf-8"}),u=URL.createObjectURL(blob),a=document.createElement("a");
 a.href=u;a.download="naavsanat-business-values-framework.csv";document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u)},1000);
}
document.addEventListener("click",function(e){
 var b=e.target.closest("[data-cl-next]");if(b){var ql=groupQuestions(state.group),at=ql.findIndex(function(q){return q.id===state.q});state.q=ql[(at+1)%ql.length].id;state.editId=null;redraw();document.getElementById("cl-question").focus();return}
 b=e.target.closest("[data-cl-group]");if(b){state.group=b.dataset.clGroup;state.q=groupQuestions(state.group)[0].id;state.editId=null;redraw();return}
 b=e.target.closest("[data-cl-save]");if(b){
 var root=b.closest("#naav-culture-lab"),c=root.querySelector("#cl-choice"),n=root.querySelector("#cl-note"),a=root.querySelector("#cl-action"),co=root.querySelector("#cl-consensus"),se=root.querySelector("#cl-session"),oldRecord=state.editId?records().find(function(x){return x.id===state.editId}):null;
 if(c.value===""){say("ابتدا گزینه منتخب گروه را مشخص کنید.");c.focus();return}if(co.value===""){say("وضعیت توافق را بعد از گفت‌وگو انتخاب کنید.");co.focus();return}
 var list=records();var record={id:state.editId||String(Date.now())+"-"+String(Math.random()).slice(2,7),role:root.dataset.clRole,q:state.q,group:state.group,option:+c.value,consensus:co.value,note:n?n.value.trim():oldRecord&&oldRecord.note||"",action:a?a.value.trim():oldRecord&&oldRecord.action||"",session:se.value,date:new Date().toLocaleString("fa-IR")};memory=state.editId?list.map(function(x){return x.id===record.id?record:x}):list.concat([record]);var ok=write(KEY,memory);state.session=se.value;state.editId=null;redraw();var q=document.getElementById("cl-results-title");if(q)q.scrollIntoView({block:"nearest",behavior:"smooth"});say(ok?"نتیجه ثبت شد و در همین مرورگر باقی می‌ماند.":"نتیجه موقت ثبت شد؛ ذخیره مرورگر در دسترس نیست.");return
 }
 b=e.target.closest("[data-cl-edit]");if(b){var rec=records().find(function(x){return x.id===b.dataset.clEdit});if(rec){state.editId=rec.id;state.group=rec.group;state.q=rec.q;state.session=rec.session;redraw();document.getElementById("cl-title").scrollIntoView({block:"center",behavior:"smooth"})}return}
 b=e.target.closest("[data-cl-export-values]");if(b){exportValues(b.closest("#naav-culture-lab").dataset.clRole);return}
 b=e.target.closest("[data-cl-export]");if(b){download();return}
 b=e.target.closest("[data-cl-delete]");if(b){if(!confirm("این نتیجه گفت‌وگو از همین مرورگر حذف شود؟"))return;memory=records().filter(function(x){return x.id!==b.dataset.clDelete});write(KEY,memory);redraw();return}
 b=e.target.closest("[data-cl-review]");if(b){var k=b.dataset.clReview,r=reviews(),root=b.closest("#naav-culture-lab");r[k]={name:root.querySelector('[data-cl-name="'+k+'"]').value.trim(),definition:root.querySelector('[data-cl-definition="'+k+'"]').value.trim(),status:root.querySelector('[data-cl-status="'+k+'"]').value};reviewMemory=r;write(REVIEW,r);redraw();return}
});
document.addEventListener("change",function(e){if(e.target.matches("#cl-scope")){state.scope=e.target.value;redraw()}else if(e.target.matches("[data-cl-question]")){state.q=e.target.value;state.editId=null;redraw()}else if(e.target.matches("#cl-session"))state.session=e.target.value});
window.NaavCultureLab={render:render,questions:questions};
})();
