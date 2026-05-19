export function initTracking() {
  // [SUBSTITUIR: snippet GA4]
  // window.dataLayer = window.dataLayer || [];
  // function gtag(){dataLayer.push(arguments);}
  // gtag('js', new Date());
  // gtag('config', 'G-XXXXXXXXXX');

  // [SUBSTITUIR: snippet Meta Pixel]
  // !function(f,b,e,v,n,t,s){...}(window,...,'XXXXXXXXXXXXXXXX');
  // fbq('init', 'XXXXXXXXXXXXXXXX');
  // fbq('track', 'PageView');

  document.querySelectorAll('[data-cta="whatsapp"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const label = btn.dataset.ctaLabel || 'unknown';

      if (typeof gtag !== 'undefined') {
        gtag('event', 'cta_click', {
          event_category: 'whatsapp',
          event_label: label,
        });
      }

      if (typeof fbq !== 'undefined') {
        fbq('track', 'Contact');
      }
    });
  });
}