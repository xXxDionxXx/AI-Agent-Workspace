# 🧭 AI-Agent-Workspace — แผนผังนำทาง

> **เจ้าของ:** Nick | Financetry
> **ประเภท:** Workspace สำหรับการสร้างแบรนด์บุคคล (Personal Branding) + ฐานความรู้ประกัน/สวัสดิการ
> **อัปเดตล่าสุด:** 2026-05-28

---

## 📁 โครงสร้างโฟลเดอร์

```
AI-Agent-Workspace/
│
├── creator/                          ← ⭐ ศูนย์กลางระบบครีเอเตอร์
│   ├── dashboard.md                  ← 🏠 หน้าหลัก — รวมลิงก์ทุกอย่าง
│   ├── My-Personal-Brand.md          ← กรอบแนวคิดแบรนด์ Nick
│   ├── Writing-script.md             ← ร่างสคริปต์และบทพูด
│   ├── Hooks-library.md              ← คลัง Hook สะกดสายตา
│   ├── Script-writer-skill.md        ← คัมภีร์ AI เขียนสคริปต์
│   ├── Trackers.md                   ← ระบบติดตามวัดผล
│   ├── Creating-Board.html           ← บอร์ดวางแผนคอนเทนต์ (HTML)
│   │
│   ├── guides/                       ← 📖 คู่มือเฉพาะทาง
│   │   ├── Brand_Evolution_Roadmap.md ← แผนเติบโต 3 ระยะ
│   │   ├── Ideation.md               ← ระบบหาไอเดียคอนเทนต์
│   │   ├── Formats.md                ← สัดส่วนประเภทโพสต์ตามกรวย
│   │   ├── Carousels-guide.md        ← คู่มือ Carousel สไลด์
│   │   ├── Production.md             ← คู่มือถ่ายทำ กล้อง มุมภาพ สถานที่
│   │   └── Re-Hook-guide.md          ← คู่มือยื้อคนดูในคลิปสั้น
│   │
│   ├── Audio-Library/                ← 🎵 คลังเพลง+SFX (252 ไฟล์, 923 MB)
│   │   ├── audio-editing-guide.md    ← คู่มือมิกซ์เสียง/จับคู่เพลง
│   │   ├── Intro/                    ← เพลงสำหรับ Intro (24 เพลง)
│   │   ├── Middle/                   ← เพลงสำหรับเนื้อหาหลัก (151 เพลง)
│   │   ├── Conclusion/               ← เพลงสำหรับปิดท้าย (4 เพลง)
│   │   └── SFX/                      ← Sound Effects (72 ไฟล์)
│   │
│   ├── LUTS/                         ← 🎨 ไฟล์ Color LUT
│   │   ├── WARM.cube                 ← โทนอุ่น (เล่าทริก/แรงบันดาลใจ)
│   │   ├── COLD.cube                 ← โทนเย็น (วิเคราะห์ปัญหา/ความเสี่ยง)
│   │   ├── Fresh.cube                ← โทนสดคม (จอ iPad/กราฟิก)
│   │   └── How to use each LUTS.txt
│   │
│   ├── raw/                          ← 📦 ข้อมูลดิบ/ต้นฉบับอ้างอิง
│   │   ├── Reference-Links-for-Workflow.md
│   │   ├── jack-personal-brand-transcript.md
│   │   ├── orcalynx-hooks-library.md
│   │   ├── orcalynx-hooks-library-compact.md
│   │   ├── 20-viral-scripts-framework.md
│   │   ├── 7-prompts-60-carousels.md
│   │   └── camera-settings.md
│   │
│   └── writing/                      ← ✍️ งานเขียนที่กลั่นแล้ว
│       └── viral-hook-vault.md
│
├── Financial Health Check (AIA)/     ← 💼 เว็บแอปตรวจสุขภาพการเงิน
│
├── wiki/                             ← 📚 ฐานความรู้ ประกัน + สวัสดิการ
│   ├── index.md                      ← สารบัญหลัก Wiki
│   ├── CLAUDE.md                     ← ไฟล์ config สำหรับ AI
│   ├── hotcache.md                   ← ข้อมูลด่วนสำหรับ AI
│   ├── log.md                        ← บันทึกการเปลี่ยนแปลง
│   ├── comparisons/                  ← เปรียบเทียบ (ข้าราชการ vs เอกชน)
│   ├── concepts/                     ← แนวคิด/ความรู้ (15 หน้า)
│   ├── entities/                     ← องค์กร (AIA, กบข, กรมบัญชีกลาง)
│   ├── sources/                      ← เอกสารต้นฉบับ (19 ไฟล์)
│   └── raw/                          ← ข้อมูลดิบ + PDF ผลิตภัณฑ์ AIA
│
├── docs/superpowers/specs/           ← 📋 Design Specs ระบบ Production
│
└── .archive/                         ← 🗄️ ไฟล์ที่เก็บถาวร
    └── scratch/                      ← สคริปต์ชั่วคราวจาก session ก่อน
```

---

## 🚀 Quick Start — เริ่มตรงไหนก่อน?

| ต้องการ | เปิดไฟล์ |
|---------|----------|
| ดูภาพรวมทั้งหมด | [creator/dashboard.md](creator/dashboard.md) |
| เตรียมถ่ายทำ | [creator/guides/Production.md](creator/guides/Production.md) |
| หาเพลง/SFX ใส่คลิป | [creator/Audio-Library/audio-editing-guide.md](creator/Audio-Library/audio-editing-guide.md) |
| ดูข้อมูลประกัน AIA | [wiki/index.md](wiki/index.md) |
| เขียนบทสคริปต์ | [creator/Writing-script.md](creator/Writing-script.md) |
| หาไอเดียคอนเทนต์ | [creator/guides/Ideation.md](creator/guides/Ideation.md) |

---

## 📝 หมายเหตุ

- **`.agents/`** — Skills สำหรับ AI Agent (อย่าแก้ไขด้วยตัวเอง)
- **`.obsidian/`** — Config Obsidian Vault
- **`.archive/`** — ไฟล์ที่เก็บถาวร สามารถลบได้หากมั่นใจว่าไม่ใช้แล้ว
