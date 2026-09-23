/* 문제은행 유효성 검사
 *   node tools/validate.js
 * index.html 에 등록된 순서대로 js/data/*.js 를 읽어 형식을 확인하고 분포를 출력한다.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
global.window = {};

// index.html 에서 데이터 스크립트 목록을 그대로 뽑아 온다 (로드 순서가 중요)
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const files = [...html.matchAll(/<script src="(js\/data\/[^"]+)"><\/script>/g)].map(m => m[1]);
if (!files.length) { console.error('index.html 에서 데이터 스크립트를 찾지 못했습니다.'); process.exit(1); }

for (const f of files) {
  const p = path.join(root, f);
  if (!fs.existsSync(p)) { console.error(`없는 파일: ${f}`); process.exit(1); }
  eval(fs.readFileSync(p, 'utf8'));
}

const bank = global.window.QUIZ_BANK || {};
const DIFFS = ['easy', 'normal', 'hard', 'extreme'];
const problems = [];
let grand = 0;

for (const [cat, list] of Object.entries(bank)) {
  const d = {}, t = {};
  list.forEach((q, i) => {
    const at = `${cat}[${i}]`;
    d[q.diff] = (d[q.diff] || 0) + 1;
    t[q.type] = (t[q.type] || 0) + 1;

    if (!q.q) problems.push(`${at} q 없음`);
    if (!q.explain) problems.push(`${at} explain 없음`);
    if (!q.example) problems.push(`${at} example 없음`);
    if (!DIFFS.includes(q.diff)) problems.push(`${at} diff 이상: ${q.diff}`);

    switch (q.type) {
      case 'ox':
        if (typeof q.answer !== 'boolean') problems.push(`${at} ox answer 는 boolean 이어야 함`);
        break;
      case 'mcq':
        if (!Array.isArray(q.options)) problems.push(`${at} options 없음`);
        else if (typeof q.answer !== 'number' || q.answer < 0 || q.answer >= q.options.length)
          problems.push(`${at} answer 가 options 범위를 벗어남`);
        break;
      case 'short':
        if (typeof q.answer !== 'string' || !q.answer) problems.push(`${at} short answer 없음`);
        break;
      case 'essay':
        if (!Array.isArray(q.keywords) || !q.keywords.length) problems.push(`${at} keywords 없음`);
        if (!q.model) problems.push(`${at} model(모범답안) 없음`);
        if (q.minKeywords != null && q.minKeywords > (q.keywords || []).length)
          problems.push(`${at} minKeywords 가 keywords 수보다 큼`);
        break;
      case 'task':
        if (!Array.isArray(q.steps) || !q.steps.length) problems.push(`${at} steps 없음`);
        else q.steps.forEach((s, j) => {
          if (!s.hint) problems.push(`${at}.step${j} hint 없음`);
          if (!s.answer) problems.push(`${at}.step${j} answer 없음`);
        });
        break;
      default:
        problems.push(`${at} 알 수 없는 type: ${q.type}`);
    }
  });
  grand += list.length;
  console.log(cat.padEnd(10), String(list.length).padStart(4), '| 난이도', JSON.stringify(d), '| 유형', JSON.stringify(t));
}

// ---- 정답 명령어 풀이(parts) 검증: 조각이 정답에 순서대로 있고, 사이에 옵션·단어가 빠지지 않았는지 ----
const PARTS = global.window.QUIZ_PARTS || {};
const byIdV = {};
for (const [cat, list] of Object.entries(bank)) list.forEach((q, i) => { byIdV[`${cat}-${String(i + 1).padStart(3, '0')}`] = q; });
const gapOk = s => /^[\s"'(),;]*$/.test(s);          // 조각 사이에는 공백·문장 부호만 남아도 됨
const cover = (at, target, parts) => {
  if (!parts || !parts.length) return;
  let pos = 0;
  for (const [t, d] of parts) {
    const i = target.indexOf(t, pos);
    if (!t || !d || i < 0) return problems.push(`${at} 풀이 조각 "${t}" 가 정답에 순서대로 없음`);
    if (!gapOk(target.slice(pos, i))) return problems.push(`${at} 정답의 "${target.slice(pos, i).trim()}" 풀이 누락`);
    pos = i + t.length;
  }
  if (!gapOk(target.slice(pos))) problems.push(`${at} 정답 끝 "${target.slice(pos).trim()}" 풀이 누락`);
};
let partsN = 0;
for (const [id, b] of Object.entries(PARTS)) {
  const q = byIdV[id];
  if (!q) { problems.push(`풀이 ${id}: 해당 문제 없음`); continue; }
  partsN++;
  if (q.type === 'task') {
    if (!b.steps || b.steps.length !== q.steps.length) { problems.push(`풀이 ${id}: 단계 수 불일치`); continue; }
    b.steps.forEach((s, j) => cover(`풀이 ${id}#${j}`, q.steps[j].answer, s.parts));
  } else if (q.type === 'short') cover(`풀이 ${id}`, q.answer, b.parts);
  else if (q.type === 'mcq') cover(`풀이 ${id}`, q.options[q.answer], b.parts);
  else problems.push(`풀이 ${id}: ${q.type} 유형은 풀이 대상 아님`);
}
console.log('명령어 풀이', partsN, '문제');
console.log('합계', grand, '문제');
if (problems.length) {
  console.error(`\n문제 ${problems.length}건:\n` + problems.join('\n'));
  process.exit(1);
}
console.log('검증 통과');
