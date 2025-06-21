const downloadButtons = document.querySelectorAll('.download-btn');
const modal = document.getElementById('downloadModal');
const closeBtn = document.querySelector('.close');


function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 102, 204, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${5 + Math.random() * 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
}


function scrollToFeatures() {
    const featuresSection = document.getElementById('features');
    featuresSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}


function downloadApp() {
  
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    

    event.target.classList.add('loading');
    

    setTimeout(() => {

        const link = document.createElement('a');
        link.href = './DocFlow.exe';
        link.download = 'DocFlow.exe';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
    
        event.target.classList.remove('loading');
        
      
        trackDownload();
    }, 1000);
}


function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}


function trackDownload() {

    if (typeof gtag !== 'undefined') {
        gtag('event', 'download', {
            'event_category': 'file_download',
            'event_label': 'DocFlow.exe'
        });
    }
    
    console.log('Download tracked: DocFlow.exe');
}


function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    

    document.querySelectorAll('.feature-card, .requirement-card, .download-box').forEach(el => {
        observer.observe(el);
    });
}


function setupParallaxEffect() {
    const hero = document.querySelector('.hero-visual');
    const appWindow = document.querySelector('.app-window');
    
    if (!hero || !appWindow) return;
    
    // Проверяем размер экрана для отключения параллакса на мобильных
    const isMobile = window.innerWidth <= 768;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Отключаем параллакс для мобильных и touch-устройств
    if (isMobile || isTouchDevice) {
        return;
    }
    
    let isHovering = false;
    
    hero.addEventListener('mouseenter', () => {
        isHovering = true;
    });
    
    hero.addEventListener('mouseleave', () => {
        isHovering = false;
        // Возвращаем к исходному состоянию с учетом размера экрана
        const baseTransform = getBaseTransform();
        appWindow.style.transform = baseTransform;
    });
    
    hero.addEventListener('mousemove', (e) => {
        if (!isHovering) return;
        
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Адаптивные значения поворота в зависимости от размера экрана
        const maxRotateX = window.innerWidth <= 1024 ? 5 : 10;
        const maxRotateY = window.innerWidth <= 1024 ? 8 : 15;
        
        const rotateX = (y - centerY) / centerY * maxRotateX;
        const rotateY = (centerX - x) / centerX * maxRotateY;
        
        appWindow.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    // Функция для получения базового трансформа в зависимости от размера экрана
    function getBaseTransform() {
        if (window.innerWidth <= 480) {
            return 'none';
        } else if (window.innerWidth <= 600) {
            return 'rotateY(-2deg) rotateX(0.5deg)';
        } else if (window.innerWidth <= 768) {
            return 'rotateY(-3deg) rotateX(1deg)';
        } else if (window.innerWidth <= 1024) {
            return 'rotateY(-5deg) rotateX(2deg)';
        } else if (window.innerWidth <= 1200) {
            return 'rotateY(-10deg) rotateX(3deg)';
        } else {
            return 'rotateY(-15deg) rotateX(5deg)';
        }
    }
    
    // Устанавливаем базовый трансформа при загрузке
    appWindow.style.transform = getBaseTransform();
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isPercentage = target.includes('%');
        const isMultiplier = target.includes('x');
        const isThousands = target.includes('K');
        
        let finalValue;
        if (isPercentage) {
            finalValue = parseInt(target);
        } else if (isMultiplier) {
            finalValue = parseInt(target);
        } else if (isThousands) {
            finalValue = parseInt(target);
        } else {
            finalValue = parseInt(target);
        }
        
        let current = 0;
        const increment = finalValue / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= finalValue) {
                current = finalValue;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (isPercentage) {
                counter.textContent = displayValue + '%';
            } else if (isMultiplier) {
                counter.textContent = displayValue + 'x';
            } else if (isThousands) {
                counter.textContent = displayValue + 'K+';
            } else {
                counter.textContent = displayValue;
            }
        }, 20);
    });
}


function setupNavbarScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.9)';
        }
    });
}


function setupMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const navBrand = document.querySelector('.nav-brand');

    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
    `;
    

    navBrand.parentNode.insertBefore(mobileMenuBtn, navLinks);
    

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-open');
    });
    

    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('mobile-open');
        }
    });
}


function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
 
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
        
   
        if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('download-btn')) {
            e.preventDefault();
            downloadApp();
        }
    });
}


function setupFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
       
            card.style.boxShadow = '0 20px 40px rgba(0, 102, 204, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '';
        });
    });
}


function setupSmoothNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function createRipple(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}


function setupThemeSwitcher() {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
}


function monitorPerformance() {

    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        
 
        if ('performance' in window && 'getEntriesByType' in performance) {
            const navigation = performance.getEntriesByType('navigation')[0];
            console.log('Performance metrics:', {
                dns: navigation.domainLookupEnd - navigation.domainLookupStart,
                tcp: navigation.connectEnd - navigation.connectStart,
                request: navigation.responseStart - navigation.requestStart,
                response: navigation.responseEnd - navigation.responseStart,
                dom: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart
            });
        }
    });
}


function setupErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('JavaScript error:', e.error);

    });
    
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled promise rejection:', e.reason);
        e.preventDefault();
    });
}


function setupAppTabs() {
    const tabs = document.querySelectorAll('.tab[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Убираем активный класс со всех табов
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Добавляем активный класс к выбранному табу
            tab.classList.add('active');
            
            // Показываем соответствующий контент
            const targetContent = document.getElementById(`${targetTab}-content`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Добавляем анимацию для мобильных устройств
            if (window.innerWidth <= 768) {
                targetContent.style.animation = 'fadeInUp 0.3s ease';
                setTimeout(() => {
                    targetContent.style.animation = '';
                }, 300);
            }
        });
    });
    
    // Автоматическое переключение табов для демонстрации
    if (window.innerWidth > 768) {
        let currentTabIndex = 0;
        const tabInterval = setInterval(() => {
            if (document.hidden) {
                clearInterval(tabInterval);
                return;
            }
            
            currentTabIndex = (currentTabIndex + 1) % tabs.length;
            tabs[currentTabIndex].click();
        }, 4000);
    }
}

function setupResponsiveAppPreview() {
    const appWindow = document.querySelector('.app-window');
    if (!appWindow) return;
    
    function updateAppPreview() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const isLandscape = width > height && width <= 768;
        
        // Обновляем размеры и трансформацию в зависимости от размера экрана
        if (width <= 320) {
            appWindow.style.width = '220px';
            appWindow.style.height = '300px';
            appWindow.style.transform = 'none';
        } else if (width <= 360) {
            appWindow.style.width = '240px';
            appWindow.style.height = '320px';
            appWindow.style.transform = 'none';
        } else if (width <= 480) {
            appWindow.style.width = '260px';
            appWindow.style.height = '350px';
            appWindow.style.transform = 'none';
        } else if (width <= 600) {
            appWindow.style.width = '280px';
            appWindow.style.height = '380px';
            appWindow.style.transform = 'rotateY(-2deg) rotateX(0.5deg)';
        } else if (width <= 768) {
            if (isLandscape) {
                appWindow.style.width = '280px';
                appWindow.style.height = '200px';
                appWindow.style.transform = 'rotateY(-1deg) rotateX(0.2deg)';
            } else {
                appWindow.style.width = '300px';
                appWindow.style.height = '400px';
                appWindow.style.transform = 'rotateY(-3deg) rotateX(1deg)';
            }
        } else if (width <= 1024) {
            appWindow.style.width = '350px';
            appWindow.style.height = '450px';
            appWindow.style.transform = 'rotateY(-5deg) rotateX(2deg)';
        } else if (width <= 1200) {
            appWindow.style.width = '380px';
            appWindow.style.height = '480px';
            appWindow.style.transform = 'rotateY(-10deg) rotateX(3deg)';
        } else {
            appWindow.style.width = '400px';
            appWindow.style.height = '500px';
            appWindow.style.transform = 'rotateY(-15deg) rotateX(5deg)';
        }
    }
    
    // Обновляем при загрузке и изменении размера окна
    updateAppPreview();
    window.addEventListener('resize', updateAppPreview);
    window.addEventListener('orientationchange', () => {
        setTimeout(updateAppPreview, 100);
    });
    
    // Добавляем плавную анимацию при изменении размера
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        appWindow.style.transition = 'none';
        
        resizeTimeout = setTimeout(() => {
            appWindow.style.transition = 'transform 0.3s ease';
            updateAppPreview();
        }, 100);
    });
}

function setupTouchSupport() {
    const appWindow = document.querySelector('.app-window');
    const tabs = document.querySelectorAll('.tab');
    
    if (!appWindow) return;
    
    // Добавляем поддержку touch-событий для app-window
    let touchStartX = 0;
    let touchStartY = 0;
    
    appWindow.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    
    appWindow.addEventListener('touchmove', (e) => {
        if (window.innerWidth <= 768) return; // Отключаем на мобильных
        
        e.preventDefault();
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        
        const deltaX = touchX - touchStartX;
        const deltaY = touchY - touchStartY;
        
        const rotateY = deltaX * 0.1;
        const rotateX = deltaY * 0.1;
        
        appWindow.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.02)`;
    });
    
    appWindow.addEventListener('touchend', () => {
        if (window.innerWidth <= 768) return;
        
        setTimeout(() => {
            const baseTransform = getBaseTransform();
            appWindow.style.transform = baseTransform;
        }, 300);
    });
    
    // Улучшенная поддержка touch для табов
    tabs.forEach(tab => {
        tab.addEventListener('touchstart', (e) => {
            e.preventDefault();
            tab.style.transform = 'scale(0.95)';
        });
        
        tab.addEventListener('touchend', (e) => {
            e.preventDefault();
            tab.style.transform = 'scale(1)';
            tab.click();
        });
    });
    
    function getBaseTransform() {
        const width = window.innerWidth;
        if (width <= 480) {
            return 'none';
        } else if (width <= 600) {
            return 'rotateY(-2deg) rotateX(0.5deg)';
        } else if (width <= 768) {
            return 'rotateY(-3deg) rotateX(1deg)';
        } else if (width <= 1024) {
            return 'rotateY(-5deg) rotateX(2deg)';
        } else if (width <= 1200) {
            return 'rotateY(-10deg) rotateX(3deg)';
        } else {
            return 'rotateY(-15deg) rotateX(5deg)';
        }
    }
}

function initializeApp() {
    // Основные функции
    setupScrollAnimations();
    setupParallaxEffect();
    setupNavbarScroll();
    setupSmoothNavigation();
    setupKeyboardNavigation();
    setupAppTabs();
    setupResponsiveAppPreview();
    setupTouchSupport(); // Добавляем поддержку touch
    
    // Создание элементов
    createParticles();
    setupFeatureCards();
    setupMobileMenu();
    
    // Обработчики событий
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', createRipple);
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Анимация счетчиков
    const statsSection = document.querySelector('.download-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
    
    // Дополнительные функции
    setupThemeSwitcher();
    monitorPerformance();
    setupErrorHandling();
    
    // Добавляем обработчик для prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.1s');
        document.documentElement.style.setProperty('--transition-duration', '0.1s');
    }
    
    // Добавляем обработчик для изменения ориентации
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            setupResponsiveAppPreview();
        }, 100);
    });
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

window.downloadApp = downloadApp;
window.closeModal = closeModal;
window.scrollToFeatures = scrollToFeatures;