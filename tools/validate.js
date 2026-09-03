#!/usr/bin/env node
'use strict';

/**
 * Data validator for Lab Debug Assistant.
 *
 *   node tools/validate.js
 *
 * The web app is a set of plain <script> includes with no build step, so a
 * typo in a data file only shows up as a blank page at runtime. This script
 * loads the same files in a sandbox and reports structural problems.
 *
 * Exit code 0 = no errors, 1 = at least one error.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const WEB_DIR = path.join(__dirname, '..', 'web');
const LAB_KEYS = ['lab1', 'lab2', 'lab3', 'lab4', 'lab5', 'lab6', 'lab7'];
const DATA_FILES = LAB_KEYS.map(k => `${k}-data.js`).concat(['specs.js', 'troubleshoot.js', 'debug.js']);

const errors = [];
const warnings = [];
const addError = msg => errors.push(msg);
const addWarning = msg => warnings.push(msg);

/* ---------- load every data file into one sandbox ---------- */

const sandbox = {};
vm.createContext(sandbox);

for (const file of DATA_FILES) {
  const full = path.join(WEB_DIR, file);
  if (!fs.existsSync(full)) {
    addError(`${file}: ไม่พบไฟล์`);
    continue;
  }
  try {
    vm.runInContext(fs.readFileSync(full, 'utf8'), sandbox, { filename: file });
  } catch (err) {
    addError(`${file}: โหลดไม่สำเร็จ — ${err.message}`);
  }
}

// Data files use top-level `const`, which is not exposed on the sandbox
// object, so read the bindings by evaluating their names.
function readGlobal(name) {
  try {
    return vm.runInContext(`typeof ${name} !== 'undefined' ? ${name} : undefined`, sandbox);
  } catch {
    return undefined;
  }
}

/* ---------- check that index.html includes every data file ---------- */

const indexPath = path.join(WEB_DIR, 'index.html');
if (fs.existsSync(indexPath)) {
  const indexHtml = fs.readFileSync(indexPath, 'utf8');
  for (const file of DATA_FILES.concat(['app.js'])) {
    if (!indexHtml.includes(file)) {
      addError(`index.html: ไม่ได้ include <script src="${file}">`);
    }
  }
  const debugScriptIndex = indexHtml.indexOf('src="debug.js"');
  const appScriptIndex = indexHtml.indexOf('src="app.js"');
  if (debugScriptIndex !== -1 && appScriptIndex !== -1 && debugScriptIndex > appScriptIndex) {
    addError('index.html: ต้องโหลด debug.js ก่อน app.js');
  }
  // Elements app.js looks up by id.
  for (const id of ['labGrid', 'labpage', 'homepage', 'labTitle', 'labDesc',
                    'tab-spec', 'tab-steps', 'tab-troubleshoot', 'tab-debug',
                    'searchInput', 'jumpInput', 'searchStatus', 'errorBanner']) {
    if (!indexHtml.includes(`id="${id}"`)) {
      addError(`index.html: ไม่มี element id="${id}" ที่ app.js เรียกใช้`);
    }
  }
} else {
  addError('web/index.html: ไม่พบไฟล์');
}

/* ---------- validate lab step data ---------- */

const REF_PATTERN = /ข้อ\s*(\d+)/g;

function collectRefs(text) {
  const out = [];
  if (typeof text !== 'string') return out;
  REF_PATTERN.lastIndex = 0;
  let m;
  while ((m = REF_PATTERN.exec(text)) !== null) out.push(Number(m[1]));
  return out;
}

const specsHTML = readGlobal('specsHTML');
const troubleshootData = readGlobal('troubleshootData');
const universalDebugData = readGlobal('universalDebugData');

if (!specsHTML || typeof specsHTML !== 'object') addError('specs.js: ไม่มี specsHTML object');
if (!troubleshootData || typeof troubleshootData !== 'object') addError('troubleshoot.js: ไม่มี troubleshootData object');
if (!Array.isArray(universalDebugData)) addError('debug.js: ไม่มี universalDebugData array');

let totalSteps = 0;
let totalErrors = 0;
const summary = [];

