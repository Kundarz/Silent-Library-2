// Back Navigation functionality for Silent Library
class BackNavigationManager {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.addBackButtons();
            this.addBreadcrumbs();
        });
    }

    addBackButtons() {
        // Add back buttons to book detail pages
        if (this.isBookDetailPage()) {
            this.addBookDetailBackButton();
        }
        
        // Add back buttons to event detail pages
        if (this.isEventDetailPage()) {
            this.addEventDetailBackButton();
        }

        // Add back buttons to other detail pages
        if (this.isOtherDetailPage()) {
            this.addGenericBackButton();
        }
    }

    isBookDetailPage() {
        return window.location.pathname.includes('book-') && 
               window.location.pathname.includes('.html');
    }

    isEventDetailPage() {
        return window.location.pathname.includes('event-') && 
               window.location.pathname.includes('.html');
    }

    isOtherDetailPage() {
        const detailPages = ['about.html', 'contact.html', 'policy.html', 'sitemap.html', 'login.html'];
        return detailPages.some(page => window.location.pathname.includes(page));
    }

    addBookDetailBackButton() {
        const header = document.querySelector('header');
        if (header) {
            const backButton = this.createBackButton('← Back to Collection', 'digital-collection.html');
            this.insertBackButton(header, backButton);
        }
    }

    addEventDetailBackButton() {
        const header = document.querySelector('header');
        if (header) {
            const backButton = this.createBackButton('← Back to Events', 'events.html');
            this.insertBackButton(header, backButton);
        }
    }

    addGenericBackButton() {
        const header = document.querySelector('header');
        if (header) {
            const backButton = this.createBackButton('← Back to Home', 'index.html');
            this.insertBackButton(header, backButton);
        }
    }

    createBackButton(text, href) {
        const backButton = document.createElement('a');
        backButton.href = href;
        backButton.className = 'back-button';
        backButton.innerHTML = text;
        backButton.style.cssText = `
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            background: rgba(57, 255, 20, 0.1);
            color: #39ff14;
            text-decoration: none;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s ease;
            border: 1px solid rgba(57, 255, 20, 0.3);
            margin-right: 15px;
        `;

        // Add hover effects
        backButton.addEventListener('mouseenter', () => {
            backButton.style.background = 'rgba(57, 255, 20, 0.2)';
            backButton.style.borderColor = '#39ff14';
        });

        backButton.addEventListener('mouseleave', () => {
            backButton.style.background = 'rgba(57, 255, 20, 0.1)';
            backButton.style.borderColor = 'rgba(57, 255, 20, 0.3)';
        });

        return backButton;
    }

    insertBackButton(header, backButton) {
        // Find the page title area or create one
        let titleArea = header.querySelector('.page-title');
        if (!titleArea) {
            titleArea = header.querySelector('.header-left');
        }

        if (titleArea) {
            // Insert back button at the beginning of the title area
            titleArea.insertBefore(backButton, titleArea.firstChild);
        }
    }

    addBreadcrumbs() {
        // Add breadcrumb navigation for better context
        const breadcrumbContainer = this.createBreadcrumbContainer();
        if (breadcrumbContainer) {
            const main = document.querySelector('main') || document.querySelector('.container');
            if (main) {
                main.insertBefore(breadcrumbContainer, main.firstChild);
            }
        }
    }

    createBreadcrumbContainer() {
        const currentPage = this.getCurrentPageInfo();
        if (!currentPage.breadcrumbs || currentPage.breadcrumbs.length <= 1) {
            return null;
        }

        const breadcrumbNav = document.createElement('nav');
        breadcrumbNav.setAttribute('aria-label', 'breadcrumb');
        breadcrumbNav.style.cssText = `
            padding: 15px 0;
            margin-bottom: 20px;
        `;

        const breadcrumbList = document.createElement('ol');
        breadcrumbList.className = 'breadcrumb';
        breadcrumbList.style.cssText = `
            background: none;
            padding: 0;
            margin: 0;
            list-style: none;
            display: flex;
            align-items: center;
            gap: 8px;
        `;

        currentPage.breadcrumbs.forEach((crumb, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'breadcrumb-item';
            
            if (index === currentPage.breadcrumbs.length - 1) {
                // Current page - no link
                listItem.innerHTML = crumb.text;
                listItem.style.color = '#39ff14';
                listItem.setAttribute('aria-current', 'page');
            } else {
                // Previous pages - with links
                const link = document.createElement('a');
                link.href = crumb.href;
                link.innerHTML = crumb.text;
                link.style.cssText = `
                    color: #80DEEA;
                    text-decoration: none;
                    transition: color 0.3s ease;
                `;
                link.addEventListener('mouseenter', () => link.style.color = '#39ff14');
                link.addEventListener('mouseleave', () => link.style.color = '#80DEEA');
                
                listItem.appendChild(link);
            }

            // Add separator except for last item
            if (index < currentPage.breadcrumbs.length - 1) {
                const separator = document.createElement('span');
                separator.innerHTML = ' / ';
                separator.style.color = '#666';
                listItem.appendChild(separator);
            }

            breadcrumbList.appendChild(listItem);
        });

        breadcrumbNav.appendChild(breadcrumbList);
        return breadcrumbNav;
    }

    getCurrentPageInfo() {
        const pathname = window.location.pathname;
        const filename = pathname.split('/').pop();

        // Define breadcrumb structures for different page types
        if (filename.startsWith('book-')) {
            return {
                breadcrumbs: [
                    { text: 'Home', href: 'index.html' },
                    { text: 'Digital Collection', href: 'digital-collection.html' },
                    { text: 'Book Details', href: '#' }
                ]
            };
        }

        if (filename.startsWith('event-')) {
            return {
                breadcrumbs: [
                    { text: 'Home', href: 'index.html' },
                    { text: 'Events', href: 'events.html' },
                    { text: 'Event Details', href: '#' }
                ]
            };
        }

        if (filename === 'digital-collection.html') {
            return {
                breadcrumbs: [
                    { text: 'Home', href: 'index.html' },
                    { text: 'Digital Collection', href: '#' }
                ]
            };
        }

        if (filename === 'events.html') {
            return {
                breadcrumbs: [
                    { text: 'Home', href: 'index.html' },
                    { text: 'Events', href: '#' }
                ]
            };
        }

        if (filename === 'about.html') {
            return {
                breadcrumbs: [
                    { text: 'Home', href: 'index.html' },
                    { text: 'About', href: '#' }
                ]
            };
        }

        if (filename === 'contact.html') {
            return {
                breadcrumbs: [
                    { text: 'Home', href: 'index.html' },
                    { text: 'Contact', href: '#' }
                ]
            };
        }

        // Default - no breadcrumbs for home page and other pages
        return { breadcrumbs: [] };
    }

    // Method to handle browser back button enhancement
    enhanceBrowserBackButton() {
        // Store navigation history for better back button behavior
        const navigationHistory = JSON.parse(sessionStorage.getItem('navigationHistory') || '[]');
        
        // Add current page to history
        const currentPage = {
            url: window.location.href,
            title: document.title,
            timestamp: Date.now()
        };
        
        navigationHistory.push(currentPage);
        
        // Keep only last 10 pages
        if (navigationHistory.length > 10) {
            navigationHistory.shift();
        }
        
        sessionStorage.setItem('navigationHistory', JSON.stringify(navigationHistory));
    }
}

// Initialize back navigation manager
const backNavigationManager = new BackNavigationManager();

// Export for use in other files if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BackNavigationManager;
}

