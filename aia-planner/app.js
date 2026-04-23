// ============ APP — RENDER ALL SLIDES ============

const container = document.getElementById('slidesContainer');

// ===== SLIDE 0: COVER =====
container.appendChild(createSlide(0, `
  <div class="glass-card" style="text-align:center; max-width:400px; margin:0 auto;">
    <div class="cover-logo">
      <svg viewBox="0 0 80 80" fill="none" width="72" height="72" style="margin:0 auto;">
        <circle cx="40" cy="40" r="36" stroke="#d21145" stroke-width="3" fill="none"/>
        <path d="M28 52 L40 24 L52 52" stroke="#d21145" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <line x1="32" y1="44" x2="48" y2="44" stroke="#d21145" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
    </div>
    <div class="cover-title">Financial<br>Health Check</div>
    <div class="cover-sub">วิเคราะห์สุขภาพทางการเงินและวางแผนความคุ้มครอง</div>
    <div class="cover-tagline">Healthier, Longer, Better Lives</div>
  </div>
`));

// ===== SLIDE 1: PERSONAL PROFILE =====
container.appendChild(createSlide(1, `
  <div class="glass-card">
    ${secHdr('1', 'PERSONAL PROFILE')}
    <p class="slide-subtitle">ข้อมูลส่วนตัวและสถานะครอบครัว</p>
    
    <div class="form-row">
      ${inp('clientName', 'ชื่อ-นามสกุล', 'กรอกชื่อลูกค้า', 'text', 'must')}
      ${inp('clientAge', 'อายุ (ปี)', 'เช่น 35', 'number', 'must')}
    </div>
    
    <div class="form-label" style="margin-top:8px;">เพศ ${pri('must')}</div>
    <div class="select-cards select-cards-h" style="margin-bottom:16px;">
      ${selCard('gender', 'male', '👨', 'ชาย', '', true)}
      ${selCard('gender', 'female', '👩', 'หญิง', '')}
    </div>

    <div class="form-label">สถานะครอบครัว ${pri('must')}</div>
    <div class="select-cards select-cards-h" id="familyCards">
      ${selCard('family', 'single', '👤', 'โสด', '', true)}
      ${selCard('family', 'married', '💑', 'สมรส', '')}
      ${selCard('family', 'children', '👨‍👩‍👧', 'มีบุตร', '')}
    </div>
    
    <div class="child-fields form-group" style="margin-top:16px;" id="childFields">
      ${inp('childCount', 'จำนวนบุตร (อายุไม่เกิน 23 ปี)', 'เช่น 2', 'number', 'must')}
    </div>
  </div>
`));

