// === ГАМБУРГЕР ===
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// === ЦИКЛІЧНА АНІМАЦІЯ КАРТОК ===
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Коли картка з'являється в полі зору
      const card = entry.target;
      const index = Array.from(card.parentElement.children).indexOf(card);
      card.style.transitionDelay = `${(index % 3) * 0.1}s`;
      card.classList.add('card-animated');
    } else {
      // Коли картка виходить за межі екрана — прибираємо клас, 
      // щоб вона могла "вилетіти" знову при наступному скролі
      entry.target.classList.remove('card-animated');
      entry.target.style.transitionDelay = '0s'; 
    }
  });
}, { 
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px' // Спрацьовує трохи раніше, ніж картка торкнеться низу
});

function refreshObserver() {
  document.querySelectorAll('.card').forEach(card => {
    cardObserver.observe(card);
  });
}

// === ТАБИ МЕНЮ ===
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Зміна активної кнопки
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Зміна панелей
    document.querySelectorAll('.menu-panel').forEach(p => {
      p.classList.remove('active');
      // Обов'язково ховаємо всі картки в неактивних табах
      p.querySelectorAll('.card').forEach(c => {
        c.classList.remove('card-animated');
      });
    });

    const activePanel = document.querySelector(`[data-panel="${btn.dataset.tab}"]`);
    if (activePanel) {
      activePanel.classList.add('active');
      // Даємо браузеру мілісекунду, щоб відмалювати панель, і запускаємо спостерігач
      setTimeout(refreshObserver, 10);
    }
  });
});

// Перший запуск
document.addEventListener('DOMContentLoaded', refreshObserver);

// === ВАЛІДАЦІЯ ФОРМИ ===
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // (Твій існуючий код форми...)
    const btn = bookingForm.querySelector('.form-btn');
    btn.textContent = 'Відправляємо...';
    setTimeout(() => {
      bookingForm.reset();
      document.getElementById('formSuccess').style.display = 'flex';
      btn.style.display = 'none';
    }, 900);
  });
}