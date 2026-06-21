/* ============================================================
   Beamerij — interactions & motion
   Replace FORMSPREE_ENDPOINT with the URL Formspree supplies,
   e.g. https://formspree.io/f/xxxxabcd.
   ============================================================ */
const formspreeEndpoint = 'FORMSPREE_ENDPOINT';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const mqDesktop = window.matchMedia('(min-width: 701px)');
const mqMobile = window.matchMedia('(max-width: 700px)');
let canParallax = mqDesktop.matches && !reducedMotion;

const root = document.documentElement;
const body = document.body;
const header = document.querySelector('[data-header]');
const announce = document.querySelector('[data-announce]');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const progressBar = document.querySelector('[data-progress-bar]');
const toTop = document.querySelector('[data-to-top]');
const parallaxEls = Array.from(document.querySelectorAll('[data-parallax]'));

/* ---------- announcement bar height (drives header offset) ---------- */
function syncAnnounceHeight() {
  if (announce) root.style.setProperty('--announce-h', announce.offsetHeight + 'px');
}
function measureParallax() { for (const el of parallaxEls) el._ph = el.offsetHeight; }
syncAnnounceHeight();
measureParallax();
window.addEventListener('resize', () => { syncAnnounceHeight(); measureParallax(); }, { passive: true });
window.addEventListener('load', syncAnnounceHeight);

/* ---------- single rAF-driven scroll loop ---------- */
let ticking = false;
let lastY = window.scrollY;
function onScrollFrame() {
  const y = window.scrollY;
  const docH = root.scrollHeight - window.innerHeight;

  body.classList.toggle('is-scrolled', y > 16);
  if (progressBar) progressBar.style.width = (docH > 0 ? (y / docH) * 100 : 0) + '%';
  if (toTop) toTop.classList.toggle('is-visible', y > window.innerHeight * 0.9);

  /* headroom: hide the announce bar when scrolling down, bring it back on scroll up */
  if (announce) {
    const goingDown = y > lastY + 2;
    const goingUp = y < lastY - 2;
    if (y <= 16) body.classList.remove('hide-announce');
    else if (goingDown && y > 90) body.classList.add('hide-announce');
    else if (goingUp) body.classList.remove('hide-announce');
    if (goingDown || goingUp) lastY = y;
    const hidden = body.classList.contains('hide-announce');
    if (announce._hidden !== hidden) {
      announce._hidden = hidden;
      announce.setAttribute('aria-hidden', String(hidden));
      announce.tabIndex = hidden ? -1 : 0;
    }
  } else {
    lastY = y;
  }

  if (canParallax) {
    const vh = window.innerHeight;
    const rects = parallaxEls.map((el) => el.getBoundingClientRect());
    for (let i = 0; i < parallaxEls.length; i++) {
      const el = parallaxEls[i], rect = rects[i];
      const factor = parseFloat(el.dataset.parallax) || 0.15;
      const offset = (rect.top + rect.height / 2) - vh / 2;
      const max = (el._ph || rect.height) * 0.1;
      let shift = offset * factor * 0.4;
      if (shift > max) shift = max; else if (shift < -max) shift = -max;
      el.style.transform = 'translate3d(0,' + shift.toFixed(1) + 'px,0)';
    }
  }
  ticking = false;
}
function requestScroll() { if (!ticking) { ticking = true; requestAnimationFrame(onScrollFrame); } }
window.addEventListener('scroll', requestScroll, { passive: true });
window.addEventListener('resize', requestScroll, { passive: true });
onScrollFrame();

mqDesktop.addEventListener('change', (e) => {
  canParallax = e.matches && !reducedMotion;
  if (!canParallax) parallaxEls.forEach((el) => { el.style.transform = ''; });
  else { measureParallax(); requestScroll(); }
});

