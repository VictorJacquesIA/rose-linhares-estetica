import { initAnimations } from './animations.js';
import { initTracking } from './tracking.js';
import { initForms } from './forms.js';
import { toggleFaq, initNavScroll, initMobileCta, initMobileMenu, initFeaturesCarousel } from './utils.js';

window.toggleFaq = toggleFaq;

document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
  initMobileCta();
  initMobileMenu();
  initFeaturesCarousel();
  initAnimations();
  initTracking();
  initForms();
});