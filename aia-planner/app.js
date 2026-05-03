// ============ APP — RENDER ALL SLIDES ============

const container = document.getElementById('slidesContainer');

function formatNumberInput(el) {
  let val = el.value.replace(/,/g, '').replace(/[^\d.-]/g, '');
  if (val !== '') {
    el.value = parseInt(val, 10).toLocaleString('en-US');
  }
}

// override inp function with number formatting support
function inp(id, label, ph, type = 'text', p = '', oninp = '') {
  let handler = '';
  if (type === 'number' && oninp) {
    handler = `oninput="formatNumberInput(this); ${oninp}"`;
  } else if (type === 'number') {
    handler = 'oninput="formatNumberInput(this)"';
  } else if (oninp) {
    handler = `oninput="${oninp}"`;
  }
  const actualType = type === 'number' ? 'text' : type;
  const inputMode = type === 'number' ? 'inputmode="numeric"' : '';
  return `<div class="form-group"><label class="form-label" for="${id}">${label} ${p ? pri(p) : ''}</label><input class="form-input" type="${actualType}" ${inputMode} id="${id}" placeholder="${ph}" autocomplete="off" ${handler}></div>`;
}

// Global functions to sync data
function syncProfile() {
  const age = num('clientAge') || 35;
  const inc = num('incomeMain') || 0;

  // Auto fill Tax 40(1)
  const tax401 = document.getElementById('tax401');
  if (tax401 && tax401.value === '') {
    tax401.value = fmt(inc * 12);
  }

  if (typeof computeTaxSummary === 'function') computeTaxSummary();
  if (typeof computeRetirement === 'function') computeRetirement();
  if (typeof computeAgentSummary === 'function') computeAgentSummary();
  if (typeof calcCustomPremium === 'function') calcCustomPremium();
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

// ===== SLIDE 1: PERSONAL PROFILE & INCOME =====
container.appendChild(createSlide(1, `
  <div class="glass-card">
    ${secHdr('1', 'PERSONAL PROFILE')}
    <p class="slide-subtitle">ข้อมูลส่วนตัวและสถานะครอบครัว</p>
    
    <div class="form-row">
      ${inp('clientName', 'ชื่อ-นามสกุล', 'กรอกชื่อลูกค้า', 'text', 'must')}
      ${inp('clientAge', 'อายุ (ปี)', 'เช่น 35', 'number', 'must', 'syncProfile()')}
    </div>
    
    <div class="form-label" style="margin-top:8px;">เพศ ${pri('must')}</div>
    <div class="select-cards select-cards-h" style="margin-bottom:16px;">
      ${selCard('gender', 'male', '👨', 'ชาย', '', true)}
      ${selCard('gender', 'female', '👩', 'หญิง', '')}
    </div>

    <div class="form-label">สถานะครอบครัว ${pri('must')}</div>
    <div class="select-cards select-cards-h" id="familyCards">
      ${selCard('family', 'children', '👨‍👩‍👧', 'คนมีครอบครัว/บุตร', '', true)}
      ${selCard('family', 'single', '👤', 'คนยังไม่แต่งงาน/โสด', '')}
    </div>
    
    <div class="child-fields form-group" style="margin-top:16px;" id="childFields">
      ${inp('childCount', 'จำนวนบุตร (อายุไม่เกิน 23 ปี)', 'เช่น 2', 'number', 'must', 'syncProfile()')}
    </div>

    <div style="background:rgba(255,255,255,0.5); padding:16px; border-radius:12px; margin-top:24px; border:1px solid rgba(0,0,0,0.05);">
      <div class="form-label" style="font-weight:700; color:var(--aia-blue);">รายได้หลักของคุณ</div>
      ${inp('incomeMain', 'รายได้หลัก/เดือน (บาท)', 'เช่น 50,000', 'number', 'must', 'syncProfile()')}
    </div>
  </div>
`));

// ===== SLIDE 2: ASSET & LIABILITIES =====
container.appendChild(createSlide(2, `
  <div class="glass-card">
    ${secHdr('2', 'แผนปกป้องทรัพย์สิน (Asset & Liabilities)')}
    <p class="slide-subtitle">ประเมินมูลค่าทรัพย์สินและหนี้สินที่ต้องเตรียมแผนปกป้อง</p>
    
    <div id="assetList" style="display:flex; flex-direction:column; gap:12px; margin-bottom:16px;">
      <div style="display:flex; gap:12px; align-items:center;">
        <input type="text" class="form-input" style="flex:2;" value="บ้าน / ที่อยู่อาศัย">
        <input type="text" class="form-input asset-val" style="flex:2;" placeholder="มูลค่า (บาท)" oninput="formatNumberInput(this); calcAssets()">
        <label class="form-input" style="flex:1; display:flex; align-items:center; gap:6px;"><input type="radio" name="ast1" class="asset-type" value="asset" onchange="calcAssets()"> ทรัพย์สิน</label>
        <label class="form-input" style="flex:1; display:flex; align-items:center; gap:6px;"><input type="radio" name="ast1" class="asset-type" value="liability" checked onchange="calcAssets()"> หหนี้สิน</label>
      </div>
      <div style="display:flex; gap:12px; align-items:center;">
        <input type="text" class="form-input" style="flex:2;" value="คอนโด">
        <input type="text" class="form-input asset-val" style="flex:2;" placeholder="มูลค่า (บาท)" oninput="formatNumberInput(this); calcAssets()">
        <label class="form-input" style="flex:1; display:flex; align-items:center; gap:6px;"><input type="radio" name="ast2" class="asset-type" value="asset" onchange="calcAssets()"> ทรัพย์สิน</label>
        <label class="form-input" style="flex:1; display:flex; align-items:center; gap:6px;"><input type="radio" name="ast2" class="asset-type" value="liability" checked onchange="calcAssets()"> หนี้สิน</label>
      </div>
      <div style="display:flex; gap:12px; align-items:center;">
        <input type="text" class="form-input" style="flex:2;" value="รถยนต์">
        <input type="text" class="form-input asset-val" style="flex:2;" placeholder="มูลค่า (บาท)" oninput="formatNumberInput(this); calcAssets()">
        <label class="form-input" style="flex:1; display:flex; align-items:center; gap:6px;"><input type="radio" name="ast3" class="asset-type" value="asset" onchange="calcAssets()"> ทรัพย์สิน</label>
        <label class="form-input" style="flex:1; display:flex; align-items:center; gap:6px;"><input type="radio" name="ast3" class="asset-type" value="liability" checked onchange="calcAssets()"> หนี้สิน</label>
      </div>
      <div style="display:flex; gap:12px; align-items:center;">
        <input type="text" class="form-input" style="flex:2;" value="หุ้น / กองทุน">
        <input type="text" class="form-input asset-val" style="flex:2;" placeholder="มูลค่า (บาท)" oninput="formatNumberInput(this); calcAssets()">
        <label class="form-input" style="flex:1; display:flex; align-items:center; gap:6px;"><input type="radio" name="ast4" class="asset-type" value="asset" checked onchange="calcAssets()"> ทรัพย์สิน</label>
        <label class="form-input" style="flex:1; display:flex; align-items:center; gap:6px;"><input type="radio" name="ast4" class="asset-type" value="liability" onchange="calcAssets()"> หนี้สิน</label>
      </div>
    </div>
    
    <button type="button" onclick="addAssetRow()" style="padding:8px 16px; background:var(--glass-bg); border:1px solid var(--aia-blue); color:var(--aia-blue); border-radius:8px; cursor:pointer; font-size:0.9rem;">+ เพิ่มรายการ</button>

    <div class="gap-section" style="margin-top:24px; background:rgba(234,179,8,0.1); border-color:rgba(234,179,8,0.3);">
      <h3 style="color:#b8860b;">📊 สรุปความเสี่ยงที่ต้องปกป้อง (Asset Protection)</h3>
      <div style="display:flex; justify-content:space-between; margin-top:8px; font-size:1.1rem;">
        <span>รวมทรัพย์สิน: <strong id="totalAsset" style="color:var(--aia-blue);">0</strong></span>
        <span>รวมหนี้สิน: <strong id="totalLiability" style="color:var(--aia-red);">0</strong></span>
      </div>
      <div style="margin-top:8px; font-size:0.9rem; color:var(--text-secondary);">*ยอดหนี้สินรวม คือ ทุนประกันชีวิตที่ควรมีเพื่อปกป้องครอบครัวไม่ให้รับภาระหนี้ต่อ</div>
    </div>
  </div>
`));

// ===== SLIDE 3: RETIREMENT =====
container.appendChild(createSlide(3, `
  <div class="glass-card">
    ${secHdr('3', 'RETIREMENT (เกษียณอายุ)')}
    <p class="slide-subtitle">การวางแผนระยะยาว พร้อมคำนวณอัตราเงินเฟ้อ (Future Value)</p>
    <div class="form-row">
      ${inp('retireAge', 'อายุที่คาดว่าจะเกษียณ', 'เช่น 60', 'number', 'should', 'computeRetirement()')}
      ${inp('retireLifeExp', 'อายุขัย (ปี)', 'เช่น 85', 'number', 'opt', 'computeRetirement()')}
    </div>
    ${inp('retireMonthly', 'เป้าหมายค่าใช้จ่ายต่อเดือน ณ วันนี้', 'เช่น 30,000', 'number', 'should', 'computeRetirement()')}
    
    <div class="form-label" style="margin-top:16px;">อัตราเงินเฟ้อที่คาดการณ์</div>
    <div style="display:flex; gap:12px; margin-bottom:16px;">
      <button type="button" class="inflation-btn active" data-rate="3" onclick="setInflation(this, 3)" style="flex:1; padding:12px; border-radius:12px; border:1px solid var(--aia-red); background:rgba(210,17,69,0.1); cursor:pointer; font-weight:700; color:var(--aia-red);">3% (อ้างอิงความจริง)</button>
      <button type="button" class="inflation-btn" data-rate="4" onclick="setInflation(this, 4)" style="flex:1; padding:12px; border-radius:12px; border:1px solid #ccc; background:#fff; cursor:pointer; font-weight:600;">4%</button>
      <button type="button" class="inflation-btn" data-rate="5" onclick="setInflation(this, 5)" style="flex:1; padding:12px; border-radius:12px; border:1px solid #ccc; background:#fff; cursor:pointer; font-weight:600;">5%</button>
    </div>
    <input type="hidden" id="inflationRate" value="3">

    <div id="retireCalc" style="margin-top:8px;"></div>
  </div>
`));

// ===== SLIDE 4: EDUCATION SELECTION =====
container.appendChild(createSlide(4, `
  <div class="glass-card">
    ${secHdr('4', 'แผนปกป้องใบปริญญา (Education Selection)')}
    <p class="slide-subtitle">ระดับการศึกษาที่ต้องการวางแผนให้บุตร (ข้ามได้หากไม่มีบุตร)</p>
    
    <div class="form-label" style="color:var(--aia-blue); margin-top:8px;">🏫 ระดับโรงเรียน</div>
    <div class="form-row" style="margin-bottom:8px;">
      ${inp('eduSchoolYears', 'จำนวนปีที่ต้องเรียน (รวมลูกทุกคน)', 'เช่น 12', 'number', '', 'calcEducation()')}
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
      ${inp('eduUniYears', 'จำนวนปีที่ต้องเรียน (รวมลูกทุกคน)', 'เช่น 4', 'number', '', 'calcEducation()')}
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
      <h3 style="color:var(--aia-blue);">💡 สรุปทุนการศึกษาที่ต้องเตรียม (Degree Protection)</h3>
      <div id="eduCalcResult" style="font-size:1.1rem; color:var(--text-primary); font-weight:700;">
        กรุณากรอกจำนวนปีเพื่อคำนวณ
      </div>
    </div>
  </div>
`));

// ===== SLIDE 5: FINANCIAL PLANS (PYRAMID) =====
container.appendChild(createSlide(5, `
  <div class="glass-card" style="width:100%; max-width:1200px; padding:32px;">
    <div style="text-align:center; margin-bottom:24px;">
      <div class="browser-badge" style="display:inline-flex; background:var(--aia-blue);"><span class="browser-badge-num" style="color:var(--aia-blue);">5</span> Financial Plans - สารบัญการวางแผน</div>
    </div>
    
    <div class="family-mode-toggle">
      <button type="button" class="family-mode-btn active" data-mode="family" onclick="setFamilyMode('family')">👨‍👩‍👧 คนมีครอบครัว/บุตร</button>
      <button type="button" class="family-mode-btn" data-mode="single" onclick="setFamilyMode('single')">👤 คนยังไม่แต่งงาน/โสด</button>
    </div>
    
    <div class="pyramid-container">
      <div class="pyramid-stack-wrapper">
        <div class="pyramid-tax-arrow" onclick="goToSlide(9)" style="cursor:pointer;">
          <div class="tax-arrow-line"></div>
          <div class="tax-arrow-head-top"></div>
          <div class="tax-arrow-label" style="background:rgba(210,17,69,0.1); border-color:rgba(210,17,69,0.3);">
            <div class="tax-heading">Tax Planning</div>
            <div class="tax-sub">วางแผนภาษี</div>
          </div>
          <div class="tax-arrow-head-bottom"></div>
        </div>
        <div class="pyramid-stack">
          <div class="pyramid-cap"></div>
          <div class="pyramid-layer layer-a">
            <div class="pyramid-heading">Investment</div>
            <div class="pyramid-sub">ลงทุน</div>
          </div>
          <div class="pyramid-layer layer-b" onclick="goToSlide(3)" style="cursor:pointer;">
            <div class="pyramid-heading">Saving</div>
            <div class="pyramid-sub">ออมเงินเพื่อเป้าหมาย (เกษียณ)</div>
          </div>
          <div class="pyramid-layer layer-c">
            <div class="pyramid-heading">Protection</div>
            <div class="pyramid-sub">ปกป้องเงินออม / ทรัพย์สิน</div>
          </div>
        </div>
      </div>
      
      <div class="pyramid-details">
        <div class="detail-group">
          <div class="detail-group-badge" style="background:#d21145;">3 แผนปกป้องหลัก (คลิกเพื่อข้ามไปหน้าแผน)</div>
          <div class="detail-box" onclick="goToSlide(8)">
            <div class="detail-text">แผนปกป้องเงินออม (สุขภาพ / ค่ารักษา)</div>
            <div style="font-size:1.2rem;">➡️</div>
          </div>
          <div class="detail-box" onclick="goToSlide(2)">
            <div class="detail-text">แผนปกป้องทรัพย์สิน (จัดการหนี้สินมรดก)</div>
            <div style="font-size:1.2rem;">➡️</div>
          </div>
          <div class="detail-box" onclick="goToSlide(4)" id="savEduBox">
            <div class="detail-text" id="savEduText">แผนปกป้องใบปริญญา (ทุนการศึกษา)</div>
            <div style="font-size:1.2rem;">➡️</div>
          </div>
        </div>
        
        <div class="detail-group">
          <div class="detail-group-badge" style="background:#f9a825;">แผนระยะยาว & ภาษี</div>
          <div class="detail-box" onclick="goToSlide(3)">
            <div class="detail-text">แผนเกษียณอายุ (Retirement)</div>
            <div style="font-size:1.2rem;">➡️</div>
          </div>
          <div class="detail-box" onclick="goToSlide(9)">
            <div class="detail-text">แผนภาษี (Tax Planning)</div>
            <div style="font-size:1.2rem;">➡️</div>
          </div>
        </div>
      </div>
    </div>
  </div>
`));

// ===== SLIDE 6: WELFARE SELECTION =====
container.appendChild(createSlide(6, `
  <div class="glass-card">
    ${secHdr('6', 'WELFARE Selection')}
    <p class="slide-subtitle">สวัสดิการพื้นฐานของลูกค้า</p>
    <div class="select-cards" id="welfareCards">
      ${selCard('welfare', 'social33', '🔵', 'ประกันสังคม', 'สวัสดิการพนักงานเอกชน', true)}
      ${selCard('welfare', 'gov', '💼', 'ข้าราชการ', 'สวัสดิการกรมบัญชีกลาง', false)}
      ${selCard('welfare', 'gold', '💳', 'บัตรทอง', 'หลักประกันสุขภาพถ้วนหน้า', false)}
    </div>
  </div>
`));

// ===== SLIDE 7: WELFARE COMPARISON =====
container.appendChild(createSlide(7, `
  <div class="glass-card" id="welfareResult" style="max-width:1100px;">
    ${secHdr('7', 'เปรียบเทียบสิทธิรักษาพยาบาล')}
    <p class="slide-subtitle" id="welfareSub">สวัสดิการของลูกค้า vs สวัสดิการส่วนตัว</p>
    <div id="welfareCompareTable" style="overflow-x:auto; margin-top:16px;"></div>
  </div>
`));

// ===== SLIDE 8: HOSPITAL & PLAN SELECTION =====
container.appendChild(createSlide(8, `
  <div class="glass-card" style="max-width:1100px;">
    ${secHdr('8', 'แผนปกป้องเงินออม (Health Plan)')}
    <p class="slide-subtitle">เลือกระดับโรงพยาบาลและแผนประกันสุขภาพ</p>
    
    <div class="form-label" style="color:var(--aia-blue); font-weight:700; margin-bottom:8px;">🏥 ระดับโรงพยาบาลที่ใช้บริการบ่อยที่สุด</div>
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
          <div style="font-weight:700; font-size:1.1rem; margin:4px 0;">${p.name}</div>
          <div style="font-size:0.85rem; color:var(--aia-blue); margin-bottom:8px;">${p.note}</div>
          <div style="font-size:0.85rem; color:var(--text-secondary); text-align:left; background:rgba(0,0,0,0.03); padding:8px; border-radius:8px;">
            <div style="margin-bottom:4px;">🏥 ค่าห้อง: <strong>${p.room}</strong>/วัน</div>
            <div style="margin-bottom:4px;">🩸 CI: ${p.ci}</div>
            <div>💊 OPD: ${p.opd}</div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
`));

// ===== SLIDE 9: TAX CALCULATOR =====
container.appendChild(createSlide(9, `
  <div class="glass-card" style="max-width:1100px;">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
      ${secHdr('9', 'TAX PLANNING — วางแผนภาษีเงินได้')}
      <button onclick="showTaxDocs()" class="btn-export" style="background:#f9a825; font-size:0.85rem; padding:8px 16px;">📋 เอกสารที่ต้องใช้</button>
    </div>
    
    <div class="tax-tabs" style="display:flex; gap:10px; margin-bottom:20px; border-bottom:1px solid rgba(0,0,0,0.05); padding-bottom:10px;">
      <button class="tax-tab-btn active" onclick="switchTaxTab(this, 'taxIncome')">💰 รายได้ 40(1)-40(8)</button>
      <button class="tax-tab-btn" onclick="switchTaxTab(this, 'taxDeduct')">📉 ค่าลดหย่อน</button>
      <button class="tax-tab-btn" onclick="switchTaxTab(this, 'taxSummary')">📊 สรุปภาษี</button>
    </div>

    <div id="taxIncome" class="tax-content active">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
        <div>
          <div class="form-label" style="color:var(--aia-blue);">กลุ่ม 1: รายได้จากแรงงาน (หักเหมารวมกัน 50% สูงสุด 100k)</div>
          ${inp('tax401', '40(1) เงินเดือน/โบนัส/ค่าล่วงเวลา', '', 'number', '', 'computeTaxSummary()')}
          <div style="font-size:0.78rem; color:var(--text-muted); margin:-10px 0 10px 4px;">อาชีพ: พนักงานบริษัท, ข้าราชการ, ทหาร/ตำรวจ, พนักงานรัฐวิสาหกิจ, ลูกจ้างประจำ</div>
          ${inp('tax402', '40(2) ค่าคอมมิชชัน/รับจ้างอิสระ/นายหน้า', '', 'number', '', 'computeTaxSummary()')}
          <div style="font-size:0.78rem; color:var(--text-muted); margin:-10px 0 10px 4px;">อาชีพ: ตัวแทนประกัน, นายหน้าอสังหาฯ, พนักงานขาย, ไรเดอร์, ฟรีแลนซ์</div>
          
          <div class="form-label" style="color:var(--aia-blue); margin-top:16px;">กลุ่ม 2: ทรัพย์สินทางปัญญา & การลงทุน</div>
          ${inp('tax403', '40(3) ค่าลิขสิทธิ์/สิทธิบัตร (หักเหมา 50% ไม่เกิน 100k)', '', 'number', '', 'computeTaxSummary()')}
          <div style="font-size:0.78rem; color:var(--text-muted); margin:-10px 0 10px 4px;">อาชีพ: นักเขียน, นักแต่งเพลง, ผู้ถือสิทธิบัตร, โปรแกรมเมอร์ขายซอฟต์แวร์</div>
          ${inp('tax404', '40(4) เงินปันผล/ดอกเบี้ย/คริปโท (หักไม่ได้)', '', 'number', '', 'computeTaxSummary()')}
          <div style="font-size:0.78rem; color:var(--text-muted); margin:-10px 0 10px 4px;">แหล่ง: เงินปันผลหุ้น, ดอกเบี้ยเงินฝาก, กำไรจากคริปโท, ผลตอบแทนกองทุน</div>
        </div>
        <div>
          <div class="form-label" style="color:var(--aia-blue);">กลุ่ม 3: อสังหาฯ & วิชาชีพ</div>
          ${inp('tax405', '40(5) ค่าเช่า (หักเหมา 10-30%)', '', 'number', '', 'computeTaxSummary()')}
          <div style="font-size:0.78rem; color:var(--text-muted); margin:-10px 0 10px 4px;">อาชีพ: เจ้าของคอนโดปล่อยเช่า, ให้เช่ารถยนต์/เครื่องจักร, เจ้าของที่ดิน</div>
          ${inp('tax406', '40(6) วิชาชีพอิสระ (หมอ 60%, อื่น 30%)', '', 'number', '', 'computeTaxSummary()')}
          <div style="font-size:0.78rem; color:var(--text-muted); margin:-10px 0 10px 4px;">อาชีพ: แพทย์, ทันตแพทย์, วิศวกร, สถาปนิก, ทนายความ, นักบัญชี</div>
          
          <div class="form-label" style="color:var(--aia-blue); margin-top:16px;">กลุ่ม 4: รับเหมา & ธุรกิจ (หักเหมา 60%)</div>
          ${inp('tax407', '40(7) รับเหมาก่อสร้าง', '', 'number', '', 'computeTaxSummary()')}
          <div style="font-size:0.78rem; color:var(--text-muted); margin:-10px 0 10px 4px;">อาชีพ: ผู้รับเหมาก่อสร้าง, ซ่อมบ้าน, ตกแต่งภายใน, ผู้รับเหมาไฟฟ้า/ประปา</div>
          ${inp('tax408', '40(8) ธุรกิจอื่นๆ/ขายของออนไลน์', '', 'number', '', 'computeTaxSummary()')}
          <div style="font-size:0.78rem; color:var(--text-muted); margin:-10px 0 10px 4px;">อาชีพ: ขายของออนไลน์, ยูทูปเบอร์, ดารา, ร้านอาหาร, ติวเตอร์, อินฟลูเอนเซอร์</div>
        </div>
      </div>
    </div>

    <div id="taxDeduct" class="tax-content" style="display:none;">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
        <div>
          <div class="form-label" style="color:#107c41;">👪 ครอบครัว</div>
          <div style="background:rgba(0,0,0,0.02); padding:12px; border-radius:10px; margin-bottom:10px;">
            <label style="display:flex; align-items:center; gap:10px; cursor:pointer; font-weight:600;"><input type="checkbox" id="taxHasChild1" onchange="computeTaxSummary()" style="width:20px; height:20px; accent-color:#107c41;"> มีบุตรคนที่ 1 (ลดหย่อน 30,000)</label>
            <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px; padding-left:30px;">* บุตรอายุไม่เกิน 20 ปี หรือศึกษาอยู่ไม่เกิน 25 ปี</div>
          </div>
          <div style="background:rgba(0,0,0,0.02); padding:12px; border-radius:10px; margin-bottom:10px;">
            <label style="display:flex; align-items:center; gap:10px; cursor:pointer; font-weight:600;"><input type="checkbox" id="taxHasChild2" onchange="computeTaxSummary()" style="width:20px; height:20px; accent-color:#107c41;"> มีบุตรคนที่ 2 เป็นต้นไป</label>
            <div style="font-size:0.75rem; color:var(--text-muted); padding-left:30px; margin-top:4px;"><strong style="color:var(--aia-red);">60,000/คน</strong> เกิดตั้งแต่ปี พ.ศ. 2561 (อายุไม่เกิน 8 ปี) | <strong>30,000/คน</strong> เกิดก่อน 2561</div>
            <div style="display:flex; gap:8px; margin-top:8px; padding-left:30px;">
              <input class="form-input" type="text" inputmode="numeric" id="taxChild2New" placeholder="จำนวนคน (เกิดปี 2561+)" style="flex:1;" oninput="formatNumberInput(this); computeTaxSummary()">
              <input class="form-input" type="text" inputmode="numeric" id="taxChild2Old" placeholder="จำนวนคน (เกิดก่อน 2561)" style="flex:1;" oninput="formatNumberInput(this); computeTaxSummary()">
            </div>
          </div>
          <div style="background:rgba(0,0,0,0.02); padding:12px; border-radius:10px; margin-bottom:10px;">
            <label style="display:flex; align-items:center; gap:10px; cursor:pointer; font-weight:600;"><input type="checkbox" id="taxHasParent" onchange="computeTaxSummary()" style="width:20px; height:20px; accent-color:#107c41;"> อุปการะบิดามารดา (30,000/คน)</label>
            <div style="font-size:0.75rem; color:var(--text-muted); padding-left:30px; margin-top:4px;">อายุ 60+, รายได้ไม่เกิน 30,000/ปี, ลดหย่อนได้คนละ 1 สิทธิ์</div>
            <div style="display:flex; gap:12px; margin-top:8px; padding-left:30px;">
              <label style="display:flex; align-items:center; gap:6px; cursor:pointer;"><input type="checkbox" id="taxParentFather" onchange="computeTaxSummary()" style="accent-color:#107c41;"> บิดา</label>
              <label style="display:flex; align-items:center; gap:6px; cursor:pointer;"><input type="checkbox" id="taxParentMother" onchange="computeTaxSummary()" style="accent-color:#107c41;"> มารดา</label>
            </div>
            <div style="font-size:0.72rem; color:var(--aia-red); margin-top:4px; padding-left:30px;">📌 ใช้เอกสาร ลย.03 (หนังสือรับรองการหักลดหย่อนค่าอุปการะเลี้ยงดูบิดามารดา)</div>
          </div>
          <div class="form-label" style="color:#7c3aed; margin-top:12px;">🏥 ประกัน & ประกันสังคม</div>
          ${inp('taxSocial', 'ประกันสังคม (สูงสุด 9,000)', '', 'number', '', 'computeTaxSummary()')}
          ${inp('taxLife', 'ประกันชีวิต/สะสมทรัพย์ (สูงสุด 100,000)', '', 'number', '', 'computeTaxSummary()')}
          ${inp('taxHealth', 'ประกันสุขภาพ (สูงสุด 25,000)', 'รวมข้อบนไม่เกิน 100k', 'number', '', 'computeTaxSummary()')}
        </div>
        <div>
          <div class="form-label" style="color:#b8860b;">💰 ลงทุน & เกษียณ (รวมกันไม่เกิน 5 แสน)</div>
          ${inp('taxPension', 'ประกันบำนาญ (15% ของรายได้ ไม่เกิน 200k)', '', 'number', '', 'computeTaxSummary()')}
          ${inp('taxProvident', 'กองทุนสำรองเลี้ยงชีพ/กบข.', '', 'number', '', 'computeTaxSummary()')}
          ${inp('taxSSF', 'SSF (30% ของรายได้ ไม่เกิน 200k)', '', 'number', '', 'computeTaxSummary()')}
          ${inp('taxRMF', 'RMF (30% ของรายได้ ไม่เกิน 500k)', '', 'number', '', 'computeTaxSummary()')}
          <div style="background:rgba(16,124,65,0.05); padding:14px; border-radius:12px; margin-top:12px; font-size:0.85rem;">⚠️ <strong>เงื่อนไขสำคัญ:</strong> บำนาญ+Provident+RMF+SSF รวมต้องไม่เกิน <strong>500,000 บาท</strong></div>
          <div class="form-label" style="color:var(--aia-blue); margin-top:16px;">🏠 ที่อยู่อาศัย</div>
          ${inp('taxHousing', 'ดอกเบี้ยเงินกู้บ้าน (สูงสุด 100,000)', '', 'number', '', 'computeTaxSummary()')}
        </div>
      </div>
    </div>

    <div id="taxSummary" class="tax-content" style="display:none;">
      <div id="taxSummaryResult" style="background:linear-gradient(135deg, rgba(10,117,187,0.08), rgba(210,17,69,0.05)); padding:32px; border-radius:24px; border:1px solid rgba(10,117,187,0.1);">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:40px;">
          <div>
            <div style="font-weight:700; font-size:1.2rem; margin-bottom:16px; color:var(--aia-blue);">📊 สรุปตัวเลขภาษี</div>
            <div id="taxCalcOutput" style="font-size:1rem; line-height:2;"><em style="color:var(--text-muted);">กรอกรายได้และค่าลดหย่อนเพื่อเริ่มคำนวณ</em></div>
          </div>
          <div style="background:#fff; padding:24px; border-radius:16px; box-shadow:0 4px 20px rgba(0,0,0,0.05);">
            <div style="color:var(--aia-red); font-weight:700; margin-bottom:12px;">💡 ข้อแนะนำ</div>
            <div id="taxAdvice" style="font-size:0.9rem; line-height:1.6; color:var(--text-secondary);">ยังไม่มีคำแนะนำ</div>
          </div>
        </div>
      </div>
    </div>
  </div>
`));

function switchTaxTab(btn, targetId) {
  document.querySelectorAll('.tax-tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tax-content').forEach(c => c.style.display = 'none');
  btn.classList.add('active');
  document.getElementById(targetId).style.display = 'block';
}

function showTaxDocs() {
  const el = document.getElementById('taxAdvice');
  if (el) {
    el.innerHTML = `
      <div style="font-weight:700; color:var(--aia-blue); margin-bottom:8px;">📋 เอกสารที่ต้องเตรียม:</div>
      <div style="font-size:0.85rem; line-height:1.8;">
        ✅ 50 ทวิ (หนังสือรับรองการหักภาษี ณ ที่จ่าย)<br>
        ✅ หนังสือรับรองการชำระเบี้ยประกัน (Life/Health/Pension)<br>
        ✅ หนังสือรับรองการซื้อกองทุน (SSF/RMF/ThaiESG)<br>
        ✅ หนังสือรับรองดอกเบี้ยเงินกู้ยืมบ้าน/คอนโด<br>
        ✅ ทะเบียนบ้านบุตร/บิดามารดา<br>
        ✅ เอกสารรับรองสิทธิค่าลดหย่อนอื่นๆ (บริจาค, ช้อปดีมีคืน)
      </div>
    `;
  }
}


// ===== SLIDE 10: POLICY AUDIT INPUT =====
container.appendChild(createSlide(10, `
  <div class="glass-card" style="max-width:1100px;">
    ${secHdr('10', 'POLICY AUDIT — บันทึกกรมธรรม์เดิม')}
    <p class="slide-subtitle">วิเคราะห์สวัสดิการเดิมและหา Gap อย่างละเอียด (Digital Policy Audit)</p>
    
    <div id="policyFormArea" style="background:rgba(255,255,255,0.4); padding:24px; border-radius:12px; border:1px dashed var(--aia-blue);">
      <h3 style="margin-bottom:12px; color:var(--aia-blue);">📋 สรุปสวัสดิการประกันชีวิต</h3>
      
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:16px;">
        ${inp('polName', 'ชื่อแบบประกัน / บริษัท', 'เช่น AIA 20 Pay Life', 'text')}
        ${inp('polNo', 'เลขกรมธรรม์', '', 'text')}
      </div>
      
      <div class="form-label" style="font-weight:700; margin-bottom:8px;">1️⃣ สถานะและการชำระเบี้ย</div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:16px;">
        <div class="form-group">
          <select class="form-input" id="polStatus">
            <option value="ปกติ">ปกติ (คุ้มครองอยู่)</option>
            <option value="ขาดต่อ">ขาดต่อ (Lapse)</option>
            <option value="ใช้เงินสำเร็จ">ใช้เงินสำเร็จ (Paid-up)</option>
            <option value="ขยายเวลา">ขยายเวลา (Extended Term)</option>
            <option value="กู้เบี้ยอัตโนมัติ">กู้เบี้ยอัตโนมัติ (APL)</option>
          </select>
        </div>
        ${inp('polPremium', 'เบี้ยประกันที่จ่าย/ปี (บาท)', '', 'number')}
      </div>
      
      <div class="form-label" style="font-weight:700; margin-bottom:8px;">2️⃣ สัญญาหลัก (Life)</div>
      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; margin-bottom:16px;">
        <div class="form-group">
          <select class="form-input" id="polType">
            <option value="ตลอดชีพ">ตลอดชีพ</option>
            <option value="สะสมทรัพย์">สะสมทรัพย์</option>
            <option value="บำนาญ">บำนาญ</option>
            <option value="ul">ควบการลงทุน (Unit-Linked)</option>
            <option value="ชั่วระยะเวลา">ชั่วระยะเวลา</option>
          </select>
        </div>
        ${inp('polSumAssured', 'ทุนประกันชีวิตรวม', '', 'number')}
        ${inp('polCashValue', 'มูลค่าเวนคืนวันนี้', '', 'number', '', 'calcPolicyLoan()')}
      </div>
      
      <div class="form-label" style="font-weight:700; margin-bottom:8px;">3️⃣ สัญญาเพิ่มเติม (Health & CI)</div>
      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; margin-bottom:16px;">
        ${inp('polHealthLimit', 'วงเงินค่ารักษา (ต่อปี/ครั้ง)', '', 'number')}
        ${inp('polRoomRate', 'ค่าห้อง รพ. (บาท/วัน)', '', 'number')}
        ${inp('polOPD', 'ผู้ป่วยนอก OPD', '', 'number')}
        ${inp('polCI', 'ทุนโรคร้ายแรง (บาท)', '', 'number')}
        ${inp('polHB', 'ชดเชยรายวัน (บาท/วัน)', '', 'number')}
        ${inp('polPA', 'อุบัติเหตุ/ทุพพลภาพ (บาท)', '', 'number')}
      </div>
      
      <div id="polLoanNote" style="font-size:0.9rem; color:var(--aia-blue); margin-bottom:12px; background:rgba(10,117,187,0.05); padding:8px; border-radius:8px;">
        * กรอกมูลค่าเวนคืนเพื่อประเมินยอดกู้ฉุกเฉิน
      </div>
      
      <div style="display:flex; justify-content:center; margin-top:16px;">
        <button type="button" onclick="addDetailedPolicy()" style="padding:12px 32px; background:var(--aia-blue); color:white; border:none; border-radius:8px; font-weight:700; cursor:pointer; font-size:1.05rem; box-shadow:0 4px 12px rgba(10,117,187,0.2);">➕ บันทึกข้อมูลกรมธรรม์เล่มนี้</button>
      </div>
    </div>
  </div>
`));

// ===== SLIDE 11: POLICY DASHBOARD =====
container.appendChild(createSlide(11, `
  <div class="glass-card" style="max-width:1100px;">
    ${secHdr('11', 'POLICY DASHBOARD — ภาพรวมสวัสดิการ (Gap Analysis)')}
    <p class="slide-subtitle">วิเคราะห์ช่องว่าง (Gap) และคำแนะนำแผน</p>
    <div id="policyList" style="margin-top:20px; min-height: 200px;">
      <em style="color:var(--text-muted);">ยังไม่มีกรมธรรม์ที่บันทึกไว้</em>
    </div>
  </div>
`));

// ===== SLIDE 12: AGENT SUMMARY PLAN =====
container.appendChild(createSlide(12, `
  <div class="glass-card" style="max-width:1100px;">
    ${secHdr('12', 'AGENT SUMMARY (สำหรับตัวแทน)')}
    <p class="slide-subtitle">หน้านี้สำหรับตัวแทนเพื่อออกแบบแผนและคำนวณเบี้ยให้ลงตัว</p>
    
    <div id="agentPlanTables" style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">
      
      <div style="display:flex; flex-direction:column; gap:20px;">
        <!-- Income Protection -->
        <div class="gap-section" style="background:#fff; border:none; box-shadow:0 4px 15px rgba(0,0,0,0.05);">
          <h3 style="color:var(--aia-red); margin-bottom:12px; display:flex; align-items:center; gap:8px;">
            <span style="background:var(--aia-red); color:#fff; padding:4px 8px; border-radius:8px; font-size:0.9rem;">1</span> 
            ปกป้องรายได้ (CI)
          </h3>
          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; font-size:0.85rem; margin-bottom:12px; color:var(--text-secondary);">
            <div>Eco: <span id="agentCI_eco" style="font-weight:700; color:var(--text-primary);">0</span></div>
            <div>Biz: <span id="agentCI_biz" style="font-weight:700; color:var(--text-primary);">0</span></div>
            <div>First: <span id="agentCI_first" style="font-weight:700; color:var(--text-primary);">0</span></div>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px;">
            <input type="text" class="form-input" id="premCI_eco" placeholder="เบี้ย Eco" oninput="formatNumberInput(this); calcCustomPremium()">
            <input type="text" class="form-input" id="premCI_biz" placeholder="เบี้ย Biz" oninput="formatNumberInput(this); calcCustomPremium()">
            <input type="text" class="form-input" id="premCI_first" placeholder="เบี้ย First" oninput="formatNumberInput(this); calcCustomPremium()">
          </div>
        </div>

        <!-- Health Protection -->
        <div class="gap-section" style="background:#fff; border:none; box-shadow:0 4px 15px rgba(0,0,0,0.05);">
          <h3 style="color:#7c3aed; margin-bottom:12px; display:flex; align-items:center; gap:8px;">
            <span style="background:#7c3aed; color:#fff; padding:4px 8px; border-radius:8px; font-size:0.9rem;">2</span> 
            สุขภาพเหมาจ่าย
          </h3>
          <div style="display:grid; grid-template-columns:1fr; gap:8px; font-size:0.85rem; margin-bottom:12px; color:var(--text-secondary);">
            <div>Eco: ห้อง 4,000 / เหมาจ่าย 5 ล. + ชดเชยรายได้ 1,000 บาท</div>
            <div>Biz: ห้อง 6,000 / เหมาจ่าย 15 ล.</div>
            <div>First: ห้อง 9,000 / เหมาจ่าย 25 ล.</div>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px;">
            <input type="text" class="form-input" id="premH_eco" placeholder="เบี้ย Eco" oninput="formatNumberInput(this); calcCustomPremium()">
            <input type="text" class="form-input" id="premH_biz" placeholder="เบี้ย Biz" oninput="formatNumberInput(this); calcCustomPremium()">
            <input type="text" class="form-input" id="premH_first" placeholder="เบี้ย First" oninput="formatNumberInput(this); calcCustomPremium()">
          </div>
        </div>
      </div>
      
      <div style="display:flex; flex-direction:column; gap:20px;">
        <!-- Asset -->
        <div class="gap-section" style="background:#fff; border:none; box-shadow:0 4px 15px rgba(0,0,0,0.05);">
          <h3 style="color:#b8860b; margin-bottom:12px; display:flex; align-items:center; gap:8px;">
            <span style="background:#b8860b; color:#fff; padding:4px 8px; border-radius:8px; font-size:0.9rem;">3</span> 
            ปกป้องทรัพย์สิน (หนี้สิน)
          </h3>
          <div style="margin-bottom:8px; font-size:0.9rem;">ทุนชีวิตที่ต้องการ: <strong id="agentAssetCap" style="color:var(--text-primary); font-size:1.1rem;">0</strong> บาท</div>
          <input type="text" class="form-input" id="premAsset" placeholder="เบี้ยประกันชีวิต (บาท)" oninput="formatNumberInput(this); calcCustomPremium()">
        </div>
        
        <!-- Edu -->
        <div class="gap-section" style="background:#fff; border:none; box-shadow:0 4px 15px rgba(0,0,0,0.05);">
          <h3 style="color:var(--aia-blue); margin-bottom:12px; display:flex; align-items:center; gap:8px;">
            <span style="background:var(--aia-blue); color:#fff; padding:4px 8px; border-radius:8px; font-size:0.9rem;">4</span> 
            ปกป้องใบปริญญา <span style="font-size:0.75rem; font-weight:400; color:var(--text-muted);">(ทุนชีวิต)</span>
          </h3>
          <div style="margin-bottom:8px; font-size:0.9rem;">ทุนการศึกษา: <strong id="agentEduCap" style="color:var(--text-primary); font-size:1.1rem;">0</strong> บาท</div>
          <input type="text" class="form-input" id="premEdu" placeholder="เบี้ยประกันชีวิต (บาท)" oninput="formatNumberInput(this); calcCustomPremium()">
        </div>
      </div>

    </div>
  </div>
`));

// ===== SLIDE 13: CUSTOM PLAN SELECTION =====
container.appendChild(createSlide(13, `
  <div class="glass-card" style="max-width:1200px;">
    ${secHdr('13', 'CUSTOM PLAN SELECTION')}
    <p class="slide-subtitle">เลือกปรับแต่งแผนการคุ้มครองตามความต้องการ และบันทึกข้อมูล</p>
    
    <div style="display:flex; gap:24px; flex-wrap:wrap;">
      <div style="flex:2; min-width:300px;">
        
        <div class="custom-plan-box" style="margin-bottom:16px; padding:16px; background:rgba(0,0,0,0.02); border:1px solid rgba(0,0,0,0.05); border-radius:12px;">
          <label style="display:flex; align-items:center; gap:12px; cursor:pointer; font-size:1.1rem; font-weight:600; color:var(--aia-red);">
            <input type="checkbox" id="chkIncome" onchange="calcCustomPremium()" checked style="width:24px; height:24px; accent-color:var(--aia-red);">
            🛡️ 1. แผนปกป้องรายได้ (โรคร้ายแรง)
          </label>
          <select class="form-input" id="cusIncome" onchange="calcCustomPremium()" style="margin-top:12px;">
            <option value="eco">Economy (คุ้มครอง 3 ปี)</option>
            <option value="biz" selected>Business (คุ้มครอง 5 ปี) - แนะนำ</option>
            <option value="first">First Class (คุ้มครอง 7 ปี)</option>
          </select>
        </div>

        <div class="custom-plan-box" style="margin-bottom:16px; padding:16px; background:rgba(0,0,0,0.02); border:1px solid rgba(0,0,0,0.05); border-radius:12px;">
          <label style="display:flex; align-items:center; gap:12px; cursor:pointer; font-size:1.1rem; font-weight:600; color:#7c3aed;">
            <input type="checkbox" id="chkHealth" onchange="calcCustomPremium()" checked style="width:24px; height:24px; accent-color:#7c3aed;">
            🏥 2. แผนปกป้องเงินออม (สุขภาพ)
          </label>
          <select class="form-input" id="cusHealth" onchange="calcCustomPremium()" style="margin-top:12px;">
            <option value="eco">Economy (เหมาจ่าย 5 ล้าน / ค่าห้อง 4k)</option>
            <option value="biz" selected>Business (เหมาจ่าย 15 ล้าน / ค่าห้อง 6k) - แนะนำ</option>
            <option value="first">First Class (เหมาจ่าย 25 ล้าน / ค่าห้อง 9k / OPD 2k)</option>
          </select>
        </div>

        <div class="custom-plan-box" style="margin-bottom:16px; padding:16px; background:rgba(0,0,0,0.02); border:1px solid rgba(0,0,0,0.05); border-radius:12px;">
          <label style="display:flex; align-items:center; gap:12px; cursor:pointer; font-size:1.1rem; font-weight:600; color:#b8860b;">
            <input type="checkbox" id="cusAsset" onchange="calcCustomPremium()" style="width:24px; height:24px; accent-color:#b8860b;">
            🏡 3. แผนปกป้องทรัพย์สิน (คุ้มครองหนี้สิน <span id="lblCusAsset">0</span> บาท)
          </label>
        </div>

        <div class="custom-plan-box" style="margin-bottom:16px; padding:16px; background:rgba(0,0,0,0.02); border:1px solid rgba(0,0,0,0.05); border-radius:12px;">
          <label style="display:flex; align-items:center; gap:12px; cursor:pointer; font-size:1.1rem; font-weight:600; color:var(--aia-blue);">
            <input type="checkbox" id="cusEdu" onchange="calcCustomPremium()" style="width:24px; height:24px; accent-color:var(--aia-blue);">
            🎓 4. แผนปกป้องใบปริญญา (คุ้มครองค่าเทอม <span id="lblCusEdu">0</span> บาท)
          </label>
        </div>
        
        <div style="font-size:0.85rem; color:var(--text-muted); margin-top:8px;">* เงินประกันชีวิตในแผน 3 และ 4 สามารถนำมาเป็นเงินออมตอนเกษียณและกู้ยืมออกมาใช้ฉุกเฉินได้ดอกเบี้ยต่ำ</div>

      </div>

      <div style="flex:1; min-width:300px;">
        <div style="background:var(--aia-blue); color:#fff; padding:24px; border-radius:16px; position:sticky; top:20px; box-shadow:0 10px 25px rgba(10,117,187,0.3);">
          <h3 style="margin-bottom:16px; opacity:0.9;">สรุปเบี้ยประกันที่เลือก</h3>
          <div style="font-size:2.5rem; font-weight:800; margin-bottom:8px;" id="totalCustomPremium">0</div>
          <div style="font-size:1rem; opacity:0.8; margin-bottom:24px;">บาท / ปี</div>
          
          <div style="background:rgba(255,255,255,0.15); padding:16px; border-radius:12px;">
            <div style="font-size:0.85rem; margin-bottom:8px;">สัดส่วนเบี้ยต่อรายได้ (Rule of 15%)</div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span id="percentPremium" style="font-size:1.5rem; font-weight:700;">0%</span>
              <span id="percentStatus" style="font-size:0.85rem; font-weight:600; padding:4px 8px; border-radius:4px;">เหมาะสม</span>
            </div>
            <div style="width:100%; height:6px; background:rgba(0,0,0,0.2); border-radius:3px; margin-top:12px; overflow:hidden;">
              <div id="percentBar" style="height:100%; width:0%; background:#22c55e; transition:all 0.3s;"></div>
            </div>
            <div id="percentWarning" style="color:#ffb3b3; font-size:0.85rem; margin-top:8px; display:none;">⚠️ ควรปรึกษาตัวแทนเพื่อปรับสัดส่วน</div>
          </div>
          
          <div style="font-size:0.75rem; opacity:0.7; margin-top:16px; line-height:1.4;">
            หมายเหตุ: เบี้ยประกันนี้เป็นเพียงการประมาณการเบื้องต้น<br>
            💡 ควรมีเงินสำรองฉุกเฉินในบัญชี 1-3 เดือน (<strong id="cusEmergencyFund" style="color:#fff;">0</strong> บาท)
          </div>
          
          <div style="margin-top:24px; background:rgba(255,255,255,0.1); padding:12px; border-radius:12px;">
            <div style="font-size:0.85rem; margin-bottom:8px;">📌 สถานะการติดตามลูกค้า</div>
            <select id="meetingStatus" style="width:100%; padding:8px; border-radius:8px; border:none; background:#fff; color:#333; font-weight:600;">
              <option value="นัดที่ 1 (Audit)">นัดที่ 1 (Audit & Fact Finding)</option>
              <option value="นัดที่ 2 (Closing)">นัดที่ 2 (Present Plan & Closing)</option>
              <option value="Follow-up">ติดตามงาน (Follow-up)</option>
            </select>
          </div>
          
          <div style="margin-top:16px;">
            <button class="btn-export" id="btnSubmitData" onclick="submitToGoogleSheets()" style="width:100%; padding:14px; font-size:1rem; background:var(--aia-red); color:#fff; border:none; border-radius:12px; font-weight:700; cursor:pointer; box-shadow:0 4px 15px rgba(210,17,69,0.3);">💾 บันทึกและส่งมอบแผน</button>
            <div id="submitStatus" style="margin-top:12px; font-size:0.9rem; font-weight:600; text-align:center;"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
`));

// ============ LOGIC & EVENTS ============

// --- Family Mode Toggle ---
let currentFamilyMode = 'family';
function setFamilyMode(mode) {
  currentFamilyMode = mode;
  document.querySelectorAll('.family-mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
  const eduText = document.getElementById('savEduText');
  if (eduText) {
    eduText.textContent = mode === 'single' ? 'แผนปกป้องความเป็นอยู่ของบุพการี' : 'แผนปกป้องใบปริญญา (ทุนการศึกษา)';
  }
}

// Init select cards
document.querySelectorAll('.select-cards').forEach(initSelectCards);

function onSelectCardChange(name, val) {
  if (name === 'family') {
    document.querySelectorAll('.child-fields').forEach(el => {
      val === 'children' ? el.style.display = 'block' : el.style.display = 'none';
    });
    // Sync family mode on pyramid page
    if (val === 'single') setFamilyMode('single');
    else setFamilyMode('family');
  }
}

// --- Asset Logic ---
let assetRowCnt = 4;
function addAssetRow() {
  assetRowCnt++;
  const div = document.createElement('div');
  div.style = "display:flex; gap:12px; align-items:center; margin-top:12px;";
  div.innerHTML = `
    <input type="text" class="form-input" style="flex:2;" placeholder="รายการทรัพย์สิน/หนี้สิน">
    <input type="text" class="form-input asset-val" style="flex:2;" placeholder="มูลค่า (บาท)" oninput="formatNumberInput(this); calcAssets()">
    <label class="form-input" style="flex:1; display:flex; align-items:center; gap:6px;"><input type="radio" name="ast${assetRowCnt}" class="asset-type" value="asset" checked onchange="calcAssets()"> ทรัพย์สิน</label>
    <label class="form-input" style="flex:1; display:flex; align-items:center; gap:6px;"><input type="radio" name="ast${assetRowCnt}" class="asset-type" value="liability" onchange="calcAssets()"> หนี้สิน</label>
  `;
  document.getElementById('assetList').appendChild(div);
}

function calcAssets() {
  let totA = 0, totL = 0;
  document.querySelectorAll('#assetList > div').forEach(row => {
    const val = parseInt(row.querySelector('.asset-val').value.replace(/,/g, '') || 0);
    const radio = row.querySelector('.asset-type:checked');
    const type = radio ? radio.value : 'asset';
    if (type === 'asset') totA += val;
    else totL += val;
  });
  document.getElementById('totalAsset').textContent = fmt(totA);
  document.getElementById('totalLiability').textContent = fmt(totL);
}

// --- Education Logic ---
let totalEduMaxGlobal = 0;
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
  totalEduMaxGlobal = totalMax;

  const el = document.getElementById('eduCalcResult');
  if (totalMax > 0) {
    let html = 'รวมค่าเทอมลูกทั้งหมด: <span style="color:var(--aia-red); font-size:1.2rem;">' + fmt(totalMin) + ' - ' + fmt(totalMax) + ' บาท</span><br>';
    html += '<span style="font-size:0.82rem; font-weight:normal; color:var(--text-secondary);">';
    if (schYears > 0) html += 'โรงเรียน: ' + fmt(schYears * schMin) + '-' + fmt(schYears * schMax) + ' บ.';
    if (schYears > 0 && uniYears > 0) html += ' | ';
    if (uniYears > 0) html += 'มหาวิทยาลัย: ' + fmt(uniYears * uniMin) + '-' + fmt(uniYears * uniMax) + ' บ.';
    html += '</span>';
    el.innerHTML = html;
  } else {
    el.innerHTML = 'กรุณากรอกจำนวนปีเพื่อคำนวณ';
  }
}

// --- Retirement Logic ---
function setInflation(btn, rate) {
  document.querySelectorAll('.inflation-btn').forEach(b => {
    b.classList.remove('active');
    b.style.background = '#fff';
    b.style.color = 'inherit';
    b.style.borderColor = '#ccc';
  });
  btn.classList.add('active');
  btn.style.background = 'rgba(210,17,69,0.1)';
  btn.style.color = 'var(--aia-red)';
  btn.style.borderColor = 'var(--aia-red)';
  document.getElementById('inflationRate').value = rate;
  computeRetirement();
}

function computeRetirement() {
  const age = num('clientAge') || 35;
  const retAge = num('retireAge') || 60;
  const lifeExp = num('retireLifeExp') || 85;
  const monthly = num('retireMonthly');
  if (!monthly) return;

  const yearsToRetire = Math.max(retAge - age, 0);
  const yearsInRetire = Math.max(lifeExp - retAge, 0);
  const infRate = parseInt(document.getElementById('inflationRate').value) / 100;

  const futureMonthly = monthly * Math.pow(1 + infRate, yearsToRetire);
  const totalNeeded = futureMonthly * 12 * yearsInRetire;

  document.getElementById('retireCalc').innerHTML = `
    <div style="background:rgba(10,117,187,0.05); border:1px solid rgba(10,117,187,0.2); padding:16px; border-radius:12px;">
      <h4 style="color:var(--aia-blue); margin-bottom:8px;">มูลค่าเงินในอนาคต (Future Value)</h4>
      <div>ค่าใช้จ่ายที่ต้องใช้จริงตอนเกษียณ: <strong>${fmt(futureMonthly)}</strong> บาท/เดือน</div>
      <div style="margin-top:8px; font-size:1.1rem; color:var(--aia-red); font-weight:700;">เงินก้อนที่ต้องเตรียมรวม ${yearsInRetire} ปี: ${fmt(totalNeeded)} บาท</div>
    </div>
  `;
}


// --- Tax Calculator (delegated to bottom function) ---

// --- Policy Audit ---
let policies = [];

function calcPolicyLoan() {
  const cv = num('polCashValue');
  const el = document.getElementById('polLoanNote');
  if (cv > 0) {
    el.innerHTML = `✅ มูลค่ากู้ยืมสูงสุด (80%): <strong>${fmt(cv * 0.8)} บาท</strong> (อัตราดอกเบี้ย 4-7% ตามแบบประกัน)`;
  } else {
    el.innerHTML = '* กรอกมูลค่าเวนคืนเพื่อประเมินยอดกู้ฉุกเฉิน';
  }
}

function addPolicy() {
  const n = document.getElementById('polName').value;
  const t = document.getElementById('polType').value;
  const sa = num('polSumAssured');
  const cv = num('polCashValue');
  const p = num('polPremium');
  
  if (!n && sa === 0) return;
  policies.push({name: n||'กรมธรรม์', type: t, sa, cv, p});
  
  // clear
  document.getElementById('polName').value = '';
  document.getElementById('polSumAssured').value = '';
  document.getElementById('polCashValue').value = '';
  document.getElementById('polPremium').value = '';
  calcPolicyLoan();
  
  renderPolicies();
  goToSlide(12); // Go to Dashboard
}

function renderPolicies() {
  const el = document.getElementById('policyList');
  if (policies.length === 0) { el.innerHTML = '<em style="color:var(--text-muted);">ยังไม่มีกรมธรรม์ที่บันทึกไว้</em>'; return; }
  
  let html = '<div style="display:grid; gap:12px; margin-bottom:16px;">';
  let totalCV = 0, totalSA = 0, totalPrem = 0;
  policies.forEach((p, i) => {
    totalCV += p.cv;
    totalSA += p.sa;
    totalPrem += p.p;
    html += `<div style="background:#fff; padding:16px; border-radius:12px; border:1px solid rgba(0,0,0,0.1); display:flex; justify-content:space-between; box-shadow:0 2px 8px rgba(0,0,0,0.03);">
      <div>
        <strong style="font-size:1.05rem; color:var(--aia-blue);">${p.name}</strong> <span style="font-size:0.8rem; background:rgba(0,0,0,0.05); padding:2px 8px; border-radius:12px;">${p.type}</span><br>
        <div style="font-size:0.9rem; color:var(--text-secondary); margin-top:6px; display:flex; gap:16px;">
          <span>ทุน: <strong style="color:var(--text-primary);">${fmt(p.sa)}</strong></span>
          <span>มูลค่าเวนคืน: <strong style="color:var(--text-primary);">${fmt(p.cv)}</strong></span>
          <span>เบี้ย: <strong style="color:var(--text-primary);">${fmt(p.p)}</strong></span>
        </div>
      </div>
      <button onclick="policies.splice(${i},1); renderPolicies();" style="border:none; background:transparent; color:red; cursor:pointer; font-size:1.2rem; padding:8px;">❌</button>
    </div>`;
  });
  html += '</div>';
  
  html += `<div style="margin-top:16px; padding:20px; background:linear-gradient(135deg, rgba(10,117,187,0.05), rgba(210,17,69,0.03)); border:1px solid rgba(10,117,187,0.15); border-radius:16px;">
    <h3 style="color:var(--aia-blue); margin-bottom:12px;">📊 สรุป Gap Analysis และมูลค่ากู้ยืม</h3>
    <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
      <span>ทุนประกันชีวิตรวมปัจจุบัน:</span><strong style="font-size:1.1rem;">${fmt(totalSA)} บาท</strong>
    </div>
    <div style="display:flex; justify-content:space-between; margin-bottom:12px; border-bottom:1px solid rgba(0,0,0,0.05); padding-bottom:12px;">
      <span>เบี้ยประกันจ่ายรวม/ปี:</span><strong style="font-size:1.1rem;">${fmt(totalPrem)} บาท</strong>
    </div>
    <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
      <span>มูลค่าเวนคืนสะสมรวม:</span><strong style="color:#107c41; font-size:1.1rem;">${fmt(totalCV)} บาท</strong>
    </div>
    <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
      <span>💡 สิทธิกู้ยืมฉุกเฉินสูงสุด (80%):</span><strong style="color:var(--aia-red); font-size:1.2rem;">${fmt(totalCV * 0.8)} บาท</strong>
    </div>
  </div>`;
  
  el.innerHTML = html;
}

// --- Agent Summary ---
function computeAgentSummary() {
  const income = num('incomeMain');
  if (income > 0) {
    const el_eco = document.getElementById('agentCI_eco');
    const el_biz = document.getElementById('agentCI_biz');
    const el_first = document.getElementById('agentCI_first');
    if (el_eco) el_eco.innerText = fmt(income * 12 * 3) + ' (คุ้มครอง 3 ปี)';
    if (el_biz) el_biz.innerText = fmt(income * 12 * 5) + ' (คุ้มครอง 5 ปี)';
    if (el_first) el_first.innerText = fmt(income * 12 * 7) + ' (คุ้มครอง 7 ปี)';
  }
  
  let totL = 0;
  document.querySelectorAll('#assetList > div').forEach(row => {
    const radio = row.querySelector('.asset-type:checked');
    if (radio && radio.value === 'liability') {
      totL += parseInt(row.querySelector('.asset-val').value.replace(/,/g, '') || 0);
    }
  });
  document.getElementById('agentAssetCap').innerText = fmt(totL);
  document.getElementById('lblCusAsset').innerText = fmt(totL);
  
  document.getElementById('agentEduCap').innerText = fmt(totalEduMaxGlobal);
  document.getElementById('lblCusEdu').innerText = fmt(totalEduMaxGlobal);
}

// --- Custom Plan Selection ---
function calcCustomPremium() {
  let total = 0;
  
  if (document.getElementById('chkIncome').checked) {
    const incSel = document.getElementById('cusIncome').value;
    total += num('premCI_' + incSel);
  }
  
  if (document.getElementById('chkHealth').checked) {
    const hSel = document.getElementById('cusHealth').value;
    total += num('premH_' + hSel);
  }
  
  if (document.getElementById('cusAsset').checked) total += num('premAsset');
  if (document.getElementById('cusEdu').checked) total += num('premEdu');
  
  document.getElementById('totalCustomPremium').innerText = fmt(total);
  
  // 15% Rule
  const incYear = num('incomeMain') * 12;
  const pctStr = document.getElementById('percentPremium');
  const bar = document.getElementById('percentBar');
  const stat = document.getElementById('percentStatus');
  const warn = document.getElementById('percentWarning');
  
  if (incYear > 0) {
    const pct = (total / incYear) * 100;
    pctStr.innerText = pct.toFixed(1) + '%';
    bar.style.width = Math.min(pct, 100) + '%';
    
    if (pct <= 15) {
      bar.style.background = '#22c55e'; // Green
      stat.innerText = 'เหมาะสม';
      stat.style.background = 'rgba(34,197,94,0.2)';
      stat.style.color = '#107c41';
      warn.style.display = 'none';
    } else if (pct <= 20) {
      bar.style.background = '#eab308'; // Yellow
      stat.innerText = 'ค่อนข้างสูง';
      stat.style.background = 'rgba(234,179,8,0.2)';
      stat.style.color = '#b8860b';
      warn.style.display = 'block';
    } else {
      bar.style.background = '#ef4444'; // Red
      stat.innerText = 'สูงเกินไป';
      stat.style.background = 'rgba(239,68,68,0.2)';
      stat.style.color = '#b91c1c';
      warn.style.display = 'block';
    }
  }
  
  // Calculate emergency fund
  const emFund = (incYear / 12) * 3;
  if (document.getElementById('cusEmergencyFund')) {
    document.getElementById('cusEmergencyFund').innerText = fmt((incYear / 12)) + ' - ' + fmt(emFund);
  }
}

// --- Slide Save Hook ---
function onSlideSave(idx) {
  if (idx === 1) {
    const inc = num('incomeMain');
    const el = document.getElementById('incomeProtCalc');
    if (el) {
      el.innerHTML = inc > 0 ? 
        `เงินสำรองฉุกเฉิน 3-6 เดือน: <strong>${fmt(inc * 3)} - ${fmt(inc * 6)}</strong> บาท<br>ทุนประกันโรคร้ายแรง (ชดเชย 5 ปี): <strong>${fmt(inc * 12 * 5)}</strong> บาท` 
        : 'กรุณากรอกรายได้ในหน้า Personal Profile';
    }
  }
  if (idx === 6) {
    const sel = document.querySelector('#welfareCards input[type="radio"]:checked');
    if (sel) {
      const w = WELFARE[sel.value];
      document.getElementById('welfareSub').textContent = w.emoji + ' ' + w.label + ' — ' + w.tagText;
      // render compare table
      const el = document.getElementById('welfareCompareTable');
      if (el) {
        let html = '<table style="width:100%; border-collapse:collapse; font-size:0.85rem;">';
        html += '<thead><tr style="background:rgba(10,117,187,0.08);">';
        html += '<th style="padding:10px; text-align:left; border-bottom:2px solid rgba(0,0,0,0.1);">รายการ</th>';
        html += '<th style="padding:10px; text-align:center; border-bottom:2px solid rgba(0,0,0,0.1); color:#f59e0b;">'+w.emoji+' สวัสดิการที่เลือก</th>';
        html += '<th style="padding:10px; text-align:center; border-bottom:2px solid rgba(0,0,0,0.1); color:#d21145;">💎 สวัสดิการส่วนตัว</th>';
        html += '</tr></thead><tbody>';
        WELFARE_COMPARE.categories.forEach(c => {
          html += '<tr><td colspan="3" style="padding:8px; font-weight:700; background:rgba(0,0,0,0.02);">' + c.cat + '</td></tr>';
          c.items.forEach(i => {
            html += '<tr style="border-bottom:1px solid rgba(0,0,0,0.04);">';
            html += '<td style="padding:8px;">' + i.name + '</td>';
            html += '<td style="padding:8px; text-align:center;">' + (i[sel.value] || '—') + '</td>';
            html += '<td style="padding:8px; text-align:center; font-weight:600; color:#d21145;">' + i.private + '</td>';
            html += '</tr>';
          });
        });
        html += '</tbody></table>';
        el.innerHTML = html;
      }
    }
  }
  if (idx === 9) computeTaxSummary();
  if (idx === 12) computeAgentSummary();
  if (idx === 13) calcCustomPremium();
}

// --- Submit ---
function submitToGoogleSheets() {
  const btn = document.getElementById('btnSubmitData');
  const stat = document.getElementById('submitStatus');
  btn.innerText = 'กำลังบันทึก...';
  btn.disabled = true;
  
  // Get meeting status from radio buttons
  const meetingRadio = document.querySelector('input[name="meetingNum"]:checked');
  const meetingVal = meetingRadio ? meetingRadio.value : 'นัดครั้งที่ 1';
  
  // Gather Data
  const payload = {
    ClientName: document.getElementById('clientName') ? document.getElementById('clientName').value : '',
    ClientAge: document.getElementById('clientAge') ? document.getElementById('clientAge').value : '',
    MonthlyIncome: num('incomeMain'),
    FamilyMode: currentFamilyMode,
    TotalAssets: num('totalAsset') || 0,
    TotalLiabilities: num('totalLiability') || 0,
    TotalEducationCost: totalEduMaxGlobal,
    RetireMonthlyGoal: num('retireMonthly'),
    PoliciesCount: policies.length,
    MeetingStatus: meetingVal,
    FinalPremiumSelected: num('totalCustomPremium'),
    PremiumPercentOfIncome: document.getElementById('percentPremium') ? document.getElementById('percentPremium').innerText : '0%',
  };

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxwi7oBKjXpANoce4LlRi_wrqXyFEJ2a4xIM7bC1FnsY7V6Vwe5dHQS9L42keeuGc2AcA/exec';
  
  // Use redirect method for reliable Google Sheets submission
  fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(payload)
  }).then(() => {
    btn.innerText = '✅ บันทึกข้อมูลสำเร็จ!';
    btn.disabled = false;
    stat.innerHTML = '<span style="color:#107c41;">ส่งข้อมูลเข้า Google Sheets เรียบร้อยแล้ว</span>';
    setTimeout(() => { btn.innerText = '💾 บันทึกและส่งมอบแผน'; stat.innerHTML = ''; }, 5000);
  }).catch(e => {
    btn.innerText = '❌ เกิดข้อผิดพลาด';
    btn.disabled = false;
    stat.innerHTML = '<span style="color:var(--aia-red);">ไม่สามารถส่งข้อมูลได้: ' + e + '</span>';
  });
}

