/* home.js: efeitos e interações da página inicial */

// terminal com commits reais
(() => {
  const lines = [
    ['p', '$ '], ['', 'git log --author="MarcusLeal" --oneline\n'],
    ['h', 'c1d3873'], ['', ' 2026-11-24  Fluxo: CRM de funil de vendas em React '], ['d', '(fluxo-crm)\n'],
    ['h', 'f22669e'], ['', ' 2026-11-24  Adiciona modelagem do banco de dados (PostgreSQL) '], ['d', '(lumen-store)\n'],
    ['h', '8495a14'], ['', ' 2026-11-20  Lumen Store: e-commerce completo em React + Vite '], ['d', '(lumen-store)\n'],
    ['h', 'a9a5084'], ['', ' 2026-11-20  Protótipo Gestão que Transforma: app do empreendedor e painel '], ['d', '(gestao-que-transforma)\n'],
    ['h', 'c25d87f'], ['', ' 2026-09-10  🎉 Commit Inicial '], ['d', '(calculadora-ir)\n'],
    ['h', '425e205'], ['', ' 2026-08-12  Zip '], ['d', '(cadastro-clientes)\n'],
    ['h', '9d1eb0e'], ['', ' 2026-08-12  Rename project to Sistema-Cadastro-Clientes-Py\n'],
    ['h', 'f0d0e3a'], ['', ' 2026-08-12  Projeto - Sistema de Cadastro\n'],
    ['h', '48cb267'], ['', ' 2026-08-12  first commit\n'],
    ['p', '$ '], ['', 'echo $PROJETO_ATUAL\n'], ['', 'Fluxo CRM: no ar 🚀']
  ];
  const pre = document.getElementById('term');
  const render = n => {
    let left = n; pre.innerHTML = '';
    for (const [cls, txt] of lines) {
      if (left <= 0) break;
      const s = document.createElement('span'); if (cls) s.className = cls;
      s.textContent = [...txt].slice(0, left).join(''); left -= [...txt].length; pre.appendChild(s);
    }
  };
  const total = lines.reduce((a, [, t]) => a + [...t].length, 0);
  if (reduce) return render(total);
  render(total); // estado completo visível desde o início
  let n = 0;
  setTimeout(function step() { n += 3; render(Math.min(n, total)); if (n < total) setTimeout(step, 18); }, 900);
})();

