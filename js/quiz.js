/* 문제 은행 접근, 일일 세트 생성, 채점 */
const Quiz = (() => {
  const CATEGORIES = {
    linux:     { name: 'OS · Linux',        icon: '🐧', desc: '쉘 명령어, 권한, 프로세스, 파일시스템' },
    container: { name: '컨테이너',           icon: '🐳', desc: 'Docker, Kubernetes 명령/개념' },
    aws:       { name: 'Cloud · AWS',        icon: '☁️', desc: 'IAM, EC2, S3, VPC, CLI' },
    network:   { name: '네트워크',           icon: '🌐', desc: 'TCP/IP, DNS, HTTP, 라우팅, 진단' },
    sql:       { name: 'SQL',                icon: '🗄️', desc: 'SELECT, JOIN, 인덱스, 트랜잭션' },
  };
  const DIFFS = { easy: 'Easy', normal: 'Normal', hard: 'Hard', extreme: 'Extreme' };
  const RANDOM_WEIGHTS = { easy: 0.40, normal: 0.35, hard: 0.20, extreme: 0.05 };
  const TYPES = { ox: 'O/X', mcq: '객관식', short: '단답형' };

  // 각 data 파일이 window.QUIZ_BANK[cat] 에 등록
  const bank = window.QUIZ_BANK || {};
  const all = [];
  for (const cat of Object.keys(bank)) {
    bank[cat].forEach((q, i) => {
      q.cat = cat;
      q.id = q.id || `${cat}-${String(i + 1).padStart(3, '0')}`;
      all.push(q);
    });
  }
  const byId = Object.fromEntries(all.map(q => [q.id, q]));

  /* ---------- 시드 난수 (같은 날 + 같은 설정 = 같은 세트) ---------- */
  function hashStr(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function mulberry32(a) {
    return () => {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function shuffle(arr, rnd) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  const todayKey = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  /* ---------- 일일 세트 생성 ----------
   * 아직 안 푼 문제를 우선 배치하고, 부족하면 푼 문제 중에서 채움.
   */
  function buildDaily(category, count, difficulty) {
    const seed = hashStr(`${todayKey()}|${category}|${count}|${difficulty}`);
    const rnd = mulberry32(seed);
    const seen = Store.get().seen;
    const pool = all.filter(q => q.cat === category);

    const pick = (list, n) => {
      const unseen = shuffle(list.filter(q => !seen[q.id]), rnd);
      const done = shuffle(list.filter(q => seen[q.id]), rnd);
      return unseen.concat(done).slice(0, n);
    };

    let chosen;
    if (difficulty === 'random') {
      // 가중치 → 정수 배분 (최대 나머지법)
      const keys = Object.keys(RANDOM_WEIGHTS);
      const raw = keys.map(k => RANDOM_WEIGHTS[k] * count);
      const base = raw.map(Math.floor);
      let rest = count - base.reduce((a, b) => a + b, 0);
      keys.map((k, i) => [raw[i] - base[i], i]).sort((a, b) => b[0] - a[0]).forEach(([, i]) => { if (rest > 0) { base[i]++; rest--; } });

      chosen = [];
      const used = new Set();
      keys.forEach((k, i) => {
        pick(pool.filter(q => q.diff === k), base[i]).forEach(q => { chosen.push(q); used.add(q.id); });
      });
      if (chosen.length < count) { // 어떤 난이도가 부족하면 나머지에서 보충
        pick(pool.filter(q => !used.has(q.id)), count - chosen.length).forEach(q => chosen.push(q));
      }
      chosen = shuffle(chosen, rnd);
    } else {
      chosen = pick(pool.filter(q => q.diff === difficulty), count);
    }
    return chosen.map(q => q.id);
  }

  /* ---------- 채점 ---------- */
  const norm = s => String(s ?? '')
    .trim().toLowerCase()
    .replace(/^\$\s*/, '')       // 프롬프트 기호 제거
    .replace(/\s+/g, ' ')
    .replace(/[;`'"]/g, '');

  function grade(q, input) {
    if (q.type === 'ox') return input === q.answer;
    if (q.type === 'mcq') return input === q.answer;
    // short
    const cands = [q.answer, ...(q.accept || [])].map(norm);
    return cands.includes(norm(input));
  }

  function answerText(q) {
    if (q.type === 'ox') return q.answer ? 'O (맞다)' : 'X (틀리다)';
    if (q.type === 'mcq') return `${'①②③④⑤'[q.answer]} ${q.options[q.answer]}`;
    return q.answer;
  }

  const countBy = (cat) => {
    const r = { total: 0, easy: 0, normal: 0, hard: 0, extreme: 0 };
    all.filter(q => q.cat === cat).forEach(q => { r.total++; r[q.diff]++; });
    return r;
  };

  return { CATEGORIES, DIFFS, TYPES, RANDOM_WEIGHTS, all, byId, buildDaily, grade, answerText, todayKey, countBy };
})();
