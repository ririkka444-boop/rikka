// Слайдер (карусель) для секции отзывов
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.slider-dots');
    
    if (!track || slides.length === 0) return;
    
    let currentIndex = 0;
    let slidesPerView = getSlidesPerView();
    let totalSlides = slides.length;
    
    function getSlidesPerView() {
        const width = window.innerWidth;
        if (width >= 1024) return 3;
        if (width >= 768) return 2;
        return 1;
    }
    
    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, idx) => {
            if (idx === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        const numberOfDots = totalSlides;
        for (let i = 0; i < numberOfDots; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateSlider();
            });
            dotsContainer.appendChild(dot);
        }
    }
    
    function getSlideWidth() {
        const container = document.querySelector('.slider-container');
        if (!container) return 0;
        const containerWidth = container.clientWidth;
        const gap = 30;
        const visibleSlides = getSlidesPerView();
        return (containerWidth - (gap * (visibleSlides - 1))) / visibleSlides;
    }
    
    function updateSlider() {
        const slideWidth = getSlideWidth();
        const gap = 30;
        const offset = currentIndex * (slideWidth + gap);
        track.style.transform = `translateX(-${offset}px)`;
        updateDots();
    }
    
    function nextSlide() {
        const maxIndex = totalSlides - getSlidesPerView();
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSlider();
    }
    
    function prevSlide() {
        const maxIndex = totalSlides - getSlidesPerView();
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex > 0 ? maxIndex : 0;
        }
        updateSlider();
    }
    
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const newSlidesPerView = getSlidesPerView();
            if (newSlidesPerView !== slidesPerView) {
                slidesPerView = newSlidesPerView;
                currentIndex = 0;
            }
            updateSlider();
        }, 150);
    });
    
    function initSlider() {
        slidesPerView = getSlidesPerView();
        totalSlides = slides.length;
        if (currentIndex > totalSlides - slidesPerView && totalSlides - slidesPerView > 0) {
            currentIndex = totalSlides - slidesPerView;
        }
        if (currentIndex < 0) currentIndex = 0;
        createDots();
        updateSlider();
    }
    
    initSlider();
    
    window.addEventListener('load', function() {
        updateSlider();
    });
    
    // Кнопка "Сделать заказ" - простой алерт для демо
    const orderBtn = document.querySelector('.order-btn');
    if (orderBtn) {
        orderBtn.addEventListener('click', () => {
            alert('Спасибо за интерес! Форма заказа откроется в ближайшее время 🌸');
        });
    }
    
    // Плавный скролл для навигации (якоря)
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Отслеживание текущего каталога для возврата из корзины
document.addEventListener('DOMContentLoaded', function() {
    let currentPage = '';
    const href = window.location.href;
    
    if (href.includes('catalog-cards.html')) {
        currentPage = 'catalog-cards.html';
    } else if (href.includes('catalog-sweet.html')) {
        currentPage = 'catalog-sweet.html';
    } else if (href.includes('catalog-sinew.html')) {
        currentPage = 'catalog-sinew.html';
    } else if (href.includes('catalog-vases.html')) {
        currentPage = 'catalog-vases.html';
    } else if (href.includes('catalog.html')) {
        currentPage = 'catalog.html';
    }
    
    if (currentPage) {
        localStorage.setItem('lastCatalogPage', currentPage);
        console.log('Сохранен каталог:', currentPage);
    }
});