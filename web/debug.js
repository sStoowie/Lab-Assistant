const debugChecklistData = {
  lab1: [
    {
      title: '1. Console / Command Host',
      items: [
        { check: 'Region exercise / final Region', mustBe: 'เลือก Region ที่เปิด Console home ได้; ถ้า redirect ให้ Cancel แล้วเลือก Region อื่น → ตั้ง Region อื่นเป็น Default, Save settings และ Go to new default Region → ก่อนสร้าง resource เปลี่ยนกลับ {LabRegion}' },
        { check: 'Command Host', mustBe: 'EC2 Instance = Command Host / State = Running' },
        { check: 'Connection', mustBe: 'SSM Session Manager' },
        { check: 'Favorite service', mustBe: 'เลือกดาวอย่างน้อย 1 service → ตรวจใน Favorites → deselect เพื่อลบ' },
        { check: 'Dashboard widget', mustBe: 'Add widgets → ลาก widget มาวาง → ลาก title bar เพื่อย้าย / ลากมุมขวาล่างเพื่อ resize' },
        { check: 'Welcome to AWS widget', mustBe: 'เมนู … → Remove widget' }
      ]
    },
    {
      title: '2. S3 Console — Bucket / Object',
      items: [
        { check: 'S3 bucket creation settings', mustBe: 'Region = {LabRegion} ก่อน Create bucket / Settings อื่นคง Default ทั้งหมด' },
        { check: 'Console bucket identity', mustBe: 'labbucket-{NUMBER} / ตัวเล็ก / unique' },
        { check: 'Console bucket creation result', mustBe: 'Successfully created bucket / bucket ปรากฏใน General purpose buckets / Region = {LabRegion}' },
        { check: 'Upload target / object', mustBe: 'labbucket-{NUMBER} → Add files → HappyFace.jpg' },
        { check: 'Console upload result', mustBe: 'Upload succeeded / HappyFace.jpg อยู่ใน bucket' }
      ]
    },
    {
      title: '3. S3 CLI — Bucket / Upload',
      items: [
        { check: 'CLI bucket identity', mustBe: 'labclibucket-{NUMBER} / ห้ามใช้ชื่อ console bucket' },
        { check: 'Initial bucket list', mustBe: 'aws s3 ls → เห็น labbucket-{NUMBER}' },
        { check: 'Create bucket command / result', mustBe: 'aws s3 mb s3://labclibucket-{NUMBER} → make_bucket: labclibucket-{NUMBER}' },
        { check: 'Created bucket verification', mustBe: 'aws s3 ls → เห็น labclibucket-{NUMBER}' },
        { check: 'Upload command / result', mustBe: 'aws s3 cp /home/ssm-user/HappyFace.jpg s3://labclibucket-{NUMBER} → upload: ../../home/ssm-user/HappyFace.jpg to s3://labclibucket-{NUMBER}/HappyFace.jpg' },
        { check: 'CLI final object verification', mustBe: 'aws s3 ls s3://labclibucket-{NUMBER} → แสดง HappyFace.jpg' }
      ]
    }
  ],

  lab2: [
    {
      title: '1. VPC / Subnets',
      items: [
        { check: 'Region', mustBe: 'us-west-2 (Oregon)' },
        { check: 'Lab VPC', mustBe: 'Create VPC: VPC only (ห้าม VPC and more) / Name = Lab VPC / CIDR = 10.0.0.0/16 / State = Available / Enable DNS hostnames' },
        { check: 'Public Subnet', mustBe: 'VPC = Lab VPC (ห้าม default VPC) / Name = Public Subnet / CIDR = 10.0.0.0/24 / AZ แรก (ห้าม No Preference) / State = Available / Enable auto-assign public IPv4' },
        { check: 'Private Subnet', mustBe: 'VPC = Lab VPC (ห้าม default VPC) / Name = Private Subnet / CIDR = 10.0.2.0/23 / AZ แรกเดียวกับ Public Subnet (ห้าม No Preference) / State = Available' }
      ]
    },
    {
      title: '2. Internet Gateway / Public Route',
      items: [
        { check: 'Internet Gateway', mustBe: 'Name = Lab IGW / Attach to Lab VPC / Final state = Attached' },
        { check: 'Public Route Table', mustBe: 'Name = Public Route Table / VPC = Lab VPC (ห้าม default VPC)' },
        { check: 'Public route', mustBe: '0.0.0.0/0 → Internet Gateway → Lab IGW / Save changes สำเร็จ' },
        { check: 'Public subnet association', mustBe: 'Public Subnet เท่านั้น / Save associations สำเร็จ' }
      ]
    },
    {
      title: '3. Security Groups',
      items: [
        { check: 'Security Groups VPC', mustBe: 'Lab VPC ทุกครั้ง (ห้าม default VPC)' },
        { check: 'Public SG', mustBe: 'Name = Public SG / Description = Allows incoming traffic to public instance / Tag Name = Public SG / Inbound HTTP TCP 80 ← 0.0.0.0/0 / สร้างสำเร็จใน Lab VPC' },
        { check: 'Private SG', mustBe: 'Name = Private SG / Tag Name = Private SG / Inbound HTTP TCP 80 ← Public SG (Custom; ห้าม Anywhere-IPv4) / สร้างสำเร็จใน Lab VPC' }
      ]
    },
    {
      title: '4. EC2 — Common Settings',
      items: [
        { check: 'Key pair ทั้ง 2 instances', mustBe: 'Proceed without a key pair' },
        { check: 'IAM instance profile ทั้ง 2 instances', mustBe: 'EC2InstProfile' },
        { check: 'User data source / content', mustBe: 'Copy script จาก lab page โดยตรงและใช้ script เดียวกันทั้ง 2 instances / install httpd + php8.1 / enable + start httpd / download + unzip instanceData.zip' },
        { check: 'User data integrity', mustBe: '#!/bin/bash เป็นบรรทัดแรก / ไม่มีบรรทัดว่างก่อนหน้า / ไม่มี smart quotes หรือ hidden characters' }
      ]
    },
    {
      title: '5. Public EC2 Instance',
      items: [
        { check: 'Public instance identity', mustBe: 'Name = Public Instance / case-sensitive / เว้นวรรค 1 ช่อง' },
        { check: 'Public launch configuration', mustBe: 'Amazon Linux 2023 / t3.micro / Lab VPC / Public Subnet / Public IP Enable / Public SG / EC2InstProfile / user data ถูกต้อง; Select existing security group (ห้ามสร้างใหม่)' },
        { check: 'Public launch / runtime', mustBe: 'Launch instance สำเร็จ / Running / 3/3 checks passed' },
        { check: 'Public web endpoint', mustBe: 'Public IPv4 DNS ต้องไม่ว่าง; copy DNS โดยไม่กด open address / http://{PublicIPv4DNS} แสดงหน้าเว็บ (ห้าม https://)' },
        { check: 'Public Session Manager', mustBe: 'Connect สำเร็จ / cd ~ สำเร็จ' },
        { check: 'Public outbound test', mustBe: 'curl -I https://aws.amazon.com/training/ → HTTP/2 200' }
      ]
    },
    {
      title: '6. NAT Gateway / Private Route',
      items: [
        { check: 'NAT Gateway', mustBe: 'Name = Lab NGW / Public Subnet / Allocate Elastic IP ก่อน Create / Create สำเร็จ / State = Available' },
        { check: 'Private Route Table', mustBe: 'Name = Private Route Table / VPC = Lab VPC (ห้าม default VPC)' },
        { check: 'Private route', mustBe: '0.0.0.0/0 → NAT Gateway → Lab NGW / Save changes สำเร็จ' },
        { check: 'Private subnet association', mustBe: 'Private Subnet เท่านั้น / Save associations สำเร็จ' }
      ]
    },
    {
      title: '7. Private EC2 Instance',
      items: [
        { check: 'Private instance identity', mustBe: 'Name = Private Instance / case-sensitive / เว้นวรรค 1 ช่อง' },
        { check: 'Private launch configuration', mustBe: 'Amazon Linux 2023 / t3.micro / Lab VPC / Private Subnet / Public IP Disable / Private SG / EC2InstProfile / user data ถูกต้อง; Select existing security group' },
        { check: 'Private launch / runtime', mustBe: 'Launch instance สำเร็จ / Running / 3/3 checks passed' },
        { check: 'Private Session Manager', mustBe: 'Connect ผ่าน Private Route Table → Lab NGW สำเร็จ / cd ~ สำเร็จ' },
        { check: 'Private outbound test', mustBe: 'curl -I https://aws.amazon.com/training/ → HTTP/2 200' }
      ]
    },
    {
      title: '8. Result / Connectivity Test',
      items: [
        { check: 'Required connectivity result', mustBe: 'http://{PublicIPv4DNS} โหลดได้ / EC2 ทั้ง 2 = All checks passed / Private curl = HTTP/2 200' },
        { check: 'Optional private HTTP test', mustBe: 'Private IPv4 = 10.0.2.x / จาก Session Manager ของ Public Instance รัน curl {PrivateIPv4} → HTML ของ Private Instance' },
        { check: 'Optional ping before rule', mustBe: '100% packet loss เป็น expected เพราะยังไม่มี ICMP rule' },
        { check: 'Optional ICMP rule / retest', mustBe: 'Private SG: Custom ICMP - IPv4 ← Public SG → ping มี response / CTRL+C เพื่อหยุด' },
        { check: 'Optional IMDSv2 token', mustBe: 'PUT /latest/api/token → echo $TOKEN ต้องไม่ว่าง' },
        { check: 'Optional metadata requests', mustBe: 'ใส่ X-aws-ec2-metadata-token: $TOKEN ทุก request' },
        { check: 'Optional metadata result', mustBe: '/latest/meta-data/ แสดง categories (ไม่ใช่ 401) / public-hostname ตรงกับ Public Instance' }
      ]
    }
  ],

  lab3: [
    {
      title: '1. Aurora — Engine / Database Settings',
      items: [
        { check: 'Create database mode', mustBe: 'Full configuration (ห้าม Easy create)' },
        { check: 'Region', mustBe: 'us-west-2' },
        { check: 'Engine / template / scaling', mustBe: 'Aurora MySQL Compatible / Dev/Test / Provisioned / Burstable db.t3.medium' },
        { check: 'Cluster identifier', mustBe: 'aurora' },
        { check: 'Credentials', mustBe: 'Self managed / Master username = dbadmin / Master password + Confirm = {LabPassword}' },
        { check: 'Multi-AZ deployment', mustBe: "Don't create an Aurora Replica" },
        { check: 'Additional configuration / initial DB', mustBe: 'Expand / Initial database name = inventory (ห้ามเว้นว่าง)' },
        { check: 'DB cluster parameter group', mustBe: '{DBClusterParameterGroup} (ห้าม default)' },
        { check: 'Encryption at rest', mustBe: 'AES-256 / AWS-owned KMS key ตาม Default' },
        { check: 'Monitoring / maintenance', mustBe: 'Enhanced monitoring Off / Auto minor version upgrade Off' },
        { check: 'Create result', mustBe: 'Successfully created database aurora / Suggested add-ons popup = Close' },
        { check: 'Final status', mustBe: 'Available' }
      ]
    },
    {
      title: '2. Aurora — Network / Security',
      items: [
        { check: 'Aurora connectivity', mustBe: 'VPC = LabVPC / DB subnet group = labdbsubnetgroup / Public access = No' },
        { check: 'Aurora security group', mustBe: 'Choose existing → ลบ default → LabDBSecurityGroup เท่านั้น' },
        { check: 'DB SG inbound', mustBe: 'MySQL TCP 3306 ← App server SG' }
      ]
    },
    {
      title: '3. Target Group / Registered Targets',
      items: [
        { check: 'Target group configuration', mustBe: 'Instances / Name = ALBTargetGroup / VPC = LabVPC / settings อื่นคง Default' },
        { check: 'Register targets', mustBe: 'เลือก AppServer1 + AppServer2 → Include as pending below' },
        { check: 'Pending targets before create', mustBe: 'AppServer1 + AppServer2 อยู่ใน Targets section' },
        { check: 'Create / registered result', mustBe: 'Successfully created target group: ALBTargetGroup / Registered targets = AppServer1 + AppServer2' },
        { check: 'Health check / health', mustBe: 'Path = / / ทั้ง 2 targets = healthy' }
      ]
    },
    {
      title: '4. Application Load Balancer',
      items: [
        { check: 'ALB identity / network', mustBe: 'Application Load Balancer (ห้าม NLB) / Name = LabAppALB / VPC = LabVPC' },
        { check: 'ALB subnets', mustBe: '2 AZ → PublicSubnet1 + PublicSubnet2' },
        { check: 'ALB security group', mustBe: 'ลบ default → LabALBSecurityGroup เท่านั้น' },
        { check: 'Listener / default action', mustBe: 'HTTP:80 → ALBTargetGroup' },
        { check: 'Create / final state', mustBe: 'Successfully created load balancer: LabAppALB / Active หลัง Provisioning' }
      ]
    },
    {
      title: '5. Optional Cross-Region Replica',
      items: [
        { check: 'Optional replica source', mustBe: 'aurora Writer instance (ห้าม Regional cluster) / source settings อื่นคง Default' },
        { check: 'Optional replica identity / topology', mustBe: "Identifier = LabDBreplica (r ตัวเล็ก) / Don't create an Aurora Replica" },
        { check: 'Optional replica network', mustBe: '{RemoteRegion} / LabVPC / Public access No / LabDBSecurityGroup / connectivity และ replica settings อื่นคง Default' },
        { check: 'Optional replica create result', mustBe: 'Creating replica LabDBreplica' }
      ]
    },
    {
      title: '6. Application Settings / Result',
      items: [
        { check: 'Aurora readiness', mustBe: 'Writer endpoint = Available / Aurora = Available (ห้าม Creating, Modifying หรือ Backing-up)' },
        { check: 'Application URL / protocol', mustBe: 'http://{LabAppALBDnsName} / http:// เท่านั้น / Listener HTTP:80' },
        { check: 'Database endpoint / port', mustBe: '{WriterEndpoint} (ไม่มี -ro) / 3306' },
        { check: 'Database', mustBe: 'inventory' },
        { check: 'Username', mustBe: 'dbadmin' },
        { check: 'Password', mustBe: '{LabPassword}' },
        { check: 'Application settings save', mustBe: 'Save สำเร็จ / ไม่มี Unable to connect to database' },
        { check: 'Application final result', mustBe: 'โหลด initial inventory data และแสดงข้อมูลได้' }
      ]
    }
  ],

  lab4: [
    {
      title: '1. Inventory Application Settings',
      items: [
        { check: 'Region', mustBe: 'us-west-2' },
        { check: 'Public Subnet 1', mustBe: 'VPC = Lab VPC / CIDR = 10.0.0.0/24 / AZ ลงท้ายด้วย a' },
        { check: 'Public Subnet 1 routes', mustBe: '10.0.0.0/20 → local / 0.0.0.0/0 → Lab IG' },
        { check: 'Public Subnet 1 Network ACL', mustBe: 'Allow All traffic ทั้ง Inbound และ Outbound' },
        { check: 'Lab IG attachment', mustBe: 'Attached กับ Lab VPC' },
        { check: 'AppServer user data source', mustBe: 'Copy ทั้งก้อนจาก AppServer → เก็บใน plain-text editor' },
        { check: 'Existing traffic path', mustBe: 'Target group Inventory-App มี AppServer registered / Load balancer = Inventory-LB' },
        { check: 'Inventory settings save', mustBe: 'คงค่าที่ populate มาเป็น Default → Save → redirect ไป main page และแสดง inventory data' },
        { check: 'Inventory page footer', mustBe: 'แสดง Instance ID + Availability Zone' }
      ]
    },
    {
      title: '2. Security Groups / Security Chain',
      items: [
        { check: 'Inbound security chain', mustBe: '0.0.0.0/0 → HTTP:80 Inventory-ALB → HTTP:80 Inventory-App → MySQL:3306 Inventory-DB' },
        { check: 'Outbound security groups', mustBe: 'Inventory-ALB + Inventory-App + Inventory-DB อนุญาต All outbound traffic' }
      ]
    },
    {
      title: '3. Launch Template',
      items: [
        { check: 'Launch template identity', mustBe: 'Name = Lab-launch-template / Description = version 1' },
        { check: 'AMI / type', mustBe: 'Quick Start → Amazon Linux → Amazon Linux 2023 / t3.micro' },
        { check: 'Security group', mustBe: 'Inventory-App เท่านั้น' },
        { check: 'IAM profile', mustBe: 'Inventory-App-Role' },
        { check: 'User data', mustBe: 'Copy ทั้งก้อนจาก AppServer / #!/bin/bash เป็นบรรทัดแรก' },
        { check: 'Create result', mustBe: 'สร้างสำเร็จและมองเห็นใน View launch templates' }
      ]
    },
    {
      title: '4. Auto Scaling Group',
      items: [
        { check: 'ASG identity / launch template', mustBe: 'Name = Inventory-ASG / Lab-launch-template' },
        { check: 'ASG network', mustBe: 'Lab VPC / Private Subnet 1 + Private Subnet 2' },
        { check: 'Load balancer attachment', mustBe: 'Attach to an existing load balancer → Choose from target groups → Inventory-App | HTTP' },
        { check: 'Health check grace period', mustBe: '300 seconds' },
        { check: 'Group metrics', mustBe: 'Enable group metrics collection' },
        { check: 'Capacity', mustBe: 'Desired / Min / Max = 2 / 2 / 2' },
        { check: 'Tag', mustBe: 'Name = Inventory-App' },
        { check: 'Activity / instances', mustBe: 'Activity = Successful / 2 instances = InService + Healthy' }
      ]
    },
    {
      title: '5. Target Group / Instance Runtime',
      items: [
        { check: 'Initial targets', mustBe: '3 targets = 2 × Inventory-App + AppServer เดิม' },
        { check: 'Deregister original AppServer', mustBe: 'เลือก AppServer เดิมเท่านั้น → confirm Deregister → Successfully deregistered 1 target → draining แล้วหายจาก targets; instance ยัง Running' },
        { check: 'Instance runtime', mustBe: 'httpd = active (running) / curl localhost = HTML response' },
        { check: 'Application load distribution', mustBe: 'Refresh แล้ว Instance ID + AZ สลับระหว่าง 2 healthy Inventory-App targets' },
        { check: 'Failure test safety', mustBe: 'Terminate Inventory-App เพียง 1 instance (ห้าม AppServer / ห้ามเลือก 2 ตัว) → Terminate (delete)' },
        { check: 'Application during failure', mustBe: 'ยังใช้งานได้ / footer แสดง AZ เดียวชั่วคราว' },
        { check: 'ASG replacement', mustBe: 'สร้าง Inventory-App ใหม่เพื่อกลับ Desired = 2 / Initializing → Healthy + InService' },
        { check: 'Application after recovery', mustBe: 'Refresh แล้ว Instance ID + AZ สลับอีกครั้ง' }
      ]
    },
    {
      title: '6. Aurora Reader / Failover HA',
      items: [
        { check: 'Add Aurora reader', mustBe: 'inventory-cluster → Actions → Add reader (ห้าม inventory-primary) / Identifier = inventory-replica / AZ ต่างจาก inventory-primary / Enhanced monitoring Off' },
        { check: 'Reader create state', mustBe: 'inventory-replica = Creating' },
        { check: 'Pre-failover state', mustBe: 'inventory-replica = Available ก่อนกด Failover' },
        { check: 'Failover selection / action', mustBe: 'เลือก inventory-primary / Role = Writer / ห้ามเลือก cluster → Actions → Failover → Failover' },
        { check: 'Failover transition', mustBe: 'inventory-cluster = Failing over / replica shutdown → promoted to writer → instances rebooted' },
        { check: 'Roles after failover', mustBe: 'inventory-replica = Writer / inventory-primary = Reader' },
        { check: 'Application after DB failover', mustBe: 'ยังทำงานผ่าน cluster endpoint' }
      ]
    },
    {
      title: '7. Second NAT / Private Route HA',
      items: [
        { check: 'Second NAT Gateway', mustBe: 'Name = my-nat-gateway / Mode = Zonal / Public Subnet 2 / Allocate Elastic IP / created successfully' },
        { check: 'Private Route Table 2', mustBe: 'Lab VPC / created successfully' },
        { check: 'Private Route Table 2 route', mustBe: '0.0.0.0/0 → my-nat-gateway / Updated routes successfully' },
        { check: 'Private Route Table 2 association', mustBe: 'Private Subnet 2 เท่านั้น / Save associations สำเร็จ' }
      ]
    }
  ],

  lab5: [
    {
      title: '1. SNS Topic',
      items: [
        { check: 'Region', mustBe: 'us-east-2 (Ohio)' },
        { check: 'SNS topic', mustBe: 'Name = resize-image-topic-{UNIQUE_SUFFIX} / Type = Standard (ห้าม FIFO)' },
        { check: 'SNS topic identity', mustBe: 'ARN = {ResizeImageTopicArn} / Owner = {ACCOUNT_ID} (ตัวเลข 12 หลัก)' },
        { check: 'SNS create result', mustBe: 'Topic created / เปิด detail page ของ topic ที่สร้าง' }
      ]
    },
    {
      title: '2. SQS Queues / SNS Subscriptions',
      items: [
        { check: 'SQS queues', mustBe: 'thumbnail-queue + mobile-queue / Standard (ห้าม FIFO) / Configuration parameters คง Default ทั้งหมด' },
        { check: 'SNS subscriptions', mustBe: 'Use existing resource หรือ Enter Amazon SNS topic ARN → ทั้ง 2 queues subscribe {ResizeImageTopicArn} เดียวกัน → Save' },
        { check: 'SNS test message', mustBe: 'Subject = Hello world / Identical payload for all delivery protocols / Body = Testing Hello world หรือข้อความที่กำหนด' },
        { check: 'SNS test attribute', mustBe: 'String / Message / Hello World' },
        { check: 'SNS test publish', mustBe: 'Publish message สำเร็จ' },
        { check: 'SQS test receive', mustBe: 'Poll for messages → พบ message / ดู Details, Body, Attributes ได้' }
      ]
    },
    {
      title: '3. SNS Policy / S3 Event',
      items: [
        { check: 'SNS policy replacement', mustBe: 'ลบ policy เดิมทั้งหมดก่อน paste JSON ใหม่ / คง double quotes' },
        { check: 'SNS policy structure', mustBe: 'Version 2008-10-17 / __default_policy_ID / 2 statements' },
        { check: 'SNS owner statement', mustBe: 'Principal AWS = * / Actions = Get/Set attributes, Add/Remove permission, Delete, Subscribe, List, Publish' },
        { check: 'SNS policy resources', mustBe: 'ทั้ง 2 statements ใช้ {ResizeImageTopicArn}; แทน SNS_TOPIC_ARN ครบทุกจุด' },
        { check: 'SNS policy conditions / owner', mustBe: 'AWS:SourceAccount = {ACCOUNT_ID} ในทั้ง 2 statements; แทน SNS_TOPIC_OWNER ทั้ง 2 จุดด้วย {ACCOUNT_ID}' },
        { check: 'S3 publish statement', mustBe: 'Effect Allow / Principal s3.amazonaws.com / Action SNS:Publish' },
        { check: 'S3 event identity / type', mustBe: 'Name = resize-image-event / All object create events / s3:ObjectCreated:*' },
        { check: 'S3 event filter', mustBe: 'Prefix = ingest/ / Suffix = .jpg' },
        { check: 'S3 event destination', mustBe: 'SNS topic → Choose from topics หรือ Enter ARN → {ResizeImageTopicName} / {ResizeImageTopicArn} ที่สร้างจริง' },
        { check: 'S3 event save result', mustBe: 'resize-image-event ถูกสร้างสำเร็จ' }
      ]
    },
    {
      title: '4. Lambda — Common Settings',
      items: [
        { check: 'Lambda creation method', mustBe: 'Author from scratch' },
        { check: 'Lambda runtime', mustBe: 'Python 3.12' },
        { check: 'Lambda execution role', mustBe: 'Custom execution role On → {LabExecutionRole}' },
        { check: 'Lambda general config ทั้ง 2', mustBe: 'Timeout 60 sec / Memory 256 MB' },
        { check: 'Lambda environment ทั้ง 2', mustBe: 'bucket_name = {LabBucketName}' }
      ]
    },
    {
      title: '5. Lambda — CreateThumbnail',
      items: [
        { check: 'Function identity', mustBe: 'CreateThumbnail / Description = Create a thumbnail-sized image' },
        { check: 'Deployment', mustBe: 'Upload from → Amazon S3 location → {CreateThumbnailZIPLocation} / Successfully updated the function CreateThumbnail' },
        { check: 'Handler', mustBe: 'CreateThumbnail.handler' },
        { check: 'Trigger', mustBe: 'SQS → thumbnail-queue / Batch size = 1' },
        { check: 'Shared runtime settings', mustBe: 'Python 3.12 / {LabExecutionRole} / Timeout 60 sec / Memory 256 MB / bucket_name = {LabBucketName}' }
      ]
    },
    {
      title: '6. Lambda — CreateMobileImage',
      items: [
        { check: 'Function identity', mustBe: 'CreateMobileImage / Description = Create a mobile friendly image' },
        { check: 'Deployment', mustBe: 'Upload from → Amazon S3 location → {CreateMobileImageZIPLocation} / Successfully updated the function CreateMobileImage' },
        { check: 'Handler', mustBe: 'CreateMobileImage.handler' },
        { check: 'Trigger', mustBe: 'SQS → mobile-queue / Batch size = 1' },
        { check: 'Shared runtime settings', mustBe: 'Python 3.12 / {LabExecutionRole} / Timeout 60 sec / Memory 256 MB / bucket_name = {LabBucketName}' }
      ]
    },
    {
      title: '7. Test Object / Outputs / Logs',
      items: [
        { check: 'Test input', mustBe: 'AWS.jpg, MonaLisa.jpg หรือ HappyFace.jpg / ต้องเป็น JPEG จริง → upload เป็น ingest/{FILENAME}.jpg / .jpg ตัวเล็ก' },
        { check: 'Upload result', mustBe: 'Upload succeeded' },
        { check: 'Generated output keys', mustBe: 'thumbnail/Thumbnail-{FILENAME}.jpg + mobile/MobileImage-{FILENAME}.jpg / ต้องพบทั้ง 2 objects' },
        { check: 'Resize bounds', mustBe: 'Thumbnail ≤ 128 × 128 pixels / Mobile ≤ 640 × 320 pixels' },
        { check: 'CloudWatch logs', mustBe: 'ทั้ง CreateThumbnail และ CreateMobileImage มี log stream; เลือก stream ใหม่สุดตาม Last event time' },
        { check: 'CloudWatch REPORT fields', mustBe: 'RequestId / Duration / Billed Duration / Memory Size / Max Memory Used; Init Duration เฉพาะ cold start' }
      ]
    },
    {
      title: '8. Optional — Lifecycle / Email Subscription',
      items: [
        { check: 'Optional lifecycle identity / scope', mustBe: 'Rule = cleanup / Limit scope using one or more filters / Prefix = ingest/' },
        { check: 'Optional lifecycle actions / timing', mustBe: 'Expire current versions 30 days after creation + Delete noncurrent versions 1 day after becoming noncurrent' },
        { check: 'Optional lifecycle result', mustBe: 'Create rule สำเร็จ' },
        { check: 'Optional email subscription', mustBe: 'Topic = {ResizeImageTopicArn} / Protocol = Email / Endpoint = {EMAIL_ADDRESS}' },
        { check: 'Optional email create state', mustBe: 'Subscription สร้างแล้ว / Pending confirmation' },
        { check: 'Optional email final state', mustBe: 'กด Confirm subscription จากอีเมล Amazon SNS → Confirmed / มี subscription ID' }
      ]
    }
  ],

  lab6: [
    {
      title: '1. Existing CloudFront Distribution',
      items: [
        { check: 'CloudFront distribution', mustBe: 'ใช้ Distribution ที่ Lab สร้างไว้ (ห้ามสร้างใหม่) / Region = us-west-2' },
        { check: 'Distribution state', mustBe: 'Enabled / ไม่ใช่ Deploying' },
        { check: 'Distribution identity', mustBe: 'Domain = {CloudFrontDomain} / ARN = {CloudFrontDistributionArn} จาก Details (ห้ามใช้ domain แทน ARN)' },
        { check: 'Existing origin', mustBe: '{LabLoadBalancerDNS} / Application Load Balancer' },
        { check: 'Existing default behavior', mustBe: 'HTTP + HTTPS / GET + HEAD → Load Balancer origin' },
        { check: 'Existing-path tests', mustBe: 'https://{CloudFrontDomain} และ http://{LabLoadBalancerDNS} แสดงหน้าเว็บเดียวกัน' }
      ]
    },
    {
      title: '2. S3 Bucket / Object / Public Test',
      items: [
        { check: 'Lab bucket creation', mustBe: 'Name = {LabBucketName} / Region = {PrimaryRegion} (us-west-2) / settings อื่นคง Default' },
        { check: 'Enable public-policy test', mustBe: 'Block all public access = Off → Save → พิมพ์ confirm' },
        { check: 'Public-read policy', mustBe: 'Effect Allow / Principal * / Actions s3:GetObject + s3:GetObjectVersion / Resource {LabBucketArn}/* / RESOURCE_ARN เหลือ 0 จุด / policy saved' },
        { check: 'Test object', mustBe: 'สร้าง CachedObjects ด้วย encryption Default → upload key CachedObjects/logo.png' },
        { check: 'Initial direct S3 result', mustBe: 'Object URL แสดง logo.png' }
      ]
    },
    {
      title: '3. S3 Lockdown / CloudFront-Only Policy',
      items: [
        { check: 'CloudFront-only policy replacement', mustBe: 'ลบ public-read policy เดิมทั้งหมด → paste policy ใหม่' },
        { check: 'CloudFront-only policy authorization', mustBe: 'Effect Allow / Principal cloudfront.amazonaws.com / Actions s3:GetObject + s3:GetObjectVersion' },
        { check: 'CloudFront-only policy scope', mustBe: 'Resource = arn:aws:s3:::{LabBucketName}/* ({LabBucketArn}/*) / AWS:SourceArn = {CloudFrontDistributionArn} (ห้ามใช้ domain) / placeholders เหลือ 0 จุด' },
        { check: 'Lock down bucket', mustBe: 'หลังตั้ง OAC เปิด Block all public access = On → Save → confirm' }
      ]
    },
    {
      title: '4. S3 Origin / OAC',
      items: [
        { check: 'Origin domain', mustBe: 'เลือก {LabBucketName} จากส่วน Amazon S3' },
        { check: 'Origin path', mustBe: 'เว้นว่าง' },
        { check: 'Origin name', mustBe: 'My Amazon S3 Origin' },
        { check: 'Origin access / OAC', mustBe: 'Origin access control settings → Create new OAC → คง Default → Create / OAC = Created + Selected' },
        { check: 'Origin create result', mustBe: 'settings อื่นคง Default → Create origin สำเร็จ' }
      ]
    },
    {
      title: '5. CloudFront Cache Behavior',
      items: [
        { check: 'Path pattern', mustBe: 'CachedObjects/*.png' },
        { check: 'Origin', mustBe: 'My Amazon S3 Origin (ห้าม Load Balancer)' },
        { check: 'Cache key / policy', mustBe: 'Cache policy and origin request policy / CachingOptimized' },
        { check: 'Behavior create result', mustBe: 'settings อื่นคง Default → Create behavior' }
      ]
    },
    {
      title: '6. Access Result',
      items: [
        { check: 'Direct S3 result', mustBe: 'CachedObjects/logo.png Object URL → 403 AccessDenied' },
        { check: 'CloudFront object result', mustBe: 'https://{CloudFrontDomain}/CachedObjects/logo.png → object ถูก return จาก S3 origin และแสดงรูปภาพ' }
      ]
    },
    {
      title: '7. Optional — Cross-Region Replication: Buckets / Policy',
      items: [
        { check: 'Optional source versioning', mustBe: '{LabBucketName}: Enabled → Save changes' },
        { check: 'Optional destination identity', mustBe: 'Region = {SecondaryRegion} (ต้องต่างจาก {PrimaryRegion}) / Name = {DestinationBucketName}' },
        { check: 'Optional destination settings', mustBe: 'Block all public access = Off + acknowledge warning / Versioning = Enabled ก่อนสร้าง rule' },
        { check: 'Optional destination public-read policy', mustBe: 'Allow / Principal * / s3:GetObject + s3:GetObjectVersion / Resource arn:aws:s3:::{DestinationBucketName}/*' },
        { check: 'Optional destination public-access safety', mustBe: 'เปิด public access เฉพาะ direct-URL test ของ Lab; CRR ไม่จำเป็นต้องเปิด public และ public-read policy ไม่แนะนำสำหรับ production' },
        { check: 'Optional destination policy final state', mustBe: 'RESOURCE_ARN เหลือ 0 / policy saved / Block public access Off' }
      ]
    },
    {
      title: '8. Optional — Cross-Region Replication: Rule / Tests',
      items: [
        { check: 'Optional replication rule', mustBe: 'Name = MyCrossRegionReplication / Source = {LabBucketName} / Apply to all objects in the bucket' },
        { check: 'Optional replication destination', mustBe: '{DestinationBucketName} ใน {SecondaryRegion}' },
        { check: 'Optional replication IAM role', mustBe: 'Choose from existing IAM roles → S3CRRRole' },
        { check: 'Optional replication save', mustBe: 'settings อื่นคง Default → Save / Replicate existing objects = No, do not replicate existing objects → Submit' },
        { check: 'Optional replication scope', mustBe: 'Rule นี้ replicate เฉพาะ objects ใหม่ที่สร้างหลัง rule; objects เดิมไม่ถูก replicate' },
        { check: 'Optional replication rule state', mustBe: 'Enabled / configuration successfully updated' },
        { check: 'Optional replication test upload', mustBe: 'upload CachedObjects/logo2.png หลังสร้าง rule' },
        { check: 'Optional replication status', mustBe: 'Source: PENDING → COMPLETED / Destination key = CachedObjects/logo2.png / Destination status = REPLICA' },
        { check: 'Optional destination URL result', mustBe: 'Object URL แสดง logo2.png / ไม่ใช่ 403' }
      ]
    }
  ],

  lab7: [
    {
      title: '1. VPC CloudFormation Stack',
      items: [
        { check: 'Region throughout lab', mustBe: '{LabRegion} / ห้ามเปลี่ยนถ้าไม่ได้สั่ง' },
        { check: 'VPC stack create', mustBe: 'With new resources (standard) / Existing template → S3 URL → {Task1TemplateUrl} / Stack name = VPCStack' },
        { check: 'VPC stack options', mustBe: 'Parameters / Options คง Default → Next → Next → Submit' },
        { check: 'VPC stack status', mustBe: 'CREATE_COMPLETE' },
        { check: 'VPC stack resources', mustBe: 'LabVPC / 2 Public + 2 App + 2 Database subnets / IGW / NAT / Route Tables / SGs / 2 Elastic IPs' },
        { check: 'VPC stack routes', mustBe: 'Public subnets → IGW / App + Database private subnets → NAT Gateway' }
      ]
    },
    {
      title: '2. DB Subnet Group / Aurora RDS',
      items: [
        { check: 'DB subnet group identity', mustBe: 'Name = AuroraSubnetGroup / Description = A 2 AZ subnet group for my database / VPC = LabVPC' },
        { check: 'DB subnet group subnets', mustBe: '10.0.4.0/24 + 10.0.5.0/24 / AZ ของ DatabaseSubnet1 + DatabaseSubnet2' },
        { check: 'Aurora creation mode / engine', mustBe: 'Full configuration / Aurora MySQL / Production' },
        { check: 'Aurora cluster identifier', mustBe: 'MyDBCluster' },
        { check: 'Aurora credentials', mustBe: 'Self managed / admin / Master password + Confirm = {LabPassword} / ไม่มี space' },
        { check: 'Aurora instance class', mustBe: 'Burstable → db.t3.medium' },
        { check: 'Aurora topology', mustBe: 'Create Aurora Replica in different AZ / Writer + Reader คนละ AZ' },
        { check: 'Aurora network', mustBe: 'LabVPC / AuroraSubnetGroup / Public access = No' },
        { check: 'Aurora security group', mustBe: 'RDSSecurityGroup เท่านั้น / ลบ default' },
        { check: 'Aurora port', mustBe: '3306 (Default)' },
        { check: 'Aurora monitoring', mustBe: 'Enhanced monitoring Off' },
        { check: 'Aurora database / encryption', mustBe: 'Initial DB = WPDatabase (ห้ามใช้ MyDBCluster) / AWS owned KMS key (SSE-RDS)' },
        { check: 'Aurora maintenance / protection', mustBe: 'Auto minor version upgrade Off / Deletion protection Off' },
        { check: 'Aurora final status', mustBe: 'Available' }
      ]
    },
    {
      title: '3. EFS / Mount Targets',
      items: [
        { check: 'EFS creation path', mustBe: 'Create file system → Customize' },
        { check: 'EFS identity', mustBe: 'Name = myWPEFS / Tag Name = myWPEFS' },
        { check: 'EFS availability / durability', mustBe: 'Regional (ห้าม One Zone)' },
        { check: 'EFS backups / encryption', mustBe: 'Automatic backups Off / Encryption at rest Off' },
        { check: 'EFS lifecycle', mustBe: 'IA None / Archive None' },
        { check: 'EFS performance', mustBe: 'Throughput = Bursting / Performance = General Purpose' },
        { check: 'EFS VPC', mustBe: 'LabVPC' },
        { check: 'EFS mount targets', mustBe: 'AppSubnet1 ใน AZ ของ DatabaseSubnet1 + AppSubnet2 ใน AZ ของ DatabaseSubnet2 / EFSMountTargetSecurityGroup เท่านั้นทั้งคู่ / ลบ default' },
        { check: 'EFS policy / other settings', mustBe: 'File system policy ไม่ตั้งค่า / settings อื่นคง Default → Next → Create' },
        { check: 'EFS final ID', mustBe: '{EfsId}' }
      ]
    },
    {
      title: '4. Target Group / Health Check',
      items: [
        { check: 'Target group', mustBe: 'Name = myWPTargetGroup / Type = Instances / VPC = LabVPC' },
        { check: 'Protocol / port', mustBe: 'HTTP / 80' },
        { check: 'Health path', mustBe: '/wp-login.php' },
        { check: 'Threshold', mustBe: 'Healthy 2 / Unhealthy 10' },
        { check: 'Timeout / interval', mustBe: '50 / 60 seconds' },
        { check: 'Registration / other settings', mustBe: 'settings อื่นคง Default / ไม่ register targets → Next → Create' }
      ]
    },
    {
      title: '5. Application Load Balancer',
      items: [
        { check: 'ALB identity', mustBe: 'Application Load Balancer / Name = myWPAppALB / VPC = LabVPC' },
        { check: 'ALB subnets', mustBe: 'PublicSubnet1 + PublicSubnet2' },
        { check: 'ALB security group', mustBe: 'AppInstanceSecurityGroup เท่านั้น / ลบ default' },
        { check: 'Listener / default action', mustBe: 'HTTP:80 → myWPTargetGroup' },
        { check: 'ALB final state / metadata', mustBe: 'Active / DNS name = {AlbDnsName}' }
      ]
    },
    {
      title: '6. WPLaunchConfigStack',
      items: [
        { check: 'WP stack create', mustBe: 'With new resources / Existing template → Amazon S3 URL → {Task5TemplateUrl} / Stack name = WPLaunchConfigStack' },
        { check: 'WP stack options', mustBe: 'คง Default → Next → Submit' },
        { check: 'WP stack status / resource', mustBe: 'CREATE_COMPLETE / Launch Template พร้อม WordPress User Data ถูกสร้าง' },
        { check: 'DB name', mustBe: 'WPDatabase (ห้ามใช้ cluster name)' },
        { check: 'DB connection', mustBe: 'Endpoint = {WriterEndpoint} (ไม่มี -ro) / User = admin / Password = {LabPassword}' },
        { check: 'WordPress admin', mustBe: 'User = wpadmin / Password = {LabPassword} / Email รูปแบบ valid เช่น admin@example.com' },
        { check: 'Instance defaults', mustBe: 't3.medium / LatestAL2023AmiId Default' },
        { check: 'ALBDnsName parameter', mustBe: '{AlbDnsName} / ไม่มี http:// / ไม่มี slash ท้าย / ไม่มี space' },
        { check: 'EFS ID', mustBe: '{EfsId}' },
        { check: 'WP stack final parameter review', mustBe: 'DB, WP, instance, ALB DNS และ EFS values ตรงก่อน Submit' }
      ]
    },
    {
      title: '7. Auto Scaling Group',
      items: [
        { check: 'ASG identity / template', mustBe: 'Name = WP-ASG / Launch Template ที่สร้างโดย WPLaunchConfigStack' },
        { check: 'ASG network', mustBe: 'LabVPC / AppSubnet1 + AppSubnet2' },
        { check: 'Load balancer attachment', mustBe: 'Attach existing → myWPTargetGroup | HTTP' },
        { check: 'Health checks', mustBe: 'ELB health checks On / Grace period = 300 seconds หรือมากกว่า' },
        { check: 'Scaling', mustBe: 'Desired 2 / Min 2 / Max 4 / Target tracking scaling policy / settings คง Default' },
        { check: 'Group metrics', mustBe: 'Enable group metrics collection' },
        { check: 'Tag', mustBe: 'Name = WP-App' },
        { check: 'Notifications', mustBe: 'ไม่ตั้งค่า' },
        { check: 'ASG Activity', mustBe: 'Successful' },
        { check: 'Instances', mustBe: '2 × InService' }
      ]
    },
    {
      title: '8. Result / WordPress Login',
      items: [
        { check: 'Target health', mustBe: 'healthy ทั้ง 2 targets' },
        { check: 'WordPress final result', mustBe: 'http://{AlbDnsName}/wp-login.php โหลดสมบูรณ์ / login ด้วย wpadmin / {LabPassword} สำเร็จ' }
      ]
    }
  ]
};
