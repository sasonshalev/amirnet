/* 15.9 — בדיקת עשן: מריץ את הסקריפט של index.html + sentences.js על DOM מזויף ומפעיל
   את המסכים החדשים. תופס שגיאות זמן-ריצה (undefined, פונקציה חסרה) שטסט התחביר לא רואה.
   node test-smoke.js */
'use strict';
const fs=require('fs'),path=require('path'),vm=require('vm');
const dir=__dirname;
const html=fs.readFileSync(path.join(dir,'index.html'),'utf8');
const content=fs.readFileSync(path.join(dir,'sentences.js'),'utf8');
const exams=fs.readFileSync(path.join(dir,'exams.js'),'utf8');
const main=html.match(/<script>\s*([\s\S]*?)<\/script>\s*$/)[1];

// DOM מינימלי
const store={};
const mkEl=()=>{const el={innerHTML:'',style:{},hidden:false,open:false,value:'',_h:{},
  addEventListener(t,f){(el._h[t]=el._h[t]||[]).push(f);},removeEventListener(){},
  classList:{toggle(){},add(){},remove(){}},getAttribute(){return '';},setAttribute(){},focus(){},select(){}};return el;};
const els={app:mkEl(),topbar:mkEl(),secName:mkEl(),qCount:mkEl(),dots:mkEl(),timer:mkEl(),impBox:mkEl(),impMsg:mkEl()};
const sandbox={
  console,Math,Date,JSON,String,Number,Array,Object,RegExp,Error,Set,Map,parseInt,parseFloat,isNaN,
  setTimeout:(f)=>{},clearInterval(){},setInterval(){return 1;},btoa:s=>Buffer.from(s,'binary').toString('base64'),atob:s=>Buffer.from(s,'base64').toString('binary'),
  encodeURIComponent,decodeURIComponent,
  // כמו בדפדפן: unescape הופך %XX לבייטים, escape הפוך — כך ש-btoa(unescape(encodeURIComponent(x))) = base64 של UTF-8
  unescape:s=>s.replace(/%([0-9A-Fa-f]{2})/g,(m,h)=>String.fromCharCode(parseInt(h,16))),
  escape:s=>s.replace(/[^A-Za-z0-9@*_+\-./]/g,c=>'%'+c.charCodeAt(0).toString(16).toUpperCase().padStart(2,'0')),
  navigator:{},
  localStorage:{getItem:k=>(k in store?store[k]:null),setItem:(k,v)=>{store[k]=String(v);},removeItem:k=>{delete store[k];}},
  document:{getElementById:id=>els[id]||mkEl(),querySelectorAll:()=>[],addEventListener(){},removeEventListener(){},
    body:{appendChild(){},removeChild(){}},createElement:mkEl,execCommand:()=>true},
};
sandbox.window=sandbox;
sandbox.globalThis=sandbox;
vm.createContext(sandbox);
const run=(code,name)=>{try{vm.runInContext(code,sandbox,{filename:name});}catch(e){console.log('🔴 '+name+': '+e.message);process.exit(1);}};
run(content,'sentences.js');
run(exams,'exams.js');
run(main,'index.html');
let fails=0;
const step=(name,fn)=>{try{fn();const h=els.app.innerHTML;if(!h||h.length<50)throw new Error('המסך ריק');console.log('✅ '+name+' ('+h.length+' תווים)');}catch(e){fails++;console.log('🔴 '+name+': '+e.message);}};
const g=n=>vm.runInContext(n,sandbox);
const call=(code)=>vm.runInContext(code,sandbox);

step('מסך הבית (בלי היסטוריה)',()=>call('intro()'));
step('אוצר המילים — ריק',()=>call('showVocab()'));
step('סשן יומי — מילה חדשה (מסך למידה)',()=>call('startSession()'));
// דילוג על הלמידה עד שמגיע בוחן
step('סשן יומי — בוחן',()=>{for(let i=0;i<5;i++){if(/learnDone/.test(els.app.innerHTML))call('learnDone()');else break;}
  if(!/sessAnswer/.test(els.app.innerHTML))throw new Error('לא הגיע בוחן');
  if(!/sessUnknown/.test(els.app.innerHTML))throw new Error('אין כפתור לא-יודע');});
