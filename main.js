// === HAMBURGER ===
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// === CARD ANIMATION ===
function showCards(panel) {
  const cards = panel.querySelectorAll('.card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(28px)';
    card.style.transition = 'none';
  });

  setTimeout(() => {
    cards.forEach(card => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
  }, 50);
}

// === MENU TABS ===
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');

    const panel = document.querySelector('[data-panel="' + btn.dataset.tab + '"]');
    panel.classList.add('active');
    showCards(panel);
  });
});

// === SCROLL ANIMATION (перший таб при завантаженні) ===
const firstPanel = document.querySelector('.menu-panel.active');
if (firstPanel) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        showCards(firstPanel);
        obs.disconnect();
      }
    });
  }, { threshold: 0.1 });

  observer.observe(firstPanel);
}

// === BOOKING FORM ===
const bookingForm = document.getElementById('bookingForm');
const formSuccess = document.getElementById('formSuccess');

const today = new Date().toISOString().split('T')[0];
document.getElementById('date').setAttribute('min', today);

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputs = bookingForm.querySelectorAll('input[required], select[required]');
  let valid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.classList.add('input-error');
      valid = false;
    } else {
      input.classList.remove('input-error');
    }
  });

  if (!valid) return;

  const btn = bookingForm.querySelector('.form-btn');
  btn.textContent = 'Відправляємо...';
  btn.disabled = true;

  setTimeout(() => {
    bookingForm.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
    btn.style.display = 'none';
    formSuccess.style.display = 'flex';
  }, 900);
});

bookingForm.querySelectorAll('input, select').forEach(el => {
  el.addEventListener('input', () => el.classList.remove('input-error'));
});