// ===== SLIDE 2: FINANCIAL GOALS (PYRAMID) =====
container.appendChild(createSlide(2, `
  <div class="glass-card" style="max-width:100% !important;">
    ${secHdr('2', 'FINANCIAL GOALS')}
    <p class="slide-subtitle">การจัดลำดับความสำคัญทางการเงิน</p>
    
    <div class="pyramid-container">
      <!-- Standard Pyramid -->
      <div class="pyramid-col">
        <div class="pyramid-col-title">หลักการวางแผนการเงิน</div>
        <div style="display:flex; gap:16px; align-items:center;">
          <div class="pyramid-side">
            <div style="text-align:right;">
              <div class="pyramid-side-tag">ผลพลอยได้</div>
              <div class="pyramid-side-label">ลดหย่อนภาษี/ออมเงิน</div>
            </div>
            <div style="font-size:1.5rem; color:var(--text-muted);">+</div>
          </div>
          <div class="pyramid-wrap" style="flex:1;">
            <div class="pyramid-row">วางแผนเกษียณ</div>
            <div class="pyramid-row">อัพเกรดคุณภาพการรักษา</div>
            <div class="pyramid-row">ค่าเทอมลูก</div>
            <div class="pyramid-row">ปกป้องรายได้</div>
            <div class="pyramid-row">ภาระหนี้สิน</div>
          </div>
        </div>
      </div>
      
      <!-- Interactive Pyramid -->
      <div class="pyramid-col">
        <div class="pyramid-col-title">ลำดับความสำคัญของลูกค้า</div>
        <div class="pyramid-wrap" id="userPyramid">
          <div class="pyramid-row pyramid-slot" data-index="0">เลือกอันดับ 5</div>
          <div class="pyramid-row pyramid-slot" data-index="1">เลือกอันดับ 4</div>
          <div class="pyramid-row pyramid-slot" data-index="2">เลือกอันดับ 3</div>
          <div class="pyramid-row pyramid-slot" data-index="3">เลือกอันดับ 2</div>
          <div class="pyramid-row pyramid-slot" data-index="4">เลือกอันดับ 1 (สำคัญที่สุด)</div>
        </div>
        
        <div style="text-align:center; margin-top:16px; font-size:0.75rem; color:var(--text-secondary);">คลิกเลือกเพื่อจัดลำดับ</div>
        <div class="item-pool" id="goalPool">
          <div class="pool-item" data-val="ภาระหนี้สิน">ภาระหนี้สิน</div>
          <div class="pool-item" data-val="ค่าเทอมลูก">ค่าเทอมลูก</div>
          <div class="pool-item" data-val="ปกป้องรายได้">ปกป้องรายได้</div>
          <div class="pool-item" data-val="อัพเกรดคุณภาพการรักษา">อัพเกรดคุณภาพการรักษา</div>
          <div class="pool-item" data-val="วางแผนเกษียณ">วางแผนเกษียณ</div>
          <div class="pool-item" data-val="ลดหย่อนภาษี/ออมเงิน">ลดหย่อนภาษี/ออมเงิน</div>
        </div>
        <div style="text-align:center; margin-top:10px;">
          <button onclick="resetPyramid()" style="font-size:0.7rem; padding:4px 10px; border-radius:6px; border:1px solid #ddd; background:#fff; cursor:pointer;">รีเซ็ตลำดับ</button>
        </div>
      </div>
    </div>
  </div>
`));

// ===== SLIDE 3: EXPENSES =====
container.appendChild(createSlide(3, `
  <div class="glass-card">
    ${secHdr('3', 'EXPENSES (ภาระค่าใช้จ่าย)')}
    <p class="slide-subtitle">หนี้สินและภาระค่าใช้จ่าย</p>
    
    <div style="margin-bottom:16px; padding-bottom:16px; border-bottom:1px dashed rgba(0,0,0,0.1);">
      <div class="form-label" style="color:var(--aia-red); font-weight:700;">ยอดภาระหนี้สินรวม (ก้อนใหญ่)</div>
      ${inp('expDebtTotal', 'รวมยอด บ้าน / รถ / สินเชื่อทั้งหมด (บาท)', 'เช่น 5,000,000', 'number', 'must')}
    </div>
    
    <div class="form-label" style="color:var(--aia-blue); font-weight:700;">รายจ่ายต่อเดือน</div>
    ${inp('expFixed', 'ภาระผ่อนคงที่รวม/เดือน (บ้าน+รถ+สินเชื่อ)', 'เช่น 35,000', 'number', 'must')}
    ${inp('expVar', 'ค่าใช้จ่ายผันแปร/เดือน (รวมทั้งครอบครัว)', 'อาหาร น้ำไฟ เดินทาง ฯลฯ', 'number', 'should')}
    
    <div class="child-fields form-group" style="margin-top:12px; padding:12px; background:rgba(255,255,255,0.4); border-radius:12px;">
      <div class="form-label">ค่าเทอมบุตร ${pri('should')}</div>
      ${inp('expChildTerm', 'ค่าเทอม (ต่อ 1 เทอม)', 'กรอกยอดต่อเทอม', 'number')}
      <div id="childTermCalc" style="font-size:0.75rem; color:var(--aia-blue); font-weight:600; margin-top:4px; min-height:16px;"></div>
    </div>
  </div>
`));

