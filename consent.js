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
  var returnFocus = null;
  function closeBar() {
    if (!bar) return;
    var hadFocus = bar.contains(document.activeElement);
    bar.remove();
    bar = null;
    if (hadFocus && returnFocus && returnFocus.isConnected) returnFocus.focus({ preventScroll: true });
    returnFocus = null;
  }
  function choose(granted) {
    setConsent(granted ? 'granted' : 'denied');
    saveChoice(granted ? 'granted' : 'denied');
    closeBar();
  }
  var TXT = {
    nl: { text: 'We gebruiken cookies voor statistieken en advertenties (Google Analytics & Google Ads) om onze website en campagnes te verbeteren. Lees meer in ons ', policy: 'cookiebeleid', accept: 'Accepteren', deny: 'Weigeren', aria: 'Cookietoestemming' },
    fr: { text: 'Nous utilisons des cookies à des fins de statistiques et de publicité (Google Analytics & Google Ads) afin d’améliorer notre site et nos campagnes. En savoir plus dans notre ', policy: 'politique en matière de cookies', accept: 'Accepter', deny: 'Refuser', aria: 'Consentement aux cookies' },
    en: { text: 'We use cookies for analytics and advertising (Google Analytics & Google Ads) to improve our website and campaigns. Read more in our ', policy: 'cookie policy', accept: 'Accept', deny: 'Decline', aria: 'Cookie consent' }
  };
  function lang() { var l = window.__lang || (document.documentElement.getAttribute('lang') || 'nl').slice(0, 2); return TXT[l] ? l : 'nl'; }
  function updateBar() {
    if (!bar) return;
    var language = lang();
    var x = TXT[language];
    bar.setAttribute('aria-label', x.aria);
    bar.querySelector('.consent-text').firstChild.nodeValue = x.text;
    var link = bar.querySelector('.consent-policy');
    link.textContent = x.policy;
    link.setAttribute('href', 'cookiebeleid.html?lang=' + language);
    bar.querySelector('.consent-allow').textContent = x.accept;
    bar.querySelector('.consent-deny').textContent = x.deny;
  }
  function showBar(opener) {
    if (!document.body) return;
    if (opener) returnFocus = opener;
    if (bar) {
      if (opener) bar.querySelector('.consent-deny').focus();
      return;
    }
    bar = document.createElement('div');
    bar.className = 'consent';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-describedby', 'consent-description');
    bar.innerHTML =
      '<div class="consent-inner">' +
        '<p class="consent-text" id="consent-description"></p>' +
        '<div class="consent-actions">' +
          '<button type="button" class="consent-btn consent-deny"></button>' +
          '<button type="button" class="consent-btn consent-allow"></button>' +
        '</div>' +
      '</div>';
    var text = bar.querySelector('.consent-text');
    text.appendChild(document.createTextNode(''));
    var link = document.createElement('a');
    link.className = 'consent-policy';
    text.appendChild(link);
    text.appendChild(document.createTextNode('.'));
    updateBar();
    document.body.appendChild(bar);
    bar.querySelector('.consent-allow').addEventListener('click', function () { choose(true); });
    bar.querySelector('.consent-deny').addEventListener('click', function () { choose(false); });
    var element = bar;
    requestAnimationFrame(function () { if (bar === element) element.classList.add('is-in'); });
    if (opener) bar.querySelector('.consent-deny').focus();
  }

  function init() {
    if (!readChoice()) showBar();
    document.addEventListener('beamerij:languagechange', updateBar);
    /* delegated so it keeps working after the language switcher re-renders the text */
    document.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('[data-cookie-settings]');
      if (!t) return;
      e.preventDefault();
      showBar(t);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
