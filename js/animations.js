// Animation JavaScript for Bokachá 

class BokachaAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupScrollAnimations();
        this.setupMenuAnimations();
        this.setupParallax();
    }
    
    setupScrollAnimations() {
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
        
        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.menu-item, .contact-item, .about-title, .about-text, .contact-title');
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    setupMenuAnimations() {
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    setupParallax() {
        const heroSection = document.querySelector('.hero');
        
        if (heroSection) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallax = heroSection.querySelector('.hero-content');
                
                if (parallax) {
                    // Use transform for parallax but ensure proper stacking
                    parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
                    parallax.style.willChange = 'transform';
                }
            });
        }
    }
    
    // Add fade-in animation to elements
    fadeIn(element, duration = 1000) {
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease-in-out`;
        
        setTimeout(() => {
            element.style.opacity = '1';
        }, 100);
    }
    
    // Add bounce animation to buttons
    bounceAnimation(element) {
        element.style.animation = 'bounce 0.6s ease-in-out';
        
        setTimeout(() => {
            element.style.animation = '';
        }, 600);
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.bokachaAnimations = new BokachaAnimations();
});

// Add CSS animations dynamically
const animationStyles = `
@keyframes bounce {
    0%, 20%, 60%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    80% { transform: translateY(-5px); }
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);