// ===== SLIDE 4: SAVINGS & INVESTMENT =====
container.appendChild(createSlide(4, `
  <div class="glass-card">
    ${secHdr('4', 'SAVINGS & INVESTMENT')}
    <p class="slide-subtitle">สินทรัพย์และเงินสำรอง</p>
    
    ${inp('savCash', 'เงินเก็บ / เงินออมทั่วไป', 'เช่น 200,000', 'number', 'must')}
    
    <div class="form-group" style="margin-top:16px;">
      <div class="form-label" style="display:flex; justify-content:space-between;">
        <span>เงินสำรองฉุกเฉิน ${pri('must')}</span>
        <span style="font-size:0.65rem; color:var(--aia-red); font-weight:700; background:rgba(210,17,69,0.1); padding:2px 6px; border-radius:4px;">ควรมี 3-6 เท่าของรายจ่าย</span>
      </div>
      <input class="form-input" type="number" id="savEmergency" placeholder="เงินฝากสภาพคล่องสูง" autocomplete="off">
    </div>
    <div id="emergencyCheck" style="margin-bottom:16px;"></div>

    ${inp('savInvest', 'เงินลงทุน (หุ้น / กองทุน / อสังหาฯ)', 'เช่น 1,500,000', 'number', 'should')}
  </div>
`));

// ===== SLIDE 5: TAX PLANNING =====
container.appendChild(createSlide(5, `
  <div class="glass-card">
    ${secHdr('5', 'TAX PLANNING')}
    <p class="slide-subtitle">รายการลดหย่อนภาษีที่ใช้อยู่ (ต่อปี)</p>
    
    ${inp('taxLife', 'เบี้ยประกันชีวิต', 'สูงสุด 100,000', 'number', 'should')}
    ${inp('taxHealth', 'เบี้ยประกันสุขภาพ', 'สูงสุด 25,000', 'number', 'should')}
    
    <div class="form-group" style="margin-top:16px; padding-top:16px; border-top:1px dashed rgba(0,0,0,0.1);">
      <div class="form-label" style="color:var(--text-primary); font-weight:600;">กองทุนลดหย่อนภาษี</div>
      ${inp('taxRMF', 'RMF', 'สูงสุด 500,000', 'number', 'opt')}
      ${inp('taxSSF', 'SSF', 'สูงสุด 200,000', 'number', 'opt')}
      ${inp('taxESG', 'Thai ESG', 'สูงสุด 300,000', 'number', 'opt')}
    </div>
  </div>
`));

// ===== SLIDE 6: WELFARE REVIEW =====
container.appendChild(createSlide(6, `
  <div class="glass-card">
    ${secHdr('6', 'WELFARE REVIEW')}
    <p class="slide-subtitle">ทบทวนสวัสดิการพื้นฐานของลูกค้า</p>
    <div class="select-cards" id="welfareCards">
      ${selCard('welfare', 'social33', '🔵', 'ประกันสังคม ม.33', 'ลูกจ้างประจำ')}
      ${selCard('welfare', 'social39', '🔵', 'ประกันสังคม ม.39', 'ต่อเนื่องหลังออกจากงาน')}
      ${selCard('welfare', 'social40', '🔵', 'ประกันสังคม ม.40', 'อาชีพอิสระ')}
      ${selCard('welfare', 'gov_self', '💼', 'ข้าราชการ (ตัวเอง)', 'สวัสดิการกรมบัญชีกลาง')}
      ${selCard('welfare', 'gov_family', '💼', 'ข้าราชการ (คู่สมรส/บุตร)', 'สิทธิรักษาพยาบาลเท่านั้น')}
      ${selCard('welfare', 'gold', '💳', 'บัตรทอง', 'หลักประกันสุขภาพถ้วนหน้า')}
    </div>
  </div>
`));

// ===== SLIDE 7: RISK MANAGEMENT =====
container.appendChild(createSlide(7, `
  <div class="glass-card">
    ${secHdr('7', 'RISK MANAGEMENT')}
    <p class="slide-subtitle">ความคุ้มครองที่มีอยู่เดิม (ถ้ามี)</p>
    ${inp('riskLife', 'ทุนประกันชีวิตรวมทั้งหมด', 'เช่น 1,000,000', 'number', 'must')}
    ${inp('riskCI', 'วงเงินประกันโรคร้ายแรง', 'เช่น 500,000', 'number', 'must')}
    ${inp('riskHealth', 'วงเงินประกันสุขภาพเหมาจ่าย / ปี', 'เช่น 5,000,000', 'number', 'should')}
    ${inp('riskAccident', 'วงเงินค่ารักษาอุบัติเหตุ', 'เช่น 50,000', 'number', 'opt')}
  </div>
`));

