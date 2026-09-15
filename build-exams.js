/* ============ 15.9 — חילוץ הבחינות הרשמיות → exams.js ============
   מקור: חוברת ההדרכה של המרכז הארצי לבחינות ולהערכה
          https://www.nite.org.il/files/amir/amir_guide.pdf  (חינמית, ללא הרשמה)

   הרצה:  node build-exams.js <path-to-amir_guide.pdf>
   דורש:  pdftotext (poppler). ⚠️ **חובה -layout** — בלעדיו מפתח התשובות מחולץ
          מרוסק (טבלת RTL מתפרקת לספרות בודדות). נמדד 15.9.

   🔑 הסקריפט נשמר בריפו בכוונה: חילוץ שרץ פעם אחת ביד הוא פעולה שאבדה. כך אפשר
      להריץ שוב על מהדורה חדשה של החוברת ולראות בדיוק מה השתנה.

   ⚠️ 2AM ו-3AM מחולצות אך מסומנות unverified — ראה test-exams.js. */
'use strict';
const fs=require('fs'),path=require('path'),cp=require('child_process');

const pdf=process.argv[2]||path.join(__dirname,'amir_guide.pdf');
const out=path.join(__dirname,'exams.js');
const tmp=path.join(require('os').tmpdir(),'amir_guide_layout.txt');

if(!fs.existsSync(pdf)){console.error('לא נמצא הקובץ: '+pdf);process.exit(1);}
cp.execFileSync('pdftotext',['-layout','-enc','UTF-8',pdf,tmp]);
const lines=fs.readFileSync(tmp,'utf8').split('\n').map(l=>l.replace(/\r$/,''));

/* ---------- 1. מפתחות התשובות ----------
   הטבלה ב-RTL: שורת מספרי שאלות "27 26 ... 2 1" ומתחתיה שורת התשובות באותו סדר.
   כלומר האיבר האחרון בכל שורה שייך לשאלה 1.
   ⚠️ 15.9: ב-`-layout` הכותרת "מפתח תשובות נכונות" יושבת בשורה נפרדת **בלי** שם
   הבחינה; שם הבחינה מגיע מהכותרת הרצה של העמוד. לכן עוקבים אחרי הבחינה לאורך
   כל הקובץ ולא מצפים לשתיהן באותה שורה. */
const keys={};           // keys['1AM'][section] = {n, ans:[...]}
let curExam=null,keyExam=null,secIdx=0,inKey=false;
const digits=s=>s.replace(/[^0-9\s]/g,' ').trim().split(/\s+/).filter(Boolean).map(Number);
for(let i=0;i<lines.length;i++){
  const L=lines[i];
  const em=L.match(/([1-5])AM/);
  if(em)curExam=em[1]+'AM';
  if(/מפתח תשובות נכונות/.test(L)&&!/כל בחינה תמצאו/.test(L)){
    if(!curExam)continue;
    // ⚠️ נועלים את הבחינה: הכותרת הרצה ממשיכה להופיע גם בתוך אזור המפתח
    inKey=true;keyExam=curExam;secIdx=0;keys[keyExam]=keys[keyExam]||[];continue;
  }
  if(!inKey||!keyExam)continue;
  if(/אומדן הציון|חישוב ציון גלם|טבלת מעבר/.test(L)){inKey=false;keyExam=null;continue;}
  if(/SECTION/.test(L)){secIdx++;continue;}
  if(!secIdx)continue;
  const d=digits(L);
  if(!d.length)continue;
  // שורת מספרי השאלות: רצף יורד שמסתיים ב-1 והמספר הראשון = אורך הרצף
  if(d.length>=20&&d[d.length-1]===1&&d[0]===d.length){keys[keyExam][secIdx]={n:d.length,ans:null};continue;}
  // שורת התשובות: אותו אורך, כל הערכים 1-4
  const slot=keys[keyExam][secIdx];
  if(slot&&!slot.ans&&d.length===slot.n&&d.every(x=>x>=1&&x<=4))
    slot.ans=d.slice().reverse();   // הופכים: אינדקס 0 = שאלה 1
}

