// ============ DATA LAYER ============

// --- Welfare Data (migrated from welfare-gap-tool) ---
const WELFARE = {
  social33: {
    label: 'ประกันสังคม (ม.33)', emoji: '🔵',
    tagText: 'สวัสดิการพนักงานเอกชน',
    benefits: [
      { cat: '🏥 สิทธิรักษาพยาบาล (เทียบกับประกันสุขภาพ)', items: [
        { n: 'รพ.ที่เข้ารับการรักษา', d: 'เฉพาะ รพ.รัฐ หรือเอกชนบางแห่งตามสิทธิ์', s: 'yellow' },
        { n: 'Economy Class', d: 'ครอบคลุม รพ.เอกชนระดับ Standard (เช่น สินแพทย์, เปาโล)', s: 'green' },
        { n: 'Business / First Class', d: 'ครอบคลุม รพ.เอกชน High-end ถึง Luxury (เช่น กรุงเทพ, บำรุงราษฎร์)', s: 'green' },
      ]},
      { cat: '💊 ค่ายาและโรคร้ายแรง', items: [
        { n: 'สิทธิ์ประกันสังคม', d: 'จำกัดยาตามบัญชี / ไม่มียามุ่งเป้า (Targeted Therapy) / ไม่มีรังสีรักษาใหม่', s: 'red' },
        { n: 'Economy Class', d: 'คุ้มครองโรคทั่วไป แต่อาจไม่ครอบคลุมยามุ่งเป้าหรือโรคร้ายแรงเต็มที่', s: 'yellow' },
        { n: 'Business / First Class', d: 'ครอบคลุมค่ายามุ่งเป้า รังสีรักษา และโรคร้ายแรงหายห่วง', s: 'green' },
      ]},
      { cat: '💰 สวัสดิการอื่นๆ', items: [
        { n: 'ทุพพลภาพ / เสียชีวิต', d: 'มีเงินก้อนจำกัด (ทุพพลภาพสูงสุด 8,750/ด. | เสียชีวิต 50,000 บ.)', s: 'red' },
        { n: 'บำนาญชราภาพ', d: 'ได้รับเมื่ออายุ 55 ปี (เฉลี่ย 3,000 - 5,250 บ./ด.)', s: 'yellow' },
      ]},
    ]
  },
  gov: {
    label: 'ข้าราชการ', emoji: '💼',
    tagText: 'สวัสดิการกรมบัญชีกลาง',
    benefits: [
      { cat: '🏥 สิทธิรักษาพยาบาล (เทียบกับประกันสุขภาพ)', items: [
        { n: 'รพ.ที่เข้ารับการรักษา', d: 'เฉพาะ รพ.รัฐ (หากเข้าเอกชนเบิกได้แค่ฉุกเฉิน 72 ชม.)', s: 'yellow' },
        { n: 'ค่าห้องพิเศษ', d: 'เบิกได้จำกัด (เช่น 1,000 บ./วัน) ซึ่งไม่พอจ่ายจริง', s: 'red' },
        { n: 'Economy Class', d: 'เข้า รพ.เอกชน Standard ได้หมดกังวลเรื่องค่าห้อง', s: 'green' },
      ]},
      { cat: '💊 ค่ายาและโรคร้ายแรง', items: [
        { n: 'สิทธิ์ข้าราชการ', d: 'ยาตามบัญชีฟรี แต่ยานอกบัญชี/ยามุ่งเป้า/รังสีรักษา เบิกไม่ได้', s: 'red' },
        { n: 'Business / First Class', d: 'ครอบคลุมยามุ่งเป้า และค่ารักษาโรคร้ายแรงหลักล้าน', s: 'green' },
      ]},
      { cat: '💰 สวัสดิการอื่นๆ', items: [
        { n: 'บำนาญ', d: 'สูงสุด 70% ของเงินเดือน + กบข. + บำเหน็จตกทอด', s: 'green' },
        { n: 'คุ้มครองชีวิต', d: 'ไม่มีทุนประกันชีวิตเพิ่มเติม', s: 'red' },
      ]},
    ]
  },
  gold: {
    label: 'บัตรทอง', emoji: '💳',
    tagText: 'หลักประกันสุขภาพถ้วนหน้า',
    benefits: [
      { cat: '🏥 สิทธิรักษาพยาบาล (เทียบกับประกันสุขภาพ)', items: [
        { n: 'รพ.ที่เข้ารับการรักษา', d: 'รักษาฟรีเฉพาะ รพ.รัฐในสิทธิ์ (คิวยาว)', s: 'yellow' },
        { n: 'Economy Class', d: 'สามารถเลือกเข้า รพ.เอกชนระดับ Standard ได้ ไม่ต้องรอคิว', s: 'green' },
        { n: 'First Class', d: 'เข้า รพ.ระดับ Luxury รับบริการแบบโรงแรม 5 ดาว', s: 'green' },
      ]},
      { cat: '💊 ค่ายาและโรคร้ายแรง', items: [
        { n: 'สิทธิ์บัตรทอง', d: 'ยานอกบัญชีและยามุ่งเป้าต้องจ่ายเองทั้งหมด', s: 'red' },
        { n: 'Business / First Class', d: 'คุ้มครองยามุ่งเป้า (Targeted Therapy) และโรคร้ายแรง', s: 'green' },
      ]},
      { cat: '💰 สวัสดิการอื่นๆ', items: [
        { n: 'ทุพพลภาพ / เสียชีวิต', d: 'ไม่มี', s: 'red' },
        { n: 'บำนาญ', d: 'ไม่มี', s: 'red' },
      ]},
    ]
  }
};

