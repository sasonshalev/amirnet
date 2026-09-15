/* ============ אמירנט — תוכן בלבד (15.9) ============
   הקובץ הזה הוא דאטה, לא קוד. index.html טוען אותו לפני הסקריפט הראשי; אם הוא חסר,
   הקוד ממשיך עם משפטי ה-ex הישנים (הגנת typeof SENT2 ב-index.html).

   WORD_POS — חלק דיבר לכל מילה ב-WORDS: v / n / adj / adv / conj / prep.
             משמש את מנוע המסיחים כדי לבחור "2 פסולים בבירור" (חלק דיבר אחר).
   SENT_HE  — תרגום עברי ל-50 המשפטים הישנים ב-SENT (index.html).
   SCP_HE   — תרגום ל-11 שאלות האמת של השלמת משפטים (SCP), לפי הסדר.
   SENT2    — משפטים חדשים לכל מילה: {s: משפט עם ___, he: תרגום, near: [מילים מתחרות]}.
             ⚠️ הכלל של ששון (15.9): "שניים פוסלים בטוח, אחת שהיא אולי, והרביעית התשובה".
             near = ה"אולי": מאותה משפחה, נראית מתאימה, **ונפסלת מההקשר**. לא סתם דומה.
   מחזור 1 (15.9): 292 המילים שששון כבר למד. מחזור 2: 93 הנותרות, אחרי אישורו.
   בדיקה: node test-content.js */
'use strict';

const WORD_POS={
 // רמה 2
 answer:'n',avoid:'v',provide:'v',require:'v',encourage:'v',decrease:'v',ability:'n',advantage:'n',advice:'n',
 amount:'n',announce:'v',annual:'adj',appear:'v',apply:'v',approach:'n',argue:'v',arrange:'v',attempt:'n',attend:'v',
 attitude:'n',attract:'v',average:'adj',aware:'adj',behavior:'n',belong:'v',blame:'v',cause:'v',certain:'adj',
 challenge:'n',community:'n',compare:'v',complain:'v',complete:'v',condition:'n',consider:'v',contain:'v',convince:'v',
 create:'v',damage:'n',decision:'n',defend:'v',delay:'v',demand:'v',deny:'v',depend:'v',describe:'v',deserve:'v',
 destroy:'v',develop:'v',doubt:'n',earn:'v',effect:'n',effort:'n',employ:'v',exist:'v',expect:'v',experience:'n',
 explain:'v',familiar:'adj',favor:'v',
 // רמה 3
 essential:'adj',significant:'adj',obtain:'v',maintain:'v',purpose:'n',reduce:'v',accurate:'adj',prohibit:'v',
 abandon:'v',absorb:'v',access:'n',accompany:'v',accomplish:'v',accuse:'v',adapt:'v',adequate:'adj',admit:'v',adopt:'v',
 alter:'v',ambition:'n',analyze:'v',ancient:'adj',anticipate:'v',apparent:'adj',appreciate:'v',approve:'v',assess:'v',
 assign:'v',assist:'v',assume:'v',assure:'v',attain:'v',available:'adj',barrier:'n',bias:'n',brief:'adj',capable:'adj',
 cautious:'adj',cease:'v',commit:'v',compensate:'v',competent:'adj',comprehend:'v',conclude:'v',conduct:'v',confess:'v',
 confidence:'n',conflict:'n',consequence:'n',considerable:'adj',consist:'v',constant:'adj',consume:'v',contribute:'v',
 convert:'v',cope:'v',crucial:'adj',decline:'v',dedicate:'v',demonstrate:'v',dense:'adj',deprive:'v',derive:'v',
 detect:'v',determine:'v',devote:'v',distinct:'adj',distribute:'v',diverse:'adj',dominant:'adj',
 // רמה 4
 acquire:'v',adverse:'adj',advocate:'v',allege:'v',ambiguous:'adj',apprehend:'v',arbitrary:'adj',articulate:'v',
 ascend:'v',assert:'v',attribute:'v',coerce:'v',compel:'v',comprise:'v',conceive:'v',concur:'v',condemn:'v',confine:'v',
 consent:'n',contempt:'n',contend:'v',curb:'v',deceive:'v',deduce:'v',defer:'v',deficient:'adj',degrade:'v',deter:'v',
 detrimental:'adj',devise:'v',dispute:'n',divert:'v',dwell:'v',elicit:'v',endorse:'v',enhance:'v',evoke:'v',exert:'v',
 exploit:'v',facilitate:'v',foster:'v',hinder:'v',impose:'v',incentive:'n',inevitable:'adj',inhibit:'v',notion:'n',
 plausible:'adj',prevail:'v',undermine:'v',
 // רמה 5
 alleviate:'v',clandestine:'adj',cogent:'adj',devoid:'adj',efficacious:'adj',exacerbate:'v',innocuous:'adj',
 meticulous:'adj',obsolete:'adj',pervasive:'adj',replete:'adj',scathing:'adj',scrutinize:'v',tenuous:'adj',
 ubiquitous:'adj',venerate:'v',vindicate:'v',volatile:'adj',wane:'v',zealous:'adj',
 // מילות קישור — conj = מחברות משפטים · prep = לפני שם עצם. הבלבול ביניהן הוא מלכודת אמירנט קלאסית.
 'although':'conj','even though':'conj','though':'conj','despite':'prep','in spite of':'prep','whereas':'conj',
 'while':'conj','yet':'conj','however':'conj','nevertheless':'conj','unless':'conj','provided that':'conj',
 'since':'conj','due to':'prep','owing to':'prep','therefore':'conj','thus':'conj','consequently':'conj',
 'as a result':'conj','moreover':'conj','furthermore':'conj','in addition':'conj','aside from':'prep',
 'irrespective of':'prep','regardless of':'prep','whether... or':'conj','so... that':'conj','both... and':'conj',
 'not only... but also':'conj','only if':'conj','as':'conj',
 // מנה 2 — אוצר מילים מהבחינות
 fortune:'n',characteristic:'n',clarify:'v',prolonged:'adj',unrest:'n',depict:'v',reservation:'n',source:'n',
 beyond:'prep',entirely:'adv',shrink:'v',upbringing:'n',remote:'adj',thorough:'adj',device:'n',phrase:'n',income:'n',
 era:'n',absence:'n',scarce:'adj',voice:'v',relevant:'adj',refuse:'v',amass:'v',wealthy:'adj',exposure:'n',
 harmful:'adj',substance:'n',permanent:'adj',occasionally:'adv',branch:'n',widespread:'adj',launch:'v',
 manufacture:'v',principal:'adj',cognitive:'adj',regime:'n',disapproval:'n',domestic:'adj',policy:'n',reform:'n',
 complex:'adj',technique:'n',sole:'adj',prominent:'adj',persist:'v',superior:'adj',presume:'v',phenomenon:'n',
 coin:'v',pollute:'v',appeal:'v',mainstay:'n',agriculture:'n',vital:'adj',fraction:'n',dwindle:'v',perpetrate:'v',
 constitute:'v',innate:'adj',merely:'adv',eventually:'adv',credit:'v',generate:'v',revenue:'n',affluent:'adj',
 enable:'v',impact:'n',native:'adj',entrepreneur:'n',expense:'n',necessity:'n',preserve:'v',precaution:'n',
 discard:'v',profitable:'adj',glimpse:'n',origin:'n',literal:'adj',supervise:'v',spontaneous:'adj',wander:'v',
 interrupt:'v',involve:'v',embarrass:'v',proportion:'n',remarkable:'adj',explore:'v',restrict:'v',pardon:'v',
 originate:'v',eliminate:'v',resent:'v',restrain:'v',synthetic:'adj',appropriate:'adj',classify:'v',modest:'adj',
 identity:'n',appearance:'n',hazard:'n',outlet:'n',collide:'v',descend:'v',definite:'adj',satisfy:'v',
 exception:'n',release:'v',exchange:'v',property:'n',relative:'adj',frequent:'adj',rapid:'adj',resume:'v',
 coincide:'v',improvise:'v',oversight:'n',trade:'n',secure:'adj',rebellious:'adj',strict:'adj',sincere:'adj',
 overlook:'v',intrusive:'adj',random:'adj',affirm:'v',errand:'n',factor:'n',burden:'n',fund:'n',core:'n',
 broad:'adj',mature:'adj',worship:'v',initiate:'v',contradict:'v',obstruct:'v',recognize:'v',replace:'v',
 excessive:'adj',loan:'n',ban:'n',retreat:'v',dilemma:'n',revise:'v',imply:'v',prescribe:'v',confirm:'v',
 conscious:'adj',irreversible:'adj',intimidate:'v',mutual:'adj',fraud:'n',dormant:'adj'
};

/* תרגום ל-50 המשפטים הישנים (SENT ב-index.html) — המילה במקומה */
const SENT_HE={
 'although':"הצוות מסר את הפרויקט בזמן, אף על פי ששניים מחבריו היו חולים רוב החודש.",
 'even though':"היא התעקשה לנהוג הביתה למרות שהייתה מותשת בבירור.",
 'though':"הסרט היה איטי וארוך מדי; עם זאת, הוא צולם להפליא.",
 'despite':"למרות הגשם הכבד, הטקס התקיים בחוץ בדיוק כמתוכנן.",
 'in spite of':"החברה השאירה את מחיריה ללא שינוי למרות העלייה החדה בעלות חומרי הגלם.",
 'while':"המכירות זינקו בסניפי הצפון, ואילו בדרום הן נשארו ללא שינוי.",
 'yet':"הראיות היו ברורות לכל מי שישב בחדר, ובכל זאת הוועדה סירבה לפעול לפיהן.",
 'however':"התוכנית נראתה מבטיחה על הנייר. בפועל, עם זאת, היא התבררה כיקרה מדי.",
 'unless':"הטיסה תמריא בזמן אלא אם כן מזג האוויר יידרדר במהלך הלילה.",
 'since':"מאז שחוק התנועה החדש נכנס לתוקף, התאונות בצומת ההוא ירדו בחצי.",
 'due to':"העיכוב בפרסום נבע ממחסור בבודקים מוסמכים.",
 'therefore':"התוצאות לא ניתנו לשחזור בשום מעבדה אחרת, ולכן הושמטו מהדוח הסופי.",
 'as a result':"כמות המשקעים ירדה בשליש באותו חורף; כתוצאה מכך, היבול היה הקטן ביותר זה עשור.",
 'in addition':"המכשיר זול לייצור. בנוסף, הוא כמעט לא דורש תחזוקה.",
 'whether... or':"בין אם הפרויקט יצליח ובין אם ייכשל, צוות המחקר הבטיח לפרסם את ממצאיו.",
 'so... that':"הוראות ההרכבה היו כל כך מבלבלות עד שרוב הלקוחות ויתרו באמצע.",
 'both... and':"ההצעה נדחתה גם על ידי ההנהלה וגם על ידי העובדים.",
 'only if':"המענק יחודש רק אם החוקרים יפרסמו את תוצאותיהם לפני סוף השנה.",
 'as':"מכיוון שהכביש הראשי היה סגור לתיקונים, המשלוח הגיע באיחור של יומיים.",
 'whereas':"מינים צפוניים הסתגלו במהירות למים החמים יותר, ואילו הדרומיים דעכו בחדות.",
 'nevertheless':"הטיפול יקר ולא נעים; עם זאת, הוא נשאר האפשרות היחידה הזמינה לחולים האלה.",
 'provided that':"סטודנטים רשאים להיבחן שוב בתנאי שישתתפו בכל מפגשי ההכנה.",
 'owing to':"המוזיאון נסגר שלוש שעות מוקדם בגלל הפסקת חשמל בבניין הראשי.",
 'thus':"הדגימות זוהמו בזמן ההובלה, ולכן לא ניתן היה להשתמש בהן.",
 'consequently':"הביקוש נפל הרבה מתחת לתחזית; כתוצאה מכך, הייצור הופסק לשישה שבועות.",
 'moreover':"השיטה החדשה מהירה פי שניים מהישנה. יתרה מכך, היא זולה בהרבה.",
 'furthermore':"הדוח הוגש באיחור של שלושה שבועות. בנוסף, כמה מהנתונים המרכזיים בו היו שגויים.",
 'aside from':"מלבד קומץ שגיאות כתיב קטנות, התרגום מצוין.",
 'regardless of':"המדיניות החדשה חלה על כל אזרח, ללא קשר להכנסה או למקום המגורים.",
 'not only... but also':"התרופה התבררה לא רק כלא יעילה אלא גם כמסוכנת בפוטנציה.",
 'irrespective of':"החברות פתוחה לכל המועמדים, ללא קשר ללאום או לרקע המקצועי שלהם.",
 'source':"החוקרים טרם זיהו את מקור הזיהום בנהר.",
 'beyond':"הנזק לכתב היד היה מעבר לתיקון, והספרייה נאלצה להשליך אותו.",
 'entirely':"ההסבר שלה לא היה משכנע לחלוטין, אף שהוא כן ענה על חלק משאלותינו.",
 'device':"המהנדסים בנו מכשיר קטן שמודד את איכות האוויר בזמן אמת.",
 'phrase':"הוא חזר על אותו ביטוי עד שכל מי שבחדר הבין למה התכוון.",
 'income':"משפחות בעלות הכנסה נמוכה זכאיות להנחה משמעותית בשכר הלימוד.",
 'fortune':"הוא עשה הון ממכירת תוכנה ופרש לפני שמלאו לו ארבעים.",
 'characteristic':"סבלנות היא התכונה היקרה ביותר שיכולה להיות למשא ומתן.",
 'clarify':"השר התבקש להבהיר את דבריו, שרבים מהמאזינים מצאו מבלבלים.",
 'prolonged':"חשיפה ממושכת לרעש חזק עלולה לגרום לאובדן שמיעה קבוע.",
 'reservation':"היא הסכימה לחתום על החוזה עם הסתייגות אחת: יש להאריך את המועד האחרון.",
 'shrink':"סוודרים מצמר נוטים להתכווץ מאוד אם מכבסים אותם במים חמים.",
 'remote':"אחרי שבועיים בלי קשר, הסיכויים למצוא ניצולים היו קלושים.",
 'thorough':"אחרי התאונה נערכה חקירה יסודית שבדקה כל חלק במטוס.",
 'era':"המצאת הדפוס פתחה עידן חדש בהיסטוריה של אירופה.",
 'absence':"בהיעדר ראיות ממשיות, התיק נגדו נסגר.",
 'scarce':"מים מתוקים נעשו נדירים יותר ויותר כשהבצורת נכנסה לשנתה השלישית.",
 'voice':"העובדים מוזמנים להביע את חששותיהם בישיבת הצוות החודשית.",
 'unrest':"עליית מחירי המזון הובילה לחודשים של תסיסה פוליטית ברחבי האזור."
};

/* תרגום ל-11 שאלות האמת (SCP ב-index.html), לפי הסדר */
const SCP_HE=[
 "כל הרופאים – לא רק רופאי שיניים – צריכים ידע בסיסי על השיניים ועל האופן שבו הן מושפעות ממחלות.",
 "השופט סירב להתיר את הצגת הראיה בבית המשפט, בטענה שאינה רלוונטית לתיק.",
 "ג'יימס יאנג, כימאי סקוטי, מת כאדם עשיר, לאחר שצבר הון גדול משיווק מוצלח של שמן פרפין לתאורה.",
 "חשיפה ממושכת לחומרים מזיקים באוויר עלולה לגרום נזק קבוע לריאות.",
 "בנקים בינלאומיים נאלצים מדי פעם לסגור חלק מסניפיהם בגלל אי-שקט פוליטי במדינות המארחות.",
 "מתן חינוך טוב יותר לאזרחים עשוי להיות המפתח להצלחה כלכלית עבור מדינות רבות במאה הבאה.",
 "רופאים יודעים שאינם יכולים להציל את כל החולים, כי חלקם מעבר לכל עזרה.",
 "אספירין הוא אמצעי יעיל למניעת קרישי דם מסוכנים; יתרה מכך, הוא זול ויש לו מעט תופעות לוואי.",
 "בערים ביפן, שבהן שטח המגורים מצומצם, המשפחה הטיפוסית גרה בדירת שני חדרים.",
 "החשבונייה – מכשיר ספירה שהומצא לפני אלפי שנים – עדיין נמצאת בשימוש נרחב באסיה.",
 "חרקים וזוחלים רבים מסתגלים לסביבה חדשה על ידי שינוי צבעם או מראם."
];

/* ============ SENT2 — משפטים חדשים ============
   מפתח = המילה כפי שהיא ב-WORDS. לכל מילה 2 משפטים (מחזור 1). */
