/* 오답노트 & 복습 스케줄
 *
 *  오답  ──▶ 1일 뒤 재출제 (stage 1)
 *             ├─ 정답 ──▶ 7일 뒤 재출제 (stage 2)
 *             └─ 오답 ──▶ 3일 뒤 재출제 (stage 2)
 *  stage 2 재출제 이후에는 자동 출제 없음 (오답노트에서 수동 선택만 가능)
 */
const Scheduler = (() => {
  const DAY = 24 * 60 * 60 * 1000;

  // 로컬 자정 기준 "n일 뒤" 를 계산 (시간대와 무관하게 날짜 단위로 맞춤)
  function daysLater(n) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.getTime() + n * DAY;
  }

  /* 퀴즈에서 문제를 풀었을 때 호출.
   * - 일반 세션에서 오답 → 노트 생성(또는 기존 노트를 stage 0으로 갱신)
   * - 복습 세션(자동 출제)에서는 stage 진행
   * - 수동 테스트(오답노트에서 직접 고른 문제)는 history만 기록, 스케줄은 건드리지 않음
   */
  function record(qid, correct, mark, mode) {
    const st = Store.get();
    const nb = st.notebook;
    const now = Date.now();
    let e = nb[qid];

    if (mode === 'review' && e) {
      e.history.push({ at: now, correct });
      if (mark) e.mark = mark;
      if (e.stage === 1) {
        e.stage = 2;
        e.dueAt = daysLater(correct ? 7 : 3);
      } else {
        // stage 2 완료 → 자동 출제 종료
        e.stage = 3;
        e.dueAt = null;
      }
      Store.save();
      return e;
    }

    if (mode === 'manual' && e) {
      e.history.push({ at: now, correct, manual: true });
      if (mark) e.mark = mark;
      Store.save();
      return e;
    }

    // 일반 세션
    if (!correct) {
      if (!e) {
        e = nb[qid] = { qid, createdAt: now, stage: 1, dueAt: daysLater(1), history: [], mark: mark || null };
      } else {
        // 이미 노트에 있는 문제를 일반 세션에서 다시 틀림 → 1일 사이클 재시작
        e.stage = 1;
        e.dueAt = daysLater(1);
        if (mark) e.mark = mark;
      }
      e.history.push({ at: now, correct: false });
      Store.save();
      return e;
    }

    if (e) { // 노트에 있는 문제를 일반 세션에서 맞춤: 기록만
      e.history.push({ at: now, correct: true });
      if (mark) e.mark = mark;
      Store.save();
    }
    return e || null;
  }

  function dueEntries() {
    const now = Date.now();
    return Object.values(Store.get().notebook)
      .filter(e => e.dueAt && e.dueAt <= now && e.stage < 3)
      .sort((a, b) => a.dueAt - b.dueAt);
  }

  function statusText(e) {
    if (e.stage >= 3) return '자동 복습 완료';
    if (!e.dueAt) return '-';
    const now = Date.now();
    if (e.dueAt <= now) return '오늘 복습';
    return `${Math.ceil((e.dueAt - now) / DAY)}일 뒤 복습`;
  }

  function remove(qid) { delete Store.get().notebook[qid]; Store.save(); }

  return { record, dueEntries, statusText, remove, daysLater };
})();
