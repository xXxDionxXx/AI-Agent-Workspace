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
    <div style="text-align:center; margin-bottom:24px;">
      <div class="browser-badge" style="display:inline-flex; background:var(--aia-blue);"><span class="browser-badge-num" style="color:var(--aia-blue);">1</span> Financial Plans - การจัดลำดับความสำคัญทางการเงิน</div>
    </div>
    
    <!-- Family Mode Toggle -->
    <div class="family-mode-toggle">
      <button type="button" class="family-mode-btn active" data-mode="family" onclick="setFamilyMode('family')">👨‍👩‍👧 คนมีครอบครัว/บุตร</button>
      <button type="button" class="family-mode-btn" data-mode="single" onclick="setFamilyMode('single')">👤 คนยังไม่แต่งงาน/โสด</button>
    </div>
    
    <div class="pyramid-container">
      <div class="pyramid-stack-wrapper">
        <div class="pyramid-tax-arrow">
          <div class="tax-arrow-line"></div>
          <div class="tax-arrow-head-top"></div>
          <div class="tax-arrow-label">
            <div class="tax-heading">Tax Planning</div>
            <div class="tax-sub">วางแผนภาษี</div>
            <div class="tax-chk-wrap">
              <div class="detail-box" onclick="event.stopPropagation(); toggleDetailCheck(this)" data-plan="tax_plan" style="padding:6px 8px; border-radius:8px; gap:0; justify-content:center;">
                <div class="detail-checkbox" style="width:20px; height:20px;"></div>
              </div>
            </div>
          </div>
          <div class="tax-arrow-head-bottom"></div>
        </div>
        <div class="pyramid-stack">
          <div class="pyramid-cap"></div>
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
        <!-- Investment Group -->
        <div class="detail-group">
          <div class="detail-group-badge" style="background:#d21145;">Investment</div>
          <div class="detail-box" onclick="toggleDetailCheck(this)" data-plan="inv_all">
            <div class="detail-text">ลงทุนใน ธุรกิจ / อสังหา / หุ้น / กองทุน / ทอง / อื่น ๆ</div>
            <div class="detail-checkbox"></div>
          </div>
        </div>
        
        <!-- Saving Group -->
        <div class="detail-group">
          <div class="detail-group-badge" style="background:#f9a825;">Saving</div>
          <div class="detail-box" onclick="toggleDetailCheck(this)" data-plan="sav_cash">
            <div class="detail-text">เงินสด</div>
            <div class="detail-checkbox"></div>
          </div>
          <div class="detail-box" onclick="toggleDetailCheck(this)" data-plan="sav_asset">
            <div class="detail-text">บ้าน / รถ / ที่ดิน / อื่น ๆ</div>
            <div class="detail-checkbox"></div>
          </div>
          <div class="detail-box" onclick="toggleDetailCheck(this)" data-plan="sav_edu" id="savEduBox">
            <div class="detail-text" id="savEduText">ค่าเทอมลูก</div>
            <div class="detail-checkbox"></div>
          </div>
          <div class="detail-box" onclick="toggleDetailCheck(this)" data-plan="sav_retire">
            <div class="detail-text">เกษียณ</div>
            <div class="detail-checkbox"></div>
          </div>
        </div>
        
        <!-- Protection Group -->
        <div class="detail-group">
          <div class="detail-group-badge" style="background:#107c41;">Protection</div>
          <div class="detail-box" onclick="toggleDetailCheck(this)" data-plan="pro_income">
            <div class="detail-text">ปกป้องรายได้ / เงินสำรองฉุกเฉิน</div>
            <div class="detail-checkbox"></div>
          </div>
          <div class="detail-box" onclick="toggleDetailCheck(this)" data-plan="pro_savings">
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
        <div class="tier-card tier-card-sch ${i === 1 ? 'selected' : ''}" data-tier="${t.id}" data-price="${t.priceNum}" data-pricemin="${t.priceMin}" data-pricemax="${t.priceMax}" onclick="selectTierGroup(this, 'sch'); calcEducation();">
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
        <div class="tier-card tier-card-uni ${i === 1 ? 'selected' : ''}" data-tier="${t.id}" data-price="${t.priceNum}" data-pricemin="${t.priceMin}" data-pricemax="${t.priceMax}" onclick="selectTierGroup(this, 'uni'); calcEducation();">
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

// ===== SLIDE 10: WELFARE COMPARISON =====
container.appendChild(createSlide(10, `
  <div class="glass-card" id="welfareResult" style="max-width:1100px;">
    ${secHdr('10', 'เปรียบเทียบสิทธิรักษาพยาบาล')}
    <p class="slide-subtitle" id="welfareSub">สวัสดิการพื้นฐาน vs ประกันสุขภาพส่วนตัว</p>
    <div id="welfareItems"></div>
    <div id="welfareCompareTable" style="overflow-x:auto; margin-top:16px;"></div>
  </div>
`));

