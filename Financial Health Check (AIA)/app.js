// ============ APP — RENDER ALL SLIDES ============

const container = document.getElementById('slidesContainer');

function formatNumberInput(el) {
  if (!el || !el.value) return;
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
      ${selCard('gender', 'male', '👨', 'ชาย', '', false)}
      ${selCard('gender', 'female', '👩', 'หญิง', '', false)}
    </div>

    <div class="form-label">สถานะครอบครัว ${pri('must')}</div>
    <div class="select-cards select-cards-h" id="familyCards">
      ${selCard('family', 'children', '👨‍👩‍👧', 'คนมีครอบครัว/บุตร', '', false)}
      ${selCard('family', 'single', '👤', 'คนยังไม่แต่งงาน/โสด', '', false)}
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

// ===== SLIDE 2: FINANCIAL PLANS (PYRAMID) =====
container.appendChild(createSlide(2, `
  <div class="glass-card" style="width:100%; max-width:1200px; padding:32px;">
    <div style="text-align:center; margin-bottom:24px;">
      <div class="browser-badge" style="display:inline-flex; background:var(--aia-blue);"><span class="browser-badge-num" style="color:var(--aia-blue);">2</span> Financial Plans - สารบัญการวางแผน</div>
    </div>
    
    <div class="pyramid-container">
      <div class="pyramid-stack-wrapper">
        <div class="pyramid-tax-arrow" onclick="goToSlide(10)" style="cursor:pointer;">
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
          <div class="pyramid-layer layer-b" onclick="goToSlide(4)" style="cursor:pointer;">
            <div class="pyramid-heading">Saving</div>
            <div class="pyramid-sub">ออมเงินเพื่อเป้าหมาย</div>
          </div>
          <div class="pyramid-layer layer-c">
            <div class="pyramid-heading">Protection</div>
            <div class="pyramid-sub">ปกป้องเป้าหมาย</div>
          </div>
        </div>
      </div>
      
      <div class="pyramid-details" style="position:relative;">
        <!-- Goal-based cards connected from Saving tier -->
        <div style="margin-bottom:16px;">
          <div style="font-size:0.8rem; font-weight:700; color:#f9a825; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:10px; display:flex; align-items:center; gap:6px;">
            <span style="width:20px; height:2px; background:#f9a825; display:inline-block;"></span>
            เป้าหมายทางการเงิน (Saving Goals)
          </div>
          
          <!-- Short-term -->
          <div style="margin-bottom:12px;">
            <div style="font-size:0.75rem; font-weight:600; color:var(--text-muted); margin-bottom:6px;">ระยะสั้น</div>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              <div style="padding:8px 14px; background:rgba(255,255,255,0.5); border:1px solid rgba(0,0,0,0.05); border-radius:10px; font-size:0.85rem; display:flex; align-items:center; gap:6px; color:var(--text-secondary);">🛍️ ช้อปปิ้ง</div>
              <div style="padding:8px 14px; background:rgba(255,255,255,0.5); border:1px solid rgba(0,0,0,0.05); border-radius:10px; font-size:0.85rem; display:flex; align-items:center; gap:6px; color:var(--text-secondary);">✈️ ท่องเที่ยว</div>
              <div style="padding:8px 14px; background:rgba(255,255,255,0.5); border:1px solid rgba(0,0,0,0.05); border-radius:10px; font-size:0.85rem; display:flex; align-items:center; gap:6px; color:var(--text-secondary);">💍 แต่งงาน</div>
            </div>
          </div>

          <!-- Mid-term (highlighted with aura) -->
          <div style="margin-bottom:12px; position:relative;">
            <div style="font-size:0.75rem; font-weight:600; color:#e08f1f; margin-bottom:6px;">ระยะกลาง ✨</div>
            <div style="display:flex; gap:8px; flex-wrap:wrap; position:relative; z-index:1;">
              <div onclick="goToSlide(3)" style="cursor:pointer; padding:10px 16px; background:linear-gradient(135deg, rgba(249,168,37,0.12), rgba(249,168,37,0.04)); border:1.5px solid rgba(249,168,37,0.3); border-radius:12px; font-size:0.85rem; display:flex; align-items:center; gap:6px; color:var(--text-primary); font-weight:600; box-shadow:0 0 20px rgba(249,168,37,0.15);">🏠 ทรัพย์สิน บ้าน รถ</div>
              <div style="padding:10px 16px; background:linear-gradient(135deg, rgba(249,168,37,0.12), rgba(249,168,37,0.04)); border:1.5px solid rgba(249,168,37,0.3); border-radius:12px; font-size:0.85rem; display:flex; align-items:center; gap:6px; color:var(--text-primary); font-weight:600; box-shadow:0 0 20px rgba(249,168,37,0.15);">💼 สร้างธุรกิจ</div>
            </div>
          </div>

          <!-- Long-term (highlighted with aura) -->
          <div style="margin-bottom:12px;">
            <div style="font-size:0.75rem; font-weight:600; color:#d21145; margin-bottom:6px;">ระยะยาว ✨</div>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              <div onclick="goToSlide(5)" style="cursor:pointer; padding:10px 16px; background:linear-gradient(135deg, rgba(210,17,69,0.1), rgba(210,17,69,0.03)); border:1.5px solid rgba(210,17,69,0.25); border-radius:12px; font-size:0.85rem; display:flex; align-items:center; gap:6px; color:var(--text-primary); font-weight:600; box-shadow:0 0 20px rgba(210,17,69,0.12);" id="savEduBox">🎓 <span id="savEduText">ทุนการศึกษา</span></div>
              <div onclick="goToSlide(4)" style="cursor:pointer; padding:10px 16px; background:linear-gradient(135deg, rgba(210,17,69,0.1), rgba(210,17,69,0.03)); border:1.5px solid rgba(210,17,69,0.25); border-radius:12px; font-size:0.85rem; display:flex; align-items:center; gap:6px; color:var(--text-primary); font-weight:600; box-shadow:0 0 20px rgba(210,17,69,0.12);">🏖️ เกษียณ</div>
              <div onclick="goToSlide(6)" style="cursor:pointer; padding:10px 16px; background:linear-gradient(135deg, rgba(210,17,69,0.1), rgba(210,17,69,0.03)); border:1.5px solid rgba(210,17,69,0.25); border-radius:12px; font-size:0.85rem; display:flex; align-items:center; gap:6px; color:var(--text-primary); font-weight:600; box-shadow:0 0 20px rgba(210,17,69,0.12);">🧓 ดูแลผู้สูงอายุ</div>
            </div>
          </div>
        </div>

        <!-- Protection shield overlay -->
        <div style="background:linear-gradient(135deg, rgba(16,124,65,0.08), rgba(16,124,65,0.02)); border:1.5px solid rgba(16,124,65,0.2); border-radius:16px; padding:14px 16px; display:flex; align-items:center; gap:14px; margin-bottom:12px;">
          <div style="flex-shrink:0;">
            <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
              <path d="M20 4 L8 10 L8 22 C8 30 13 36 20 38 C27 36 32 30 32 22 L32 10 Z" stroke="#107c41" stroke-width="2" fill="rgba(16,124,65,0.12)" stroke-linejoin="round"/>
              <path d="M14 20 L18 24 L26 16" stroke="#107c41" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div>
            <div style="font-size:0.85rem; font-weight:700; color:#107c41;">แผนปกป้องเป้าหมายทั้งหมด</div>
            <div style="font-size:0.78rem; color:var(--text-secondary); margin-top:2px;">คุ้มครองทุกเป้าหมายข้างต้น ไม่ว่าจะเกิดอะไรขึ้น เป้าหมายยังอยู่</div>
          </div>
        </div>

        <!-- Tax Planning highlight -->
        <div onclick="goToSlide(10)" style="cursor:pointer; background:linear-gradient(135deg, rgba(210,17,69,0.08), rgba(210,17,69,0.02)); border:1.5px solid rgba(210,17,69,0.2); border-radius:12px; padding:12px 16px; display:flex; align-items:center; gap:10px; box-shadow:0 0 15px rgba(210,17,69,0.1);">
          <span style="font-size:1.3rem;">📋</span>
          <div>
            <div style="font-size:0.85rem; font-weight:700; color:var(--aia-red);">Tax Planning วางแผนภาษี</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">ใช้สิทธิลดหย่อนให้คุ้มค่า ➡️</div>
          </div>
        </div>
      </div>
    </div>
  </div>
`));

// ===== SLIDE 3: ASSET & LIABILITIES =====
container.appendChild(createSlide(3, `
  <div class="glass-card">
    ${secHdr('3', 'แผนปกป้องทรัพย์สิน (Asset & Liabilities)')}
    <p class="slide-subtitle">ประเมินมูลค่าทรัพย์สินและหนี้สินที่ต้องเตรียมแผนปกป้อง</p>
    
    <div id="assetList" style="display:flex; flex-direction:column; gap:12px; margin-bottom:16px;">
      <div style="display:flex; gap:12px; align-items:center;">
        <input type="text" class="form-input" style="flex:2;" value="บ้าน / ที่อยู่อาศัย">
        <input type="text" class="form-input asset-val" style="flex:2;" placeholder="มูลค่า (บาท)" oninput="formatNumberInput(this); calcAssets()">
        <label class="form-input" style="flex:1; display:flex; align-items:center; gap:6px;"><input type="radio" name="ast1" class="asset-type" value="asset" onchange="calcAssets()"> ทรัพย์สิน</label>
        <label class="form-input" style="flex:1; display:flex; align-items:center; gap:6px;"><input type="radio" name="ast1" class="asset-type" value="liability" checked onchange="calcAssets()"> หนี้สิน</label>
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

// ===== SLIDE 4: RETIREMENT =====
container.appendChild(createSlide(4, `
  <div class="glass-card" style="max-width:1100px;">
    ${secHdr('4', 'RETIREMENT (เกษียณอายุ)')}
    <p class="slide-subtitle">การวางแผนระยะยาว พร้อมคำนวณอัตราเงินเฟ้อ (Future Value)</p>
    
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:24px;">
      <div>
        <div class="form-label" style="font-weight:700; color:var(--aia-blue); margin-bottom:12px;">🏖️ อายุที่คาดว่าจะเกษียณ</div>
        <div style="display:flex; align-items:center; gap:16px;">
          <input type="range" id="retireAge" min="40" max="75" step="1" value="60" oninput="document.getElementById('retireAgeDisplay').textContent=this.value; computeRetirement();" style="flex:1; accent-color:var(--aia-blue); height:8px;">
          <div style="min-width:60px; text-align:right; font-size:1.2rem; font-weight:800; color:var(--aia-blue);"><span id="retireAgeDisplay">60</span> ปี</div>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--text-muted); margin-top:4px;">
          <span>40 ปี</span><span>75 ปี</span>
        </div>
      </div>
      <div>
        <div class="form-label" style="font-weight:700; color:var(--aia-blue); margin-bottom:12px;">⏳ อายุขัย (ปี)</div>
        <div style="display:flex; align-items:center; gap:16px;">
          <input type="range" id="retireLifeExp" min="60" max="100" step="1" value="85" oninput="document.getElementById('retireLifeExpDisplay').textContent=this.value; computeRetirement();" style="flex:1; accent-color:var(--aia-blue); height:8px;">
          <div style="min-width:60px; text-align:right; font-size:1.2rem; font-weight:800; color:var(--aia-blue);"><span id="retireLifeExpDisplay">85</span> ปี</div>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--text-muted); margin-top:4px;">
          <span>60 ปี</span><span>100 ปี</span>
        </div>
      </div>
    </div>

    <div style="margin-bottom:24px;">
      <div class="form-label" style="font-weight:700; color:var(--aia-blue); margin-bottom:12px;">💰 เป้าหมายค่าใช้จ่ายต่อเดือน ณ วันนี้</div>
      <div style="display:flex; align-items:center; gap:16px;">
        <input type="range" id="retireMonthly" min="0" max="100000" step="1000" value="0" oninput="document.getElementById('retireMonthlyDisplay').textContent=fmt(this.value); computeRetirement();" style="flex:1; accent-color:var(--aia-blue); height:8px;">
        <div style="min-width:120px; text-align:right; font-size:1.2rem; font-weight:800; color:var(--aia-blue);"><span id="retireMonthlyDisplay">0</span> บาท</div>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--text-muted); margin-top:4px;">
        <span>0</span><span>50,000</span><span>100,000</span>
      </div>
    </div>
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