// ===== SLIDE 8: WELFARE DETAILS & GAP =====
container.appendChild(createSlide(8, `
  <div class="glass-card" id="welfareResult">
    ${secHdr('8', 'สิทธิ์ที่ลูกค้ามี (WELFARE GAP)')}
    <p class="slide-subtitle" id="welfareSub">เลือกสิทธิ์ในหน้า 6</p>
    <div id="welfareItems"></div>
  </div>
  <div class="gap-section" id="gapSection" style="display:none; margin-top:12px;">
    <h3>⚠️ ช่องว่างความคุ้มครอง (Gap)</h3>
    <div id="gapItems"></div>
  </div>
`));

// ===== SLIDE 9: HOSPITAL SELECTION =====
container.appendChild(createSlide(9, `
  <div class="glass-card">
    ${secHdr('9', 'HOSPITAL SELECTION')}
    <p class="slide-subtitle">เลือกระดับโรงพยาบาลที่เข้าใช้บริการเป็นประจำ</p>
    <div id="tierCards">
      ${HOSPITAL_TIERS.map((t, i) => `
        <div class="tier-card tier-card-hosp ${i === 1 ? 'selected' : ''}" data-tier="${t.id}" onclick="selectTierGroup(this, 'hosp')">
          <div class="tier-header">
            <span class="tier-name">${t.name}</span>
            <span class="tier-price">${t.price}</span>
          </div>
          <div class="tier-hospitals">${t.hospitals}</div>
        </div>
      `).join('')}
    </div>
  </div>
`));

// ===== SLIDE 10: EDUCATION SELECTION =====
container.appendChild(createSlide(10, `
  <div class="glass-card">
    ${secHdr('10', 'EDUCATION SELECTION')}
    <p class="slide-subtitle">ระดับการศึกษาที่ต้องการวางแผนให้บุตร (ข้ามได้หากไม่มีบุตร)</p>
    
    <div class="form-label" style="color:var(--aia-blue); margin-top:8px;">🏫 ระดับโรงเรียน</div>
    <div id="schoolTierCards" style="margin-bottom:16px;">
      ${SCHOOL_TIERS.map((t, i) => `
        <div class="tier-card tier-card-sch ${i === 1 ? 'selected' : ''}" data-tier="${t.id}" onclick="selectTierGroup(this, 'sch')">
          <div class="tier-header">
            <span class="tier-name">${t.name}</span>
            <span class="tier-price">${t.price}</span>
          </div>
          <div class="tier-hospitals">${t.examples}</div>
        </div>
      `).join('')}
    </div>

    <div class="form-label" style="color:var(--aia-blue);">🎓 ระดับมหาวิทยาลัย</div>
    <div id="uniTierCards">
      ${UNI_TIERS.map((t, i) => `
        <div class="tier-card tier-card-uni ${i === 1 ? 'selected' : ''}" data-tier="${t.id}" onclick="selectTierGroup(this, 'uni')">
          <div class="tier-header">
            <span class="tier-name">${t.name}</span>
            <span class="tier-price">${t.price}</span>
          </div>
          <div class="tier-hospitals">${t.examples}</div>
        </div>
      `).join('')}
    </div>
  </div>
`));

// ===== SLIDE 11: RETIREMENT =====
container.appendChild(createSlide(11, `
  <div class="glass-card">
    ${secHdr('11', 'RETIREMENT (เกษียณอายุ)')}
    <p class="slide-subtitle">การวางแผนหลังเกษียณ</p>
    <div class="form-row">
      ${inp('retireAge', 'อายุเกษียณ', 'เช่น 60', 'number', 'should')}
      ${inp('retireLifeExp', 'อายุขัย', 'เช่น 85', 'number', 'opt')}
    </div>
    ${inp('retireMonthly', 'เงินใช้จ่ายต่อเดือนหลังเกษียณ', 'เช่น 30,000', 'number', 'should')}
    <div id="retireCalc" style="margin-top:8px;"></div>
  </div>
`));

