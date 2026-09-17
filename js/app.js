/* 라우팅 + 화면 렌더링 */
(() => {
  const $app = document.getElementById('app');
  const h = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  // 간단한 인라인 마크업: `code` → <code>, 줄바꿈 유지
  const fmt = (s) => h(s).replace(/`([^`]+)`/g, '<code>$1</code>');
  const chip = (cls, txt) => `<span class="chip ${cls}">${h(txt)}</span>`;
  const diffChip = (d) => chip(d, Quiz.DIFFS[d]);
  const MARK_LABEL = { O: '완전 이해', T: '애매함', X: '모름/찍음' };

  /* ---------------- 라우터 ---------------- */
  const routes = {
    '/': renderHome,
    '/quiz': renderQuiz,
    '/summary': renderSummary,
    '/notebook': renderNotebook,
    '/stats': renderStats,
  };
  function navigate(path) { location.hash = '#' + path; }
  function route() {
    const path = (location.hash.replace(/^#/, '') || '/').split('?')[0];
    const view = routes[path] || renderHome;
    document.querySelectorAll('[data-nav]').forEach(a => {
      const key = a.dataset.nav;
      a.classList.toggle('active', (key === 'home' && path === '/') || path === '/' + key);
    });
    updateBadge();
    $app.innerHTML = '';
    view();
    window.scrollTo(0, 0);
  }
  function updateBadge() {
    const n = Scheduler.dueEntries().length;
    const b = document.getElementById('nb-count');
    b.hidden = n === 0;
    b.textContent = n;
  }
  window.addEventListener('hashchange', route);

  /* ---------------- 우측 상단 시계 ---------------- */
  (function clock() {
    const $d = document.getElementById('clock-date'), $t = document.getElementById('clock-time');
    const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
    const p2 = n => String(n).padStart(2, '0');
    const tick = () => {
      const d = new Date();
      $d.textContent = `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())} (${DAYS[d.getDay()]})`;
      $t.textContent = `${p2(d.getHours())}:${p2(d.getMinutes())}:${p2(d.getSeconds())}`;
    };
    tick();
    setInterval(tick, 1000);
  })();

  /* ---------------- 홈 ---------------- */
  function renderHome() {
    const st = Store.get();
    const s = st.settings;
    const due = Scheduler.dueEntries();
    const active = st.active;

    const cats = Quiz.catsOf(s.track);
    const catCards = cats.map(k => {
      const c = Quiz.CATEGORIES[k];
      const n = Quiz.countBy(k);
      return `<button class="cat ${s.category === k ? 'on' : ''}" data-cat="${k}">
        <div class="ic">${c.icon}</div><div class="nm">${h(c.name)}</div>
        <div class="ds">${h(c.desc)}</div><div class="ds">문제 ${n.total}개</div></button>`;
    }).join('');

    const trackCards = Object.entries(Quiz.TRACKS).map(([k, t]) => {
      const ks = Quiz.catsOf(k);
      const n = ks.reduce((a, c) => a + Quiz.countBy(c).total, 0);
      return `<button class="track ${s.track === k ? 'on' : ''}" data-track="${k}">
        <div class="ic">${t.icon}</div><div class="nm">${h(t.name)}</div>
        <div class="ds">${h(t.desc)}</div>
        <div class="n">${ks.length}개 분야 · 문제 ${n}개</div></button>`;
    }).join('');

    const firstVisit = !st.sessions.length && !Object.keys(st.seen).length;
    const hero = firstVisit ? `<div class="hero">
      <h1>컴퓨터 상식 퀴즈</h1>
      <p>매일 새로 뽑히는 문제로 컴퓨터·인터넷·보안 상식부터 서버 실무까지 점검합니다.</p>
      <ul>
        <li><b>가입이 필요 없습니다.</b> 아래에서 분야를 고르고 바로 시작하세요.</li>
        <li><b>틀린 문제는 자동으로 오답노트에 쌓입니다.</b> 1일 뒤, 그리고 3일 또는 7일 뒤에 다시 출제됩니다.</li>
        <li><b>문제 유형은 다섯 가지</b> — O/X · 객관식 · 단답형 · 서술형 · 과제형(명령어를 순서대로 입력).</li>
        <li>기록은 서버로 전송되지 않고 <b>이 브라우저에만</b> 저장됩니다.</li>
      </ul>
    </div>` : '';

    $app.innerHTML = `
      ${hero}
      <h1>오늘의 퀴즈 <span class="hint mono">${Quiz.todayKey()}</span></h1>
      <p class="sub">매일 새로운 세트가 생성됩니다. 분야와 난이도를 고른 뒤 시작하세요.</p>

      <span class="label">트랙</span>
      <div class="tracks">${trackCards}</div>

      ${active ? `<div class="card banner" style="border-left-color: var(--accent)">
        <div class="row between">
          <div><b>진행 중인 세션이 있습니다.</b> <span class="hint">${h(sessionTitle(active))} · ${active.idx}/${active.qids.length} 완료</span></div>
          <div class="row"><button class="btn primary" id="resume">이어서 풀기</button><button class="btn" id="discard">버리기</button></div>
        </div></div>` : ''}

      ${due.length ? `<div class="card banner">
        <div class="row between">
          <div><b>📌 오늘 복습할 오답 ${due.length}문제</b><div class="hint">오답노트 스케줄(1일 → 7일/3일)에 따라 출제됩니다.</div></div>
          <button class="btn primary" id="start-review">복습 시작</button>
        </div></div>` : ''}

      <div class="card">
        <span class="label">카테고리</span>
        <div class="cats">${catCards}</div>

        <div class="row" style="margin-top:20px; gap:28px; align-items:flex-start">
          <div>
            <span class="label">문제 수</span>
            <div class="seg" id="seg-count">
              ${[10, 20, 30].map(n => `<button class="${s.count === n ? 'on' : ''}" data-count="${n}">${n}</button>`).join('')}
            </div>
          </div>
          <div>
            <span class="label">난이도</span>
            <div class="seg" id="seg-diff">
              <button class="${s.difficulty === 'random' ? 'on' : ''}" data-diff="random">Random</button>
              ${Object.entries(Quiz.DIFFS).map(([k, v]) => `<button class="${s.difficulty === k ? 'on' : ''}" data-diff="${k}">${v}</button>`).join('')}
            </div>
            <div class="hint" style="margin-top:6px">Random = Easy 40% · Normal 35% · Hard 20% · Extreme 5%</div>
          </div>
        </div>

        <div class="actions" style="justify-content:space-between; align-items:center">
          <span class="hint" id="avail"></span>
          <button class="btn primary lg" id="start">오늘의 퀴즈 시작 →</button>
        </div>
      </div>
    `;

    const refreshAvail = () => {
      const n = Quiz.countBy(s.category);
      const el = document.getElementById('avail');
      const { fill } = Quiz.buildDaily(s.category, s.count, s.difficulty);
      const base = s.difficulty === 'random'
        ? `${Quiz.CATEGORIES[s.category].name} · 전체 ${n.total}문제 (E${n.easy}/N${n.normal}/H${n.hard}/X${n.extreme})`
        : `${Quiz.CATEGORIES[s.category].name} · ${Quiz.DIFFS[s.difficulty]} ${n[s.difficulty]}문제 보유`;
      el.innerHTML = h(base) + (fill.length ? ` <span style="color:var(--warn)">· ${fill.map(f => `${Quiz.DIFFS[f.from]} 부족분 ${f.n}개는 ${Quiz.DIFFS[f.to]} 에서 보충`).join(', ')}</span>` : '');
    };
    refreshAvail();

    $app.querySelectorAll('.track').forEach(b => b.onclick = () => {
      if (b.dataset.track === s.track) return;
      Store.setSetting('track', b.dataset.track);
      const ks = Quiz.catsOf(b.dataset.track);
      if (!ks.includes(s.category)) Store.setSetting('category', ks[0]);
      route();
    });
    $app.querySelectorAll('.cat').forEach(b => b.onclick = () => {
      Store.setSetting('category', b.dataset.cat);
      $app.querySelectorAll('.cat').forEach(x => x.classList.toggle('on', x === b));
      refreshAvail();
    });
    $app.querySelectorAll('#seg-count button').forEach(b => b.onclick = () => {
      Store.setSetting('count', Number(b.dataset.count));
      $app.querySelectorAll('#seg-count button').forEach(x => x.classList.toggle('on', x === b));
      refreshAvail();
    });
    $app.querySelectorAll('#seg-diff button').forEach(b => b.onclick = () => {
      Store.setSetting('difficulty', b.dataset.diff);
      $app.querySelectorAll('#seg-diff button').forEach(x => x.classList.toggle('on', x === b));
      refreshAvail();
    });

    document.getElementById('start').onclick = () => {
      if (active && !confirm('진행 중인 세션을 버리고 새로 시작할까요?')) return;
      const { qids, fill } = Quiz.buildDaily(s.category, s.count, s.difficulty);
      if (!qids.length) return alert('해당 조건의 문제가 없습니다.');
      startSession({ mode: 'daily', cat: s.category, diff: s.difficulty, qids, fill });
    };
    const r = document.getElementById('start-review');
    if (r) r.onclick = () => {
      if (active && !confirm('진행 중인 세션을 버리고 복습을 시작할까요?')) return;
      startSession({ mode: 'review', qids: due.map(e => e.qid) });
    };
    const rs = document.getElementById('resume'); if (rs) rs.onclick = () => navigate('/quiz');
    const dc = document.getElementById('discard'); if (dc) dc.onclick = () => { Store.get().active = null; Store.save(); route(); };
  }

  function sessionTitle(sess) {
    if (sess.mode === 'review') return '오답 복습';
    if (sess.mode === 'manual') return '오답노트 선택 테스트';
    return `${Quiz.CATEGORIES[sess.cat].name} · ${sess.diff === 'random' ? 'Random' : Quiz.DIFFS[sess.diff]}`;
  }

  function startSession(opts) {
    Store.get().active = Object.assign({ idx: 0, results: [], startedAt: Date.now() }, opts);
    Store.save();
    navigate('/quiz');
  }

  /* ---------------- 퀴즈 ---------------- */
  function renderQuiz() {
    const st = Store.get();
    const sess = st.active;
    if (!sess) return navigate('/');
    if (sess.idx >= sess.qids.length) return finishSession();

    const q = Quiz.byId[sess.qids[sess.idx]];
    if (!q) { sess.idx++; Store.save(); return renderQuiz(); }

    let answered = false, input = null, mark = null;

    const body = () => {
      if (q.type === 'ox') return `<div class="ox"><button class="opt" data-v="true">O</button><button class="opt" data-v="false">X</button></div>`;
      if (q.type === 'mcq') return `<div class="opts">${q.options.map((o, i) => `<button class="opt" data-v="${i}"><span class="k">${'①②③④⑤'[i]}</span>${fmt(o)}</button>`).join('')}</div>`;
      if (q.type === 'essay') {
        const need = q.minKeywords ?? Math.ceil((q.keywords || []).length * 0.6);
        return `<textarea class="ans" id="essay" placeholder="${q.placeholder ? h(q.placeholder) : '아는 만큼 문장으로 설명해 보세요.'}" spellcheck="false"></textarea>
                <div class="hint" style="margin-top:6px">핵심 키워드 ${need}개 이상이 들어가면 정답으로 처리됩니다. 제출 후 모범답안과 비교해 보세요.</div>`;
      }
      if (q.type === 'task') {
        return `<div class="task">
          ${q.scene ? `<div class="scene">${fmt(q.scene)}</div>` : ''}
          ${q.steps.map((stp, i) => `<div class="task-step" data-i="${i}">
            <div class="cmt">${fmt(stp.hint)}</div>
            <div class="line">
              <span class="ps mono">$</span>
              <input class="mono" data-i="${i}" placeholder="명령어를 입력하세요" autocomplete="off" spellcheck="false" />
              <span class="verdict-i"></span>
            </div>
          </div>`).join('')}
        </div>
        <div class="hint" style="margin-top:8px">주석이 각 단계의 지시문입니다. 위에서부터 차례대로 입력한 뒤 정답을 확인하세요. (Enter 로 다음 칸 이동)</div>`;
      }
      return `<input class="ans mono" id="short" placeholder="${q.placeholder ? h(q.placeholder) : '답을 입력하고 Enter'}" autocomplete="off" spellcheck="false" />
              <div class="hint" style="margin-top:6px">대소문자·앞뒤 공백·앞의 $ 는 무시됩니다.</div>`;
    };
    const typed = t => t === 'short' || t === 'essay' || t === 'task';

    const fillNote = sess.fill?.length
      ? `<div class="notice">⚠ ${sess.fill.map(f => `${Quiz.DIFFS[f.from]} 문제가 부족해 ${Quiz.DIFFS[f.to]} 에서 ${f.n}개 보충`).join(' · ')} — 총 ${sess.qids.length}문제</div>`
      : '';
    $app.innerHTML = `
      ${fillNote}
      <div class="hint" style="margin-bottom:6px">${h(sessionTitle(sess))}</div>
      <div class="progress"><div style="width:${(sess.idx / sess.qids.length) * 100}%"></div></div>
      <div class="card">
        <div class="qhead">
          <div class="row">
            <b>Q${sess.idx + 1} <span class="hint">/ ${sess.qids.length}</span></b>
            ${chip('', Quiz.CATEGORIES[q.cat].name)} ${diffChip(q.diff)} ${chip('type', Quiz.TYPES[q.type])}
          </div>
          <div>
            <div class="marks" id="marks" title="정답 확인 후 이해도를 표시하세요">
              <button data-mark="O" disabled>O</button><button data-mark="T" disabled>△</button><button data-mark="X" disabled>X</button>
            </div>
            <div class="marks-lbl">이해 · 애매 · 모름</div>
          </div>
        </div>
        <div class="qtext">${fmt(q.q)}</div>
        ${q.code ? `<pre>${h(q.code)}</pre>` : ''}
        <div id="body">${body()}</div>
        <div id="result"></div>
        <div class="actions" id="act"><button class="btn primary" id="submit" ${typed(q.type) ? '' : 'disabled'}>정답 확인</button></div>
      </div>
    `;

    const $submit = document.getElementById('submit');
    const $marks = document.getElementById('marks');

    if (q.type === 'short') {
      const inp = document.getElementById('short');
      inp.focus();
      inp.addEventListener('keydown', e => { if (e.key === 'Enter' && !answered) submit(); });
    } else if (q.type === 'essay') {
      document.getElementById('essay').focus();
    } else if (q.type === 'task') {
      const inputs = [...$app.querySelectorAll('.task input')];
      inputs[0]?.focus();
      inputs.forEach((el, i) => el.addEventListener('keydown', e => {
        if (e.key !== 'Enter' || answered) return;
        e.preventDefault();
        if (i + 1 < inputs.length) inputs[i + 1].focus(); else submit();
      }));
    } else {
      $app.querySelectorAll('.opt').forEach(b => b.onclick = () => {
        if (answered) return;
        $app.querySelectorAll('.opt').forEach(x => x.classList.toggle('sel', x === b));
        input = q.type === 'ox' ? b.dataset.v === 'true' : Number(b.dataset.v);
        $submit.disabled = false;
      });
    }
    $submit.onclick = submit;

    function submit() {
      if (answered) return;
      if (q.type === 'short') {
        input = document.getElementById('short').value;
        if (!input.trim()) return;
        document.getElementById('short').disabled = true;
      } else if (q.type === 'essay') {
        input = document.getElementById('essay').value;
        if (!input.trim()) return;
        document.getElementById('essay').disabled = true;
      } else if (q.type === 'task') {
        const els = [...$app.querySelectorAll('.task input')];
        input = els.map(el => el.value);
        if (!input.some(v => v.trim())) return;
        els.forEach(el => el.disabled = true);
      }
      answered = true;
      const correct = Quiz.grade(q, input);

      // 보기 색칠
      $app.querySelectorAll('.opt').forEach(b => {
        b.disabled = true;
        const v = q.type === 'ox' ? b.dataset.v === 'true' : Number(b.dataset.v);
        if (v === q.answer) b.classList.add('right');
        else if (v === input) b.classList.add('wrong');
      });

      // 유형별 결과 본문
      let verdict, detail;
      if (q.type === 'task') {
        const g = Quiz.gradeTask(q, input);
        // 각 단계에 정오 표시
        q.steps.forEach((stp, i) => {
          const $st = $app.querySelector(`.task-step[data-i="${i}"]`);
          $st.classList.add(g.per[i] ? 'right' : 'wrong');
          $st.querySelector('.verdict-i').textContent = g.per[i] ? '✓' : '✗';
          if (!g.per[i]) {
            const sol = document.createElement('div');
            sol.className = 'sol mono';
            sol.textContent = '정답: ' + stp.answer;
            $st.appendChild(sol);
          }
        });
        verdict = correct ? '✅ 모든 단계 정답입니다' : `❌ ${g.total}단계 중 ${g.n}단계 정답`;
        const lines = [];
        q.steps.forEach((stp, i) => { if (i) lines.push(''); lines.push(stp.hint, stp.answer); });
        detail = `<div class="task-score">진행: ${g.n} / ${g.total} 단계</div>
          <h4>전체 정답</h4>
          <pre>${h(lines.join('\n'))}</pre>`;
      } else if (q.type === 'essay') {
        const g = Quiz.gradeEssay(q, input);
        verdict = correct
          ? `✅ 핵심 키워드 ${g.hit.length}개를 짚었습니다`
          : `❌ 키워드 ${g.hit.length}개 — ${g.need}개 이상 필요합니다`;
        detail = `<h4>내 답</h4><div class="model">${h(input)}</div>
          <h4>핵심 키워드 ${g.hit.length} / ${(q.keywords || []).length}</h4>
          <div class="kws">
            ${g.hit.map(k => `<span class="kw hit">✓ ${h(k)}</span>`).join('')}
            ${g.miss.map(k => `<span class="kw miss">· ${h(k)}</span>`).join('')}
          </div>
          <h4>모범답안</h4><div class="model">${fmt(q.model)}</div>`;
      } else {
        verdict = correct ? '✅ 정답입니다' : '❌ 오답입니다';
        detail = `${q.type === 'short' ? `<div class="hint">내 답: <code>${h(input)}</code></div>` : ''}
          <h4>정답</h4><p><code>${h(Quiz.answerText(q))}</code>${q.accept?.length && q.type === 'short' ? ` <span class="hint">(허용: ${q.accept.map(a => `<code>${h(a)}</code>`).join(' ')})</span>` : ''}</p>`;
      }

      document.getElementById('result').innerHTML = `
        <div class="result ${correct ? 'ok' : 'bad'}">
          <div class="verdict">${verdict}</div>
          ${detail}
          <h4>해설</h4><p>${fmt(q.explain)}</p>
          <h4>실사용 예시 / 사례</h4><p>${fmt(q.example)}</p>
          ${!correct && sess.mode === 'daily' ? `<p class="hint" style="margin-top:12px">📝 오답노트에 추가되었습니다. 내일 다시 출제됩니다.</p>` : ''}
          ${sess.mode === 'review' ? `<p class="hint" style="margin-top:12px">${reviewNote(q.id, correct)}</p>` : ''}
        </div>`;

      // 상단 O/△/X 활성화 — 선택해야 다음으로 넘어갈 수 있음
      $marks.querySelectorAll('button').forEach(b => {
        b.disabled = false;
        b.onclick = () => {
          mark = b.dataset.mark;
          $marks.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
          $next.disabled = false;
        };
      });

      $submit.remove();
      const $next = document.createElement('button');
      $next.className = 'btn primary';
      $next.disabled = true;
      $next.textContent = sess.idx + 1 >= sess.qids.length ? '결과 보기 →' : '다음 문제 →';
      $next.title = '우측 상단 O/△/X 를 먼저 선택하세요';
      document.getElementById('act').appendChild($next);
      $next.onclick = () => {
        Store.markSeen(q.id, correct);
        Scheduler.record(q.id, correct, mark, sess.mode);
        sess.results.push({
          qid: q.id, correct, mark,
          input: q.type === 'short' ? input : q.type === 'task' ? input.join(' | ') : undefined,
        });
        sess.idx++;
        Store.save();
        updateBadge();
        renderQuiz();
      };
      $next.focus();
    }
  }

  function reviewNote(qid, correct) {
    const e = Store.get().notebook[qid];
    if (!e) return '';
    if (e.stage === 1) return correct ? '🔁 정답 → 7일 뒤 마지막으로 한 번 더 출제됩니다.' : '🔁 오답 → 3일 뒤 마지막으로 한 번 더 출제됩니다.';
    return '🏁 마지막 복습입니다. 이후에는 자동 출제되지 않습니다 (오답노트에서 수동 선택 가능).';
  }

  function finishSession() {
    const st = Store.get();
    const sess = st.active;
    if (!sess) return navigate('/');
    const summary = {
      mode: sess.mode, cat: sess.cat, diff: sess.diff, at: Date.now(), startedAt: sess.startedAt,
      total: sess.results.length, correct: sess.results.filter(r => r.correct).length,
      results: sess.results,
    };
    st.sessions.push(summary);
    st.active = null;
    st.lastSummary = summary;
    Store.save();
    navigate('/summary');
  }

  /* ---------------- 결과 ---------------- */
  function renderSummary() {
    const s = Store.get().lastSummary;
    if (!s) return navigate('/');
    const pct = s.total ? Math.round((s.correct / s.total) * 100) : 0;
    const marks = { O: 0, T: 0, X: 0 };
    s.results.forEach(r => { if (r.mark) marks[r.mark]++; });
    const wrong = s.results.filter(r => !r.correct);

    $app.innerHTML = `
      <h1>세션 결과</h1>
      <p class="sub">${h(sessionTitle(s))}</p>
      <div class="card">
        <div class="row" style="gap:28px">
          <div class="score" style="color:${pct >= 80 ? 'var(--ok)' : pct >= 50 ? 'var(--warn)' : 'var(--bad)'}">${pct}%</div>
          <div class="stat-grid" style="flex:1">
            <div class="stat"><div class="v">${s.correct} / ${s.total}</div><div class="k">정답</div></div>
            <div class="stat"><div class="v" style="color:var(--ok)">${marks.O}</div><div class="k">O 완전 이해</div></div>
            <div class="stat"><div class="v" style="color:var(--warn)">${marks.T}</div><div class="k">△ 애매함</div></div>
            <div class="stat"><div class="v" style="color:var(--bad)">${marks.X}</div><div class="k">X 모름/찍음</div></div>
          </div>
        </div>
      </div>
      <div class="card">
        <h2 style="margin-top:0">문제별 결과</h2>
        <table><thead><tr><th>#</th><th>문제</th><th>결과</th><th>이해도</th></tr></thead><tbody>
        ${s.results.map((r, i) => { const q = Quiz.byId[r.qid]; return `<tr>
          <td class="hint">${i + 1}</td>
          <td>${fmt(q ? q.q.split('\n')[0] : r.qid)} ${q ? diffChip(q.diff) : ''}</td>
          <td>${r.correct ? '<span class="done">정답</span>' : '<span style="color:var(--bad)">오답</span>'}</td>
          <td>${r.mark ? `${r.mark === 'T' ? '△' : r.mark} ${MARK_LABEL[r.mark]}` : '-'}</td></tr>`; }).join('')}
        </tbody></table>
        ${wrong.length ? `<p class="hint" style="margin-top:12px">오답 ${wrong.length}문제는 오답노트에서 다시 볼 수 있습니다.</p>` : ''}
      </div>
      <div class="actions">
        <a class="btn" href="#/notebook">오답노트 보기</a>
        <a class="btn primary" href="#/">홈으로</a>
      </div>`;
  }

  /* ---------------- 오답노트 ---------------- */
  function renderNotebook() {
    const st = Store.get();
    const entries = Object.values(st.notebook).map(e => ({ e, q: Quiz.byId[e.qid] })).filter(x => x.q);
    const selected = new Set();
    let fCat = 'all', fMark = 'all', fStatus = 'all';

    const list = () => {
      const now = Date.now();
      const rows = entries.filter(({ e, q }) =>
        (fCat === 'all' || q.cat === fCat) &&
        (fMark === 'all' || (e.mark || 'none') === fMark) &&
        (fStatus === 'all' || (fStatus === 'due' ? (e.dueAt && e.dueAt <= now && e.stage < 3) : fStatus === 'pending' ? (e.dueAt && e.dueAt > now) : e.stage >= 3))
      ).sort((a, b) => (a.e.dueAt || Infinity) - (b.e.dueAt || Infinity));

      if (!rows.length) return `<div class="empty">조건에 맞는 오답이 없습니다.</div>`;
      return rows.map(({ e, q }) => {
        const due = e.dueAt && e.dueAt <= now && e.stage < 3;
        return `<div class="nb-item">
          <input type="checkbox" data-id="${q.id}" ${selected.has(q.id) ? 'checked' : ''} />
          <div>
            <div class="nb-q">${fmt(q.q)}</div>
            <div class="nb-meta">
              ${chip('', Quiz.CATEGORIES[q.cat].name)} ${diffChip(q.diff)} ${chip('type', Quiz.TYPES[q.type])}
              <span class="hint">정답: <code>${h(Quiz.answerText(q))}</code></span>
            </div>
            <div class="nb-meta">
              <span class="${due ? 'due-now' : e.stage >= 3 ? 'done' : 'hint'}">${h(Scheduler.statusText(e))}</span>
              <span class="hint">· 등록 ${new Date(e.createdAt).toLocaleDateString('ko-KR')}</span>
              <span class="hist" title="풀이 이력 (초록=정답, 빨강=오답)">${e.history.map(x => `<span class="${x.correct ? 'c' : 'w'}"></span>`).join('')}</span>
            </div>
          </div>
          <div class="nb-side">
            <div class="marks" style="transform:scale(.8); transform-origin:top right">
              ${['O', 'T', 'X'].map(m => `<button data-mark="${m}" data-id="${q.id}" class="${e.mark === m ? 'on' : ''}">${m === 'T' ? '△' : m}</button>`).join('')}
            </div>
            <button class="btn sm danger" data-del="${q.id}">삭제</button>
          </div>
        </div>`;
      }).join('');
    };

    $app.innerHTML = `
      <h1>오답노트</h1>
      <p class="sub">틀린 문제는 자동으로 기록됩니다. 문제를 골라 직접 테스트할 수도 있습니다. (수동 테스트는 복습 스케줄에 영향을 주지 않습니다)</p>
      <div class="card">
        <div class="row">
          <select id="f-cat"><option value="all">모든 분야</option>${Object.entries(Quiz.TRACKS).map(([tk, t]) => `<optgroup label="${h(t.name)}">${Quiz.catsOf(tk).map(k => `<option value="${k}">${h(Quiz.CATEGORIES[k].name)}</option>`).join('')}</optgroup>`).join('')}</select>
          <select id="f-mark"><option value="all">모든 이해도</option><option value="O">O 완전 이해</option><option value="T">△ 애매함</option><option value="X">X 모름/찍음</option><option value="none">미표시</option></select>
          <select id="f-status"><option value="all">모든 상태</option><option value="due">오늘 복습</option><option value="pending">복습 대기</option><option value="finished">자동 복습 완료</option></select>
          <span class="hint">총 ${entries.length}문제</span>
          <span style="flex:1"></span>
          <button class="btn sm" id="sel-all">보이는 것 전체 선택</button>
          <button class="btn sm" id="sel-none">선택 해제</button>
        </div>
      </div>
      <div class="card" id="list">${list()}</div>
      <div class="sticky-bar">
        <span><b id="sel-n">0</b>문제 선택됨</span>
        <div class="row">
          <button class="btn" id="test-sel" disabled>선택한 문제로 테스트</button>
          <button class="btn primary" id="test-all" ${entries.length ? '' : 'disabled'}>보이는 문제 전체 테스트</button>
        </div>
      </div>`;

    const $list = document.getElementById('list');
    const visibleIds = () => [...$list.querySelectorAll('input[type=checkbox]')].map(c => c.dataset.id);
    const refresh = () => {
      $list.innerHTML = list();
      document.getElementById('sel-n').textContent = selected.size;
      document.getElementById('test-sel').disabled = selected.size === 0;
      document.getElementById('test-all').disabled = visibleIds().length === 0;
    };

    ['f-cat', 'f-mark', 'f-status'].forEach(id => document.getElementById(id).onchange = (ev) => {
      if (id === 'f-cat') fCat = ev.target.value; else if (id === 'f-mark') fMark = ev.target.value; else fStatus = ev.target.value;
      refresh();
    });
    $list.addEventListener('change', ev => {
      if (ev.target.type === 'checkbox') { ev.target.checked ? selected.add(ev.target.dataset.id) : selected.delete(ev.target.dataset.id); document.getElementById('sel-n').textContent = selected.size; document.getElementById('test-sel').disabled = selected.size === 0; }
    });
    $list.addEventListener('click', ev => {
      const b = ev.target.closest('button'); if (!b) return;
      if (b.dataset.del) {
        if (!confirm('이 문제를 오답노트에서 삭제할까요?')) return;
        Scheduler.remove(b.dataset.del);
        const i = entries.findIndex(x => x.q.id === b.dataset.del); if (i >= 0) entries.splice(i, 1);
        selected.delete(b.dataset.del);
        updateBadge(); refresh();
      } else if (b.dataset.mark) {
        const e = st.notebook[b.dataset.id];
        e.mark = e.mark === b.dataset.mark ? null : b.dataset.mark;
        Store.save(); refresh();
      }
    });
    document.getElementById('sel-all').onclick = () => { visibleIds().forEach(id => selected.add(id)); refresh(); };
    document.getElementById('sel-none').onclick = () => { selected.clear(); refresh(); };
    const go = (ids) => {
      if (!ids.length) return;
      if (st.active && !confirm('진행 중인 세션을 버리고 테스트를 시작할까요?')) return;
      startSession({ mode: 'manual', qids: ids });
    };
    document.getElementById('test-sel').onclick = () => go([...selected]);
    document.getElementById('test-all').onclick = () => go(visibleIds());
  }

  /* ---------------- 통계 ---------------- */
  function renderStats() {
    const st = Store.get();
    const seen = Object.entries(st.seen);
    const totalC = seen.reduce((a, [, s]) => a + s.correct, 0);
    const totalW = seen.reduce((a, [, s]) => a + s.wrong, 0);
    const perCat = Object.keys(Quiz.CATEGORIES).map(k => {
      const ids = seen.filter(([id]) => Quiz.byId[id]?.cat === k);
      const c = ids.reduce((a, [, s]) => a + s.correct, 0), w = ids.reduce((a, [, s]) => a + s.wrong, 0);
      return { k, solved: ids.length, total: Quiz.countBy(k).total, c, w, nb: Object.values(st.notebook).filter(e => Quiz.byId[e.qid]?.cat === k).length };
    });
    const recent = st.sessions.slice(-15).reverse();

    $app.innerHTML = `
      <h1>통계</h1>
      <p class="sub">이 브라우저에 저장된 학습 기록</p>
      <div class="stat-grid">
        <div class="stat"><div class="v">${st.sessions.length}</div><div class="k">완료한 세션</div></div>
        <div class="stat"><div class="v">${seen.length} / ${Quiz.all.length}</div><div class="k">푼 문제 (고유)</div></div>
        <div class="stat"><div class="v">${totalC + totalW ? Math.round(totalC / (totalC + totalW) * 100) : 0}%</div><div class="k">누적 정답률</div></div>
        <div class="stat"><div class="v">${Object.keys(st.notebook).length}</div><div class="k">오답노트</div></div>
      </div>
      ${Object.entries(Quiz.TRACKS).map(([tk, t]) => {
        const rows = perCat.filter(r => Quiz.CATEGORIES[r.k].track === tk);
        const solved = rows.reduce((a, r) => a + r.solved, 0);
        const total = rows.reduce((a, r) => a + r.total, 0);
        return `<div class="card" style="margin-top:14px">
          <h2 style="margin-top:0">${t.icon} ${h(t.name)} <span class="hint">${solved} / ${total}</span></h2>
          <table><thead><tr><th>분야</th><th>진도</th><th>정답률</th><th>오답노트</th></tr></thead><tbody>
          ${rows.map(r => `<tr><td>${Quiz.CATEGORIES[r.k].icon} ${h(Quiz.CATEGORIES[r.k].name)}</td><td>${r.solved} / ${r.total}</td><td>${r.c + r.w ? Math.round(r.c / (r.c + r.w) * 100) + '%' : '-'}</td><td>${r.nb}</td></tr>`).join('')}
          </tbody></table>
        </div>`;
      }).join('')}
      <div class="card">
        <h2 style="margin-top:0">최근 세션</h2>
        ${recent.length ? `<table><thead><tr><th>일시</th><th>세션</th><th>점수</th></tr></thead><tbody>
        ${recent.map(s => `<tr><td class="hint">${new Date(s.at).toLocaleString('ko-KR')}</td><td>${h(sessionTitle(s))}</td><td>${s.correct} / ${s.total} (${s.total ? Math.round(s.correct / s.total * 100) : 0}%)</td></tr>`).join('')}
        </tbody></table>` : '<div class="empty">아직 완료한 세션이 없습니다.</div>'}
      </div>
      <div class="actions"><button class="btn danger" id="reset">모든 기록 초기화</button></div>`;
    document.getElementById('reset').onclick = () => { if (confirm('학습 기록·오답노트를 모두 삭제합니다. 계속할까요?')) { Store.reset(); route(); } };
  }

  route();
})();
