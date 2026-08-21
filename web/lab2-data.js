const lab2Data = {
  title: "Lab 2 - Build your Amazon VPC Infrastructure",
  region: "us-west-2",
  steps: [
    { num: 1, task: "Start Lab", desc: "กด Start Lab ที่หน้า lab", errors: [] },
    { num: 2, task: "Start Lab", desc: "กด Open Console เพื่อเปิด AWS Management Console", errors: [
      { problem: "เจอหน้า 'You must first sign out'", cause: "Browser มี session ของ AWS account อื่นค้างอยู่", fix: "กด 'click here' เพื่อ logout → ปิด tab Sign In → กลับมาที่หน้า lab → กด Open Console ใหม่ | หรือใช้ Incognito window" },
      { problem: "กด Start Lab แล้วไม่มีอะไรเกิดขึ้น", cause: "Pop-up blocker ของ browser บล็อก console window", fix: "เพิ่ม domain ของ lab ใน pop-up allow list หรือปิด pop-up blocker → refresh หน้า → กดใหม่" }
    ]},
    { num: 3, task: "Task 1", desc: "ค้นหา VPC ใน search bar ของ console", errors: [
      { problem: "เจอหน้า console ว่างๆ หรือ region ผิด", cause: "Region ไม่ใช่ us-west-2 (Oregon) — lab resources จะถูกสร้างใน region ที่กำหนดเท่านั้น", fix: "เช็ค Region มุมบนขวาของ console ต้องเป็น US West (Oregon) us-west-2 | ถ้าผิดให้กดเปลี่ยน region" }
    ]},
    { num: 4, task: "Task 1", desc: "ที่เมนูด้านซ้าย เลือก Your VPCs", errors: [] },
    { num: 5, task: "Task 1", desc: "กด Create VPC ตั้งค่า: Resources=VPC only, Name tag=Lab VPC, IPv4 CIDR=10.0.0.0/16", errors: [
      { problem: "สร้าง VPC ผิดแล้วจะ delete ไม่ได้", cause: "Lab ไม่มี permission ให้ delete VPC", fix: "ไม่ต้อง delete VPC เดิม — สร้าง VPC ใหม่ที่ถูกต้องได้เลย แล้วใช้อันใหม่แทน (เลือกให้ถูกตัวในขั้นตอนถัดไป)" }
    ]},
    { num: 6, task: "Task 1", desc: "กด Create VPC จะเห็น success message", errors: [] },
    { num: 7, task: "Task 1", desc: "ตรวจสอบ State ของ Lab VPC ต้องเป็น Available", errors: [] },
    { num: 8, task: "Task 1", desc: "ที่หน้าเดิม กด Actions แล้วเลือก Edit VPC settings", errors: [] },
    { num: 9, task: "Task 1", desc: "ในส่วน DNS settings ให้ติ๊ก Enable DNS hostnames แล้วกด Save", errors: [
      { problem: "ลืมติ๊ก Enable DNS hostnames แล้วไปทำต่อ — จะไม่เห็นปัญหาจนถึงข้อ 74", cause: "DNS hostnames ต้อง enable เพื่อให้ EC2 instances ได้รับ Public DNS name — ถ้าไม่ทำตอนนี้ ข้อ 74 จะไม่มีค่า Public IPv4 DNS แสดง", fix: "ย้อนกลับ: VPC → Your VPCs → เลือก Lab VPC → Actions → Edit VPC settings → ติ๊ก Enable DNS hostnames → Save | หลัง enable อาจต้อง stop → start instance ให้ DNS name ปรากฏ" },
      { problem: "ไม่เห็นหน้า Edit VPC settings (ปุ่ม Save ไม่ปรากฏ)", cause: "ไม่ได้กด Actions → Edit VPC settings ที่ข้อ 8 ก่อน (อาจอยู่ผิดหน้า)", fix: "ต้องไปที่ VPC → Your VPCs → เลือก Lab VPC → กด Actions dropdown → เลือก Edit VPC settings → จะเห็น DNS settings" }
    ]},
    { num: 10, task: "Task 1", desc: "กด Save", errors: [] },
    { num: 11, task: "Task 2.1", desc: "ที่เมนูด้านซ้าย เลือก Subnets", errors: [] },
    { num: 12, task: "Task 2.1", desc: "กด Create subnet ตั้งค่า: VPC ID=Lab VPC, Subnet name=Public Subnet, Availability Zone=เลือกอันแรกในลิสต์, IPv4 CIDR=10.0.0.0/24", errors: [
      { problem: "เจอ error 'The CIDR block is the same as the VPC CIDR block'", cause: "ใส่ CIDR เป็น 10.0.0.0/16 ซึ่งเท่ากับ VPC ทั้งก้อน", fix: "แก้ CIDR เป็น 10.0.0.0/24 (subnet ต้องเล็กกว่า VPC)" },
      { problem: "สร้าง subnet สำเร็จแต่ไม่เห็นใน Lab VPC ตอนทำข้อถัดไป", cause: "VPC ID dropdown จะ default เป็น VPC แรกในลิสต์ ซึ่งอาจเป็น default VPC ไม่ใช่ Lab VPC — ต้องเลือก Lab VPC ให้ถูกก่อนกรอกข้อมูลอื่น", fix: "ตรวจว่าเลือก VPC ID เป็น Lab VPC (ไม่ใช่ default VPC) ก่อนกด Create | ถ้าสร้างไปแล้วผิด VPC ให้ delete subnet แล้วสร้างใหม่เลือก Lab VPC" }
    ]},
    { num: 13, task: "Task 2.1", desc: "กด Create subnet จะเห็น success message", errors: [] },
    { num: 14, task: "Task 2.1", desc: "ตรวจ State ต้องเป็น Available", errors: [] },
    { num: 15, task: "Task 2.1", desc: "เลือก (ติ๊ก) Public Subnet", errors: [] },
    { num: 16, task: "Task 2.1", desc: "กด Actions แล้วเลือก Edit subnet settings", errors: [] },
    { num: 17, task: "Task 2.1", desc: "ในส่วน Auto-assign IP settings ให้ติ๊ก Enable auto-assign public IPv4 address แล้วกด Save", errors: [] },
    { num: 18, task: "Task 2.1", desc: "กด Save", errors: [] },
    { num: 19, task: "Task 2.2", desc: "กด Create subnet ตั้งค่า: VPC ID=Lab VPC, Subnet name=Private Subnet, Availability Zone=เลือกอันแรกในลิสต์, IPv4 CIDR=10.0.2.0/23", errors: [
      { problem: "เจอ error 'The CIDR block conflicts with another subnet' หรือ 'overlaps'", cause: "ใส่ CIDR ที่ overlap กับ Public Subnet เช่น 10.0.0.0/23 (ซึ่งครอบ 10.0.0.0-10.0.1.255)", fix: "ใส่ 10.0.2.0/23 ซึ่งครอบ 10.0.2.0-10.0.3.255 จะไม่ overlap กับ Public Subnet" },
      { problem: "VPC ID ไม่ได้เลือกเป็น Lab VPC (ลืมเปลี่ยน หรือ dropdown reset กลับเป็น default)", cause: "เมื่อเปิดหน้า Create subnet ใหม่ VPC ID จะ reset เป็น VPC แรกในลิสต์ทุกครั้ง", fix: "ทุกครั้งที่สร้าง subnet ใหม่ ต้องเลือก VPC ID=Lab VPC ก่อนกรอกข้อมูลอื่นๆ เสมอ" }
    ]},
    { num: 20, task: "Task 2.2", desc: "กด Create subnet จะเห็น success message", errors: [] },
    { num: 21, task: "Task 2.2", desc: "ตรวจ State ต้องเป็น Available", errors: [] },
    { num: 22, task: "Task 3", desc: "ที่เมนูด้านซ้าย เลือก Internet gateways", errors: [] },
    { num: 23, task: "Task 3", desc: "กด Create internet gateway ตั้ง Name tag=Lab IGW", errors: [] },
    { num: 24, task: "Task 3", desc: "กด Create internet gateway จะเห็น success message", errors: [] },
    { num: 25, task: "Task 3", desc: "ที่หน้าเดิม กด Actions แล้วเลือก Attach to VPC จากนั้นเลือก Lab VPC แล้วกด Attach", errors: [
      { problem: "เจอ error 'Internet gateway is already attached to a VPC'", cause: "VPC หนึ่งตัวมี Internet Gateway ได้แค่ 1 ตัว อาจ attach กับ VPC ผิดตัวไปแล้ว", fix: "ไปที่ Internet Gateways → เลือก Lab IGW → Actions → Detach from VPC → แล้ว Attach ใหม่กับ Lab VPC" }
    ]},
    { num: 26, task: "Task 3", desc: "เลือก Lab VPC จาก dropdown", errors: [
      { problem: "เลือก default VPC แทน Lab VPC", cause: "Dropdown อาจแสดง default VPC ก่อน Lab VPC — ต้องดูชื่อให้ดี", fix: "เลือก VPC ที่ชื่อ Lab VPC (ไม่ใช่ตัวที่ขึ้นว่า vpc-xxxxx โดยไม่มี tag name) | ถ้า attach ผิดตัวแล้ว → Actions → Detach → แล้ว Attach ใหม่กับ Lab VPC" }
    ]},
    { num: 27, task: "Task 3", desc: "กด Attach internet gateway จะเห็น success message", errors: [] },
    { num: 28, task: "Task 3", desc: "ตรวจ State ต้องเป็น Attached", errors: [] },
    { num: 29, task: "Task 4", desc: "ที่เมนูด้านซ้าย เลือก Route tables", errors: [] },
    { num: 30, task: "Task 4", desc: "กด Create route table ตั้ง Name=Public Route Table และเลือก VPC=Lab VPC", errors: [
      { problem: "สร้าง Route Table แล้ว แต่ตอน associate subnet หาไม่เจอ", cause: "เลือก VPC ผิดตอนสร้าง (เป็น default VPC แทน Lab VPC)", fix: "Delete route table ที่สร้างผิด แล้วสร้างใหม่โดยเลือก VPC=Lab VPC ให้ถูกต้อง" }
    ]},
    { num: 31, task: "Task 4", desc: "กด Create route table จะเห็น success message", errors: [] },
    { num: 32, task: "Task 4", desc: "เลือก tab Routes ที่ครึ่งล่างของหน้า", errors: [] },
    { num: 33, task: "Task 4", desc: "กด Edit routes", errors: [] },
    { num: 34, task: "Task 4", desc: "กด Add route ใส่ Destination=0.0.0.0/0 และ Target เลือก Internet Gateway แล้วเลือก Lab IGW", errors: [
      { problem: "เจอ error 'Route already exists for destination'", cause: "ใส่ Destination เป็น 10.0.0.0/16 ซึ่งเป็น local route ที่มีอยู่แล้วอัตโนมัติ", fix: "ใส่ Destination เป็น 0.0.0.0/0 แทน" },
      { problem: "ไม่เห็น Internet Gateway ใน Target dropdown", cause: "Internet Gateway ยังไม่ได้ Attach กับ Lab VPC หรือ route table นี้อยู่คนละ VPC กับ IGW", fix: "ย้อนไปเช็คข้อ 25 ว่า Lab IGW ถูก Attach กับ Lab VPC แล้ว และตรวจว่า route table สร้างใน Lab VPC" }
    ]},
    { num: 35, task: "Task 4", desc: "กด Save changes จะเห็น success message", errors: [] },
    { num: 36, task: "Task 4", desc: "เลือก tab Subnet associations", errors: [] },
    { num: 37, task: "Task 4", desc: "กด Edit subnet associations", errors: [] },
    { num: 38, task: "Task 4", desc: "ติ๊กเลือก Public Subnet แล้วกด Save associations", errors: [
      { problem: "ไม่เห็น Public Subnet ในลิสต์ให้เลือก", cause: "Route table อยู่คนละ VPC กับ subnet (เช่น route table สร้างใน default VPC)", fix: "Delete route table นี้แล้วสร้างใหม่ โดยเลือก VPC=Lab VPC (ข้อ 30)" },
      { problem: "ติ๊กผิด subnet (เลือก Private แทน Public)", cause: "สับสนระหว่าง Public กับ Private Subnet", fix: "กลับไป Edit subnet associations → เอาติ๊ก Private ออก → ติ๊ก Public Subnet แทน → Save" }
    ]},
    { num: 39, task: "Task 4", desc: "กด Save associations จะเห็น success message", errors: [] },
    { num: 40, task: "Task 5", desc: "ที่เมนูด้านซ้าย เลือก Security Groups", errors: [] },
    { num: 41, task: "Task 5", desc: "กด Create security group ตั้ง Name=Public SG, Description=Allows incoming traffic to public instance, VPC=Lab VPC", errors: [
      { problem: "สร้าง Security Group แล้ว แต่ตอน launch EC2 หาไม่เจอ", cause: "เลือก VPC ผิดตอนสร้าง (default VPC แทน Lab VPC) — ต้องสังเกตว่า VPC dropdown จะ default เป็น default VPC เสมอ", fix: "Delete SG ที่สร้างผิด แล้วสร้างใหม่ โดยเปลี่ยน VPC เป็น Lab VPC ก่อนกด Create" }
    ]},
    { num: 42, task: "Task 5", desc: "ในส่วน Inbound rules กด Add rule เลือก Type=HTTP และ Source=Anywhere-IPv4", errors: [] },
    { num: 43, task: "Task 5", desc: "ในส่วน Tags กด Add new tag ใส่ Key=Name, Value=Public SG", errors: [] },
    { num: 44, task: "Task 5", desc: "กด Create security group จะเห็น success message", errors: [] },
    { num: 45, task: "Task 6", desc: "ค้นหา EC2 ใน search bar ของ console", errors: [] },
    { num: 46, task: "Task 6.1", desc: "เลือก Dashboard จากเมนูด้านซ้าย", errors: [] },
    { num: 47, task: "Task 6.1", desc: "ในส่วน Launch instance กด Launch instances", errors: [] },
    { num: 48, task: "Task 6.2", desc: "ในส่วน Name and tags ใส่ Name=Public Instance (ต้องตรงตัว เป็น case sensitive)", errors: [
      { problem: "Session Manager connect ไม่ได้ในภายหลัง (ข้อ 82)", cause: "ชื่อ instance ไม่ตรง — lab ใช้ Name tag เพื่อ assign IAM permissions ผ่าง tag-based policy ดังนั้น ถ้าชื่อผิด (เช่น public instance, PublicInstance, Public_Instance) จะไม่มี permission", fix: "Name ต้องเป็น 'Public Instance' ตรงตัว: P ตัวใหญ่, I ตัวใหญ่, มีเว้นวรรค 1 ช่อง | ถ้าใส่ผิด ให้แก้ Name tag ที่ EC2 → Instances → เลือก instance → Tags tab → Edit" }
    ]},
    { num: 49, task: "Task 6.2", desc: "(ช่อง Name)", errors: [] },
    { num: 50, task: "Task 6.3", desc: "ในส่วน Application and OS Images (Amazon Machine Image)", errors: [] },
    { num: 51, task: "Task 6.3", desc: "ตรวจว่าเลือก Amazon Linux เป็น OS", errors: [] },
    { num: 52, task: "Task 6.3", desc: "ตรวจว่าเลือก Amazon Linux 2023 AMI ใน dropdown", errors: [] },
    { num: 53, task: "Task 6.4", desc: "ในส่วน Instance type", errors: [] },
    { num: 54, task: "Task 6.4", desc: "เลือก t3.micro จาก dropdown", errors: [
      { problem: "เจอ error 'You are not authorized to perform this operation'", cause: "เลือก instance type อื่นที่ lab ไม่อนุญาต เช่น t3.large, m5.xlarge", fix: "เลือก t3.micro เท่านั้น เพราะ lab จำกัดไว้" }
    ]},
    { num: 55, task: "Task 6.5", desc: "ในส่วน Key pair (login)", errors: [] },
    { num: 56, task: "Task 6.5", desc: "เลือก Proceed without a key pair (Not recommended) จาก dropdown", errors: [] },
    { num: 57, task: "Task 6.6", desc: "ในส่วน Network settings", errors: [] },
    { num: 58, task: "Task 6.6", desc: "กด Edit", errors: [
      { problem: "ไม่เห็นปุ่ม Edit หรือหาไม่เจอ", cause: "ปุ่ม Edit อยู่ทางขวาของ heading 'Network settings' เป็นตัวอักษรเล็กๆ ไม่ใช่ปุ่มใหญ่", fix: "มองหาคำว่า 'Edit' (link สีฟ้า) ข้างๆ หัวข้อ Network settings — ถ้าไม่กด Edit จะไม่สามารถเปลี่ยน VPC/Subnet ได้ (ข้อ 59 จะทำไม่ได้)" },
      { problem: "ข้าม Edit ไปเลย ไม่ได้กด → ข้อ 59 เปลี่ยน VPC ไม่ได้", cause: "ถ้าไม่กด Edit ระบบจะใช้ default VPC และ default subnet ซึ่งผิด", fix: "ต้องกด Edit ก่อนเสมอ! ถ้าข้ามไป Launch เลย instance จะอยู่ผิด VPC → ต้อง terminate แล้ว launch ใหม่" }
    ]},
    { num: 59, task: "Task 6.6", desc: "ตั้งค่า: VPC=Lab VPC, Subnet=Public Subnet", errors: [
      { problem: "ไม่เห็น Lab VPC หรือ Public Subnet ใน dropdown", cause: "ไม่ได้กด Edit ที่ข้อ 58 — ถ้าไม่กด Edit จะไม่สามารถเปลี่ยน VPC/Subnet ได้ (จะใช้ default settings)", fix: "กด Edit ที่อยู่ข้างๆ Network settings ก่อน → จะเห็น dropdown ให้เลือก VPC, Subnet, Auto-assign IP" },
      { problem: "เลือก Lab VPC แล้ว แต่ไม่เห็น Public Subnet", cause: "Region ผิด หรือ subnet ยังไม่ได้สร้าง (ข้อ 12)", fix: "เช็ค Region มุมบนขวา | ตรวจว่าสร้าง Public Subnet สำเร็จแล้ว (ข้อ 12-13)" }
    ]},
    { num: 60, task: "Task 6.6", desc: "ตรวจว่า Auto-assign public IP = Enable", errors: [
      { problem: "Auto-assign public IP เป็น Disable", cause: "ถ้า subnet ตั้ง auto-assign ไว้แล้ว (ข้อ 17) จะ default เป็น Enable แต่ถ้าไม่ได้ตั้ง ต้องเปลี่ยนเอง", fix: "เปลี่ยน dropdown Auto-assign public IP เป็น Enable — ถ้าไม่ Enable instance จะไม่มี Public IP ทำให้เข้า web ไม่ได้ (ข้อ 76)" }
    ]},
    { num: 61, task: "Task 6.7", desc: "ที่ Firewall (security groups) เลือก Select existing security group", errors: [] },
    { num: 62, task: "Task 6.7", desc: "ใน Common security groups เลือก Public SG", errors: [
      { problem: "หา Public SG ไม่เจอใน dropdown", cause: "ตอนสร้าง Security Group เลือก VPC ผิด (เป็น default VPC) หรือตอน launch ยังไม่ได้เลือก Lab VPC ข้างบน", fix: "ตรวจว่ากด Edit ที่ Network settings แล้วเลือก VPC=Lab VPC ก่อน แล้ว SG จะปรากฏ | ถ้า SG อยู่ผิด VPC ต้อง delete แล้วสร้างใหม่ใน Lab VPC | หมายเหตุ: lab ไม่มี permission ให้ delete VPC ดังนั้นถ้าสร้าง SG ผิด VPC ต้อง delete SG แล้วสร้างใหม่ในLab VPC เท่านั้น" }
    ]},
    { num: 63, task: "Task 6.9", desc: "กด expand ส่วน Advanced details", errors: [] },
    { num: 64, task: "Task 6.9", desc: "ที่ IAM instance profile เลือก EC2InstProfile จาก dropdown", errors: [
      { problem: "ไม่เห็น EC2InstProfile ใน dropdown", cause: "ต้อง scroll dropdown ลงไปเพราะอาจมีหลาย role | หรือพิมพ์ 'EC2' ใน search ของ dropdown", fix: "พิมพ์ EC2 ในช่อง search ของ IAM instance profile dropdown → จะเห็น EC2InstProfile ปรากฏ" },
      { problem: "ข้ามขั้นตอนนี้ไป (ไม่ได้เลือก IAM role) → Session Manager connect ไม่ได้ (ข้อ 82)", cause: "IAM instance profile จำเป็นสำหรับ SSM Agent ในการ register กับ AWS Systems Manager", fix: "ถ้า launch ไปแล้วโดยไม่มี IAM role → terminate instance → launch ใหม่โดยเลือก EC2InstProfile ที่ Advanced details" }
    ]},
    { num: 65, task: "Task 6.9", desc: "ที่ User data ให้ paste script ที่ lab ให้มา (install Apache web server)", errors: [
      { problem: "Web server ไม่ทำงาน — ข้อ 76 เปิด web page ไม่ได้ (Connection Refused)", cause: "User data ไม่ได้ถูก execute — อาจ paste ไม่ครบ ไม่มี #!/bin/bash ข้างบน หรือ copy มาจาก Word/PDF ทำให้มี hidden characters", fix: "User data ต้องขึ้นต้นด้วย #!/bin/bash (บรรทัดแรก) | Copy จาก lab page โดยตรง ไม่ใช่จาก Word/PDF | ถ้า launch ไปแล้ว ใช้ Session Manager เข้าไป run script manually: sudo yum install -y httpd && sudo systemctl start httpd" },
      { problem: "Paste user data แล้วมี smart quotes หรือ em dashes ปน", cause: "Copy จาก PDF หรือ Word ทำให้ straight quotes กลายเป็น curly quotes และ hyphens กลายเป็น em dashes", fix: "Copy จาก lab page (HTML) โดยตรง | หรือ paste ลงใน plain text editor ก่อนแล้ว copy อีกที | ตรวจว่า quotes เป็น straight quotes" },
      { problem: "User data box ว่างเปล่าเพราะลืม paste", cause: "ข้ามไปกด Launch เลยโดยไม่ได้ใส่ user data", fix: "ถ้า launch ไปแล้ว: terminate instance → launch ใหม่โดยใส่ user data ก่อนกด Launch | หรือ SSM เข้าไป run script manually" }
    ]},
    { num: 66, task: "Task 6.10", desc: "ดูส่วน Summary ตรวจว่าค่าถูกต้อง", errors: [] },
    { num: 67, task: "Task 6.10", desc: "กด Launch instance", errors: [
      { problem: "'You are not authorized' หรือ 'Instance limit exceeded'", cause: "Instance type ไม่ใช่ t3.micro, เลือก AMI ผิด, หรือมี instance รันอยู่เกิน limit ของ lab", fix: "เช็ค: instance type เป็น t3.micro? (ข้อ 54) | AMI เป็น Amazon Linux 2023? (ข้อ 52) | ไป EC2 Instances terminate instance เก่าที่ไม่ได้ใช้" },
      { problem: "กด Launch แล้วเจอ error เรื่อง Network/Subnet", cause: "ไม่ได้กด Edit ที่ Network settings (ข้อ 58) หรือเลือก VPC/Subnet ผิด", fix: "ย้อนไปดูข้อ 58-60 ว่ากด Edit แล้วเลือก Lab VPC + Public Subnet + Enable public IP ครบ" },
      { problem: "กด Launch แล้วเจอ error เรื่อง Security Group", cause: "Security Group อยู่คนละ VPC กับ Subnet ที่เลือก", fix: "ตรวจว่า Network settings เลือก Lab VPC แล้ว SG ที่เลือกก็ต้องอยู่ใน Lab VPC เช่นกัน (ข้อ 62)" }
    ]},
    { num: 68, task: "Task 6.10", desc: "กด View all instances", errors: [] },
    { num: 69, task: "Task 6.10", desc: "รอจน Public Instance แสดง Instance state=Running และ Status check=2/2 checks passed", errors: [
      { problem: "Instance ค้างอยู่ที่ Pending นานมาก", cause: "ปกติใช้เวลา 1-2 นาที ถ้านานกว่านั้นอาจมี issue กับ resource", fix: "รอ 2-3 นาที + กด refresh | ถ้านานเกิน 5 นาทียัง Pending → terminate แล้ว launch ใหม่" },
      { problem: "Status check 1/2 หรือ fail", cause: "Instance ยังบูตไม่เสร็จ หรือ network config มีปัญหา", fix: "รอ 3-5 นาที กด refresh | ถ้ายังไม่ผ่าน → terminate + launch ใหม่ตรวจว่า subnet/VPC ถูกต้อง" }
    ]},
    { num: 70, task: "Task 7", desc: "ที่เมนูด้านซ้าย เลือก Instances", errors: [] },
    { num: 71, task: "Task 7", desc: "เลือก (ติ๊ก) Public Instance", errors: [] },
    { num: 72, task: "Task 7", desc: "เลือก tab Networking ด้านล่าง", errors: [] },
    { num: 73, task: "Task 7", desc: "หาค่า Public IPv4 DNS", errors: [
      { problem: "ช่อง Public IPv4 DNS ว่างเปล่า ไม่มีค่าแสดง", cause: "VPC ไม่ได้ Enable DNS hostnames (ข้อ 9) หรือ instance ไม่ได้รับ public IP (ข้อ 17 หรือ 60)", fix: "ไป VPC → เลือก Lab VPC → Actions → Edit VPC settings → ติ๊ก Enable DNS hostnames → Save | และตรวจว่า instance มี public IP" },
      { problem: "มี Public IPv4 address แต่ไม่มี Public IPv4 DNS", cause: "VPC ไม่ได้ Enable DNS hostnames — instance จะได้ IP แต่ไม่ได้ DNS name", fix: "ไป VPC → Lab VPC → Actions → Edit VPC settings → Enable DNS hostnames ✓ → Save | หลัง save อาจต้อง stop + start instance ให้ DNS name ปรากฏ" }
    ]},
    { num: 74, task: "Task 7", desc: "Copy ค่า Public IPv4 DNS (อย่ากด link 'open address' เพราะมันจะใช้ HTTPS)", errors: [] },
    { num: 75, task: "Task 7", desc: "เปิด browser tab ใหม่ วาง DNS ที่ copy มาโดยใช้ http:// ข้างหน้า ต้องเห็น web page ของ instance", errors: [
      { problem: "ERR_CONNECTION_TIMED_OUT หรือ web page ไม่แสดงเลย", cause: "มีหลายสาเหตุที่เป็นไปได้ ต้องเช็คทีละจุดตามลำดับ", fix: "เช็คตามลำดับ:\n1. Instance state เป็น Running และ 2/2 checks passed? (ข้อ 69)\n2. Instance มี Public IPv4 address?\n3. Security Group มี Inbound rule HTTP port 80? (ข้อ 42)\n4. Route table มี route 0.0.0.0/0 ไปหา Internet Gateway? (ข้อ 34)\n5. Internet Gateway ถูก Attach กับ Lab VPC? (ข้อ 25)\n6. Public Subnet ถูก associate กับ Public Route Table? (ข้อ 38)\n7. URL ใช้ http:// ไม่ใช่ https://?" },
      { problem: "ERR_CONNECTION_REFUSED", cause: "Web server (httpd) ไม่ได้ทำงาน เพราะ user data script ไม่ได้ถูกใส่หรือ run ไม่สำเร็จ", fix: "ใช้ Session Manager เข้าไปใน instance แล้ว run: sudo systemctl start httpd | ถ้าไม่เจอ httpd แสดงว่า user data ไม่ได้ใส่ (ข้อ 65) หรือเลือก AMI ผิด (ข้อ 52)" },
      { problem: "ERR_SSL_PROTOCOL_ERROR หรือ SSL error", cause: "ใช้ https:// แทน http:// หรือกด link 'open address' ใน console ซึ่งจะเปิดเป็น HTTPS", fix: "เปลี่ยน URL เป็น http:// (ไม่มีตัว s) เพราะ lab นี้ไม่ได้ setup SSL certificate" }
    ]},
    { num: 76, task: "Task 7", desc: "ปิด browser tab กลับไป console", errors: [] },
    { num: 77, task: "Task 8", desc: "ค้นหา EC2 ใน search bar", errors: [] },
    { num: 78, task: "Task 8", desc: "ที่เมนูด้านซ้าย เลือก Instances", errors: [] },
    { num: 79, task: "Task 8", desc: "เลือก (ติ๊ก) Public Instance แล้วกด Connect", errors: [] },
    { num: 80, task: "Task 8", desc: "เลือก tab SSM Session Manager", errors: [] },
    { num: 81, task: "Task 8", desc: "กด Connect", errors: [
      { problem: "ปุ่ม Connect เป็นสีเทากดไม่ได้ หรือเจอ error 'We weren't able to connect to your instance'", cause: "SSM Agent ไม่สามารถ register กับ service ได้ มีหลายสาเหตุ", fix: "เช็คตามลำดับ:\n1. Name tag เป็น 'Public Instance' ตรงตัว? (ข้อ 48 — ต้อง P, I ตัวใหญ่ มีเว้นวรรค)\n2. IAM instance profile เป็น EC2InstProfile? (ข้อ 64)\n3. Instance state เป็น Running + 2/2? (ข้อ 69)\n4. รอ 3-5 นาทีหลัง launch แล้วหรือยัง?\n5. Instance มี internet access? (ข้อ 34, 25)" },
      { problem: "เคย Connect ได้แล้วแต่ตอนนี้ Connect ไม่ได้อีก", cause: "Lab อาจใกล้หมดเวลา หรือ instance ถูก stop/terminate โดยไม่ได้ตั้งใจ", fix: "เช็ค lab timer ที่ด้านบน — ถ้าใกล้หมดเวลา resource จะเริ่มหยุดทำงาน | เช็คว่า instance ยัง Running อยู่" }
    ]},
    { num: 82, task: "Task 8", desc: "พิมพ์คำสั่ง cd ~", errors: [] },
    { num: 83, task: "Task 8", desc: "พิมพ์คำสั่ง curl -I https://aws.amazon.com/training/", errors: [
      { problem: "curl timeout หรือ 'Could not resolve host'", cause: "Instance ไม่มีทางออก internet", fix: "เช็ค Route table มี route 0.0.0.0/0 ไปหา Internet Gateway? (ข้อ 34) | Internet Gateway ถูก Attach กับ Lab VPC? (ข้อ 25)" },
      { problem: "curl ทำงานไม่ได้ทั้งที่ข้อ 75 web page เข้าได้ปกติ", cause: "อาจเป็นเพราะ Security Group outbound rule ถูกแก้ไข หรือ NACL block outbound traffic", fix: "เช็ค Security Group ของ instance ว่า Outbound rules มี All traffic allow | เช็ค Network ACL ว่าไม่ได้ block outbound" }
    ]},
    { num: 84, task: "Task 8", desc: "ดูผลลัพธ์ของ curl command ต้องได้ HTTP/2 200", errors: [] },
    { num: 85, task: "Task 9", desc: "กลับไปที่ tab AWS Management Console", errors: [] },
    { num: 86, task: "Task 9", desc: "ค้นหา VPC ใน search bar", errors: [] },
    { num: 87, task: "Task 9", desc: "ที่เมนูด้านซ้าย เลือก NAT gateways", errors: [] },
    { num: 88, task: "Task 9", desc: "กด Create NAT gateway ตั้ง Name=Lab NGW, Subnet=Public Subnet, กด Allocate Elastic IP", errors: [
      { problem: "เจอ error 'An Elastic IP address is required'", cause: "ไม่ได้กดปุ่ม Allocate Elastic IP ก่อนกด Create", fix: "กดปุ่ม Allocate Elastic IP ที่อยู่ข้างๆ ก่อน แล้วค่อยกด Create NAT gateway" },
      { problem: "เลือก Subnet ผิดเป็น Private Subnet", cause: "NAT Gateway ต้องอยู่ใน Public Subnet เท่านั้น เพราะมันต้อง route ผ่าน IGW ไปออก internet", fix: "ถ้าสร้างไปแล้วใน Private Subnet → delete NAT Gateway (รอจน state เป็น Deleted) → สร้างใหม่เลือก Subnet=Public Subnet" }
    ]},
    { num: 89, task: "Task 9", desc: "กด Create NAT gateway จะเห็น success message", errors: [] },
    { num: 90, task: "Task 9", desc: "ที่เมนูด้านซ้าย เลือก Route tables", errors: [] },
    { num: 91, task: "Task 9", desc: "กด Create route table ตั้ง Name=Private Route Table, VPC=Lab VPC", errors: [
      { problem: "สร้าง Route Table แล้ว แต่ตอน associate subnet หา Private Subnet ไม่เจอ", cause: "เลือก VPC ผิดตอนสร้าง (เป็น default VPC)", fix: "Delete route table ที่สร้างผิด แล้วสร้างใหม่เลือก VPC=Lab VPC" }
    ]},
    { num: 92, task: "Task 9", desc: "กด Create route table จะเห็น success message", errors: [] },
    { num: 93, task: "Task 9", desc: "เลือก tab Routes", errors: [] },
    { num: 94, task: "Task 9", desc: "กด Edit routes", errors: [] },
    { num: 95, task: "Task 9", desc: "กด Add route ใส่ Destination=0.0.0.0/0 และ Target เลือก NAT Gateway แล้วเลือก Lab NGW", errors: [
      { problem: "ไม่เห็น NAT Gateway ใน Target dropdown", cause: "NAT Gateway อาจยังอยู่ state Pending (ใช้เวลา 1-2 นาทีหลังสร้าง) หรือ route table อยู่คนละ VPC กับ NAT", fix: "รอให้ NAT Gateway state เปลี่ยนเป็น Available แล้ว refresh dropdown | ตรวจว่า route table สร้างอยู่ใน Lab VPC" },
      { problem: "เลือก Internet Gateway แทน NAT Gateway (สับสน IGW กับ NAT)", cause: "Dropdown มีทั้ง IGW และ NAT ให้เลือก คนมักเลือกผิดเพราะข้อ 34 เพิ่งเลือก IGW มา", fix: "ข้อนี้ต้องเลือก NAT Gateway (ไม่ใช่ Internet Gateway!) เพราะเป็น Private Route Table — ถ้าเลือก IGW ไปแล้ว → Edit routes → เปลี่ยน target เป็น NAT Gateway" }
    ]},
    { num: 96, task: "Task 9", desc: "กด Save changes จะเห็น success message", errors: [] },
    { num: 97, task: "Task 9", desc: "เลือก tab Subnet associations", errors: [] },
    { num: 98, task: "Task 9", desc: "กด Edit subnet associations", errors: [] },
    { num: 99, task: "Task 9", desc: "ติ๊กเลือก Private Subnet แล้วกด Save associations", errors: [
      { problem: "ไม่เห็น Private Subnet ในลิสต์", cause: "Route table อยู่คนละ VPC กับ subnet", fix: "Delete route table นี้แล้วสร้างใหม่เลือก VPC=Lab VPC (ข้อ 91)" },
      { problem: "ติ๊กผิด subnet (เลือก Public แทน Private)", cause: "สับสนระหว่าง subnet — ถ้าเอา Public ไปใส่ Private RT จะทำให้ Public Instance route ไป NAT แทน IGW", fix: "กลับไป Edit subnet associations → เอาติ๊ก Public ออก → ติ๊ก Private Subnet แทน → Save" }
    ]},
    { num: 100, task: "Task 9", desc: "กด Save associations จะเห็น success message", errors: [] },
    { num: 101, task: "Task 10", desc: "ที่เมนูด้านซ้าย เลือก Security Groups", errors: [] },
    { num: 102, task: "Task 10", desc: "กด Create security group ตั้ง Name=Private SG, VPC=Lab VPC", errors: [
      { problem: "สร้าง Security Group แล้ว แต่ตอน launch Private Instance หาไม่เจอ", cause: "เลือก VPC ผิดตอนสร้าง (default VPC แทน Lab VPC) — VPC dropdown จะ default เป็น default VPC เสมอ", fix: "Delete SG ที่สร้างผิด แล้วสร้างใหม่ เปลี่ยน VPC เป็น Lab VPC ก่อนกด Create" }
    ]},
    { num: 103, task: "Task 10", desc: "ในส่วน Inbound rules กด Add rule เลือก Type=HTTP, Source=Custom แล้วพิมพ์ sg ในช่อง จะเห็น Public SG ให้เลือก", errors: [
      { problem: "พิมพ์ sg แล้วไม่เห็น Public SG ใน dropdown", cause: "Security Group นี้สร้างใน VPC คนละตัวกับ Public SG (SG จะเห็นเฉพาะ SG ที่อยู่ใน VPC เดียวกัน)", fix: "ตรวจว่า Private SG ที่กำลังสร้างอยู่ เลือก VPC=Lab VPC เหมือนกับ Public SG" },
      { problem: "เลือก source ผิดเป็น Anywhere-IPv4 แทน Custom", cause: "จะทำให้ private instance รับ traffic จากทุกที่ ไม่ใช่เฉพาะจาก public instance", fix: "แก้ inbound rule: เปลี่ยน Source เป็น Custom → พิมพ์ sg → เลือก Public SG" }
    ]},
    { num: 104, task: "Task 10", desc: "ในส่วน Tags กด Add new tag ใส่ Key=Name, Value=Private SG", errors: [] },
    { num: 105, task: "Task 10", desc: "กด Create security group จะเห็น success message", errors: [] },
    { num: 106, task: "Task 11", desc: "ค้นหา EC2 ใน search bar", errors: [] },
    { num: 107, task: "Task 11.1", desc: "เลือก Dashboard จากเมนูด้านซ้าย", errors: [] },
    { num: 108, task: "Task 11.1", desc: "กด Launch instance", errors: [] },
    { num: 109, task: "Task 11.2", desc: "ในส่วน Name and tags", errors: [] },
    { num: 110, task: "Task 11.2", desc: "ใส่ Name=Private Instance (ต้องตรงตัว เป็น case sensitive)", errors: [] },
    { num: 111, task: "Task 11.3", desc: "ในส่วน Application and OS Images", errors: [] },
    { num: 112, task: "Task 11.3", desc: "ตรวจว่าเลือก Amazon Linux", errors: [] },
    { num: 113, task: "Task 11.3", desc: "ตรวจว่าเลือก Amazon Linux 2023 AMI", errors: [] },
    { num: 114, task: "Task 11.4", desc: "ในส่วน Instance type", errors: [] },
    { num: 115, task: "Task 11.4", desc: "เลือก t3.micro", errors: [] },
    { num: 116, task: "Task 11.5", desc: "ในส่วน Key pair", errors: [] },
    { num: 117, task: "Task 11.5", desc: "เลือก Proceed without a key pair", errors: [] },
    { num: 118, task: "Task 11.6", desc: "ในส่วน Network settings", errors: [] },
    { num: 119, task: "Task 11.6", desc: "กด Edit แล้วตั้งค่า: VPC=Lab VPC, Subnet=Private Subnet", errors: [
      { problem: "ไม่เห็น Lab VPC หรือ Private Subnet ใน dropdown", cause: "ไม่ได้กด Edit ก่อน หรือ Region ผิด", fix: "ต้องกด Edit ข้างๆ Network settings ก่อน → จะเห็น dropdown | เช็ค Region มุมบนขวา" }
    ]},
    { num: 120, task: "Task 11.6", desc: "ตรวจว่า Auto-assign public IP = Disable", errors: [
      { problem: "ลืมเปลี่ยน Auto-assign public IP เป็น Disable", cause: "Private Instance ไม่ควรมี public IP — ถ้า Enable จะเสีย IP โดยไม่จำเป็น แต่ lab ยังทำงานได้ (ไม่ error)", fix: "ควรเลือก Disable สำหรับ Private Instance เพราะไม่ต้องการ public access โดยตรง" }
    ]},
    { num: 121, task: "Task 11.7", desc: "ที่ Firewall เลือก Select existing security group", errors: [] },
    { num: 122, task: "Task 11.7", desc: "เลือก Private SG", errors: [
      { problem: "หา Private SG ไม่เจอใน dropdown", cause: "ตอนสร้าง Security Group (ข้อ 102) เลือก VPC ผิด (เป็น default VPC) หรือตอน launch ยังไม่ได้เลือก Lab VPC ใน Network settings (ข้อ 119)", fix: "ตรวจว่ากด Edit ที่ Network settings แล้วเลือก VPC=Lab VPC ก่อน แล้ว SG จะปรากฏ | ถ้า Private SG อยู่ผิด VPC ต้อง delete แล้วสร้างใหม่ใน Lab VPC (ข้อ 102) | หมายเหตุ: lab ไม่มี permission ให้ delete VPC ดังนั้นถ้าสร้าง SG ผิด VPC ต้อง delete SG แล้วสร้างใหม่ในLab VPC เท่านั้น" }
    ]},
    { num: 123, task: "Task 11.9", desc: "กด expand Advanced details", errors: [] },
    { num: 124, task: "Task 11.9", desc: "ที่ IAM instance profile เลือก EC2InstProfile", errors: [] },
    { num: 125, task: "Task 11.9", desc: "ที่ User data ให้ paste script เดียวกับตอน Public Instance", errors: [] },
    { num: 126, task: "Task 11.11", desc: "ดูส่วน Summary ตรวจความถูกต้อง", errors: [] },
    { num: 127, task: "Task 11.11", desc: "กด Launch instance", errors: [
      { problem: "'You are not authorized' หรือ 'Instance limit exceeded'", cause: "Instance type ไม่ใช่ t3.micro, เลือก AMI ผิด, หรือมี instance รันอยู่เกิน limit ของ lab", fix: "เช็ค: instance type เป็น t3.micro? (ข้อ 115) | AMI เป็น Amazon Linux 2023? (ข้อ 113) | terminate instance เก่าที่ไม่ได้ใช้" },
      { problem: "กด Launch แล้วเจอ error เรื่อง Network/Subnet", cause: "ไม่ได้กด Edit ที่ Network settings (ข้อ 119) หรือเลือก VPC/Subnet ผิด", fix: "ย้อนไปดูข้อ 119-120 ว่ากด Edit แล้วเลือก Lab VPC + Private Subnet + Disable public IP ครบ" },
      { problem: "กด Launch แล้วเจอ error เรื่อง Security Group", cause: "Security Group อยู่คนละ VPC กับ Subnet ที่เลือก", fix: "ตรวจว่า Network settings เลือก Lab VPC แล้ว SG ที่เลือกก็ต้องอยู่ใน Lab VPC เช่นกัน (ข้อ 122)" }
    ]},
    { num: 128, task: "Task 11.11", desc: "กด View all instances", errors: [] },
    { num: 129, task: "Task 11.11", desc: "รอจน Private Instance แสดง Running + 2/2 checks passed", errors: [
      { problem: "Instance ค้างอยู่ที่ Pending นานมาก", cause: "ปกติใช้เวลา 1-2 นาที ถ้านานกว่านั้นอาจมี issue", fix: "รอ 2-3 นาที + กด refresh | ถ้านานเกิน 5 นาที → terminate แล้ว launch ใหม่" }
    ]},
    { num: 130, task: "Task 12", desc: "ที่เมนูด้านซ้าย เลือก Instances", errors: [] },
    { num: 131, task: "Task 12", desc: "เลือก (ติ๊ก) Private Instance แล้วกด Connect", errors: [] },
    { num: 132, task: "Task 12", desc: "เลือก tab SSM Session Manager", errors: [] },
    { num: 133, task: "Task 12", desc: "กด Connect", errors: [
      { problem: "ปุ่ม Connect เป็นสีเทากดไม่ได้ หรือ connect ไม่สำเร็จ", cause: "เหมือนข้อ 81 แต่สำหรับ Private Instance ที่ต้อง route ผ่าน NAT", fix: "เช็คตามลำดับ:\n1. Name tag เป็น 'Private Instance' ตรงตัว? (ข้อ 110)\n2. IAM instance profile เป็น EC2InstProfile? (ข้อ 124)\n3. Instance state เป็น Running + 2/2? (ข้อ 129)\n4. Private Route Table มี route 0.0.0.0/0 ไปหา NAT Gateway? (ข้อ 95)\n5. NAT Gateway อยู่ใน Public Subnet และ state=Available? (ข้อ 88)\n6. รอ 3-5 นาทีหลัง launch" },
      { problem: "เมื่อกี้ connect ได้ แต่ตอนนี้ connect ไม่ได้แล้ว", cause: "Lab ใกล้หมดเวลา (session expire) หรือ NAT Gateway ถูก delete/modify", fix: "เช็ค lab timer ด้านบน — ถ้าเหลือเวลาน้อย resource จะเริ่มหยุดทำงาน | ถ้ายังมีเวลาเหลือ เช็ค NAT Gateway state" },
      { problem: "NAT Gateway state เป็น Available แต่ private instance ยังไม่มี internet", cause: "NAT Gateway อยู่ใน Public Subnet แต่ route 0.0.0.0/0 ใน Private Route Table ชี้ไป NAT ผิดตัว หรือ Private Subnet ไม่ได้ associate กับ Private Route Table (ข้อ 99)", fix: "เช็ค: Private RT associate กับ Private Subnet? (ข้อ 99) | Route 0.0.0.0/0 ชี้ไป NAT ตัวที่ถูก? (ข้อ 95)" }
    ]},
    { num: 134, task: "Task 12", desc: "พิมพ์คำสั่ง cd ~", errors: [] },
    { num: 135, task: "Task 12", desc: "พิมพ์คำสั่ง curl -I https://aws.amazon.com/training/", errors: [
      { problem: "curl: (28) Connection timed out", cause: "Private Instance ไม่มีทางออก internet ผ่าน NAT Gateway", fix: "เช็คตามลำดับ:\n1. Private Route Table มี route 0.0.0.0/0 ไปหา NAT Gateway? (ข้อ 95)\n2. Private Subnet ถูก associate กับ Private Route Table? (ข้อ 99)\n3. NAT Gateway อยู่ใน Public Subnet? (ข้อ 88)\n4. NAT Gateway state เป็น Available?\n5. Public Route Table มี route 0.0.0.0/0 ไปหา Internet Gateway? (ข้อ 34)\n6. Internet Gateway ถูก Attach กับ Lab VPC? (ข้อ 25)" },
      { problem: "curl ได้ผลเป็น HTTP/2 200 (สำเร็จ)", cause: "ถูกต้องแล้ว นี่คือ expected output", fix: "ไม่ต้องทำอะไร ข้อนี้ pass" }
    ]},
    { num: 136, task: "Task 12", desc: "ดูผลลัพธ์ของ curl command ต้องได้ HTTP/2 200", errors: [] },
    { num: 137, task: "Task 12", desc: "ปิด Session Manager tab กลับไป console", errors: [] },
    { num: 138, task: "Optional 1", desc: "กลับไป AWS Management Console", errors: [] },
    { num: 139, task: "Optional 1", desc: "ที่เมนูด้านซ้าย เลือก Instances", errors: [] },
    { num: 140, task: "Optional 1", desc: "เลือก (ติ๊ก) Private Instance", errors: [] },
    { num: 141, task: "Optional 1", desc: "ที่ tab Details ให้ copy ค่า Private IPv4 addresses", errors: [] },
    { num: 142, task: "Optional 1", desc: "เอาติ๊ก Private Instance ออก", errors: [] },
    { num: 143, task: "Optional 1", desc: "เลือก (ติ๊ก) Public Instance", errors: [] },
    { num: 144, task: "Optional 1", desc: "กด Connect", errors: [] },
    { num: 145, task: "Optional 1", desc: "เลือก tab Session Manager", errors: [] },
    { num: 146, task: "Optional 1", desc: "กด Connect เพื่อเข้า Public Instance", errors: [] },
    { num: 147, task: "Optional 1", desc: "พิมพ์ curl แล้วตามด้วย Private IP ที่ copy มา (เช่น curl 10.0.2.131)", errors: [
      { problem: "curl timeout หรือ Connection refused", cause: "Private Security Group ไม่มี inbound rule HTTP ที่ source เป็น Public SG หรือ httpd ไม่ได้ running บน Private Instance", fix: "ตรวจ Private SG ว่ามี inbound HTTP โดย source เป็น Public SG (ข้อ 103) | ถ้า httpd ไม่ running ให้ SSM เข้า Private Instance แล้ว run: sudo systemctl start httpd" },
      { problem: "curl ค้าง ไม่มีอะไรเกิดขึ้นเลย (ไม่มี output ไม่มี error)", cause: "สาเหตุเดียวกับ timeout แต่ curl ยังรอ response อยู่ไม่ได้ตัดเอง — traffic ถูก block โดย Security Group หรือ Private IP ที่ใส่ผิด", fix: "กด Ctrl+C เพื่อตัด curl ก่อน → เช็ค:\n1. Private SG มี inbound HTTP from Public SG? (ข้อ 103)\n2. IP ที่ใส่เป็น Private IPv4 (10.0.2.x) ไม่ใช่ Public IP?\n3. httpd running บน Private Instance? (SSM เข้าไปเช็ค: sudo systemctl status httpd)" }
    ]},
    { num: 148, task: "Optional 1", desc: "ดูผลลัพธ์ของ curl command ต้องเห็น HTML ของ web page จาก Private Instance", errors: [] },
    { num: 149, task: "Optional 1", desc: "พิมพ์ ping แล้วตามด้วย Private IP (เช่น ping 10.0.2.131)", errors: [
      { problem: "ping ไม่ response (100% packet loss)", cause: "นี่คือ expected behavior เป็นโจทย์ของ lab — Private SG ไม่มี ICMP rule", fix: "ไปที่ Security Groups → เลือก Private SG → Edit inbound rules → Add rule → Type=Custom ICMP - IPv4, Source=Custom แล้วพิมพ์ sg เลือก Public SG → Save rules → กลับมา ping ใหม่จะ response" }
    ]},
    { num: 150, task: "Optional 1", desc: "copy คำสั่ง ping ที่ lab ให้", errors: [] },
    { num: 151, task: "Optional 1", desc: "กด CTRL+C เพื่อหยุด ping", errors: [] },
    { num: 152, task: "Optional 2", desc: "กลับไปที่ tab AWS Management Console", errors: [] },
    { num: 153, task: "Optional 2", desc: "ที่เมนูด้านซ้าย เลือก Instances", errors: [] },
    { num: 154, task: "Optional 2", desc: "เลือก (ติ๊ก) Public Instance", errors: [] },
    { num: 155, task: "Optional 2", desc: "กด Connect", errors: [] },
    { num: 156, task: "Optional 2", desc: "เลือก tab Session Manager", errors: [] },
    { num: 157, task: "Optional 2", desc: "กด Connect", errors: [] },
    { num: 158, task: "Optional 2", desc: "run คำสั่ง TOKEN=`curl -X PUT ... -H ... http://169.254.169.254/latest/api/token` เพื่อขอ IMDSv2 token", errors: [
      { problem: "ได้ 401 Unauthorized จาก metadata endpoint", cause: "ไม่ได้ใส่ token header หรือตัวแปร $TOKEN ว่างเปล่า", fix: "Run คำสั่ง token ก่อน (PUT /latest/api/token) → ตรวจว่ามีค่าโดยพิมพ์ echo $TOKEN → แล้วใส่ header -H 'X-aws-ec2-metadata-token: $TOKEN' ในคำสั่ง curl" }
    ]},
    { num: 159, task: "Optional 2", desc: "run คำสั่ง curl -H \"X-aws-ec2-metadata-token: $TOKEN\" http://169.254.169.254/latest/meta-data/ เพื่อดู metadata categories", errors: [] },
    { num: 160, task: "Optional 2", desc: "run คำสั่ง curl เพื่อดู public-hostname ของ instance", errors: [] },
    { num: 161, task: "End Lab", desc: "ปิด Session Manager tab", errors: [] },
    { num: 162, task: "End Lab", desc: "กลับไป AWS Management Console แล้วที่มุมบนขวา กด AWSLabsUser แล้วกด Sign out", errors: [] },
    { num: 163, task: "End Lab", desc: "กด End Lab แล้ว confirm เพื่อจบ lab", errors: [] }
  ]
};
