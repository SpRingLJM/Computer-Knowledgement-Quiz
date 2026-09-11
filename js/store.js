/* localStorage 기반 상태 저장소 */
const Store = (() => {
  const KEY = 'devops_quiz_v1';

  const defaults = () => ({
    settings: { category: 'linux', count: 10, difficulty: 'random' },
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
      return Object.assign(defaults(), JSON.parse(raw));
    } catch { return defaults(); }
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
