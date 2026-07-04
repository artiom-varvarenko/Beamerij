/* ============================================================
   Beamerij — interactions
   Replace FORMSPREE_ENDPOINT with the URL Formspree supplies,
   e.g. https://formspree.io/f/xxxxabcd.
   ============================================================ */
const formspreeEndpoint = 'https://formspree.io/f/xvzjogpb';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const mqMobile = window.matchMedia('(max-width: 700px)');

const root = document.documentElement;
const body = document.body;
const announce = document.querySelector('[data-announce]');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const toTop = document.querySelector('[data-to-top]');

/* ---------- announcement bar height (drives header offset) ---------- */
function syncAnnounceHeight() {
  if (announce) root.style.setProperty('--announce-h', announce.offsetHeight + 'px');
}
syncAnnounceHeight();
window.addEventListener('resize', syncAnnounceHeight, { passive: true });
window.addEventListener('load', syncAnnounceHeight);

/* ---------- single rAF-driven scroll loop ---------- */
let ticking = false;
let lastY = window.scrollY;
function onScrollFrame() {
  const y = window.scrollY;

  body.classList.toggle('is-scrolled', y > 8);
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
  ticking = false;
}
function requestScroll() { if (!ticking) { ticking = true; requestAnimationFrame(onScrollFrame); } }
window.addEventListener('scroll', requestScroll, { passive: true });
window.addEventListener('resize', requestScroll, { passive: true });
onScrollFrame();

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

/* ---------- reveal-on-scroll + staggered groups ---------- */
const revealEls = document.querySelectorAll('[data-reveal], .reveal');
document.querySelectorAll('[data-reveal-group]').forEach((group) => {
  group.querySelectorAll('[data-reveal]').forEach((kid, i) => {
    kid.style.transitionDelay = (i * 0.06).toFixed(2) + 's';
  });
});

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealEls.forEach((el) => el.classList.add(el.hasAttribute('data-reveal') ? 'is-in' : 'is-visible'));
} else {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add(entry.target.hasAttribute('data-reveal') ? 'is-in' : 'is-visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  revealEls.forEach((el) => observer.observe(el));
}

/* ---------- back to top ---------- */
toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' }));

/* ---------- form niceties ---------- */
const dateInput = document.querySelector('#date');
const heroDateInput = document.querySelector('#hero-date');
{
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const today = now.toISOString().slice(0, 10);
  if (dateInput) dateInput.min = today;
  if (heroDateInput) heroDateInput.min = today;
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

/* ---------- hero availability check: prefill the form & jump to it ---------- */
const quickCheck = document.querySelector('[data-quick-check]');
quickCheck?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (heroDateInput?.value && dateInput) dateInput.value = heroDateInput.value;
  track('contact_cta');
  document.querySelector('#contact')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  window.setTimeout(() => document.querySelector('#name')?.focus({ preventScroll: true }), reducedMotion ? 0 : 500);
});

/* ---------- package buttons pre-select their package in the form ---------- */
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[data-package]');
  if (!link) return;
  const select = document.querySelector('#package');
  if (select) select.value = link.dataset.package;
});

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
    formStatus.textContent = (window.t && window.t('form.notconfigured')) || 'De formulierkoppeling is nog niet ingesteld. Mail ons intussen via info@beamerij.be.';
    return;
  }
  const submitButton = quoteForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = (window.t && window.t('form.sending')) || 'Even versturen…';
  try {
    const response = await fetch(endpoint, { method: 'POST', body: new FormData(quoteForm), headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('Form submission failed');
    quoteForm.querySelectorAll('.field, .form-footer, .form-status').forEach((item) => { item.hidden = true; });
    formSuccess.hidden = false;
    formSuccess.focus();
    track('generate_lead', { pakket: quoteForm.querySelector('#package')?.value || 'onbekend' });
  } catch (error) {
    formStatus.textContent = (window.t && window.t('form.error')) || 'Versturen lukte niet. Probeer opnieuw of mail ons rechtstreeks via info@beamerij.be.';
    submitButton.disabled = false;
    submitButton.textContent = (window.t && window.t('form.submit')) || 'Vraag vrijblijvend je offerte';
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