// --- Hospital Tiers ---
const HOSPITAL_TIERS = [
  {
    id: 'luxury', name: 'Luxury',
    desc: 'โรงพยาบาลระดับบน — บริการแบบโรงแรม 5 ดาว',
    price: '12,000+ บาท/วัน',
    priceNum: 12000,
    hospitals: 'บำรุงราษฎร์, ศิริราชปิยฯ, เมดพาร์ค, สมิติเวช สุขุมวิท',
  },
  {
    id: 'highend', name: 'High-End',
    desc: 'โรงพยาบาลมาตรฐานสูง — ยอดนิยมสำหรับแผนกลาง-บน',
    price: '6,000-10,000 บาท/วัน',
    priceNum: 8000,
    hospitals: 'กรุงเทพ, พญาไท 2, พระราม 9, วิชัยยุทธ, นนทเวช',
  },
  {
    id: 'standard', name: 'Standard',
    desc: 'โรงพยาบาลเอกชนทั่วไป — ราคาจับต้องได้',
    price: '3,000-6,000 บาท/วัน',
    priceNum: 5000,
    hospitals: 'สินแพทย์, วิภาวดี, เกษมราษฎร์, เปาโล, ไทยนครินทร์',
  },
  {
    id: 'gov', name: 'Government',
    desc: 'โรงพยาบาลรัฐ ห้องพิเศษ',
    price: '2,000-5,000 บาท/วัน',
    priceNum: 3500,
    hospitals: 'จุฬาลงกรณ์, ศิริราช, รามาธิบดี, ธรรมศาสตร์',
  },
];

// --- AIA Products ---
const AIA_PRODUCTS = {
  ci: {
    name: 'AIA CI Super Care',
    type: 'ประกันโรคร้ายแรง (เบี้ยไม่ทิ้ง)',
    desc: 'คุ้มครอง 62 โรคร้ายแรง ชำระเบี้ย 10/20 ปี คุ้มครองถึง 99 ปี เบี้ยคงที่ มีมูลค่าเวนคืน',
    forWho: 'คนที่มีภาระ มีครอบครัว ต้องการปกป้องรายได้',
  },
  ciMulti: {
    name: 'AIA Multi-Pay CI Plus',
    type: 'ประกันโรคร้ายแรง (เจอ-จ่าย-หลายจบ)',
    desc: 'เคลมได้หลายครั้ง ครอบคลุมตั้งแต่ระยะเริ่มต้นถึงรุนแรง สูงสุด 5-6 ครั้ง',
    forWho: 'คนที่ต้องการความคุ้มครองสูงสุดจากโรคร้ายแรง',
  },
  life: {
    name: 'AIA 20 Pay Life',
    type: 'ประกันชีวิตตลอดชีพ (เบี้ยไม่ทิ้ง)',
    desc: 'ชำระเบี้ย 20 ปี คุ้มครองถึง 99 ปี มีมูลค่าเวนคืน ใช้เป็นสัญญาหลักแนบสัญญาสุขภาพ',
    forWho: 'คนที่มีภาระหนี้สิน ต้องการหลักประกันให้ครอบครัว',
  },
  healthHappy: {
    name: 'AIA Health Happy',
    type: 'ประกันสุขภาพเหมาจ่าย',
    desc: 'เหมาจ่ายค่ารักษาตามจริง คุ้มครองถึง 99 ปี เจอ 6 โรคร้ายวงเงินเพิ่ม 2 เท่า 4 ปี วงเงิน 1-25 ล้านบาท/ปี',
    forWho: 'คนที่ต้องการอัพเกรดคุณภาพชีวิต เลือก รพ.เอกชนได้',
  },
  healthSaver: {
    name: 'AIA Health Saver',
    type: 'ประกันสุขภาพกึ่งเหมาจ่าย',
    desc: 'วงเงินเริ่มต้น 5 แสนบาท ราคาจับต้องได้ เหมาะเป็นแผนเริ่มต้น',
    forWho: 'คนงบจำกัดที่ต้องการความคุ้มครองพื้นฐาน',
  },
};

