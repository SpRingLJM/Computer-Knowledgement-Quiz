/* 라이트/다크 테마 — head 인라인 스크립트가 초기값을 이미 세팅해 둔다 */
const Theme = (() => {
  const KEY = 'quiz_theme';
  const $btn = document.getElementById('theme-toggle');
  const media = window.matchMedia('(prefers-color-scheme: light)');

  const current = () => document.documentElement.getAttribute('data-theme') || 'dark';

  function paint() {
    const light = current() === 'light';
    $btn.firstElementChild.textContent = light ? '☀️' : '🌙';
    $btn.setAttribute('aria-label', light ? '어두운 테마로 전환' : '밝은 테마로 전환');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', light ? '#f7f8fb' : '#0f1117');
  }

  function set(mode, remember) {
    document.documentElement.setAttribute('data-theme', mode);
    if (remember) { try { localStorage.setItem(KEY, mode); } catch {} }
    paint();
  }

  $btn.addEventListener('click', () => set(current() === 'light' ? 'dark' : 'light', true));

  // 직접 고른 적이 없다면 시스템 설정 변경을 그대로 따라간다
  media.addEventListener('change', e => {
    let saved = null;
    try { saved = localStorage.getItem(KEY); } catch {}
    if (!saved) set(e.matches ? 'light' : 'dark', false);
  });

  paint();
  return { current, set };
})();
