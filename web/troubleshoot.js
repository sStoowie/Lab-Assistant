const troubleshootData = {

lab2: [
  {
    title: "หน้าเว็บเข้าไม่ได้",
    when: "เปิด URL ของ Public Instance แล้ว browser โหลดไม่ขึ้น / timeout",
    checks: [
      { where: "EC2 → Instances → เลือก Public Instance", check: "Instance state", expect: "Running + Status 2/2 checks passed", ifNot: "รอ 2-3 นาที refresh | ถ้านานเกิน 5 นาที terminate แล้ว launch ใหม่" },
      { where: "EC2 → Instances → เลือก Public Instance → tab Networking", check: "Public IPv4 address", expect: "มีค่า (เช่น 3.x.x.x)", ifNot: "ตอน launch ไม่ได้ Enable auto-assign public IP → terminate + launch ใหม่เลือก Enable (ข้อ 60)" },
      { where: "EC2 → Security Groups → เลือก Public SG → tab Inbound rules", check: "Inbound rule", expect: "Type=HTTP, Port=80, Source=0.0.0.0/0 (Anywhere-IPv4)", ifNot: "Edit inbound rules → Add rule → HTTP + Anywhere-IPv4 → Save" },
      { where: "VPC → Route tables → เลือก Public Route Table → tab Routes", check: "Route 0.0.0.0/0", expect: "Target = igw-xxxxx (Internet Gateway)", ifNot: "Edit routes → Add route → 0.0.0.0/0 → Internet Gateway → Save" },
      { where: "VPC → Internet gateways → เลือก Lab IGW", check: "State", expect: "Attached (กับ Lab VPC)", ifNot: "Actions → Attach to VPC → เลือก Lab VPC → Attach" },
      { where: "VPC → Route tables → เลือก Public Route Table → tab Subnet associations", check: "Public Subnet อยู่ในลิสต์", expect: "Public Subnet ถูก associate", ifNot: "Edit subnet associations → ติ๊ก Public Subnet → Save" },
      { where: "Browser URL bar", check: "URL", expect: "ขึ้นต้นด้วย http:// (ไม่ใช่ https://)", ifNot: "เปลี่ยนเป็น http:// (lab ไม่มี SSL)" }
    ]
  },
  {
    title: "กด Connect ไม่ได้ (Session Manager)",
    when: "กด Connect แล้วปุ่มเป็นสีเทา หรือ error 'unable to connect'",
    checks: [
      { where: "EC2 → Instances → เลือก Public Instance → tab Tags", check: "Tag Name", expect: "Public Instance (P ตัวใหญ่, I ตัวใหญ่, มีเว้นวรรค)", ifNot: "Edit tags → แก้ Name = Public Instance → Save | อาจต้องรอ 2-3 นาทีให้ SSM re-register" },
      { where: "EC2 → Instances → เลือก Public Instance → tab Security → IAM Role", check: "IAM Role", expect: "EC2InstProfile", ifNot: "Actions → Security → Modify IAM role → เลือก EC2InstProfile → Update" },
      { where: "EC2 → Instances → เลือก Public Instance", check: "Instance state + Status check", expect: "Running + 2/2 checks passed", ifNot: "รอ 3-5 นาทีหลัง launch ให้ SSM agent register" },
      { where: "VPC → Route tables → Public Route Table → Routes", check: "Route 0.0.0.0/0 → IGW", expect: "มี route ไป Internet Gateway", ifNot: "SSM ต้องการ internet — เพิ่ม route 0.0.0.0/0 → IGW" }
    ]
  },
  {
    title: "curl ไม่ทำงาน (Private Instance ไม่มี internet)",
    when: "SSM เข้า Private Instance แล้ว curl ค้าง / timeout",
    checks: [
      { where: "VPC → Route tables → เลือก Private Route Table → tab Routes", check: "Route 0.0.0.0/0", expect: "Target = nat-xxxxx (NAT Gateway)", ifNot: "Edit routes → Add route → 0.0.0.0/0 → NAT Gateway → Save" },
      { where: "VPC → Route tables → Private Route Table → tab Subnet associations", check: "Private Subnet อยู่ในลิสต์", expect: "Private Subnet ถูก associate", ifNot: "Edit subnet associations → ติ๊ก Private Subnet → Save" },
      { where: "VPC → NAT gateways → เลือก Lab NGW", check: "State", expect: "Available", ifNot: "ถ้า Pending → รอ 1-2 นาที | ถ้า Failed → delete แล้วสร้างใหม่" },
      { where: "VPC → NAT gateways → เลือก Lab NGW → ดู Subnet", check: "Subnet", expect: "Public Subnet (ไม่ใช่ Private!)", ifNot: "NAT ต้องอยู่ใน Public Subnet → delete แล้วสร้างใหม่ใน Public Subnet" },
      { where: "VPC → Route tables → Public Route Table → Routes", check: "Route 0.0.0.0/0 → IGW", expect: "มี (NAT ต้องออก internet ผ่าน IGW)", ifNot: "เพิ่ม route 0.0.0.0/0 → IGW ใน Public Route Table" },
      { where: "VPC → Internet gateways → Lab IGW", check: "State", expect: "Attached กับ Lab VPC", ifNot: "Attach IGW กับ Lab VPC" }
    ]
  }
],

lab3: [
  {
    title: "หน้าเว็บเข้าไม่ได้ (ผ่าน Load Balancer)",
    when: "เปิด ALB DNS ใน browser แล้ว timeout หรือ 503",
    checks: [
      { where: "EC2 → Load Balancers → เลือก LabAppALB", check: "State", expect: "Active", ifNot: "รอ 2-3 นาทีหลังสร้าง ALB ให้เปลี่ยนจาก Provisioning เป็น Active" },
      { where: "EC2 → Target Groups → เลือก ALBTargetGroup → tab Targets", check: "Health status", expect: "healthy (ทั้ง 2 targets)", ifNot: "ดู Troubleshoot: Target unhealthy ด้านล่าง" },
      { where: "EC2 → Load Balancers → LabAppALB → tab Listeners", check: "Listener HTTP:80 → Forward to", expect: "ALBTargetGroup", ifNot: "Edit listener → เปลี่ยน target group เป็น ALBTargetGroup" },
      { where: "EC2 → Load Balancers → LabAppALB → tab Security", check: "Security groups", expect: "LabALBSecurityGroup เท่านั้น (ไม่มี default SG)", ifNot: "Edit security groups → ลบ default ออก → เหลือ LabALBSecurityGroup → Save" },
      { where: "Browser URL bar", check: "URL", expect: "http:// (ไม่ใช่ https://)", ifNot: "เปลี่ยนเป็น http://" }
    ]
  },
  {
    title: "หน้า Health status ขึ้น unhealthy",
    when: "EC2 → Target Groups → Targets tab แสดง unhealthy",
    checks: [
      { where: "EC2 → Target Groups → ALBTargetGroup → tab Targets", check: "Registered targets", expect: "มี AppServer1 + AppServer2 อยู่ในลิสต์", ifNot: "Register targets → เลือก AppServer1 + AppServer2 → Include as pending → Register" },
      { where: "EC2 → Instances → เลือก AppServer1 หรือ 2", check: "Instance state", expect: "Running + 2/2", ifNot: "รอ instance boot เสร็จ 2-3 นาที" },
      { where: "EC2 → Target Groups → ALBTargetGroup → tab Health checks", check: "Health check path", expect: "/ (หรือ path ที่ app respond)", ifNot: "Edit health check → แก้ path → Save" },
      { where: "รอ", check: "เวลา", expect: "รอ 2-5 นาทีหลัง register ให้ health check ผ่าน", ifNot: "ถ้ารอนานแล้วยัง unhealthy → เช็ค SG ของ instance ว่ารับ HTTP:80 จาก ALB SG" }
    ]
  },
  {
    title: "กด Save แล้ว connect database ไม่ได้",
    when: "กด Save ใน Settings page แล้วเจอ error",
    checks: [
      { where: "RDS → Databases → เลือก aurora cluster", check: "Status", expect: "Available", ifNot: "รอ DB สร้างเสร็จ (3-5 นาที) จน status = Available" },
      { where: "Settings page ในเว็บ → ช่อง Endpoint", check: "Endpoint", expect: "Writer endpoint (ลงท้าย .cluster-xxx.rds.amazonaws.com ไม่มี -ro)", ifNot: "ไป RDS → Databases → cluster → Connectivity → copy Writer endpoint มาใส่ใหม่" },
      { where: "Settings page ในเว็บ → ช่อง Database", check: "Database name", expect: "inventory (ตัวเล็กทั้งหมด)", ifNot: "แก้เป็น inventory" },
      { where: "Settings page ในเว็บ → ช่อง Username", check: "Username", expect: "dbadmin", ifNot: "แก้เป็น dbadmin" },
      { where: "Settings page ในเว็บ → ช่อง Password", check: "Password", expect: "LabPassword จากแผงด้านซ้าย (ไม่มี space หน้า/หลัง)", ifNot: "Copy LabPassword ใหม่จากแผงด้านซ้าย → paste ใหม่ตรวจว่าไม่มี space" },
      { where: "RDS → Databases → cluster → Connectivity & security → Security groups", check: "Security group", expect: "LabDBSecurityGroup (มี inbound MySQL:3306 from app SG)", ifNot: "SG ผิด → ต้อง modify cluster → เปลี่ยน SG เป็น LabDBSecurityGroup" }
    ]
  }
],

lab4: [
  {
    title: "หน้าเว็บเข้าไม่ได้ / unhealthy ตลอด",
    when: "Deregister AppServer แล้ว instances จาก ASG ยัง unhealthy นานมาก",
    checks: [
      { where: "EC2 → Instances → เลือก Inventory-App instance (จาก ASG) → Connect → Session Manager → Connect", check: "พิมพ์: sudo systemctl status httpd", expect: "active (running)", ifNot: "httpd ไม่ทำงาน → user data script fail → ไป Step 5 เช็ค User Data" },
      { where: "(ใน Session Manager เดิม)", check: "พิมพ์: curl localhost", expect: "เห็น HTML response", ifNot: "App ไม่ respond → httpd อาจ start แต่ app error → ดู log: sudo cat /var/log/httpd/error_log" },
      { where: "EC2 → Security Groups → หา Inventory-App SG → tab Inbound rules", check: "Inbound rule", expect: "Type=HTTP, Port=80, Source=Inventory-ALB SG (sg-xxxxx)", ifNot: "Edit inbound rules → Add: HTTP, Source=Custom → เลือก Inventory-ALB SG → Save" },
      { where: "EC2 → Target Groups → Inventory-App → tab Health checks", check: "Health check settings", expect: "Path=/, Protocol=HTTP, Port=traffic port", ifNot: "Edit → แก้ path/port → Save" },
      { where: "EC2 → Launch Templates → Lab-launch-template → tab Details → User data", check: "บรรทัดแรกสุด", expect: "#!/bin/bash (ไม่มีบรรทัดว่าง/space ข้างบน!)", ifNot: "แก้ launch template ลบบรรทัดว่างข้างบน #!/bin/bash → สร้าง version ใหม่ → delete ASG → สร้าง ASG ใหม่" },
      { where: "EC2 → Launch Templates → Lab-launch-template → tab Details → User data", check: "เนื้อหา script", expect: "มี yum install httpd + systemctl start httpd (ไม่มี smart quotes หรือ encoding ผิด)", ifNot: "Copy user data ใหม่จาก AppServer (EC2 → Instances → AppServer → Actions → Instance settings → Edit user data → Copy) → แก้ launch template → delete ASG → สร้างใหม่" },
      { where: "EC2 → Launch Templates → Lab-launch-template → tab Details", check: "IAM instance profile", expect: "Inventory-App-Role", ifNot: "แก้ launch template → เปลี่ยน IAM role → delete ASG → สร้างใหม่" },
      { where: "รอ", check: "Health check grace period", expect: "รอ 5 นาที (300 วินาที) หลัง instance launch", ifNot: "ถ้ายังไม่ถึง 5 นาทีอย่าเพิ่ง panic — health check ยังไม่เริ่มเช็ค" }
    ]
  },
  {
    title: "Instance ถูกลบแล้วสร้างใหม่วนไม่หยุด",
    when: "Instance management tab เห็น instance ถูก terminate แล้ว launch ใหม่ซ้ำๆ",
    checks: [
      { where: "EC2 → Auto Scaling Groups → WP-ASG → tab Activity", check: "Activity history → Status message", expect: "ดู error message ว่าบอกอะไร", ifNot: "อ่าน message → แก้ตามที่ error บอก" },
      { where: "EC2 → Target Groups → Inventory-App → tab Targets", check: "Health status details", expect: "ดูว่า unhealthy เพราะ reason อะไร (timeout? 502? 4xx?)", ifNot: "ถ้า timeout = httpd ไม่ running (user data) | ถ้า 502 = app crash | ถ้า 4xx = path ผิด" },
      { where: "สาเหตุหลัก", check: "User data #!/bin/bash", expect: "ต้องเป็นบรรทัดแรกสุด ไม่มีอะไรนำหน้า", ifNot: "แก้ launch template → ลบบรรทัดว่าง → delete ASG → สร้างใหม่" }
    ]
  }
],

lab5: [
  {
    title: "Upload รูปแล้วไม่มีอะไรเกิดขึ้น",
    when: "Upload .jpg ไป ingest/ แล้วไม่มี output ใน thumbnail/ หรือ mobile/",
    checks: [
      { where: "S3 → bucket → ดู folder ที่ upload ไป", check: "ไฟล์อยู่ใน folder ingest/ หรือไม่", expect: "ไฟล์อยู่ใน ingest/ (ไม่ใช่ root ของ bucket)", ifNot: "Upload ใหม่ โดยเข้าไปใน folder ingest/ ก่อนแล้วค่อย Upload" },
      { where: "S3 → bucket → ดูชื่อไฟล์", check: "นามสกุลไฟล์", expect: ".jpg (ตัวเล็ก ไม่ใช่ .JPG .jpeg .png)", ifNot: "Rename ไฟล์เป็น .jpg แล้ว upload ใหม่" },
      { where: "S3 → bucket → tab Properties → Event notifications", check: "Event notification ชื่อ resize-image-event", expect: "Prefix=ingest/ (มี slash) + Suffix=.jpg (มีจุด) + Destination=SNS topic", ifNot: "แก้ event notification: Prefix=ingest/ (ไม่ใช่ ingest) | Suffix=.jpg (ไม่ใช่ .jpeg)" },
      { where: "SNS → Topics → resize-image-topic → tab Access policy", check: "JSON policy", expect: "มี Principal: s3.amazonaws.com + SNS_TOPIC_OWNER + SNS_TOPIC_ARN ถูกเปลี่ยนเป็นค่าจริงหมดแล้ว", ifNot: "Edit access policy → ตรวจว่าไม่มี placeholder เหลือ (SNS_TOPIC_OWNER, SNS_TOPIC_ARN)" },
      { where: "SQS → thumbnail-queue → tab SNS subscriptions", check: "Subscription", expect: "มี resize-image-topic อยู่ในลิสต์", ifNot: "Subscribe to Amazon SNS topic → เลือก resize-image-topic → Save" },
      { where: "SQS → mobile-queue → tab SNS subscriptions", check: "Subscription", expect: "มี resize-image-topic อยู่ในลิสต์", ifNot: "Subscribe to Amazon SNS topic → เลือก resize-image-topic → Save" },
      { where: "Lambda → CreateThumbnail → tab Configuration → Triggers", check: "SQS trigger", expect: "thumbnail-queue (ไม่ใช่ mobile-queue!)", ifNot: "Delete trigger → Add trigger ใหม่ → SQS → thumbnail-queue → Batch=1 → Add" },
      { where: "Lambda → CreateMobileImage → tab Configuration → Triggers", check: "SQS trigger", expect: "mobile-queue (ไม่ใช่ thumbnail-queue!)", ifNot: "Delete trigger → Add trigger ใหม่ → SQS → mobile-queue → Batch=1 → Add" },
      { where: "Lambda → CreateThumbnail → tab Code → Runtime settings", check: "Handler", expect: "CreateThumbnail.handler (case sensitive!)", ifNot: "Edit → แก้ Handler → Save" },
      { where: "Lambda → CreateMobileImage → tab Code → Runtime settings", check: "Handler", expect: "CreateMobileImage.handler (case sensitive!)", ifNot: "Edit → แก้ Handler → Save" }
    ]
  }
],

lab6: [
  {
    title: "เปิด CloudFront URL แล้วเจอ Access Denied",
    when: "เปิด CloudFront DNS + /CachedObjects/logo.png แล้วเจอ AccessDenied",
    checks: [
      { where: "CloudFront → Distributions → เลือก distribution", check: "Status", expect: "Enabled + Last modified มี timestamp (ไม่ใช่ Deploying)", ifNot: "รอ 5-15 นาทีให้ deploy เสร็จ → refresh แล้วลองใหม่" },
      { where: "S3 → LabBucket → tab Permissions → Bucket policy", check: "Policy JSON → Resource field", expect: "arn:aws:s3:::bucket-name/* (มี /* ต่อท้าย!)", ifNot: "Edit policy → แก้ Resource ให้มี /* ต่อท้าย ARN → Save" },
      { where: "S3 → LabBucket → tab Permissions → Bucket policy", check: "Policy JSON → AWS:SourceArn", expect: "arn:aws:cloudfront::ACCOUNT:distribution/DIST_ID (CloudFront ARN ไม่ใช่ domain name)", ifNot: "Edit policy → แก้ AWS:SourceArn เป็น CloudFront ARN จริง (copy จาก CloudFront General tab)" },
      { where: "CloudFront → distribution → tab Origins", check: "Origin My Amazon S3 Origin", expect: "มี OAC ถูกตั้งค่า (Origin access = Origin access control settings)", ifNot: "Edit origin → เลือก Origin access control settings → เลือก OAC → Save" },
      { where: "CloudFront → distribution → tab Behaviors", check: "Behavior CachedObjects/*.png", expect: "Origin = My Amazon S3 Origin", ifNot: "Edit behavior → เปลี่ยน origin → Save" },
      { where: "Browser URL bar", check: "Path ใน URL", expect: "ตัวพิมพ์ใหญ่-เล็กตรงกับ folder ใน S3 เช่น /CachedObjects/logo.png (C ใหญ่, O ใหญ่)", ifNot: "แก้ URL ให้ตรงตัว case sensitive กับชื่อ folder + file ใน S3" }
    ]
  }
],

lab7: [
  {
    title: "หน้า WordPress เข้าไม่ได้ / หน้าเว็บเพี้ยน",
    when: "เปิด ALB DNS + /wp-login.php แล้ว timeout หรือหน้าเว็บไม่มี style",
    checks: [
      { where: "EC2 → Load Balancers → myWPAppALB", check: "State", expect: "Active", ifNot: "รอ 2-3 นาทีให้ ALB เปลี่ยนจาก Provisioning เป็น Active" },
      { where: "EC2 → Target Groups → myWPTargetGroup → tab Targets", check: "Health status", expect: "healthy ทั้ง 2 targets", ifNot: "ดู Troubleshoot: Target unhealthy ด้านล่าง" },
      { where: "CloudFormation → WPLaunchConfigStack → tab Parameters", check: "ALBDnsName", expect: "DNS ตรงๆ ไม่มี http:// หน้า ไม่มี / ท้าย ไม่มี space", ifNot: "ถ้ามี http:// หรือ / → delete stack → สร้างใหม่ด้วย DNS ที่ถูก → delete ASG → สร้าง ASG ใหม่" },
      { where: "Browser URL bar", check: "URL", expect: "http://myWPAppALB-xxx.region.elb.amazonaws.com/wp-login.php", ifNot: "ต้องมี http:// นำหน้า + /wp-login.php ต่อท้าย" }
    ]
  },
  {
    title: "สร้าง Instance แล้ว unhealthy ตลอด",
    when: "ASG launch instances ได้แต่ Target Group ยัง unhealthy",
    checks: [
      { where: "EC2 → Target Groups → myWPTargetGroup → tab Health checks", check: "Health check path", expect: "/wp-login.php", ifNot: "Edit → แก้ path เป็น /wp-login.php → Save" },
      { where: "CloudFormation → WPLaunchConfigStack → tab Parameters", check: "Database endpoint", expect: "Writer endpoint (ลงท้าย .cluster-xxx ไม่มี -ro)", ifNot: "Endpoint ผิด → delete stack → สร้างใหม่ด้วย Writer endpoint" },
      { where: "CloudFormation → WPLaunchConfigStack → tab Parameters", check: "WPElasticFileSystemID", expect: "fs-xxxxxxxx (File system ID จริงจาก EFS)", ifNot: "EFS ID ผิด → delete stack → สร้างใหม่ด้วย ID ที่ถูก" },
      { where: "CloudFormation → WPLaunchConfigStack → tab Parameters", check: "DB Name", expect: "WPDatabase (ไม่ใช่ MyDBCluster!)", ifNot: "ใส่ cluster name แทน DB name → delete stack → สร้างใหม่ใส่ WPDatabase" },
      { where: "EFS → File systems → myWPEFS → tab Network", check: "Mount targets", expect: "AppSubnet1 + AppSubnet2 กับ EFSMountTargetSecurityGroup (ไม่มี default SG)", ifNot: "ลบ mount target ที่ผิด → สร้างใหม่ใน AppSubnet + EFSMountTargetSG" },
      { where: "RDS → Databases → MyDBCluster", check: "Status", expect: "Available", ifNot: "รอ DB สร้างเสร็จ (5-10 นาที)" },
      { where: "EC2 → Instances → เลือก WP-App instance → Connect → Session Manager", check: "sudo systemctl status httpd", expect: "active (running)", ifNot: "User data fail → เช็ค launch template user data (#!/bin/bash ต้องเป็นบรรทัดแรก)" }
    ]
  }
],

lab1: []

};
