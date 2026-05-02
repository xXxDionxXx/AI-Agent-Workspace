// ============ APP — RENDER ALL SLIDES ============

const container = document.getElementById('slidesContainer');

function formatNumberInput(el) {
  let val = el.value.replace(/,/g, '').replace(/[^\d.-]/g, '');
  if (val !== '') {
    el.value = parseInt(val, 10).toLocaleString('en-US');
  }
}

// override inp function
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

// ===== SLIDE 1: PERSONAL PROFILE & INCOME =====
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
    
    <div class="child-fields form-group" style="margin-top:16px; display:none;" id="childFields">
      ${inp('childCount', 'จำนวนบุตร (อายุไม่เกิน 23 ปี)', 'เช่น 2', 'number', 'must')}
    </div>

    <div style="background:rgba(255,255,255,0.5); padding:16px; border-radius:12px; margin-top:24px; border:1px solid rgba(0,0,0,0.05);">
      <div class="form-label" style="font-weight:700; color:var(--aia-blue);">รายได้หลักของคุณ</div>
      ${inp('incomeMain', 'รายได้หลัก/เดือน (บาท)', 'เช่น 50,000', 'number', 'must')}
    </div>
  </div>
`));

// ===== SLIDE 2: FINANCIAL PLANS (PYRAMID) =====
container.appendChild(createSlide(2, `
  <div class="glass-card" style="width:100%; max-width:1200px; padding:32px;">
    <div style="text-align:center; margin-bottom:24px;">
      <div class="browser-badge" style="display:inline-flex; background:var(--aia-blue);"><span class="browser-badge-num" style="color:var(--aia-blue);">2</span> Financial Plans - สารบัญการวางแผน</div>
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
        <div class="detail-group">
          <div class="detail-group-badge" style="background:#d21145;">4 แผนปกป้องหลัก</div>
          <div class="detail-box" onclick="toggleDetailCheck(this)" data-plan="pro_income">
            <div class="detail-text">แผนปกป้องรายได้ (สำรองฉุกเฉิน / โรคร้ายแรง)</div>
            <div class="detail-checkbox"></div>
          </div>
          <div class="detail-box" onclick="toggleDetailCheck(this)" data-plan="pro_savings">
            <div class="detail-text">แผนปกป้องเงินออม (สุขภาพ / ค่ารักษา)</div>
            <div class="detail-checkbox"></div>
          </div>
          <div class="detail-box" onclick="toggleDetailCheck(this)" data-plan="sav_asset">
            <div class="detail-text">แผนปกป้องทรัพย์สิน (จัดการหนี้สินมรดก)</div>
            <div class="detail-checkbox"></div>
          </div>
          <div class="detail-box" onclick="toggleDetailCheck(this)" data-plan="sav_edu" id="savEduBox">
            <div class="detail-text" id="savEduText">แผนปกป้องใบปริญญา (ทุนการศึกษา)</div>
            <div class="detail-checkbox"></div>
          </div>
        </div>
        
        <div class="detail-group">
          <div class="detail-group-badge" style="background:#f9a825;">แผนระยะยาว</div>
          <div class="detail-box" onclick="toggleDetailCheck(this)" data-plan="sav_retire">
            <div class="detail-text">แผนเกษียณอายุ (Retirement)</div>
            <div class="detail-checkbox"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
`));

// ===== SLIDE 3: INCOME PROTECTION =====
container.appendChild(createSlide(3, `
  <div class="glass-card">
    ${secHdr('3', 'แผนปกป้องรายได้ (Income Protection)')}
    <p class="slide-subtitle">เงินสำรองฉุกเฉินและทุนโรคร้ายแรง</p>
    <div class="gap-section" style="margin-top:16px; background:rgba(210,17,69,0.05); border-color:rgba(210,17,69,0.2);">
      <h3 style="color:var(--aia-red);">💡 ตัวเลขแนะนำตามมาตรฐานการเงิน</h3>
      <div id="incomeProtCalc" style="font-size:1.1rem; color:var(--text-primary); font-weight:700;">
        กรุณากรอกรายได้ในหน้า Personal Profile
      </div>
    </div>
  </div>