// --- Education Tiers ---
const SCHOOL_TIERS = [
  {
    id: 'gov', name: 'โรงเรียนรัฐบาล (สพฐ.)',
    desc: 'ห้องปกติ (8k-12k) / ห้องพิเศษ EP (35k-50k)',
    price: '8,000 - 50,000 บาท/ปี',
    priceNum: 50000, priceMin: 8000, priceMax: 50000,
    examples: 'สวนกุหลาบ, เตรียมอุดม, สามเสน, สตรีวิทยา',
  },
  {
    id: 'private', name: 'โรงเรียนเอกชน (ไทย/สองภาษา)',
    desc: 'หลักสูตรไทย (50k-80k) / Bilingual (150k-250k)',
    price: '50,000 - 250,000 บาท/ปี',
    priceNum: 150000, priceMin: 50000, priceMax: 250000,
    examples: 'กรุงเทพคริสเตียน, อัสสัมชัญ, สาธิตพัฒนา',
  },
  {
    id: 'inter_b', name: 'โรงเรียนนานาชาติ (Tier B)',
    desc: 'หลักสูตรต่างประเทศ ระดับเริ่มต้น-กลาง',
    price: '350,000 - 550,000 บาท/ปี',
    priceNum: 450000, priceMin: 350000, priceMax: 550000,
    examples: 'EIS, St.Andrews, Wells',
  },
  {
    id: 'inter_a', name: 'โรงเรียนนานาชาติ (Tier A)',
    desc: 'ระดับพรีเมียม ค่าเทอมสูงสุด',
    price: '800,000 - 1,000,000+ บาท/ปี',
    priceNum: 1000000, priceMin: 800000, priceMax: 1000000,
    examples: 'NIST, ISB, Harrow',
  },
];

const UNI_TIERS = [
  {
    id: 'gov_norm', name: 'มหาวิทยาลัยรัฐ (ภาคปกติ)',
    desc: 'จุฬาฯ, มธ., มก.',
    price: '28,000 - 45,000 บาท/ปี',
    priceNum: 40000, priceMin: 28000, priceMax: 45000,
    examples: 'จุฬาฯ, ธรรมศาสตร์, เกษตรศาสตร์',
  },
  {
    id: 'gov_sp', name: 'มหาวิทยาลัยรัฐ (โครงการพิเศษ)',
    desc: 'วิศวะ มก., มนุษย์ มศว., วิทย์ มหิดล',
    price: '60,000 - 100,000 บาท/ปี',
    priceNum: 80000, priceMin: 60000, priceMax: 100000,
    examples: 'ม.เกษตรศาสตร์, มศว, มหิดล',
  },
  {
    id: 'private', name: 'มหาวิทยาลัยเอกชน',
    desc: 'หลักสูตรไทย',
    price: '80,000 - 140,000 บาท/ปี',
    priceNum: 110000, priceMin: 80000, priceMax: 140000,
    examples: 'ม.กรุงเทพ, หอการค้าไทย, ม.รังสิต',
  },
  {
    id: 'inter_b', name: 'มหาวิทยาลัยอินเตอร์ (Tier B)',
    desc: 'ระดับเริ่มต้น-กลาง',
    price: '150,000 - 300,000 บาท/ปี',
    priceNum: 200000, priceMin: 150000, priceMax: 300000,
    examples: 'Stamford, MUIC, BU International',
  },
  {
    id: 'inter_a', name: 'มหาวิทยาลัยอินเตอร์ (Tier A)',
    desc: 'ระดับพรีเมียม',
    price: '180,000 - 500,000 บาท/ปี',
    priceNum: 300000, priceMin: 180000, priceMax: 500000,
    examples: 'AIT, BBA จุฬาฯ, BBA ธรรมศาสตร์',
  },
];

