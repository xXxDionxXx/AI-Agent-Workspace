// ═══ DATA ═══
const IDEAS={
  'มนุษย์เงินเดือน':{
    TOFU:['คุณรู้ไหม? มนุษย์เงินเดือน 80% ไม่รู้ว่าเงินหายไปไหนทุกเดือน','5 ค่าใช้จ่ายที่คนทำงานจ่ายโดยไม่รู้ตัวทุกวัน','เหตุผลที่คุณรู้สึกว่า "เงินไม่พอ" แม้ขึ้นเงินเดือนแล้ว','คนทำงานมือใหม่ควรจัดการเงินเดือนแรกอย่างไร?','ทำไมคนรวยถึงไม่ได้รวยเพราะ "ประหยัด" เพียงอย่างเดียว'],
    MOFU:['วิธีแบ่งเงินเดือน 50/30/20 แบบที่ได้ผลจริงสำหรับคนไทย','Emergency Fund ควรมีเท่าไหร่? คำนวณให้ถูกต้องในนาทีเดียว','เปิดบัญชีออมทรัพย์ดอกเบี้ยสูงได้อย่างไร — ขั้นตอนละเอียด','กองทุน RMF vs SSF เลือกอะไรดี? ตอบแบบเข้าใจง่าย','ประกันชีวิต ควรซื้อตอนไหน? คนทำงานต้องรู้'],
    BOFU:['แผนการเงิน 12 เดือน สำหรับคนที่อยากมีเงิน 100,000 แรก','รีวิว: ลงทุน DCA กองทุนรวมหุ้น 3 ปี ได้ผลอย่างไร','เปิด Port ลงทุนแรก — ทำตามได้เลย ทีละขั้นตอน','คำนวณว่าต้องออมเท่าไหร่ถึงเกษียณได้ตามเป้า','ต้องมีเงินเดือนเท่าไหร่ถึงซื้อบ้านได้? คำนวณให้เลย'],
  },
  'ครอบครัว':{
    TOFU:['คู่รักต้องคุยเรื่องเงินก่อนแต่งงาน — 5 คำถามสำคัญ','ลูกคนแรก ค่าใช้จ่ายพุ่ง! คุณเตรียมพร้อมแค่ไหน?','เหตุผลที่ครอบครัวส่วนใหญ่ทะเลาะเรื่องเงิน (และป้องกันได้)','ค่าเทอมลูก ค่าใช้จ่ายที่พ่อแม่มักประเมินต่ำกว่าความจริง','สอนลูกเรื่องเงิน ควรเริ่มอายุเท่าไหร่?'],
    MOFU:['วิธีทำ Family Budget ที่คู่รักเห็นด้วยทั้งสอง','วางแผนการศึกษาลูก — ควรเริ่มออมตั้งแต่แรกเกิดหรือเปล่า?','ประกันสุขภาพครอบครัว เลือกอย่างไรให้คุ้มค่า','ซื้อบ้าน vs เช่า — สำหรับครอบครัวที่มีลูก อะไรดีกว่า','กองทุนสำรองฉุกเฉิน 6 เดือน สำหรับครอบครัว — คำนวณอย่างไร'],
    BOFU:['แผนการลงทุนสำหรับครอบครัวมีลูก 1 คน ทำอย่างไร','ทำประกันชีวิตให้ครอบครัว — ทุนประกันเท่าไหร่ถึงพอ','เปิด Port ให้ลูก — ลงทุนแทนลูกตั้งแต่เล็กได้ผลอย่างไร','วิธีเขียนพินัยกรรมและวางแผน Estate สำหรับครอบครัวไทย','รีไฟแนนซ์บ้าน ทำเองได้ — ประหยัดดอกเบี้ยแสนบาทขึ้นไป'],
  },
  'ธุรกิจ+ฟรีแลนซ์':{
    TOFU:['ฟรีแลนซ์ไทย 70% ไม่รู้ว่าต้องเสียภาษีอย่างไร','เจ้าของธุรกิจ SME มักพลาดเรื่องเงินสด 3 ข้อนี้','รายได้ไม่แน่นอน แต่ยังออมได้ — แนวคิดสำหรับฟรีแลนซ์','ความแตกต่างระหว่างกำไร vs กระแสเงินสด ที่เจ้าของธุรกิจต้องรู้','ทำไมธุรกิจที่มีกำไรถึงยังล้มละลายได้?'],
    MOFU:['วิธีแยกบัญชีส่วนตัว-ธุรกิจ สำหรับฟรีแลนซ์มือใหม่','วางแผนภาษีฟรีแลนซ์ไทย — ลดหย่อนอะไรได้บ้าง','Cash Flow Forecast คืออะไร? ทำเองง่ายๆ ใน Excel','บัญชีธุรกิจ vs บัญชีส่วนตัว เปิดอะไร ที่ไหน?','ฟรีแลนซ์ควรมีประกันสุขภาพประเภทไหน — เปรียบเทียบให้เลย'],
    BOFU:['แผนออมเกษียณสำหรับฟรีแลนซ์ที่ไม่มีกองทุนสำรองเลี้ยงชีพ','จดทะเบียนบริษัทเดี่ยว vs หุ้นส่วน — ข้อดีข้อเสียด้านภาษี','กู้ SME Loan ธนาคารรัฐ — เอกสารและขั้นตอนครบ','ลงทุนในธุรกิจตัวเอง vs ลงทุนในตลาดหุ้น — คำนวณ ROI','ขยายธุรกิจโดยไม่กู้เงิน — กลยุทธ์การเงิน Bootstrapping'],
  },
};
const ADB={
  Hook:{
    "Cinematic SFX": ['Boom.WAV', 'Clocks Tick.mp3', 'Downer.WAV', 'Futuristic Boom.mp3', 'Gear.WAV', 'Heartbeat.WAV', 'Hit.WAV', 'Impact.WAV', 'Mechanical.mp3', 'Camera_Sound/Camera Clicks.WAV', 'Camera_Sound/Camera Flash.mp3', 'Camera_Sound/Camera Old.mp3', 'Camera_Sound/Camera Shutter_01.WAV', 'Camera_Sound/Camera Shutter_02.WAV', 'Camera_Sound/Camera_Shutter (Digital).mp3', 'Riser/Riser_01.MP3', 'Riser/Riser_02.MP3', 'Riser/Riser_03.MP3', 'Riser/Riser_04.MP3', 'Riser/Riser_05.MP3', 'Riser/Riser_06.MP3', 'Riser/Riser_07.MP3', 'Riser/Riser_08.MP3', 'Riser/Riser_09.MP3', 'Riser/Riser_10.MP3', 'Riser/Riser_11.MP3', 'Riser/Riser_12.MP3', 'Riser/Riser_13.MP3', 'Riser/Riser_14.MP3', 'Riser/Riser_15.MP3', 'Riser/Riser_16.MP3', 'Riser/Riser_17.mp3', 'Riser/Riser_18(Metallic).WAV', 'Riser/Riser_Punch_Stop.WAV', 'Whoosh/Whoosh_01.WAV', 'Whoosh/Whoosh_02.MP3', 'Whoosh/Whoosh_03.MP3', 'Whoosh/Whoosh_Deep.WAV', 'Whoosh/Whoosh_Long.mp3', 'Whoosh/Whoosh_Slience.WAV'],
    "Tonal Sound Effects": ['Key A/1. Pads & Drones - Into The Fog (Am).wav', 'Key A/1. Pads & Drones - Quiet Suspicion (Am).wav', 'Key A/2. Textures - Cello Feathered (A).wav', 'Key A/2. Textures - Smooth (A).wav', 'Key A/3. Hits & Impacts - Piano Hits (A).wav', 'Key A/3. Hits & Impacts - Ping Boom (A).wav', 'Key A/3. Hits & Impacts - Riser Deep Breath (A).wav', 'Key A/3. Hits & Impacts - Sonar Glow (A).wav', 'Key A/4. Vocal Improvs - Vocal Cadence (A).wav', 'Key A (A#_Bb)/1. Pads & Drones - Into The Fog (A#m_Bbm).wav', 'Key A (A#_Bb)/1. Pads & Drones - Quiet Suspicion (A#m_Bbm).wav', 'Key A (A#_Bb)/2. Textures - Cello Feathered (A#_Bb).wav', 'Key A (A#_Bb)/2. Textures - Smooth (A#_Bb).wav', 'Key A (A#_Bb)/3. Hits & Impacts - Piano Hits (A#_Bb).wav', 'Key A (A#_Bb)/3. Hits & Impacts - Ping Boom (A#_Bb).wav', 'Key A (A#_Bb)/3. Hits & Impacts - Riser Deep Breath (A#_Bb).wav', 'Key A (A#_Bb)/3. Hits & Impacts - Sonar Glow (A#_Bb).wav', 'Key A (A#_Bb)/4. Vocal Improvs - Vocal Cadence (A#_Bb).wav', 'Key B/1. Pads & Drones - Into The Fog (Bm).wav', 'Key B/1. Pads & Drones - Quiet Suspicion (Bm).wav', 'Key B/2. Textures - Cello Feathered (B).wav', 'Key B/2. Textures - Smooth (B).wav', 'Key B/3. Hits & Impacts - Piano Hits (B).wav', 'Key B/3. Hits & Impacts - Ping Boom (B).wav', 'Key B/3. Hits & Impacts - Riser Deep Breath (B).wav', 'Key B/3. Hits & Impacts - Sonar Glow (B).wav', 'Key B/4. Vocal Improvs - Vocal Cadence (B).wav', 'Key C/1. Pads & Drones - Into The Fog (Cm).wav', 'Key C/1. Pads & Drones - Quiet Suspicion (Cm).wav', 'Key C/2. Textures - Cello Feathered (C).wav', 'Key C/2. Textures - Smooth (C).wav', 'Key C/3. Hits & Impacts - Piano Hits (C).wav', 'Key C/3. Hits & Impacts - Ping Boom (C).wav', 'Key C/3. Hits & Impacts - Riser Deep Breath (C).wav', 'Key C/3. Hits & Impacts - Sonar Glow (C).wav', 'Key C/4. Vocal Improvs - Vocal Cadence (C).wav', 'Key C (C#_Db)/1. Pads & Drones - Into The Fog (C#m_Dbm).wav', 'Key C (C#_Db)/1. Pads & Drones - Quiet Suspicion (C#m_Dbm).wav', 'Key C (C#_Db)/2. Textures - Cello Feathered (C#_Db).wav', 'Key C (C#_Db)/2. Textures - Smooth (C#_Db).wav', 'Key C (C#_Db)/3. Hits & Impacts - Piano Hits (C#_Db).wav', 'Key C (C#_Db)/3. Hits & Impacts - Ping Boom (C#_Db).wav', 'Key C (C#_Db)/3. Hits & Impacts - Riser Deep Breath (C#_Db).wav', 'Key C (C#_Db)/3. Hits & Impacts - Sonar Glow (C#_Db).wav', 'Key C (C#_Db)/4. Vocal Improvs - Vocal Cadence (C#_Db).wav', 'Key D/1. Pads & Drones - Into The Fog (Dm).wav', 'Key D/1. Pads & Drones - Quiet Suspicion (Dm).wav', 'Key D/2. Textures - Cello Feathered (D).wav', 'Key D/2. Textures - Smooth (D).wav', 'Key D/3. Hits & Impacts - Piano Hits (D).wav', 'Key D/3. Hits & Impacts - Ping Boom (D).wav', 'Key D/3. Hits & Impacts - Riser Deep Breath (D).wav', 'Key D/3. Hits & Impacts - Sonar Glow (D).wav', 'Key D/4. Vocal Improvs - Vocal Cadence (D).wav', 'Key D (D#_Eb)/1. Pads & Drones - Into The Fog (D#m_Ebm).wav', 'Key D (D#_Eb)/1. Pads & Drones - Quiet Suspicion (D#m_Ebm).wav', 'Key D (D#_Eb)/2. Textures - Cello Feathered (D#_Eb).wav', 'Key D (D#_Eb)/2. Textures - Smooth (D#_Eb).wav', 'Key D (D#_Eb)/3. Hits & Impacts - Piano Hits (D#_Eb).wav', 'Key D (D#_Eb)/3. Hits & Impacts - Ping Boom (D#_Eb).wav', 'Key D (D#_Eb)/3. Hits & Impacts - Riser Deep Breath (D#_Eb).wav', 'Key D (D#_Eb)/3. Hits & Impacts - Sonar Glow (D#_Eb).wav', 'Key D (D#_Eb)/4. Vocal Improvs - Vocal Cadence (D#_Eb).wav', 'Key E/1. Pads & Drones - Into The Fog (Em).wav', 'Key E/1. Pads & Drones - Quiet Suspicion (Em).wav', 'Key E/2. Textures - Cello Feathered (E).wav', 'Key E/2. Textures - Smooth (E).wav', 'Key E/3. Hits & Impacts - Piano Hits (E).wav', 'Key E/3. Hits & Impacts - Ping Boom (E).wav', 'Key E/3. Hits & Impacts - Riser Deep Breath (E).wav', 'Key E/3. Hits & Impacts - Sonar Glow (E).wav', 'Key E/4. Vocal Improvs - Vocal Cadence (E).wav', 'Key F/1. Pads & Drones - Into The Fog (Fm).wav', 'Key F/1. Pads & Drones - Quiet Suspicion (Fm).wav', 'Key F/2. Textures - Cello Feathered (F).wav', 'Key F/2. Textures - Smooth (F).wav', 'Key F/3. Hits & Impacts - Piano Hits (F).wav', 'Key F/3. Hits & Impacts - Ping Boom (F).wav', 'Key F/3. Hits & Impacts - Riser Deep Breath (F).wav', 'Key F/3. Hits & Impacts - Sonar Glow (F).wav', 'Key F/4. Vocal Improvs - Vocal Cadence (F).wav', 'Key F (F#_Gb)/1. Pads & Drones - Into The Fog (F#m_Gbm).wav', 'Key F (F#_Gb)/1. Pads & Drones - Quiet Suspicion (F#m_Gbm).wav', 'Key F (F#_Gb)/2. Textures - Cello Feathered (F#_Gb).wav', 'Key F (F#_Gb)/2. Textures - Smooth (F#_Gb).wav', 'Key F (F#_Gb)/3. Hits & Impacts - Piano Hits (F#_Gb).wav', 'Key F (F#_Gb)/3. Hits & Impacts - Ping Boom (F#_Gb).wav', 'Key F (F#_Gb)/3. Hits & Impacts - Riser Deep Breath (F#_Gb).wav', 'Key F (F#_Gb)/3. Hits & Impacts - Sonar Glow (F#_Gb).wav', 'Key F (F#_Gb)/4. Vocal Improvs - Vocal Cadence (F#_Gb).wav', 'Key G/1. Pads & Drones - Into The Fog (Gm).wav', 'Key G/1. Pads & Drones - Quiet Suspicion (Gm).wav', 'Key G/2. Textures - Cello Feathered (G).wav', 'Key G/2. Textures - Smooth (G).wav', 'Key G/3. Hits & Impacts - Piano Hits (G).wav', 'Key G/3. Hits & Impacts - Ping Boom (G).wav', 'Key G/3. Hits & Impacts - Riser Deep Breath (G).wav', 'Key G/3. Hits & Impacts - Sonar Glow (G).wav', 'Key G/4. Vocal Improvs - Vocal Cadence (G).wav', 'Key G (G#_Ab)/1. Pads & Drones - Into The Fog (G#m_Abm).wav', 'Key G (G#_Ab)/1. Pads & Drones - Quiet Suspicion (G#m_Abm).wav', 'Key G (G#_Ab)/2. Textures - Cello Feathered (G#_Ab).wav', 'Key G (G#_Ab)/2. Textures - Smooth (G#_Ab).wav', 'Key G (G#_Ab)/3. Hits & Impacts - Piano Hits (G#_Ab).wav', 'Key G (G#_Ab)/3. Hits & Impacts - Ping Boom (G#_Ab).wav', 'Key G (G#_Ab)/3. Hits & Impacts - Riser Deep Breath (G#_Ab).wav', 'Key G (G#_Ab)/3. Hits & Impacts - Sonar Glow (G#_Ab).wav', 'Key G (G#_Ab)/4. Vocal Improvs - Vocal Cadence (G#_Ab).wav']
  },
  Background:{
    Fast:['Brenton Wood from The Very Best Of.m4a', 'Mando instrumental.m4a'],
    Medium:['Superstition.m4a', 'Sweet home alabama.m4a'],
    Slow:['Shaggy Angel.m4a', 'Snowfall.m4a', 'Sunkiss.m4a', 'The Mountain Is You.m4a', 'Time.m4a', 'Time_alt.m4a', 'United in Grief.m4a', 'United in Grief_alt.m4a', 'Yung Kai.m4a']
  },
  Conclusion:{
    Fast:['Brenton Wood from The Very Best Of.m4a', 'Evergreen.m4a', "I'm so excited.m4a", 'Il Vento Doro.m4a', 'Mando instrumental.m4a', 'MGMT Kids.m4a', 'MGMT Time to Pretend.m4a'],
    Medium:['Build me up buttercup.m4a', 'Double life.m4a', 'Everyones a winner.m4a', 'Fortunate son.m4a', 'Freedom.m4a', 'Il Vento Doro.m4a', 'Its a mans world.m4a', 'Jump.m4a', 'Kids.m4a', 'Roundabout.m4a', 'Soul Chef.m4a', 'Sweet home alabama.m4a', 'THe money ball guitar theme.m4a', 'Won’t get fooled again.m4a'],
    Slow:['Everything.m4a', 'Hoopty Whippin.m4a', 'Hotel California.m4a', 'Its a mans world.m4a', 'THe money ball guitar theme.m4a']
  }
};
const CAM_CL=['ใช้ DJI Osmo Pocket 3 เท่านั้น','ตั้งค่า Resolution: 4K','ตั้งค่า Frame Rate: 24 FPS','ตั้งค่า Color Profile: D-Log M (10-bit)','Sharpness: -2','Noise Reduction: -2','เปิด Tilt Lock','ล็อค AE (Auto Exposure)','ล็อค AF (Auto Focus)','ตั้งกล้องบน Tripod ล็อคแน่น','ตรวจสอบแบตเตอรี่ > 80%','ตรวจสอบ Storage ว่าง > 20GB'];
const GR_CL=['เปิด DaVinci Resolve แล้ว','ตั้ง CST: D-Log M → Rec.709 เสร็จแล้ว','ใส่ Warm LUT แล้ว (ที่ 40%)','ปรับ Saturation เล็กน้อย','ยก Shadow Lift นิดหน่อย','Export ไฟล์ Graded แล้ว'];
const CUT_CL=['ตัด Hook เปิดให้นิ่งก่อนพูด — อย่าพูดระหว่าง Swish Pan ยังเบลออยู่','Jump Cut + Zoom 8-12% ทุกครั้งที่ตัดเดดแอร์ — ทำให้คัทมีมิติ','ตรวจ Push-In ว่าอยู่ตรงจุดสำคัญจริงๆ (ไม่ใช่แค่สวย)','ตรวจ Swish Pan ว่าเร็วพอ — Swish Pan ช้า = ดูไม่ตั้งใจ','ใส่ J-Cut: เสียงนำก่อนภาพ 0.5s ทุกจุดเปลี่ยนที่สำคัญ','ตรวจ Subject Movement — มีการขยับตัว หยิบของ หรือชี้นิ้วในฉากที่ไม่มี camera movement','ตรวจ Match Cut / Editing on Motion ว่า Shot A-B เชื่อมกันได้ไหม','ดูรอบแรกโดยไม่มีเสียง — ภาพคนดูสิ่งที่เราต้องการให้ดูไหม?','ตรวจ Re-Hook ที่วิ 15 และ 30 ว่ามีแรงพอที่จะดึงคนดูกลับ','ทำ Skip-to-End Test: ดู 5 วิแรก + 5 วิสุดท้าย — Payoff ครบไหม'];
const POST_CL=['Subtitle สี #ffd935 ครบทุก segment','ตรวจ Safe Zone (ทุก text อยู่ใน 80%)','ใส่ Object / Graphic Behind Person แล้ว','ทำ Skip-to-End Test (ดูจากท้ายย้อนกลับ)','ตรวจ Audio sync ครบทุก cut','ดู Preview บนโทรศัพท์จริง','Export ด้วย setting ที่กำหนด'];
const EXP_CL=['ส่ง 1080p สำหรับ Reels/TikTok','ส่ง 4K สำหรับ YouTube','ตรวจ Thumbnail พร้อมแล้ว','เขียน Caption + Hashtag พร้อมแล้ว','กำหนดเวลา post ไว้แล้ว'];