/* ---------- 2. השאלות ----------
   כותרת פרק: "Sentence Completions (Questions a-b)" / "Restatements (a-b)".
   שאלה: שורה שמתחילה ב-"N. " ואחריה ארבע שורות "(k) ...".
   השיוך לבחינה — מהכותרת הרצה "בחינה להתנסות NAM" שמופיעה בכל עמוד. */
const clean=s=>s
  .replace(/[‎‏‪-‮]/g,'')
  .replace(/­|‐/g,'')           // מקפי־גלישה שה-PDF מוסיף באמצע מילה
  .replace(/\s+/g,' ').trim();
/* ⚠️ 15.9 — החור בשאלות ההשלמה הוא **רווחים** ב-PDF, ו-clean() בלע אותו:
   "living space is , the typical family" — משפט עם פסיק תלוי ובלי מקום לענות.
   כאן מסמנים אותו כ-___ לפני הצמצום. סף 2+ רווחים; מאומת בטסט שכל שאלת השלמה
   יוצאת עם חור אחד בדיוק. */
const markBlank=s=>clean(String(s).replace(/ {2,}/g,' ___ '))
  .replace(/\s*___(\s*___)+\s*/g,' ___ ')   // כמה רצפים סמוכים = חור אחד
  .replace(/ +([,.;:?!])/g,'$1').trim();
const isNoise=s=>/[֐-׿]/.test(s)||/^-?\d+-?$/.test(s)||/turn the page/i.test(s);