`));

// ===== SLIDE 4: ASSET & LIABILITIES =====
container.appendChild(createSlide(4, `
  <div class="glass-card">
    ${secHdr('4', 'แผนปกป้องทรัพย์สิน (Asset & Liabilities)')}
    <p class="slide-subtitle">ประเมินมูลค่าทรัพย์สินและหนี้สินที่ต้องเตรียมแผนปกป้อง</p>
    
    <div id="assetList" style="display:flex; flex-direction:column; gap:12px; margin-bottom:16px;">
      <!-- Row 1 -->
      <div style="display:flex; gap:12px; align-items:center;">
        <input type="text" class="form-input" style="flex:2;" value="บ้าน / ที่อยู่อาศัย">
        <input type="text" class="form-input asset-val" style="flex:2;" placeholder="มูลค่า (บาท)" oninput="formatNumberInput(this); calcAssets()">
        <select class="form-input asset-type" style="flex:1;" onchange="calcAssets()">
          <option value="asset">ทรัพย์สิน (Asset)</option>
          <option value="liability" selected>หนี้สิน (Liability)</option>
        </select>
      </div>
      <!-- Row 2 -->
      <div style="display:flex; gap:12px; align-items:center;">
        <input type="text" class="form-input" style="flex:2;" value="รถยนต์">
        <input type="text" class="form-input asset-val" style="flex:2;" placeholder="มูลค่า (บาท)" oninput="formatNumberInput(this); calcAssets()">
        <select class="form-input asset-type" style="flex:1;" onchange="calcAssets()">
          <option value="asset">ทรัพย์สิน (Asset)</option>
          <option value="liability" selected>หนี้สิน (Liability)</option>
        </select>
      </div>
      <!-- Row 3 -->
      <div style="display:flex; gap:12px; align-items:center;">
        <input type="text" class="form-input" style="flex:2;" placeholder="รายการอื่นๆ">
        <input type="text" class="form-input asset-val" style="flex:2;" placeholder="มูลค่า (บาท)" oninput="formatNumberInput(this); calcAssets()">
        <select class="form-input asset-type" style="flex:1;" onchange="calcAssets()">
          <option value="asset" selected>ทรัพย์สิน (Asset)</option>
          <option value="liability">หนี้สิน (Liability)</option>
        </select>
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

// ===== SLIDE 5: EDUCATION SELECTION =====
container.appendChild(createSlide(5, `
  <div class="glass-card">
    ${secHdr('5', 'แผนปกป้องใบปริญญา (Education Selection)')}
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
      <h3 style="color:var(--aia-blue);">💡 สรุปทุนการศึกษาที่ต้องเตรียม (Degree Protection)</h3>
      <div id="eduCalcResult" style="font-size:1.1rem; color:var(--text-primary); font-weight:700;">
        กรุณากรอกจำนวนปีเพื่อคำนวณ
      </div>
    </div>
  </div>
`));

