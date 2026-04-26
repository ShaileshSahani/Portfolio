/* ================================================================
   SHAILESH SAHANI — PORTFOLIO SCRIPTS
   script.js · v3.0
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────────
     NAVBAR — Scroll shadow + active link highlight
     ────────────────────────────────────────────── */
  const nav = document.getElementById('nav');

  const handleNavScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // Active nav link based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link-item[href^="#"]');

  const updateActiveLink = () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });


  /* ──────────────────────────────────────────────
     SCROLL REVEAL — Intersection Observer
     ────────────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), index * 65);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


  /* ──────────────────────────────────────────────
     SKILL BAR ANIMATION
     ────────────────────────────────────────────── */
  const allBars = document.querySelectorAll('.bar-fill, .cert-fill');
  const barWidths = new Map();

  // Store original widths and reset to 0
  allBars.forEach(bar => {
    barWidths.set(bar, bar.style.width);
    bar.style.width = '0';
  });

  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll('.bar-fill, .cert-fill');
          bars.forEach((bar, i) => {
            setTimeout(() => {
              bar.style.width = barWidths.get(bar) || '0';
            }, i * 120 + 180);
          });
          barObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll('.skill-card, .cert-row').forEach(el => barObserver.observe(el));


  /* ──────────────────────────────────────────────
     SMOOTH SCROLL
     ────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 82;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });

        // Close Bootstrap mobile menu if open
        const mobileMenu = document.getElementById('navMenu');
        if (mobileMenu?.classList.contains('show')) {
          bootstrap.Collapse.getInstance(mobileMenu)?.hide();
        }
      }
    });
  });


  /* ──────────────────────────────────────────────
     CONTACT FORM — Simulated send
     ────────────────────────────────────────────── */
  const form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn  = form.querySelector('button[type="submit"]');
      const successMsg = document.getElementById('formSuccess');

      // Loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin me-2"></i>Sending...';

      // Simulate network delay
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Sent!';
        submitBtn.style.background = '#10b981';

        successMsg?.classList.remove('d-none');

        // Reset after 4s
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
          submitBtn.style.background = '';
          form.reset();
          successMsg?.classList.add('d-none');
        }, 4000);
      }, 1300);
    });
  }


  /* ──────────────────────────────────────────────
     HERO ENTRY ANIMATIONS — Staggered fade-in
     ────────────────────────────────────────────── */
  const animateIn = (selector, delay, yOffset = 12) => {
    const el = document.querySelector(selector);
    if (!el) return;

    el.style.cssText = `
      opacity: 0;
      transform: translateY(${yOffset}px);
      transition: opacity 0.65s ease, transform 0.65s ease;
    `;

    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, delay);
  };

  animateIn('.hero-badge',   80,  8);
  animateIn('.hero-name',   210, 22);
  animateIn('.hero-roles',  390, 10);
  animateIn('.hero-tagline',520, 10);
  animateIn('.hero-actions',660, 10);
  animateIn('.hero-stats',  820,  6);
  animateIn('.hero-profile',320, 20);

});