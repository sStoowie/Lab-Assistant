'use strict';

/* =========================================================
   Lab Debug Assistant — app logic
   ========================================================= */

let currentLab = null;

// Step numbers that exist in the lab currently open.
// Used to validate "ข้อ NN" cross-references before turning them into links.
let currentStepNums = new Set();

const LAB_META = {
  lab1: { get: () => lab1Data, title: 'Lab 1 — Console & CLI', desc: 'This lab provides you with a basic overview of the AWS Management Console and API. You create S3 buckets using both the console and AWS CLI.' },
  lab2: { get: () => lab2Data, title: 'Lab 2 — VPC Infrastructure', desc: 'This lab follows Compute Module, which focuses primarily on Amazon EC2, and Networking Part 1 Module, which focuses on Amazon VPCs, subnets, and routing.' },
  lab3: { get: () => lab3Data, title: 'Lab 3 — Database Layer', desc: 'In this lab, you create an Amazon RDS database, view the database metadata, create an Application Load Balancer, configure the target group, register an existing Amazon EC2 instance as a target with the target group and test the load balancer.' },
  lab4: { get: () => lab4Data, title: 'Lab 4 — High Availability', desc: 'This lab provides hands-on practice deploying redundant resources in a VPC such as NAT gateway, VPC routing, EC2 auto scaling groups, and Amazon Aurora DB clusters.' },
  lab5: { get: () => lab5Data, title: 'Lab 5 — Serverless Architecture', desc: 'In this lab, you use AWS managed services to build a serverless architecture using Amazon SNS, Amazon SQS, AWS Lambda, and Amazon S3.' },
  lab6: { get: () => lab6Data, title: 'Lab 6 — CloudFront + S3', desc: 'This lab provides you with an overview of creating Amazon S3 buckets and adding them as an origin to Amazon CloudFront distributions.' },
  lab7: { get: () => lab7Data, title: 'Lab 7 — Capstone: Multi-Tier', desc: 'This lab provides capstone experience for the Architecting on AWS course. Build a full multi-tier WordPress architecture.' }
};

/* =========================================================
   ERROR REPORTING
   The data files are plain <script> includes. If one fails to load or
   has a syntax error, the old code threw a ReferenceError inside
   DOMContentLoaded and the page rendered completely blank with no clue
   as to why. Everything below makes failures visible instead.
   ========================================================= */

const diagnostics = [];

function logIssue(severity, message) {
  diagnostics.push({ severity, message });
  const line = `[${severity}] ${message}`;
  if (severity === 'error') console.error(line);
  else console.warn(line);
}

function renderDiagnostics() {
  const banner = document.getElementById('errorBanner');
  if (!banner) return;

  if (diagnostics.length === 0) {
    banner.classList.add('hidden');
    banner.innerHTML = '';
    return;
  }

  const errors = diagnostics.filter(d => d.severity === 'error');
  const warns = diagnostics.filter(d => d.severity === 'warn');

  banner.className = 'app-error' + (errors.length ? '' : ' app-error-warn');
  banner.innerHTML = `
    <div class="app-error-head">
      ${errors.length ? `พบปัญหา ${errors.length} รายการที่ทำให้ข้อมูลบางส่วนใช้ไม่ได้` : `พบข้อสังเกต ${warns.length} รายการ`}
    </div>
    <ul class="app-error-list">
      ${diagnostics.slice(0, 12).map(d =>
        `<li class="app-error-${d.severity}">${escapeHtml(d.message)}</li>`
      ).join('')}
    </ul>
    ${diagnostics.length > 12 ? `<div class="app-error-more">…และอีก ${diagnostics.length - 12} รายการ (ดู Console)</div>` : ''}
    <button type="button" class="app-error-close" onclick="dismissDiagnostics()">ปิด</button>
  `;
}

function dismissDiagnostics() {
  const banner = document.getElementById('errorBanner');
  if (banner) banner.classList.add('hidden');
}

// Catch anything that escapes the explicit guards so the user still sees a reason.
window.addEventListener('error', e => {
  logIssue('error', `Unhandled error: ${e.message} (${e.filename || '?'}:${e.lineno || '?'})`);
  renderDiagnostics();
});

/* =========================================================
   SAFE DATA ACCESS + VALIDATION
   ========================================================= */

