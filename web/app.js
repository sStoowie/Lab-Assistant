let currentLab = null;

const labs = {
  lab2: { data: () => lab2Data, title: 'Lab 2 — VPC Infrastructure', desc: 'This lab follows Compute Module, which focuses primarily on Amazon EC2, and Networking Part 1 Module, which focuses on Amazon VPCs, subnets, and routing.' },
  lab3: { data: () => lab3Data, title: 'Lab 3 — Database Layer', desc: 'In this lab, you create an Amazon RDS database, view the database metadata, create an Application Load Balancer, configure the target group, register an existing Amazon EC2 instance as a target with the target group and test the load balancer.' },
  lab4: { data: () => lab4Data, title: 'Lab 4 — High Availability', desc: 'This lab provides hands-on practice deploying redundant resources in a VPC such as NAT gateway, VPC routing, EC2 auto scaling groups, and Amazon Aurora DB clusters.' },
  lab5: { data: () => lab5Data, title: 'Lab 5 — Serverless Architecture', desc: 'In this lab, you use AWS managed services to build a serverless architecture using Amazon SNS, Amazon SQS, AWS Lambda, and Amazon S3.' },
  lab6: { data: () => lab6Data, title: 'Lab 6 — CloudFront + S3', desc: 'This lab provides you with an overview of creating Amazon S3 buckets and adding them as an origin to Amazon CloudFront distributions.' }
};

document.addEventListener('DOMContentLoaded', () => {
  renderHome();
  setupTabs();
});

// --- HOMEPAGE ---
function renderHome() {
  const grid = document.getElementById('labGrid');
  let html = '';
  Object.entries(labs).forEach(([key, lab]) => {
    const stepCount = lab.data().steps.length;
    let errCount = 0;
    lab.data().steps.forEach(s => errCount += s.errors.length);
    html += `<div class="lab-card" onclick="openLab('${key}')">
      <div class="lab-card-num">${key.replace('lab','')}</div>
      <div class="lab-card-body">
        <h3>${lab.title}</h3>
        <p>${lab.desc}</p>
        <div class="lab-card-stats">
          <span>${stepCount} steps</span>
          <span>${errCount} errors covered</span>
        </div>
      </div>
    </div>`;
  });
  grid.innerHTML = html;
}

function openLab(lab) {
  currentLab = lab;
  document.getElementById('homepage').classList.add('hidden');
  document.getElementById('labpage').classList.remove('hidden');
  document.getElementById('labTitle').textContent = labs[lab].title;
  document.getElementById('labDesc').textContent = labs[lab].desc;
  document.getElementById('tab-spec').innerHTML = specsHTML[lab];
  renderSteps(labs[lab].data());

  // Reset to spec tab
  document.querySelectorAll('.spec-tab').forEach(t => t.classList.remove('active'));
  document.querySelector('[data-tab="spec"]').classList.add('active');
  document.getElementById('tab-spec').classList.remove('hidden');
  document.getElementById('tab-steps').classList.add('hidden');

  window.scrollTo(0, 0);
}

function goHome() {
  document.getElementById('labpage').classList.add('hidden');
  document.getElementById('homepage').classList.remove('hidden');
  window.scrollTo(0, 0);
}

// --- TABS ---
function setupTabs() {
  document.querySelectorAll('.spec-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const t = tab.dataset.tab;
      document.querySelectorAll('.spec-tab').forEach(x => x.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('tab-spec').classList.toggle('hidden', t !== 'spec');
      document.getElementById('tab-steps').classList.toggle('hidden', t !== 'steps');
    });
  });
}

// --- STEPS ---
function jumpTo(num) {
  document.querySelectorAll('.spec-tab').forEach(x => x.classList.remove('active'));
  document.querySelector('[data-tab="steps"]').classList.add('active');
  document.getElementById('tab-spec').classList.add('hidden');
  document.getElementById('tab-steps').classList.remove('hidden');

  setTimeout(() => {
    const el = document.getElementById('s' + num);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('highlight');
      setTimeout(() => el.classList.remove('highlight'), 2500);
      el.querySelectorAll('details').forEach(d => d.open = true);
    }
  }, 100);
}

function renderSteps(labData) {
  const container = document.getElementById('tab-steps');
  let html = '';
  let currentTask = '';

  labData.steps.forEach(step => {
    if (step.task !== currentTask) {
      if (currentTask) html += `</div>`;
      currentTask = step.task;
      html += `<div class="task-section"><div class="task-label">${step.task}</div>`;
    }

    const hasErr = step.errors.length > 0;
    html += `<div class="step ${hasErr ? 'has-error' : ''}" id="s${step.num}">
      <div class="step-num">${step.num}</div>
      <div class="step-body">
        <div class="step-desc">${step.desc}</div>`;

    step.errors.forEach(err => {
      const fixHtml = formatFix(err.fix);
      html += `<details class="step-error">
        <summary><span class="err-icon">!</span>${err.problem}</summary>
        <div class="error-content">
          <div class="error-result"><strong>สาเหตุ</strong>${err.cause}</div>
          <div class="error-fix"><strong>วิธีแก้</strong>${fixHtml}</div>
        </div>
      </details>`;
    });

    html += `</div></div>`;
  });

  if (currentTask) html += `</div>`;
  container.innerHTML = html;
}

function formatFix(text) {
  return text
    .replace(/\n/g, '<br>')
    .replace(/ข้อ (\d+)/g, '<span class="err-ref" onclick="jumpTo($1)">ข้อ $1</span>');
}


// Custom cursor
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});
document.addEventListener('mousedown', () => cursor.classList.add('active'));
document.addEventListener('mouseup', () => cursor.classList.remove('active'));
