const lab4Data = {
  title: "Lab 4 - Configure High Availability in Your Amazon VPC",
  region: "us-west-2",
  steps: [
    { num: 1, task: "Start Lab", desc: "กด Start Lab ที่หน้า lab", errors: [] },
    { num: 2, task: "Start Lab", desc: "กด Open Console เพื่อเปิด AWS Management Console", errors: [
      { problem: "เจอหน้า 'You must first sign out'", cause: "Browser มี session ของ AWS account อื่นค้างอยู่", fix: "กด 'click here' เพื่อ logout → ปิด tab → กลับ lab page → กด Open Console ใหม่ | หรือใช้ Incognito" }
    ]},
    { num: 3, task: "Task 1.1", desc: "ค้นหา VPC ใน search bar ของ console", errors: [] },
    { num: 4, task: "Task 1.1", desc: "ที่เมนูด้านซ้าย เลือก Your VPCs ดู Lab VPC", errors: [] },
    { num: 5, task: "Task 1.1", desc: "ที่เมนูด้านซ้าย เลือก Subnets ดูรายละเอียดของ Public Subnet 1", errors: [] },
    { num: 6, task: "Task 1.1", desc: "เลือก (ติ๊ก) Public Subnet 1 ดูรายละเอียดด้านล่าง", errors: [] },
    { num: 7, task: "Task 1.1", desc: "เลือก tab Route table ดู routing ของ subnet นี้", errors: [] },
    { num: 8, task: "Task 1.1", desc: "เลือก tab Network ACL ดู ACL rules", errors: [] },
    { num: 9, task: "Task 1.1", desc: "ที่เมนูด้านซ้าย เลือก Internet gateways ตรวจว่า Lab IG attached กับ Lab VPC", errors: [] },
    { num: 10, task: "Task 1.1", desc: "ที่เมนูด้านซ้าย เลือก Security groups", errors: [] },
    { num: 11, task: "Task 1.1", desc: "เลือก (ติ๊ก) Inventory-ALB security group ดู Inbound rules (HTTP:80 from 0.0.0.0/0)", errors: [] },
    { num: 12, task: "Task 1.1", desc: "ดู Inbound rules tab ของ Inventory-ALB", errors: [] },
    { num: 13, task: "Task 1.1", desc: "ดู Outbound rules tab ของ Inventory-ALB", errors: [] },
    { num: 14, task: "Task 1.1", desc: "เลือก (ติ๊ก) Inventory-App security group ดู Inbound rules (HTTP:80 from Inventory-ALB)", errors: [] },
    { num: 15, task: "Task 1.1", desc: "ดู Inbound rules tab ของ Inventory-App", errors: [] },
    { num: 16, task: "Task 1.1", desc: "ดู Outbound rules tab ของ Inventory-App", errors: [] },
    { num: 17, task: "Task 1.1", desc: "เลือก (ติ๊ก) Inventory-DB security group ดู Inbound rules (MySQL:3306 from Inventory-App)", errors: [] },
    { num: 18, task: "Task 1.1", desc: "ดู Inbound rules tab ของ Inventory-DB", errors: [] },
    { num: 19, task: "Task 1.1", desc: "ดู Outbound rules tab ของ Inventory-DB", errors: [] },
    { num: 20, task: "Task 1.2", desc: "ค้นหา EC2 ใน search bar", errors: [] },
    { num: 21, task: "Task 1.2", desc: "ที่เมนูด้านซ้าย เลือก Instances", errors: [] },
    { num: 22, task: "Task 1.2", desc: "เลือก (ติ๊ก) AppServer instance ดูรายละเอียด", errors: [] },
    { num: 23, task: "Task 1.2", desc: "กด Actions → Instance settings → Edit user data", errors: [] },
    { num: 24, task: "Task 1.2", desc: "ที่หน้า Edit user data กด Copy user data แล้ว paste เก็บไว้ใน text editor (จะใช้ตอน Task 2)", errors: [
      { problem: "ปุ่ม Copy user data ไม่ทำงาน หรือ copy ได้แต่เป็นค่าว่าง", cause: "Instance ต้อง stop ก่อนถึงจะ edit/view user data ได้ในบาง console version", fix: "ลอง copy ข้อความจาก text box ด้วย Ctrl+A → Ctrl+C แทน | หรือดู user data จาก instance metadata" },
      { problem: "ลืม copy user data แล้วไปทำ step ถัดไป → ตอนข้อ 48 ไม่มี script paste", cause: "Clipboard ถูก overwrite ระหว่างทำ step อื่น", fix: "ย้อนกลับ: EC2 → Instances → เลือก AppServer → Actions → Instance settings → Edit user data → Copy ใหม่" },
      { problem: "Copy user data มาแล้ว paste ลง Word/Google Docs → กลับมา copy จาก Word ทีหลังได้ encoding ผิด", cause: "Word processors จะแปลง straight quotes เป็น smart quotes และเพิ่ม formatting ที่มองไม่เห็น", fix: "ใช้ plain text editor เท่านั้น (Notepad, TextEdit plain mode, VS Code) ในการเก็บ user data | ห้ามใช้ Word, Google Docs" }
    ]},
    { num: 25, task: "Task 1.2", desc: "Paste user data ที่ copy มาไว้ใน text editor เก็บไว้ใช้ภายหลัง", errors: [] },
    { num: 26, task: "Task 1.3", desc: "Expand เมนูด้านซ้ายด้วยไอคอน ≡ ที่มุมบนซ้าย", errors: [] },
    { num: 27, task: "Task 1.3", desc: "ที่เมนูด้านซ้าย เลือก Target Groups", errors: [] },
    { num: 28, task: "Task 1.3", desc: "เลือก (ติ๊ก) Inventory-App target group ดูรายละเอียด", errors: [] },
    { num: 29, task: "Task 1.3", desc: "ดู tab Targets ตรวจว่า AppServer ถูก register เป็น target อยู่แล้ว", errors: [] },
    { num: 30, task: "Task 1.3", desc: "ที่เมนูด้านซ้าย เลือก Load Balancers", errors: [] },
    { num: 31, task: "Task 1.3", desc: "กด link Inventory-LB load balancer ดูรายละเอียด", errors: [] },
    { num: 32, task: "Task 1.4", desc: "Copy ค่า InventoryAppSettingsPageURL จากด้านซ้ายของ lab instructions", errors: [] },
    { num: 33, task: "Task 1.4", desc: "เปิด browser tab ใหม่ วาง URL ที่ copy มาแล้วกด Enter", errors: [
      { problem: "หน้า settings ไม่แสดง หรือ timeout", cause: "Copy URL ไม่ครบ / มี space ติด / ALB ยังไม่ Active / Target ยัง unhealthy", fix: "เช็คว่า URL คล้าย http://Inventory-LB-xxxx.elb.amazonaws.com/settings.php | ถ้า timeout → ไปดู Load Balancers ว่า state=Active และ Target Group มี healthy targets" }
    ]},
    { num: 34, task: "Task 1.4", desc: "ที่หน้า settings page ปล่อยค่า default ไว้ (database endpoint, name, login ถูก populate ไว้แล้ว)", errors: [] },
    { num: 35, task: "Task 1.4", desc: "กด Save", errors: [
      { problem: "กด Save แล้ว error 'Unable to connect to database'", cause: "Aurora database ยังไม่ Available หรือ security group ไม่ถูกต้อง", fix: "ไปดู RDS → Databases → ตรวจ status ของ inventory-primary ว่าเป็น Available | เช็ค Inventory-DB security group มี inbound MySQL:3306 from Inventory-App" }
    ]},
    { num: 36, task: "Task 2", desc: "ค้นหา EC2 ใน search bar", errors: [] },
    { num: 37, task: "Task 2", desc: "ที่เมนูด้านซ้าย ในส่วน Instances เลือก Launch Templates", errors: [] },
    { num: 38, task: "Task 2", desc: "กด Create launch template", errors: [] },
    { num: 39, task: "Task 2", desc: "ในส่วน Launch template name and description ใส่: Name=Lab-launch-template, Description=version 1", errors: [
      { problem: "ชื่อ launch template error 'invalid characters'", cause: "ใส่ space หรืออักษรพิเศษในชื่อ", fix: "ใช้ Lab-launch-template (ขีดกลาง ไม่ใช่ space ไม่ใช่ underscore)" },
      { problem: "ใส่ชื่อ template เป็น Lab launch template (มี space) แทน Lab-launch-template (มีขีดกลาง)", cause: "Launch template name ไม่รองรับ space", fix: "ใช้ขีดกลาง (-) แทน space ทุกจุด: Lab-launch-template" }
    ]},
    { num: 40, task: "Task 2", desc: "ในส่วน Application and OS Images เลือก Quick Start tab", errors: [] },
    { num: 41, task: "Task 2", desc: "เลือก Amazon Linux เป็น OS", errors: [] },
    { num: 42, task: "Task 2", desc: "ใน Amazon Machine Image เลือก Amazon Linux 2023 AMI", errors: [] },
    { num: 43, task: "Task 2", desc: "ในส่วน Instance type เลือก t3.micro", errors: [
      { problem: "เจอ error 'not authorized' ตอน create launch template", cause: "เลือก instance type อื่นที่ lab ไม่อนุญาต", fix: "เลือก t3.micro เท่านั้น" }
    ]},
    { num: 44, task: "Task 2", desc: "ในส่วน Network Settings ที่ Security groups เลือก Inventory-App", errors: [
      { problem: "ไม่แน่ใจว่า SG ตัวไหนทำหน้าที่อะไร เลยเลือกผิดตัวหรือไล่หาปัญหาผิดจุด", cause: "lab นี้ใช้ SG 3 ตัวต่อกันเป็นลูกโซ่ ถ้าไม่เข้าใจลำดับจะไล่หาปัญหาผิดชั้น", fix: "โครงสร้างที่ lab เตรียมไว้ ไล่จากนอกเข้าใน:\n- Inventory-ALB : รับ port 80 จาก 0.0.0.0/0 (เปิดให้อินเทอร์เน็ตเข้า ALB)\n- Inventory-App : รับ port 80 จาก Inventory-ALB เท่านั้น ← template ต้องเลือกตัวนี้ และเป็นตัวที่ตัดสินว่า target healthy หรือไม่\n- Inventory-DB : รับ port 3306 (MYSQL/Aurora) จาก Inventory-App เท่านั้น\nถ้า target unhealthy ให้ดู Inventory-App ก่อน (ข้อ 77) | ถ้าเว็บขึ้นแต่ไม่มีข้อมูล ให้ดู Inventory-DB\nประหยัดเวลา: Network ACL ของ lab นี้เปิดผ่านทุก traffic อยู่แล้ว ไม่ต้องไปไล่ที่ ACL เลย" },
      { problem: "หา Inventory-App security group ไม่เจอ", cause: "อาจพิมพ์ชื่อผิด หรือ lab provisioning ยังไม่เสร็จ", fix: "พิมพ์ Inventory ใน search box แล้วจะเห็น Inventory-App ปรากฏ | ถ้าไม่เจอรอ lab provision เสร็จ" }
    ]},
    { num: 45, task: "Task 2", desc: "Scroll ลงไปที่ส่วน Advanced details", errors: [] },
    { num: 46, task: "Task 2", desc: "Expand ส่วน Advanced details", errors: [] },
    { num: 47, task: "Task 2", desc: "ที่ IAM instance profile เลือก Inventory-App-Role", errors: [
      { problem: "หา Inventory-App-Role ไม่เจอใน dropdown", cause: "Lab provisioning ยังไม่เสร็จ หรือพิมพ์ชื่อผิด", fix: "พิมพ์ Inventory ใน search → จะเห็น Inventory-App-Role | ถ้าไม่เจอรอ lab provision" }
    ]},
    { num: 48, task: "Task 2", desc: "ในส่วน User data paste script ที่ copy เก็บไว้จากข้อ 24-25", errors: [
      { problem: "ลืมใส่ user data ใน launch template", cause: "ถ้า template ไม่มี user data instance ที่ ASG สร้างขึ้นจะเป็นเครื่องเปล่า ไม่มี web app ทำให้ target group ตรวจ health ไม่ผ่านทั้ง 2 ตัว (ข้อ 77) | อาการจะไปโผล่ตอนหลัง ไม่ใช่ตอนนี้ จึงมักไล่หาผิดที่", fix: "ไปเอา user data มาจาก instance เดิม: EC2 → Instances → ติ๊ก AppServer → Actions → Instance settings → Edit user data → copy ทั้งก้อน (ข้อ 23 กับ ข้อ 24)\nแล้วแก้ template: EC2 → Launch Templates → ติ๊ก Lab-launch-template → Actions → Modify template (Create new version) → Advanced details → paste user data → Create template version\nสั่งให้ ASG ใช้เวอร์ชันใหม่ แล้ว terminate instance เดิมทิ้งให้ ASG สร้างใหม่ (ข้อ 83) ตัวใหม่จะมี web app และ health ผ่าน" },
      { problem: "ลืม copy user data จากข้อ 24 หรือ paste มาเป็นค่าว่าง", cause: "ไม่ได้ copy user data ตอน Task 1.2 หรือ clipboard ถูก overwrite", fix: "ย้อนกลับไปข้อ 23-24: EC2 → Instances → เลือก AppServer → Actions → Instance settings → Edit user data → Copy" },
      { problem: "Paste user data มาแต่มี encoding ผิด หรือมีอักษรแปลกปน", cause: "Copy จาก text editor ที่แปลง format (เช่น Word, Google Docs) ทำให้มี smart quotes หรือ special characters", fix: "ใช้ plain text editor (Notepad, TextEdit ในโหมด plain text) ในการเก็บ user data | หรือ copy จาก console โดยตรง" },
      { problem: "Clipboard มี content อื่นทับ user data ที่ copy ไว้ เพราะระหว่างทำ step 26-47 ได้ copy ค่าอื่นไป", cause: "ระหว่าง step 24 ถึง step 48 มีหลายขั้นตอน — clipboard จะถูก overwrite ถ้า copy อะไรระหว่างทาง", fix: "ต้อง paste user data ลง text editor แยกไว้ตั้งแต่ข้อ 25 | ถ้าลืม → ย้อนไป EC2 → Instances → AppServer → Actions → Instance settings → Edit user data → Copy ใหม่" },
      { problem: "Instances จาก ASG unhealthy ตลอด (ข้อ 77) ทั้งที่ SG ถูก + ASG healthy", cause: "User data มีบรรทัดว่างอยู่ก่อน #!/bin/bash ทำให้ OS ไม่ recognize ว่าเป็น script → ไม่ execute → httpd ไม่ถูก install", fix: "#!/bin/bash ต้องอยู่บรรทัดที่ 1 เป๊ะ ห้ามมีบรรทัดว่าง/space/อะไรนำหน้า → แก้ launch template: ลบบรรทัดว่างข้างบน #!/bin/bash ออก → delete ASG → สร้าง ASG ใหม่" }
    ]},
    { num: 49, task: "Task 2", desc: "กด Create launch template", errors: [
      { problem: "เจอ error ตอนกด Create launch template", cause: "อาจขาด AMI / instance type ผิด / security group ไม่ถูก / ชื่อซ้ำ", fix: "เช็คตามลำดับ:\n1. AMI เป็น Amazon Linux 2023? (ข้อ 42)\n2. Instance type เป็น t3.micro? (ข้อ 43)\n3. Security group เป็น Inventory-App? (ข้อ 44)\n4. ชื่อ template ไม่ซ้ำกับที่มีอยู่?" }
    ]},
    { num: 50, task: "Task 2", desc: "กด View launch templates เพื่อดู template ที่สร้าง", errors: [] },
    { num: 51, task: "Task 3", desc: "ที่เมนูด้านซ้าย ในส่วน Auto Scaling เลือก Auto Scaling Groups", errors: [] },
    { num: 52, task: "Task 3", desc: "กด Create Auto Scaling group ตั้ง: Name=Inventory-ASG, Launch template=เลือก template ที่เพิ่งสร้าง", errors: [
      { problem: "ไม่เห็น launch template ใน dropdown", cause: "Launch template สร้างไม่สำเร็จ (ข้อ 49) หรือชื่อผิด", fix: "ย้อนไปข้อ 49 ตรวจว่า launch template ถูกสร้างสำเร็จ | ถ้าไม่เจอให้สร้างใหม่" }
    ]},
    { num: 53, task: "Task 3", desc: "กด Next", errors: [] },
    { num: 54, task: "Task 3", desc: "ในส่วน Network ตั้งค่า: VPC=Lab VPC, Subnets=Private Subnet 1 และ Private Subnet 2", errors: [
      { problem: "ไม่เห็น Private Subnet 1 หรือ Private Subnet 2", cause: "ยังไม่ได้เลือก Lab VPC ข้างบน", fix: "เลือก VPC=Lab VPC ก่อน → subnet dropdown จะแสดง Private Subnet 1 และ 2" },
      { problem: "เลือก Public Subnet แทน Private Subnet", cause: "ASG ต้อง launch instances ใน Private Subnet (security best practice)", fix: "เปลี่ยนเป็น Private Subnet 1 + Private Subnet 2 — ไม่ใช่ Public" }
    ]},
    { num: 55, task: "Task 3", desc: "กด Next", errors: [] },
    { num: 56, task: "Task 3", desc: "ในหน้า Integrate with other services ตั้งค่า: Attach to an existing load balancer → Choose from your load balancer target groups → เลือก Inventory-App | HTTP, Health check grace period=300", errors: [
      { problem: "ไม่เห็น Inventory-App ใน target group dropdown", cause: "ไม่ได้เลือก 'Attach to an existing load balancer' ก่อน หรือไม่ได้เลือก 'Choose from your load balancer target groups'", fix: "ต้องเลือก radio button 'Attach to an existing load balancer' ก่อน → แล้วเลือก 'Choose from your load balancer target groups' → จะเห็น Inventory-App | HTTP ใน dropdown" }
    ]},
    { num: 57, task: "Task 3", desc: "กด Next", errors: [] },
    { num: 58, task: "Task 3", desc: "ในหน้า Configure group size and scaling ตั้ง: Desired=2, Min=2, Max=2", errors: [
      { problem: "ใส่ Desired capacity ไม่ตรง (เช่น Desired=1 หรือ Min=0)", cause: "Lab ต้องการ 2 instances เสมอเพื่อ demonstrate HA — ถ้าใส่ผิดจะได้ instances ไม่ครบ", fix: "ตั้ง Desired=2, Min=2, Max=2 ทั้งหมด | ถ้าตั้งผิดไปแล้ว → ASG → Edit group details → แก้ค่า" }
    ]},
    { num: 59, task: "Task 3", desc: "ในส่วน Additional settings ติ๊ก Enable group metrics collection within CloudWatch", errors: [] },
    { num: 60, task: "Task 3", desc: "กด Next", errors: [] },
    { num: 61, task: "Task 3", desc: "กด Next จนถึงหน้า Add tags", errors: [] },
    { num: 62, task: "Task 3", desc: "กด Add tag ตั้ง: Key=Name, Value=Inventory-App", errors: [
      { problem: "ลืม Add tag → instances ที่ ASG launch จะไม่มีชื่อแสดงใน console (แสดงเป็น - ว่างๆ)", cause: "Tag Name ทำให้เห็นชื่อ instance ใน EC2 console — ถ้าไม่ใส่จะหา instance ยากตอนท้าย", fix: "ถ้าลืมใส่ตอนสร้าง → ASG → เลือก Inventory-ASG → Details → Tags → Edit → เพิ่ม Key=Name, Value=Inventory-App" },
      { problem: "ใส่ Key เป็น name (ตัวเล็ก) แทน Name (N ตัวใหญ่)", cause: "AWS console ใช้ Key='Name' (ขึ้น N ตัวใหญ่) เป็น tag พิเศษสำหรับแสดงชื่อ — ถ้าใส่ตัวเล็ก จะไม่แสดงในคอลัมน์ Name", fix: "แก้ tag: Key=Name (N ตัวใหญ่)" }
    ]},
    { num: 63, task: "Task 3", desc: "กด Next", errors: [] },
    { num: 64, task: "Task 3", desc: "Review แล้วกด Create Auto Scaling group", errors: [
      { problem: "เจอ error ตอน create ASG", cause: "Launch template มีปัญหา / VPC-Subnet ผิด / target group ไม่ถูก", fix: "เช็ค:\n1. Launch template สร้างสำเร็จ? (ข้อ 49-50)\n2. VPC=Lab VPC + Private Subnets? (ข้อ 54)\n3. Target group=Inventory-App | HTTP? (ข้อ 56)" }
    ]},
    { num: 65, task: "Task 3", desc: "เลือก Auto Scaling group ที่เพิ่งสร้าง", errors: [] },
    { num: 66, task: "Task 3", desc: "ดูส่วน Details ตรวจข้อมูล ASG", errors: [] },
    { num: 67, task: "Task 3", desc: "เลือก tab Activity ดู history — รอจน status เปลี่ยนเป็น Successful", errors: [
      { problem: "Activity status เป็น Failed หรือ Cancelled", cause: "Launch template config ผิด เช่น AMI ไม่ถูก / SG ไม่มี / IAM role ผิด / subnet เต็ม", fix: "ดู status message ใน Activity → แก้ launch template ตามที่ error บอก → delete ASG → สร้างใหม่" },
      { problem: "Activity แสดง 'Launching a new EC2 instance: Failed' กับ error 'You are not authorized'", cause: "Launch template ใช้ instance type ที่ lab ไม่อนุญาต หรือ AMI ที่เข้าถึงไม่ได้", fix: "ไป Launch Templates → เลือก Lab-launch-template → Actions → Modify template → แก้ Instance type=t3.micro, AMI=Amazon Linux 2023 → สร้าง version ใหม่ → update ASG ให้ใช้ version ล่าสุด" },
      { problem: "Activity แสดง 'Failed: No capacity available in subnet'", cause: "Subnet ที่เลือกมี IP ไม่พอ หรือ AZ มีปัญหาชั่วคราว", fix: "ปกติไม่เกิดใน lab — ลอง delete ASG แล้วสร้างใหม่ | ถ้ายัง fail → เช็คว่าเลือก Private Subnet ทั้ง 2 ตัว (ข้อ 54)" }
    ]},
    { num: 68, task: "Task 3", desc: "เลือก tab Instance management ตรวจว่ามี 2 instances อยู่ใน InService state", errors: [
      { problem: "Instances ยังไม่ขึ้น InService", cause: "Instances กำลัง launch อยู่ (ใช้เวลา 2-3 นาที)", fix: "กด refresh ทุก 30 วินาที รอจน Lifecycle state เป็น InService ทั้ง 2 ตัว" },
      { problem: "Instance ขึ้น InService แล้วกลายเป็น Terminating วนลูป", cause: "Health check fail ซ้ำๆ — user data script ไม่ทำงาน ทำให้ instance ไม่ pass health check → ASG terminate แล้ว launch ใหม่วนไป", fix: "เช็ค user data ใน launch template (ข้อ 48) ว่า paste ครบ + encoding ถูก | เช็ค Security group เป็น Inventory-App (ข้อ 44) ที่รับ HTTP:80 | เช็ค Health check grace period=300 (ข้อ 56)" }
    ]},
    { num: 69, task: "Task 3", desc: "เลือก tab Monitoring ดู metrics", errors: [] },
    { num: 70, task: "Task 4", desc: "Expand เมนูด้านซ้ายด้วยไอคอน ≡", errors: [] },
    { num: 71, task: "Task 4", desc: "ที่เมนูด้านซ้าย เลือก Target Groups", errors: [] },
    { num: 72, task: "Task 4", desc: "เลือก (ติ๊ก) Inventory-App target group", errors: [] },
    { num: 73, task: "Task 4", desc: "ดู tab Targets — จะเห็น 3 instances (2 Inventory-App จาก ASG + 1 AppServer เดิม)", errors: [] },
    { num: 74, task: "Task 4", desc: "เลือก (ติ๊ก) AppServer instance", errors: [] },
    { num: 75, task: "Task 4", desc: "กด Deregister เพื่อเอา AppServer ออกจาก target group", errors: [] },
    { num: 76, task: "Task 4", desc: "ใน pop-up Deregister target กด Deregister ยืนยัน", errors: [
      { problem: "หลังกด Deregister แล้ว AppServer ขึ้นสถานะ draining ค้างอยู่ ผู้เรียนคิดว่าค้าง/พัง", cause: "draining เป็นสถานะปกติตามที่ lab อธิบายไว้ — ALB หยุดส่ง request ใหม่เข้า target นั้นทันที แต่รอ request ที่ค้างอยู่ให้จบก่อน คอลัมน์ Health Status Details จะบอกว่ากำลัง deregister อยู่", fix: "ไม่ต้องทำอะไร รอสักครู่ AppServer จะหลุดออกจากลิสต์เอง เหลือแค่ 2 instance ของ ASG\nถ้ารีบไม่ต้องรอก็ได้ ไปดู health ของ 2 ตัวใหม่ต่อได้เลย (ข้อ 77)" },
      { problem: "ผู้เรียนเข้าใจว่า Deregister คือการลบ/ปิด AppServer", cause: "lab ระบุไว้ชัดว่า deregister แค่ถอด instance ออกจาก load balancer เท่านั้น ตัว AppServer ยังรันต่อไปเรื่อยๆ จนกว่าจะสั่ง terminate เอง", fix: "อธิบายว่า AppServer ยังอยู่และยัง Running อยู่ใน EC2 → Instances เพียงแต่ไม่รับ traffic จาก ALB แล้ว\nประโยชน์: ถ้า 2 instance ของ ASG ยัง unhealthy และอยากให้เว็บกลับมาใช้ได้ชั่วคราว ยัง register AppServer กลับเข้า target group ได้ เพราะเครื่องยังไม่ถูกลบ (ข้อ 77)\nlab ไม่ได้สั่งให้ terminate AppServer ในข้อนี้ — ที่จะ terminate คือ instance ของ ASG ใน Task 5 (ข้อ 83)" }
    ]},
    { num: 77, task: "Task 4", desc: "รอจน Inventory-App instances (2 ตัว) แสดง Health status เป็น healthy (อาจใช้เวลา 5-10 นาที กด refresh ทุก 30 วินาที)", errors: [
      { problem: "Target Group ขึ้น UnHealthy ทั้ง 2 ตัว โดย Health status details บอกว่า Health check failed", cause: "พังพร้อมกันทั้งคู่แปลว่าไม่ใช่ปัญหาที่ตัว instance แต่เป็นที่ launch template ที่ใช้สร้างทั้งสองตัว — ที่เจอบ่อยสุดคือลืมใส่ user data ใน template (ข้อ 48) instance จึงไม่มี web server ให้ ALB เรียก", fix: "เช็ค template ก่อนเลย: EC2 → Launch Templates → Lab-launch-template → ดูว่าในส่วน User data มี script อยู่ไหม\nถ้าว่าง ให้ไป copy user data จาก AppServer (ข้อ 23) → Actions → Modify template (Create new version) → paste ที่ User data → Create template version\nแล้วให้ ASG ใช้เวอร์ชันใหม่ → terminate instance ทั้ง 2 ตัวทิ้ง ให้ ASG สร้างใหม่จาก template ที่แก้แล้ว (ข้อ 83)\nอย่าด่วนสรุปว่าพัง: lab ระบุว่า instance ใหม่อาจใช้เวลาถึง 10 นาที กว่าจะ initialize เสร็จและ health check ผ่าน ให้กด refresh ทุก 30 วินาที ถ้าครบ 10 นาทีแล้วยังไม่ healthy ค่อยถือว่ามีปัญหาจริง\nถ้า user data มีอยู่แล้ว ค่อยไปดูอย่างอื่น: Security group ของ template เป็น Inventory-App ไหม (ข้อ 44) | IAM instance profile เป็น Inventory-App-Role ไหม (ข้อ 47) | ASG ผูกกับ target group Inventory-App ถูกไหม (ข้อ 56)" },
      { problem: "Deregister AppServer ออกไปแล้ว (ข้อ 75) เลยไม่มี target ที่ healthy เหลือ เว็บล่ม", cause: "AppServer เป็นตัวเดียวที่ healthy อยู่ พอ deregister ออกแล้ว 2 ตัวใหม่จาก ASG ยัง unhealthy target group จึงไม่มี target ให้ส่ง traffic เว็บจึงขึ้น 503", fix: "แก้ที่ต้นเหตุคือทำให้ 2 ตัวใหม่ healthy ตามด้านบน (เช็ค user data ใน template ข้อ 48)\nถ้าต้องการให้เว็บกลับมาใช้ได้ชั่วคราวเพื่อ demo ให้ register AppServer กลับเข้า target group: Target Groups → Inventory-App → Register targets → เลือก AppServer → Include as pending → Register\nแต่ตาม lab ต้อง deregister ออกอยู่แล้ว ดังนั้นสุดท้ายต้องทำให้ instance ของ ASG healthy ให้ได้" },
      { problem: "Health status ยังเป็น unhealthy หรือ initial หลังรอนานแล้ว", cause: "Instances ยังไม่ pass health check — อาจเป็นเพราะ user data script ไม่ทำงาน (ข้อ 48) หรือ security group ผิด (ข้อ 44)", fix: "เช็ค:\n1. User data ใส่ครบ? (ข้อ 48)\n2. Security group เป็น Inventory-App? (ข้อ 44)\n3. IAM role เป็น Inventory-App-Role? (ข้อ 47)\n4. รอ 5-10 นาที (health check interval=30s + grace period=300s)" },
      { problem: "Targets เป็น unhealthy แบบ 'Health checks failed with these codes: [502]'", cause: "Security Group ใน launch template (ข้อ 44) ผิด หรือ IAM role (ข้อ 47) ผิด ทำให้ app ไม่สามารถ connect database ได้", fix: "เช็ค Launch template: SG=Inventory-App? (ข้อ 44) | IAM=Inventory-App-Role? (ข้อ 47) | ถ้าผิด → แก้ launch template → delete ASG → สร้างใหม่" }
    ]},
    { num: 78, task: "Task 4", desc: "กลับไปที่ tab Inventory Application ใน browser", errors: [
      { problem: "ปิด tab Inventory Application ไปแล้ว", cause: "ปิด browser tab ที่เปิดจากข้อ 33", fix: "ไปที่ Load Balancers → เลือก Inventory-LB → copy DNS name → เปิด browser tab ใหม่ paste URL" }
    ]},
    { num: 79, task: "Task 4", desc: "Refresh หน้า web app หลายๆ ครั้ง — จะเห็น instance ID และ AZ เปลี่ยนสลับไปมา", errors: [
      { problem: "หน้า web app ไม่แสดง หรือ error", cause: "Instances ยัง unhealthy / ALB ยังไม่ route traffic ไป instances ใหม่", fix: "รอให้ข้อ 77 healthy ก่อน → refresh อีกครั้ง | ถ้ายังไม่ได้ เช็ค ALB DNS ว่าถูกต้อง" },
      { problem: "Instance ID ไม่เปลี่ยนเลย แสดงแค่ตัวเดียว", cause: "อาจมี instance healthy แค่ตัวเดียว หรือ browser cache", fix: "Hard refresh (Ctrl+Shift+R) | เช็ค Target Group ว่ามี healthy targets 2 ตัว" },
      { problem: "Instance ID เปลี่ยนแต่ AZ เป็นอันเดียวตลอด ไม่สลับ", cause: "ตอนสร้าง ASG (ข้อ 54) อาจเลือก Private Subnet แค่อันเดียว (ไม่ได้เลือกทั้ง 2 AZ)", fix: "ไปที่ ASG → Inventory-ASG → Details → Network → Edit → ตรวจว่าเลือก Private Subnet 1 + Private Subnet 2 ทั้งคู่" }
    ]},
    { num: 80, task: "Task 5", desc: "กลับไปที่ EC2 Management Console (อย่าปิด tab web app)", errors: [] },
    { num: 81, task: "Task 5", desc: "ที่เมนูด้านซ้าย เลือก Instances", errors: [] },
    { num: 82, task: "Task 5", desc: "เลือก (ติ๊ก) หนึ่งใน Inventory-App instances (เลือกอันไหนก็ได้)", errors: [] },
    { num: 83, task: "Task 5", desc: "กด Instance State → Terminate (delete) instance", errors: [] },
    { num: 84, task: "Task 5", desc: "กด Terminate (delete) ยืนยัน", errors: [
      { problem: "กด Terminate ผิดตัว (terminate AppServer แทน Inventory-App instance)", cause: "AppServer ยัง Running อยู่ถ้ายังไม่ได้ deregister → ถ้า terminate ไปจะหายถาวร", fix: "ข้อนี้ให้ terminate Inventory-App instance (ไม่ใช่ AppServer!) — ดูชื่อใน Name column ให้ดีก่อนกด" },
      { problem: "Terminate ทั้ง 2 Inventory-App instances พร้อมกัน", cause: "ติ๊กเลือกทั้ง 2 ตัวแล้ว terminate", fix: "ให้ terminate แค่ 1 ตัว! ถ้า terminate ทั้ง 2 → web app จะ down ชั่วคราว (แต่ ASG จะ launch ใหม่ 2 ตัว)" }
    ]},
    { num: 85, task: "Task 5", desc: "สลับไปที่ tab web app แล้ว refresh หลายครั้ง — app ยังทำงานได้ (AZ ที่แสดงจะเป็นอันเดียว)", errors: [
      { problem: "Web app ไม่แสดงเลย (timeout/error) หลัง terminate", cause: "อาจ terminate ผิดตัว (terminate instance ที่ healthy อยู่ตัวเดียว) หรือ ALB ยังไม่ตัด instance ที่ terminated ออก", fix: "รอ 1-2 นาทีให้ ALB detect ว่า instance terminated แล้ว route ไป instance ที่เหลือ | ถ้ารอแล้วยังไม่ได้ เช็ค Target Group ว่ายังมี healthy target เหลืออยู่" }
    ]},
    { num: 86, task: "Task 5", desc: "กลับไป EC2 Console กด refresh รอจนเห็น Inventory-App instance ใหม่ถูก launch (status=Initializing)", errors: [
      { problem: "ไม่เห็น instance ใหม่ถูก launch", cause: "ASG ยังไม่ detect ว่า instance terminated (ใช้เวลา 1-2 นาที)", fix: "กด refresh ทุก 30 วินาที — ASG จะ launch instance ใหม่อัตโนมัติเพื่อรักษา desired capacity=2" }
    ]},
    { num: 87, task: "Task 5", desc: "กลับไป tab web app refresh หลายครั้ง — จะเห็น instance ID และ AZ สลับกันอีกครั้ง (เมื่อ instance ใหม่ healthy แล้ว)", errors: [] },
    { num: 88, task: "Task 6.1", desc: "ค้นหา Aurora and RDS ใน search bar", errors: [] },
    { num: 89, task: "Task 6.1", desc: "ที่เมนูด้านซ้าย เลือก Databases", errors: [] },
    { num: 90, task: "Task 6.1", desc: "หา row ที่มี inventory-primary แล้วดูคอลัมน์ Region & AZ จด AZ ไว้", errors: [] },
    { num: 91, task: "Task 6.1", desc: "ดู AZ ของ inventory-primary (จะใช้เลือก AZ ที่ต่างกันสำหรับ replica)", errors: [] },
    { num: 92, task: "Task 6.1", desc: "เลือก (ติ๊ก) radio button ของ inventory-cluster", errors: [] },
    { num: 93, task: "Task 6.1", desc: "กด Actions → Add reader", errors: [
      { problem: "ไม่เห็นตัวเลือก Add reader ใน Actions", cause: "เลือก instance แทน cluster — ต้องเลือก row ของ inventory-cluster (ไม่ใช่ inventory-primary)", fix: "กลับไป Databases → เลือก radio ที่ row ของ inventory-cluster (Role=Regional cluster) → Actions → Add reader" },
      { problem: "Add reader เป็นสีเทากดไม่ได้", cause: "inventory-cluster อาจยัง status ไม่ใช่ Available หรือกำลัง modify อยู่", fix: "รอจน inventory-cluster status=Available แล้วลองใหม่ | กด refresh ทุก 30 วินาที" }
    ]},
    { num: 94, task: "Task 6.1", desc: "ในส่วน Settings ใส่ DB instance identifier=inventory-replica", errors: [] },
    { num: 95, task: "Task 6.1", desc: "ในส่วน Connectivity เลือก Availability Zone ที่ต่างจาก inventory-primary (ที่จดไว้ข้อ 91)", errors: [
      { problem: "ไม่รู้ว่าต้องเลือก Availability Zone อันไหน", cause: "ข้อนี้กำลังสร้าง replica ประเด็นคือ replica ต้องอยู่คนละ AZ กับ primary ไม่ใช่ AZ เดียวกัน ถ้าอยู่ AZ เดียวกัน AZ นั้นล่มก็ล่มทั้งคู่ ผิดวัตถุประสงค์ของ High Availability", fix: "ดู AZ ของ inventory-primary ที่จดไว้ก่อน (ข้อ 90 กับ ข้อ 91) แล้วเลือก AZ อีกอันที่ตรงข้ามกัน\nถ้า primary อยู่โซน a ให้เลือกโซน b (เช่น primary = us-west-2a → replica เลือก us-west-2b)\nอย่ากดผ่านโดยปล่อยค่า default เพราะ default อาจตรงกับ AZ ของ primary" },
      { problem: "เลือก AZ เดียวกับ inventory-primary", cause: "สำหรับ high availability ต้องเลือก AZ ที่ต่างกัน — ดูค่าที่จดไว้จากข้อ 91 แล้วเลือกอีกอันหนึ่ง", fix: "เปลี่ยนเป็น AZ อื่นที่ไม่ใช่ AZ เดียวกับ inventory-primary" },
      { problem: "ลืมจด AZ ของ inventory-primary จากข้อ 91 ไม่รู้จะเลือก AZ ไหน", cause: "ข้อ 90-91 ให้จด AZ ไว้เพื่อใช้ตอนนี้ — ถ้าลืมจดต้องย้อนกลับไปดู", fix: "ย้อนไป RDS → Databases → ดูคอลัมน์ Region & AZ ของ inventory-primary → แล้วเลือก AZ ที่ต่างจากนั้น" },
      { problem: "ไม่เห็น Availability Zone dropdown ให้เลือก", cause: "ต้อง scroll ลงไปหาส่วน Connectivity — dropdown AZ อาจอยู่ด้านล่าง", fix: "Scroll ลงในส่วน Connectivity → จะเห็น Availability Zone dropdown" }
    ]},
    { num: 96, task: "Task 6.1", desc: "ในส่วน Monitoring ให้เอาติ๊ก Enable Enhanced monitoring ออก", errors: [
      { problem: "ลืมเอาติ๊ก Enhanced monitoring ออก → เจอ error ตอน create", cause: "Lab ไม่มี permission สร้าง monitoring IAM role", fix: "เอาติ๊ก Enable Enhanced monitoring ออก แล้วกด Add reader ใหม่" }
    ]},
    { num: 97, task: "Task 6.1", desc: "Scroll ลงล่างสุดแล้วกด Add reader", errors: [
      { problem: "ผู้เรียนนั่งรอ replica สร้างเสร็จ ไม่ทำ Task 7 ต่อ", cause: "ไม่ใช่ error — replica จะขึ้นสถานะ Creating อยู่พักหนึ่ง แต่ lab ระบุไว้ว่าไปทำข้อถัดไปได้เลยไม่ต้องรอ | ผู้เรียนมักเข้าใจว่าต้องรอให้เสร็จก่อน", fix: "บอกให้ไปทำ Task 7 (NAT gateway ตัวที่สอง) ต่อเลยระหว่างที่ replica กำลังสร้าง (ข้อ 98) แล้วค่อยกลับมาดูสถานะ database ในข้อท้ายๆ\nถ้ามีผู้เรียนหลายคนรออยู่ ประกาศรวมได้เลย ช่วยประหยัดเวลา lab" },
      { problem: "ผู้เรียนถามว่า replica ช่วยอะไร หรือทำไมต้องใช้ writer endpoint ไม่ใช่ reader", cause: "ไม่ใช่ error แต่เป็นคำถามเชิงแนวคิดที่โผล่บ่อย และเกี่ยวกับ bug ที่เจอบ่อยคือ copy endpoint ผิดตัว", fix: "อธิบายสั้นๆ ตามที่ lab เขียนไว้: primary กับ replica ใช้ storage ชุดเดียวกัน แต่**เขียนได้ที่ primary เท่านั้น** | replica มีไว้กระจายภาระการอ่าน (ต่อผ่าน reader endpoint) และเพิ่มความทนทาน — ถ้า writer ล่ม Aurora จะเลื่อน reader ขึ้นมาเป็น writer ให้เอง\nดังนั้นถ้า application ต้องเขียนข้อมูล ต้องใช้ writer endpoint — เอา reader endpoint ไปใส่จะต่อไม่ได้หรือเขียนไม่ได้ ซึ่งเป็นสาเหตุที่เจอบ่อยเวลาแอปหา database ไม่เจอ" },
      { problem: "เจอ error ตอนกด Add reader", cause: "Enhanced monitoring ยังติ๊กอยู่ (ข้อ 96) / AZ ไม่ถูก / identifier ซ้ำ", fix: "เช็ค: Enhanced monitoring ออกแล้ว? | DB identifier ไม่ซ้ำ? | AZ ต่างจาก primary?" }
    ]},
    { num: 98, task: "Task 7.1", desc: "ค้นหา VPC ใน search bar", errors: [] },
    { num: 99, task: "Task 7.1", desc: "ที่เมนูด้านซ้าย เลือก NAT gateways", errors: [] },
    { num: 100, task: "Task 7.1", desc: "กด Create NAT gateway ตั้ง: Name=my-nat-gateway, Availability mode=Zonal, Subnet=Public Subnet 2", errors: [
      { problem: "เลือก Subnet ผิดเป็น Private Subnet 2 แทน Public Subnet 2", cause: "NAT Gateway ต้องอยู่ใน Public Subnet เสมอ (เหมือน Lab 2)", fix: "ต้องเลือก Public Subnet 2 — NAT ต้องอยู่ใน public subnet เพื่อ route ผ่าน IGW ไปออก internet" },
      { problem: "เลือก Public Subnet 1 แทน Public Subnet 2", cause: "Lab มี NAT อยู่แล้วใน Public Subnet 1 — ข้อนี้สร้าง NAT ตัวที่ 2 ใน AZ 2 เพื่อ HA", fix: "เลือก Public Subnet 2 เพื่อให้ NAT อยู่คนละ AZ กับตัวเดิม" },
      { problem: "ลืมเลือก Availability mode=Zonal (ปล่อยเป็น Regional)", cause: "Lab ต้องการ Zonal NAT เพื่อ demonstration HA — ถ้าเลือก Regional จะสร้าง NAT ที่ span หลาย AZ ซึ่งแพงกว่า", fix: "เลือก Connectivity type=Public, Availability mode=Zonal แล้วเลือก AZ ของ Public Subnet 2" }
    ]},
    { num: 101, task: "Task 7.1", desc: "กด Allocate Elastic IP", errors: [] },
    { num: 102, task: "Task 7.1", desc: "กด Create NAT gateway จะเห็น success message", errors: [] },
    { num: 103, task: "Task 7.2", desc: "ที่เมนูด้านซ้าย เลือก Route tables", errors: [] },
    { num: 104, task: "Task 7.2", desc: "กด Create route table ตั้ง: Name=Private Route Table 2, VPC=Lab VPC", errors: [
      { problem: "เลือก VPC ผิด (default VPC แทน Lab VPC)", cause: "VPC dropdown จะ default เป็น VPC แรกในลิสต์ ซึ่งอาจไม่ใช่ Lab VPC", fix: "ต้องเลือก Lab VPC ก่อนกด Create | ถ้าสร้างผิด VPC → delete route table แล้วสร้างใหม่" }
    ]},
    { num: 105, task: "Task 7.2", desc: "กด Create route table จะเห็น success message", errors: [] },
    { num: 106, task: "Task 7.2", desc: "กด Edit routes", errors: [] },
    { num: 107, task: "Task 7.2", desc: "กด Add route ใส่: Destination=0.0.0.0/0, Target=NAT Gateway → เลือก my-nat-gateway", errors: [
      { problem: "ไม่เห็น my-nat-gateway ใน dropdown", cause: "NAT Gateway ยังอยู่ state Pending หรือ route table อยู่คนละ VPC", fix: "รอให้ NAT state=Available (1-2 นาที) แล้ว refresh | ตรวจว่า route table สร้างใน Lab VPC" },
      { problem: "เลือก NAT ผิดตัว (เลือกตัวเดิมที่อยู่ใน Public Subnet 1)", cause: "Lab มี NAT 2 ตัว — ตัวใหม่ชื่อ my-nat-gateway", fix: "เลือก my-nat-gateway (ไม่ใช่ NAT ตัวเดิมที่ไม่มีชื่อ)" }
    ]},
    { num: 108, task: "Task 7.2", desc: "กด Save changes", errors: [] },
    { num: 109, task: "Task 7.3", desc: "เลือก tab Subnet associations", errors: [] },
    { num: 110, task: "Task 7.3", desc: "กด Edit subnet associations", errors: [] },
    { num: 111, task: "Task 7.3", desc: "เลือก (ติ๊ก) Private Subnet 2 แล้วกด Save associations", errors: [
      { problem: "ติ๊ก subnet ผิดตัว", cause: "ต้องเลือก Private Subnet 2 เท่านั้น (ไม่ใช่ Private Subnet 1 หรือ Public Subnet)", fix: "Private Route Table 2 ใช้กับ Private Subnet 2 | Private Subnet 1 ใช้ route table เดิมที่ชี้ไป NAT ตัวแรก" }
    ]},
    { num: 112, task: "Task 7.3", desc: "กด Save associations จะเห็น success message", errors: [] },
    { num: 113, task: "Task 8", desc: "ค้นหา Aurora and RDS ใน search bar", errors: [] },
    { num: 114, task: "Task 8", desc: "ที่เมนูด้านซ้าย เลือก Databases", errors: [] },
    { num: 115, task: "Task 8", desc: "ตรวจว่า inventory-replica มี status=Available ก่อนทำต่อ", errors: [
      { problem: "inventory-replica ยัง status=Creating", cause: "Aurora Replica ใช้เวลา 5-10 นาทีในการสร้าง", fix: "รอจน status เปลี่ยนเป็น Available — กด refresh ทุก 30 วินาที" },
      { problem: "inventory-replica status เป็น Failed", cause: "Enhanced monitoring ยังเปิดอยู่ (ข้อ 96) / AZ ไม่ valid / subnet group ผิด", fix: "Delete replica → ย้อนกลับข้อ 92-97 สร้างใหม่ ตรวจว่า Enhanced monitoring ปิดแล้ว" }
    ]},
    { num: 116, task: "Task 8", desc: "เลือก radio button ของ inventory-primary DB instance", errors: [] },
    { num: 117, task: "Task 8", desc: "กด Actions → Failover", errors: [
      { problem: "ไม่เห็น Failover ใน Actions menu", cause: "เลือก instance เดี่ยว — ต้องมี replica อยู่ในcluster ก่อนถึงจะ failover ได้ | หรือ replica ยัง Creating (ข้อ 115)", fix: "ตรวจว่า inventory-replica status=Available ก่อน | เลือก inventory-primary (Role=Writer) แล้วกด Actions" },
      { problem: "Failover ใน Actions เป็นสีเทากดไม่ได้", cause: "ต้องเลือก radio button ของ inventory-primary (Writer instance) ไม่ใช่ cluster และ replica ต้อง Available แล้ว", fix: "ตรวจว่า: 1) inventory-replica status=Available 2) เลือก radio ของ inventory-primary (ไม่ใช่ inventory-cluster) → Actions → Failover" },
      { problem: "กด Failover แล้วเจอ error 'Failover is not available'", cause: "Replica ยังไม่พร้อมรับ failover — อาจยังอยู่ระหว่าง syncing data", fix: "รอ 2-3 นาทีหลังจาก replica เป็น Available แล้วลอง Failover อีกครั้ง" }
    ]},
    { num: 118, task: "Task 8", desc: "ที่หน้า Failover DB Cluster กด Failover ยืนยัน", errors: [] },
    { num: 119, task: "Task 8", desc: "ที่เมนูด้านซ้าย เลือก Events แล้วดู logs ของ failover", errors: [
      { problem: "หลัง failover เห็น inventory-replica กลายเป็น Writer และ inventory-primary กลายเป็น Reader — คิดว่าพังหรือทำผิด", cause: "ไม่ใช่ error — นี่คือหลักฐานว่า failover ทำงานสำเร็จ | failover คือการสลับบทบาท ตัวที่เคยเป็น reader ถูกเลื่อนขึ้นเป็น writer ส่วนตัวเดิมถูก reboot แล้วกลายเป็น reader | ชื่อ inventory-primary เป็นแค่ชื่อ ไม่ได้แปลว่าต้องเป็น writer ตลอด", fix: "อธิบายว่าให้ดูคอลัมน์ Role ไม่ใช่ดูชื่อ — ตอนนี้ Role ของทั้งคู่สลับกันแล้วถือว่าถูกต้อง\nลำดับใน Events ที่ควรเห็น: read replica ถูก shutdown → เลื่อนขึ้นเป็น writer → reboot → แล้ว inventory-primary ถูก reboot ตามมา\nเว็บ application ต้องยังใช้งานได้ปกติหลัง failover เพราะต่อผ่าน endpoint ของ cluster ไม่ได้ผูกกับ instance ตัวใดตัวหนึ่ง — ถ้าเว็บยังใช้ได้ก็คือผ่านข้อนี้แล้ว" }
    ]},
    { num: 120, task: "Task 8", desc: "ดู Events — จะเห็น Read replica shutdown → promoted to writer → primary rebooted", errors: [
      { problem: "Events ยังไม่แสดง failover logs", cause: "Failover ใช้เวลา 1-3 นาที", fix: "กด refresh ทุก 30 วินาที รอจนเห็น events แสดง | หลัง failover เสร็จ web app จะยังใช้งานได้ปกติ" }
    ]},
    { num: 121, task: "End Lab", desc: "กลับไป AWS Management Console", errors: [] },
    { num: 122, task: "End Lab", desc: "ที่มุมบนขวา กด AWSLabsUser แล้วกด Sign out", errors: [] },
    { num: 123, task: "End Lab", desc: "กด End Lab แล้ว confirm เพื่อจบ lab", errors: [] }
  ]
};
