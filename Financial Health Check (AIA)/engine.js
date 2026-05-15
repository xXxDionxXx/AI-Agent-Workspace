let currentSlide=0;const TOTAL_SLIDES=15;

function goToSlide(n){
  const slides=document.querySelectorAll('.slide');
  if(n<0||n>=slides.length)return;
  slides.forEach((s,i)=>{s.classList.remove('active','exit-left');if(i===currentSlide&&i!==n)s.classList.add('exit-left')});
  currentSlide=n;slides[n].classList.add('active');
  document.getElementById('progressFill').style.width=((n+1)/slides.length*100)+'%';
  document.getElementById('slideCounter').textContent=`${n+1} / ${slides.length}`;
  document.getElementById('btnPrev').disabled=n===0;
  const btn=document.getElementById('btnNext');
  btn.innerHTML=n===slides.length-1?'✓':'<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 4L14 10L8 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  sessionStorage.setItem('savedSlide', n);
  if(typeof onSlideEnter === 'function') onSlideEnter(n);
}
function nextSlide(){if(typeof onSlideSave==='function')onSlideSave(currentSlide);if(currentSlide<TOTAL_SLIDES-1)goToSlide(currentSlide+1)}
function prevSlide(){if(currentSlide>0)goToSlide(currentSlide-1)}

document.addEventListener('keydown',e=>{if(['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName))return;if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();nextSlide()}if(e.key==='ArrowLeft'){e.preventDefault();prevSlide()}});

// Auto-detect platform based on screen width
function detectPlatform(){
  const w=window.innerWidth;
  if(w<=600) document.body.className='platform-phone';
  else if(w<=1024) document.body.className='platform-ipad';
  else document.body.className='platform-laptop';
}
detectPlatform();
window.addEventListener('resize',detectPlatform);

// Helpers
function createSlide(i,html){const d=document.createElement('div');d.className='slide'+(i===0?' active':'');d.id='slide-'+i;d.innerHTML='<div class="slide-inner">'+html+'</div>';return d}
function pri(l){return({must:'🔴',should:'🟡',opt:'⚪'})[l]?`<span class="pri-dot">${({must:'🔴',should:'🟡',opt:'⚪'})[l]}</span>`:''}
function secHdr(n,label){return`<div class="section-hdr"><div class="section-num">${n}</div><span class="section-label">${label}</span></div>`}
function inp(id,label,ph,type='text',p='',oninp=''){const onEvt=type==='number'?`oninput="formatNumberInput(this);${oninp?oninp:''}"`:oninp?`oninput="${oninp}"`:''  ;return`<div class="form-group"><label class="form-label" for="${id}">${label} ${p?pri(p):''}</label><input class="form-input" type="text" inputmode="${type==='number'?'numeric':'text'}" id="${id}" placeholder="${ph}" autocomplete="off" ${onEvt}></div>`}
function selCard(name,val,emoji,title,desc,chk=false){return`<label class="select-card ${chk?'selected':''}" data-val="${val}"><input type="radio" name="${name}" value="${val}" ${chk?'checked':''}>${emoji?`<span class="select-card-emoji">${emoji}</span>`:''}<div><div class="select-card-title">${title}</div>${desc?`<div class="select-card-desc">${desc}</div>`:''}</div></label>`}
function initSelectCards(c){if(!c)return;c.querySelectorAll('.select-card').forEach(card=>{card.addEventListener('click',()=>{const nm=card.querySelector('input[type="radio"]').name;c.querySelectorAll(`.select-card input[name="${nm}"]`).forEach(i=>{i.closest('.select-card').classList.remove('selected')});card.classList.add('selected');card.querySelector('input').checked=true;if(typeof onSelectCardChange==='function'){onSelectCardChange(nm,card.dataset.val)}})})}