step('לא יודע → פידבק',()=>{call('sessUnknown()');if(!/נלמד אותה מחדש/.test(els.app.innerHTML))throw new Error('אין מסך "נלמד מחדש"');});
step('המשך אחרי לא-יודע',()=>call('_ff()'));
// מדמים היסטוריה עשירה: כל המילים בקופסאות שונות
call(`(function(){const s=srsLoad();WORDS.forEach((w,i)=>{s.cards[w.w]={b:i%7,laps:i%5,due:'2026-01-01',seen:'2026-09-01',unk:i%9===0?1:0};});srsSave(s);})()`);
step('מסך הבית (עם היסטוריה)',()=>call('intro()'));
step('אוצר המילים — מלא',()=>{call('showVocab()');if(!/drillWord/.test(els.app.innerHTML))throw new Error('אין כפתורי תרגל');if(!/drillWeak/.test(els.app.innerHTML))throw new Error('אין תרגל חלשות');});
step('תרגול מילה בודדת',()=>{call("drillWord('although')");if(!/wsentAnswer/.test(els.app.innerHTML))throw new Error('לא נפתח בוחן');});
step('תשובה במשפט (לא יודע)',()=>{call('wsentAnswer(-1)');if(!/tr/.test(els.app.innerHTML))throw new Error('אין לשונית');});
step('הבא',()=>call('wsentNext()'));
step('תרגול החלשות',()=>call('drillWeak()'));
step('משפטים על המילים שלי',()=>call('startWordSent(false)'));
step('סשן יומי עם חזרות (משפט/תרגום/היפוך)',()=>{call('startSession()');
  // מריצים 40 פריטים: עונים תמיד "נכון" (oi=0) כדי לעבור על כל הסוגים
  for(let i=0;i<40;i++){const h=els.app.innerHTML;
    if(/learnDone/.test(h))call('learnDone()');
    else if(/sessAnswer/.test(h))call('sessAnswer(0,0)');
    else if(/_ff\(\)/.test(h))call('_ff()');
    else break;}
});
step('מבחן רמה',()=>{call('startLevelExam(2)');if(!/lvexAnswer/.test(els.app.innerHTML))throw new Error('לא נפתח');});
step('שאלות אמת — השלמה',()=>{call('startSCP()');if(!/scpAnswer/.test(els.app.innerHTML))throw new Error('לא נפתח');call('scpAnswer(0)');});
/* ⚠️ 15.9 — הלב של הסבב: השאלות חייבות **להתחלף** בין ריצות. עד היום הן היו
   קבועות, ולכן "המדד שלי" מדד שינון. */
