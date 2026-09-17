/* localStorage 기반 상태 저장소 */
const Store = (() => {
  const KEY = 'devops_quiz_v1';

  const defaults = () => ({
    settings: { track: 'general', category: 'basics', count: 10, difficulty: 'random' },
    seen: {},        // qid -> { last, correct, wrong }
    notebook: {},    // qid -> { qid, createdAt, stage, dueAt, history: [{at, correct}], mark }
    active: null,    // 진행 중인 세션
    sessions: [],    // 완료된 세션 요약
  });

  let state = load();

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaults();
      return migrate(Object.assign(defaults(), JSON.parse(raw)));
    } catch { return defaults(); }
  }

  /* 트랙 도입 이전에 저장된 데이터에는 settings.track 이 없다.
   * 그때는 DevOps 카테고리만 존재했으므로 devops 로 본다. */
  function migrate(st) {
    st.settings = Object.assign(defaults().settings, st.settings);
    if (!st.settings.track) st.settings.track = 'devops';
    return st;
  }
  function save() { localStorage.setItem(KEY, JSON.stringify(state)); }

  return {
    get: () => state,
    save,
    reset() { state = defaults(); save(); },
    setSetting(k, v) { state.settings[k] = v; save(); },
    markSeen(qid, correct) {
      const s = state.seen[qid] || { correct: 0, wrong: 0 };
      s.last = Date.now();
      correct ? s.correct++ : s.wrong++;
      state.seen[qid] = s;
      save();
    },
  };
})();
