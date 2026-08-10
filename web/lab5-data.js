const lab5Data = {
  title: "Lab 5 - Build a Serverless Architecture",
  region: "us-east-2",
  steps: [
    { num: 1, task: "Start Lab", desc: "กด Start Lab ที่หน้า lab", errors: [] },
    { num: 2, task: "Start Lab", desc: "กด Open Console เพื่อเปิด AWS Management Console", errors: [
      { problem: "เจอหน้า 'You must first sign out'", cause: "Browser มี session ของ AWS account อื่นค้างอยู่", fix: "กด 'click here' เพื่อ logout → ปิด tab → กลับ lab page → กด Open Console ใหม่ | หรือใช้ Incognito" }
    ]},
    { num: 3, task: "Task 1", desc: "ค้นหา Simple Notification Service ใน search bar", errors: [
      { problem: "พิมพ์ SNS ใน search แล้วเห็นหลาย service (Simple Notification Service กับ Simple Queue Service)", cause: "ชื่อย่อคล้ายกัน — SNS vs SQS", fix: "เลือก Simple Notification Service (SNS) ไม่ใช่ Simple Queue Service (SQS) | หรือพิมพ์ Notification เต็มๆ" },
      { problem: "Region ผิด — lab นี้ใช้ us-east-2 (Ohio)", cause: "Region ไม่ตรง ทำให้ resources สร้างผิดที่ → SNS/SQS/Lambda จะหากันไม่เจอข้าม region", fix: "เช็ค Region มุมบนขวา ต้องเป็น US East (Ohio) us-east-2 ตลอดทั้ง lab" }
    ]},
    { num: 4, task: "Task 1", desc: "Expand เมนูด้านซ้ายด้วยไอคอน ≡ แล้วเลือก Topics", errors: [] },
    { num: 5, task: "Task 1", desc: "กด Topics จากเมนูด้านซ้าย", errors: [] },
    { num: 6, task: "Task 1", desc: "กด Create topic", errors: [] },
    { num: 7, task: "Task 1", desc: "ในส่วน Details ตั้งค่า: Type=Standard, Name=resize-image-topic (ต่อด้วยเลข unique เช่น resize-image-topic-1234)", errors: [
      { problem: "เจอ error 'Topic name already exists'", cause: "ชื่อ topic ซ้ำกับที่มีอยู่แล้วใน account/region", fix: "เปลี่ยนชื่อให้ unique เช่น resize-image-topic-1234 (เพิ่มตัวเลขต่อท้าย)" },
      { problem: "Lab ไม่ทำงานถูกต้องหลังจากสร้าง topic", cause: "เลือก Type เป็น FIFO แทน Standard", fix: "ต้องเลือก Type=Standard เท่านั้น! FIFO จะทำให้ lab ไม่สำเร็จ → ลบ topic แล้วสร้างใหม่เลือก Standard" }
    ]},
    { num: 8, task: "Task 1", desc: "กด Create topic จะเห็น success", errors: [] },
    { num: 9, task: "Task 1", desc: "Copy ค่า ARN และ Topic owner (12-digit Account ID) เก็บไว้ใน notepad (จะใช้ภายหลัง)", errors: [
      { problem: "ลืม copy ARN หรือ Topic owner", cause: "ค่านี้จำเป็นสำหรับข้อ 49-50 (SNS access policy)", fix: "กลับมาที่ SNS → Topics → กดชื่อ topic → ดู ARN และ Owner ได้ที่ Details section" }
    ]},
    { num: 10, task: "Task 2.1", desc: "ค้นหา Simple Queue Service ใน search bar", errors: [] },
    { num: 11, task: "Task 2.1", desc: "กด Create queue", errors: [] },
    { num: 12, task: "Task 2.1", desc: "ในส่วน Details ตั้ง: Type=Standard, Name=thumbnail-queue", errors: [
      { problem: "เลือก Type เป็น FIFO แทน Standard", cause: "FIFO queue จะไม่ทำงานกับ SNS Standard topic ที่สร้างไว้", fix: "ต้องเลือก Standard เท่านั้น — ลบ queue แล้วสร้างใหม่เป็น Standard" },
      { problem: "ชื่อ queue พิมพ์ผิด", cause: "Lambda trigger ข้อ 67 ต้อง match ชื่อ queue ตรงตัว", fix: "ชื่อต้องเป็น thumbnail-queue (ขีดกลาง ไม่ใช่ underscore ไม่ใช่ space)" }
    ]},
    { num: 13, task: "Task 2.1", desc: "ปล่อย Configuration parameters เป็นค่า default", errors: [] },
    { num: 14, task: "Task 2.1", desc: "กด Create queue จะเห็น success", errors: [
      { problem: "เจอ error 'Queue name already exists'", cause: "มีคนอื่นใน account เดียวกันสร้าง queue ชื่อนี้ไว้แล้ว (ถ้าใช้ shared account)", fix: "เพิ่มตัวเลขต่อท้ายชื่อ เช่น thumbnail-queue-01 แต่ต้องจำชื่อนี้ให้ตรงตอนตั้ง Lambda trigger" }
    ]},
    { num: 15, task: "Task 2.1", desc: "ที่ queue detail page เลือก tab SNS subscriptions", errors: [] },
    { num: 16, task: "Task 2.1", desc: "กด Subscribe to Amazon SNS topic", errors: [] },
    { num: 17, task: "Task 2.1", desc: "ในหน้า Subscribe เลือก resize-image-topic ที่สร้างไว้ จาก dropdown (หรือ paste ARN ถ้าไม่เห็นใน list)", errors: [
      { problem: "ไม่เห็น resize-image-topic ใน dropdown", cause: "Topic อยู่คนละ region กับ queue หรือชื่อผิด", fix: "เลือก Enter Amazon SNS topic ARN แล้ว paste ARN ที่ copy ไว้จากข้อ 9 | ตรวจว่า Region ไม่ได้เปลี่ยน" }
    ]},
    { num: 18, task: "Task 2.1", desc: "กด Save", errors: [
      { problem: "กด Save แล้วเจอ error หรือ subscription ไม่ขึ้นใน list", cause: "อาจเลือก topic ผิดตัว หรือ SQS queue ไม่มี permission รับ message จาก SNS", fix: "ตรวจว่าเลือก resize-image-topic ถูกตัว | ถ้า error เรื่อง permission ให้ทำ Task 3.1 (ข้อ 42-51) ก่อนแล้วกลับมา subscribe ใหม่" },
      { problem: "Save สำเร็จแต่ Subscription status เป็น 'Pending confirmation'", cause: "ปกติ SQS subscription กับ SNS ใน account เดียวกันจะ auto-confirm ทันที — ถ้าเป็น Pending อาจเลือก topic ผิดหรือ cross-account", fix: "ตรวจว่า SNS topic และ SQS queue อยู่ใน account/region เดียวกัน | ลอง delete subscription แล้ว subscribe ใหม่" }
    ]},
    { num: 19, task: "Task 2.2", desc: "ที่ SQS console เมนูด้านซ้าย เลือก Queues", errors: [] },
    { num: 20, task: "Task 2.2", desc: "กด Create queue", errors: [] },
    { num: 21, task: "Task 2.2", desc: "ในส่วน Details ตั้ง: Type=Standard, Name=mobile-queue", errors: [
      { problem: "เลือก Type เป็น FIFO แทน Standard", cause: "เหมือนข้อ 12 — FIFO ไม่ทำงานกับ SNS Standard topic", fix: "ต้องเลือก Standard — ลบ queue สร้างใหม่" },
      { problem: "ชื่อ queue พิมพ์ผิด", cause: "Lambda trigger ข้อ 92 ต้อง match ชื่อ mobile-queue ตรงตัว", fix: "ชื่อต้องเป็น mobile-queue (ขีดกลาง ตัวเล็กทั้งหมด)" }
    ]},
    { num: 22, task: "Task 2.2", desc: "ปล่อย Configuration parameters เป็นค่า default", errors: [] },
    { num: 23, task: "Task 2.2", desc: "กด Create queue จะเห็น success", errors: [] },
    { num: 24, task: "Task 2.2", desc: "ที่ queue detail page เลือก tab SNS subscriptions", errors: [] },
    { num: 25, task: "Task 2.2", desc: "กด Subscribe to Amazon SNS topic", errors: [] },
    { num: 26, task: "Task 2.2", desc: "เลือก resize-image-topic จาก dropdown (หรือ paste ARN)", errors: [
      { problem: "ไม่เห็น topic ใน dropdown", cause: "เหมือนข้อ 17 — topic อยู่คนละ region", fix: "เลือก Enter Amazon SNS topic ARN แล้ว paste ARN ที่ copy ไว้จากข้อ 9" }
    ]},
    { num: 27, task: "Task 2.2", desc: "กด Save", errors: [
      { problem: "Subscribe สำเร็จแต่ตอน test publish (ข้อ 35-40) mobile-queue ไม่ได้รับ message", cause: "อาจกด Save ไม่สำเร็จจริง (หน้า redirect กลับโดยไม่มี confirmation) หรือ subscribe ผิด topic", fix: "ไปที่ SQS → mobile-queue → tab SNS subscriptions → ตรวจว่ามี resize-image-topic อยู่ในลิสต์ | ถ้าไม่มี ให้ Subscribe ใหม่" }
    ]},
    { num: 28, task: "Task 2.3", desc: "ค้นหา Simple Notification Service ใน search bar", errors: [] },
    { num: 29, task: "Task 2.3", desc: "ที่เมนูด้านซ้าย เลือก Topics", errors: [] },
    { num: 30, task: "Task 2.3", desc: "กดชื่อ resize-image-topic", errors: [] },
    { num: 31, task: "Task 2.3", desc: "กด Publish message", errors: [] },
    { num: 32, task: "Task 2.3", desc: "ในส่วน Message details ใส่ Subject=Hello world", errors: [] },
    { num: 33, task: "Task 2.3", desc: "ในส่วน Message body เลือก Identical payload for all delivery protocols แล้วใส่ข้อความ เช่น Testing Hello world", errors: [] },
    { num: 34, task: "Task 2.3", desc: "ในส่วน Message attributes ตั้ง: Type=String, Name=Message, Value=Hello World", errors: [
      { problem: "ลืมใส่ Message attributes แล้วกด Publish ไปเลย", cause: "ไม่เป็นไร — message จะยัง publish ได้ แต่ attributes จะว่าง ซึ่งไม่กระทบ lab ที่เหลือ", fix: "ข้อนี้แค่ test ไม่กระทบ flow หลัก ข้ามได้" }
    ]},
    { num: 35, task: "Task 2.3", desc: "กด Publish message", errors: [
      { problem: "Publish สำเร็จแต่ queue ไม่ได้รับ message (ข้อ 40 poll ไม่เจออะไร)", cause: "Queue ไม่ได้ subscribe กับ topic จริงๆ — อาจลืมกด Save ตอนข้อ 18 หรือ 27", fix: "ไปที่ SQS → เลือก queue → tab SNS subscriptions → ตรวจว่ามี subscription อยู่ | ถ้าไม่มีให้ Subscribe ใหม่" }
    ]},
    { num: 36, task: "Task 2.3", desc: "ค้นหา Simple Queue Service ใน search bar", errors: [] },
    { num: 37, task: "Task 2.3", desc: "เลือก queue ไหนก็ได้ (thumbnail-queue หรือ mobile-queue)", errors: [] },
    { num: 38, task: "Task 2.3", desc: "กด Send and receive messages", errors: [] },
    { num: 39, task: "Task 2.3", desc: "ในส่วน Receive messages กด Poll for messages", errors: [] },
    { num: 40, task: "Task 2.3", desc: "กด ID link ของ message ที่ปรากฏ ตรวจดู Details, Body, Attributes", errors: [
      { problem: "กด Poll for messages แล้วไม่เห็น message", cause: "SNS subscription ไม่ถูกต้อง หรือ message ยังไม่ deliver", fix: "เช็ค: queue subscribe กับ SNS topic ถูกต้อง? (ข้อ 17, 26) | ลอง Poll อีกครั้ง | กลับไป SNS publish message ใหม่" }
    ]},
    { num: 41, task: "Task 2.3", desc: "กด Done", errors: [] },
    { num: 42, task: "Task 3.1", desc: "ค้นหา Simple Notification Service ใน search bar", errors: [] },
    { num: 43, task: "Task 3.1", desc: "ที่เมนูด้านซ้าย เลือก Topics", errors: [] },
    { num: 44, task: "Task 3.1", desc: "กดชื่อ resize-image-topic", errors: [] },
    { num: 45, task: "Task 3.1", desc: "กด Edit", errors: [] },
    { num: 46, task: "Task 3.1", desc: "ไปที่ส่วน Access policy - optional แล้ว expand", errors: [] },
    { num: 47, task: "Task 3.1", desc: "ลบ content เดิมทั้งหมดใน JSON editor", errors: [
      { problem: "ลบไม่หมด มี content เดิมเหลือปนกับ JSON ใหม่", cause: "ไม่ได้ Select All ก่อน delete ทำให้ JSON ผิด format", fix: "กด Ctrl+A (เลือกทั้งหมด) → Delete → แล้วค่อย paste JSON ใหม่" }
    ]},
    { num: 48, task: "Task 3.1", desc: "Copy JSON policy จาก lab instruction แล้ว paste ลงใน JSON editor", errors: [
      { problem: "กด Save changes แล้วเจอ error 'Invalid policy'", cause: "JSON format ผิด — อาจ copy มาไม่ครบ หรือ paste ทับ content เดิมไม่หมด", fix: "ลบ content ใน editor ให้เกลี้ยงก่อน (Ctrl+A → Delete) แล้ว paste JSON ใหม่ทั้งก้อน | ตรวจว่าไม่มี content เดิมปนอยู่" }
    ]},
    { num: 49, task: "Task 3.1", desc: "ใน JSON ที่ paste มา เปลี่ยน SNS_TOPIC_OWNER ทั้ง 2 จุดเป็น Topic owner (12-digit Account ID) ที่ copy ไว้จากข้อ 9", errors: [
      { problem: "กด Save แล้ว error หรือ S3 event notification ไม่ทำงาน", cause: "ไม่ได้เปลี่ยน SNS_TOPIC_OWNER เป็น Account ID จริง หรือเปลี่ยนไม่ครบ 2 จุด หรือลบ double quotes ออก", fix: "ตรวจว่า:\n1. เปลี่ยน SNS_TOPIC_OWNER ครบ 2 ตำแหน่ง\n2. ค่าเป็น 12-digit Account ID (ตัวเลขล้วน)\n3. ยังมี double quotes ครอบค่าอยู่ เช่น \"123456789012\"" }
    ]},
    { num: 50, task: "Task 3.1", desc: "ใน JSON เปลี่ยน SNS_TOPIC_ARN ทั้ง 2 จุดเป็น ARN ของ topic ที่ copy ไว้จากข้อ 9", errors: [
      { problem: "เปลี่ยน ARN แล้ว error", cause: "ARN format ผิด หรือเปลี่ยนไม่ครบ 2 จุด หรือลบ double quotes", fix: "ARN ต้องอยู่ในรูป arn:aws:sns:REGION:ACCOUNT:TOPIC_NAME | ตรวจว่ายังมี double quotes ครอบอยู่ | เปลี่ยนครบ 2 ตำแหน่ง" }
    ]},
    { num: 51, task: "Task 3.1", desc: "กด Save changes", errors: [
      { problem: "เจอ error 'Invalid parameter: Policy' ตอนกด Save", cause: "JSON syntax ผิด — อาจลืม comma, bracket, หรือ double quotes", fix: "Copy JSON จาก lab ใหม่ทั้งก้อน → paste ทับ → เปลี่ยน SNS_TOPIC_OWNER + SNS_TOPIC_ARN ใหม่อย่างระวัง" }
    ]},
    { num: 52, task: "Task 3.2", desc: "ค้นหา S3 ใน search bar", errors: [] },
    { num: 53, task: "Task 3.2", desc: "กดชื่อ bucket ที่มีชื่อคล้าย xxxxx-labbucket-xxxxx", errors: [] },
    { num: 54, task: "Task 3.2", desc: "เลือก tab Properties", errors: [] },
    { num: 55, task: "Task 3.2", desc: "Scroll ลงไปหาส่วน Event notifications", errors: [] },
    { num: 56, task: "Task 3.2", desc: "กด Create event notification", errors: [] },
    { num: 57, task: "Task 3.2", desc: "ในส่วน General configuration ตั้ง: Event name=resize-image-event, Prefix=ingest/, Suffix=.jpg", errors: [
      { problem: "Event notification ไม่ trigger เมื่อ upload file", cause: "Prefix หรือ Suffix ผิด — ต้องใส่ ingest/ (มี slash) และ .jpg (มีจุด)", fix: "Prefix ต้องเป็น ingest/ (ไม่ใช่ ingest) | Suffix ต้องเป็น .jpg (ไม่ใช่ jpg หรือ .jpeg)" },
      { problem: "ใส่ Prefix เป็น ingest (ไม่มี /) ทำให้ match ไฟล์ชื่อ ingestXXX.jpg แทน", cause: "Prefix filter ทำงานแบบ string matching — ingest/ จะ match เฉพาะไฟล์ใน folder ingest/ แต่ ingest จะ match ทุกอย่างที่ขึ้นต้นด้วย ingest", fix: "แก้ Prefix เป็น ingest/ (ต้องมี trailing slash)" },
      { problem: "ใส่ Suffix เป็น .jpeg แทน .jpg", cause: "Lab ใช้ไฟล์ .jpg — ถ้า suffix ตั้งเป็น .jpeg จะไม่ match กับไฟล์ .jpg ที่ upload", fix: "Suffix ต้องเป็น .jpg (3 ตัวอักษร) ไม่ใช่ .jpeg (4 ตัวอักษร)" }
    ]},
    { num: 58, task: "Task 3.2", desc: "ในส่วน Event types ติ๊ก All object create events", errors: [
      { problem: "ลืมติ๊ก Event types หรือเลือกผิด type", cause: "ถ้าไม่ติ๊ก All object create events → S3 จะไม่ส่ง notification เมื่อ upload file", fix: "ต้องติ๊ก All object create events (s3:ObjectCreated:*) — ไม่ใช่ delete หรือ restore" }
    ]},
    { num: 59, task: "Task 3.2", desc: "ในส่วน Destination ตั้ง: Destination=SNS topic, Specify SNS topic=Choose from your SNS topics, เลือก resize-image-topic", errors: [
      { problem: "เจอ error 'Unable to validate the following destination configurations' ตอน Save", cause: "SNS access policy ไม่ถูกต้อง — S3 ไม่มี permission publish ไปที่ SNS topic", fix: "ย้อนไปข้อ 48-51 ตรวจว่า SNS access policy JSON ถูกต้อง: SNS_TOPIC_OWNER และ SNS_TOPIC_ARN เปลี่ยนครบ + Principal มี s3.amazonaws.com" }
    ]},
    { num: 60, task: "Task 3.2", desc: "กด Save changes", errors: [
      { problem: "เจอ error 'Unable to validate the following destination configurations' (เหมือนข้อ 59)", cause: "SNS topic access policy ยังไม่ถูกต้อง — S3 ไม่มี permission publish ไปที่ SNS topic", fix: "ย้อนไปข้อ 45-51 ตรวจว่า SNS access policy ถูกต้อง | ต้องเปลี่ยน SNS_TOPIC_OWNER (ข้อ 49) + SNS_TOPIC_ARN (ข้อ 50) ให้ครบก่อน" },
      { problem: "Save สำเร็จ แต่ upload file แล้วไม่มีอะไรเกิดขึ้น", cause: "Event notification สร้างสำเร็จ แต่ downstream (SNS → SQS → Lambda) อาจยังไม่ setup ครบ", fix: "ทำ step ถัดไป (Task 4) ให้เสร็จก่อน แล้วค่อย test — ต้องมี Lambda function + SQS trigger ครบถึงจะทำงานได้" }
    ]},
    { num: 61, task: "Task 4.1", desc: "ค้นหา Lambda ใน search bar", errors: [] },
    { num: 62, task: "Task 4.1", desc: "กด Create function", errors: [] },
    { num: 63, task: "Task 4.1", desc: "เลือก Author from scratch", errors: [] },
    { num: 64, task: "Task 4.1", desc: "ตั้งค่า: Function name=CreateThumbnail, Runtime=Python 3.12, Expand Additional settings → เปิด Custom execution role toggle → เลือก Execution role ที่ชื่อคล้าย XXXXX-LabExecutionRole-XXXXX → กด Save", errors: [
      { problem: "ไม่เห็น LabExecutionRole ใน dropdown", cause: "ไม่ได้ expand Additional settings หรือ ไม่ได้เปิด Custom execution role toggle", fix: "ต้อง Expand Additional settings ก่อน → เปิด toggle Custom execution role → เลือก Execution role → จะเห็น XXXXX-LabExecutionRole-XXXXX" },
      { problem: "เลือก Runtime ผิด (ไม่ใช่ Python 3.12)", cause: "Code ใน lab เขียนสำหรับ Python 3.12 โดยเฉพาะ ถ้าเลือก version อื่นอาจ error", fix: "เลือก Python 3.12 ใต้ Other supported runtimes (ไม่ใช่ Python 3.13 หรือ version อื่น)" }
    ]},
    { num: 65, task: "Task 4.1", desc: "กด Create function", errors: [
      { problem: "เจอ error 'Function already exists with name CreateThumbnail'", cause: "มี function ชื่อนี้อยู่แล้ว (อาจสร้างซ้ำ)", fix: "ถ้าสร้างไปแล้ว ไม่ต้องสร้างใหม่ — ไปที่ Lambda → Functions → กดชื่อ CreateThumbnail แล้วทำต่อข้อ 66" },
      { problem: "เจอ error 'Role does not exist' หรือ permission error", cause: "ไม่ได้เลือก LabExecutionRole ที่ข้อ 64 (อาจใช้ default role ซึ่ง lab ไม่มี permission สร้าง)", fix: "ย้อนข้อ 64: Expand Additional settings → เปิด Custom execution role → เลือก XXXXX-LabExecutionRole-XXXXX" }
    ]},
    { num: 66, task: "Task 4.1", desc: "ถ้าเห็น Getting started pop-up กด Dismiss", errors: [] },
    { num: 67, task: "Task 4.2", desc: "กด + Add trigger ตั้งค่า: Source=SQS, SQS Queue=thumbnail-queue, Batch size=1", errors: [
      { problem: "ไม่เห็น thumbnail-queue ใน SQS dropdown", cause: "Queue อยู่คนละ region หรือชื่อผิด", fix: "ตรวจว่า Region ไม่ได้เปลี่ยน | ตรวจว่าสร้าง queue ชื่อ thumbnail-queue สำเร็จ (ข้อ 12-14)" },
      { problem: "เลือกผิด queue (เลือก mobile-queue แทน thumbnail-queue)", cause: "CreateThumbnail function ต้อง trigger จาก thumbnail-queue | CreateMobileImage ต้อง trigger จาก mobile-queue — สลับกัน lab จะผิด", fix: "ต้อง match: CreateThumbnail ← thumbnail-queue | CreateMobileImage ← mobile-queue | ถ้าเลือกผิด → ลบ trigger แล้ว Add ใหม่ถูก queue" },
      { problem: "ลืมตั้ง Batch size=1 (ปล่อยเป็นค่า default 10)", cause: "Batch size=10 จะทำให้ Lambda รอ messages ครบ 10 ก่อน invoke ทำให้ช้า — สำหรับ demo ใช้ 1 จะเห็นผลทันที", fix: "แก้ Batch size: Lambda → Configuration → Triggers → เลือก SQS trigger → Edit → Batch size=1" }
    ]},
    { num: 68, task: "Task 4.2", desc: "Scroll ลงล่างสุดแล้วกด Add", errors: [
      { problem: "เจอ error ตอนกด Add trigger", cause: "Lambda function ไม่มี permission access SQS queue (role ผิด)", fix: "ตรวจว่าข้อ 64 เลือก LabExecutionRole ถูกต้อง — ถ้าใช้ default role จะไม่มี SQS permission" }
    ]},
    { num: 69, task: "Task 4.2", desc: "เลือก tab Code", errors: [] },
    { num: 70, task: "Task 4.2", desc: "ดู settings (ignore settings ที่ไม่ได้ list)", errors: [] },
    { num: 71, task: "Task 4.2", desc: "Copy ค่า CreateThumbnailZIPLocation จากด้านซ้ายของ lab instructions", errors: [] },
    { num: 72, task: "Task 4.2", desc: "กด Upload from → เลือก Amazon S3 location (Update from a file in Amazon S3)", errors: [
      { problem: "ไม่เห็น 'Upload from' button หรือไม่เห็น option Amazon S3 location", cause: "อาจอยู่ผิดหน้า (ต้องอยู่ที่ Code tab) หรือ console UI เปลี่ยน", fix: "ตรวจว่าอยู่ที่ tab Code ของ Lambda function → กดปุ่ม Upload from (หรือ Update ▼) → เลือก Amazon S3 location" }
    ]},
    { num: 73, task: "Task 4.2", desc: "Paste ค่า CreateThumbnailZIPLocation ลงในช่อง Amazon S3 link URL", errors: [
      { problem: "เจอ error 'The file could not be found' หรือ 'Access Denied'", cause: "Copy URL มาไม่ครบ หรือมี space ติดหน้า/หลัง", fix: "กลับไป copy CreateThumbnailZIPLocation จากด้านซ้ายของ lab ใหม่ (double-click เลือกทั้งหมด) → paste ใหม่ ตรวจว่าไม่มี space" },
      { problem: "Copy URL ของ CreateMobileImage มาใส่แทน CreateThumbnail (สลับกัน)", cause: "Lab ด้านซ้ายมี 2 URLs — CreateThumbnailZIPLocation กับ CreateMobileImageZIPLocation ต้องใช้ให้ถูกตัว", fix: "ข้อนี้ต้องใช้ CreateThumbnailZIPLocation (สำหรับ CreateThumbnail function) | ข้อ 100 ถึงจะใช้ CreateMobileImageZIPLocation" }
    ]},
    { num: 74, task: "Task 4.2", desc: "กด Save (Update)", errors: [] },
    { num: 75, task: "Task 4.2", desc: "ดู code ที่ upload มา (ไม่ต้องแก้ไข)", errors: [] },
    { num: 76, task: "Task 4.2", desc: "ที่ Runtime settings กด Edit → ใส่ Handler=CreateThumbnail.handler → กด Save", errors: [
      { problem: "Lambda function ไม่ทำงาน (error 'Unable to import module' หรือ 'Handler not found')", cause: "Handler ใส่ผิด — ต้องเป็น CreateThumbnail.handler (ชื่อไฟล์.ชื่อ function)", fix: "ไปที่ Runtime settings → Edit → Handler=CreateThumbnail.handler (ตรงตัว case sensitive)" },
      { problem: "ใส่ Handler เป็น createthumbnail.handler (ตัวเล็กทั้งหมด)", cause: "Handler name เป็น case sensitive — ต้องตรงกับชื่อไฟล์ .py ที่ upload มา ซึ่งชื่อ CreateThumbnail.py", fix: "Handler ต้องเป็น CreateThumbnail.handler (C ตัวใหญ่, T ตัวใหญ่) — match กับชื่อไฟล์ CreateThumbnail.py" },
      { problem: "ใส่ Handler เป็น CreateThumbnail.lambda_handler (เพิ่ม lambda_ ข้างหน้า)", cause: "หลาย Lambda tutorial ใช้ lambda_handler แต่ code ของ lab นี้ใช้แค่ handler", fix: "ใส่ CreateThumbnail.handler (ไม่ใช่ lambda_handler) — ดูชื่อ function ในcode ที่ upload มาจะเห็น def handler(event, context)" }
    ]},
    { num: 77, task: "Task 4.2", desc: "กด Save", errors: [] },
    { num: 78, task: "Task 4.2", desc: "เลือก tab Configuration", errors: [] },
    { num: 79, task: "Task 4.2", desc: "ที่เมนูด้านซ้าย เลือก General configuration → กด Edit", errors: [] },
    { num: 80, task: "Task 4.2", desc: "ใส่ Description=Create a thumbnail-sized image", errors: [] },
    { num: 81, task: "Task 4.2", desc: "ตั้ง Timeout=1 min 0 sec (หรือ 60 seconds) และ Memory=256 MB", errors: [
      { problem: "Lambda function timeout ตอน process รูปใหญ่", cause: "Default timeout คือ 3 วินาที ซึ่งไม่พอสำหรับ image processing", fix: "ไปที่ Configuration → General configuration → Edit → ตั้ง Timeout=1 min 0 sec (60 seconds) | Memory=256 MB → Save" }
    ]},
    { num: 82, task: "Task 4.2", desc: "กด Save", errors: [] },
    { num: 83, task: "Task 4.2", desc: "ที่เมนูด้านซ้าย เลือก Environment variables → กด Edit → กด Add environment variable", errors: [] },
    { num: 84, task: "Task 4.2", desc: "ใส่ Key=bucket_name, Value=xxxxx-labbucket-xxxxx (ชื่อ bucket ของ lab) แล้วกด Save", errors: [
      { problem: "Lambda function error 'KeyError: bucket_name' ตอน trigger", cause: "ไม่ได้ตั้ง Environment variable หรือ Key/Value ผิด", fix: "Lambda → Configuration → Environment variables → Edit → Add: Key=bucket_name, Value=(ชื่อ bucket จริงจาก S3)" },
      { problem: "ใส่ Key เป็น bucket_Name หรือ Bucket_name (ตัวใหญ่-เล็กไม่ตรง)", cause: "Environment variable name เป็น case sensitive — code Lambda ใช้ os.environ['bucket_name'] ตัวเล็กทั้งหมด", fix: "Key ต้องเป็น bucket_name (ตัวเล็กทั้งหมด underscore คั่น)" },
      { problem: "ใส่ Value ผิด — copy ชื่อ bucket มาไม่ครบ หรือมี space ต่อท้าย", cause: "Bucket name ต้องตรงตัว 100% ถ้ามี space หรือตัวอักษรเกิน Lambda จะหา bucket ไม่เจอ", fix: "ไป S3 → copy ชื่อ bucket ที่มีคำว่า labbucket ให้ครบทั้ง string → paste ใน Value โดยตรวจว่าไม่มี space หน้า/หลัง" }
    ]},
    { num: 85, task: "Task 4.3", desc: "ค้นหา Lambda ใน search bar", errors: [] },
    { num: 86, task: "Task 4.3", desc: "กด Create function", errors: [] },
    { num: 87, task: "Task 4.3", desc: "เลือก Author from scratch", errors: [] },
    { num: 88, task: "Task 4.3", desc: "ตั้งค่า: Function name=CreateMobileImage, Runtime=Python 3.12, Expand Additional settings → เปิด Custom execution role → เลือก LabExecutionRole → Save", errors: [
      { problem: "เหมือนข้อ 64 — ไม่เห็น role หรือ runtime ผิด", cause: "ไม่ได้ expand Additional settings / toggle Custom execution role / เลือก runtime ผิด", fix: "เหมือนข้อ 64: Expand → toggle Custom execution role → เลือก LabExecutionRole → Runtime=Python 3.12" }
    ]},
    { num: 89, task: "Task 4.3", desc: "กด Create function", errors: [] },
    { num: 90, task: "Task 4.3", desc: "ถ้าเห็น Getting started pop-up กด Dismiss", errors: [] },
    { num: 91, task: "Task 4.4", desc: "กด + Add trigger ตั้งค่า: Source=SQS, SQS Queue=mobile-queue, Batch size=1", errors: [
      { problem: "ไม่เห็น mobile-queue ใน SQS dropdown", cause: "Queue ยังไม่สร้าง (ข้อ 21-23) หรือ region ผิด", fix: "ตรวจว่า mobile-queue สร้างสำเร็จแล้ว | Region ไม่ได้เปลี่ยน" },
      { problem: "เลือก thumbnail-queue แทน mobile-queue (สลับกัน)", cause: "CreateMobileImage ต้อง trigger จาก mobile-queue ไม่ใช่ thumbnail-queue", fix: "ลบ trigger ที่ผิด: Lambda → Configuration → Triggers → เลือก trigger → Delete → แล้ว Add trigger ใหม่เลือก mobile-queue" },
      { problem: "เจอ error 'An event source mapping with SQS arn already exists'", cause: "SQS queue หนึ่งตัวผูกกับ Lambda function ได้หลายตัว แต่ถ้า trigger เดียวกันซ้ำจะ error", fix: "แปลว่า trigger นี้มีอยู่แล้ว — ไม่ต้อง add ซ้ำ | ไปดูที่ Configuration → Triggers ว่ามี SQS trigger อยู่หรือยัง" }
    ]},
    { num: 92, task: "Task 4.4", desc: "Scroll ลงแล้วกด Add", errors: [] },
    { num: 93, task: "Task 4.4", desc: "เลือก tab Code", errors: [] },
    { num: 94, task: "Task 4.4", desc: "ดู settings", errors: [] },
    { num: 95, task: "Task 4.4", desc: "Copy ค่า CreateMobileImageZIPLocation จากด้านซ้ายของ lab instructions", errors: [] },
    { num: 96, task: "Task 4.4", desc: "กด Upload from → เลือก Amazon S3 location", errors: [
      { problem: "เจอ error ตอน upload หรือ 'Access Denied'", cause: "Copy URL ของ CreateThumbnail มาแทน CreateMobileImage (สลับกัน)", fix: "ตรวจว่า copy CreateMobileImageZIPLocation จากด้านซ้ายของ lab (ไม่ใช่ CreateThumbnailZIPLocation!)" }
    ]},
    { num: 97, task: "Task 4.4", desc: "Paste ค่า CreateMobileImageZIPLocation ลงในช่อง URL", errors: [
      { problem: "เจอ error ตอน upload code", cause: "Copy URL ไม่ครบ / มี space / ใช้ URL ผิดตัว (ใช้ CreateThumbnail แทน CreateMobileImage)", fix: "ตรวจว่า copy CreateMobileImageZIPLocation (ไม่ใช่ CreateThumbnailZIPLocation!) จากด้านซ้ายของ lab" }
    ]},
    { num: 98, task: "Task 4.4", desc: "กด Save (Update)", errors: [] },
    { num: 99, task: "Task 4.4", desc: "ที่ Runtime settings กด Edit → ใส่ Handler=CreateMobileImage.handler → กด Save", errors: [
      { problem: "Lambda error 'Unable to import module CreateMobileImage'", cause: "Handler ผิด — อาจใส่เป็น CreateThumbnail.handler (copy มาจาก function ก่อนหน้า)", fix: "Handler ต้องเป็น CreateMobileImage.handler (ไม่ใช่ CreateThumbnail.handler!)" },
      { problem: "ใส่ Handler เป็น createmobileimage.handler (ตัวเล็กทั้งหมด)", cause: "เหมือนข้อ 76 — Handler name เป็น case sensitive ต้องตรงกับชื่อไฟล์ .py", fix: "Handler ต้องเป็น CreateMobileImage.handler (C, M, I ตัวใหญ่) — match กับ CreateMobileImage.py" }
    ]},
    { num: 100, task: "Task 4.4", desc: "กด Save", errors: [] },
    { num: 101, task: "Task 4.4", desc: "เลือก tab Configuration", errors: [] },
    { num: 102, task: "Task 4.4", desc: "ที่เมนูด้านซ้าย เลือก General configuration → กด Edit", errors: [] },
    { num: 103, task: "Task 4.4", desc: "ใส่ Description=Create a mobile friendly image", errors: [] },
    { num: 104, task: "Task 4.4", desc: "ตั้ง Timeout=1 min 0 sec (หรือ 60 seconds) และ Memory=256 MB", errors: [
      { problem: "Lambda function timeout ตอน process รูปใหญ่", cause: "Default timeout คือ 3 วินาที ซึ่งไม่พอสำหรับ image processing", fix: "ไปที่ Configuration → General configuration → Edit → ตั้ง Timeout=1 min 0 sec (60 seconds) | Memory=256 MB → Save" }
    ]},
    { num: 105, task: "Task 4.4", desc: "กด Save", errors: [] },
    { num: 106, task: "Task 4.4", desc: "ที่เมนูด้านซ้าย เลือก Environment variables → กด Edit → กด Add environment variable", errors: [] },
    { num: 107, task: "Task 4.4", desc: "ใส่ Key=bucket_name, Value=xxxxx-labbucket-xxxxx (ชื่อ bucket ของ lab) แล้วกด Save", errors: [
      { problem: "Lambda function error 'KeyError: bucket_name' ตอน trigger", cause: "ไม่ได้ตั้ง Environment variable หรือ Key/Value ผิด", fix: "Lambda → Configuration → Environment variables → Edit → Add: Key=bucket_name, Value=(ชื่อ bucket จริงจาก S3)" },
      { problem: "ใส่ Key เป็น bucket_Name หรือ Bucket_name (ตัวใหญ่-เล็กไม่ตรง)", cause: "Environment variable name เป็น case sensitive — code Lambda ใช้ os.environ['bucket_name'] ตัวเล็กทั้งหมด", fix: "Key ต้องเป็น bucket_name (ตัวเล็กทั้งหมด underscore คั่น)" },
      { problem: "ใส่ Value ผิด — copy ชื่อ bucket มาไม่ครบ หรือมี space ต่อท้าย", cause: "Bucket name ต้องตรงตัว 100% ถ้ามี space หรือตัวอักษรเกิน Lambda จะหา bucket ไม่เจอ", fix: "ไป S3 → copy ชื่อ bucket ที่มีคำว่า labbucket ให้ครบทั้ง string → paste ใน Value โดยตรวจว่าไม่มี space หน้า/หลัง" }
    ]},
    { num: 108, task: "Task 5", desc: "Download รูปจาก lab (เลือก AWS.jpg, MonaLisa.jpg, หรือ HappyFace.jpg)", errors: [
      { problem: "Firefox save เป็น .jpeg แทน .jpg", cause: "Firefox อาจเปลี่ยน extension เป็น .jpeg อัตโนมัติ", fix: "Rename ไฟล์ให้เป็น .jpg ก่อน upload (ต้องเป็น .jpg ไม่ใช่ .jpeg เพราะ event filter ใช้ suffix .jpg)" },
      { problem: "Download ไฟล์มาแล้วชื่อเป็น InputFile.jpg.jpg (ซ้อน extension)", cause: "Windows ซ่อน extension อยู่ → พอ rename เพิ่ม .jpg ก็ซ้อนกัน", fix: "เปิด File Explorer → View → ติ๊ก File name extensions → จะเห็น extension จริง แล้ว rename ให้เหลือ .jpg เดียว" },
      { problem: "ใช้ไฟล์ .png แทน .jpg", cause: "S3 event notification filter ตั้ง suffix=.jpg เท่านั้น — .png จะไม่ trigger event", fix: "ต้องใช้ไฟล์ .jpg เท่านั้น | Download รูปจาก lab instruction ที่เป็น .jpg หรือ convert รูปเป็น .jpg ก่อน upload" }
    ]},
    { num: 109, task: "Task 5", desc: "ตรวจว่าชื่อไฟล์ที่ download มาลงท้ายด้วย .jpg (ไม่ใช่ .jpeg หรือ .png) ถ้าไม่ใช่ให้ rename", errors: [] },
    { num: 110, task: "Task 5", desc: "ค้นหา S3 ใน search bar", errors: [] },
    { num: 111, task: "Task 5", desc: "กดชื่อ bucket xxxxx-labbucket-xxxxx", errors: [] },
    { num: 112, task: "Task 5", desc: "กดเข้า folder ingest/", errors: [
      { problem: "ไม่เห็น folder ingest/ ใน bucket", cause: "S3 'folder' จะเห็นก็ต่อเมื่อมี object ข้างในหรือถูกสร้างเป็น prefix — lab อาจยังไม่มี folder ingest/", fix: "ถ้าไม่เห็น folder ให้กด Create folder → ตั้งชื่อ ingest → Create | หรือถ้า upload ไฟล์ด้วย key prefix ingest/ มันจะสร้าง folder อัตโนมัติ" }
    ]},
    { num: 113, task: "Task 5", desc: "กด Upload", errors: [] },
    { num: 114, task: "Task 5", desc: "กด Add files", errors: [] },
    { num: 115, task: "Task 5", desc: "เลือกรูปที่ download มา (.jpg)", errors: [
      { problem: "Upload สำเร็จแต่ Lambda ไม่ trigger", cause: "ไฟล์ไม่ได้อยู่ใน folder ingest/ หรือไม่ใช่ .jpg", fix: "ต้อง upload ไปที่ folder ingest/ (ข้อ 112) และไฟล์ต้องลงท้าย .jpg (ไม่ใช่ .jpeg, .png)" },
      { problem: "Upload ไฟล์ชื่อ HappyFace.JPG (ตัวใหญ่) แทน .jpg (ตัวเล็ก)", cause: "S3 event notification suffix filter เป็น case sensitive — .JPG ≠ .jpg", fix: "Rename ไฟล์ให้เป็น .jpg (ตัวเล็ก) ก่อน upload | หรือ download ไฟล์ใหม่ save เป็น .jpg" },
      { problem: "Upload สำเร็จแต่ Lambda error ตอน process (ดู CloudWatch Logs เห็น error)", cause: "อาจเป็นไฟล์ที่ไม่ใช่ JPEG จริง (rename จาก .png เป็น .jpg) หรือไฟล์เสีย", fix: "ใช้ไฟล์รูปจริงที่เป็น JPEG format (ไม่ใช่แค่เปลี่ยน extension) | Download รูปจาก lab instruction ใหม่" }
    ]},
    { num: 116, task: "Task 5", desc: "Scroll ลงแล้วกด Upload", errors: [] },
    { num: 117, task: "Task 5", desc: "จะเห็นข้อความ Upload succeeded", errors: [
      { problem: "Upload สำเร็จแต่ Lambda ไม่ trigger (ไม่มี output ใน S3 output folders)", cause: "หลายสาเหตุ: event notification ผิด / SNS policy ผิด / SQS subscription ผิด / Lambda trigger ผิด queue", fix: "เช็คตามลำดับ:\n1. Upload อยู่ใน folder ingest/? (ข้อ 112)\n2. ไฟล์ลงท้าย .jpg? (ข้อ 109)\n3. Event notification ตั้ง prefix=ingest/ + suffix=.jpg? (ข้อ 57)\n4. SNS access policy ถูกต้อง? (ข้อ 48-51)\n5. SQS subscribe กับ topic? (ข้อ 17, 26)\n6. Lambda trigger เป็น SQS ถูก queue? (ข้อ 67, 91)" },
      { problem: "เช็คทุกอย่างแล้ว ถูกหมด แต่ Lambda ยังไม่ trigger", cause: "SNS topic type เป็น FIFO (ข้อ 7) ซึ่ง incompatible กับ S3 event notification — S3 ส่ง notification ไป SNS ไม่ได้", fix: "ตรวจ SNS topic type: ไปที่ SNS → Topics → ดูว่า Type เป็น Standard ไม่ใช่ FIFO | ถ้าเป็น FIFO ต้อง delete topic แล้วสร้างใหม่เป็น Standard แล้ว re-subscribe queues ทั้ง 2 ตัว (ข้อ 17, 26)" }
    ]},
    { num: 118, task: "Task 6", desc: "ค้นหา Lambda ใน search bar", errors: [] },
    { num: 119, task: "Task 6", desc: "กดเลือก function CreateThumbnail", errors: [] },
    { num: 120, task: "Task 6", desc: "เลือก tab Monitor", errors: [] },
    { num: 121, task: "Task 6", desc: "กด View CloudWatch logs", errors: [] },
    { num: 122, task: "Task 6", desc: "เลือก Log stream ล่าสุด (เรียงตาม Last event time)", errors: [
      { problem: "ไม่เห็น Log stream ใดๆ", cause: "Lambda ไม่ได้ถูก invoke เลย — event notification chain มีปัญหาตรงไหนสักจุด", fix: "ย้อนเช็คตาม flow: S3 event → SNS → SQS → Lambda trigger | ดูข้อ 117 สำหรับ checklist" }
    ]},
    { num: 123, task: "Task 6", desc: "Expand log messages ดูรายละเอียด (RequestId, Duration, Memory) ของ CreateThumbnail", errors: [] },
    { num: 124, task: "Task 6", desc: "กลับไปหน้า Lambda Functions แล้วกดเลือก function CreateMobileImage", errors: [] },
    { num: 125, task: "Task 6", desc: "เลือก tab Monitor → กด View CloudWatch logs → เลือก Log stream ล่าสุด", errors: [
      { problem: "CreateMobileImage ไม่มี Log stream แต่ CreateThumbnail มี", cause: "CreateMobileImage ไม่ได้ถูก trigger — อาจผูก trigger ผิด queue หรือ mobile-queue ไม่ได้ subscribe กับ SNS", fix: "เช็ค: Lambda CreateMobileImage → Configuration → Triggers → ต้องเห็น SQS mobile-queue | เช็ค SQS mobile-queue → SNS subscriptions → ต้องเห็น resize-image-topic" }
    ]},
    { num: 126, task: "Task 6", desc: "Expand log messages ดูรายละเอียดของ CreateMobileImage", errors: [] },
    { num: 127, task: "Task 6", desc: "ค้นหา S3 ใน search bar", errors: [] },
    { num: 128, task: "Task 6", desc: "กดชื่อ bucket xxxxx-labbucket-xxxxx", errors: [] },
    { num: 129, task: "Task 6", desc: "กดเข้า folder thumbnail/ ตรวจว่ามีรูปที่ถูก resize แล้ว", errors: [
      { problem: "ไม่เห็น folder thumbnail/ หรือ folder ว่างเปล่า", cause: "CreateThumbnail Lambda ไม่ได้ทำงาน หรือ error ระหว่าง execution", fix: "ไปดู CloudWatch Logs (ข้อ 121-123) ว่ามี error อะไร | Common issues:\n1. Handler ผิด (ข้อ 76)\n2. Code upload ไม่ถูก (ข้อ 73)\n3. Execution role ไม่มี S3 permission (ข้อ 64)\n4. SQS trigger ไม่ถูก queue (ข้อ 67)" }
    ]},
    { num: 130, task: "Task 6", desc: "กลับไปหน้า bucket แล้วกดเข้า folder mobile/ ตรวจว่ามีรูปที่ถูก resize แล้ว", errors: [
      { problem: "ไม่เห็น folder mobile/ หรือ folder ว่างเปล่า", cause: "CreateMobileImage Lambda ไม่ได้ทำงาน หรือ error ระหว่าง execution", fix: "ไปดู CloudWatch Logs ของ CreateMobileImage (ข้อ 124-126) ว่ามี error อะไร | Common issues:\n1. Handler ผิด (ข้อ 99)\n2. Code upload ไม่ถูก (ข้อ 97)\n3. SQS trigger ผิด queue (ข้อ 91)\n4. Environment variable bucket_name ผิด (ข้อ 107)" },
      { problem: "มี folder thumbnail/ แต่ไม่มี folder mobile/ (หรือกลับกัน)", cause: "Lambda function ตัวใดตัวหนึ่ง trigger ผิด queue — เช่น CreateMobileImage trigger จาก thumbnail-queue แทน mobile-queue (ข้อ 67, 91 สลับกัน)", fix: "ไปเช็ค Lambda → แต่ละ function → Configuration → Triggers:\n- CreateThumbnail ต้อง trigger จาก thumbnail-queue\n- CreateMobileImage ต้อง trigger จาก mobile-queue\nถ้าสลับกัน → ลบ trigger แล้ว add ใหม่ให้ถูกคู่" }
    ]},
    { num: 131, task: "Task 6", desc: "เปรียบเทียบขนาดรูปใน folder thumbnail/ กับ mobile/ กับรูปต้นฉบับใน ingest/", errors: [] },
    { num: 132, task: "Task 6", desc: "ตรวจว่า thumbnail มีขนาดเล็กกว่า mobile และ mobile เล็กกว่าต้นฉบับ", errors: [] },
    { num: 133, task: "End Lab", desc: "กลับไป AWS Management Console", errors: [] },
    { num: 134, task: "End Lab", desc: "ปิด tab ที่เปิดค้างอยู่ (CloudWatch, Lambda ฯลฯ)", errors: [] },
    { num: 135, task: "End Lab", desc: "ที่มุมบนขวา กด AWSLabsUser แล้วกด Sign out", errors: [] },
    { num: 136, task: "End Lab", desc: "กด End Lab แล้ว confirm เพื่อจบ lab", errors: [] }
  ]
};
