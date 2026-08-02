/* ================================================
   Mahim Project — Quote Form (Formspree)
   Connected to Formspree endpoint mlgqkdeo.
   ================================================ */

const FORMSPREE_ID = 'mlgqkdeo';

document.addEventListener('DOMContentLoaded', function () {

  const form        = document.getElementById('quoteForm');
  if (!form) return;

  const submitBtn   = document.getElementById('submitBtn');
  const btnLabel    = document.getElementById('btnLabel');
  const spinner     = document.getElementById('spinner');
  const formWrap    = document.getElementById('formWrap');
  const successBox  = document.getElementById('formSuccess');
  const errorBanner = document.getElementById('errorBanner');

  /* ── Inline field validation ── */
  form.querySelectorAll('[required]').forEach(f => {
    f.addEventListener('blur',  () => validate(f));
    f.addEventListener('input', () => { if (f.classList.contains('err')) validate(f); });
  });

  function validate(f) {
    const ok = f.value.trim() !== '' &&
      (f.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value));
    f.classList.toggle('err', !ok);
    return ok;
  }

  function validateAll() {
    let ok = true;
    form.querySelectorAll('[required]').forEach(f => { if (!validate(f)) ok = false; });
    return ok;
  }

  /* ── Submit ── */
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    errorBanner.classList.remove('show');

    if (!validateAll()) {
      errorBanner.textContent = 'Please fill in all required fields.';
      errorBanner.classList.add('show');
      return;
    }

    if (FORMSPREE_ID === 'YOUR_FORMSPREE_ID') {
      alert('⚙️  Setup needed:\n\nOpen assests/js/contact.js and replace YOUR_FORMSPREE_ID with your Formspree form ID.\nGet one free at formspree.io');
      return;
    }

    /* Loading */
    submitBtn.disabled = true;
    btnLabel.textContent = 'Sending…';
    spinner.style.display = 'inline-block';

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        formWrap.style.display = 'none';
        successBox.classList.add('show');
      } else {
        const d = await res.json();
        throw new Error(d.errors ? d.errors.map(x => x.message).join(', ') : 'Submission failed.');
      }
    } catch (err) {
      errorBanner.textContent = err.message || 'Could not send. Please email us directly.';
      errorBanner.classList.add('show');
      submitBtn.disabled = false;
      btnLabel.textContent = 'Send Enquiry';
      spinner.style.display = 'none';
    }
  });

  /* ── Reset ── */
  window.resetContactForm = function () {
    form.reset();
    form.querySelectorAll('.err').forEach(f => f.classList.remove('err'));
    errorBanner.classList.remove('show');
    formWrap.style.display = '';
    successBox.classList.remove('show');
    submitBtn.disabled = false;
    btnLabel.textContent = 'Send Enquiry';
    spinner.style.display = 'none';
  };

});
