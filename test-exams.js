/* 15.9 — אימות exams.js. node test-exams.js
   🔑 האורקל החיצוני: 19 השאלות שכבר במערכת (SCP + RSP) נבדקו ואושרו ידנית לאורך
      חודש. אם התשובה הנכונה שחולצה מהמפתח הרשמי מסכימה איתן — החילוץ נכון.
      אי-התאמה אחת = לעצור. ⚠️ ששון לומד מהשאלות האלה; מפתח הפוך = לימוד שקר. */
'use strict';
const fs=require('fs'),path=require('path'),vm=require('vm');
const dir=__dirname;
const html=fs.readFileSync(path.join(dir,'index.html'),'utf8');
const cut=n=>{const a=html.indexOf('const '+n+'=');const b=html.indexOf('\n];',a);
  return vm.runInNewContext('('+html.slice(html.indexOf('[',a),b)+'\n])');};
const SCP=cut('SCP'),RSP=cut('RSP');
const src=fs.readFileSync(path.join(dir,'exams.js'),'utf8');
const OFFICIAL=vm.runInNewContext(src+'\n;OFFICIAL');
let fails=0;const bad=m=>{fails++;console.log('🔴 '+m);};

const norm=s=>String(s).replace(/\s+/g,' ').replace(/[–—]/g,'-')
  .replace(/[‘’]/g,"'").replace(/[“”]/g,'"').trim().toLowerCase();
const key=s=>norm(s).replace(/[^a-z0-9 ]/g,'').slice(0,60);

/* ---------- 1. מבנה ---------- */
const all=[];
for(const [ex,b] of Object.entries(OFFICIAL)){
  if(typeof b.verified!=='boolean')bad(ex+': אין דגל verified');
  for(const bank of ['sc','rs'])for(const q of b[bank]){
    all.push({ex,bank,q});
    if(!Array.isArray(q.o)||q.o.length!==4)bad(q.src+': '+(q.o||[]).length+' אפשרויות במקום 4');
    if(new Set(q.o.map(norm)).size!==4)bad(q.src+': אפשרויות כפולות');
    if(!q.s||q.s.length<20)bad(q.src+': גוף שאלה קצר/ריק: '+q.s);
    /* ⚠️ שאלת השלמה בלי חור נראה היא שאלה שבורה על המסך — "living space is , the
       typical family". חור אחד בדיוק, לא אפס ולא שניים. */
    if(bank==='sc'){
      const n=(q.s.match(/___/g)||[]).length;
      // noBlank מסומנות מראש ולא נטענות; שאלה **לא** מסומנת חייבת חור אחד בדיוק
      if(n!==1&&!q.noBlank)bad(q.src+': '+n+' חורים במקום 1 ולא מסומנת noBlank — '+q.s.slice(0,70));
      if(n===1&&q.noBlank)bad(q.src+': מסומנת noBlank אבל יש לה חור תקין');
    }
    if(bank==='rs'&&/___/.test(q.s))bad(q.src+': חור בשאלת ניסוח מחדש — '+q.s.slice(0,60));
    for(const t of [q.s,...q.o]){
      if(/[֐-׿]/.test(t))bad(q.src+': עברית בתוך השאלה: '+t.slice(0,40));
      if(/turn the page|^-?\d+-$|SECTION/i.test(t))bad(q.src+': רעש מהעמוד: '+t.slice(0,40));
    }
  }
}
const seen=new Map();
for(const {q} of all){const k=key(q.s);if(seen.has(k))bad('שאלה כפולה: '+q.src+' = '+seen.get(k));else seen.set(k,q.src);}

/* ---------- 2. האורקל: 19 השאלות המאומתות ----------
   ⚠️ 15.9: ההשוואה חייבת להיות **גמישה בניסוח וקשיחה במשמעות**. הגרסאות שבמערכת
   נכתבו ידנית ב-4.8 ו**קוצרו** ("...that the English novel gained popularity" מול
   המקור "...Dickens and Hardy, two writers in the nineteenth century, that..."),
   והמסיחים שוכתבו. לכן משווים רק את **התשובה הנכונה**, לפי חפיפת מילות תוכן.
   מה שנבדק כאן הוא הדבר היחיד שחשוב: שהמפתח הרשמי מצביע על אותה תשובה. */
