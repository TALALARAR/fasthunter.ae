(function () {
  'use strict';

  // ---- Navbar: solid on scroll + progress bar + back-to-top ----
  var nav = document.querySelector('.navbar');
  var bar = document.getElementById('progress');
  var topBtn = document.getElementById('to-top');
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle('scrolled', y > 40);
    if (bar) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
    if (topBtn) topBtn.classList.toggle('show', y > 600);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---- Reveal on scroll ----
  var items = document.querySelectorAll('.reveal:not(.in)');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // ---- Active nav link on scroll ----
  var links = document.querySelectorAll('.navbar .nav-link[href^="#"]');
  var map = [];
  links.forEach(function (a) {
    var s = document.querySelector(a.getAttribute('href'));
    if (s) map.push({ a: a, s: s });
  });
  if (map.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          map.forEach(function (m) { m.a.classList.toggle('active', m.s === e.target); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    map.forEach(function (m) { spy.observe(m.s); });
  }

  // ---- Close mobile menu after clicking a link ----
  document.querySelectorAll('#nav .nav-link, #nav .btn').forEach(function (a) {
    a.addEventListener('click', function () {
      var el = document.getElementById('nav');
      if (el && el.classList.contains('show') && window.bootstrap) {
        window.bootstrap.Collapse.getOrCreateInstance(el).hide();
      }
    });
  });

  // ---- Service "book" links preselect the service ----
  var serviceSel = document.getElementById('serviceType-field');
  document.querySelectorAll('[data-service]').forEach(function (a) {
    a.addEventListener('click', function () {
      if (serviceSel) serviceSel.value = a.getAttribute('data-service');
    });
  });

  // ---- Booking -> WhatsApp ----
  var form = document.getElementById('booking-form');
  var success = document.getElementById('booking-success');
  var dateField = document.getElementById('date-field');
  if (dateField) dateField.min = new Date().toISOString().split('T')[0];

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var L = (document.body.getAttribute('data-msg') || 'Hello Fast Hunter!|Name|Phone|Email|Service|Date|Notes').split('|');
      var v = function (id) { return (document.getElementById(id).value || '').trim(); };
      var sel = serviceSel.options[serviceSel.selectedIndex];
      var lines = [
        L[0],
        L[1] + ': ' + v('name-field'),
        L[2] + ': ' + v('phone-field'),
        v('email-field') ? L[3] + ': ' + v('email-field') : null,
        L[4] + ': ' + (sel ? sel.text : ''),
        L[5] + ': ' + v('date-field'),
        v('specialRequest-field') ? L[6] + ': ' + v('specialRequest-field') : null
      ].filter(Boolean);
      var url = 'https://wa.me/971568363321?text=' + encodeURIComponent(lines.join('\n'));
      window.open(url, '_blank', 'noopener');
      if (success) success.classList.remove('d-none');
    });
  }

  // ---- Year ----
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