// ═══ STATE ═══
let S={icp:'',funnel:'',idea:'',mSec:'Intro',mMood:'',curTrk:null,curIdx:-1,curList:[],lkTrk:null,script:{hook:'',body:'',cta:''},editList:null,sfxTab:'Cinematic',checks:{},faders:{voice:-6,bgm:-24,sfx:-12},lut:40,_upSec:'',_upMood:'',pillars:{topic:'',verbalHook:'',visualHook:'',ref:'',structure:'',format:'',value:'',cta:'',ctaType:''}};
function ldS(){try{const d=localStorage.getItem('ft_s3');if(d)Object.assign(S,JSON.parse(d));}catch(e){}}
function svS(){try{localStorage.setItem('ft_s3',JSON.stringify(S));}catch(e){}}
function clearAll(){if(!confirm('ล้างข้อมูลทั้งหมด?'))return;localStorage.removeItem('ft_s3');location.reload();}

// ═══ 6-PILLAR FUNCTIONS ═══
// ═══ HOOK LIBRARY (from Nick's files) ═══
const HOOK_LIB={
  verbal:{
    "TOFU (เรียกแขก)": [
      "[หัวข้อ] นี่คือสิ่งที่คน 99% มักจะเข้าใจผิด",
      "ถ้าคุณกำลังทำ [หัวข้อ] อยู่ หยุดดูคลิปนี้ก่อนครับ",
      "ความลับของ [หัวข้อ] ที่ไม่มีใครยอมบอกคุณ",
      "นี่คือวิธีรับมือกับ [หัวข้อ] ฉบับ [กลุ่มเป้าหมาย]",
      "รู้หรือไม่? [หัวข้อ] สามารถเปลี่ยนชีวิตคุณได้ใน 3 นาที",
      "ใครว่า [หัวข้อ] เป็นเรื่องยาก? ผมจะทำให้ดู",
      "จัดอันดับ [หัวข้อ] จากแย่สุดไปดีสุด",
      "ถ้าคุณเป็น [กลุ่มเป้าหมาย] นี่คือ [หัวข้อ] ที่คุณต้องรู้",
      "คุณกำลังสูญเสียโอกาสถ้ายังไม่รู้เรื่อง [หัวข้อ]",
      "สิ่งที่ [กลุ่มเป้าหมาย] มักพลาดเมื่อพูดถึง [หัวข้อ]"
    ],
    "MOFU (สร้าง Trust)": [
      "ผมลองทำ [หัวข้อ] มาแล้ว และนี่คือสิ่งที่ได้เรียนรู้",
      "3 ขั้นตอนง่ายๆ ในการจัดการ [หัวข้อ]",
      "นี่คือความจริงเบื้องหลัง [หัวข้อ] ที่ผมเจอมากับตัว",
      "เบื้องหลังความสำเร็จของ [หัวข้อ] ที่ผมใช้บ่อยที่สุด",
      "ทำไม [กลุ่มเป้าหมาย] ถึงควรใส่ใจเรื่อง [หัวข้อ] มากขึ้น",
      "บทเรียนราคาแพงจากการทำ [หัวข้อ] ผิดพลาด",
      "วิธีสร้าง [หัวข้อ] จากศูนย์จนสำเร็จ",
      "ถ้าให้ผมเริ่ม [หัวข้อ] ใหม่ตั้งแต่ต้น ผมจะทำแบบนี้",
      "คำถามที่ [กลุ่มเป้าหมาย] ถามผมบ่อยที่สุดเกี่ยวกับ [หัวข้อ]",
      "แชร์ประสบการณ์ตรง: เมื่อผมต้องรับมือกับ [หัวข้อ]"
    ],
    "BOFU (ปิดการขาย)": [
      "เครื่องมือที่ดีที่สุดสำหรับ [หัวข้อ] ที่ผมอยากแนะนำ",
      "ไม่ต้องลองผิดลองถูก นี่คือทางลัดสำหรับ [หัวข้อ]",
      "ถ้าคุณพร้อมจะเปลี่ยน [หัวข้อ] ให้ดีขึ้น นี่คือคำตอบ",
      "ลงทุนกับ [หัวข้อ] ยังไงให้คุ้มค่าที่สุด",
      "สรุปสั้นๆ ทำไมบริการ [หัวข้อ] ถึงตอบโจทย์คุณ",
      "เจาะลึกฟีเจอร์เด็ดของ [หัวข้อ] ที่คุณห้ามพลาด",
      "ถึงเวลาเปลี่ยน [หัวข้อ] ของคุณแล้ว ด้วยวิธีนี้",
      "รีวิวแบบหมดเปลือก: [หัวข้อ] ดีจริงหรือจกตา?",
      "วิธีประยุกต์ใช้ [หัวข้อ] ให้ได้ผลลัพธ์ทันที",
      "โปรโมชั่นพิเศษสำหรับ [กลุ่มเป้าหมาย] ที่สนใจ [หัวข้อ]"
    ]
  },
  visual:[
    {name:'Unique Angle',desc:'POV shot, High-angle, หรือ Low-angle แทน Eye-level ธรรมดา'},
    {name:'Bold Cinematic Text',desc:'Bold Text on Negative Space'},
    {name:'Countdown',desc:'นับถอยหลัง 5-3-1 → payoff — ดึงคนอยู่ถึงจุดสำคัญ (เช่น รถกำลังจะวิ่งมาชน หรือกำลังมีคนกำลังจะมาต่อย)'},
    {name:'Funny/Unusual Visual',desc:'ใช้ภาพแปลกตาหรือตลกขบขันเพื่อดึงความสนใจทันที'},
    {name:'Walking & Talking',desc:'เดินขณะพูด — เพิ่ม Energy โดยไม่ต้องขยับกล้อง'},
    {name:'Unique Effect',desc:'Whip-action หรือ effect ที่คนไม่คาดว่าจะเห็นใน Financetry'}
  ],
  rehook:[
    {cat:"PATTERN INTERRUPT",items:["[SOUND: Record Scratch] เดี๋ยวก่อน...","[ZOOM IN] ลองคิดภาพตามนะครับ","[CAMERA SHAKE] แต่ปัญหาคือ..."]},
    {cat:"OPEN LOOP",items:["เดี๋ยวผมจะเฉลยตอนท้ายคลิป...","ซึ่งจุดนี้เองที่หลายคนพลาด...","และความลับที่แท้จริงคือ..."]},
    {cat:"VALUE PROMISE",items:["ถ้ารู้เทคนิคนี้ ชีวิตจะง่ายขึ้นเยอะ","ถ้าทำตามข้อนี้ได้ คุณจะลดเวลาไป 80%","นี่คือเหตุผลที่ข้อต่อไปสำคัญมาก"]}
  ]
};
let curVerbalCat='TOFU (เรียกแขก)';