// The data files declare `const labNData`, which does NOT become a property
// of window, so it can only be reached by direct reference. A missing file
// therefore throws ReferenceError — caught here per lab instead of globally.
function loadLabData(key) {
  const meta = LAB_META[key];
  if (!meta) return { ok: false, reason: `ไม่รู้จัก lab "${key}"` };
  try {
    const data = meta.get();
    if (!data || typeof data !== 'object') {
      return { ok: false, reason: `${key}: ตัวแปรข้อมูลว่างหรือไม่ใช่ object` };
    }
    if (!Array.isArray(data.steps)) {
      return { ok: false, reason: `${key}: ไม่มี steps array (ได้ ${typeof data.steps})` };
    }
    return { ok: true, data };
  } catch (err) {
    return { ok: false, reason: `${key}: โหลด ${key}-data.js ไม่สำเร็จ — ${err.message}` };
  }
}

function getSpecHTML(key) {
  try {
    const html = specsHTML[key];
    return typeof html === 'string' ? html : null;
  } catch (err) {
    logIssue('error', `specs.js โหลดไม่สำเร็จ — ${err.message}`);
    return null;
  }
}

function getTroubleshootData(key) {
  try {
    const d = troubleshootData[key];
    return Array.isArray(d) ? d : [];
  } catch (err) {
    logIssue('error', `troubleshoot.js โหลดไม่สำเร็จ — ${err.message}`);
    return [];
  }
}

function getDebugData() {
  try {
    return Array.isArray(universalDebugData) ? universalDebugData : [];
  } catch (err) {
    logIssue('error', `debug.js โหลดไม่สำเร็จ — ${err.message}`);
    return [];
  }
}

/**
 * Structural check on one lab's steps. Surfaces the mistakes that are easy to
 * make when a TA appends a new error entry by hand: missing field, duplicate
 * step number, errors that isn't an array, cross-reference to a step that
 * doesn't exist.
 */
function validateLabData(key, data) {
  const issues = [];
  const nums = new Set();

  data.steps.forEach((step, i) => {
    const label = `${key} step ${step && step.num !== undefined ? step.num : `#${i}`}`;

    if (!step || typeof step !== 'object') {
      issues.push(`${label}: ไม่ใช่ object`);
      return;
    }
    if (typeof step.num !== 'number' || !Number.isFinite(step.num)) {
      issues.push(`${label}: num ต้องเป็นตัวเลข (ได้ ${JSON.stringify(step.num)})`);
    } else if (nums.has(step.num)) {
      issues.push(`${label}: num ซ้ำ`);
    } else {
      nums.add(step.num);
    }
    if (!step.task) issues.push(`${label}: ไม่มี task`);
    if (!step.desc) issues.push(`${label}: ไม่มี desc`);

    if (step.errors === undefined) {
      issues.push(`${label}: ไม่มี errors array`);
    } else if (!Array.isArray(step.errors)) {
      issues.push(`${label}: errors ต้องเป็น array (ได้ ${typeof step.errors})`);
    } else {
      step.errors.forEach((err, j) => {
        if (!err || typeof err !== 'object') {
          issues.push(`${label} error[${j}]: ไม่ใช่ object`);
          return;
        }
        ['problem', 'cause', 'fix'].forEach(f => {
          if (!err[f]) issues.push(`${label} error[${j}]: ไม่มี "${f}"`);
        });
      });
    }
  });

  // Cross-references are only useful if they point somewhere real.
  data.steps.forEach(step => {
    if (!step || !Array.isArray(step.errors)) return;
    step.errors.forEach(err => {
      if (!err) return;
      collectRefs(`${err.cause || ''} ${err.fix || ''}`).forEach(target => {
        if (!nums.has(target)) {
          issues.push(`${key} step ${step.num}: อ้างถึง "ข้อ ${target}" ที่ไม่มีใน lab นี้`);
        }
      });
    });
  });

  return { issues, nums };
}

const REF_PATTERN = /ข้อ\s*(\d+)/g;

function collectRefs(text) {
  const out = [];
  if (typeof text !== 'string') return out;
  REF_PATTERN.lastIndex = 0;
  let m;
  while ((m = REF_PATTERN.exec(text)) !== null) out.push(Number(m[1]));
  return out;
}

