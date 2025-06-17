
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
    
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / centerY * 10;
        const rotateY = (centerX - x) / centerX * 15;
        
        appWindow.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    hero.addEventListener('mouseleave', () => {
        appWindow.style.transform = 'rotateX(5deg) rotateY(-15deg) scale(1)';
    });
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
            

            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
    
            tab.classList.add('active');
            
     
            const targetContent = document.getElementById(`${targetTab}-content`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}


function initializeApp() {

    setupScrollAnimations();
    setupParallaxEffect();
    setupNavbarScroll();
    setupSmoothNavigation();
    setupKeyboardNavigation();
    setupAppTabs(); 
    

    createParticles();
    setupFeatureCards();
    setupMobileMenu();
    

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
    

    setupThemeSwitcher();
    monitorPerformance();
    setupErrorHandling();
}


const mobileMenuStyles = `
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block !important;
        }
        
        .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: rgba(10, 10, 10, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            padding: 2rem;
            transform: translateY(-100%);
            transition: transform 0.3s ease;
            border-top: 1px solid var(--border-color);
        }
        
        .nav-links.mobile-open {
            transform: translateY(0);
        }
        
        .nav-link {
            padding: 1rem 0;
            border-bottom: 1px solid var(--border-color);
        }
        
        .nav-link:last-child {
            border-bottom: none;
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .particle {
        animation: particleFloat 10s linear infinite;
    }
    
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

window.downloadApp = downloadApp;
window.closeModal = closeModal;
window.scrollToFeatures = scrollToFeatures;