// ===== SLIDE 12: INCOME =====
container.appendChild(createSlide(12, `
  <div class="glass-card">
    ${secHdr('12', 'INCOME SUMMARY')}
    <p class="slide-subtitle">สรุปรายได้และงบประมาณสำหรับความคุ้มครอง</p>
    ${inp('incomeMain', 'รายได้หลัก/เดือน (เงินเดือน / ธุรกิจ)', 'เช่น 50,000', 'number', 'must')}
    ${inp('incomeOT', 'OT / โบนัส / คอมมิชชั่น เฉลี่ยต่อเดือน', 'เช่น 10,000', 'number', 'should')}
    ${inp('incomeInvest', 'รายได้จากการลงทุน / ปันผล / ค่าเช่า', 'ถ้ามี', 'number', 'opt')}
    ${inp('incomeOther', 'รายได้พิเศษอื่น ๆ', '', 'number', 'opt')}
    
    <div class="gap-section" style="margin-top:16px; background:rgba(10,117,187,0.05); border-color:rgba(10,117,187,0.2);">
      <h3 style="color:var(--aia-blue);">💡 สัดส่วนเงินสำหรับความคุ้มครอง (15% Rule)</h3>
      <div id="incomeCalcResult" style="font-size:0.85rem; color:var(--text-secondary); line-height:1.6;">
        กรุณากรอกรายได้เพื่อคำนวณงบประมาณที่เหมาะสม
      </div>
    </div>
  </div>
`));

// ===== SLIDE 13: PROPOSED SOLUTION (FINAL) =====
container.appendChild(createSlide(13, `
  <div class="glass-card" style="text-align:center">
    <div class="slide-title" style="margin-bottom:6px">แผนที่แนะนำสำหรับ <span class="aia-accent" id="finalName">ลูกค้า</span></div>
    <p class="slide-subtitle">เปรียบเทียบ 3 แผน เลือกแผนที่เหมาะกับไลฟ์สไตล์และงบประมาณ</p>
  </div>
  <div class="plan-grid" id="planGrid" style="margin-top:12px;"></div>
  <div class="glass-card glass-card-sm" style="text-align:center; margin-top:12px;">
    <p class="slide-subtitle">ข้อมูลนี้เป็นการวิเคราะห์เบื้องต้น รายละเอียดเบี้ยจริงจะคำนวณตามอายุเพศและวงเงิน</p>
    <div class="export-row">
      <button class="btn-export" onclick="exportPDF()">📄 บันทึก PDF</button>
      <button class="btn-export btn-export-line" onclick="exportLINE()">💬 ส่ง LINE</button>
    </div>
    <div class="cover-tagline" style="margin-top:12px">Healthier, Longer, Better Lives</div>
  </div>
`));

// ============ LOGIC & EVENTS ============

// Init select cards
document.querySelectorAll('.select-cards').forEach(initSelectCards);

// Family / Children logic
document.querySelectorAll('#familyCards .select-card').forEach(card => {
  card.addEventListener('click', () => {
    const val = card.querySelector('input').value;
    document.querySelectorAll('.child-fields').forEach(el => {
      val === 'children' ? el.classList.add('show') : el.classList.remove('show');
    });
  });
});

// Auto-calc child term to year
document.getElementById('expChildTerm')?.addEventListener('input', (e) => {
  const val = parseFloat(e.target.value) || 0;
  const el = document.getElementById('childTermCalc');
  if (val > 0) {
    el.innerHTML = `→ คิดเป็นค่าเทอมต่อปี = ${fmt(val * 2)} บาท / ปี`;
  } else {
    el.innerHTML = '';
  }
});

// Income auto-calc 15% rule
['incomeMain', 'incomeOT', 'incomeInvest', 'incomeOther'].forEach(id => {
  document.getElementById(id)?.addEventListener('input', computeIncomeRule);
});