const exams={},dropped=[];
let exam=null,part=null,partRange=null,q=null,sec=0,inKeyArea=false;
const push=()=>{
  if(!q||!part||!exam)return;
  const o=[1,2,3,4].map(k=>q.opts[k]);
  if(o.every(x=>x&&clean(x))&&q.s){
    exams[exam]=exams[exam]||{sc:[],rs:[]};
    // רק בהשלמת משפטים יש חור; בניסוח מחדש המשפט שלם
    exams[exam][part].push({n:q.n,sec:sec||1,s:part==='sc'?markBlank(q.s):clean(q.s),o:o.map(clean)});
  }else if(q.s&&Object.keys(q.opts).length)dropped.push((exam||'?')+'/'+sec+'/'+q.n+' ('+Object.keys(q.opts).length+' אפשרויות)');
  q=null;
};
for(let i=0;i<lines.length;i++){
  const raw=lines[i];
  const L=clean(raw);
  /* ⚠️ 15.9 — R שומר את הרווחים המרובים, שהם **החור** בשאלות ההשלמה. בניית גוף
     השאלה מ-L (שכבר עבר clean) מחקה את החור ונתנה "the judge refused to the
     evidence" — 84 שאלות שבורות. גוף השאלה נבנה מ-R; האפשרויות מ-L. */
  const R=raw.replace(/[‎‏‪-‮]/g,'').replace(/­|‐/g,'');
  const em=raw.match(/([1-5])AM/);
  if(em&&/בחינה להתנסות/.test(raw)){
    const e=em[1]+'AM';
    if(e!==exam){push();exam=e;sec=0;part=null;}
    continue;
  }
  // אזור המפתח/האומדן — אין בו שאלות
  if(/מפתח תשובות נכונות|אומדן הציון|גיליון תשובות/.test(raw)){push();part=null;inKeyArea=true;continue;}
  // ⚠️ הסקשן נקבע מהשורה "SECTION N ... This section contains 27 questions"
  const sm=raw.match(/\bSECTION\s+(\d)\b/);
  if(sm){push();sec=+sm[1];part=null;if(/questions/i.test(raw))inKeyArea=false;continue;}
  /* ⚠️ 15.9: כותרת "Reading Comprehension" מופיעה גם **בלי** "(Questions a-b)".
     בלי לתפוס אותה, האפשרות האחרונה של השאלה שלפניה בלעה פרק קריאה שלם
     (נמדד ב-2AM/2/17). כל כותרת פרק סוגרת את השאלה הפתוחה. */
  const head=L.match(/^(Sentence Completions|Restatements|Reading Comprehension)\b\s*(?:\(Questions (\d+)-(\d+)\))?/);
  if(head){
    push();
    if(inKeyArea||head[1]==='Reading Comprehension'||!head[2]){part=null;continue;}
    part=head[1]==='Sentence Completions'?'sc':'rs';
    partRange=[+head[2],+head[3]];
    continue;
  }
  // "Text I (Questions 18-22)" — כותרת קטע קריאה, סוגרת את הפרק הקודם.
  // ⚠️ לא להוסיף כאן "This part consists of" — היא ההוראה שמופיעה מיד **אחרי** כל
  // כותרת פרק, וסגירה עליה מאפסת את הפרק שרק נפתח (נמדד: 0 שאלות).
  if(/^Text\s+[IVX]+\b/.test(L)){push();part=null;continue;}
  if(!part||!exam)continue;
  const qm=L.match(/^(\d+)\.\s+(.+)$/);
  if(qm&&+qm[1]>=partRange[0]&&+qm[1]<=partRange[1]){
    push();
    const rm=R.match(/^\s*\d+\.\s(.+)$/);
    q={n:+qm[1],s:(rm?rm[1]:qm[2]),opts:{},last:0};continue;
  }
  if(!q)continue;
  /* אפשרויות. ⚠️ 15.9: ב-`-layout` הן יושבות בעמודות, ולכן מופיעות בסדר שרירותי —
     נמדד "(4) beyond" בשורה שלפני "(1) after (2) less (3) no". לכן אוספים **לפי
     המספר** ולא לפי סדר ההופעה. קודם הסתמכתי על סדר עולה ו-4 שאלות נשרו בשקט. */
  if(/\([1-4]\)\s/.test(L)){
    const parts=L.split(/(?=\(\d\)\s)/);
    let head=parts[0]&&!/^\(\d\)/.test(parts[0])?parts[0].trim():'';
    if(head&&q.last)q.opts[q.last]+=' '+head; else if(head)q.s+=' '+head;
    for(const p of parts){
      const m=p.match(/^\((\d)\)\s*(.*)$/);
      if(!m)continue;
      const k=+m[1];
      if(k>=1&&k<=4){q.opts[k]=(q.opts[k]?q.opts[k]+' ':'')+m[2];q.last=k;}
    }
    continue;
  }
  if(isNoise(L)||!L)continue;
  // המשך שורה: של האפשרות האחרונה שנראתה, אחרת של גוף השאלה (עם הרווחים — ראה R)
  if(q.last)q.opts[q.last]+=' '+L; else q.s+=' '+R.replace(/^\s+/,'');
}
push();

/* ---------- 3. הצמדת התשובה הנכונה והעברתה ל-o[0] ----------
   כל בנקי השאלות בפרויקט שומרים את הנכונה ב-o[0] ומערבבים בתצוגה. */
let noKey=0;
for(const [ex,banks] of Object.entries(exams)){
  for(const bank of ['sc','rs']){
    banks[bank]=banks[bank].map(item=>{
      const k=(keys[ex]||[])[item.sec];
      const a=k&&k.ans?k.ans[item.n-1]:null;
      if(!a){noKey++;return null;}
      const correct=item.o[a-1];
      const rest=item.o.filter((_,i)=>i!==a-1);
      const r={s:item.s,o:[correct,...rest],src:ex+'/'+item.sec+'/'+item.n};
      /* ⚠️ 15.9 — ב-56 מ-150 שאלות ההשלמה החור אינו ניתן לשחזור: ב-PDF הוא רווח
         בודד (קו גרפי), ולא רווחים מרובים. נוסה -layout, -fixed, -table, -raw —
         כולם נותנים "how they are by disease" בלי סימן לחור.
         ⇒ מסמנים ולא טוענים. שאלת השלמה בלי חור = שאלה שאי אפשר לענות עליה. */
      if(bank==='sc'&&(item.s.match(/___/g)||[]).length!==1)r.noBlank=true;
      return r;
    }).filter(Boolean);
  }
}

