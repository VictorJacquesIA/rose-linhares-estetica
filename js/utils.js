export function toggleFaq(button) {
  const item = button.parentElement;
  const body = button.nextElementSibling;
  const isExpanded = button.getAttribute('aria-expanded') === 'true';

  document.querySelectorAll('.faq-item.active').forEach(faq => {
    if (faq !== item) {
      faq.classList.remove('active');
      faq.querySelector('button').setAttribute('aria-expanded', 'false');
      faq.querySelector('.faq-item__body').style.maxHeight = '0';
    }
  });

  if (isExpanded) {
    item.classList.remove('active');
    button.setAttribute('aria-expanded', 'false');
    body.style.maxHeight = '0';
  } else {
    item.classList.add('active');
    button.setAttribute('aria-expanded', 'true');
    body.style.maxHeight = body.scrollHeight + 'px';
  }
}

export function initNavScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

export function initMobileCta() {
  const cta = document.getElementById('mobile-sticky-cta');
  if (!cta) return;
  window.addEventListener('scroll', () => {
    cta.classList.toggle('visible', window.scrollY > window.innerHeight * 0.8);
  }, { passive: true });
}

export function initFeaturesCarousel() {
  const grid = document.querySelector('.features-grid');
  const dots = document.querySelectorAll('.features-dot');
  if (!grid || !dots.length) return;

  const items = grid.querySelectorAll('.feature-item');

  const updateDots = () => {
    const gridLeft = grid.getBoundingClientRect().left;
    let activeIndex = 0;
    let minDist = Infinity;
    items.forEach((item, i) => {
      const dist = Math.abs(item.getBoundingClientRect().left - gridLeft);
      if (dist < minDist) { minDist = dist; activeIndex = i; }
    });
    dots.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));
  };

  const hint = document.querySelector('.carousel-hint');

  grid.addEventListener('scroll', () => {
    updateDots();
    if (hint && grid.scrollLeft > 20) hint.classList.add('hidden');
  }, { passive: true });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      const item = items[i];
      if (!item) return;
      const scrollLeft = item.getBoundingClientRect().left - grid.getBoundingClientRect().left + grid.scrollLeft;
      grid.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    });
  });
}

export function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const overlay = document.getElementById('mobile-overlay');
  if (!toggle || !overlay) return;

  toggle.addEventListener('click', () => {
    const isOpen = overlay.classList.contains('open');
    overlay.classList.toggle('open', !isOpen);
    toggle.classList.toggle('active', !isOpen);
    toggle.setAttribute('aria-expanded', String(!isOpen));
    overlay.setAttribute('aria-hidden', String(isOpen));
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  overlay.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      overlay.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });
}