function setVerbalCat(c){
  curVerbalCat=c;
  renderHookLibrary();
}

function renderHookLibrary(){
  // 1. Render Verbal Hooks (with categories)
  const cats = Object.keys(HOOK_LIB.verbal);
  const hookTabs = document.getElementById('hook-tabs');
  if(hookTabs) {
    hookTabs.innerHTML = cats.map(c => 
      `<button onclick="setVerbalCat('${c}')" style="padding:4px 10px;border-radius:50px;border:1.5px solid ${c===curVerbalCat?'var(--blue)':'var(--border)'};background:${c===curVerbalCat?'var(--blue)':'white'};color:${c===curVerbalCat?'white':'var(--text)'};font-family:'Sarabun',sans-serif;font-weight:600;font-size:12px;cursor:pointer;">${c}</button>`
    ).join('');
  }
  
  const vList = HOOK_LIB.verbal[curVerbalCat] || [];
  const vCont = document.getElementById('verbal-hooks-container');
  if(vCont) {
    vCont.innerHTML = vList.map(h => {
      let isSel = S.pillars?.verbalHook === h;
      return `<button class="chip ${isSel?'selected':''}" style="text-align:left;white-space:normal;line-height:1.4;background:${isSel?'var(--blue)':'white'};color:${isSel?'white':'var(--text)'};" onclick="useVerbalHook(this)">🪝 ${h}</button>`;
    }).join('');
  }
  
  // 2. Render Re-hooks
  const rCont = document.getElementById('rehooks-container');
  if(rCont) {
    rCont.innerHTML = HOOK_LIB.rehook.map(cat => 
      `<div style="font-size:12px;font-weight:700;color:var(--text-muted);margin:8px 0 4px;">📌 ${cat.cat}</div>` +
      cat.items.map(h => {
        let isSel = (S.pillars?.rehook || []).includes(h);
        return `<button class="chip ${isSel?'selected':''}" style="text-align:left;white-space:normal;background:${isSel?'var(--blue)':'white'};color:${isSel?'white':'var(--text)'};" onclick="useRehook(this)">${isSel?'✅ ':''}${h}</button>`;
      }).join('')
    ).join('');
  }
  
  // 3. Render Visual Hooks
  const visCont = document.getElementById('visual-hooks-container');
  if(visCont) {
    visCont.innerHTML = HOOK_LIB.visual.map(h => {
      let isSel = S.pillars?.visualHook === h.name;
      return `<button class="chip ${isSel?'selected':''}" style="display:flex;flex-direction:column;align-items:flex-start;background:${isSel?'var(--blue)':'white'};color:${isSel?'white':'var(--text)'};" onclick="useVisualHook(this)">
        <div class="vtitle" style="font-weight:700;margin-bottom:4px;">${h.name}</div>
        <div style="font-size:12px;opacity:0.8;text-align:left;white-space:normal;line-height:1.4;">${h.desc}</div>
      </button>`;
    }).join('');
  }
}
function savePillars(){
  if(!S.pillars)S.pillars={};
  S.pillars.topic=document.getElementById('p1-topic')?.value||'';
  S.pillars.verbalHook=document.getElementById('p2-verbal')?.value||'';
  S.pillars.visualHook=document.getElementById('p2-visual')?.value||'';
  S.pillars.ref=document.getElementById('p2-ref')?.value||'';
  S.pillars.structureCustom=document.getElementById('p3-custom')?.value||'';
  S.pillars.value=document.getElementById('p5-value')?.value||'';
  S.pillars.cta=document.getElementById('p6-cta')?.value||'';
  svS();
}
function loadPillars(){
  if(!S.pillars)return;
  const set=(id,v)=>{const el=document.getElementById(id);if(el)el.value=v||'';};
  set('p1-topic',S.pillars.topic);
  set('p2-verbal',S.pillars.verbalHook);
  set('p2-visual',S.pillars.visualHook);
  set('p2-ref',S.pillars.ref);
  set('p3-custom',S.pillars.structureCustom);
  set('p5-value',S.pillars.value);
  set('p6-cta',S.pillars.cta);
  if(S.pillars.structure){
    document.querySelectorAll('#p3-struct-btns button').forEach(b=>{
      const active=b.textContent.trim()===S.pillars.structure;
      b.style.background=active?'rgba(16,185,129,0.1)':'white';
      b.style.borderColor=active?'var(--green)':'var(--border)';
      b.style.color=active?'var(--green)':'inherit';
    });
  }
  if(S.pillars.format){
    document.querySelectorAll('#p4-format-btns button').forEach(b=>{
      const active=b.textContent.trim()===S.pillars.format||b.getAttribute('onclick')?.includes(S.pillars.format);
      b.style.background=active?'rgba(139,92,246,0.1)':'white';
      b.style.borderColor=active?'var(--purple)':'var(--border)';
      b.style.color=active?'var(--purple)':'inherit';
    });
  }
  if(S.pillars.ctaType)setCTAType(S.pillars.ctaType,true);
}
function selPillar3(btn,val){
  S.pillars=S.pillars||{};
  S.pillars.structure=val;
  document.querySelectorAll('#p3-struct-btns button').forEach(b=>{
    b.style.background='white';b.style.borderColor='var(--border)';b.style.color='inherit';
  });
  btn.style.background='rgba(16,185,129,0.1)';btn.style.borderColor='var(--green)';btn.style.color='var(--green)';
  svS();toast('✅','เลือก Structure: '+val.split('→')[0].trim()+'...');
}
function selPillar4(btn,val){
  S.pillars=S.pillars||{};
  S.pillars.format=val;
  document.querySelectorAll('#p4-format-btns button').forEach(b=>{
    b.style.background='white';b.style.borderColor='var(--border)';b.style.color='inherit';
  });
  btn.style.background='rgba(139,92,246,0.1)';btn.style.borderColor='var(--purple)';btn.style.color='var(--purple)';
  svS();toast('✅','เลือก Format: '+val.split('—')[0].trim());
}
function setCTAType(type,silent){
  S.pillars=S.pillars||{};
  S.pillars.ctaType=type;
  const tpls=CTA_TEMPLATES[type]||[];
  document.getElementById('cta-t-follow').style.background=type==='follow'?'rgba(239,68,68,0.1)':'white';
  document.getElementById('cta-t-follow').style.borderColor=type==='follow'?'#EF4444':'rgba(239,68,68,0.3)';
  document.getElementById('cta-t-lead').style.background=type==='lead'?'rgba(239,68,68,0.1)':'white';
  document.getElementById('cta-t-lead').style.borderColor=type==='lead'?'#EF4444':'rgba(239,68,68,0.3)';
  const cont=document.getElementById('cta-templates');
  cont.innerHTML=tpls.map(t=>`<button onclick="useCTATemplate(this)" style="padding:6px 10px;border:1.5px solid rgba(239,68,68,0.2);border-radius:7px;background:white;font-family:'Sarabun',sans-serif;font-size:11px;text-align:left;cursor:pointer;width:100%;line-height:1.4;">${t}</button>`).join('');
  if(!silent)svS();
}
function useCTATemplate(btn){
  const input=document.getElementById('p6-cta');
  if(input){input.value=btn.textContent.trim();savePillars();}
  toast('✅','ใส่ CTA template แล้ว!');
}
function applyPillarsToScript(){
  savePillars();
  const p=S.pillars||{};
  const struct=p.structure||p.structureCustom||'Hook → Body → CTA';
  const hints=[];
  if(p.topic)hints.push(`📌 Topic: ${p.topic}`);
  if(p.verbalHook)hints.push(`🗣 Verbal Hook Ref: "${p.verbalHook}"`);
  if(p.visualHook)hints.push(`👁 Visual Hook Ref: ${p.visualHook}`);
  if(struct)hints.push(`📐 Structure: ${struct}`);
  if(p.format)hints.push(`🎥 Format: ${p.format}`);
  if(p.cta)hints.push(`🎯 CTA: ${p.cta}`);
  const hookNote=hints.length?`[PILLAR NOTE]\n${hints.join('\n')}\n\n`:'';
  const hook=document.getElementById('script-hook');
  if(hook&&!hook.value&&p.verbalHook){hook.value=hookNote+p.verbalHook;onScript();}
  else if(hook&&hook.value.indexOf('[PILLAR NOTE]')<0){hook.value=hookNote+hook.value;onScript();}
  const body=document.getElementById('script-body');
  if(body&&!body.value&&p.value){body.value=p.value;onScript();}
  const cta=document.getElementById('script-cta');
  if(cta&&!cta.value&&p.cta){cta.value=p.cta;onScript();}
  toast('✅','ใส่ข้อมูล Pillars ลงใน Script แล้ว!');
}

