// Навигация и мобильное меню
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Закрыть меню при клике на ссылку
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Плавная прокрутка для якорей
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Печатающийся текст
const typingText = document.querySelector('.typing-text');
const words = ['QA Engineer', 'Software Tester', 'API Tester', 'Manual Tester'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, 100);
    }
}

// Запускаем печатающийся текст
if (typingText) {
    typeEffect();
}

// Анимация цифр в статистике
const statNumbers = document.querySelectorAll('.stat-number');

function animateNumbers() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = parseInt(stat.innerText);
        const increment = target / 50; // Делим на 50 шагов
        
        if (current < target) {
            current = Math.min(current + increment, target);
            stat.innerText = Math.round(current);
            setTimeout(animateNumbers, 20);
        } else {
            stat.innerText = target;
        }
    });
}

// Запускаем анимацию цифр когда секция видна
const aboutSection = document.getElementById('about');
let animated = false;

function checkAboutSection() {
    if (!animated && aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top <= windowHeight * 0.75) {
            animateNumbers();
            animated = true;
        }
    }
}

window.addEventListener('scroll', checkAboutSection);
checkAboutSection(); // Проверяем при загрузке

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Добавляем анимацию для карточек
document.querySelectorAll('.skill-category, .portfolio-item, .education-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Форма обратной связи
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Здесь можно добавить отправку формы на сервер
        // Пока просто покажем сообщение
        alert('Спасибо за сообщение! Я свяжусь с вами в ближайшее время.');
        contactForm.reset();
    });
}

// Подсветка активного пункта меню при скролле
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

function highlightNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNav);

// Добавляем класс active для текущей ссылки в CSS
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--primary-color);
    }
    .nav-menu a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Параллакс эффект для hero секции
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.scrollY;
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Предотвращаем мерцание при загрузке
window.addEventListener('load', () => {
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
});

// Обработка resize для мобильного меню
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Добавляем кнопку "Наверх"
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '↑';
scrollBtn.className = 'scroll-top';
scrollBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--gradient);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 24px;
    opacity: 0;
    transition: opacity 0.3s, transform 0.3s;
    z-index: 999;
`;

document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollBtn.style.opacity = '1';
        scrollBtn.style.transform = 'translateY(0)';
    } else {
        scrollBtn.style.opacity = '0';
        scrollBtn.style.transform = 'translateY(20px)';
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Добавляем эффект свечения при наведении на карточки
document.querySelectorAll('.skill-category, .portfolio-item, .education-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
    });
});

// Добавляем стили для эффекта свечения
const glowStyle = document.createElement('style');
glowStyle.textContent = `
    .skill-category, .portfolio-item, .education-card {
        position: relative;
        overflow: hidden;
    }
    
    .skill-category::after, .portfolio-item::after, .education-card::after {
        content: '';
        position: absolute;
        top: var(--y, 50%);
        left: var(--x, 50%);
        width: 0;
        height: 0;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0, 255, 136, 0.2) 0%, transparent 70%);
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
        pointer-events: none;
    }
    
    .skill-category:hover::after, .portfolio-item:hover::after, .education-card:hover::after {
        width: 300px;
        height: 300px;
    }
`;
document.head.appendChild(glowStyle);