const SENT2={
 // ===== מילות קישור (31) — near = מילת קישור מהקטגוריה ה"מפתה": ניגוד↔סיבה, conj↔prep =====
 'although':[
  {s:"___ the museum had raised its ticket prices twice that year, attendance continued to grow.",he:"אף על פי שהמוזיאון העלה את מחירי הכרטיסים פעמיים באותה שנה, מספר המבקרים המשיך לגדול.",near:['despite','due to']},
  {s:"The bridge remained open to traffic, ___ engineers had warned that it needed urgent repairs.",he:"הגשר נשאר פתוח לתנועה, אף על פי שמהנדסים הזהירו שהוא זקוק לתיקונים דחופים.",near:['therefore','in spite of']}],
 'even though':[
  {s:"He finished the marathon ___ he had injured his knee halfway through the race.",he:"הוא סיים את המרתון למרות שפצע את ברכו באמצע המרוץ.",near:['despite','as a result']},
  {s:"The committee approved the budget ___ several members had serious doubts about it.",he:"הוועדה אישרה את התקציב למרות שלכמה מחבריה היו ספקות רציניים לגביו.",near:['owing to','provided that']}],
 'though':[
  {s:"The apartment is small; it is, ___, within walking distance of the university.",he:"הדירה קטנה; עם זאת, היא במרחק הליכה מהאוניברסיטה.",near:['therefore','moreover']},
  {s:"___ the recipe calls for fresh herbs, dried ones will work almost as well.",he:"אף על פי שהמתכון דורש עשבי תיבול טריים, מיובשים יעבדו כמעט באותה מידה.",near:['since','unless']}],
 'despite':[
  {s:"___ repeated warnings from the coast guard, several boats left the harbor before the storm.",he:"למרות אזהרות חוזרות ממשמר החופים, כמה סירות עזבו את הנמל לפני הסופה.",near:['although','owing to']},
  {s:"The company reported record profits ___ a sharp decline in sales in its European markets.",he:"החברה דיווחה על רווחי שיא למרות ירידה חדה במכירות בשווקיה באירופה.",near:['even though','due to']}],
 'in spite of':[
  {s:"___ its modest budget, the film won three international awards.",he:"למרות התקציב הצנוע שלו, הסרט זכה בשלושה פרסים בינלאומיים.",near:['although','as a result']},
  {s:"The expedition reached the summit ___ temperatures that dropped to forty degrees below zero.",he:"המשלחת הגיעה לפסגה למרות טמפרטורות שצנחו לארבעים מעלות מתחת לאפס.",near:['whereas','since']}],
 'whereas':[
  {s:"The older model runs on gasoline, ___ the new one is powered entirely by electricity.",he:"הדגם הישן פועל על בנזין, ואילו החדש מונע כולו בחשמל.",near:['therefore','despite']},
  {s:"Some historians see the treaty as a triumph of diplomacy, ___ others regard it as a costly mistake.",he:"היסטוריונים אחדים רואים בהסכם ניצחון של הדיפלומטיה, ואילו אחרים רואים בו טעות יקרה.",near:['consequently','unless']}],
 'while':[
  {s:"___ the first half of the book is slow, the second half is almost impossible to put down.",he:"בעוד שהמחצית הראשונה של הספר איטית, את המחצית השנייה כמעט אי אפשר להניח מהיד.",near:['therefore','since']},
  {s:"Coffee consumption rose steadily in Asia, ___ in Europe it hardly changed at all.",he:"צריכת הקפה עלתה בהתמדה באסיה, ואילו באירופה היא כמעט לא השתנתה.",near:['moreover','due to']}],
 'yet':[
  {s:"The warning signs were posted in three languages, ___ visitors kept ignoring them.",he:"שלטי האזהרה נתלו בשלוש שפות, ובכל זאת המבקרים המשיכו להתעלם מהם.",near:['therefore','since']},
  {s:"She had never taken a formal lesson, ___ she played the piano with remarkable skill.",he:"היא מעולם לא לקחה שיעור מסודר, ובכל זאת ניגנה בפסנתר במיומנות יוצאת דופן.",near:['thus','moreover']}],
 'however':[
  {s:"The new medication reduced the patients' pain. It did not, ___, shorten their recovery time.",he:"התרופה החדשה הפחיתה את כאבי המטופלים. עם זאת, היא לא קיצרה את זמן ההחלמה שלהם.",near:['therefore','in addition']},
  {s:"The road to the village is paved. Beyond the village, ___, only a dirt track continues.",he:"הדרך אל הכפר סלולה. מעבר לכפר, עם זאת, ממשיך רק שביל עפר.",near:['consequently','furthermore']}],
 'nevertheless':[
  {s:"The evidence against the defendant was entirely circumstantial; the jury ___ found him guilty.",he:"הראיות נגד הנאשם היו נסיבתיות בלבד; חבר המושבעים בכל זאת מצא אותו אשם.",near:['therefore','consequently']},
  {s:"Most critics dismissed the novel when it first appeared. It has ___ become one of the best-selling books of the century.",he:"רוב המבקרים ביטלו את הרומן כשהופיע לראשונה. עם זאת, הוא הפך לאחד הספרים הנמכרים ביותר של המאה.",near:['thus','as a result']}],
 'unless':[
  {s:"The contract will be renewed automatically ___ one of the parties cancels it in writing.",he:"החוזה יחודש אוטומטית אלא אם כן אחד הצדדים יבטל אותו בכתב.",near:['provided that','although']},
  {s:"Students may not enter the laboratory ___ they are accompanied by a member of staff.",he:"סטודנטים אינם רשאים להיכנס למעבדה אלא אם כן מלווה אותם איש צוות.",near:['only if','whereas']}],
 'provided that':[
  {s:"Visitors may photograph the paintings ___ they do not use a flash.",he:"מבקרים רשאים לצלם את הציורים בתנאי שלא ישתמשו במבזק.",near:['unless','even though']},
  {s:"The bank agreed to extend the loan ___ the company submitted audited accounts every quarter.",he:"הבנק הסכים להאריך את ההלוואה בתנאי שהחברה תגיש דוחות מבוקרים בכל רבעון.",near:['although','whereas']}],
 'since':[
  {s:"___ the factory closed, the town has lost nearly a third of its population.",he:"מאז שהמפעל נסגר, העיירה איבדה כמעט שליש מתושביה.",near:['although','unless']},
  {s:"___ none of the witnesses could identify the driver, the police had to drop the case.",he:"מכיוון שאף אחד מהעדים לא הצליח לזהות את הנהג, המשטרה נאלצה לסגור את התיק.",near:['whereas','despite']}],
 'due to':[
  {s:"Several flights were cancelled ___ a strike by air traffic controllers.",he:"כמה טיסות בוטלו בגלל שביתה של פקחי הטיסה.",near:['although','in spite of']},
  {s:"The bridge was closed for two months ___ cracks discovered in its main supports.",he:"הגשר נסגר לחודשיים עקב סדקים שהתגלו בתמיכות הראשיות שלו.",near:['regardless of','despite']}],
 'owing to':[
  {s:"The concert was moved indoors ___ the forecast of heavy thunderstorms.",he:"הקונצרט הועבר לאולם סגור בגלל תחזית לסופות רעמים כבדות.",near:['despite','aside from']},
  {s:"___ a shortage of teachers, several rural schools have been forced to merge their classes.",he:"עקב מחסור במורים, כמה בתי ספר כפריים נאלצו לאחד את כיתותיהם.",near:['in spite of','irrespective of']}],
 'therefore':[
  {s:"The two samples produced identical results; the researchers ___ concluded that the method was reliable.",he:"שתי הדגימות הניבו תוצאות זהות; החוקרים הסיקו לכן שהשיטה אמינה.",near:['nevertheless','however']},
  {s:"The museum's roof is being repaired, and the upper galleries are ___ closed until March.",he:"גג המוזיאון בתיקון, ולכן הגלריות העליונות סגורות עד מרץ.",near:['whereas','yet']}],
 'thus':[
  {s:"The new dam controls the river's flow and ___ protects the villages downstream from flooding.",he:"הסכר החדש שולט בזרימת הנהר וכך מגן על הכפרים שבמורד מפני הצפות.",near:['nevertheless','although']},
  {s:"Only two of the five candidates met the requirements; the committee ___ had a very short list to consider.",he:"רק שניים מחמשת המועמדים עמדו בדרישות; לוועדה הייתה לכן רשימה קצרה מאוד לשקול.",near:['however','moreover']}],
 'consequently':[
  {s:"The company ignored repeated warnings about the faulty design; ___, it now faces hundreds of lawsuits.",he:"החברה התעלמה מאזהרות חוזרות על התכנון הפגום; כתוצאה מכך, היא ניצבת כעת מול מאות תביעות.",near:['nevertheless','furthermore']},
  {s:"Rainfall was well below average for three years, and the region's harvests ___ shrank by half.",he:"כמות הגשמים הייתה נמוכה בהרבה מהממוצע במשך שלוש שנים, וכתוצאה מכך יבולי האזור הצטמצמו בחצי.",near:['however','in addition']}],
 'as a result':[
  {s:"The main highway was closed for repairs; ___, traffic in the city center doubled.",he:"הכביש המהיר הראשי נסגר לתיקונים; כתוצאה מכך, התנועה במרכז העיר הוכפלה.",near:['nevertheless','in addition']},
  {s:"The new law requires helmets for all cyclists. ___, head injuries have fallen by a third.",he:"החוק החדש מחייב קסדה לכל רוכבי האופניים. כתוצאה מכך, פציעות הראש ירדו בשליש.",near:['however','moreover']}],
 'moreover':[
  {s:"Solar panels have become far cheaper over the past decade. ___, they now last twice as long.",he:"פאנלים סולאריים נעשו זולים בהרבה בעשור האחרון. יתרה מכך, הם מחזיקים כעת פי שניים זמן.",near:['however','therefore']},
  {s:"The witness changed her story twice during the trial; ___, she could not explain where she had been that night.",he:"העדה שינתה את גרסתה פעמיים במהלך המשפט; יתרה מכך, היא לא הצליחה להסביר היכן הייתה באותו לילה.",near:['nevertheless','consequently']}],
 'furthermore':[
  {s:"The apartment is close to the train station. ___, the rent includes heating and water.",he:"הדירה קרובה לתחנת הרכבת. בנוסף, שכר הדירה כולל חימום ומים.",near:['however','therefore']},
  {s:"The study was based on a very small sample. ___, the participants were all from a single city.",he:"המחקר התבסס על מדגם קטן מאוד. בנוסף, כל המשתתפים היו מעיר אחת.",near:['nevertheless','as a result']}],
 'in addition':[
  {s:"Members receive a discount at the museum shop. ___, they may attend lectures free of charge.",he:"חברים מקבלים הנחה בחנות המוזיאון. בנוסף, הם רשאים להשתתף בהרצאות ללא תשלום.",near:['however','therefore']},
  {s:"The drug lowers blood pressure. ___, recent studies suggest it may reduce the risk of stroke.",he:"התרופה מורידה את לחץ הדם. בנוסף, מחקרים אחרונים מציעים שהיא עשויה להפחית את הסיכון לשבץ.",near:['nevertheless','consequently']}],
 'aside from':[
  {s:"___ one broken window, the house survived the storm without damage.",he:"מלבד חלון שבור אחד, הבית שרד את הסופה ללא נזק.",near:['due to','despite']},
  {s:"___ its high price, the only serious drawback of the car is its small trunk.",he:"מלבד מחירו הגבוה, החיסרון הרציני היחיד של המכונית הוא תא המטען הקטן שלה.",near:['owing to','regardless of']}],
 'irrespective of':[
  {s:"All employees receive the same basic training, ___ their previous experience.",he:"כל העובדים מקבלים את אותה הכשרה בסיסית, ללא קשר לניסיונם הקודם.",near:['due to','in spite of']},
  {s:"The scholarship is awarded on academic merit alone, ___ the applicant's financial situation.",he:"המלגה מוענקת על בסיס הישגים אקדמיים בלבד, ללא קשר למצבו הכלכלי של המועמד.",near:['owing to','aside from']}],
 'regardless of':[
  {s:"The race will start at nine o'clock ___ the weather conditions.",he:"המרוץ יתחיל בתשע ללא קשר לתנאי מזג האוויר.",near:['due to','despite']},
  {s:"Emergency treatment is provided to every patient, ___ whether he or she has insurance.",he:"טיפול חירום ניתן לכל מטופל, ללא קשר לשאלה אם יש לו ביטוח.",near:['owing to','aside from']}],
 'whether... or':[
  {s:"The committee has not yet decided ___ to approve the plan ___ to send it back for revision.",he:"הוועדה טרם החליטה אם לאשר את התוכנית או להחזיר אותה לתיקון.",near:['both... and','not only... but also']},
  {s:"___ the government raises taxes ___ cuts spending, the deficit will have to be addressed.",he:"בין אם הממשלה תעלה מסים ובין אם תקצץ בהוצאות, יהיה צורך לטפל בגירעון.",near:['so... that','only if']}],
 'so... that':[
  {s:"The lecture was ___ crowded ___ dozens of students had to stand in the corridor.",he:"ההרצאה הייתה כל כך צפופה עד שעשרות סטודנטים נאלצו לעמוד במסדרון.",near:['both... and','whether... or']},
  {s:"The fog was ___ thick ___ the pilots could not see the runway lights.",he:"הערפל היה כל כך סמיך עד שהטייסים לא ראו את אורות המסלול.",near:['not only... but also','whether... or']}],
 'both... and':[
  {s:"The new policy was criticized ___ by environmental groups ___ by the industry it was meant to regulate.",he:"המדיניות החדשה ספגה ביקורת גם מארגוני סביבה וגם מהתעשייה שאותה נועדה להסדיר.",near:['whether... or','so... that']},
  {s:"The vaccine proved effective ___ in children ___ in adults over sixty.",he:"החיסון הוכח כיעיל גם בילדים וגם במבוגרים מעל שישים.",near:['not only... but also','whether... or']}],
 'not only... but also':[
  {s:"The new bridge ___ shortens the journey ___ removes heavy trucks from the town center.",he:"הגשר החדש לא רק מקצר את הנסיעה אלא גם מרחיק משאיות כבדות ממרכז העיר.",near:['both... and','whether... or']},
  {s:"The flood ___ destroyed hundreds of homes ___ contaminated the town's water supply.",he:"השיטפון לא רק הרס מאות בתים אלא גם זיהם את אספקת המים של העיירה.",near:['so... that','whether... or']}],
 'only if':[
  {s:"The surgery will be performed ___ all other treatments have failed.",he:"הניתוח יבוצע רק אם כל הטיפולים האחרים נכשלו.",near:['unless','although']},
  {s:"A refund is possible ___ the ticket is returned at least a week before the show.",he:"החזר כספי אפשרי רק אם הכרטיס מוחזר לפחות שבוע לפני ההופעה.",near:['even though','whereas']}],
 'as':[
  {s:"___ the ice on the lake was still thin, the skating competition was postponed.",he:"מכיוון שהקרח על האגם היה עדיין דק, תחרות ההחלקה נדחתה.",near:['despite','unless']},
  {s:"___ the population of the city grew, so did the demand for housing.",he:"ככל שאוכלוסיית העיר גדלה, כך גדל גם הביקוש לדיור.",near:['although','whereas']}],
 // ===== רמה 2 — בגרות (60) =====
 answer:[
  {s:"The scientists still have no clear ___ to the question of why the species disappeared.",he:"למדענים עדיין אין תשובה ברורה לשאלה מדוע המין נעלם.",near:['approach','decision']},
  {s:"She gave a short ___ and then refused to discuss the matter any further.",he:"היא נתנה תשובה קצרה ואז סירבה לדון בעניין יותר.",near:['effort','attempt']}],
 avoid:[
  {s:"Drivers are advised to ___ the coastal road until the flooding has receded.",he:"הנהגים מתבקשים להימנע מכביש החוף עד שההצפה תיסוג.",near:['delay','abandon']},
  {s:"To ___ misunderstandings, the contract was translated into both languages.",he:"כדי להימנע מאי-הבנות, החוזה תורגם לשתי השפות.",near:['reduce','deny']}],
 provide:[
  {s:"The charity will ___ blankets and hot meals to families left homeless by the earthquake.",he:"הארגון יספק שמיכות וארוחות חמות למשפחות שנותרו ללא בית בגלל רעידת האדמה.",near:['require','obtain']},
  {s:"The new library was designed to ___ students with quiet space for study.",he:"הספרייה החדשה תוכננה לספק לסטודנטים מרחב שקט ללימוד.",near:['attract','demand']}],
 require:[
  {s:"Most universities ___ applicants to submit two letters of recommendation.",he:"רוב האוניברסיטאות דורשות מהמועמדים להגיש שני מכתבי המלצה.",near:['provide','encourage']},
  {s:"Growing tomatoes indoors will ___ far more light than most apartments receive.",he:"גידול עגבניות בתוך הבית ידרוש הרבה יותר אור ממה שרוב הדירות מקבלות.",near:['obtain','consume']}],
 encourage:[
  {s:"Low interest rates were introduced to ___ small businesses to borrow and expand.",he:"ריביות נמוכות הונהגו כדי לעודד עסקים קטנים ללוות ולהתרחב.",near:['require','enable']},
  {s:"Teachers should ___ shy students to speak in class rather than criticize their mistakes.",he:"מורים צריכים לעודד תלמידים ביישנים לדבר בכיתה במקום לבקר את טעויותיהם.",near:['convince','blame']}],
 decrease:[
  {s:"The number of road accidents began to ___ soon after the speed cameras were installed.",he:"מספר תאונות הדרכים החל לרדת זמן קצר אחרי שהותקנו מצלמות המהירות.",near:['reduce','decline']},
  {s:"Doctors hope the new vaccine will ___ the number of infections by half within a year.",he:"הרופאים מקווים שהחיסון החדש יקטין את מספר ההדבקות בחצי בתוך שנה.",near:['eliminate','restrict']}],
 ability:[
  {s:"Birds have a remarkable ___ to find their way home over thousands of kilometers.",he:"לציפורים יש יכולת מדהימה למצוא את דרכן הביתה לאורך אלפי קילומטרים.",near:['effort','advantage']},
  {s:"The job requires the ___ to work calmly under constant pressure.",he:"התפקיד דורש יכולת לעבוד ברוגע תחת לחץ מתמיד.",near:['attitude','experience']}],
 advantage:[
  {s:"Being fluent in three languages gave her a clear ___ over the other candidates.",he:"השליטה בשלוש שפות העניקה לה יתרון ברור על פני המועמדים האחרים.",near:['ability','effect']},
  {s:"The main ___ of the new location is its distance from the noise of the highway.",he:"היתרון העיקרי של המיקום החדש הוא מרחקו מרעש הכביש המהיר.",near:['purpose','challenge']}],
 advice:[
  {s:"Against the ___ of his doctors, he returned to work only a week after the operation.",he:"בניגוד לעצת רופאיו, הוא חזר לעבודה שבוע בלבד אחרי הניתוח.",near:['decision','effort']},
  {s:"The website offers free legal ___ to tenants who are in dispute with their landlords.",he:"האתר מציע ייעוץ משפטי חינם לדיירים שנמצאים בסכסוך עם בעלי הדירות שלהם.",near:['condition','approach']}],
 amount:[
  {s:"The recipe requires only a small ___ of salt, so add it carefully.",he:"המתכון דורש רק כמות קטנה של מלח, אז הוסף אותו בזהירות.",near:['proportion','fraction']},
  {s:"No ___ of money could persuade the old farmer to sell his land.",he:"שום כמות של כסף לא יכלה לשכנע את החקלאי הזקן למכור את אדמתו.",near:['expense','income']}],
 announce:[
  {s:"The company is expected to ___ its new chief executive at a press conference tomorrow.",he:"החברה צפויה להכריז על המנכ\"ל החדש שלה במסיבת עיתונאים מחר.",near:['describe','apply']},
  {s:"The judges will ___ the winner of the competition at the end of the evening.",he:"השופטים יכריזו על הזוכה בתחרות בסוף הערב.",near:['approve','compare']}],
 annual:[
  {s:"The company's ___ report showed that profits had doubled since the previous year.",he:"הדוח השנתי של החברה הראה שהרווחים הוכפלו מאז השנה הקודמת.",near:['constant','permanent']},
  {s:"The village holds an ___ festival every spring to celebrate the olive harvest.",he:"הכפר עורך פסטיבל שנתי בכל אביב לחגוג את מסיק הזיתים.",near:['frequent','average']}],
 appear:[
  {s:"The first symptoms of the disease usually ___ two or three days after infection.",he:"התסמינים הראשונים של המחלה מופיעים בדרך כלל יומיים-שלושה אחרי ההדבקה.",near:['exist','develop']},
  {s:"From a distance, the two islands ___ to be one long strip of land.",he:"ממרחק, שני האיים נראים כרצועת אדמה ארוכה אחת.",near:['belong','attend']}],
 apply:[
  {s:"Anyone wishing to ___ for the scholarship must do so before the end of March.",he:"כל מי שמעוניין להגיש מועמדות למלגה חייב לעשות זאת לפני סוף מרץ.",near:['attend','argue']},
  {s:"The same safety rules ___ to visitors as to permanent members of staff.",he:"אותם כללי בטיחות חלים על מבקרים כמו על אנשי צוות קבועים.",near:['belong','depend']}],
 approach:[
  {s:"The school has adopted a new ___ to teaching mathematics, based on games and puzzles.",he:"בית הספר אימץ גישה חדשה להוראת מתמטיקה, המבוססת על משחקים וחידות.",near:['answer','ability']},
  {s:"Her ___ to the problem was practical: fix what can be fixed, and ignore the rest.",he:"הגישה שלה לבעיה הייתה מעשית: לתקן מה שאפשר לתקן, ולהתעלם מהשאר.",near:['answer','decision']}],
 argue:[
  {s:"Some economists ___ that raising the minimum wage will lead to fewer jobs.",he:"כלכלנים אחדים טוענים שהעלאת שכר המינימום תוביל לפחות משרות.",near:['explain','complain']},
  {s:"The two brothers constantly ___ about who should take care of their elderly mother.",he:"שני האחים מתווכחים כל הזמן על מי צריך לטפל באמם הקשישה.",near:['compare','deny']}],
 arrange:[
  {s:"The travel agency will ___ transportation from the airport to the hotel.",he:"סוכנות הנסיעות תסדר הסעה משדה התעופה למלון.",near:['attend','apply']},
  {s:"Please ___ the chairs in a circle so that everyone can see each other.",he:"אנא סדרו את הכיסאות במעגל כדי שכולם יוכלו לראות זה את זה.",near:['contain','create']}],
 attempt:[
  {s:"His first ___ to climb the mountain ended in failure because of bad weather.",he:"ניסיונו הראשון לטפס על ההר הסתיים בכישלון בגלל מזג אוויר גרוע.",near:['effort','ability']},
  {s:"The police made no ___ to hide their disappointment with the verdict.",he:"המשטרה לא עשתה שום ניסיון להסתיר את אכזבתה מפסק הדין.",near:['decision','ability']}],
 attend:[
  {s:"More than five hundred people are expected to ___ the opening ceremony.",he:"יותר מחמש מאות אנשים צפויים להשתתף בטקס הפתיחה.",near:['arrange','announce']},
  {s:"Employees who ___ the training course will receive an extra day of vacation.",he:"עובדים שישתתפו בקורס ההכשרה יקבלו יום חופשה נוסף.",near:['apply','complete']}],
 attitude:[
  {s:"His negative ___ toward change made him unpopular with the younger managers.",he:"הגישה השלילית שלו כלפי שינוי הפכה אותו ללא אהוד בקרב המנהלים הצעירים.",near:['behavior','ability']},
  {s:"A positive ___ can make a long recovery from illness much easier to bear.",he:"גישה חיובית יכולה להקל מאוד על החלמה ארוכה ממחלה.",near:['ability','experience']}],
 attract:[
  {s:"The bright colors of the flowers ___ insects that carry pollen from plant to plant.",he:"הצבעים הבהירים של הפרחים מושכים חרקים שנושאים אבקה מצמח לצמח.",near:['contain','create']},
  {s:"The festival is expected to ___ more than a hundred thousand visitors to the city.",he:"הפסטיבל צפוי למשוך יותר ממאה אלף מבקרים לעיר.",near:['employ','encourage']}],
 average:[
  {s:"The ___ temperature in July is about thirty degrees, but it can rise much higher.",he:"הטמפרטורה הממוצעת ביולי היא כשלושים מעלות, אבל היא יכולה לעלות הרבה יותר.",near:['annual','constant']},
  {s:"An ___ adult needs about seven hours of sleep a night to function well.",he:"מבוגר ממוצע זקוק לכשבע שעות שינה בלילה כדי לתפקד היטב.",near:['certain','familiar']}],
 aware:[
  {s:"Few passengers were ___ of how close the ship had come to hitting the rocks.",he:"מעטים מהנוסעים היו מודעים לכמה קרובה הייתה הספינה לפגיעה בסלעים.",near:['certain','familiar']},
  {s:"Parents should be ___ that many toys contain small parts that young children could swallow.",he:"הורים צריכים להיות מודעים לכך שצעצועים רבים מכילים חלקים קטנים שילדים צעירים עלולים לבלוע.",near:['capable','cautious']}],
 behavior:[
  {s:"Scientists have observed unusual ___ in dolphins kept in small pools.",he:"מדענים צפו בהתנהגות חריגה אצל דולפינים המוחזקים בבריכות קטנות.",near:['attitude','condition']},
  {s:"The teacher praised the class for its excellent ___ during the museum visit.",he:"המורה שיבחה את הכיתה על התנהגותה המצוינת במהלך הביקור במוזיאון.",near:['effort','experience']}],
 belong:[
  {s:"These tools ___ to the museum and must not be removed from the building.",he:"הכלים האלה שייכים למוזיאון ואסור להוציא אותם מהבניין.",near:['depend','exist']},
  {s:"Whales ___ to the same group of animals as cows and horses, not to the fish.",he:"לווייתנים משתייכים לאותה קבוצת בעלי חיים כמו פרות וסוסים, ולא לדגים.",near:['appear','contain']}],
 blame:[
  {s:"It is unfair to ___ the coach for a defeat caused by the players' own mistakes.",he:"לא הוגן להאשים את המאמן בהפסד שנגרם מטעויות השחקנים עצמם.",near:['complain','deny']},
  {s:"Investigators ___ the fire on an electrical fault in the basement.",he:"החוקרים תולים את האשמה בשריפה בתקלה חשמלית במרתף.",near:['deny','defend']}],
 cause:[
  {s:"Heavy rains can ___ the river to overflow its banks within a few hours.",he:"גשמים כבדים יכולים לגרום לנהר לעלות על גדותיו בתוך שעות ספורות.",near:['create','develop']},
  {s:"The strike did not ___ the company any serious financial loss.",he:"השביתה לא גרמה לחברה שום הפסד כספי רציני.",near:['destroy','delay']}],
 certain:[
  {s:"Nobody can be ___ how long the repairs to the bridge will take.",he:"איש אינו יכול להיות בטוח כמה זמן ייקחו התיקונים לגשר.",near:['aware','familiar']},
  {s:"___ medicines should never be taken together with alcohol.",he:"תרופות מסוימות לעולם אין ליטול יחד עם אלכוהול.",near:['average','constant']}],
 challenge:[
  {s:"Feeding a growing population without destroying the environment is the greatest ___ of our time.",he:"להאכיל אוכלוסייה גדלה בלי להרוס את הסביבה הוא האתגר הגדול ביותר של זמננו.",near:['effort','condition']},
  {s:"For a small company, competing with international giants is a serious ___.",he:"עבור חברה קטנה, להתחרות בענקיות בינלאומיות הוא אתגר רציני.",near:['damage','decision']}],
 community:[
  {s:"The new clinic serves a ___ of about two thousand people living along the river.",he:"המרפאה החדשה משרתת קהילה של כאלפיים אנשים שחיים לאורך הנהר.",near:['condition','experience']},
  {s:"Members of the fishing ___ have protested against the new restrictions.",he:"חברי קהילת הדייגים מחו נגד ההגבלות החדשות.",near:['behavior','challenge']}],
 compare:[
  {s:"Before buying a car, it is wise to ___ prices at several dealers.",he:"לפני קניית מכונית, חכם להשוות מחירים אצל כמה סוכנויות.",near:['consider','describe']},
  {s:"Researchers ___ the health of people who exercise regularly with that of people who do not.",he:"החוקרים משווים את בריאותם של אנשים שמתעמלים באופן קבוע לזו של אנשים שאינם.",near:['analyze','explain']}],
 complain:[
  {s:"Several residents ___ that the new factory produces an unbearable smell.",he:"כמה תושבים מתלוננים שהמפעל החדש מפיק ריח בלתי נסבל.",near:['argue','blame']},
  {s:"If the goods arrive damaged, customers may ___ to the shop within fourteen days.",he:"אם הסחורה מגיעה פגומה, לקוחות רשאים להתלונן לחנות בתוך ארבעה עשר ימים.",near:['demand','deny']}],
 complete:[
  {s:"Students must ___ all three sections of the exam within two hours.",he:"התלמידים חייבים להשלים את כל שלושת חלקי הבחינה בתוך שעתיים.",near:['attend','develop']},
  {s:"Workers expect to ___ the new tunnel about six months ahead of schedule.",he:"העובדים מצפים להשלים את המנהרה החדשה כחצי שנה לפני לוח הזמנים.",near:['create','arrange']}],
 condition:[
  {s:"The old car is in excellent ___ despite its age.",he:"המכונית הישנה במצב מצוין למרות גילה.",near:['effect','experience']},
  {s:"The bank agreed to the loan on one ___: the money had to be repaid within a year.",he:"הבנק הסכים להלוואה בתנאי אחד: היה צריך להחזיר את הכסף בתוך שנה.",near:['decision','advice']}],
 consider:[
  {s:"Before accepting the job, you should ___ how long the daily journey would take.",he:"לפני שתקבל את העבודה, כדאי שתשקול כמה זמן תיקח הנסיעה היומית.",near:['compare','expect']},
  {s:"The committee will ___ all applications received before the deadline.",he:"הוועדה תשקול את כל הבקשות שהתקבלו לפני המועד האחרון.",near:['contain','describe']}],
 contain:[
  {s:"These nuts ___ a large amount of protein and healthy fats.",he:"האגוזים האלה מכילים כמות גדולה של חלבון ושומנים בריאים.",near:['create','consist']},
  {s:"The report ___ a detailed list of every payment made during the year.",he:"הדוח מכיל רשימה מפורטת של כל תשלום שבוצע במהלך השנה.",near:['describe','depend']}],
 convince:[
  {s:"The lawyer failed to ___ the jury that her client had acted in self-defense.",he:"עורכת הדין לא הצליחה לשכנע את חבר המושבעים שמרשה פעל מתוך הגנה עצמית.",near:['explain','encourage']},
  {s:"It took months to ___ the villagers that the new well was safe to use.",he:"לקח חודשים לשכנע את הכפריים שהבאר החדשה בטוחה לשימוש.",near:['argue','assure']}],
 create:[
  {s:"The new factory is expected to ___ about three hundred jobs in the region.",he:"המפעל החדש צפוי ליצור כשלוש מאות משרות באזור.",near:['develop','employ']},
  {s:"Heavy trucks ___ vibrations that can damage the foundations of old buildings.",he:"משאיות כבדות יוצרות רעידות שעלולות לפגוע ביסודות של בניינים ישנים.",near:['contain','destroy']}],
 damage:[
  {s:"The storm caused serious ___ to the roofs of houses along the coast.",he:"הסופה גרמה נזק חמור לגגות הבתים לאורך החוף.",near:['effect','condition']},
  {s:"Smoking during pregnancy can do permanent ___ to the unborn child.",he:"עישון במהלך ההיריון עלול לגרום נזק קבוע לעובר.",near:['challenge','doubt']}],
 decision:[
  {s:"The judge's ___ to release the suspect surprised everyone in the courtroom.",he:"החלטת השופט לשחרר את החשוד הפתיעה את כל מי שהיה באולם.",near:['attempt','advice']},
  {s:"Moving to another country is a ___ that should not be made in a hurry.",he:"מעבר למדינה אחרת הוא החלטה שאין לקבל בחיפזון.",near:['approach','condition']}],
 defend:[
  {s:"The minister was forced to ___ his policy against fierce criticism in parliament.",he:"השר נאלץ להגן על מדיניותו מול ביקורת חריפה בפרלמנט.",near:['deny','explain']},
  {s:"Mother bears will fiercely ___ their cubs from any animal that comes too close.",he:"דובות יגנו בעוז על גוריהן מפני כל חיה שמתקרבת מדי.",near:['preserve','blame']}],
 delay:[
  {s:"Fog at the airport may ___ your flight by several hours.",he:"ערפל בשדה התעופה עלול לעכב את הטיסה שלך בכמה שעות.",near:['avoid','destroy']},
  {s:"The council decided to ___ the vote until all members had read the report.",he:"המועצה החליטה לדחות את ההצבעה עד שכל החברים יקראו את הדוח.",near:['deny','cease']}],
 demand:[
  {s:"The workers ___ higher wages and safer conditions in the mines.",he:"העובדים דורשים שכר גבוה יותר ותנאים בטוחים יותר במכרות.",near:['deserve','complain']},
  {s:"Angry customers ___ to know why the prices had risen so suddenly.",he:"לקוחות זועמים דרשו לדעת מדוע המחירים עלו כל כך פתאום.",near:['expect','require']}],
 deny:[
  {s:"The company continues to ___ that its products caused any harm to consumers.",he:"החברה ממשיכה להכחיש שמוצריה גרמו נזק כלשהו לצרכנים.",near:['defend','refuse']},
  {s:"The minister did not ___ the report, but he refused to comment on it.",he:"השר לא הכחיש את הדוח, אבל סירב להגיב עליו.",near:['argue','avoid']}],
 depend:[
  {s:"Whether the crops survive will ___ on how much rain falls in the next two weeks.",he:"אם היבולים ישרדו יהיה תלוי בכמות הגשם שתרד בשבועיים הקרובים.",near:['belong','consist']},
  {s:"Many small farmers ___ entirely on a single crop for their income.",he:"חקלאים קטנים רבים תלויים לחלוטין ביבול אחד לפרנסתם.",near:['exist','require']}],
 describe:[
  {s:"Witnesses ___ the thief as a tall man in his thirties wearing a gray coat.",he:"עדים תיארו את הגנב כאיש גבוה בשנות השלושים לחייו, לבוש במעיל אפור.",near:['explain','announce']},
  {s:"The guidebook ___ the village as quiet, but we found it crowded with tourists.",he:"המדריך מתאר את הכפר כשקט, אבל מצאנו אותו עמוס בתיירים.",near:['consider','compare']}],
 deserve:[
  {s:"After thirty years of hard work, she certainly ___ a long vacation.",he:"אחרי שלושים שנות עבודה קשה, היא בהחלט ראויה לחופשה ארוכה.",near:['demand','expect']},
  {s:"The film did not ___ the harsh reviews it received from the critics.",he:"הסרט לא היה ראוי לביקורות הקשות שקיבל מהמבקרים.",near:['require','attract']}],
 destroy:[
  {s:"A single fire can ___ in minutes a forest that took a century to grow.",he:"שריפה אחת יכולה להרוס תוך דקות יער שלקח מאה שנה לגדול.",near:['decrease','abandon']},
  {s:"The floods ___ most of the bridges in the valley, cutting the villages off for weeks.",he:"השיטפונות הרסו את רוב הגשרים בעמק וניתקו את הכפרים למשך שבועות.",near:['delay','reduce']}],
 develop:[
  {s:"The company spent ten years and millions of dollars to ___ the new engine.",he:"החברה השקיעה עשר שנים ומיליוני דולרים כדי לפתח את המנוע החדש.",near:['create','explore']},
  {s:"Children who read a great deal tend to ___ a rich vocabulary at an early age.",he:"ילדים שקוראים הרבה נוטים לפתח אוצר מילים עשיר בגיל צעיר.",near:['obtain','attain']}],
 doubt:[
  {s:"There is little ___ that the painting is genuine; three experts have examined it.",he:"אין כמעט ספק שהציור אמיתי; שלושה מומחים בדקו אותו.",near:['decision','condition']},
  {s:"Her ___ about the plan grew as more problems came to light.",he:"הספקות שלה לגבי התוכנית גברו ככל שנחשפו יותר בעיות.",near:['confidence','attitude']}],
 earn:[
  {s:"Nurses in the private hospital ___ almost twice as much as those in public ones.",he:"אחיות בבית החולים הפרטי מרוויחות כמעט פי שניים מאלה שבציבוריים.",near:['deserve','obtain']},
  {s:"It took the young lawyer years to ___ the respect of her older colleagues.",he:"לעורכת הדין הצעירה לקח שנים לזכות בכבודם של עמיתיה המבוגרים.",near:['demand','attract']}],
 effect:[
  {s:"The new medicine had an immediate ___ on the patient's blood pressure.",he:"לתרופה החדשה הייתה השפעה מיידית על לחץ הדם של המטופל.",near:['effort','condition']},
  {s:"Economists are still debating the long-term ___ of the tax cuts on employment.",he:"הכלכלנים עדיין מתווכחים על ההשפעה ארוכת הטווח של הפחתת המסים על התעסוקה.",near:['damage','advantage']}],
 effort:[
  {s:"Despite every ___ by the rescue teams, the missing climbers were never found.",he:"למרות כל מאמץ של צוותי החילוץ, המטפסים הנעדרים מעולם לא נמצאו.",near:['attempt','ability']},
  {s:"Learning to play the violin well requires years of patient ___.",he:"ללמוד לנגן היטב בכינור דורש שנים של מאמץ סבלני.",near:['experience','effect']}],
 employ:[
  {s:"The factory will ___ about two hundred people when it opens next year.",he:"המפעל יעסיק כמאתיים אנשים כשייפתח בשנה הבאה.",near:['attract','encourage']},
  {s:"Farmers in the region ___ seasonal workers during the harvest.",he:"החקלאים באזור מעסיקים עובדים עונתיים בזמן הקציר.",near:['require','earn']}],
 exist:[
  {s:"Scientists doubt that life can ___ without some form of liquid water.",he:"מדענים מטילים ספק בכך שחיים יכולים להתקיים ללא צורה כלשהי של מים נוזליים.",near:['appear','belong']},
  {s:"Several species of frog ___ only in this one small valley.",he:"כמה מינים של צפרדע מתקיימים רק בעמק הקטן הזה.",near:['depend','develop']}],
 expect:[
  {s:"Forecasters ___ the storm to reach the coast by early Thursday morning.",he:"החזאים מצפים שהסופה תגיע לחוף עד יום חמישי מוקדם בבוקר.",near:['demand','deny']},
  {s:"Nobody ___ the small local team to win the national championship.",he:"איש לא ציפה שהקבוצה המקומית הקטנה תזכה באליפות הארצית.",near:['encourage','consider']}],
 experience:[
  {s:"Years of ___ in the desert taught the guide to read the weather from the color of the sky.",he:"שנות ניסיון במדבר לימדו את המדריך לקרוא את מזג האוויר מצבע השמיים.",near:['effort','ability']},
  {s:"Losing the final was a painful ___, but the team learned a great deal from it.",he:"ההפסד בגמר היה חוויה כואבת, אבל הקבוצה למדה ממנו הרבה.",near:['effect','condition']}],
 explain:[
  {s:"The guide will ___ how the ancient builders moved such enormous stones.",he:"המדריך יסביר כיצד הבנאים הקדומים הזיזו אבנים עצומות כאלה.",near:['describe','argue']},
  {s:"No theory has yet been able to ___ why the dinosaurs disappeared so suddenly.",he:"שום תיאוריה עדיין לא הצליחה להסביר מדוע הדינוזאורים נעלמו כל כך פתאום.",near:['announce','consider']}],
 familiar:[
  {s:"The tune sounded ___, but she could not remember where she had heard it.",he:"המנגינה נשמעה מוכרת, אבל היא לא זכרה היכן שמעה אותה.",near:['certain','aware']},
  {s:"Anyone ___ with the old town will know how easy it is to get lost in its narrow streets.",he:"כל מי שמכיר את העיר העתיקה יודע כמה קל ללכת לאיבוד ברחובותיה הצרים.",near:['capable','available']}],
 favor:[
  {s:"Most of the residents ___ building the new park rather than another parking lot.",he:"רוב התושבים תומכים בבניית הפארק החדש במקום עוד חניון.",near:['encourage','deserve']},
  {s:"The judges tended to ___ the younger competitors, whose style was more modern.",he:"השופטים נטו להעדיף את המתחרים הצעירים, שסגנונם היה מודרני יותר.",near:['attract','defend']}],
 // ===== רמה 3 — בגרות 5 יח' / מתקדם (70) =====
 essential:[
  {s:"Clean water is ___ for the survival of any community, however small.",he:"מים נקיים הם חיוניים להישרדות של כל קהילה, קטנה ככל שתהיה.",near:['significant','adequate']},
  {s:"A good map is ___ if you plan to hike in the mountains without a guide.",he:"מפה טובה היא חיונית אם אתה מתכנן לטייל בהרים בלי מדריך.",near:['available','apparent']}],
 significant:[
  {s:"The study found a ___ difference between the two groups in their ability to remember new words.",he:"המחקר מצא הבדל משמעותי בין שתי הקבוצות ביכולתן לזכור מילים חדשות.",near:['apparent','accurate']},
  {s:"The discovery of oil brought ___ changes to the small fishing village.",he:"גילוי הנפט הביא שינויים משמעותיים לכפר הדייגים הקטן.",near:['constant','brief']}],
 obtain:[
  {s:"Foreign journalists must ___ special permission before entering the region.",he:"עיתונאים זרים חייבים להשיג אישור מיוחד לפני הכניסה לאזור.",near:['maintain','assume']},
  {s:"The researchers were unable to ___ reliable data from the remote villages.",he:"החוקרים לא הצליחו להשיג נתונים אמינים מהכפרים המרוחקים.",near:['analyze','distribute']}],
 maintain:[
  {s:"It costs the city millions each year to ___ its aging network of bridges.",he:"עולה לעיר מיליונים בכל שנה לתחזק את רשת הגשרים המזדקנת שלה.",near:['obtain','adopt']},
  {s:"Despite the crisis, the two countries managed to ___ friendly relations.",he:"למרות המשבר, שתי המדינות הצליחו לשמר יחסים ידידותיים.",near:['attain','convert']}],
 purpose:[
  {s:"The main ___ of the meeting was to decide how the money should be spent.",he:"המטרה העיקרית של הפגישה הייתה להחליט כיצד להוציא את הכסף.",near:['consequence','ambition']},
  {s:"The tall tower served no practical ___; it was built purely for decoration.",he:"למגדל הגבוה לא הייתה שום מטרה מעשית; הוא נבנה אך ורק לקישוט.",near:['access','bias']}],
 reduce:[
  {s:"Planting trees along the highway helped to ___ the noise reaching nearby homes.",he:"נטיעת עצים לאורך הכביש המהיר עזרה להפחית את הרעש שמגיע לבתים הסמוכים.",near:['decline','prohibit']},
  {s:"The new engine was designed to ___ fuel consumption by nearly a quarter.",he:"המנוע החדש תוכנן להפחית את צריכת הדלק בכמעט רבע.",near:['deprive','cease']}],
 accurate:[
  {s:"The old clock in the square is surprisingly ___; it loses less than a minute a month.",he:"השעון הישן בכיכר מדויק להפליא; הוא מפגר בפחות מדקה בחודש.",near:['adequate','apparent']},
  {s:"Witnesses rarely give an ___ description of events they saw only briefly.",he:"עדים ממעטים לתת תיאור מדויק של אירועים שראו רק לרגע.",near:['apparent','considerable']}],
 prohibit:[
  {s:"City regulations ___ the burning of leaves and garden waste during the summer.",he:"תקנות העירייה אוסרות שריפה של עלים ופסולת גינה במהלך הקיץ.",near:['reduce','deprive']},
  {s:"Most airlines ___ passengers from carrying more than one small bag into the cabin.",he:"רוב חברות התעופה אוסרות על נוסעים להכניס לתא יותר מתיק קטן אחד.",near:['assign','approve']}],
 abandon:[
  {s:"The climbers were forced to ___ their attempt on the summit when the storm arrived.",he:"המטפסים נאלצו לנטוש את ניסיונם להגיע לפסגה כשהסופה הגיעה.",near:['cease','decline']},
  {s:"Farmers began to ___ the valley when the river dried up.",he:"החקלאים החלו לנטוש את העמק כשהנהר התייבש.",near:['adapt','alter']}],
 absorb:[
  {s:"Dry soil can ___ a surprising amount of water in just a few minutes.",he:"אדמה יבשה יכולה לספוג כמות מפתיעה של מים בתוך דקות ספורות.",near:['consume','contain']},
  {s:"Young children ___ a new language far more easily than adults do.",he:"ילדים צעירים סופגים שפה חדשה בקלות רבה יותר מאשר מבוגרים.",near:['comprehend','adopt']}],
 access:[
  {s:"Only two members of staff have ___ to the room where the records are kept.",he:"רק לשני אנשי צוות יש גישה לחדר שבו נשמרים הרישומים.",near:['barrier','confidence']},
  {s:"The new road will give farmers in the valley easy ___ to the markets in the city.",he:"הכביש החדש ייתן לחקלאי העמק גישה נוחה לשווקים בעיר.",near:['purpose','ambition']}],
 accompany:[
  {s:"Children under twelve must be ___ by an adult when using the swimming pool.",he:"ילדים מתחת לגיל שתים עשרה חייבים להיות מלווים על ידי מבוגר בשימוש בבריכה.",near:['assist','approve']},
  {s:"Two experienced guides will ___ the group throughout the desert crossing.",he:"שני מדריכים מנוסים ילוו את הקבוצה לאורך כל חציית המדבר.",near:['conduct','assign']}],
 accomplish:[
  {s:"In only three years, the small team managed to ___ what larger companies had failed to do in ten.",he:"בשלוש שנים בלבד הצליח הצוות הקטן להגשים את מה שחברות גדולות יותר נכשלו בו במשך עשר.",near:['attain','anticipate']},
  {s:"Without a clear plan, even a talented group will ___ very little.",he:"בלי תוכנית ברורה, אפילו קבוצה מוכשרת תשיג מעט מאוד.",near:['obtain','assume']}],
 accuse:[
  {s:"The newspaper ___ the mayor of using public money for his own holidays.",he:"העיתון האשים את ראש העיר בשימוש בכספי ציבור לחופשותיו הפרטיות.",near:['confess','admit']},
  {s:"You should not ___ anyone of stealing until you have some proof.",he:"אסור להאשים מישהו בגניבה לפני שיש הוכחה כלשהי.",near:['assess','detect']}],
 adapt:[
  {s:"Camels have ___ to desert life in remarkable ways, storing fat rather than water.",he:"גמלים הסתגלו לחיי המדבר בדרכים מדהימות, כשהם אוגרים שומן ולא מים.",near:['adopt','alter']},
  {s:"Older employees sometimes find it hard to ___ to new computer systems.",he:"עובדים מבוגרים מתקשים לפעמים להסתגל למערכות מחשב חדשות.",near:['contribute','commit']}],
 adequate:[
  {s:"The shelter has ___ supplies of food and water to last the winter.",he:"למקלט יש אספקה מספקת של מזון ומים שתספיק לחורף.",near:['considerable','constant']},
  {s:"The old heating system is no longer ___ for a building of this size.",he:"מערכת החימום הישנה כבר אינה מספיקה לבניין בגודל כזה.",near:['capable','available']}],
 admit:[
  {s:"The minister finally ___ that the figures in his speech had been wrong.",he:"השר הודה לבסוף שהנתונים בנאומו היו שגויים.",near:['assume','assure']},
  {s:"Few people like to ___ that they have made a serious mistake.",he:"מעטים אוהבים להודות שעשו טעות חמורה.",near:['conclude','determine']}],
 adopt:[
  {s:"Several European countries have decided to ___ the same safety standards for toys.",he:"כמה מדינות אירופיות החליטו לאמץ את אותם תקני בטיחות לצעצועים.",near:['adapt','approve']},
  {s:"The school will ___ a new timetable starting next September.",he:"בית הספר יאמץ מערכת שעות חדשה החל מספטמבר הבא.",near:['assign','alter']}],
 alter:[
  {s:"The discovery of the letters forced historians to ___ their view of the king's final years.",he:"גילוי המכתבים אילץ היסטוריונים לשנות את השקפתם על שנותיו האחרונות של המלך.",near:['adapt','convert']},
  {s:"The tailor can ___ the jacket so that it fits your shoulders better.",he:"החייט יכול לשנות את הז'קט כך שיתאים טוב יותר לכתפיך.",near:['assess','maintain']}],
 ambition:[
  {s:"Her lifelong ___ was to become the first woman to lead the national orchestra.",he:"שאיפתה במשך כל חייה הייתה להיות האישה הראשונה שתנצח על התזמורת הלאומית.",near:['confidence','purpose']},
  {s:"The young lawyer's ___ worried his colleagues, who feared he would take their clients.",he:"השאפתנות של עורך הדין הצעיר הדאיגה את עמיתיו, שחששו שייקח את לקוחותיהם.",near:['bias','conflict']}],
 analyze:[
  {s:"Scientists will ___ the samples to find out what killed the fish in the lake.",he:"מדענים ינתחו את הדגימות כדי לגלות מה הרג את הדגים באגם.",near:['assess','detect']},
  {s:"Before making changes, the manager wanted to ___ why sales had fallen so sharply.",he:"לפני שיבצע שינויים, המנהל רצה לנתח מדוע המכירות ירדו בצורה כה חדה.",near:['determine','demonstrate']}],
 ancient:[
  {s:"The ___ city was buried under volcanic ash for nearly two thousand years.",he:"העיר העתיקה הייתה קבורה תחת אפר געשי במשך כמעט אלפיים שנה.",near:['constant','distinct']},
  {s:"This ___ custom of exchanging gifts at the harvest survives in a few mountain villages.",he:"המנהג העתיק הזה של החלפת מתנות בזמן הקציר שורד בכמה כפרי הרים.",near:['dominant','brief']}],
 anticipate:[
  {s:"Organizers did not ___ such a large crowd and quickly ran out of seats.",he:"המארגנים לא צפו קהל כה גדול ומהר מאוד נגמרו המקומות.",near:['assume','assure']},
  {s:"A good chess player must ___ the opponent's moves several steps ahead.",he:"שחקן שחמט טוב חייב לצפות מראש את מהלכי היריב כמה צעדים קדימה.",near:['analyze','conclude']}],
 apparent:[
  {s:"It soon became ___ that the bridge could not carry such heavy traffic.",he:"עד מהרה התברר שהגשר אינו יכול לשאת תנועה כה כבדה.",near:['accurate','adequate']},
  {s:"For no ___ reason, the dog refused to enter the house.",he:"ללא סיבה נראית לעין, הכלב סירב להיכנס לבית.",near:['distinct','considerable']}],
 appreciate:[
  {s:"Only after living abroad did she begin to ___ the beauty of her own country.",he:"רק אחרי שחיה בחו\"ל היא החלה להעריך את יופיה של ארצה.",near:['admit','comprehend']},
  {s:"The company said it would ___ any suggestions for improving the service.",he:"החברה אמרה שתעריך כל הצעה לשיפור השירות.",near:['approve','admit']}],
 approve:[
  {s:"The council is expected to ___ the plans for the new sports center next week.",he:"המועצה צפויה לאשר את התוכניות למרכז הספורט החדש בשבוע הבא.",near:['adopt','assure']},
  {s:"Her parents did not ___ of her decision to leave university after one year.",he:"הוריה לא אישרו את החלטתה לעזוב את האוניברסיטה אחרי שנה אחת.",near:['appreciate','admit']}],
 assess:[
  {s:"Engineers were sent to ___ the damage to the dam after the earthquake.",he:"מהנדסים נשלחו להעריך את הנזק לסכר אחרי רעידת האדמה.",near:['analyze','detect']},
  {s:"It is too early to ___ whether the new teaching method really works.",he:"מוקדם מדי להעריך אם שיטת ההוראה החדשה באמת עובדת.",near:['determine','anticipate']}],
 assign:[
  {s:"The editor will ___ each reporter a different part of the city to cover.",he:"העורך יקצה לכל כתב חלק אחר של העיר לסיקור.",near:['distribute','assist']},
  {s:"Teachers should not ___ more homework than students can finish in an hour.",he:"מורים לא צריכים להטיל יותר שיעורי בית ממה שתלמידים יכולים לסיים בשעה.",near:['approve','commit']}],
 assist:[
  {s:"Volunteers will ___ the elderly residents in leaving the building safely.",he:"מתנדבים יסייעו לדיירים הקשישים לצאת מהבניין בבטחה.",near:['accompany','assure']},
  {s:"A new computer program will ___ doctors in choosing the right dose of medicine.",he:"תוכנת מחשב חדשה תסייע לרופאים בבחירת המינון הנכון של התרופה.",near:['assign','contribute']}],
 assume:[
  {s:"Many people ___ that expensive products are always better, but this is not so.",he:"אנשים רבים מניחים שמוצרים יקרים תמיד טובים יותר, אבל זה לא כך.",near:['assure','admit']},
  {s:"We cannot simply ___ that the bridge is safe; it must be inspected.",he:"איננו יכולים פשוט להניח שהגשר בטוח; חייבים לבדוק אותו.",near:['conclude','anticipate']}],
 assure:[
  {s:"The doctor ___ the patient that the operation carried very little risk.",he:"הרופא הבטיח למטופל שהניתוח כרוך בסיכון קטן מאוד.",near:['assume','approve']},
  {s:"The airline ___ passengers that their luggage would arrive on the next flight.",he:"חברת התעופה הבטיחה לנוסעים שהמזוודות שלהם יגיעו בטיסה הבאה.",near:['admit','assist']}],
 attain:[
  {s:"Few athletes ever ___ the level of fitness required for the Olympic marathon.",he:"מעט ספורטאים מגיעים אי פעם לרמת הכושר הנדרשת למרתון האולימפי.",near:['accomplish','maintain']},
  {s:"The temperature inside the furnace can ___ more than a thousand degrees.",he:"הטמפרטורה בתוך הכבשן יכולה להגיע ליותר מאלף מעלות.",near:['consume','contain']}],
 available:[
  {s:"Tickets for the concert are ___ online and at the box office.",he:"כרטיסים לקונצרט זמינים באינטרנט ובקופה.",near:['adequate','accurate']},
  {s:"The doctor is not ___ on Fridays, but her assistant can see urgent cases.",he:"הרופאה אינה זמינה בימי שישי, אבל העוזרת שלה יכולה לקבל מקרים דחופים.",near:['capable','constant']}],
 barrier:[
  {s:"Language was the biggest ___ facing the new immigrants in their search for work.",he:"השפה הייתה המחסום הגדול ביותר שעמד בפני המהגרים החדשים בחיפוש אחר עבודה.",near:['conflict','bias']},
  {s:"A concrete ___ was built along the river to protect the town from floods.",he:"מחסום בטון נבנה לאורך הנהר כדי להגן על העיירה מפני שיטפונות.",near:['access','consequence']}],
 bias:[
  {s:"The judge was removed from the case because of a possible ___ in favor of the defendant.",he:"השופט הוסר מהתיק בגלל הטיה אפשרית לטובת הנאשם.",near:['ambition','confidence']},
  {s:"Researchers must design their experiments carefully to avoid any ___ in the results.",he:"חוקרים חייבים לתכנן את ניסוייהם בקפידה כדי למנוע כל הטיה בתוצאות.",near:['barrier','conflict']}],
 brief:[
  {s:"The president made a ___ statement to reporters and then left without taking questions.",he:"הנשיא מסר הצהרה קצרה לכתבים ואז עזב בלי לענות על שאלות.",near:['constant','distinct']},
  {s:"After a ___ pause, the speaker continued as if nothing had happened.",he:"אחרי הפסקה קצרה, הדובר המשיך כאילו לא קרה דבר.",near:['apparent','dense']}],
 capable:[
  {s:"The new telescope is ___ of detecting planets around distant stars.",he:"הטלסקופ החדש מסוגל לגלות כוכבי לכת סביב כוכבים רחוקים.",near:['competent','available']},
  {s:"She is a highly ___ manager who stays calm when everything goes wrong.",he:"היא מנהלת מוכשרת מאוד שנשארת רגועה כשהכול משתבש.",near:['cautious','considerable']}],
 cautious:[
  {s:"Investors became more ___ after the sudden fall in share prices.",he:"המשקיעים נעשו זהירים יותר אחרי הנפילה הפתאומית במחירי המניות.",near:['capable','competent']},
  {s:"The doctor was ___ about promising a full recovery so soon after the surgery.",he:"הרופא היה זהיר בהבטחת החלמה מלאה כה מהר אחרי הניתוח.",near:['accurate','constant']}],
 cease:[
  {s:"The factory will ___ production at the end of the year, leaving four hundred people without work.",he:"המפעל יפסיק את הייצור בסוף השנה וישאיר ארבע מאות אנשים ללא עבודה.",near:['decline','abandon']},
  {s:"The two sides agreed to ___ fighting while the wounded were evacuated.",he:"שני הצדדים הסכימו לחדול מהלחימה בזמן פינוי הפצועים.",near:['reduce','deprive']}],
 commit:[
  {s:"The government has ___ itself to building ten thousand new homes within five years.",he:"הממשלה התחייבה לבנות עשרת אלפים בתים חדשים בתוך חמש שנים.",near:['contribute','dedicate']},
  {s:"He was found guilty of ___ fraud against dozens of elderly investors.",he:"הוא נמצא אשם בביצוע הונאה נגד עשרות משקיעים קשישים.",near:['conduct','confess']}],
 compensate:[
  {s:"The airline agreed to ___ passengers for the twelve-hour delay.",he:"חברת התעופה הסכימה לפצות את הנוסעים על העיכוב בן שתים עשרה השעות.",near:['contribute','assist']},
  {s:"No amount of money can ___ for the loss of a family home.",he:"שום סכום כסף לא יכול לפצות על אובדן בית המשפחה.",near:['comprehend','determine']}],
 competent:[
  {s:"The clinic employs only ___ nurses with at least five years of experience.",he:"המרפאה מעסיקה רק אחיות כשירות עם לפחות חמש שנות ניסיון.",near:['capable','cautious']},
  {s:"Although he was a ___ pilot, he had never flown in such difficult conditions.",he:"אף על פי שהיה טייס מוכשר, הוא מעולם לא טס בתנאים כה קשים.",near:['considerable','distinct']}],
 comprehend:[
  {s:"It is difficult to ___ how a city of a million people could disappear without a trace.",he:"קשה להבין כיצד עיר של מיליון אנשים יכלה להיעלם ללא זכר.",near:['absorb','conclude']},
  {s:"Young children cannot fully ___ the idea of death.",he:"ילדים צעירים אינם יכולים להבין לגמרי את רעיון המוות.",near:['appreciate','detect']}],
 conclude:[
  {s:"After six months of testing, the scientists ___ that the drug was safe for children.",he:"אחרי שישה חודשי ניסויים, המדענים הסיקו שהתרופה בטוחה לילדים.",near:['assume','anticipate']},
  {s:"The two companies hope to ___ the negotiations before the end of the month.",he:"שתי החברות מקוות לסיים את המשא ומתן לפני סוף החודש.",near:['cease','commit']}],
 conduct:[
  {s:"The university will ___ a survey of student opinion on the new library.",he:"האוניברסיטה תערוך סקר דעת סטודנטים על הספרייה החדשה.",near:['consist','contribute']},
  {s:"Police officers must ___ themselves with respect toward every citizen.",he:"שוטרים חייבים להתנהג בכבוד כלפי כל אזרח.",near:['convert','cope']}],
 confess:[
  {s:"After hours of questioning, the suspect finally ___ to the robbery.",he:"אחרי שעות של חקירה, החשוד התוודה לבסוף על השוד.",near:['accuse','assure']},
  {s:"I must ___ that I have never actually read the book, only seen the film.",he:"אני חייב להודות שמעולם לא קראתי את הספר, רק ראיתי את הסרט.",near:['assume','conclude']}],
 confidence:[
  {s:"Winning the first match gave the young team the ___ it needed for the rest of the season.",he:"הניצחון במשחק הראשון נתן לקבוצה הצעירה את הביטחון שנזקקה לו להמשך העונה.",near:['ambition','access']},
  {s:"Public ___ in the banking system fell sharply after the scandal.",he:"אמון הציבור במערכת הבנקאות ירד בחדות אחרי השערורייה.",near:['bias','purpose']}],
 conflict:[
  {s:"The ___ between the two villages over water rights has lasted for generations.",he:"הסכסוך בין שני הכפרים על זכויות המים נמשך כבר דורות.",near:['barrier','consequence']},
  {s:"Her new job created a ___ between her career and her family life.",he:"עבודתה החדשה יצרה עימות בין הקריירה שלה לחיי המשפחה.",near:['bias','confidence']}],
 consequence:[
  {s:"The closure of the mine had one unexpected ___: the river became clean again.",he:"לסגירת המכרה הייתה תוצאה בלתי צפויה אחת: הנהר נעשה שוב נקי.",near:['purpose','conflict']},
  {s:"As a ___ of the drought, food prices rose by nearly thirty percent.",he:"כתוצאה מהבצורת, מחירי המזון עלו בכמעט שלושים אחוז.",near:['barrier','access']}],
 considerable:[
  {s:"Building the tunnel required a ___ amount of money and more than ten years of work.",he:"בניית המנהרה דרשה סכום כסף ניכר ויותר מעשר שנות עבודה.",near:['adequate','constant']},
  {s:"The new law caused ___ anger among small business owners.",he:"החוק החדש עורר כעס ניכר בקרב בעלי עסקים קטנים.",near:['apparent','brief']}],
 consist:[
  {s:"The committee will ___ of three judges and two representatives of the public.",he:"הוועדה תהיה מורכבת משלושה שופטים ושני נציגי ציבור.",near:['contribute','conduct']},
  {s:"A healthy breakfast should ___ of fruit, whole grains, and some protein.",he:"ארוחת בוקר בריאה צריכה להיות מורכבת מפירות, דגנים מלאים ומעט חלבון.",near:['consume','convert']}],
 constant:[
  {s:"The machine must be kept at a ___ temperature or the results will be useless.",he:"יש לשמור את המכונה בטמפרטורה קבועה, אחרת התוצאות יהיו חסרות ערך.",near:['considerable','dense']},
  {s:"The ___ noise from the building site made it impossible to work at home.",he:"הרעש המתמיד מאתר הבנייה הפך את העבודה מהבית לבלתי אפשרית.",near:['brief','distinct']}],
 consume:[
  {s:"The average household in the region ___ about three hundred liters of water a day.",he:"משק בית ממוצע באזור צורך כשלוש מאות ליטר מים ביום.",near:['absorb','contribute']},
  {s:"Large trucks ___ far more fuel per kilometer than ordinary cars.",he:"משאיות גדולות צורכות הרבה יותר דלק לקילומטר מאשר מכוניות רגילות.",near:['convert','deprive']}],
 contribute:[
  {s:"Hundreds of local businesses ___ money to rebuild the school after the fire.",he:"מאות עסקים מקומיים תרמו כסף לבניית בית הספר מחדש אחרי השריפה.",near:['compensate','commit']},
  {s:"Poor diet and lack of exercise both ___ to heart disease.",he:"תזונה לקויה וחוסר בפעילות גופנית תורמים שניהם למחלות לב.",near:['consist','derive']}],
 convert:[
  {s:"The old railway station was ___ into a museum of local history.",he:"תחנת הרכבת הישנה הוסבה למוזיאון להיסטוריה מקומית.",near:['alter','adapt']},
  {s:"Solar panels ___ sunlight directly into electricity.",he:"פאנלים סולאריים הופכים אור שמש ישירות לחשמל.",near:['consume','distribute']}],
 cope:[
  {s:"The small hospital could not ___ with the hundreds of injured people brought in after the earthquake.",he:"בית החולים הקטן לא הצליח להתמודד עם מאות הפצועים שהובאו אחרי רעידת האדמה.",near:['comprehend','conduct']},
  {s:"Some children ___ with stress by talking to friends; others prefer to be alone.",he:"ילדים אחדים מתמודדים עם לחץ על ידי שיחה עם חברים; אחרים מעדיפים להיות לבד.",near:['adapt','compensate']}],
 crucial:[
  {s:"The first few hours after a stroke are ___ for the patient's recovery.",he:"השעות הראשונות אחרי שבץ הן קריטיות להחלמת המטופל.",near:['considerable','dominant']},
  {s:"Timing is ___ when planting rice: a week too early or too late can ruin the crop.",he:"התזמון מכריע בזריעת אורז: שבוע מוקדם או מאוחר מדי עלול להרוס את היבול.",near:['apparent','distinct']}],
 decline:[
  {s:"The number of farms in the valley has continued to ___ since the 1970s.",he:"מספר החוות בעמק המשיך לרדת מאז שנות השבעים.",near:['cease','reduce']},
  {s:"She politely ___ the invitation, explaining that she had to work that evening.",he:"היא סירבה בנימוס להזמנה והסבירה שעליה לעבוד באותו ערב.",near:['abandon','deprive']}],
 dedicate:[
  {s:"The scientist ___ the last twenty years of her life to finding a cure for the disease.",he:"המדענית הקדישה את עשרים השנים האחרונות של חייה למציאת תרופה למחלה.",near:['commit','contribute']},
  {s:"The new hospital wing was ___ to the memory of the doctor who founded the clinic.",he:"האגף החדש של בית החולים הוקדש לזכרו של הרופא שייסד את המרפאה.",near:['assign','distribute']}],
 demonstrate:[
  {s:"The experiment ___ that plants grow faster when exposed to certain kinds of music.",he:"הניסוי הדגים שצמחים גדלים מהר יותר כשהם נחשפים לסוגים מסוימים של מוזיקה.",near:['determine','detect']},
  {s:"The salesman offered to ___ how the machine worked before we bought it.",he:"איש המכירות הציע להדגים כיצד המכונה פועלת לפני שקנינו אותה.",near:['analyze','conduct']}],
 dense:[
  {s:"The forest was so ___ that sunlight barely reached the ground.",he:"היער היה כל כך צפוף עד שאור השמש בקושי הגיע לקרקע.",near:['considerable','constant']},
  {s:"A ___ fog covered the harbor, and the ferries could not leave.",he:"ערפל סמיך כיסה את הנמל, והמעבורות לא יכלו לצאת.",near:['distinct','brief']}],
 deprive:[
  {s:"The long drought ___ thousands of farmers of their only source of income.",he:"הבצורת הארוכה שללה מאלפי חקלאים את מקור הפרנסה היחיד שלהם.",near:['reduce','prohibit']},
  {s:"Prisoners must not be ___ of food or medical care, whatever their crime.",he:"אין למנוע מאסירים מזון או טיפול רפואי, יהיה פשעם אשר יהיה.",near:['decline','cease']}],
 derive:[
  {s:"Many English words ___ from Latin and Greek.",he:"מילים רבות באנגלית נובעות מלטינית ומיוונית.",near:['distribute','detect']},
  {s:"The company ___ most of its income from selling software to hospitals.",he:"החברה מפיקה את רוב הכנסתה ממכירת תוכנה לבתי חולים.",near:['consume','contribute']}],
 detect:[
  {s:"Dogs can ___ certain diseases by smell long before doctors notice any symptoms.",he:"כלבים יכולים לגלות מחלות מסוימות באמצעות ריח הרבה לפני שרופאים מבחינים בתסמינים.",near:['determine','demonstrate']},
  {s:"The new instrument can ___ tiny movements in the ground days before an earthquake.",he:"המכשיר החדש יכול לאתר תנועות זעירות בקרקע ימים לפני רעידת אדמה.",near:['analyze','anticipate']}],
 determine:[
  {s:"Investigators are still trying to ___ what caused the plane to crash.",he:"החוקרים עדיין מנסים לקבוע מה גרם למטוס להתרסק.",near:['detect','demonstrate']},
  {s:"The size of the harvest will ___ how much the farmers can charge for their grain.",he:"גודל היבול יקבע כמה החקלאים יוכלו לגבות עבור התבואה שלהם.",near:['assess','conclude']}],
 devote:[
  {s:"The retired teacher ___ most of her free time to helping immigrants learn the language.",he:"המורה בגמלאות מקדישה את רוב זמנה הפנוי לעזרה למהגרים ללמוד את השפה.",near:['contribute','assign']},
  {s:"The museum has ___ an entire floor to the history of the local textile industry.",he:"המוזיאון הקדיש קומה שלמה להיסטוריה של תעשיית הטקסטיל המקומית.",near:['distribute','convert']}],
 distinct:[
  {s:"The two species look alike, but they have ___ calls that experts can tell apart.",he:"שני המינים נראים דומים, אבל יש להם קריאות נבדלות שמומחים יכולים להבחין ביניהן.",near:['diverse','dominant']},
  {s:"There was a ___ smell of gas in the kitchen, so we opened all the windows.",he:"היה ריח מובחן של גז במטבח, אז פתחנו את כל החלונות.",near:['dense','constant']}],
 distribute:[
  {s:"Volunteers will ___ food and blankets to the families camped outside the town.",he:"מתנדבים יחלקו מזון ושמיכות למשפחות שחונות מחוץ לעיירה.",near:['assign','contribute']},
  {s:"The company plans to ___ its new soft drink in more than forty countries.",he:"החברה מתכננת להפיץ את המשקה הקל החדש שלה ביותר מארבעים מדינות.",near:['convert','consume']}],
 diverse:[
  {s:"The city's population is remarkably ___, with residents from more than ninety countries.",he:"אוכלוסיית העיר מגוונת להפליא, עם תושבים מיותר מתשעים מדינות.",near:['distinct','dense']},
  {s:"The island's ___ wildlife includes species found nowhere else on earth.",he:"עולם החי המגוון של האי כולל מינים שאינם נמצאים בשום מקום אחר על פני כדור הארץ.",near:['dominant','considerable']}],
 dominant:[
  {s:"For most of the twentieth century, coal was the ___ source of energy in the region.",he:"במשך רוב המאה העשרים, הפחם היה מקור האנרגיה השולט באזור.",near:['distinct','crucial']},
  {s:"In wolf packs, the ___ male usually eats before the others.",he:"בלהקות זאבים, הזכר הדומיננטי אוכל בדרך כלל לפני האחרים.",near:['capable','diverse']}],
 // ===== מנה 2 — מילים מהבחינות (חלק א') =====
 source:[
  {s:"The river is the main ___ of drinking water for three large cities.",he:"הנהר הוא המקור העיקרי למי שתייה עבור שלוש ערים גדולות.",near:['core','outlet']},
  {s:"The reporter refused to reveal the ___ of the leaked documents.",he:"הכתב סירב לחשוף את המקור של המסמכים שדלפו.",near:['identity','factor']}],
 beyond:[
  {s:"The old radio was damaged ___ repair, so we had to throw it away.",he:"הרדיו הישן ניזוק מעבר לתיקון, אז נאלצנו לזרוק אותו.",near:['despite','aside from']},
  {s:"The mountains ___ the lake are covered with snow for most of the year.",he:"ההרים שמעבר לאגם מכוסים בשלג רוב השנה.",near:['due to','regardless of']}],
 entirely:[
  {s:"The village was ___ destroyed by the flood; not a single house remained standing.",he:"הכפר נהרס לחלוטין בשיטפון; אף בית לא נותר עומד.",near:['merely','occasionally']},
  {s:"Her success was ___ due to hard work, not to luck or family connections.",he:"הצלחתה נבעה לחלוטין מעבודה קשה, לא ממזל או מקשרים משפחתיים.",near:['eventually','merely']}],
 device:[
  {s:"The doctor implanted a small ___ that keeps the patient's heart beating regularly.",he:"הרופא השתיל מכשיר קטן ששומר על פעימות לב סדירות אצל המטופל.",near:['technique','substance']},
  {s:"Passengers must switch off every electronic ___ before the plane takes off.",he:"הנוסעים חייבים לכבות כל מכשיר אלקטרוני לפני שהמטוס ממריא.",near:['outlet','property']}],
 phrase:[
  {s:"The ___ \"time is money\" is often used to explain why businesses value speed.",he:"הביטוי \"זמן הוא כסף\" משמש לעיתים קרובות כדי להסביר מדוע עסקים מעריכים מהירות.",near:['technique','identity']},
  {s:"Learners should memorize whole ___ rather than isolated words.",he:"לומדים צריכים לשנן ביטויים שלמים ולא מילים בודדות.",near:['substance','origin']}],
 income:[
  {s:"Families whose ___ falls below a certain level receive help with their heating bills.",he:"משפחות שהכנסתן נופלת מתחת לרמה מסוימת מקבלות עזרה בחשבונות החימום.",near:['expense','fund']},
  {s:"For most of the villagers, fishing is the only source of ___.",he:"עבור רוב תושבי הכפר, דיג הוא מקור ההכנסה היחיד.",near:['loan','trade']}],
 fortune:[
  {s:"The family made its ___ in the shipping trade during the nineteenth century.",he:"המשפחה עשתה את הונה בסחר הימי במהלך המאה התשע עשרה.",near:['income','fund']},
  {s:"By sheer good ___, the last passenger to board the ship survived the wreck.",he:"במזל טוב בלבד, הנוסע האחרון שעלה על הספינה שרד את הטביעה.",near:['expense','revenue']}],
 characteristic:[
  {s:"Curiosity is a ___ shared by almost all successful scientists.",he:"סקרנות היא תכונה שמשותפת כמעט לכל המדענים המצליחים.",near:['identity','appearance']},
  {s:"The most striking ___ of the new building is its glass roof.",he:"המאפיין הבולט ביותר של הבניין החדש הוא גג הזכוכית שלו.",near:['origin','factor']}],
 clarify:[
  {s:"The company issued a statement to ___ its position on the proposed merger.",he:"החברה פרסמה הצהרה כדי להבהיר את עמדתה לגבי המיזוג המוצע.",near:['confirm','depict']},
  {s:"Could you ___ what you mean by \"soon\"? Next week, or next month?",he:"תוכל להבהיר למה אתה מתכוון ב\"בקרוב\"? בשבוע הבא, או בחודש הבא?",near:['revise','imply']}],
 reservation:[
  {s:"The committee approved the plan, but several members expressed ___ about its cost.",he:"הוועדה אישרה את התוכנית, אבל כמה חברים הביעו הסתייגות לגבי עלותה.",near:['disapproval','exception']},
  {s:"We made a ___ for six people at the restaurant for eight o'clock.",he:"עשינו הזמנה מראש לשישה אנשים במסעדה לשעה שמונה.",near:['errand','precaution']}],
 shrink:[
  {s:"The lake has continued to ___ as farmers take more water for their fields.",he:"האגם המשיך להתכווץ ככל שהחקלאים לוקחים יותר מים לשדותיהם.",near:['dwindle','descend']},
  {s:"Wash the shirt in cold water, or it will ___ to half its size.",he:"כבס את החולצה במים קרים, אחרת היא תתכווץ לחצי מגודלה.",near:['collide','retreat']}],
 prolonged:[
  {s:"After a ___ silence, the witness finally began to describe what she had seen.",he:"אחרי שתיקה ממושכת, העדה החלה לבסוף לתאר את מה שראתה.",near:['permanent','frequent']},
  {s:"A ___ drought forced the farmers to sell most of their cattle.",he:"בצורת ממושכת אילצה את החקלאים למכור את רוב הבקר שלהם.",near:['rapid','excessive']}],
 remote:[
  {s:"Doctors travel by helicopter to reach patients in the most ___ villages of the north.",he:"רופאים נוסעים במסוק כדי להגיע לחולים בכפרים המרוחקים ביותר בצפון.",near:['domestic','native']},
  {s:"The chance of the two brothers meeting again after fifty years seemed ___.",he:"הסיכוי ששני האחים ייפגשו שוב אחרי חמישים שנה נראה קלוש.",near:['random','definite']}],
 thorough:[
  {s:"Before the flight, the mechanics carry out a ___ inspection of every engine.",he:"לפני הטיסה, המכונאים מבצעים בדיקה יסודית של כל מנוע.",near:['rapid','frequent']},
  {s:"The detective's ___ search of the apartment revealed a hidden safe.",he:"החיפוש היסודי של הבלש בדירה חשף כספת נסתרת.",near:['broad','strict']}],
 era:[
  {s:"The arrival of the internet marked the beginning of a new ___ in communication.",he:"הגעת האינטרנט סימנה את תחילתו של עידן חדש בתקשורת.",near:['phenomenon','origin']},
  {s:"The castle was built in an ___ when every town needed walls to protect itself.",he:"הטירה נבנתה בתקופה שבה כל עיר נזקקה לחומות כדי להגן על עצמה.",near:['regime','trade']}],
 absence:[
  {s:"In the ___ of the manager, her assistant will sign the documents.",he:"בהיעדר המנהלת, העוזרת שלה תחתום על המסמכים.",near:['exception','oversight']},
  {s:"The complete ___ of birds on the island puzzled the scientists.",he:"ההיעדר המוחלט של ציפורים באי הפליא את המדענים.",near:['glimpse','proportion']}],
 scarce:[
  {s:"Jobs are so ___ in the region that many young people move to the capital.",he:"מקומות עבודה נדירים כל כך באזור עד שצעירים רבים עוברים לבירה.",near:['remote','modest']},
  {s:"During the war, sugar and coffee became ___ and were sold at enormous prices.",he:"במהלך המלחמה, סוכר וקפה נעשו נדירים ונמכרו במחירים עצומים.",near:['excessive','random']}],
 voice:[
  {s:"Several parents used the meeting to ___ their concern about the new timetable.",he:"כמה הורים ניצלו את הפגישה כדי להביע את דאגתם לגבי מערכת השעות החדשה.",near:['depict','clarify']},
  {s:"Employees who ___ criticism of the company should not fear losing their jobs.",he:"עובדים שמביעים ביקורת על החברה לא צריכים לחשוש לאבד את עבודתם.",near:['imply','resent']}],
 unrest:[
  {s:"The sudden rise in fuel prices led to weeks of ___ in the capital.",he:"העלייה הפתאומית במחירי הדלק הובילה לשבועות של תסיסה בבירה.",near:['disapproval','hazard']},
  {s:"Political ___ in the region has frightened away most foreign investors.",he:"אי-השקט הפוליטי באזור הבריח את רוב המשקיעים הזרים.",near:['dilemma','burden']}],
 depict:[
  {s:"The painting ___ a group of fishermen returning to the harbor at sunset.",he:"הציור מתאר קבוצת דייגים שחוזרת לנמל בשקיעה.",near:['clarify','recognize']},
  {s:"The film ___ the general as a hero, although historians disagree.",he:"הסרט מציג את הגנרל כגיבור, אף על פי שהיסטוריונים חולקים על כך.",near:['imply','confirm']}],
 upbringing:[
  {s:"His strict religious ___ made it hard for him to accept his daughter's choices.",he:"החינוך הדתי הקפדני שקיבל בבית הקשה עליו לקבל את בחירות בתו.",near:['identity','appearance']},
  {s:"Psychologists still debate how much of our character is shaped by ___ rather than by genes.",he:"פסיכולוגים עדיין מתווכחים עד כמה אופיינו מעוצב על ידי החינוך בבית ולא על ידי הגנים.",near:['origin','factor']}],
 refuse:[
  {s:"The workers ___ to return to the mine until the safety problems were fixed.",he:"העובדים סירבו לחזור למכרה עד שבעיות הבטיחות יתוקנו.",near:['decline','resent']},
  {s:"The bank may ___ a loan to anyone who cannot show a regular income.",he:"הבנק עשוי לסרב לתת הלוואה לכל מי שאינו יכול להראות הכנסה קבועה.",near:['restrict','discard']}],
 wealthy:[
  {s:"Only ___ families could afford to send their children to university a century ago.",he:"רק משפחות עשירות יכלו להרשות לעצמן לשלוח את ילדיהן לאוניברסיטה לפני מאה שנה.",near:['affluent','profitable']},
  {s:"The ___ merchant left most of his money to the city's hospitals.",he:"הסוחר העשיר הוריש את רוב כספו לבתי החולים של העיר.",near:['prominent','superior']}],
 harmful:[
  {s:"Many cleaning products contain chemicals that are ___ if swallowed.",he:"מוצרי ניקוי רבים מכילים כימיקלים שמזיקים אם בולעים אותם.",near:['excessive','synthetic']},
  {s:"Too much sunlight can be ___ to the skin, especially in children.",he:"יותר מדי אור שמש עלול להזיק לעור, במיוחד אצל ילדים.",near:['intrusive','strict']}],
 branch:[
  {s:"The bank plans to close its smallest ___ in the villages and serve customers online.",he:"הבנק מתכנן לסגור את הסניפים הקטנים ביותר שלו בכפרים ולשרת לקוחות באינטרנט.",near:['outlet','property']},
  {s:"Genetics is a ___ of biology that studies how traits pass from parents to children.",he:"גנטיקה היא ענף של הביולוגיה שחוקר כיצד תכונות עוברות מהורים לילדים.",near:['fraction','core']}],
 policy:[
  {s:"The government's new ___ on immigration has been criticized by both sides of parliament.",he:"המדיניות החדשה של הממשלה בנושא הגירה ספגה ביקורת משני צידי הפרלמנט.",near:['reform','regime']},
  {s:"It is company ___ to answer every customer complaint within two working days.",he:"מדיניות החברה היא לענות על כל תלונת לקוח בתוך שני ימי עבודה.",near:['technique','precaution']}],
 complex:[
  {s:"The human brain is far more ___ than any computer ever built.",he:"המוח האנושי מורכב הרבה יותר מכל מחשב שנבנה אי פעם.",near:['broad','thorough']},
  {s:"The rules of the game are so ___ that beginners need several weeks to learn them.",he:"כללי המשחק כל כך מורכבים עד שמתחילים צריכים כמה שבועות כדי ללמוד אותם.",near:['definite','strict']}],
 technique:[
  {s:"Surgeons have developed a new ___ that allows the operation to be done through a tiny cut.",he:"מנתחים פיתחו טכניקה חדשה שמאפשרת לבצע את הניתוח דרך חתך זעיר.",near:['device','policy']},
  {s:"The pianist's ___ was perfect, but her playing lacked feeling.",he:"הטכניקה של הפסנתרנית הייתה מושלמת, אבל נגינתה הייתה חסרת רגש.",near:['characteristic','identity']}],
 pollute:[
  {s:"Chemicals from the factory ___ the river for decades before anyone protested.",he:"כימיקלים מהמפעל זיהמו את הנהר במשך עשרות שנים לפני שמישהו מחה.",near:['collide','discard']},
  {s:"Old diesel buses ___ the air of the city far more than modern electric ones.",he:"אוטובוסי דיזל ישנים מזהמים את אוויר העיר הרבה יותר מאוטובוסים חשמליים מודרניים.",near:['generate','restrict']}],
 agriculture:[
  {s:"Nearly half of the country's workers are still employed in ___.",he:"כמעט מחצית מעובדי המדינה עדיין מועסקים בחקלאות.",near:['trade','property']},
  {s:"The invention of ___ allowed people to settle in one place instead of following herds.",he:"המצאת החקלאות אפשרה לאנשים להתיישב במקום אחד במקום לעקוב אחרי עדרים.",near:['revenue','mainstay']}],
 eventually:[
  {s:"After years of failure, the inventor ___ succeeded in building a machine that flew.",he:"אחרי שנים של כישלונות, הממציא הצליח בסופו של דבר לבנות מכונה שעפה.",near:['occasionally','merely']},
  {s:"The search went on for three days, and the missing boy was ___ found asleep in a barn.",he:"החיפוש נמשך שלושה ימים, והילד הנעדר נמצא בסופו של דבר ישן באסם.",near:['entirely','occasionally']}],
 enable:[
  {s:"The new bridge will ___ farmers to reach the market in less than an hour.",he:"הגשר החדש יאפשר לחקלאים להגיע לשוק בפחות משעה.",near:['generate','launch']},
  {s:"Modern hearing aids ___ many deaf children to attend ordinary schools.",he:"מכשירי שמיעה מודרניים מאפשרים לילדים חירשים רבים ללמוד בבתי ספר רגילים.",near:['involve','preserve']}],
 impact:[
  {s:"Economists are still measuring the ___ of the new tax on small businesses.",he:"כלכלנים עדיין מודדים את ההשפעה של המס החדש על עסקים קטנים.",near:['factor','exposure']},
  {s:"The ___ of the collision threw both drivers out of their cars.",he:"עוצמת ההתנגשות העיפה את שני הנהגים ממכוניותיהם.",near:['hazard','proportion']}],
 expense:[
  {s:"Heating is the largest single ___ for most families in the north during winter.",he:"החימום הוא ההוצאה הבודדת הגדולה ביותר עבור רוב המשפחות בצפון בחורף.",near:['income','loan']},
  {s:"The company covers the travel ___ of employees who attend conferences abroad.",he:"החברה מכסה את הוצאות הנסיעה של עובדים שמשתתפים בכנסים בחו\"ל.",near:['revenue','fund']}],
 profitable:[
  {s:"Selling bottled water turned out to be far more ___ than anyone had expected.",he:"מכירת מים בבקבוקים התבררה כרווחית הרבה יותר ממה שמישהו ציפה.",near:['wealthy','affluent']},
  {s:"The airline closed several routes that were no longer ___.",he:"חברת התעופה סגרה כמה קווים שכבר לא היו רווחיים.",near:['superior','permanent']}],
 origin:[
  {s:"Scientists are still uncertain about the ___ of the mysterious radio signals.",he:"מדענים עדיין אינם בטוחים לגבי מקורם של אותות הרדיו המסתוריים.",near:['factor','identity']},
  {s:"The word \"algebra\" is of Arabic ___, although the subject is much older.",he:"המילה \"אלגברה\" היא ממוצא ערבי, אף שהתחום עצמו עתיק בהרבה.",near:['era','characteristic']}],
 interrupt:[
  {s:"Please do not ___ the speaker; there will be time for questions at the end.",he:"אנא אל תפריעו לדובר; יהיה זמן לשאלות בסוף.",near:['obstruct','restrict']},
  {s:"A power failure ___ the concert for nearly twenty minutes.",he:"הפסקת חשמל קטעה את הקונצרט לכמעט עשרים דקות.",near:['eliminate','retreat']}],
 involve:[
  {s:"The job will ___ a great deal of travel, mostly to Asia.",he:"העבודה תכלול נסיעות רבות, בעיקר לאסיה.",near:['enable','generate']},
  {s:"The police believe that at least four people were ___ in planning the robbery.",he:"המשטרה מאמינה שלפחות ארבעה אנשים היו מעורבים בתכנון השוד.",near:['classify','recognize']}],
 embarrass:[
  {s:"The senator's remarks ___ his party just days before the election.",he:"הערותיו של הסנטור הביכו את מפלגתו ימים ספורים לפני הבחירות.",near:['intimidate','interrupt']},
  {s:"Teenagers are easily ___ when their parents talk about them in public.",he:"בני נוער נבוכים בקלות כשהוריהם מדברים עליהם בפומבי.",near:['satisfy','involve']}],
 explore:[
  {s:"The expedition was sent to ___ the unmapped interior of the island.",he:"המשלחת נשלחה לחקור את פנים האי שטרם מופה.",near:['wander','supervise']},
  {s:"Before choosing a career, students should ___ several different fields.",he:"לפני בחירת קריירה, סטודנטים צריכים לחקור כמה תחומים שונים.",near:['launch','classify']}],
 relevant:[
  {s:"The judge ruled that the letters were not ___ to the case and could not be shown to the jury.",he:"השופט פסק שהמכתבים אינם רלוונטיים לתיק ואי אפשר להציגם לחבר המושבעים.",near:['appropriate','definite']},
  {s:"Please include only the ___ facts in your report; leave out the background.",he:"אנא כלול בדוח רק את העובדות השייכות לעניין; השמט את הרקע.",near:['principal','literal']}],
 exposure:[
  {s:"Long ___ to the sun without protection greatly increases the risk of skin cancer.",he:"חשיפה ממושכת לשמש ללא הגנה מגדילה מאוד את הסיכון לסרטן העור.",near:['hazard','substance']},
  {s:"The young actress gained national ___ after appearing in a popular television series.",he:"השחקנית הצעירה זכתה לחשיפה ארצית אחרי שהופיעה בסדרת טלוויזיה פופולרית.",near:['appearance','identity']}],
 substance:[
  {s:"Scientists identified the white ___ found in the packages as a common painkiller.",he:"מדענים זיהו את החומר הלבן שנמצא בחבילות כמשכך כאבים נפוץ.",near:['device','property']},
  {s:"The minister's speech was long, but it contained very little ___.",he:"נאום השר היה ארוך, אבל הוא הכיל מעט מאוד תוכן של ממש.",near:['phrase','fraction']}],
 permanent:[
  {s:"The accident left him with a ___ injury to his right hand.",he:"התאונה הותירה אותו עם פגיעה קבועה ביד ימין.",near:['prolonged','frequent']},
  {s:"After two years of temporary contracts, she was finally offered a ___ position.",he:"אחרי שנתיים של חוזים זמניים, סוף סוף הוצעה לה משרה קבועה.",near:['secure','definite']}],
 widespread:[
  {s:"The use of mobile phones has become so ___ that public telephones have almost disappeared.",he:"השימוש בטלפונים ניידים נעשה כה נפוץ עד שטלפונים ציבוריים כמעט נעלמו.",near:['broad','frequent']},
  {s:"There was ___ anger when the government announced the new tax.",he:"היה כעס נרחב כשהממשלה הכריזה על המס החדש.",near:['excessive','prominent']}],
 launch:[
  {s:"The company will ___ its new electric car at the motor show in Geneva.",he:"החברה תשיק את מכוניתה החשמלית החדשה בתערוכת הרכב בז'נבה.",near:['manufacture','generate']},
  {s:"The charity ___ a campaign to collect warm clothing for refugees.",he:"הארגון השיק מסע לאיסוף בגדים חמים לפליטים.",near:['initiate','involve']}],
 occasionally:[
  {s:"He ___ visits his old school, but most of the teachers he knew have retired.",he:"הוא מבקר מדי פעם בבית ספרו הישן, אבל רוב המורים שהכיר פרשו.",near:['eventually','merely']},
  {s:"The river floods ___, usually after very heavy spring rains.",he:"הנהר עולה על גדותיו מדי פעם, בדרך כלל אחרי גשמי אביב כבדים מאוד.",near:['entirely','eventually']}],
 manufacture:[
  {s:"The factory will ___ about ten thousand bicycles a year for export.",he:"המפעל ייצר כעשרת אלפים אופניים בשנה לייצוא.",near:['launch','discard']},
  {s:"The company stopped ___ typewriters when computers became cheap.",he:"החברה הפסיקה לייצר מכונות כתיבה כשהמחשבים נעשו זולים.",near:['exchange','preserve']}],
 principal:[
  {s:"The ___ reason for the delay was a shortage of building materials.",he:"הסיבה העיקרית לעיכוב הייתה מחסור בחומרי בנייה.",near:['sole','prominent']},
  {s:"Tourism is the ___ source of income for most of the islands.",he:"תיירות היא מקור ההכנסה העיקרי של רוב האיים.",near:['superior','relative']}],
 regime:[
  {s:"The old ___ collapsed within weeks once the army refused to support it.",he:"המשטר הישן קרס בתוך שבועות ברגע שהצבא סירב לתמוך בו.",near:['policy','reform']},
  {s:"Under the new ___, newspapers were free to criticize the government for the first time.",he:"תחת המשטר החדש, עיתונים היו חופשיים לבקר את הממשלה לראשונה.",near:['era','trade']}],
 disapproval:[
  {s:"The crowd expressed its ___ of the referee's decision with loud whistles.",he:"הקהל הביע את אי-הסכמתו להחלטת השופט בשריקות רמות.",near:['reservation','unrest']},
  {s:"She could see the ___ in her father's eyes when she announced her plans.",he:"היא ראתה את אי-ההסכמה בעיני אביה כשהכריזה על תוכניותיה.",near:['dilemma','burden']}],
 domestic:[
  {s:"The airline operates mainly ___ flights, with only two routes abroad.",he:"חברת התעופה מפעילה בעיקר טיסות פנים-ארציות, עם שני קווים בלבד לחו\"ל.",near:['native','remote']},
  {s:"Cats were among the first animals to become ___, living alongside humans for thousands of years.",he:"חתולים היו בין בעלי החיים הראשונים שבויתו, וחיים לצד בני אדם כבר אלפי שנים.",near:['mature','secure']}],
 reform:[
  {s:"The new government promised a complete ___ of the tax system within two years.",he:"הממשלה החדשה הבטיחה רפורמה מלאה במערכת המס בתוך שנתיים.",near:['policy','regime']},
  {s:"Teachers welcomed the ___ that reduced class sizes to twenty-five students.",he:"המורים בירכו על הרפורמה שהקטינה את הכיתות לעשרים וחמישה תלמידים.",near:['precaution','technique']}],
 sole:[
  {s:"After the accident, she became the ___ support of her three younger brothers.",he:"אחרי התאונה, היא הפכה לתומכת היחידה של שלושת אחיה הצעירים.",near:['principal','prominent']},
  {s:"The ___ survivor of the crash was a six-year-old girl.",he:"הניצולה היחידה מההתרסקות הייתה ילדה בת שש.",near:['definite','superior']}],
 persist:[
  {s:"If the pain ___ for more than three days, you should see a doctor.",he:"אם הכאב נמשך יותר משלושה ימים, כדאי לפנות לרופא.",near:['preserve','retreat']},
  {s:"Despite repeated failures, the researchers ___ in their search for a cure.",he:"למרות כישלונות חוזרים, החוקרים התמידו בחיפושם אחר תרופה.",near:['resume','involve']}],
 superior:[
  {s:"The new material is ___ to steel in both strength and weight.",he:"החומר החדש עדיף על פלדה הן בחוזק והן במשקל.",near:['principal','profitable']},
  {s:"She refused to take orders from anyone she did not consider her ___ in rank.",he:"היא סירבה לקבל פקודות ממי שלא נחשב בעיניה בכיר ממנה בדרגה.",near:['prominent','mature']}],
 phenomenon:[
  {s:"The northern lights are a natural ___ caused by particles from the sun.",he:"הזוהר הצפוני הוא תופעה טבעית שנגרמת מחלקיקים מהשמש.",near:['factor','hazard']},
  {s:"Online shopping is a relatively recent ___, but it has already changed the way cities look.",he:"קניות באינטרנט הן תופעה חדשה יחסית, אבל הן כבר שינו את מראה הערים.",near:['era','origin']}],
 vital:[
  {s:"Bees play a ___ role in agriculture by carrying pollen from flower to flower.",he:"דבורים ממלאות תפקיד חיוני בחקלאות בכך שהן נושאות אבקה מפרח לפרח.",near:['crucial','prominent']},
  {s:"It is ___ that the medicine be kept cold; heat destroys it within hours.",he:"חיוני שהתרופה תישמר קרה; חום הורס אותה בתוך שעות.",near:['relevant','definite']}],
 fraction:[
  {s:"Only a small ___ of the money collected actually reached the victims.",he:"רק שבריר קטן מהכסף שנאסף הגיע בפועל לנפגעים.",near:['proportion','amount']},
  {s:"The new camera costs a ___ of what professional models cost ten years ago.",he:"המצלמה החדשה עולה שבריר ממה שעלו דגמים מקצועיים לפני עשר שנים.",near:['exception','core']}],
 merely:[
  {s:"The guard was not being rude; he was ___ following the instructions he had been given.",he:"השומר לא היה גס רוח; הוא רק מילא אחר ההוראות שקיבל.",near:['entirely','eventually']},
  {s:"What looked like a serious illness turned out to be ___ a bad cold.",he:"מה שנראה כמחלה רצינית התברר כסתם הצטננות קשה.",near:['occasionally','entirely']}],
 appeal:[
  {s:"The bright colors and simple design of the toy ___ to very young children.",he:"הצבעים הבהירים והעיצוב הפשוט של הצעצוע מושכים ילדים צעירים מאוד.",near:['satisfy','generate']},
  {s:"The mayor ___ to residents to use less water during the drought.",he:"ראש העיר פנה לתושבים בבקשה להשתמש בפחות מים במהלך הבצורת.",near:['persist','presume']}],
 credit:[
  {s:"Historians ___ the invention of paper to Chinese craftsmen of the second century.",he:"היסטוריונים זוקפים את המצאת הנייר לזכות אומנים סינים מהמאה השנייה.",near:['recognize','confirm']},
  {s:"The coach ___ the team's success to months of hard training rather than to luck.",he:"המאמן זקף את הצלחת הקבוצה לזכות חודשים של אימונים קשים ולא לזכות המזל.",near:['classify','presume']}],
 generate:[
  {s:"The new wind farm will ___ enough electricity for forty thousand homes.",he:"חוות הרוח החדשה תייצר מספיק חשמל לארבעים אלף בתים.",near:['enable','launch']},
  {s:"The festival ___ millions in income for local hotels and restaurants.",he:"הפסטיבל מפיק מיליונים בהכנסות למלונות ולמסעדות המקומיים.",near:['amass','preserve']}],
 native:[
  {s:"The kangaroo is ___ to Australia and is found nowhere else in the wild.",he:"הקנגורו הוא יליד אוסטרליה ואינו נמצא בטבע בשום מקום אחר.",near:['domestic','innate']},
  {s:"Although she has lived in France for thirty years, her ___ language is still Hebrew.",he:"אף על פי שהיא חיה בצרפת שלושים שנה, שפת האם שלה היא עדיין עברית.",near:['principal','literal']}],
 entrepreneur:[
  {s:"A young ___ turned a small bakery into a chain of two hundred shops.",he:"יזם צעיר הפך מאפייה קטנה לרשת של מאתיים חנויות.",near:['branch','trade']},
  {s:"The city offers cheap office space to any ___ willing to open a business downtown.",he:"העיר מציעה שטחי משרדים זולים לכל יזם שמוכן לפתוח עסק במרכז העיר.",near:['fund','property']}],
 necessity:[
  {s:"In the desert, a good supply of water is not a luxury but a ___.",he:"במדבר, אספקה טובה של מים אינה מותרות אלא הכרח.",near:['precaution','burden']},
  {s:"The ___ of cutting costs forced the company to close two of its factories.",he:"ההכרח לקצץ בעלויות אילץ את החברה לסגור שניים ממפעליה.",near:['dilemma','exception']}],
 preserve:[
  {s:"Salt was used for centuries to ___ meat and fish through the winter.",he:"מלח שימש במשך מאות שנים לשמר בשר ודגים לאורך החורף.",near:['persist','restrict']},
  {s:"The city council voted to ___ the old market instead of replacing it with offices.",he:"מועצת העיר הצביעה לשמר את השוק הישן במקום להחליפו במשרדים.",near:['revise','confirm']}],
 precaution:[
  {s:"As a ___ against fire, every hotel room is fitted with a smoke detector.",he:"כאמצעי זהירות מפני שריפה, כל חדר במלון מצויד בגלאי עשן.",near:['necessity','policy']},
  {s:"Climbers should take the ___ of telling someone their route before setting out.",he:"מטפסים צריכים לנקוט באמצעי הזהירות של יידוע מישהו על המסלול שלהם לפני היציאה.",near:['reservation','errand']}],
 literal:[
  {s:"The ___ meaning of the word is \"green,\" but it is often used to mean \"inexperienced.\"",he:"המשמעות המילולית של המילה היא \"ירוק\", אבל היא משמשת לעיתים קרובות במובן \"חסר ניסיון\".",near:['definite','relative']},
  {s:"A ___ translation of the poem loses all of its music and most of its meaning.",he:"תרגום מילולי של השיר מאבד את כל המוזיקליות שלו ואת רוב משמעותו.",near:['appropriate','thorough']}],
 supervise:[
  {s:"An experienced nurse will ___ the students during their first week on the ward.",he:"אחות מנוסה תפקח על הסטודנטים במהלך השבוע הראשון שלהם במחלקה.",near:['restrict','confirm']},
  {s:"Children under eight should not use the pool unless an adult is there to ___ them.",he:"ילדים מתחת לגיל שמונה לא צריכים להשתמש בבריכה אלא אם מבוגר נמצא שם כדי להשגיח עליהם.",near:['involve','recognize']}],
 spontaneous:[
  {s:"The applause was completely ___; nobody had asked the audience to stand.",he:"מחיאות הכפיים היו ספונטניות לחלוטין; איש לא ביקש מהקהל לעמוד.",near:['random','frequent']},
  {s:"Her ___ decision to take the earlier train probably saved her life.",he:"ההחלטה הספונטנית שלה לקחת את הרכבת המוקדמת יותר כנראה הצילה את חייה.",near:['sincere','rapid']}],
 wander:[
  {s:"Tourists who ___ away from the marked paths often get lost in the forest.",he:"תיירים שמשוטטים הרחק מהשבילים המסומנים הולכים לעיתים קרובות לאיבוד ביער.",near:['explore','descend']},
  {s:"Cows are allowed to ___ freely through the streets of the village.",he:"פרות מורשות לשוטט בחופשיות ברחובות הכפר.",near:['retreat','collide']}],
 proportion:[
  {s:"A large ___ of the city's budget is spent on public transport.",he:"חלק גדול מתקציב העיר מוצא על תחבורה ציבורית.",near:['fraction','amount']},
  {s:"The ___ of women in engineering has doubled over the past twenty years.",he:"שיעור הנשים בהנדסה הוכפל בעשרים השנים האחרונות.",near:['factor','exposure']}],
 // ===== מנה 2 — מילים מהבחינות (חלק ב') =====
 remarkable:[
  {s:"The patient made a ___ recovery and left the hospital only a week after the operation.",he:"המטופל החלים בצורה יוצאת דופן ועזב את בית החולים שבוע בלבד אחרי הניתוח.",near:['prominent','superior']},
  {s:"It is ___ that such a small country produces so many world-class athletes.",he:"מדהים שמדינה כה קטנה מצמיחה כל כך הרבה ספורטאים ברמה עולמית.",near:['frequent','definite']}],
 amass:[
  {s:"Over forty years, the collector managed to ___ more than ten thousand rare coins.",he:"במשך ארבעים שנה הצליח האספן לצבור יותר מעשרת אלפים מטבעות נדירים.",near:['generate','preserve']},
  {s:"The company ___ huge debts while trying to expand too quickly.",he:"החברה צברה חובות עצומים בניסיון להתרחב מהר מדי.",near:['discard','exchange']}],
 cognitive:[
  {s:"Regular exercise appears to slow the ___ decline that comes with old age.",he:"פעילות גופנית סדירה נראית כמאטה את הירידה השכלית שמגיעה עם הזקנה.",near:['conscious','mature']},
  {s:"Children with ___ difficulties may need more time to complete the test.",he:"ילדים עם קשיים קוגניטיביים עשויים להזדקק ליותר זמן כדי להשלים את המבחן.",near:['innate','literal']}],
 prominent:[
  {s:"Several ___ scientists signed a letter warning against the new law.",he:"כמה מדענים בולטים חתמו על מכתב שמזהיר מפני החוק החדש.",near:['superior','principal']},
  {s:"The church tower is the most ___ feature of the village skyline.",he:"מגדל הכנסייה הוא המאפיין הבולט ביותר בקו הרקיע של הכפר.",near:['broad','definite']}],
 coin:[
  {s:"The term \"black hole\" was ___ by a physicist in the 1960s.",he:"המונח \"חור שחור\" נטבע על ידי פיזיקאי בשנות השישים.",near:['launch','depict']},
  {s:"Advertisers ___ new words every year in the hope that they will catch on.",he:"מפרסמים טובעים מילים חדשות בכל שנה בתקווה שהן ייקלטו.",near:['classify','generate']}],
 presume:[
  {s:"Since no one has heard from the climbers for a month, they are ___ dead.",he:"מאחר שאיש לא שמע מהמטפסים כבר חודש, הם נחשבים כמתים.",near:['confirm','recognize']},
  {s:"I ___ you have already read the contract, so I will not go over it again.",he:"אני מניח שכבר קראת את החוזה, אז לא אעבור עליו שוב.",near:['imply','credit']}],
 mainstay:[
  {s:"Rice has been the ___ of the local diet for thousands of years.",he:"אורז הוא עמוד התווך של התזונה המקומית כבר אלפי שנים.",near:['core','origin']},
  {s:"For decades, the textile industry was the ___ of the town's economy.",he:"במשך עשרות שנים, תעשיית הטקסטיל הייתה עמוד התווך של כלכלת העיירה.",near:['branch','factor']}],
 dwindle:[
  {s:"The number of wild tigers has ___ to a few thousand across the whole of Asia.",he:"מספר הטיגריסים בטבע התמעט לכמה אלפים בכל רחבי אסיה.",near:['shrink','descend']},
  {s:"Support for the project ___ as its costs kept rising.",he:"התמיכה בפרויקט התמעטה ככל שעלויותיו המשיכו לעלות.",near:['retreat','discard']}],
 perpetrate:[
  {s:"The police believe the robbery was ___ by the same gang that struck last month.",he:"המשטרה מאמינה שהשוד בוצע על ידי אותה כנופיה שפעלה בחודש שעבר.",near:['collide','eliminate']},
  {s:"Those who ___ crimes against children face the heaviest penalties under the law.",he:"מי שמבצעים פשעים נגד ילדים עומדים בפני העונשים הכבדים ביותר על פי החוק.",near:['confirm','restrict']}],
 constitute:[
  {s:"Women now ___ more than half of all medical students in the country.",he:"נשים מהוות כיום יותר ממחצית מכלל הסטודנטים לרפואה במדינה.",near:['classify','involve']},
  {s:"Lying to a customs officer may ___ a criminal offense.",he:"שקר לפקיד מכס עלול להוות עבירה פלילית.",near:['generate','satisfy']}],
 innate:[
  {s:"Birds have an ___ ability to build nests without ever being taught.",he:"לציפורים יש יכולת מולדת לבנות קנים בלי שאי פעם לימדו אותן.",near:['native','spontaneous']},
  {s:"Some psychologists believe that a sense of fairness is ___ in humans.",he:"פסיכולוגים אחדים מאמינים שתחושת הוגנות היא מולדת בבני אדם.",near:['cognitive','mature']}],
 revenue:[
  {s:"Most of the museum's ___ comes from ticket sales and the gift shop.",he:"רוב ההכנסות של המוזיאון מגיעות ממכירת כרטיסים ומחנות המתנות.",near:['expense','fund']},
  {s:"The government hopes the new tax will raise ___ for hospitals and schools.",he:"הממשלה מקווה שהמס החדש יגייס הכנסות לבתי חולים ולבתי ספר.",near:['loan','trade']}],
 affluent:[
  {s:"The ___ suburbs in the north of the city have the best schools and the lowest crime.",he:"הפרברים האמידים בצפון העיר נהנים מבתי הספר הטובים ביותר ומהפשיעה הנמוכה ביותר.",near:['profitable','superior']},
  {s:"Even ___ families are finding it hard to pay the rising cost of university.",he:"אפילו משפחות אמידות מתקשות לשלם את עלות האוניברסיטה העולה.",near:['prominent','secure']}],
 discard:[
  {s:"Do not ___ the packaging until you are sure the machine works.",he:"אל תזרוק את האריזה עד שתהיה בטוח שהמכונה עובדת.",near:['release','replace']},
  {s:"The committee ___ the first plan and asked the architects for a cheaper one.",he:"הוועדה דחתה את התוכנית הראשונה וביקשה מהאדריכלים תוכנית זולה יותר.",near:['revise','restrict']}],
 glimpse:[
  {s:"From the train we caught a brief ___ of the castle before the tunnel swallowed us.",he:"מהרכבת הספקנו להציץ לרגע בטירה לפני שהמנהרה בלעה אותנו.",near:['appearance','exposure']},
  {s:"The letters give us a rare ___ into the daily life of a medieval merchant.",he:"המכתבים מעניקים לנו הצצה נדירה לחיי היומיום של סוחר מימי הביניים.",near:['identity','fraction']}],
 identity:[
  {s:"The police have not yet confirmed the ___ of the man found on the beach.",he:"המשטרה טרם אישרה את זהותו של האיש שנמצא על החוף.",near:['appearance','origin']},
  {s:"Many immigrants struggle to keep their cultural ___ while adapting to a new country.",he:"מהגרים רבים נאבקים לשמור על זהותם התרבותית תוך הסתגלות למדינה חדשה.",near:['characteristic','upbringing']}],
 appearance:[
  {s:"The doctor said that a change in the ___ of a mole should always be checked.",he:"הרופא אמר ששינוי במראה של שומה תמיד צריך להיבדק.",near:['identity','exposure']},
  {s:"The singer's ___ at the festival was her first concert in five years.",he:"הופעת הזמרת בפסטיבל הייתה הקונצרט הראשון שלה זה חמש שנים.",near:['glimpse','errand']}],
 satisfy:[
  {s:"A single well could not ___ the water needs of the growing village.",he:"באר אחת לא יכלה לספק את צורכי המים של הכפר הגדל.",near:['release','enable']},
  {s:"The company's explanation failed to ___ the angry customers.",he:"ההסבר של החברה לא הצליח להשביע את רצון הלקוחות הזועמים.",near:['confirm','embarrass']}],
 release:[
  {s:"The zoo plans to ___ the young eagles into the wild next spring.",he:"גן החיות מתכנן לשחרר את הנשרים הצעירים לטבע באביב הבא.",near:['discard','launch']},
  {s:"The government will ___ the full report only after the investigation is complete.",he:"הממשלה תפרסם את הדוח המלא רק אחרי שהחקירה תושלם.",near:['confirm','revise']}],
 exchange:[
  {s:"The two schools ___ students every summer so that each group can learn the other's language.",he:"שני בתי הספר מחליפים תלמידים בכל קיץ כדי שכל קבוצה תלמד את שפת האחרת.",near:['release','distribute']},
  {s:"The shop will ___ the shoes for a larger size if you bring the receipt.",he:"החנות תחליף את הנעליים למידה גדולה יותר אם תביא את הקבלה.",near:['discard','revise']}],
 rapid:[
  {s:"The ___ growth of the city has left its roads and hospitals unable to cope.",he:"הצמיחה המהירה של העיר הותירה את כבישיה ובתי החולים שלה ללא יכולת להתמודד.",near:['frequent','broad']},
  {s:"Thanks to ___ treatment, the patient suffered no permanent damage from the stroke.",he:"הודות לטיפול מהיר, המטופל לא סבל מנזק קבוע מהשבץ.",near:['spontaneous','thorough']}],
 trade:[
  {s:"The port grew rich on the ___ in spices between India and Europe.",he:"הנמל התעשר מהסחר בתבלינים בין הודו לאירופה.",near:['revenue','property']},
  {s:"Free ___ between the two countries has doubled since the agreement was signed.",he:"הסחר החופשי בין שתי המדינות הוכפל מאז שנחתם ההסכם.",near:['fund','agriculture']}],
 strict:[
  {s:"The school has ___ rules about mobile phones: they must stay in lockers all day.",he:"לבית הספר יש כללים קפדניים לגבי טלפונים ניידים: הם חייבים להישאר בלוקרים כל היום.",near:['thorough','definite']},
  {s:"The laboratory keeps ___ control over the temperature of every sample.",he:"המעבדה שומרת על פיקוח קפדני על הטמפרטורה של כל דגימה.",near:['secure','excessive']}],
 random:[
  {s:"The inspectors choose a ___ sample of products from each shipment to test.",he:"הפקחים בוחרים מדגם אקראי של מוצרים מכל משלוח כדי לבדוק.",near:['spontaneous','relative']},
  {s:"The numbers appeared in no particular order; they seemed completely ___.",he:"המספרים הופיעו ללא סדר מסוים; הם נראו אקראיים לחלוטין.",near:['definite','frequent']}],
 factor:[
  {s:"Cost was the deciding ___ in the family's choice of a smaller apartment.",he:"העלות הייתה הגורם המכריע בבחירת המשפחה בדירה קטנה יותר.",near:['proportion','impact']},
  {s:"Diet is only one ___ among many that affect how long people live.",he:"תזונה היא רק גורם אחד מני רבים שמשפיעים על אורך חיי האדם.",near:['phenomenon','core']}],
 broad:[
  {s:"The river is so ___ at this point that the far bank is barely visible.",he:"הנהר כל כך רחב בנקודה הזאת שהגדה הרחוקה בקושי נראית.",near:['widespread','dense']},
  {s:"The course gives students a ___ introduction to economics before they specialize.",he:"הקורס נותן לסטודנטים מבוא רחב לכלכלה לפני שהם מתמחים.",near:['thorough','complex']}],
 replace:[
  {s:"The city plans to ___ its old diesel buses with electric ones within five years.",he:"העיר מתכננת להחליף את אוטובוסי הדיזל הישנים שלה בחשמליים בתוך חמש שנים.",near:['revise','discard']},
  {s:"No machine can fully ___ a skilled teacher in the classroom.",he:"שום מכונה לא יכולה להחליף לחלוטין מורה מיומן בכיתה.",near:['eliminate','restrict']}],
 recognize:[
  {s:"After twenty years apart, the two sisters barely ___ each other at the station.",he:"אחרי עשרים שנות פרידה, שתי האחיות בקושי זיהו זו את זו בתחנה.",near:['confirm','classify']},
  {s:"The government finally ___ the small island as an independent state.",he:"הממשלה הכירה לבסוף באי הקטן כמדינה עצמאית.",near:['presume','credit']}],
 loan:[
  {s:"The couple took out a ___ from the bank to buy their first apartment.",he:"הזוג לקח הלוואה מהבנק כדי לקנות את דירתם הראשונה.",near:['fund','income']},
  {s:"The painting is on ___ to the museum from a private collector until June.",he:"הציור מושאל למוזיאון מאספן פרטי עד יוני.",near:['expense','property']}],
 ban:[
  {s:"The city introduced a ___ on cars in the old town during the summer months.",he:"העיר הנהיגה איסור על מכוניות בעיר העתיקה בחודשי הקיץ.",near:['precaution','policy']},
  {s:"The player received a two-year ___ from all international competitions.",he:"השחקן קיבל איסור השתתפות לשנתיים בכל התחרויות הבינלאומיות.",near:['burden','hazard']}],
 confirm:[
  {s:"The airline called to ___ that our flight would leave on time.",he:"חברת התעופה התקשרה לאמת שהטיסה שלנו תצא בזמן.",near:['presume','clarify']},
  {s:"Later experiments ___ the results of the original study.",he:"ניסויים מאוחרים יותר אימתו את תוצאות המחקר המקורי.",near:['recognize','revise']}],
 restrict:[
  {s:"The new law will ___ the sale of alcohol to people over the age of twenty-one.",he:"החוק החדש יגביל את מכירת האלכוהול לאנשים מעל גיל עשרים ואחת.",near:['eliminate','supervise']},
  {s:"Doctors advised him to ___ his intake of salt and sugar.",he:"הרופאים יעצו לו להגביל את צריכת המלח והסוכר שלו.",near:['discard','replace']}],
 eliminate:[
  {s:"The new vaccine could ___ the disease entirely within a generation.",he:"החיסון החדש עשוי לחסל את המחלה לחלוטין בתוך דור אחד.",near:['restrict','reduce']},
  {s:"The champion was ___ in the second round by an unknown teenager.",he:"האלוף הודח בסיבוב השני על ידי נער לא מוכר.",near:['release','replace']}],
 synthetic:[
  {s:"___ fibers such as nylon dry much faster than cotton or wool.",he:"סיבים סינתטיים כמו ניילון מתייבשים הרבה יותר מהר מכותנה או צמר.",near:['literal','random']},
  {s:"The company produces ___ diamonds that are almost impossible to tell from natural ones.",he:"החברה מייצרת יהלומים מלאכותיים שכמעט אי אפשר להבדיל בינם לטבעיים.",near:['harmful','innate']}],
 appropriate:[
  {s:"Jeans and sandals are not ___ clothing for a job interview at a bank.",he:"ג'ינס וסנדלים אינם לבוש הולם לריאיון עבודה בבנק.",near:['relevant','modest']},
  {s:"The teacher chose books that were ___ for children of eight or nine.",he:"המורה בחרה ספרים שמתאימים לילדים בני שמונה או תשע.",near:['definite','sincere']}],
 classify:[
  {s:"Biologists ___ whales as mammals, not fish, because they breathe air and feed their young milk.",he:"ביולוגים מסווגים לווייתנים כיונקים, לא כדגים, כי הם נושמים אוויר ומניקים את צאצאיהם.",near:['recognize','constitute']},
  {s:"The library ___ its books by subject rather than by the author's name.",he:"הספרייה מסווגת את ספריה לפי נושא ולא לפי שם המחבר.",near:['confirm','involve']}],
 modest:[
  {s:"Despite his fame, the scientist lived in a ___ apartment and drove an old car.",he:"למרות פרסומו, המדען חי בדירה צנועה ונהג במכונית ישנה.",near:['sincere','mature']},
  {s:"The company reported a ___ increase in sales, far below what investors had hoped for.",he:"החברה דיווחה על עלייה צנועה במכירות, הרבה מתחת למה שהמשקיעים קיוו.",near:['relative','excessive']}],
 hazard:[
  {s:"Loose wires in the old building were a serious fire ___.",he:"חוטים רופפים בבניין הישן היו סכנת שריפה חמורה.",near:['burden','exposure']},
  {s:"Icy roads are the greatest ___ facing drivers in the mountains during winter.",he:"כבישים מכוסי קרח הם הסכנה הגדולה ביותר שעומדת בפני נהגים בהרים בחורף.",near:['dilemma','impact']}],
 collide:[
  {s:"Two trains ___ in thick fog just outside the station, injuring dozens of passengers.",he:"שתי רכבות התנגשו בערפל סמיך ממש מחוץ לתחנה ופצעו עשרות נוסעים.",near:['descend','retreat']},
  {s:"Scientists believe a huge rock from space ___ with the earth sixty-five million years ago.",he:"מדענים מאמינים שסלע ענק מהחלל התנגש בכדור הארץ לפני שישים וחמישה מיליון שנה.",near:['wander','shrink']}],
 descend:[
  {s:"The climbers began to ___ the mountain as soon as the weather turned.",he:"המטפסים החלו לרדת מההר ברגע שמזג האוויר השתנה.",near:['retreat','collide']},
  {s:"Many families in the village ___ from sailors who settled here two centuries ago.",he:"משפחות רבות בכפר הן צאצאיהם של ימאים שהתיישבו כאן לפני מאתיים שנה.",near:['originate','wander']}],
 definite:[
  {s:"The doctors could not give a ___ answer about when he would be able to walk again.",he:"הרופאים לא יכלו לתת תשובה מוגדרת לשאלה מתי יוכל ללכת שוב.",near:['relative','secure']},
  {s:"There has been a ___ improvement in the air quality since the factory closed.",he:"חל שיפור ברור באיכות האוויר מאז שהמפעל נסגר.",near:['modest','random']}],
 exception:[
  {s:"All students must take the exam; the only ___ is for those who are seriously ill.",he:"כל התלמידים חייבים להיבחן; החריג היחיד הוא למי שחולה באופן חמור.",near:['reservation','absence']},
  {s:"Most of the paintings are portraits, with the ___ of two landscapes near the entrance.",he:"רוב הציורים הם דיוקנאות, מלבד שני ציורי נוף ליד הכניסה.",near:['fraction','oversight']}],
 property:[
  {s:"The land along the river is private ___ and is closed to hikers.",he:"האדמה לאורך הנהר היא רכוש פרטי וסגורה למטיילים.",near:['fund','trade']},
  {s:"Copper has the useful ___ of carrying electricity with very little loss.",he:"לנחושת יש תכונה שימושית: היא מוליכה חשמל באובדן קטן מאוד.",near:['substance','device']}],
 relative:[
  {s:"The ___ calm of the countryside was a welcome change after years in the city.",he:"השקט היחסי של הכפר היה שינוי מבורך אחרי שנים בעיר.",near:['definite','modest']},
  {s:"The two medicines have the same effect; the choice between them is a ___ matter of cost.",he:"לשתי התרופות אותה השפעה; הבחירה ביניהן היא עניין יחסי של עלות.",near:['literal','random']}],
 frequent:[
  {s:"___ storms make the sea crossing dangerous during the winter months.",he:"סופות תכופות הופכות את החצייה הימית למסוכנת בחודשי החורף.",near:['rapid','prolonged']},
  {s:"The patient's ___ headaches turned out to be caused by poor eyesight.",he:"כאבי הראש התכופים של המטופל התבררו כנובעים מראייה לקויה.",near:['permanent','excessive']}],
 improvise:[
  {s:"When the microphone failed, the singer had to ___ and perform without it.",he:"כשהמיקרופון התקלקל, הזמרת נאלצה לאלתר ולהופיע בלעדיו.",near:['initiate','revise']},
  {s:"Good jazz musicians ___ new melodies every time they play a song.",he:"נגני ג'אז טובים מאלתרים מנגינות חדשות בכל פעם שהם מנגנים שיר.",near:['coin','resume']}],
 secure:[
  {s:"Keep your passport in a ___ place, such as the hotel safe.",he:"שמור את הדרכון שלך במקום בטוח, כמו הכספת של המלון.",near:['permanent','strict']},
  {s:"After ten years in temporary jobs, he finally felt ___ enough to buy a house.",he:"אחרי עשר שנים במשרות זמניות, סוף סוף הרגיש בטוח מספיק כדי לקנות בית.",near:['mature','definite']}],
 rebellious:[
  {s:"As a teenager he was ___, refusing to follow any rule his parents set.",he:"כנער הוא היה מרדני וסירב לציית לכל כלל שהוריו קבעו.",near:['intrusive','sincere']},
  {s:"The ___ province declared its independence from the empire in 1821.",he:"המחוז המורד הכריז על עצמאותו מהאימפריה בשנת 1821.",near:['remote','native']}],
 sincere:[
  {s:"The mayor offered a ___ apology to the families affected by the mistake.",he:"ראש העיר הציע התנצלות כנה למשפחות שנפגעו מהטעות.",near:['modest','spontaneous']},
  {s:"Her interest in the project seemed ___, not just a way to win votes.",he:"העניין שלה בפרויקט נראה אמיתי, לא רק דרך לזכות בקולות.",near:['definite','literal']}],
 errand:[
  {s:"On his way home, he stopped to run a quick ___ for his elderly neighbor.",he:"בדרכו הביתה, הוא עצר כדי לבצע סידור קצר עבור שכנו הקשיש.",near:['precaution','burden']},
  {s:"The secretary spent the morning on ___ around town: the bank, the post office, and the printer.",he:"המזכירה בילתה את הבוקר בסידורים ברחבי העיר: הבנק, הדואר ובית הדפוס.",near:['necessity','reservation']}],
 burden:[
  {s:"Caring for an elderly parent can be a heavy ___ for a family with young children.",he:"טיפול בהורה קשיש עלול להיות נטל כבד למשפחה עם ילדים קטנים.",near:['hazard','expense']},
  {s:"The new tax was seen as an unfair ___ on small shopkeepers.",he:"המס החדש נתפס כנטל לא הוגן על בעלי חנויות קטנות.",near:['necessity','dilemma']}],
 fund:[
  {s:"The school set up a ___ to help students from poor families pay for books.",he:"בית הספר הקים קרן לעזור לתלמידים ממשפחות עניות לשלם עבור ספרים.",near:['loan','revenue']},
  {s:"Money from the emergency ___ was used to repair the flooded homes.",he:"כסף מקרן החירום שימש לתיקון הבתים שהוצפו.",near:['expense','property']}],
 core:[
  {s:"The ___ of the earth is made mostly of iron and is hotter than the surface of the sun.",he:"ליבת כדור הארץ עשויה בעיקר ברזל והיא חמה יותר מפני השמש.",near:['mainstay','origin']},
  {s:"Honesty is at the ___ of the company's values, according to its founder.",he:"יושר נמצא בליבת ערכי החברה, לדברי מייסדה.",near:['factor','fraction']}],
 mature:[
  {s:"Olive trees take many years to ___ and produce their first full harvest.",he:"עצי זית זקוקים לשנים רבות כדי להבשיל ולהניב את היבול המלא הראשון שלהם.",near:['secure','innate']},
  {s:"For a twelve-year-old, she is remarkably ___ and thoughtful.",he:"עבור ילדה בת שתים עשרה, היא בוגרת ומתחשבת להפליא.",near:['modest','sincere']}],
 excessive:[
  {s:"The doctor warned that ___ use of painkillers could damage the liver.",he:"הרופא הזהיר ששימוש מופרז במשככי כאבים עלול לפגוע בכבד.",near:['frequent','harmful']},
  {s:"The fine seemed ___ for such a minor parking offense.",he:"הקנס נראה מופרז על עבירת חניה כה קלה.",near:['strict','broad']}],
 retreat:[
  {s:"The army was forced to ___ across the river after three days of fighting.",he:"הצבא נאלץ לסגת מעבר לנהר אחרי שלושה ימי לחימה.",near:['descend','wander']},
  {s:"As the tide came in, the children ___ to the higher part of the beach.",he:"כשהגאות הגיעה, הילדים נסוגו לחלק הגבוה יותר של החוף.",near:['collide','dwindle']}],
 dilemma:[
  {s:"The doctor faced a ___: tell the patient the truth, or protect him from bad news?",he:"הרופא ניצב בפני דילמה: לספר למטופל את האמת, או להגן עליו מחדשות רעות?",near:['burden','hazard']},
  {s:"Parents of gifted children often face the ___ of whether to move them to a special school.",he:"הורים לילדים מחוננים ניצבים לעיתים קרובות בפני הדילמה אם להעבירם לבית ספר מיוחד.",near:['necessity','exception']}],
 revise:[
  {s:"The publisher asked the author to ___ the final chapter before the book went to print.",he:"המו\"ל ביקש מהמחבר לתקן את הפרק האחרון לפני שהספר נשלח לדפוס.",near:['replace','confirm']},
  {s:"Economists ___ their forecast for growth after the surprisingly strong summer.",he:"הכלכלנים עדכנו את תחזית הצמיחה שלהם אחרי הקיץ החזק במפתיע.",near:['release','clarify']}],
/*__END__*/
};