function computeIncomeRule() {
  const main = num('incomeMain');
  const ot = num('incomeOT');
  const inv = num('incomeInvest');
  const oth = num('incomeOther');
  const totalMonth = main + ot + inv + oth;
  const totalYear = totalMonth * 12;
  const budgetYear = totalYear * 0.15;
  const budgetMonth = budgetYear / 12;

  const el = document.getElementById('incomeCalcResult');
  if (totalMonth > 0) {
    el.innerHTML = `
      รายได้รวมต่อปีโดยประมาณ: <strong>${fmt(totalYear)}</strong> บาท<br>
      เงินที่นำมาวางแผนประกันและคุ้มครอง (ไม่ควรเกิน 15%):<br>
      👉 สูงสุดไม่เกิน <strong style="color:var(--aia-red); font-size:1rem;">${fmt(budgetYear)}</strong> บาท/ปี 
      <span style="font-size:0.75rem;">(หรือ ${fmt(budgetMonth)} บาท/เดือน)</span>
    `;
  } else {
    el.innerHTML = 'กรุณากรอกรายได้เพื่อคำนวณงบประมาณที่เหมาะสม';
  }
}

// Multi Tier selection
function selectTierGroup(el, groupCls) {
  document.querySelectorAll(`.tier-card-${groupCls}`).forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}

// Helpers
function num(id) { const el = document.getElementById(id); return el ? parseFloat(el.value) || 0 : 0; }
function fmt(n) { return Math.round(n).toLocaleString('th-TH'); }

// ============ PYRAMID LOGIC ============
const pyramidSlots = document.querySelectorAll('.pyramid-slot');
const poolItems = document.querySelectorAll('.pool-item');
let userGoals = [null, null, null, null, null]; // top to bottom

poolItems.forEach(item => {
  item.addEventListener('click', () => {
    if (item.classList.contains('used')) return;
    for (let i = 4; i >= 0; i--) {
      if (!userGoals[i]) {
        userGoals[i] = item.dataset.val;
        item.classList.add('used');
        updatePyramid();
        break;
      }
    }
  });
});

function updatePyramid() {
  pyramidSlots.forEach((slot, i) => {
    if (userGoals[i]) {
      slot.textContent = userGoals[i];
      slot.classList.add('filled');
    } else {
      slot.textContent = `เลือกอันดับ ${5-i}`;
      slot.classList.remove('filled');
    }
  });
}

function resetPyramid() {
  userGoals = [null, null, null, null, null];
  poolItems.forEach(item => item.classList.remove('used'));
  updatePyramid();
}

// ============ ON SLIDE SAVE (CALCULATIONS) ============
function onSlideSave(idx) {
  if (idx === 4) computeEmergency(); // After Savings
  if (idx === 6) computeWelfare();   // After Welfare Review
  if (idx === 11) computeRetirement(); // After Retirement
  if (idx === 12) computeSolution(); // Before Final Solution
}

// Emergency Calc
function computeEmergency() {
  const expFixed = num('expFixed');
  const expVar = num('expVar');
  // Fallback 10k if no expenses entered yet
  const exp = expFixed + expVar || 10000;
  const needed = exp * 6; // 6 months
  
  const cash = num('savEmergency') || num('savCash');
  const ok = cash >= needed;
  
  const el = document.getElementById('emergencyCheck');
  if (!expFixed && !expVar && !cash) { el.innerHTML = ''; return; }
  
  el.innerHTML = `
    <div class="benefit-row" style="margin-top:8px;">
      <div class="status-dot ${ok ? 'dot-green' : 'dot-red'}">${ok ? '✓' : '!'}</div>
      <div>
        <div class="benefit-name">การวิเคราะห์เงินสำรองฉุกเฉิน (6 เดือน)</div>
        <div class="benefit-detail">
          ควรมี: <strong>${fmt(needed)}</strong> บาท | มีอยู่: ${fmt(cash)} บาท<br>
          ${ok ? '<span style="color:#16a34a;font-weight:600;">✓ สภาพคล่องเพียงพอ</span>' : `<span style="color:var(--aia-red);font-weight:600;">✗ ขาดอีก ${fmt(needed - cash)} บาท</span>`}
        </div>
      </div>
    </div>`;
}

