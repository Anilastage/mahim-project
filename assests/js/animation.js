/* ================================================
   Mahim Project — Number Count-up Animation
   Animates elements with [data-count-to] once they
   scroll into view (used for stat numbers).
   ================================================ */
document.addEventListener('DOMContentLoaded', function () {

  const counters = document.querySelectorAll('[data-count-to]');
  if (!counters.length) return;

  function animateCount(el) {
    const target = parseFloat(el.dataset.countTo);
    const suffix = el.dataset.countSuffix || '';
    const duration = 900;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(el => io.observe(el));
  } else {
    counters.forEach(el => { el.textContent = el.dataset.countTo + (el.dataset.countSuffix || ''); });
  }

});
