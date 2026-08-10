# 🛠️ Lab Debug Assistant

> **AWS Training TA Internal Tool** — เว็บสำหรับ TA ใช้ debug ปัญหาของผู้เรียนตอนทำ AWS Lab

---

## 🎯 What is this?

เครื่องมือสำหรับทีม TA ที่ support ผู้เรียนระหว่างทำ AWS Cloud Lab  
ผู้เรียนบอก error → TA เปิดเว็บ → ดูข้อที่ติด → เห็นสาเหตุ + วิธีแก้ทันที

**ไม่ต้อง deploy ไม่ต้อง install** — เปิด `index.html` ใน browser ได้เลย

---

## 📊 Coverage

| Lab | Topic | Steps | Errors |
|-----|-------|-------|--------|
| Lab 2 | VPC Infrastructure | 155 | 69 |
| Lab 3 | Database Layer (RDS + ALB) | 61 | 47 |
| Lab 4 | High Availability (ASG + Aurora) | 123 | 58 |
| Lab 5 | Serverless (SNS + SQS + Lambda) | 121 | 68 |
| Lab 6 | CloudFront + S3 | 167 | 47 |
| **Total** | | **627** | **289** |

---

## ✨ Features

### 🏠 Homepage
- Lab cards แสดงทุก lab พร้อม description + จำนวน steps/errors
- กดเลือก lab → เข้าหน้ารายละเอียด

### 📋 Spec Tab
- **สรุปภาพรวม** — ทำอะไรก่อน-หลัง เพื่ออะไร
- **ค่าที่ต้องใส่** — แบ่งเป็น block สีต่างกันดูง่าย

### ⚠️ Steps & Errors Tab  
- เรียงข้อ 1-xxx ตาม lab instruction
- ข้อที่มี error → แถบสีส้ม กดเปิดดู:
  - **ปัญหาที่เจอ** (summary)
  - **สาเหตุ** (cause)
  - **วิธีแก้** (fix + อ้างอิงข้อ)
- Cross-reference: กดข้อ XX → jump ไปข้อนั้น

---

## 🧠 Error Types Covered

- ❌ Console error messages (AccessDenied, timeout, not authorized)
- 🔄 Cross-reference errors (ทำผิดข้อ 9 → ปัญหาเจอที่ข้อ 72)
- ⏱️ Timing issues (รอ deploy, provisioning, health check)
- 📋 Copy-paste mistakes (space, encoding, สลับค่า)
- 🔤 Case sensitivity (Name tag, Handler, folder name)
- 🔒 Permission/VPC/SG selection errors
- 🌐 Region mistakes
- 💾 Clipboard overwrite between steps

---

## 🚀 How to Use

```
1. เปิด web/index.html ใน browser
2. เลือก Lab ที่ต้องการ
3. ดู Spec tab สำหรับค่าที่ถูกต้อง
4. ดู Steps & Errors tab เมื่อผู้เรียนติดปัญหา
```

---

## 📁 File Structure

```
web/
├── index.html        # หน้าหลัก
├── styles.css        # styling
├── app.js            # logic (render, tabs, navigation)
├── specs.js          # spec HTML ของแต่ละ lab
├── lab2-data.js      # Lab 2 steps + errors
├── lab3-data.js      # Lab 3 steps + errors
├── lab4-data.js      # Lab 4 steps + errors
├── lab5-data.js      # Lab 5 steps + errors
└── lab6-data.js      # Lab 6 steps + errors
```

---

## 🔧 How to Add New Errors

เจอ error ใหม่จากผู้เรียน? เพิ่มได้ง่ายๆ:

```javascript
// ใน labX-data.js หา step ที่ error เกิด แล้วเพิ่มใน errors array:
{ 
  problem: "สิ่งที่ผู้เรียนเจอ",
  cause: "สาเหตุ", 
  fix: "วิธีแก้ (อ้างอิงข้อ XX ได้)" 
}
```

---

## 🎨 Tech Stack

- **Pure HTML/CSS/JS** — ไม่มี framework, ไม่ต้อง build
- **Static site** — เปิดจากไฟล์ได้เลย ไม่ต้อง server
- **Google Fonts** — Inter + JetBrains Mono
- **Responsive** — ใช้บนมือถือได้

---

## 👥 For TA Team

เครื่องมือนี้ออกแบบมาเพื่อ:
- ลดเวลา debug จาก 10 นาที → 30 วินาที
- TA ใหม่ใช้ได้ทันทีไม่ต้องจำทุก error
- สะสม knowledge base จาก real cases

---

*Built with ❤️ for AWS Training TA Team*