// Welfare Calc
function computeWelfare() {
  const sel = document.querySelector('#welfareCards input[type="radio"]:checked');
  if (!sel) return;
  const w = WELFARE[sel.value];
  if (!w) return;

  document.getElementById('welfareSub').textContent = `${w.emoji} ${w.label} — ${w.tagText}`;

  let html = '';
  const statusMap = { green: ['✓', 'dot-green'], yellow: ['~', 'dot-yellow'], red: ['✗', 'dot-red'] };
  w.benefits.forEach(cat => {
    html += `<div style="margin-top:12px"><div class="form-label" style="margin-bottom:6px">${cat.cat}</div>`;
    cat.items.forEach(item => {
      const [icon, cls] = statusMap[item.s];
      html += `<div class="benefit-row"><div class="status-dot ${cls}">${icon}</div><div><div class="benefit-name">${item.n}</div><div class="benefit-detail">${item.d}</div></div></div>`;
    });
    html += `</div>`;
  });
  document.getElementById('welfareItems').innerHTML = html;

  const gapEl = document.getElementById('gapSection');
  if (w.gaps && w.gaps.length > 0) {
    gapEl.style.display = 'block';
    document.getElementById('gapItems').innerHTML = w.gaps.map(g => `<div class="gap-item"><span style="color:var(--aia-red);flex-shrink:0">✗</span><div>${g}</div></div>`).join('');
  } else {
    gapEl.style.display = 'none';
  }
}

// Retirement Calc
function computeRetirement() {
  const age = num('clientAge') || 35;
  const retAge = num('retireAge') || 60;
  const lifeExp = num('retireLifeExp') || 85;
  const monthly = num('retireMonthly');
  if (!monthly) return;
  
  const yearsToRetire = Math.max(retAge - age, 0);
  const yearsInRetire = Math.max(lifeExp - retAge, 0);
  
  // 3% inflation
  const futureMonthly = monthly * Math.pow(1.03, yearsToRetire);
  const totalNeeded = futureMonthly * 12 * yearsInRetire;
  
  const cash = num('savInvest') + num('savCash');
  const gap = Math.max(totalNeeded - cash, 0);
  
  document.getElementById('retireCalc').innerHTML = `
    <div class="benefit-row">
      <div class="status-dot dot-yellow">💡</div>
      <div>
        <div class="benefit-name">ประมาณการเงินเกษียณ (เงินเฟ้อ 3%)</div>
        <div class="benefit-detail">
          ต้องใช้จริง/ด.: <strong>${fmt(futureMonthly)}</strong> บาท<br>
          ยอดรวม ${yearsInRetire} ปี: <strong>${fmt(totalNeeded)}</strong> บาท<br>
          <span style="color:var(--aia-red); font-weight:600;">ทุนเกษียณที่ขาด: ${fmt(gap)} บาท</span>
        </div>
      </div>
    </div>`;
}

