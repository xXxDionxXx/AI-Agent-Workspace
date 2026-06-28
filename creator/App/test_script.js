
// ─── STATE ───
const DEFAULT_S = {
  icp:'',funnel:'',idea:'',format:'',structure:'',
  coreValues:[null,null,null],
  verbalCat:'TOFU',verbalHook:'',
  rehooks:[],vhook:'',
  shotSize:[],camAngle:[],enhancements:[],
  cta:'',script:'',lut:'',
  hookSection:'cine',bgmMood:'',concMood:'',
  lockedTrack:null,
  curTrack:null,
  postCL:{color:[],voice:[],mix:[],sub:[]},
  setupCL:{cam:[],light:[],audio:[],wardrobe:[]},
  shotList:[],editList:[]
};
let S = JSON.parse(localStorage.getItem('csS')||'null') || {...DEFAULT_S};

function svS(){
  localStorage.setItem('csS',JSON.stringify(S));
  const b = document.getElementById('save-badge');
  if(b){b.style.color='var(--green)';setTimeout(()=>b.style.color='var(--text3)',1500);}
}
function clearAll(){
  if(!confirm('ล้างข้อมูลทั้งหมด?')) return;
  S={...DEFAULT_S};localStorage.removeItem('csS');toast('🗑','ล้างข้อมูลแล้ว');init();
}

// ─── AUDIO ───
const AUD = document.getElementById('aud');
let playing = false;

const AUDIO_BASE = '../3-Post-Production/Audio/';

function getTrackPath(section, mood, filename){
  if(section==='hook_cine') return AUDIO_BASE+'SFX/Cinematic_SFX/'+filename;
  if(section==='hook_tonal') return AUDIO_BASE+'Tonal Sound Effects/'+filename;
  if(section==='bgm') return AUDIO_BASE+'Background/'+mood+'/'+filename;
  if(section==='conclusion') return AUDIO_BASE+'Conclusion/'+mood+'/'+filename;
  return AUDIO_BASE+filename;
}

function playTrack(section, mood, filename, displayName){
  S.curTrack={section,mood,filename,displayName};
  const url = getTrackPath(section,mood,filename);
  AUD.src = url;
  AUD.volume = parseFloat(document.getElementById('vol-slider')?.value||0.7);
  AUD.play().then(()=>{
    playing=true;
    updatePlayerUI();
    svS();
  }).catch(e=>toast('⚠️','ไม่สามารถเล่นได้: '+displayName));
}

function togglePlay(){
  if(!AUD.src) return;
  if(playing){AUD.pause();playing=false;}
  else{AUD.play();playing=true;}
  updatePlayerUI();
}

function setVol(v){ AUD.volume=parseFloat(v); }

function seekTo(e){
  if(!AUD.duration) return;
  const bar=document.getElementById('seek-bar');
  const ratio=e.offsetX/bar.offsetWidth;
  AUD.currentTime=ratio*AUD.duration;
}

function toggleLock(){
  const btn=document.getElementById('lock-btn');
  if(S.lockedTrack&&S.curTrack&&S.lockedTrack.filename===S.curTrack.filename){
    S.lockedTrack=null;
    btn.textContent='🔒 Lock';btn.classList.remove('locked');
    toast('🔓','ปลด Lock แล้ว');
  } else if(S.curTrack){
    S.lockedTrack={...S.curTrack};
    btn.textContent='🔓 Unlock';btn.classList.add('locked');
    toast('🔒','Lock เพลงแล้ว: '+S.curTrack.displayName);
  }
  svS();
  renderTrackList(S.hookSection==='bgm'?'bgm':S.hookSection==='conc'?'conclusion':'hook_'+S.hookSection,S.bgmMood||S.concMood||'',document.getElementById('hook-tracks')||document.getElementById('bgm-tracks'));
}

AUD.addEventListener('timeupdate',()=>{
  if(!AUD.duration) return;
  const pct=AUD.currentTime/AUD.duration*100;
  const sf=document.getElementById('seek-fill');
  if(sf) sf.style.width=pct+'%';
});
AUD.addEventListener('ended',()=>{playing=false;updatePlayerUI();});

function updatePlayerUI(){
  const bar=document.getElementById('player-bar');
  const btn=document.getElementById('pp-btn');
  const title=document.getElementById('pp-title');
  if(!bar) return;
  bar.style.display=S.curTrack?'flex':'none';
  if(btn) btn.textContent=playing?'⏸':'▶';
  if(title&&S.curTrack) title.textContent=S.curTrack.displayName;
}

