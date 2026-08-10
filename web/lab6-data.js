const lab6Data = {
  title: "Lab 6 - Configure an Amazon CloudFront Distribution with an Amazon S3 Origin",
  region: "us-west-2",
  steps: [
    { num: 1, task: "Start Lab", desc: "กด Start Lab ที่หน้า lab", errors: [] },
    { num: 2, task: "Start Lab", desc: "กด Open Console เพื่อเปิด AWS Management Console", errors: [
      { problem: "เจอหน้า 'You must first sign out'", cause: "Browser มี session ของ AWS account อื่นค้างอยู่", fix: "กด 'click here' เพื่อ logout → ปิด tab → กลับ lab page → กด Open Console ใหม่ | หรือใช้ Incognito" }
    ]},
    { num: 3, task: "Task 1.1", desc: "ค้นหา CloudFront ใน search bar ของ AWS Console", errors: [] },
    { num: 4, task: "Task 1.1", desc: "คลิกเลือก CloudFront จากผลการค้นหา", errors: [] },
    { num: 5, task: "Task 1.2", desc: "คลิกที่ Distribution ID ที่มีอยู่แล้วเพื่อเปิดรายละเอียด", errors: [
      { problem: "ไม่เห็น distribution ใน list", cause: "Region อาจผิด หรือ lab ยัง provision ไม่เสร็จ", fix: "CloudFront เป็น global service ไม่ขึ้นกับ region — รอ 1-2 นาทีแล้ว refresh | ถ้ายังไม่เห็นให้ตรวจว่า lab เริ่มสำเร็จ (สถานะเป็นสีเขียว)" }
    ]},
    { num: 6, task: "Task 1.3", desc: "สำรวจ tab ต่างๆ ของ Distribution โดยเริ่มจาก Details section", errors: [] },
    { num: 7, task: "Task 1.3", desc: "Copy ค่า ARN จาก Details section เก็บไว้ใน notepad (จะใช้ในขั้นตอนที่ 65)", errors: [
      { problem: "ลืม copy ARN → ตอนขั้นตอนที่ 65 ไม่มี ARN ใส่", cause: "ถ้าไม่ copy ตอนนี้ ตอน Task 5.1 จะต้องย้อนกลับมาหา ARN อีกรอบ", fix: "กลับมาได้: CloudFront → Distributions → กดเข้า distribution → Details section → copy ARN" }
    ]},
    { num: 8, task: "Task 1.3", desc: "Copy ค่า Distribution domain name (เช่น d1234abcd.cloudfront.net)", errors: [
      { problem: "Copy ผิดค่า (copy ARN แทน domain name หรือสลับกัน)", cause: "ใน Details section มีหลายค่า — ARN กับ Distribution domain name อยู่ใกล้กัน", fix: "Distribution domain name มีรูปแบบ d1234abcd.cloudfront.net | ARN มีรูปแบบ arn:aws:cloudfront::123456789012:distribution/XXXXX — คนละอัน" }
    ]},
    { num: 9, task: "Task 1.3", desc: "วาง Distribution domain name ใน browser tab ใหม่ → จะเห็นหน้าเว็บ", errors: [
      { problem: "หน้าเว็บ timeout หรือไม่แสดง", cause: "Distribution ยังไม่ deployed เสร็จ หรือ copy domain name ผิด", fix: "ตรวจ Status ของ distribution ต้องเป็น 'Enabled' และ Last modified ไม่ใช่ 'Deploying' | ตรวจว่า copy domain name ถูกต้อง (ไม่มี space หน้าหรือหลัง)" }
    ]},
    { num: 10, task: "Task 1.3", desc: "กลับมาที่ CloudFront console แล้วคลิกแท็บ Security", errors: [] },
    { num: 11, task: "Task 1.3", desc: "สำรวจข้อมูลใน Security tab", errors: [] },
    { num: 12, task: "Task 1.3", desc: "คลิกแท็บ Origins เพื่อดู origin ที่ตั้งค่าไว้", errors: [] },
    { num: 13, task: "Task 1.3", desc: "Copy ค่า Origin domain (Load Balancer DNS) จากคอลัมน์ Origin domain", errors: [] },
    { num: 14, task: "Task 1.3", desc: "วาง Load Balancer DNS ใน browser tab ใหม่ → จะเห็นหน้าเว็บเดียวกัน", errors: [
      { problem: "หน้าเว็บไม่แสดงเหมือนตอนข้อ 9 หรือ Instance ID ต่างกัน", cause: "Instance ID ต่าง = ปกติ (ALB round-robin ไปหลาย instance) | หน้าไม่แสดงเลย = ตอน copy DNS มา copy ผิดค่า", fix: "Instance ID ต่างจากข้อ 9 = ถูกต้อง (ALB route ไปคนละ instance) | ถ้า timeout ตรวจว่า copy Origin domain ถูกตัว" }
    ]},
    { num: 15, task: "Task 1.3", desc: "กลับมาที่ CloudFront console แล้วคลิกแท็บ Behaviors", errors: [] },
    { num: 16, task: "Task 1.3", desc: "สำรวจข้อมูลใน Behaviors tab (ดู path pattern และ origin)", errors: [] },
    { num: 17, task: "Task 1.3", desc: "คลิกแท็บ Error pages เพื่อดูการตั้งค่า custom error responses", errors: [] },
    { num: 18, task: "Task 1.3", desc: "คลิกแท็บ Invalidations เพื่อดู cache invalidation requests", errors: [] },
    { num: 19, task: "Task 1.3", desc: "คลิกแท็บ Tags เพื่อดู tags ที่ติดไว้กับ distribution", errors: [] },
    { num: 20, task: "Task 2", desc: "ค้นหา S3 ใน search bar ของ AWS Console", errors: [] },
    { num: 21, task: "Task 2", desc: "คลิกเข้าสู่ S3 console แล้วกด Create bucket", errors: [] },
    { num: 22, task: "Task 2", desc: "Copy ค่า LabBucketName จากแผงด้านซ้ายของ lab แล้ววางในช่อง Bucket name", errors: [
      { problem: "เจอ error 'Bucket name already exists' หรือ 'Bucket name is not available'", cause: "ชื่อ S3 bucket ต้อง unique ทั่วโลก — อาจมีคนอื่นใช้ชื่อนี้แล้ว หรือ copy ชื่อผิด", fix: "ตรวจว่า copy จากแผงด้านซ้ายถูกต้อง (ไม่มี space) | ถ้ายังไม่ได้ลอง refresh lab page เพื่อดูค่าใหม่" }
    ]},
    { num: 23, task: "Task 2", desc: "ปล่อยค่า settings อื่นๆ ทั้งหมดเป็น default", errors: [] },
    { num: 24, task: "Task 2", desc: "กด Create bucket → จะเห็น success", errors: [] },
    { num: 25, task: "Task 3.1", desc: "คลิกที่ชื่อ LabBucket link เพื่อเข้าไปใน bucket", errors: [] },
    { num: 26, task: "Task 3.1", desc: "คลิกแท็บ Permissions", errors: [] },
    { num: 27, task: "Task 3.1", desc: "เลื่อนลงมาที่ส่วน Block public access (bucket settings)", errors: [] },
    { num: 28, task: "Task 3.1", desc: "กด Edit ที่ส่วน Block public access", errors: [] },
    { num: 29, task: "Task 3.1", desc: "เอาเครื่องหมายถูกออกจาก 'Block all public access' (uncheck)", errors: [
      { problem: "ลืม uncheck Block all public access", cause: "ถ้าไม่ uncheck จะทำให้ object ใน bucket ไม่สามารถเข้าถึง publicly ได้ → ขั้นตอนที่ 54 จะ AccessDenied", fix: "กลับมาที่ Permissions → Block public access → Edit → Uncheck 'Block all public access' → Save" }
    ]},
    { num: 30, task: "Task 3.1", desc: "กด Save changes", errors: [] },
    { num: 31, task: "Task 3.1", desc: "พิมพ์ 'confirm' ในช่องยืนยัน แล้วกด Confirm", errors: [
      { problem: "ปุ่ม Confirm กดไม่ได้ (greyed out)", cause: "ยังไม่ได้พิมพ์ 'confirm' ในช่อง text หรือพิมพ์ผิด (เช่น Confirm แทน confirm)", fix: "พิมพ์ confirm (ตัวเล็กทั้งหมด ไม่มี space) ในช่อง text แล้วปุ่มจะ active" }
    ]},
    { num: 32, task: "Task 3.1", desc: "เห็นข้อความ success ว่า Block public access settings ถูกอัพเดทแล้ว", errors: [] },
    { num: 33, task: "Task 3.2", desc: "ยังอยู่ที่แท็บ Permissions เลื่อนลงมาหาส่วน Bucket policy", errors: [] },
    { num: 34, task: "Task 3.2", desc: "กด Edit ที่ส่วน Bucket policy", errors: [] },
    { num: 35, task: "Task 3.2", desc: "Copy ค่า Bucket ARN ที่แสดงอยู่ด้านบนของ Policy editor", errors: [
      { problem: "ลืม copy Bucket ARN → ตอนข้อ 37 ไม่มีค่าใส่", cause: "ARN อยู่ด้านบนของ Policy editor box — หลายคนมองข้ามเพราะสนใจแต่ช่อง JSON", fix: "กลับมา copy ได้ตลอด: S3 → bucket → Permissions → Bucket policy → Edit → ARN อยู่ด้านบนช่อง editor" }
    ]},
    { num: 36, task: "Task 3.2", desc: "Copy JSON policy จากเอกสาร lab instructions (AllowPublicRead policy)", errors: [] },
    { num: 37, task: "Task 3.2", desc: "แทนที่ RESOURCE_ARN ใน JSON ด้วย Bucket ARN ที่ copy ไว้ แล้วต่อท้ายด้วย /*", errors: [
      { problem: "Policy ไม่ทำงาน — ยัง AccessDenied", cause: "ไม่ได้แทนที่ RESOURCE_ARN หรือลืมต่อท้าย /* หรือ JSON syntax ผิด", fix: "ตรวจว่า Resource field เป็น \"arn:aws:s3:::bucket-name/*\" (มี /* ต่อท้าย) | ตรวจ JSON ว่าไม่มี comma เกิน หรือ bracket ขาด" }
    ]},
    { num: 38, task: "Task 3.2", desc: "กลับไปที่หน้า S3 Bucket policy editor", errors: [] },
    { num: 39, task: "Task 3.2", desc: "วาง JSON policy ที่แก้ไขแล้วลงใน Policy editor box", errors: [] },
    { num: 40, task: "Task 3.2", desc: "กด Save changes", errors: [
      { problem: "เจอ error 'Invalid JSON' หรือ 'Malformed Policy'", cause: "JSON ไม่ถูกต้อง — อาจมี text เก่าค้างอยู่ ลืมลบ placeholder หรือ format ผิด", fix: "ลบ content ทั้งหมดใน policy editor → paste JSON ใหม่ทั้งหมด → ตรวจว่าไม่มี RESOURCE_ARN เหลือ และมี /* ต่อท้าย ARN" }
    ]},
    { num: 41, task: "Task 4.1", desc: "คลิกแท็บ Objects", errors: [] },
    { num: 42, task: "Task 4.1", desc: "กด Create folder", errors: [] },
    { num: 43, task: "Task 4.1", desc: "ตั้งชื่อ Folder name เป็น CachedObjects", errors: [
      { problem: "Folder ชื่อผิดตัวพิมพ์ (เช่น cachedobjects, cachedObjects, Cachedobjects)", cause: "S3 เป็น case-sensitive — ชื่อ folder ต้องตรงตัวพอดีกับที่จะใช้ใน CloudFront behavior path pattern", fix: "ต้องเป็น CachedObjects (C ใหญ่, O ใหญ่) ตรงตัว — ถ้าสร้างผิดให้ลบ folder แล้วสร้างใหม่" }
    ]},
    { num: 44, task: "Task 4.1", desc: "ปล่อย encryption settings เป็นค่า default", errors: [] },
    { num: 45, task: "Task 4.1", desc: "กด Create folder → จะเห็น success", errors: [] },
    { num: 46, task: "Task 4.2", desc: "ดาวน์โหลดไฟล์ logo.png จากลิงก์ใน lab instructions", errors: [
      { problem: "ไฟล์ถูก rename เป็น logo (1).png หรือชื่ออื่น", cause: "Browser ตั้งค่า auto-rename เมื่อมีไฟล์ซ้ำ หรือ OS เพิ่ม suffix", fix: "Rename ไฟล์กลับเป็น logo.png ก่อน upload | หรือลบไฟล์เก่าใน Downloads แล้วดาวน์โหลดใหม่" }
    ]},
    { num: 47, task: "Task 4.2", desc: "กลับมาที่ S3 console", errors: [] },
    { num: 48, task: "Task 4.2", desc: "คลิกเข้าไปใน folder CachedObjects/", errors: [] },
    { num: 49, task: "Task 4.2", desc: "กด Upload", errors: [] },
    { num: 50, task: "Task 4.2", desc: "กด Add files", errors: [] },
    { num: 51, task: "Task 4.2", desc: "เลือกไฟล์ logo.png ที่ดาวน์โหลดไว้", errors: [] },
    { num: 52, task: "Task 4.2", desc: "กด Upload → จะเห็น success", errors: [] },
    { num: 53, task: "Task 4.3", desc: "คลิกที่ไฟล์ logo.png เพื่อดูรายละเอียด", errors: [] },
    { num: 54, task: "Task 4.3", desc: "คลิก Object URL → รูปภาพจะแสดงใน browser tab ใหม่", errors: [
      { problem: "เจอ AccessDenied (403 Forbidden)", cause: "Block public access ยังเปิดอยู่ (ไม่ได้ uncheck ขั้นตอนที่ 29) หรือ Bucket policy ไม่ถูกต้อง", fix: "กลับไปตรวจ: 1) Permissions → Block public access ต้อง Off ทุกข้อ 2) Bucket policy ต้องมี s3:GetObject allow สำหรับ Principal * กับ Resource arn:aws:s3:::bucket-name/*" },
      { problem: "AccessDenied ทั้งที่ Block public access ปิดแล้วและ Bucket policy ใส่แล้ว", cause: "Bucket policy ข้อ 37 ใส่ Resource ARN ไม่มี /* ต่อท้าย ทำให้ policy apply กับ bucket เท่านั้น ไม่ได้ apply กับ objects ข้างใน", fix: "ไป Bucket policy → Edit → ตรวจว่า Resource เป็น \"arn:aws:s3:::bucket-name/*\" (ต้องมี /* ต่อท้ายเสมอ)" }
    ]},
    { num: 55, task: "Task 4.3", desc: "สังเกต URL ใน address bar — จะเป็น S3 URL (ไม่ใช่ CloudFront)", errors: [] },
    { num: 56, task: "Task 4.3", desc: "ปิด browser tab ที่แสดงรูปภาพ", errors: [] },
    { num: 57, task: "Task 5.1", desc: "ค้นหา S3 ใน search bar", errors: [] },
    { num: 58, task: "Task 5.1", desc: "คลิกเลือก LabBucket", errors: [] },
    { num: 59, task: "Task 5.1", desc: "คลิกแท็บ Permissions", errors: [] },
    { num: 60, task: "Task 5.1", desc: "เลื่อนลงมาที่ส่วน Bucket policy", errors: [] },
    { num: 61, task: "Task 5.1", desc: "กด Edit ที่ Bucket policy", errors: [] },
    { num: 62, task: "Task 5.1", desc: "Copy ค่า Bucket ARN ที่แสดงด้านบน Policy editor", errors: [] },
    { num: 63, task: "Task 5.1", desc: "Copy JSON policy ใหม่จาก lab instructions (AllowCloudFrontServicePrincipalReadOnly)", errors: [] },
    { num: 64, task: "Task 5.1", desc: "แทนที่ RESOURCE_ARN ด้วย Bucket ARN ที่ copy ไว้ แล้วต่อท้ายด้วย /*", errors: [
      { problem: "Policy ไม่ทำงาน — CloudFront ยัง AccessDenied", cause: "ไม่ได้แทนที่ RESOURCE_ARN หรือลืมต่อท้าย /* หรือทับ ARN เก่าไม่หมด", fix: "ตรวจว่า Resource เป็น \"arn:aws:s3:::bucket-name/*\" (ลบ RESOURCE_ARN ทั้งคำรวม placeholder)" }
    ]},
    { num: 65, task: "Task 5.1", desc: "แทนที่ CLOUDFRONT_DISTRIBUTION_ARN ด้วย CloudFront ARN ที่ copy ไว้จากขั้นตอนที่ 7", errors: [
      { problem: "Policy error หรือ CloudFront ไม่สามารถเข้าถึง S3 ได้", cause: "ใส่ ARN ผิด — อาจ copy Distribution domain แทน ARN หรือ ARN ไม่ครบ", fix: "CloudFront ARN มีรูปแบบ arn:aws:cloudfront::123456789012:distribution/EDFDVBD6EXAMPLE — ต้อง copy จาก Details tab ของ distribution (ขั้นตอนที่ 7)" }
    ]},
    { num: 66, task: "Task 5.1", desc: "กลับไปที่ S3 console Bucket policy editor", errors: [] },
    { num: 67, task: "Task 5.1", desc: "ลบ policy เก่าทั้งหมดแล้ววาง JSON policy ใหม่ที่แก้ไขแล้ว", errors: [
      { problem: "เจอ error 'Invalid JSON' หรือ 'Malformed Policy'", cause: "ไม่ได้ลบ policy เก่าก่อน paste ใหม่ ทำให้ JSON ซ้อนกัน", fix: "Select All (Ctrl+A) ใน policy editor → ลบ → แล้ว paste JSON ใหม่ทั้งหมด" }
    ]},
    { num: 68, task: "Task 5.1", desc: "กด Save changes", errors: [
      { problem: "เจอ error เมื่อ save", cause: "JSON syntax ไม่ถูกต้อง หรือ ARN ที่ใส่ไม่ตรงกับ resource จริง", fix: "ตรวจ JSON อีกครั้ง: 1) ไม่มี trailing comma 2) brackets ครบ 3) RESOURCE_ARN และ CLOUDFRONT_DISTRIBUTION_ARN ถูกแทนที่หมดแล้ว" }
    ]},
    { num: 69, task: "Task 5.2", desc: "ยังอยู่ที่แท็บ Permissions เลื่อนไปที่ Block public access (bucket settings)", errors: [] },
    { num: 70, task: "Task 5.2", desc: "กด Edit ที่ส่วน Block public access", errors: [] },
    { num: 71, task: "Task 5.2", desc: "เลือก (check) Block all public access เพื่อเปิดการ block กลับมา", errors: [] },
    { num: 72, task: "Task 5.2", desc: "กด Save changes", errors: [] },
    { num: 73, task: "Task 5.2", desc: "พิมพ์ 'confirm' ในช่องยืนยัน แล้วกด Confirm", errors: [] },
    { num: 74, task: "Task 5.2", desc: "เห็นข้อความ success ว่า Block public access settings ถูก enable แล้ว", errors: [] },
    { num: 75, task: "Task 5.3", desc: "ค้นหา CloudFront ใน search bar", errors: [] },
    { num: 76, task: "Task 5.3", desc: "คลิกที่ Distribution ID เพื่อเข้าไปใน distribution", errors: [] },
    { num: 77, task: "Task 5.3", desc: "คลิกแท็บ Origins", errors: [] },
    { num: 78, task: "Task 5.3", desc: "กด Create origin", errors: [] },
    { num: 79, task: "Task 5.3", desc: "ในช่อง Origin domain เลือก LabBucket จากส่วน Amazon S3 ใน dropdown", errors: [
      { problem: "ไม่เห็น LabBucket ใน dropdown", cause: "Bucket อยู่คนละ region หรือชื่อ bucket ผิด หรือ dropdown ยังโหลดไม่เสร็จ", fix: "รอสักครู่ให้ dropdown โหลด | ตรวจว่า bucket สร้างสำเร็จใน S3 console | ลองพิมพ์ชื่อ bucket ใน search ของ dropdown" }
    ]},
    { num: 80, task: "Task 5.3", desc: "ปล่อย Origin path เป็นว่าง (ไม่ต้องใส่อะไร)", errors: [] },
    { num: 81, task: "Task 5.3", desc: "ตั้ง Name เป็น My Amazon S3 Origin", errors: [
      { problem: "ชื่อ Origin ผิด → ตอนข้อ 89 จะหาไม่เจอใน dropdown", cause: "Behavior ข้อ 89 ต้องเลือก origin ตรงตามชื่อที่ตั้ง", fix: "ใส่ My Amazon S3 Origin ตรงตัว (case sensitive) — ถ้าตั้งผิดสามารถแก้ได้: Origins tab → เลือก origin → Edit → เปลี่ยนชื่อ" }
    ]},
    { num: 82, task: "Task 5.3", desc: "ในส่วน Origin access เลือก Origin access control settings (recommended)", errors: [] },
    { num: 83, task: "Task 5.3", desc: "กด Create new OAC → ปล่อยค่า default → กด Create", errors: [
      { problem: "เจอ error 'OAC already exists' หรือชื่อซ้ำ", cause: "มี OAC ชื่อเดียวกันอยู่แล้ว (อาจเคยสร้างไว้ก่อนหน้า)", fix: "เลือก OAC ที่มีอยู่แล้วจาก dropdown แทนการสร้างใหม่ | หรือเปลี่ยนชื่อ OAC เป็นชื่ออื่น" }
    ]},
    { num: 84, task: "Task 5.3", desc: "ปล่อยค่าอื่นๆ เป็น default", errors: [] },
    { num: 85, task: "Task 5.3", desc: "กด Create origin → จะเห็น success (ไม่ต้องสนใจ warning เรื่อง S3 bucket policy)", errors: [
      { problem: "เจอ error เมื่อสร้าง origin", cause: "Origin domain ไม่ถูกต้อง หรือ OAC ไม่ได้ถูกเลือก", fix: "ตรวจว่า Origin domain เป็น S3 bucket (ลงท้าย .s3.amazonaws.com) | ตรวจว่าเลือก Origin access control settings แล้ว และมี OAC ถูกเลือก" }
    ]},
    { num: 86, task: "Task 5.4", desc: "คลิกแท็บ Behaviors", errors: [] },
    { num: 87, task: "Task 5.4", desc: "กด Create behavior", errors: [] },
    { num: 88, task: "Task 5.4", desc: "ตั้ง Path pattern เป็น CachedObjects/*.png", errors: [
      { problem: "CloudFront ไม่ route request ไปที่ S3 origin", cause: "Path pattern ตัวพิมพ์ผิด (เช่น cachedobjects/*.png หรือ Cachedobjects/*.png)", fix: "ต้องเป็น CachedObjects/*.png (C ใหญ่, O ใหญ่) ตรงกับชื่อ folder ที่สร้างใน S3 พอดี — แก้โดย edit behavior แล้วแก้ path pattern" }
    ]},
    { num: 89, task: "Task 5.4", desc: "ในส่วน Origin and origin groups เลือก My Amazon S3 Origin", errors: [
      { problem: "ไม่เห็น 'My Amazon S3 Origin' ใน dropdown", cause: "Origin สร้างไม่สำเร็จ หรือชื่อ origin ตั้งไว้ต่างจากที่ lab กำหนด", fix: "กลับไปตรวจแท็บ Origins ว่ามี origin ชื่อ 'My Amazon S3 Origin' อยู่ — ถ้าไม่มีให้สร้างใหม่ตามขั้นตอนที่ 78-85" }
    ]},
    { num: 90, task: "Task 5.4", desc: "ในส่วน Cache key and origin requests เลือก Cache policy and origin request policy (recommended)", errors: [] },
    { num: 91, task: "Task 5.4", desc: "ในช่อง Cache policy เลือก CachingOptimized", errors: [] },
    { num: 92, task: "Task 5.4", desc: "ปล่อยค่าอื่นๆ เป็น default", errors: [] },
    { num: 93, task: "Task 5.4", desc: "กด Create behavior → จะเห็น success", errors: [] },
    { num: 94, task: "Task 6", desc: "ค้นหา S3 ใน search bar", errors: [] },
    { num: 95, task: "Task 6", desc: "คลิกเลือก LabBucket", errors: [] },
    { num: 96, task: "Task 6", desc: "คลิกแท็บ Objects", errors: [] },
    { num: 97, task: "Task 6", desc: "คลิกเข้าไปใน folder CachedObjects/", errors: [] },
    { num: 98, task: "Task 6", desc: "คลิกที่ไฟล์ logo.png", errors: [] },
    { num: 99, task: "Task 6", desc: "คลิก Object URL → จะเจอ AccessDenied (นี่คือผลลัพธ์ที่ถูกต้อง! เพราะ Block public access ถูกเปิดแล้ว)", errors: [
      { problem: "เห็น AccessDenied (403 Forbidden)", cause: "นี่คือพฤติกรรมที่ถูกต้อง (expected) — Block public access ทำงานปกติ ทำให้เข้าถึง S3 ตรงๆ ไม่ได้", fix: "ไม่ต้องแก้ไขอะไร — AccessDenied ที่นี่หมายความว่า lab ทำถูกต้อง! Bucket ถูก block จาก public access แล้ว ต้องเข้าผ่าน CloudFront เท่านั้น" }
    ]},
    { num: 100, task: "Task 7", desc: "Copy ค่า CloudFront distribution domain DNS จากแผงด้านซ้ายของ lab (LabCloudFrontDistributionDNS)", errors: [
      { problem: "Copy ผิดค่า (copy ARN แทน DNS หรือ copy DNS ของ Load Balancer แทน CloudFront)", cause: "แผงด้านซ้ายมีหลายค่าคล้ายกัน: LabCloudFrontDistributionDNS vs LabLoadBalancerDNS", fix: "ต้อง copy LabCloudFrontDistributionDNS (รูปแบบ d1234abcd.cloudfront.net) ไม่ใช่ LabLoadBalancerDNS (รูปแบบ LabELB-xxxxx.elb.amazonaws.com)" }
    ]},
    { num: 101, task: "Task 7", desc: "วาง DNS ใน browser tab ใหม่", errors: [] },
    { num: 102, task: "Task 7", desc: "ต่อท้าย URL ด้วย /CachedObjects/logo.png แล้วกด Enter → จะเห็นรูปภาพ", errors: [
      { problem: "เจอ AccessDenied จาก CloudFront", cause: "Distribution ยังอยู่ระหว่าง deploy (ใช้เวลา 5-15 นาทีหลังสร้าง origin/behavior ใหม่)", fix: "รอ 5-15 นาทีแล้วลอง refresh — ตรวจ distribution status ที่ CloudFront console ว่าไม่ใช่ 'Deploying' | ถ้ารอนานแล้วยังไม่ได้ ตรวจ bucket policy (ขั้นตอนที่ 67-68)" },
      { problem: "เจอ 404 Not Found", cause: "Path ใน URL ผิด — ชื่อ folder หรือไฟล์ไม่ตรง", fix: "URL ต้องเป็น https://d1234abcd.cloudfront.net/CachedObjects/logo.png (ตัวพิมพ์ใหญ่-เล็กต้องตรง) — ตรวจชื่อ folder และไฟล์ใน S3" },
      { problem: "รอ 15+ นาทีแล้ว ยังเจอ AccessDenied", cause: "Bucket policy ข้อ 67 ผิด — อาจลืมเปลี่ยน RESOURCE_ARN (ข้อ 64) หรือ CLOUDFRONT_DISTRIBUTION_ARN (ข้อ 65) หรือลืมต่อ /* ท้าย Resource ARN", fix: "ไป S3 → LabBucket → Permissions → Bucket policy → Edit → ตรวจว่า:\n1. Resource เป็น arn:aws:s3:::bucket-name/* (มี /*)\n2. AWS:SourceArn เป็น ARN ของ CloudFront distribution (ไม่ใช่ domain name)\n3. ไม่มี RESOURCE_ARN หรือ CLOUDFRONT_DISTRIBUTION_ARN placeholder เหลืออยู่" }
    ]},
    { num: 103, task: "Task 8.1", desc: "กลับมาที่ AWS Console", errors: [] },
    { num: 104, task: "Task 8.1", desc: "ค้นหา S3 ใน search bar", errors: [] },
    { num: 105, task: "Task 8.1", desc: "คลิกเลือก LabBucket", errors: [] },
    { num: 106, task: "Task 8.1", desc: "คลิกแท็บ Properties", errors: [] },
    { num: 107, task: "Task 8.1", desc: "เลื่อนลงมาที่ส่วน Bucket Versioning", errors: [] },
    { num: 108, task: "Task 8.1", desc: "กด Edit ที่ Bucket Versioning", errors: [] },
    { num: 109, task: "Task 8.1", desc: "เลือก Enable สำหรับ Bucket Versioning", errors: [
      { problem: "ลืม enable Versioning → Replication rule จะสร้างไม่ได้ (ข้อ 146)", cause: "Cross-Region Replication ต้องการ Versioning enabled ทั้ง source และ destination bucket", fix: "กลับมาที่ S3 → LabBucket → Properties → Bucket Versioning → Edit → Enable → Save" }
    ]},
    { num: 110, task: "Task 8.1", desc: "กด Save changes", errors: [] },
    { num: 111, task: "Task 8.2", desc: "คลิก General purpose buckets ในเมนู navigation ด้านซ้าย", errors: [] },
    { num: 112, task: "Task 8.2", desc: "เปลี่ยน Region dropdown เป็น SecondaryRegion (ดูจากแผงด้านซ้ายของ lab)", errors: [
      { problem: "ไม่ได้เปลี่ยน region — สร้าง bucket ผิด region", cause: "ถ้าสร้าง destination bucket ใน region เดียวกับ source จะทำให้ cross-region replication ไม่ทำงาน", fix: "ลบ bucket ที่สร้างผิด region → เปลี่ยน region dropdown ให้ตรงกับ SecondaryRegion จากแผงด้านซ้าย → สร้างใหม่" }
    ]},
    { num: 113, task: "Task 8.2", desc: "กด Create bucket", errors: [] },
    { num: 114, task: "Task 8.2", desc: "Copy ค่า DestinationBucketName จากแผงด้านซ้ายของ lab แล้ววางในช่อง Bucket name", errors: [
      { problem: "เจอ error 'Bucket name already exists' หรือชื่อไม่ valid", cause: "Copy ชื่อผิด มี space หรือตัวอักษรไม่ valid", fix: "ตรวจว่า copy จากแผงด้านซ้ายถูกต้อง — ชื่อ S3 bucket ต้องเป็นตัวเล็ก ตัวเลข ขีดกลาง เท่านั้น ไม่มี space" }
    ]},
    { num: 115, task: "Task 8.2", desc: "เอาเครื่องหมายถูกออกจาก 'Block all public access' (uncheck)", errors: [
      { problem: "ลืม uncheck Block all public access", cause: "ถ้าไม่ uncheck จะทำให้เข้าถึง object ใน destination bucket ไม่ได้ (ขั้นตอนที่ 164)", fix: "กลับมาที่ bucket → Permissions → Block public access → Edit → Uncheck → Save" }
    ]},
    { num: 116, task: "Task 8.2", desc: "ทำเครื่องหมายถูกที่ช่อง acknowledge warning (ยอมรับความเสี่ยง)", errors: [
      { problem: "ลืมทำเครื่องหมาย acknowledge", cause: "ปุ่ม Create bucket จะ disabled ถ้าไม่ acknowledge", fix: "scroll ลงมาหา checkbox 'I acknowledge that the current settings...' แล้วทำเครื่องหมายถูก" }
    ]},
    { num: 117, task: "Task 8.2", desc: "ในส่วน Bucket Versioning เลือก Enable", errors: [
      { problem: "ลืม enable Versioning ที่ Destination bucket → ข้อ 146 จะ error", cause: "Replication ต้องการ Versioning enabled ทั้ง source AND destination", fix: "กลับมาที่ DestinationBucket → Properties → Bucket Versioning → Edit → Enable → Save" }
    ]},
    { num: 118, task: "Task 8.2", desc: "กด Create bucket → จะเห็น success", errors: [] },
    { num: 119, task: "Task 8.3", desc: "คลิก General purpose buckets ในเมนู navigation", errors: [] },
    { num: 120, task: "Task 8.3", desc: "คลิกที่ชื่อ DestinationBucket", errors: [] },
    { num: 121, task: "Task 8.3", desc: "คลิกแท็บ Permissions", errors: [] },
    { num: 122, task: "Task 8.3", desc: "เลื่อนลงมาที่ส่วน Bucket policy", errors: [] },
    { num: 123, task: "Task 8.3", desc: "กด Edit ที่ Bucket policy", errors: [] },
    { num: 124, task: "Task 8.3", desc: "Copy ค่า Bucket ARN ที่แสดงด้านบน Policy editor", errors: [] },
    { num: 125, task: "Task 8.3", desc: "Copy JSON policy จาก lab instructions (AllowPublicRead policy เหมือนขั้นตอนที่ 36)", errors: [] },
    { num: 126, task: "Task 8.3", desc: "แทนที่ RESOURCE_ARN ด้วย Bucket ARN ของ DestinationBucket แล้วต่อท้ายด้วย /*", errors: [
      { problem: "ใส่ ARN ของ LabBucket แทน DestinationBucket", cause: "Copy ARN ผิด bucket — ต้องใช้ ARN ของ destination ไม่ใช่ source", fix: "ตรวจว่า ARN เป็นของ DestinationBucket (ดูชื่อ bucket ใน ARN) — copy ใหม่จาก Policy editor ของ DestinationBucket" }
    ]},
    { num: 127, task: "Task 8.3", desc: "กลับไปที่ S3 console Bucket policy editor", errors: [] },
    { num: 128, task: "Task 8.3", desc: "วาง JSON policy ที่แก้ไขแล้วลงใน Policy editor", errors: [] },
    { num: 129, task: "Task 8.3", desc: "กด Save changes", errors: [
      { problem: "เจอ error 'Invalid JSON' หรือ 'Malformed Policy'", cause: "JSON syntax ผิด หรือ ARN ไม่ถูกต้อง", fix: "Select All → ลบ → paste JSON ใหม่ → ตรวจว่า RESOURCE_ARN ถูกแทนที่ด้วย ARN จริง + /* และไม่มี syntax error" }
    ]},
    { num: 130, task: "Task 8.4", desc: "คลิก General purpose buckets ในเมนู navigation", errors: [] },
    { num: 131, task: "Task 8.4", desc: "คลิกที่ชื่อ LabBucket", errors: [] },
    { num: 132, task: "Task 8.4", desc: "คลิกแท็บ Management", errors: [] },
    { num: 133, task: "Task 8.4", desc: "เลื่อนลงมาที่ส่วน Replication rules", errors: [] },
    { num: 134, task: "Task 8.4", desc: "กด Create replication rule", errors: [
      { problem: "หาส่วน Replication rules ไม่เจอ", cause: "อยู่ผิดแท็บ — Replication rules อยู่ใน Management tab ไม่ใช่ Properties หรือ Permissions", fix: "ตรวจว่าอยู่ที่แท็บ Management แล้วเลื่อนลงมา — Replication rules อยู่ด้านล่างของ Management tab" }
    ]},
    { num: 135, task: "Task 8.4", desc: "ตั้ง Replication rule name เป็น MyCrossRegionReplication", errors: [] },
    { num: 136, task: "Task 8.4", desc: "ตรวจว่า Source bucket เป็น LabBucket", errors: [] },
    { num: 137, task: "Task 8.4", desc: "ในส่วน Choose a rule scope เลือก Apply to all objects in the bucket", errors: [] },
    { num: 138, task: "Task 8.4", desc: "เลื่อนลงมาที่ส่วน Destination", errors: [] },
    { num: 139, task: "Task 8.4", desc: "กด Browse S3", errors: [] },
    { num: 140, task: "Task 8.4", desc: "เลือก DestinationBucket แล้วกด Choose path", errors: [
      { problem: "ไม่เห็น DestinationBucket ในรายการ", cause: "DestinationBucket อยู่คนละ region — S3 replication browse แสดง bucket ทุก region แต่อาจโหลดช้า", fix: "รอสักครู่ให้ list โหลดเสร็จ | ตรวจว่า DestinationBucket สร้างสำเร็จ (ขั้นตอนที่ 118) | ลอง search ชื่อ bucket" }
    ]},
    { num: 141, task: "Task 8.4", desc: "กด Choose path เพื่อเลือก destination", errors: [] },
    { num: 142, task: "Task 8.4", desc: "เลื่อนลงมาที่ส่วน IAM Role", errors: [] },
    { num: 143, task: "Task 8.4", desc: "เลือก Choose from existing IAM roles", errors: [] },
    { num: 144, task: "Task 8.4", desc: "ในช่อง IAM role เลือก S3CRRRole จาก dropdown", errors: [
      { problem: "ไม่เห็น S3CRRRole ใน dropdown", cause: "IAM role ยังไม่ถูก provision โดย lab หรือชื่อ role เปลี่ยน", fix: "ตรวจว่า lab status เป็นสีเขียว (ready) | ลองพิมพ์ S3CRR ใน search | ถ้ายังไม่เห็นให้ Stop Lab แล้ว Start ใหม่" }
    ]},
    { num: 145, task: "Task 8.4", desc: "ปล่อยค่าอื่นๆ เป็น default", errors: [] },
    { num: 146, task: "Task 8.4", desc: "กด Save", errors: [
      { problem: "เจอ error เมื่อ save replication rule", cause: "IAM role ไม่ถูกต้อง หรือ destination bucket ไม่มี versioning enabled หรือ destination ผิด", fix: "ตรวจว่า: 1) IAM role = S3CRRRole 2) DestinationBucket มี Versioning enabled (ขั้นตอนที่ 117) 3) Destination bucket เลือกถูกต้อง" }
    ]},
    { num: 147, task: "Task 8.4", desc: "ถ้ามี popup 'Replicate existing objects?' → เลือก 'No, do not replicate existing objects' แล้วกด Submit", errors: [
      { problem: "เลือก 'Yes' แทน 'No' ทำให้เกิด error หรือ job ค้าง", cause: "การ replicate existing objects ต้องการ S3 Batch Operations ซึ่ง lab ไม่ได้ตั้งค่าไว้", fix: "ต้องเลือก 'No, do not replicate existing objects' เท่านั้น — ถ้าเลือก Yes ไปแล้วให้ปิด popup แล้วลอง save ใหม่ หรือ ignore batch job ที่ fail" }
    ]},
    { num: 148, task: "Task 8.5", desc: "คลิก General purpose buckets ในเมนู navigation", errors: [] },
    { num: 149, task: "Task 8.5", desc: "คลิกที่ชื่อ LabBucket", errors: [] },
    { num: 150, task: "Task 8.5", desc: "ดาวน์โหลดไฟล์ logo2.png จากลิงก์ใน lab instructions", errors: [] },
    { num: 151, task: "Task 8.5", desc: "กลับมาที่ S3 console", errors: [] },
    { num: 152, task: "Task 8.5", desc: "คลิกเข้าไปใน folder CachedObjects/", errors: [] },
    { num: 153, task: "Task 8.5", desc: "กด Upload", errors: [] },
    { num: 154, task: "Task 8.5", desc: "กด Add files", errors: [] },
    { num: 155, task: "Task 8.5", desc: "เลือกไฟล์ logo2.png ที่ดาวน์โหลดไว้", errors: [] },
    { num: 156, task: "Task 8.5", desc: "กด Upload → จะเห็น success", errors: [] },
    { num: 157, task: "Task 8.5", desc: "คลิกที่ไฟล์ logo2.png จากรายการ Files and folders", errors: [] },
    { num: 158, task: "Task 8.5", desc: "ตรวจ Replication status ของ logo2.png — จะเป็น PENDING ก่อน แล้วเปลี่ยนเป็น COMPLETED", errors: [
      { problem: "Replication status ค้างที่ PENDING นานเกินไป", cause: "Cross-region replication ใช้เวลา 2-5 นาที (หรือมากกว่า) ขึ้นกับขนาดไฟล์และ traffic", fix: "รอ 2-5 นาทีแล้ว refresh หน้า | ถ้ารอนานแล้วยังเป็น PENDING ให้ตรวจ: 1) Replication rule status = Enabled 2) IAM role ถูกต้อง 3) Destination bucket มี versioning enabled" }
    ]},
    { num: 159, task: "Task 8.5", desc: "คลิก General purpose buckets ในเมนู navigation", errors: [] },
    { num: 160, task: "Task 8.5", desc: "คลิกที่ชื่อ DestinationBucket (อาจต้องเปลี่ยน region ไปเป็น SecondaryRegion)", errors: [
      { problem: "ไม่เห็น DestinationBucket ใน list", cause: "ยังอยู่ region เดิม — DestinationBucket อยู่ใน SecondaryRegion", fix: "เปลี่ยน Region dropdown ที่มุมบนขวาไปเป็น SecondaryRegion (ดูจากแผงด้านซ้ายของ lab) แล้วจะเห็น bucket" }
    ]},
    { num: 161, task: "Task 8.5", desc: "คลิกเข้าไปใน folder CachedObjects/", errors: [] },
    { num: 162, task: "Task 8.5", desc: "คลิกที่ไฟล์ logo2.png", errors: [] },
    { num: 163, task: "Task 8.5", desc: "ตรวจ Replication status — จะแสดงเป็น REPLICA", errors: [] },
    { num: 164, task: "Task 8.5", desc: "คลิก Object URL → รูปภาพจะแสดงใน browser tab ใหม่", errors: [
      { problem: "เจอ AccessDenied (403 Forbidden)", cause: "DestinationBucket ไม่มี bucket policy สำหรับ public read หรือ Block public access ยังเปิดอยู่", fix: "ตรวจ DestinationBucket: 1) Block public access ต้อง Off (ขั้นตอนที่ 115) 2) Bucket policy ต้องมี AllowPublicRead (ขั้นตอนที่ 119-129)" }
    ]},
    { num: 165, task: "End Lab", desc: "กลับไปที่หน้า lab", errors: [] },
    { num: 166, task: "End Lab", desc: "กด End Lab ที่ด้านบน", errors: [] },
    { num: 167, task: "End Lab", desc: "กด Yes เพื่อยืนยันการจบ lab", errors: [] }
  ]
};
