# Creator Production & Personal Branding System Design Spec
> วันที่: 2026-05-18 | สถานะ: อนุมัติการออกแบบ | โดเมน: งานโปรดักชั่นและการสร้างแบรนด์บุคคล (IG Reels)

---

## 🎯 1. Overview & Objectives

สเปกนี้ถูกออกแบบมาเพื่อสร้าง **"ระบบงานและคลังความรู้สำหรับครีเอเตอร์แบบแยกส่วน" (Stand-alone Creator Production System)** ที่แยกออกจากคลังข้อมูลการเงิน/ประกันภัยเดิมอย่างเด็ดขาด โดยทำหน้าที่เป็นเครื่องมือระดับมืออาชีพสำหรับงานโปรดักชั่น การถ่ายทำ คอนเทนต์วิดีโอสั้น (Instagram Reels) และการดึงดูดผู้มุ่งหวัง (Leads Generation) 

**เป้าหมายหลัก:**
1. จัดเก็บสูตรโปรดักชั่น (การตั้งค่ากล้อง, สี, Resolve, วิธีเบลอหลัง) และคลังทรัพยากรดิบ (LUTs, ลิงก์เพลง) ไว้อย่างถาวร
2. สร้างคลังเขียนบทและไอเดียไวรัล (Viral Hook Vault, Video Templates) เพื่อช่วยลดขั้นตอนและระยะเวลาในการคิดเนื้อหา
3. ออกแบบแดชบอร์ดเดี่ยว (Creator Dashboard) ที่รวบรวมลิงก์เครื่องมือ Notion/Drive/YouTube ทั้งหมดให้เรียกใช้งานได้ในหน้าเดียว
4. รองรับการเชื่อมโยง (Interlink) กับข้อมูลการเงินในอนาคตเมื่อต้องการนำเนื้อหามาผลิตคอนเทนต์จริง

---

## 📂 2. Directory Architecture (โครงสร้างโฟลเดอร์)

ระบบนี้จะถูกเขียนลงในโฟลเดอร์รากฐานใหม่ชื่อ `creator/` ใน Workspace:

```text
creator/
├── raw/                      ← โครงสร้างจัดเก็บข้อมูลและลิงก์ดิบแบบไม่มีการตัดต่อ
│   ├── raw-workflow-links.md  ← ลิงก์ Notion, Drive, YouTube ทั้งหมด
│   └── raw-camera-settings.md ← ค่าดิบกล้อง DJI/Resolve/Export
│
├── production/               ← เอกสารคู่มือเชิงเทคนิคและโปรดักชั่น
│   ├── camera-and-grading.md  ← วิธีปรับสปีดชัตเตอร์, CST, การเกรดสี D-Log M, และการแก้หลังเบลอ
│   └── background-music.md    ← แหล่งรวมเพลงประกอบ คลังเพลง และวิธีการหาเพลงไวรัล
│
├── writing/                  ← คู่มือการเล่าเรื่องและการเขียนบทสคริปต์
│   ├── viral-hook-vault.md    ← คลังรวม Hooks 50/20 แม่แบบ, เทคนิค Visual Hook และ Re-hook
│   └── video-templates.md     ← เทมเพลตวางสตอรี่บอร์ด วิธีการถอดเสียงบทวิดีโอสำเร็จรูป
│
└── dashboard.md              ← ⚡ แดชบอร์ดศูนย์บัญชาการครีเอเตอร์สำหรับทำงานรายวัน
```

---

## 🛠️ 3. Functional Specifications (รายละเอียดแต่ละหน้า)

### 3.1 `dashboard.md` (ศูนย์บัญชาการครีเอเตอร์)
* **Quick Access Grid:** ปุ่มและลิงก์ด่วนแบ่งหมวดชัดเจน (Notion, YouTube, Google Drive LUTs, แหล่งตัวอย่าง IG)
* **Interactive Workflow Checklist:** แผนภาพสรุปขั้นตอนทำงาน 6 สเต็ปประจำวัน (ไถฟีดหาไอเดีย -> หา Outlier -> จัดระเบียบด้วย Sort Feed -> ถอดสคริปต์ -> สตอรี่บอร์ด Milanote -> ถ่ายทำ -> CapCut/Resolve)
* **Production Reference Snippet:** สรุปย่อค่ากล้องและค่าส่งออก IG ในหน้าแรก ไม่ต้องกดเปิดหน้าลึก

### 3.2 `production/camera-and-grading.md` (สไตล์ภาพและการตัดต่อ)
* **Camera Preset:** DJI/Camera Setting (4K, 30fps, D-Log M, EV -0.7, ชัตเตอร์ 1/50)
* **DaVinci Resolve Setup:** Color Space Transform (CST) DJI D-Gamut/Gamma 2.4 -> Rec.709
* **LUTs Page Guide:** บันทึกวิธีดาวน์โหลดและประยุกต์ใช้ไฟล์จาก Google Drive (andrewsbodega)
* **High-End Camera Background Blur:** สูตรการปรับแก้พื้นหลังให้เบลอสวยงามเหมือนเลนส์ราคาแพง
* **Best Export Setup:** คัมภีร์ Export ลง IG (HEVC h265, 17 Mbps, 30 fps) เพื่อให้ได้ภาพคมชัดสูงสุด

### 3.3 `writing/viral-hook-vault.md` (จิตวิทยาการเล่าเรื่อง)
* **Viral Hooks Templates:** การถอดโค้ด 50 Hook Templates และ 20 Hooks จาก Notion
* **Visual Hook Formula:** ชนิดของมุมกล้อง (Wide, Medium, POV, Low Angle) และเทคนิคการเปลี่ยนเพื่อสะกดตาคนดูใน 3 วินาทีแรก
* **Re-hook Strategy:** เทคนิคการยิงคำถามซ้ำกลางวิดีโอ (Re-hook) เพื่อเพิ่มการดูจนจบ (Audience Retention)

### 3.4 `production/background-music.md` & `writing/video-templates.md`
* **Music Library Links:** ลิงก์ดึงข้อมูล Notion และคู่มือการปรับความดังเสียงไม่ให้กลบเสียงพูด
* **Video Script Templates:** วิธีวางช็อต A-roll/B-roll สอดประสานกับเสียงพูดและการใส่เอฟเฟกต์ (Sound Effects)

---

## 🔍 4. Spec Self-Review (การตรวจสอบตนเอง)

1. **Placeholder Scan:** ไม่มีข้อความ "TBD" หรือ "TODO" การเชื่อมโยงลิงก์ดั้งเดิมจากผู้ใช้ได้รับการตรวจสอบแล้ว
2. **Consistency:** การตั้งค่าความละเอียดกล้องสอดคล้องกับอุปกรณ์ (Nothing Phone 2a @ 30fps) และฟอร์แมต DaVinci/IG
3. **Scope Check:** โฟลเดอร์เดี่ยวนี้ตอบโจทย์ความสะอาดและแยกส่วน ข้อมูลดิบถูกโคลนเก็บไว้ใน `raw/` ครบถ้วน
4. **Ambiguity Check:** การเข้าถึง IG ผ่านระบบล็อกอินได้รับการชี้แจงเรียบร้อย การแก้ปัญหาทางเทคนิคจะใช้การเชื่อมต่อภายนอกและการจำลองข้อมูลดิบแทน
