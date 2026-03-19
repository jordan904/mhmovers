(() => {
  'use strict';

  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      nav.classList.remove('open');
    });
  });

  // Header scroll effect
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Animate stat numbers on scroll
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;

    const statsSection = document.querySelector('.stats-row');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top > window.innerHeight * 0.85) return;

    statsAnimated = true;

    statNumbers.forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      const duration = 1800;
      const start = performance.now();

      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(target * eased).toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = target.toLocaleString();
        }
      }

      requestAnimationFrame(tick);
    });
  }

  window.addEventListener('scroll', animateStats, { passive: true });
  animateStats();

  // Fade-in on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(
    '.service-card, .feature, .testimonial-card, .step, .area-tag, .gallery-item'
  ).forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity .5s ease ${i % 8 * .06}s, transform .5s ease ${i % 8 * .06}s`;
    fadeObserver.observe(el);
  });

  const style = document.createElement('style');
  style.textContent = `
    .service-card.visible, .feature.visible, .testimonial-card.visible,
    .step.visible, .area-tag.visible, .gallery-item.visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // Contact form handling
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    console.log('Form submission:', data);

    form.innerHTML = `
      <div class="form-success">
        <h3>Thank You!</h3>
        <p>We've received your request and will get back to you shortly with your free quote. You can also call or text us at <strong>(902) 440-1378</strong>.</p>
      </div>
    `;
  });
})();
