// Style fixes for Silent Library theme consistency
class StyleFixManager {
    constructor() {
        this.themeColors = {
            primary: '#39ff14',      // neon green
            primaryDark: '#0f0f0f',  // dark background
            secondary: '#0f0f0f',    // secondary dark
            text: '#f0f0f0',         // light text
            accent: '#ff0099',       // pink accent
            cyan: '#80DEEA'          // cyan for highlights
        };
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.fixLogoIssue();
            this.fixBackButtonPosition();
            this.fixAuthorColor();
            this.fixFooterColors();
            this.fixBreadcrumbColors();
            this.fixSearchIconColor();
            this.addThemeConsistencyStyles();
        });
    }

    fixLogoIssue() {
        // Fix logo path issue - the logo might not be loading due to incorrect path
        const logo = document.querySelector('.site-logo');
        if (logo) {
            // Try different logo paths
            const possiblePaths = [
                'assets/logo.svg',
                'assets/Logo.svg',
                '../assets/logo.svg',
                '../assets/Logo.svg'
            ];
            
            let pathIndex = 0;
            const tryNextPath = () => {
                if (pathIndex < possiblePaths.length) {
                    logo.src = possiblePaths[pathIndex];
                    pathIndex++;
                } else {
                    // If no logo found, create a text logo
                    this.createTextLogo(logo);
                }
            };

            logo.addEventListener('error', tryNextPath);
            tryNextPath(); // Try first path
        }
    }

    createTextLogo(logoElement) {
        // Create a text-based logo if image fails
        const textLogo = document.createElement('div');
        textLogo.className = 'text-logo';
        textLogo.innerHTML = 'SILENT<br>LIBRARY';
        textLogo.style.cssText = `
            font-family: 'Courier New', monospace;
            font-weight: bold;
            font-size: 18px;
            color: ${this.themeColors.primary};
            text-align: center;
            line-height: 1.2;
            text-shadow: 0 0 10px ${this.themeColors.primary};
            border: 2px solid ${this.themeColors.primary};
            padding: 10px;
            border-radius: 8px;
            background: rgba(57, 255, 20, 0.1);
            min-width: 80px;
        `;
        
        logoElement.parentNode.replaceChild(textLogo, logoElement);
    }

    fixBackButtonPosition() {
        // Move back button below borrow and download buttons
        const backButton = document.querySelector('.back-button');
        const borrowButton = document.querySelector('a[href*="#"]:has(i.fa-book-reader)');
        const downloadButton = document.querySelector('a[href*="#"]:has(i.fa-download)');
        
        if (backButton && (borrowButton || downloadButton)) {
            // Find the container with borrow/download buttons
            const buttonContainer = borrowButton?.parentElement || downloadButton?.parentElement;
            if (buttonContainer) {
                // Remove back button from current position
                backButton.remove();
                
                // Create a new container for the back button
                const backButtonContainer = document.createElement('div');
                backButtonContainer.style.cssText = `
                    margin-top: 20px;
                    text-align: center;
                `;
                
                // Update back button styles
                backButton.style.cssText = `
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 24px;
                    background: rgba(128, 222, 234, 0.1);
                    color: ${this.themeColors.cyan};
                    text-decoration: none;
                    border-radius: 6px;
                    font-size: 16px;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    border: 1px solid rgba(128, 222, 234, 0.3);
                `;
                
                backButtonContainer.appendChild(backButton);
                
                // Insert after the button container
                buttonContainer.parentNode.insertBefore(backButtonContainer, buttonContainer.nextSibling);
            }
        }
    }

    fixAuthorColor() {
        // Fix author text color to follow theme
        const authorElements = document.querySelectorAll('p:contains("by "), .author, [class*="author"]');
        authorElements.forEach(element => {
            if (element.textContent.includes('by ')) {
                element.style.color = this.themeColors.cyan;
            }
        });

        // Also target specific author text patterns
        const allParagraphs = document.querySelectorAll('p');
        allParagraphs.forEach(p => {
            if (p.textContent.trim().startsWith('by ')) {
                p.style.color = this.themeColors.cyan;
            }
        });
    }

    fixFooterColors() {
        // Fix footer "Silent Library" text to follow theme
        const footerText = document.querySelector('footer p');
        if (footerText && footerText.textContent.includes('Silent Library')) {
            footerText.style.color = this.themeColors.primary;
            footerText.style.textShadow = `0 0 5px ${this.themeColors.primary}`;
        }

        // Fix all footer text
        const footerElements = document.querySelectorAll('footer p, footer a');
        footerElements.forEach(element => {
            if (element.tagName === 'P') {
                element.style.color = this.themeColors.text;
            }
            if (element.tagName === 'A') {
                element.style.color = this.themeColors.primary;
            }
        });
    }

    fixBreadcrumbColors() {
        // Fix breadcrumb colors to follow theme
        const breadcrumbItems = document.querySelectorAll('.breadcrumb-item, .breadcrumb-item a');
        breadcrumbItems.forEach(item => {
            if (item.tagName === 'A') {
                item.style.color = this.themeColors.cyan;
            } else {
                item.style.color = this.themeColors.primary;
            }
        });

        // Fix breadcrumb separators
        const breadcrumbSeparators = document.querySelectorAll('.breadcrumb-item span');
        breadcrumbSeparators.forEach(separator => {
            separator.style.color = this.themeColors.text;
        });
    }

    fixSearchIconColor() {
        // Fix search magnifying glass icon color
        const searchIcon = document.querySelector('.search-icon-btn');
        if (searchIcon) {
            searchIcon.style.color = this.themeColors.primary;
        }

        // Also fix any other search icons
        const searchIcons = document.querySelectorAll('.fa-search, .search-icon');
        searchIcons.forEach(icon => {
            icon.style.color = this.themeColors.primary;
        });
    }

    addThemeConsistencyStyles() {
        // Add comprehensive theme consistency styles
        const themeStyles = document.createElement('style');
        themeStyles.innerHTML = `
            /* Theme consistency fixes */
            .back-button:hover {
                background: rgba(128, 222, 234, 0.2) !important;
                border-color: ${this.themeColors.cyan} !important;
                color: ${this.themeColors.cyan} !important;
            }

            /* Author text styling */
            .author, [class*="author"], p:contains("by ") {
                color: ${this.themeColors.cyan} !important;
            }

            /* Footer styling */
            footer p {
                color: ${this.themeColors.text} !important;
            }

            footer p:first-child {
                color: ${this.themeColors.primary} !important;
                text-shadow: 0 0 5px ${this.themeColors.primary} !important;
            }

            footer a {
                color: ${this.themeColors.primary} !important;
                border-color: ${this.themeColors.primary} !important;
            }

            footer a:hover {
                color: ${this.themeColors.accent} !important;
                text-shadow: 0 0 8px ${this.themeColors.primary} !important;
            }

            /* Breadcrumb styling */
            .breadcrumb-item a {
                color: ${this.themeColors.cyan} !important;
            }

            .breadcrumb-item a:hover {
                color: ${this.themeColors.primary} !important;
            }

            .breadcrumb-item[aria-current="page"] {
                color: ${this.themeColors.primary} !important;
            }

            .breadcrumb-item span {
                color: ${this.themeColors.text} !important;
            }

            /* Search icon styling */
            .search-icon-btn, .search-icon-btn i {
                color: ${this.themeColors.primary} !important;
            }

            .search-icon-btn:hover {
                color: ${this.themeColors.accent} !important;
                text-shadow: 0 0 8px ${this.themeColors.primary} !important;
            }

            /* Book details page specific fixes */
            .book-details h1, .book-details h2 {
                color: ${this.themeColors.primary} !important;
            }

            .book-details .author {
                color: ${this.themeColors.cyan} !important;
                font-style: italic;
            }

            /* Genre and published info */
            .book-details p:contains("Genre:"), 
            .book-details p:contains("Published:") {
                color: ${this.themeColors.text} !important;
            }

            /* Summary text */
            .book-details p:contains("Summary:") {
                color: ${this.themeColors.primary} !important;
                font-weight: bold;
            }

            /* Quote styling */
            .book-details blockquote, 
            .book-details .quote {
                color: ${this.themeColors.cyan} !important;
                font-style: italic;
                border-left: 3px solid ${this.themeColors.primary};
                padding-left: 15px;
                margin: 20px 0;
            }

            /* Button styling consistency */
            .btn-success {
                background-color: ${this.themeColors.primary} !important;
                border-color: ${this.themeColors.primary} !important;
                color: ${this.themeColors.primaryDark} !important;
            }

            .btn-outline-light {
                border-color: ${this.themeColors.primary} !important;
                color: ${this.themeColors.primary} !important;
            }

            .btn-outline-light:hover {
                background-color: ${this.themeColors.primary} !important;
                color: ${this.themeColors.primaryDark} !important;
            }
        `;
        document.head.appendChild(themeStyles);
    }

    // Helper method to find elements containing specific text
    findElementsContaining(text) {
        const elements = [];
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        let node;
        while (node = walker.nextNode()) {
            if (node.textContent.includes(text)) {
                elements.push(node.parentElement);
            }
        }
        return elements;
    }
}

// Initialize style fix manager
const styleFixManager = new StyleFixManager();

// Export for use in other files if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StyleFixManager;
}

