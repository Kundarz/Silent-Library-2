// Mobile Optimization enhancements for Silent Library
class MobileOptimizationManager {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.optimizeForMobile();
            this.addTouchEnhancements();
            this.optimizeNavigation();
            this.optimizeSearchForMobile();
        });
    }

    optimizeForMobile() {
        // Add mobile-specific CSS enhancements
        this.addMobileStyles();
        
        // Optimize images for mobile
        this.optimizeImages();
        
        // Enhance touch targets
        this.enhanceTouchTargets();
    }

    addMobileStyles() {
        const mobileStyles = document.createElement('style');
        mobileStyles.innerHTML = `
            /* Mobile-specific optimizations */
            @media (max-width: 768px) {
                /* Header optimizations */
                header {
                    flex-direction: column;
                    gap: 10px;
                    padding: 10px 15px;
                }
                
                .header-left {
                    justify-content: center;
                    width: 100%;
                }
                
                .search-bar {
                    width: 100%;
                    order: 3;
                }
                
                .search-bar input {
                    width: 100%;
                    padding: 12px 45px 12px 15px;
                    font-size: 16px; /* Prevents zoom on iOS */
                }
                
                .nav-links {
                    width: 100%;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                
                .nav-links a {
                    padding: 10px 15px;
                    min-height: 44px; /* Apple's recommended touch target */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                /* Hero section optimizations */
                .hero {
                    padding: 40px 20px;
                    text-align: center;
                }
                
                .hero h1 {
                    font-size: 2rem;
                    line-height: 1.2;
                }
                
                .hero p {
                    font-size: 1rem;
                    line-height: 1.5;
                }
                
                /* Card section optimizations */
                .card-section {
                    flex-direction: column;
                    padding: 20px 15px;
                    gap: 20px;
                }
                
                .info-card {
                    width: 100%;
                    padding: 20px;
                }
                
                /* Book grid optimizations */
                .book-grid {
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 15px;
                    padding: 15px;
                }
                
                .book-item {
                    padding: 15px;
                }
                
                .book-item img {
                    max-width: 100%;
                    height: auto;
                }
                
                /* Button optimizations */
                .btn {
                    min-height: 44px;
                    padding: 12px 20px;
                    font-size: 16px;
                    touch-action: manipulation;
                }
                
                /* Search results mobile optimization */
                .search-results-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    max-height: none;
                    border-radius: 0;
                    z-index: 9999;
                    background: #1a1a1a;
                }
                
                .search-result-item {
                    padding: 20px 15px;
                    border-bottom: 1px solid #333;
                }
                
                .search-result-item img {
                    width: 60px;
                    height: 80px;
                }
                
                /* Back button mobile optimization */
                .back-button {
                    padding: 12px 16px;
                    font-size: 16px;
                    min-height: 44px;
                }
                
                /* Footer optimizations */
                footer {
                    padding: 20px 15px;
                }
                
                .footer-container {
                    flex-direction: column;
                    gap: 20px;
                    text-align: center;
                }
                
                .footer-links {
                    flex-direction: column;
                    gap: 15px;
                }
                
                .footer-links a {
                    padding: 10px;
                    min-height: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                /* Breadcrumb mobile optimization */
                .breadcrumb {
                    flex-wrap: wrap;
                    font-size: 14px;
                }
                
                /* Form optimizations */
                input, textarea, select {
                    font-size: 16px; /* Prevents zoom on iOS */
                    padding: 12px;
                    min-height: 44px;
                }
            }
            
            /* Touch-specific optimizations */
            @media (hover: none) and (pointer: coarse) {
                .book-item:hover,
                .search-result-item:hover {
                    background-color: transparent;
                }
                
                .book-item:active,
                .search-result-item:active {
                    background-color: #2a2a2a;
                    transform: scale(0.98);
                    transition: all 0.1s ease;
                }
            }
        `;
        document.head.appendChild(mobileStyles);
    }

    optimizeImages() {
        // Add lazy loading for images on mobile
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Add error handling for missing images
            img.addEventListener('error', () => {
                img.style.display = 'none';
            });
        });
    }

    enhanceTouchTargets() {
        // Ensure all interactive elements meet minimum touch target size
        const interactiveElements = document.querySelectorAll('a, button, input, select, textarea');
        
        interactiveElements.forEach(element => {
            const computedStyle = window.getComputedStyle(element);
            const minSize = 44; // Apple's recommended minimum
            
            if (parseInt(computedStyle.height) < minSize) {
                element.style.minHeight = minSize + 'px';
                element.style.display = 'flex';
                element.style.alignItems = 'center';
                element.style.justifyContent = 'center';
            }
        });
    }

    addTouchEnhancements() {
        // Add touch feedback for interactive elements
        const touchElements = document.querySelectorAll('.book-item, .search-result-item, .btn');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.opacity = '0.7';
            });
            
            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.style.opacity = '1';
                }, 100);
            });
            
            element.addEventListener('touchcancel', () => {
                element.style.opacity = '1';
            });
        });
    }

    optimizeNavigation() {
        // Add mobile hamburger menu if needed
        if (window.innerWidth <= 768) {
            this.addMobileMenu();
        }
        
        // Handle orientation changes
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleOrientationChange();
            }, 100);
        });
    }

    addMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        if (!navLinks) return;
        
        // Create hamburger button
        const hamburgerBtn = document.createElement('button');
        hamburgerBtn.className = 'mobile-menu-toggle';
        hamburgerBtn.innerHTML = '<i class="fas fa-bars"></i>';
        hamburgerBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: #80DEEA;
            font-size: 24px;
            padding: 10px;
            cursor: pointer;
            min-height: 44px;
            min-width: 44px;
        `;
        
        // Add mobile menu functionality
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-menu-open');
            const icon = hamburgerBtn.querySelector('i');
            icon.className = navLinks.classList.contains('mobile-menu-open') 
                ? 'fas fa-times' 
                : 'fas fa-bars';
        });
        
        // Insert hamburger button
        const header = document.querySelector('header');
        if (header) {
            header.insertBefore(hamburgerBtn, navLinks);
        }
        
        // Add mobile menu styles
        const mobileMenuStyles = document.createElement('style');
        mobileMenuStyles.innerHTML = `
            @media (max-width: 768px) {
                .mobile-menu-toggle {
                    display: block !important;
                }
                
                .nav-links {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: #1a1a1a;
                    border-top: 1px solid #333;
                    flex-direction: column;
                    padding: 20px;
                    z-index: 1000;
                }
                
                .nav-links.mobile-menu-open {
                    display: flex;
                }
                
                .nav-links a {
                    width: 100%;
                    text-align: center;
                    padding: 15px;
                    border-bottom: 1px solid #333;
                }
                
                .nav-links a:last-child {
                    border-bottom: none;
                }
            }
        `;
        document.head.appendChild(mobileMenuStyles);
    }

    optimizeSearchForMobile() {
        // Make search results full-screen on mobile
        const searchResults = document.querySelector('#search-results');
        if (searchResults && window.innerWidth <= 768) {
            // Add close button for mobile search
            const closeButton = document.createElement('button');
            closeButton.innerHTML = '<i class="fas fa-times"></i> Close';
            closeButton.className = 'mobile-search-close';
            closeButton.style.cssText = `
                position: sticky;
                top: 0;
                width: 100%;
                padding: 15px;
                background: #333;
                color: #80DEEA;
                border: none;
                font-size: 16px;
                cursor: pointer;
                z-index: 10;
            `;
            
            closeButton.addEventListener('click', () => {
                searchResults.style.display = 'none';
                document.querySelector('input[placeholder*="Search books"]').value = '';
            });
            
            // Insert close button when search results are shown
            const originalShowResults = searchResults.style.display;
            const observer = new MutationObserver(() => {
                if (searchResults.style.display === 'block' && !searchResults.querySelector('.mobile-search-close')) {
                    searchResults.insertBefore(closeButton, searchResults.firstChild);
                }
            });
            
            observer.observe(searchResults, { attributes: true, attributeFilter: ['style'] });
        }
    }

    handleOrientationChange() {
        // Recalculate layouts after orientation change
        const searchResults = document.querySelector('#search-results');
        if (searchResults && searchResults.style.display === 'block') {
            // Refresh search results layout
            searchResults.style.display = 'none';
            setTimeout(() => {
                searchResults.style.display = 'block';
            }, 50);
        }
    }

    // Method to detect if user is on mobile device
    isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               window.innerWidth <= 768;
    }

    // Method to optimize performance on mobile
    optimizePerformance() {
        if (this.isMobileDevice()) {
            // Reduce animations on mobile for better performance
            const style = document.createElement('style');
            style.innerHTML = `
                @media (max-width: 768px) {
                    *, *::before, *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize mobile optimization manager
const mobileOptimizationManager = new MobileOptimizationManager();

// Export for use in other files if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MobileOptimizationManager;
}

