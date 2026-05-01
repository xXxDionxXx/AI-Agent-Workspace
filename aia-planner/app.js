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

// ===== SLIDE 1: FINANCIAL PLANS (PYRAMID) =====
container.appendChild(createSlide(1, `
  <div class="glass-card" style="width:100%; max-width:1200px; padding:32px;">
    <div style="text-align:center; margin-bottom:32px;">
      <div class="browser-badge" style="display:inline-flex; background:var(--aia-blue);"><span class="browser-badge-num" style="color:var(--aia-blue);">1</span> Financial Plans - การจัดลำดับความสำคัญทางการเงิน</div>
    </div>
    
    <div class="pyramid-container">
      <div class="pyramid-stack-wrapper">
        <div class="pyramid-tax-arrow">
          <div class="tax-arrow-line"></div>
          <div class="tax-arrow-head-top"></div>
          <div class="tax-arrow-label">
            <div class="tax-heading">Tax Planning</div>
            <div class="tax-sub">วางแผนภาษี</div>
          </div>
          <div class="tax-arrow-head-bottom"></div>
        </div>
        <div class="pyramid-stack">
          <div class="pyramid-layer layer-a">
            <div class="pyramid-heading">Investment</div>
            <div class="pyramid-sub">ลงทุน</div>
          </div>
          <div class="pyramid-layer layer-b">
            <div class="pyramid-heading">Saving</div>
            <div class="pyramid-sub">ออมเงินเพื่อเป้าหมาย</div>
          </div>
          <div class="pyramid-layer layer-c">
            <div class="pyramid-heading">Protection</div>
            <div class="pyramid-sub">ปกป้อง</div>
          </div>
        </div>
      </div>
      
      <div class="pyramid-details">
        <!-- Layer A Details -->
        <div class="detail-group">
          <div class="detail-connector"></div>
          <div class="detail-box" onclick="toggleDetailCheck(this)" data-plan="inv_all">
            <div class="detail-text">ธุรกิจ / อสังหา / หุ้น / กองทุน / ทอง / อื่น ๆ</div>
            <div class="detail-checkbox"></div>
          </div>
        </div>
        
        <!-- Layer B Details -->
        <div class="detail-group">
          <div class="detail-connector"></div>
          <div class="detail-box" onclick="toggleDetailCheck(this)" data-plan="sav_edu">
            <div class="detail-text">เงินสด</div>
            <div class="detail-checkbox"></div>
          </div>
          <div class="detail-box" onclick="toggleDetailCheck(this)" data-plan="sav_ret">
            <div class="detail-text">บ้าน / รถ / ที่ดิน / อื่น ๆ</div>
            <div class="detail-checkbox"></div>
          </div>
          <div class="detail-box" onclick="toggleDetailCheck(this)" data-plan="sav_ret">
            <div class="detail-text">ค่าเทอมลูก</div>
            <div class="detail-checkbox"></div>
          </div>
          <div class="detail-box" onclick="toggleDetailCheck(this)" data-plan="sav_legacy">
            <div class="detail-text">เกษียณ</div>
            <div class="detail-checkbox"></div>
          </div>
        </div>
        
        <!-- Layer C Details -->
        <div class="detail-group">
          <div class="detail-connector"></div>
          <div class="detail-box" onclick="toggleDetailCheck(this)" data-plan="pro_short">
            <div class="detail-text">ปกป้องรายได้ / เงินสำรองฉุกเฉิน</div>
            <div class="detail-checkbox"></div>
          </div>
          <div class="detail-box" onclick="toggleDetailCheck(this)" data-plan="pro_health">
            <div class="detail-text">ปกป้องเงินออม</div>
            <div class="detail-checkbox"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
`));

// ===== SLIDE 2: INVESTMENT =====
container.appendChild(createSlide(2, `
  <div class="glass-card">
    ${secHdr('2', 'INVESTMENT')}
    <p class="slide-subtitle">เงินลงทุนรวมทั้งหมด</p>
    ${inp('investTotal', 'เงินลงทุนรวม (บาท)', 'เช่น 1,500,000', 'number')}
  </div>
`));