function renderTrackList(section, mood, container, tracks){
  if(!container) return;
  if(!tracks||!tracks.length){container.innerHTML='<div class="empty-msg">ไม่พบไฟล์เสียง</div>';return;}
  container.innerHTML = tracks.map(t=>{
    const fn = typeof t==='string'?t:t;
    const name = fn.replace(/^.*\//,'').replace(/\.[^.]+$/,'');
    const isPlay = S.curTrack&&S.curTrack.filename===fn&&playing;
    const isLocked = S.lockedTrack&&S.lockedTrack.filename===fn;
    return `<div class="track-row${isPlay?' playing':''}${isLocked?' locked':''}" onclick="playTrack('${section}','${mood}','${fn.replace(/'/g,"\'")}','${name.replace(/'/g,"\'")}');updateAllTrackLists()">
      <div class="track-play">${isPlay?'<div class="waveform"><span></span><span></span><span></span><span></span></div>':'▶'}</div>
      <div class="track-name">${eh(name)}</div>
      ${isLocked?'<span class="lock-icon">🔒</span>':''}
    </div>`;
  }).join('');
}

function updateAllTrackLists(){
  renderHookTracks();
  renderBGMTracks();
  renderConcTracks();
  updatePlayerUI();
}

// ─── ADB (Audio Database) ───
// Loaded inline below

// ─── NAVIGATION ───
function switchMain(tab){
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.mtab').forEach(b=>b.classList.remove('active'));
  document.getElementById('panel-'+tab).classList.add('active');
  document.getElementById('mt-'+tab).classList.add('active');
}
function switchPreSub(tab){
  document.querySelectorAll('#panel-pre .stabpanel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('#panel-pre .stab').forEach(b=>b.classList.remove('active'));
  document.getElementById('sp-'+tab).classList.add('active');
  document.getElementById('pst-'+tab).classList.add('active');
}
function switchPostSub(tab){
  document.querySelectorAll('#panel-post .stabpanel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('#panel-post .stab').forEach(b=>b.classList.remove('active'));
  document.getElementById('psp-'+tab).classList.add('active');
  document.getElementById('post-st-'+tab).classList.add('active');
}
function toggleCard(id){
  const hd=document.querySelector('#'+id+' .card-hd');
  const bd=document.querySelector('#'+id+' .card-body');
  const open=hd.classList.toggle('open');
  bd.classList.toggle('open',open);
  hd.querySelector('.card-arrow').style.transform=open?'rotate(90deg)':'';
}
function switchHookTab(tab){
  document.querySelectorAll('.htab').forEach(b=>b.classList.remove('active'));
  document.getElementById('ht-'+tab).classList.add('active');
  document.getElementById('hp-verbal').style.display=tab==='verbal'?'block':'none';
  document.getElementById('hp-rehook').style.display=tab==='rehook'?'block':'none';
}

// ─── ICP ───
const ICP_DESC = {
  'มนุษย์เงินเดือน':'💼 เน้น: ลดหย่อนภาษี · สิทธิประโยชน์ · จัดสรรพอร์ตเงินออม · Welfare Guard ป้องกันเหตุฉุกเฉิน',
  'คนสร้างครอบครัว':'👨‍👩‍👧 เน้น: เสถียรภาพสินทรัพย์ · ประกันหนี้บ้าน · พอร์ตการศึกษาลูก · ความมั่นคงระยะยาว',
  'ธุรกิจ + ฟรีแลนซ์':'🚀 เน้น: แยกเงินธุรกิจ-ส่วนตัว · ลดภาษีบุคคลธรรมดา · กระแสเงินสด · โครงสร้างนิติบุคคล'
};
function setICP(btn, v){
  S.icp=v;
  document.querySelectorAll('#icp-chips .chip').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('icp-desc').textContent=ICP_DESC[v]||'';
  markDone(1);
  renderIdeas();
  svS();
  toast('✅','เลือก ICP: '+v);
}

// ─── FUNNEL ───
function setFunnel(el, v){
  S.funnel=v;
  document.querySelectorAll('.fcol').forEach(c=>c.classList.remove('active'));
  el.classList.add('active');
  markDone(2);
  renderIdeas();
  renderCTA();
  renderVerbalHooks();
  svS();
  toast('✅','เลือก Funnel: '+v);
}

// ─── IDEAS ───
const IDEAS = {
  'มนุษย์เงินเดือน':{
    'TOFU':['5 สิทธิ์ลดหย่อนภาษีที่มนุษย์เงินเดือนมักพลาด','เงินเดือน 30K ออมยังไงให้ได้ 1 แสนใน 1 ปี','วางแผนภาษีปีนี้ก่อนธันวาคม: Checklist 10 ข้อ','LTF vs SSF vs RMF เลือกยังไงให้ได้คืนภาษีสูงสุด','กองทุนสำรองเลี้ยงชีพ: ของฟรีที่หลายคนยังไม่ใช้'],
    'MOFU':['เปิดงบค่าใช้จ่ายของผมต่อเดือน: ทำยังไงให้เหลือออม','ผมทำประกันสุขภาพครั้งแรก: บทเรียนราคาแพง','3 ขั้นตอนจัดพอร์ตเงินออมสำหรับมนุษย์เงินเดือน','วิธีคำนวณว่าคุณควรออมเดือนละเท่าไหร่','เบื้องหลังการลดภาษีของผม 50,000 บาทใน 1 ปี'],
    'BOFU':['บริการตรวจสุขภาพการเงินฟรี: คุณจ่ายภาษีเกินอยู่ไหม?','ทักมาได้เลย: วางแผนลดหย่อนภาษีปีนี้','Case Study: ลูกค้าผมประหยัดภาษีได้ 80,000 บาท/ปี','Zoom 1-on-1: กางสเปรดชีตพอร์ตการเงินให้คุณ']
  },
  'คนสร้างครอบครัว':{
    'TOFU':['ประกันชีวิต vs ประกันสุขภาพ: ซื้อแบบไหนก่อน?','เตรียมเงินก้อนแรกสำหรับบ้าน: ทำยังไง','ค่าเล่าเรียนลูก 18 ปีข้างหน้า: เริ่มออมตอนนี้เท่าไหร่','ผ่อนบ้านกับออมเงิน ทำพร้อมกันได้ไหม','5 ข้อผิดพลาดในการวางแผนการเงินครอบครัว'],
    'MOFU':['เปิดพอร์ตทุนการศึกษาลูกของผม: ลงทุนอะไรบ้าง','ประกันชีวิตของผม: ทำไมเลือกแบบนี้','วิธีคุยเรื่องเงินในครอบครัวโดยไม่ทะเลาะกัน'],
    'BOFU':['ตรวจพอร์ตครอบครัวฟรี: อุดรอยรั่วก่อนสายเกินไป','Case Study: จัดโครงสร้างการเงินครอบครัว 2 รายได้']
  },
  'ธุรกิจ + ฟรีแลนซ์':{
    'TOFU':['ฟรีแลนซ์รายได้สูงแต่ภาษีเยอะ: แก้ยังไง','แยกบัญชีธุรกิจกับส่วนตัว: ทำแล้วชีวิตง่ายขึ้น','SME กับ Sole Proprietor ต่างกันยังไงในแง่ภาษี','รายจ่ายอะไรที่ธุรกิจนำมาหักภาษีได้บ้าง'],
    'MOFU':['เปิดงบกำไร-ขาดทุนของธุรกิจผมปีแรก','จดบริษัทดีกว่าทำในนามบุคคลไหม: ผมลองแล้ว','วิธีจ่ายเงินเดือนตัวเองจากบริษัทให้ประหยัดภาษี'],
    'BOFU':['ปรึกษาโครงสร้างภาษีธุรกิจ: ทักมาได้เลย','Case Study: ช่วยเจ้าของธุรกิจประหยัดภาษี 200,000 บาท/ปี']
  }
};

function renderIdeas(){
  const c=document.getElementById('ideas-container');
  if(!S.icp||!S.funnel){c.innerHTML='<div class="empty-msg">👆 เลือก ICP และ Funnel ก่อน</div>';return;}
  const ideas=(IDEAS[S.icp]||{})[S.funnel]||[];
  c.innerHTML=`<div class="idea-grid">${ideas.map((idea,i)=>`<div class="idea-card${S.idea===idea?' active':''}" onclick="selIdea('${idea.replace(/'/g,"\'")}',this)">${idea}</div>`).join('')}</div>`;
}
function selIdea(idea, el){
  S.idea=idea;
  document.querySelectorAll('.idea-card').forEach(c=>c.classList.remove('active'));
  el.classList.add('active');
  const ci=document.getElementById('custom-idea');
  if(ci) ci.value='';
  markDone(3);
  renderVerbalHooks();
  svS();
  toast('💡','เลือกไอเดีย: '+idea.substring(0,30)+'...');
}
function setCustomIdea(v){
  if(v) S.idea=v;
  markDone(3);
  renderVerbalHooks();
  svS();
}

// ─── FORMAT ───
const FORMATS=[
  {icon:'🎙',name:'Talking Head',desc:'พูดหน้ากล้องตรงๆ',funnel:['TOFU','MOFU','BOFU']},
  {icon:'🎥',name:'Vlog',desc:'เดิน+พูด เบื้องหลัง',funnel:['MOFU']},
  {icon:'🎭',name:'Skit / POV',desc:'จำลองสถานการณ์',funnel:['TOFU']},
  {icon:'📊',name:'Case Study',desc:'เคสจริง ตัวเลขจริง',funnel:['MOFU','BOFU']},
  {icon:'🟩',name:'Green Screen',desc:'กรีนสกรีน+กราฟ',funnel:['MOFU']},
  {icon:'🆚',name:'Comparison',desc:'เปรียบเทียบ A vs B',funnel:['TOFU']},
  {icon:'🏆',name:'Rating / Tier',desc:'จัดอันดับ เรตติ้ง',funnel:['TOFU']},
  {icon:'📋',name:'Tutorial',desc:'สอนทีละขั้นตอน',funnel:['MOFU']}
];
function renderFormats(){
  const g=document.getElementById('format-grid');
  if(!g) return;
  g.innerHTML=FORMATS.map((f,i)=>`<div class="fmt-card${S.format===f.name?' active':''}" onclick="setFormat(${i},this)">
    <div class="fmt-icon">${f.icon}</div>
    <div class="fmt-name">${f.name}</div>
    <div class="fmt-desc">${f.desc}</div>
    ${S.funnel&&f.funnel.includes(S.funnel)?`<div style="font-size:10px;color:var(--green);margin-top:2px">★ แนะนำสำหรับ ${S.funnel}</div>`:''}
  </div>`).join('');
}
function setFormat(i, el){
  S.format=FORMATS[i].name;
  document.querySelectorAll('.fmt-card').forEach(c=>c.classList.remove('active'));
  el.classList.add('active');
  markDone(4);svS();toast('✅','เลือก Format: '+S.format);
}

// ─── STRUCTURE ───
const STRUCTURES=[
  {name:'Hook → Problem → Solution → CTA',desc:'สูตรคลาสสิค เหมาะกับ TOFU-MOFU'},
  {name:'Hook → Story → Lesson → CTA',desc:'เล่าเรื่อง ดึงบทเรียน ปิดด้วยคุณค่า'},
  {name:'Hook → Numbers → Insight → CTA',desc:'ขึ้นด้วยตัวเลข น่าสนใจ น่าเชื่อ'},
  {name:'Hook → Myth → Truth → CTA',desc:'หักล้างความเชื่อผิดๆ — Pattern Interrupt'},
  {name:'Hook → Framework → Examples → CTA',desc:'สร้าง Framework ตัวเอง แล้วอธิบาย'},
  {name:'Hook → List (1-2-3) → CTA',desc:'เรียบง่าย จดจำง่าย ดูจบง่าย'}
];
function renderStructures(){
  const l=document.getElementById('struct-list');
  if(!l) return;
  l.innerHTML=STRUCTURES.map((s,i)=>`<div class="struct-row${S.structure===s.name?' active':''}" onclick="setStructure(${i},this)">
    <div class="struct-name">${s.name}</div>
    <div class="struct-desc">${s.desc}</div>
  </div>`).join('');
}
function setStructure(i, el){
  S.structure=STRUCTURES[i].name;
  document.querySelectorAll('.struct-row').forEach(r=>r.classList.remove('active'));
  el.classList.add('active');
  markDone(5);svS();toast('✅','เลือก Structure');
}

// ─── CORE VALUE ───
const CV_POOL = {
  'TOFU':[
    {icon:'⚡',name:'Pattern Interrupt',sub:'ทำลายความเคยชินของคนดูใน 3 วินาทีแรก'},
    {icon:'🤝',name:'Relatability',sub:'คนดูรู้สึกว่า "นั่นแหละชีวิตฉัน!"'},
    {icon:'📊',name:'Visual Clarity',sub:'เข้าใจได้ทันทีแม้ปิดเสียง'},
    {icon:'🔥',name:'Curiosity Loop',sub:'ทำให้อยากรู้ว่าจะเกิดอะไรขึ้นต่อ'},
    {icon:'😂',name:'Entertainment',sub:'ดูสนุก ติดตาม ไม่น่าเบื่อ'},
    {icon:'🌐',name:'Broad Appeal',sub:'เข้าถึงคนวงกว้าง ไม่ต้องมีความรู้เดิม'},
    {icon:'💥',name:'Myth Busting',sub:'หักล้างความเชื่อเดิม สร้างกระแสถกเถียง'}
  ],
  'MOFU':[
    {icon:'📚',name:'Deep Education',sub:'ให้ความรู้ลึกที่นำไปใช้ได้ทันที'},
    {icon:'💎',name:'Authority',sub:'แสดงความเชี่ยวชาญระดับมืออาชีพ'},
    {icon:'🔍',name:'Insider Knowledge',sub:'ข้อมูลที่คนทั่วไปไม่รู้ รู้สึกพิเศษ'},
    {icon:'🎯',name:'Actionable Tips',sub:'เทคนิคปฏิบัติได้จริง ทำได้เลย'},
    {icon:'📈',name:'Aspiration',sub:'ดึงให้อยากก้าวสู่จุดที่ดีกว่า'},
    {icon:'🛡',name:'Risk Awareness',sub:'เตือนภัย ช่วยหลีกเลี่ยงความผิดพลาด'},
    {icon:'🤍',name:'Transparency',sub:'แบ่งปันประสบการณ์จริง โปร่งใส 100%'}
  ],
  'BOFU':[
    {icon:'✅',name:'Social Proof',sub:'ผลลัพธ์จริงจากลูกค้าจริง'},
    {icon:'🏆',name:'Credibility',sub:'พิสูจน์ความน่าเชื่อถือในฐานะผู้เชี่ยวชาญ'},
    {icon:'🎁',name:'Value Offer',sub:'ชัดเจนว่าได้อะไรจากการตัดสินใจ'},
    {icon:'⏰',name:'Urgency',sub:'กระตุ้นการตัดสินใจด้วยความจำกัด'},
    {icon:'🤝',name:'Trust Building',sub:'ลดความกังวลด้วยความโปร่งใส'},
    {icon:'💼',name:'Professional',sub:'ดูเป็นมืออาชีพที่ไว้วางใจได้'},
    {icon:'🎯',name:'Direct CTA',sub:'ชัดเจน ตรงไปตรงมา ไม่อ้อมค้อม'}
  ]
};
function generateCoreValues(){
  const pool = CV_POOL[S.funnel||'TOFU'];
  const used=[];
  S.coreValues=S.coreValues.map((v,i)=>v||pickCV(pool,used));
  renderCoreValues();
  svS();
  toast('✨','สร้าง Core Values แล้ว');
}
function pickCV(pool, used){
  const avail=pool.filter(p=>!used.find(u=>u.name===p.name));
  if(!avail.length) return pool[Math.floor(Math.random()*pool.length)];
  const picked=avail[Math.floor(Math.random()*avail.length)];
  used.push(picked);return picked;
}
function refreshCV(i){
  const pool=CV_POOL[S.funnel||'TOFU'];
  const used=S.coreValues.filter((v,j)=>v&&j!==i);
  S.coreValues[i]=pickCV(pool,used);
  renderCoreValues();svS();
}
function renderCoreValues(){
  const g=document.getElementById('cv-grid');
  if(!g) return;
  g.innerHTML=S.coreValues.map((v,i)=>v?`<div class="cv-card">
    <button class="cv-refresh" onclick="event.stopPropagation();refreshCV(${i})" title="สร้างใหม่">🔄</button>
    <div class="cv-icon">${v.icon}</div>
    <div class="cv-text">${v.name}</div>
    <div class="cv-sub">${v.sub}</div>
  </div>`:`<div class="cv-card" style="border:1.5px dashed var(--border2);display:flex;align-items:center;justify-content:center;color:var(--text3);font-size:12px;cursor:pointer" onclick="generateCoreValues()">+ Generate</div>`).join('');
  if(S.coreValues.some(v=>v)) markDone(6);
}

// ─── VERBAL HOOKS ───
const VERBAL_HOOKS = {
  'TOFU':[
    '[หัวข้อ] นี่คือสิ่งที่คน 99% มักจะเข้าใจผิด',
    'ถ้าคุณกำลังทำ [หัวข้อ] อยู่ หยุดดูคลิปนี้ก่อนครับ',
    'ความลับของ [หัวข้อ] ที่ไม่มีใครยอมบอกคุณ',
    'นี่คือวิธีรับมือกับ [หัวข้อ] ฉบับ [ICP]',
    'รู้หรือไม่? [หัวข้อ] สามารถเปลี่ยนชีวิตคุณได้ใน 3 นาที',
    'ใครว่า [หัวข้อ] เป็นเรื่องยาก? ผมจะทำให้ดู',
    'จัดอันดับ [หัวข้อ] จากแย่สุดไปดีสุด',
    'ถ้าคุณเป็น [ICP] นี่คือ [หัวข้อ] ที่คุณต้องรู้',
    'คุณกำลังสูญเสียโอกาสถ้ายังไม่รู้เรื่อง [หัวข้อ]',
    'สิ่งที่ [ICP] มักพลาดเมื่อพูดถึง [หัวข้อ]'
  ],
  'MOFU':[
    'ผมลองทำ [หัวข้อ] มาแล้ว และนี่คือสิ่งที่ได้เรียนรู้',
    '3 ขั้นตอนง่ายๆ ในการจัดการ [หัวข้อ]',
    'นี่คือความจริงเบื้องหลัง [หัวข้อ] ที่ผมเจอมากับตัว',
    'เบื้องหลังความสำเร็จของ [หัวข้อ] ที่ผมใช้บ่อยที่สุด',
    'ทำไม [ICP] ถึงควรใส่ใจเรื่อง [หัวข้อ] มากขึ้น',
    'บทเรียนราคาแพงจากการทำ [หัวข้อ] ผิดพลาด',
    'วิธีสร้าง [หัวข้อ] จากศูนย์จนสำเร็จ',
    'ถ้าให้ผมเริ่ม [หัวข้อ] ใหม่ตั้งแต่ต้น ผมจะทำแบบนี้',
    'คำถามที่ [ICP] ถามผมบ่อยที่สุดเกี่ยวกับ [หัวข้อ]',
    'แชร์ประสบการณ์ตรง: เมื่อผมต้องรับมือกับ [หัวข้อ]'
  ],
  'BOFU':[
    'เครื่องมือที่ดีที่สุดสำหรับ [หัวข้อ] ที่ผมอยากแนะนำ',
    'ไม่ต้องลองผิดลองถูก นี่คือทางลัดสำหรับ [หัวข้อ]',
    'ถ้าคุณพร้อมจะเปลี่ยน [หัวข้อ] ให้ดีขึ้น นี่คือคำตอบ',
    'รีวิวแบบหมดเปลือก: [หัวข้อ] ดีจริงหรือจกตา?',
    'วิธีประยุกต์ใช้ [หัวข้อ] ให้ได้ผลลัพธ์ทันที',
    'Case Study จริง: ผมช่วย [ICP] แก้ปัญหา [หัวข้อ] ได้ยังไง',
    'ทำไมลูกค้าของผมถึงประสบความสำเร็จกับ [หัวข้อ]'
  ]
};
const REHOOKS = [
  {cat:'🔀 Surprise Shift',items:['แต่นี่คือสิ่งที่ทำให้ผมตกใจที่สุดครับ...','แต่สิ่งที่ผมค้นพบหลังจากนั้น... ไม่มีใครเคยบอกผมมาก่อนเลย...','แต่ตัวเลขที่แท้จริงมันช็อคกว่านั้นมากครับ...','แต่เดี๋ยวก่อน... มีอีกสิ่งหนึ่งที่พลิกทุกอย่างออกไปเลย...']},
  {cat:'⚠️ Common Mistake',items:['คนส่วนใหญ่ทำผิดเรื่องนี้โดยไม่รู้ตัวเลยครับ...','ความผิดพลาดที่คนทำบ่อยที่สุดคือ... และคุณอาจกำลังทำอยู่ด้วยครับ...','และนี่คือข้อผิดพลาดที่แม้แต่คนที่ฉลาดเรื่องเงินก็ยังทำอยู่ครับ...']},
  {cat:'🔓 Open Loop',items:['เดี๋ยวผมจะเฉลยตอนท้ายคลิป... แต่ก่อนอื่น...','ซึ่งจุดนี้เองที่หลายคนพลาด... และผมจะบอกว่าทำไม...','และความลับที่แท้จริงคือ... แต่รอก่อน...']},
  {cat:'💰 Value Promise',items:['ถ้ารู้เทคนิคนี้ ชีวิตจะง่ายขึ้นเยอะครับ...','ถ้าทำตามข้อนี้ได้ คุณจะประหยัดเงินไปได้มากครับ...','นี่คือเหตุผลที่ข้อต่อไปสำคัญมากที่สุดครับ...']}
];

function renderVerbalHooks(){
  const catEl=document.getElementById('verbal-cat-chips');
  const listEl=document.getElementById('verbal-hooks');
  if(!catEl||!listEl) return;
  const cats=['TOFU','MOFU','BOFU'];
  catEl.innerHTML=cats.map(c=>`<button class="chip${S.verbalCat===c?' active':''}" onclick="setVerbalCat('${c}')" style="font-size:12px">${c}</button>`).join('');
  const hooks=(VERBAL_HOOKS[S.verbalCat]||[]).map(h=>{
    const applied=h.replace(/\[หัวข้อ\]/g,S.idea||'[หัวข้อ]').replace(/\[ICP\]/g,S.icp||'[ICP]');
    const isSel=S.verbalHook===applied;
    return `<div class="hook-row${isSel?' active':''}" onclick="setVerbalHook(this,'${applied.replace(/'/g,"\'")}')">🪝 ${eh(applied)}</div>`;
  });
  listEl.innerHTML=hooks.join('');
}
function setVerbalCat(cat){
  S.verbalCat=cat;renderVerbalHooks();svS();
}
function setVerbalHook(el, h){
  S.verbalHook=h;
  document.querySelectorAll('.hook-row').forEach(r=>r.classList.remove('active'));
  el.classList.add('active');
  markDone(7);svS();toast('🪝','เลือก Verbal Hook แล้ว');
}

function renderRehooks(){
  const c=document.getElementById('rehook-list');
  if(!c) return;
  c.innerHTML=REHOOKS.map(cat=>`<div class="hook-cat">${cat.cat}</div>`+
    cat.items.map(h=>`<div class="hook-row${(S.rehooks||[]).includes(h)?' active':''}" onclick="toggleRehook(this,'${h.replace(/'/g,"\'")}')">
      ${(S.rehooks||[]).includes(h)?'✅ ':'🔄 '} ${eh(h)}</div>`).join('')).join('');
}
function toggleRehook(el, h){
  S.rehooks=S.rehooks||[];
  if(S.rehooks.includes(h)) S.rehooks=S.rehooks.filter(x=>x!==h);
  else S.rehooks.push(h);
  el.classList.toggle('active',S.rehooks.includes(h));
  el.textContent=(S.rehooks.includes(h)?'✅ ':'🔄 ')+h;
  svS();
}

// ─── CTA ───
const CTA_LIB = {
  'TOFU':[
    {type:'Follow','text':'ถ้าชอบ กด Follow ไว้ — มีเนื้อหาแบบนี้ทุกอาทิตย์ครับ'},
    {type:'Save','text':'Save คลิปนี้ไว้เลยครับ — เดี๋ยวจะได้กลับมาดูซ้ำ'},
    {type:'Share','text':'แชร์ให้เพื่อนที่กำลังเจอปัญหาแบบนี้ด้วยนะครับ'},
    {type:'Comment','text':'คอมเมนต์บอกผมหน่อยครับว่าคุณเจอปัญหาไหนบ้าง?'}
  ],
  'MOFU':[
    {type:'Save','text':'Save ไว้ก่อนเลยครับ — มีของดีอยู่ในคลิปนี้เยอะมาก'},
    {type:'Comment Keyword','text':'Comment "[KEYWORD]" ด้านล่าง เดี๋ยวผมส่งคู่มือให้ใน DM ทันทีครับ'},
    {type:'Follow','text':'Follow ไว้นะครับ — ผมจะแชร์เบื้องหลังแบบนี้ทุกสัปดาห์'},
    {type:'Community','text':'เข้า Community ของผมได้เลย ลิงก์อยู่ใน Bio ครับ'}
  ],
  'BOFU':[
    {type:'DM ✉️','text':'ทักมาใน DM คำว่า "[KEYWORD]" เดี๋ยวผมส่งรายละเอียดให้ทันทีครับ'},
    {type:'Chat 💬','text':'พิมพ์ "[KEYWORD]" ใต้คลิปนี้ ระบบจะส่งลิงก์นัด Zoom ให้ครับ'},
    {type:'Link in Bio 🔗','text':'Link อยู่ใน Bio — คลิกเพื่อนัดคุยวางแผนการเงินฟรี 30 นาทีครับ'},
    {type:'Zoom 📅','text':'เดือนนี้เปิดรับแค่ 5 ท่าน — ทักมาก่อนที่จะหมดนะครับ'}
  ]
};
function renderCTA(){
  const c=document.getElementById('cta-list');
  if(!c) return;
  if(!S.funnel){c.innerHTML='<div class="empty-msg">เลือก Funnel Stage ก่อน</div>';return;}
  const ctas=CTA_LIB[S.funnel]||[];
  c.innerHTML=`<div class="cta-grid">${ctas.map(ct=>`<div class="cta-row${S.cta===ct.text?' active':''}" onclick="setCTA(this,'${ct.text.replace(/'/g,"\'")}')">
    <div class="cta-type" style="color:${S.funnel==='TOFU'?'var(--tofu)':S.funnel==='MOFU'?'var(--mofu)':'var(--bofu)'}">${ct.type}</div>
    <div>${eh(ct.text)}</div>
  </div>`).join('')}</div>`;
}
function setCTA(el, t){
  S.cta=t;
  document.querySelectorAll('.cta-row').forEach(r=>r.classList.remove('active'));
  el.classList.add('active');
  markDone(8);svS();toast('✅','เลือก CTA แล้ว');
}

// ─── MASTER SCRIPT ───
function generateScript(){
  const lines=[];
  lines.push('=== 🎬 MASTER SCRIPT ===');
  if(S.icp) lines.push(`
[ICP] ${S.icp}`);
  if(S.funnel) lines.push(`[Funnel] ${S.funnel}`);
  if(S.idea) lines.push(`[Idea] ${S.idea}`);
  if(S.format) lines.push(`[Format] ${S.format}`);
  if(S.structure) lines.push(`[Structure] ${S.structure}`);
  if(S.coreValues.some(v=>v)){
    lines.push(`
[Core Values]`);
    S.coreValues.forEach((v,i)=>{if(v)lines.push(`  ${i+1}. ${v.icon} ${v.name}: ${v.sub}`)});
  }
  lines.push(`
──────────────────────────────`);
  lines.push('🪝 HOOK (0-3 วิ)');
  lines.push(S.verbalHook||'[พิมพ์ Verbal Hook ที่นี่]');
  lines.push(`
🎬 VISUAL HOOK`);
  lines.push(S.vhook?`→ ${S.vhook}`:'[ระบุ Visual Hook]');
  lines.push(`
──────────────────────────────`);
  lines.push('📖 BODY / MIDDLE');
  if(S.structure){
    const parts=S.structure.split('→').map(p=>p.trim()).filter(p=>p!=='CTA'&&p!=='Hook');
    parts.forEach(p=>lines.push(`
[${p}]
[เขียนเนื้อหา ${p} ที่นี่...]`));
  } else {
    lines.push('[เขียนเนื้อหาหลักที่นี่...]');
  }
  if(S.rehooks&&S.rehooks.length){
    lines.push(`
🔄 RE-HOOK`);
    S.rehooks.forEach(r=>lines.push(`→ ${r}`));
  }
  lines.push(`
──────────────────────────────`);
  lines.push('🎯 CTA (ปิดท้าย)');
  lines.push(S.cta||'[พิมพ์ CTA ที่นี่]');
  const text=lines.join('\n');
  S.script=text;
  const ta=document.getElementById('master-script');
  if(ta){ta.value=text;ta.style.height='auto';ta.style.height=ta.scrollHeight+'px';}
  markDone(9);svS();toast('✅','สร้าง Master Script แล้ว');
}
function copyScript(){
  const t=document.getElementById('master-script')?.value||S.script;
  navigator.clipboard.writeText(t).then(()=>toast('📋','Copy แล้ว!'));
}

// ─── VISUAL HOOKS ───
const VHOOKS=[
  {name:'Unique Angle',desc:'POV / High-angle / Low-angle แทน Eye-level ธรรมดา'},
  {name:'Bold Cinematic Text',desc:'ตัวอักษรขึ้นจอบน Negative Space — ไม่มีเสียงก็ดูรู้เรื่อง'},
  {name:'Countdown',desc:'นับถอยหลัง 5-3-1 → payoff — ดึงคนอยู่ถึงจุดสำคัญ'},
  {name:'Funny / Unusual Visual',desc:'ภาพแปลกตาหรือตลกขบขันดึงความสนใจทันที'},
  {name:'Walking & Talking',desc:'เดินขณะพูด — เพิ่ม Energy โดยไม่ต้องขยับกล้อง'},
  {name:'Unique Effect',desc:'Whip-action / Effect ที่คนไม่คาดว่าจะเห็นใน Financetry'}
];
function renderVHooks(){
  const g=document.getElementById('vhook-grid');
  if(!g) return;
  g.innerHTML=VHOOKS.map((v,i)=>`<div class="vhook-card${S.vhook===v.name?' active':''}" onclick="setVHook(${i},this)">
    <div class="vhook-name">${v.name}</div>
    <div class="vhook-desc">${v.desc}</div>
  </div>`).join('');
}
function setVHook(i, el){
  S.vhook=VHOOKS[i].name;
  document.querySelectorAll('.vhook-card').forEach(c=>c.classList.remove('active'));
  el.classList.add('active');
  svS();toast('✅','เลือก Visual Hook: '+S.vhook);
}

// ─── MULTI-SELECT ───
function toggleMulti(el, key, value){
  S[key]=S[key]||[];
  if(S[key].includes(value)){S[key]=S[key].filter(v=>v!==value);el.classList.remove('active');}
  else{S[key].push(value);el.classList.add('active');}
  svS();
}

// ─── AUDIO HOOK ───
function switchAudioHookTab(tab){
  S.hookSection=tab;
  document.querySelectorAll('[id^="aht-"]').forEach(b=>b.classList.remove('active'));
  document.getElementById('aht-'+tab).classList.add('active');
  renderHookTracks();
  svS();
}
function renderHookTracks(){
  const c=document.getElementById('hook-tracks');
  if(!c) return;
  const tracks=S.hookSection==='cine'?ADB.hook_cine:ADB.hook_tonal;
  renderTrackList('hook_'+S.hookSection,'',c,tracks);
}

// ─── BGM ───
function renderBGMMoodTabs(){
  const tabs=document.getElementById('bgm-mood-tabs');
  if(!tabs) return;
  const moods=Object.keys(ADB.bgm);
  tabs.innerHTML=moods.map(m=>`<button class="bgm-tab${S.bgmMood===m?' active':''}" onclick="setBGMMood('${m}')">${m.replace(/_/g,' ')}</button>`).join('');
  if(!S.bgmMood&&moods.length) setBGMMood(moods[0]);
}
function setBGMMood(mood){
  S.bgmMood=mood;
  document.querySelectorAll('#bgm-mood-tabs .bgm-tab').forEach(b=>b.classList.toggle('active',b.textContent===mood.replace(/_/g,' ')));
  renderBGMTracks();svS();
}
function renderBGMTracks(){
  const c=document.getElementById('bgm-tracks');
  if(!c||!S.bgmMood) return;
  renderTrackList('bgm',S.bgmMood,c,ADB.bgm[S.bgmMood]||[]);
  document.getElementById('player-bar').style.display='flex';
}

// ─── CONCLUSION ───
function renderConcMoodTabs(){
  const tabs=document.getElementById('conc-mood-tabs');
  if(!tabs) return;
  const moods=Object.keys(ADB.conclusion);
  tabs.innerHTML=moods.map(m=>`<button class="bgm-tab${S.concMood===m?' active':''}" onclick="setConcMood('${m}')">${m}</button>`).join('');
  if(!S.concMood&&moods.length) setConcMood(moods[0]);
}
function setConcMood(mood){
  S.concMood=mood;
  document.querySelectorAll('#conc-mood-tabs .bgm-tab').forEach(b=>b.classList.toggle('active',b.textContent===mood));
  renderConcTracks();svS();
}
function renderConcTracks(){
  const c=document.getElementById('conc-tracks');
  if(!c||!S.concMood) return;
  renderTrackList('conclusion',S.concMood,c,ADB.conclusion[S.concMood]||[]);
}

// ─── PRODUCTION ───
const CAM_CL=[
  '24 fps / Shutter 1/50','Resolution: 4K แนวนอน / 3K แนวตั้ง',
  'Color Profile: D-Log M 10-bit','Indoor Filter: ND2 Black Mist 1/4',
  'Outdoor Filter: VND 2-32'
];
const LIGHT_CL=[
  'Key Light Softbox 45° ด้านหน้า',
  'Fill Light โคมเล็กซับเงา','Ambient: ไฟแท่งสีส้ม',
  'เว้นระยะหลัง 1.5–2 เมตร (Indoor)'
];
const AUDIO_CL=[
  'DJI Mic 2 ติดปกเสื้อ ห่างปาก 1 ฝ่ามือ',
  'Gain: -6dB ถึง -12dB','Noise Cancellation ON (Outdoor เท่านั้น)',
  'ทดสอบเสียงก่อน Record'
];
const WARDROBE_CL=[
  '✅ แนะนำ: สีดำ/กรมท่า/เขียวเข้ม (Professional)',
  '✅ Indoor: จับคู่ Ambient Light สีส้ม',
  '⚠️ ระวัง: สีขาว (สะท้อนแสงมาก)',
  '❌ ห้าม: ลายตารางถี่ / ลายทางเส้นเล็ก (Moire)'
];
function renderSetupChecklists(){
  renderCL('cam-checklist',CAM_CL,'setupCL.cam');
  renderCL('light-checklist',LIGHT_CL,'setupCL.light');
  renderCL('audio-checklist',AUDIO_CL,'setupCL.audio');
  renderCL('wardrobe-checklist',WARDROBE_CL,'setupCL.wardrobe');
}
function renderCL(elId, items, stateKey){
  const el=document.getElementById(elId);
  if(!el) return;
  const keys=stateKey.split('.');
  const arr=(keys.length===2?S[keys[0]][keys[1]]:S[keys[0]])||[];
  el.innerHTML=items.map((item,i)=>`<div class="setup-item${arr.includes(i)?' checked':''}" onclick="toggleCL('${stateKey}',${i},this)">
    <div class="setup-cb">${arr.includes(i)?'✓':''}</div>
    <span style="font-size:12px;color:var(--text2)">${item}</span>
  </div>`).join('');
}
function toggleCL(stateKey, i, el){
  const keys=stateKey.split('.');
  let arr=keys.length===2?S[keys[0]][keys[1]]:S[keys[0]];
  arr=arr||[];
  if(arr.includes(i)) arr=arr.filter(x=>x!==i);
  else arr.push(i);
  if(keys.length===2) S[keys[0]][keys[1]]=arr; else S[keys[0]]=arr;
  el.classList.toggle('checked');
  el.querySelector('.setup-cb').textContent=arr.includes(i)?'✓':'';
  svS();
}

function generateShotList(){
  const shots=[];
  const fmt=S.format||'Talking Head';
  const idea=S.idea||'หัวข้อหลัก';
  const sizes=S.shotSize.length?S.shotSize:['Wide','Medium','Close-up'];
  const angles=S.camAngle.length?S.camAngle:['Eye-level'];
  const enhs=S.enhancements||[];
  shots.push({num:1,desc:`Opening — Visual Hook: ${S.vhook||'ภาพเปิด'}`,size:'Wide',angle:angles[0]||'Eye-level',enh:S.vhook||'',note:'ตัดเริ่มต้นด้วย Motion'});
  shots.push({num:2,desc:`Verbal Hook — "${(S.verbalHook||'Hook ของคุณ').substring(0,40)}..."`,size:'Medium',angle:'Eye-level',enh:enhs.includes('Text Pop-up')?'Text Pop-up':'',note:'Staccato — พูดสั้นกระชับ'});
  sizes.forEach((sz,i)=>{
    angles.forEach((ang,j)=>{
      if(i===0&&j===0) return;
      shots.push({num:shots.length+1,desc:`Body — ${idea} (${sz}/${ang})`,size:sz,angle:ang,enh:enhs[i]||'',note:'Cutting on Motion'});
    });
  });
  if(enhs.length){
    shots.push({num:shots.length+1,desc:`Enhancement Shot — ${enhs.join(', ')}`,size:'Close-up',angle:'Eye-level',enh:enhs.join(', '),note:'ใส่ MGFX/Graphic ตรงจุดนี้'});
  }
  shots.push({num:shots.length+1,desc:`CTA — "${(S.cta||'CTA').substring(0,40)}..."`,size:'Medium',angle:'Eye-level',enh:'',note:'มองกล้องตรงๆ พูด CTA ชัดๆ'});
  S.shotList=shots;
  renderShotList();svS();toast('✅','สร้าง Shot List แล้ว '+shots.length+' ช็อต');
}
function renderShotList(){
  const c=document.getElementById('shot-list-container');
  if(!c) return;
  c.innerHTML=S.shotList.map(s=>`<div class="shot-card">
    <div class="shot-num">Shot ${s.num}</div>
    <div class="shot-desc">${eh(s.desc)}</div>
    <div class="shot-meta">
      <span class="shot-tag size">📐 ${s.size}</span>
      <span class="shot-tag angle">📷 ${s.angle}</span>
      ${s.enh?`<span class="shot-tag enh">✨ ${eh(s.enh)}</span>`:''}
    </div>
    ${s.note?`<div style="font-size:11px;color:var(--text3);margin-top:4px">💬 ${s.note}</div>`:''}
  </div>`).join('');
}

// ─── POST-PRODUCTION ───
const COLOR_CL=['Import footage → ตรวจสอบ D-Log M 10-bit','Apply Base Normalization LUT ก่อน','เลือก Creative LUT ตาม Mood ที่ต้องการ','Adjust Exposure/Contrast/Saturation','Export ด้วย H.264/HEVC สำหรับ Social'];
const VOICE_CL=['ตัด Room Noise ด้วย Noise Reduction','Remove background hum/buzz','เพิ่ม EQ: boost 2-4kHz (clarity) cut <80Hz (rumble)','Compress ให้เสียงสม่ำเสมอ','Normalize ที่ -14 LUFS สำหรับ Social'];
const MIX_CL=['วาง Audio Hook ที่ตำแหน่ง 0:00','วาง BGM ลดระดับ -20dB เป็น bed','Audio Ducking อัตโนมัติเมื่อมีบทพูด','วาง SFX ตรงจุด Enhancements','วาง Conclusion Music ท้ายคลิป','Master ที่ -14 LUFS / -1 dBTP'];
const SUB_CL=['Export SRT จาก Gemini (ดู Gemini-SRT-Subtitles.md)','ตรวจสอบ Timing ± 0.5 วินาที','เช็ค Spelling ภาษาไทย','Import SRT เข้า Editing Software','Style: Sarabun Bold ขาว / Stroke ดำ'];
function renderPostCLs(){
  renderPostCL('color-cl',COLOR_CL,'color');
  renderPostCL('voice-cl',VOICE_CL,'voice');
  renderPostCL('mix-cl',MIX_CL,'mix');
  renderPostCL('sub-cl',SUB_CL,'sub');
}
function renderPostCL(elId, items, key){
  const el=document.getElementById(elId);
  if(!el) return;
  const done=S.postCL[key]||[];
  el.innerHTML=items.map((item,i)=>`<div class="cl-item${done.includes(i)?' done':''}" onclick="togglePostCL('${key}',${i},this)">
    <div class="cl-check"></div>
    <div class="cl-text">${item}</div>
  </div>`).join('');
}
function togglePostCL(key, i, el){
  S.postCL=S.postCL||{};S.postCL[key]=S.postCL[key]||[];
  if(S.postCL[key].includes(i)) S.postCL[key]=S.postCL[key].filter(x=>x!==i);
  else S.postCL[key].push(i);
  el.classList.toggle('done');
  svS();
}

function generateEditList(){
  const rows=[];
  const struct=(S.structure||'Hook → Problem → Solution → CTA').split('→').map(p=>p.trim());
  rows.push({sec:'Hook',content:(S.verbalHook||'Verbal Hook').substring(0,50),size:'Medium',angle:'Eye-level',enh:S.vhook||'—',note:'Cutting on Motion เปิด'});
  struct.filter(p=>p!=='Hook'&&p!=='CTA').forEach((p,i)=>{
    rows.push({sec:p,content:`[เนื้อหา ${p}]`,size:S.shotSize[i]||'Medium',angle:S.camAngle[i]||'Eye-level',enh:S.enhancements[i]||'—',note:'ตัดตาม Script'});
  });
  if(S.enhancements&&S.enhancements.length){
    rows.push({sec:'Enhancement',content:`${S.enhancements.join(', ')}`,size:'Close-up',angle:'Eye-level',enh:S.enhancements.join(' + '),note:'ซ้อน Overlay/MGFX'});
  }
  rows.push({sec:'CTA',content:(S.cta||'Call to Action').substring(0,50),size:'Medium',angle:'Eye-level',enh:'—',note:'มองกล้องตรงๆ'});
  S.editList=rows;
  const tbody=document.getElementById('edit-list-body');
  if(tbody) tbody.innerHTML=rows.map((r,i)=>`<tr>
    <td style="color:var(--text3)">${i+1}</td>
    <td><span style="font-weight:700;color:${i===0?'var(--blue)':i===rows.length-1?'var(--green)':'var(--gold)'}">${r.sec}</span></td>
    <td>${eh(r.content)}</td>
    <td><span class="shot-tag size">${r.size}</span></td>
    <td><span class="shot-tag angle">${r.angle}</span></td>
    <td><span class="shot-tag enh">${r.enh}</span></td>
    <td style="color:var(--text3);font-size:11px">${r.note}</td>
  </tr>`).join('');
  svS();toast('✅','สร้าง Edit List แล้ว');
}

// ─── LUT ───
function setLUT(el, lut){
  S.lut=lut;
  document.querySelectorAll('#lut-chips .chip').forEach(c=>c.classList.remove('active'));
  el.classList.add('active');
  svS();toast('🎨','เลือก LUT: '+lut);
}

// ─── HELPERS ───
function eh(s){ const d=document.createElement('div');d.textContent=s;return d.innerHTML; }
function toast(icon, msg){
  const t=document.createElement('div');t.className='toast';t.innerHTML=`<span>${icon}</span><span>${msg}</span>`;
  const c=document.getElementById('toast-container');c.appendChild(t);
  setTimeout(()=>{t.classList.add('out');setTimeout(()=>t.remove(),250)},2500);
}
function markDone(step){
  const n=document.getElementById('n'+step);
  if(n) n.classList.add('done');
}
function exportAll(){
  const d={...S,exported:new Date().toISOString()};
  const b=new Blob([JSON.stringify(d,null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(b);
  a.download='creator-studio-'+Date.now()+'.json';a.click();
  toast('⬇','Export แล้ว!');
}

// ─── INIT ───
function init(){
  try {
  // Restore ICP
  if(S.icp){
    document.querySelectorAll('#icp-chips .chip').forEach(b=>{
      if(b.textContent.includes(S.icp)){b.classList.add('active');}
    });
    document.getElementById('icp-desc').textContent=ICP_DESC[S.icp]||'';
    markDone(1);
  }
  // Restore Funnel
  if(S.funnel){
    document.querySelectorAll('.fcol').forEach(c=>{
      if(c.querySelector('.ftag').textContent===S.funnel) c.classList.add('active');
    });
    markDone(2);
  }
  renderIdeas();
  renderFormats();
  renderStructures();
  renderCoreValues();
  renderVerbalHooks();
  renderRehooks();
  renderCTA();
  renderVHooks();
  // Audio
  renderHookTracks();
  renderBGMMoodTabs();
  renderConcMoodTabs();
  updatePlayerUI();
  // Restore format
  if(S.format){
    const fi=FORMATS.findIndex(f=>f.name===S.format);
    if(fi>=0){const el=document.querySelectorAll('.fmt-card')[fi];if(el)el.classList.add('active');}
    markDone(4);
  }
  // Restore structure
  if(S.structure){
    const si=STRUCTURES.findIndex(s=>s.name===S.structure);
    if(si>=0){const el=document.querySelectorAll('.struct-row')[si];if(el)el.classList.add('active');}
    markDone(5);
  }
  // Restore script
  const ta=document.getElementById('master-script');
  if(ta&&S.script) ta.value=S.script;
  // Restore vhook
  if(S.vhook){markDone(7);}
  if(S.verbalHook) markDone(7);
  if(S.cta) markDone(8);
  if(S.script) markDone(9);
  // Restore multi-select chips
  ['shotSize','camAngle','enhancements'].forEach(key=>{
    document.querySelectorAll(`[onclick*="toggleMulti(this,'${key}'"]`).forEach(btn=>{
      const val=btn.getAttribute('onclick').match(/,'([^']+)'\)/)?.[1];
      if(val&&(S[key]||[]).includes(val)) btn.classList.add('active');
    });
  });
  // Restore LUT
  if(S.lut){
    document.querySelectorAll('#lut-chips .chip').forEach(c=>{
      if(c.getAttribute('onclick')?.includes(S.lut)) c.classList.add('active');
    });
  }
  // Production
  renderSetupChecklists();
  if(S.shotList&&S.shotList.length) renderShotList();
  // Post
  renderPostCLs();
  if(S.editList&&S.editList.length){
    const rows=S.editList;
    const tbody=document.getElementById('edit-list-body');
    if(tbody) tbody.innerHTML=rows.map((r,i)=>`<tr>
      <td style="color:var(--text3)">${i+1}</td>
      <td><span style="font-weight:700">${r.sec}</span></td>
      <td>${eh(r.content)}</td>
      <td><span class="shot-tag size">${r.size}</span></td>
      <td><span class="shot-tag angle">${r.angle}</span></td>
      <td><span class="shot-tag enh">${r.enh}</span></td>
      <td style="color:var(--text3);font-size:11px">${r.note}</td>
    </tr>`).join('');
  }
  // Auto-save
  setInterval(svS, 15000);
  } catch(e) {
    alert('Error: ' + e.message + '\\n' + e.stack);
    console.error(e);
  }
}

document.addEventListener('DOMContentLoaded', init);
