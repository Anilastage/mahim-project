/* ================================================
   Mahim Project — Gallery Grid + Lightbox
   Loads data/gallery.json, renders a filterable grid,
   and powers a simple click-through lightbox viewer.
   ================================================ */
document.addEventListener('DOMContentLoaded', function () {

  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  const pills   = document.querySelectorAll('.filter-pill');
  const lb      = document.getElementById('lightbox');
  const lbImg   = document.getElementById('lightboxImg');
  const lbCap   = document.getElementById('lightboxCaption');
  const lbClose = document.getElementById('lightboxClose');
  const lbPrev  = document.getElementById('lightboxPrev');
  const lbNext  = document.getElementById('lightboxNext');

  let photos = [];
  let visible = [];
  let currentIndex = 0;

  function cardHTML(p, idx) {
    return `
      <button class="gallery-item anim" data-idx="${idx}" aria-label="View ${p.title}">
        <img src="${p.thumb}" alt="${p.title}" loading="lazy">
        <span class="gallery-item-overlay">${p.title}</span>
      </button>`;
  }

  function render(list) {
    visible = list;
    grid.innerHTML = list.map(cardHTML).join('');
    grid.querySelectorAll('.gallery-item').forEach(btn => {
      btn.addEventListener('click', () => openLightbox(parseInt(btn.dataset.idx, 10)));
    });
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.08 });
      grid.querySelectorAll('.anim').forEach(el => io.observe(el));
    } else {
      grid.querySelectorAll('.anim').forEach(el => el.classList.add('in'));
    }
  }

  function openLightbox(idx) {
    currentIndex = idx;
    showCurrent();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showCurrent() {
    const p = visible[currentIndex];
    if (!p) return;
    lbImg.src = p.full;
    lbImg.alt = p.title;
    lbCap.innerHTML = `<strong>${p.title}</strong><br>${p.description}`;
  }

  function step(dir) {
    currentIndex = (currentIndex + dir + visible.length) % visible.length;
    showCurrent();
  }

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', () => step(-1));
  lbNext.addEventListener('click', () => step(1));
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });

  fetch('data/gallery.json')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load gallery.json');
      return res.json();
    })
    .then(data => {
      photos = data;
      render(photos);
    })
    .catch(err => {
      console.error(err);
      grid.innerHTML = '<p style="color:var(--muted);">Gallery could not be loaded right now. Please refresh the page.</p>';
    });

  pills.forEach(pill => {
    pill.addEventListener('click', function () {
      pills.forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      const cat = this.dataset.cat;
      render(cat === 'all' ? photos : photos.filter(p => p.category === cat));
    });
  });

});