/* =========================================================
   HTML HELPERS
   ========================================================= */

function escapeHtml(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Escape, convert newlines, then turn "ข้อ NN" into a jump link.
 * A reference to a step that doesn't exist is rendered as a visible broken
 * marker rather than a link that silently does nothing when clicked.
 */
function formatText(text) {
  const escaped = escapeHtml(text).replace(/\n/g, '<br>');
  return escaped.replace(/ข้อ\s*(\d+)/g, (match, num) => {
    const n = Number(num);
    if (currentStepNums.has(n)) {
      return `<span class="err-ref" role="link" tabindex="0" onclick="jumpTo(${n})" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();jumpTo(${n});}">${match}</span>`;
    }
    return `<span class="err-ref err-ref-broken" title="ไม่พบข้อ ${n} ใน lab นี้">${match} ⚠</span>`;
  });
}

/* =========================================================
   BOOT
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  try {
    renderHome();
    setupTabs();
    setupToolbar();
  } catch (err) {
    logIssue('error', `เริ่มต้นหน้าเว็บไม่สำเร็จ — ${err.message}`);
    console.error(err);
  }
  renderDiagnostics();
});

/* =========================================================
   HOMEPAGE
   ========================================================= */

function renderHome() {
  const grid = document.getElementById('labGrid');
  if (!grid) {
    logIssue('error', 'ไม่พบ #labGrid ใน index.html');
    return;
  }

  const cards = Object.entries(LAB_META).map(([key, meta]) => {
    const num = key.replace('lab', '');
    const result = loadLabData(key);

    if (!result.ok) {
      logIssue('error', result.reason);
      return `<div class="lab-card lab-card-broken" aria-disabled="true">
        <div class="lab-card-num">${escapeHtml(num)}</div>
        <div class="lab-card-body">
          <h3>${escapeHtml(meta.title)}</h3>
          <p>โหลดข้อมูล lab นี้ไม่ได้ — ตรวจว่าไฟล์ <code>${escapeHtml(key)}-data.js</code> ถูก include และไม่มี syntax error</p>
          <div class="lab-card-stats"><span class="stat-broken">ใช้งานไม่ได้</span></div>
        </div>
      </div>`;
    }

    const { data } = result;
    const steps = data.steps;
    const errCount = steps.reduce(
      (sum, s) => sum + (s && Array.isArray(s.errors) ? s.errors.length : 0),
      0
    );

    // Report data problems, but still let the TA open the lab.
    const { issues } = validateLabData(key, data);
    issues.forEach(i => logIssue('warn', i));

    if (!getSpecHTML(key)) logIssue('warn', `${key}: ไม่มี spec HTML ใน specs.js`);

    return `<div class="lab-card" role="button" tabindex="0" onclick="openLab('${key}')"
        onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openLab('${key}');}">
      <div class="lab-card-num">${escapeHtml(num)}</div>
      <div class="lab-card-body">
        <h3>${escapeHtml(meta.title)}</h3>
        <p>${escapeHtml(meta.desc)}</p>
        <div class="lab-card-stats">
          <span>${steps.length} steps</span>
          <span>${errCount} errors covered</span>
          ${issues.length ? `<span class="stat-warn">${issues.length} data warnings</span>` : ''}
        </div>
      </div>
    </div>`;
  });

  grid.innerHTML = cards.join('');
}

function openLab(key) {
  const result = loadLabData(key);
  if (!result.ok) {
    logIssue('error', result.reason);
    renderDiagnostics();
    return;
  }

  currentLab = key;
  const { data } = result;

  // Rebuild the valid-step set before any formatText() call so cross-reference
  // validation is scoped to the lab actually on screen.
  const { nums } = validateLabData(key, data);
  currentStepNums = nums;

  document.getElementById('homepage').classList.add('hidden');
  document.getElementById('labpage').classList.remove('hidden');
  document.getElementById('labTitle').textContent = LAB_META[key].title;
  document.getElementById('labDesc').textContent = LAB_META[key].desc;

  const spec = getSpecHTML(key);
  document.getElementById('tab-spec').innerHTML = spec !== null
    ? spec
    : '<p class="empty-note">ยังไม่มี spec สำหรับ lab นี้</p>';

  renderSteps(data);
  renderTroubleshoot(key);
  renderDebug(key);

  resetSearch();
  showTab('spec');
  renderDiagnostics();
  window.scrollTo(0, 0);
}

function goHome() {
  document.getElementById('labpage').classList.add('hidden');
  document.getElementById('homepage').classList.remove('hidden');
  window.scrollTo(0, 0);
}

/* =========================================================
   TABS
   Single place that owns tab visibility. The previous jumpTo() showed the
   steps tab and hid the spec tab but left the troubleshoot tab visible,
   so two panels could render at once.
   ========================================================= */

const TABS = ['spec', 'steps', 'troubleshoot', 'debug'];

function showTab(name) {
  if (!TABS.includes(name)) {
    logIssue('warn', `ไม่รู้จัก tab "${name}"`);
    return;
  }
  TABS.forEach(t => {
    const panel = document.getElementById('tab-' + t);
    if (panel) panel.classList.toggle('hidden', t !== name);
  });
  document.querySelectorAll('.spec-tab').forEach(btn => {
    const active = btn.dataset.tab === name;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-selected', active ? 'true' : 'false');
  });
}

function setupTabs() {
  document.querySelectorAll('.spec-tab').forEach(tab => {
    tab.addEventListener('click', () => showTab(tab.dataset.tab));
  });
}

/* =========================================================
   STEPS
   ========================================================= */

function renderSteps(labData) {
  const container = document.getElementById('tab-steps');
  if (!container) {
    logIssue('error', 'ไม่พบ #tab-steps ใน index.html');
    return;
  }

  let html = '';
  let currentTask = null;

  labData.steps.forEach(step => {
    if (!step || typeof step !== 'object') return;

    if (step.task !== currentTask) {
      if (currentTask !== null) html += '</div>';
      currentTask = step.task;
      html += `<div class="task-section"><div class="task-label">${escapeHtml(step.task || 'ไม่ระบุ task')}</div>`;
    }

    const errors = Array.isArray(step.errors) ? step.errors.filter(Boolean) : [];
    const hasErr = errors.length > 0;

    // Lowercased haystack used by the search filter.
    const haystack = [
      step.num,
      step.task,
      step.desc,
      ...errors.flatMap(e => [e.problem, e.cause, e.fix])
    ].filter(Boolean).join(' ').toLowerCase();

    html += `<div class="step ${hasErr ? 'has-error' : ''}" id="s${escapeHtml(step.num)}"
        data-num="${escapeHtml(step.num)}" data-errors="${errors.length}"
        data-search="${escapeHtml(haystack)}">
      <div class="step-num">${escapeHtml(step.num)}</div>
      <div class="step-body">
        <div class="step-desc">${escapeHtml(step.desc)}</div>`;

    errors.forEach(err => {
      html += `<details class="step-error">
        <summary><span class="err-icon">!</span>${escapeHtml(err.problem)}</summary>
        <div class="error-content">
          <div class="error-result"><strong>สาเหตุ</strong>${formatText(err.cause)}</div>
          <div class="error-fix"><strong>วิธีแก้</strong>${formatText(err.fix)}</div>
        </div>
      </details>`;
    });

    html += '</div></div>';
  });

  if (currentTask !== null) html += '</div>';
  container.innerHTML = html || '<p class="empty-note">ไม่มี step ใน lab นี้</p>';
}

function jumpTo(num) {
  const target = Number(num);
  showTab('steps');

  const el = document.getElementById('s' + target);
  if (!el) {
    setSearchStatus(`ไม่พบข้อ ${target} ใน lab นี้`, true);
    logIssue('warn', `${currentLab}: jumpTo(${target}) — ไม่มี step นี้`);
    renderDiagnostics();
    return;
  }

  // A step hidden by an active search filter can't be scrolled to.
  if (el.classList.contains('hidden-search')) resetSearch();

  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  el.classList.add('highlight');
  setTimeout(() => el.classList.remove('highlight'), 2500);
  el.querySelectorAll('details').forEach(d => { d.open = true; });
}

/* =========================================================
   SEARCH + JUMP TOOLBAR
   The stylesheet already carried .toolbar / .jump-group / .search-group and
   .hidden-search rules, but nothing used them. This wires them up so a TA can
   look up the error text a learner reports instead of scrolling 800+ steps.
   ========================================================= */

function setupToolbar() {
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearchBtn');
  const jumpInput = document.getElementById('jumpInput');
  const jumpBtn = document.getElementById('jumpBtn');

  if (searchInput) {
    searchInput.addEventListener('input', () => applySearch(searchInput.value));
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Escape') resetSearch();
    });
  }
  if (clearBtn) clearBtn.addEventListener('click', resetSearch);

  const doJump = () => {
    if (!jumpInput) return;
    const raw = jumpInput.value.trim();
    if (raw === '') {
      setSearchStatus('ใส่เลขข้อก่อน', true);
      return;
    }
    const n = Number(raw);
    if (!Number.isInteger(n) || n < 1) {
      setSearchStatus(`"${raw}" ไม่ใช่เลขข้อที่ใช้ได้`, true);
      return;
    }
    jumpTo(n);
  };

  if (jumpBtn) jumpBtn.addEventListener('click', doJump);
  if (jumpInput) {
    jumpInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); doJump(); }
    });
  }
}

