// ============ APP — RENDER ALL SLIDES ============

const container = document.getElementById('slidesContainer');

function formatNumberInput(el) {
  let val = el.value.replace(/,/g, '').replace(/[^\d]/g, '');
  if (val !== '') {
    el.value = parseInt(val, 10).toLocaleString('en-US');
  }
}

// override inp function to use text with formatting
function inp(id, label, ph, type = 'text', p = '') {
  if (type === 'number') {
    return `<div class="form-group"><label class="form-label" for="${id}">${label} ${p ? pri(p) : ''}</label><input class="form-input" type="text" id="${id}" placeholder="${ph}" autocomplete="off" oninput="formatNumberInput(this)"></div>`;
  }
  return `<div class="form-group"><label class="form-label" for="${id}">${label} ${p ? pri(p) : ''}</label><input class="form-input" type="${type}" id="${id}" placeholder="${ph}" autocomplete="off"></div>`;
}

// ===== SLIDE 0: COVER =====
container.appendChild(createSlide(0, `
  <div class="slide-cover-card browser-ui" style="background:transparent; border:none; box-shadow:none; backdrop-filter:none;">
    <div class="cover-logo">
      <svg viewBox="0 0 80 80" fill="none" width="90" height="90" style="margin:0 auto;">
        <circle cx="40" cy="40" r="36" stroke="#d21145" stroke-width="3" fill="none"/>
        <path d="M40 18 L24 28 L24 48 C24 58 31 66 40 70 C49 66 56 58 56 48 L56 28 Z" stroke="#d21145" stroke-width="3" stroke-linejoin="round" fill="rgba(210,17,69,0.1)"/>
        <path d="M32 42 L38 48 L48 36" stroke="#d21145" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
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

// ===== SLIDE 2: FINANCIAL PLANS (PYRAMID) =====
container.appendChild(createSlide(2, `
  <div class="browser-ui" style="width:100%;">
    <div class="browser-header">
      <div class="browser-dots"><span></span><span></span><span></span></div>
      <div class="browser-title">แบบประเมินสุขภาพทางการเงิน</div>
    </div>
    <div style="padding:12px 20px 0; text-align:center;">
      <div class="browser-badge" style="display:inline-flex;"><span class="browser-badge-num">2</span> Financial Plans - การจัดลำดับความสำคัญทางการเงิน</div>
    </div>
    <div class="three-cols">
      <div class="col-pyramid">
        <div class="iso-pyramid">
          <div class="diag-arrow"><span class="diag-text">วางแผนภาษี</span></div>
          <div class="iso-layer iso-top">
            <div class="layer-title">3. การลงทุน / ต่อยอด</div>
            <div class="layer-sub">เงินไปลงทุน</div>
            <div class="layer-icons">📈 🏢</div>
          </div>
          <div class="iso-layer iso-mid">
            <div class="layer-title">2. การสะสม / ออม</div>
            <div class="layer-sub">เป้าหมายระยะสั้น, กลาง, ยาว</div>
            <div style="font-weight:700; margin-bottom:4px; font-size:1rem;">สะสม</div>
            <div class="layer-icons">🎓 👵👴 🏠</div>
          </div>
          <div class="iso-layer iso-bot">
            <div class="layer-title">1. การปกป้อง</div>
            <div class="layer-sub">Protection & Risk Transfer</div>
            <div style="font-weight:700; margin-bottom:4px; color:#f8d9df; font-size:1rem;">ปกป้องชีวิต ทรัพย์สิน สุขภาพ</div>
            <div class="layer-icons">💵 🛡️ 🏥</div>
          </div>
        </div>
      </div>
      <div class="col-panels">
        <div class="c-panel">
          <div class="connector-line" style="top:50%;"><div class="connector-dot"></div></div>
          <div class="c-panel-icon">📊</div><div class="c-panel-text">กองทุนรวม / หุ้น / อสังหาริมทรัพย์ / อื่นๆ</div>
        </div>
        <div class="c-panel-cluster">
          <div class="c-panel">
            <div class="connector-line" style="top:50%;"><div class="connector-dot"></div></div>
            <div class="c-panel-icon">🎓</div><div class="c-panel-text">กองทุนการศึกษาลูก</div>
          </div>
          <div class="c-panel">
            <div class="c-panel-icon">👵👴</div><div class="c-panel-text">กองทุนเพื่อการเกษียณ</div>
          </div>
          <div class="c-panel">
            <div class="c-panel-icon">🏠</div><div class="c-panel-text">กองทุนมรดก (บ้าน, รถ, ที่ดิน, เงินสด)</div>
          </div>
        </div>
        <div class="c-panel-cluster">
          <div class="c-panel">
            <div class="connector-line" style="top:50%;"><div class="connector-dot"></div></div>
            <div class="c-panel-icon">💵</div><div class="c-panel-text">ปกป้องรายได้ระยะสั้น (3-6 เดือน)</div>
          </div>
          <div class="c-panel">
            <div class="c-panel-icon">🛡️</div><div class="c-panel-text">ปกป้องรายได้ระยะยาว (3-5 ปี)</div>
          </div>
          <div class="c-panel">
            <div class="c-panel-icon">💖</div><div class="c-panel-text">ปกป้องเงินออม (อัปเกรดสวัสดิการรักษาพยาบาล/ประกันสุขภาพ)</div>
          </div>
        </div>
      </div>
      <div class="col-checklist">
        <div class="checklist-card">
          <div class="checklist-hdr">สถานะการวางแผน</div>
          <div class="checklist-item" onclick="toggleCheck(this)"><div class="chk-box"></div><div class="chk-text">กองทุนรวม / หุ้น / อสังหาริมทรัพย์ / อื่นๆ</div></div>
          <div class="checklist-item" onclick="toggleCheck(this)"><div class="chk-box"></div><div class="chk-text">ปกป้องรายได้ระยะสั้น</div></div>
          <div class="checklist-item" onclick="toggleCheck(this)"><div class="chk-box"></div><div class="chk-text">ปกป้องรายได้ระยะยาว (3-5 ปี)</div></div>
          <div class="checklist-item" onclick="toggleCheck(this)"><div class="chk-box"></div><div class="chk-text">ปกป้องเงินออม</div></div>
          <div class="checklist-item" onclick="toggleCheck(this)"><div class="chk-box"></div><div class="chk-text">กองทุนเพื่อการเกษียณ</div></div>
          <div class="checklist-item" onclick="toggleCheck(this)"><div class="chk-box"></div><div class="chk-text">กองทุนมรดก</div></div>
          <div class="checklist-item" onclick="toggleCheck(this)"><div class="chk-box"></div><div class="chk-text">ปกป้องรายได้ระยะสั้น (3-6 เดือน)</div></div>
          <div class="checklist-item" onclick="toggleCheck(this)"><div class="chk-box"></div><div class="chk-text">ปกป้องรายได้ระยะยาว (3-5 ปี)</div></div>
          <div class="checklist-item" onclick="toggleCheck(this)"><div class="chk-box"></div><div class="chk-text">ปกป้องเงินออม</div></div>
        </div>
      </div>
    </div>
  </div>
`));

// ===== SLIDE 3: EXPENSES =====
container.appendChild(createSlide(3, `
  <div class="glass-card">
    ${secHdr('3', 'EXPENSES (ภาระหนี้สิน)')}
    <p class="slide-subtitle">ยอดภาระหนี้สินคงค้างทั้งหมด</p>
    
    <div style="margin-bottom:16px; padding-bottom:16px; border-bottom:1px dashed rgba(0,0,0,0.1);">
      ${inp('debtHome', 'หนี้บ้าน / อสังหาริมทรัพย์ (บาท)', 'เช่น 3,000,000', 'number')}
      ${inp('debtCar', 'หนี้รถยนต์ (บาท)', 'เช่น 500,000', 'number')}
      ${inp('debtOther', 'สินเชื่อส่วนบุคคล / หนี้อื่นๆ (บาท)', 'เช่น 100,000', 'number')}
    </div>
    
    <div class="form-label" style="color:var(--aia-red); font-weight:700; font-size:1.1rem;">ยอดภาระหนี้สินรวมทั้งหมด</div>
    <div class="form-input" id="debtTotalDisplay" style="background:rgba(210,17,69,0.05); color:var(--aia-red); font-weight:700; font-size:1.2rem;">0</div>
    
    <div class="child-fields form-group" style="margin-top:16px; padding:12px; background:rgba(255,255,255,0.4); border-radius:12px;">
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
    
    ${inp('savCash', 'เงินเก็บ / เงินออมทั่วไป (บาท)', 'เช่น 200,000', 'number', 'must')}
    
    <div class="form-group" style="margin-top:16px;">
      <div class="form-label" style="display:flex; justify-content:space-between;">
        <span>เงินสำรองฉุกเฉิน ${pri('must')}</span>
      </div>
      <input class="form-input" type="text" id="savEmergency" placeholder="เช่น 60,000" autocomplete="off" oninput="formatNumberInput(this)">
    </div>

    ${inp('savInvest', 'เงินลงทุน (หุ้น / กองทุน / อสังหาฯ)', 'เช่น 1,500,000', 'number', 'should')}
  </div>
`));

// ===== SLIDE 5: WELFARE SELECTION =====
container.appendChild(createSlide(5, `
  <div class="glass-card">
    ${secHdr('5', 'WELFARE Selection')}
    <p class="slide-subtitle">ทบทวนสวัสดิการพื้นฐานของลูกค้า</p>
    <div class="select-cards" id="welfareCards">
      ${selCard('welfare', 'social33', '🔵', 'ประกันสังคม (ม.33)', 'สวัสดิการพนักงานเอกชน')}
      ${selCard('welfare', 'gov', '💼', 'ข้าราชการ', 'สวัสดิการกรมบัญชีกลาง')}
      ${selCard('welfare', 'gold', '💳', 'บัตรทอง', 'หลักประกันสุขภาพถ้วนหน้า')}
    </div>
  </div>
`));

// ===== SLIDE 6: WELFARE DETAILS =====
container.appendChild(createSlide(6, `
  <div class="glass-card" id="welfareResult">
    ${secHdr('6', 'เปรียบเทียบสิทธิรักษาพยาบาล')}
    <p class="slide-subtitle" id="welfareSub">เลือกสิทธิ์ในหน้า 5</p>
    <div id="welfareItems"></div>
  </div>
`));

// ===== SLIDE 7: HOSPITAL SELECTION =====
container.appendChild(createSlide(7, `
  <div class="glass-card">
    ${secHdr('7', 'HOSPITAL SELECTION')}
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

// ===== SLIDE 8: EDUCATION SELECTION =====
container.appendChild(createSlide(8, `
  <div class="glass-card">
    ${secHdr('8', 'EDUCATION SELECTION')}
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

// ===== SLIDE 9: RETIREMENT =====
container.appendChild(createSlide(9, `
  <div class="glass-card">
    ${secHdr('9', 'RETIREMENT (เกษียณอายุ)')}
    <p class="slide-subtitle">การวางแผนหลังเกษียณ</p>
    <div class="form-row">
      ${inp('retireAge', 'อายุเกษียณ', 'เช่น 60', 'number', 'should')}
      ${inp('retireLifeExp', 'อายุขัย', 'เช่น 85', 'number', 'opt')}
    </div>
    ${inp('retireMonthly', 'เงินใช้จ่ายต่อเดือนหลังเกษียณ', 'เช่น 30,000', 'number', 'should')}
    <div id="retireCalc" style="margin-top:8px;"></div>
  </div>
`));

// ===== SLIDE 10: INCOME =====
container.appendChild(createSlide(10, `
  <div class="glass-card">
    ${secHdr('10', 'INCOME SUMMARY')}
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

// ===== SLIDE 11: TAX PLANNING =====
container.appendChild(createSlide(11, `
  <div class="glass-card">
    ${secHdr('11', 'TAX PLANNING')}
    <p class="slide-subtitle">รายการลดหย่อนภาษีที่ใช้อยู่ (ต่อปี)</p>
    
    ${inp('taxLife', 'เบี้ยประกันชีวิต', 'สูงสุด 100,000', 'number', 'should')}
    ${inp('taxHealth', 'เบี้ยประกันสุขภาพ', 'สูงสุด 25,000', 'number', 'should')}
    
    <div class="form-group" style="margin-top:16px; padding-top:16px; border-top:1px dashed rgba(0,0,0,0.1);">
      <div class="form-label" style="color:var(--text-primary); font-weight:600;">กองทุนลดหย่อนภาษี (รวมกันสูงสุด 500,000)</div>
      ${inp('taxRMF', 'RMF', 'สูงสุด 500,000', 'number', 'opt')}
      ${inp('taxSSF', 'SSF', 'สูงสุด 200,000', 'number', 'opt')}
      ${inp('taxPVD', 'กองทุนสำรองเลี้ยงชีพ (PVD) / กบข.', 'สูงสุด 500,000', 'number', 'opt')}
      ${inp('taxSS', 'กองทุนการออมแห่งชาติ (กอช.)', 'สูงสุด 30,000', 'number', 'opt')}
    </div>
  </div>
`));

// ===== SLIDE 12: RISK MANAGEMENT =====
container.appendChild(createSlide(12, `
  <div class="glass-card">
    ${secHdr('12', 'RISK MANAGEMENT')}
    <p class="slide-subtitle">ความคุ้มครองที่มีอยู่เดิม (ถ้ามี)</p>
    ${inp('riskLife', 'ทุนประกันชีวิตรวมทั้งหมด', 'เช่น 1,000,000', 'number', 'must')}
    ${inp('riskCI', 'วงเงินประกันโรคร้ายแรง', 'เช่น 500,000', 'number', 'must')}
    ${inp('riskHealth', 'วงเงินประกันสุขภาพเหมาจ่าย / ปี', 'เช่น 5,000,000', 'number', 'should')}
    ${inp('riskAccident', 'วงเงินค่ารักษาอุบัติเหตุ', 'เช่น 50,000', 'number', 'opt')}
  </div>
`));

// ===== SLIDE 13: PROPOSED SOLUTION (FINAL) =====
container.appendChild(createSlide(13, `
  <div class="glass-card" style="text-align:center; max-width:1400px; width:95%;">
    <div class="slide-title" style="margin-bottom:6px">แผนที่แนะนำสำหรับ <span class="aia-accent" id="finalName">ลูกค้า</span></div>
    <p class="slide-subtitle">เปรียบเทียบ 3 แผน เลือกแผนที่เหมาะกับไลฟ์สไตล์และงบประมาณ</p>
  </div>
  <div class="plan-grid" id="planGrid" style="margin-top:12px;"></div>
  <div class="glass-card glass-card-sm" style="text-align:center; margin-top:12px;">
    <p class="slide-subtitle">ข้อมูลนี้เป็นการวิเคราะห์เบื้องต้น รายละเอียดเบี้ยจริงจะคำนวณตามอายุเพศและวงเงิน</p>
    <div class="export-row">
      <button class="btn-export btn-export-line" id="btnSubmitData" onclick="submitToGoogleSheets()">💾 บันทึกข้อมูลลง Google Sheet</button>
    </div>
    <div id="submitStatus" style="margin-top:12px; font-size:0.9rem; font-weight:600;"></div>
  </div>
`));

// ============ LOGIC & EVENTS ============

// --- Checklist toggle ---
function toggleCheck(el) {
  const chk = el.querySelector('.chk-box');
  if (chk.classList.contains('checked')) {
    chk.classList.remove('checked');
    chk.innerHTML = '';
  } else {
    chk.classList.add('checked');
    chk.innerHTML = '✓';
  }
}

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
  const val = num('expChildTerm') || 0;
  const el = document.getElementById('childTermCalc');
  if (val > 0) {
    el.innerHTML = '→ คิดเป็นค่าเทอมต่อปี = ' + fmt(val * 2) + ' บาท / ปี';
  } else {
    el.innerHTML = '';
  }
});

// Debt calculations
['debtHome', 'debtCar', 'debtOther'].forEach(id => {
  document.getElementById(id)?.addEventListener('input', () => {
    const total = num('debtHome') + num('debtCar') + num('debtOther');
    document.getElementById('debtTotalDisplay').textContent = fmt(total);
  });
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
    el.innerHTML = 'รายได้รวมต่อปีโดยประมาณ: <strong>' + fmt(totalYear) + '</strong> บาท<br>เงินที่นำมาวางแผนประกันและคุ้มครอง (ไม่ควรเกิน 15%):<br>👉 สูงสุดไม่เกิน <strong style="color:var(--aia-red); font-size:1rem;">' + fmt(budgetYear) + '</strong> บาท/ปี <span style="font-size:0.75rem;">(หรือ ' + fmt(budgetMonth) + ' บาท/เดือน)</span>';
  } else {
    el.innerHTML = 'กรุณากรอกรายได้เพื่อคำนวณงบประมาณที่เหมาะสม';
  }
}

// Multi Tier selection
function selectTierGroup(el, groupCls) {
  document.querySelectorAll('.tier-card-' + groupCls).forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}

// Helpers
function num(id) {
  const el = document.getElementById(id);
  if (!el) return 0;
  return parseInt(el.value.replace(/,/g, ''), 10) || 0;
}
function fmt(n) { return Math.round(n).toLocaleString('en-US'); }

// ============ ON SLIDE SAVE (CALCULATIONS) ============
function onSlideSave(idx) {
  if (idx === 5) computeWelfare();   // After Welfare Review
  if (idx === 9) computeRetirement(); // After Retirement
  if (idx === 12) computeSolution(); // Before Final Solution
}

// Welfare Calc
function computeWelfare() {
  const sel = document.querySelector('#welfareCards input[type="radio"]:checked');
  if (!sel) return;
  const w = WELFARE[sel.value];
  if (!w) return;

  document.getElementById('welfareSub').textContent = w.emoji + ' ' + w.label + ' — ' + w.tagText;

  let html = '';
  const statusMap = { green: ['✓', 'dot-green'], yellow: ['~', 'dot-yellow'], red: ['✗', 'dot-red'] };
  w.benefits.forEach(cat => {
    html += '<div style="margin-top:12px"><div class="form-label" style="margin-bottom:6px">' + cat.cat + '</div>';
    cat.items.forEach(item => {
      const [icon, cls] = statusMap[item.s];
      html += '<div class="benefit-row"><div class="status-dot ' + cls + '">' + icon + '</div><div><div class="benefit-name">' + item.n + '</div><div class="benefit-detail">' + item.d + '</div></div></div>';
    });
    html += '</div>';
  });
  document.getElementById('welfareItems').innerHTML = html;
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

  document.getElementById('retireCalc').innerHTML = '<div class="benefit-row"><div class="status-dot dot-yellow">💡</div><div><div class="benefit-name">ประมาณการเงินเกษียณ (เงินเฟ้อ 3%)</div><div class="benefit-detail">ต้องใช้จริง/ด.: <strong>' + fmt(futureMonthly) + '</strong> บาท<br>ยอดรวม ' + yearsInRetire + ' ปี: <strong>' + fmt(totalNeeded) + '</strong> บาท<br><span style="color:var(--aia-red); font-weight:600;">ทุนเกษียณที่ขาด: ' + fmt(gap) + ' บาท</span></div></div></div>';
}

// Final Solution 3-Tier
function computeSolution() {
  const name = document.getElementById('clientName')?.value || 'ลูกค้า';
  document.getElementById('finalName').textContent = name;

  const expDebt = num('debtHome') + num('debtCar') + num('debtOther');
  const childTerm = num('expChildTerm') * 2;

  const familySel = document.querySelector('#familyCards input:checked');
  const isChildren = familySel && familySel.value === 'children';

  const hospEl = document.querySelector('.tier-card-hosp.selected');
  const hospId = hospEl ? hospEl.dataset.tier : 'standard';

  const welfSel = document.querySelector('#welfareCards input[type="radio"]:checked');
  const welfareText = welfSel ? WELFARE[welfSel.value].label : 'ไม่ระบุสวัสดิการ';

  let lifeNeed = expDebt > 0 ? "✓ มีกองทุนมรดก" : "—";
  let childNeed = "—";

  if (isChildren) {
    const schEl = document.querySelector('.tier-card-sch.selected');
    const uniEl = document.querySelector('.tier-card-uni.selected');
    if (schEl || uniEl || childTerm > 0) {
      childNeed = "✓ ทุนการศึกษา";
    }
  }

  const tierMap = {
    gov: { eco: 'รพ.รัฐ ห้องพิเศษ', biz: 'Standard', first: 'High-End' },
    standard: { eco: 'รพ.รัฐ ห้องพิเศษ', biz: 'Standard', first: 'High-End' },
    highend: { eco: 'Standard', biz: 'High-End', first: 'Luxury' },
    luxury: { eco: 'High-End', biz: 'Luxury', first: 'Luxury+' },
  };
  const htier = tierMap[hospId] || tierMap.standard;

  const plans = [
    {
      cls: 'plan-economy', label: 'ECONOMY CLASS', name: '✈️ เริ่มต้น', recommended: false,
      items: [
        ['แผนปกป้องรายได้ (3 ปี)', '<input type="text" class="manual-price-input" placeholder="กรอกเบี้ย">'],
        ['กองทุนมรดก เช่น บ้าน รถ (ถ้ามี)', lifeNeed],
        ['กองทุนการศึกษา (ถ้ามี)', childNeed],
        ['ปกป้องเงินออม<br><span style="font-size:0.75rem;color:var(--text-muted);">' + welfareText + ' / ' + htier.eco + '</span>', '<input type="text" class="manual-price-input" placeholder="กรอกเบี้ย">'],
      ]
    },
    {
      cls: 'plan-business', label: 'BUSINESS CLASS', name: '🌟 แนะนำ', recommended: true,
      items: [
        ['แผนปกป้องรายได้ (5 ปี)', '<input type="text" class="manual-price-input" placeholder="กรอกเบี้ย">'],
        ['กองทุนมรดก เช่น บ้าน รถ (ถ้ามี)', lifeNeed],
        ['กองทุนการศึกษา (ถ้ามี)', childNeed],
        ['ปกป้องเงินออม<br><span style="font-size:0.75rem;color:var(--text-muted);">' + welfareText + ' / ' + htier.biz + '</span>', '<input type="text" class="manual-price-input" placeholder="กรอกเบี้ย">'],
      ]
    },
    {
      cls: 'plan-first', label: 'FIRST CLASS', name: '👑 ครบทุกด้าน', recommended: false,
      items: [
        ['แผนปกป้องรายได้ (7 ปี)', '<input type="text" class="manual-price-input" placeholder="กรอกเบี้ย">'],
        ['กองทุนมรดก เช่น บ้าน รถ (ถ้ามี)', lifeNeed],
        ['กองทุนการศึกษา (ถ้ามี)', childNeed],
        ['ปกป้องเงินออม<br><span style="font-size:0.75rem;color:var(--text-muted);">' + welfareText + ' / ' + htier.first + '</span>', '<input type="text" class="manual-price-input" placeholder="กรอกเบี้ย">'],
      ]
    },
  ];

  document.getElementById('planGrid').innerHTML = plans.map(p => '<div class="plan-col ' + p.cls + ' ' + (p.recommended ? 'plan-recommended' : '') + '"><div class="plan-tier-label">' + p.label + '</div><div class="plan-tier-name">' + p.name + '</div>' + p.items.map(item => '<div class="plan-item"><span class="plan-item-label">' + item[0] + '</span><span class="plan-item-value" style="text-align:right;">' + item[1] + '</span></div>').join('') + '</div>').join('');

  // Format manual inputs
  document.querySelectorAll('.manual-price-input').forEach(inp => {
    inp.addEventListener('input', () => formatNumberInput(inp));
    inp.style.width = '100px';
    inp.style.padding = '6px 10px';
    inp.style.border = '1px solid #ccc';
    inp.style.borderRadius = '8px';
    inp.style.textAlign = 'right';
    inp.style.fontSize = '1rem';
  });
}

// Google Sheets Submit
async function submitToGoogleSheets() {
  // นำ URL ของ Apps Script ที่ได้จากข้อ 3 มาวางแทนข้อความด้านล่างนี้
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwX9t5bQV6g_lkPByenrO4FM6WUvlYsaBh-berudYri70wOEUtdIerdbMTnwI7QPL4FFw/exec";

  const statusEl = document.getElementById('submitStatus');
  if (SCRIPT_URL.includes('YOUR_SCRIPT_ID_HERE')) {
    statusEl.innerHTML = '❌ กรุณานำลิงก์ Google Apps Script URL มาแปะในโค้ดไฟล์ <code>app.js</code> (บรรทัด 388) ก่อนครับ<br><span style="font-size:0.8rem; color:#666;">อ่านวิธีทำในไฟล์คู่มือ setup-google-sheets.md ครับ</span>';
    statusEl.style.color = 'red';
    return;
  }

  statusEl.textContent = 'กำลังส่งข้อมูล... ⏳';
  statusEl.style.color = 'var(--aia-blue)';
  document.getElementById('btnSubmitData').disabled = true;

  const payload = {
    clientName: document.getElementById('clientName')?.value,
    clientAge: num('clientAge'),
    gender: document.querySelector('input[name="gender"]:checked')?.value,
    familyStatus: document.querySelector('input[name="family"]:checked')?.value,
    childCount: num('childCount'),
    debtHome: num('debtHome'),
    debtCar: num('debtCar'),
    debtOther: num('debtOther'),
    debtTotal: num('debtHome') + num('debtCar') + num('debtOther'),
    emergencyCash: num('savEmergency'),
    taxRMF: num('taxRMF'),
    taxSSF: num('taxSSF'),
    taxPVD: num('taxPVD'),
    taxSS: num('taxSS'),
    welfare: document.querySelector('input[name="welfare"]:checked')?.value,
    hospTier: document.querySelector('.tier-card-hosp.selected')?.dataset.tier,
    schoolTier: document.querySelector('.tier-card-sch.selected')?.dataset.tier,
    uniTier: document.querySelector('.tier-card-uni.selected')?.dataset.tier,
    retireAge: num('retireAge'),
    retireMonthly: num('retireMonthly'),
    incomeMain: num('incomeMain'),
    selectedPlan: ''
  };

  try {
    const res = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'text/plain;charset=utf-8' } // text/plain prevents CORS preflight issue
    });

    statusEl.textContent = '✅ บันทึกข้อมูลเรียบร้อย!';
    statusEl.style.color = 'green';
  } catch (err) {
    statusEl.textContent = '❌ เกิดข้อผิดพลาดในการส่งข้อมูล: ' + err.message;
    statusEl.style.color = 'red';
    console.error(err);
  } finally {
    document.getElementById('btnSubmitData').disabled = false;
  }
}

// Init
goToSlide(0);
