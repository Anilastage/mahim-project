/* ================================================
   Mahim Project — Projects Grid + Filter
   Loads data/projects.json, renders cards, and
   filters them by the pill buttons in projects.html
   ================================================ */
document.addEventListener('DOMContentLoaded', function () {

  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  const pills = document.querySelectorAll('.filter-pill');
  let allProjects = [];

  function cardHTML(p) {
    return `
    <a class="project-card anim" data-type="${p.type}" href="project-details.html?id=${encodeURIComponent(p.id)}">
      <div class="project-card-img">
        <img src="${p.cover}" alt="${p.title}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">
      </div>
      <div class="project-card-body">
        <div class="project-card-type">${p.typeLabel} &middot; ${p.status}</div>
        <div class="project-card-title">${p.title}</div>
        <div class="project-card-tags">
          <span class="tag">${p.location}</span>
          <span class="tag">${p.period}</span>
        </div>
      </div>
    </a>`;
  }

  function render(list) {
    grid.innerHTML = list.map(cardHTML).join('');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.1 });
      grid.querySelectorAll('.anim').forEach(el => io.observe(el));
    } else {
      grid.querySelectorAll('.anim').forEach(el => el.classList.add('in'));
    }
  }

  fetch('data/projects.json')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load projects.json');
      return res.json();
    })
    .then(data => {
      allProjects = data;
      render(allProjects);
    })
    .catch(err => {
      console.error(err);
      grid.innerHTML = '<p style="color:var(--muted);">Projects could not be loaded right now. Please refresh, or contact us directly for our project portfolio.</p>';
    });

  pills.forEach(pill => {
    pill.addEventListener('click', function () {
      pills.forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      const f = this.dataset.filter;
      const filtered = (f === 'all') ? allProjects : allProjects.filter(p => p.type === f);
      render(filtered);
    });
  });

});
