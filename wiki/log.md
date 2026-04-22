# Wiki Log
> Append-only. Never edit past entries. Format: `## [YYYY-MM-DD] <operation> | <title>`

---

## [2026-04-22] init | Wiki bootstrapped

- **Operation:** init
- **Pages touched:** `CLAUDE.md`, `index.md`, `log.md`
- **Key changes:** Wiki directory structure created. Schema defined in CLAUDE.md. Domain set to Thai Civil Servant Benefits (สวัสดิการข้าราชการไทย).
- **Notes:** First session. Ready for first ingest.

---

## [2026-04-22] ingest | สวัสดิการข้าราชการไทย — ฉบับละเอียด

- **Operation:** ingest
- **Source file:** `raw/สวัสดิการข้าราชการไทย.md`
- **Pages created:**
  - `sources/สวัสดิการข้าราชการไทย.md`
  - `concepts/สวัสดิการรักษาพยาบาล.md`
  - `concepts/บำเหน็จบำนาญ.md`
  - `concepts/กบข.md`
  - `concepts/สวัสดิการที่อยู่อาศัย.md`
  - `concepts/สวัสดิการการศึกษา.md`
  - `concepts/ค่าใช้จ่ายการเดินทาง.md`
  - `concepts/วันหยุดและการลา.md`
  - `concepts/สวัสดิการอื่นๆ.md`
  - `comparisons/ข้าราชการ-vs-เอกชน.md`
  - `entities/กรมบัญชีกลาง.md`
  - `entities/กบข-กองทุน.md`
  - `entities/สำนักงาน-กพ.md`
- **Key changes:** 13 pages created from first source. Index updated.
- **Notes:** Comprehensive first source covering all major civil servant benefit categories. No contradictions (only source). Cross-references established across all pages.

---

## [2026-04-22] schema-update | Hotcache protocol added

- **Operation:** schema-update
- **Pages touched:** `hotcache.md` (created), `CLAUDE.md` (v1.0 → v1.1)
- **Key changes:** Introduced hotcache.md as mandatory first-read file. Updated CLAUDE.md with ⚡ Hotcache Protocol section. All three operations (INGEST, QUERY, LINT) now rewrite hotcache at end. Hard rule #9 added.
- **Notes:** Hotcache acts as L1 cache — answers simple queries without full wiki scan. Rolling window ~500 words max. Not append-only.

---

## [2026-04-22] ingest | AIA CI ProCare Brochure

- **Operation:** ingest
- **Source file:** `raw/aia-ci-procare-brochure.pdf`
- **Web reference:** https://prestige.iagencyaia.com/product/27203-31408/aia-ci-procare
- **Pages created (6):**
  - `sources/aia-ci-procare-brochure.md`
  - `concepts/ประกันโรคร้ายแรง-CI.md`
  - `concepts/ผลประโยชน์-AIA-CI-ProCare.md`
  - `concepts/โรคที่คุ้มครอง-62-โรค.md`
  - `concepts/เบี้ยประกัน-AIA-CI-ProCare.md`
  - `entities/AIA-เอไอเอ.md`
- **Key changes:** Domain expanded. Index อัปเดตเป็น 20 pages, 2 sources.
- **Notes:** PDF อ่านผ่าน browser agent + web scrape. เบี้ยประกันที่บันทึกเป็นอัตราจากตัวแทน ควรตรวจสอบกับ AIA โดยตรงก่อนตัดสินใจ. ขาดรายละเอียดข้อยกเว้นครบ (ต้องอ่านกรมธรรม์จริง).

---

## [2026-04-22] ingest (batch) | AIA Product Folder — 17 ไฟล์

- **Operation:** batch ingest
- **โฟลเดอร์:** `raw/AIA _ Product/` (15 ไฟล์) + `raw/AIA _ Product/หลักชีวิต Unit Linked/` (2 ไฟล์)
- **หน้าที่สร้าง (19 หน้า):**
  - sources: หลักชีวิต-ชั่วระยะเวลา, หลักชีวิต-10-15-Pay-Life, หลักชีวิต-20-Pay-Life, หลักชีวิต-สะสมทรัพย์-15-25, หลักชีวิต-CI-ProCare, หลักชีวิต-Issara-Plus
  - sources: เพิ่มเติม-Health-Happy, เพิ่มเติม-Health-Saver, เพิ่มเติม-H&S-New-Standard, เพิ่มเติม-HB-Extra, เพิ่มเติม-CI-Plus, เพิ่มเติม-Multi-Pay-CI-Plus, เพิ่มเติม-Care-for-Cancer, เพิ่มเติม-WPCI, เพิ่มเติม-PA, เพิ่มเติม-UDR
  - concepts: ประกันชีวิต-AIA-ภาพรวม, ประกันสุขภาพ-AIA
- **Key changes:** Index อัปเดตเป็น 41 หน้า, 19 sources. โดเมนขยายครอบคลุมผลิตภัณฑ์ AIA ทั้งหมด.
- **Notes:** Batch ingest ข้อมูลจาก PDF + web search ประกอบ เนื้อหาบางส่วนอาจยังไม่ครบละเอียดเท่า single ingest ควร drill down ทีหลัง

---