// ===== SLIDE 3: EDUCATION SELECTION =====
container.appendChild(createSlide(3, `
  <div class="glass-card">
    ${secHdr('3', 'EDUCATION SELECTION')}
    <p class="slide-subtitle">ระดับการศึกษาที่ต้องการวางแผนให้บุตร (ข้ามได้หากไม่มีบุตร)</p>
    
    <div class="form-label" style="color:var(--aia-blue); margin-top:8px;">🏫 ระดับโรงเรียน</div>
    <div class="form-row" style="margin-bottom:8px;">
      ${inp('eduSchoolYears', 'จำนวนปีที่ต้องเรียน (รวมลูกทุกคน)', 'เช่น 12', 'number')}
    </div>
    <div id="schoolTierCards" style="margin-bottom:16px;">
      ${SCHOOL_TIERS.map((t, i) => `
        <div class="tier-card tier-card-sch ${i === 1 ? 'selected' : ''}" data-tier="${t.id}" data-price="${t.priceNum}" onclick="selectTierGroup(this, 'sch'); calcEducation();">
          <div class="tier-header">
            <span class="tier-name">${t.name}</span>
            <span class="tier-price">${t.price}</span>
          </div>
          <div class="tier-hospitals">${t.examples}</div>
        </div>
      `).join('')}
    </div>

    <div class="form-label" style="color:var(--aia-blue); margin-top:16px;">🎓 ระดับมหาวิทยาลัย</div>
    <div class="form-row" style="margin-bottom:8px;">
      ${inp('eduUniYears', 'จำนวนปีที่ต้องเรียน (รวมลูกทุกคน)', 'เช่น 4', 'number')}
    </div>
    <div id="uniTierCards" style="margin-bottom:16px;">
      ${UNI_TIERS.map((t, i) => `
        <div class="tier-card tier-card-uni ${i === 1 ? 'selected' : ''}" data-tier="${t.id}" data-price="${t.priceNum}" onclick="selectTierGroup(this, 'uni'); calcEducation();">
          <div class="tier-header">
            <span class="tier-name">${t.name}</span>
            <span class="tier-price">${t.price}</span>
          </div>
          <div class="tier-hospitals">${t.examples}</div>
        </div>
      `).join('')}
    </div>
    
    <div class="gap-section" style="margin-top:16px; background:rgba(10,117,187,0.05); border-color:rgba(10,117,187,0.2);">
      <h3 style="color:var(--aia-blue);">💡 สรุปทุนการศึกษาที่ต้องเตรียม</h3>
      <div id="eduCalcResult" style="font-size:1.1rem; color:var(--text-primary); font-weight:700;">
        กรุณากรอกจำนวนปีเพื่อคำนวณ
      </div>
    </div>
  </div>
`));

// ===== SLIDE 4: RETIREMENT =====
container.appendChild(createSlide(4, `
  <div class="glass-card">
    ${secHdr('4', 'RETIREMENT (เกษียณอายุ)')}
    <p class="slide-subtitle">การวางแผนหลังเกษียณ</p>
    <div class="form-row">
      ${inp('retireAge', 'อายุเกษียณ', 'เช่น 60', 'number', 'should')}
      ${inp('retireLifeExp', 'อายุขัย', 'เช่น 85', 'number', 'opt')}
    </div>
    ${inp('retireMonthly', 'เงินใช้จ่ายต่อเดือนหลังเกษียณ', 'เช่น 30,000', 'number', 'should')}
    <div id="retireCalc" style="margin-top:8px;"></div>
  </div>
`));

