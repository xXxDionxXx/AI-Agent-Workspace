// ============ DATA LAYER ============

// --- Welfare Data ---
const WELFARE = {
  social33: {
    label: 'ประกันสังคม', emoji: '🔵',
    tagText: 'สวัสดิการพนักงานเอกชน',
    benefits: [
      { cat: '🏥 สิทธิรักษาพยาบาล', items: [
        { n: 'รพ.ที่เข้ารับการรักษา', d: 'เฉพาะ รพ.ตามสิทธิ์', s: 'yellow' }
      ]},
    ]
  },
  gov: {
    label: 'ข้าราชการ', emoji: '💼',
    tagText: 'สวัสดิการกรมบัญชีกลาง',
    benefits: [
      { cat: '🏥 สิทธิรักษาพยาบาล', items: [
        { n: 'รพ.ที่เข้ารับการรักษา', d: 'เฉพาะ รพ.รัฐ (เอกชนได้แค่ฉุกเฉิน 72 ชม.)', s: 'yellow' }
      ]},
    ]
  },
  gold: {
    label: 'บัตรทอง', emoji: '💳',
    tagText: 'หลักประกันสุขภาพถ้วนหน้า',
    benefits: [
      { cat: '🏥 สิทธิรักษาพยาบาล', items: [
        { n: 'รพ.ที่เข้ารับการรักษา', d: 'รักษาฟรีเฉพาะ รพ.รัฐในสิทธิ์', s: 'yellow' }
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
    desc: 'โรงพยาบาลมาตรฐานสูง',
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
];

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
      { name: 'ห้องเดี่ยว รพ.รัฐ', gold: '❌', social: '700', gov: '1,000', private: '4,000 / 6,000 / 9,000' },
      { name: 'ห้องเดี่ยว รพ.เอกชน', gold: '❌', social: '❌', gov: '❌', private: '4,000 / 6,000 / 9,000' },
    ]},
    { cat: '2. ยาและการรักษา', items: [
      { name: 'ยาในบัญชี', gold: '✅', social: '✅', gov: '✅', private: '✅' },
      { name: 'ยานอกบัญชี', gold: '⚠️ จำกัดมาก', social: '⚠️ ขึ้นอยู่กับหมอ/รพ.', gov: '⚠️ ยาไทยได้ แต่ Co-payment ยานอก', private: '✅' },
      { name: 'ยามุ่งเป้า / รังสีรักษา (โรคร้ายแรง)', gold: '⚠️ จำกัดยา / คิวนาน', social: '⚠️ ขึ้นอยู่กับหมอ/รพ.', gov: '⚠️ เงื่อนไขซับซ้อน / มีส่วนต่าง', private: '10 / 30 / 50 ล้าน' },
      { name: 'ผู้ป่วยนอก (OPD)', gold: '✅', social: '✅', gov: '✅', private: '1,500 - 2,000' },
    ]},
    { cat: '3. บริการและความเร็ว', items: [
      { name: 'เทคโนโลยี / คุณภาพการรักษา', gold: '⭐', social: '⭐', gov: '⭐⭐', private: '⭐⭐⭐⭐⭐' },
      { name: 'ความรวดเร็ว / ไม่ต้องรอคิว', gold: '⭐', social: '⭐⭐', gov: '⭐⭐⭐', private: '⭐⭐⭐⭐⭐' },
      { name: 'คุณภาพบริการ / สถานที่', gold: '⭐', social: '⭐⭐', gov: '⭐⭐⭐', private: '⭐⭐⭐⭐⭐' },
    ]},
  ]
};

// --- Health Plans ---
const HEALTH_PLANS = [
  { id: 'economy', name: 'Economy Class', icon: '✈️', room: '4,000', roomNum: 4000,
    ci: '✅ 10 ล้าน / 4 ปี', opd: '❌', note: '(เหมาจ่าย 5 ล้าน)', color: 'var(--aia-blue)' },
  { id: 'business', name: 'Business Class', icon: '🌟', room: '6,000', roomNum: 6000,
    ci: '✅ 30 ล้าน / 4 ปี', opd: '❌', note: '(เหมาจ่าย 15 ล้าน)', color: '#7c3aed' },
  { id: 'first', name: 'First Class', icon: '👑', room: '9,000', roomNum: 9000,
    ci: '✅ 50 ล้าน / 4 ปี', opd: '2,000', note: '(เหมาจ่าย 25 ล้าน)', color: 'var(--aia-red)' },
];

// --- Tax Brackets ---
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
