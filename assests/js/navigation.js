/* ================================================
   Mahim Project — Navigation + Shared JS
   ================================================ */
document.addEventListener('DOMContentLoaded', function () {

  /* ── Hamburger ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
      })
    );
  }

  /* ── Active link ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── Nav shadow on scroll ── */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (nav) nav.style.boxShadow = window.scrollY > 10
      ? '0 2px 20px rgba(26,25,22,0.08)'
      : 'none';
  }, { passive: true });

  /* ── Scroll-triggered fade-up ── */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.anim').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.anim').forEach(el => el.classList.add('in'));
  }

});