// ===== SLIDE 5: กองทุนมรดก =====
container.appendChild(createSlide(5, `
  <div class="glass-card">
    ${secHdr('5', 'กองทุนมรดก')}
    <p class="slide-subtitle">ทรัพย์สินและภาระที่ต้องการส่งมอบ</p>
    
    <div style="margin-bottom:16px; padding-bottom:16px; border-bottom:1px dashed rgba(0,0,0,0.1);">
      ${inp('legacyHome', 'บ้าน (บาท)', 'เช่น 3,000,000', 'number')}
      ${inp('legacyCondo', 'คอนโด (บาท)', 'เช่น 2,000,000', 'number')}
      ${inp('legacyCar', 'รถยนต์ (บาท)', 'เช่น 500,000', 'number')}
      ${inp('legacyOther', 'ทรัพย์สินอื่น ๆ', 'เช่น เงินฝาก หุ้น กองทุนรวม', 'text')}
      ${inp('legacyOtherVal', 'มูลค่าทรัพย์สินอื่น ๆ (บาท)', 'เช่น 1,000,000', 'number')}
    </div>
    
    <div class="form-label" style="color:var(--aia-red); font-weight:700; font-size:1.1rem;">มรดกหนี้สิน</div>
    ${inp('legacyDebt', 'ยอดหนี้สินที่ยังคงค้าง (บาท)', 'เช่น 1,500,000', 'number')}
  </div>
`));

// ===== SLIDE 6: PROTECTION & INCOME SUMMARY =====
container.appendChild(createSlide(6, `
  <div class="glass-card">
    ${secHdr('6', 'PROTECTION & INCOME SUMMARY')}
    <p class="slide-subtitle">สรุปรายได้และการปกป้องความเสี่ยง</p>
    
    <!-- INCOME -->
    <div style="background:rgba(255,255,255,0.5); padding:16px; border-radius:12px; margin-bottom:24px; border:1px solid rgba(0,0,0,0.05);">
      <div class="form-label" style="font-weight:700; color:var(--aia-blue);">รายได้หลักของคุณ</div>
      ${inp('incomeMain', 'รายได้หลัก/เดือน (บาท)', 'เช่น 30,000', 'number', 'must')}
      <div id="incomeTotalDisplay" style="margin-top:8px; font-weight:600; color:var(--aia-red);"></div>
    </div>

    <!-- PROTECTION -->
    <div class="form-label" style="font-weight:700;">แผนปกป้อง (เป้าหมายที่ต้องการมี)</div>
    
    <div class="form-row" style="align-items:center;">
      <div style="flex:1;">
        ${inp('protShort', 'ปกป้องรายได้ระยะสั้น/เงินสำรองฉุกเฉิน (3-6 เดือน)', 'จำนวนเงิน', 'number')}
      </div>
      <div id="tipShort" style="flex:0.8; background:rgba(234,179,8,0.1); padding:12px; border-radius:12px; font-size:0.85rem; color:#b8860b;">
        💡 แผนที่ปลอดภัย: กรุณากรอกรายได้
      </div>
    </div>

    <div class="form-row" style="align-items:center; margin-top:12px;">
      <div style="flex:1;">
        ${inp('protLong', 'ปกป้องรายได้ระยะยาว/ประกันโรคร้ายแรง (3-5 ปี)', 'จำนวนเงิน', 'number')}
      </div>
      <div id="tipLong" style="flex:0.8; background:rgba(234,179,8,0.1); padding:12px; border-radius:12px; font-size:0.85rem; color:#b8860b;">
        💡 แผนที่ปลอดภัย: กรุณากรอกรายได้
      </div>
    </div>

    <div class="form-row" style="align-items:center; margin-top:12px;">
      <div style="flex:1;">
        ${inp('protHealth', 'ปกป้องเงินออม/ประกันสุขภาพ (สวัสดิการรักษาพยาบาล)', 'จำนวนเงิน', 'number')}
      </div>
    </div>

  </div>
`));