// ===== SLIDE 6: RETIREMENT =====
container.appendChild(createSlide(6, `
  <div class="glass-card">
    ${secHdr('6', 'RETIREMENT (เกษียณอายุ)')}
    <p class="slide-subtitle">การวางแผนระยะยาว พร้อมคำนวณอัตราเงินเฟ้อ (Future Value)</p>
    <div class="form-row">
      ${inp('retireAge', 'อายุที่คาดว่าจะเกษียณ', 'เช่น 60', 'number', 'should')}
      ${inp('retireLifeExp', 'อายุขัย (ปี)', 'เช่น 85', 'number', 'opt')}
    </div>
    ${inp('retireMonthly', 'เป้าหมายค่าใช้จ่ายต่อเดือน ณ วันนี้', 'เช่น 30,000', 'number', 'should')}
    
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

// ===== SLIDE 7: WELFARE SELECTION =====
container.appendChild(createSlide(7, `
  <div class="glass-card">
    ${secHdr('7', 'WELFARE Selection')}
    <p class="slide-subtitle">สวัสดิการพื้นฐานของลูกค้า</p>
    <div class="select-cards" id="welfareCards">
      ${selCard('welfare', 'social33', '🔵', 'ประกันสังคม', 'สวัสดิการพนักงานเอกชน')}
      ${selCard('welfare', 'gov', '💼', 'ข้าราชการ', 'สวัสดิการกรมบัญชีกลาง')}
      ${selCard('welfare', 'gold', '💳', 'บัตรทอง', 'หลักประกันสุขภาพถ้วนหน้า')}
    </div>
  </div>
`));

// ===== SLIDE 8: WELFARE COMPARISON =====
container.appendChild(createSlide(8, `
  <div class="glass-card" id="welfareResult" style="max-width:1100px;">
    ${secHdr('8', 'เปรียบเทียบสิทธิรักษาพยาบาล')}
    <p class="slide-subtitle" id="welfareSub">สวัสดิการของลูกค้า vs สวัสดิการส่วนตัว</p>
    <div id="welfareCompareTable" style="overflow-x:auto; margin-top:16px;"></div>
  </div>
`));

// ===== SLIDE 9: HOSPITAL & PLAN SELECTION =====
container.appendChild(createSlide(9, `
  <div class="glass-card" style="max-width:1100px;">
    ${secHdr('9', 'แผนปกป้องเงินออม (Health Plan)')}
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

// ===== SLIDE 10: TAX CALCULATOR =====
container.appendChild(createSlide(10, `
  <div class="glass-card" style="max-width:1100px;">
    ${secHdr('10', 'TAX CALCULATOR')}
    <p class="slide-subtitle">ระบบคำนวณภาษีเงินได้บุคคลธรรมดาเบื้องต้น</p>
    
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
      <div>
        <div class="form-label" style="color:#d21145; font-weight:700;">📊 รายได้ต่อปี (ประเมินจากรายได้หลัก)</div>
        ${inp('taxIncome', 'เงินได้รวมทั้งปี (ก่อนหักค่าใช้จ่าย)', 'รายได้รวม', 'number')}
        <div style="font-size:0.78rem; color:var(--text-muted); margin-top:-8px; margin-bottom:12px;">* ระบบดึงจาก Personal Profile และหักค่าใช้จ่ายเหมา 50% สูงสุด 100,000 อัตโนมัติ</div>
        
        <div class="form-label" style="color:#107c41; font-weight:700; margin-top:16px;">📋 ค่าลดหย่อนพื้นฐาน</div>
        ${inp('taxLife', 'เบี้ยประกันชีวิต/สะสมทรัพย์', 'สูงสุด 100,000', 'number')}
        ${inp('taxHealth', 'เบี้ยประกันสุขภาพ', 'สูงสุด 25,000', 'number')}
        
        <details style="margin-top:12px; background:rgba(255,255,255,0.5); border:1px solid rgba(0,0,0,0.05); border-radius:12px; padding:12px;">
          <summary style="cursor:pointer; font-weight:600; color:var(--aia-blue);">+ เพิ่มค่าลดหย่อนอื่นๆ (กองทุน, บริจาค, ดอกเบี้ยบ้าน)</summary>
          <div style="margin-top:12px;">
            ${inp('taxSocial', 'ประกันสังคม', 'สูงสุด 9,000', 'number')}
            ${inp('taxSSF', 'SSF', 'สูงสุด 200,000', 'number')}
            ${inp('taxRMF', 'RMF', 'สูงสุด 500,000', 'number')}
            ${inp('taxHousing', 'ดอกเบี้ยกู้ยืมบ้าน', 'สูงสุด 100,000', 'number')}
          </div>
        </details>
      </div>
      
      <div>
        <div id="taxSummaryResult" style="position:sticky; top:20px;">
          <div style="background:linear-gradient(135deg, rgba(10,117,187,0.08), rgba(210,17,69,0.05)); padding:24px; border-radius:16px; border:1px solid rgba(10,117,187,0.1);">
            <div style="font-weight:700; font-size:1.1rem; margin-bottom:16px; color:var(--aia-blue);">📊 สรุปผลคำนวณภาษี</div>
            <div id="taxCalcOutput" style="font-size:0.9rem; line-height:1.8;">
              <em style="color:var(--text-muted);">ตรวจสอบรายได้เพื่อเริ่มคำนวณ</em>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`));

// ===== SLIDE 11: POLICY AUDIT =====
container.appendChild(createSlide(11, `
  <div class="glass-card" style="max-width:1100px;">
    ${secHdr('11', 'POLICY AUDIT — สรุปกรมธรรม์เดิม')}
    <p class="slide-subtitle">จัดการกรมธรรม์ที่ลูกค้ามีอยู่แล้ว</p>
    
    <div id="policyFormArea" style="background:rgba(255,255,255,0.4); padding:16px; border-radius:12px; border:1px dashed var(--aia-blue);">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        ${inp('polName', 'ชื่อแบบประกัน / บริษัท', 'เช่น AIA 20 Pay Life', 'text')}
        <div class="form-group">
          <label class="form-label">ประเภทกรมธรรม์</label>
          <select class="form-input" id="polType">
            <option value="life">ประกันชีวิต (ตลอดชีพ/ชั่วระยะเวลา)</option>
            <option value="endowment">สะสมทรัพย์</option>
            <option value="health">ประกันสุขภาพ</option>
            <option value="ci">ประกันโรคร้ายแรง</option>
            <option value="pa">ประกันอุบัติเหตุ</option>
            <option value="annuity">ประกันบำนาญ</option>
            <option value="ul">ควบการลงทุน (Unit-Linked)</option>
          </select>
        </div>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px;">
        ${inp('polSumAssured', 'ทุนประกันหลัก', 'จำนวนเงิน (บาท)', 'number')}
        ${inp('polCashValue', 'มูลค่าเวนคืนปัจจุบัน', 'จำนวนเงิน (บาท)', 'number')}
        ${inp('polPremium', 'เบี้ยประกัน/ปี', 'จำนวนเงิน (บาท)', 'number')}
      </div>
      <div id="polLoanNote" style="font-size:0.8rem; color:var(--aia-blue); margin-top:-8px; margin-bottom:12px;">* กู้เงินสดได้สูงสุด 80% ของมูลค่าเวนคืน</div>
      
      <div style="display:flex; justify-content:center; margin-top:16px;">
        <button type="button" onclick="addPolicy()" style="padding:10px 24px; background:var(--aia-blue); color:white; border:none; border-radius:8px; font-weight:700; cursor:pointer;">➕ เพิ่มกรมธรรม์เล่มนี้</button>
      </div>
    </div>
    
    <div id="policyList" style="margin-top:20px;"></div>
  </div>
`));

// ===== SLIDE 12: AGENT SUMMARY PLAN =====
container.appendChild(createSlide(12, `
  <div class="glass-card" style="max-width:1100px;">
    ${secHdr('12', 'AGENT SUMMARY (สำหรับตัวแทน)')}
    <p class="slide-subtitle">หน้านี้สำหรับตัวแทนเพื่อคำนวณเบี้ยประกันและกรอกข้อมูลก่อนนำเสนอ</p>
    
    <div id="agentPlanTables" style="display:flex; flex-direction:column; gap:20px;">
      <!-- Income Protection -->
      <div class="gap-section" style="background:rgba(210,17,69,0.05); border:1px solid rgba(210,17,69,0.2);">
        <h3 style="color:var(--aia-red); margin-bottom:12px;">1. แผนปกป้องรายได้ (โรคร้ายแรง)</h3>
        <table style="width:100%; border-collapse:collapse; background:#fff; border-radius:8px; overflow:hidden;">
          <tr style="background:#f3f4f6; text-align:left;">
            <th style="padding:10px;">Class</th><th style="padding:10px;">ทุนโรคร้ายแรงที่แนะนำ</th><th style="padding:10px;">เบี้ยประกัน (กรอก)</th>
          </tr>
          <tr><td style="padding:10px;">Economy</td><td style="padding:10px;" id="agentCI_eco">0 บาท (3 ปี)</td><td style="padding:10px;"><input type="text" class="form-input" id="premCI_eco" oninput="formatNumberInput(this)"></td></tr>
          <tr><td style="padding:10px;">Business</td><td style="padding:10px;" id="agentCI_biz">0 บาท (5 ปี)</td><td style="padding:10px;"><input type="text" class="form-input" id="premCI_biz" oninput="formatNumberInput(this)"></td></tr>
          <tr><td style="padding:10px;">First Class</td><td style="padding:10px;" id="agentCI_first">0 บาท (7 ปี)</td><td style="padding:10px;"><input type="text" class="form-input" id="premCI_first" oninput="formatNumberInput(this)"></td></tr>
        </table>
      </div>

      <!-- Health Protection -->
      <div class="gap-section" style="background:rgba(124,58,237,0.05); border:1px solid rgba(124,58,237,0.2);">
        <h3 style="color:#7c3aed; margin-bottom:12px;">2. แผนปกป้องเงินออม (สุขภาพ)</h3>
        <table style="width:100%; border-collapse:collapse; background:#fff; border-radius:8px; overflow:hidden;">
          <tr style="background:#f3f4f6; text-align:left;">
            <th style="padding:10px;">Class</th><th style="padding:10px;">แผนค่าห้อง / เหมาจ่าย</th><th style="padding:10px;">เบี้ยประกัน (กรอก)</th>
          </tr>
          <tr><td style="padding:10px;">Economy ✈️</td><td style="padding:10px;">ห้อง 4,000 / เหมาจ่าย 5 ล้าน / CI 10ล้าน</td><td style="padding:10px;"><input type="text" class="form-input" id="premH_eco" oninput="formatNumberInput(this)"></td></tr>
          <tr><td style="padding:10px;">Business 🌟</td><td style="padding:10px;">ห้อง 6,000 / เหมาจ่าย 15 ล้าน / CI 30ล้าน</td><td style="padding:10px;"><input type="text" class="form-input" id="premH_biz" oninput="formatNumberInput(this)"></td></tr>
          <tr><td style="padding:10px;">First Class 👑</td><td style="padding:10px;">ห้อง 9,000 / เหมาจ่าย 25 ล้าน / CI 50ล้าน / OPD 2,000</td><td style="padding:10px;"><input type="text" class="form-input" id="premH_first" oninput="formatNumberInput(this)"></td></tr>
        </table>
      </div>

      <!-- Asset & Edu -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
        <div class="gap-section" style="background:rgba(234,179,8,0.05); border:1px solid rgba(234,179,8,0.2);">
          <h3 style="color:#b8860b; margin-bottom:12px;">3. แผนปกป้องทรัพย์สิน</h3>
          <div style="margin-bottom:8px;">ทุนประกันชีวิตที่ต้องการ: <strong id="agentAssetCap">0</strong> บาท</div>
          <input type="text" class="form-input" id="premAsset" placeholder="เบี้ยประกันชีวิต (บาท)" oninput="formatNumberInput(this)">
        </div>
        
        <div class="gap-section" style="background:rgba(10,117,187,0.05); border:1px solid rgba(10,117,187,0.2);">
          <h3 style="color:var(--aia-blue); margin-bottom:12px;">4. แผนปกป้องใบปริญญา</h3>
          <div style="margin-bottom:8px;">ทุนการศึกษาที่ต้องการ: <strong id="agentEduCap">0</strong> บาท</div>
          <input type="text" class="form-input" id="premEdu" placeholder="เบี้ยประกันชีวิต (บาท)" oninput="formatNumberInput(this)">
        </div>
      </div>
    </div>
  </div>
`));

// ===== SLIDE 13: CUSTOM PLAN SELECTION =====
container.appendChild(createSlide(13, `
  <div class="glass-card" style="max-width:1200px;">
    ${secHdr('13', 'CUSTOM PLAN SELECTION')}
    <p class="slide-subtitle">เลือกปรับแต่งแผนการคุ้มครองตามความต้องการ</p>
    
    <div style="display:flex; gap:24px;">
      <div style="flex:2;">
        
        <div class="custom-plan-box" style="margin-bottom:16px;">
          <h3 style="color:var(--aia-red); margin-bottom:12px;">🛡️ 1. แผนปกป้องรายได้ (โรคร้ายแรง)</h3>
          <select class="form-input" id="cusIncome" onchange="calcCustomPremium()">
            <option value="0">ไม่รับแผนนี้</option>
            <option value="eco">Economy (คุ้มครอง 3 ปี)</option>
            <option value="biz" selected>Business (คุ้มครอง 5 ปี) - แนะนำ</option>
            <option value="first">First Class (คุ้มครอง 7 ปี)</option>
          </select>
        </div>

        <div class="custom-plan-box" style="margin-bottom:16px;">
          <h3 style="color:#7c3aed; margin-bottom:12px;">🏥 2. แผนปกป้องเงินออม (สุขภาพ)</h3>
          <select class="form-input" id="cusHealth" onchange="calcCustomPremium()">
            <option value="0">ไม่รับแผนนี้</option>
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

      <div style="flex:1;">
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
          </div>
          
          <div style="font-size:0.75rem; opacity:0.7; margin-top:16px; line-height:1.4;">
            หมายเหตุ: เบี้ยประกันนี้เป็นเพียงการประมาณการเบื้องต้น กรุณายืนยันความคุ้มครองและเบี้ยประกันจริงกับตัวแทนของคุณอีกครั้ง<br>
            💡 ก่อนเริ่มวางแผน ควรมีเงินสำรองฉุกเฉินในบัญชี 1-3 เดือน (<strong id="cusEmergencyFund" style="color:#fff;">0</strong> บาท) เผื่อกรณีฉุกเฉินเพื่อไม่ให้กระทบสภาพคล่องและแผนการเงินต่างๆ
          </div>
        </div>
      </div>
    </div>
  </div>
`));

// ===== SLIDE 14: SUBMIT =====
container.appendChild(createSlide(14, `
  <div class="glass-card glass-card-sm" style="text-align:center; max-width:600px;">
    <div class="slide-title" style="margin-bottom:16px; color:var(--aia-blue);">บันทึกข้อมูลและส่งมอบแผน</div>
    <p class="slide-subtitle" style="margin-bottom:24px;">ขอบคุณที่ไว้วางใจให้เราช่วยดูแลสุขภาพทางการเงินของคุณ</p>
    <div class="export-row">
      <button class="btn-export" id="btnSubmitData" onclick="submitToGoogleSheets()" style="width:100%; padding:16px; font-size:1.1rem; background:var(--aia-red); color:#fff; border:none; border-radius:12px; font-weight:700; cursor:pointer; box-shadow:0 4px 15px rgba(210,17,69,0.3);">💾 บันทึกข้อมูลลง Google Sheet</button>
    </div>
    <div id="submitStatus" style="margin-top:16px; font-size:1rem; font-weight:600;"></div>
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
    eduText.textContent = mode === 'single' ? 'ดูแลพ่อแม่' : 'แผนปกป้องใบปริญญา (ทุนการศึกษา)';
  }
}

// Init select cards
document.querySelectorAll('.select-cards').forEach(initSelectCards);

function onSelectCardChange(name, val) {
  if (name === 'family') {
    document.querySelectorAll('.child-fields').forEach(el => {
      val === 'children' ? el.style.display = 'block' : el.style.display = 'none';
    });
  }
}

// --- Asset Logic ---
function addAssetRow() {
  const div = document.createElement('div');
  div.style = "display:flex; gap:12px; align-items:center; margin-top:12px;";
  div.innerHTML = `
    <input type="text" class="form-input" style="flex:2;" placeholder="รายการทรัพย์สิน/หนี้สิน">
    <input type="text" class="form-input asset-val" style="flex:2;" placeholder="มูลค่า (บาท)" oninput="formatNumberInput(this); calcAssets()">
    <select class="form-input asset-type" style="flex:1;" onchange="calcAssets()">
      <option value="asset">ทรัพย์สิน (Asset)</option>
      <option value="liability" selected>หนี้สิน (Liability)</option>
    </select>
  `;
  document.getElementById('assetList').appendChild(div);
}

function calcAssets() {
  let totA = 0, totL = 0;
  document.querySelectorAll('#assetList > div').forEach(row => {
    const val = parseInt(row.querySelector('.asset-val').value.replace(/,/g, '') || 0);
    const type = row.querySelector('.asset-type').value;
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

// --- Tax Calculator ---
function computeTaxSummary() {
  const incStr = document.getElementById('taxIncome').value;
  if (!incStr) {
    const mainInc = num('incomeMain');
    if (mainInc > 0) document.getElementById('taxIncome').value = fmt(mainInc * 12);
  }
  
  const income = num('taxIncome');
  if (income <= 0) { document.getElementById('taxCalcOutput').innerHTML = '<em style="color:var(--text-muted);">ตรวจสอบรายได้เพื่อเริ่มคำนวณ</em>'; return; }

  const expense = Math.min(income * 0.5, 100000);
  const selfDeduct = 60000;
  
  const life = Math.min(num('taxLife'), 100000);
  const health = Math.min(num('taxHealth'), 25000);
  const social = Math.min(num('taxSocial'), 9000);
  const ssf = Math.min(num('taxSSF'), 200000);
  const rmf = Math.min(num('taxRMF'), 500000);
  const housing = Math.min(num('taxHousing'), 100000);

  const totalDeductions = selfDeduct + life + health + social + ssf + rmf + housing;
  const netAfter = income - expense - totalDeductions;
  const finalTax = calcTax(Math.max(netAfter, 0));

  let html = '';
  html += '<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid rgba(0,0,0,0.06);">เงินได้รวม<strong>' + fmt(income) + '</strong></div>';
  html += '<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid rgba(0,0,0,0.06);">หักค่าใช้จ่ายเหมา<strong>-' + fmt(expense) + '</strong></div>';
  html += '<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid rgba(0,0,0,0.06);">หักค่าลดหย่อนรวม<strong>-' + fmt(totalDeductions) + '</strong></div>';
  html += '<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid rgba(0,0,0,0.06);">เงินได้สุทธิ<strong>' + fmt(Math.max(netAfter, 0)) + '</strong></div>';
  html += '<div style="display:flex; justify-content:space-between; padding:12px 0; font-size:1.1rem; border-bottom:2px solid rgba(0,0,0,0.1);">ภาษีที่ต้องจ่ายโดยประมาณ<strong style="color:var(--aia-red);">' + fmt(finalTax) + ' บาท</strong></div>';

  document.getElementById('taxCalcOutput').innerHTML = html;
}

// --- Policy Audit ---
let policies = [];
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
  
  renderPolicies();
}

function renderPolicies() {
  const el = document.getElementById('policyList');
  if (policies.length === 0) { el.innerHTML = ''; return; }
  
  let html = '<h4 style="margin-bottom:8px;">กรมธรรม์ที่เพิ่มแล้ว:</h4>';
  let totalCV = 0;
  policies.forEach((p, i) => {
    totalCV += p.cv;
    html += `<div style="background:#fff; padding:12px; border-radius:8px; border:1px solid #ccc; margin-bottom:8px; display:flex; justify-content:space-between;">
      <div><strong>${p.name}</strong> (${p.type})<br><span style="font-size:0.8rem; color:var(--text-secondary);">ทุน: ${fmt(p.sa)} | มูลค่าเวนคืน: ${fmt(p.cv)} | เบี้ย: ${fmt(p.p)}</span></div>
      <button onclick="policies.splice(${i},1); renderPolicies();" style="border:none; background:transparent; color:red; cursor:pointer;">❌</button>
    </div>`;
  });
  
  html += `<div style="margin-top:12px; padding:12px; background:rgba(10,117,187,0.1); border-radius:8px;">
    <strong>มูลค่าเวนคืนรวม: ${fmt(totalCV)} บาท</strong><br>
    <span style="color:var(--aia-blue); font-weight:700;">กู้เงินสดได้สูงสุดโดยประมาณ (80%): ${fmt(totalCV * 0.8)} บาท</span>
  </div>`;
  
  el.innerHTML = html;
}

// --- Agent Summary ---
function computeAgentSummary() {
  const income = num('incomeMain');
  if (income > 0) {
    document.getElementById('agentCI_eco').innerText = fmt(income * 12 * 3) + ' บาท (3 ปี)';
    document.getElementById('agentCI_biz').innerText = fmt(income * 12 * 5) + ' บาท (5 ปี)';
    document.getElementById('agentCI_first').innerText = fmt(income * 12 * 7) + ' บาท (7 ปี)';
  }
  
  let totL = 0;
  document.querySelectorAll('#assetList > div').forEach(row => {
    if (row.querySelector('.asset-type').value === 'liability') {
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
  
  const incSel = document.getElementById('cusIncome').value;
  if (incSel !== '0') total += num('premCI_' + incSel);
  
  const hSel = document.getElementById('cusHealth').value;
  if (hSel !== '0') total += num('premH_' + hSel);
  
  if (document.getElementById('cusAsset').checked) total += num('premAsset');
  if (document.getElementById('cusEdu').checked) total += num('premEdu');
  
  document.getElementById('totalCustomPremium').innerText = fmt(total);
  
  // 15% Rule
  const incYear = num('incomeMain') * 12;
  const pctStr = document.getElementById('percentPremium');
  const bar = document.getElementById('percentBar');
  const stat = document.getElementById('percentStatus');
  
  if (incYear > 0) {
    const pct = (total / incYear) * 100;
    pctStr.innerText = pct.toFixed(1) + '%';
    bar.style.width = Math.min(pct, 100) + '%';
    
    if (pct <= 15) {
      bar.style.background = '#22c55e'; // Green
      stat.innerText = 'เหมาะสม';
      stat.style.background = 'rgba(34,197,94,0.2)';
      stat.style.color = '#107c41';
    } else if (pct <= 20) {
      bar.style.background = '#eab308'; // Yellow
      stat.innerText = 'ค่อนข้างสูง';
      stat.style.background = 'rgba(234,179,8,0.2)';
      stat.style.color = '#b8860b';
    } else {
      bar.style.background = '#ef4444'; // Red
      stat.innerText = 'สูงเกินไป ควรปรึกษาตัวแทน';
      stat.style.background = 'rgba(239,68,68,0.2)';
      stat.style.color = '#b91c1c';
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
    document.getElementById('incomeProtCalc').innerHTML = inc > 0 ? 
      `เงินสำรองฉุกเฉิน 3-6 เดือน: <strong>${fmt(inc * 3)} - ${fmt(inc * 6)}</strong> บาท<br>ทุนประกันโรคร้ายแรง (ชดเชย 5 ปี): <strong>${fmt(inc * 12 * 5)}</strong> บาท` 
      : 'กรุณากรอกรายได้ในหน้า Personal Profile';
  }
  if (idx === 3) calcAssets();
  if (idx === 5) computeRetirement();
  if (idx === 7) {
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
        html += '<th style="padding:10px; text-align:center; border-bottom:2px solid rgba(0,0,0,0.1); color:#f59e0b;">'+w.emoji+' สวัสดิการปัจจุบัน</th>';
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
  if (idx === 11) computeAgentSummary();
  if (idx === 12) calcCustomPremium();
}

// --- Submit ---
function submitToGoogleSheets() {
  const btn = document.getElementById('btnSubmitData');
  const stat = document.getElementById('submitStatus');
  btn.innerText = 'กำลังบันทึก...';
  btn.disabled = true;
  
  // Gather Data
  const payload = {
    ClientName: document.getElementById('clientName').value,
    ClientAge: document.getElementById('clientAge').value,
    MonthlyIncome: num('incomeMain'),
    FamilyMode: currentFamilyMode,
    TotalAssets: num('totalAsset') || 0,
    TotalLiabilities: num('totalLiability') || 0,
    TotalEducationCost: totalEduMaxGlobal,
    RetireMonthlyGoal: num('retireMonthly'),
    PoliciesCount: policies.length,
    FinalPremiumSelected: num('totalCustomPremium'),
    PremiumPercentOfIncome: document.getElementById('percentPremium').innerText,
  };

  fetch('https://script.google.com/macros/s/AKfycbxyz.../exec', { // Replace with actual URL
    method: 'POST', mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then(() => {
    btn.innerText = '✅ บันทึกข้อมูลสำเร็จ!';
    stat.innerHTML = '<span style="color:#107c41;">ส่งข้อมูลเข้า Google Sheets เรียบร้อยแล้ว</span>';
  }).catch(e => {
    btn.innerText = '❌ เกิดข้อผิดพลาด';
    stat.innerHTML = '<span style="color:var(--aia-red);">ไม่สามารถส่งข้อมูลได้: ' + e + '</span>';
  });
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
