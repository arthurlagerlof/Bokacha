// Main JavaScript for Bokachá Café
// Future interactive features will be added here

document.addEventListener('DOMContentLoaded', function() {
    // Import CSS variables for dynamic color access
    const rootStyles = getComputedStyle(document.documentElement);
    const headerBgRgba = rootStyles.getPropertyValue('--contrast-dark-green-rgba').trim();
    const rgbaMatch = headerBgRgba.match(/\d+/g);
    const [r, g, b] = rgbaMatch ? rgbaMatch.map(Number) : [52, 93, 77];
    
    // Initialize mobile navigation
    initializeMobileNav();
    
    // Initialize parallax effect
    initializeParallax();
    
    // Hero section animation variables
    const popularItems = document.querySelector('.popular-items');
    const woltButton = document.querySelector('.wolt-button');
    let showItemsTimeout;
    let hasShownItems = false;
    let lastActivityTime = Date.now();
    
    // Function to show popular items and move wolt button
    function showPopularItems() {
        if (!hasShownItems && popularItems && woltButton) {
            popularItems.classList.add('show');
            woltButton.classList.add('move-down');
            hasShownItems = true;
            
            // Show category filters after 0.5s delay
            setTimeout(showCategoryFilters, 500);
        }
    }
    
    // Function to show category filters and set default drinks filter
    function showCategoryFilters() {
        const categoryFilters = document.querySelector('.category-filters');
        if (categoryFilters) {
            categoryFilters.classList.add('show');
            
            // Set default drinks category (show drinks, hide bites)
            setDefaultDrinksFilter();
        }
    }
    
    // Function to set default drinks filter
    function setDefaultDrinksFilter() {
        // Remove all visible classes first
        const allItems = document.querySelectorAll('.menu-item-card');
        allItems.forEach(item => {
            item.classList.remove('visible');
        });
        
        // Show only drinks items
        const drinksItems = document.querySelectorAll('.menu-item-card[data-category="drinks"]');
        drinksItems.forEach(item => {
            item.classList.add('visible');
        });
        
        // Set active state on tea and coffee category text
        const teaText = document.querySelector('.category-text[data-category="drinks"]:nth-of-type(1)');
        const coffeeText = document.querySelector('.category-text[data-category="drinks"]:nth-of-type(3)');
        const bitesText = document.querySelector('.category-text[data-category="bites"]');
        
        if (teaText) teaText.classList.add('active');
        if (coffeeText) coffeeText.classList.add('active');
        if (bitesText) bitesText.classList.remove('active');
    }
    
    // Function to reset the timer
    function resetShowTimer() {
        clearTimeout(showItemsTimeout);
        if (!hasShownItems) {
            showItemsTimeout = setTimeout(showPopularItems, 4000);
        }
    }
    
    // Function to handle category filtering
    function handleCategoryFilter(category, clickedElement) {
        const allCategoryTexts = document.querySelectorAll('.category-text');
        const allMenuItems = document.querySelectorAll('.menu-item-card');
        
        // Remove active class from all category texts
        allCategoryTexts.forEach(text => text.classList.remove('active'));
        
        // Remove visible class from all menu items first
        allMenuItems.forEach(item => item.classList.remove('visible'));
        
        if (category === 'drinks') {
            // Show drinks items
            const drinksItems = document.querySelectorAll('.menu-item-card[data-category="drinks"]');
            drinksItems.forEach(item => {
                item.classList.add('visible');
            });
            
            // Add active class to tea and coffee
            const teaText = document.querySelector('.category-text[data-category="drinks"]:nth-of-type(1)');
            const coffeeText = document.querySelector('.category-text[data-category="drinks"]:nth-of-type(3)');
            if (teaText) teaText.classList.add('active');
            if (coffeeText) coffeeText.classList.add('active');
            
        } else if (category === 'bites') {
            // Show bites items
            const bitesItems = document.querySelectorAll('.menu-item-card[data-category="bites"]');
            bitesItems.forEach(item => {
                item.classList.add('visible');
            });
            
            // Add active class to bites
            clickedElement.classList.add('active');
        }
    }
    
    // Monitor user activity (scrolling)
    function handleActivity() {
        lastActivityTime = Date.now();
        // If user scrolls, don't show items automatically
        if (!hasShownItems) {
            clearTimeout(showItemsTimeout);
        }
    }
    
    // Check if user is still in hero section and inactive
    function checkHeroInactivity() {
        if (hasShownItems) return;
        
        const currentScrollY = window.scrollY;
        const heroHeight = window.innerHeight;
        
        // If user is still in hero section and hasn't scrolled for 4 seconds
        if (currentScrollY < heroHeight / 2) {
            const timeSinceActivity = Date.now() - lastActivityTime;
            if (timeSinceActivity >= 4000) {
                showPopularItems();
            }
        }
    }
    
    // Initialize timer on page load
    resetShowTimer();
    
    // Set up activity monitoring
    window.addEventListener('scroll', handleActivity);
    setInterval(checkHeroInactivity, 1000);
    
    // Menu item card interactions with wolt button
    const menuCards = document.querySelectorAll('.menu-item-card');
    
    menuCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (woltButton) {
                woltButton.classList.add('card-hover');
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (woltButton) {
                woltButton.classList.remove('card-hover');
            }
        });
        
        card.addEventListener('click', function() {
            if (woltButton) {
                woltButton.click();
            }
        });
    });
    
    // Header scroll hide/show functionality
    const header = document.querySelector('header');
    const contentWrapper = document.querySelector('.content-wrapper');
    let lastScrollY = window.scrollY;
    let scrollThreshold = 100; // Minimum scroll before hiding
    let contentAnimMaxScroll = 100; // Scroll distance for content animation
    
    // Set initial header background based on current scroll position
    if (header) {
        const initialScrollY = window.scrollY;
        let initialOpacity;
        
        if (initialScrollY <= 100) {
            initialOpacity = (initialScrollY / 100);
        } else {
            initialOpacity = 1;
        }
        
        header.style.background = `rgba(${r}, ${g}, ${b}, ${initialOpacity})`;
    }
    
    function handleHeaderScroll() {
        const currentScrollY = window.scrollY;
        //console.log('Scroll position:', Math.round(currentScrollY), 'px');
        
        // Header transparency animation (0-100px scroll)
        if (header && currentScrollY <= 100) {
            const opacity = (currentScrollY / 100); // Start at 0, go to 1
            header.style.background = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        } else if (header && currentScrollY > 100) {
            header.style.background = `rgba(${r}, ${g}, ${b}, 1)`;
        }
        
        // Content scroll animation (100vh to 100vh-300px, starts at 0px scroll)
        const initialTop = window.innerHeight;
        if (currentScrollY <= contentAnimMaxScroll && contentWrapper) {
            const contentOffset = initialTop - (currentScrollY / contentAnimMaxScroll) * 300;
            contentWrapper.style.top = `${Math.max(500, contentOffset)}px`;
        } else if (contentWrapper) {
            contentWrapper.style.top = `${Math.max(500, initialTop - 300)}px`;
        }
        
        // Only run if header exists
        if (!header) return;
        
        // Only hide/show after scrolling past threshold
        if (currentScrollY > scrollThreshold) {
            if (currentScrollY > lastScrollY) {
                // Scrolling down - hide header
                header.classList.add('hidden');
            } else {
                // Scrolling up - show header
                header.classList.remove('hidden');
            }
        } else {
            // At top of page - always show header
            header.classList.remove('hidden');
        }
        
        lastScrollY = currentScrollY;
    }
    
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                console.log('Clicked navigation to:', targetId);
                console.log('Target element:', targetElement);
                
                // Special handling for home section (hero is outside content wrapper)
                if (targetId === '#home') {
                    // Scroll to top of page for home
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    return;
                }
                
                // For sections inside content wrapper (about, contact)
                const targetRect = targetElement.getBoundingClientRect();
                const targetAbsoluteTop = targetRect.top + window.scrollY;
                
                console.log('Target absolute top:', targetAbsoluteTop);
                console.log('Current scroll:', window.scrollY);
                
                // Calculate the scroll position needed (no wrapper offset needed)
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const targetScrollPosition = targetAbsoluteTop - headerHeight - 20;
                
                console.log('Calculated scroll position:', targetScrollPosition);
                
                // Smooth scroll to calculated position
                window.scrollTo({
                    top: targetScrollPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY + 100;
        
        // Special handling for home section (hero)
        if (scrollPosition <= window.innerHeight / 2) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#home') {
                    link.classList.add('active');
                }
            });
            return;
        }
        
        sections.forEach(section => {
            const sectionId = section.getAttribute('id');
            
            // Skip home section as it's handled above
            if (sectionId === 'home') return;
            
            // Get the section's actual position (getBoundingClientRect already accounts for wrapper)
            const sectionRect = section.getBoundingClientRect();
            const sectionAbsoluteTop = sectionRect.top + window.scrollY;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionAbsoluteTop && scrollPosition < sectionAbsoluteTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // Add category filtering event listeners
    function initializeCategoryFilters() {
        const categoryTexts = document.querySelectorAll('.category-text');
        
        categoryTexts.forEach(text => {
            text.addEventListener('click', function(e) {
                e.preventDefault();
                const category = this.dataset.category;
                handleCategoryFilter(category, this);
            });
        });
    }
    
    // Initialize category filters when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeCategoryFilters);
    } else {
        initializeCategoryFilters();
    }
    
    // About section image carousel
    const aboutImages = [
        'images/about/1.JPG',
        'images/about/2.JPG',
        'images/about/3.JPG',
        'images/about/4.JPG',
        'images/about/5.JPG'
    ];
    
    let currentAboutImageIndex = 0;
    let autoRotateInterval;
    
    window.changeAboutImage = function(direction) {
        const image1 = document.getElementById('about-image-1');
        const image2 = document.getElementById('about-image-2');
        
        if (!image1 || !image2) return;
        
        // Calculate next image index
        currentAboutImageIndex += direction;
        
        // Wrap around if we go past the boundaries
        if (currentAboutImageIndex < 0) {
            currentAboutImageIndex = aboutImages.length - 1;
        } else if (currentAboutImageIndex >= aboutImages.length) {
            currentAboutImageIndex = 0;
        }
        
        // Determine which image is currently active
        const isImage1Active = image1.classList.contains('about-image-active');
        
        if (isImage1Active) {
            // Image 1 is active, fade it out and fade in image 2
            image1.classList.remove('about-image-active');
            image1.classList.add('about-image-inactive');
            
            // Set new image source for image 2
            image2.src = aboutImages[currentAboutImageIndex];
            
            // Fade in image 2
            setTimeout(() => {
                image2.classList.remove('about-image-inactive');
                image2.classList.add('about-image-active');
            }, 50);
        } else {
            // Image 2 is active, fade it out and fade in image 1
            image2.classList.remove('about-image-active');
            image2.classList.add('about-image-inactive');
            
            // Set new image source for image 1
            image1.src = aboutImages[currentAboutImageIndex];
            
            // Fade in image 1
            setTimeout(() => {
                image1.classList.remove('about-image-inactive');
                image1.classList.add('about-image-active');
            }, 50);
        }
        
        // Reset auto-rotate timer when user manually changes image
        resetAutoRotate();
    };
    
    function autoRotateImage() {
        // Simulate clicking the next button
        changeAboutImage(1);
    }
    
    function resetAutoRotate() {
        // Clear existing interval
        if (autoRotateInterval) {
            clearInterval(autoRotateInterval);
        }
        
        // Start new interval
        autoRotateInterval = setInterval(autoRotateImage, 5000);
    }
    
    // Start auto-rotation on page load
    resetAutoRotate();
});

// Mobile navigation functionality
function initializeMobileNav() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNavDropdown = document.querySelector('.mobile-nav-dropdown');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!mobileMenuBtn || !mobileNavDropdown) return;
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        const isOpen = mobileNavDropdown.classList.contains('show');
        
        if (isOpen) {
            mobileNavDropdown.classList.remove('show');
            mobileMenuBtn.textContent = '☰';
        } else {
            mobileNavDropdown.classList.add('show');
            mobileMenuBtn.textContent = '×';
        }
    });
    
    // Close mobile menu when link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNavDropdown.classList.remove('show');
            mobileMenuBtn.textContent = '☰';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileNavDropdown.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            mobileNavDropdown.classList.remove('show');
            mobileMenuBtn.textContent = '☰';
        }
    });
}

// Parallax effect for hero section
function initializeParallax() {
    const heroSection = document.querySelector('.hero');
    
    if (!heroSection) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5; // Adjust this value for slower/faster effect
        const yPos = -(scrolled * parallaxSpeed);
        
        heroSection.style.transform = `translateY(${yPos}px)`;
    });
}
