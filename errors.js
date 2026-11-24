/* errors.js: se algum efeito falhar (navegador antigo, WebGL desligado), a página continua legível */
(function () {
  window.addEventListener('error', function (e) {
    document.documentElement.classList.add('fx-off');
    if (window.console) console.warn('[portfólio] efeito desativado:', e.message);
  });
  try {
    var c = document.createElement('canvas');
    if (!(c.getContext('webgl') || c.getContext('experimental-webgl'))) document.documentElement.classList.add('no-webgl');
  } catch (err) { document.documentElement.classList.add('no-webgl'); }
})();