// ===== SLIDE 7: PERSONAL PROFILE =====
container.appendChild(createSlide(7, `
  <div class="glass-card">
    ${secHdr('7', 'PERSONAL PROFILE')}
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

// ===== SLIDE 8: SAVINGS & INVESTMENT (Legacy) =====
container.appendChild(createSlide(8, `
  <div class="glass-card">
    ${secHdr('8', 'SAVINGS & INVESTMENT')}
    <p class="slide-subtitle">สินทรัพย์และเงินสำรองอื่นๆ</p>
    
    ${inp('savCash', 'เงินเก็บ / เงินออมทั่วไป (บาท)', 'เช่น 200,000', 'number', 'must')}
    
    <div class="form-group" style="margin-top:16px;">
      <div class="form-label" style="display:flex; justify-content:space-between;">
        <span>เงินสำรองฉุกเฉิน ${pri('must')}</span>
      </div>
      <input class="form-input" type="text" id="savEmergency" placeholder="เช่น 60,000" autocomplete="off" oninput="formatNumberInput(this)">
    </div>
  </div>
`));

// ===== SLIDE 9: WELFARE SELECTION =====
container.appendChild(createSlide(9, `
  <div class="glass-card">
    ${secHdr('9', 'WELFARE Selection')}
    <p class="slide-subtitle">ทบทวนสวัสดิการพื้นฐานของลูกค้า</p>
    <div class="select-cards" id="welfareCards">
      ${selCard('welfare', 'social33', '🔵', 'ประกันสังคม (ม.33)', 'สวัสดิการพนักงานเอกชน')}
      ${selCard('welfare', 'gov', '💼', 'ข้าราชการ', 'สวัสดิการกรมบัญชีกลาง')}
      ${selCard('welfare', 'gold', '💳', 'บัตรทอง', 'หลักประกันสุขภาพถ้วนหน้า')}
    </div>
  </div>
`));

// ===== SLIDE 10: WELFARE DETAILS =====
container.appendChild(createSlide(10, `
  <div class="glass-card" id="welfareResult">
    ${secHdr('10', 'เปรียบเทียบสิทธิรักษาพยาบาล')}
    <p class="slide-subtitle" id="welfareSub">เลือกสิทธิ์ในหน้า 9</p>
    <div id="welfareItems"></div>
  </div>
`));

// ===== SLIDE 11: HOSPITAL SELECTION =====
container.appendChild(createSlide(11, `
  <div class="glass-card">
    ${secHdr('11', 'HOSPITAL SELECTION')}
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

// ===== SLIDE 12: TAX PLANNING =====
container.appendChild(createSlide(12, `
  <div class="glass-card">
    ${secHdr('12', 'TAX PLANNING')}
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

// ===== SLIDE 13: RISK MANAGEMENT =====
container.appendChild(createSlide(13, `
  <div class="glass-card">
    ${secHdr('13', 'RISK MANAGEMENT')}
    <p class="slide-subtitle">ความคุ้มครองที่มีอยู่เดิม (ถ้ามี)</p>
    ${inp('riskLife', 'ทุนประกันชีวิตรวมทั้งหมด', 'เช่น 1,000,000', 'number', 'must')}
    ${inp('riskCI', 'วงเงินประกันโรคร้ายแรง', 'เช่น 500,000', 'number', 'must')}
    ${inp('riskHealth', 'วงเงินประกันสุขภาพเหมาจ่าย / ปี', 'เช่น 5,000,000', 'number', 'should')}
    ${inp('riskAccident', 'วงเงินค่ารักษาอุบัติเหตุ', 'เช่น 50,000', 'number', 'opt')}
  </div>
`));

// ===== SLIDE 14: PROPOSED SOLUTION (FINAL) =====
container.appendChild(createSlide(14, `
  <div class="glass-card" style="text-align:center; max-width:1400px; width:95%;">
    <div class="slide-title" style="margin-bottom:6px">แผนที่แนะนำสำหรับ <span class="aia-accent" id="finalName">ลูกค้า</span></div>
    <p class="slide-subtitle">เปรียบเทียบ 3 แผน เลือกแผนที่เหมาะกับไลฟ์สไตล์และงบประมาณ</p>
    
    <div class="gap-section" style="margin-top:16px; max-width:800px; margin-left:auto; margin-right:auto; background:rgba(10,117,187,0.05); border-color:rgba(10,117,187,0.2);">
      <h3 style="color:var(--aia-blue);">💡 สัดส่วนเงินสำหรับความคุ้มครอง (15% Rule)</h3>
      <div id="incomeRuleFinal" style="font-size:0.9rem; color:var(--text-secondary); line-height:1.6;">
        กรุณากรอกรายได้ในหน้า Protection & Income
      </div>
    </div>
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

// --- Pyramid Detail Check toggle ---
function toggleDetailCheck(el) {
  el.classList.toggle('checked');
  const chk = el.querySelector('.detail-checkbox');
  if (el.classList.contains('checked')) {
    chk.innerHTML = '✓';
  } else {
    chk.innerHTML = '';
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

// Education Calculation
function calcEducation() {
  const schYears = num('eduSchoolYears');
  const uniYears = num('eduUniYears');

  const schTierEl = document.querySelector('.tier-card-sch.selected');
  const uniTierEl = document.querySelector('.tier-card-uni.selected');

  const schPrice = schTierEl ? parseInt(schTierEl.dataset.price) : 0;
  const uniPrice = uniTierEl ? parseInt(uniTierEl.dataset.price) : 0;

  const totalSch = schYears * schPrice;
  const totalUni = uniYears * uniPrice;
  const total = totalSch + totalUni;

  const el = document.getElementById('eduCalcResult');
  if (total > 0) {
    el.innerHTML = 'รวมทุนการศึกษาบุตรทั้งหมด: <span style="color:var(--aia-red);">' + fmt(total) + ' บาท</span><br>' +
      '<span style="font-size:0.85rem; font-weight:normal; color:var(--text-secondary);">(ระดับโรงเรียน ' + fmt(totalSch) + ' บาท + ระดับมหาวิทยาลัย ' + fmt(totalUni) + ' บาท)</span>';
  } else {
    el.innerHTML = 'กรุณากรอกจำนวนปีเพื่อคำนวณ';
  }
}

document.getElementById('eduSchoolYears')?.addEventListener('input', calcEducation);
document.getElementById('eduUniYears')?.addEventListener('input', calcEducation);

// Income & Protection TIP logic
document.getElementById('incomeMain')?.addEventListener('input', computeProtectionTip);

function computeProtectionTip() {
  const inc = num('incomeMain');
  const totalDisplay = document.getElementById('incomeTotalDisplay');
  const tipShort = document.getElementById('tipShort');
  const tipLong = document.getElementById('tipLong');
  const tipRuleFinal = document.getElementById('incomeRuleFinal');

  if (inc > 0) {
    totalDisplay.textContent = 'รายได้รวมต่อเดือน: ' + fmt(inc) + ' บาท';

    const shortMin = inc * 3;
    const shortMax = inc * 6;
    tipShort.innerHTML = '💡 แผนที่ปลอดภัย: ~ <strong>' + fmt(shortMin) + ' - ' + fmt(shortMax) + '</strong> บาท';

    const longMin = inc * 12 * 3;
    const longMax = inc * 12 * 5;
    tipLong.innerHTML = '💡 แผนที่ปลอดภัย: ~ <strong>' + fmt(longMin) + ' - ' + fmt(longMax) + '</strong> บาท';

    const budgetYear = (inc * 12) * 0.15;
    tipRuleFinal.innerHTML = 'รายได้รวมต่อปีโดยประมาณ: <strong>' + fmt(inc * 12) + '</strong> บาท<br>' +
      'เงินที่นำมาวางแผนประกันและคุ้มครอง (ไม่ควรเกิน 15%):<br>' +
      '👉 สูงสุดไม่เกิน <strong style="color:var(--aia-red); font-size:1.1rem;">' + fmt(budgetYear) + '</strong> บาท/ปี ' +
      '<span style="font-size:0.8rem;">(หรือ ' + fmt(budgetYear / 12) + ' บาท/เดือน)</span>';
  } else {
    totalDisplay.textContent = '';
    tipShort.innerHTML = '💡 แผนที่ปลอดภัย: กรุณากรอกรายได้';
    tipLong.innerHTML = '💡 แผนที่ปลอดภัย: กรุณากรอกรายได้';
    tipRuleFinal.innerHTML = 'กรุณากรอกรายได้ในหน้า Protection & Income';
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
  if (idx === 4) computeRetirement();
  if (idx === 10) computeWelfare();
  if (idx === 14) computeSolution();
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

  const cash = num('investTotal') + num('savCash');
  const gap = Math.max(totalNeeded - cash, 0);

  document.getElementById('retireCalc').innerHTML = '<div class="benefit-row"><div class="status-dot dot-yellow">💡</div><div><div class="benefit-name">ประมาณการเงินเกษียณ (เงินเฟ้อ 3%)</div><div class="benefit-detail">ต้องใช้จริง/ด.: <strong>' + fmt(futureMonthly) + '</strong> บาท<br>ยอดรวม ' + yearsInRetire + ' ปี: <strong>' + fmt(totalNeeded) + '</strong> บาท<br><span style="color:var(--aia-red); font-weight:600;">ทุนเกษียณที่ขาด: ' + fmt(gap) + ' บาท</span></div></div></div>';
}

// Final Solution 3-Tier
function computeSolution() {
  const name = document.getElementById('clientName')?.value || 'ลูกค้า';
  document.getElementById('finalName').textContent = name;

  const hospEl = document.querySelector('.tier-card-hosp.selected');
  const hospId = hospEl ? hospEl.dataset.tier : 'standard';

  const welfSel = document.querySelector('#welfareCards input[type="radio"]:checked');
  const welfareText = welfSel ? WELFARE[welfSel.value].label : 'ไม่ระบุสวัสดิการ';

  // Checking Pyramid Selection
  const pSavEdu = document.querySelector('[data-plan="sav_edu"]')?.classList.contains('checked');
  const pSavLegacy = document.querySelector('[data-plan="sav_legacy"]')?.classList.contains('checked');
  const pSavRet = document.querySelector('[data-plan="sav_ret"]')?.classList.contains('checked');
  const pProShort = document.querySelector('[data-plan="pro_short"]')?.classList.contains('checked');
  const pProLong = document.querySelector('[data-plan="pro_long"]')?.classList.contains('checked');
  const pProHealth = document.querySelector('[data-plan="pro_health"]')?.classList.contains('checked');

  const cEdu = pSavEdu ? '✅' : '—';
  const cLegacy = pSavLegacy ? '✅' : '—';
  const cRet = pSavRet ? '✅' : '—';
  const cShort = pProShort ? '✅' : '—';
  const cLong = pProLong ? '✅' : '—';

  const tierMap = {
    gov: { eco: 'รพ.รัฐ ห้องพิเศษ', biz: 'Standard', first: 'High-End' },
    standard: { eco: 'รพ.รัฐ ห้องพิเศษ', biz: 'Standard', first: 'High-End' },
    highend: { eco: 'Standard', biz: 'High-End', first: 'Luxury' },
    luxury: { eco: 'High-End', biz: 'Luxury', first: 'Luxury+' },
  };
  const htier = tierMap[hospId] || tierMap.standard;

  const getHealthText = (tier, selected) => {
    return selected ? '✅ (' + welfareText + ' / ' + tier + ')' : '—';
  };

  const plans = [
    {
      cls: 'plan-economy', label: 'ECONOMY CLASS', name: '✈️ ECONOMY CLASS (3 ปี)', recommended: false,
      items: [
        ['<strong style="color:var(--aia-red);">Investment ลงทุน/ต่อยอด</strong>', '—'],
        ['<strong style="color:var(--aia-blue);">Saving ออมเพื่อเป้าหมาย</strong>', ''],
        ['&nbsp;&nbsp;• กองทุนการศึกษาลูก', cEdu],
        ['&nbsp;&nbsp;• กองทุนมรดก', cLegacy],
        ['&nbsp;&nbsp;• กองทุนเพื่อการเกษียณ', cRet],
        ['<strong style="color:var(--text-secondary);">Protection ปกป้อง</strong>', ''],
        ['&nbsp;&nbsp;• ปกป้องรายได้ระยะสั้น', cShort],
        ['&nbsp;&nbsp;• ปกป้องรายได้ระยะยาว', cLong],
        ['&nbsp;&nbsp;• ปกป้องเงินออม', getHealthText(htier.eco, pProHealth)],
      ]
    },
    {
      cls: 'plan-business', label: 'BUSINESS CLASS', name: '🌟 BUSINESS CLASS (5 ปี)', recommended: true,
      items: [
        ['<strong style="color:var(--aia-red);">Investment ลงทุน/ต่อยอด</strong>', '—'],
        ['<strong style="color:var(--aia-blue);">Saving ออมเพื่อเป้าหมาย</strong>', ''],
        ['&nbsp;&nbsp;• กองทุนการศึกษาลูก', cEdu],
        ['&nbsp;&nbsp;• กองทุนมรดก', cLegacy],
        ['&nbsp;&nbsp;• กองทุนเพื่อการเกษียณ', cRet],
        ['<strong style="color:var(--text-secondary);">Protection ปกป้อง</strong>', ''],
        ['&nbsp;&nbsp;• ปกป้องรายได้ระยะสั้น', cShort],
        ['&nbsp;&nbsp;• ปกป้องรายได้ระยะยาว', cLong],
        ['&nbsp;&nbsp;• ปกป้องเงินออม', getHealthText(htier.biz, pProHealth)],
      ]
    },
    {
      cls: 'plan-first', label: 'FIRST CLASS', name: '👑 FIRST CLASS (7 ปี)', recommended: false,
      items: [
        ['<strong style="color:var(--aia-red);">Investment ลงทุน/ต่อยอด</strong>', '—'],
        ['<strong style="color:var(--aia-blue);">Saving ออมเพื่อเป้าหมาย</strong>', ''],
        ['&nbsp;&nbsp;• กองทุนการศึกษาลูก', cEdu],
        ['&nbsp;&nbsp;• กองทุนมรดก', cLegacy],
        ['&nbsp;&nbsp;• กองทุนเพื่อการเกษียณ', cRet],
        ['<strong style="color:var(--text-secondary);">Protection ปกป้อง</strong>', ''],
        ['&nbsp;&nbsp;• ปกป้องรายได้ระยะสั้น', cShort],
        ['&nbsp;&nbsp;• ปกป้องรายได้ระยะยาว', cLong],
        ['&nbsp;&nbsp;• ปกป้องเงินออม', getHealthText(htier.first, pProHealth)],
      ]
    },
  ];

  document.getElementById('planGrid').innerHTML = plans.map(p => '<div class="plan-col ' + p.cls + ' ' + (p.recommended ? 'plan-recommended' : '') + '"><div class="plan-tier-name" style="font-size:1.15rem;">' + p.name + '</div>' + p.items.map(item => '<div class="plan-item" style="padding:6px 0; border:none;"><span class="plan-item-label">' + item[0] + '</span><span class="plan-item-value" style="text-align:right;">' + item[1] + '</span></div>').join('') + '</div>').join('');
}

// Google Sheets Submit
async function submitToGoogleSheets() {
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwX9t5bQV6g_lkPByenrO4FM6WUvlYsaBh-berudYri70wOEUtdIerdbMTnwI7QPL4FFw/exec";

  const statusEl = document.getElementById('submitStatus');
  if (SCRIPT_URL.includes('YOUR_SCRIPT_ID_HERE')) {
    statusEl.innerHTML = '❌ กรุณานำลิงก์ Google Apps Script URL มาแปะในโค้ดไฟล์ <code>app.js</code> ก่อนครับ';
    statusEl.style.color = 'red';
    return;
  }

  statusEl.textContent = 'กำลังส่งข้อมูล... ⏳';
  statusEl.style.color = 'var(--aia-blue)';
  document.getElementById('btnSubmitData').disabled = true;

  const payload = {
    clientName: document.getElementById('clientName')?.value,
    clientAge: num('clientAge'),
    incomeMain: num('incomeMain'),
    investTotal: num('investTotal'),
    retireAge: num('retireAge'),
    retireMonthly: num('retireMonthly')
  };

  try {
    const res = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' }
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