for (const key of LAB_KEYS) {
  const data = readGlobal(`${key}Data`);

  if (!data || typeof data !== 'object') {
    addError(`${key}: ไม่พบตัวแปร ${key}Data`);
    continue;
  }
  if (!Array.isArray(data.steps)) {
    addError(`${key}: steps ไม่ใช่ array (ได้ ${typeof data.steps})`);
    continue;
  }
  if (!data.title) addWarning(`${key}: ไม่มี title`);

  const nums = new Set();
  let labErrorCount = 0;

  data.steps.forEach((step, i) => {
    const label = `${key} step ${step && step.num !== undefined ? step.num : `#${i}`}`;

    if (!step || typeof step !== 'object') {
      addError(`${label}: ไม่ใช่ object`);
      return;
    }
    if (typeof step.num !== 'number' || !Number.isFinite(step.num)) {
      addError(`${label}: num ต้องเป็นตัวเลข (ได้ ${JSON.stringify(step.num)})`);
    } else if (nums.has(step.num)) {
      addError(`${label}: num ซ้ำ`);
    } else {
      nums.add(step.num);
    }
    if (!step.task) addError(`${label}: ไม่มี task`);
    if (!step.desc) addError(`${label}: ไม่มี desc`);

    if (step.errors === undefined) {
      addError(`${label}: ไม่มี errors array`);
    } else if (!Array.isArray(step.errors)) {
      addError(`${label}: errors ต้องเป็น array (ได้ ${typeof step.errors})`);
    } else {
      labErrorCount += step.errors.length;
      step.errors.forEach((err, j) => {
        if (!err || typeof err !== 'object') {
          addError(`${label} error[${j}]: ไม่ใช่ object`);
          return;
        }
        for (const field of ['problem', 'cause', 'fix']) {
          if (!err[field]) addError(`${label} error[${j}]: ไม่มี "${field}"`);
          else if (typeof err[field] !== 'string') addError(`${label} error[${j}]: "${field}" ต้องเป็น string`);
        }
      });
    }
  });

  // Cross-references must point at a step that exists.
  data.steps.forEach(step => {
    if (!step || !Array.isArray(step.errors)) return;
    step.errors.forEach(err => {
      if (!err) return;
      const seen = new Set();
      collectRefs(`${err.cause || ''} ${err.fix || ''}`).forEach(target => {
        if (!nums.has(target) && !seen.has(target)) {
          seen.add(target);
          addError(`${key} step ${step.num}: อ้างถึง "ข้อ ${target}" ที่ไม่มีใน lab นี้`);
        }
      });
    });
  });

  // Gaps suggest a step was deleted without renumbering.
  if (nums.size > 0) {
    const max = Math.max(...nums);
    const gaps = [];
    for (let n = 1; n <= max; n++) if (!nums.has(n)) gaps.push(n);
    if (gaps.length) addWarning(`${key}: เลขข้อขาดหาย: ${gaps.slice(0, 20).join(', ')}${gaps.length > 20 ? ` …(+${gaps.length - 20})` : ''}`);
  }

  if (specsHTML && typeof specsHTML[key] !== 'string') addWarning(`${key}: ไม่มี spec HTML ใน specs.js`);
  if (troubleshootData) {
    const ts = troubleshootData[key];
    // An empty array is still an array, so check length too — otherwise a lab
    // with `labN: []` silently reports as having a checklist when it has none.
    if (!Array.isArray(ts)) addWarning(`${key}: ไม่มี troubleshooting checklist`);
    else if (ts.length === 0) addWarning(`${key}: troubleshooting checklist ว่างเปล่า`);
  }

  totalSteps += data.steps.length;
  totalErrors += labErrorCount;
  summary.push({ key, steps: data.steps.length, errors: labErrorCount });
}

/* ---------- validate troubleshooting checklists ---------- */

for (const [key, list] of Object.entries(troubleshootData || {})) {
  if (!Array.isArray(list)) {
    addError(`troubleshootData.${key}: ต้องเป็น array`);
    continue;
  }
  list.forEach((issue, i) => {
    const label = `troubleshootData.${key}[${i}]`;
    if (!issue || typeof issue !== 'object') {
      addError(`${label}: ไม่ใช่ object`);
      return;
    }
    for (const field of ['title', 'when']) {
      if (!issue[field]) addError(`${label}: ไม่มี "${field}"`);
    }
    if (!Array.isArray(issue.checks)) {
      addError(`${label}: checks ต้องเป็น array`);
      return;
    }
    if (issue.checks.length === 0) addWarning(`${label}: checks ว่าง`);
    issue.checks.forEach((c, j) => {
      if (!c || typeof c !== 'object') {
        addError(`${label}.checks[${j}]: ไม่ใช่ object`);
        return;
      }
      for (const field of ['where', 'check', 'expect', 'ifNot']) {
        if (!c[field]) addError(`${label}.checks[${j}]: ไม่มี "${field}"`);
      }
    });
  });
}

/* ---------- validate universal DEBUG checklist ---------- */

if (Array.isArray(universalDebugData)) {
  if (universalDebugData.length === 0) addError('universalDebugData: ต้องมีอย่างน้อย 1 phase');
  universalDebugData.forEach((phase, i) => {
    const label = `universalDebugData[${i}]`;
    if (!phase || typeof phase !== 'object') {
      addError(`${label}: ไม่ใช่ object`);
      return;
    }
    for (const field of ['phase', 'icon', 'title', 'when']) {
      if (!phase[field]) addError(`${label}: ไม่มี "${field}"`);
    }
    if (!Array.isArray(phase.checks)) {
      addError(`${label}: checks ต้องเป็น array`);
      return;
    }
    if (phase.checks.length === 0) addError(`${label}: checks ว่าง`);
    phase.checks.forEach((check, j) => {
      if (!check || typeof check !== 'object') {
        addError(`${label}.checks[${j}]: ไม่ใช่ object`);
        return;
      }
      for (const field of ['where', 'check', 'expect', 'ifNot']) {
        if (!check[field]) addError(`${label}.checks[${j}]: ไม่มี "${field}"`);
      }
    });
  });
}

/* ---------- report ---------- */

console.log('Lab Debug Assistant — data validation\n');

for (const s of summary) {
  console.log(`  ${s.key.padEnd(5)} ${String(s.steps).padStart(4)} steps  ${String(s.errors).padStart(4)} errors`);
}
console.log(`  ${'total'.padEnd(5)} ${String(totalSteps).padStart(4)} steps  ${String(totalErrors).padStart(4)} errors\n`);

if (warnings.length) {
  console.log(`Warnings (${warnings.length}):`);
  warnings.forEach(w => console.log(`  ! ${w}`));
  console.log('');
}

if (errors.length) {
  console.log(`Errors (${errors.length}):`);
  errors.forEach(e => console.log(`  x ${e}`));
  console.log('\nFAILED');
  process.exit(1);
}

console.log(warnings.length ? 'PASSED (มี warnings)' : 'PASSED');
process.exit(0);