// ===== SLIDE 11: HOSPITAL & PLAN SELECTION =====
container.appendChild(createSlide(11, `
  <div class="glass-card" style="max-width:1100px;">
    ${secHdr('11', 'HOSPITAL & HEALTH PLAN')}
    <p class="slide-subtitle">เลือกระดับโรงพยาบาลและแผนประกันสุขภาพ</p>
    
    <div class="form-label" style="color:var(--aia-blue); font-weight:700; margin-bottom:8px;">🏥 ระดับโรงพยาบาลที่ใช้บริการ</div>
    <div id="tierCards" style="margin-bottom:24px;">
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
    
    <div class="form-label" style="color:var(--aia-blue); font-weight:700; margin-bottom:8px;">💎 เลือกแผนประกันสุขภาพ</div>
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px; margin-bottom:16px;">
      ${HEALTH_PLANS.map((p, i) => `
        <div class="tier-card tier-card-plan ${i === 0 ? 'selected' : ''}" data-plan-id="${p.id}" onclick="selectTierGroup(this, 'plan')" style="text-align:center;">
          <div style="font-size:1.8rem;">${p.icon}</div>
          <div style="font-weight:700; font-size:1rem; margin:4px 0;">${p.name}</div>
          <div style="font-size:0.82rem; color:var(--text-secondary);">
            ค่าห้อง: <strong>${p.room}</strong>/วัน<br>
            CI: ${p.ci}<br>
            OPD: ${p.opd}
          </div>
        </div>
      `).join('')}
    </div>
  </div>
`));

