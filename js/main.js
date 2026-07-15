/**
 * Main JavaScript - Core functionality for TKIS Website
 */

// ===== PRELOADER =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hide');
    }, 800);
});

// ===== INITIALIZE AFTER SECTIONS LOAD =====
document.addEventListener('sectionsLoaded', () => {
    initAOS();
    initHeroSwiper();
    initAchieverSwiper();
    initCounters();
    initSmoothScroll();
    initNavbarScroll();
    initLightbox();
});

// ===== AOS ANIMATIONS =====
function initAOS() {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        delay: 50
    });
}

// ===== HERO SWIPER =====
function initHeroSwiper() {
    const heroEl = document.querySelector('.heroSwiper');
    if (!heroEl) return;
    
    new Swiper('.heroSwiper', {
        loop: true,
        autoplay: { 
            delay: 5000, 
            disableOnInteraction: false 
        },
        effect: 'fade',
        fadeEffect: { crossFade: true },
        speed: 1000,
        pagination: { 
            el: '.swiper-pagination', 
            clickable: true 
        },
        navigation: { 
            nextEl: '.swiper-button-next', 
            prevEl: '.swiper-button-prev' 
        }
    });
}

// ===== ACHIEVER SWIPER =====
function initAchieverSwiper() {
    const achieverEl = document.querySelector('.achieverSwiper');
    if (!achieverEl) return;
    
    new Swiper('.achieverSwiper', {
        loop: true,
        autoplay: { 
            delay: 3000, 
            disableOnInteraction: false 
        },
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: { 
            el: '.swiper-pagination', 
            clickable: true 
        },
        breakpoints: {
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 }
        }
    });
}

// ===== COUNTER ANIMATION =====
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (counters.length === 0) return;
    
    const speed = 200;
    
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace(/\D/g, '');
            const inc = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                requestAnimationFrame(animateCounters);
            } else {
                counter.innerText = target + (target > 100 ? '+' : '');
            }
        });
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    const statsRow = counters[0].closest('.row');
    if (statsRow) observer.observe(statsRow);
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    
    if (!navbar || !backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            backToTop.classList.add('show');
        } else {
            navbar.classList.remove('scrolled');
            backToTop.classList.remove('show');
        }
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
}

// ===== LIGHTBOX =====
function initLightbox() {
    window.openLightbox = function(element) {
        const img = element.querySelector('img');
        if (!img) return;
        
        const lightboxImg = document.getElementById('lightboxImg');
        if (lightboxImg) {
            lightboxImg.src = img.src;
            const modal = new bootstrap.Modal(document.getElementById('lightboxModal'));
            modal.show();
        }
    };
}

// ===== LAZY LOAD IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ===== SERVICE WORKER (Optional PWA support) =====
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('js/sw.js').catch(() => {
        // Silent fail - SW is optional
    });
}
