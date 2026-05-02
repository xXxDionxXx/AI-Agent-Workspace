let currentSlide=0;const TOTAL_SLIDES=15;

// Slide-to-plan mapping: which data-plan checkbox must be checked for each slide to be active
const SLIDE_PLAN_MAP = {
  3: 'pro_income',   // Income Protection
  4: 'sav_asset',    // Asset & Liab
  5: 'sav_edu',      // Education
  6: 'sav_retire',   // Retirement
  7: 'pro_savings',  // Welfare Selection
  8: 'pro_savings',  // Welfare Compare
  9: 'pro_savings',  // Health Plan
  10: 'tax_plan',    // Tax
};

function updateSlideOverlays() {
  Object.entries(SLIDE_PLAN_MAP).forEach(([slideIdx, planKey]) => {
    const slide = document.getElementById('slide-' + slideIdx);
    if (!slide) return;
    const planBox = document.querySelector('[data-plan="' + planKey + '"]');
    const isChecked = planBox && planBox.classList.contains('checked');
    let overlay = slide.querySelector('.slide-disabled-overlay');
    if (!isChecked) {
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'slide-disabled-overlay';
        overlay.innerHTML = '<div class="disabled-msg"><h3>⏸ ยังไม่ได้เลือกวางแผนในหมวดนี้</h3><p>กลับไปที่หน้า Financial Plans เพื่อเลือก checkbox หมวดนี้</p></div>';
        slide.querySelector('.slide-inner').style.position = 'relative';
        slide.querySelector('.slide-inner').appendChild(overlay);
      }
    } else if (overlay) {
      overlay.remove();
    }
  });
}

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
  updateSlideOverlays();
}
function nextSlide(){if(typeof onSlideSave==='function')onSlideSave(currentSlide);if(currentSlide<TOTAL_SLIDES-1)goToSlide(currentSlide+1)}
function prevSlide(){if(currentSlide>0)goToSlide(currentSlide-1)}

document.addEventListener('keydown',e=>{if(['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName))return;if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();nextSlide()}if(e.key==='ArrowLeft'){e.preventDefault();prevSlide()}});

// Platform toggle
document.querySelectorAll('.plat-btn').forEach(b=>{b.addEventListener('click',()=>{
  document.querySelectorAll('.plat-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');
  document.body.className='platform-'+b.dataset.platform;
})});

// Helpers
function createSlide(i,html){const d=document.createElement('div');d.className='slide'+(i===0?' active':'');d.id='slide-'+i;d.innerHTML='<div class="slide-inner">'+html+'</div>';return d}
function pri(l){return({must:'🔴',should:'🟡',opt:'⚪'})[l]?`<span class="pri-dot">${({must:'🔴',should:'🟡',opt:'⚪'})[l]}</span>`:''}
function secHdr(n,label){return`<div class="section-hdr"><div class="section-num">${n}</div><span class="section-label">${label}</span></div>`}
function inp(id,label,ph,type='text',p=''){return`<div class="form-group"><label class="form-label" for="${id}">${label} ${p?pri(p):''}</label><input class="form-input" type="${type}" id="${id}" placeholder="${ph}" autocomplete="off"></div>`}
function selCard(name,val,emoji,title,desc,chk=false){return`<label class="select-card ${chk?'selected':''}" data-val="${val}"><input type="radio" name="${name}" value="${val}" ${chk?'checked':''}>${emoji?`<span class="select-card-emoji">${emoji}</span>`:''}<div><div class="select-card-title">${title}</div>${desc?`<div class="select-card-desc">${desc}</div>`:''}</div></label>`}
function initSelectCards(c){if(!c)return;c.querySelectorAll('.select-card').forEach(card=>{card.addEventListener('click',()=>{const nm=card.querySelector('input[type="radio"]').name;c.querySelectorAll(`.select-card input[name="${nm}"]`).forEach(i=>{i.closest('.select-card').classList.remove('selected')});card.classList.add('selected');card.querySelector('input').checked=true;if(typeof onSelectCardChange==='function'){onSelectCardChange(nm,val)}})})}