// ===== SLIDE 12: TAX CALCULATOR =====
container.appendChild(createSlide(12, `
  <div class="glass-card" style="max-width:1100px;">
    ${secHdr('12', 'TAX CALCULATOR')}
    <p class="slide-subtitle">คำนวณภาษีเงินได้บุคคลธรรมดา</p>
    
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
      <div>
        <div class="form-label" style="color:#d21145; font-weight:700;">📊 รายได้ต่อปี</div>
        ${inp('taxIncome', 'เงินได้รวมทั้งปี (ก่อนหักค่าใช้จ่าย)', 'รายได้รวม', 'number')}
        <div style="font-size:0.78rem; color:var(--text-muted); margin-top:-8px; margin-bottom:12px;">* หักค่าใช้จ่ายเหมา 50% สูงสุด 100,000 อัตโนมัติ</div>
        
        <div class="form-label" style="color:#107c41; font-weight:700;">📋 ค่าลดหย่อนภาษี</div>
        ${inp('taxLife', 'เบี้ยประกันชีวิต/สะสมทรัพย์', 'สูงสุด 100,000', 'number')}
        ${inp('taxHealth', 'เบี้ยประกันสุขภาพ', 'สูงสุด 25,000 (รวมชีวิตไม่เกิน 100,000)', 'number')}
        ${inp('taxParentHealth', 'เบี้ยประกันสุขภาพพ่อแม่', 'สูงสุด 15,000', 'number')}
        ${inp('taxSocial', 'ประกันสังคม', 'สูงสุด 9,000', 'number')}
        
        <div style="margin-top:12px; padding-top:12px; border-top:1px dashed rgba(0,0,0,0.1);">
          <div class="form-label" style="color:#f9a825; font-weight:700;">💰 กองทุนเกษียณ (รวมไม่เกิน 500,000)</div>
          ${inp('taxRMF', 'RMF', 'สูงสุด 500,000', 'number')}
          ${inp('taxSSF', 'SSF', 'สูงสุด 200,000', 'number')}
          ${inp('taxPVD', 'PVD / กบข.', 'สูงสุด 500,000', 'number')}
          ${inp('taxPension', 'ประกันบำนาญ', 'สูงสุด 200,000', 'number')}
        </div>
        
        <div style="margin-top:12px; padding-top:12px; border-top:1px dashed rgba(0,0,0,0.1);">
          <div class="form-label" style="color:var(--aia-blue); font-weight:700;">🏠 อื่นๆ</div>
          ${inp('taxHousing', 'ดอกเบี้ยกู้ยืมบ้าน', 'สูงสุด 100,000', 'number')}
          ${inp('taxESG', 'กองทุน ThaiESG', 'สูงสุด 300,000', 'number')}
          ${inp('taxDonate', 'เงินบริจาค', 'ไม่เกิน 10% ของเงินได้', 'number')}
        </div>
        
        <div style="margin-top:12px; padding:12px; background:rgba(234,179,8,0.08); border-radius:12px;">
          <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:0.9rem;">
            <input type="checkbox" id="taxDividendToggle" onchange="document.getElementById('taxDividendFields').style.display = this.checked ? 'block' : 'none'; computeTaxSummary();">
            <span>🔄 ใช้เครดิตภาษีเงินปันผล (Dividend Tax Credit)</span>
          </label>
          <div id="taxDividendFields" style="display:none; margin-top:8px;">
            ${inp('taxDividend', 'จำนวนเงินปันผลที่ได้รับ', 'เงินปันผลรวม', 'number')}
          </div>
        </div>
      </div>
      
      <div>
        <div id="taxSummaryResult" style="position:sticky; top:20px;">
          <div style="background:linear-gradient(135deg, rgba(10,117,187,0.08), rgba(210,17,69,0.05)); padding:24px; border-radius:16px; border:1px solid rgba(10,117,187,0.1);">
            <div style="font-weight:700; font-size:1.1rem; margin-bottom:16px; color:var(--aia-blue);">📊 สรุปผลคำนวณภาษี</div>
            <div id="taxCalcOutput" style="font-size:0.9rem; line-height:1.8;">
              <em style="color:var(--text-muted);">กรอกรายได้เพื่อเริ่มคำนวณ</em>
            </div>
          </div>
        </div>
      </div>
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

// ===== SLIDE 14: POLICY INPUT =====
container.appendChild(createSlide(14, `
  <div class="glass-card" style="max-width:1100px;">
    ${secHdr('14', 'POLICY AUDIT — กรอกกรมธรรม์')}
    <p class="slide-subtitle">กรอกข้อมูลกรมธรรม์ที่มีอยู่ เพิ่มได้หลายเล่ม</p>
    
    <div id="policyFormArea">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        ${inp('polName', 'ชื่อบริษัท / เลขกรมธรรม์', 'เช่น AIA 123456', 'text')}
        <div class="form-group">
          <label class="form-label">สถานะกรมธรรม์</label>
          <select class="form-input" id="polStatus">
            <option value="active">ปกติ (ชำระเบี้ยอยู่)</option>
            <option value="paidup">ใช้เงินสำเร็จ</option>
            <option value="extended">ขยายเวลา</option>
            <option value="lapsed">ขาดต่อ</option>
            <option value="apl">กู้เบี้ยอัตโนมัติ (APL)</option>
          </select>
        </div>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px;">
        ${inp('polSumAssured', 'ทุนประกันชีวิต', 'จำนวนเงิน', 'number')}
        ${inp('polPremium', 'เบี้ยประกัน/ปี', 'จำนวนเงิน', 'number')}
        ${inp('polTerm', 'ระยะเวลาคุ้มครอง (ปี)', 'เช่น 20', 'number')}
      </div>
      <div class="form-label" style="margin-top:12px; color:var(--aia-blue); font-weight:700;">สัญญาเพิ่มเติม (Riders)</div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        ${inp('polHealth', 'วงเงินสุขภาพเหมาจ่าย/ปี', 'เช่น 5,000,000', 'number')}
        ${inp('polRoom', 'ค่าห้อง/วัน', 'เช่น 4,000', 'number')}
        ${inp('polCI', 'ทุนโรคร้ายแรง (CI)', 'เช่น 1,000,000', 'number')}
        ${inp('polAccident', 'วงเงินอุบัติเหตุ (PA)', 'เช่น 500,000', 'number')}
        ${inp('polDaily', 'ชดเชยรายวัน', 'เช่น 3,000', 'number')}
        ${inp('polOPD', 'ค่ารักษา OPD/ครั้ง', 'เช่น 2,000', 'number')}
      </div>
      <div style="display:flex; gap:12px; margin-top:16px; justify-content:center;">
        <button type="button" onclick="addPolicy()" style="padding:10px 32px; background:var(--aia-blue); color:white; border:none; border-radius:12px; font-weight:700; cursor:pointer; font-size:0.95rem;">➕ เพิ่มกรมธรรม์</button>
      </div>
    </div>
    
    <div id="policyList" style="margin-top:20px;"></div>
  </div>
`));

// ===== SLIDE 15: POLICY DASHBOARD =====
container.appendChild(createSlide(15, `
  <div class="glass-card" style="max-width:1200px;">
    ${secHdr('15', 'POLICY DASHBOARD — สรุปกรมธรรม์')}
    <p class="slide-subtitle">ภาพรวมความคุ้มครองทั้งหมด (จัดกลุ่มตามประเภท ไม่ใช่ตามเล่ม)</p>
    <div id="policyDashboard" style="font-size:0.9rem;">
      <em style="color:var(--text-muted);">กรุณาเพิ่มกรมธรรม์ในหน้าก่อนหน้า</em>
    </div>
  </div>
`));

// ===== SLIDE 16: PROPOSED SOLUTION (FINAL) =====
container.appendChild(createSlide(16, `
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

// --- Family Mode Toggle ---
let currentFamilyMode = 'family';
function setFamilyMode(mode) {
  currentFamilyMode = mode;
  document.querySelectorAll('.family-mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
  const eduText = document.getElementById('savEduText');
  if (eduText) {
    eduText.textContent = mode === 'single' ? 'ดูแลพ่อแม่' : 'ค่าเทอมลูก';
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

// Education Calculation (Range-based)
function calcEducation() {
  const schYears = num('eduSchoolYears');
  const uniYears = num('eduUniYears');

  const schTierEl = document.querySelector('.tier-card-sch.selected');
  const uniTierEl = document.querySelector('.tier-card-uni.selected');

  const schMin = schTierEl ? parseInt(schTierEl.dataset.pricemin || schTierEl.dataset.price) : 0;
  const schMax = schTierEl ? parseInt(schTierEl.dataset.pricemax || schTierEl.dataset.price) : 0;
  const uniMin = uniTierEl ? parseInt(uniTierEl.dataset.pricemin || uniTierEl.dataset.price) : 0;
  const uniMax = uniTierEl ? parseInt(uniTierEl.dataset.pricemax || uniTierEl.dataset.price) : 0;

  const totalMin = (schYears * schMin) + (uniYears * uniMin);
  const totalMax = (schYears * schMax) + (uniYears * uniMax);

  const el = document.getElementById('eduCalcResult');
  if (totalMax > 0) {
    let html = 'รวมค่าเทอมลูกทั้งหมด: <span style="color:var(--aia-red); font-size:1.2rem;">' + fmt(totalMin) + ' - ' + fmt(totalMax) + ' บาท</span><br>';
    html += '<span style="font-size:0.82rem; font-weight:normal; color:var(--text-secondary);">';
    if (schYears > 0) html += 'ระดับโรงเรียน: ' + fmt(schYears * schMin) + ' - ' + fmt(schYears * schMax) + ' บาท (' + schYears + ' ปี)';
    if (schYears > 0 && uniYears > 0) html += ' | ';
    if (uniYears > 0) html += 'ระดับมหาวิทยาลัย: ' + fmt(uniYears * uniMin) + ' - ' + fmt(uniYears * uniMax) + ' บาท (' + uniYears + ' ปี)';
    html += '</span>';
    el.innerHTML = html;
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
  const tipIncome = document.getElementById('tipIncome');
  const tipRuleFinal = document.getElementById('incomeRuleFinal');

  if (inc > 0) {
    totalDisplay.textContent = 'รายได้รวมต่อเดือน: ' + fmt(inc) + ' บาท';
    if (tipIncome) tipIncome.innerHTML = '💡 เงินสำรองฉุกเฉิน 3-6 เดือน: <strong>' + fmt(inc * 3) + ' - ' + fmt(inc * 6) + '</strong> บาท';

    const budgetYear = (inc * 12) * 0.15;
    tipRuleFinal.innerHTML = 'รายได้รวมต่อปีโดยประมาณ: <strong>' + fmt(inc * 12) + '</strong> บาท<br>' +
      'เงินที่นำมาวางแผนประกันและคุ้มครอง (ไม่ควรเกิน 15%):<br>' +
      '👉 สูงสุดไม่เกิน <strong style="color:var(--aia-red); font-size:1.1rem;">' + fmt(budgetYear) + '</strong> บาท/ปี ' +
      '<span style="font-size:0.8rem;">(หรือ ' + fmt(budgetYear / 12) + ' บาท/เดือน)</span>';
  } else {
    totalDisplay.textContent = '';
    if (tipIncome) tipIncome.innerHTML = '💡 แผนที่ปลอดภัย: กรุณากรอกรายได้';
    tipRuleFinal.innerHTML = 'กรุณากรอกรายได้ในหน้า Protection & Income';
  }
}

// Tax Calculator
function computeTaxSummary() {
  const income = num('taxIncome');
  if (income <= 0) { document.getElementById('taxCalcOutput').innerHTML = '<em style="color:var(--text-muted);">กรอกรายได้เพื่อเริ่มคำนวณ</em>'; return; }

  // หักค่าใช้จ่ายเหมา 50% max 100,000
  const expense = Math.min(income * 0.5, 100000);
  const selfDeduct = 60000;

  // รวมค่าลดหย่อน
  const life = Math.min(num('taxLife'), 100000);
  const health = Math.min(num('taxHealth'), 25000);
  const parentH = Math.min(num('taxParentHealth'), 15000);
  const social = Math.min(num('taxSocial'), 9000);
  const rmf = Math.min(num('taxRMF'), 500000);
  const ssf = Math.min(num('taxSSF'), 200000);
  const pvd = Math.min(num('taxPVD'), 500000);
  const pension = Math.min(num('taxPension'), 200000);
  const retireTotal = Math.min(rmf + ssf + pvd + pension, 500000);
  const housing = Math.min(num('taxHousing'), 100000);
  const esg = Math.min(num('taxESG'), 300000);
  const donate = num('taxDonate');

  const totalDeductions = selfDeduct + life + health + parentH + social + retireTotal + housing + esg + donate;
  const netBefore = income - expense - selfDeduct;
  const taxBefore = calcTax(Math.max(netBefore, 0));

  const netAfter = income - expense - totalDeductions;
  const taxAfter = calcTax(Math.max(netAfter, 0));

  const saved = taxBefore - taxAfter;

  // Dividend Tax Credit
  let dividendCredit = 0;
  if (document.getElementById('taxDividendToggle')?.checked) {
    const div = num('taxDividend');
    dividendCredit = div * 0.1; // simplified 10% credit
  }

  const finalTax = Math.max(taxAfter - dividendCredit, 0);

  let html = '';
  html += '<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid rgba(0,0,0,0.06);">เงินได้รวม<strong>' + fmt(income) + '</strong></div>';
  html += '<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid rgba(0,0,0,0.06);">หักค่าใช้จ่าย<strong>-' + fmt(expense) + '</strong></div>';
  html += '<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid rgba(0,0,0,0.06);">หักค่าลดหย่อนรวม<strong>-' + fmt(totalDeductions) + '</strong></div>';
  html += '<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid rgba(0,0,0,0.06);">เงินได้สุทธิ<strong>' + fmt(Math.max(netAfter, 0)) + '</strong></div>';
  if (dividendCredit > 0) {
    html += '<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid rgba(0,0,0,0.06); color:#7c3aed;">เครดิตภาษีเงินปันผล<strong>-' + fmt(dividendCredit) + '</strong></div>';
  }
  html += '<div style="display:flex; justify-content:space-between; padding:12px 0; font-size:1.1rem; border-bottom:2px solid rgba(0,0,0,0.1);">ภาษีที่ต้องจ่าย<strong style="color:var(--aia-red);">' + fmt(finalTax) + ' บาท</strong></div>';

  if (saved > 0) {
    html += '<div style="margin-top:16px; padding:12px; background:rgba(34,197,94,0.08); border-radius:12px; text-align:center;">';
    html += '<div style="font-size:0.82rem; color:#107c41;">💰 ประหยัดภาษีได้</div>';
    html += '<div style="font-size:1.4rem; font-weight:800; color:#107c41;">' + fmt(saved) + ' บาท</div>';
    html += '<div style="font-size:0.78rem; color:var(--text-muted);">เทียบกับไม่ใช้ลดหย่อน (ภาษี ' + fmt(taxBefore) + ' บาท)</div>';
    html += '</div>';
  }

  document.getElementById('taxCalcOutput').innerHTML = html;
}

// Welfare Comparison table render
function computeWelfareCompare() {
  const el = document.getElementById('welfareCompareTable');
  if (!el) return;
  let html = '<table style="width:100%; border-collapse:collapse; font-size:0.82rem;">';
  html += '<thead><tr style="background:rgba(10,117,187,0.08);">';
  html += '<th style="padding:8px; text-align:left; border-bottom:2px solid rgba(0,0,0,0.1);">รายการ</th>';
  html += '<th style="padding:8px; text-align:center; border-bottom:2px solid rgba(0,0,0,0.1); color:#f59e0b;">🏥 บัตรทอง</th>';
  html += '<th style="padding:8px; text-align:center; border-bottom:2px solid rgba(0,0,0,0.1); color:#3b82f6;">🏢 ประกันสังคม</th>';
  html += '<th style="padding:8px; text-align:center; border-bottom:2px solid rgba(0,0,0,0.1); color:#10b981;">👮 ข้าราชการ</th>';
  html += '<th style="padding:8px; text-align:center; border-bottom:2px solid rgba(0,0,0,0.1); color:#d21145;">💎 ส่วนตัว</th>';
  html += '</tr></thead><tbody>';
  WELFARE_COMPARE.categories.forEach(c => {
    html += '<tr><td colspan="5" style="padding:8px; font-weight:700; background:rgba(0,0,0,0.02);">' + c.cat + '</td></tr>';
    c.items.forEach(i => {
      html += '<tr style="border-bottom:1px solid rgba(0,0,0,0.04);">';
      html += '<td style="padding:6px 8px;">' + i.name + '</td>';
      html += '<td style="padding:6px; text-align:center;">' + i.gold + '</td>';
      html += '<td style="padding:6px; text-align:center;">' + i.social + '</td>';
      html += '<td style="padding:6px; text-align:center;">' + i.gov + '</td>';
      html += '<td style="padding:6px; text-align:center; font-weight:600; color:#d21145;">' + i.private + '</td>';
      html += '</tr>';
    });
  });
  html += '</tbody></table>';
  el.innerHTML = html;
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
  if (idx === 9) { computeWelfare(); computeWelfareCompare(); }
  if (idx === 11) computeTaxSummary();
  if (idx === 14) computePolicyDashboard();
  if (idx === 16) computeSolution();
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
  const pInvAll = document.querySelector('[data-plan="inv_all"]')?.classList.contains('checked');
  const pSavCash = document.querySelector('[data-plan="sav_cash"]')?.classList.contains('checked');
  const pSavAsset = document.querySelector('[data-plan="sav_asset"]')?.classList.contains('checked');
  const pSavEdu = document.querySelector('[data-plan="sav_edu"]')?.classList.contains('checked');
  const pSavRetire = document.querySelector('[data-plan="sav_retire"]')?.classList.contains('checked');
  const pProIncome = document.querySelector('[data-plan="pro_income"]')?.classList.contains('checked');
  const pProSavings = document.querySelector('[data-plan="pro_savings"]')?.classList.contains('checked');
  const pTaxPlan = document.querySelector('[data-plan="tax_plan"]')?.classList.contains('checked');

  const cInv = pInvAll ? '✅' : '—';
  const cCash = pSavCash ? '✅' : '—';
  const cAsset = pSavAsset ? '✅' : '—';
  const cEdu = pSavEdu ? '✅' : '—';
  const cRetire = pSavRetire ? '✅' : '—';
  const cIncome = pProIncome ? '✅' : '—';
  const cSavings = pProSavings ? '✅' : '—';
  const cTax = pTaxPlan ? '✅' : '—';

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

  const eduLabel = currentFamilyMode === 'single' ? 'ดูแลพ่อแม่' : 'ค่าเทอมลูก';

  const planItems = (tierKey) => [
    ['<strong style="color:#d21145;">Investment ลงทุน/ต่อยอด</strong>', cInv],
    ['<strong style="color:#f9a825;">Saving ออมเพื่อเป้าหมาย</strong>', ''],
    ['&nbsp;&nbsp;• เงินสด', cCash],
    ['&nbsp;&nbsp;• บ้าน / รถ / ที่ดิน', cAsset],
    ['&nbsp;&nbsp;• ' + eduLabel, cEdu],
    ['&nbsp;&nbsp;• กองทุนเพื่อการเกษียณ', cRetire],
    ['<strong style="color:#107c41;">Protection ปกป้อง</strong>', ''],
    ['&nbsp;&nbsp;• ปกป้องรายได้ / เงินสำรองฉุกเฉิน', cIncome],
    ['&nbsp;&nbsp;• ปกป้องเงินออม', getHealthText(htier[tierKey], pProSavings)],
    ['<strong style="color:var(--text-secondary);">Tax Planning วางแผนภาษี</strong>', cTax],
  ];

  const plans = [
    { cls: 'plan-economy', label: 'ECONOMY CLASS', name: '✈️ ECONOMY CLASS (3 ปี)', recommended: false, items: planItems('eco') },
    { cls: 'plan-business', label: 'BUSINESS CLASS', name: '🌟 BUSINESS CLASS (5 ปี)', recommended: true, items: planItems('biz') },
    { cls: 'plan-first', label: 'FIRST CLASS', name: '👑 FIRST CLASS (7 ปี)', recommended: false, items: planItems('first') },
  ];

  document.getElementById('planGrid').innerHTML = plans.map(p => '<div class="plan-col ' + p.cls + ' ' + (p.recommended ? 'plan-recommended' : '') + '"><div class="plan-tier-name" style="font-size:1.15rem;">' + p.name + '</div>' + p.items.map(item => '<div class="plan-item" style="padding:6px 0; border:none;"><span class="plan-item-label">' + item[0] + '</span><span class="plan-item-value" style="text-align:right;">' + item[1] + '</span></div>').join('') + '</div>').join('');
}

// ============ POLICY MANAGEMENT ============
const policies = [];
const STATUS_LABELS = { active: 'ปกติ', paidup: 'ใช้เงินสำเร็จ', extended: 'ขยายเวลา', lapsed: 'ขาดต่อ', apl: 'กู้เบี้ยอัตโนมัติ' };

function addPolicy() {
  const p = {
    name: document.getElementById('polName')?.value || 'ไม่ระบุ',
    status: document.getElementById('polStatus')?.value || 'active',
    sumAssured: num('polSumAssured'), premium: num('polPremium'), term: num('polTerm'),
    health: num('polHealth'), room: num('polRoom'), ci: num('polCI'),
    accident: num('polAccident'), daily: num('polDaily'), opd: num('polOPD'),
  };
  policies.push(p);
  ['polName','polSumAssured','polPremium','polTerm','polHealth','polRoom','polCI','polAccident','polDaily','polOPD'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  renderPolicies();
}

function removePolicy(idx) { policies.splice(idx, 1); renderPolicies(); }

function renderPolicies() {
  const el = document.getElementById('policyList');
  if (!el) return;
  if (!policies.length) { el.innerHTML = ''; return; }
  let html = '<div class="form-label" style="font-weight:700; color:var(--aia-blue);">📋 กรมธรรม์ที่เพิ่มแล้ว (' + policies.length + ' เล่ม)</div>';
  policies.forEach((p, i) => {
    html += '<div style="background:rgba(255,255,255,0.7); border:1px solid rgba(0,0,0,0.06); border-radius:12px; padding:12px 16px; margin-bottom:8px; display:flex; align-items:center; gap:12px;">';
    html += '<div style="flex:1;"><strong>' + p.name + '</strong> <span style="font-size:0.78rem; background:rgba(10,117,187,0.1); padding:2px 8px; border-radius:6px;">' + STATUS_LABELS[p.status] + '</span>';
    html += '<div style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">ทุน ' + fmt(p.sumAssured) + ' | เบี้ย ' + fmt(p.premium) + '/ปี';
    if (p.health > 0) html += ' | สุขภาพ ' + fmt(p.health);
    if (p.ci > 0) html += ' | CI ' + fmt(p.ci);
    html += '</div></div>';
    html += '<button type="button" onclick="removePolicy(' + i + ')" style="background:rgba(210,17,69,0.1); color:var(--aia-red); border:none; border-radius:8px; padding:6px 12px; cursor:pointer; font-weight:600;">✕</button></div>';
  });
  el.innerHTML = html;
}

function computePolicyDashboard() {
  const el = document.getElementById('policyDashboard');
  if (!el) return;
  if (!policies.length) { el.innerHTML = '<em style="color:var(--text-muted);">ยังไม่มีกรมธรรม์ — กรุณาเพิ่มในหน้าก่อนหน้า</em>'; return; }

  const active = policies.filter(p => p.status !== 'lapsed');
  const totalLife = active.reduce((s, p) => s + p.sumAssured, 0);
  const totalPremium = active.reduce((s, p) => s + p.premium, 0);
  const maxHealth = Math.max(...active.map(p => p.health), 0);
  const maxRoom = Math.max(...active.map(p => p.room), 0);
  const totalCI = active.reduce((s, p) => s + p.ci, 0);
  const totalPA = active.reduce((s, p) => s + p.accident, 0);
  const maxDaily = Math.max(...active.map(p => p.daily), 0);
  const taxDeduct = Math.min(totalPremium, 100000);
  const inc = num('incomeMain');
  const idealLife = inc > 0 ? inc * 12 * 5 : 0;

  const card = (icon, label, val, sub, clr) =>
    '<div style="background:rgba(255,255,255,0.8); border:1px solid rgba(0,0,0,0.05); border-radius:16px; padding:16px; text-align:center;">' +
    '<div style="font-size:1.5rem;">' + icon + '</div><div style="font-size:0.78rem; color:var(--text-muted); margin:4px 0;">' + label + '</div>' +
    '<div style="font-size:1.2rem; font-weight:800; color:' + clr + ';">' + val + '</div>' +
    (sub ? '<div style="font-size:0.72rem; color:var(--text-muted); margin-top:2px;">' + sub + '</div>' : '') + '</div>';

  let html = '<div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:12px; margin-bottom:20px;">';
  html += card('🛡️', 'ทุนชีวิตรวม', fmt(totalLife) + ' บาท', active.length + ' กรมธรรม์', '#107c41');
  html += card('🏥', 'สุขภาพเหมาจ่าย', maxHealth > 0 ? fmt(maxHealth) + '/ปี' : '❌ ไม่มี', maxRoom > 0 ? 'ค่าห้อง ' + fmt(maxRoom) + '/วัน' : '', 'var(--aia-blue)');
  html += card('💊', 'โรคร้ายแรง (CI)', totalCI > 0 ? fmt(totalCI) + ' บาท' : '❌ ไม่มี', '', '#7c3aed');
  html += card('⚡', 'อุบัติเหตุ (PA)', totalPA > 0 ? fmt(totalPA) + ' บาท' : '❌ ไม่มี', maxDaily > 0 ? 'ชดเชย ' + fmt(maxDaily) + '/วัน' : '', '#f59e0b');
  html += '</div>';

  html += '<div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:20px;">';
  html += card('💰', 'เบี้ยรวม/ปี', fmt(totalPremium) + ' บาท', fmt(Math.round(totalPremium / 12)) + '/เดือน', 'var(--aia-red)');
  html += card('📋', 'สิทธิลดหย่อนภาษี', fmt(taxDeduct) + ' บาท', 'สูงสุด 100,000 บาท', '#107c41');
  html += '</div>';

  if (idealLife > 0) {
    const lifeGap = Math.max(idealLife - totalLife, 0);
    html += '<div style="background:linear-gradient(135deg, rgba(210,17,69,0.05), rgba(249,168,37,0.05)); border:1px solid rgba(210,17,69,0.1); border-radius:16px; padding:20px;">';
    html += '<div style="font-weight:700; margin-bottom:12px; color:var(--aia-red);">📊 Gap Analysis</div>';
    html += '<div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; text-align:center;">';
    html += '<div><div style="font-size:0.78rem; color:var(--text-muted);">ทุนชีวิตที่มี</div><div style="font-size:1.1rem; font-weight:700; color:#107c41;">' + fmt(totalLife) + '</div></div>';
    html += '<div><div style="font-size:0.78rem; color:var(--text-muted);">ที่ควรมี (5x รายได้/ปี)</div><div style="font-size:1.1rem; font-weight:700; color:var(--aia-blue);">' + fmt(idealLife) + '</div></div>';
    html += '<div><div style="font-size:0.78rem; color:var(--text-muted);">ส่วนที่ขาด</div><div style="font-size:1.1rem; font-weight:700; color:' + (lifeGap > 0 ? 'var(--aia-red)' : '#107c41') + ';">' + (lifeGap > 0 ? fmt(lifeGap) : '✅ เพียงพอ') + '</div></div>';
    html += '</div></div>';
  }

  // Policy table
  html += '<div style="margin-top:20px;"><div class="form-label" style="font-weight:700;">📋 รายละเอียด</div>';
  html += '<table style="width:100%; border-collapse:collapse; font-size:0.82rem;"><thead><tr style="background:rgba(10,117,187,0.06);">';
  html += '<th style="padding:8px; text-align:left;">กรมธรรม์</th><th style="padding:8px;">สถานะ</th><th style="padding:8px; text-align:right;">ทุน</th><th style="padding:8px; text-align:right;">สุขภาพ</th><th style="padding:8px; text-align:right;">CI</th><th style="padding:8px; text-align:right;">เบี้ย/ปี</th>';
  html += '</tr></thead><tbody>';
  policies.forEach(p => {
    const sc = p.status === 'active' ? '#107c41' : p.status === 'lapsed' ? '#ef4444' : '#f59e0b';
    html += '<tr style="border-bottom:1px solid rgba(0,0,0,0.04);"><td style="padding:6px 8px;">' + p.name + '</td><td style="padding:6px; text-align:center;"><span style="color:' + sc + '; font-weight:600;">' + STATUS_LABELS[p.status] + '</span></td><td style="padding:6px; text-align:right;">' + fmt(p.sumAssured) + '</td><td style="padding:6px; text-align:right;">' + (p.health > 0 ? fmt(p.health) : '—') + '</td><td style="padding:6px; text-align:right;">' + (p.ci > 0 ? fmt(p.ci) : '—') + '</td><td style="padding:6px; text-align:right;">' + fmt(p.premium) + '</td></tr>';
  });
  html += '</tbody></table></div>';
  el.innerHTML = html;
}

// Google Sheets Submit
async function submitToGoogleSheets() {
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxwi7oBKjXpANoce4LlRi_wrqXyFEJ2a4xIM7bC1FnsY7V6Vwe5dHQS9L42keeuGc2AcA/exec";
  const statusEl = document.getElementById('submitStatus');

  statusEl.textContent = 'กำลังส่งข้อมูล... ⏳';
  statusEl.style.color = 'var(--aia-blue)';
  document.getElementById('btnSubmitData').disabled = true;

  const payload = {
    timestamp: new Date().toLocaleString('th-TH'),
    clientName: document.getElementById('clientName')?.value || '',
    clientAge: num('clientAge'),
    familyMode: currentFamilyMode,
    incomeMain: num('incomeMain'),
    plan_inv: !!document.querySelector('[data-plan="inv_all"]')?.classList.contains('checked'),
    plan_cash: !!document.querySelector('[data-plan="sav_cash"]')?.classList.contains('checked'),
    plan_asset: !!document.querySelector('[data-plan="sav_asset"]')?.classList.contains('checked'),
    plan_edu: !!document.querySelector('[data-plan="sav_edu"]')?.classList.contains('checked'),
    plan_retire: !!document.querySelector('[data-plan="sav_retire"]')?.classList.contains('checked'),
    plan_income: !!document.querySelector('[data-plan="pro_income"]')?.classList.contains('checked'),
    plan_savings: !!document.querySelector('[data-plan="pro_savings"]')?.classList.contains('checked'),
    plan_tax: !!document.querySelector('[data-plan="tax_plan"]')?.classList.contains('checked'),
    protIncome: num('protIncome'),
    protSavings: num('protSavings'),
    eduSchoolYears: num('eduSchoolYears'),
    eduUniYears: num('eduUniYears'),
    eduSchoolTier: document.querySelector('.tier-card-sch.selected')?.dataset.tier || '',
    eduUniTier: document.querySelector('.tier-card-uni.selected')?.dataset.tier || '',
    retireAge: num('retireAge'),
    retireMonthly: num('retireMonthly'),
    investTotal: num('investTotal'),
    welfare: document.querySelector('#welfareCards input[type="radio"]:checked')?.value || '',
    hospitalTier: document.querySelector('.tier-card-hosp.selected')?.dataset.tier || '',
    healthPlan: document.querySelector('.tier-card-plan.selected')?.dataset.planId || '',
    taxIncome: num('taxIncome'),
    taxLife: num('taxLife'),
    taxHealth: num('taxHealth'),
    taxRMF: num('taxRMF'),
    taxSSF: num('taxSSF'),
    taxPVD: num('taxPVD'),
    riskLife: num('riskLife'),
    riskCI: num('riskCI'),
    riskHealth: num('riskHealth'),
    riskAccident: num('riskAccident'),
    policiesCount: policies.length,
    policiesData: JSON.stringify(policies),
  };

  try {
    await fetch(SCRIPT_URL, { method: 'POST', body: JSON.stringify(payload), mode: 'no-cors', headers: { 'Content-Type': 'application/json' } });
    statusEl.textContent = '✅ บันทึกข้อมูลเรียบร้อย!';
    statusEl.style.color = 'green';
  } catch (err) {
    statusEl.textContent = '❌ เกิดข้อผิดพลาด: ' + err.message;
    statusEl.style.color = 'red';
  } finally {
    document.getElementById('btnSubmitData').disabled = false;
  }
}

// Init
goToSlide(0);

// Tax real-time calc
['taxIncome','taxLife','taxHealth','taxParentHealth','taxSocial','taxRMF','taxSSF','taxPVD','taxPension','taxHousing','taxESG','taxDonate','taxDividend'].forEach(id => {
  document.getElementById(id)?.addEventListener('input', computeTaxSummary);
});