// Final Solution 3-Tier
function computeSolution() {
  const name = document.getElementById('clientName')?.value || 'ลูกค้า';
  document.getElementById('finalName').textContent = name;

  const income = num('incomeMain') + num('incomeOT') || 30000;
  const expFixed = num('expFixed');
  const expVar = num('expVar');
  const expDebt = num('expDebtTotal');
  const childTerm = num('expChildTerm') * 2;
  
  const familySel = document.querySelector('#familyCards input:checked');
  const hasFamily = familySel && familySel.value !== 'single';
  const isChildren = familySel && familySel.value === 'children';

  const hospEl = document.querySelector('.tier-card-hosp.selected');
  const hospId = hospEl ? hospEl.dataset.tier : 'standard';

  // Base logic for recommendations based on actual user input
  // Critical Illness: 1 to 5 years of income
  const ciBase = Math.max(income * 12, 500000);
  const ciBiz = Math.max(income * 36, 1000000);
  const ciFirst = Math.max(income * 60, 2000000);
  
  // Life Insurance: Cover debts + child education + family living exp
  let lifeNeed = expDebt;
  if (isChildren) {
    const schEl = document.querySelector('.tier-card-sch.selected');
    const uniEl = document.querySelector('.tier-card-uni.selected');
    const schPrice = schEl ? SCHOOL_TIERS.find(t=>t.id===schEl.dataset.tier)?.priceNum || 150000 : 150000;
    const uniPrice = uniEl ? UNI_TIERS.find(t=>t.id===uniEl.dataset.tier)?.priceNum || 100000 : 100000;
    // Estimate 15 years left (11 years school + 4 years uni) -> simplified:
    lifeNeed += (schPrice * 11) + (uniPrice * 4);
  } else if (childTerm > 0) {
    lifeNeed += (childTerm * 15);
  }
  
  if (hasFamily) lifeNeed += ((expFixed + expVar) * 60); // 5 years living exp
  
  const lifeBase = hasFamily ? Math.max(lifeNeed * 0.3, 500000) : 0;
  const lifeBiz = hasFamily ? Math.max(lifeNeed * 0.7, 1000000) : 0;
  const lifeFirst = hasFamily ? Math.max(lifeNeed, 2000000) : 0;

  const tierMap = {
    gov:      { eco: 'รพ.รัฐ ห้องพิเศษ', biz: 'Standard', first: 'High-End' },
    standard: { eco: 'รพ.รัฐ ห้องพิเศษ', biz: 'Standard', first: 'High-End' },
    highend:  { eco: 'Standard', biz: 'High-End', first: 'Luxury' },
    luxury:   { eco: 'High-End', biz: 'Luxury', first: 'Luxury+' },
  };
  const htier = tierMap[hospId] || tierMap.standard;

  const plans = [
    {
      cls: 'plan-economy', label: 'ECONOMY CLASS', name: '✈️ เริ่มต้น', recommended: false,
      items: [
        ['โรคร้ายแรง', ciBase > 0 ? fmt(ciBase) + ' บ.' : '—'],
        ['ประกันชีวิต', lifeBase > 0 ? fmt(lifeBase) + ' บ.' : '—'],
        ['สุขภาพเหมาจ่าย', htier.eco],
        ['รูปแบบเบี้ย', 'เบี้ยทิ้ง (ต่อปี)'],
      ]
    },
    {
      cls: 'plan-business', label: 'BUSINESS CLASS', name: '🌟 แนะนำ', recommended: true,
      items: [
        ['โรคร้ายแรง', fmt(ciBiz) + ' บ.'],
        ['ประกันชีวิต', lifeBiz > 0 ? fmt(lifeBiz) + ' บ.' : '—'],
        ['สุขภาพเหมาจ่าย', htier.biz],
        ['รูปแบบเบี้ย', 'เบี้ยไม่ทิ้ง (20 ปี)'],
      ]
    },
    {
      cls: 'plan-first', label: 'FIRST CLASS', name: '👑 ครบทุกด้าน', recommended: false,
      items: [
        ['โรคร้ายแรง (หลายจบ)', fmt(ciFirst) + ' บ.'],
        ['ประกันชีวิต', lifeFirst > 0 ? fmt(lifeFirst) + ' บ.' : '—'],
        ['สุขภาพเหมาจ่าย', htier.first],
        ['รูปแบบเบี้ย', 'เบี้ยไม่ทิ้ง (10 ปี)'],
      ]
    },
  ];

  document.getElementById('planGrid').innerHTML = plans.map(p => `
    <div class="plan-col ${p.cls} ${p.recommended ? 'plan-recommended' : ''}">
      <div class="plan-tier-label">${p.label}</div>
      <div class="plan-tier-name">${p.name}</div>
      ${p.items.map(([l, v]) => `<div class="plan-item"><span class="plan-item-label">${l}</span><span class="plan-item-value">${v}</span></div>`).join('')}
    </div>
  `).join('');
}

// Exports
function exportPDF() { window.print(); }
function exportLINE() {
  const name = document.getElementById('clientName')?.value || 'ลูกค้า';
  const text = encodeURIComponent(`📋 สรุปการวิเคราะห์การเงินของ ${name}\n\nขอบคุณที่ไว้วางใจปรึกษาครับ/ค่ะ`);
  window.open(`https://line.me/R/share?text=${text}`, '_blank');
}

// Init
goToSlide(0);