/* ---------- navigation ---------- */
function setMenu(open) {
  navToggle?.setAttribute('aria-expanded', String(open));
  navLinks?.classList.toggle('is-open', open);
  body.classList.toggle('nav-open', open);
  updateNavInert();
  if (open) navLinks?.querySelector('a')?.focus();
}
function updateNavInert() {
  if (!navLinks) return;
  const open = navToggle?.getAttribute('aria-expanded') === 'true';
  const shouldInert = mqMobile.matches && !open;
  navLinks.inert = shouldInert;
  if (shouldInert) navLinks.setAttribute('aria-hidden', 'true');
  else navLinks.removeAttribute('aria-hidden');
}
updateNavInert();
mqMobile.addEventListener('change', updateNavInert);

navToggle?.addEventListener('click', () => setMenu(navToggle.getAttribute('aria-expanded') !== 'true'));
navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navToggle?.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    navToggle.focus();
  }
});

/* ---------- count-up numbers ---------- */
function countUp(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  if (isNaN(target) || reducedMotion) return;
  const duration = 1100;
  let start = null;
  function step(ts) {
    if (start === null) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ---------- reveal-on-scroll + staggered groups ---------- */
const revealEls = document.querySelectorAll('[data-reveal], .reveal');
document.querySelectorAll('[data-reveal-group]').forEach((group) => {
  group.querySelectorAll('[data-reveal]').forEach((kid, i) => {
    kid.style.transitionDelay = (i * 0.08).toFixed(2) + 's';
  });
});

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealEls.forEach((el) => {
    el.classList.add(el.hasAttribute('data-reveal') ? 'is-in' : 'is-visible');
    el.querySelectorAll('[data-count]').forEach((c) => { c.textContent = c.dataset.count + (c.dataset.suffix || ''); });
  });
} else {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add(el.hasAttribute('data-reveal') ? 'is-in' : 'is-visible');
      el.querySelectorAll('[data-count]').forEach(countUp);
      obs.unobserve(el);
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
  revealEls.forEach((el) => observer.observe(el));
}

/* ---------- hero entrance (independent of image loading) ---------- */
requestAnimationFrame(() => body.classList.add('loaded'));

/* ---------- back to top ---------- */
toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' }));

/* ---------- form niceties ---------- */
const dateInput = document.querySelector('#date');
if (dateInput) {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  dateInput.min = now.toISOString().slice(0, 10);
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

/* ---------- quote form (Formspree) ---------- */
const quoteForm = document.querySelector('#quote-form');
const formStatus = document.querySelector('#form-status');
const formSuccess = document.querySelector('#form-success');
quoteForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  formStatus.textContent = '';
  if (!quoteForm.checkValidity()) { quoteForm.reportValidity(); return; }
  const endpoint = quoteForm.dataset.formspreeEndpoint || formspreeEndpoint;
  if (!endpoint || endpoint === 'FORMSPREE_ENDPOINT') {
    formStatus.textContent = 'De formulierkoppeling is nog niet ingesteld. Mail ons intussen via info@beamerij.be.';
    return;
  }
  const submitButton = quoteForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'Even versturen…';
  try {
    const response = await fetch(endpoint, { method: 'POST', body: new FormData(quoteForm), headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('Form submission failed');
    quoteForm.querySelectorAll('.field, .form-footer, .form-status').forEach((item) => { item.hidden = true; });
    formSuccess.hidden = false;
    formSuccess.focus();
    track('generate_lead', { pakket: quoteForm.querySelector('#package')?.value || 'onbekend' });
  } catch (error) {
    formStatus.textContent = 'Versturen lukte niet. Probeer opnieuw of mail ons rechtstreeks via info@beamerij.be.';
    submitButton.disabled = false;
    submitButton.innerHTML = 'Vraag offerte aan <span aria-hidden="true">↗</span>';
  }
});

/* ---------- analytics events (Google Analytics 4 / Google Ads) ---------- */
function track(name, params) {
  if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
}
document.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link) return;
  const href = link.getAttribute('href') || '';
  if (href.includes('wa.me')) track('whatsapp_click');
  else if (href.startsWith('tel:')) track('phone_click');
  else if (href === '#contact') track('contact_cta');
}, { passive: true });