function applySearch(rawQuery) {
  const query = String(rawQuery || '').trim().toLowerCase();
  const steps = document.querySelectorAll('#tab-steps .step');

  if (query === '') {
    steps.forEach(el => {
      el.classList.remove('hidden-search');
      el.querySelectorAll('details').forEach(d => { d.open = false; });
    });
    document.querySelectorAll('#tab-steps .task-section')
      .forEach(s => s.classList.remove('hidden-search'));
    setSearchStatus('');
    return;
  }

  showTab('steps');

  let matched = 0;
  let matchedErrors = 0;
  steps.forEach(el => {
    const hit = (el.dataset.search || '').includes(query);
    el.classList.toggle('hidden-search', !hit);
    if (hit) {
      matched++;
      matchedErrors += Number(el.dataset.errors || 0);
      // Expand so the matching error text is visible without another click.
      el.querySelectorAll('details').forEach(d => { d.open = true; });
    }
  });

  // Hide a task heading when every step under it is filtered out.
  document.querySelectorAll('#tab-steps .task-section').forEach(section => {
    const visible = section.querySelectorAll('.step:not(.hidden-search)').length;
    section.classList.toggle('hidden-search', visible === 0);
  });

  if (matched === 0) {
    setSearchStatus(`ไม่พบ "${rawQuery}" ใน lab นี้`, true);
  } else {
    setSearchStatus(`พบ ${matched} ข้อ (${matchedErrors} errors)`);
  }
}

