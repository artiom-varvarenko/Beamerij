/* Beamerij — navigation, motion, campaign film and quote requests. */
(() => {
  'use strict';

  const root = document.documentElement;
  const body = document.body;
  const mobile = window.matchMedia('(max-width: 960px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const heroMedia = document.querySelector('[data-hero-media]');
  const heroVideo = document.querySelector('#hero-film');
  const filmDialog = document.querySelector('#film-dialog');
  const eventFilm = document.querySelector('#event-film');
  const motionToggle = document.querySelector('[data-toggle-motion]');
  const motionIcon = document.querySelector('[data-motion-icon]');
  const quoteForm = document.querySelector('#quote-form');
  const formStatus = document.querySelector('#form-status');
  const formSuccess = document.querySelector('#form-success');
  const submitButton = quoteForm?.querySelector('button[type="submit"]');
  const submitLabel = submitButton?.querySelector('[data-i18n]');
  const dateInput = document.querySelector('#date');
  const heroDateInput = document.querySelector('#hero-date');
  const packageInput = document.querySelector('#package');
  const occasionInput = document.querySelector('#occasion');
  const addonsInput = document.querySelector('#addons');
  const selectionNote = document.querySelector('#selection-note');
  const revealElements = document.querySelectorAll('[data-reveal]');

  let menuOpen = false;
  let scrollLock = null;
  let scrollBehaviorBeforePause = null;
  let userPausedMotion = false;
  let motionPaused = reducedMotion.matches;
  let revealObserver = null;
  let scrollFrame = 0;
  let heroShift = '';
  let pageLoaded = document.readyState === 'complete';
  let pageActive = true;
  let heroIntersecting = false;
  let heroFailed = false;
  let heroPlayPending = false;
  let heroPlayRequest = 0;
  let filmOpener = null;
  let backdropPointerDown = false;
  let formState = 'idle';
  let statusKey = '';

  const fallbackText = {
    'motion.pause': 'Pauzeer beweging',
    'motion.play': 'Hervat beweging',
    'form.submit': 'Verstuur mijn plan',
    'form.sending': 'Even versturen…',
    'form.error': 'Versturen lukte niet. Probeer opnieuw of mail ons rechtstreeks via info@beamerij.be.',
    'form.notconfigured': 'De formulierkoppeling is niet beschikbaar. Mail ons via info@beamerij.be.',
    'form.selection': 'Je selectie:',
    'form.clearselection': 'Wis selectie'
  };

  function text(key) {
    return (typeof window.t === 'function' && window.t(key)) || fallbackText[key] || '';
  }

  function track(name, params) {
    // Analytics must never turn a delivered request into a visible submission error.
    try {
      if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
    } catch (_) { /* Consent and analytics availability do not control the UI. */ }
  }

  function watchMedia(query, listener) {
    if (query.addEventListener) query.addEventListener('change', listener);
    else query.addListener(listener);
  }

  /* Focus and navigation never depend on a reveal animation finishing. */
  function reveal(element) {
    element.classList.add('is-in');
    revealObserver?.unobserve(element);
  }

  function revealDestination(element) {
    let ancestor = element;
    while (ancestor && ancestor !== body) {
      if (ancestor.hasAttribute('data-reveal')) {
        ancestor.style.setProperty('--reveal-delay', '0ms');
        reveal(ancestor);
      }
      ancestor = ancestor.parentElement;
    }
    element.querySelectorAll('[data-reveal]').forEach(reveal);
  }

  function focusElement(element) {
    if (!element || element.closest('[hidden], [inert]') || !element.getClientRects().length) return;
    revealDestination(element);
    if (!element.hasAttribute('tabindex') && element.tabIndex < 0) {
      element.setAttribute('tabindex', '-1');
      element.addEventListener('blur', () => element.removeAttribute('tabindex'), { once: true });
    }
    element.focus({ preventScroll: true });
  }

  function scrollToElement(element, block = 'start') {
    element?.scrollIntoView({ behavior: motionPaused ? 'instant' : 'smooth', block });
  }

  function syncScrollLock() {
    const shouldLock = menuOpen || Boolean(filmDialog?.open);
    if (shouldLock && scrollLock === null) {
      scrollLock = {
        value: body.style.getPropertyValue('overflow'),
        priority: body.style.getPropertyPriority('overflow')
      };
      body.style.setProperty('overflow', 'hidden');
    } else if (!shouldLock && scrollLock !== null) {
      if (scrollLock.value) body.style.setProperty('overflow', scrollLock.value, scrollLock.priority);
      else body.style.removeProperty('overflow');
      scrollLock = null;
    }
  }

  function menuFocusables() {
    if (!navLinks || !navToggle) return [];
    return [navToggle, ...navLinks.querySelectorAll('a[href], button, [tabindex]')]
      .filter(element => !element.disabled && element.tabIndex >= 0 && element.getClientRects().length);
  }

  function setMenu(open, returnFocus = false) {
    if (!navToggle || !navLinks) return;
    menuOpen = Boolean(open && mobile.matches && !filmDialog?.open);
    const collapsed = mobile.matches && !menuOpen;

    // Move focus before making the collapsed panel inert, including at a breakpoint change.
    if ((collapsed && navLinks.contains(document.activeElement)) || (returnFocus && mobile.matches)) {
      focusElement(navToggle);
    }
    navToggle.setAttribute('aria-expanded', String(menuOpen));
    navLinks.classList.toggle('is-open', menuOpen);
    body.classList.toggle('nav-open', menuOpen);
    navLinks.inert = collapsed;
    if (collapsed) navLinks.setAttribute('aria-hidden', 'true');
    else navLinks.removeAttribute('aria-hidden');
    if (!mobile.matches && document.activeElement === navToggle) focusElement(navLinks.querySelector('a'));
    syncScrollLock();
    syncHeroVideo();
    if (menuOpen) focusElement(navLinks.querySelector('a'));
  }

  navToggle?.addEventListener('click', () => setMenu(!menuOpen));
  document.addEventListener('pointerdown', event => {
    if (menuOpen && !navLinks.contains(event.target) && !navToggle.contains(event.target)) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (!menuOpen) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setMenu(false, true);
    } else if (event.key === 'Tab') {
      const items = menuFocusables();
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !items.includes(active))) {
        event.preventDefault();
        focusElement(last);
      } else if (!event.shiftKey && (active === last || !items.includes(active))) {
        event.preventDefault();
        focusElement(first);
      }
    }
  });
  document.addEventListener('focusin', event => {
    if (!(event.target instanceof Element)) return;
    revealDestination(event.target);
    if (menuOpen && event.target !== navToggle && !navLinks.contains(event.target)) {
      focusElement(navLinks.querySelector('a'));
    } else if (mobile.matches && !menuOpen && navLinks?.contains(event.target)) {
      focusElement(navToggle);
    }
  });

  /* Progressive reveal: content is hidden only after observing it succeeds. */
  function revealAll() {
    revealObserver?.disconnect();
    revealObserver = null;
    revealElements.forEach(element => element.classList.add('is-in'));
    root.classList.remove('motion-ready');
  }

  function initReveals() {
    if (motionPaused || !('IntersectionObserver' in window)) {
      revealAll();
      return;
    }
    document.querySelectorAll('[data-reveal-group]').forEach(group => {
      group.querySelectorAll('[data-reveal]').forEach((element, index) => {
        element.style.setProperty('--reveal-delay', `${Math.min(index, 3) * 60}ms`);
      });
    });
    try {
      revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) reveal(entry.target); });
      }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
      revealElements.forEach(element => revealObserver.observe(element));
      root.classList.add('motion-ready');
    } catch (_) {
      revealAll();
    }
  }

  function renderMotion() {
    const key = motionPaused ? 'motion.play' : 'motion.pause';
    motionToggle?.setAttribute('aria-pressed', String(motionPaused));
    motionToggle?.setAttribute('data-i18n-al', key);
    motionToggle?.setAttribute('aria-label', text(key));
    // The system preference always wins; the explicitly requested film remains available.
    if (motionToggle) motionToggle.disabled = reducedMotion.matches;
    if (motionIcon) motionIcon.textContent = motionPaused ? '▶' : 'Ⅱ';
  }

  function syncMotion() {
    const wasPaused = motionPaused;
    motionPaused = reducedMotion.matches || userPausedMotion;
    body.classList.toggle('motion-paused', motionPaused);
    if (motionPaused && scrollBehaviorBeforePause === null) {
      scrollBehaviorBeforePause = {
        value: root.style.getPropertyValue('scroll-behavior'),
        priority: root.style.getPropertyPriority('scroll-behavior')
      };
      root.style.setProperty('scroll-behavior', 'auto');
    } else if (!motionPaused && scrollBehaviorBeforePause !== null) {
      if (scrollBehaviorBeforePause.value) {
        root.style.setProperty('scroll-behavior', scrollBehaviorBeforePause.value, scrollBehaviorBeforePause.priority);
      } else root.style.removeProperty('scroll-behavior');
      scrollBehaviorBeforePause = null;
    }
    if (motionPaused) {
      revealAll();
      if (!wasPaused) eventFilm?.pause();
    }
    renderMotion();
    syncHeroVideo();
    requestScrollFrame();
  }

  motionToggle?.addEventListener('click', () => {
    if (reducedMotion.matches) return;
    userPausedMotion = !userPausedMotion;
    syncMotion();
  });
  watchMedia(reducedMotion, syncMotion);

  /* A single queued frame per scroll/resize burst, never a permanent animation loop. */
  function updateScroll() {
    scrollFrame = 0;
    const y = Math.max(0, window.scrollY);
    body.classList.toggle('is-scrolled', y > 8);
    const moving = !motionPaused && !mobile.matches && heroIntersecting && !menuOpen && !filmDialog?.open;
    const shift = `${moving ? Math.min(y * 0.06, 48).toFixed(1) : 0}px`;
    if (heroMedia && shift !== heroShift) {
      heroMedia.style.setProperty('--hero-shift', shift);
      heroShift = shift;
    }
  }

  function requestScrollFrame() {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScroll);
  }

  window.addEventListener('scroll', requestScrollFrame, { passive: true });
  window.addEventListener('resize', () => {
    setMenu(false);
    requestScrollFrame();
  }, { passive: true });
  watchMedia(mobile, () => { setMenu(false); requestScrollFrame(); });

  /* Decorative footage is optional. The local poster is always the fallback. */
  function hasOpenDialog() {
    return [...document.querySelectorAll('dialog[open], [role="dialog"]')]
      .some(dialog => !dialog.hidden && dialog.getClientRects().length);
  }

  function canPlayHero() {
    return Boolean(heroVideo && heroMedia && pageLoaded && pageActive && !document.hidden &&
      heroIntersecting && !mobile.matches && !motionPaused && !connection?.saveData &&
      !menuOpen && !heroFailed && !hasOpenDialog());
  }

  function pauseHeroVideo() {
    if (!heroVideo) return;
    if (heroPlayPending || !heroVideo.paused) {
      heroPlayRequest += 1;
      heroPlayPending = false;
      heroVideo.pause();
    }
    heroMedia?.classList.remove('is-playing');
  }

  function loadVideo(video) {
    if (!video.getAttribute('src') && video.dataset.src) video.src = video.dataset.src;
  }

  function syncHeroVideo() {
    if (!canPlayHero()) {
      pauseHeroVideo();
      return;
    }
    if (heroPlayPending || !heroVideo.paused) return;
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    loadVideo(heroVideo);
    const request = ++heroPlayRequest;
    heroPlayPending = true;
    try {
      Promise.resolve(heroVideo.play()).then(() => {
        if (request !== heroPlayRequest) return;
        heroPlayPending = false;
        if (!canPlayHero()) pauseHeroVideo();
      }).catch(error => {
        if (request !== heroPlayRequest) return;
        heroPlayPending = false;
        heroFailed = error?.name !== 'AbortError';
        heroMedia.classList.remove('is-playing');
      });
    } catch (_) {
      heroPlayPending = false;
      heroFailed = true;
      pauseHeroVideo();
    }
  }

  heroVideo?.addEventListener('playing', () => {
    if (canPlayHero()) heroMedia.classList.add('is-playing');
    else pauseHeroVideo();
  });
  heroVideo?.addEventListener('pause', () => heroMedia?.classList.remove('is-playing'));
  heroVideo?.addEventListener('error', () => { heroFailed = true; pauseHeroVideo(); });

  if (heroMedia && 'IntersectionObserver' in window) {
    try {
      const heroObserver = new IntersectionObserver(entries => {
        const entry = entries[entries.length - 1];
        heroIntersecting = entry.isIntersecting && entry.intersectionRatio >= 0.01;
        syncHeroVideo();
        requestScrollFrame();
      }, { threshold: 0.01 });
      heroObserver.observe(heroMedia);
    } catch (_) { /* Without visibility observation, keep the poster. */ }
  }
  connection?.addEventListener?.('change', syncHeroVideo);
  // Consent is a separate, non-modal dialog appended/removed by consent.js.
  if ('MutationObserver' in window) {
    new MutationObserver(syncHeroVideo).observe(body, { childList: true });
  }
  window.addEventListener('load', () => { pageLoaded = true; syncHeroVideo(); requestScrollFrame(); }, { once: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) eventFilm?.pause();
    else refreshDateMinimum();
    syncHeroVideo();
  });
  window.addEventListener('pagehide', () => { pageActive = false; pauseHeroVideo(); eventFilm?.pause(); });
  window.addEventListener('pageshow', () => {
    pageActive = true;
    refreshDateMinimum();
    syncHeroVideo();
    requestScrollFrame();
  });

  /* The atmosphere film loads only in direct response to an opening request. */
  function stopEventFilm() {
    if (!eventFilm) return;
    eventFilm.pause();
    try { eventFilm.currentTime = 0; } catch (_) { /* Metadata may not have arrived yet. */ }
  }

  function closeFilm() {
    stopEventFilm();
    if (filmDialog?.open) filmDialog.close();
  }

  document.querySelectorAll('[data-open-film]').forEach(opener => {
    opener.addEventListener('click', () => {
      if (!filmDialog || !eventFilm || filmDialog.open) return;
      if (typeof filmDialog.showModal !== 'function') {
        // Older browsers can still play the actual local film on its own page.
        window.location.assign(eventFilm.dataset.src);
        return;
      }
      filmOpener = opener;
      setMenu(false);
      filmDialog.showModal();
      syncScrollLock();
      syncHeroVideo();
      loadVideo(eventFilm);
      focusElement(filmDialog.querySelector('[data-close-film]'));
      try {
        Promise.resolve(eventFilm.play()).catch(() => { /* Native controls remain available. */ });
      } catch (_) { /* Keep the poster and native controls if playback is unavailable. */ }
    });
  });
  filmDialog?.querySelectorAll('[data-close-film]').forEach(button => button.addEventListener('click', closeFilm));
  filmDialog?.addEventListener('cancel', event => { event.preventDefault(); closeFilm(); });
  filmDialog?.addEventListener('close', () => {
    stopEventFilm();
    syncScrollLock();
    syncHeroVideo();
    focusElement(filmOpener);
    filmOpener = null;
    backdropPointerDown = false;
  });
  function isFilmBackdrop(event) {
    if (event.target !== filmDialog) return false;
    const bounds = filmDialog.getBoundingClientRect();
    return event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom;
  }
  filmDialog?.addEventListener('pointerdown', event => { backdropPointerDown = isFilmBackdrop(event); });
  filmDialog?.addEventListener('click', event => {
    if (backdropPointerDown && isFilmBackdrop(event)) closeFilm();
    backdropPointerDown = false;
  });

  /* Context choices use stable machine values; only their visible labels translate. */
  const occasionLabels = new Map([...document.querySelectorAll('[data-occasion]')]
    .map(link => [link.dataset.occasion, link.querySelector('h3')]));
  const addonLabels = new Map([...document.querySelectorAll('[data-addon]')]
    .map(link => [link.dataset.addon, link.querySelector('h3')]));
  const selectedAddons = new Set((addonsInput?.value || '').split(',').map(value => value.trim()).filter(Boolean));
  const selectionText = document.createElement('span');
  const clearSelection = document.createElement('button');
  clearSelection.type = 'button';
  clearSelection.className = 'selection-clear';
  clearSelection.setAttribute('data-i18n', 'form.clearselection');
  selectionNote?.append(selectionText, document.createTextNode(' '), clearSelection);

  function renderSelection() {
    if (!selectionNote) return;
    const labels = [];
    if (occasionInput?.value) labels.push(occasionLabels.get(occasionInput.value)?.textContent.trim() || occasionInput.value);
    selectedAddons.forEach(value => labels.push(addonLabels.get(value)?.textContent.trim() || value));
    selectionNote.hidden = formState === 'success' || !labels.length;
    selectionText.textContent = labels.length ? `${text('form.selection')} ${labels.join(' · ')}` : '';
    clearSelection.textContent = text('form.clearselection');
  }

  clearSelection.addEventListener('click', () => {
    if (occasionInput) occasionInput.value = '';
    if (addonsInput) addonsInput.value = '';
    selectedAddons.clear();
    renderSelection();
    const destination = inquiryFocus();
    focusElement(destination);
    scrollToElement(destination, 'nearest');
  });

  function refreshDateMinimum() {
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    if (dateInput) dateInput.min = today;
    if (heroDateInput) heroDateInput.min = today;
  }
  window.addEventListener('focus', refreshDateMinimum);
  dateInput?.addEventListener('focus', refreshDateMinimum);
  heroDateInput?.addEventListener('focus', refreshDateMinimum);

  function inquiryFocus() {
    if (formState === 'success') return formSuccess;
    if (formState === 'sending') return formStatus;
    return [...(quoteForm?.querySelectorAll('input[required], select[required]') || [])]
      .find(input => !input.validity.valid) || document.querySelector('#message') || quoteForm;
  }

  function goToInquiry() {
    setMenu(false);
    if (quoteForm) revealDestination(quoteForm);
    const destination = inquiryFocus();
    focusElement(destination);
    scrollToElement(destination, 'center');
  }

  function updateHash(hash) {
    if (window.location.hash === hash) return;
    try { window.history.pushState(null, '', hash); }
    catch (_) { window.location.hash = hash; }
  }

  function hashTarget(hash) {
    try { return document.getElementById(decodeURIComponent(hash.slice(1))); }
    catch (_) { return null; }
  }

  function focusHashTarget(target) {
    if (mobile.matches && !menuOpen && (target === navLinks || navLinks?.contains(target))) focusElement(navToggle);
    else focusElement(target);
  }

  document.querySelector('[data-quick-check]')?.addEventListener('submit', event => {
    event.preventDefault();
    refreshDateMinimum();
    if (!event.currentTarget.reportValidity()) return;
    if (dateInput && formState !== 'sending' && formState !== 'success') dateInput.value = heroDateInput.value;
    track('contact_cta');
    updateHash('#contact');
    goToInquiry();
  });

  document.addEventListener('click', event => {
    const link = event.target instanceof Element ? event.target.closest('a') : null;
    if (!link) return;
    const href = link.getAttribute('href') || '';
    if (href.includes('wa.me')) track('whatsapp_click');
    else if (href.startsWith('tel:')) track('phone_click');
    else if (href === '#contact') track('contact_cta');

    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
      link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    if (navLinks?.contains(link)) setMenu(false);
    if (!href.startsWith('#') || href.length < 2) return;
    const destination = hashTarget(href);
    if (!destination) return;
    event.preventDefault();
    setMenu(false);
    if (href === '#contact') {
      if (formState !== 'sending' && formState !== 'success') {
        if (link.dataset.package && packageInput) packageInput.value = link.dataset.package;
        if (link.dataset.occasion && occasionInput) occasionInput.value = link.dataset.occasion;
        if (link.dataset.addon && addonsInput) {
          selectedAddons.add(link.dataset.addon);
          addonsInput.value = [...selectedAddons].join(', ');
        }
        renderSelection();
      }
      updateHash(href);
      goToInquiry();
    } else {
      updateHash(href);
      revealDestination(destination);
      focusHashTarget(destination);
      scrollToElement(destination);
    }
  });
  window.addEventListener('hashchange', () => {
    setMenu(false);
    const destination = hashTarget(window.location.hash);
    if (destination) focusHashTarget(destination);
  });

  /* Quote, not booking: only an accepted provider response reaches the success state. */
  function renderForm() {
    const sending = formState === 'sending';
    if (submitButton) submitButton.disabled = sending || formState === 'success';
    clearSelection.disabled = sending || formState === 'success';
    if (quoteForm) quoteForm.setAttribute('aria-busy', String(sending));
    if (submitLabel) {
      const key = sending ? 'form.sending' : 'form.submit';
      submitLabel.setAttribute('data-i18n', key);
      submitLabel.textContent = text(key);
    }
    if (formStatus) {
      if (statusKey) formStatus.setAttribute('data-i18n', statusKey);
      else formStatus.removeAttribute('data-i18n');
      formStatus.textContent = statusKey ? text(statusKey) : '';
    }
  }

  function failSubmission(key) {
    formState = 'error';
    statusKey = key;
    renderForm();
    if (quoteForm?.contains(document.activeElement)) {
      focusElement(formStatus);
      scrollToElement(formStatus, 'nearest');
    }
  }

  function formEndpoint() {
    const endpoint = quoteForm.dataset.formspreeEndpoint?.trim() || quoteForm.getAttribute('action')?.trim();
    if (!endpoint) return null;
    try {
      const url = new URL(endpoint);
      return url.origin === 'https://formspree.io' && /^\/f\/[a-z\d]+\/?$/i.test(url.pathname) ? url.href : null;
    } catch (_) { return null; }
  }

  quoteForm?.addEventListener('submit', async event => {
    event.preventDefault();
    if (formState === 'sending' || formState === 'success') return;
    refreshDateMinimum();
    if (!quoteForm.reportValidity()) return;
    const endpoint = formEndpoint();
    if (!endpoint) { failSubmission('form.notconfigured'); return; }
    const data = new FormData(quoteForm);
    formState = 'sending';
    statusKey = 'form.sending';
    renderForm();
    let response;
    try {
      response = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
    } catch (_) {
      failSubmission('form.error');
      return;
    }
    if (!response.ok) { failSubmission('form.error'); return; }
    formState = 'success';
    statusKey = '';
    renderForm();
    quoteForm.classList.add('is-success');
    [...quoteForm.children].forEach(child => { child.hidden = child !== formSuccess; });
    if (!menuOpen && !filmDialog?.open) {
      focusElement(formSuccess);
      scrollToElement(formSuccess, 'center');
    }
    track('generate_lead', { pakket: data.get('pakket') || 'onbekend' });
  });

  document.addEventListener('beamerij:languagechange', () => {
    renderSelection();
    renderForm();
    renderMotion();
  });

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
  refreshDateMinimum();
  renderSelection();
  renderForm();
  setMenu(false);
  initReveals();
  syncMotion();
  if (window.location.hash) {
    const destination = hashTarget(window.location.hash);
    if (destination) focusHashTarget(destination);
  }
})();
