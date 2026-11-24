/* common.js: código usado em todas as páginas (menu, menu rápido, tela cheia e régua de rolagem) */
window.reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
var reduce = window.reduce;

// nav: menu rápido (botão ⌘ ou Ctrl/⌘+K) e tela cheia
(() => {
  const pal = document.getElementById('pal'), q = document.getElementById('palq'), list = document.getElementById('pall');
  const items = () => [...list.querySelectorAll('li')].filter(li => !li.hidden).map(li => li.querySelector('a'));
  let sel = 0;
  const mark = () => items().forEach((a, i) => a.classList.toggle('sel', i === sel));
  const open = () => { pal.hidden = false; q.value = ''; filter(); q.focus(); };
  const close = () => { pal.hidden = true; };
  const filter = () => { const v = q.value.toLowerCase(); list.querySelectorAll('li').forEach(li => li.hidden = !li.textContent.toLowerCase().includes(v)); sel = 0; mark(); };
  document.getElementById('cmd').addEventListener('click', open);
  q.addEventListener('input', filter);
  pal.addEventListener('click', e => { if (e.target === pal) close(); if (e.target.closest('a')) close(); });
  addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); pal.hidden ? open() : close(); return; }
    if (pal.hidden) return;
    const it = items();
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowDown') { e.preventDefault(); sel = (sel + 1) % it.length; mark(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); sel = (sel - 1 + it.length) % it.length; mark(); }
    else if (e.key === 'Enter' && it[sel]) { e.preventDefault(); it[sel].click(); close(); }
  });
  const fs = document.getElementById('fs');
  fs.addEventListener('click', () => {
    try {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen().catch(() => { fs.title = 'Tela cheia não disponível aqui'; });
    } catch (_) { fs.title = 'Tela cheia não disponível aqui'; }
  });
})();

// régua de rolagem: o marcador vermelho mostra quanto da página já foi lido; clique ou arraste para navegar
(() => {
  const ruler = document.getElementById('ruler'), box = document.getElementById('ticks'), mark = document.getElementById('mark'), pct = document.getElementById('rpct');
  const N = 26, ticks = [];
  for (let i = 0; i < N; i++) { const el = document.createElement('i'); if (i % 5 === 0) el.className = 'major'; box.insertBefore(el, mark); ticks.push(el); }
  let shown = 0;
  const max = () => Math.max(1, document.documentElement.scrollHeight - innerHeight);
  const progress = () => Math.min(1, Math.max(0, scrollY / max()));
  const paint = () => {
    const target = progress();
    shown += (target - shown) * 0.25;
    if (Math.abs(target - shown) < 0.0005) shown = target;
    mark.style.left = (shown * 100) + '%';
    ruler.style.setProperty('--rp', (shown * 100).toFixed(2));
    const n = Math.round(shown * (N - 1));
    ticks.forEach((t, i) => t.classList.toggle('past', i <= n));
    const v = Math.round(target * 100);
    pct.textContent = v + '%'; ruler.setAttribute('aria-valuenow', v);
    if (shown !== target) requestAnimationFrame(paint);
  };
  addEventListener('scroll', () => requestAnimationFrame(paint), { passive: true });
  addEventListener('resize', paint);
  const go = e => { const r = box.getBoundingClientRect(); const k = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)); scrollTo({ top: k * max(), behavior: 'instant' }); };
  let drag = false;
  ruler.addEventListener('pointerdown', e => { drag = true; ruler.setPointerCapture(e.pointerId); go(e); });
  ruler.addEventListener('pointermove', e => { if (drag) go(e); });
  ruler.addEventListener('pointerup', () => { drag = false; });
  ruler.addEventListener('keydown', e => {
    const step = { ArrowRight: .05, ArrowUp: .05, ArrowLeft: -.05, ArrowDown: -.05 }[e.key];
    if (step) { e.preventDefault(); scrollTo({ top: (progress() + step) * max() }); }
  });
  paint();
})();
