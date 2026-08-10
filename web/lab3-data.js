const lab3Data = {
  title: "Lab 3 - Create a Database Layer in Your Amazon VPC Infrastructure",
  region: "us-west-2",
  steps: [
    { num: 1, task: "Start Lab", desc: "กด Start Lab ที่หน้า lab", errors: [] },
    { num: 2, task: "Start Lab", desc: "กด Open Console เพื่อเปิด AWS Management Console", errors: [
      { problem: "เจอหน้า 'You must first sign out'", cause: "Browser มี session ของ AWS account อื่นค้างอยู่", fix: "กด 'click here' เพื่อ logout → ปิด tab Sign In → กลับมาที่หน้า lab → กด Open Console ใหม่ | หรือใช้ Incognito window" }
    ]},
    { num: 3, task: "Task 1", desc: "ค้นหา Aurora and RDS ใน search bar ของ console", errors: [] },
    { num: 4, task: "Task 1", desc: "ที่เมนูด้านซ้าย เลือก Databases", errors: [] },
    { num: 5, task: "Task 1", desc: "กด Create database แล้วเลือก Full configuration", errors: [] },
    { num: 6, task: "Task 1", desc: "ในส่วน Engine options เลือก Engine type=Aurora (MySQL Compatible)", errors: [
      { problem: "ไม่เห็น Aurora ใน Engine type list", cause: "อาจเลือก Easy create แทน Full configuration ที่ข้อ 5", fix: "ย้อนกลับไปเลือก Full configuration ก่อน แล้ว Engine options จะแสดงครบ" },
      { problem: "เลือก Engine ผิด เช่น MySQL หรือ PostgreSQL (ไม่ใช่ Aurora)", cause: "ถ้าเลือก MySQL ธรรมดา options ถัดไปจะต่างกันหมด (DB subnet group, parameter group, instance class) ทำให้ค่าที่ lab บอกไม่ตรง", fix: "ต้องเลือก Aurora (MySQL Compatible) เท่านั้น — ถ้าเลือกผิดไปแล้วให้ยกเลิกแล้วเริ่ม Create database ใหม่ เพราะจะส่งผลต่อ ข้อ 8 (instance class), ข้อ 11 (subnet group), ข้อ 14 (parameter group) ทั้งหมด" }
    ]},
    { num: 7, task: "Task 1", desc: "ในส่วน Templates เลือก Dev/Test", errors: [] },
    { num: 8, task: "Task 1", desc: "ในส่วน Cluster scalability type เลือก Provisioned แล้วตั้งค่า: Type of provisioned configuration=Burstable classes (includes t classes), Instance type=db.t3.medium", errors: [
      { problem: "ไม่เห็น db.t3.medium ใน dropdown", cause: "ไม่ได้เลือก Burstable classes (includes t classes) — ถ้าเลือก Standard classes จะเห็นแต่ db.m5, db.r5", fix: "เปลี่ยน Type of provisioned configuration เป็น Burstable classes (includes t classes) แล้ว db.t3.medium จะปรากฏ" }
    ]},
    { num: 9, task: "Task 1", desc: "ในส่วน Settings ตั้งค่า: DB cluster identifier=aurora, Master username=dbadmin, Credentials management=Self managed, Master password=LabPassword (ดูจากด้านซ้ายของหน้า lab)", errors: [
      { problem: "เจอ error 'Master password does not meet requirements'", cause: "ใส่ password ที่ไม่ตรงกับ LabPassword ที่ lab กำหนด หรือพิมพ์ผิด", fix: "ดูค่า LabPassword จากด้านซ้ายของหน้า lab instruction แล้ว copy มาวาง | Confirm password ต้องตรงกัน" },
      { problem: "Confirm master password ไม่ตรง / password mismatch", cause: "Copy มาแล้วมี space ติดท้าย หรือพิมพ์ confirm ไม่ตรงกับช่องแรก", fix: "ลบทั้ง 2 ช่อง แล้ว copy LabPassword ใหม่โดย double-click เลือกคำ (ไม่ต้อง drag) จะไม่ติด space | paste ทั้ง 2 ช่องเหมือนกัน" },
      { problem: "DB cluster identifier error 'already exists'", cause: "มี cluster ชื่อ aurora อยู่แล้ว (อาจจากการลองสร้างก่อนหน้า)", fix: "ไปที่ Databases → ถ้ามี aurora ที่ status=Failed ให้ delete ก่อน แล้วสร้างใหม่ | หรือใช้ชื่ออื่น เช่น aurora-1" }
    ]},
    { num: 10, task: "Task 1", desc: "ในส่วน Availability & durability สำหรับ Multi-AZ deployment เลือก Don't create an Aurora Replica", errors: [] },
    { num: 11, task: "Task 1", desc: "ในส่วน Connectivity ตั้งค่า: Virtual private cloud (VPC)=LabVPC, DB subnet group=labdbsubnetgroup, Public access=No, VPC security group=Choose existing → ลบ default SG ออก → เลือก LabDBSecurityGroup", errors: [
      { problem: "หา LabVPC ไม่เจอใน dropdown", cause: "Region ผิด — lab ใช้ region ที่ถูกกำหนดไว้", fix: "ดู Region มุมบนขวาของ console ว่าตรงกับที่ lab กำหนด (อย่าเปลี่ยน region)" },
      { problem: "หา labdbsubnetgroup ไม่เจอ", cause: "เลือก VPC ผิด หรือ subnet group ยังไม่ถูกสร้างโดย lab (provisioning ไม่เสร็จ)", fix: "ตรวจว่าเลือก VPC=LabVPC ก่อน แล้ว DB subnet group จะปรากฏ | ถ้ายังไม่เห็น รอให้ lab provisioning เสร็จ (ดูสถานะ lab ด้านบน)" },
      { problem: "หา LabDBSecurityGroup ไม่เจอ", cause: "ยังไม่ได้ลบ default security group ออก หรือเลือก VPC ผิด", fix: "กด X ที่ default security group เพื่อลบออกก่อน → แล้วพิมพ์ LabDBSecurityGroup ใน dropdown จะเจอ" }
    ]},
    { num: 12, task: "Task 1", desc: "ในส่วน Monitoring ให้เอาติ๊ก Enable Enhanced monitoring ออก", errors: [
      { problem: "ลืมเอาติ๊ก Enhanced monitoring ออก", cause: "ถ้าปล่อยไว้จะเจอ error ตอน create เพราะ lab ไม่มี permission สร้าง monitoring role", fix: "ย้อนกลับมา scroll ลงไปที่ Monitoring → เอาติ๊ก Enable Enhanced monitoring ออก" }
    ]},
    { num: 13, task: "Task 1", desc: "Expand ส่วน Additional configuration ที่ด้านล่างของหน้า", errors: [] },
    { num: 14, task: "Task 1", desc: "ในส่วน Database options ตั้งค่า: Initial database name=inventory, DB cluster parameter group เลือกค่าที่ตรงกับ DBClusterParameterGroup จากด้านซ้ายของหน้า lab", errors: [
      { problem: "เจอ error ตอน create database เรื่อง parameter group", cause: "เลือก DB cluster parameter group ผิด — ต้องเลือกค่าที่ตรงกับที่แสดงอยู่ด้านซ้ายของ lab instruction", fix: "ดูค่า DBClusterParameterGroup จากด้านซ้ายของหน้า lab แล้วเลือกค่าที่ตรงกันใน dropdown (จะเป็นชื่อยาวๆ ที่ขึ้นต้นด้วย labstack-...)" },
      { problem: "ไม่เห็น DB cluster parameter group ที่ต้องการใน dropdown", cause: "ข้อ 6 เลือก Engine type ผิด (ไม่ใช่ Aurora MySQL Compatible) → parameter group จะไม่ตรงกัน", fix: "ย้อนกลับไปเช็คข้อ 6 ว่าเลือก Aurora (MySQL Compatible) — ถ้าเลือก engine อื่น parameter group จะเป็นคนละชุดกัน ต้องยกเลิกแล้วเริ่ม create database ใหม่" },
      { problem: "ลืมใส่ Initial database name", cause: "ถ้าไม่ใส่ database name จะไม่มี database ชื่อ inventory → ตอน Task 4 เชื่อมต่อจะไม่เจอ database", fix: "ใส่ Initial database name=inventory ก่อนกด Create" }
    ]},
    { num: 15, task: "Task 1", desc: "ในส่วน Maintenance ให้เอาติ๊ก Enable auto minor version upgrade ออก", errors: [] },
    { num: 16, task: "Task 1", desc: "Scroll ลงล่างสุดแล้วกด Create database", errors: [
      { problem: "เจอ error ตอนกด Create database", cause: "หลายสาเหตุ: Enhanced monitoring ยังติ๊กอยู่ / parameter group ผิด / SG ผิด / password ไม่ตรง", fix: "อ่าน error message ที่ขึ้น แล้วเช็ค:\n1. Enhanced monitoring เอาติ๊กออกแล้ว? (ข้อ 12)\n2. DB cluster parameter group ถูกต้อง? (ข้อ 14)\n3. Security group เป็น LabDBSecurityGroup? (ข้อ 11)\n4. Password ตรงกับ LabPassword? (ข้อ 9)" }
    ]},
    { num: 17, task: "Task 1", desc: "ที่ Suggested add-ons for aurora pop-up กด Close", errors: [] },
    { num: 18, task: "Task 2.1", desc: "ค้นหา EC2 ใน search bar", errors: [] },
    { num: 19, task: "Task 2.1", desc: "ที่เมนูด้านซ้าย expand Load Balancing แล้วเลือก Target Groups", errors: [] },
    { num: 20, task: "Task 2.1", desc: "กด Create target group", errors: [] },
    { num: 21, task: "Task 2.1", desc: "ในส่วน Settings ตั้งค่า: Choose a target type=Instances, Target group name=ALBTargetGroup, VPC=LabVPC", errors: [
      { problem: "หา LabVPC ไม่เจอใน VPC dropdown", cause: "Region ผิด หรือ lab provisioning ยังไม่เสร็จ", fix: "เช็ค Region ที่มุมบนขวา ต้องตรงกับที่ lab กำหนด" },
      { problem: "Target group name ไม่ถูกต้อง", cause: "ชื่อ target group มีข้อจำกัด เช่น ห้ามมี space หรืออักษรพิเศษ", fix: "ใส่ ALBTargetGroup (ไม่มี space, ไม่มีขีด)" }
    ]},
    { num: 22, task: "Task 2.1", desc: "กด Next", errors: [] },
    { num: 23, task: "Task 2.1", desc: "ในส่วน Available instances เลือก (ติ๊ก) AppServer1 และ AppServer2 แล้วกด Include as pending below", errors: [
      { problem: "ไม่เห็น AppServer1 หรือ AppServer2 ในลิสต์", cause: "Lab provisioning ยังไม่เสร็จ หรือ EC2 instances ยังไม่ Running", fix: "รอให้ lab provisioning เสร็จ (ดูสถานะด้านบนของ lab) | ไปที่ EC2 Instances ตรวจว่า AppServer1 และ AppServer2 มี state=Running" },
      { problem: "ลืมกด Include as pending below", cause: "ถ้าแค่ติ๊กแล้วกด Next โดยไม่กด Include จะไม่มี targets ใน group", fix: "ต้องกดปุ่ม Include as pending below ก่อน → จะเห็น instances ย้ายไปอยู่ใน Targets section ด้านล่าง → แล้วค่อยกด Next" },
      { problem: "เลือก instance ผิดตัว (เลือก instance อื่นที่ไม่ใช่ AppServer)", cause: "อาจมี instance อื่น (เช่น NAT instance) อยู่ในลิสต์ด้วย", fix: "ดูชื่อในคอลัมน์ Name ให้ดี — ต้องเลือกเฉพาะ AppServer1 + AppServer2" }
    ]},
    { num: 24, task: "Task 2.1", desc: "กด Next", errors: [] },
    { num: 25, task: "Task 2.1", desc: "กด Create target group จะเห็น success message", errors: [] },
    { num: 26, task: "Task 2.2", desc: "ที่เมนูด้านซ้าย ในส่วน Load Balancing เลือก Load Balancers", errors: [] },
    { num: 27, task: "Task 2.2", desc: "กด Create load balancer", errors: [] },
    { num: 28, task: "Task 2.2", desc: "ในส่วน Load balancer types ที่ Application Load Balancer กด Create", errors: [] },
    { num: 29, task: "Task 2.2", desc: "ในส่วน Basic configuration ตั้ง Load balancer name=LabAppALB", errors: [] },
    { num: 30, task: "Task 2.2", desc: "ในส่วน Network mapping ตั้งค่า: VPC=LabVPC, เลือก AZ แรก=PublicSubnet1, เลือก AZ ที่สอง=PublicSubnet2", errors: [
      { problem: "ไม่เห็น PublicSubnet1 หรือ PublicSubnet2 ใน Subnet dropdown", cause: "ยังไม่ได้เลือก VPC=LabVPC ข้างบน หรือ ต้องติ๊ก checkbox ของ AZ ก่อนถึงจะเห็น subnet dropdown", fix: "เลือก VPC=LabVPC ก่อน → ติ๊ก checkbox ของ AZ ทั้ง 2 อัน → จะเห็น dropdown ให้เลือก subnet" },
      { problem: "เลือก Private Subnet แทน Public Subnet", cause: "ALB ต้องอยู่ใน Public Subnet เพราะรับ traffic จาก internet", fix: "เปลี่ยนเป็น PublicSubnet1 และ PublicSubnet2 (ไม่ใช่ Private)" }
    ]},
    { num: 31, task: "Task 2.2", desc: "ในส่วน Security groups ลบ default SG ออก (กด X) แล้วเลือก LabALBSecurityGroup", errors: [
      { problem: "หา LabALBSecurityGroup ไม่เจอ", cause: "ยังไม่ได้ลบ default SG ออก หรือ VPC เลือกผิด", fix: "กด X ที่ default security group ก่อน → แล้วพิมพ์หรือเลือก LabALBSecurityGroup จาก dropdown" },
      { problem: "ลืมลบ default SG ออก ปล่อยไว้ทั้ง 2 อัน", cause: "ถ้ามี default SG อยู่ด้วย ALB อาจรับ traffic ผิด port หรือผิด source", fix: "กลับมาที่ Load Balancer → เลือก LabAppALB → Actions → Edit security groups → ลบ default ออก เหลือแค่ LabALBSecurityGroup" }
    ]},
    { num: 32, task: "Task 2.2", desc: "ในส่วน Listeners and routing ที่ Listener HTTP:80 ตรง Default action เลือก Target group=ALBTargetGroup", errors: [
      { problem: "ไม่เห็น ALBTargetGroup ใน dropdown", cause: "ข้อ 25 สร้าง Target Group ไม่สำเร็จ หรือชื่อผิด", fix: "ตรวจว่าสร้าง target group ชื่อ ALBTargetGroup สำเร็จแล้ว (ข้อ 25) | ถ้าไม่เห็น → ลอง refresh หน้า หรือย้อนไปสร้าง target group ใหม่" }
    ]},
    { num: 33, task: "Task 2.2", desc: "กด Create load balancer จะเห็น success message", errors: [
      { problem: "เจอ error ตอนกด Create load balancer", cause: "ต้องเลือก subnet อย่างน้อย 2 AZ / Security group ไม่ถูกต้อง / Target group ไม่ถูกเลือก", fix: "เช็ค:\n1. เลือก subnet ครบ 2 AZ? (ข้อ 30)\n2. Security group เป็น LabALBSecurityGroup? (ข้อ 31)\n3. Listener มี target group? (ข้อ 32)" }
    ]},
    { num: 34, task: "Task 3", desc: "ค้นหา Aurora and RDS ใน search bar", errors: [] },
    { num: 35, task: "Task 3", desc: "ที่เมนูด้านซ้าย เลือก Databases", errors: [] },
    { num: 36, task: "Task 3", desc: "กด link ของ cluster ชื่อ aurora", errors: [] },
    { num: 37, task: "Task 3", desc: "เลือก tab Connectivity & security แล้วดู Endpoints → copy ค่า Endpoint name ของ writer instance ไว้ใน notepad", errors: [
      { problem: "Endpoint ยังไม่แสดง หรือ status ไม่ใช่ Available", cause: "Database ยังสร้างไม่เสร็จ (ใช้เวลา 3-5 นาที)", fix: "รอจน Status ของ aurora DB instance เปลี่ยนเป็น Available (กด refresh) — อาจใช้เวลาถึง 5 นาที" },
      { problem: "ไม่แน่ใจว่า copy endpoint ไหน (มีหลายอัน)", cause: "Aurora cluster มีทั้ง writer endpoint และ reader endpoint", fix: "ต้อง copy writer instance endpoint (type=Writer) ไม่ใช่ reader — จะมีรูปแบบคล้าย aurora.cluster-xxxxx.us-west-2.rds.amazonaws.com" },
      { problem: "DB status เป็น Failed หรือ Error", cause: "ตอนสร้าง DB ตั้งค่าบางอย่างผิด เช่น Enhanced monitoring ยังติ๊ก (ข้อ 12), parameter group ผิด (ข้อ 14), password ไม่ถูก (ข้อ 9)", fix: "ต้อง delete cluster ที่ Failed แล้วสร้างใหม่ โดยกลับไปเช็คข้อ 9-16 ให้ครบ" }
    ]},
    { num: 38, task: "Task 3", desc: "Copy Endpoint name ของ writer instance เก็บไว้ (จะใช้ตอน Task 4)", errors: [] },
    { num: 39, task: "Task 3", desc: "ดู tab Configuration สำหรับรายละเอียดการตั้งค่า", errors: [] },
    { num: 40, task: "Task 3", desc: "ดู tab Monitoring สำหรับ metrics ต่างๆ", errors: [] },
    { num: 41, task: "Task 4", desc: "ค้นหา EC2 ใน search bar", errors: [] },
    { num: 42, task: "Task 4", desc: "ที่เมนูด้านซ้าย เลือก Target Groups", errors: [] },
    { num: 43, task: "Task 4", desc: "เลือก (ติ๊ก) ALBTargetGroup", errors: [] },
    { num: 44, task: "Task 4", desc: "ดู tab Targets รอจน instance status เป็น healthy", errors: [
      { problem: "Target status เป็น unhealthy", cause: "EC2 instances (AppServer1/AppServer2) ยังไม่ pass health check — web app อาจยังไม่พร้อม", fix: "รอ 2-3 นาทีให้ health check ผ่าน (ALB check ทุก 30 วินาที) | ถ้านานเกินไปเช็ค: instance running? Security Group ถูกต้อง? | ถ้า lab เพิ่ง start ใหม่ AppServer อาจยังไม่ boot เสร็จ ลองรอ 5 นาที" },
      { problem: "Target status เป็น unused หรือ draining", cause: "Instances ไม่ได้ถูก register ใน target group", fix: "ย้อนไปข้อ 23 ตรวจว่ากด Include as pending below แล้ว | หรือไปที่ Target Group → Register targets → เพิ่ม AppServer1 + AppServer2" },
      { problem: "รอนานมากแล้วยัง unhealthy", cause: "AppServer ยังไม่ได้ start web application (lab provisioning ช้า)", fix: "ไปดู EC2 Instances ว่า AppServer1/AppServer2 มี Status check 2/2 passed | ถ้า passed แล้วยัง unhealthy → เช็คว่า Security Group ของ instance อนุญาต traffic จาก ALB security group เข้า port 80" }
    ]},
    { num: 45, task: "Task 4", desc: "ที่เมนูด้านซ้าย เลือก Load Balancers", errors: [] },
    { num: 46, task: "Task 4", desc: "กด link LabAppALB", errors: [] },
    { num: 47, task: "Task 4", desc: "Copy DNS name ของ Load Balancer แล้ววางใน browser tab ใหม่", errors: [
      { problem: "Web page ไม่แสดง (timeout หรือ error)", cause: "ALB ยังอยู่ state Provisioning / Target ยัง unhealthy / Security Group ไม่ถูกต้อง", fix: "เช็คตามลำดับ:\n1. ALB state เป็น Active? (รอ 2-3 นาทีหลัง create)\n2. Target Group status เป็น healthy? (ข้อ 44)\n3. Security Group เป็น LabALBSecurityGroup? (ข้อ 31)\n4. Listener ชี้ไป ALBTargetGroup? (ข้อ 32)\n5. ใช้ http:// ไม่ใช่ https://?" },
      { problem: "เจอ 503 Service Unavailable", cause: "Target Group ยังไม่มี healthy targets", fix: "รอให้ targets เป็น healthy (ข้อ 44) — ถ้ารอนานแล้วยัง unhealthy ให้เช็คว่า instances running + port 80 เปิดอยู่" },
      { problem: "ERR_SSL_PROTOCOL_ERROR หรือ SSL error", cause: "ใช้ https:// แทน http://", fix: "เปลี่ยน URL เป็น http:// (ไม่มี s) เพราะ ALB listener เป็น HTTP:80 เท่านั้น" },
      { problem: "DNS name copy มาไม่ครบ หรือหน้าขึ้น 'site not found'", cause: "Copy DNS มาไม่ครบ (ตัดท้าย) หรือ copy มี space ติดหน้า", fix: "กลับไปที่ Load Balancers → กด copy icon ข้าง DNS name → paste ใหม่ | ตรวจว่าไม่มี space นำหน้า/ตามหลัง" },
      { problem: "เห็น web page แต่แสดงผิดปกติ หรือ request ช้ามาก", cause: "ลืมลบ default Security Group ออกจาก ALB (ข้อ 31) ทำให้ ALB มี SG 2 ตัว ซึ่งอาจ conflict", fix: "ไปที่ Load Balancers → LabAppALB → Security → Edit → ลบ default SG ออก เหลือแค่ LabALBSecurityGroup" }
    ]},
    { num: 48, task: "Task 4", desc: "ที่ web page ที่เปิดขึ้น กดแท็บ Settings แล้วตั้งค่า: Endpoint=paste writer endpoint ที่ copy ไว้, Database=inventory, Username=dbadmin, Password=LabPassword แล้วกด Save", errors: [
      { problem: "กด Save แล้ว error 'Unable to connect to database'", cause: "Endpoint ผิด / Database name ผิด / Username หรือ Password ผิด / DB ยังไม่ Available", fix: "เช็คตามลำดับ:\n1. Endpoint เป็น writer endpoint ที่ copy มาจากข้อ 37-38? (ไม่ใช่ reader)\n2. Endpoint ไม่มี space ติดหน้า/หลัง? (ลอง delete แล้ว paste ใหม่)\n3. Database ใส่ inventory (ตัวเล็กทั้งหมด)?\n4. Username ใส่ dbadmin?\n5. Password ใส่ LabPassword ที่ดูจากด้านซ้ายของ lab?\n6. RDS status เป็น Available? (ข้อ 37)" },
      { problem: "ไม่เห็น tab Settings ใน web page", cause: "Web page ไม่ถูก load หรือ load ผิดหน้า", fix: "ตรวจว่า URL เป็น DNS name ของ ALB (ไม่ใช่ IP ของ instance) | refresh หน้า" },
      { problem: "กด Save แล้วไม่มี error แต่ก็ไม่มี data แสดง", cause: "เชื่อมต่อได้แต่ database ว่าง (ปกติจะมี initial data) หรือ database name ผิด", fix: "ตรวจว่าใส่ Database=inventory (ตัวเล็ก) ไม่ใช่ Inventory (ตัวใหญ่)" },
      { problem: "Paste endpoint แล้วยาวมาก มี port ต่อท้าย", cause: "Copy มาทั้ง endpoint + port (เช่น :3306) ซึ่งช่อง endpoint ไม่ต้องการ port", fix: "ใส่แค่ hostname เช่น aurora.cluster-xxxxx.us-west-2.rds.amazonaws.com โดยไม่ต้องใส่ :3306" },
      { problem: "กด Save แล้ว error 'Connection timed out' (ไม่ใช่ 'Unable to connect')", cause: "Security Group ของ RDS ไม่ได้เปิด port MySQL 3306 จาก App server — อาจเลือก SG ผิดตอนสร้าง DB (ข้อ 11)", fix: "ไปดู RDS → inventory-cluster → Connectivity & security → VPC security groups → ตรวจว่าเป็น LabDBSecurityGroup ที่มี inbound MySQL:3306 from Inventory-App SG" }
    ]},
    { num: 49, task: "Task 4", desc: "กด Save — application จะเชื่อมต่อกับ database และแสดง inventory data", errors: [] },
    { num: 50, task: "Optional", desc: "กลับไปที่ tab AWS Management Console", errors: [] },
    { num: 51, task: "Optional", desc: "ค้นหา Aurora and RDS ใน search bar", errors: [] },
    { num: 52, task: "Optional", desc: "ที่เมนูด้านซ้าย เลือก Databases", errors: [] },
    { num: 53, task: "Optional", desc: "เลือก (ติ๊ก) aurora instance (ไม่ใช่ cluster)", errors: [] },
    { num: 54, task: "Optional", desc: "กด Actions แล้วเลือก Create cross-Region read replica", errors: [
      { problem: "ไม่เห็นตัวเลือก Create cross-Region read replica ใน Actions menu", cause: "เลือก cluster แทน instance — ต้องเลือก DB instance (row ที่มี Role=Writer) ที่อยู่ใต้ cluster", fix: "กลับไปที่ Databases → ติ๊กที่ aurora instance (ไม่ใช่ row Regional cluster) แล้วกด Actions ใหม่" },
      { problem: "กด Create cross-Region read replica แล้วเจอ error หรือ option ไม่ให้เลือก", cause: "ข้อ 10 อาจเลือก 'Create an Aurora Replica' แทน 'Don't create' ทำให้ cluster มี replica อยู่แล้วและ config ไม่ตรงกับที่ lab ต้องการ", fix: "ถ้าเลือกข้อ 10 ผิดและ DB สร้างไปแล้ว → ต้อง delete cluster แล้วสร้างใหม่โดยเลือก Don't create an Aurora Replica | หรือถ้าเวลาไม่พอ ข้ามข้อ optional นี้ได้" },
      { problem: "RDS status ยังไม่ Available", cause: "ต้องรอให้ DB instance เป็น Available ก่อนถึงจะทำ replica ได้", fix: "รอจน Status เปลี่ยนเป็น Available (อาจใช้เวลา 5+ นาที)" }
    ]},
    { num: 55, task: "Optional", desc: "ในส่วน Connectivity ตั้งค่า: Destination Region=เลือก region ที่ตรงกับ RemoteRegion จากด้านซ้ายของ lab, Virtual private cloud (VPC)=LabVPC, Public access=No, Existing VPC security groups=ลบ default → เลือก LabDBSecurityGroup", errors: [
      { problem: "หา LabVPC หรือ LabDBSecurityGroup ไม่เจอใน destination region", cause: "เลือก Destination Region ผิด — ต้องเลือกให้ตรงกับ RemoteRegion ที่ lab กำหนด", fix: "ดูค่า RemoteRegion จากด้านซ้ายของหน้า lab instruction แล้วเลือกให้ตรง" }
    ]},
    { num: 56, task: "Optional", desc: "ในส่วน Settings ตั้ง DB instance identifier=LabDBReplica", errors: [] },
    { num: 57, task: "Optional", desc: "กด Create จะเห็น success message 'Creating replica LabDBReplica'", errors: [
      { problem: "เจอ error ตอนกด Create", cause: "Source DB ยัง not Available / Region ผิด / SG ผิด", fix: "เช็ค: Source aurora instance status=Available? | Destination Region ตรงกับ RemoteRegion? | Security group เป็น LabDBSecurityGroup?" }
    ]},
    { num: 58, task: "Optional", desc: "กด link 'Click here' เพื่อดู replica ใน destination region", errors: [] },
    { num: 59, task: "End Lab", desc: "กลับไป AWS Management Console", errors: [] },
    { num: 60, task: "End Lab", desc: "ที่มุมบนขวา กด AWSLabsUser แล้วกด Sign out", errors: [] },
    { num: 61, task: "End Lab", desc: "กด End Lab แล้ว confirm เพื่อจบ lab", errors: [] }
  ]
};
