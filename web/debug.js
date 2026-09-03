const debugChecklistData = {
  lab1: [
    {
      title: '1. Console / Command Host',
      items: [
        { check: 'Region', mustBe: '{LabRegion}' },
        { check: 'EC2 Instance', mustBe: 'Command Host' },
        { check: 'Instance state', mustBe: 'Running' },
        { check: 'Connection', mustBe: 'SSM Session Manager' }
      ]
    },
    {
      title: '2. S3 Console — Bucket / Object',
      items: [
        { check: 'S3 Console → Region', mustBe: '{LabRegion} ก่อนกด Create bucket' },
        { check: 'S3 bucket settings', mustBe: 'ปล่อย Default ทั้งหมด' },
        { check: 'Console bucket name', mustBe: 'labbucket-{NUMBER} / ตัวเล็ก / unique' },
        { check: 'Bucket name', mustBe: 'labbucket-{NUMBER}' },
        { check: 'Bucket Region', mustBe: '{LabRegion}' },
        { check: 'Settings อื่น', mustBe: 'Default ทั้งหมด' },
        { check: 'Object', mustBe: 'HappyFace.jpg' }
      ]
    },
    {
      title: '3. S3 CLI — Bucket / Upload',
      items: [
        { check: 'CLI bucket name', mustBe: 'labclibucket-{NUMBER} / ห้ามใช้ชื่อ console bucket' },
        { check: 'Bucket name', mustBe: 'labclibucket-{NUMBER}' },
        { check: 'Source file', mustBe: '/home/ssm-user/HappyFace.jpg' },
        { check: 'Create command', mustBe: 'aws s3 mb s3://labclibucket-{NUMBER}' },
        { check: 'Upload command', mustBe: 'aws s3 cp /home/ssm-user/HappyFace.jpg s3://labclibucket-{NUMBER}' }
      ]
    }
  ],

  lab2: [
    {
      title: '1. VPC / Subnets',
      items: [
        { check: 'Create VPC → Resources to create', mustBe: 'VPC only (ห้าม VPC and more)' },
        { check: 'Lab VPC → Edit VPC settings', mustBe: '☑ Enable DNS hostnames → Save' },
        { check: 'Subnets → VPC ID', mustBe: 'Lab VPC ทุกครั้ง (ห้าม default VPC)' },
        { check: 'Subnets → Availability Zone', mustBe: 'AZ แรกตัวเดียวกันทั้งคู่ (ห้าม No Preference)' },
        { check: 'Public Subnet → Edit subnet settings', mustBe: '☑ Enable auto-assign public IPv4 → Save' },
        { check: 'Region', mustBe: 'us-west-2 (Oregon)' },
        { check: 'Lab VPC CIDR', mustBe: '10.0.0.0/16' },
        { check: 'Lab VPC DNS hostnames', mustBe: 'Enabled' },
        { check: 'Public Subnet CIDR', mustBe: '10.0.0.0/24' },
        { check: 'Public Subnet Public IPv4', mustBe: 'Enabled' },
        { check: 'Private Subnet CIDR', mustBe: '10.0.2.0/23' },
        { check: 'Private Subnet AZ', mustBe: 'AZ เดียวกับ Public Subnet' }
      ]
    },
    {
      title: '2. Internet Gateway / Public Route',
      items: [
        { check: 'Lab IGW → Attach to VPC', mustBe: 'Lab VPC → Attach internet gateway' },
        { check: 'Route Tables → VPC', mustBe: 'Lab VPC ทุกครั้ง (ห้าม default VPC)' },
        { check: 'Public Route Table → Add route', mustBe: '0.0.0.0/0 → Internet Gateway → Lab IGW' },
        { check: 'Public RT → Subnet association', mustBe: '☑ Public Subnet เท่านั้น → Save associations' },
        { check: 'Lab IGW', mustBe: 'Attached → Lab VPC' },
        { check: 'Public Route Table route', mustBe: '0.0.0.0/0 → Lab IGW' },
        { check: 'Public Route Table association', mustBe: 'Public Subnet' }
      ]
    },
    {
      title: '3. Security Groups',
      items: [
        { check: 'Security Groups → VPC', mustBe: 'Lab VPC ทุกครั้ง (ห้าม default VPC)' },
        { check: 'Private SG → Inbound Source', mustBe: 'Custom → Public SG (ห้าม Anywhere-IPv4)' },
        { check: 'Public SG / VPC', mustBe: 'Lab VPC' },
        { check: 'Public SG / Inbound', mustBe: 'HTTP TCP 80 ← 0.0.0.0/0' },
        { check: 'Private SG / VPC', mustBe: 'Lab VPC' },
        { check: 'Private SG / Inbound', mustBe: 'HTTP TCP 80 ← Public SG' }
      ]
    },
    {
      title: '4. EC2 — Common Settings',
      items: [
        { check: 'EC2 ทั้ง 2 → Key pair', mustBe: 'Proceed without a key pair' },
        { check: 'EC2 ทั้ง 2 → Advanced details', mustBe: 'IAM instance profile = EC2InstProfile' },
        { check: 'EC2 ทั้ง 2 → User data', mustBe: '#!/bin/bash เป็นบรรทัดแรก' }
      ]
    },
    {
      title: '5. Public EC2 Instance',
      items: [
        { check: 'Public EC2 → Network settings', mustBe: 'Edit → Lab VPC / Public Subnet / Public IP Enable' },
        { check: 'Public EC2 → Firewall', mustBe: 'Select existing security group → Public SG' },
        { check: 'Name', mustBe: 'Public Instance' },
        { check: 'AMI / Type', mustBe: 'Amazon Linux 2023 / t3.micro' },
        { check: 'VPC / Subnet', mustBe: 'Lab VPC / Public Subnet' },
        { check: 'Public IP', mustBe: 'Enable' },
        { check: 'Security group', mustBe: 'Public SG' },
        { check: 'IAM profile', mustBe: 'EC2InstProfile' }
      ]
    },
    {
      title: '6. NAT Gateway / Private Route',
      items: [
        { check: 'NAT Gateway', mustBe: 'Public Subnet → Allocate Elastic IP → Create' },
        { check: 'Private Route Table → Add route', mustBe: '0.0.0.0/0 → NAT Gateway → Lab NGW' },
        { check: 'Private RT → Subnet association', mustBe: '☑ Private Subnet เท่านั้น → Save associations' },
        { check: 'Lab NGW subnet', mustBe: 'Public Subnet' },
        { check: 'Lab NGW state', mustBe: 'Available' },
        { check: 'Private Route Table route', mustBe: '0.0.0.0/0 → Lab NGW' },
        { check: 'Private Route Table association', mustBe: 'Private Subnet' }
      ]
    },
    {
      title: '7. Private EC2 Instance',
      items: [
        { check: 'Private EC2 → Network settings', mustBe: 'Edit → Lab VPC / Private Subnet / Public IP Disable' },
        { check: 'Private EC2 → Firewall', mustBe: 'Select existing security group → Private SG' },
        { check: 'Name', mustBe: 'Private Instance' },
        { check: 'AMI / Type', mustBe: 'Amazon Linux 2023 / t3.micro' },
        { check: 'VPC / Subnet', mustBe: 'Lab VPC / Private Subnet' },
        { check: 'Public IP', mustBe: 'Disable' },
        { check: 'Security group', mustBe: 'Private SG' },
        { check: 'IAM profile', mustBe: 'EC2InstProfile' }
      ]
    },
    {
      title: '8. Result / Connectivity Test',
      items: [
        { check: 'Public web URL', mustBe: 'http://{PublicIPv4DNS}' },
        { check: 'EC2 status checks', mustBe: 'All checks passed' },
        { check: 'Private curl', mustBe: 'HTTP/2 200' }
      ]
    }
  ],

  lab3: [
    {
      title: '1. Aurora — Engine / Database Settings',
      items: [
        { check: 'Create database', mustBe: 'Full configuration (ห้าม Easy create)' },
        { check: 'Engine', mustBe: 'Aurora MySQL Compatible' },
        { check: 'Template / Scalability', mustBe: 'Dev/Test / Provisioned' },
        { check: 'Provisioned class', mustBe: 'Burstable → db.t3.medium' },
        { check: 'Credentials management', mustBe: 'Self managed' },
        { check: 'Multi-AZ deployment', mustBe: "Don't create an Aurora Replica" },
        { check: 'Monitoring', mustBe: '☐ Enable Enhanced monitoring' },
        { check: 'Additional configuration', mustBe: 'Expand' },
        { check: 'Initial database name', mustBe: 'inventory (ห้ามเว้นว่าง)' },
        { check: 'DB cluster parameter group', mustBe: '{DBClusterParameterGroup} (ห้าม default)' },
        { check: 'Maintenance', mustBe: '☐ Enable auto minor version upgrade' },
        { check: 'Region', mustBe: 'us-west-2' },
        { check: 'Engine', mustBe: 'Aurora MySQL Compatible' },
        { check: 'Template / Scalability', mustBe: 'Dev/Test / Provisioned' },
        { check: 'Cluster identifier', mustBe: 'aurora' },
        { check: 'Instance class', mustBe: 'db.t3.medium' },
        { check: 'Master username', mustBe: 'dbadmin' },
        { check: 'Master password', mustBe: '{LabPassword}' },
        { check: 'Initial database', mustBe: 'inventory' },
        { check: 'Status', mustBe: 'Available' }
      ]
    },
    {
      title: '2. Aurora — Network / Security',
      items: [
        { check: 'Connectivity', mustBe: 'LabVPC / labdbsubnetgroup / Public access No' },
        { check: 'VPC Security Group', mustBe: 'Choose existing → ลบ default → LabDBSecurityGroup' },
        { check: 'VPC', mustBe: 'LabVPC' },
        { check: 'DB subnet group', mustBe: 'labdbsubnetgroup' },
        { check: 'Public access', mustBe: 'No' },
        { check: 'Security group', mustBe: 'LabDBSecurityGroup เท่านั้น' },
        { check: 'DB SG / Inbound', mustBe: 'MySQL TCP 3306 ← App server SG' },
        { check: 'Enhanced monitoring', mustBe: 'Off' },
        { check: 'Auto minor upgrade', mustBe: 'Off' }
      ]
    },
    {
      title: '3. Target Group / Registered Targets',
      items: [
        { check: 'Target group', mustBe: 'Instances / ALBTargetGroup / LabVPC' },
        { check: 'Register targets', mustBe: '☑ AppServer1 + AppServer2 → Include as pending below' },
        { check: 'Target group', mustBe: 'ALBTargetGroup' },
        { check: 'Registered targets', mustBe: 'AppServer1 + AppServer2' },
        { check: 'Health check path', mustBe: '/' },
        { check: 'Target health', mustBe: 'healthy ทั้ง 2 targets' }
      ]
    },
    {
      title: '4. Application Load Balancer',
      items: [
        { check: 'Load balancer type', mustBe: 'Application Load Balancer (ห้าม NLB)' },
        { check: 'ALB Network mapping', mustBe: '☑ 2 AZ → PublicSubnet1 + PublicSubnet2' },
        { check: 'ALB Security Group', mustBe: 'ลบ default → LabALBSecurityGroup' },
        { check: 'ALB Default action', mustBe: 'HTTP:80 → ALBTargetGroup' },
        { check: 'ALB name', mustBe: 'LabAppALB' },
        { check: 'ALB subnets', mustBe: 'PublicSubnet1 + PublicSubnet2' },
        { check: 'ALB security group', mustBe: 'LabALBSecurityGroup เท่านั้น' },
        { check: 'Listener', mustBe: 'HTTP:80 → ALBTargetGroup' }
      ]
    },
    {
      title: '5. Optional Cross-Region Replica',
      items: [
        { check: 'Optional replica source', mustBe: 'aurora Writer instance (ห้าม Regional cluster)' },
        { check: 'Optional replica network', mustBe: '{RemoteRegion} / LabVPC / Public access No / LabDBSecurityGroup' }
      ]
    },
    {
      title: '6. Application Settings / Result',
      items: [
        { check: 'URL', mustBe: 'http://{LabAppALBDnsName}' },
        { check: 'Endpoint', mustBe: '{WriterEndpoint} (ไม่มี -ro)' },
        { check: 'Database', mustBe: 'inventory' },
        { check: 'Username', mustBe: 'dbadmin' },
        { check: 'Password', mustBe: '{LabPassword}' }
      ]
    }
  ],

  lab4: [
    {
      title: '1. Inventory Application Settings',
      items: [
        { check: 'Inventory settings page', mustBe: 'คงค่าที่ populate มาเป็น Default → Save' }
      ]
    },
    {
      title: '2. Security Groups / Security Chain',
      items: [
        { check: 'Inventory-ALB / Inbound', mustBe: 'HTTP TCP 80 ← 0.0.0.0/0' },
        { check: 'Inventory-App / Inbound', mustBe: 'HTTP TCP 80 ← Inventory-ALB' },
        { check: 'Inventory-DB / Inbound', mustBe: 'MySQL TCP 3306 ← Inventory-App' }
      ]
    },
    {
      title: '3. Launch Template',
      items: [
        { check: 'Launch Template → Image', mustBe: 'Quick Start → Amazon Linux 2023' },
        { check: 'Launch Template → Type', mustBe: 't3.micro' },
        { check: 'Launch Template → SG', mustBe: 'Inventory-App เท่านั้น' },
        { check: 'Launch Template → Advanced details', mustBe: 'IAM profile = Inventory-App-Role' },
        { check: 'Launch Template → User data', mustBe: 'Copy จาก AppServer / #!/bin/bash บรรทัดแรก' },
        { check: 'Name', mustBe: 'Lab-launch-template' },
        { check: 'AMI / Type', mustBe: 'Amazon Linux 2023 / t3.micro' },
        { check: 'Security group', mustBe: 'Inventory-App' },
        { check: 'IAM profile', mustBe: 'Inventory-App-Role' },
        { check: 'User data บรรทัดแรก', mustBe: '#!/bin/bash' }
      ]
    },
    {
      title: '4. Auto Scaling Group',
      items: [
        { check: 'ASG → Launch template', mustBe: 'Lab-launch-template' },
        { check: 'ASG → Network', mustBe: 'Lab VPC / Private Subnet 1 + 2' },
        { check: 'ASG → Load balancer', mustBe: 'Attach existing → Target groups → Inventory-App | HTTP' },
        { check: 'ASG → Grace period', mustBe: '300 seconds' },
        { check: 'ASG → Group metrics', mustBe: '☑ Enable group metrics collection' },
        { check: 'ASG → Tag', mustBe: 'Add tag → Name = Inventory-App' },
        { check: 'Name', mustBe: 'Inventory-ASG' },
        { check: 'VPC', mustBe: 'Lab VPC' },
        { check: 'Subnets', mustBe: 'Private Subnet 1 + Private Subnet 2' },
        { check: 'Target group', mustBe: 'Inventory-App | HTTP' },
        { check: 'Grace period', mustBe: '300 seconds' },
        { check: 'Desired / Min / Max', mustBe: '2 / 2 / 2' },
        { check: 'Tag', mustBe: 'Name = Inventory-App' },
        { check: 'Instances', mustBe: '2 × InService' }
      ]
    },
    {
      title: '5. Target Group / Instance Runtime',
      items: [
        { check: 'Original AppServer', mustBe: 'Deregistered' },
        { check: 'ASG target health', mustBe: '2 × healthy' },
        { check: 'Health check', mustBe: 'HTTP / traffic port / path /' },
        { check: 'httpd', mustBe: 'active (running)' },
        { check: 'curl localhost', mustBe: 'HTML response' }
      ]
    },
    {
      title: '6. Aurora Reader / Failover HA',
      items: [
        { check: 'Aurora reader → Resource', mustBe: 'inventory-cluster (ห้าม inventory-primary)' },
        { check: 'Aurora reader → AZ', mustBe: 'ต่างจาก inventory-primary' },
        { check: 'Aurora reader → Monitoring', mustBe: '☐ Enable Enhanced monitoring' },
        { check: 'Failover ก่อนกด', mustBe: 'inventory-replica = Available' },
        { check: 'Reader identifier', mustBe: 'inventory-replica' },
        { check: 'Reader AZ', mustBe: 'ต่างจาก inventory-primary' }
      ]
    },
    {
      title: '7. Second NAT / Private Route HA',
      items: [
        { check: 'Second NAT → Mode / Subnet', mustBe: 'Zonal / Public Subnet 2' },
        { check: 'Second NAT → Elastic IP', mustBe: 'Allocate Elastic IP → Create NAT gateway' },
        { check: 'Private Route Table 2', mustBe: 'Lab VPC / 0.0.0.0/0 → my-nat-gateway' },
        { check: 'Private RT 2 → Association', mustBe: '☑ Private Subnet 2 เท่านั้น' },
        { check: 'Second NAT name', mustBe: 'my-nat-gateway' },
        { check: 'Second NAT subnet', mustBe: 'Public Subnet 2' },
        { check: 'Private Route Table 2 route', mustBe: '0.0.0.0/0 → my-nat-gateway' },
        { check: 'Route Table association', mustBe: 'Private Subnet 2' }
      ]
    }
  ],

  lab5: [
    {
      title: '1. SNS Topic',
      items: [
        { check: 'SNS topic type', mustBe: 'Standard (ห้าม FIFO)' },
        { check: 'Region', mustBe: 'us-east-2 (Ohio)' },
        { check: 'SNS type', mustBe: 'Standard' },
        { check: 'SNS name', mustBe: 'resize-image-topic-{UNIQUE_SUFFIX}' }
      ]
    },
    {
      title: '2. SQS Queues / SNS Subscriptions',
      items: [
        { check: 'SQS ทั้ง 2 → Type', mustBe: 'Standard (ห้าม FIFO)' },
        { check: 'SQS → Configuration parameters', mustBe: 'คง Default ทั้งหมด' },
        { check: 'thumbnail-queue → SNS', mustBe: 'Subscribe → resize-image-topic → Save' },
        { check: 'mobile-queue → SNS', mustBe: 'Subscribe → resize-image-topic เดียวกัน → Save' },
        { check: 'thumbnail queue', mustBe: 'thumbnail-queue / Standard' },
        { check: 'mobile queue', mustBe: 'mobile-queue / Standard' },
        { check: 'ทั้ง 2 queues subscribe', mustBe: '{ResizeImageTopicArn}' }
      ]
    },
    {
      title: '3. SNS Policy / S3 Event',
      items: [
        { check: 'SNS Access Policy editor', mustBe: 'ลบ policy เดิมทั้งหมด → paste policy ใหม่' },
        { check: 'SNS Policy placeholders', mustBe: 'OWNER + ARN แทนครบทุกจุด / คง double quotes' },
        { check: 'S3 Event types', mustBe: '☑ All object create events' },
        { check: 'S3 Event filter', mustBe: 'Prefix ingest/ / Suffix .jpg' },
        { check: 'S3 Event destination', mustBe: 'SNS topic → resize-image-topic' },
        { check: 'SNS Principal', mustBe: 's3.amazonaws.com' },
        { check: 'SNS_TOPIC_OWNER', mustBe: '{ACCOUNT_ID} ครบทุกจุด' },
        { check: 'SNS_TOPIC_ARN', mustBe: '{ResizeImageTopicArn} ครบทุกจุด' },
        { check: 'Event name', mustBe: 'resize-image-event' },
        { check: 'Event type', mustBe: 's3:ObjectCreated:*' },
        { check: 'Prefix', mustBe: 'ingest/' },
        { check: 'Suffix', mustBe: '.jpg' },
        { check: 'Destination', mustBe: '{ResizeImageTopicName}' }
      ]
    },
    {
      title: '4. Lambda — Common Settings',
      items: [
        { check: 'Lambda Creation method', mustBe: 'Author from scratch' },
        { check: 'Lambda Runtime', mustBe: 'Python 3.12' },
        { check: 'Lambda Additional settings', mustBe: 'Custom execution role On → {LabExecutionRole}' },
        { check: 'Lambda ทั้ง 2 → General config', mustBe: 'Timeout 60 sec / Memory 256 MB' },
        { check: 'Lambda ทั้ง 2 → Environment', mustBe: 'bucket_name = {LabBucketName}' }
      ]
    },
    {
      title: '5. Lambda — CreateThumbnail',
      items: [
        { check: 'CreateThumbnail Trigger', mustBe: 'SQS → thumbnail-queue / Batch 1' },
        { check: 'CreateThumbnail Code / Handler', mustBe: '{CreateThumbnailZIPLocation} / CreateThumbnail.handler' },
        { check: 'Runtime', mustBe: 'Python 3.12' },
        { check: 'Role', mustBe: '{LabExecutionRole}' },
        { check: 'Code', mustBe: '{CreateThumbnailZIPLocation}' },
        { check: 'Handler', mustBe: 'CreateThumbnail.handler' },
        { check: 'Trigger', mustBe: 'thumbnail-queue' },
        { check: 'Batch / Timeout / Memory', mustBe: '1 / 60 sec / 256 MB' },
        { check: 'Environment', mustBe: 'bucket_name = {LabBucketName}' }
      ]
    },
    {
      title: '6. Lambda — CreateMobileImage',
      items: [
        { check: 'CreateMobileImage Trigger', mustBe: 'SQS → mobile-queue / Batch 1' },
        { check: 'CreateMobileImage Code / Handler', mustBe: '{CreateMobileImageZIPLocation} / CreateMobileImage.handler' },
        { check: 'Runtime', mustBe: 'Python 3.12' },
        { check: 'Role', mustBe: '{LabExecutionRole}' },
        { check: 'Code', mustBe: '{CreateMobileImageZIPLocation}' },
        { check: 'Handler', mustBe: 'CreateMobileImage.handler' },
        { check: 'Trigger', mustBe: 'mobile-queue' },
        { check: 'Batch / Timeout / Memory', mustBe: '1 / 60 sec / 256 MB' },
        { check: 'Environment', mustBe: 'bucket_name = {LabBucketName}' }
      ]
    },
    {
      title: '7. Test Object / Outputs / Logs',
      items: [
        { check: 'Test object', mustBe: 'Upload ใน ingest/ / นามสกุล .jpg ตัวเล็ก' },
        { check: 'Input', mustBe: 'ingest/{FILENAME}.jpg' },
        { check: 'Thumbnail output', mustBe: 'thumbnail/{FILENAME}.jpg' },
        { check: 'Mobile output', mustBe: 'mobile/{FILENAME}.jpg' },
        { check: 'CloudWatch', mustBe: 'ทั้ง 2 Functions มี log stream ล่าสุด' }
      ]
    }
  ],

  lab6: [
    {
      title: '1. Existing CloudFront Distribution',
      items: [
        { check: 'CloudFront', mustBe: 'ใช้ Distribution เดิม (ห้ามสร้างใหม่)' },
        { check: 'Region', mustBe: 'us-west-2' },
        { check: 'Distribution', mustBe: 'Distribution ที่ Lab สร้างไว้' },
        { check: 'Status', mustBe: 'Enabled / ไม่ใช่ Deploying' },
        { check: 'Domain', mustBe: '{CloudFrontDomain}' }
      ]
    },
    {
      title: '2. S3 Bucket / Object / Public Test',
      items: [
        { check: 'S3 Bucket → Creation settings', mustBe: 'คง Default ทั้งหมด' },
        { check: 'Public test → Block Public Access', mustBe: '☐ Block all → Save → พิมพ์ confirm' },
        { check: 'Public-read policy Resource', mustBe: '{LabBucketArn}/*' },
        { check: 'CachedObjects folder', mustBe: 'คง encryption Default → Create folder' },
        { check: 'Bucket name', mustBe: '{LabBucketName}' },
        { check: 'Object key', mustBe: 'CachedObjects/logo.png' }
      ]
    },
    {
      title: '3. S3 Lockdown / CloudFront-Only Policy',
      items: [
        { check: 'CloudFront-only policy Resource', mustBe: '{LabBucketArn}/*' },
        { check: 'CloudFront-only AWS:SourceArn', mustBe: '{CloudFrontDistributionArn} (ห้าม domain)' },
        { check: 'Lock down bucket', mustBe: '☑ Block all public access → Save → confirm' },
        { check: 'Block all public access', mustBe: 'On หลังตั้ง OAC' },
        { check: 'Policy Principal', mustBe: 'cloudfront.amazonaws.com' },
        { check: 'Policy Resource', mustBe: 'arn:aws:s3:::{LabBucketName}/*' },
        { check: 'Policy AWS:SourceArn', mustBe: '{CloudFrontDistributionArn}' },
        { check: 'Policy placeholders', mustBe: 'เหลือ 0 จุด' }
      ]
    },
    {
      title: '4. S3 Origin / OAC',
      items: [
        { check: 'Create Origin → Origin domain', mustBe: '{LabBucketName} จากส่วน Amazon S3' },
        { check: 'Create Origin → Origin path', mustBe: 'เว้นว่าง' },
        { check: 'Create Origin → Name', mustBe: 'My Amazon S3 Origin' },
        { check: 'Create Origin → Origin access', mustBe: 'Origin access control settings → Create new OAC' },
        { check: 'OAC modal', mustBe: 'คง Default ทั้งหมด → Create' },
        { check: 'Origin settings อื่น', mustBe: 'คง Default → Create origin' },
        { check: 'Origin domain', mustBe: '{LabBucketName}' },
        { check: 'Origin path', mustBe: 'ว่าง' },
        { check: 'Origin name', mustBe: 'My Amazon S3 Origin' },
        { check: 'Origin access', mustBe: 'Origin access control settings' },
        { check: 'OAC', mustBe: 'Created / Selected' }
      ]
    },
    {
      title: '5. CloudFront Cache Behavior',
      items: [
        { check: 'Create Behavior → Path', mustBe: 'CachedObjects/*.png' },
        { check: 'Create Behavior → Origin', mustBe: 'My Amazon S3 Origin (ห้าม Load Balancer)' },
        { check: 'Behavior → Cache key', mustBe: 'Cache policy and origin request policy' },
        { check: 'Behavior → Cache policy', mustBe: 'CachingOptimized' },
        { check: 'Behavior settings อื่น', mustBe: 'คง Default → Create behavior' },
        { check: 'Path pattern', mustBe: 'CachedObjects/*.png' },
        { check: 'Origin', mustBe: 'My Amazon S3 Origin' },
        { check: 'Cache policy', mustBe: 'CachingOptimized' }
      ]
    },
    {
      title: '6. Access Result',
      items: [
        { check: 'Direct S3 URL', mustBe: '403 AccessDenied' },
        { check: 'CloudFront URL', mustBe: 'https://{CloudFrontDomain}/CachedObjects/logo.png' }
      ]
    }
  ],

  lab7: [
    {
      title: '1. VPC CloudFormation Stack',
      items: [
        { check: 'VPC Stack → Create mode', mustBe: 'With new resources (standard)' },
        { check: 'VPC Stack → Template source', mustBe: 'Existing template → S3 URL → {Task1TemplateUrl}' },
        { check: 'VPC Stack → Parameters / Options', mustBe: 'คง Default → Next → Next → Submit' },
        { check: 'VPC Stack name', mustBe: 'VPCStack' },
        { check: 'VPC Stack status', mustBe: 'CREATE_COMPLETE' }
      ]
    },
    {
      title: '2. DB Subnet Group / Aurora RDS',
      items: [
        { check: 'DB Subnet Group → VPC', mustBe: 'LabVPC' },
        { check: 'DB Subnet Group → Subnets', mustBe: '10.0.4.0/24 + 10.0.5.0/24' },
        { check: 'Aurora → Creation method', mustBe: 'Full configuration' },
        { check: 'Aurora → Engine / Template', mustBe: 'Aurora MySQL / Production' },
        { check: 'Aurora → Credentials', mustBe: 'Self managed' },
        { check: 'Aurora → Instance', mustBe: 'Burstable → db.t3.medium' },
        { check: 'Aurora → Multi-AZ', mustBe: 'Create Aurora Replica in different AZ' },
        { check: 'Aurora → Network', mustBe: 'LabVPC / aurorasubnetgroup / Public access No' },
        { check: 'Aurora → Security Group', mustBe: 'RDSSecurityGroup เท่านั้น → ลบ default' },
        { check: 'Aurora → Port', mustBe: 'คง Default 3306' },
        { check: 'Aurora → Monitoring', mustBe: '☐ Enable Enhanced monitoring' },
        { check: 'Aurora → Initial DB', mustBe: 'WPDatabase (ห้าม MyDBCluster)' },
        { check: 'Aurora → Encryption', mustBe: 'AWS owned KMS key (SSE-RDS)' },
        { check: 'Aurora → Maintenance', mustBe: '☐ Enable auto minor version upgrade' },
        { check: 'Aurora → Deletion protection', mustBe: '☐ Enable deletion protection' },
        { check: 'DB subnet group', mustBe: 'AuroraSubnetGroup / LabVPC' },
        { check: 'DB subnets', mustBe: '10.0.4.0/24 + 10.0.5.0/24' },
        { check: 'Cluster identifier', mustBe: 'MyDBCluster' },
        { check: 'Username / Password', mustBe: 'admin / {LabPassword}' },
        { check: 'Instance class', mustBe: 'db.t3.medium' },
        { check: 'Public access', mustBe: 'No' },
        { check: 'Security group', mustBe: 'RDSSecurityGroup เท่านั้น' },
        { check: 'Initial DB', mustBe: 'WPDatabase' },
        { check: 'Status', mustBe: 'Available' }
      ]
    },
    {
      title: '3. EFS / Mount Targets',
      items: [
        { check: 'EFS → Creation path', mustBe: 'Create file system → Customize' },
        { check: 'EFS → Backups / Encryption', mustBe: '☐ Automatic backups / ☐ Encryption at rest' },
        { check: 'EFS → Lifecycle', mustBe: 'IA None / Archive None' },
        { check: 'EFS → Performance', mustBe: 'Bursting / General Purpose' },
        { check: 'EFS → Mount targets', mustBe: 'AppSubnet1 + AppSubnet2' },
        { check: 'EFS → Mount target SG', mustBe: 'EFSMountTargetSecurityGroup เท่านั้น → ลบ default ทั้งคู่' },
        { check: 'EFS → File system policy', mustBe: 'ไม่ตั้งค่า → Next → Create' },
        { check: 'Name', mustBe: 'myWPEFS' },
        { check: 'Backups / Encryption', mustBe: 'Off / Off' },
        { check: 'Throughput / Performance', mustBe: 'Bursting / General Purpose' },
        { check: 'VPC', mustBe: 'LabVPC' },
        { check: 'Mount target 1', mustBe: 'AppSubnet1 / EFSMountTargetSecurityGroup' },
        { check: 'Mount target 2', mustBe: 'AppSubnet2 / EFSMountTargetSecurityGroup' },
        { check: 'File system ID', mustBe: '{EfsId}' }
      ]
    },
    {
      title: '4. Target Group / Health Check',
      items: [
        { check: 'Target Group → Type / VPC', mustBe: 'Instances / LabVPC' },
        { check: 'Target Group → Register targets', mustBe: 'ไม่ register → Next → Create' },
        { check: 'Target group', mustBe: 'myWPTargetGroup / Instances / LabVPC' },
        { check: 'Protocol / Port', mustBe: 'HTTP / 80' },
        { check: 'Health path', mustBe: '/wp-login.php' },
        { check: 'Threshold', mustBe: 'Healthy 2 / Unhealthy 10' },
        { check: 'Timeout / Interval', mustBe: '50 / 60 seconds' }
      ]
    },
    {
      title: '5. Application Load Balancer',
      items: [
        { check: 'ALB → Type', mustBe: 'Application Load Balancer' },
        { check: 'ALB → Subnets', mustBe: 'PublicSubnet1 + PublicSubnet2' },
        { check: 'ALB → Security Group', mustBe: 'AppInstanceSecurityGroup เท่านั้น → ลบ default' },
        { check: 'ALB → Default action', mustBe: 'HTTP:80 → myWPTargetGroup' },
        { check: 'ALB', mustBe: 'myWPAppALB / LabVPC' },
        { check: 'ALB subnets', mustBe: 'PublicSubnet1 + PublicSubnet2' },
        { check: 'ALB security group', mustBe: 'AppInstanceSecurityGroup เท่านั้น' },
        { check: 'Listener', mustBe: 'HTTP:80 → myWPTargetGroup' }
      ]
    },
    {
      title: '6. WPLaunchConfigStack',
      items: [
        { check: 'WP Stack → Create mode / Template', mustBe: 'With new resources → {Task5TemplateUrl}' },
        { check: 'WP Stack → DB Name', mustBe: 'WPDatabase (ห้าม cluster name)' },
        { check: 'WP Stack → ALBDnsName', mustBe: 'ไม่มี http:// / ไม่มี slash ท้าย / ไม่มี space' },
        { check: 'WP Stack → Defaults', mustBe: 'wpadmin / t3.medium / LatestAL2023AmiId Default' },
        { check: 'WP Stack → Options', mustBe: 'คง Default → Next → Submit' },
        { check: 'Stack status', mustBe: 'CREATE_COMPLETE' },
        { check: 'DB Name', mustBe: 'WPDatabase' },
        { check: 'DB endpoint', mustBe: '{WriterEndpoint} (ไม่มี -ro)' },
        { check: 'DB User / Password', mustBe: 'admin / {LabPassword}' },
        { check: 'WP User / Password', mustBe: 'wpadmin / {LabPassword}' },
        { check: 'Instance type', mustBe: 't3.medium' },
        { check: 'ALBDnsName', mustBe: '{AlbDnsName} (ไม่มี http:// และ /)' },
        { check: 'EFS ID', mustBe: '{EfsId}' }
      ]
    },
    {
      title: '7. Auto Scaling Group',
      items: [
        { check: 'ASG → Network', mustBe: 'LabVPC / AppSubnet1 + AppSubnet2' },
        { check: 'ASG → Load balancer', mustBe: 'Attach existing → myWPTargetGroup | HTTP' },
        { check: 'ASG → Health checks', mustBe: '☑ ELB health checks / Grace period 300+' },
        { check: 'ASG → Scaling', mustBe: 'Desired 2 / Min 2 / Max 4 / Target tracking' },
        { check: 'ASG → Group metrics', mustBe: '☑ Enable group metrics collection' },
        { check: 'ASG → Tag', mustBe: 'Add tag → Name = WP-App' },
        { check: 'Name', mustBe: 'WP-ASG' },
        { check: 'VPC / Subnets', mustBe: 'LabVPC / AppSubnet1 + AppSubnet2' },
        { check: 'Target group', mustBe: 'myWPTargetGroup | HTTP' },
        { check: 'ELB health checks', mustBe: 'On' },
        { check: 'Grace period', mustBe: '300 seconds หรือมากกว่า' },
        { check: 'Desired / Min / Max', mustBe: '2 / 2 / 4' },
        { check: 'Tag', mustBe: 'Name = WP-App' },
        { check: 'Instances', mustBe: '2 × InService' }
      ]
    },
    {
      title: '8. Result / WordPress Login',
      items: [
        { check: 'Target health', mustBe: 'healthy ทั้ง 2 targets' },
        { check: 'URL', mustBe: 'http://{AlbDnsName}/wp-login.php' },
        { check: 'Login', mustBe: 'wpadmin / {LabPassword}' }
      ]
    }
  ]
};
