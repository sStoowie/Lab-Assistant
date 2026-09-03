const debugChecklistData = {
  lab1: [
    {
      title: '⚠️ ตอนสร้าง (ห้ามพลาด)',
      items: [
        { check: 'S3 bucket settings', mustBe: 'ปล่อย Default ทั้งหมด' },
        { check: 'CLI bucket name', mustBe: 'ต้องต่างจาก console bucket' }
      ]
    },
    {
      title: 'Console / Command Host',
      items: [
        { check: 'Region', mustBe: '{LabRegion}' },
        { check: 'EC2 Instance', mustBe: 'Command Host' },
        { check: 'Instance state', mustBe: 'Running' },
        { check: 'Connection', mustBe: 'SSM Session Manager' }
      ]
    },
    {
      title: 'S3 Console',
      items: [
        { check: 'Bucket name', mustBe: 'labbucket-{NUMBER}' },
        { check: 'Bucket Region', mustBe: '{LabRegion}' },
        { check: 'Settings อื่น', mustBe: 'Default ทั้งหมด' },
        { check: 'Object', mustBe: 'HappyFace.jpg' }
      ]
    },
    {
      title: 'S3 CLI',
      items: [
        { check: 'Bucket name', mustBe: 'labclibucket-{NUMBER}' },
        { check: 'Source file', mustBe: '/home/ssm-user/HappyFace.jpg' },
        { check: 'Create command', mustBe: 'aws s3 mb s3://labclibucket-{NUMBER}' },
        { check: 'Upload command', mustBe: 'aws s3 cp /home/ssm-user/HappyFace.jpg s3://labclibucket-{NUMBER}' }
      ]
    }
  ],

  lab2: [
    {
      title: '⚠️ ตอนสร้าง (ห้ามพลาด)',
      items: [
        { check: 'Lab VPC → Edit VPC settings', mustBe: '☑ Enable DNS hostnames' },
        { check: 'Public Subnet → Edit', mustBe: '☑ Enable auto-assign public IPv4' },
        { check: 'NAT Gateway', mustBe: 'อยู่ใน Public Subnet + Allocate Elastic IP' },
        { check: 'Public Instance → Auto-assign public IP', mustBe: '☑ Enable' },
        { check: 'Private Instance → Auto-assign public IP', mustBe: '☐ Disable' },
        { check: 'User data บรรทัดแรก', mustBe: '#!/bin/bash (ไม่มีบรรทัดว่างนำหน้า)' }
      ]
    },
    {
      title: 'VPC / Subnets',
      items: [
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
      title: 'Gateway / Routes',
      items: [
        { check: 'Lab IGW', mustBe: 'Attached → Lab VPC' },
        { check: 'Public Route Table route', mustBe: '0.0.0.0/0 → Lab IGW' },
        { check: 'Public Route Table association', mustBe: 'Public Subnet' },
        { check: 'Lab NGW subnet', mustBe: 'Public Subnet' },
        { check: 'Lab NGW state', mustBe: 'Available' },
        { check: 'Private Route Table route', mustBe: '0.0.0.0/0 → Lab NGW' },
        { check: 'Private Route Table association', mustBe: 'Private Subnet' }
      ]
    },
    {
      title: 'Security Groups',
      items: [
        { check: 'Public SG / VPC', mustBe: 'Lab VPC' },
        { check: 'Public SG / Inbound', mustBe: 'HTTP TCP 80 ← 0.0.0.0/0' },
        { check: 'Private SG / VPC', mustBe: 'Lab VPC' },
        { check: 'Private SG / Inbound', mustBe: 'HTTP TCP 80 ← Public SG' }
      ]
    },
    {
      title: 'Public Instance',
      items: [
        { check: 'Name', mustBe: 'Public Instance' },
        { check: 'AMI / Type', mustBe: 'Amazon Linux 2023 / t3.micro' },
        { check: 'VPC / Subnet', mustBe: 'Lab VPC / Public Subnet' },
        { check: 'Public IP', mustBe: 'Enable' },
        { check: 'Security group', mustBe: 'Public SG' },
        { check: 'IAM profile', mustBe: 'EC2InstProfile' }
      ]
    },
    {
      title: 'Private Instance',
      items: [
        { check: 'Name', mustBe: 'Private Instance' },
        { check: 'AMI / Type', mustBe: 'Amazon Linux 2023 / t3.micro' },
        { check: 'VPC / Subnet', mustBe: 'Lab VPC / Private Subnet' },
        { check: 'Public IP', mustBe: 'Disable' },
        { check: 'Security group', mustBe: 'Private SG' },
        { check: 'IAM profile', mustBe: 'EC2InstProfile' }
      ]
    },
    {
      title: 'Result',
      items: [
        { check: 'Public web URL', mustBe: 'http://{PublicIPv4DNS}' },
        { check: 'EC2 status checks', mustBe: 'All checks passed' },
        { check: 'Private curl', mustBe: 'HTTP/2 200' }
      ]
    }
  ],

  lab3: [
    {
      title: '⚠️ ตอนสร้าง (ห้ามพลาด)',
      items: [
        { check: 'Credentials management', mustBe: 'Self managed' },
        { check: 'Security group', mustBe: 'ลบ default ออก → เหลือ LabDBSecurityGroup' },
        { check: 'Monitoring', mustBe: '☐ เอาติ๊ก Enhanced monitoring ออก' },
        { check: 'Additional config → Initial database name', mustBe: 'inventory (ห้ามเว้นว่าง)' },
        { check: 'Maintenance', mustBe: '☐ เอาติ๊ก Auto minor version upgrade ออก' },
        { check: 'Register targets', mustBe: 'กด Include as pending below' },
        { check: 'ALB SG', mustBe: 'ลบ default ออก → เหลือ LabALBSecurityGroup' }
      ]
    },
    {
      title: 'Aurora',
      items: [
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
      title: 'Aurora Network',
      items: [
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
      title: 'Target Group / ALB',
      items: [
        { check: 'Target group', mustBe: 'ALBTargetGroup' },
        { check: 'Registered targets', mustBe: 'AppServer1 + AppServer2' },
        { check: 'Health check path', mustBe: '/' },
        { check: 'Target health', mustBe: 'healthy ทั้ง 2 targets' },
        { check: 'ALB name', mustBe: 'LabAppALB' },
        { check: 'ALB subnets', mustBe: 'PublicSubnet1 + PublicSubnet2' },
        { check: 'ALB security group', mustBe: 'LabALBSecurityGroup เท่านั้น' },
        { check: 'Listener', mustBe: 'HTTP:80 → ALBTargetGroup' }
      ]
    },
    {
      title: 'Application Settings',
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
      title: '⚠️ ตอนสร้าง (ห้ามพลาด)',
      items: [
        { check: 'User data บรรทัดแรก', mustBe: '#!/bin/bash (copy จาก AppServer)' },
        { check: 'ASG subnets', mustBe: 'Private Subnet 1 + 2 (ไม่ใช่ Public)' },
        { check: 'Health check grace period', mustBe: '300' },
        { check: 'Second NAT subnet', mustBe: 'Public Subnet 2 (ไม่ใช่ Private / ไม่ใช่ Subnet 1)' },
        { check: 'Aurora reader / Enhanced monitoring', mustBe: '☐ เอาติ๊กออก' },
        { check: 'Failover ก่อนทำ', mustBe: 'inventory-replica ต้อง Available ก่อน' }
      ]
    },
    {
      title: 'Security Chain',
      items: [
        { check: 'Inventory-ALB / Inbound', mustBe: 'HTTP TCP 80 ← 0.0.0.0/0' },
        { check: 'Inventory-App / Inbound', mustBe: 'HTTP TCP 80 ← Inventory-ALB' },
        { check: 'Inventory-DB / Inbound', mustBe: 'MySQL TCP 3306 ← Inventory-App' }
      ]
    },
    {
      title: 'Launch Template',
      items: [
        { check: 'Name', mustBe: 'Lab-launch-template' },
        { check: 'AMI / Type', mustBe: 'Amazon Linux 2023 / t3.micro' },
        { check: 'Security group', mustBe: 'Inventory-App' },
        { check: 'IAM profile', mustBe: 'Inventory-App-Role' },
        { check: 'User data บรรทัดแรก', mustBe: '#!/bin/bash' }
      ]
    },
    {
      title: 'Auto Scaling Group',
      items: [
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
      title: 'Target / Runtime',
      items: [
        { check: 'Original AppServer', mustBe: 'Deregistered' },
        { check: 'ASG target health', mustBe: '2 × healthy' },
        { check: 'Health check', mustBe: 'HTTP / traffic port / path /' },
        { check: 'httpd', mustBe: 'active (running)' },
        { check: 'curl localhost', mustBe: 'HTML response' }
      ]
    },
    {
      title: 'Aurora / NAT HA',
      items: [
        { check: 'Reader identifier', mustBe: 'inventory-replica' },
        { check: 'Reader AZ', mustBe: 'ต่างจาก inventory-primary' },
        { check: 'Second NAT name', mustBe: 'my-nat-gateway' },
        { check: 'Second NAT subnet', mustBe: 'Public Subnet 2' },
        { check: 'Private Route Table 2 route', mustBe: '0.0.0.0/0 → my-nat-gateway' },
        { check: 'Route Table association', mustBe: 'Private Subnet 2' }
      ]
    }
  ],

  lab5: [
    {
      title: '⚠️ ตอนสร้าง (ห้ามพลาด)',
      items: [
        { check: 'SNS topic type', mustBe: 'Standard (ห้าม FIFO)' },
        { check: 'SNS Access Policy', mustBe: 'แทน placeholder ให้ครบก่อนสร้าง S3 event' },
        { check: 'S3 event Prefix', mustBe: 'ingest/ (มี slash)' },
        { check: 'S3 event Suffix', mustBe: '.jpg (มีจุด ไม่ใช่ .jpeg)' },
        { check: 'CreateThumbnail trigger', mustBe: 'thumbnail-queue (ไม่สลับ)' },
        { check: 'CreateMobileImage trigger', mustBe: 'mobile-queue (ไม่สลับ)' },
        { check: 'Handler', mustBe: 'ตรงตัวพิมพ์ เช่น CreateThumbnail.handler' },
        { check: 'Trigger Batch size', mustBe: '1' }
      ]
    },
    {
      title: 'SNS / SQS',
      items: [
        { check: 'Region', mustBe: 'us-east-2 (Ohio)' },
        { check: 'SNS type', mustBe: 'Standard' },
        { check: 'SNS name', mustBe: 'resize-image-topic-{UNIQUE_SUFFIX}' },
        { check: 'thumbnail queue', mustBe: 'thumbnail-queue / Standard' },
        { check: 'mobile queue', mustBe: 'mobile-queue / Standard' },
        { check: 'ทั้ง 2 queues subscribe', mustBe: '{ResizeImageTopicArn}' }
      ]
    },
    {
      title: 'SNS Policy / S3 Event',
      items: [
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
      title: 'CreateThumbnail',
      items: [
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
      title: 'CreateMobileImage',
      items: [
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
      title: 'Result',
      items: [
        { check: 'Input', mustBe: 'ingest/{FILENAME}.jpg' },
        { check: 'Thumbnail output', mustBe: 'thumbnail/{FILENAME}.jpg' },
        { check: 'Mobile output', mustBe: 'mobile/{FILENAME}.jpg' },
        { check: 'CloudWatch', mustBe: 'ทั้ง 2 Functions มี log stream ล่าสุด' }
      ]
    }
  ],

  lab6: [
    {
      title: '⚠️ ตอนสร้าง (ห้ามพลาด)',
      items: [
        { check: 'Bucket settings ตอนสร้าง', mustBe: 'ปล่อย Default ทั้งหมด' },
        { check: 'ตอน public test → Block Public Access', mustBe: '☐ เอาติ๊กออก → พิมพ์ confirm' },
        { check: 'Public-read policy Resource', mustBe: 'เติม /* ต่อท้าย ARN' },
        { check: 'Folder ก่อน upload', mustBe: 'สร้าง CachedObjects แล้วค่อย upload' },
        { check: 'Origin access', mustBe: 'Origin access control settings → Create OAC' },
        { check: 'Origin path', mustBe: 'เว้นว่าง' },
        { check: 'CloudFront bucket policy Resource', mustBe: 'เติม /* ต่อท้าย ARN' },
        { check: 'AWS:SourceArn', mustBe: 'CloudFront distribution ARN (ไม่ใช่ domain)' },
        { check: 'Behavior → Cache key', mustBe: 'Cache policy and origin request policy' },
        { check: 'หลัง lock down → Block Public Access', mustBe: '☑ On กลับ → พิมพ์ confirm' }
      ]
    },
    {
      title: 'CloudFront เดิม',
      items: [
        { check: 'Region', mustBe: 'us-west-2' },
        { check: 'Distribution', mustBe: 'Distribution ที่ Lab สร้างไว้' },
        { check: 'Status', mustBe: 'Enabled / ไม่ใช่ Deploying' },
        { check: 'Domain', mustBe: '{CloudFrontDomain}' }
      ]
    },
    {
      title: 'S3 / Bucket Policy',
      items: [
        { check: 'Bucket name', mustBe: '{LabBucketName}' },
        { check: 'Object key', mustBe: 'CachedObjects/logo.png' },
        { check: 'Block all public access', mustBe: 'On หลังตั้ง OAC' },
        { check: 'Policy Principal', mustBe: 'cloudfront.amazonaws.com' },
        { check: 'Policy Resource', mustBe: 'arn:aws:s3:::{LabBucketName}/*' },
        { check: 'Policy AWS:SourceArn', mustBe: '{CloudFrontDistributionArn}' },
        { check: 'Policy placeholders', mustBe: 'เหลือ 0 จุด' }
      ]
    },
    {
      title: 'S3 Origin / OAC',
      items: [
        { check: 'Origin domain', mustBe: '{LabBucketName}' },
        { check: 'Origin path', mustBe: 'ว่าง' },
        { check: 'Origin name', mustBe: 'My Amazon S3 Origin' },
        { check: 'Origin access', mustBe: 'Origin access control settings' },
        { check: 'OAC', mustBe: 'Created / Selected' }
      ]
    },
    {
      title: 'Behavior / Result',
      items: [
        { check: 'Path pattern', mustBe: 'CachedObjects/*.png' },
        { check: 'Origin', mustBe: 'My Amazon S3 Origin' },
        { check: 'Cache policy', mustBe: 'CachingOptimized' },
        { check: 'Direct S3 URL', mustBe: '403 AccessDenied' },
        { check: 'CloudFront URL', mustBe: 'https://{CloudFrontDomain}/CachedObjects/logo.png' }
      ]
    }
  ],

  lab7: [
    {
      title: '⚠️ ตอนสร้าง (ห้ามพลาด)',
      items: [
        { check: 'Aurora SG', mustBe: 'ลบ default ออก → เหลือ RDSSecurityGroup' },
        { check: 'Aurora / Enhanced monitoring', mustBe: '☐ เอาติ๊กออก' },
        { check: 'Aurora / Deletion protection', mustBe: '☐ เอาติ๊กออก' },
        { check: 'Aurora Initial DB name', mustBe: 'WPDatabase (ไม่ใช่ MyDBCluster)' },
        { check: 'EFS backups / encryption', mustBe: '☐ เอาติ๊กออกทั้งคู่' },
        { check: 'EFS mount target SG', mustBe: 'ลบ default → EFSMountTargetSecurityGroup' },
        { check: 'ALB SG', mustBe: 'ลบ default → AppInstanceSecurityGroup' },
        { check: 'Stack param ALBDnsName', mustBe: 'ไม่มี http:// และไม่มี / ท้าย' }
      ]
    },
    {
      title: 'VPC Stack / Aurora',
      items: [
        { check: 'VPC Stack name', mustBe: 'VPCStack' },
        { check: 'VPC Stack status', mustBe: 'CREATE_COMPLETE' },
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
      title: 'EFS',
      items: [
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
      title: 'Target Group / ALB',
      items: [
        { check: 'Target group', mustBe: 'myWPTargetGroup / Instances / LabVPC' },
        { check: 'Protocol / Port', mustBe: 'HTTP / 80' },
        { check: 'Health path', mustBe: '/wp-login.php' },
        { check: 'Threshold', mustBe: 'Healthy 2 / Unhealthy 10' },
        { check: 'Timeout / Interval', mustBe: '50 / 60 seconds' },
        { check: 'ALB', mustBe: 'myWPAppALB / LabVPC' },
        { check: 'ALB subnets', mustBe: 'PublicSubnet1 + PublicSubnet2' },
        { check: 'ALB security group', mustBe: 'AppInstanceSecurityGroup เท่านั้น' },
        { check: 'Listener', mustBe: 'HTTP:80 → myWPTargetGroup' }
      ]
    },
    {
      title: 'WPLaunchConfigStack',
      items: [
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
      title: 'Auto Scaling Group',
      items: [
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
      title: 'Result',
      items: [
        { check: 'Target health', mustBe: 'healthy ทั้ง 2 targets' },
        { check: 'URL', mustBe: 'http://{AlbDnsName}/wp-login.php' },
        { check: 'Login', mustBe: 'wpadmin / {LabPassword}' }
      ]
    }
  ]
};
