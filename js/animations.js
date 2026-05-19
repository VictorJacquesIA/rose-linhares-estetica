export function initHeroEntrance() {
  const pairs = [
    ['#hero-title', 50],
    ['#hero-subheadline', 170],
    ['#hero-ctas', 410],
  ];

  pairs.forEach(([sel, delay]) => {
    const el = document.querySelector(sel);
    if (!el) return;
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, delay);
  });

  document.querySelectorAll('.hero-badge').forEach((b, i) => {
    setTimeout(() => {
      b.style.opacity = '1';
      b.style.transform = 'translateY(0)';
    }, 240 + i * 80);
  });

  const img = document.getElementById('hero-image');
  if (img) {
    setTimeout(() => {
      img.style.opacity = '1';
      img.style.transform = 'translateX(0)';
    }, 130);
  }
}

export function initScrollAnimations() {
  const opts = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;

      if (el.classList.contains('reveal')) {
        el.classList.add('active');
        obs.unobserve(el);
      } else if (el.classList.contains('stagger-grid')) {
        el.classList.add('active');
        const delay = Number(el.dataset.stagger) || 80;
        Array.from(el.children).forEach((child, i) => {
          child.style.transitionDelay = `${i * delay}ms`;
          child.style.opacity = '1';
          child.style.transform = 'translateY(0)';
        });
        obs.unobserve(el);
      } else if (el.classList.contains('step-item')) {
        el.classList.add('active');
        obs.unobserve(el);
      }
    });
  }, opts);

  document.querySelectorAll('.reveal, .stagger-grid, .step-item').forEach(el => {
    observer.observe(el);
  });
}

export function initAnimations() {
  initHeroEntrance();
  initScrollAnimations();
}