const words=s=>norm(s).replace(/[^a-z0-9' ]/g,' ').split(/\s+/).filter(w=>w.length>3);
const overlap=(a,b)=>{
  if(norm(a)===norm(b))return 1;
  // ⚠️ תשובות קצרות ("key to", "beyond") נופלות מתחת לסף מילות התוכן — משווים ישירות
  const A=new Set(words(a)),B=new Set(words(b));
  if(!A.size||!B.size)return norm(a)&&norm(a)===norm(b)?1:(norm(a).includes(norm(b))||norm(b).includes(norm(a))?1:0);
  let hit=0;for(const w of A)if(B.has(w))hit++;
  return hit/Math.min(A.size,B.size);
};
const findQ=(stem)=>{
  let best=null,score=0;
  for(const {ex,q} of all){const s=overlap(stem,q.s);if(s>score){score=s;best={ex,q,score:s};}}
  return score>=0.7?best:null;
};
let matched=0,byExam={};
const check=(list,label,stemOf)=>{
  for(const item of list){
    const hit=findQ(stemOf(item));
    if(!hit){console.log('   ◻ '+label+' לא נמצאה בחילוץ: '+stemOf(item).slice(0,50));continue;}
    matched++;byExam[hit.ex]=(byExam[hit.ex]||0)+1;
    // התשובה הנכונה במערכת (o[0], אושרה ידנית) חייבת להיות התשובה שהמפתח מצביע עליה
    const toCorrect=overlap(item.o[0],hit.q.o[0]);
    const best=hit.q.o.map((o,i)=>[i,overlap(item.o[0],o)]).sort((a,b)=>b[1]-a[1])[0];
    if(best[0]!==0||toCorrect<0.6)
      bad('❗ המפתח מצביע על תשובה אחרת! '+hit.q.src+
        '\n     במערכת (אושר ידנית): '+item.o[0]+
        '\n     מהמפתח הרשמי:       '+hit.q.o[0]+
        '\n     (הדמיון הגבוה ביותר: אפשרות '+(best[0]+1)+', '+Math.round(best[1]*100)+'%)');
  }
};
console.log('--- אורקל: 19 השאלות המאושרות ידנית ---');
check(SCP,'SCP',q=>q.s.replace(/___/g,' '));
check(RSP,'RSP',q=>q.s);
console.log('הותאמו:',matched,'מתוך',SCP.length+RSP.length,' · פירוק:',JSON.stringify(byExam));

/* ---------- 3. אילו בחינות מכוסות באורקל ---------- */
const verified=Object.entries(OFFICIAL).filter(([,b])=>b.verified).map(([e])=>e);
for(const e of verified)if(!byExam[e])bad(e+' מסומנת verified אבל אין לה אף שאלת אורקל');
for(const e of Object.keys(byExam))if(!verified.includes(e))bad(e+' יש לה אורקל אבל לא מסומנת verified');

const nv=Object.entries(OFFICIAL).filter(([,b])=>!b.verified);
const cnt=(s)=>Object.entries(OFFICIAL).filter(([,b])=>b.verified===s).reduce((a,[,b])=>a+b.sc.length+b.rs.length,0);
console.log('\nמאומתות ('+verified.join(', ')+'):',cnt(true),'שאלות · לא מאומתות ('+nv.map(([e])=>e).join(', ')+'):',cnt(false));

/* ---------- 4. ⚠️ שערי שפיות ----------
   בלעדיהם הטסט הכריז "✅ עבר" על exams.js ריק לגמרי (נמדד 15.9). בדיקה שאינה
   יודעת מה היא מצפה למצוא היא ירוקה גם כשאין כלום. */
if(all.length<200)bad('רק '+all.length+' שאלות בחילוץ — מצופה ~232');
if(matched<15)bad('רק '+matched+' מתוך 19 שאלות האורקל הותאמו — החילוץ כנראה שבור');
// מה שבאמת נטען למערכת: מאומת + (בהשלמה) עם חור
const usable=k=>Object.entries(OFFICIAL).filter(([,b])=>b.verified)
  .reduce((a,[,b])=>a+b[k].filter(q=>!q.noBlank).length,0);
console.log('נטענות בפועל — השלמה:',usable('sc'),'· ניסוח:',usable('rs'),
  '  (+11/+8 הישנות = '+(usable('sc')+11)+'/'+(usable('rs')+8)+')');
if(usable('sc')<40)bad('רק '+usable('sc')+' שאלות השלמה שמישות — מצופה ~42');
if(usable('rs')<35)bad('רק '+usable('rs')+' שאלות ניסוח שמישות — מצופה ~38');
const need={'1AM':{sc:33,rs:18},'2AM':{sc:33,rs:18},'3AM':{sc:33,rs:18},'4AM':{sc:35,rs:20},'5AM':{sc:16,rs:8}};
for(const [e,n] of Object.entries(need)){
  if(!OFFICIAL[e]){bad('חסרה בחינה '+e);continue;}
  if(OFFICIAL[e].sc.length!==n.sc)bad(e+' השלמה: '+OFFICIAL[e].sc.length+' במקום '+n.sc);
  if(OFFICIAL[e].rs.length!==n.rs)bad(e+' ניסוח: '+OFFICIAL[e].rs.length+' במקום '+n.rs);
}
console.log(fails?('🔴 '+fails+' כשלים'):'✅ exams.js עבר את כל הבדיקות');
process.exit(fails?1:0);
