import '@splidejs/splide/dist/css/splide-core.min.css';
import '../scss/style.scss';
import Splide from '@splidejs/splide';

document.getElementById('appoinment-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = document.querySelectorAll('input');
  document.getElementById('name-error').innerText = '';
  document.getElementById('phone-error').innerText = '';
  document.getElementById('email-error').innerText = '';
  document.getElementById('success-message').innerText = '';

  let isValid = true;

  fields.forEach((field) => {
    if (!field.value.trim()) {
      isValid = false;
      field.classList.add('is-invalid'); // Добавляем класс для визуального обозначения
    } else {
      field.classList.remove('is-invalid'); // Удаляем класс, если поле заполнено
    }
  });
  // Валидация имени
  const name = document.getElementById('name').value;
  if (name.trim() === '') {
    document.getElementById('name-error').innerText = 'field cannot be empty';
    isValid = false;
  }

  // Валидация телефона (пример для формата +7(999)999-99-99)
  const phone = document.getElementById('phone').value;
  const phonePattern = /^\+7\d{10}$/;
  if (!phonePattern.test(phone)) {
    document.getElementById('phone-error').innerText = 'the correct phone format +79999999999';
    isValid = false;
  }

  const email = document.getElementById('email').value;
  const emailPattern = /^\S+@\S+\.\S+$/;
  if (!emailPattern.test(email)) {
    document.getElementById('email-error').innerText = 'incorrect email format';
    isValid = false;
  }

  if (isValid) {
    document.getElementById('success-message').innerText = 'The form has been successfully submitted!';
    document.getElementById('appoinment-form').reset();
    setTimeout(() => {
      document.getElementById('success-message').innerText = '';
    }, 1000);

    // + fetch или XMLHttpRequest
  }
});

// Этот код  скрывает эл-ты (+ hide), когда они не на экране полезно для опт-ции отображением эл-тов
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('hide', !entry.isIntersecting);
      if (entry.isIntersecting) observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.7,
  },
);

const configSplideSpeakers = {
  type: 'slide',
  perPage: 3,
  autoplay: false,
  pagination: false,
  arrows: false,

  gap: '20px',
  breakpoints: {
    1200: {
      perPage: 2,
      pagination: false,
      arrows: true,
      gap: '20px',

    },
    640: {
      perPage: 1,
      gap: '0px',
    },
  },

};
function initSplide() {
  const sliderSpeakers = new Splide('#slider-speakers', configSplideSpeakers);
  sliderSpeakers.mount();
}

function initAnimation() {
  const targets = document.querySelectorAll('.js-animate');

  targets.forEach((target) => {
    target.classList.remove('js-animate');
    target.classList.add('hide');

    setTimeout(() => {
      observer.observe(target);
    }, 500);
  });
}
/**
* Обработчик события DOMContentLoaded.
* @returns {void}
*/
function handleDOMContentLoaded() {
  const burger = document.getElementById('burger');
  const headerButton = document.getElementById('header-button');
  const nav = document.getElementById('desktop-nav');
  const headerLink = nav.querySelectorAll('a');
  const { body } = document;
  const scrollBtn = document.getElementById('scroll-top-btn');

  burger.addEventListener('click', () => {
    headerButton.classList.toggle('active'); // Переключаем класс для навигации
    nav.classList.toggle('active'); // Переключаем класс для навигации
    burger.classList.toggle('active'); // Переключаем класс для бургер-кнопки

    body.style.overflow = nav.classList.contains('active') ? 'hidden' : 'auto'; // Скрываем/показываем скролл
    if (nav.classList.contains('active')) {
      headerButton.addEventListener('click', () => {
        headerButton.classList.remove('active'); // Переключаем класс для навигации
        nav.classList.remove('active'); // Переключаем класс для навигации
        burger.classList.remove('active'); // Переключаем класс для бургер-кнопки
        body.style.overflow = 'auto'; // Скрываем/показываем скролл
      });
      headerLink.forEach((link) => {
        link.addEventListener('click', () => {
          headerButton.classList.remove('active'); // Переключаем класс для навигации
          nav.classList.remove('active'); // Переключаем класс для навигации
          burger.classList.remove('active'); // Переключаем класс для бургер-кнопки
          body.style.overflow = 'auto'; // Скрываем/показываем скролл
        });
      });
    }
  });
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.style.display = 'flex';
    } else {
      scrollBtn.style.display = 'none';
    }
  });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  initSplide();
  initAnimation();
}

window.addEventListener('DOMContentLoaded', () => handleDOMContentLoaded(), { once: true });
