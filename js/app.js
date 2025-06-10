const menuButton = document.getElementById('mobile_menu');
const sidebar = document.querySelector('.navi_body');
const overlay = document.createElement('div');
const menu_links = document.querySelectorAll('.navi_link');

overlay.classList.add('navi_body_overlay');
document.body.appendChild(overlay);

menuButton.addEventListener('click', function () {
    overlay.classList.toggle('active');
    menuButton.classList.toggle('active');
    sidebar.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : 'auto';
});

menu_links.forEach(link => {
    link.addEventListener('click', function () {
        menuButton.classList.remove('active');
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

overlay.addEventListener('click', function () {
    menuButton.classList.remove('active');
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

document.addEventListener('DOMContentLoaded', function() {
    const text1 = document.getElementById('text_part1');
    const text2 = document.getElementById('text_part2');
    const container = text1.parentElement;
    
    // Варианты анимации
    const animations = [
        ['animate-left', 'animate-right'],
        ['animate-right', 'animate-left'],
        ['animate-top', 'animate-bottom'],
        ['animate-bottom', 'animate-top']
    ];

    // Функция сброса анимации
    function resetAnimation() {
        text1.classList.remove('animate-left', 'animate-right', 'animate-top', 'animate-bottom');
        text2.classList.remove('animate-left', 'animate-right', 'animate-top', 'animate-bottom');
        text2.style.animationDelay = '';
    }
    // Функция применения анимации
    function applyAnimation() {
        resetAnimation();
        
        // Случайный выбор варианта анимации
        const randomIndex = Math.floor(Math.random() * animations.length);
        const [anim1, anim2] = animations[randomIndex];

        // Даем время на сброс перед повторным применением
        setTimeout(() => {
            text1.classList.add(anim1);
            text2.classList.add(anim2);
            text2.style.animationDelay = "0.4s";
        }, 50);
    }

    // Создаем наблюдатель
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                applyAnimation();
            } else {
                resetAnimation();
            }
        });
    }, { threshold: 0.3 });

    // Наблюдаем за контейнером
    observer.observe(container);
});