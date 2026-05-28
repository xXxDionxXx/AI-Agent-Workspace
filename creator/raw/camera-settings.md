# Raw Camera & Color Settings
> ข้อมูลการตั้งค่ากล้อง โปรเจกต์ DaVinci โทนสี Palette และสูตรเซ็ตติ้งสำหรับส่งออก (ส่งมอบ: 2026-05-18)

---

## 📸 1. Camera Settings (ค่ากล้องดิบ)

* **Resolution:** 4K
* **Frame Rate:** 24 fps (ปัจจุบันปรับเป็น 30 fps บน Nothing Phone 2a)
* **Bitrate:** 80-100 Mbps
* **Exposure Mode:** Manual
* **Shutter Speed:** 1/50
* **ISO:** 50 - 1,600
* **Exposure Value (EV):** -0.7
* **Sharpness:** -2
* **Noise Reduction:** -2
* **Color Mode:** D-Log M
* **White Balance:** Auto (แนะนำใช้ Manual สำหรับถ่ายทั่วไป แต่ใช้ Auto สำหรับ Vlogging)

---

## 💻 2. DaVinci Resolve Project Settings (การตั้งค่าโปรเจกต์)

* **Color Science:** DaVinci YRGB
* **Timeline Color Space:** Rec.709
* **Output Color Space:** Rec.709

---

## 🎨 3. Color Space Transform (CST)

* **Input Color Space:** DJI D-Gamut
* **Input Gamma:** Gamma 2.4
* **Output Color Space:** Rec.709
* **Output Gamma:** Gamma 2.4

---

## 🎨 4. Branding Color Palettes (ชุดสีหลักและรหัสสี)

* **Dark Blue & Warm Yellow:**
  * Dark Blue: `#011f7b`
  * Warm Yellow: `#FFBA09`
* **Deep Red & Soft Yellow:**
  * Deep Red: `#AB1509`
  * Soft Yellow: `#fff7d3`
* **Dark Gray & Vivid Yellow:**
  * Dark Gray: `#323232`
  * Vivid Yellow: `#FFDB00`
* **Muted Blue Green & Fresh Green:**
  * Muted Blue Green (Black): `#1A1A00`
  * Fresh Green (Cream): `#FFFFCC`
* **Retro Arcade & Pale Yellow:**
  * Retro Arcade (Black): `#1A0033`
  * Pale Yellow (Red): `#FF4500`

---

## 📤 5. Export Settings for Instagram (การส่งออกวิดีโอ)

* **Resolution:** 1440 x 2560 หรือ 2K หรือ 4K
* **FPS:** 24 (ปัจจุบันแก้เป็น 30 fps บน Phone 2a)
* **Codec:** HEVC (h265)
* **Bitrate:** 17 Mbps
