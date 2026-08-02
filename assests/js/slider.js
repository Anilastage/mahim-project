/* ================================================
   Mahim Project — Lightweight Slider / Carousel
   Used on project-details.html (and reusable anywhere
   a container of `.slide` elements needs prev/next + dots)
   ================================================ */
window.initSlider = function (containerSelector, count) {
  const container = document.querySelector(containerSelector);
  if (!container || count < 1) return;

  const slides = container.querySelectorAll('.slide');
  const dotsWrap = container.querySelector('#pdDots') || container.querySelector('.slider-dots');
  let current = 0;

  function go(i) {
    slides.forEach((s, idx) => { s.style.display = (idx === i) ? '' : 'none'; });
    if (dotsWrap) {
      dotsWrap.querySelectorAll('.dot-btn').forEach((d, idx) => {
        d.style.background = (idx === i) ? 'var(--blue)' : 'var(--border)';
      });
    }
    current = i;
  }

  if (count > 1) {
    // Nav arrows
    const prev = document.createElement('button');
    prev.innerHTML = '&#8592;';
    prev.setAttribute('aria-label', 'Previous image');
    prev.style.cssText = 'position:absolute;left:10px;top:50%;transform:translateY(-50%);width:36px;height:36px;border-radius:50%;border:none;background:rgba(255,255,255,0.9);box-shadow:var(--shadow-sm);cursor:pointer;font-size:1rem;';
    const next = document.createElement('button');
    next.innerHTML = '&#8594;';
    next.setAttribute('aria-label', 'Next image');
    next.style.cssText = 'position:absolute;right:10px;top:50%;transform:translateY(-50%);width:36px;height:36px;border-radius:50%;border:none;background:rgba(255,255,255,0.9);box-shadow:var(--shadow-sm);cursor:pointer;font-size:1rem;';
    container.appendChild(prev);
    container.appendChild(next);

    prev.addEventListener('click', () => go((current - 1 + count) % count));
    next.addEventListener('click', () => go((current + 1) % count));

    if (dotsWrap) {
      for (let i = 0; i < count; i++) {
        const dot = document.createElement('button');
        dot.className = 'dot-btn';
        dot.setAttribute('aria-label', 'Go to image ' + (i + 1));
        dot.style.cssText = 'width:8px;height:8px;border-radius:50%;border:none;cursor:pointer;background:' + (i === 0 ? 'var(--blue)' : 'var(--border)') + ';';
        dot.addEventListener('click', () => go(i));
        dotsWrap.appendChild(dot);
      }
    }
  }

  go(0);
};
