const lab7Data = {
  title: "Lab 7 - Capstone: Build an AWS Multi-Tier Architecture",
  region: "LabRegion (ดูจากด้านซ้ายของ lab)",
  steps: [
    { num: 1, task: "Start Lab", desc: "กด Start Lab ที่หน้า lab", errors: [] },
    { num: 2, task: "Start Lab", desc: "กด Open Console เพื่อเปิด AWS Management Console", errors: [
      { problem: "เจอหน้า 'You must first sign out'", cause: "Browser มี session ของ AWS account อื่นค้างอยู่", fix: "กด 'click here' เพื่อ logout → ปิด tab → กลับ lab page → กด Open Console ใหม่ | หรือใช้ Incognito" },
      { problem: "กด Start Lab แล้วไม่มีอะไรเกิดขึ้น", cause: "Pop-up blocker หรือ script blocker ของ browser บล็อกการทำงาน", fix: "เพิ่ม domain ของ lab ลงใน allow list ของ pop-up/script blocker → refresh หน้า → กด Start Lab ใหม่" }
    ]},
    { num: 3, task: "Task 1.1", desc: "ค้นหา CloudFormation ใน search bar ของ AWS Console", errors: [] },
    { num: 4, task: "Task 1.2", desc: "คลิกขวาที่ link Task1.yaml ใน lab instructions เพื่อ Save/Download template ลงเครื่อง", errors: [] },
    { num: 5, task: "Task 1.2", desc: "เปิดไฟล์ Task1.yaml ที่ download มาใน text editor (Notepad, VS Code — ห้ามใช้ Word)", errors: [] },
    { num: 6, task: "Task 1.2", desc: "Review CloudFormation template — ดูโครงสร้าง Resources, Parameters, Outputs", errors: [] },
    { num: 7, task: "Task 1.2", desc: "คาดการณ์ว่า template จะสร้าง resources อะไรบ้าง (VPC, Subnets, IGW, NAT GW, Route Tables, Security Groups)", errors: [] },
    { num: 8, task: "Task 1.3", desc: "กด Create stack (ถ้าอยู่หน้า Stacks → กด dropdown 'Create stack' → เลือก 'With new resources (standard)')", errors: [] },
    { num: 9, task: "Task 1.3", desc: "เลือก Choose an existing template → Amazon S3 URL → Copy ค่า Task1TemplateUrl จากแผงด้านซ้าย วางในช่อง → กด Next", errors: [
      { problem: "เจอ error 'S3 URL is not valid' หรือ 'Template URL is not reachable'", cause: "Copy URL ไม่ครบ มี space ติดมา หรือ copy ผิดค่า (เช่น copy Task5TemplateUrl แทน Task1TemplateUrl)", fix: "กลับไป copy Task1TemplateUrl ใหม่จากแผงด้านซ้ายของ lab — ตรวจว่าไม่มี space หน้า/หลัง และเป็น URL ที่ขึ้นต้นด้วย https://s3" }
    ]},
    { num: 10, task: "Task 1.3", desc: "ใส่ Stack name = VPCStack → ปล่อย Parameters ทั้งหมดเป็น default → กด Next", errors: [
      { problem: "เจอ error 'Stack name already exists' หรือ 'Stack name must satisfy regular expression'", cause: "ชื่อ stack มี space หรืออักขระพิเศษ หรือมี stack ชื่อนี้อยู่แล้ว", fix: "ใส่ VPCStack (ไม่มี space ไม่มีขีดกลาง) ตรงตัว | ถ้า stack ชื่อนี้มีอยู่แล้วให้ลบ stack เก่าก่อน" }
    ]},
    { num: 11, task: "Task 1.3", desc: "หน้า Configure stack options → ปล่อย default ทั้งหมด → กด Next", errors: [] },
    { num: 12, task: "Task 1.3", desc: "หน้า Review and create → ตรวจ settings → กด Submit", errors: [] },
    { num: 13, task: "Task 1.3", desc: "รอจน Stack status เปลี่ยนเป็น CREATE_COMPLETE (กด refresh เป็นระยะ ใช้เวลา ~5 นาที)", errors: [
      { problem: "Status เป็น CREATE_FAILED หรือ ROLLBACK_COMPLETE", cause: "Template URL ผิด / Parameter ไม่ถูกต้อง / Permission ไม่พอ / Resource limit ของ lab", fix: "กดดู Events tab เพื่อหาสาเหตุ → ถ้า URL ผิดให้ลบ stack แล้วสร้างใหม่ด้วย URL ที่ถูกต้อง | ถ้า permission error ให้ตรวจว่า lab status เป็นสีเขียว" }
    ]},
    { num: 14, task: "Task 1.4", desc: "กดแท็บ Resources เพื่อดู resources ที่ถูกสร้าง (VPC, Subnets, IGW, NAT GW, Route Tables, SGs)", errors: [] },
    { num: 15, task: "Task 1.4", desc: "กดแท็บ Events เพื่อดูลำดับการสร้าง resources และตรวจหา error", errors: [] },
    { num: 16, task: "Task 1.4", desc: "กดแท็บ Outputs → จดค่า key-value pairs ไว้ใช้ภายหลัง (VPC ID, Subnet IDs, Security Group IDs)", errors: [] },
    { num: 17, task: "Task 1.4", desc: "(สรุป Task 1 complete — VPC และ networking resources ถูกสร้างเรียบร้อย)", errors: [] },
    { num: 18, task: "Task 2.1", desc: "ค้นหา Aurora and RDS ใน search bar ของ AWS Console", errors: [] },
    { num: 19, task: "Task 2.2", desc: "ที่เมนูด้านซ้าย เลือก Subnet groups", errors: [] },
    { num: 20, task: "Task 2.2", desc: "กด Create DB subnet group", errors: [] },
    { num: 21, task: "Task 2.2", desc: "ใส่ Name = AuroraSubnetGroup, Description = A 2 AZ subnet group for my database, VPC = LabVPC", errors: [
      { problem: "หา LabVPC ไม่เจอใน dropdown", cause: "Task 1 ยังไม่เสร็จ (VPCStack ยังไม่ CREATE_COMPLETE) หรือเลือก region ผิด", fix: "ตรวจว่า VPCStack status = CREATE_COMPLETE ใน CloudFormation | ตรวจว่าอยู่ถูก region (ดูจากแผงด้านซ้ายของ lab)" }
    ]},
    { num: 22, task: "Task 2.2", desc: "เลือก 2 Availability Zones ที่ DatabaseSubnet1 และ DatabaseSubnet2 อยู่", errors: [
      { problem: "ไม่รู้ว่า DatabaseSubnet อยู่ AZ ไหน", cause: "ต้องไปดูจาก CloudFormation Resources tab ว่า subnet ถูกสร้างใน AZ ไหน", fix: "ไป CloudFormation → VPCStack → Resources tab → หา DatabaseSubnet1 กับ DatabaseSubnet2 → คลิก link ไปดู AZ ใน EC2 Subnets console" }
    ]},
    { num: 23, task: "Task 2.2", desc: "เลือก Subnets: CIDR 10.0.4.0/24 (DatabaseSubnet1) + 10.0.5.0/24 (DatabaseSubnet2)", errors: [
      { problem: "เลือก subnet ผิด (เช่น เลือก AppSubnet 10.0.2.0/24 หรือ PublicSubnet 10.0.0.0/24)", cause: "มี subnet หลายตัวใน dropdown — ต้องเลือกเฉพาะ Database subnet", fix: "ต้องเลือก CIDR 10.0.4.0/24 และ 10.0.5.0/24 เท่านั้น — เหล่านี้คือ Database subnets | subnet อื่นเป็น App หรือ Public ไม่ใช่ Database" }
    ]},
    { num: 24, task: "Task 2.2", desc: "กด Create → เห็น success message 'Successfully created AuroraSubnetGroup'", errors: [] },
    { num: 25, task: "Task 2.3", desc: "ที่เมนูด้านซ้าย เลือก Databases → กด Create database", errors: [] },
    { num: 26, task: "Task 2.3", desc: "เลือก Standard create (Full configuration)", errors: [] },
    { num: 27, task: "Task 2.3", desc: "Engine type = Aurora (MySQL Compatible)", errors: [] },
    { num: 28, task: "Task 2.3", desc: "Templates = Production", errors: [] },
    { num: 29, task: "Task 2.3", desc: "DB cluster identifier = MyDBCluster", errors: [] },
    { num: 30, task: "Task 2.3", desc: "Master username = admin, Credentials management = Self managed, Master password = LabPassword (paste จากแผงด้านซ้าย), Confirm password", errors: [
      { problem: "เจอ error 'password do not match' หรือ password ไม่ผ่าน validation", cause: "Copy password มา มี space ติดหน้า/หลัง หรือ paste ใน confirm field ไม่ตรงกัน", fix: "Copy LabPassword ใหม่จากแผงด้านซ้าย → paste ทั้ง 2 ช่อง (Master password + Confirm) → ตรวจว่าไม่มี space เกิน" }
    ]},
    { num: 31, task: "Task 2.3", desc: "Instance configuration: เลือก Burstable classes (includes t classes) → dropdown เลือก db.t3.medium", errors: [] },
    { num: 32, task: "Task 2.3", desc: "Multi-AZ deployment: เลือก Create an Aurora Replica or Reader node in a different AZ", errors: [] },
    { num: 33, task: "Task 2.3", desc: "Connectivity: VPC = LabVPC", errors: [] },
    { num: 34, task: "Task 2.3", desc: "DB subnet group = aurorasubnetgroup", errors: [] },
    { num: 35, task: "Task 2.3", desc: "Public access = No", errors: [] },
    { num: 36, task: "Task 2.3", desc: "VPC security group = Choose existing → เลือก RDSSecurityGroup (กด X ลบ default security group ออก)", errors: [
      { problem: "หา RDSSecurityGroup ไม่เจอใน dropdown หรือลืมลบ default SG", cause: "Security group ชื่ออาจมี prefix (xxxxx-RDSSecurityGroup-xxxxx) | ถ้าไม่ลบ default SG จะมี 2 SGs ทำให้ rules ไม่ตรง", fix: "พิมพ์ RDS ใน search ของ dropdown จะเจอ xxxxx-RDSSecurityGroup-xxxxx → เลือก → แล้วกด X ที่ default security group เพื่อลบออก" }
    ]},
    { num: 37, task: "Task 2.3", desc: "Connectivity Additional configuration → Database port = ปล่อย default (3306)", errors: [] },
    { num: 38, task: "Task 2.3", desc: "Monitoring section → เอาเครื่องหมายถูกออกจาก Enable Enhanced monitoring", errors: [
      { problem: "ลืมเอาติ๊ก Enhanced monitoring ออก → เจอ error ตอน create 'Failed to turn on enhanced monitoring'", cause: "Lab IAM role ไม่มี permission สำหรับ Enhanced monitoring", fix: "ถ้าเจอ error นี้สามารถ ignore ได้ (database ยังสร้างสำเร็จ) | แต่ถ้าต้องการหลีกเลี่ยง error ให้ scroll หา Monitoring section แล้ว uncheck 'Enable Enhanced monitoring' ก่อนกด Create" }
    ]},
    { num: 39, task: "Task 2.3", desc: "Additional configuration (ส่วนล่างสุด) → Database options → Initial database name = WPDatabase", errors: [
      { problem: "ลืมใส่ Initial database name → WordPress จะ connect ไม่ได้ใน Task 5", cause: "ถ้าไม่ใส่ initial database name จะไม่มี database ถูกสร้างใน cluster → ต้อง create manually ภายหลัง", fix: "ถ้าลืมใส่ตอนสร้าง ต้อง connect เข้า database ด้วย MySQL client แล้วรัน CREATE DATABASE WPDatabase; | หรือลบ cluster แล้วสร้างใหม่ (ใช้เวลานาน)" }
    ]},
    { num: 40, task: "Task 2.3", desc: "Encryption → เลือก AWS owned KMS key (SSE-RDS)", errors: [] },
    { num: 41, task: "Task 2.3", desc: "Maintenance → เอาเครื่องหมายถูกออกจาก Enable auto minor version upgrade", errors: [] },
    { num: 42, task: "Task 2.3", desc: "Deletion protection → เอาเครื่องหมายถูกออกจาก Enable deletion protection", errors: [] },
    { num: 43, task: "Task 2.3", desc: "กด Create database", errors: [
      { problem: "เจอ error ตอน create database (หลายสาเหตุ)", cause: "สาเหตุที่พบบ่อย: 1) Password ไม่ตรง 2) Subnet group ผิด 3) Security group ไม่ถูก 4) Instance class ไม่รองรับ", fix: "ดู error message แล้วแก้ตามสาเหตุ:\n- Password mismatch → ใส่ password ใหม่ทั้ง 2 ช่อง\n- Subnet group error → ตรวจว่าเลือก aurorasubnetgroup\n- SG error → ตรวจว่าเลือก RDSSecurityGroup เท่านั้น\n- Instance class → ต้องเป็น db.t3.medium" }
    ]},
    { num: 44, task: "Task 2.3", desc: "ถ้ามี popup 'Suggested add-ons for mydbcluster' → กด Close", errors: [] },
    { num: 45, task: "Task 2.3", desc: "รอจน mydbcluster status เปลี่ยนเป็น Available (ใช้เวลา ~5 นาที กด refresh เป็นระยะ)", errors: [] },
    { num: 46, task: "Task 2.3", desc: "กด View connection details ที่ success message → save ข้อมูลไว้ → กด Close", errors: [] },
    { num: 47, task: "Task 2.4", desc: "ที่เมนูด้านซ้าย เลือก Databases → กด link mydbcluster", errors: [] },
    { num: 48, task: "Task 2.4", desc: "เลือกแท็บ Connectivity & security", errors: [] },
    { num: 49, task: "Task 2.4", desc: "ดูส่วน Endpoints → Copy ค่า Writer endpoint (hover แล้วกด copy icon)", errors: [
      { problem: "Copy Reader endpoint แทน Writer endpoint", cause: "มี 2 endpoints: Writer (สำหรับ write) และ Reader (สำหรับ read-only) — ต้อง copy Writer", fix: "ตรวจว่า endpoint ที่ copy มีคำว่า 'Writer' ในคอลัมน์ Type | Writer endpoint มักลงท้ายด้วย .cluster-xxxxxxx.region.rds.amazonaws.com (ไม่มี -ro)" }
    ]},
    { num: 50, task: "Task 2.4", desc: "เลือกแท็บ Configuration → Copy ค่า Master username (= admin)", errors: [] },
    { num: 51, task: "Task 2.4", desc: "ที่เมนูด้านซ้าย → Databases → กด link mydbcluster-instance-x (Writer instance)", errors: [] },
    { num: 52, task: "Task 2.4", desc: "เลือกแท็บ Configuration → Copy ค่า DB name (= WPDatabase)", errors: [
      { problem: "ช่อง DB name ว่างเปล่า หรือลืม copy", cause: "ถ้าลืมใส่ Initial database name ตอนข้อ 39 จะไม่มี DB name แสดง | หรือลืม copy ไปเก็บไว้", fix: "ถ้า DB name ว่าง = ลืมใส่ Initial database name ตอนสร้าง → ต้อง connect เข้า database แล้ว CREATE DATABASE WPDatabase; | ถ้ามีค่าแต่ลืม copy ก็กลับมา copy ได้ตลอด" }
    ]},
    { num: 53, task: "Task 3.1", desc: "ค้นหา EFS ใน search bar ของ AWS Console", errors: [] },
    { num: 54, task: "Task 3.2", desc: "กด Create file system", errors: [] },
    { num: 55, task: "Task 3.2", desc: "กด Customize (ไม่ใช้ quick create)", errors: [] },
    { num: 56, task: "Task 3.2", desc: "Name = myWPEFS", errors: [] },
    { num: 57, task: "Task 3.2", desc: "เอาเครื่องหมายถูกออกจาก Enable automatic backups", errors: [] },
    { num: 58, task: "Task 3.2", desc: "Lifecycle Management: Transition into IA = None, Transition into Archive = None", errors: [] },
    { num: 59, task: "Task 3.2", desc: "เอาเครื่องหมายถูกออกจาก Enable encryption of data at rest", errors: [] },
    { num: 60, task: "Task 3.2", desc: "Performance Settings: Throughput mode = Bursting", errors: [] },
    { num: 61, task: "Task 3.2", desc: "Additional settings: Performance mode = General Purpose (Recommended)", errors: [] },
    { num: 62, task: "Task 3.2", desc: "Tags: Key = Name, Value = myWPEFS", errors: [] },
    { num: 63, task: "Task 3.2", desc: "กด Next ไปหน้า Network access", errors: [] },
    { num: 64, task: "Task 3.2", desc: "VPC = LabVPC", errors: [] },
    { num: 65, task: "Task 3.2", desc: "Mount target AZ1: Subnet = AppSubnet1, Security groups = EFSMountTargetSecurityGroup (กด X ลบ default SG ออก)", errors: [
      { problem: "เลือก subnet ผิด (เช่น DatabaseSubnet หรือ PublicSubnet) หรือลืมลบ default security group", cause: "ต้องเลือก AppSubnet (ไม่ใช่ DatabaseSubnet) เพราะ EFS mount point ต้องอยู่ใน App layer | ลืมลบ default SG ทำให้ mount ไม่ได้", fix: "เลือก AppSubnet1 (CIDR 10.0.2.0/24) สำหรับ AZ1 | เลือก EFSMountTargetSecurityGroup แล้วกด X ลบ default SG ออก" }
    ]},
    { num: 66, task: "Task 3.2", desc: "Mount target AZ2: Subnet = AppSubnet2, Security groups = EFSMountTargetSecurityGroup (กด X ลบ default SG ออก)", errors: [] },
    { num: 67, task: "Task 3.2", desc: "กด Next → หน้า File system policy (ไม่ต้องตั้งค่า) → กด Next → หน้า Review → กด Create", errors: [] },
    { num: 68, task: "Task 3.3", desc: "Copy File system ID (รูปแบบ fs-xxxxxxxx) จากหน้า File systems เก็บไว้ใน text editor", errors: [
      { problem: "ลืม copy File system ID → ตอน Task 5 ไม่มีค่าใส่", cause: "ถ้าไม่ copy ตอนนี้ ต้องย้อนกลับมาหาภายหลัง", fix: "กลับมา copy ได้: EFS console → File systems → copy File system ID ของ myWPEFS (รูปแบบ fs-xxxxxxxx)" }
    ]},
    { num: 69, task: "Task 4.1", desc: "ค้นหา EC2 ใน search bar ของ AWS Console", errors: [] },
    { num: 70, task: "Task 4.2", desc: "ที่เมนูด้านซ้าย ส่วน Load Balancing → เลือก Target Groups", errors: [] },
    { num: 71, task: "Task 4.2", desc: "กด Create target group", errors: [] },
    { num: 72, task: "Task 4.2", desc: "Target type = Instances", errors: [] },
    { num: 73, task: "Task 4.2", desc: "Target group name = myWPTargetGroup, Protocol = HTTP, Port = 80, VPC = LabVPC", errors: [
      { problem: "เลือก Protocol เป็น TCP แทน HTTP", cause: "ถ้าเลือก TCP จะใช้กับ Application Load Balancer ไม่ได้ → ต้องลบ target group แล้วสร้างใหม่", fix: "Protocol ต้องเป็น HTTP (ค่า default) — ถ้าเลือก TCP ไปแล้วต้อง delete target group แล้ว create ใหม่เพราะแก้ไข protocol ไม่ได้" }
    ]},
    { num: 74, task: "Task 4.2", desc: "VPC = LabVPC", errors: [] },
    { num: 75, task: "Task 4.2", desc: "Health check path = /wp-login.php", errors: [
      { problem: "พิมพ์ path ผิด (เช่น /wp-login, wp-login.php ไม่มี /, /wp_login.php)", cause: "Path ต้องตรงกับ URL ของ WordPress login page พอดี", fix: "ต้องเป็น /wp-login.php (มี / นำหน้า, ขีดกลางไม่ใช่ underscore, .php ต่อท้าย)" }
    ]},
    { num: 76, task: "Task 4.2", desc: "Advanced health check settings: Healthy threshold=2, Unhealthy threshold=10, Timeout=50, Interval=60", errors: [] },
    { num: 77, task: "Task 4.2", desc: "กด Next → หน้า Register targets (ยังไม่ต้อง register) → กด Next → กด Create target group", errors: [] },
    { num: 78, task: "Task 4.3", desc: "ที่เมนูด้านซ้าย เลือก Load Balancers", errors: [] },
    { num: 79, task: "Task 4.3", desc: "กด Create load balancer", errors: [] },
    { num: 80, task: "Task 4.3", desc: "เลือก Application Load Balancer → กด Create", errors: [] },
    { num: 81, task: "Task 4.3", desc: "Load balancer name = myWPAppALB", errors: [] },
    { num: 82, task: "Task 4.3", desc: "Network mapping: VPC = LabVPC", errors: [] },
    { num: 83, task: "Task 4.3", desc: "Mappings: เลือก AZ1 → PublicSubnet1, เลือก AZ2 → PublicSubnet2", errors: [
      { problem: "เลือก Private subnet (AppSubnet) แทน Public subnet", cause: "ALB ต้องอยู่ใน Public subnet เพื่อรับ traffic จาก internet — ถ้าอยู่ Private จะเข้าถึงจากภายนอกไม่ได้", fix: "ต้องเลือก PublicSubnet1 และ PublicSubnet2 เท่านั้น — ดูจากชื่อ subnet ใน dropdown ที่ขึ้นต้นด้วย Public" }
    ]},
    { num: 84, task: "Task 4.3", desc: "Security groups: เลือก AppInstanceSecurityGroup (กด X ลบ default security group ออก)", errors: [
      { problem: "ลืมลบ default security group หรือเลือก SG ผิดตัว", cause: "ถ้าไม่ลบ default SG จะมี SG ที่ไม่จำเป็นติดมา ทำให้ traffic flow ไม่ตรง | เลือก SG ผิดทำให้ ALB connect ไม่ถึง instances", fix: "ต้องเลือก AppInstanceSecurityGroup เพียงตัวเดียว → กด X ลบ default security group ออก | พิมพ์ App ใน search ของ dropdown เพื่อหา" }
    ]},
    { num: 85, task: "Task 4.3", desc: "Listeners and routing: HTTP:80 → Default action = Forward to myWPTargetGroup", errors: [
      { problem: "หา myWPTargetGroup ไม่เจอใน dropdown", cause: "Target group สร้างไม่สำเร็จ (ข้อ 77) หรือ target group เป็น TCP (ใช้กับ ALB ไม่ได้)", fix: "ตรวจว่า target group สร้างสำเร็จ: EC2 → Target Groups → ต้องเห็น myWPTargetGroup ที่เป็น HTTP | ถ้าเป็น TCP ต้องลบแล้วสร้างใหม่เป็น HTTP" }
    ]},
    { num: 86, task: "Task 4.3", desc: "กด Create load balancer → เห็น success message", errors: [] },
    { num: 87, task: "Task 4.3", desc: "รอจน ALB state เปลี่ยนเป็น Active (ใช้เวลา 2-3 นาที)", errors: [] },
    { num: 88, task: "Task 4.3", desc: "Copy DNS name ของ myWPAppALB เก็บไว้ใน text editor", errors: [
      { problem: "ลืม copy DNS name → ตอน Task 5 ไม่มีค่าใส่ parameter ALBDnsName", cause: "DNS name จำเป็นสำหรับ CloudFormation stack ใน Task 5", fix: "กลับมา copy ได้: EC2 → Load Balancers → กด myWPAppALB → copy DNS name จาก Description section" }
    ]},
    { num: 89, task: "Task 4.3", desc: "(สรุป Task 4 complete — Target Group และ Application Load Balancer ถูกสร้างเรียบร้อย)", errors: [] },
    { num: 90, task: "Task 5.1", desc: "ค้นหา CloudFormation ใน search bar ของ AWS Console", errors: [] },
    { num: 91, task: "Task 5.2", desc: "คลิกขวาที่ link Task5.yaml ใน lab instructions เพื่อ Save/Download template ลงเครื่อง", errors: [] },
    { num: 92, task: "Task 5.2", desc: "เปิดไฟล์ Task5.yaml ใน text editor แล้ว review โครงสร้าง (Launch Template, User Data script)", errors: [] },
    { num: 93, task: "Task 5.2", desc: "คาดการณ์ resources ที่ template จะสร้าง (Launch Template พร้อม User Data สำหรับ WordPress)", errors: [] },
    { num: 94, task: "Task 5.3", desc: "กด Create stack → dropdown 'Create stack' → เลือก 'With new resources (standard)'", errors: [] },
    { num: 95, task: "Task 5.3", desc: "เลือก Choose an existing template → Amazon S3 URL → Copy ค่า Task5TemplateUrl จากแผงด้านซ้าย วางในช่อง → กด Next", errors: [
      { problem: "เจอ error 'Template URL is not valid' หรือ 'Template could not be fetched'", cause: "Copy URL ผิด (อาจ copy Task1TemplateUrl แทน Task5TemplateUrl) หรือมี space ติดมา", fix: "กลับไปแผงด้านซ้ายของ lab → copy ค่า Task5TemplateUrl (ไม่ใช่ Task1TemplateUrl) → ตรวจว่าไม่มี space หน้า/หลัง" }
    ]},
    { num: 96, task: "Task 5.3", desc: "Stack name = WPLaunchConfigStack", errors: [] },
    { num: 97, task: "Task 5.3", desc: "Parameter: DB Name = WPDatabase (Initial database name จาก Task 2)", errors: [
      { problem: "ใส่ cluster name (MyDBCluster) แทน database name (WPDatabase)", cause: "Cluster name กับ Database name เป็นคนละอย่าง — ต้องใส่ initial database name ที่ตั้งตอนสร้าง RDS", fix: "ใส่ WPDatabase (คือ Initial database name ที่ตั้งไว้ข้อ 39) — ไม่ใช่ MyDBCluster (ซึ่งเป็น cluster identifier)" }
    ]},
    { num: 98, task: "Task 5.3", desc: "Parameter: Database endpoint = Writer endpoint ที่ copy จาก Task 2 (เช่น mydbcluster.cluster-xxxxxx.region.rds.amazonaws.com)", errors: [
      { problem: "ใส่ Reader endpoint แทน Writer endpoint หรือมี space ติดมา", cause: "Reader endpoint มี -ro ใน URL — ถ้าใส่ reader จะ write ไม่ได้ | space จะทำให้ connect ไม่ได้", fix: "ต้องใส่ Writer endpoint (ไม่มี -ro) เช่น mydbcluster.cluster-xxxxxx.region.rds.amazonaws.com | ตรวจว่าไม่มี space หน้า/หลัง" }
    ]},
    { num: 99, task: "Task 5.3", desc: "Parameter: Database User Name = admin", errors: [] },
    { num: 100, task: "Task 5.3", desc: "Parameter: Database Password = LabPassword (paste จากแผงด้านซ้าย)", errors: [
      { problem: "Password มี space ติดมาตอน paste", cause: "บาง browser จะ copy space ที่อยู่หลังค่าติดมาด้วย → password จะไม่ match กับที่ตั้งไว้ใน RDS", fix: "Paste password แล้วตรวจว่าไม่มี space หน้า/หลัง — ถ้ามีให้ลบออก" }
    ]},
    { num: 101, task: "Task 5.3", desc: "Parameter: WordPress admin username = wpadmin (default)", errors: [] },
    { num: 102, task: "Task 5.3", desc: "Parameter: WordPress admin password = LabPassword (paste จากแผงด้านซ้าย)", errors: [] },
    { num: 103, task: "Task 5.3", desc: "Parameter: WordPress admin email address = ใส่ email ที่ valid (เช่น admin@example.com)", errors: [] },
    { num: 104, task: "Task 5.3", desc: "Parameter: Instance Type = t3.medium (ปล่อย default)", errors: [] },
    { num: 105, task: "Task 5.3", desc: "Parameter: ALBDnsName = DNS name ที่ copy จาก Task 4 (paste ตรงๆ ไม่ต้องใส่ http:// หรือ /)", errors: [
      { problem: "ใส่ http:// หน้า DNS name หรือมี / ต่อท้าย หรือมี space", cause: "ถ้าใส่ http:// หรือ trailing slash จะทำให้ WordPress site URL ผิด → CSS/JS ไม่โหลด → หน้าเว็บเพี้ยน", fix: "Paste DNS name ตรงๆ เช่น myWPAppALB-1234567890.us-west-2.elb.amazonaws.com — ไม่มี http:// นำหน้า ไม่มี / ต่อท้าย ไม่มี space" }
    ]},
    { num: 106, task: "Task 5.3", desc: "Parameter: LatestAL2023AmiId = ปล่อย default", errors: [] },
    { num: 107, task: "Task 5.3", desc: "Parameter: WPElasticFileSystemID = File system ID ที่ copy จาก Task 3 (เช่น fs-xxxxxxxx)", errors: [
      { problem: "ใส่ File system ID ผิด หรือลืม copy จาก Task 3", cause: "ถ้า EFS ID ผิดจะทำให้ mount fail → instance ไม่สามารถ boot WordPress ได้", fix: "กลับไป EFS console → File systems → copy File system ID ของ myWPEFS (รูปแบบ fs-xxxxxxxx) → paste กลับมา" }
    ]},
    { num: 108, task: "Task 5.3", desc: "กด Next → Next (Configure stack options ปล่อย default) → Submit → รอ CREATE_COMPLETE (~5 นาที)", errors: [
      { problem: "Stack status เป็น CREATE_FAILED หรือ ROLLBACK_COMPLETE", cause: "Parameters ไม่ถูกต้อง (endpoint ผิด, EFS ID ผิด, password ผิด) → User Data script fail", fix: "กดดู Events tab หาสาเหตุ → ลบ stack ที่ fail → สร้างใหม่ด้วย parameters ที่ถูกต้อง | ตรวจทุก parameter อีกรอบ: DB endpoint เป็น Writer, DB name = WPDatabase, EFS ID = fs-xxxxx" }
    ]},
    { num: 109, task: "Task 5.4", desc: "กดแท็บ Resources เพื่อดู resources ที่ถูกสร้าง (Launch Template)", errors: [] },
    { num: 110, task: "Task 6.1", desc: "ค้นหา EC2 ใน search bar ของ AWS Console", errors: [] },
    { num: 111, task: "Task 6.1", desc: "ที่เมนูด้านซ้าย ส่วน Auto Scaling → เลือก Auto Scaling Groups", errors: [] },
    { num: 112, task: "Task 6.1", desc: "กด Create Auto Scaling group", errors: [] },
    { num: 113, task: "Task 6.1", desc: "Auto Scaling group name = WP-ASG, Launch template = เลือก template ที่สร้างจาก Task 5 → กด Next", errors: [
      { problem: "หา launch template ไม่เจอใน dropdown", cause: "Task 5 stack ยังไม่ CREATE_COMPLETE หรือ stack fail → ไม่มี launch template ถูกสร้าง", fix: "กลับไปตรวจ CloudFormation → WPLaunchConfigStack ว่า status = CREATE_COMPLETE | ถ้า FAILED ต้องแก้ parameters แล้วสร้าง stack ใหม่" }
    ]},
    { num: 114, task: "Task 6.1", desc: "กด Next ไปหน้า Choose instance launch options", errors: [] },
    { num: 115, task: "Task 6.1", desc: "Network: VPC = LabVPC, Availability Zones and subnets = AppSubnet1 + AppSubnet2 → กด Next", errors: [
      { problem: "เลือก PublicSubnet แทน AppSubnet หรือเลือกแค่ 1 subnet", cause: "Instance ต้องอยู่ใน private App subnet (ไม่ใช่ Public) | ต้องเลือก 2 subnets เพื่อ HA", fix: "ต้องเลือก AppSubnet1 และ AppSubnet2 (ทั้ง 2 อัน) — ไม่ใช่ PublicSubnet | ดูจากชื่อ subnet ใน dropdown" }
    ]},
    { num: 116, task: "Task 6.1", desc: "กด Next ไปหน้า Configure advanced options", errors: [] },
    { num: 117, task: "Task 6.1", desc: "เลือก Attach to an existing load balancer → Choose from your load balancer target groups → เลือก myWPTargetGroup | HTTP", errors: [
      { problem: "หา myWPTargetGroup ไม่เจอใน dropdown", cause: "Target group อาจเป็น TCP (ใช้กับ ALB ไม่ได้) หรือสร้างไม่สำเร็จ", fix: "ตรวจ EC2 → Target Groups ว่ามี myWPTargetGroup และเป็น HTTP | ถ้าไม่เจอต้องสร้าง target group ใหม่ (Task 4.2)" }
    ]},
    { num: 118, task: "Task 6.1", desc: "Additional health check types: เลือก Turn on Elastic Load Balancing health checks, Grace period = 300", errors: [] },
    { num: 119, task: "Task 6.1", desc: "กด Next ไปหน้า Configure group size and scaling", errors: [] },
    { num: 120, task: "Task 6.1", desc: "Group size: Desired capacity=2, Scaling: Min=2, Max=4", errors: [
      { problem: "ใส่ค่าผิด (เช่น Desired=1, Min=1 หรือ Max=2)", cause: "ค่าที่กำหนดคือ Desired=2, Min=2, Max=4 — ถ้า Desired < 2 จะได้ instance ไม่ครบ | Max < Desired จะ error", fix: "ใส่ Desired=2, Min=2, Max=4 ตามที่กำหนด | ถ้า error ตรวจว่า Min <= Desired <= Max" }
    ]},
    { num: 121, task: "Task 6.1", desc: "Automatic scaling: เลือก Target tracking scaling policy (ปล่อย default)", errors: [] },
    { num: 122, task: "Task 6.1", desc: "Additional settings: เลือก Enable group metrics collection within CloudWatch", errors: [] },
    { num: 123, task: "Task 6.1", desc: "กด Next → หน้า Add notifications (ข้าม ไม่ต้องตั้งค่า) → กด Next", errors: [] },
    { num: 124, task: "Task 6.1", desc: "Add tags: กด Add tag → Key = Name, Value = WP-App → กด Next", errors: [
      { problem: "ใส่ Key เป็น name (ตัวเล็ก) แทน Name (ตัวใหญ่)", cause: "Tag key 'Name' ต้องขึ้นต้นด้วยตัวใหญ่ ถึงจะแสดงเป็นชื่อ instance ใน EC2 console", fix: "ใส่ Key = Name (N ตัวใหญ่) ไม่ใช่ name (ตัวเล็ก) | ถ้าใส่ผิดสามารถแก้ได้ภายหลังที่ ASG → Tags" }
    ]},
    { num: 125, task: "Task 6.1", desc: "หน้า Review → ตรวจ settings → กด Create Auto Scaling group", errors: [
      { problem: "เจอ error ตอน create ASG", cause: "Launch template ไม่ถูกต้อง / subnet ผิด / target group ผิด protocol / capacity settings ไม่ valid", fix: "ดู error message แล้วแก้:\n- Launch template error → ตรวจ Task 5 stack\n- Subnet error → ต้องเป็น AppSubnet1 + AppSubnet2\n- TG error → ต้องเป็น HTTP target group\n- Capacity error → Min <= Desired <= Max" }
    ]},
    { num: 126, task: "Task 6.1", desc: "เลือก WP-ASG → กดแท็บ Activity → รอจน Activity history แสดง Status = Successful", errors: [
      { problem: "Status เป็น Failed หรือ Cancelled", cause: "Launch template มี error (เช่น AMI ไม่เจอ, security group ผิด, EFS mount fail) → instance launch ไม่สำเร็จ", fix: "กดดู Activity history → อ่าน Status message เพื่อหาสาเหตุ | สาเหตุที่พบบ่อย: 1) AMI not found 2) Security group ผิด 3) Subnet ไม่มี route to NAT → ต้องแก้ launch template หรือ network config" }
    ]},
    { num: 127, task: "Task 6.1", desc: "กดแท็บ Instance management → ตรวจว่ามี 2 instances อยู่ใน InService lifecycle state", errors: [
      { problem: "Instances ไม่ขึ้น InService หรือ cycling (terminate แล้ว launch ใหม่วนลูป)", cause: "Health check fail ซ้ำๆ → ASG terminate instance แล้ว launch ใหม่ไม่หยุด | อาจเพราะ User Data script error", fix: "ตรวจ: 1) Target Group → ดู health check result 2) EC2 → Instances → เลือก instance → Actions → Monitor → Get system log เพื่อดู boot error | สาเหตุที่พบบ่อย: EFS mount fail, DB endpoint ผิด, wrong password" }
    ]},
    { num: 128, task: "Task 6.1", desc: "กดแท็บ Monitoring เพื่อดู CloudWatch metrics ของ Auto Scaling group", errors: [] },
    { num: 129, task: "Task 6.2", desc: "ที่เมนูด้านซ้าย → Target Groups → กด myWPTargetGroup → แท็บ Targets → รอจน Health status = healthy (ใช้เวลา ~5 นาที)", errors: [
      { problem: "Health status เป็น unhealthy ตลอด ไม่เปลี่ยนเป็น healthy", cause: "WordPress ยัง boot ไม่เสร็จ หรือ User Data script error (DB connect fail, EFS mount fail)", fix: "รอ 5-10 นาที (WordPress ต้อง install ก่อน) | ถ้ารอนานแล้วยัง unhealthy ให้ตรวจ:\n1) EC2 instance system log ดู error\n2) Task 5 parameters ถูกต้อง? (DB endpoint, password, EFS ID)\n3) Security groups ให้ instance เข้าถึง RDS และ EFS ได้?" }
    ]},
    { num: 130, task: "Task 6.3", desc: "ที่เมนูด้านซ้าย → Load Balancers → Copy DNS name ของ myWPAppALB → ต่อท้ายด้วย /wp-login.php → เปิดใน browser tab ใหม่", errors: [
      { problem: "หน้าเว็บ timeout หรือ connection refused", cause: "ALB ยังไม่ Active / Target ยัง unhealthy / Security group ไม่อนุญาต traffic", fix: "ตรวจว่า: 1) ALB state = Active 2) Target Group มี healthy targets (ข้อ 129) 3) URL ถูกต้อง เช่น myWPAppALB-xxx.region.elb.amazonaws.com/wp-login.php" },
      { problem: "หน้าเว็บแสดงแต่ CSS/layout เพี้ยน (ไม่มี style)", cause: "ALBDnsName ใน Task 5 ใส่ผิด (มี http://, trailing slash, หรือ space) ทำให้ WordPress site URL ไม่ตรง", fix: "ต้องแก้ Task 5 stack parameters: ลบ stack WPLaunchConfigStack → สร้างใหม่ โดยใส่ ALBDnsName เป็น DNS ตรงๆ ไม่มี http:// หรือ / ต่อท้าย" }
    ]},
    { num: 131, task: "Task 6.3", desc: "ที่หน้า WordPress Login: Username = wpadmin, Password = LabPassword → กด Log In", errors: [
      { problem: "เจอ 'Invalid username or password' หรือ login ไม่ผ่าน", cause: "Password ที่ใส่ใน Task 5 parameters ไม่ตรงกับที่ใส่ตอนนี้ / WordPress admin username ถูกเปลี่ยน", fix: "ตรวจว่า: 1) Username = wpadmin (ค่าที่ใส่ใน Task 5 WordPress admin username) 2) Password = LabPassword เดียวกับที่ใส่ใน Task 5 WordPress admin password | ถ้าไม่ตรงต้อง recreate Task 5 stack ด้วยค่าที่ถูกต้อง" }
    ]},
    { num: 132, task: "End Lab", desc: "กลับไปที่ AWS Console → กด AWSLabsUser มุมบนขวา → Sign out → กลับหน้า lab → กด End Lab → กด Yes ยืนยัน", errors: [] }
  ]
};