function resetSearch() {
  const input = document.getElementById('searchInput');
  if (input) input.value = '';
  applySearch('');
}

function setSearchStatus(message, isWarning) {
  const el = document.getElementById('searchStatus');
  if (!el) return;
  el.textContent = message || '';
  el.classList.toggle('search-status-warn', Boolean(isWarning));
  el.classList.toggle('hidden', !message);
}

/* =========================================================
   TROUBLESHOOT
   ========================================================= */

function renderTroubleshoot(key) {
  const container = document.getElementById('tab-troubleshoot');
  if (!container) {
    logIssue('error', 'ไม่พบ #tab-troubleshoot ใน index.html');
    return;
  }

  const data = getTroubleshootData(key);
  if (data.length === 0) {
    container.innerHTML = '<p class="empty-note">Lab นี้ยังไม่มี troubleshooting checklist</p>';
    return;
  }

  container.innerHTML = data.map((issue, idx) => {
    if (!issue || typeof issue !== 'object') {
      logIssue('warn', `${key}: troubleshoot[${idx}] ไม่ใช่ object`);
      return '';
    }
    ['title', 'when', 'checks'].forEach(f => {
      if (!issue[f]) logIssue('warn', `${key}: troubleshoot[${idx}] ไม่มี "${f}"`);
    });

    const checks = Array.isArray(issue.checks) ? issue.checks.filter(Boolean) : [];

    return `<div class="ts-issue">
      <div class="ts-header" role="button" tabindex="0"
          onclick="this.parentElement.classList.toggle('open')"
          onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.parentElement.classList.toggle('open');}">
        <span class="ts-title">${escapeHtml(issue.title)}</span>
        <span class="ts-arrow">▼</span>
      </div>
      <div class="ts-body">
        <div class="ts-when">${escapeHtml(issue.when)}</div>
        <div class="ts-checks">
          ${checks.map((c, i) => `<div class="ts-check">
            <div class="ts-check-num">${i + 1}</div>
            <div class="ts-check-content">
              <div class="ts-where">${escapeHtml(c.where)}</div>
              <div class="ts-what">เช็ค: <strong>${escapeHtml(c.check)}</strong></div>
              <div class="ts-expect">✅ ต้องเป็น: ${escapeHtml(c.expect)}</div>
              <div class="ts-ifnot">❌ ถ้าไม่ตรง: ${formatText(c.ifNot)}</div>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>`;
  }).join('');
}

/* =========================================================
   UNIVERSAL DEBUG
   ========================================================= */

function toggleChecklist(header) {
  if (!header) return;
  const issue = header.closest('.ts-issue');
  if (!issue) return;
  const isOpen = issue.classList.toggle('open');
  header.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

function renderDebug(key) {
  const container = document.getElementById('tab-debug');
  if (!container) {
    logIssue('error', 'ไม่พบ #tab-debug ใน index.html');
    return;
  }

  const data = getDebugData();
  if (data.length === 0) {
    container.innerHTML = '<p class="empty-note">โหลด universal DEBUG checklist ไม่สำเร็จ</p>';
    return;
  }

  const phases = data.map((phase, index) => {
    if (!phase || typeof phase !== 'object') {
      logIssue('warn', `debug phase[${index}] ไม่ใช่ object`);
      return '';
    }
    ['phase', 'icon', 'title', 'when', 'checks'].forEach(field => {
      if (!phase[field]) logIssue('warn', `debug phase[${index}] ไม่มี "${field}"`);
    });

    const checks = Array.isArray(phase.checks) ? phase.checks.filter(Boolean) : [];
    const phaseName = String(phase.phase || '').replace(/[^a-z0-9_-]/gi, '');
    const isOpen = index === 0;

    return `<div class="ts-issue debug-phase phase-${phaseName}${isOpen ? ' open' : ''}">
      <button class="ts-header" type="button" onclick="toggleChecklist(this)"
          aria-expanded="${isOpen ? 'true' : 'false'}">
        <span class="ts-title" data-icon="${escapeHtml(phase.icon)}">${escapeHtml(phase.title)}</span>
        <span class="ts-arrow">▼</span>
      </button>
      <div class="ts-body">
        <div class="ts-when">${escapeHtml(phase.when)}</div>
        <div class="ts-checks">
          ${checks.map((check, checkIndex) => `<div class="ts-check">
            <div class="ts-check-num">${checkIndex + 1}</div>
            <div class="ts-check-content">
              <div class="ts-where">${escapeHtml(check.where)}</div>
              <div class="ts-what">เช็ค: <strong>${escapeHtml(check.check)}</strong></div>
              <div class="ts-expect">✅ ต้องเป็น: ${escapeHtml(check.expect)}</div>
              <div class="ts-ifnot">❌ ถ้าไม่ตรง: ${formatText(check.ifNot)}</div>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>`;
  }).join('');

  container.innerHTML = `<div class="debug-intro">
    <h3>DEBUG ครอบจักรวาล — ${escapeHtml(LAB_META[key].title)}</h3>
    <p>ไล่จากด่าน 1 ไป 7 ตามลำดับและตอบจากหลักฐานจริง หากทำครบ อย่างน้อยจะรู้ว่า error อยู่ที่ layer ไหน แม้ยังไม่รู้วิธีแก้ทันที</p>
    <span class="debug-rule">กติกา: เจอ ❌ ข้อแรก ให้หยุดและแก้ตรงนั้นก่อน</span>
  </div>${phases}`;
}

/* =========================================================
   CUSTOM CURSOR
   ========================================================= */

(function initCursor() {
  const cursor = document.getElementById('cursor');
  // Guard: without this the old code threw on every mousemove if #cursor
  // was ever absent from the markup.
  if (!cursor) return;
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  document.addEventListener('mousedown', () => cursor.classList.add('active'));
  document.addEventListener('mouseup', () => cursor.classList.remove('active'));
})();
