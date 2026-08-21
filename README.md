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
| Lab 1 | Console & CLI | 62 | 30 |
| Lab 2 | VPC Infrastructure | 163 | 83 |
| Lab 3 | Database Layer (RDS + ALB) | 61 | 60 |
| Lab 4 | High Availability (ASG + Aurora) | 123 | 69 |
| Lab 5 | Serverless (SNS + SQS + Lambda) | 136 | 88 |
| Lab 6 | CloudFront + S3 | 167 | 51 |
| Lab 7 | Capstone: Multi-Tier WordPress | 132 | 48 |
| **Total** | | **844** | **429** |

> ตัวเลขนี้มาจาก `node tools/validate.js` (ดู [Validate](#-validate-ข้อมูล))

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
- Cross-reference: กดข้อ XX → jump ไปข้อนั้น (ทั้งใน **สาเหตุ** และ **วิธีแก้**)

### 🩺 Troubleshoot Tab
- Checklist ตามอาการที่ผู้เรียนบอก (เช่น "หน้าเว็บเข้าไม่ได้", "curl ค้าง") — ไม่ต้องรู้ว่าติดข้อไหน
- กดเปิดอาการ → ได้ลำดับเช็คทีละขั้น: **ดูที่ไหน** → **เช็คอะไร** → ✅ **ต้องเป็น** → ❌ **ถ้าไม่ตรงทำอะไร**
- อ้าง `ข้อ NN` ได้ กดกระโดดไป Steps & Errors ต่อได้ทันที
- ครบทั้ง 7 labs

### 🔍 Search & Jump
- **Search** — พิมพ์ error ที่ผู้เรียนบอกมา แล้วกรองเฉพาะข้อที่เกี่ยว
  ค้นทั้ง step description, ปัญหา, สาเหตุ และวิธีแก้
  ข้อที่ตรงจะกาง error ให้อ่านทันที ไม่ต้องกดเปิดทีละอัน
  บอกจำนวนที่พบ และเตือนเมื่อไม่พบ | กด `Esc` หรือ Clear เพื่อล้าง
- **Jump** — ใส่เลขข้อ กด Go เพื่อไปที่ข้อนั้นตรงๆ

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
├── app.js            # logic (render, tabs, search, navigation, error handling)
├── specs.js          # spec HTML ของแต่ละ lab
├── troubleshoot.js   # troubleshooting checklist ของแต่ละ lab
├── lab1-data.js      # Lab 1 steps + errors
├── lab2-data.js      # Lab 2 steps + errors
├── lab3-data.js      # Lab 3 steps + errors
├── lab4-data.js      # Lab 4 steps + errors
├── lab5-data.js      # Lab 5 steps + errors
├── lab6-data.js      # Lab 6 steps + errors
└── lab7-data.js      # Lab 7 steps + errors

tools/
└── validate.js       # ตรวจความถูกต้องของ data (node tools/validate.js)
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

เพิ่มเสร็จแล้ว **รัน validator ก่อน commit** เพื่อกันพิมพ์ผิด

---

## ✅ Validate ข้อมูล

ไม่มี build step แปลว่า typo ในไฟล์ data จะไม่มีใครเตือน — validator ทำหน้าที่นั้นให้

```bash
node tools/validate.js
```

เช็คให้ทั้งหมดนี้:

| เช็ค | ระดับ |
|------|-------|
| ไฟล์ data โหลดได้ / ไม่มี syntax error | error |
| `index.html` include ทุกไฟล์ + มี element id ที่ `app.js` เรียกใช้ | error |
| ทุก step มี `num` (ตัวเลข, ไม่ซ้ำ), `task`, `desc`, `errors` | error |
| `errors` เป็น array และทุกตัวมี `problem`, `cause`, `fix` เป็น string | error |
| `ข้อ NN` ที่อ้างถึง มีอยู่จริงใน lab นั้น | error |
| troubleshoot checklist มี `title`, `when`, `checks` ครบ | error |
| เลขข้อขาดหาย (ลบ step แล้วไม่ renumber) | warning |
| lab ที่ไม่มี spec หรือ troubleshoot checklist | warning |

exit code `0` = ผ่าน, `1` = มี error — เอาไปต่อ CI หรือ pre-commit hook ได้เลย

---

## 🛡️ Error Handling ในหน้าเว็บ

เมื่อก่อนถ้าไฟล์ data ไฟล์เดียวโหลดไม่ขึ้น หน้าเว็บจะ **ขาวทั้งหน้า** โดยไม่บอกอะไร
ตอนนี้:

- ไฟล์ data พังหนึ่งไฟล์ → lab นั้นขึ้นเป็นการ์ด "ใช้งานไม่ได้" พร้อมชื่อไฟล์ที่ต้องแก้ **lab อื่นยังใช้ได้ปกติ**
- ปัญหาทั้งหมดโชว์บน banner ด้านบน + log ลง console
- ข้อมูล lab ถูก validate ตอนโหลด → การ์ดขึ้น badge `N data warnings`
- `ข้อ NN` ที่ชี้ไปข้อที่ไม่มี → แสดงเป็นมาร์ก ⚠ ขีดฆ่า ไม่ใช่ลิงก์ที่กดแล้วเงียบ
- กด Jump ไปข้อที่ไม่มี → บอกตรงๆ ว่าไม่พบ
- ข้อความจาก data ถูก escape ก่อน render ทั้งหมด

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


