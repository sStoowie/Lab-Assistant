const universalDebugData = [
  {
    phase: 'reproduce',
    icon: '🎯',
    title: 'ด่าน 1 — ล็อกอาการให้ชัด (REPRODUCE)',
    when: 'เริ่มตรงนี้ทุกครั้ง ห้ามแก้อะไรก่อนทำให้อาการเกิดซ้ำได้และเก็บข้อความ error ไว้',
    checks: [
      { where: 'จุดที่ผู้ใช้ทดสอบจริง', check: 'ทำ action เดิมซ้ำด้วย URL / command / file / input เดิม', expect: 'อาการเดิมเกิดซ้ำได้ และรู้แน่ชัดว่ากดหรือรันอะไร', ifNot: 'ถ้าเกิดบ้างไม่เกิดบ้าง ให้จดเวลาและเงื่อนไขที่ต่างกันก่อน เพราะอาจเป็น timing / propagation / cache' },
      { where: 'Lab instruction → ผลลัพธ์ที่โจทย์ต้องการ', check: 'เขียน Expected กับ Actual อย่างละ 1 ประโยค', expect: 'ตอบได้ว่า “ควรเห็นอะไร” แต่ “ตอนนี้เห็นอะไร” โดยไม่ใช้แค่คำว่าใช้ไม่ได้', ifNot: 'กลับไปอ่าน Spec หรือ Steps เพื่อยืนยันผลที่ถูกต้องก่อน debug' },
      { where: 'Browser / AWS Console / Terminal', check: 'เก็บ error แบบคำต่อคำ พร้อม status code และ timestamp', expect: 'มีข้อความจริง เช่น timeout, AccessDenied, 403, 503, unhealthy หรือ trigger ไม่ทำงาน', ifNot: 'เปิดรายละเอียด error / Status reason / Activity / Logs แล้วทดสอบอีกครั้ง ห้ามเดาจากอาการอย่างเดียว' },
      { where: 'อาการที่เก็บได้', check: 'จัดประเภทความเสียหายเบื้องต้น', expect: 'เลือกได้หนึ่งกลุ่ม: หา resource ไม่เจอ / ยังไม่ ready / ต่อไม่ถึง / ถูกปฏิเสธ / runtime พัง / event ไม่ถูกเรียก', ifNot: 'ยังไม่ต้องแก้ ให้ทำสามข้อด้านบนจนจัดกลุ่มได้' }
    ]
  },
  {
    phase: 'context',
    icon: '🧭',
    title: 'ด่าน 2 — เช็คโลกที่กำลังอยู่ (CONTEXT)',
    when: 'ตัดปัญหา “ทำถูกแต่ทำผิดที่” ซึ่งเป็นสาเหตุที่เสียเวลามากที่สุด',
    checks: [
      { where: 'AWS Console แถบขวาบน / Lab panel', check: 'Account, Role และ Region', expect: 'อยู่ account ของ lab, ใช้ role ที่กำหนด และ region ตรงกับโจทย์ทุกหน้า', ifNot: 'เจอจุดผิดแล้ว → สลับ account / role / region ให้ถูกก่อนตรวจอย่างอื่น' },
      { where: 'หน้ารายละเอียด Resource', check: 'ชื่อ, ID, ARN, Tag และ VPC ของ resource ที่กำลังดู', expect: 'เป็น resource ของ lab นี้จริง ไม่ใช่ default, ของรอบเก่า หรือชื่อคล้ายกัน', ifNot: 'เจอจุดผิดแล้ว → กลับไปเลือก resource จาก ID/ARN ที่ถูกต้อง ไม่อ้างด้วยชื่ออย่างเดียว' },
      { where: 'Steps & Errors', check: 'Prerequisite และลำดับข้อก่อนหน้าทำครบ', expect: 'ทุก resource ต้นทางที่ขั้นนี้พึ่งพามีอยู่จริง และไม่มีข้อก่อนหน้าถูกข้าม', ifNot: 'หยุดตรงนี้ → ทำข้อแรกที่ขาดให้สำเร็จก่อน แล้วค่อยทดสอบอาการเดิม' },
      { where: 'ค่าที่ copy/paste หรือ Parameters', check: 'ไม่มี placeholder, ช่องว่าง, quote แปลก และตัวพิมพ์ผิด', expect: 'ค่าจริงครบถ้วน เช่น ID/ARN/endpoint/path และตัวพิมพ์ใหญ่เล็กตรงต้นฉบับ', ifNot: 'เจอจุดผิดแล้ว → copy ใหม่จาก source of truth แล้วบันทึก/รอ deploy ก่อนทดสอบ' }
    ]
  },
  {
    phase: 'ready',
    icon: '⚡',
    title: 'ด่าน 3 — ทุกชิ้นพร้อมทำงานหรือยัง (READY)',
    when: 'resource ที่ยังสร้างไม่เสร็จหรือ health check ไม่ผ่าน จะทำให้ปลายทางพังแม้ config ถูก',
    checks: [
      { where: 'หน้ารายละเอียด Resource ทุกตัวใน flow', check: 'State / Status', expect: 'Running, Available, Active, Enabled หรือ CREATE_COMPLETE ตามชนิด resource', ifNot: 'หยุดที่ resource ตัวแรกที่ไม่พร้อม → เปิด Status reason / Events ก่อน ห้ามรีบ delete แล้วสร้างใหม่' },
      { where: 'EC2 Status checks / Target health / CloudFormation Events', check: 'Health และเหตุผลล่าสุด', expect: 'ผ่าน health check และไม่มี failed event หรือ recreate loop', ifNot: 'เจอ layer ที่พังแล้ว → ใช้ reason ที่แสดงเป็นหลักฐาน แล้วไปตรวจ runtime หรือ config ของตัวนั้น' },
      { where: 'Dependencies เช่น RDS, NAT, ALB, EFS, CloudFront', check: 'resource ที่ถูกเรียกต่อพร้อมก่อน resource ปลายทาง', expect: 'dependency ทุกตัวพร้อม และ endpoint / mount target / deployment ถูกสร้างครบ', ifNot: 'แก้หรือรอ dependency ตัวแรกที่ยังไม่พร้อม ไม่ต้องแก้ปลายทาง' },
      { where: 'หลัง Create / Update / Register target', check: 'เวลารอ propagation และ grace period', expect: 'รอครบตาม service แล้ว refresh จน status หยุดเปลี่ยน', ifNot: 'ยังสรุปว่า config ผิดไม่ได้ → จดเวลาเริ่ม รอให้ครบ แล้วทดสอบเดิมอีกครั้ง' }
    ]
  },
  {
    phase: 'flow',
    icon: '🔗',
    title: 'ด่าน 4 — ไล่สายทีละช่วง (FLOW / WIRING)',
    when: 'ห้ามมองทั้งระบบพร้อมกัน ให้หา “ช่วงแรกที่ขาด” จากต้นทางไปปลายทาง',
    checks: [
      { where: 'กระดาษ / Spec architecture', check: 'เขียน flow เป็นลูกศรจากจุดทดสอบถึงปลายทาง', expect: 'ได้เส้นทางชัด เช่น Browser → ALB → Target → DB หรือ S3 → SNS → SQS → Lambda', ifNot: 'กลับไปดู Spec แล้วเขียนชื่อ resource จริงลงทุกจุดก่อนตรวจต่อ' },
      { where: 'ต้นทางของ flow', check: 'ต้นทางสร้าง request / object / message จริง', expect: 'มีหลักฐานที่ต้นทาง เช่น request, S3 object, queue message หรือ command output', ifNot: 'เจอจุดผิดแล้ว → แก้ input, URL, folder, suffix หรือ command ที่ต้นทาง' },
      { where: 'ทุกลูกศรใน flow จากซ้ายไปขวา', check: 'Source ชี้ Target ถูกตัว พร้อม protocol, port, path และ association', expect: 'listener/route/target/trigger/subscription/origin ชี้ resource ที่ต้องการทุกช่วง', ifNot: 'เจอช่วงที่ขาดแล้ว → แก้เฉพาะลูกศรนั้น แล้วเริ่มไล่ใหม่จากต้นทาง' },
      { where: 'ก่อนและหลังแต่ละ hop', check: 'ทดสอบแบบใกล้ที่สุด เช่น localhost → private endpoint → public endpoint', expect: 'รู้แน่ว่า hop สุดท้ายที่ผ่านคือจุดไหน และ hop แรกที่ไม่ผ่านคือจุดไหน', ifNot: 'ลดระยะการทดสอบให้สั้นลงจนได้ขอบเขตสองจุดนี้ — ตรงนี้คือ layer ที่ต้องแก้' }
    ]
  },
  {
    phase: 'access',
    icon: '🔐',
    title: 'ด่าน 5 — ทางผ่านและสิทธิ์ (NETWORK / ACCESS)',
    when: 'ใช้เมื่อ resource พร้อมและชี้หากันถูก แต่ request ไปไม่ถึงหรือถูก AccessDenied',
    checks: [
      { where: 'Subnet → Route table → IGW / NAT', check: 'เส้นทาง network ทั้งขาไปและขากลับ', expect: 'subnet associate route table ถูก และ default route ชี้ gateway ที่ถูกชนิด/ตำแหน่ง', ifNot: 'เจอ network edge ที่ขาดแล้ว → แก้ route/association/gateway จุดนั้นก่อน' },
      { where: 'Security Group / NACL', check: 'Protocol, port และ source/destination', expect: 'เปิด port ที่ service ใช้จาก source ที่ถูก (ควรอ้าง SG เมื่อโจทย์กำหนด)', ifNot: 'แก้ rule ให้ตรง flow ห้ามเปิดทุก port ให้ 0.0.0.0/0 เพื่อกลบอาการ' },
      { where: 'IAM Role / Identity policy / Resource policy', check: 'Principal, Action, Resource ARN และ trust relationship', expect: 'ตัวที่รันงานมีสิทธิ์ต่อ resource จริง และ ARN/เงื่อนไขตรง resource ปัจจุบัน', ifNot: 'เจอ permission ที่ขาดแล้ว → แก้ policy แคบที่สุด แล้วอ่าน error ใหม่หลัง retry' },
      { where: 'Event notification / Trigger / Subscription', check: 'การผูก event และ filter', expect: 'source ผูก destination ถูกตัว และ prefix/suffix/event type ตรง input จริง', ifNot: 'เจอ wiring ที่ขาดแล้ว → แก้ binding/filter แล้วสร้าง event ใหม่ เพราะ event เก่าอาจไม่ replay' }
    ]
  },
  {
    phase: 'runtime',
    icon: '🧩',
    title: 'ด่าน 6 — ข้างในรันจริงไหม (CONFIG / RUNTIME)',
    when: 'ใช้เมื่อ traffic มาถึง resource แล้ว แต่ได้ 4xx/5xx, unhealthy หรือไม่มี output',
    checks: [
      { where: 'Instance / Container / Function', check: 'process หรือ service ทำงาน และตอบ local test', expect: 'service active, handler ถูกเรียก และ localhost/health path ตอบตามที่คาด', ifNot: 'เจอ runtime ที่พังแล้ว → เปิด service status และ log ก่อน restart หรือ recreate' },
      { where: 'CloudWatch Logs / service logs', check: 'error ในช่วง timestamp เดียวกับที่ทดสอบ', expect: 'เจอ request/event ล่าสุด และไม่มี fatal, exception, permission หรือ connection error', ifNot: 'ถ้าไม่มี log เลย ให้ย้อนด่าน FLOW; ถ้ามี error ให้ใช้บรรทัดแรกที่เป็น root cause ไม่ใช่บรรทัด stack trace ท้ายสุด' },
      { where: 'Environment / Parameters / Settings', check: 'endpoint, database, bucket, queue, path, credentials และ case sensitivity', expect: 'ค่าตรง resource จริง ไม่มี -ro ผิดประเภท, ไม่มี space และชื่อ/path ตรงตัวพิมพ์', ifNot: 'เจอ config ที่ผิดแล้ว → แก้ค่าเดียว deploy/save แล้วทดสอบ input เดิม' },
      { where: 'User data / Script / Lambda runtime settings', check: 'entry point, handler, interpreter และ syntax', expect: 'บรรทัดแรก/handler ถูกต้อง ไฟล์ executable และ script จบโดยไม่มี error', ifNot: 'รันหรืออ่าน log ของ script ทีละคำสั่ง แก้คำสั่งแรกที่ fail ก่อนส่วนที่เหลือ' }
    ]
  },
  {
    phase: 'prove',
    icon: '✅',
    title: 'ด่าน 7 — พิสูจน์ว่าเจอตัวจริง (FIX / VERIFY)',
    when: 'ปิดงานด้วยหลักฐาน ไม่ใช่แก้หลายอย่างแล้วบังเอิญใช้ได้',
    checks: [
      { where: 'จุด ❌ แรกที่พบจากด่านก่อนหน้า', check: 'ตั้งสมมติฐานหนึ่งข้อจากหลักฐาน', expect: 'ประโยคแบบ “request หยุดที่ X เพราะ Y ไม่ตรง” และระบุค่าที่จะแก้เพียงจุดเดียว', ifNot: 'ถ้ายังบอก X และ Y ไม่ได้ ให้ย้อนด่านแรกที่ตอบ ✅ ไม่ได้' },
      { where: 'Resource ที่เป็นต้นเหตุ', check: 'เปลี่ยนครั้งละหนึ่งค่าและจดค่าก่อนแก้', expect: 'รู้ว่าเปลี่ยนอะไร สามารถย้อนกลับได้ และไม่แตะ layer อื่นพร้อมกัน', ifNot: 'ยกเลิกการแก้หลายจุด แล้วกลับสู่ค่าก่อนหน้าเพื่อทดสอบใหม่อย่างควบคุมได้' },
      { where: 'จุดทดสอบเดิมจากด่าน 1', check: 'ทดสอบซ้ำด้วย input เดิมหลัง status พร้อม', expect: 'อาการเดิมหาย, flow ผ่านทุก hop และผลลัพธ์ตรง Expected', ifNot: 'เก็บ error/timestamp รอบใหม่ จุด ❌ อาจเลื่อนไป hop ถัดไป → เริ่มไล่จาก READY อีกครั้ง' },
      { where: 'แท็บ Troubleshoot ของ Lab นี้', check: 'เทียบ layer และอาการที่หาเจอกับ checklist เฉพาะ lab', expect: 'ได้วิธีแก้เฉพาะ service หรือมี evidence ครบสำหรับถามผู้สอน: error, เวลา, failing hop, log และสิ่งที่ลองแล้ว', ifNot: 'อย่าส่งแค่ “ทำไม่ได้” — แนบ evidence ทั้งห้ารายการเพื่อให้วิเคราะห์ต่อได้ทันที' }
    ]
  }
];
