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
            
            setTimeout(showCategoryFilters, 500);
        }
    }
    
    function showCategoryFilters() {
        const categoryFilters = document.querySelector('.category-filters');
        const popularProductsText = document.querySelector('.popular-products-text');
        if (categoryFilters) {
            categoryFilters.classList.add('show');
            popularProductsText.classList.add('show');
            setDefaultDrinksFilter();
        }
    }
    
    function setDefaultDrinksFilter() {
        const allItems = document.querySelectorAll('.menu-item-card');
        allItems.forEach(item => {
            item.classList.remove('visible');
        });
        
        const drinksItems = document.querySelectorAll('.menu-item-card[data-category="drinks"]');
        drinksItems.forEach(item => {
            item.classList.add('visible');
        });
        
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
    
    // Function to reset the timer
    function resetShowTimer() {
        clearTimeout(showItemsTimeout);
        if (!hasShownItems) {
            showItemsTimeout = setTimeout(showPopularItems, 4000);
        }
    }
    
    resetShowTimer();
    
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
    
    // Reviews separator scroll animation
    const reviewsSection = document.querySelector('#reviews');
    const reviewsSeparator = document.querySelector('.reviews-separator');
    let hasExpandedSeparator = false;
    
    function handleReviewsSeparatorScroll() {
        if (!reviewsSection || !reviewsSeparator) return;
        
        const reviewsSectionBottom = reviewsSection.getBoundingClientRect().bottom;
        const viewportHeight = window.innerHeight;
        
        // Check if user has scrolled past the reviews section
        if (reviewsSectionBottom < viewportHeight && !hasExpandedSeparator) {
            reviewsSeparator.classList.add('expanded');
            hasExpandedSeparator = true;
        } else if (reviewsSectionBottom >= viewportHeight && hasExpandedSeparator) {
            reviewsSeparator.classList.remove('expanded');
            hasExpandedSeparator = false;
        }
    }
    
    // Add scroll listener for reviews separator
    window.addEventListener('scroll', handleReviewsSeparatorScroll);
    
    // Initialize separator state
    handleReviewsSeparatorScroll();
    const header = document.querySelector('header');
    const contentWrapper = document.querySelector('.content-wrapper');
    let lastScrollY = window.scrollY;
    let scrollThreshold = 100;
    let contentAnimMaxScroll = 100;
    
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
                
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const targetScrollPosition = targetAbsoluteTop - headerHeight - 20;
                
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
    
    // About section image carousel with improved reliability
    // Each image has AVIF, WebP, and JPEG formats
    const aboutImages = [
        { avif: 'images/about/bokacha-cafe.avif', webp: 'images/about/bokacha-cafe.webp', jpg: 'images/about/bokacha-cafe.JPG' },
        { avif: 'images/about/bokacha-boba.avif', webp: 'images/about/bokacha-boba.webp', jpg: 'images/about/bokacha-boba.jpg' },
        { avif: 'images/about/coffee-and-cake.avif', webp: 'images/about/coffee-and-cake.webp', jpg: 'images/about/coffee-and-cake.jpg' },
        { avif: 'images/about/summer-drinks.avif', webp: 'images/about/summer-drinks.webp', jpg: 'images/about/summer-drinks.JPG' },
        { avif: 'images/about/take-away-boba.avif', webp: 'images/about/take-away-boba.webp', jpg: 'images/about/take-away-boba.jpg' },
        { avif: 'images/about/roses-and-boba-tea.avif', webp: 'images/about/roses-and-boba-tea.webp', jpg: 'images/about/roses-and-boba-tea.png' }
    ];
    
    let currentAboutImageIndex = 0;
    let autoRotateInterval;
    let imagesLoaded = false;
    let loadedImages = [];
    let failedImages = new Set();
    
    // Preload all images before initializing carousel
    // Try AVIF first, then WebP, then JPEG as final fallback
    function preloadAboutImages() {
        const loadPromises = aboutImages.map((imageSet, index) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    loadedImages[index] = img;
                    resolve(true);
                };
                img.onerror = () => {
                    failedImages.add(index);
                    resolve(false); // Resolve even on error to continue
                };
                // Try formats in order: AVIF -> WebP -> JPEG
                img.src = imageSet.avif;
                // If AVIF fails, browser will try WebP via picture element, then JPEG
            });
        });
        
        Promise.all(loadPromises).then(() => {
            imagesLoaded = true;
            initializeCarousel();
            updateDotsVisibility();
        });
    }
    
    // Helper function to update picture element sources
    function updatePictureSources(pictureEl, imageSet) {
        const sources = pictureEl.querySelectorAll('source');
        if (sources[0]) sources[0].srcset = imageSet.avif;
        if (sources[1]) sources[1].srcset = imageSet.webp;
        const img = pictureEl.querySelector('img');
        if (img) img.src = imageSet.jpg;
    }
    
    // Initialize carousel after images are loaded
    function initializeCarousel() {
        const image1 = document.getElementById('about-image-1');
        const image2 = document.getElementById('about-image-2');
        
        if (!image1 || !image2) return;
        
        // Set initial images (index 0 and 1)
        updatePictureSources(image1, aboutImages[0]);
        updatePictureSources(image2, aboutImages[1]);
        
        // Add dot click event listeners (only for about section dots)
        const dots = document.querySelectorAll('.image-carousel .dot');
        dots.forEach((dot) => {
            dot.addEventListener('click', function() {
                const imageIndex = parseInt(this.dataset.image) - 1;
                goToImage(imageIndex);
            });
        });
        
        // Start auto-rotation
        resetAutoRotate();
        
        // Initialize first dot as active
        updateActiveDot();
    }
    
    // Update dots visibility based on loaded images
    function updateDotsVisibility() {
        const dots = document.querySelectorAll('.image-carousel .dot');
        dots.forEach((dot, index) => {
            if (failedImages.has(index)) {
                dot.style.display = 'none';
            } else {
                dot.style.display = 'block';
            }
        });
    }
    
    // Get next valid image index (skips failed images)
    function getNextValidIndex(currentIndex, direction = 1) {
        let nextIndex = currentIndex + direction;
        let attempts = 0;
        
        while (attempts < aboutImages.length) {
            // Wrap around
            if (nextIndex >= aboutImages.length) nextIndex = 0;
            if (nextIndex < 0) nextIndex = aboutImages.length - 1;
            
            // Return if this image loaded successfully
            if (!failedImages.has(nextIndex)) {
                return nextIndex;
            }
            
            // Try next image
            nextIndex += direction;
            attempts++;
        }
        
        return currentIndex; // Fallback to current if all failed
    }
    
    window.changeAboutImage = function(direction) {
        if (!imagesLoaded) return;
        
        const image1 = document.getElementById('about-image-1');
        const image2 = document.getElementById('about-image-2');
        
        if (!image1 || !image2) return;
        
        // Get next valid image index
        currentAboutImageIndex = getNextValidIndex(currentAboutImageIndex, direction);
        
        // Determine which image is currently active
        const isImage1Active = image1.classList.contains('about-image-active');
        
        if (isImage1Active) {
            // Image 1 is active, prepare image 2
            image1.classList.remove('about-image-active');
            image1.classList.add('about-image-inactive');
            
            // Set new image source for image 2
            updatePictureSources(image2, aboutImages[currentAboutImageIndex]);
            
            // Wait for image to load before showing
            if (loadedImages[currentAboutImageIndex]) {
                // Image already preloaded, show immediately
                setTimeout(() => {
                    image2.classList.remove('about-image-inactive');
                    image2.classList.add('about-image-active');
                }, 50);
            } else {
                // Wait for image to load
                const imgEl = image2.querySelector('img');
                imgEl.onload = () => {
                    image2.classList.remove('about-image-inactive');
                    image2.classList.add('about-image-active');
                };
                imgEl.onerror = () => {
                    // Fallback: show the previous image again
                    image1.classList.remove('about-image-inactive');
                    image1.classList.add('about-image-active');
                };
            }
        } else {
            // Image 2 is active, prepare image 1
            image2.classList.remove('about-image-active');
            image2.classList.add('about-image-inactive');
            
            // Set new image source for image 1
            updatePictureSources(image1, aboutImages[currentAboutImageIndex]);
            
            // Wait for image to load before showing
            if (loadedImages[currentAboutImageIndex]) {
                // Image already preloaded, show immediately
                setTimeout(() => {
                    image1.classList.remove('about-image-inactive');
                    image1.classList.add('about-image-active');
                }, 50);
            } else {
                // Wait for image to load
                const imgEl = image1.querySelector('img');
                imgEl.onload = () => {
                    image1.classList.remove('about-image-inactive');
                    image1.classList.add('about-image-active');
                };
                imgEl.onerror = () => {
                    // Fallback: show the previous image again
                    image2.classList.remove('about-image-inactive');
                    image2.classList.add('about-image-active');
                };
            }
        }
        
        // Reset auto-rotate timer when user manually changes image
        resetAutoRotate();
        
        // Update active dot
        updateActiveDot();
    };
    
    function updateActiveDot() {
        const dots = document.querySelectorAll('.image-carousel .dot');
        dots.forEach((dot, index) => {
            if (index === currentAboutImageIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    function goToImage(imageIndex) {
        if (!imagesLoaded || failedImages.has(imageIndex)) return;
        
        const image1 = document.getElementById('about-image-1');
        const image2 = document.getElementById('about-image-2');
        
        if (!image1 || !image2) return;
        
        // Update current index
        currentAboutImageIndex = imageIndex;
        
        // Determine which image is currently active
        const isImage1Active = image1.classList.contains('about-image-active');
        
        if (isImage1Active) {
            // Image 1 is active, prepare image 2
            image1.classList.remove('about-image-active');
            image1.classList.add('about-image-inactive');
            
            // Set new image source for image 2
            updatePictureSources(image2, aboutImages[currentAboutImageIndex]);
            
            // Wait for image to load before showing
            if (loadedImages[currentAboutImageIndex]) {
                setTimeout(() => {
                    image2.classList.remove('about-image-inactive');
                    image2.classList.add('about-image-active');
                }, 50);
            } else {
                const imgEl = image2.querySelector('img');
                imgEl.onload = () => {
                    image2.classList.remove('about-image-inactive');
                    image2.classList.add('about-image-active');
                };
                imgEl.onerror = () => {
                    // Fallback: show the previous image again
                    image1.classList.remove('about-image-inactive');
                    image1.classList.add('about-image-active');
                };
            }
        } else {
            // Image 2 is active, prepare image 1
            image2.classList.remove('about-image-active');
            image2.classList.add('about-image-inactive');
            
            // Set new image source for image 1
            updatePictureSources(image1, aboutImages[currentAboutImageIndex]);
            
            // Wait for image to load before showing
            if (loadedImages[currentAboutImageIndex]) {
                setTimeout(() => {
                    image1.classList.remove('about-image-inactive');
                    image1.classList.add('about-image-active');
                }, 50);
            } else {
                const imgEl = image1.querySelector('img');
                imgEl.onload = () => {
                    image1.classList.remove('about-image-inactive');
                    image1.classList.add('about-image-active');
                };
                imgEl.onerror = () => {
                    // Fallback: show the previous image again
                    image2.classList.remove('about-image-inactive');
                    image2.classList.add('about-image-active');
                };
            }
        }
        
        // Reset auto-rotate timer when user manually changes image
        resetAutoRotate();
        
        // Update active dot
        updateActiveDot();
    }
    
    function autoRotateImage() {
        // Simulate clicking the next button
        changeAboutImage(1);
    }
    
    function resetAutoRotate() {
        // Clear existing interval
        if (autoRotateInterval) {
            clearInterval(autoRotateInterval);
        }
        
        // Only start auto-rotation if images are loaded and not all failed
        if (imagesLoaded && failedImages.size < aboutImages.length) {
            autoRotateInterval = setInterval(autoRotateImage, 5000);
        }
    }
    
    // Start preloading images
    preloadAboutImages();

    // Reviews carousel dot navigation
    initializeReviewsCarousel();
});

// Reviews carousel functionality with dynamic pagination
function initializeReviewsCarousel() {
    const track = document.getElementById('reviews-track');
    const dotsContainer = document.getElementById('reviews-dots');
    const carousel = document.getElementById('reviews-carousel');
    
    if (!track || !dotsContainer || !carousel) return;
    
    const cards = Array.from(track.querySelectorAll('.review-card'));
    const cardWidth = 270;
    const gap = 24; // 1.5rem = 24px
    
    let currentPageIndex = 0;
    let totalPages = 1;
    let cardsPerPage = 4;
    let reviewsAutoRotateInterval;
    
    // Calculate how many cards fit in the viewport
    function calculateCardsPerPage() {
        // Get the actual viewport width
        const containerWidth = carousel.clientWidth;
        
        // Calculate: n cards + (n-1) gaps must fit in available width
        // n * cardWidth + (n-1) * gap <= containerWidth
        // n * (cardWidth + gap) - gap <= containerWidth
        // n <= (containerWidth + gap) / (cardWidth + gap)
        const maxCards = Math.floor((containerWidth + gap) / (cardWidth + gap));
        
        return Math.max(1, Math.min(maxCards, cards.length));
    }
    
    // Create dots based on total pages needed
    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.dataset.page = i;
            dot.addEventListener('click', () => goToPage(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    // Update carousel layout
    function updateLayout() {
        cardsPerPage = calculateCardsPerPage();
        totalPages = Math.ceil(cards.length / cardsPerPage);
        
        // Ensure current page is valid
        if (currentPageIndex >= totalPages) {
            currentPageIndex = totalPages - 1;
        }
        
        createDots();
        updateTrackPosition();
    }
    
    // Slide track to show current page (centered)
    function updateTrackPosition() {
        const cardTotalWidth = cardWidth + gap;
        const containerWidth = carousel.clientWidth;
        
        // Width of visible cards on this page
        const visibleCardsWidth = cardsPerPage * cardWidth + (cardsPerPage - 1) * gap;
        
        // Calculate centering offset (to center the visible group)
        const centerOffset = (containerWidth - visibleCardsWidth) / 2;
        
        // Calculate slide offset based on current page
        const slideOffset = currentPageIndex * cardsPerPage * cardTotalWidth;
        
        // Total transform: center the group, then slide to correct page
        const totalOffset = centerOffset - slideOffset;
        
        track.style.transform = `translateX(${totalOffset}px)`;
        
        // Update active dot
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPageIndex);
        });
    }
    
    // Navigate to specific page
    function goToPage(pageIndex) {
        if (pageIndex < 0 || pageIndex >= totalPages) return;
        currentPageIndex = pageIndex;
        updateTrackPosition();
        resetReviewsAutoRotate();
    }
    
    // Auto-rotate reviews
    function reviewsAutoRotate() {
        currentPageIndex = (currentPageIndex + 1) % totalPages;
        updateTrackPosition();
    }
    
    function startReviewsAutoRotate() {
        reviewsAutoRotateInterval = setInterval(reviewsAutoRotate, 6000);
    }
    
    function stopReviewsAutoRotate() {
        clearInterval(reviewsAutoRotateInterval);
        reviewsAutoRotateInterval = null;
    }
    
    function resetReviewsAutoRotate() {
        stopReviewsAutoRotate();
        startReviewsAutoRotate();
    }
    
    // Initialize
    // Process card content (truncate long reviews, convert dates)
    const maxReviewLength = 130; // Truncate reviews longer than this
    cards.forEach(card => {
        // Truncate long reviews
        const contentEl = card.querySelector('.review-content');
        if (contentEl) {
            const originalContent = contentEl.textContent.trim();
            if (originalContent.length > maxReviewLength) {
                // Find the last space before maxLength to avoid cutting mid-word
                let truncateAt = maxReviewLength;
                while (truncateAt > 0 && originalContent[truncateAt] !== ' ') {
                    truncateAt--;
                }
                if (truncateAt === 0) truncateAt = maxReviewLength;
                contentEl.textContent = originalContent.substring(0, truncateAt).trim() + '...';
            }
        }
        
        // Convert dates to relative time
        const dateEl = card.querySelector('.review-date');
        if (dateEl) {
            const originalDate = dateEl.textContent;
            dateEl.textContent = formatRelativeTime(originalDate);
        }
    });
    
    updateLayout();
    startReviewsAutoRotate();
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateLayout, 100);
    });
    
    // Pause on hover
    const reviewsContainer = document.querySelector('.reviews-carousel-container');
    if (reviewsContainer) {
        reviewsContainer.addEventListener('mouseenter', stopReviewsAutoRotate);
        reviewsContainer.addEventListener('mouseleave', () => {
            // Only start if not already running to avoid double intervals
            if (!reviewsAutoRotateInterval) {
                startReviewsAutoRotate();
            }
        });
    }
}

// Convert date to relative time (e.g., "2 months ago", "1 year ago")
function formatRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    
    const diffMs = now - date;
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);
    
    if (diffYears >= 1) {
        return diffYears === 1 ? '1 year ago' : `${diffYears} years ago`;
    } else if (diffMonths >= 1) {
        return diffMonths === 1 ? '1 month ago' : `${diffMonths} months ago`;
    } else if (diffDays >= 1) {
        return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
    } else {
        return 'today';
    }
}

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
