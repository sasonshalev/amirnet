/* 15.9 — בדיקת התוכן (sentences.js) מול המילים (index.html). node test-content.js
   ⚠️ מה שהטסט **לא** בודק: שהמשפט נכון באנגלית, שהתרגום נאמן, ושה-near באמת נפסל
   מההקשר. אלה אורקל אנושי — ששון. הטסט תופס רק את מה שמחשב יכול לתפוס. */
'use strict';
const fs=require('fs'),path=require('path'),vm=require('vm');
const dir=__dirname;
const html=fs.readFileSync(path.join(dir,'index.html'),'utf8');
const src=fs.readFileSync(path.join(dir,'sentences.js'),'utf8');
let fails=0;const bad=(m)=>{fails++;console.log('🔴 '+m);};

// 1. תחביר — סוגר חסר במשפט ה-700 מפיל את כל הדף
const m=html.match(/<script>\s*([\s\S]*?)<\/script>\s*$/);
if(!m){bad('לא נמצא <script> ראשי ב-index.html');process.exit(1);}
try{new Function(m[1]);}catch(e){bad('שגיאת תחביר ב-index.html: '+e.message);}
try{new Function(src);}catch(e){bad('שגיאת תחביר ב-sentences.js: '+e.message);process.exit(1);}
if(!/<script src="sentences\.js"><\/script>/.test(html))bad('index.html לא טוען את sentences.js');

// 2. חילוץ WORDS ו-SENT/SCP מהדף, והתוכן מהקובץ
const ctx={};
const grab=(name)=>{const r=new RegExp('const '+name+'\\s*=\\s*([\\[{][\\s\\S]*?)\\n(?:\\]|\\});','m');const mm=html.match(r);if(!mm)throw new Error('לא נמצא '+name);
  const end=mm[0].endsWith('];')?']':'}';return vm.runInNewContext('('+mm[1]+'\n'+end+')');};
const WORDS=grab('WORDS'),SENT=grab('SENT'),SCP=grab('SCP');
// const בתוך vm לא נהיה מאפיין של הסנדבוקס — מחזירים את הארבעה במפורש
const {SENT2={},WORD_POS={},SENT_HE={},SCP_HE=[]}=vm.runInNewContext(src+'\n;({SENT2,WORD_POS,SENT_HE,SCP_HE})',ctx);
const byW=new Map(WORDS.map(w=>[w.w,w]));
console.log('מילים:',WORDS.length,'· מילים עם תוכן חדש:',Object.keys(SENT2).length,'· משפטים:',Object.values(SENT2).reduce((a,b)=>a+b.length,0));

// 3. חלק דיבר לכל מילה
const POS=new Set(['v','n','adj','adv','conj','prep']);
for(const w of WORDS){if(!WORD_POS[w.w])bad('אין pos ל-'+w.w);else if(!POS.has(WORD_POS[w.w]))bad('pos לא חוקי ל-'+w.w+': '+WORD_POS[w.w]);}
for(const k of Object.keys(WORD_POS))if(!byW.has(k))bad('pos למילה שלא ב-WORDS: '+k);

// 4. המשפטים
const esc=x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
function formsRe(word){
  const parts=word.split('...').map(x=>x.trim()).filter(Boolean);
  const alts=[];
  for(const b of parts){
    alts.push(esc(b)+'(s|es|ed|d|ing|ly|ness|ment|tion)?');
    if(/y$/.test(b))alts.push(esc(b.slice(0,-1))+'i(es|ed|ly)');
    if(/e$/.test(b))alts.push(esc(b.slice(0,-1))+'(ing|ed|es)');
    if(/[bcdfgklmnprstvz]$/.test(b))alts.push(esc(b)+b.slice(-1)+'(ed|ing)');
  }
  return new RegExp('\\b('+alts.join('|')+')\\b','i');
}
const seen=new Map();
for(const [k,arr] of Object.entries(SENT2)){
  const w=byW.get(k);
  if(!w){bad('SENT2 למילה שלא ב-WORDS: '+k);continue;}
  if(!Array.isArray(arr)||!arr.length){bad('SENT2['+k+'] ריק');continue;}
  const blanks=k.split('...').length;
  arr.forEach((it,i)=>{
    const tag=k+'#'+(i+1);
    if(!it.s||typeof it.s!=='string')return bad(tag+': אין s');
    const n=(it.s.match(/___/g)||[]).length;
    if(n!==blanks)bad(tag+': '+n+' חורים במקום '+blanks);
    if(formsRe(k).test(it.s.replace(/___/g,' ')))bad(tag+': המילה עצמה מופיעה במשפט: '+it.s);
    if(!it.he||!/[֐-׿]/.test(it.he))bad(tag+': אין תרגום עברי');
    else if(/[A-Za-z]{4,}/.test(it.he.replace(/___/g,'')))bad(tag+': התרגום מכיל אנגלית: '+it.he);
    if(/___/.test(it.he||''))bad(tag+': חור בתרגום');
    if(!Array.isArray(it.near)||!it.near.length)bad(tag+': אין near');
    else for(const nw of it.near){
      if(nw===k)bad(tag+': near = המילה עצמה');
      else if(!byW.has(nw))bad(tag+': near לא ב-WORDS: '+nw);
      else{
        if(formsRe(nw).test(it.s.replace(/___/g,' ')))bad(tag+': near מופיע במשפט: '+nw);
        // מילות קישור: הבלבול conj↔prep הוא בדיוק המלכודת (despite/although) — לא נבדק שם
        const link=x=>x==='conj'||x==='prep';
        if(WORD_POS[nw]&&WORD_POS[k]&&WORD_POS[nw]!==WORD_POS[k]&&!(link(WORD_POS[nw])&&link(WORD_POS[k])))bad(tag+': near בחלק דיבר אחר ('+nw+' '+WORD_POS[nw]+' ≠ '+WORD_POS[k]+')');
        const a=byW.get(nw).t.split(/[;,]/)[0].trim(),b=w.t.split(/[;,]/)[0].trim();
        if(a===b)bad(tag+': near עם אותה משמעות ראשונה: '+nw);
      }
    }
    const key=it.s.toLowerCase().replace(/\s+/g,' ').trim();
    if(seen.has(key))bad(tag+': משפט כפול עם '+seen.get(key));else seen.set(key,tag);
    if(w.ex&&key===w.ex.toLowerCase().replace(/\s+/g,' ').trim())bad(tag+': זה משפט ה-ex הישן');
    if(it.s.length<30)bad(tag+': משפט קצר מדי ('+it.s.length+')');
  });
}
// 5. תרגומים למשפטים הישנים
for(const k of Object.keys(SENT)){if(!SENT_HE[k]||!/[֐-׿]/.test(SENT_HE[k]))bad('אין SENT_HE ל-'+k);}
for(const k of Object.keys(SENT_HE))if(!SENT[k])bad('SENT_HE למילה שלא ב-SENT: '+k);
if(SCP_HE.length!==SCP.length)bad('SCP_HE: '+SCP_HE.length+' תרגומים ל-'+SCP.length+' שאלות');
SCP_HE.forEach((h,i)=>{if(!h||!/[֐-׿]/.test(h))bad('SCP_HE['+i+'] ריק');});

console.log(fails?('🔴 '+fails+' כשלים'):'✅ התוכן עבר את כל הבדיקות');
process.exit(fails?1:0);
