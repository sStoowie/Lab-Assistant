const specsHTML = {
  lab2: `
    <div class="spec-block overview"><h3>สรุปภาพรวม Lab 2</h3>
      <ol class="overview-list">
        <li>สร้าง <strong>VPC</strong> — เป็น network หลักที่จะวาง resource ทั้งหมดไว้ข้างใน (เหมือน "บ้าน" ของ infrastructure)</li>
        <li>สร้าง <strong>Subnets</strong> — แบ่ง VPC เป็น 2 ส่วน: <em>Public Subnet</em> (เข้าถึงจาก internet ได้) กับ <em>Private Subnet</em> (ซ่อนจาก internet)</li>
        <li>สร้าง <strong>Internet Gateway</strong> — เปิดประตูให้ VPC เชื่อมต่อกับ internet ได้</li>
        <li>สร้าง <strong>Route Tables</strong> — กำหนดเส้นทาง: Public Subnet → ออก internet ผ่าน IGW | Private Subnet → ออก internet ผ่าน NAT</li>
        <li>สร้าง <strong>NAT Gateway</strong> — ให้ Private Subnet ออก internet ได้ (download updates, connect APIs) โดยไม่ต้องเปิดให้คนนอกเข้ามา</li>
        <li>สร้าง <strong>Security Groups</strong> — firewall กำหนดว่า traffic อะไรเข้า-ออก instance ได้บ้าง</li>
        <li>Launch <strong>EC2 Instances</strong> — สร้าง web server ทั้งใน Public (เข้าถึงได้) และ Private (ซ่อน)</li>
        <li>ทดสอบ — เปิด web page, Session Manager, curl, ping ตรวจว่าทุกอย่างเชื่อมกันถูกต้อง</li>
      </ol>
    </div>
    <div class="spec-block"><h3>VPC</h3><ul>
      <li>Resources to create: <strong>VPC only</strong></li>
      <li>Name tag: <strong>Lab VPC</strong></li>
      <li>IPv4 CIDR: <code>10.0.0.0/16</code></li>
      <li>หลังสร้าง → Actions → Edit VPC settings → <strong>Enable DNS hostnames</strong> ✓</li>
    </ul></div>
    <div class="spec-block"><h3>Subnets</h3>
      <div class="spec-sub"><h4>Public Subnet</h4><ul>
        <li>VPC: <strong>Lab VPC</strong></li>
        <li>Name: <strong>Public Subnet</strong></li>
        <li>AZ: เลือกอันแรกในลิสต์</li>
        <li>CIDR: <code>10.0.0.0/24</code></li>
        <li>หลังสร้าง → <strong>Enable auto-assign public IPv4</strong> ✓</li>
      </ul></div>
      <div class="spec-sub"><h4>Private Subnet</h4><ul>
        <li>VPC: <strong>Lab VPC</strong></li>
        <li>Name: <strong>Private Subnet</strong></li>
        <li>AZ: เลือกอันแรก (เดียวกับ Public)</li>
        <li>CIDR: <code>10.0.2.0/23</code></li>
      </ul></div>
    </div>
    <div class="spec-block"><h3>Internet Gateway</h3><ul>
      <li>Name: <strong>Lab IGW</strong></li>
      <li>หลังสร้าง → Attach to VPC → <strong>Lab VPC</strong></li>
    </ul></div>
    <div class="spec-block"><h3>NAT Gateway</h3><ul>
      <li>Name: <strong>Lab NGW</strong></li>
      <li>Subnet: <strong>Public Subnet</strong> (ไม่ใช่ Private!)</li>
      <li>Connectivity: Public</li>
      <li>Elastic IP: กด <strong>Allocate Elastic IP</strong></li>
    </ul></div>
    <div class="spec-block"><h3>Route Tables</h3>
      <div class="spec-sub"><h4>Public Route Table</h4><ul>
        <li>VPC: <strong>Lab VPC</strong></li>
        <li>Route: <code>0.0.0.0/0</code> → Internet Gateway</li>
        <li>Associate: <strong>Public Subnet</strong></li>
      </ul></div>
      <div class="spec-sub"><h4>Private Route Table</h4><ul>
        <li>VPC: <strong>Lab VPC</strong></li>
        <li>Route: <code>0.0.0.0/0</code> → NAT Gateway</li>
        <li>Associate: <strong>Private Subnet</strong></li>
      </ul></div>
    </div>
    <div class="spec-block"><h3>Security Groups</h3>
      <div class="spec-sub"><h4>Public SG</h4><ul>
        <li>VPC: <strong>Lab VPC</strong></li>
        <li>Inbound: HTTP from <strong>Anywhere-IPv4</strong></li>
      </ul></div>
      <div class="spec-sub"><h4>Private SG</h4><ul>
        <li>VPC: <strong>Lab VPC</strong></li>
        <li>Inbound: HTTP from Custom → <strong>Public SG</strong></li>
      </ul></div>
    </div>
    <div class="spec-block"><h3>EC2 Instances</h3>
      <div class="spec-sub"><h4>Public Instance</h4><ul>
        <li>Name: <strong>Public Instance</strong> (case sensitive)</li>
        <li>AMI: Amazon Linux 2023 | Type: <strong>t3.micro</strong></li>
        <li>Network: Lab VPC, <strong>Public Subnet</strong>, Public IP=Enable</li>
        <li>SG: <strong>Public SG</strong> | IAM: <strong>EC2InstProfile</strong></li>
        <li>User data: paste script จาก lab</li>
      </ul></div>
      <div class="spec-sub"><h4>Private Instance</h4><ul>
        <li>Name: <strong>Private Instance</strong> (case sensitive)</li>
        <li>AMI: Amazon Linux 2023 | Type: <strong>t3.micro</strong></li>
        <li>Network: Lab VPC, <strong>Private Subnet</strong>, Public IP=Disable</li>
        <li>SG: <strong>Private SG</strong> | IAM: <strong>EC2InstProfile</strong></li>
        <li>User data: paste script เดียวกัน</li>
      </ul></div>
    </div>
    <div class="spec-block"><h3>Test / Verify</h3><ul>
      <li>Web: ใช้ <code>http://</code> + Public IPv4 DNS (ไม่ใช่ https)</li>
      <li>Session Manager: รอ 3-5 นาทีหลัง launch</li>
      <li>curl: ต้องได้ HTTP/2 200</li>
      <li>Optional ping: ต้องเพิ่ม ICMP rule ใน Private SG</li>
    </ul></div>
  `,

  lab3: `
    <div class="spec-block overview"><h3>สรุปภาพรวม Lab 3</h3>
      <ol class="overview-list">
        <li>สร้าง <strong>RDS Aurora Database</strong> — เป็น database layer สำหรับเก็บข้อมูล inventory ของ web app (เลือก Aurora เพราะ performance ดีกว่า MySQL ธรรมดา)</li>
        <li>สร้าง <strong>Target Group</strong> — กลุ่มเป้าหมายที่ ALB จะส่ง traffic ไปหา (register AppServer1 + AppServer2)</li>
        <li>สร้าง <strong>Application Load Balancer</strong> — กระจาย traffic จาก user ไปหา EC2 instances หลายตัว (HA + scalability)</li>
        <li>ทดสอบ <strong>Connectivity</strong> — เปิด ALB URL เข้า web app แล้ว connect database ผ่าน Settings page</li>
        <li>(Optional) สร้าง <strong>Cross-Region Read Replica</strong> — copy database ไปอีก region เพื่อ disaster recovery</li>
      </ol>
    </div>

    <div class="spec-block"><h3>RDS Aurora Database</h3><ul>
      <li>Engine type: <strong>Aurora (MySQL Compatible)</strong></li>
      <li>Template: <strong>Dev/Test</strong></li>
      <li>Cluster scalability: <strong>Provisioned</strong></li>
      <li>Instance class: <strong>Burstable (t classes)</strong> → <code>db.t3.medium</code></li>
      <li>DB cluster identifier: <code>aurora</code></li>
      <li>Master username: <code>dbadmin</code></li>
      <li>Credentials: <strong>Self managed</strong></li>
      <li>Master password: <strong>LabPassword</strong> (ดูจากด้านซ้ายของ lab)</li>
      <li>Multi-AZ: <strong>Don't create an Aurora Replica</strong></li>
    </ul></div>
    <div class="spec-block"><h3>RDS Connectivity</h3><ul>
      <li>VPC: <strong>LabVPC</strong></li>
      <li>DB subnet group: <strong>labdbsubnetgroup</strong></li>
      <li>Public access: <strong>No</strong></li>
      <li>Security group: Existing → <strong>LabDBSecurityGroup</strong> (ลบ default ออก!)</li>
    </ul></div>
    <div class="spec-block"><h3>RDS Monitoring & Additional</h3><ul>
      <li>Enhanced Monitoring: <strong>เอาติ๊กออก!</strong></li>
      <li>Database name: <code>inventory</code></li>
      <li>DB cluster parameter group: <strong>DBClusterParameterGroup</strong> (ดูจากด้านซ้ายของ lab)</li>
      <li>Auto minor version upgrade: <strong>เอาติ๊กออก!</strong></li>
    </ul></div>
    <div class="spec-block"><h3>Target Group</h3><ul>
      <li>Target type: <strong>Instances</strong></li>
      <li>Name: <code>ALBTargetGroup</code></li>
      <li>VPC: <strong>LabVPC</strong></li>
      <li>Register targets: <strong>AppServer1</strong> + <strong>AppServer2</strong> → กด Include as pending below</li>
    </ul></div>
    <div class="spec-block"><h3>Application Load Balancer</h3><ul>
      <li>Name: <code>LabAppALB</code></li>
      <li>VPC: <strong>LabVPC</strong></li>
      <li>Subnets: <strong>PublicSubnet1</strong> (AZ1) + <strong>PublicSubnet2</strong> (AZ2)</li>
      <li>Security group: <strong>LabALBSecurityGroup</strong> (ลบ default ออก!)</li>
      <li>Listener HTTP:80 → Target group: <strong>ALBTargetGroup</strong></li>
    </ul></div>
    <div class="spec-block"><h3>Task 4: Test Connectivity</h3><ul>
      <li>เปิด ALB DNS name ใน browser → เห็น Inventory app</li>
      <li>Settings tab: Endpoint=<strong>writer endpoint จาก RDS</strong></li>
      <li>Database: <code>inventory</code></li>
      <li>Username: <code>dbadmin</code></li>
      <li>Password: <strong>LabPassword</strong> (ดูจากด้านซ้ายของ lab)</li>
    </ul></div>
    <div class="spec-block"><h3>Optional: Cross-Region Read Replica</h3><ul>
      <li>เลือก aurora <strong>instance</strong> (ไม่ใช่ cluster) → Actions → Create cross-Region read replica</li>
      <li>Destination Region: <strong>RemoteRegion</strong> (ดูจากด้านซ้ายของ lab)</li>
      <li>VPC: <strong>LabVPC</strong></li>
      <li>Public access: <strong>No</strong></li>
      <li>SG: <strong>LabDBSecurityGroup</strong> (ลบ default ออก!)</li>
      <li>DB instance identifier: <code>LabDBReplica</code></li>
    </ul></div>
  `,

  lab4: `
    <div class="spec-block overview"><h3>สรุปภาพรวม Lab 4</h3>
      <ol class="overview-list">
        <li>สำรวจ <strong>Infrastructure เดิม</strong> — VPC, Subnets, SG, EC2 (AppServer), ALB, Aurora DB ที่ lab สร้างไว้ให้แล้ว</li>
        <li>สร้าง <strong>Launch Template</strong> — template สำหรับ Auto Scaling ใช้ launch instances ใหม่ (เหมือน "พิมพ์เขียว" ของ EC2)</li>
        <li>สร้าง <strong>Auto Scaling Group</strong> — ให้ระบบ launch/terminate instances อัตโนมัติตาม desired capacity (2 ตัวเสมอ = HA)</li>
        <li>ทดสอบ <strong>Load Balancing</strong> — refresh web app เห็น Instance ID สลับ = traffic ถูกกระจาย</li>
        <li>ทดสอบ <strong>Self-Healing</strong> — terminate instance 1 ตัว → ASG launch ตัวใหม่มาแทนอัตโนมัติ</li>
        <li>สร้าง <strong>Aurora Read Replica</strong> — เพิ่ม replica ใน AZ อื่นเพื่อ database HA</li>
        <li>สร้าง <strong>NAT Gateway ตัวที่ 2</strong> — ใน AZ 2 เพื่อให้ Private Subnet 2 มีทางออก internet แยกจาก AZ 1 (HA)</li>
        <li>ทดสอบ <strong>DB Failover</strong> — สั่ง failover → replica กลายเป็น writer → app ยังทำงานได้</li>
      </ol>
    </div>
    <div class="spec-block"><h3>Lab Environment (Pre-created)</h3><ul>
      <li>VPC: <strong>Lab VPC</strong> (10.0.0.0/20)</li>
      <li>Subnets: Public Subnet 1 & 2, Private Subnet 1 & 2 (across 2 AZs)</li>
      <li>Security Groups: <strong>Inventory-ALB</strong> (HTTP:80 from 0.0.0.0/0), <strong>Inventory-App</strong> (HTTP:80 from ALB SG), <strong>Inventory-DB</strong> (MySQL:3306 from App SG)</li>
      <li>EC2: <strong>AppServer</strong> (pre-created, PHP inventory app)</li>
      <li>ALB: <strong>Inventory-LB</strong> + Target Group: Inventory-App</li>
      <li>Aurora DB: <strong>inventory-cluster</strong> + <strong>inventory-primary</strong></li>
    </ul></div>
    <div class="spec-block"><h3>Task 2: Launch Template</h3><ul>
      <li>Name: <code>Lab-launch-template</code></li>
      <li>Description: <code>version 1</code></li>
      <li>AMI: Amazon Linux 2023</li>
      <li>Instance type: <strong>t3.micro</strong></li>
      <li>Security group: <strong>Inventory-App</strong></li>
      <li>IAM instance profile: <strong>Inventory-App-Role</strong></li>
      <li>User data: paste จาก AppServer (copy ตอน Task 1.2)</li>
    </ul></div>
    <div class="spec-block"><h3>Task 3: Auto Scaling Group</h3><ul>
      <li>Name: <code>Inventory-ASG</code></li>
      <li>Launch template: Lab-launch-template</li>
      <li>VPC: <strong>Lab VPC</strong></li>
      <li>Subnets: <strong>Private Subnet 1</strong> + <strong>Private Subnet 2</strong></li>
      <li>Load balancer: Attach to existing → <strong>Inventory-App | HTTP</strong></li>
      <li>Health check grace period: <code>300</code></li>
      <li>Desired/Min/Max capacity: <strong>2 / 2 / 2</strong></li>
      <li>Tag: Key=Name, Value=<code>Inventory-App</code></li>
    </ul></div>
    <div class="spec-block"><h3>Task 4: Test Application</h3><ul>
      <li>Deregister AppServer จาก Inventory-App target group</li>
      <li>รอ Inventory-App instances (2 ตัวจาก ASG) เป็น healthy</li>
      <li>Refresh web app → instance ID / AZ สลับกัน = HA ทำงาน</li>
    </ul></div>
    <div class="spec-block"><h3>Task 6: Aurora Read Replica</h3><ul>
      <li>เลือก <strong>inventory-cluster</strong> (ไม่ใช่ instance!) → Actions → Add reader</li>
      <li>DB instance identifier: <code>inventory-replica</code></li>
      <li>Availability Zone: <strong>ต่างจาก inventory-primary</strong></li>
      <li>Enhanced monitoring: <strong>เอาติ๊กออก!</strong></li>
    </ul></div>
    <div class="spec-block"><h3>Task 7: Second NAT Gateway</h3><ul>
      <li>Name: <code>my-nat-gateway</code></li>
      <li>Subnet: <strong>Public Subnet 2</strong> (ไม่ใช่ Private! ไม่ใช่ Subnet 1!)</li>
      <li>Allocate Elastic IP</li>
      <li>Route Table: <code>Private Route Table 2</code>, VPC=Lab VPC</li>
      <li>Route: <code>0.0.0.0/0</code> → my-nat-gateway</li>
      <li>Associate: <strong>Private Subnet 2</strong></li>
    </ul></div>
    <div class="spec-block"><h3>Task 8: DB Failover</h3><ul>
      <li>ตรวจว่า inventory-replica status=Available ก่อน!</li>
      <li>เลือก <strong>inventory-primary</strong> → Actions → Failover</li>
      <li>ดู Events: replica promoted to writer → primary rebooted</li>
      <li>Web app ยังใช้งานได้หลัง failover</li>
    </ul></div>
  `,

  lab5: `
    <div class="spec-block overview"><h3>สรุปภาพรวม Lab 5</h3>
      <ol class="overview-list">
        <li>สร้าง <strong>SNS Topic</strong> — เป็น "ศูนย์กลางกระจายข่าว" เมื่อมีรูปใหม่ upload มา SNS จะแจ้งทุก subscriber</li>
        <li>สร้าง <strong>SQS Queues (2 ตัว)</strong> — thumbnail-queue + mobile-queue เป็น "กล่องรับงาน" แยกคนละหน้าที่ (fan-out pattern)</li>
        <li>ทดสอบ <strong>SNS → SQS</strong> — publish message แล้ว poll จาก queue ดูว่า message ถึง</li>
        <li>แก้ <strong>SNS Access Policy</strong> — ให้ S3 มี permission ส่ง notification มาที่ SNS topic ได้</li>
        <li>สร้าง <strong>S3 Event Notification</strong> — เมื่อ upload .jpg ไปที่ folder ingest/ → trigger SNS อัตโนมัติ</li>
        <li>สร้าง <strong>Lambda: CreateThumbnail</strong> — trigger จาก thumbnail-queue → resize รูปเป็น thumbnail เก็บใน folder thumbnail/</li>
        <li>สร้าง <strong>Lambda: CreateMobileImage</strong> — trigger จาก mobile-queue → resize รูปเป็น mobile size เก็บใน folder mobile/</li>
        <li>ทดสอบ <strong>End-to-End</strong> — upload .jpg ไป ingest/ → S3 → SNS → SQS → Lambda → output ใน thumbnail/ + mobile/</li>
      </ol>
    </div>

    <div class="spec-block"><h3>SNS Topic</h3><ul>
      <li>Type: <strong>Standard</strong> (ห้าม FIFO!)</li>
      <li>Name: <code>resize-image-topic-XXXX</code> (ต่อเลข unique)</li>
      <li>Copy ไว้: <strong>ARN</strong> + <strong>Topic owner</strong> (12-digit Account ID)</li>
    </ul></div>
    <div class="spec-block"><h3>SQS Queues (2 ตัว)</h3><ul>
      <li>Queue 1: <code>thumbnail-queue</code> (Standard) → Subscribe to resize-image-topic</li>
      <li>Queue 2: <code>mobile-queue</code> (Standard) → Subscribe to resize-image-topic</li>
    </ul></div>
    <div class="spec-block"><h3>S3 Event Notification</h3><ul>
      <li>Bucket: xxxxx-labbucket-xxxxx</li>
      <li>Event name: <code>resize-image-event</code></li>
      <li>Prefix: <code>ingest/</code> (มี slash!)</li>
      <li>Suffix: <code>.jpg</code> (มีจุด!)</li>
      <li>Event type: <strong>All object create events</strong></li>
      <li>Destination: SNS topic → resize-image-topic</li>
      <li>ก่อนสร้าง event: ต้องแก้ SNS Access Policy ก่อน (ใส่ Account ID + ARN)</li>
    </ul></div>
    <div class="spec-block"><h3>Lambda Functions (2 ตัว)</h3>
      <div class="spec-sub"><h4>CreateThumbnail</h4><ul>
        <li>Runtime: <strong>Python 3.12</strong></li>
        <li>Execution role: <strong>LabExecutionRole</strong> (Custom)</li>
        <li>Trigger: SQS → <strong>thumbnail-queue</strong>, Batch=1</li>
        <li>Code: Upload from S3 → CreateThumbnailZIPLocation</li>
        <li>Handler: <code>CreateThumbnail.handler</code></li>
      </ul></div>
      <div class="spec-sub"><h4>CreateMobileImage</h4><ul>
        <li>Runtime: <strong>Python 3.12</strong></li>
        <li>Execution role: <strong>LabExecutionRole</strong> (Custom)</li>
        <li>Trigger: SQS → <strong>mobile-queue</strong>, Batch=1</li>
        <li>Code: Upload from S3 → CreateMobileImageZIPLocation</li>
        <li>Handler: <code>CreateMobileImage.handler</code></li>
      </ul></div>
    </div>
    <div class="spec-block"><h3>Test: Upload Image</h3><ul>
      <li>Download: AWS.jpg / MonaLisa.jpg / HappyFace.jpg</li>
      <li>ต้องเป็น <strong>.jpg</strong> (ไม่ใช่ .jpeg!)</li>
      <li>Upload ไปที่ folder <code>ingest/</code> ใน S3 bucket</li>
      <li>ผลลัพธ์: folder <code>thumbnail/</code> + <code>mobile/</code> จะมีรูป resized</li>
    </ul></div>
    <div class="spec-block"><h3>Validate</h3><ul>
      <li>CloudWatch Logs: Lambda → Monitor → View CloudWatch logs → ดู log stream</li>
      <li>S3: เข้า bucket → ดู folder thumbnail/ และ mobile/ มีรูปหรือไม่</li>
    </ul></div>
  `,

  lab6: `
    <div class="spec-block overview"><h3>สรุปภาพรวม Lab 6</h3>
      <ol class="overview-list">
        <li>สำรวจ <strong>CloudFront Distribution เดิม</strong> — ดู origin (ALB), behavior, settings ที่ lab สร้างไว้ให้</li>
        <li>สร้าง <strong>S3 Bucket</strong> — เป็น storage สำหรับเก็บ static content (รูปภาพ)</li>
        <li>ตั้งค่า <strong>Public Access + Bucket Policy</strong> — ให้ object อ่านจาก S3 URL ตรงๆ ได้ (ทดสอบก่อน lock down)</li>
        <li>Upload <strong>รูปภาพ</strong> ไป S3 แล้วทดสอบเปิดจาก S3 URL → เห็นรูป</li>
        <li>ตั้งค่า <strong>OAC (Origin Access Control)</strong> — lock down S3 ให้เข้าได้เฉพาะผ่าน CloudFront เท่านั้น (S3 URL ตรงจะ AccessDenied)</li>
        <li>เพิ่ม <strong>S3 เป็น Origin ใหม่</strong> ของ CloudFront + สร้าง Behavior สำหรับ pattern CachedObjects/*.png</li>
        <li>ทดสอบ — S3 URL → AccessDenied ✓ | CloudFront URL → เห็นรูป ✓ (OAC ทำงาน)</li>
        <li>(Optional) ตั้งค่า <strong>Cross-Region Replication</strong> — copy object ไป bucket อีก region อัตโนมัติ (DR)</li>
      </ol>
    </div>
    <div class="spec-block"><h3>S3 Bucket</h3><ul>
      <li>Bucket name: <strong>globally unique</strong> (ตัวเล็ก + ขีดกลาง + ตัวเลข)</li>
      <li>Region: <strong>US East (N. Virginia) us-east-1</strong></li>
      <li>Object Ownership: <strong>ACLs enabled</strong> → Object writer</li>
      <li>Block Public Access: <strong>เอาติ๊กออก!</strong> + ติ๊ก acknowledge</li>
    </ul></div>
    <div class="spec-block"><h3>Upload Object</h3><ul>
      <li>Upload รูปจาก lab instruction</li>
      <li>Permissions: <strong>Grant public-read access</strong> + ติ๊ก acknowledge</li>
      <li>ทดสอบ: เปิด Object URL ใน browser → ต้องเห็นรูป</li>
    </ul></div>
    <div class="spec-block"><h3>CloudFront Distribution</h3><ul>
      <li>Origin domain: เลือก <strong>S3 bucket</strong> ที่สร้างไว้</li>
      <li>Origin access: <strong>Origin access control settings (recommended)</strong></li>
      <li>OAC: กด <strong>Create new OAC</strong> → ปล่อย default → Create</li>
      <li>Viewer protocol policy: <strong>Redirect HTTP to HTTPS</strong></li>
      <li>WAF: <strong>Do not enable security protections</strong></li>
      <li>Default root object: <strong>ชื่อไฟล์ที่ upload</strong> (เช่น cat.jpg)</li>
      <li>หลังสร้าง: <strong>Copy bucket policy</strong> จาก banner สีเหลือง → paste ใน S3 bucket policy</li>
      <li>รอ deploy: <strong>5-15 นาที</strong> (ปกติ)</li>
    </ul></div>
    <div class="spec-block"><h3>Invalidation (Cache Clear)</h3><ul>
      <li>Path: <code>/*</code> (ทุก object) หรือ <code>/filename.jpg</code> (เจาะจง)</li>
      <li>ต้องขึ้นต้นด้วย <code>/</code> เสมอ!</li>
      <li>ใช้เวลา 1-5 นาที</li>
    </ul></div>
    <div class="spec-block"><h3>Key Concepts</h3><ul>
      <li>OAC: ให้ CloudFront อ่าน S3 ได้ โดย user ไม่สามารถเข้า S3 URL โดยตรง</li>
      <li>Invalidation: clear cache เมื่อ update content ใน S3</li>
      <li>Block Public Access + OAC: objects เข้าได้เฉพาะผ่าน CloudFront เท่านั้น</li>
    </ul></div>
  `
};