// ===== SLIDE 5: EDUCATION SELECTION =====
container.appendChild(createSlide(5, `
  <div class="glass-card">
    ${secHdr('5', 'ทุนการศึกษา (Education Selection)')}
    <p class="slide-subtitle">ระดับการศึกษาที่ต้องการวางแผนให้บุตร (ข้ามได้หากไม่มีบุตร)</p>
    
    <div class="form-label" style="color:var(--aia-blue); margin-top:8px;">🏫 ระดับโรงเรียน</div>
    <div style="margin-bottom:16px;">
      <div class="form-label" style="font-weight:600; margin-bottom:8px;">จำนวนปีที่ต้องเรียน (รวมลูกทุกคน)</div>
      <div style="display:flex; align-items:center; gap:16px;">
        <input type="range" id="eduSchoolYears" min="0" max="24" step="1" value="0" oninput="document.getElementById('eduSchoolYearsDisplay').textContent=this.value; calcEducation();" style="flex:1; accent-color:var(--aia-blue); height:8px;">
        <div style="min-width:60px; text-align:right; font-size:1.1rem; font-weight:700; color:var(--aia-blue);"><span id="eduSchoolYearsDisplay">0</span> ปี</div>
      </div>
    </div>
    <div id="schoolTierCards" style="margin-bottom:16px;">
      ${SCHOOL_TIERS.map((t, i) => `
        <div class="tier-card tier-card-sch" data-tier="${t.id}" data-price="${t.priceNum}" data-pricemin="${t.priceMin}" data-pricemax="${t.priceMax}" onclick="selectTierGroup(this, 'sch'); calcEducation();">
          <div class="tier-header">
            <span class="tier-name">${t.name}</span>
            <span class="tier-price">${t.price}</span>
          </div>
          <div class="tier-hospitals">${t.examples}</div>
        </div>
      `).join('')}
    </div>

    <div class="form-label" style="color:var(--aia-blue); margin-top:16px;">🎓 ระดับมหาวิทยาลัย</div>
    <div style="margin-bottom:16px;">
      <div class="form-label" style="font-weight:600; margin-bottom:8px;">จำนวนปีที่ต้องเรียน (รวมลูกทุกคน)</div>
      <div style="display:flex; align-items:center; gap:16px;">
        <input type="range" id="eduUniYears" min="0" max="12" step="1" value="0" oninput="document.getElementById('eduUniYearsDisplay').textContent=this.value; calcEducation();" style="flex:1; accent-color:var(--aia-blue); height:8px;">
        <div style="min-width:60px; text-align:right; font-size:1.1rem; font-weight:700; color:var(--aia-blue);"><span id="eduUniYearsDisplay">0</span> ปี</div>
      </div>
    </div>
    <div id="uniTierCards" style="margin-bottom:16px;">
      ${UNI_TIERS.map((t, i) => `
        <div class="tier-card tier-card-uni" data-tier="${t.id}" data-price="${t.priceNum}" data-pricemin="${t.priceMin}" data-pricemax="${t.priceMax}" onclick="selectTierGroup(this, 'uni'); calcEducation();">
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

// ===== SLIDE 6: PARENT CARE PROTECTION =====
container.appendChild(createSlide(6, `
  <div class="glass-card" style="max-width:1100px;">
    ${secHdr('6', 'แผนปกป้องคุณภาพชีวิตบุพการี')}
    <p class="slide-subtitle">ประเมินภาระค่าใช้จ่ายที่ต้องดูแลพ่อแม่ และวางแผนรองรับ</p>
    
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:24px;">
      <div>
        <div class="form-label" style="font-weight:700; color:var(--aia-blue); margin-bottom:12px;">💰 เงินสนับสนุนที่ส่งให้ที่บ้าน / เดือน</div>
        <div style="display:flex; align-items:center; gap:16px;">
          <input type="range" id="parentMonthly" min="0" max="100000" step="1000" value="0" oninput="calcParentCare()" style="flex:1; accent-color:var(--aia-blue); height:8px;">
          <div style="min-width:120px; text-align:right; font-size:1.2rem; font-weight:800; color:var(--aia-blue);" id="parentMonthlyDisplay">0</div>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--text-muted); margin-top:4px;">
          <span>0</span><span>50,000</span><span>100,000</span>
        </div>
      </div>
      <div>
        <div class="form-label" style="font-weight:700; color:var(--aia-blue); margin-bottom:12px;">📅 ระยะเวลาที่คาดว่าต้องดูแล (ปี)</div>
        <div style="display:flex; align-items:center; gap:16px;">
          <input type="range" id="parentYears" min="0" max="40" step="1" value="0" oninput="calcParentCare()" style="flex:1; accent-color:var(--aia-blue); height:8px;">
          <div style="min-width:80px; text-align:right; font-size:1.2rem; font-weight:800; color:var(--aia-blue);" id="parentYearsDisplay">0 ปี</div>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--text-muted); margin-top:4px;">
          <span>0 ปี</span><span>20 ปี</span><span>40 ปี</span>
        </div>
      </div>
    </div>

    <div class="form-label" style="font-weight:700; margin-bottom:12px;">🏥 สิทธิการรักษาพยาบาลของพ่อแม่</div>
    <div class="select-cards select-cards-h" id="parentWelfareCards" style="margin-bottom:24px;">
      ${selCard('parentWelfare', 'goldcard', '💳', 'บัตรทอง', 'หลักประกันสุขภาพถ้วนหน้า', true)}
      ${selCard('parentWelfare', 'govParent', '💼', 'ข้าราชการ', 'สวัสดิการกรมบัญชีกลาง', false)}
      ${selCard('parentWelfare', 'socialParent', '🔵', 'ประกันสังคม', 'สิทธิพนักงานเอกชน', false)}
      ${selCard('parentWelfare', 'privateParent', '💎', 'ประกันส่วนตัว', 'มีประกันสุขภาพเอกชน', false)}
    </div>

    <div class="gap-section" style="margin-top:16px; background:rgba(10,117,187,0.05); border-color:rgba(10,117,187,0.2);">
      <h3 style="color:var(--aia-blue);">💡 เงินก้อนสำหรับดูแลผู้สูงอายุ</h3>
      <div id="parentCareCalcResult" style="font-size:1.2rem; color:var(--aia-red); font-weight:800;">
        รวม 0 ปี: 0 บาท
      </div>
      <div style="font-size:0.82rem; color:var(--text-secondary); margin-top:6px;">สูตร: (เงินรายเดือน × 12) × จำนวนปี</div>
    </div>

    <div id="parentHealthWarning" style="margin-top:20px; padding:20px; background:rgba(234,179,8,0.08); border:1px solid rgba(234,179,8,0.2); border-radius:16px;">
      <div style="font-weight:700; color:#b8860b; margin-bottom:8px; font-size:1rem;">⚠️ ข้อสังเกตเพิ่มเติมเพื่อแผนการเงินที่สมบูรณ์</div>
      <div style="font-size:0.9rem; color:var(--text-primary); line-height:1.7;" id="parentWarningText">
        แม้ปัจจุบันคุณจะจัดการความเสี่ยงเรื่องเงินก้อนสำหรับดูแลผู้สูงอายุเรียบร้อยแล้ว แต่จากสิทธิการรักษา <strong style="color:var(--aia-red);">บัตรทอง</strong> ของพ่อแม่ ระบบพบว่าคุณยังมีความเสี่ยงเรื่อง<strong>ค่ารักษาพยาบาลที่ควบคุมไม่ได้ในอนาคต</strong> ควรพิจารณาวางแผนประกันสุขภาพเพิ่มเมื่อสภาพคล่องพร้อม เพื่อป้องกันไม่ให้ค่าหมอมากระทบเงินออมส่วนตัวของคุณ
      </div>
    </div>
  </div>
`));

// ===== SLIDE 7: WELFARE SELECTION =====
container.appendChild(createSlide(7, `
  <div class="glass-card">
    ${secHdr('7', 'WELFARE Selection')}
    <p class="slide-subtitle">สวัสดิการพื้นฐานของลูกค้า</p>
    <div class="select-cards" id="welfareCards">
      ${selCard('welfare', 'social33', '🔵', 'ประกันสังคม', 'สวัสดิการพนักงานเอกชน', true)}
      ${selCard('welfare', 'gov', '💼', 'ข้าราชการ', 'สวัสดิการกรมบัญชีกลาง', false)}
      ${selCard('welfare', 'gold', '💳', 'บัตรทอง', 'หลักประกันสุขภาพถ้วนหน้า', false)}
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
    <p class="slide-subtitle">เลือกระดับโรงพยาบาลที่ต้องการเข้าใช้บริการ</p>
    
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:20px; margin-bottom:24px;">
      <div class="tier-card tier-card-plan selected" data-plan-id="economy" onclick="selectTierGroup(this, 'plan')" style="border-top:5px solid var(--aia-blue); padding:28px 24px;">
        <div style="font-size:2rem; margin-bottom:10px;">✈️ Economy Class</div>
        <div style="font-weight:700; color:var(--aia-blue); margin-bottom:12px; font-size:1.05rem;">"เน้นความคุ้มค่า ครอบคลุม รพ. มาตรฐานดี"</div>
        <div style="background:rgba(10,117,187,0.05); padding:14px; border-radius:10px; margin-bottom:14px;">
          <div style="font-weight:800; font-size:1.1rem; color:var(--text-primary); margin-bottom:8px;">ค่าห้องเริ่มต้น: ~4,000 บ./คืน</div>
          <div style="font-size:1rem; font-weight:600; color:var(--aia-blue); line-height:1.6;">รพ. วิภาวดี, สินแพทย์, เกษมราษฎร์, เปาโล, ไทยนครินทร์</div>
        </div>
      </div>

      <div class="tier-card tier-card-plan" data-plan-id="business" onclick="selectTierGroup(this, 'plan')" style="border-top:5px solid #7c3aed; padding:28px 24px;">
        <div style="font-size:2rem; margin-bottom:10px;">🌟 Business Class</div>
        <div style="font-weight:700; color:#7c3aed; margin-bottom:12px; font-size:1.05rem;">"เน้นสะดวกสบาย เข้า รพ. ชื่อดังในเมือง"</div>
        <div style="background:rgba(124,58,237,0.05); padding:14px; border-radius:10px; margin-bottom:14px;">
          <div style="font-weight:800; font-size:1.1rem; color:var(--text-primary); margin-bottom:8px;">ค่าห้องเริ่มต้น: ~8,000 บ./คืน</div>
          <div style="font-size:1rem; font-weight:600; color:#7c3aed; line-height:1.6;">รพ. พระราม 9, นนทเวช, วิชัยยุทธ, พญาไท 1/3</div>
        </div>
      </div>

      <div class="tier-card tier-card-plan" data-plan-id="first" onclick="selectTierGroup(this, 'plan')" style="border-top:5px solid var(--aia-red); padding:28px 24px;">
        <div style="font-size:2rem; margin-bottom:10px;">👑 First Class</div>
        <div style="font-weight:700; color:var(--aia-red); margin-bottom:12px; font-size:1.05rem;">"พรีเมียมที่สุด เข้า รพ. ระดับท็อปไร้กังวล"</div>
        <div style="background:rgba(210,17,69,0.05); padding:14px; border-radius:10px; margin-bottom:14px;">
          <div style="font-weight:800; font-size:1.1rem; color:var(--text-primary); margin-bottom:8px;">ค่าห้องเริ่มต้น: ~12,000 บ./คืน</div>
          <div style="font-size:1rem; font-weight:600; color:var(--aia-red); line-height:1.6;">รพ. กรุงเทพ (HQ), พญาไท 2, สมิติเวช, ธนบุรี 1</div>
        </div>
      </div>
    </div>

    <details style="background:rgba(0,0,0,0.02); border:1px solid rgba(0,0,0,0.06); border-radius:12px; padding:4px 16px; margin-bottom:12px;">
      <summary style="cursor:pointer; padding:12px 0; font-weight:600; font-size:0.9rem; color:var(--text-secondary); list-style:none; display:flex; align-items:center; gap:8px;">
        📊 ดูข้อมูลค่ารักษาพยาบาลเฉลี่ย (Standard Price) ▸
      </summary>
      <div style="font-size:0.8rem; line-height:1.7; padding:8px 0 12px; color:var(--text-secondary); display:grid; grid-template-columns:1fr 1fr; gap:8px 24px;">
        <div style="break-inside:avoid;"><strong>🔹 ป่วยทั่วไป</strong><br>• ไข้หวัดใหญ่/RSV: ~55,000<br>• ไข้เลือดออก: ~45,000<br>• ลำไส้อักเสบ: ~40,000</div>
        <div style="break-inside:avoid;"><strong>🔹 ผ่าตัดทั่วไป</strong><br>• ไส้ติ่ง: ~150,000<br>• นิ่วในถุงน้ำดี: ~180,000<br>• ริดสีดวง: ~80,000</div>
        <div style="break-inside:avoid;"><strong>🔹 ผ่าตัดใหญ่/หัวใจ</strong><br>• บายพาสหัวใจ: ~750,000<br>• เปลี่ยนข้อเข่า: ~320,000<br>• CAG: ~85,000</div>
        <div style="break-inside:avoid;"><strong>🔹 มะเร็ง (High-Cost)</strong><br>• ยามุ่งเป้า: ~1,750,000/คอร์ส<br>• คีโม: ~35k-100k/ครั้ง<br>• รังสีพิเศษ: ~150k-190k</div>
        <div style="break-inside:avoid; grid-column:span 2;"><strong>🔹 อุบัติเหตุ/ICU</strong><br>• ผ่าตัดสมอง: ~550k-850k • ห้อง ICU: ~20k-50k/คืน • Evacuation: ~270k-400k</div>
      </div>
    </details>

    <div style="background:rgba(0,0,0,0.02); border:1px solid rgba(0,0,0,0.06); border-radius:12px; padding:12px 16px; display:flex; align-items:center; gap:12px;">
      <span style="font-size:1.2rem;">📈</span>
      <div style="font-size:0.85rem; color:var(--text-secondary);">
        <strong style="color:var(--text-primary);">เงินเฟ้อค่ารักษาพยาบาล ~10.8%/ปี</strong> — สูงกว่าเงินเฟ้อทั่วไป (0.7%) เกือบ 15 เท่า ค่ารักษาจะเพิ่มขึ้นเท่าตัวในทุก 7-8 ปี
      </div>
    </div>
  </div>
`));

// ===== SLIDE 10: TAX CALCULATOR =====
container.appendChild(createSlide(10, `
  <div class="glass-card" style="max-width:1100px;">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
      ${secHdr('10', 'TAX PLANNING — วางแผนภาษีเงินได้')}
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


// ===== SLIDE 11: POLICY AUDIT INPUT =====
container.appendChild(createSlide(11, `
  <div class="glass-card" style="max-width:1100px;">
    ${secHdr('11', 'POLICY AUDIT — บันทึกกรมธรรม์เดิม')}
    <p class="slide-subtitle">วิเคราะห์สวัสดิการเดิมและหา Gap อย่างละเอียด (Digital Policy Audit)</p>
    
    <div id="policyFormArea" style="background:rgba(255,255,255,0.4); padding:24px; border-radius:12px; border:1px dashed var(--aia-blue);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <h3 style="color:var(--aia-blue); margin:0;">📋 FA Policy Audit Sheet</h3>
      </div>
      
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px;">
        ${inp('polClientName', 'ชื่อลูกค้า', '', 'text')}
        ${inp('polNo', 'เลขกรมธรรม์', '', 'text')}
      </div>

      <div class="form-label" style="font-weight:700; margin-bottom:12px; color:var(--aia-blue); border-bottom:1px solid rgba(0,0,0,0.1); padding-bottom:4px;">1. สถานะและการชำระเบี้ย (Policy Status)</div>
      
      <div style="display:grid; grid-template-columns:1fr; gap:12px; margin-bottom:16px; background:rgba(0,0,0,0.02); padding:16px; border-radius:8px;">
        <div style="font-weight:600; font-size:0.9rem; margin-bottom:8px;">สถานะ (เลือก 1 ข้อ):</div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <label style="display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="radio" name="pStatus" value="คุ้มครองอยู่" checked onchange="togglePolStatus()"> 🟢 คุ้มครองอยู่</label>
            <div style="display:flex; align-items:center; gap:8px;">
                <label style="display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="radio" name="pStatus" value="ขาดต่อ" onchange="togglePolStatus()"> 🔴 ขาดต่อ (Lapse)</label>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
                <label style="display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="radio" name="pStatus" value="ใช้เงินสำเร็จ" onchange="togglePolStatus()"> 🟡 ใช้เงินสำเร็จ (Paid-up)</label>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
                <label style="display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="radio" name="pStatus" value="ขยายเวลา" onchange="togglePolStatus()"> 🟠 ขยายเวลา (Extended Term)</label>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
                <label style="display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="radio" name="pStatus" value="กู้เบี้ยอัตโนมัติ" onchange="togglePolStatus()"> 🔵 กู้เบี้ยอัตโนมัติ (APL)</label>
            </div>
        </div>
        
        <div id="polStatusDetails" style="margin-top:12px; display:grid; grid-template-columns:1fr 1fr; gap:12px; padding-top:12px; border-top:1px dashed rgba(0,0,0,0.1);">
            <div id="statLapse" style="display:none; grid-column:span 2; gap:12px; grid-template-columns:1fr 1fr;">
                <input type="text" class="form-input" id="polLapseDate" placeholder="ขาดตั้งแต่วันที่ (เช่น 01/01/2026)">
                <input type="text" class="form-input" id="polLapseAmount" placeholder="ยอดชำระเพื่อต่ออายุ (บาท)" oninput="formatNumberInput(this)">
            </div>
            <div id="statPaidUp" style="display:none; grid-column:span 2;">
                <input type="text" class="form-input" id="polPaidUpSA" placeholder="หยุดจ่าย/ทุนชีวิตลดเหลือ (บาท)" oninput="formatNumberInput(this)">
            </div>
            <div id="statExtended" style="display:none; grid-column:span 2;">
                <input type="text" class="form-input" id="polExtendedYear" placeholder="หยุดจ่าย/ทุนเท่าเดิม/คุ้มครองถึงปี พ.ศ.">
            </div>
            <div id="statAPL" style="display:none; grid-column:span 2; gap:12px; grid-template-columns:1fr 1fr;">
                <input type="text" class="form-input" id="polAPLDebt" placeholder="หนี้กู้เบี้ยสะสม (บาท)" oninput="formatNumberInput(this)">
                <input type="text" class="form-input" id="polAPLInterest" placeholder="ดอกเบี้ย (%)">
            </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; margin-top:16px;">
            ${inp('polNextDueDate', 'งวดถัดไป (วันที่)', 'เช่น 15/08/2026', 'text')}
            ${inp('polPremium', 'ยอดเบี้ย (บาท)', '', 'number')}
            <div class="form-group">
                <div class="form-label">รายงวด</div>
                <select class="form-input" id="polPayFreq">
                    <option value="ปี">ปี</option>
                    <option value="6 เดือน">6 เดือน</option>
                    <option value="3 เดือน">3 เดือน</option>
                    <option value="เดือน">เดือน</option>
                </select>
            </div>
        </div>
        
        <div style="margin-top:12px;">
            <div style="font-weight:600; font-size:0.9rem; margin-bottom:8px;">ช่องทางชำระ:</div>
            <div style="display:flex; gap:16px;">
                <label style="display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="radio" name="pChannel" value="หักบัญชี" checked> หักบัญชี</label>
                <label style="display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="radio" name="pChannel" value="หักบัตร"> หักบัตร</label>
                <label style="display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="radio" name="pChannel" value="เงินสด"> เงินสด</label>
            </div>
        </div>
      </div>

      <div class="form-label" style="font-weight:700; margin-bottom:12px; color:var(--aia-blue); border-bottom:1px solid rgba(0,0,0,0.1); padding-bottom:4px;">2. ข้อมูลสัญญาหลัก</div>
      <div style="display:grid; grid-template-columns:1fr; gap:12px; margin-bottom:16px; background:rgba(0,0,0,0.02); padding:16px; border-radius:8px;">
          ${inp('polName', 'ชื่อแบบประกันทางการ', '', 'text')}
          <div style="margin-top:8px;">
            <div style="font-weight:600; font-size:0.9rem; margin-bottom:8px;">ประเภท:</div>
            <div style="display:flex; gap:16px; flex-wrap:wrap;">
                <label style="display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="radio" name="pType" value="ตลอดชีพ" checked onchange="togglePolType()"> ตลอดชีพ</label>
                <label style="display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="radio" name="pType" value="ชั่วระยะเวลา" onchange="togglePolType()"> ชั่วระยะเวลา</label>
                <label style="display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="radio" name="pType" value="สะสมทรัพย์" onchange="togglePolType()"> สะสมทรัพย์</label>
                <label style="display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="radio" name="pType" value="บำนาญ" onchange="togglePolType()"> บำนาญ</label>
                <label style="display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="radio" name="pType" value="ควบการลงทุน" onchange="togglePolType()"> ควบการลงทุน</label>
            </div>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:8px;">
              ${inp('polPayYears', 'ระยะเวลาส่งเบี้ย (ปี)', '', 'number')}
              ${inp('polCoverYears', 'คุ้มครองถึงปี พ.ศ. (หรืออายุ)', '', 'text')}
          </div>
          <div style="display:grid; grid-template-columns:1fr; gap:12px; margin-top:8px;">
              ${inp('polSumAssured', 'ทุนประกันชีวิต (บาท)', '', 'number')}
          </div>
          <div style="margin-top:8px; padding:12px; border:1px dashed rgba(0,0,0,0.1); border-radius:8px;">
              <div style="font-weight:600; font-size:0.9rem; margin-bottom:8px;">ผลประโยชน์คืนเงิน:</div>
              <div id="polCbPeriodicFields" style="display:none; gap:8px; align-items:center; flex-wrap:wrap; margin-bottom:8px;">
                  ปีที่ <input type="number" class="form-input" id="polCbStart" style="width:70px; padding:4px;"> 
                  ถึง <input type="number" class="form-input" id="polCbEnd" style="width:70px; padding:4px;"> 
                  คืนครั้งละ <input type="text" class="form-input" id="polCbAmount" style="width:160px; padding:4px;" placeholder="เช่น 2,000 - 5,000"> บาท
              </div>
              <div style="display:flex; gap:8px; align-items:center;">
                  จบสัญญาได้ <input type="text" class="form-input" id="polMaturityAmount" style="width:150px; padding:4px;" oninput="formatNumberInput(this)"> บาท
              </div>
          </div>
      </div>

      <div class="form-label" style="font-weight:700; margin-bottom:12px; color:var(--aia-blue); border-bottom:1px solid rgba(0,0,0,0.1); padding-bottom:4px;">3. สัญญาเพิ่มเติม (Riders)</div>
      
      <!-- Health -->
      <div style="margin-bottom:16px; background:rgba(0,0,0,0.02); padding:16px; border-radius:8px;">
          <div style="font-weight:700; color:#107c41; margin-bottom:8px;">🏥 ประกันสุขภาพ (Health)</div>
          ${inp('polHealthName', 'ชื่อแบบ', '', 'text')}
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:12px;">
              <div>
                  <div style="font-size:0.85rem; font-weight:600; margin-bottom:6px;">รูปแบบ (Lump sum/Category):</div>
                  <select class="form-input" id="polHealthType1">
                      <option value="-">-</option>
                      <option value="เหมาจ่าย">เหมาจ่าย</option>
                      <option value="แยกหมวด">แยกหมวด</option>
                  </select>
              </div>
              <div>
                  <div style="font-size:0.85rem; font-weight:600; margin-bottom:6px;">รูปแบบ (Time/Year):</div>
                  <select class="form-input" id="polHealthType2">
                      <option value="-">-</option>
                      <option value="ต่อครั้ง">ต่อครั้ง</option>
                      <option value="ต่อปี">ต่อปี</option>
                  </select>
              </div>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:12px;">
              <div>
                  <div style="font-size:0.85rem; font-weight:600; margin-bottom:6px;">การันตีต่ออายุ (GR):</div>
                  <div style="display:flex; gap:16px; margin-top:8px;">
                      <label style="display:flex; align-items:center; gap:6px;"><input type="radio" name="pGR" value="ใช่" checked> ใช่</label>
                      <label style="display:flex; align-items:center; gap:6px;"><input type="radio" name="pGR" value="ไม่ใช่"> ไม่ใช่</label>
                  </div>
              </div>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:12px;">
              ${inp('polRoomRate', 'ค่าห้อง+อาหาร (บาท/วัน)', '', 'number')}
              ${inp('polDoctorRate', 'ค่าแพทย์ตรวจเยี่ยม (บาท/วัน)', '', 'number')}
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:12px;">
              ${inp('polHealthLimit', 'วงเงินรักษารวม (บาท)', '', 'number')}
              ${inp('polOPD', 'OPD (ครั้งละ)', '', 'number')}
          </div>
          <div style="margin-top:12px;">
              <div style="font-size:0.85rem; font-weight:600; margin-bottom:6px;">ค่าเสียหายส่วนแรก (Deductible):</div>
              <div style="display:flex; gap:16px; align-items:center;">
                  <label style="display:flex; align-items:center; gap:6px;"><input type="radio" name="pDeductible" value="ไม่มี" checked onchange="toggleDeductible()"> ไม่มี</label>
                  <label style="display:flex; align-items:center; gap:6px;"><input type="radio" name="pDeductible" value="มี" onchange="toggleDeductible()"> มี</label>
                  <input type="text" class="form-input" id="polDeductibleAmount" placeholder="ยอดจ่ายเองก้อนแรก (บาท)" style="display:none; width:200px; padding:4px;" oninput="formatNumberInput(this)">
              </div>
          </div>
      </div>

      <!-- PA -->
      <div style="margin-bottom:16px; background:rgba(0,0,0,0.02); padding:16px; border-radius:8px;">
          <div style="font-weight:700; color:#e08f1f; margin-bottom:8px;">⚠️ ประกันอุบัติเหตุ (AI/ADD/RCC)</div>
          ${inp('polPAName', 'ชื่อแบบ', '', 'text')}
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:12px;">
              ${inp('polPADeath', 'ทุนเสียชีวิตจากอุบัติเหตุ (บาท)', '', 'number')}
              ${inp('polPAMedical', 'ค่ารักษาพยาบาล (ต่อครั้ง)', '', 'number')}
          </div>
      </div>

      <!-- CI -->
      <div style="margin-bottom:16px; background:rgba(0,0,0,0.02); padding:16px; border-radius:8px;">
          <div style="font-weight:700; color:var(--aia-red); margin-bottom:8px;">🛡️ ประกันโรคร้ายแรง (CI)</div>
          ${inp('polCIName', 'ชื่อแบบ', '', 'text')}
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:12px; align-items:end;">
              ${inp('polCI', 'ทุนประกัน (บาท)', '', 'number')}
              ${inp('polCIConditions', 'คุ้มครอง (โรค)', '', 'number')}
          </div>
          <div style="margin-top:12px;">
              <div style="font-size:0.85rem; font-weight:600; margin-bottom:6px;">เงื่อนไข:</div>
              <div style="display:flex; gap:16px;">
                  <label style="display:flex; align-items:center; gap:6px;"><input type="radio" name="pCICond" value="เจอจ่ายจบ" checked> เจอจ่ายจบ</label>
                  <label style="display:flex; align-items:center; gap:6px;"><input type="radio" name="pCICond" value="เคลมได้หลายระยะ"> เคลมได้หลายระยะ</label>
              </div>
          </div>
      </div>

      <!-- HB -->
      <div style="margin-bottom:16px; background:rgba(0,0,0,0.02); padding:16px; border-radius:8px;">
          <div style="font-weight:700; color:#7c3aed; margin-bottom:8px;">🛏️ ชดเชยรายวัน (HB)</div>
          ${inp('polHBName', 'ชื่อแบบ', '', 'text')}
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:12px;">
              ${inp('polHB', 'ยอดชดเชย (วันละ)', '', 'number')}
              ${inp('polHBMaxDays', 'สูงสุด (วัน)', '', 'number')}
          </div>
      </div>

      <div class="form-label" style="font-weight:700; margin-bottom:12px; color:var(--aia-blue); border-bottom:1px solid rgba(0,0,0,0.1); padding-bottom:4px;">4. ข้อมูลสำคัญเพื่อการวางแผน (FA Insights)</div>
      <div style="display:grid; grid-template-columns:1fr; gap:16px; margin-bottom:16px; background:rgba(0,0,0,0.02); padding:16px; border-radius:8px;">
          <div>
              <div style="font-weight:600; font-size:0.9rem; margin-bottom:8px;">ลดหย่อนภาษี: ปีนี้ใช้สิทธิได้รวม</div>
              <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
                  ชีวิต: <input type="text" class="form-input" id="polTaxLife" style="width:120px;" oninput="formatNumberInput(this); calcPolTax()"> 
                  สุขภาพ: <input type="text" class="form-input" id="polTaxHealth" style="width:120px;" oninput="formatNumberInput(this); calcPolTax()">
                  <span style="font-weight:700; color:var(--aia-blue); margin-left:12px;">รวม: <span id="polTaxTotal">0</span> บาท</span>
              </div>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
              ${inp('polCashValue', 'มูลค่าเวนคืนปิดเล่มวันนี้ได้', '', 'number', '', 'calcPolicyLoan()')}
              <div>
                  <div class="form-label">กู้เงินสดสูงสุด:</div>
                  <div id="polLoanNote" style="font-size:1.1rem; font-weight:700; color:var(--aia-red); padding-top:8px;">0 บาท</div>
              </div>
          </div>
          ${inp('polBeneficiary', 'ผู้รับผลประโยชน์', '', 'text')}
      </div>
      
      <div style="display:flex; justify-content:center; margin-top:24px;">
        <button type="button" onclick="addPolicy()" style="padding:16px 40px; background:var(--aia-blue); color:white; border:none; border-radius:12px; font-weight:800; cursor:pointer; font-size:1.1rem; box-shadow:0 4px 15px rgba(10,117,187,0.3); transition:all 0.2s;">➕ บันทึกกรมธรรม์เล่มนี้เข้าพอร์ต</button>
      </div>
    </div>
  </div>
`));

// ===== SLIDE 12: POLICY DASHBOARD =====
container.appendChild(createSlide(12, `
  <div class="glass-card" style="max-width:1100px;">
    ${secHdr('12', 'POLICY DASHBOARD — ภาพรวมสวัสดิการ (Gap Analysis)')}
    <p class="slide-subtitle">วิเคราะห์ช่องว่าง (Gap) และคำแนะนำแผน</p>
    <div id="policyList" style="margin-top:20px; min-height: 200px;">
      <em style="color:var(--text-muted);">ยังไม่มีกรมธรรม์ที่บันทึกไว้</em>
    </div>
  </div>
`));

// ===== SLIDE 13: AGENT SUMMARY PLAN =====
container.appendChild(createSlide(13, `
  <div class="glass-card" style="max-width:1100px;">
    ${secHdr('13', 'AGENT SUMMARY (สำหรับตัวแทน)')}
    <p class="slide-subtitle">หน้านี้สำหรับตัวแทนเพื่อออกแบบแผนและคำนวณเบี้ยให้ลงตัว</p>
    
    <div id="agentPlanTables" style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">
      
      <div style="grid-column: 1 / span 2; background:rgba(10,117,187,0.05); padding:20px; border-radius:16px; display:flex; justify-content:space-around; align-items:center; border:1px solid rgba(10,117,187,0.1);">
        <div style="text-align:center;">
          <div style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:8px;">รายได้รายเดือน (แก้ไขได้ที่นี่)</div>
          <input type="text" class="form-input" id="agentIncomeInput" placeholder="รายได้/เดือน" style="font-size:1.5rem; font-weight:800; color:var(--aia-blue); text-align:center; width:220px; background:rgba(255,255,255,0.8); border-color:var(--aia-blue);" oninput="formatNumberInput(this); document.getElementById('incomeMain').value = this.value; syncProfile();">
        </div>
        <div style="width:1px; height:60px; background:rgba(0,0,0,0.1);"></div>
        <div style="text-align:center;">
          <div style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:8px;">รายได้รายปี (คำนวณ)</div>
          <div style="font-size:1.5rem; font-weight:800; color:var(--aia-red);" id="agentIncomeAnnual">0 บาท</div>
        </div>
      </div>
      
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
          <div style="display:grid; grid-template-columns:1fr; gap:12px; font-size:0.85rem; margin-bottom:12px; color:var(--text-secondary);">
            <div style="background:rgba(0,0,0,0.02); padding:8px; border-radius:6px;"><strong>Eco:</strong> เหมาจ่าย 5 ล้าน / ห้อง 3,000 + ชดเชย 1,000</div>
            <div style="background:rgba(0,0,0,0.02); padding:8px; border-radius:6px;"><strong>Biz:</strong> เหมาจ่าย 15 ล้าน / ห้อง 6,000 + ชดเชย 2,000</div>
            <div style="background:rgba(0,0,0,0.02); padding:8px; border-radius:6px;"><strong>First:</strong> เหมาจ่าย 25 ล้าน / ห้อง 9,000 + ชดเชย 3,000</div>
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

      <div style="display:flex; flex-direction:column; gap:20px;">
        <!-- Parent Care -->
        <div class="gap-section" style="background:#fff; border:none; box-shadow:0 4px 15px rgba(0,0,0,0.05);">
          <h3 style="color:#7c3aed; margin-bottom:12px; display:flex; align-items:center; gap:8px;">
            <span style="background:#7c3aed; color:#fff; padding:4px 8px; border-radius:8px; font-size:0.9rem;">5</span> 
            แผนปกป้องคุณภาพชีวิตบุพการี
          </h3>
          <div style="margin-bottom:8px; font-size:0.9rem;">ทุนชีวิตสำหรับดูแลพ่อแม่: <strong id="agentParentCap" style="color:var(--text-primary); font-size:1.1rem;">0</strong> บาท</div>
          <input type="text" class="form-input" id="premParent" placeholder="เบี้ยประกันชีวิต (บาท)" oninput="formatNumberInput(this); calcCustomPremium()">
        </div>
      </div>

    </div>
  </div>
`));

// ===== SLIDE 14: CUSTOM PLAN SELECTION =====
container.appendChild(createSlide(14, `
  <div class="glass-card" style="max-width:1200px;">
    ${secHdr('14', 'CUSTOM PLAN SELECTION')}
    <p class="slide-subtitle">เลือกปรับแต่งแผนการคุ้มครองตามความต้องการ และบันทึกข้อมูล</p>
    
    <div style="display:flex; gap:24px; flex-wrap:wrap;">
      <div style="flex:2; min-width:300px;">
        
        <table class="custom-grid-table" style="width:100%; border-collapse:separate; border-spacing:0 12px; margin-bottom:24px;">
          <thead>
            <tr>
              <th style="text-align:left; padding:12px; color:var(--text-secondary);">ประเภทแผน</th>
              <th style="padding:12px; text-align:center;">✈️ Economy</th>
              <th style="padding:12px; text-align:center;">🌟 Business</th>
              <th style="padding:12px; text-align:center;">👑 First Class</th>
            </tr>
          </thead>
          <tbody>
            <!-- Income row -->
            <tr class="grid-row">
              <td style="padding:16px 20px; background:rgba(210,17,69,0.05); border-radius:12px 0 0 12px; width:200px; vertical-align:middle;">
                <label style="display:flex; align-items:center; gap:10px; cursor:pointer; font-weight:700; color:var(--aia-red); white-space:nowrap;">
                  <input type="checkbox" id="chkIncome" onchange="calcCustomPremium()" checked style="width:20px; height:20px; accent-color:var(--aia-red); flex-shrink:0;">
                  <span>🛡️ ปกป้องรายได้</span>
                </label>
                <div style="font-size:0.75rem; color:var(--text-muted); margin-top:6px; padding-left:30px;">ทุนประกันโรคร้ายแรง (CI)</div>
              </td>
              <td class="grid-cell" onclick="selectGridCell('cusIncome', 'eco')">
                <input type="radio" name="cusIncome" id="inc_eco" value="eco" onchange="calcCustomPremium()">
                <label for="inc_eco"><span style="font-size:1.15rem; font-weight:800; color:var(--aia-red);">3 ปี</span><br><span id="grid_ci_eco" style="font-size:0.75rem;">0</span></label>
              </td>
              <td class="grid-cell selected" onclick="selectGridCell('cusIncome', 'biz')">
                <input type="radio" name="cusIncome" id="inc_biz" value="biz" checked onchange="calcCustomPremium()">
                <label for="inc_biz"><span style="font-size:1.15rem; font-weight:800; color:var(--aia-red);">5 ปี</span><br><span id="grid_ci_biz" style="font-size:0.75rem;">0</span></label>
              </td>
              <td class="grid-cell" onclick="selectGridCell('cusIncome', 'first')" style="border-radius:0 12px 12px 0;">
                <input type="radio" name="cusIncome" id="inc_first" value="first" onchange="calcCustomPremium()">
                <label for="inc_first"><span style="font-size:1.15rem; font-weight:800; color:var(--aia-red);">7 ปี</span><br><span id="grid_ci_first" style="font-size:0.75rem;">0</span></label>
              </td>
            </tr>

            <!-- Health row -->
            <tr class="grid-row">
              <td style="padding:16px 20px; background:rgba(124,58,237,0.05); border-radius:12px 0 0 12px; vertical-align:middle;">
                <label style="display:flex; align-items:center; gap:10px; cursor:pointer; font-weight:700; color:#7c3aed; white-space:nowrap;">
                  <input type="checkbox" id="chkHealth" onchange="calcCustomPremium()" checked style="width:20px; height:20px; accent-color:#7c3aed; flex-shrink:0;">
                  <span>🏥 ปกป้องเงินออม</span>
                </label>
                <div style="font-size:0.75rem; color:var(--text-muted); margin-top:6px; padding-left:30px;">สวัสดิการรักษาพยาบาล</div>
              </td>
              <td class="grid-cell" onclick="selectGridCell('cusHealth', 'eco')">
                <input type="radio" name="cusHealth" id="h_eco" value="eco" onchange="calcCustomPremium()">
                <label for="h_eco"><span style="font-size:0.85rem; font-weight:800; color:#7c3aed;">รพ.เอกชน<br>มาตรฐาน</span><br><span style="font-size:0.7rem; color:var(--text-muted);">4,000/วัน</span></label>
              </td>
              <td class="grid-cell selected" onclick="selectGridCell('cusHealth', 'biz')">
                <input type="radio" name="cusHealth" id="h_biz" value="biz" checked onchange="calcCustomPremium()">
                <label for="h_biz"><span style="font-size:0.85rem; font-weight:800; color:#7c3aed;">รพ.เอกชน<br>ชื่อดังในเมือง</span><br><span style="font-size:0.7rem; color:var(--text-muted);">8,000/วัน</span></label>
              </td>
              <td class="grid-cell" onclick="selectGridCell('cusHealth', 'first')" style="border-radius:0 12px 12px 0;">
                <input type="radio" name="cusHealth" id="h_first" value="first" onchange="calcCustomPremium()">
                <label for="h_first"><span style="font-size:0.85rem; font-weight:800; color:#7c3aed;">รพ.เอกชน<br>ระดับท็อป</span><br><span style="font-size:0.7rem; color:var(--text-muted);">12,000/วัน</span></label>
              </td>
            </tr>
          </tbody>
        </table>

        <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:16px; margin-bottom:24px;">
          <div class="custom-plan-box" style="padding:16px; background:rgba(184,134,11,0.05); border:1px solid rgba(184,134,11,0.1); border-radius:12px;">
            <label style="display:flex; align-items:center; gap:12px; cursor:pointer; font-size:1.05rem; font-weight:700; color:#b8860b;">
              <input type="checkbox" id="cusAsset" onchange="calcCustomPremium()" style="width:24px; height:24px; accent-color:#b8860b;">
              🏡 ปกป้องทรัพย์สิน
            </label>
            <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:8px;">คุ้มครองหนี้สิน <strong id="lblCusAsset">0</strong> บาท</div>
          </div>

          <div class="custom-plan-box" style="padding:16px; background:rgba(10,117,187,0.05); border:1px solid rgba(10,117,187,0.1); border-radius:12px;">
            <label style="display:flex; align-items:center; gap:12px; cursor:pointer; font-size:1.05rem; font-weight:700; color:var(--aia-blue);">
              <input type="checkbox" id="cusEdu" onchange="calcCustomPremium()" style="width:24px; height:24px; accent-color:var(--aia-blue);">
              🎓 ปกป้องใบปริญญา
            </label>
            <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:8px;">คุ้มครองค่าเทอม <strong id="lblCusEdu">0</strong> บาท</div>
          </div>

          <div class="custom-plan-box" style="padding:16px; background:rgba(124,58,237,0.05); border:1px solid rgba(124,58,237,0.1); border-radius:12px;">
            <label style="display:flex; align-items:center; gap:12px; cursor:pointer; font-size:1.05rem; font-weight:700; color:#7c3aed;">
              <input type="checkbox" id="cusParent" onchange="calcCustomPremium()" style="width:24px; height:24px; accent-color:#7c3aed;">
              🧓 ปกป้องคุณภาพชีวิตบุพการี
            </label>
            <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:8px;">คุ้มครองค่าใช้จ่ายพ่อแม่ <strong id="lblCusParent">0</strong> บาท</div>
          </div>
        </div>
        
        <div class="highlight-note" style="background:linear-gradient(to right, rgba(16,124,65,0.1), transparent); padding:16px; border-left:5px solid #107c41; border-radius:8px;">
          <div style="font-weight:700; color:#107c41; margin-bottom:4px; font-size:1.1rem;">💎 หมายเหตุเพิ่มเติม</div>
          <div style="font-size:0.95rem; color:var(--text-primary); line-height:1.5;">
            เงินประกันชีวิตในแผนปกป้องทรัพย์สิน, ใบปริญญา, คุณภาพชีวิตบุพการี สามารถนำมาเป็น <strong>"เงินออมตอนเกษียณ"</strong> และ <strong>"กู้ยืมออกมาใช้ฉุกเฉิน"</strong> ได้ในอัตราดอกเบี้ยต่ำ
          </div>
        </div>

      </div>

      <div style="flex:1; min-width:300px;">
        <div style="background:var(--aia-blue); color:#fff; padding:32px; border-radius:24px; position:sticky; top:20px; box-shadow:0 15px 35px rgba(10,117,187,0.3);">
          <h3 style="margin-bottom:20px; opacity:0.9; font-size:1.2rem;">สรุปงบประมาณแผนที่เลือก</h3>
          <div style="font-size:3rem; font-weight:800; margin-bottom:4px;" id="totalCustomPremium">0</div>
          <div style="font-size:1.1rem; opacity:0.8; margin-bottom:24px;">บาท / ปี</div>
          
          <div style="background:rgba(255,255,255,0.15); padding:20px; border-radius:16px;">
            <div style="font-size:0.9rem; margin-bottom:10px;">สัดส่วนเบี้ยต่อรายได้</div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span id="percentPremium" style="font-size:1.8rem; font-weight:800;">0%</span>
              <span id="percentStatus" style="font-size:0.9rem; font-weight:700; padding:6px 12px; border-radius:8px;">เหมาะสม</span>
            </div>
            <div style="width:100%; height:8px; background:rgba(0,0,0,0.2); border-radius:4px; margin-top:16px; overflow:hidden;">
              <div id="percentBar" style="height:100%; width:0%; background:#22c55e; transition:all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);"></div>
            </div>
            <div id="percentWarning" style="color:#ffb3b3; font-size:0.85rem; margin-top:12px; display:none; font-weight:600;">⚠️ แนะนำให้ปรับสัดส่วนไม่เกิน 15-20% เพื่อความยั่งยืน</div>
          </div>
          
          <div style="background:rgba(255,255,255,0.1); padding:16px; border-radius:16px; margin-top:20px; border:1px dashed rgba(255,255,255,0.2);">
            <div style="font-size:1.1rem; font-weight:700; margin-bottom:6px;">💡 เงินสำรองฉุกเฉินที่ควรมี</div>
            <div style="font-size:1.5rem; font-weight:800; color:#fff;" id="cusEmergencyFund">0</div>
            <div style="font-size:0.8rem; opacity:0.8; margin-top:4px;">(รายได้/จ่าย 3-6 เดือน)</div>
          </div>
          
          <div style="margin-top:24px;">
            <button class="btn-export" id="btnSubmitData" onclick="submitToGoogleSheets()" style="width:100%; padding:18px; font-size:1.1rem; background:var(--aia-red); color:#fff; border:none; border-radius:16px; font-weight:800; cursor:pointer; box-shadow:0 8px 20px rgba(210,17,69,0.4); transition:transform 0.2s;">💾 บันทึกแผน</button>
            <div id="saveStatusBar" style="margin-top:16px; font-size:0.95rem; font-weight:700; text-align:center; display:none; padding:12px; border-radius:12px;"></div>
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

let retireTotalGlobal = 0;
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
  retireTotalGlobal = totalNeeded;

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

// --- Helper: Thai Date Time ---
function getThaiDateTime() {
  const now = new Date();
  const months = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];
  const date = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear() + 543;
  const time = now.toLocaleTimeString('th-TH', { hour12: false });
  return `${date}-${month}-${year}, ${time} น.`;
}

// --- Submit ---
function submitToGoogleSheets() {
  const btn = document.getElementById('btnSubmitData');
  const bar = document.getElementById('saveStatusBar');
  
  if (!bar) return;

  // UI State: Connecting
  btn.disabled = true;
  btn.style.opacity = '0.7';
  btn.innerText = '⏳ กำลังบันทึก...';
  
  bar.style.display = 'block';
  bar.style.background = 'rgba(255, 255, 255, 0.2)';
  bar.style.color = '#ffffff';
  bar.innerHTML = '📡 กำลังเชื่อมต่อ Server...';

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxgOxLQl5lEGgemarcQt_PHHYzCR2SzXHWSVT0MUGzsqoqIesIp7gQf_XSxUuHmk-ERFw/exec';

  try {
    const hSel = document.querySelector('input[name="cusHealth"]:checked')?.value || 'eco';
    const iSel = document.querySelector('input[name="cusIncome"]:checked')?.value || 'eco';
    const hLabels = { 'eco': 'Economy', 'biz': 'Business', 'first': 'First Class' };
    const iLabels = { 'eco': '3 ปี', 'biz': '5 ปี', 'first': '7 ปี' };
    const welfareText = document.getElementById('welfareSub')?.innerText || 'ไม่ได้ระบุ';

    const payloadData = {
      "timestamp": getThaiDateTime(),
      "client_name": document.getElementById('clientName')?.value || 'New Client',
      "client_age": document.getElementById('clientAge')?.value || '',
      "income_monthly": num('incomeMain'),
      "family_status": currentFamilyMode === 'single' ? 'Single' : 'Family/Children',
      "welfare": welfareText,
      "total_asset": num('totalAsset'),
      "total_liability": num('totalLiability'),
      "emergency_goal": `${fmt(num('incomeMain') * 3)} - ${fmt(num('incomeMain') * 6)} THB`,
      "edu_budget": typeof totalEduMaxGlobal !== 'undefined' ? totalEduMaxGlobal : 0,
      "retire_monthly": num('retireMonthly'),
      "retire_total": typeof retireTotalGlobal !== 'undefined' ? retireTotalGlobal : 0,
      "parent_monthly": num('parentMonthly'),
      "parent_years": num('parentYears'),
      "parent_total": typeof totalParentCareGlobal !== 'undefined' ? totalParentCareGlobal : 0,
      "plan_health": hLabels[hSel] || hSel,
      "plan_income": iLabels[iSel] || iSel,
      "chk_asset": document.getElementById('cusAsset')?.checked ? 'Selected' : 'None',
      "chk_edu": document.getElementById('cusEdu')?.checked ? 'Selected' : 'None',
      "chk_parent": document.getElementById('cusParent')?.checked ? 'Selected' : 'None',
      "tax_goal": document.querySelector('#taxCalcOutput strong[style*="color:var(--aia-red)"]')?.innerText || '0 THB',
      "premium_total": num('totalCustomPremium'),
      "premium_pct": document.getElementById('percentPremium')?.innerText || '0%',
      "policies_json": JSON.stringify(policies || [])
    };

    // สร้าง Iframe ลับ
    const ifrId = 'ifr_submit_' + Date.now();
    const ifr = document.createElement('iframe');
    ifr.name = ifrId;
    ifr.id = ifrId;
    ifr.style.display = 'none';
    document.body.appendChild(ifr);

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = SCRIPT_URL;
    form.target = ifrId;

    for (let key in payloadData) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = payloadData[key];
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();

    setTimeout(() => {
      bar.innerHTML = '✅ บันทึกสำเร็จ!';
      bar.style.background = '#22c55e';
      bar.style.color = '#ffffff';
      
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.innerText = '💾 บันทึกแผน';
      
      // ลบ Form/Iframe
      document.body.removeChild(form);
      document.body.removeChild(ifr);

      // ซ่อนแถบสถานะหลัง 5 วินาที
      setTimeout(() => {
        bar.style.display = 'none';
      }, 5000);
    }, 2500);

  } catch (err) {
    console.error("Submit Error:", err);
    bar.innerHTML = '⚠️ ข้อผิดพลาด: ' + err.message;
    bar.style.background = '#fee2e2';
    bar.style.color = '#991b1b';
    btn.disabled = false;
    btn.style.opacity = '1';
    btn.innerText = '💾 บันทึกแผน';
  }
}


function togglePolStatus() {
  const status = document.querySelector('input[name="pStatus"]:checked').value;
  document.getElementById('statLapse').style.display = (status === 'ขาดต่อ') ? 'grid' : 'none';
  document.getElementById('statPaidUp').style.display = (status === 'ใช้เงินสำเร็จ') ? 'block' : 'none';
  document.getElementById('statExtended').style.display = (status === 'ขยายเวลา') ? 'block' : 'none';
  document.getElementById('statAPL').style.display = (status === 'กู้เบี้ยอัตโนมัติ') ? 'grid' : 'none';
}

function togglePolType() {
  const type = document.querySelector('input[name="pType"]:checked').value;
  const periodicFields = document.getElementById('polCbPeriodicFields');
  if (type === 'ตลอดชีพ') {
    periodicFields.style.display = 'none';
  } else {
    periodicFields.style.display = 'flex';
  }
}

function toggleDeductible() {
  const ded = document.querySelector('input[name="pDeductible"]:checked').value;
  document.getElementById('polDeductibleAmount').style.display = (ded === 'มี') ? 'block' : 'none';
}

function calcPolTax() {
  const tLife = num('polTaxLife');
  const tHealth = num('polTaxHealth');
  document.getElementById('polTaxTotal').innerText = fmt(tLife + tHealth);
}

function calcPolicyLoan() {
  const cv = num('polCashValue');
  const el = document.getElementById('polLoanNote');
  if (cv > 0) {
    el.innerHTML = `✅ ${fmt(cv * 0.8)} บาท <div style="font-size:0.85rem; color:var(--text-secondary); font-weight:400; margin-top:4px;">(ประเมินที่ 80% อัตราดอกเบี้ย 4-7% ตามแบบประกัน)</div>`;
  } else {
    el.innerHTML = '0 บาท';
  }
}

function addPolicy() {
  const cName = document.getElementById('polClientName').value || 'ลูกค้า';
  const pNo = document.getElementById('polNo').value || '-';
  const pName = document.getElementById('polName').value || 'กรมธรรม์';

  const status = document.querySelector('input[name="pStatus"]:checked')?.value || '-';
  const type = document.querySelector('input[name="pType"]:checked')?.value || '-';
  const channel = document.querySelector('input[name="pChannel"]:checked')?.value || '-';

  const sa = num('polSumAssured');
  const cv = num('polCashValue');
  const p = num('polPremium');
  const payFreq = document.getElementById('polPayFreq').value || 'ปี';
  const payYears = document.getElementById('polPayYears')?.value || '-';
  const coverYears = document.getElementById('polCoverYears')?.value || '-';
  const nextDueDate = document.getElementById('polNextDueDate')?.value || '-';

  // Lapse/PaidUp/Extended/APL details
  const lapseDate = document.getElementById('polLapseDate')?.value || '-';
  const lapseAmount = num('polLapseAmount');
  const paidUpSA = num('polPaidUpSA');
  const extendedYear = document.getElementById('polExtendedYear')?.value || '-';
  const aplDebt = num('polAPLDebt');
  const aplInterest = document.getElementById('polAPLInterest')?.value || '-';

  // Cashback
  const cbStart = document.getElementById('polCbStart')?.value || '-';
  const cbEnd = document.getElementById('polCbEnd')?.value || '-';
  const cbAmount = document.getElementById('polCbAmount')?.value || '-';
  const maturityAmount = num('polMaturityAmount');

  // Health data
  const hType1 = document.getElementById('polHealthType1')?.value || '-';
  const hType2 = document.getElementById('polHealthType2')?.value || '-';
  const healthName = document.getElementById('polHealthName')?.value || '-';
  const gr = document.querySelector('input[name="pGR"]:checked')?.value || '-';
  const roomRate = num('polRoomRate');
  const doctorRate = num('polDoctorRate');
  const healthLimit = num('polHealthLimit');
  const opd = num('polOPD');
  const deductible = document.querySelector('input[name="pDeductible"]:checked')?.value || '-';
  const deductibleAmt = num('polDeductibleAmount');

  // PA data
  const paName = document.getElementById('polPAName')?.value || '-';
  const paDeath = num('polPADeath');
  const paMedical = num('polPAMedical');

  // CI data
  const ciName = document.getElementById('polCIName')?.value || '-';
  const ci = num('polCI');
  const ciConditions = document.getElementById('polCIConditions')?.value || '-';
  const ciCond = document.querySelector('input[name="pCICond"]:checked')?.value || '-';

  // HB data
  const hbName = document.getElementById('polHBName')?.value || '-';
  const hb = num('polHB');
  const hbMaxDays = num('polHBMaxDays');

  // FA Insights
  const taxLife = num('polTaxLife');
  const taxHealth = num('polTaxHealth');
  const beneficiary = document.getElementById('polBeneficiary')?.value || '-';
  const loanMax = cv > 0 ? Math.round(cv * 0.8) : 0;

  if (!pName && sa === 0) return;
  policies.push({
    cName, pNo, name: pName, status, type, channel,
    sa, cv, p, payFreq, payYears, coverYears, nextDueDate,
    lapseDate, lapseAmount, paidUpSA, extendedYear, aplDebt, aplInterest,
    cbStart, cbEnd, cbAmount, maturityAmount,
    hType1, hType2, healthName, gr, roomRate, doctorRate, healthLimit, opd, deductible, deductibleAmt,
    paName, paDeath, paMedical,
    ciName, ci, ciConditions, ciCond,
    hbName, hb, hbMaxDays,
    taxLife, taxHealth, beneficiary, loanMax
  });

  // clear all fields for the next policy
  const fieldsToClear = [
    'polClientName', 'polNo', 'polName', 'polPremium', 'polPayYears', 'polCoverYears', 'polNextDueDate',
    'polSumAssured', 'polLapseDate', 'polLapseAmount', 'polPaidUpSA', 'polExtendedYear', 'polAPLDebt', 'polAPLInterest',
    'polCbStart', 'polCbEnd', 'polCbAmount', 'polMaturityAmount', 'polHealthName', 'polRoomRate', 'polDoctorRate',
    'polHealthLimit', 'polOPD', 'polDeductibleAmount', 'polPAName', 'polPADeath', 'polPAMedical',
    'polCIName', 'polCI', 'polCIConditions', 'polHBName', 'polHB', 'polHBMaxDays',
    'polTaxLife', 'polTaxHealth', 'polBeneficiary', 'polCashValue'
  ];
  fieldsToClear.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });

  // Reset selects
  ['polPayFreq', 'polHealthType1', 'polHealthType2'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.selectedIndex = 0;
  });

  // Reset radios to default values
  const radioDefaults = {
    'pStatus': 'คุ้มครองอยู่',
    'pChannel': 'หักบัญชี',
    'pType': 'ตลอดชีพ',
    'pGR': 'ใช่',
    'pDeductible': 'ไม่มี',
    'pCICond': 'เจอจ่ายจบ'
  };
  Object.keys(radioDefaults).forEach(name => {
    const radios = document.getElementsByName(name);
    for (let r of radios) {
      r.checked = (r.value === radioDefaults[name]);
    }
  });

  // Reset UI states
  togglePolStatus();
  togglePolType();
  toggleDeductible();
  calcPolTax();
  calcPolicyLoan();

  renderPolicies();
  goToSlide(12); // Go to Dashboard
}