/* ---------- 4. כתיבה ---------- */
/* ⚠️ 15.9: רק בחינות שיש להן שאלת אורקל — כלומר שאלה שששון כבר פתר ושתשובתה אושרה
   ידנית. נמדד: 1AM ×11 · 4AM ×6. **5AM אין לה אף אחת** — שתי השאלות שחשבתי שהן
   שלה ("The Abacus", "Many insects") מגיעות מפרק הדוגמאות של החוברת, לא מהבחינה.
   2AM/3AM/5AM מחולצות ונשמרות, אבל verified:false ⇒ לא נטענות למערכת. */
const VERIFIED=['1AM','4AM'];
const order=['1AM','2AM','3AM','4AM','5AM'].filter(e=>exams[e]);
const body=order.map(e=>{
  const v=VERIFIED.includes(e);
  const fmt=a=>a.map(x=>'  {s:'+JSON.stringify(x.s)+',\n   o:'+JSON.stringify(x.o)+',src:'+JSON.stringify(x.src)+(x.noBlank?',noBlank:true':'')+'}').join(',\n');
  return ' '+JSON.stringify(e)+':{verified:'+v+',\n'+
    '  sc:[\n'+fmt(exams[e].sc)+'],\n'+
    '  rs:[\n'+fmt(exams[e].rs)+']}';
}).join(',\n');

fs.writeFileSync(out,
`/* ============ בחינות אמי"ר הרשמיות — תוכן בלבד ============
   נוצר אוטומטית על ידי build-exams.js מתוך חוברת ההדרכה של המרכז הארצי
   (nite.org.il/files/amir/amir_guide.pdf — מופצת בחינם לתרגול נבחנים).
   ⛔ לא לערוך ביד — להריץ מחדש את build-exams.js.

   o[0] = התשובה הנכונה תמיד (כמו בכל בנקי השאלות בפרויקט); הערבוב בתצוגה.
   verified:true = הבחינה אומתה מול השאלות שששון כבר פתר ואושרו ידנית.
   ⚠️ verified:false לא נטען למערכת — ראה OFF ב-index.html. */
'use strict';
const OFFICIAL={
${body}
};
`);

const tot=order.reduce((a,e)=>a+exams[e].sc.length+exams[e].rs.length,0);
const nb=order.reduce((a,e)=>a+exams[e].sc.filter(x=>x.noBlank).length,0);
console.log('בחינות:',order.join(', '));
for(const e of order){
  const good=exams[e].sc.filter(x=>!x.noBlank).length;
  console.log('  '+e+'  השלמה: '+good+' תקינות'+(exams[e].sc.length-good?' (+'+(exams[e].sc.length-good)+' בלי חור)':'')+
    '  ניסוח: '+exams[e].rs.length+(VERIFIED.includes(e)?'  ✅ מאומתת':'  ⚠️ לא מאומתת'));
}
if(nb)console.log('⚠️ '+nb+' שאלות השלמה בלי חור ניתן לשחזור — מסומנות noBlank ולא נטענות');
console.log('סה"כ שאלות:',tot,noKey?('  ⚠️ '+noKey+' נזרקו בלי מפתח'):'');
if(dropped.length)console.log('⚠️ נשרו (פחות מ-4 אפשרויות):',dropped.length,'—',dropped.slice(0,12).join(', '));
console.log('נכתב:',out);