// ═══ TABS ═══
let curTab=0;
function switchTab(i){
  document.querySelectorAll('.tab-btn').forEach((b,j)=>b.classList.toggle('active',i===j));
  document.querySelectorAll('.step-panel').forEach((p,j)=>p.classList.toggle('active',i===j));
  curTab=i;
  if(i===1){refScriptCtx();loadPillars();renderHookLibrary();}
  if(i===2){refEditCtx();if(!S.editList)regenEditList();}
  if(i===3)refProd();
}
function goToStep(i){switchTab(i);window.scrollTo({top:0,behavior:'smooth'});}
function mkDone(i){const e=document.getElementById('check-'+i);if(e&&!e.classList.contains('done')){e.classList.add('done','just-done');setTimeout(()=>e.classList.remove('just-done'),500);}}

// ═══ ICP/FUNNEL/IDEAS ═══
function setICP(v){
  S.icp=v;
  document.querySelectorAll('#icp-chips .chip').forEach(b=>{
    const t=b.textContent.trim();
    b.classList.toggle('active',(v==='มนุษย์เงินเดือน'&&t.includes('มนุษย์'))||(v==='ครอบครัว'&&t.includes('ครอบครัว'))||(v==='ธุรกิจ+ฟรีแลนซ์'&&t.includes('ธุรกิจ')));
  });
  renderIdeas();svS();
}
function setFunnel(v){
  S.funnel=v;
  document.querySelectorAll('#funnel-chips .funnel-chip').forEach(b=>b.classList.toggle('active',b.querySelector('.fl').textContent===v));
  renderIdeas();
  renderCTA();
  svS();
}

function renderCTA(){
  const c=document.getElementById('cta-container');
  if(!S.funnel){
    c.innerHTML='<div class="no-ideas-msg">รอวิเคราะห์จาก Funnel Stage...</div>';
    return;
  }
  const ctas = CTA_TEMPLATES[S.funnel] || [];
  c.innerHTML = ctas.map(t => `<button class="chip" onclick="useCTATemplate(this)">${t}</button>`).join('');
}

function renderIdeas(){
  const c=document.getElementById('ideas-container');
  const lbl=document.getElementById('ideas-label');
  if(!S.icp||!S.funnel){c.innerHTML='<div class="no-ideas-msg">👆 เลือก ICP และ Funnel ก่อน</div>';return;}
  lbl.innerHTML=`💡 Ideas — <span style="color:var(--blue-light)">${eh(S.icp)}</span> × <span style="color:var(--gold-dark)">${S.funnel}</span>`;
  const ideas=(IDEAS[S.icp]||{})[S.funnel]||[];
  c.innerHTML='<div class="ideas-grid">'+ideas.map((idea,i)=>`<div class="idea-card${S.idea===idea?' selected':''}" onclick="selIdea(${i})"><div class="idea-num">Idea ${i+1}</div><div class="idea-text">${eh(idea)}</div></div>`).join('')+'</div>';
  if(S.icp&&S.funnel)mkDone(0);
}
function selIdea(i){
  const ideas=(IDEAS[S.icp]||{})[S.funnel]||[];
  S.idea=ideas[i]||'';
  S.pillars=S.pillars||{};
  S.pillars.topic=S.idea;
  renderIdeas();
  renderHookLibrary();
  toast('✅','เลือกไอเดียแล้ว — Verbal Hook จะเปลี่ยนตาม Idea นี้!');
  svS();
}

// ═══ MUSIC ═══
const aud=document.getElementById('aud');
function setMSec(s){S.mSec=s;S.mMood='';document.querySelectorAll('.music-tab[id^="msec-"]').forEach(b=>b.classList.toggle('active',b.id==='msec-'+s));renderMoods();svS();}

function setBGMTab(sec){
  S.mSec=sec;
  S.mMood='';
  document.querySelectorAll('.btab').forEach(b=>{
    b.classList.remove('active');
    b.style.background='transparent';
    b.style.color='var(--text-muted)';
    b.style.boxShadow='none';
  });
  const activeBtn=document.getElementById('btab-'+sec);
  if(activeBtn){
    activeBtn.classList.add('active');
    activeBtn.style.background='white';
    activeBtn.style.color='var(--blue)';
    activeBtn.style.boxShadow='0 1px 4px rgba(0,0,0,0.08)';
  }
  renderMoods();
  svS();
}
function renderMoods(){
  const moods=Object.keys(ADB[S.mSec]||{});
  const el = document.getElementById('mood-chips') || document.getElementById('mood-buttons');
  if(!el) return;
  el.innerHTML=moods.map(m=>`<button class="mood-btn${S.mMood===m?' active':''}" onclick="setMood('${m}')" style="padding:6px 14px;border-radius:50px;border:1.5px solid ${S.mMood===m?'var(--blue)':'var(--border)'};background:${S.mMood===m?'var(--blue)':'white'};color:${S.mMood===m?'white':'var(--text)'};font-family:'Sarabun',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all 0.15s;">${m.replace(/_/g,' ')}</button>`).join('');
  renderTracks();
}
function setMood(m){S.mMood=m;renderMoods();renderTracks();svS();}
function getAudioPath(sec, mood, filename) {
  if(sec==='Hook') {
    if(mood==='Cinematic SFX') return `3-Post-Production/Audio/SFX/Cinematic SFX/${filename}`;
    if(mood==='Tonal Sound Effects') return `3-Post-Production/Audio/Tonal Sound Effects/${filename}`;
  }
  if(sec==='Background') return `3-Post-Production/Audio/Background/${mood}/${filename}`;
  if(sec==='Conclusion') return `3-Post-Production/Audio/Conclusion/${mood}/${filename}`;
  return `3-Post-Production/Audio/${sec}/${mood}/${filename}`;
}