function renderPolicies() {
  const el = document.getElementById('policyList');
  if (policies.length === 0) { el.innerHTML = '<em style="color:var(--text-muted);">ยังไม่มีกรมธรรม์ที่บันทึกไว้</em>'; return; }

  let html = '<div style="display:grid; gap:12px; margin-bottom:16px;">';
  let totalCV = 0, totalSA = 0, totalPrem = 0;
  policies.forEach((pol, i) => {
    totalCV += pol.cv;
    totalSA += pol.sa;
    totalPrem += pol.p;

    let statusColor = '#22c55e'; // Green
    if (pol.status === 'ขาดต่อ') statusColor = '#ef4444'; // Red
    else if (pol.status === 'ใช้เงินสำเร็จ') statusColor = '#eab308'; // Yellow
    else if (pol.status === 'ขยายเวลา') statusColor = '#f97316'; // Orange
    else if (pol.status === 'กู้เบี้ยอัตโนมัติ') statusColor = '#3b82f6'; // Blue

    html += `<div style="background:#fff; padding:16px; border-radius:12px; border:1px solid rgba(0,0,0,0.1); display:flex; justify-content:space-between; box-shadow:0 2px 8px rgba(0,0,0,0.03);">
      <div style="flex:1;">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
            <strong style="font-size:1.1rem; color:var(--aia-blue);">${pol.name}</strong> 
            <span style="font-size:0.75rem; background:rgba(0,0,0,0.05); padding:2px 8px; border-radius:12px; border:1px solid rgba(0,0,0,0.1);">${pol.type}</span>
            <span style="font-size:0.75rem; color:${statusColor}; border:1px solid ${statusColor}; padding:2px 8px; border-radius:12px; font-weight:600;">${pol.status}</span>
        </div>
        <div style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:8px;">
            ชื่อผู้เอาประกัน: ${pol.cName} | เลขกรมธรรม์: ${pol.pNo}
            ${pol.hType1 !== '-' ? `<br>🏥 สุขภาพ: ${pol.hType1} (${pol.hType2})` : ''}
        </div>
        <div style="font-size:0.9rem; background:rgba(0,0,0,0.02); padding:8px; border-radius:8px; display:inline-flex; gap:16px; border:1px dashed rgba(0,0,0,0.05);">
          <span>ทุนชีวิต: <strong style="color:var(--text-primary);">${fmt(pol.sa)}</strong></span>
          <span>เวนคืน: <strong style="color:#107c41;">${fmt(pol.cv)}</strong></span>
          <span>เบี้ยจ่าย: <strong style="color:var(--aia-red);">${fmt(pol.p)}/${pol.payFreq}</strong></span>
        </div>
      </div>
      <button onclick="policies.splice(${i},1); renderPolicies();" style="border:none; background:transparent; color:red; cursor:pointer; font-size:1.2rem; padding:8px; align-self:flex-start;">❌</button>
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
    if (document.getElementById('agentIncomeInput')) {
      const input = document.getElementById('agentIncomeInput');
      if (document.activeElement !== input) input.value = fmt(income);
    }
    if (document.getElementById('agentIncomeAnnual')) document.getElementById('agentIncomeAnnual').innerText = fmt(income * 12) + ' บาท';

    const el_eco = document.getElementById('agentCI_eco');
    const el_biz = document.getElementById('agentCI_biz');
    const el_first = document.getElementById('agentCI_first');
    const g_eco = document.getElementById('grid_ci_eco');
    const g_biz = document.getElementById('grid_ci_biz');
    const g_first = document.getElementById('grid_ci_first');

    const val_eco = income * 12 * 3;
    const val_biz = income * 12 * 5;
    const val_first = income * 12 * 7;

    if (el_eco) el_eco.innerText = fmt(val_eco) + ' (คุ้มครอง 3 ปี)';
    if (el_biz) el_biz.innerText = fmt(val_biz) + ' (คุ้มครอง 5 ปี)';
    if (el_first) el_first.innerText = fmt(val_first) + ' (คุ้มครอง 7 ปี)';

    if (g_eco) g_eco.innerText = fmt(val_eco);
    if (g_biz) g_biz.innerText = fmt(val_biz);
    if (g_first) g_first.innerText = fmt(val_first);
  }

  let totL = 0;
  document.querySelectorAll('#assetList > div').forEach(row => {
    const radio = row.querySelector('.asset-type:checked');
    if (radio && radio.value === 'liability') {
      const vEl = row.querySelector('.asset-val');
      const v = vEl ? (vEl.value || "0").replace(/,/g, '') : "0";
      totL += parseInt(v, 10) || 0;
    }
  });
  document.getElementById('agentAssetCap').innerText = fmt(totL);
  document.getElementById('lblCusAsset').innerText = fmt(totL);

  document.getElementById('agentEduCap').innerText = fmt(totalEduMaxGlobal);
  document.getElementById('lblCusEdu').innerText = fmt(totalEduMaxGlobal);

  // Parent care
  const parentCareEl = document.getElementById('agentParentCap');
  const lblParent = document.getElementById('lblCusParent');
  if (parentCareEl) parentCareEl.innerText = fmt(totalParentCareGlobal);
  if (lblParent) lblParent.innerText = fmt(totalParentCareGlobal);
}

// --- Parent Care Logic ---
let totalParentCareGlobal = 0;
function calcParentCare() {
  const monthly = parseInt(document.getElementById('parentMonthly').value) || 0;
  const years = parseInt(document.getElementById('parentYears').value) || 0;
  const total = monthly * 12 * years;
  totalParentCareGlobal = total;

  document.getElementById('parentMonthlyDisplay').textContent = fmt(monthly);
  document.getElementById('parentYearsDisplay').textContent = years + ' ปี';
  document.getElementById('parentCareCalcResult').innerHTML = 'รวม ' + years + ' ปี: <span style="color:var(--aia-red);">' + fmt(total) + '</span> บาท';

  // Check welfare selection
  const sel = document.querySelector('#parentWelfareCards input[type="radio"]:checked');
  const welfareVal = sel ? sel.value : 'goldcard';
  const warningEl = document.getElementById('parentHealthWarning');
  const warningText = document.getElementById('parentWarningText');

  const welfareNames = { goldcard: 'บัตรทอง', govParent: 'ข้าราชการ', socialParent: 'ประกันสังคม', privateParent: 'ประกันส่วนตัว' };

  if (welfareVal === 'privateParent') {
    warningEl.style.display = 'none';
  } else {
    warningEl.style.display = 'block';
    warningText.innerHTML = 'แม้ปัจจุบันคุณจะจัดการความเสี่ยงเรื่องเงินก้อนสำหรับดูแลผู้สูงอายุเรียบร้อยแล้ว แต่จากสิทธิการรักษา <strong style="color:var(--aia-red);">' + welfareNames[welfareVal] + '</strong> ของพ่อแม่ ระบบพบว่าคุณยังมีความเสี่ยงเรื่อง<strong>ค่ารักษาพยาบาลที่ควบคุมไม่ได้ในอนาคต</strong> ควรพิจารณาวางแผนประกันสุขภาพเพิ่มเมื่อสภาพคล่องพร้อม เพื่อป้องกันไม่ให้ค่าหมอมากระทบเงินออมส่วนตัวของคุณ';
  }
}

// --- Custom Plan Selection ---
function selectGridCell(name, val) {
  // Update radio
  const rad = document.querySelector(`input[name="${name}"][value="${val}"]`);
  if (rad) {
    rad.checked = true;
    // Update UI classes
    const row = rad.closest('tr');
    row.querySelectorAll('.grid-cell').forEach(c => c.classList.remove('selected'));
    rad.closest('.grid-cell').classList.add('selected');
    calcCustomPremium();
  }
}

function calcCustomPremium() {
  let total = 0;

  if (document.getElementById('chkIncome').checked) {
    const incRad = document.querySelector('input[name="cusIncome"]:checked');
    if (incRad) total += num('premCI_' + incRad.value);
  }

  if (document.getElementById('chkHealth').checked) {
    const hRad = document.querySelector('input[name="cusHealth"]:checked');
    if (hRad) total += num('premH_' + hRad.value);
  }

  if (document.getElementById('cusAsset').checked) total += num('premAsset');
  if (document.getElementById('cusEdu').checked) total += num('premEdu');
  if (document.getElementById('cusParent') && document.getElementById('cusParent').checked) total += num('premParent');

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

  // Calculate emergency fund (Monthly income is usually what they spend or want as buffer)
  const incMonthly = num('incomeMain');
  if (document.getElementById('cusEmergencyFund')) {
    document.getElementById('cusEmergencyFund').innerText = fmt(incMonthly * 3) + ' - ' + fmt(incMonthly * 6) + ' บาท';
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
  if (idx === 6) calcParentCare();
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
        html += '<th style="padding:10px; text-align:center; border-bottom:2px solid rgba(0,0,0,0.1); color:#f59e0b;">' + w.emoji + ' ' + w.label + '</th>';
        html += '<th style="padding:10px; text-align:center; border-bottom:2px solid rgba(0,0,0,0.1); color:#d21145;">💎 สวัสดิการส่วนตัว</th>';
        html += '</tr></thead><tbody>';
        WELFARE_COMPARE.categories.forEach(c => {
          html += '<tr><td colspan="3" style="padding:12px 8px; font-weight:700; background:rgba(0,0,0,0.03); color:var(--aia-blue);">' + c.cat + '</td></tr>';
          c.items.forEach(i => {
            html += '<tr style="border-bottom:1px solid rgba(0,0,0,0.05);">';
            html += '<td style="padding:12px 8px; font-weight:600;">' + i.name + '</td>';
            html += '<td style="padding:12px 8px; text-align:center; font-size:0.9rem;">' + (i[sel.value] || '—') + '</td>';
            html += '<td style="padding:12px 8px; text-align:center; font-weight:700; color:#d21145; font-size:0.9rem;">' + i.private + '</td>';
            html += '</tr>';
          });
        });
        html += '</tbody></table>';
        el.innerHTML = html;
      }
    }
  }
  if (idx === 10) computeTaxSummary();
  if (idx === 13) computeAgentSummary();
  if (idx === 14) calcCustomPremium();
}

function onSlideEnter(idx) {
  if (idx === 10) computeTaxSummary();
  if (idx === 12) {
    if (typeof computeAgentSummary === 'function') computeAgentSummary();
  }
  if (idx === 13) computeAgentSummary();
  if (idx === 14) calcCustomPremium();
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
      if (s.rate > 0) taxDetails += `ช่วง ${fmt(prevLimit + 1)} - ${fmt(s.limit)}: ภาษี ${fmt(taxInStep)} บาท (${s.rate * 100}%)<br>`;
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
  let text = "";
  if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
    text = el.value || "";
  } else {
    text = el.innerText || el.textContent || "";
  }
  // Strip everything except digits and minus sign
  return parseInt(text.replace(/[^0-9-]/g, ''), 10) || 0;
}
function fmt(n) { return Math.round(n).toLocaleString('en-US'); }

// Restore slide state on reload
window.addEventListener('DOMContentLoaded', () => {
  const saved = sessionStorage.getItem('savedSlide');
  if (saved !== null) {
    const slideIndex = parseInt(saved, 10);
    if (!isNaN(slideIndex) && slideIndex > 0) {
      goToSlide(slideIndex);
    }
  }
});
