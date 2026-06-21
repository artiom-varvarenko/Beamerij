/* ============================================================
   Beamerij — cookie consent (Google Consent Mode v2)
   Loaded on every page. The default state (denied) is set in the
   <head>; this script updates it once the visitor chooses, and
   remembers the choice so the banner isn't shown again.
   ============================================================ */
(function () {
  var KEY = 'beamerij-consent';

  function setConsent(value) {
    if (typeof gtag !== 'function') return;
    gtag('consent', 'update', {
      ad_storage: value,
      ad_user_data: value,
      ad_personalization: value,
      analytics_storage: value
    });
  }
  function readChoice() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function saveChoice(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  /* re-apply a previously granted choice (default in <head> is denied) */
  if (readChoice() === 'granted') setConsent('granted');

  var bar = null;
  function closeBar() {
    if (!bar) return;
    var el = bar;
    el.classList.remove('is-in');
    setTimeout(function () { if (el && el.parentNode) el.parentNode.removeChild(el); }, 360);
    bar = null;
  }
  function choose(granted) {
    setConsent(granted ? 'granted' : 'denied');
    saveChoice(granted ? 'granted' : 'denied');
    closeBar();
  }
  function showBar() {
    if (bar || !document.body) return;
    bar = document.createElement('div');
    bar.className = 'consent';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Cookietoestemming');
    bar.innerHTML =
      '<div class="consent-inner">' +
        '<p class="consent-text">We gebruiken cookies voor statistieken en advertenties (Google Analytics &amp; Google Ads) om onze website en campagnes te verbeteren. Lees meer in ons <a href="cookiebeleid.html">cookiebeleid</a>.</p>' +
        '<div class="consent-actions">' +
          '<button type="button" class="consent-btn consent-deny">Weigeren</button>' +
          '<button type="button" class="consent-btn consent-allow">Accepteren</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(bar);
    bar.querySelector('.consent-allow').addEventListener('click', function () { choose(true); });
    bar.querySelector('.consent-deny').addEventListener('click', function () { choose(false); });
    requestAnimationFrame(function () { if (bar) bar.classList.add('is-in'); });
  }

  function init() {
    if (!readChoice()) showBar();
    document.querySelectorAll('[data-cookie-settings]').forEach(function (el) {
      el.addEventListener('click', function (e) { e.preventDefault(); showBar(); });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