function renderTracks(){
  const list=document.getElementById('track-list');
  const pk=document.getElementById('file-picker-area');
  if(!S.mMood){list.innerHTML='<div style="padding:20px;text-align:center;color:var(--text-muted);font-size:13px;font-family:Sarabun,sans-serif;">เลือก Mood เพื่อดูเพลง</div>';pk.classList.add('hidden');return;}
  const tracks=ADB[S.mSec]?.[S.mMood];
  if(!tracks||!tracks.length){
    pk.classList.remove('hidden');
    let dp = getAudioPath(S.mSec, S.mMood, '');
    document.getElementById('fp-display').textContent=dp;
    if(S.curList.length&&S._upSec===S.mSec&&S._upMood===S.mMood){
      list.innerHTML=S.curList.map((t,i)=>`<div class="track-item${S.curTrk&&S.curTrk.name===t.name?' playing':''}" onclick="playT(${i})"><div class="track-play-icon">▶</div><div class="track-name">${eh(t.name)}</div></div>`).join('');
    }else{list.innerHTML='';}
    return;
  }
  pk.classList.add('hidden');
  S.curList=tracks.map(n=>{
    let p = getAudioPath(S.mSec, S.mMood, n);
    return {name:n.replace(/\.[^/.]+$/,'').replace(/^.*\//,''),path:p};
  });
  list.innerHTML=S.curList.map((t,i)=>{
    const pl=S.curTrk&&S.curTrk.path===t.path;
    const lk=S.lkTrk&&S.lkTrk.path===t.path;
    return`<div class="track-item${pl?' playing':''}${lk?' lk':''}" onclick="playT(${i})"><div class="track-play-icon">${pl?'<div class="waveform" style="display:flex;"><span></span><span></span><span></span></div>':'▶'}</div><div class="track-name">${eh(t.name)}</div>${lk?'<div class="track-lock-badge">🔒 Locked</div>':''}</div>`;
  }).join('');
}
function loadBGM(files){
  if(!files.length)return;
  S.curList=Array.from(files).map(f=>({name:f.name.replace(/\.[^/.]+$/,''),blobUrl:URL.createObjectURL(f),isBlob:true}));
  S._upSec=S.mSec;S._upMood=S.mMood;
  document.getElementById('track-list').innerHTML=S.curList.map((t,i)=>`<div class="track-item" onclick="playT(${i})"><div class="track-play-icon">▶</div><div class="track-name">${eh(t.name)}</div></div>`).join('');
  playT(0);
}
function loadSFX(files){
  if(!files.length)return;
  document.getElementById('sfx-list').innerHTML=Array.from(files).map(f=>{
    const url=URL.createObjectURL(f);const nm=f.name.replace(/\.[^/.]+$/,'');
    return`<div class="track-item" onclick="playSFXB('${url}','${nm.replace(/'/g,"\\'")}')"><div class="track-play-icon">▶</div><div class="track-name">${eh(nm)}</div></div>`;
  }).join('');
}
function playSFXB(url,nm){aud.src=url;aud.play().catch(()=>{});document.getElementById('ptn').textContent=nm;document.getElementById('pf').textContent='SFX';}
function playT(i){
  if(i<0||i>=S.curList.length)return;
  const t=S.curList[i];S.curTrk={...t};S.curIdx=i;
  aud.src=t.isBlob?t.blobUrl:t.path;
  aud.play().catch(()=>toast('⚠️','ไม่พบไฟล์ — ตรวจ path: 3-Post-Production/Audio/'));
  document.getElementById('ptn').textContent=t.name;
  document.getElementById('pf').textContent=t.path||'Uploaded';
  document.getElementById('play-btn').textContent='⏸';
  document.getElementById('waveform').style.display='flex';
  renderTracks();svS();
}
function togglePlay(){
  if(aud.paused){aud.play().catch(()=>{});document.getElementById('play-btn').textContent='⏸';document.getElementById('waveform').style.display='flex';}
  else{aud.pause();document.getElementById('play-btn').textContent='▶';document.getElementById('waveform').style.display='none';}
}
function prevT(){if(S.curIdx>0)playT(S.curIdx-1);}
function nextT(){if(S.curIdx<S.curList.length-1)playT(S.curIdx+1);}
aud.addEventListener('timeupdate',()=>{
  if(!aud.duration)return;
  const p=(aud.currentTime/aud.duration)*100;
  document.getElementById('progress-fill').style.width=p+'%';
  document.getElementById('seek-r').value=p;
  document.getElementById('tc').textContent=ft(aud.currentTime);
  document.getElementById('tt').textContent=ft(aud.duration);
});
aud.addEventListener('ended',()=>{document.getElementById('play-btn').textContent='▶';document.getElementById('waveform').style.display='none';nextT();});
aud.addEventListener('error',()=>{document.getElementById('play-btn').textContent='▶';document.getElementById('waveform').style.display='none';});
function seekR(v){if(aud.duration)aud.currentTime=(v/100)*aud.duration;}
function ft(s){const m=Math.floor(s/60);return m+':'+Math.floor(s%60).toString().padStart(2,'0');}
function toggleLock(){
  if(!S.curTrk){toast('⚠️','เลือกเพลงก่อน');return;}
  if(S.lkTrk&&S.lkTrk.path===S.curTrk.path){
    S.lkTrk=null;
    document.getElementById('lk-btn').textContent='🔒 Lock';
    document.getElementById('lk-btn').classList.remove('lk-on');
    document.getElementById('lk-disp').classList.add('hidden');
  }else{
    S.lkTrk={...S.curTrk};
    document.getElementById('lk-btn').textContent='🔓 Unlock';
    document.getElementById('lk-btn').classList.add('lk-on');
    document.getElementById('lk-disp').classList.remove('hidden');
    document.getElementById('lk-name').textContent=S.curTrk.name;
    toast('🔒','ล็อคเพลง: '+S.curTrk.name);
  }
  renderTracks();svS();
}
function setSFX(t){
  S.sfxTab=t;
  document.getElementById('sfx-fp').textContent=`3-Post-Production/Audio/SFX/${t}/`;
  document.querySelectorAll('#sfx-tabs .music-tab').forEach(b=>b.classList.toggle('active',b.textContent.trim()===t));
  document.getElementById('sfx-list').innerHTML='';
  svS();
}

// ═══ SCRIPT ═══
function insertCue(s,cue){
  const ta=document.getElementById('script-'+s);
  const p=ta.selectionStart;
  ta.value=ta.value.substring(0,p)+'\n'+cue+'\n'+ta.value.substring(p);
  ta.selectionStart=ta.selectionEnd=p+cue.length+2;
  ta.focus();onScript();
}
function onScript(){
  S.script.hook=document.getElementById('script-hook').value;
  S.script.body=document.getElementById('script-body').value;
  S.script.cta=document.getElementById('script-cta').value;
  updStats();updPreview();svS();
  if(S.script.hook||S.script.body)mkDone(1);
}
function updStats(){
  const full=[S.script.hook,S.script.body,S.script.cta].join(' ');
  const clean=full.replace(/\[VISUAL CUE:[^\]]*\]/g,'').replace(/\[NICK'S VOICE\]/g,'').trim();
  const w=clean?clean.split(/\s+/).filter(x=>x).length:0;
  document.getElementById('sw').textContent=w;
  document.getElementById('sd').textContent=Math.round(w/2.3)+'s';
  document.getElementById('sc').textContent=(full.match(/\[VISUAL CUE/g)||[]).length;
}
function updPreview(){
  const full=[S.script.hook,S.script.body,S.script.cta].join('\n\n');
  if(!full.trim()){
    document.getElementById('dir-preview').innerHTML='<span style="opacity:0.4;">เริ่มพิมพ์ script...</span>';
    document.getElementById('speech-preview').innerHTML='<span style="opacity:0.4;">preview จะปรากฏที่นี่</span>';
    return;
  }
  document.getElementById('dir-preview').innerHTML=full
    .replace(/\[VISUAL CUE:[^\]]*\]/g,m=>`<span class="preview-visual">${eh(m)}</span>`)
    .replace(/\[NICK'S VOICE\]/g,"<span class='preview-voice'>[NICK'S VOICE]</span>")
    .replace(/\n/g,'<br>');
  document.getElementById('speech-preview').innerHTML=(full
    .replace(/\[VISUAL CUE:[^\]]*\]\n?/g,'')
    .replace(/\[NICK'S VOICE\]\s*/g,'')
    .trim().replace(/\n/g,'<br>'))||'<span style="opacity:0.4;">—</span>';
}
function refScriptCtx(){
  document.getElementById('ctx-badges').innerHTML=[
    S.icp?`<div class="badge badge-blue">👤 ${eh(S.icp)}</div>`:'',
    S.funnel?`<div class="badge badge-gold">📊 ${S.funnel}</div>`:'',
    S.idea?`<div class="badge badge-green" style="font-family:Sarabun,sans-serif;font-size:11px;max-width:280px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">💡 ${eh(S.idea.substring(0,55))}</div>`:'',
    S.lkTrk?`<div class="badge badge-gold">🔒 ${eh(S.lkTrk.name)}</div>`:'',
  ].join('');
  document.getElementById('script-hook').value=S.script.hook||'';
  document.getElementById('script-body').value=S.script.body||'';
  document.getElementById('script-cta').value=S.script.cta||'';
  updStats();updPreview();
}

// ═══ TELEPROMPTER ═══
let teleOn=false,teleIv=null;
function openTele(){
  const full=[S.script.hook,S.script.body,S.script.cta].join('\n\n');
  document.getElementById('tele-text').textContent=full.replace(/\[VISUAL CUE:[^\]]*\]\n?/g,'').replace(/\[NICK'S VOICE\]\s*/g,'').trim()||'— ยังไม่มี script —';
  document.getElementById('tele').classList.add('open');
  document.getElementById('tele').scrollTop=0;
  teleOn=false;document.getElementById('tele-btn').textContent='▶ เล่น Auto-Scroll';
}
function closeTele(){document.getElementById('tele').classList.remove('open');clearInterval(teleIv);}
function toggleTele(){
  teleOn=!teleOn;
  document.getElementById('tele-btn').textContent=teleOn?'⏸ หยุด':'▶ เล่น Auto-Scroll';
  if(teleOn)teleIv=setInterval(()=>{document.getElementById('tele').scrollTop+=2;},50);
  else clearInterval(teleIv);
}

// ═══ EDIT LIST ═══
function refEditCtx(){
  document.getElementById('edit-ctx').innerHTML=[
    S.icp?`<div class="badge badge-blue">👤 ${eh(S.icp)}</div>`:'',
    S.funnel?`<div class="badge badge-gold">📊 ${S.funnel}</div>`:'',
    S.lkTrk?`<div class="badge badge-gold">🎵 ${eh(S.lkTrk.name)}</div>`:'',
  ].join('');
}
function genEditList(){onScript();goToStep(2);regenEditList();}
function regenEditList(){
  const h=S.script.hook||'',bd=S.script.body||'',ct=S.script.cta||'';
  const tn=S.lkTrk?.name||'เพลงที่เลือก';
  const exC=t=>(t.match(/\[VISUAL CUE:[^\]]*\]/g)||[]).map(m=>m.replace(/\[VISUAL CUE:/,'').replace(']','').trim()).filter(Boolean).join(' / ')||'—';
  const stC=t=>t.replace(/\[VISUAL CUE:[^\]]*\]/g,'').replace(/\[NICK'S VOICE\]\s*/g,'').trim().split('\n').filter(l=>l.trim()).join(' ');
  const data=[
    {title:'HOOK',tc:'00:00–00:03',bg:'linear-gradient(135deg,#7C3AED,#6D28D9)',fields:{CUT:'Smash Cut / Swish Pan เข้าเฟรม',MOVEMENT:'เริ่มนิ่งก่อน → Swish Pan ออก หรือ Walk-In เดินเข้าเฟรม',BGM:`${tn} | เริ่มพร้อมภาพ | -24dB`,SFX:'Whoosh เปิด / Impact Hit',VISUAL:exC(h)||'Static Frame + ตัวเลข/ข้อความ Hook',SUBTITLE:(stC(h)||'Hook speech').substring(0,80),NOTE:'⚠️ อย่าพูดระหว่างภาพ Swish Pan ยังเบลอ — รอให้นิ่งก่อน แล้วค่อยพูด'}},
    {title:'SETUP / PROBLEM',tc:'00:03–00:15',bg:'linear-gradient(135deg,#011F7B,#173BBA)',fields:{CUT:'Jump Cut + Zoom 8-12% ทุกตัด',MOVEMENT:'Push-In ตอนบอกจุดปัญหาหลัก — Subject หยิบของ/ชี้นิ้วเพิ่ม energy',BGM:`${tn} | Building | -22dB`,SFX:'Subtle Tension / Low Rumble',VISUAL:(exC(bd).split('/')[0]||'B-roll ปัญหา').trim(),SUBTITLE:(stC(bd)||'Body speech').substring(0,100),NOTE:'Push-In ตอนพูดประโยคสำคัญที่สุดของ Setup — สัญญาณ "จำสิ่งนี้"'}},
    {title:'VALUE STEPS',tc:'00:15–00:40',bg:'linear-gradient(135deg,#065F46,#059669)',fields:{CUT:'J-Cut + Match Cut / Editing on Motion ระหว่าง Step',MOVEMENT:'Swish Pan transition ระหว่าง point — Subject Movement (หมุนตัว/ชี้นิ้ว) ทุก step',BGM:`${tn} | Peak Energy | -20dB`,SFX:'Each Step: Tick / Pop / Swoosh',VISUAL:exC(bd)||'B-Roll + สลับ Shot ทุก 2-3 วิ',SUBTITLE:(stC(bd)||'Value content').substring(0,120),NOTE:'Re-Hook ทุก 10 วิ — Swish Pan ช่วย transition ไม่ให้ฉากดูนิ่งเกินไป'}},
    {title:'OPEN LOOP + CTA',tc:'00:40–00:55',bg:'linear-gradient(135deg,#B45309,#D97706)',fields:{CUT:'Static Cut เข้า CTA — ช้าลงเล็กน้อย สงบ มั่นใจ',MOVEMENT:'Static Frame + สบตากล้อง / Zoom Out เล็กน้อย → Swish Pan ออกเฟรม (Loop End)',BGM:`${tn} | Resolve/End | -26dB`,SFX:'Positive Ding / Success Sound',VISUAL:exC(ct)||'Static + ข้อความ Keyword CTA',SUBTITLE:(stC(ct)||'CTA speech').substring(0,80),NOTE:'Static = น่าเชื่อถือ — Swish Pan ออกเฟรมปิดท้ายสร้าง Perfect Loop'}},
  ];
  S.editList=data;mkDone(2);svS();
  renderEL(data);refEditCtx();
}
function renderEL(data){
  const fieldOrder=['CUT','MOVEMENT','BGM','SFX','VISUAL','SUBTITLE','NOTE'];
  const fieldIcon={CUT:'✂️',MOVEMENT:'🎥',BGM:'🎵',SFX:'💥',VISUAL:'🎬',SUBTITLE:'💬',NOTE:'📝'};
  const fieldColor={CUT:'#7C3AED',MOVEMENT:'#F97316',BGM:'#10B981',SFX:'#EF4444',VISUAL:'#0284C7',SUBTITLE:'#FFBA09',NOTE:'#64748B'};
  document.getElementById('el-container').innerHTML=data.map((s,si)=>`
<div class="edit-section-card">
  <div class="edit-section-header" style="background:${s.bg}">
    <div class="edit-section-title">${eh(s.title)}</div>
    <div class="edit-section-tc">${s.tc}</div>
  </div>
  <div>${fieldOrder.filter(k=>k in s.fields).map(k=>`
<div class="edit-field-row">
  <div class="edit-field-label" style="color:${fieldColor[k]||'#64748B'}">${fieldIcon[k]||''} ${eh(k)}</div>
  <textarea class="edit-field-value" rows="1" oninput="ag(this);updEF(${si},'${k}',this.value)">${eh(s.fields[k])}</textarea>
</div>`).join('')}</div>
</div>`).join('');

  document.querySelectorAll('.edit-field-value').forEach(ta=>ag(ta));
}
function ag(ta){ta.style.height='auto';ta.style.height=ta.scrollHeight+'px';}
function updEF(si,k,v){if(S.editList?.[si]?.fields)S.editList[si].fields[k]=v;svS();}
function copyEditList(){
  if(!S.editList){toast('⚠️','สร้าง Edit List ก่อน');return;}
  let t=`FINANCETRY STUDIO — EDIT LIST\n${'='.repeat(38)}\n`;
  if(S.icp)t+=`ICP: ${S.icp}\n`;if(S.funnel)t+=`Funnel: ${S.funnel}\n`;if(S.idea)t+=`Idea: ${S.idea}\n`;if(S.lkTrk)t+=`BGM: ${S.lkTrk.name}\n`;
  S.editList.forEach(s=>{t+=`\n━━ ${s.title} (${s.tc}) ━━\n`;Object.entries(s.fields).forEach(([k,v])=>{t+=`${k.padEnd(10)}: ${v}\n`;});});
  navigator.clipboard.writeText(t).then(()=>toast('📋','Copy แล้ว!')).catch(()=>prompt('Copy:',t));
}

// ═══ PRODUCTION ═══
function rndCL(items,id,pfx){
  const el=document.getElementById(id);if(!el)return;
  el.innerHTML=items.map((item,i)=>{
    const k=`${pfx}_${i}`;const chk=S.checks[k]||false;
    return`<div class="checklist-item" onclick="togCk('${k}',this)"><div class="checklist-checkbox${chk?' chk':''}">${chk?'✓':''}</div><div class="checklist-text${chk?' chk':''}">${eh(item)}</div></div>`;
  }).join('');
}
function togCk(k,row){
  S.checks[k]=!S.checks[k];
  const cb=row.querySelector('.checklist-checkbox'),tx=row.querySelector('.checklist-text');
  cb.classList.toggle('chk',S.checks[k]);cb.textContent=S.checks[k]?'✓':'';
  tx.classList.toggle('chk',S.checks[k]);svS();
}
function updLUT(v){
  S.lut=parseInt(v);
  document.getElementById('lut-val').textContent=v+'%';
  document.getElementById('lut-warm').style.opacity=v/100;
  svS();
}
function updF(w,v){
  S.faders[w]=parseInt(v);
  const map={voice:'fv-v',bgm:'fb-v',sfx:'fs-v'};
  document.getElementById(map[w]).textContent=`${v} dB`;
  const pct=((parseInt(v)+48)/48)*100;
  const idMap={voice:'fv',bgm:'fb',sfx:'fs'};
  document.getElementById(idMap[w]).style.background=`linear-gradient(to right,var(--blue) ${pct}%,#e2e8f0 ${pct}%)`;
  svS();
}
function refProd(){
  rndCL(CAM_CL,'cam-cl','cam');
  rndCL(GR_CL,'grade-cl','grade');
  rndCL(CUT_CL,'cut-cl','cut');
  rndCL(POST_CL,'post-cl','post');
  rndCL(EXP_CL,'exp-cl','exp');
  const ls=document.getElementById('lut-sl');if(ls){ls.value=S.lut;updLUT(S.lut);}
  const fmap={voice:'fv',bgm:'fb',sfx:'fs'};
  Object.entries(S.faders).forEach(([k,v])=>{const el=document.getElementById(fmap[k]);if(el){el.value=v;updF(k,v);}});
  const tln=document.getElementById('tl-tn');if(tln)tln.textContent=S.lkTrk?.name||'locked track';
}

// ═══ EXPORT ═══
function openExport(){
  let t=`╔${'═'.repeat(40)}╗\n║    FINANCETRY STUDIO — PROJECT SUMMARY    ║\n╚${'═'.repeat(40)}╝\n\n📅 ${new Date().toLocaleDateString('th-TH')}\n\n${'─'.repeat(28)}\n🎯 STRATEGY\n${'─'.repeat(28)}\nICP    : ${S.icp||'—'}\nFunnel : ${S.funnel||'—'}\nIdea   : ${S.idea||'—'}\n\n${'─'.repeat(28)}\n🎵 MUSIC\n${'─'.repeat(28)}\nBGM  : ${S.lkTrk?.name||'—'}\nPath : ${S.lkTrk?.path||'—'}\n\n${'─'.repeat(28)}\n📝 SCRIPT\n${'─'.repeat(28)}\n[HOOK]\n${S.script.hook||'—'}\n\n[BODY]\n${S.script.body||'—'}\n\n[CTA]\n${S.script.cta||'—'}\n`;
  if(S.editList){t+=`\n${'─'.repeat(28)}\n📋 EDIT LIST\n${'─'.repeat(28)}\n`;S.editList.forEach(s=>{t+=`\n▶ ${s.title} (${s.tc})\n`;Object.entries(s.fields).forEach(([k,v])=>{t+=`  ${k.padEnd(8)}: ${v}\n`;});});}
  t+=`\n${'─'.repeat(28)}\n🎬 PRODUCTION\n${'─'.repeat(28)}\nCamera : DJI Osmo Pocket 3 | 4K 24fps D-Log M 10-bit\nVoice  : ${S.faders.voice} dB\nBGM    : ${S.faders.bgm} dB\nSFX    : ${S.faders.sfx} dB\nLUT    : Warm LUT @ ${S.lut}%\nExport : 1080p Reels/TikTok | 4K YouTube\n`;
  document.getElementById('exp-content').textContent=t;
  document.getElementById('exp-modal').classList.add('open');
}
function closeExport(){document.getElementById('exp-modal').classList.remove('open');}
function copyExport(){const t=document.getElementById('exp-content').textContent;navigator.clipboard.writeText(t).then(()=>toast('📋','Copy แล้ว!')).catch(()=>prompt('Copy:',t));}
document.getElementById('exp-modal').addEventListener('click',function(e){if(e.target===this)closeExport();});

// ═══ UTILS ═══
function toast(icon,msg){
  const t=document.getElementById('toast');
  document.getElementById('ti').textContent=icon;
  document.getElementById('tm').textContent=msg;
  t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),3200);
}
function eh(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

// ═══ INIT ═══
function init(){
  ldS();
  if(S.icp){
    document.querySelectorAll('#icp-chips .chip').forEach(b=>{
      const t=b.textContent.trim();
      if((S.icp==='มนุษย์เงินเดือน'&&t.includes('มนุษย์'))||(S.icp==='ครอบครัว'&&t.includes('ครอบครัว'))||(S.icp==='ธุรกิจ+ฟรีแลนซ์'&&t.includes('ธุรกิจ')))b.classList.add('active');
    });
  }
  if(S.funnel){document.querySelectorAll('#funnel-chips .funnel-chip').forEach(b=>{if(b.querySelector('.fl').textContent===S.funnel)b.classList.add('active');});}
  renderIdeas();
  setBGMTab(S.mSec||'Hook');
  if(S.mMood)setMood(S.mMood);
  renderHookLibrary();
  renderCTA();
  renderFormats();
  renderStructures();
  renderValues();
  if(S.lkTrk){
    document.getElementById('lk-btn').textContent='🔓 Unlock';
    document.getElementById('lk-btn').classList.add('lk-on');
    document.getElementById('lk-disp').classList.remove('hidden');
    document.getElementById('lk-name').textContent=S.lkTrk.name;
    document.getElementById('ptn').textContent=S.lkTrk.name;
    document.getElementById('pf').textContent=S.lkTrk.path||'';
  }
  if(S.icp&&S.funnel)document.getElementById('check-0').classList.add('done');
  if(S.script.hook||S.script.body)document.getElementById('check-1').classList.add('done');
  if(S.editList){document.getElementById('check-2').classList.add('done');renderEL(S.editList);}
  setInterval(svS,15000);
}
init();

// --- NEW PRE-PRODUCTION LOGIC ---
function switchPreTab(tab) {
  document.querySelectorAll('.pre-sec').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.pre-tab').forEach(el => {
    el.classList.remove('active');
    el.style.background = 'transparent';
    el.style.color = 'var(--text-muted)';
  });
  document.getElementById('pre-sec-' + tab).style.display = 'block';
  let b = document.getElementById('pre-tab-' + tab);
  b.classList.add('active');
  b.style.background = 'var(--blue)';
  b.style.color = 'white';
}

function generateMasterScript() {
  S.pillars = S.pillars || {};
  let body = S.pillars.body || "[สคริปต์เนื้อหา]";
  let hook = S.pillars.verbalHook || "[Verbal Hook]";
  let rehook = S.pillars.rehook ? S.pillars.rehook.join('\n') : "[Re-Hook]";
  let cta = S.pillars.cta || "[CTA]";
  let visual = S.pillars.visualHook || "[Visual Hook]";
  
  let script = `[VISUAL CUE: ${visual}]\n\n[NICK'S VOICE: Hook]\n${hook}\n\n[NICK'S VOICE: Re-Hook]\n${rehook}\n\n[NICK'S VOICE: Body]\n${body}\n\n[NICK'S VOICE: CTA]\n${cta}`;
  
  S.masterScript = script;
  document.getElementById('master-script-text').value = script;
  document.getElementById('master-script-area').style.display = 'block';
  svS();
  toast('✅','สร้าง Master Script สำเร็จ!');
}

function saveMasterScriptBody(val) {
  S.masterScript = val;
  svS();
}

function toggleVisualOpt(btn, opt) {
  S.visualOpts = S.visualOpts || [];
  if (S.visualOpts.includes(opt)) {
    S.visualOpts = S.visualOpts.filter(o => o !== opt);
    btn.classList.remove('selected');
    btn.style.background = 'white';
    btn.style.color = 'var(--text)';
  } else {
    S.visualOpts.push(opt);
    btn.classList.add('selected');
    btn.style.background = 'var(--blue)';
    btn.style.color = 'white';
  }
  svS();
}

function renderVisualOpts() {
  S.visualOpts = S.visualOpts || [];
  document.querySelectorAll('.v-chip').forEach(btn => {
    let opt = btn.textContent.replace(/^[\uD800-\uDBFF\uDC00-\uDFFF\u2600-\u26FF\u2700-\u27BF\s]+/, ''); // remove emoji
    // A simpler way is to match by string, but textContent has emojis. 
    // We already added id's to buttons, let's just re-apply based on text
    if(S.visualOpts.some(o => btn.textContent.includes(o))) {
      btn.classList.add('selected');
      btn.style.background = 'var(--blue)';
      btn.style.color = 'white';
    }
  });
}

function generateSFXRecommendations() {
  const c = document.getElementById('sfx-recs-container');
  c.innerHTML = '<div style="text-align:center;padding:20px;">🤖 กำลังวิเคราะห์ Script & Visuals...</div>';
  
  setTimeout(() => {
    let opts = S.visualOpts || [];
    let script = S.masterScript || "";
    let recs = [];
    
    if (opts.includes('Cutting on Motion')) {
      recs.push("👉 <strong>Whip-pan Whoosh</strong>: ใช้ Whoosh สั้นๆ จังหวะตัดภาพขยับตัวรวดเร็ว (Cutting on motion)");
    }
    if (opts.includes('MGFX') || opts.includes('Graphic Overlay')) {
      recs.push("👉 <strong>UI Tech Click / Glitch</strong>: ใส่จังหวะที่ Graphic Overlay หรือ MGFX เด้งขึ้นมาบนจอ");
    }
    if (opts.includes('Text Pop-up')) {
      recs.push("👉 <strong>Pop / Keyboard Typing</strong>: ใช้ตอนข้อความตัวหนังสือพิมพ์ขึ้นมาทีละคำ");
    }
    if (script.includes('[VISUAL CUE')) {
      recs.push("👉 <strong>Cinematic Boom / Hit</strong>: ใส่ในวินาทีแรกพร้อม Visual Hook เพื่อสะกดคนดู");
    }
    if (script.includes('[NICK\'S VOICE: CTA]')) {
      recs.push("👉 <strong>Magic Reveal / Notification</strong>: ช่วงพูด Call To Action ให้ใส่เสียงกระดิ่งหรือแจ้งเตือน");
    }
    if (recs.length === 0) {
      recs.push("👉 แนะนำใส่ <strong>Whoosh</strong> ตอนเปลี่ยนฉาก และ <strong>Pop</strong> ตอนขึ้นข้อความสำคัญ");
    }
    
    c.innerHTML = recs.map(r => `<div style="padding:12px;background:white;border-radius:8px;border:1px solid rgba(16,185,129,0.3);font-size:14px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">${r}</div>`).join('');
    toast('✅', 'วิเคราะห์ SFX เสร็จสมบูรณ์');
  }, 800);
}

// ===== FORMAT / STRUCTURE / VALUE DATA =====
const FORMAT_LIB = [
  {name:'🎭 Storytelling', desc:'เล่าเรื่องด้วยประสบการณ์จริง — เชื่อมต่อจิตใจคนดู'},
  {name:'🏆 Ranking', desc:'จัดอันดับจากแย่สุดไปดีสุด — คนอยากรู้อันดับ'},
  {name:'📋 Tutorial / How-to', desc:'สอนทีละขั้นตอน — ให้คนดูทำตามได้จริง'},
  {name:'🆚 Comparison', desc:'เปรียบเทียบ A vs B — ช่วยตัดสินใจ'},
  {name:'❓ Q&A / FAQ', desc:'ตอบคำถามที่คนถามบ่อย — สร้าง Trust'},
  {name:'📰 News Hook', desc:'อิงเทรนด์ข่าวปัจจุบัน — ได้ Traffic ฟรี'},
  {name:'🔢 List / Tips', desc:'5 วิธี, 3 สิ่ง — อ่านง่าย แชร์ง่าย'},
  {name:'💰 Case Study', desc:'ตัวอย่างจริง ตัวเลขจริง — น่าเชื่อถือสูง'}
];

const STRUCTURE_LIB = [
  {name:'Hook → Problem → Solution → CTA', desc:'สูตรคลาสสิค เหมาะกับ TOFU-MOFU'},
  {name:'Hook → Story → Lesson → CTA', desc:'เล่าเรื่อง ดึงบทเรียน ปิดด้วยคุณค่า'},
  {name:'Hook → Framework → Examples → CTA', desc:'สร้าง Framework ตัวเอง แล้วอธิบาย'},
  {name:'Hook → Numbers → Insight → CTA', desc:'ขึ้นด้วยตัวเลข น่าสนใจ น่าเชื่อ'},
  {name:'Hook → Myth → Truth → CTA', desc:'หักล้างความเชื่อผิดๆ — Pattern Interrupt'},
  {name:'Hook → List (1-2-3) → CTA', desc:'เรียบง่าย จดจำง่าย ดูจบง่าย'}
];

const VALUE_LIB = [
  {name:'💡 Inspiration', desc:'จุดประกายให้คนอยากลงมือทำ'},
  {name:'📚 Education', desc:'ให้ความรู้จริงที่นำไปใช้ได้ทันที'},
  {name:'😂 Entertainment', desc:'สร้างความบันเทิง ดูสนุก ติดตาม'},
  {name:'🎯 Actionable Tips', desc:'เทคนิคปฏิบัติได้จริง ทำได้เลย'},
  {name:'🔍 Insider Knowledge', desc:'ข้อมูลที่คนทั่วไปไม่รู้ — รู้สึกพิเศษ'},
  {name:'🛡 Risk Awareness', desc:'เตือนภัย ช่วยหลีกเลี่ยงความผิดพลาด'},
  {name:'💼 Professional Credibility', desc:'สร้างความน่าเชื่อถือในฐานะผู้เชี่ยวชาญ'}
];

function renderFormats() {
  const c = document.getElementById('formats-container');
  if(!c) return;
  c.innerHTML = FORMAT_LIB.map(f => {
    const sel = S.pillars?.format === f.name;
    return `<button class="chip" onclick="selectFormat('${f.name}')" style="display:flex;flex-direction:column;align-items:flex-start;background:${sel?'var(--blue)':'white'};color:${sel?'white':'var(--text)'};">
      <div style="font-weight:700;">${f.name}</div>
      <div style="font-size:11px;opacity:0.75;text-align:left;white-space:normal;">${f.desc}</div>
    </button>`;
  }).join('');
}

function selectFormat(name) {
  S.pillars = S.pillars || {};
  S.pillars.format = name;
  renderFormats();
  svS();
  toast('✅', 'เลือก Format แล้ว: ' + name);
}

function renderStructures() {
  const c = document.getElementById('structures-container');
  if(!c) return;
  c.innerHTML = STRUCTURE_LIB.map((s,i) => {
    const sel = S.pillars && S.pillars.structure === s.name;
    const bg = sel ? 'var(--blue)' : 'white';
    const col = sel ? 'white' : 'var(--text)';
    return '<button class="chip" onclick="selectStructure(' + i + ')" style="display:flex;flex-direction:column;align-items:flex-start;background:' + bg + ';color:' + col + ';">' +
      '<div style="font-weight:700;font-size:13px;">' + s.name + '</div>' +
      '<div style="font-size:11px;opacity:0.75;text-align:left;white-space:normal;">' + s.desc + '</div>' +
      '</button>';
  }).join('');
}

function selectStructure(i) {
  S.pillars = S.pillars || {};
  S.pillars.structure = STRUCTURE_LIB[i].name;
  renderStructures();
  svS();
  toast('\u2705', 'เลือก Structure แล้ว');
}

function renderValues() {
  const c = document.getElementById('values-container');
  if(!c) return;
  c.innerHTML = VALUE_LIB.map(v => {
    const sel = (S.pillars?.value || []).includes(v.name);
    return `<button class="chip" onclick="toggleValue('${v.name}')" style="display:flex;flex-direction:column;align-items:flex-start;background:${sel?'var(--blue)':'white'};color:${sel?'white':'var(--text)'};">
      <div style="font-weight:700;">${v.name}</div>
      <div style="font-size:11px;opacity:0.75;text-align:left;white-space:normal;">${v.desc}</div>
    </button>`;
  }).join('');
}

function toggleValue(name) {
  S.pillars = S.pillars || {};
  S.pillars.value = S.pillars.value || [];
  if(S.pillars.value.includes(name)) {
    S.pillars.value = S.pillars.value.filter(x => x !== name);
  } else {
    S.pillars.value.push(name);
  }
  renderValues();
  svS();
}
// ===== CORE VALUE AI SYSTEM =====
let currentCoreValues = [];

function generateCoreValues() {
  if (VALUE_LIB.length < 3) return;
  // Pick 3 random values
  let shuffled = [...VALUE_LIB].sort(() => 0.5 - Math.random());
  currentCoreValues = [shuffled[0], shuffled[1], shuffled[2]];
  renderCoreValues();
  S.pillars = S.pillars || {};
  S.pillars.value = currentCoreValues.map(v => v.name);
  svS();
}

function regenerateValue(index) {
  let available = VALUE_LIB.filter(v => !currentCoreValues.includes(v));
  if (available.length > 0) {
    let newV = available[Math.floor(Math.random() * available.length)];
    currentCoreValues[index] = newV;
    renderCoreValues();
    S.pillars.value = currentCoreValues.map(v => v.name);
    svS();
  }
}

function renderCoreValues() {
  const c = document.getElementById('core-values-container');
  if(!c) return;
  
  if(currentCoreValues.length === 0) {
    c.innerHTML = '<button class="btn-primary w-100" style="grid-column: span 3;" onclick="generateCoreValues()">✨ วิเคราะห์ 3 Core Values อัตโนมัติ</button>';
    return;
  }

  c.innerHTML = currentCoreValues.map((v, i) => `
    <div class="cv-card">
      <div class="cv-title">${v.name}</div>
      <div class="cv-desc">${v.desc}</div>
      <button class="btn-icon" onclick="regenerateValue(${i})" title="เปลี่ยนข้อนี้">🔄</button>
    </div>
  `).join('');
}

// Override old renderValues
function renderValues() {
  // Check if we loaded values from state
  if (S.pillars && S.pillars.value && S.pillars.value.length === 3 && currentCoreValues.length === 0) {
    currentCoreValues = S.pillars.value.map(name => VALUE_LIB.find(v => v.name === name) || {name: name, desc: ''});
  }
  renderCoreValues();
}

function switchMainTab(idx) {
  document.querySelectorAll('.nav-btn').forEach((b, i) => b.classList.toggle('active', i === idx));
  document.querySelectorAll('.main-panel').forEach((p, i) => p.classList.toggle('active', i === idx));
}

// ===== PRODUCTION: MASTER SHOT LIST =====

function renderShotList() {
  const c = document.getElementById('shot-list-container');
  if(!c) return;

  if(!S.pillars || !S.pillars.topic) {
    c.innerHTML = '<div class="empty-state">กรุณาทำ Pre-Production ให้เสร็จก่อนครับ</div>';
    return;
  }

  // Generate a dynamic shot list based on user choices
  let shots = [];
  
  // 1. Hook
  shots.push({
    num: 1, 
    content: (S.pillars.visualHook || 'Visual Hook') + ' + ' + (S.pillars.verbalHook || 'Verbal Hook'),
    size: 'Close-up / Medium',
    angle: 'Eye-level / High-angle',
    movement: 'เดินเข้าหากล้อง / ทำท่าทางประกอบ',
    cue: 'Cutting on Motion: ขยับมือหรือเดินเพื่อส่งเข้าฉากต่อไป',
    enhancement: 'Text Pop-up (Bold Cinematic Text), Audio Hook'
  });

  // 2. Body / Framework
  shots.push({
    num: 2, 
    content: 'อธิบายปัญหา / ความเชื่อผิดๆ: ' + (S.idea || ''),
    size: 'Medium',
    angle: 'Eye-level',
    movement: 'ยืนนิ่ง / ใช้ภาษามือกว้าง',
    cue: 'Seamless Cut: เปลี่ยนมุมเล็กน้อยตอนเน้นย้ำ',
    enhancement: 'B-Roll (ถ้ามี), BGM: Background (Fast/Medium)'
  });

  // 3. Solution / Value
  let valueStr = (S.pillars.value || []).join(', ') || 'Value';
  shots.push({
    num: 3, 
    content: 'ให้คุณค่า: ' + valueStr,
    size: 'Wide / Medium',
    angle: 'Eye-level',
    movement: 'เดินขณะพูด / เปลี่ยนมุมฉากหลัง',
    cue: 'Whip-Action Match Cut',
    enhancement: 'MGFX Graphic, Object-Behind-Person'
  });

  // 4. CTA
  shots.push({
    num: 4, 
    content: 'Call to Action: ' + (S.pillars.cta || 'Follow/Comment'),
    size: 'Close-up',
    angle: 'Eye-level',
    movement: 'ชี้เข้าหากล้อง / ชี้ไปที่ปุ่ม',
    cue: 'End',
    enhancement: 'Custom Comment Box Graphic, Conclusion Music'
  });

  let html = '<div style="display:flex; flex-direction:column; gap:16px;">';
  html += shots.map(s => `
    <div style="background:rgba(0,0,0,0.2); padding:16px; border-radius:12px; border:1px solid var(--glass-border);">
      <div style="font-weight:700; color:var(--primary); margin-bottom:8px;">Shot ${s.num}</div>
      <div style="font-size:14px; margin-bottom:6px;"><strong>เนื้อหา:</strong> ${s.content}</div>
      <div style="font-size:13px; color:var(--text-muted); display:grid; grid-template-columns: 1fr 1fr; gap:8px;">
        <div>📸 <strong>Size:</strong> ${s.size}</div>
        <div>🎥 <strong>Angle:</strong> ${s.angle}</div>
        <div>🏃 <strong>Movement:</strong> ${s.movement}</div>
        <div>✂️ <strong>Cut:</strong> ${s.cue}</div>
        <div style="grid-column: span 2; color:var(--accent);">✨ <strong>Enhance:</strong> ${s.enhancement}</div>
      </div>
    </div>
  `).join('');
  html += '</div>';
  
  c.innerHTML = html;
}

// Hook into switchMainTab to re-render
const originalSwitchMainTab = switchMainTab;
switchMainTab = function(idx) {
  originalSwitchMainTab(idx);
  if(idx === 1) {
    renderShotList();
  }
};
