function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); 

  try {
    const SS_ID = "16ZEws0EPR17_bO73nlrMlm-X1Rjw8UaNPxHC6-NnnZw"; 
    var doc = SpreadsheetApp.openById(SS_ID);
    
    // ดึงข้อมูลดิบจาก e.parameter
    var raw = e.parameter || {};

    // คลีนค่าสวัสดิการ + ใส่ Emoji
    var welfareRaw = (raw.welfare || "-").split("—")[0].trim();
    // ตัด Emoji เดิมออก
    var welfareText = welfareRaw.replace(/[\u2700-\u27BF\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDD10-\uDDFF]|[\u2011-\u26FF]/g, '').trim();
    // ใส่ Emoji ตามสวัสดิการ
    if (welfareText.indexOf("ประกันสังคม") >= 0) welfareText = "🔵 ประกันสังคม";
    else if (welfareText.indexOf("ข้าราชการ") >= 0) welfareText = "💼 ข้าราชการ";
    else if (welfareText.indexOf("บัตรทอง") >= 0) welfareText = "💳 บัตรทอง";
    else if (welfareText === "") welfareText = "-";

    // ใส่ Emoji ให้แผนสุขภาพ
    var healthPlan = raw.plan_health || "-";
    if (healthPlan === "Economy") healthPlan = "✈️ Economy Class";
    else if (healthPlan === "Business") healthPlan = "🌟 Business Class";
    else if (healthPlan === "First Class") healthPlan = "👑 First Class";

    var chkAsset = (raw.chk_asset === "Selected") ? "✅" : "❌";
    var chkEdu = (raw.chk_edu === "Selected") ? "✅" : "❌";
    var chkParent = (raw.chk_parent === "Selected") ? "✅" : "❌";

    // อายุ + ปี
    var ageText = (raw.client_age || "-") + " ปี";
    if (raw.client_age === "" || raw.client_age === "-" || !raw.client_age) ageText = "-";

    // ฟังก์ชันจัดรูปแบบเงิน (ปัดเศษ + สกุลเงิน)
    function fmtMoney(val) {
      var n = parseInt(String(val).replace(/,/g, ''), 10) || 0;
      if (n === 0) return "฿0";
      return "฿" + n.toLocaleString('en-US');
    }

    // จัดเรียงข้อมูล
    var rowData = [
      raw.timestamp || "-",
      raw.client_name || "ลูกค้าใหม่",
      ageText,
      fmtMoney(raw.income_monthly),
      raw.family_status || "-",
      welfareText,
      fmtMoney(raw.total_asset),
      fmtMoney(raw.total_liability),
      raw.emergency_goal || "-",
      fmtMoney(raw.edu_budget),
      fmtMoney(raw.retire_monthly),
      fmtMoney(raw.retire_total),
      fmtMoney(raw.parent_monthly),
      fmtMoney(raw.parent_total),
      healthPlan,
      raw.plan_income || "-",
      chkAsset,
      chkEdu,
      chkParent,
      fmtMoney(raw.premium_total),
      raw.premium_pct || "0%"
    ];

    var headers = [
      "🕒 วันเวลาที่บันทึก", "👤 ชื่อลูกค้า", "🎂 อายุ", "💰 รายได้ต่อเดือน", "👨‍👩‍👧‍👦 สถานะครอบครัว", "🏥 สวัสดิการที่มีปัจจุบัน",
      "🏦 สินทรัพย์รวม", "💸 หนี้สินรวม", "🚨 เป้าหมายเงินสำรองฉุกเฉิน", "🎓 ทุนการศึกษารวม", "👴 เงินเกษียณที่ต้องการใช้/เดือน", "💰 เงินเกษียณรวมที่ต้องมี",
      "👵 เงินสนับสนุนบุพการี/เดือน", "🏠 เงินดูแลบุพการีรวม", "🩺 แผนสุขภาพที่เลือก (AIA)", "🛡️ แผนปกป้องรายได้ที่เลือก",
      "🏠 แผนปกป้องทรัพย์สิน", "📜 แผนปกป้องใบปริญญา", "💖 แผนคุณภาพชีวิตบุพการี", "📝 เบี้ยประกันที่เลือกต่อปี", "📊 สัดส่วนเบี้ยต่อรายได้ (%)"
    ];

    // --- ส่วนที่ 1: บันทึกลงหน้า Clients Plan (แนว Column) ---
    var masterSheet = doc.getSheetByName("Clients Plan");
    if (!masterSheet) {
      masterSheet = doc.insertSheet("Clients Plan");
      for (var i = 0; i < headers.length; i++) {
        masterSheet.getRange(i + 1, 1).setValue(headers[i]).setBackground("#d21145").setFontColor("#ffffff").setFontWeight("bold");
      }
      masterSheet.setColumnWidth(1, 250);
      masterSheet.setFrozenColumns(1);
    }
    
    var lastCol = masterSheet.getLastColumn();
    var newCol = lastCol + 1;
    
    var data2D = rowData.map(function(item) { return [item]; });
    var dataColRange = masterSheet.getRange(1, newCol, rowData.length, 1);
    dataColRange.setValues(data2D).setFontWeight("normal");
    // แถวแรก (🕒 วันเวลาที่บันทึก) ให้เป็นตัวหนา สีขาว พื้นหลังแดง เหมือนหัวข้อ
    dataColRange.getCell(1, 1).setBackground("#d21145").setFontColor("#ffffff").setFontWeight("bold");
    masterSheet.setColumnWidth(newCol, 200);

    // จัดข้อความกึ่งกลาง (แนวนอน)
    masterSheet.getRange(1, newCol, rowData.length, 1).setHorizontalAlignment("center");

    // --- ส่วนที่ 2: สร้างชีตแยกสำหรับข้อมูลกรมธรรม์เดิม (ถ้ามี) ---
    var policies = [];
    try { 
      policies = JSON.parse(raw.policies_json || "[]"); 
    } catch(e) {}

    var finalSheetName = "No Policy Data";
    if (policies && policies.length > 0) {
      var clientName = raw.client_name || "ลูกค้า";
      var baseName = clientName.toString().trim();
      finalSheetName = baseName;
      var counter = 2;
      while (doc.getSheetByName(finalSheetName)) {
        finalSheetName = baseName + " (" + counter + ")";
        counter++;
      }
      var polSheet = doc.insertSheet(finalSheetName);
      
      // หัวตารางกรมธรรม์ครบทุกหัวข้อจาก Policy Audit
      var polHeaders = [
        "👤 ชื่อผู้เอาประกัน", "📄 เลขกรมธรรม์", "📜 ชื่อแบบประกัน",
        "📁 ประเภท", "🟢 สถานะ", "💳 ช่องทางชำระ",
        "💰 ทุนประกันชีวิต", "📉 มูลค่าเวนคืน", "💸 เบี้ยประกัน", "📅 รายงวด",
        "⏳ ระยะเวลาส่งเบี้ย (ปี)", "🛡️ คุ้มครองถึง",
        "🗓️ งวดถัดไป (วันที่)",
        "❌ ขาดตั้งแต่วันที่", "💵 ยอดชำระเพื่อต่ออายุ",
        "📉 ทุนชีวิตลดเหลือ (Paid-up)",
        "📅 คุ้มครองถึงปี (Extended)", 
        "💳 หนี้กู้เบี้ยสะสม (APL)", "📈 ดอกเบี้ย APL (%)",
        "💰 เงินคืน: ปีที่", "📅 เงินคืน: ถึง", "💵 เงินคืน: ครั้งละ",
        "🏁 จบสัญญาได้ (บาท)",
        "🏥 ชื่อแบบสุขภาพ", "📋 รูปแบบ (เหมาจ่าย/แยกหมวด)", "🔄 ต่อครั้ง/ต่อปี",
        "✅ การันตีต่ออายุ (GR)", "🛌 ค่าห้อง+อาหาร/วัน", "🩺 ค่าแพทย์ตรวจเยี่ยม/วัน",
        "💰 วงเงินรักษารวม", "🏥 OPD (ครั้งละ)",
        "➖ Deductible", "💵 ยอด Deductible",
        "⚠️ ชื่อแบบ PA", "💀 ทุนเสียชีวิตอุบัติเหตุ", "🩹 ค่ารักษาอุบัติเหตุ/ครั้ง",
        "🛡️ ชื่อแบบ CI", "💰 ทุนประกัน CI", "🦠 คุ้มครอง (จำนวนโรค)", "📜 เงื่อนไข CI",
        "🛏️ ชื่อแบบ HB", "💵 ยอดชดเชย/วัน", "⏳ สูงสุด (วัน)",
        "🧾 ลดหย่อนภาษีชีวิต", "🏥 ลดหย่อนภาษีสุขภาพ",
        "👨‍👩‍👧‍👦 ผู้รับผลประโยชน์", "💸 กู้เงินสดสูงสุด"
      ];
      // --- จัดรูปแบบหัวข้อ: 2 Section พร้อมสีพิเศษรายแถว ---
      var redSectionEnd = 23; 
      var blueRows = [24, 34, 37, 41, 44];

      // Section 1: Headers (Rows 1-23)
      for (var i = 0; i < redSectionEnd; i++) {
        var row = i + 1;
        var cell = polSheet.getRange(row, 1);
        cell.setValue(polHeaders[i]).setFontWeight("bold");
        if (row === 1) {
          cell.setBackground("#d21145").setFontColor("#ffffff");
        } else {
          var bgColor = (i % 2 === 0) ? "#f8d9df" : "#fbebee";
          cell.setBackground(bgColor).setFontColor("#000000");
        }
      }

      // Section 2: Headers (Rows 24-47)
      for (var i = redSectionEnd; i < polHeaders.length; i++) {
        var row = i + 1;
        var cell = polSheet.getRange(row, 1);
        cell.setValue(polHeaders[i]).setFontWeight("bold");
        if (blueRows.indexOf(row) !== -1) {
          cell.setBackground("#0a75bb").setFontColor("#ffffff");
        } else {
          var bgColor = ((i - redSectionEnd) % 2 === 0) ? "#dbe9f8" : "#ecf2f9";
          cell.setBackground(bgColor).setFontColor("#000000");
        }
      }

      polSheet.setColumnWidth(1, 250);
      polSheet.setFrozenColumns(1);

      // ใส่ข้อมูลกรมธรรม์แต่ละเล่ม
      policies.forEach(function(pol, index) {
        var polData = [
          pol.cName || "-", pol.pNo || "-", pol.name || "-", pol.type || "-", pol.status || "-", pol.channel || "-",
          fmtMoney(pol.sa), fmtMoney(pol.cv), fmtMoney(pol.p), pol.payFreq || "-",
          pol.payYears || "-", pol.coverYears || "-", pol.nextDueDate || "-",
          pol.lapseDate || "-", fmtMoney(pol.lapseAmount), fmtMoney(pol.paidUpSA), pol.extendedYear || "-",
          fmtMoney(pol.aplDebt), pol.aplInterest || "-", pol.cbStart || "-", pol.cbEnd || "-", pol.cbAmount || "-",
          fmtMoney(pol.maturityAmount),
          pol.healthName || "-", pol.hType1 || "-", pol.hType2 || "-",
          pol.gr || "-", fmtMoney(pol.roomRate), fmtMoney(pol.doctorRate),
          fmtMoney(pol.healthLimit), fmtMoney(pol.opd),
          pol.deductible || "-", fmtMoney(pol.deductibleAmt),
          pol.paName || "-", fmtMoney(pol.paDeath), fmtMoney(pol.paMedical),
          pol.ciName || "-", fmtMoney(pol.ci), pol.ciConditions || "-", pol.ciCond || "-",
          pol.hbName || "-", fmtMoney(pol.hb), pol.hbMaxDays || "-",
          fmtMoney(pol.taxLife), fmtMoney(pol.taxHealth),
          pol.beneficiary || "-", fmtMoney(pol.loanMax)
        ];
        var col = index + 2;
        var pol2D = polData.map(function(item) { return [item]; });
        polSheet.getRange(1, col, polData.length, 1).setValues(pol2D).setFontWeight("normal");
        polSheet.setColumnWidth(col, 200);
        polSheet.getRange(1, col, polData.length, 1).setHorizontalAlignment("center");

        // จัดสีข้อมูลรายแถว
        for (var r = 0; r < polData.length; r++) {
          var row = r + 1;
          var cell = polSheet.getRange(row, col);
          
          if (row === 1) {
            cell.setBackground("#d21145").setFontColor("#ffffff");
          } else if (blueRows.indexOf(row) !== -1) {
            cell.setBackground("#0a75bb").setFontColor("#ffffff");
          } else if (row <= redSectionEnd) {
            var bgColor = (r % 2 === 0) ? "#f8d9df" : "#fbebee";
            cell.setBackground(bgColor).setFontColor("#000000");
          } else {
            var bgColor = ((r - redSectionEnd) % 2 === 0) ? "#dbe9f8" : "#ecf2f9";
            cell.setBackground(bgColor).setFontColor("#000000");
          }
        }
      });
    }

    return ContentService.createTextOutput("Success: Saved to Clients Plan" + (policies.length > 0 ? " and " + finalSheetName : ""));
  } catch(e) {
    return ContentService.createTextOutput("Error: " + e.toString());
  } finally { lock.releaseLock(); }
}

function doGet(e) {
  if (e.parameter && Object.keys(e.parameter).length > 0) return doPost(e);
  return ContentService.createTextOutput("AIA One-Tab API v9.0 is running");
}