// --- Tax Logic ---
function computeTaxSummary() {
  const i401 = num('tax401');
  const i402 = num('tax402');
  const i403 = num('tax403');
  const i404 = num('tax404');
  const i405 = num('tax405');
  const i406 = num('tax406');
  const i407 = num('tax407');
  const i408 = num('tax408');

  // Total Income (all 40 types)
  let totalIncome = i401 + i402 + i403 + i404 + i405 + i406 + i407 + i408;
  
  // Expense deductions by type
  let exp12 = Math.min((i401 + i402) * 0.5, 100000); // 40(1)+(2): 50% max 100k combined
  let exp3 = Math.min(i403 * 0.5, 100000); // 40(3): 50% max 100k
  let exp4 = 0; // 40(4): no expense deduction
  let exp5 = i405 * 0.3; // 40(5): 10-30% (using 30% for simplicity)
  let exp6 = i406 * 0.6; // 40(6): 30% or 60% for doctors
  let exp7 = i407 * 0.6; // 40(7): 60%
  let exp8 = i408 * 0.6; // 40(8): 60%

  let totalExp = exp12 + exp3 + exp4 + exp5 + exp6 + exp7 + exp8;
  let incomeAfterExp = totalIncome - totalExp;

  // Personal deduction (always 60k)
  const dPersonal = 60000;
  
  // Child deductions (checkbox-based)
  let dChild = 0;
  const hasChild1 = document.getElementById('taxHasChild1');
  if (hasChild1 && hasChild1.checked) dChild += 30000;
  
  const hasChild2 = document.getElementById('taxHasChild2');
  if (hasChild2 && hasChild2.checked) {
    const child2New = num('taxChild2New'); // Born 2561+: 60k each
    const child2Old = num('taxChild2Old'); // Born before 2561: 30k each
    dChild += (child2New * 60000) + (child2Old * 30000);
  }
  
  // Parent deduction (checkbox-based)
  let dParent = 0;
  const hasParent = document.getElementById('taxHasParent');
  if (hasParent && hasParent.checked) {
    const father = document.getElementById('taxParentFather');
    const mother = document.getElementById('taxParentMother');
    if (father && father.checked) dParent += 30000;
    if (mother && mother.checked) dParent += 30000;
  }

  const dSocial = Math.min(num('taxSocial'), 9000);
  
  // Life & Health Insurance
  let dLife = Math.min(num('taxLife'), 100000);
  let dHealth = Math.min(num('taxHealth'), 25000);
  let dLifeHealth = Math.min(dLife + dHealth, 100000);

  // Housing loan interest
  const dHousing = Math.min(num('taxHousing'), 100000);

  // Investment (The 500k Cap)
  const dProvident = num('taxProvident');
  const dPension = Math.min(num('taxPension'), totalIncome * 0.15, 200000);
  const dSSF = Math.min(num('taxSSF'), totalIncome * 0.3, 200000);
  const dRMF = Math.min(num('taxRMF'), totalIncome * 0.3, 500000);
  
  let totalInvest = dProvident + dPension + dSSF + dRMF;
  if (totalInvest > 500000) totalInvest = 500000;

  let totalDeduct = dPersonal + dChild + dParent + dSocial + dLifeHealth + dHousing + totalInvest;
  let netIncome = Math.max(incomeAfterExp - totalDeduct, 0);

  // Tax Calculation (Progressive steps)
  let tax = 0;
  const steps = [
    { limit: 150000, rate: 0 },
    { limit: 300000, rate: 0.05 },
    { limit: 500000, rate: 0.10 },
    { limit: 750000, rate: 0.15 },
    { limit: 1000000, rate: 0.20 },
    { limit: 2000000, rate: 0.25 },
    { limit: 5000000, rate: 0.30 },
    { limit: Infinity, rate: 0.35 }
  ];

  let prevLimit = 0;
  let taxDetails = "";
  for (let s of steps) {
    if (netIncome > prevLimit) {
      let taxableInRange = Math.min(netIncome, s.limit) - prevLimit;
      let taxInStep = taxableInRange * s.rate;
      tax += taxInStep;
      if (s.rate > 0) taxDetails += `ช่วง ${fmt(prevLimit+1)} - ${fmt(s.limit)}: ภาษี ${fmt(taxInStep)} บาท (${s.rate*100}%)<br>`;
      prevLimit = s.limit;
    } else break;
  }

  // UI Output
  const out = document.getElementById('taxCalcOutput');
  if (out) {
    out.innerHTML = `
      <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid rgba(0,0,0,0.06);">เงินได้รวม (ทุกประเภท)<strong>${fmt(totalIncome)}</strong></div>
      <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid rgba(0,0,0,0.06);">หักค่าใช้จ่ายเหมา<strong>-${fmt(totalExp)}</strong></div>
      <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid rgba(0,0,0,0.06);">หักค่าลดหย่อนรวม<strong>-${fmt(totalDeduct)}</strong></div>
      <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid rgba(0,0,0,0.06);">เงินได้สุทธิ<strong>${fmt(netIncome)}</strong></div>
      <div style="display:flex; justify-content:space-between; padding:12px 0; font-size:1.1rem; border-bottom:2px solid rgba(0,0,0,0.1);">ภาษีที่ต้องจ่าย<strong style="color:var(--aia-red);">${fmt(tax)} บาท</strong></div>
      <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:8px;">${taxDetails || "ไม่มีภาษีที่ต้องชำระ"}</div>
    `;
  }

  // Advice
  const advice = document.getElementById('taxAdvice');
  if (advice) {
    let txt = "";
    if (totalInvest < 500000 && tax > 0) {
      let gap = 500000 - totalInvest;
      txt += `• ยังเหลือโควตาลงทุน (SSF/RMF/บำนาญ) อีก <strong>${fmt(gap)}</strong> บาท<br>`;
    }
    if (dLifeHealth < 100000 && tax > 0) {
      txt += `• เพิ่มประกันชีวิต/สุขภาพได้อีก <strong>${fmt(100000 - dLifeHealth)}</strong> บาท<br>`;
    }
    if (dHousing === 0 && tax > 0) {
      txt += `• ดอกเบี้ยบ้าน: ลดหย่อนได้สูงสุด 100,000 บาท<br>`;
    }
    if (dParent > 0) {
      txt += `• 📌 ค่าอุปการะบิดามารดา: เตรียมเอกสาร <strong>ลย.03</strong><br>`;
    }
    if (tax === 0) txt = "ยอดเยี่ยม! ไม่มีภาษีที่ต้องชำระ";
    else if (txt === "") txt = "คุณใช้สิทธิลดหย่อนเต็มเพดานหลักแล้ว";
    advice.innerHTML = txt;
  }
}

function selectTierGroup(el, groupCls) {
  document.querySelectorAll('.tier-card-' + groupCls).forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}

function num(id) {
  const el = document.getElementById(id);
  if (!el) return 0;
  if (el.tagName === 'DIV' || el.tagName === 'SPAN') return parseInt(el.innerText.replace(/,/g, ''), 10) || 0;
  return parseInt(el.value.replace(/,/g, ''), 10) || 0;
}
function fmt(n) { return Math.round(n).toLocaleString('en-US'); }
