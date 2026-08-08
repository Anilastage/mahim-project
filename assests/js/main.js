/* ================================================
   Mahim Project — Site-wide Init
   Footer year, back-to-top button.
   ================================================ */
document.addEventListener('DOMContentLoaded', function () {

  /* ── Footer year ── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── External links open safely in a new tab ── */
  document.querySelectorAll('a[href^="http"]').forEach(a => {
    if (!a.href.includes(window.location.hostname)) {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    }
  });

});