// --- Welfare Comparison Data ---
const WELFARE_COMPARE = {
  categories: [
    { cat: '1. ค่าห้องพัก (ต่อวัน)', items: [
      { name: 'ห้องรวม รพ.รัฐ', gold: '✅', social: '✅', gov: '✅', private: '✅' },
      { name: 'ห้องเดี่ยว รพ.รัฐ', gold: '❌', social: '700', gov: '1,000', private: '4,000 / 6,000 / 9,000' },
      { name: 'ห้องเดี่ยว รพ.เอกชน', gold: '❌', social: '❌', gov: '❌', private: '4,000 / 6,000 / 9,000' },
    ]},
    { cat: '2. ยาและการรักษา', items: [
      { name: 'ยาในบัญชี', gold: '✅', social: '✅', gov: '✅', private: '✅' },
      { name: 'ยานอกบัญชี', gold: '⚠️ จำกัด', social: '—', gov: '—', private: '✅' },
      { name: 'ยามุ่งเป้า (โรคร้ายแรง)', gold: '⚠️ เข้าถึงยาก', social: '—', gov: '—', private: '✅ 1/30/50 ล้าน' },
      { name: 'ผู้ป่วยนอก (OPD)', gold: '✅', social: '✅', gov: '✅', private: '1,500 - 2,000' },
    ]},
    { cat: '3. บริการและความเร็ว', items: [
      { name: 'ความรวดเร็ว / คิวผ่าตัด', gold: '⭐', social: '⭐⭐', gov: '⭐⭐⭐', private: '⭐⭐⭐⭐⭐' },
      { name: 'อิสระในการเลือกหมอ', gold: '❌', social: '❌', gov: '❌', private: '✅' },
    ]},
  ]
};

// --- Health Plans ---
const HEALTH_PLANS = [
  { id: 'economy', name: 'Economy Class', icon: '✈️', room: '4,000', roomNum: 4000,
    ci: '✅ 1 ล้าน / 4 ปี', opd: '1,500', color: 'var(--aia-blue)' },
  { id: 'business', name: 'Business Class', icon: '🌟', room: '6,000', roomNum: 6000,
    ci: '✅ 30 ล้าน / 4 ปี', opd: '❌', color: '#7c3aed' },
  { id: 'first', name: 'First Class', icon: '👑', room: '9,000', roomNum: 9000,
    ci: '✅ 50 ล้าน / 4 ปี', opd: '2,000', color: 'var(--aia-red)' },
];

// --- Hospital Plan Mapping ---
const HOSPITAL_PLAN_MAP = {
  luxury: { minRoom: 12000, recommended: 'first', gap: { economy: '8,000+', business: '6,000+', first: '3,000+' }},
  highend: { minRoom: 6000, recommended: 'business', gap: { economy: '2,000+', business: '0', first: '0' }},
  standard: { minRoom: 3000, recommended: 'economy', gap: { economy: '0', business: '0', first: '0' }},
  gov: { minRoom: 2000, recommended: 'economy', gap: { economy: '0', business: '0', first: '0' }},
};

// --- Tax Data ---
const TAX_REVENUE_TYPES = [
  { id: '40_1', name: '40(1) เงินเดือน, โบนัส', question: 'มีรายได้ประจำจากพนักงาน/ข้าราชการ?', deductRate: 0.5, deductMax: 100000, group: '1_2' },
  { id: '40_2', name: '40(2) ค่าคอมมิชชัน, รับจ้าง', question: 'มีค่าตอบแทนจากนายหน้า/รับจ้างอิสระ?', deductRate: 0.5, deductMax: 100000, group: '1_2' },
  { id: '40_3', name: '40(3) ค่าลิขสิทธิ์', question: 'มีรายได้จากสิทธิบัตร/งานเขียน?', deductRate: 0.5, deductMax: 100000 },
  { id: '40_4', name: '40(4) เงินปันผล, ดอกเบี้ย', question: 'มีเงินปันผลหุ้น/ดอกเบี้ย?', deductRate: 0, deductMax: 0 },
  { id: '40_5', name: '40(5) ค่าเช่า', question: 'มีรายได้จากการให้เช่าทรัพย์สิน?', deductRate: 0.2, deductMax: null },
  { id: '40_6', name: '40(6) วิชาชีพเฉพาะ', question: 'เป็นหมอ/วิศวกร/ทนาย?', deductRate: 0.3, deductMax: null },
  { id: '40_7', name: '40(7) รับเหมา', question: 'มีงานรับเหมาก่อสร้าง?', deductRate: 0.6, deductMax: null },
  { id: '40_8', name: '40(8) ธุรกิจ/อื่นๆ', question: 'ทำธุรกิจ/ขายของออนไลน์?', deductRate: 0.6, deductMax: null },
];

