(function () {
  var GA_ID = 'G-YMR9J678EK';
  var KEY = 'dragonfly-cookie-consent';

  function loadGA() {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });
  }

  function getChoice() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function setChoice(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  function removeBanner() {
    var b = document.getElementById('cookie-banner');
    if (b) b.remove();
  }

  function showBanner() {
    if (document.getElementById('cookie-banner')) return;

    var box = document.createElement('div');
    box.id = 'cookie-banner';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'Preferenze cookie');
    box.style.cssText =
      'position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;' +
      'max-width:560px;margin:0 auto;padding:18px 20px;border-radius:10px;' +
      'background:#ffffff;color:#222;font:14px/1.5 Montserrat,sans-serif;' +
      'box-shadow:0 4px 24px rgba(0,0,0,.25);';

    box.innerHTML =
      '<p style="margin:0 0 12px;">Uso Google Analytics per capire come viene ' +
      'usato il sito, ma solo se acconsenti. Dettagli nella ' +
      '<a href="cookie-policy.html">Cookie Policy</a>.</p>' +
      '<div style="display:flex;gap:10px;justify-content:flex-end;">' +
      '<button id="cookie-reject" style="padding:9px 18px;border-radius:6px;' +
      'border:1px solid #888;background:#fff;color:#222;cursor:pointer;' +
      'font:inherit;">Rifiuta</button>' +
      '<button id="cookie-accept" style="padding:9px 18px;border-radius:6px;' +
      'border:1px solid #888;background:#fff;color:#222;cursor:pointer;' +
      'font:inherit;">Accetta</button>' +
      '</div>';

    document.body.appendChild(box);

    document.getElementById('cookie-accept').addEventListener('click', function () {
      setChoice('accepted');
      removeBanner();
      loadGA();
    });
    document.getElementById('cookie-reject').addEventListener('click', function () {
      setChoice('rejected');
      removeBanner();
    });
  }

  window.apriPreferenzeCookie = showBanner;

  var choice = getChoice();
  if (choice === 'accepted') {
    loadGA();
  } else if (choice !== 'rejected') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showBanner);
    } else {
      showBanner();
    }
  }
})();