/* 문제 은행 접근, 일일 세트 생성, 채점 */
const Quiz = (() => {
  const TRACKS = {
    general: { name: '컴퓨터 상식', icon: '🙂', desc: '누구나 아는 만큼 풀 수 있는 컴퓨터·인터넷·보안 상식' },
    devops:  { name: 'DevOps 실무', icon: '🛠️', desc: '명령어를 직접 입력해 푸는 서버·클라우드 실무 문제' },
  };
  const CATEGORIES = {
    // 컴퓨터 상식 트랙
    basics:    { track: 'general', name: '컴퓨터 기초',      icon: '💻', desc: '하드웨어, 운영체제, 파일, 저장장치' },
    internet:  { track: 'general', name: '인터넷 · 웹',      icon: '🌐', desc: '브라우저, 주소창, 와이파이, 이메일' },
    security:  { track: 'general', name: '보안 · 개인정보',  icon: '🔐', desc: '피싱, 비밀번호, 2단계 인증, 백신' },
    office:    { track: 'general', name: '오피스 · 생산성',  icon: '📄', desc: '단축키, 파일 형식, 클라우드, 백업' },
    ittrend:   { track: 'general', name: 'IT 상식 · 신기술', icon: '🤖', desc: 'AI, 클라우드, 데이터, 스마트폰' },
    // DevOps 실무 트랙
    linux:     { track: 'devops', name: 'OS · Linux',        icon: '🐧', desc: '쉘 명령어, 권한, 프로세스, 파일시스템' },
    container: { track: 'devops', name: '컨테이너',           icon: '🐳', desc: 'Docker, Kubernetes 명령/개념' },
    aws:       { track: 'devops', name: 'Cloud · AWS',        icon: '☁️', desc: 'IAM, EC2, S3, VPC, CLI' },
    network:   { track: 'devops', name: '네트워크',           icon: '🌐', desc: 'TCP/IP, DNS, HTTP, 라우팅, 진단' },
    sql:       { track: 'devops', name: 'SQL',                icon: '🗄️', desc: 'SELECT, JOIN, 인덱스, 트랜잭션' },
  };
  const DIFFS = { easy: 'Easy', normal: 'Normal', hard: 'Hard', extreme: 'Extreme' };
  const RANDOM_WEIGHTS = { easy: 0.40, normal: 0.35, hard: 0.20, extreme: 0.05 };
  const TYPES = { ox: 'O/X', mcq: '객관식', short: '단답형', essay: '서술형', task: '과제형' };
  const catsOf = (track) => Object.keys(CATEGORIES).filter(k => CATEGORIES[k].track === track);

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

  // 정답 명령어 풀이(js/data/parts-*.js)를 문제에 연결.
  // short/mcq: { parts: [[조각, 설명], ...], order }, task: { steps: [{ parts, order }, ...] }
  const PARTS = window.QUIZ_PARTS || {};
  for (const [id, b] of Object.entries(PARTS)) if (byId[id]) byId[id].breakdown = b;

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
    const fill = []; // 부족한 난이도를 인접 난이도에서 보충한 내역
    const ORDER = ['easy', 'normal', 'hard', 'extreme'];
    // 요청 난이도 풀이 부족하면 가까운 난이도부터 채움 (사용된 id 제외)
    const pickWithFallback = (diff, n, used) => {
      const got = pick(pool.filter(q => q.diff === diff && !used.has(q.id)), n);
      got.forEach(q => used.add(q.id));
      let short = n - got.length;
      if (short > 0) {
        const i = ORDER.indexOf(diff);
        const neighbours = [];
        for (let d = 1; d < ORDER.length; d++) {
          if (i - d >= 0) neighbours.push(ORDER[i - d]);
          if (i + d < ORDER.length) neighbours.push(ORDER[i + d]);
        }
        for (const nd of neighbours) {
          if (short <= 0) break;
          const extra = pick(pool.filter(q => q.diff === nd && !used.has(q.id)), short);
          extra.forEach(q => { used.add(q.id); got.push(q); });
          if (extra.length) fill.push({ from: diff, to: nd, n: extra.length });
          short -= extra.length;
        }
      }
      return got;
    };
    if (difficulty === 'random') {
      // 가중치 → 정수 배분 (최대 나머지법)
      const keys = Object.keys(RANDOM_WEIGHTS);
      const raw = keys.map(k => RANDOM_WEIGHTS[k] * count);
      const base = raw.map(Math.floor);
      let rest = count - base.reduce((a, b) => a + b, 0);
      keys.map((k, i) => [raw[i] - base[i], i]).sort((a, b) => b[0] - a[0]).forEach(([, i]) => { if (rest > 0) { base[i]++; rest--; } });

      chosen = [];
      const used = new Set();
      keys.forEach((k, i) => { pickWithFallback(k, base[i], used).forEach(q => chosen.push(q)); });
      chosen = shuffle(chosen, rnd);
    } else {
      chosen = pickWithFallback(difficulty, count, new Set());
    }
    return { qids: chosen.map(q => q.id), fill };
  }

  /* ---------- 채점 ---------- */
  const norm = s => String(s ?? '')
    .trim().toLowerCase()
    .replace(/^\$\s*/, '')       // 프롬프트 기호 제거
    .replace(/\s+/g, ' ')
    .replace(/[;`'"]/g, '');

  const matchesShort = (input, answer, accept) =>
    [answer, ...(accept || [])].map(norm).includes(norm(input));

  /* 서술형: 핵심 키워드 포함 개수로 잠정 판정.
   * 최종 이해도는 사용자가 O/△/X 로 직접 매긴다. */
  function gradeEssay(q, input) {
    const text = String(input ?? '').toLowerCase().replace(/\s+/g, '');
    const kws = q.keywords || [];
    const hit = kws.filter(k => {
      const variants = Array.isArray(k) ? k : [k];
      return variants.some(v => text.includes(String(v).toLowerCase().replace(/\s+/g, '')));
    });
    const label = k => (Array.isArray(k) ? k[0] : k);
    const need = q.minKeywords ?? Math.ceil(kws.length * 0.6);
    return {
      hit: hit.map(label),
      miss: kws.filter(k => !hit.includes(k)).map(label),
      need,
      correct: hit.length >= need,
    };
  }

  /* 과제형: 단계별로 채점하고 부분 점수를 돌려준다. 전 단계 정답일 때만 정답 처리. */
  function gradeTask(q, inputs) {
    const per = q.steps.map((st, i) => matchesShort(inputs?.[i], st.answer, st.accept));
    const n = per.filter(Boolean).length;
    return { per, n, total: q.steps.length, correct: n === q.steps.length };
  }

  function grade(q, input) {
    if (q.type === 'ox') return input === q.answer;
    if (q.type === 'mcq') return input === q.answer;
    if (q.type === 'essay') return gradeEssay(q, input).correct;
    if (q.type === 'task') return gradeTask(q, input).correct;
    // short
    return matchesShort(input, q.answer, q.accept);
  }

  function answerText(q) {
    if (q.type === 'ox') return q.answer ? 'O (맞다)' : 'X (틀리다)';
    if (q.type === 'mcq') return `${'①②③④⑤'[q.answer]} ${q.options[q.answer]}`;
    if (q.type === 'task') return q.steps.map(st => st.answer).join(' → ');
    if (q.type === 'essay') return (q.keywords || []).map(k => (Array.isArray(k) ? k[0] : k)).join(' · ');
    return q.answer;
  }

  const countBy = (cat) => {
    const r = { total: 0, easy: 0, normal: 0, hard: 0, extreme: 0 };
    all.filter(q => q.cat === cat).forEach(q => { r.total++; r[q.diff]++; });
    return r;
  };

  return { TRACKS, CATEGORIES, DIFFS, TYPES, RANDOM_WEIGHTS, all, byId, catsOf,
           buildDaily, grade, gradeEssay, gradeTask, answerText, todayKey, countBy };
})();