const TAX_DEDUCTIONS = [
  { cat: 'ส่วนตัวและครอบครัว', items: [
    { id: 'ded_self', name: 'ค่าลดหย่อนส่วนตัว', max: 60000, auto: true },
    { id: 'ded_spouse', name: 'คู่สมรส (ไม่มีรายได้)', max: 60000 },
    { id: 'ded_child', name: 'บุตร (คนละ)', max: 30000, note: 'คนที่ 2+ เกิดหลัง 2561 ได้ 60,000' },
    { id: 'ded_parent', name: 'บิดามารดา (คนละ)', max: 30000, note: 'อายุ 60+, รายได้ไม่เกิน 30,000/ปี' },
  ]},
  { cat: 'ประกันภัย', items: [
    { id: 'ded_life_ins', name: 'ประกันชีวิต/สะสมทรัพย์', max: 100000, note: 'คุ้มครอง 10 ปี+' },
    { id: 'ded_health_ins', name: 'ประกันสุขภาพตนเอง', max: 25000, note: 'รวมประกันชีวิตไม่เกิน 100,000' },
    { id: 'ded_parent_health', name: 'ประกันสุขภาพพ่อแม่', max: 15000 },
    { id: 'ded_social', name: 'ประกันสังคม', max: 9000 },
  ]},
  { cat: 'เกษียณ (รวมกันไม่เกิน 500,000)', items: [
    { id: 'ded_pension_ins', name: 'ประกันบำนาญ', max: 200000, note: 'ไม่เกิน 15% ของรายได้' },
    { id: 'ded_pvd', name: 'PVD / กบข.', max: 500000, note: 'ไม่เกิน 15% ของค่าจ้าง' },
    { id: 'ded_ssf', name: 'กองทุน SSF', max: 200000, note: 'ไม่เกิน 30% ของรายได้' },
    { id: 'ded_rmf', name: 'กองทุน RMF', max: 500000, note: 'ไม่เกิน 30% ของรายได้' },
  ]},
  { cat: 'อื่นๆ', items: [
    { id: 'ded_housing', name: 'ดอกเบี้ยกู้ยืมบ้าน', max: 100000 },
    { id: 'ded_thai_esg', name: 'กองทุน ThaiESG', max: 300000, note: 'ไม่เกิน 30% / ไม่อยู่ในถัง 5 แสน' },
    { id: 'ded_donate', name: 'เงินบริจาคทั่วไป', max: null, note: 'ไม่เกิน 10% ของเงินได้หลังหัก' },
    { id: 'ded_donate2x', name: 'เงินบริจาค 2 เท่า', max: null, note: 'สถานศึกษา/รพ.รัฐ/กีฬา' },
  ]},
];

const TAX_BRACKETS = [
  { min: 0, max: 150000, rate: 0 },
  { min: 150001, max: 300000, rate: 0.05 },
  { min: 300001, max: 500000, rate: 0.10 },
  { min: 500001, max: 750000, rate: 0.15 },
  { min: 750001, max: 1000000, rate: 0.20 },
  { min: 1000001, max: 2000000, rate: 0.25 },
  { min: 2000001, max: 5000000, rate: 0.30 },
  { min: 5000001, max: Infinity, rate: 0.35 },
];

function calcTax(netIncome) {
  let tax = 0;
  for (const b of TAX_BRACKETS) {
    if (netIncome <= 0) break;
    const taxable = Math.min(netIncome, b.max - b.min + 1);
    if (netIncome > b.min - 1) {
      const amt = Math.min(netIncome - (b.min - 1), b.max - b.min + 1);
      tax += amt * b.rate;
    }
  }
  // Simpler recalc
  tax = 0;
  let remaining = netIncome;
  for (const b of TAX_BRACKETS) {
    if (remaining <= 0) break;
    const width = b.max === Infinity ? remaining : (b.max - b.min + 1);
    const taxableInBracket = Math.min(remaining, width);
    tax += taxableInBracket * b.rate;
    remaining -= taxableInBracket;
  }
  return Math.max(tax, 0);
}
