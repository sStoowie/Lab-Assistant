const lab1Data = {
  title: "Lab 1 - Explore and Interact with the AWS Management Console and AWS CLI",
  region: "LabRegion (ดูจากด้านซ้ายของ lab)",
  steps: [
    { num: 1, task: "Start Lab", desc: "กด Start Lab ที่หน้า lab", errors: [] },
    { num: 2, task: "Start Lab", desc: "กด Open Console เพื่อเปิด AWS Management Console", errors: [
      { problem: "เจอหน้า 'You must first sign out'", cause: "Browser มี session ของ AWS account อื่นค้างอยู่", fix: "กด 'click here' เพื่อ logout → ปิด tab Sign In → กลับมาที่หน้า lab → กด Open Console ใหม่ | หรือใช้ Incognito window" },
      { problem: "กด Start Lab แล้วไม่มีอะไรเกิดขึ้น", cause: "Pop-up blocker ของ browser บล็อก console window", fix: "เพิ่ม domain ของ lab ใน pop-up allow list หรือปิด pop-up blocker → refresh หน้า → กดใหม่" },
      { problem: "ติด permission ทุกอย่าง — ทำอะไรก็ AccessDenied ทั้ง lab", cause: "เผลอกด End Lab ไปแล้ว (ข้อ 61) — พอจบ lab ระบบจะถอน permission ทั้งหมด แต่ tab console ที่เปิดอยู่ยังค้างอยู่ ทำให้ดูเหมือน console ใช้ได้ปกติ", fix: "กด Start Lab ใหม่ → กด Open Console ใหม่ → ปิด tab console เก่าทิ้งให้หมด | ถ้าผู้เรียนบอกว่า 'เมื่อกี้ทำได้อยู่' แล้วพังทั้ง lab ให้เช็คข้อนี้ก่อนเลย" }
    ]},
    { num: 3, task: "Task 1.1", desc: "ที่ navigation bar มุมบนขวา กด Region selector แล้วเลือก Region ที่ต้องการ", errors: [
      { problem: "เลือก Region แล้วเปิดหน้าเว็บอื่นแทน console", cause: "บาง Region อาจ redirect ไปหน้าอื่น", fix: "กด Cancel แล้วลองเลือก Region อื่น | หรือกด AWS logo มุมซ้ายบนเพื่อกลับ console home" }
    ]},
    { num: 4, task: "Task 1.1", desc: "กดไอคอนเฟือง (gear icon) ที่ menu bar เพื่อเปิด General Settings", errors: [] },
    { num: 5, task: "Task 1.1", desc: "กด See all user settings → จะเห็นหน้า Unified Settings", errors: [] },
    { num: 6, task: "Task 1.1", desc: "ในส่วน Localization and default Region กด Edit", errors: [] },
    { num: 7, task: "Task 1.1", desc: "เลือก Default Region จาก dropdown menu", errors: [] },
    { num: 8, task: "Task 1.1", desc: "กด Save settings", errors: [
      { problem: "ไม่เห็น success message หลังกด Save", cause: "เลือก Region เดียวกับที่ใช้อยู่ตอนนี้ — ต้องเลือก Region ที่ต่างจากปัจจุบันถึงจะเห็น message", fix: "ลองเลือก Region อื่นที่ต่างจาก Region ปัจจุบัน แล้วกด Save settings ใหม่" }
    ]},
    { num: 9, task: "Task 1.1", desc: "กด Go to new default Region", errors: [] },
    { num: 10, task: "Task 1.1", desc: "กด AWS logo มุมซ้ายบนเพื่อกลับ console home page", errors: [] },
    { num: 11, task: "Task 1.1", desc: "ที่ Region selector มุมบนขวา เลือก Region ที่ตรงกับ LabRegion จากด้านซ้ายของ lab instructions", errors: [
      { problem: "ทำข้อถัดไปแล้ว resource หายหรือหาไม่เจอ", cause: "Region ไม่ตรงกับ LabRegion — resource ที่สร้างจะอยู่ใน region ที่เลือกตอนนั้น", fix: "ตรวจว่า Region selector มุมบนขวาตรงกับ LabRegion จากด้านซ้ายของ lab ตลอดการทำ lab" }
    ]},
    { num: 12, task: "Task 1.2", desc: "ที่ Search box ใน navigation bar พิมพ์ cloud เพื่อค้นหา", errors: [] },
    { num: 13, task: "Task 1.2", desc: "ดูผลการค้นหา — สามารถเลือก category ด้านซ้ายเพื่อ filter", errors: [] },
    { num: 14, task: "Task 1.2", desc: "ในส่วน Services ชี้เมาส์ไปที่ AWS Cloud Map แล้วกด link", errors: [] },
    { num: 15, task: "Task 1.2", desc: "กด AWS logo มุมซ้ายบนเพื่อกลับ console home page", errors: [] },
    { num: 16, task: "Task 1.3", desc: "ที่ navigation bar กด Services menu icon (⋮⋮⋮) เพื่อเปิด full list of services", errors: [] },
    { num: 17, task: "Task 1.3", desc: "จากเมนูด้านซ้าย เลือก All services หรือ Recently visited แล้วเลือก service ที่ต้องการ add เป็น favorite", errors: [] },
    { num: 18, task: "Task 1.3", desc: "กดดาว (star) ทางซ้ายของชื่อ service เพื่อเพิ่มเป็น Favorite", errors: [] },
    { num: 19, task: "Task 1.3", desc: "จากเมนูด้านซ้าย เลือก Favorites เพื่อดูรายการ favorite ที่เพิ่มไว้", errors: [] },
    { num: 20, task: "Task 1.3", desc: "กด Services menu icon (⋮⋮⋮) เพื่อเปิด full list of services อีกครั้ง", errors: [] },
    { num: 21, task: "Task 1.3", desc: "ใน Favorites list กด deselect ดาว (star) ที่ชื่อ service เพื่อลบออกจาก Favorites", errors: [] },
    { num: 22, task: "Task 1.4", desc: "ที่ navigation bar กด Services menu icon (⋮⋮⋮) เพื่อเปิด full list of services", errors: [] },
    { num: 23, task: "Task 1.4", desc: "เลือก service จาก Favorites, Recently visited หรือ All services เพื่อเปิด service console", errors: [] },
    { num: 24, task: "Task 1.4", desc: "กด AWS logo มุมซ้ายบนเพื่อกลับ console home page", errors: [] },
    { num: 25, task: "Task 1.5", desc: "กด + Add widgets เพื่อเพิ่ม widget", errors: [] },
    { num: 26, task: "Task 1.5", desc: "ในหน้า Add widgets ลาก widget ที่ต้องการไปวางบน console page", errors: [] },
    { num: 27, task: "Task 1.5", desc: "ลากลาก title bar ของ widget เพื่อย้ายตำแหน่ง", errors: [] },
    { num: 28, task: "Task 1.5", desc: "ลากมุมขวาล่างของ Recently Visited widget เพื่อ resize", errors: [] },
    { num: 29, task: "Task 1.5", desc: "ที่ Welcome to AWS widget กด ellipsis icon (สามจุด) มุมขวาบน → กด Remove widget", errors: [] },
    { num: 30, task: "Task 2", desc: "ที่ navigation bar กด Services menu icon (⋮⋮⋮) เพื่อเปิด full list of services", errors: [] },
    { num: 31, task: "Task 2", desc: "กด All Services แล้วเลื่อนลงเลือกหมวด Storage จากเมนูด้านซ้าย", errors: [] },
    { num: 32, task: "Task 2", desc: "จากรายการ Storage เลือก S3", errors: [
      { problem: "หา S3 ไม่เจอในลิสต์", cause: "อาจหาใน category ผิด", fix: "S3 อยู่ในหมวด Storage | หรือพิมพ์ S3 ใน search bar ที่ด้านบนของ console จะเร็วกว่า" }
    ]},
    { num: 33, task: "Task 2", desc: "ในเมนูด้านซ้าย เลือก General purpose buckets", errors: [] },
    { num: 34, task: "Task 2", desc: "กด Create bucket", errors: [] },
    { num: 35, task: "Task 2", desc: "ในส่วน General configuration ใส่ Bucket name เป็น labbucket-NUMBER (แทน NUMBER ด้วยตัวเลข random เช่น labbucket-987987)", errors: [
      { problem: "เจอ error 'Bucket name already exists' หรือ 'Bucket name is not available'", cause: "S3 bucket name ต้อง unique ทั่วโลก — ชื่อที่ใส่มีคนอื่นใช้แล้ว", fix: "เปลี่ยนตัวเลขหลัง labbucket- เป็นเลข random อื่น เช่น labbucket-123456 | ชื่อต้อง: ตัวเล็กทั้งหมด, ไม่มี space, ไม่มี underscore" },
      { problem: "เจอ error 'Bucket name invalid'", cause: "ชื่อ bucket มี uppercase, space, underscore หรือ special characters", fix: "ใช้ lowercase + ตัวเลข + ขีดกลาง (-) เท่านั้น | ห้ามมี space, underscore, uppercase, จุดนำหน้า/ตามหลัง" },
      { problem: "Region ไม่ตรงกับ LabRegion", cause: "Region selector ถูกเปลี่ยนระหว่างทำ Task 1", fix: "ตรวจ Region selector มุมบนขวาว่าตรงกับ LabRegion จากด้านซ้ายของ lab ก่อนกด Create" },
      { problem: "สร้าง bucket ไม่ได้ — ตั้งชื่ออะไรก็ไม่ผ่าน", cause: "ตั้งชื่อไม่ตรงกับรูปแบบที่ lab กำหนด — lab ตรวจชื่อ bucket ตอนให้คะแนน ต้องขึ้นต้นด้วย labbucket- เท่านั้น", fix: "ใช้รูปแบบ labbucket-NUMBER เช่น labbucket-987987 (ขีดกลาง ไม่ใช่ underscore) | ห้ามเปลี่ยนคำว่า labbucket เป็นอย่างอื่น เปลี่ยนได้แค่ตัวเลขท้าย" }
    ]},
    { num: 36, task: "Task 2", desc: "ปล่อย settings อื่นทั้งหมดเป็น default", errors: [] },
    { num: 37, task: "Task 2", desc: "กด Create bucket ที่ด้านล่างสุดของหน้า", errors: [
      { problem: "ไม่มี permission ในการสร้าง — กด Create bucket แล้วขึ้น AccessDenied / not authorized", cause: "Region ไม่ตรงกับที่ lab กำหนด — lab ให้ permission เฉพาะ Region ที่ระบุไว้เท่านั้น พอสร้างใน Region อื่นจึงถูกปฏิเสธ (เคสที่เจอบ่อยคือต้องเป็น Oregon / us-west-2)", fix: "เปลี่ยน Region selector มุมบนขวาให้ตรงกับที่ lab instruction ระบุ (ข้อ 11) แล้วกด Create ใหม่ | Region ที่ต้องใช้มีบอกไว้ใน instruction แล้ว ให้ผู้เรียนเปิดอ่านย้อนดู" },
      { problem: "Region ถูกแล้ว แต่ยังสร้าง bucket ไม่ได้", cause: "ชื่อ bucket ซ้ำกับคนอื่นในโลก — ไม่ใช่ปัญหา permission แล้ว | instruction ระบุไว้ว่าชื่อ bucket ของ S3 ต้องไม่ซ้ำกับใครทั้งโลก และต้องเป็นไปตามข้อกำหนดการตั้งชื่อของ DNS", fix: "เปลี่ยนตัวเลขท้ายชื่อเป็นเลขอื่น เช่น labbucket-451236 แล้วลองใหม่ | ไล่ลำดับตรวจ: Region ถูกไหม (ข้อ 11) → ถ้าถูก แปลว่าเป็นเรื่องชื่อซ้ำ ให้เปลี่ยนเลข" }
    ]},
    { num: 38, task: "Task 3", desc: "ดาวน์โหลดรูป HappyFace.jpg จาก link ใน lab instructions (คลิกขวา → Save image as)", errors: [
      { problem: "คลิกขวาแล้วไม่เห็น Save image หรือ save ได้เป็น format อื่น", cause: "แต่ละ browser มีวิธี save ต่างกัน", fix: "Chrome/Edge: คลิกขวา → Save image as | Firefox: คลิกขวา → Save Image As | ตั้งชื่อเป็น HappyFace.jpg" }
    ]},
    { num: 39, task: "Task 3", desc: "ใน Amazon S3 console กดชื่อ labbucket-xxxxx ที่สร้างไว้", errors: [] },
    { num: 40, task: "Task 3", desc: "กด Upload", errors: [] },
    { num: 41, task: "Task 3", desc: "กด Add files แล้วเลือก HappyFace.jpg ที่ดาวน์โหลดไว้", errors: [] },
    { num: 42, task: "Task 3", desc: "กด Upload", errors: [
      { problem: "Upload failed หรือ error", cause: "ไฟล์อาจใหญ่เกินไป หรือ permission ไม่พอ", fix: "ตรวจว่าไฟล์เป็น .jpg ขนาดปกติ | ตรวจว่า Region ถูกต้อง (ข้อ 11) | ลอง refresh หน้าแล้ว upload ใหม่" }
    ]},
    { num: 43, task: "Task 3", desc: "เห็นข้อความ Upload succeeded แล้วกด Close", errors: [] },
    { num: 44, task: "Task 4.1", desc: "ค้นหา EC2 ใน search bar ของ console", errors: [] },
    { num: 45, task: "Task 4.1", desc: "ที่เมนูด้านซ้าย เลือก Instances", errors: [] },
    { num: 46, task: "Task 4.1", desc: "เลือก (ติ๊ก) Command Host instance", errors: [
      { problem: "ไม่เห็น Command Host instance ในลิสต์", cause: "Lab provisioning ยังไม่เสร็จ หรือ Region ผิด", fix: "ตรวจ Region ว่าตรงกับ LabRegion | รอ 1-2 นาทีแล้ว refresh | ตรวจว่า instance state เป็น Running" }
    ]},
    { num: 47, task: "Task 4.1", desc: "กด Connect", errors: [] },
    { num: 48, task: "Task 4.1", desc: "เลือก tab SSM Session Manager", errors: [] },
    { num: 49, task: "Task 4.1", desc: "กด Connect เพื่อเปิด terminal", errors: [
      { problem: "ปุ่ม Connect เป็นสีเทากดไม่ได้", cause: "Instance ยังไม่พร้อม หรือ SSM Agent ยังไม่ register — Command Host เป็น instance ที่ lab เตรียมมาให้ ถ้าเพิ่ง Start Lab ก็ยังไม่พร้อม", fix: "รอ 2-3 นาทีหลัง instance state เป็น Running แล้ว refresh + กด Connect ใหม่ | ตรวจว่า Status check ขึ้นครบทุกข้อแล้ว (console จะแสดงจำนวนเอง)" },
      { problem: "Connect ได้แต่ terminal ว่างเปล่าหรือค้าง", cause: "Session ยังกำลังเชื่อมต่อ", fix: "รอ 10-15 วินาที terminal จะ ready | ถ้าค้างนานเกิน 30 วินาที ให้ปิด tab แล้วกด Connect ใหม่" },
      { problem: "terminal เข้าไม่ได้ / หา terminal ไม่เจอ", cause: "เปิดผิดที่ — ไปหา terminal ในหน้า lab (account lab) แทนที่จะเปิดจาก EC2 console", fix: "terminal ของ lab นี้อยู่ใน EC2 console เท่านั้น: ค้นหา EC2 (ข้อ 44) → Instances (ข้อ 45) → ติ๊ก Command Host (ข้อ 46) → Connect (ข้อ 47) → tab SSM Session Manager (ข้อ 48) → Connect | ไม่ใช่ terminal หรือปุ่มใดๆ ในหน้า lab" },
      { problem: "กด Connect ใน console แล้วไม่ขึ้น หรือ error ซ้ำๆ ไม่ยอมเข้า", cause: "ปัญหาที่ตัวปุ่ม Connect หรือ session ของ browser — ไม่ใช่ที่ instance | lab เตรียมทางสำรองไว้ให้แล้วแต่คนมักไม่รู้", fix: "ใช้ทางสำรองที่ lab ให้มา: copy ค่า CommandHostSessionUrl จากแผงด้านซ้ายของหน้า lab instruction → วางใน browser tab ใหม่ → terminal ของ Command Host เปิดขึ้นตรงๆ ไม่ต้องผ่านหน้า console เลย\nวิธีนี้ข้ามปัญหาปุ่ม Connect ไปได้ทั้งหมด เหมาะเวลารีบหรือมีผู้เรียนติดพร้อมกันหลายคน" }
    ]},
    { num: 50, task: "Task 4.2", desc: "พิมพ์คำสั่ง aws s3 ls แล้วกด Enter เพื่อดู list ของ buckets", errors: [
      { problem: "เจอ error 'Unable to locate credentials'", cause: "IAM role ของ Command Host instance ไม่ถูกต้อง หรือ instance profile ไม่ได้ attach", fix: "ไม่ควรเจอ error นี้ใน lab — ถ้าเจอลอง: ปิด Session Manager → กลับมากด Connect ใหม่ | หรือ Stop Lab → Start Lab ใหม่" },
      { problem: "เจอ error 'command not found: aws'", cause: "พิมพ์คำสั่งผิด หรือ AWS CLI ไม่ได้ถูก install", fix: "ตรวจว่าพิมพ์ aws (ตัวเล็ก) ถูกต้อง | Command Host ควรมี AWS CLI install ไว้แล้ว ถ้าไม่มีอาจ connect ผิด instance" }
    ]},
    { num: 51, task: "Task 4.2", desc: "เห็น list ของ buckets ที่สร้างไว้ (รวม labbucket-xxxxx)", errors: [] },
    { num: 52, task: "Task 4.2", desc: "พิมพ์คำสั่ง aws s3 mb s3://labclibucket-NUMBER (แทน NUMBER ด้วยตัวเลข random) แล้วกด Enter", errors: [
      { problem: "เจอ error 'BucketAlreadyExists'", cause: "ชื่อ bucket ซ้ำกับที่มีอยู่แล้ว", fix: "เปลี่ยนตัวเลขหลัง labclibucket- เป็นเลข random อื่น แล้ว run คำสั่งใหม่" },
      { problem: "เจอ error 'InvalidBucketName'", cause: "ชื่อ bucket มี uppercase หรืออักษรไม่ valid", fix: "ชื่อต้อง: ตัวเล็กทั้งหมด + ตัวเลข + ขีดกลาง | ห้ามมี space, uppercase, underscore" },
      { problem: "เจอ error 'Access Denied'", cause: "IAM permissions ของ Command Host ไม่เพียงพอ", fix: "ไม่ควรเจอใน lab — ลอง Stop Lab → Start Lab ใหม่" }
    ]},
    { num: 53, task: "Task 4.2", desc: "เห็นข้อความ make_bucket: labclibucket-xxxxx", errors: [] },
    { num: 54, task: "Task 4.2", desc: "พิมพ์คำสั่ง aws s3 ls เพื่อตรวจว่าเห็น bucket ใหม่ในลิสต์", errors: [] },
    { num: 55, task: "Task 4.2", desc: "พิมพ์คำสั่ง aws s3 cp /home/ssm-user/HappyFace.jpg s3://labclibucket-NUMBER แล้วกด Enter", errors: [
      { problem: "เจอ error 'No such file or directory'", cause: "ไฟล์ HappyFace.jpg ไม่อยู่ที่ path /home/ssm-user/ หรือชื่อไฟล์ผิด", fix: "ลอง ls /home/ssm-user/ เพื่อดูว่ามีไฟล์อะไรอยู่ | ถ้าไม่เห็น HappyFace.jpg แสดงว่า lab ยังไม่ได้วางไฟล์ไว้ → ลอง Stop Lab → Start Lab ใหม่" },
      { problem: "เจอ error 'NoSuchBucket'", cause: "ชื่อ bucket ในคำสั่งไม่ตรงกับที่สร้างไว้ (ข้อ 52)", fix: "ตรวจว่าชื่อ bucket ในคำสั่ง cp ตรงกับชื่อที่ใช้ตอน mb ทุกตัวอักษร (ลอง aws s3 ls ดูชื่อจริง)" },
      { problem: "ผู้เรียนถาม: เปิดดูรูป HappyFace.jpg ที่อยู่ใน instance ผ่าน console ได้ไหม?", cause: "ไม่ใช่ error — เป็นคำถามที่เจอบ่อย ผู้เรียนอยากเห็นรูปเพื่อยืนยันว่าไฟล์อยู่จริง", fix: "ตอบว่าไม่ได้ — instance เป็น Linux ที่ไม่มีหน้าจอ (ไม่มี GUI) ดูรูปตรงๆ ไม่ได้ ทำได้แค่ตรวจผ่าน CLI ว่าไฟล์มีอยู่จริง | ใช้ ls -l /home/ssm-user/ เพื่อดูว่ามีไฟล์และขนาดเท่าไหร่ | ถ้าอยากเห็นรูปจริงๆ ให้ไปเปิดใน S3 console หลัง upload เสร็จ (ข้อ 57)" },
      { problem: "คำสั่งไม่ทำงาน / ไม่มี output", cause: "อาจพิมพ์คำสั่งไม่ครบ หรือ copy มาแล้วมี hidden characters", fix: "ลอง clear terminal แล้วพิมพ์คำสั่งใหม่ทีละตัว | หรือ copy คำสั่งจาก lab page โดยกดไอคอน copy" }
    ]},
    { num: 56, task: "Task 4.2", desc: "เห็นข้อความ upload: ... to s3://labclibucket-xxxxx/HappyFace.jpg", errors: [] },
    { num: 57, task: "Task 4.2", desc: "พิมพ์คำสั่ง aws s3 ls s3://labclibucket-NUMBER เพื่อดู object ที่ upload ไป", errors: [
      { problem: "ไม่เห็น object ในลิสต์ (output ว่าง)", cause: "Upload ข้อ 55 ไม่สำเร็จ หรือชื่อ bucket ผิด", fix: "ตรวจว่าข้อ 55 แสดง upload success | ตรวจชื่อ bucket ในคำสั่งว่าตรงกับที่สร้างจริง" }
    ]},
    { num: 58, task: "Task 4.2", desc: "เห็น HappyFace.jpg ในลิสต์ → lab สำเร็จ", errors: [] },
    { num: 59, task: "End Lab", desc: "กลับไปที่ AWS Management Console", errors: [] },
    { num: 60, task: "End Lab", desc: "ที่มุมบนขวา กด AWSLabsUser แล้วกด Sign out", errors: [] },
    { num: 61, task: "End Lab", desc: "กด End Lab แล้ว confirm เพื่อจบ lab", errors: [] },
    { num: 62, task: "End Lab", desc: "ปิด browser tab ของ Session Manager ที่เปิดไว้", errors: [] }
  ]
};
