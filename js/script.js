/* =========================================================
Matipa Energy - script.js
Vanilla JS only. No frameworks. No backend.
========================================================= */
(function () {
  'use strict';

  const header = document.getElementById('siteHeader');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
  }

  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');
  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    primaryNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        primaryNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const slider = document.getElementById('heroSlider');
  if (slider) {
    const slides = Array.from(slider.querySelectorAll('.slide'));
    const dotsWrap = document.getElementById('sliderDots');
    const prevBtn = document.getElementById('slidePrev');
    const nextBtn = document.getElementById('slideNext');
    let current = 0;
    let timer = null;

    const showSlide = (index) => {
      if (!slides.length) return;
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle('is-active', i === current));
      if (dotsWrap) {
        dotsWrap.querySelectorAll('button').forEach((dot, i) => dot.classList.toggle('is-active', i === current));
      }
    };

    const start = () => {
      stop();
      timer = window.setInterval(() => showSlide(current + 1), 5000);
    };
    const stop = () => { if (timer) window.clearInterval(timer); };

    if (dotsWrap && slides.length) {
      dotsWrap.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => { showSlide(i); start(); });
        dotsWrap.appendChild(dot);
      });
    }
    if (prevBtn) prevBtn.addEventListener('click', () => { showSlide(current - 1); start(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { showSlide(current + 1); start(); });
    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
    showSlide(0);
    start();
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const revealTargets = document.querySelectorAll('.section-head, .service-card, .why-item, .gallery-item, .about-media, .about-copy, .cta-wrap, .mission-card, .organization-card');
  revealTargets.forEach((el) => el.classList.add('reveal'));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }
})();
