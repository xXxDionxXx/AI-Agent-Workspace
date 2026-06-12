# 🎨 Color Grading: คู่มือการแต่งสีวิดีโอระดับภาพยนตร์พรีเมียม

> **Nick | Financetry**  
> *ขั้นตอนการปรับแต่งแสง สี อุณหภูมิ และการใช้งานไฟล์ 3D LUT เพื่อยกระดับมู้ดแอนด์โทนของใบหน้าและองค์ประกอบคลิปการเงินให้ดูมีมิติ หรูหรา น่าเชื่อถือ สะท้อน Core Values ของแบรนด์*

---

## 🧭 ลำดับขั้นตอนการเกรดสีระดับมืออาชีพ (Color Grading Steps)

> [!IMPORTANT]
> **กฎเหล็กของ Colorist ระดับโลก: "Get it right in camera first!"**
> คุณไม่สามารถย้อมสีภาพที่ดีจากฟุตเทจที่พังได้ (You cannot polish something that is not good) ก่อนกดถ่ายทำ ให้แน่ใจว่าคุณเซ็ต **White Balance (สมดุลแสงขาว)** และ **Exposure (ความสว่างของแสง)** ได้ถูกต้องในกล้อง DJI Osmo Pocket 3 แล้ว เฝ้าระวังไม่ให้เงา (Shadows) มืดสนิทจนดีเทลหาย และระวังไม่ให้แสงสว่าง (Highlights) จ้าจนรายละเอียดไหม้ (Overexposed) เพื่อให้ขั้นตอนแก้ไขสีเป็นเรื่องง่ายที่สุด

การแต่งสีระดับพรีเมียมมีหัวใจหลักคือความนวลตา สีผิวไม่เพี้ยน และมีมิติชัดตื้นที่สะกดคนดู ให้ทำตาม 6 ขั้นตอนนี้ทีละสเต็ปในโปรแกรม CapCut (มือถือ/PC) หรือ DaVinci Resolve:

```
[ 1. S-Curve & Contrast ] ➔ [ 2. Light Adjustment ] ➔ [ 3. Temperature Mood ]
                                                                   │
                                                                   ▼
[ 6. 3D LUTs (35% - 40%) ] ➔ [ 5. Radial Blur (ฉากหลัง) ] ➔ [ 4. Orange HSL (สกินโทน) ]
```

---

### 📈 1. ปรับความเปรียบต่างและเส้นโค้งเอส (Contrast and S-Curve)
การปรับเส้นโค้ง (Curves) ช่วยให้ภาพมีมิติ แสงและเงาตัดกันอย่างนุ่มนวลเป็นธรรมชาติ:
* **การปรับเส้นโค้ง (S-Curve):** ให้ดึงบริเวณโทนกลาง (Midtones) ขึ้นเล็กน้อยเพื่อให้ภาพสว่างนวลตา และดึงส่วนเงา (Shadows) ลงมาเล็กน้อยเพื่อเพิ่มมิติความลึก
* **หมายเหตุ:** ลักษณะของเส้นโค้งสุดท้ายควรมีความเรียบหรูและเกือบจะเป็นเส้นตรง (Linear) ไม่โค้งหักศอกจนภาพสูญเสียรายละเอียดในส่วนมืดและส่วนสว่าง

---