step('השאלות מתחלפות בין ריצות',()=>{
  const sig=()=>call('startSCP()')||call('scp.qs.map(q=>q.s).join("|")');
  const a=sig(),b=sig(),c=sig();
  if(a===b&&b===c)throw new Error('אותן 11 שאלות בשלוש ריצות — הדגימה לא עובדת');
  els.app.innerHTML='ok — 3 ריצות, '+new Set([a,b,c]).size+' קבוצות שונות'+' '.repeat(50);
});
step('בנק השאלות נטען מ-exams.js',()=>{
  // צפוי: 1AM+4AM מאומתות ועם חור (19+23) + 11 הישנות = 53 · ניסוח (18+20)+8 = 46
  const n=call('bank("sc").length'),m=call('bank("rs").length');
  if(n!==53||m!==46)throw new Error('בנק לא כצפוי: sc='+n+' (צפוי 53) rs='+m+' (צפוי 46)');
  // שאלת השלמה בלי חור = אי אפשר לענות עליה. אסור שתגיע למסך.
  const nb=call('bank("sc").filter(q=>!/___/.test(q.s)).length');
  if(nb)throw new Error(nb+' שאלות השלמה בלי חור דלפו לבנק');
  // 2AM/3AM/5AM לא מאומתות — אסור שייכנסו
  const leak=call('bank("sc").concat(bank("rs")).filter(q=>q.src&&/2AM|3AM|5AM/.test(q.src)).length');
  if(leak)throw new Error(leak+' שאלות מבחינות לא־מאומתות דלפו לבנק');
  els.app.innerHTML='ok sc='+n+' rs='+m+' · אין דליפה מ-2AM/3AM/5AM'+' '.repeat(40);
});
step('שאלה בלי why/trap — פידבק תקין',()=>{
  // שאלה מהחוברת אין לה why; ודא שאין "undefined" על המסך
  call('scp.qs=[bank("sc").find(q=>q.src&&!q.why)];scp.i=0;scp.correct=0;renderSCPQ()');
  call('scpAnswer(0)');
  if(/undefined/.test(els.app.innerHTML))throw new Error('undefined במסך הפידבק');
  if(!/מקור: בחינת/.test(els.app.innerHTML))throw new Error('לא מצוין המקור');
  call('rsp.qs=[bank("rs").find(q=>q.src&&!q.trap)];rsp.i=0;rsp.correct=0;renderRSPQ()');
  call('rspAnswer(1)');
  if(/undefined/.test(els.app.innerHTML))throw new Error('undefined בניסוח מחדש');
});
step('רף הפטור 90% בכל המסכים',()=>{
  if(call('PASS_PCT')!==90)throw new Error('PASS_PCT='+call('PASS_PCT'));
  call('drillSave("scp",8,11)');call('showPath()');
  const h=els.app.innerHTML;
  if(!/90%/.test(h))throw new Error('המסלול לא מציג 90%');
  if(/רף הפטור: <b>75%/.test(h))throw new Error('עדיין מוצג רף 75%');
});
step('ייצוא/ייבוא',()=>{call('showTransfer()');call('exportProgress({textContent:""})');const v=els.impBox.value;if(!/^AMIRNET1:/.test(v))throw new Error('אין קוד');
  const data=JSON.parse(Buffer.from(v.slice(9),'base64').toString('utf8'));if(!('levels' in data)||!('drills' in data))throw new Error('הייצוא בלי levels/drills');});
// מנוע המסיחים — מבנה 2/1/1 על מילים עם near
step('buildOptions — near נכנס, 4 שונים',()=>{
  const r=call(`(function(){let ok=0,tot=0,bad=[];for(const k of Object.keys(S2)){const w=WORDS.find(x=>x.w===k);for(const it of S2[k]){tot++;
    const o=buildOptions(w,'sent',it.near);const set=new Set(o);
    if(o.length!==4||set.size!==4||o[0]!==w.w)bad.push(k+':'+o.join('|'));else if(it.near.includes(o[1]))ok++;}}
    return {ok,tot,bad:bad.slice(0,5)};})()`);
  if(r.bad.length)throw new Error('אפשרויות לא תקינות: '+r.bad.join(' ; '));
  if(r.ok<r.tot*0.9)throw new Error('near נכנס רק ב-'+r.ok+'/'+r.tot);
  els.app.innerHTML='ok '+r.ok+'/'+r.tot+' near-in-options — '+' '.repeat(50);
});
step('buildOptions — תרגום: ה"אולי" = תרגום ה-near',()=>{
  const r=call(`(function(){const w=WORDS.find(x=>x.w==='although');const o=buildOptions(w,'he',['despite','due to']);return o;})()`);
  if(r.length!==4||r[0]!=='אף על פי ש-; למרות ש-'||!(r[1]==='למרות'||r[1]==='בגלל; עקב'))throw new Error(r.join('|'));
  els.app.innerHTML='ok '+r.join(' | ')+' '.repeat(50);
});
step('sentFor — המשפט מתחלף לפי si',()=>{
  const r=call(`(function(){const w=WORDS.find(x=>x.w==='provide');const a=sentFor(w,{si:-1}),b=sentFor(w,{si:a.si}),c=sentFor(w,{si:b.si});return [a.si,b.si,c.si,a.s!==b.s,a.he];})()`);
  if(!(r[0]===0&&r[1]===1&&r[3]&&r[4]))throw new Error(JSON.stringify(r));
  els.app.innerHTML='ok si rotation '+JSON.stringify(r)+' '.repeat(50);
});
console.log(fails?('🔴 '+fails+' כשלים'):'✅ בדיקת העשן עברה');
process.exit(fails?1:0);
