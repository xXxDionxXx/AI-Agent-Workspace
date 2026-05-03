function doPost(e) {
  var sheetName = "AIA_Leads"; // ชื่อ Sheet ที่จะบันทึกข้อมูล
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // พยายามล็อค 10 วินาทีเพื่อป้องกันคนกดพร้อมกัน

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName(sheetName);
    
    // ถ้ายังไม่มี Sheet ชื่อ AIA_Leads ให้สร้างใหม่
    if (!sheet) {
      sheet = doc.insertSheet(sheetName);
    }
    
    // แปลงข้อมูล JSON ที่ส่งมาจาก Web App
    var data = JSON.parse(e.postData.contents);
    
    // ดึง Header ปัจจุบันที่มีอยู่ใน Sheet (ถ้ามี)
    var headers = [];
    if (sheet.getLastColumn() > 0) {
      headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    }
    
    // เตรียมข้อมูลแถวใหม่
    var newRow = [];
    
    // เพิ่ม timestamp เป็นคอลัมน์แรกเสมอ
    if (headers.indexOf("Timestamp") === -1) {
      headers.unshift("Timestamp");
    }
    data["Timestamp"] = new Date();
    
    // วนลูป Key ทั้งหมดใน Data ที่ส่งมา
    for (var key in data) {
      // ถ้า Key นี่ยังไม่มีใน Header ให้เพิ่มเข้าไป
      if (headers.indexOf(key) === -1) {
        headers.push(key);
        // อัปเดต Header ใน Sheet
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      }
      
      // หาตำแหน่ง index ของคอลัมน์นี้ แล้วใส่ข้อมูล
      var colIndex = headers.indexOf(key);
      
      // ตรวจสอบว่าข้อมูลเป็น Array/Object หรือไม่ ถ้าใช่ให้แปลงเป็น String
      var cellValue = data[key];
      if (typeof cellValue === 'object') {
        cellValue = JSON.stringify(cellValue);
      }
      
      newRow[colIndex] = cellValue;
    }
    
    // เติมช่องว่างให้ครบตามจำนวน Header
    for (var i = 0; i < headers.length; i++) {
      if (newRow[i] === undefined) {
        newRow[i] = "";
      }
    }
    
    // เพิ่มแถวใหม่ลงไป
    sheet.appendRow(newRow);
    
    // จัดรูปแบบแถว Header ให้สวยงาม (ตัวหนา, พื้นหลังสีเทา)
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#f3f4f6");

    return ContentService.createTextOutput(JSON.stringify({"result":"success"})).setMimeType(ContentService.MimeType.JSON);
    
  } catch(e) {
    return ContentService.createTextOutput(JSON.stringify({"result":"error", "error": e})).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({"result":"ok","message":"AIA Financial Planner API is running"})).setMimeType(ContentService.MimeType.JSON);
}