### ☀️ 2. ปรับแสงสว่างและร�### 🎬 6. การประยุกต์ใช้ 3D LUT ประจำแบรนด์สำหรับ DJI Osmo Pocket 3 (LUT Application)
ขั้นตอนสุดท้ายคือการนำไฟล์ 3D LUT (.cube) คุณภาพสูงจากโฟลเดอร์ที่จัดระเบียบใหม่ [New LUTS](file:///c:/AI-Agent-Workspace/creator/6-Editing/New%20LUTS/) มาย้อมสีผิวและบรรยากาศคลิปตามโปรไฟล์การถ่ายทำของ Osmo Pocket 3 ดังนี้:

#### 📸 กรณีที่ 1: ถ่ายด้วยโหมดภาพปกติ (Normal Profile - Rec.709)
*   **แนวทาง:** ฟุตเทจมีสีสันปกติจากกล้องอยู่แล้ว ให้ดึงไฟล์จากโฟลเดอร์ [1-Rec709-Looks](file:///c:/AI-Agent-Workspace/creator/6-Editing/New%20LUTS/1-Rec709-Looks/) มาย้อมสีผิวได้ทันที:
    *   🌅 **อบอุ่น/เชื่อใจ (Cozy Gold):** ใช้ `Warm-Trust.cube` หรือ `Cozy-Vibe.cube`
    *   ❄️ **สุขุม/ขยี้ปัญหารอบด้าน:** ใช้ `Cold-Drama.cube` หรือ `Deep-Cool.cube`
    *   🎬 **สีผิวสดใส สว่างธรรมชาติ:** ใช้ `Fresh-Daily.cube` หรือ `Teal-Orange.cube`
    *   *ระดับความเข้มที่แนะนำ:* ปรับลด Opacity / Strength ของ LUT ไว้ที่ **35% - 40%**

#### 🍏 กรณีที่ 2: ถ่ายด้วยโหมด D-Log M (10-bit LOG) *[แนะนำสูงสุด]*
*   **แนวทาง:** ฟุตเทจจะมีความจืดและคอนทราสต์แบนมากเพื่อเก็บไดนามิกแสง สามารถย้อมสีได้ 2 สูตร:
    1.  **สูตรลัด (Direct LUT):** เลือกใช้ไฟล์จากโฟลเดอร์ [Pocket3](file:///c:/AI-Agent-Workspace/creator/6-Editing/New%20LUTS/2-LOG-Looks/Pocket3/) ที่อยู่ภายใต้โฟลเดอร์ LOG โยนทับคลิปดิบตรง ๆ:
        *   `Fresh-Daily.cube` (โทนสีสกินโทนธรรมชาติ ขาวใสอมชมพูสวยงาม)
        *   `Warm-Trust.cube` (โทนอบอุ่น สร้างมวลอารมณ์บวกและความน่าเชื่อถือ)
        *   `Cold-Drama.cube` (โทนน้ำเงิน/ Teal Shadow คุมบรรยากาศตึงเครียด ขยี้ประเด็นปัญหา)
        *   *การปรับแต่งเพิ่มเติม:* หากโทนสียังจืด ให้ดึงค่าความอิ่มสี (Saturation) ใน CapCut/Premiere เพิ่มขึ้น **+25 ถึง +30**
    2.  **สูตรมาตรฐานห้องสตูดิโอ (CST + Rec.709):** แปลง D-Log M เป็น Rec.709 ก่อน (ใช้เอฟเฟกต์ CST ใน Resolve หรือย้อมตัวแปลง [Base-Normalization.cube](file:///c:/AI-Agent-Workspace/creator/6-Editing/New%20LUTS/2-LOG-Looks/Pocket3/Base-Normalization.cube) เป็นด่านแรก) แล้วค่อยทับด้วยกลุ่ม [1-Rec709-Looks](file:///c:/AI-Agent-Workspace/creator/6-Editing/New%20LUTS/1-Rec709-Looks/) ที่ความเข้ม **35% - 40%**

#### 📱 กรณีใช้กล้องมือถือ iPhone 15/16 Pro (Apple Log)
*   **แนวทาง:** ถ่ายด้วย Apple Log ➔ ย้อมด่านแรกด้วย [Base-Normalization.cube](file:///c:/AI-Agent-Workspace/creator/6-Editing/New%20LUTS/2-LOG-Looks/iPhone/Base-Normalization.cube) ➔ ทับด้วยความสวยงามของ [Fresh-Daily.cube](file:///c:/AI-Agent-Workspace/creator/6-Editing/New%20LUTS/2-LOG-Looks/iPhone/Fresh-Daily.cube) หรือกลุ่ม Looks Rec.709 ตามต้องการ

#### 🚫 หมายเหตุสำคัญสำหรับ Sony S-Log3:
*   ไฟล์ในโฟลเดอร์ [3-Archive-Sony](file:///c:/AI-Agent-Workspace/creator/6-Editing/New%20LUTS/3-Archive-Sony/) (เช่น `SLog3-Fresh.cube` และตระกูล S-Log) ถูกปรับแต่งมาเฉพาะเซนเซอร์ของกล้อง Sony ห้ามนำมาใช้กับไฟล์ของ DJI Osmo Pocket 3 เด็ดขาด เพราะจะทำให้มิติแสงและสีผิวพังเสียหายครับ้ม (Orange Saturation) ลงมาที่ `-10`
* **ผลลัพธ์:** สีผิวหน้าจะละมุน สว่างนวลอมชมพูอย่างเป็นธรรมชาติ แยกออกจากสีส้มหรือสีเหลืองของไฟประดับหลังห้องได้อย่างลงตัว

---

### 👁️ 5. เอฟเฟกต์เบลอรัศมีสร้างมิติความลึก (Radial Blur Effect)
เนื่องจาก DJI Osmo Pocket 3 มีเซนเซอร์ขนาดใหญ่ 1 นิ้ว ทำให้ฉากหลังเบลอสวยงามเป็นธรรมชาติตั้งแต่ตอนถ่ายทำอยู่แล้ว จึงไม่จำเป็นต้องใส่เอฟเฟกต์เบลอรัศมีจำลองเพิ่มเติม ยกเว้นกรณีต้องการเพิ่มเอฟเฟกต์ความลึกเฉพาะตัว:
* **ค่าพารามิเตอร์กรณีต้องการปรับเพิ่มความเบลอใน CapCut:**
  * ปรับระดับความเบลอของฉากหลังในส่วนควบคุมเอฟเฟกต์ หรือใช้ Overlay เบลอเพื่อสร้างมิติความชัดลึกแบบภาพยนตร์ตามความเหมาะสม คุมขอบเขตเบลอไม่ให้กระทบขอบใบหน้าและแนวเส้นผมของผู้พูด

---

### 🎬 6. การประยุกต์ใช้ 3D LUT ประจำแบรนด์สำหรับ DJI Osmo Pocket 3 (LUT Application)
ขั้นตอนสุดท้ายคือการนำไฟล์ 3D LUT (.cube) คุณภาพสูงจากโฟลเดอร์ที่จัดระเบียบใหม่ [New LUTS](file:///c:/AI-Agent-Workspace/creator/6-Editing/New%20LUTS/) มาย้อมสีผิวและบรรยากาศคลิปตามโปรไฟล์การถ่ายทำของ Osmo Pocket 3 ดังนี้:

#### 📸 กรณีที่ 1: ถ่ายด้วยโหมดภาพปกติ (Normal Profile - Rec.709)
*   **แนวทาง:** ฟุตเทจมีสีสันปกติจากกล้องอยู่แล้ว ให้ดึงไฟล์จากโฟลเดอร์ [1-Rec709-Looks](file:///c:/AI-Agent-Workspace/creator/6-Editing/New%20LUTS/1-Rec709-Looks/) มาย้อมสีผิวได้ทันที:
    *   🌅 **อบอุ่น/เชื่อใจ (Cozy Gold):** ใช้ `Rec709-Warm-Trust.cube` หรือ `Rec709-Cozy-Vibe.cube`
    *   ❄️ **สุขุม/ขยี้ปัญหารอบด้าน:** ใช้ `Rec709-Cold-Drama.cube` หรือ `Rec709-Deep-Cool.cube`
    *   🎬 **สีผิวสดใส สว่างธรรมชาติ:** ใช้ `Rec709-Fresh-Daily.cube` หรือ `Rec709-Teal-Orange.cube`
    *   *ระดับความเข้มที่แนะนำ:* ปรับลด Opacity / Strength ของ LUT ไว้ที่ **35% - 40%**

#### 🍏 กรณีที่ 2: ถ่ายด้วยโหมด D-Log M (10-bit LOG) *[แนะนำสูงสุด]*
*   **แนวทาง:** ฟุตเทจจะมีความจืดและคอนทราสต์แบนมากเพื่อเก็บไดนามิกแสง สามารถย้อมสีได้ 2 สูตร:
    1.  **สูตรลัด (Direct LUT):** เลือกใช้ไฟล์จากโฟลเดอร์ [Pocket3](file:///c:/AI-Agent-Workspace/creator/6-Editing/New%20LUTS/2-LOG-Looks/Pocket3/) ที่อยู่ภายใต้โฟลเดอร์ LOG โยนทับคลิปดิบตรง ๆ:
        *   `Pocket3-LOG-Fresh-Daily.cube` (โทนสีสกินโทนธรรมชาติ ขาวใสอมชมพูสวยงาม)
        *   `Pocket3-LOG-Warm-Trust.cube` (โทนอบอุ่น สร้างมวลอารมณ์บวกและความน่าเชื่อถือ)
        *   `Pocket3-LOG-Cold-Drama.cube` (โทนน้ำเงิน/ Teal Shadow คุมบรรยากาศตึงเครียด ขยี้ประเด็นปัญหา)
        *   *การปรับแต่งเพิ่มเติม:* หากโทนสียังจืด ให้ดึงค่าความอิ่มสี (Saturation) ใน CapCut/Premiere เพิ่มขึ้น **+25 ถึง +30**
    2.  **สูตรมาตรฐานห้องสตูดิโอ (CST + Rec.709):** แปลง D-Log M เป็น Rec.709 ก่อน (ใช้เอฟเฟกต์ CST ใน Resolve หรือย้อมตัวแปลง [Pocket3-LOG-Base-Normalization.cube](file:///c:/AI-Agent-Workspace/creator/6-Editing/New%20LUTS/2-LOG-Looks/Pocket3/Pocket3-LOG-Base-Normalization.cube) เป็นด่านแรก) แล้วค่อยทับด้วยกลุ่ม [1-Rec709-Looks](file:///c:/AI-Agent-Workspace/creator/6-Editing/New%20LUTS/1-Rec709-Looks/) ที่ความเข้ม **35% - 40%**

#### 📱 กรณีใช้กล้องมือถือ iPhone 15/16 Pro (Apple Log)
*   **แนวทาง:** ถ่ายด้วย Apple Log ➔ ย้อมด่านแรกด้วย [iPhone-LOG-Base-Normalization.cube](file:///c:/AI-Agent-Workspace/creator/6-Editing/New%20LUTS/2-LOG-Looks/iPhone/iPhone-LOG-Base-Normalization.cube) ➔ ทับด้วยความสวยงามของ [iPhone-LOG-Fresh-Daily.cube](file:///c:/AI-Agent-Workspace/creator/6-Editing/New%20LUTS/2-LOG-Looks/iPhone/iPhone-LOG-Fresh-Daily.cube) หรือกลุ่ม Looks Rec.709 ตามต้องการ

#### 🚫 หมายเหตุสำคัญสำหรับ Sony S-Log3:
*   ไฟล์ในโฟลเดอร์ [3-Archive-Sony](file:///c:/AI-Agent-Workspace/creator/6-Editing/New%20LUTS/3-Archive-Sony/) (เช่น `Sony-SLog3-Fresh.cube` และตระกูล S-Log) ถูกปรับแต่งมาเฉพาะเซนเซอร์ของกล้อง Sony ห้ามนำมาใช้กับไฟล์ของ DJI Osmo Pocket 3 เด็ดขาด เพราะจะทำให้มิติแสงและสีผิวพังเสียหายครับ