// faixa estilo "scroll velocity": sempre passando; rolar a página acelera e inverte o sentido
(() => {
  const tracks = [...document.querySelectorAll('#velo .track')].map(el => {
    const set = el.querySelector('.set');
    // repete o conjunto até cobrir 2x a largura da tela
    for (let n = 0; n < 12 && set.offsetWidth > 0 && el.scrollWidth < screen.width * 2 + set.offsetWidth; n++) el.appendChild(set.cloneNode(true));
    return { el, set, x: 0, dir: +el.dataset.v, w: set.offsetWidth };
  });
  const measureW = () => tracks.forEach(t => { t.w = t.set.offsetWidth; });
  addEventListener('resize', measureW); if (document.fonts) document.fonts.ready.then(measureW);
  let onScreen = true; const velo = document.getElementById('velo');
  if (velo && 'IntersectionObserver' in window) new IntersectionObserver(([en]) => { onScreen = en.isIntersecting; }).observe(velo);
  const BASE = 60; // px por segundo
  let lastY = scrollY, lastT = performance.now(), boost = 0, sign = 1;
  const tick = now => {
    const dt = Math.min(0.05, (now - lastT) / 1000); lastT = now;
    const dy = scrollY - lastY; lastY = scrollY;
    const v = dt ? dy / dt : 0;            // velocidade da rolagem (px/s)
    if (Math.abs(dy) > 0) sign = dy > 0 ? 1 : -1;
    boost += ((Math.min(Math.abs(v), 2500) / 2500) * 9 - boost) * 0.12; // suaviza
    if (!onScreen) { requestAnimationFrame(tick); return; }
    for (const t of tracks) {
      const w = t.w || 1;
      t.x += t.dir * sign * BASE * (1 + boost) * dt * -1;
      t.x = ((t.x % w) - w) % w;           // mantém entre -w e 0 (loop contínuo)
      t.el.style.transform = `translate3d(${t.x}px,0,0) skewX(${-t.dir * sign * Math.min(boost, 6)}deg)`;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})();

// Aurora Flow (preset mono): camadas de "seda" iluminada, luz que segue o cursor, brilho ambiente, ruído, grão e vinheta
(() => {
  const CFG = {
    colors: ['#020202', '#171717', '#414141', '#8a8a8a', '#f2f2f2'],
    speed: 1, intensity: 1, contrast: 1.04, brightness: 1, grainOpacity: .22, layers: 6,
    flowScale: 1, flowStrength: 1, flowDirection: -18, animationSpeed: 1,
    pointerStrength: .7, lightingIntensity: .8, lightingRadius: 1, lightingSpeed: .8,
    ambientOpacity: .7, noiseOpacity: .16, noiseScale: 1, vignetteStrength: .55
  };
  const cv = document.getElementById('ocean');
  const gl = cv.getContext('webgl', { antialias: false, premultipliedAlpha: false });
  if (!gl) { cv.hidden = true; return; }
  const vs = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
  const fs = `precision highp float;
  uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse; uniform float uOn;
  uniform vec3 c0; uniform vec3 c1; uniform vec3 c2; uniform vec3 c3; uniform vec3 c4;
  uniform float uDir, uFlowScale, uFlowStrength, uIntensity, uContrast, uBright, uGrain, uPtr, uLightI, uLightR, uLightS, uAmb, uNoise, uNoiseS, uVig;
  float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
  float noise(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3. - 2. * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y); }
  float fbm(vec2 p){ float v = 0., a = .5; for (int i = 0; i < 3; i++) { v += a * noise(p); p = p * 2.03 + 11.7; a *= .5; } return v; }
  vec3 pal(float x){ x = clamp(x, 0., 1.) * 4.;
    if (x < 1.) return mix(c0, c1, x); if (x < 2.) return mix(c1, c2, x - 1.); if (x < 3.) return mix(c2, c3, x - 2.); return mix(c3, c4, x - 3.); }
  void main(){
    vec2 uv = gl_FragCoord.xy / uRes;
    vec2 p = (gl_FragCoord.xy - .5 * uRes) / uRes.y;
    vec2 m = (uMouse - .5) * vec2(uRes.x / uRes.y, 1.);
    float ca = cos(uDir), sa = sin(uDir); mat2 R = mat2(ca, -sa, sa, ca);
    vec2 q = R * p; vec2 mq = R * m;
    vec2 dm = q - mq; q += dm * exp(-dot(dm, dm) * 6.) * .18 * uPtr * uOn;          // o cursor empurra a seda
    q /= uFlowScale;
    float t = uTime * .12;
    float acc = 0.;
    for (int i = 0; i < LAYERS; i++) {
      float fi = float(i);
      float y = q.y + .42 - fi * .15;
      float w = (fbm(vec2(q.x * 1.1 + t * (.45 + fi * .08), fi * 3.17 + t * .25)) - .5) * 1.25 * uFlowStrength;
      float d = y + w + sin(q.x * 1.8 + t * 1.6 + fi * 1.3) * .07;
      float sheen = .5 + .5 * sin(q.x * 3.2 + fi * 1.7 - t * 2.2);                 // brilho da seda ao longo da faixa
      float silk = exp(-d * d * 30.) * (.35 + .65 * sheen);
      float soft = exp(-d * d * 3.5) * .18;
      acc += (silk * .85 + soft) * (.42 + fi * .1);
    }
    acc *= uIntensity;
    vec3 col = pal(acc * .26 + .015);
    // luz que segue o cursor
    float lr = .45 * uLightR;
    float L = exp(-dot(p - m, p - m) / (lr * lr)) * uLightI * uOn * (.85 + .15 * sin(uTime * uLightS * 2.));
    col += c4 * L * .10 * (.3 + acc);
    // brilho ambiente
    vec2 g = vec2(.35 * sin(uTime * .05), .18);
    col += c2 * uAmb * .10 * exp(-dot(p - g, p - g) * 1.4);
    // ruído suave + grão de filme
    col += (fbm(gl_FragCoord.xy * .004 * uNoiseS + uTime * .02) - .5) * uNoise * .12;
    col += (hash(gl_FragCoord.xy + fract(uTime * 13.)) - .5) * uGrain * .14;
    // vinheta, contraste e brilho
    float vig = smoothstep(1.15, .15, length((uv - .5) * vec2(1.3, 1.)));
    col *= mix(1., vig, uVig);
    col = ((col - .5) * uContrast + .5) * uBright;
    gl_FragColor = vec4(clamp(col, 0., 1.), 1.);
  }`.replace('LAYERS', String(CFG.layers));
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
  let prog;
  try { prog = gl.createProgram(); gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(prog); }
  catch (err) { console.warn(err); cv.hidden = true; return; }
  gl.useProgram(prog);
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'a'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const U = n => gl.getUniformLocation(prog, n);
  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255);
  CFG.colors.forEach((c, i) => gl.uniform3fv(U('c' + i), hex(c)));
  const set1 = (n, v) => gl.uniform1f(U(n), v);
  set1('uDir', CFG.flowDirection * Math.PI / 180); set1('uFlowScale', CFG.flowScale); set1('uFlowStrength', CFG.flowStrength);
  set1('uIntensity', CFG.intensity); set1('uContrast', CFG.contrast); set1('uBright', CFG.brightness); set1('uGrain', CFG.grainOpacity);
  set1('uPtr', CFG.pointerStrength); set1('uLightI', CFG.lightingIntensity); set1('uLightR', CFG.lightingRadius); set1('uLightS', CFG.lightingSpeed);
  set1('uAmb', CFG.ambientOpacity); set1('uNoise', CFG.noiseOpacity); set1('uNoiseS', CFG.noiseScale); set1('uVig', CFG.vignetteStrength);
  const uRes = U('uRes'), uTime = U('uTime'), uMouse = U('uMouse'), uOn = U('uOn');
  const SCALE = matchMedia('(pointer: coarse)').matches ? .32 : .42;   // poucos pixels: o efeito é suave e o CSS amplia
  const size = () => { const w = Math.max(1, Math.round(innerWidth * SCALE)), h = Math.max(1, Math.round(innerHeight * SCALE)); cv.width = w; cv.height = h; gl.viewport(0, 0, w, h); gl.uniform2f(uRes, w, h); };
  let mx = .6, my = .55, tx = .6, ty = .55, on = 0, onT = 0;
  addEventListener('pointermove', e => { tx = e.clientX / innerWidth; ty = 1 - e.clientY / innerHeight; onT = 1; }, { passive: true });
  document.addEventListener('pointerleave', () => { onT = 0; });
  const t0 = performance.now();
  let raf = 0;
  let lastF = 0;
  const frame = now => {
    if (now - lastF < 33) { raf = document.hidden ? 0 : requestAnimationFrame(frame); return; }   // ~30 quadros/s bastam
    lastF = now;
    mx += (tx - mx) * .06; my += (ty - my) * .06; on += (onT - on) * .05;
    gl.uniform1f(uTime, (now - t0) / 1000 * CFG.speed * CFG.animationSpeed); gl.uniform2f(uMouse, mx, my); gl.uniform1f(uOn, on);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    raf = document.hidden ? 0 : requestAnimationFrame(frame);
  };
  document.addEventListener('visibilitychange', () => { if (!document.hidden && !raf) raf = requestAnimationFrame(frame); });
  addEventListener('resize', size);
  size(); raf = requestAnimationFrame(frame);
})();

// stack digitada no topo
(() => {
  const el = document.getElementById('stk'); if (!el) return;
  const items = ['React · Node.js · TypeScript', 'PostgreSQL · Supabase · SQL', 'React Native · Ruby on Rails', 'Git · Linux · Scrum'];
  let k = 0, n = items[0].length, del = false;
  const tick = () => {
    const s = items[k];
    n += del ? -1 : 1; el.textContent = s.slice(0, n);
    let wait = del ? 28 : 55;
    if (!del && n >= s.length) { del = true; wait = 2400; }
    else if (del && n <= 0) { del = false; k = (k + 1) % items.length; wait = 300; }
    setTimeout(tick, wait);
  };
  setTimeout(() => { del = true; tick(); }, 2600);
})();

// projetos: os 4 principais ficam à mostra; "Ver outros projetos" abre o restante
(() => {
  const btn = document.getElementById('pj-more'), box = document.getElementById('pj-outros'), title = document.getElementById('pj-outros-t');
  if (!btn || !box) return;
  document.querySelectorAll('.pj-extra').forEach(el => { el.hidden = false; box.appendChild(el); });
  btn.addEventListener('click', () => {
    const open = box.hidden;
    box.hidden = !open; title.hidden = !open;
    btn.setAttribute('aria-expanded', open);
    btn.innerHTML = open ? 'Ocultar outros projetos <span aria-hidden="true">↑</span>' : 'Ver outros projetos <span aria-hidden="true">↓</span>';
    if (open) title.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();

// copiar e-mail
(() => {
  const b = document.getElementById('mail-copy'), a = document.getElementById('mail'); if (!b) return;
  b.addEventListener('click', () => {
    const done = () => { b.textContent = 'Copiado!'; setTimeout(() => b.textContent = 'Copiar', 1800); };
    try { navigator.clipboard.writeText(a.textContent).then(done, () => sel()); } catch (e) { sel(); }
    function sel() { const r = document.createRange(); r.selectNodeContents(a); const s = getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = 'Selecionado'; setTimeout(() => b.textContent = 'Copiar', 1800); }
  });
})();
