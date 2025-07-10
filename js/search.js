// Search functionality for Silent Library
class SearchManager {
    constructor() {
        this.books = books; // Uses the books array from book-data.js
        this.searchInput = null;
        this.searchResults = null;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        document.addEventListener('DOMContentLoaded', () => {
            this.setupSearchInput();
            this.createSearchResultsContainer();
        });
    }

    setupSearchInput() {
        this.searchInput = document.querySelector('input[placeholder*="Search books"]');
        if (this.searchInput) {
            // Add event listeners for real-time search
            this.searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
            
            // Handle Enter key press
            this.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.handleSearch(e.target.value);
                }
            });

            // Add search icon functionality
            this.addSearchIcon();
        }
    }

    addSearchIcon() {
        // Create search icon button
        const searchContainer = this.searchInput.parentElement;
        searchContainer.style.position = 'relative';
        
        const searchIcon = document.createElement('button');
        searchIcon.innerHTML = '<i class="fas fa-search"></i>';
        searchIcon.className = 'search-icon-btn';
        searchIcon.style.cssText = `
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #39ff14;
            cursor: pointer;
            font-size: 16px;
            z-index: 10;
            transition: all 0.3s ease;
        `;
        
        searchIcon.addEventListener('click', () => {
            this.handleSearch(this.searchInput.value);
        });
        
        searchContainer.appendChild(searchIcon);
    }

    createSearchResultsContainer() {
        // Create search results container
        this.searchResults = document.createElement('div');
        this.searchResults.id = 'search-results';
        this.searchResults.className = 'search-results-container';
        this.searchResults.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #1a1a1a;
            border: 1px solid #80DEEA;
            border-radius: 8px;
            max-height: 400px;
            overflow-y: auto;
            z-index: 1000;
            display: none;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        `;

        // Insert after search input container
        const searchContainer = this.searchInput.parentElement;
        searchContainer.style.position = 'relative';
        searchContainer.appendChild(this.searchResults);

        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchContainer.contains(e.target)) {
                this.hideSearchResults();
            }
        });
    }

    handleSearch(query) {
        if (!query || query.trim().length < 2) {
            this.hideSearchResults();
            return;
        }

        const results = this.searchBooks(query.trim());
        this.displaySearchResults(results, query);
    }

    searchBooks(query) {
        const searchTerm = query.toLowerCase();
        
        return this.books.filter(book => {
            return (
                book.title.toLowerCase().includes(searchTerm) ||
                book.author.toLowerCase().includes(searchTerm) ||
                book.category.toLowerCase().includes(searchTerm) ||
                book.description.toLowerCase().includes(searchTerm)
            );
        });
    }

    displaySearchResults(results, query) {
        if (results.length === 0) {
            this.searchResults.innerHTML = `
                <div class="search-no-results">
                    <p style="padding: 20px; text-align: center; color: #ccc;">
                        No books found for "${query}"
                    </p>
                </div>
            `;
        } else {
            this.searchResults.innerHTML = `
                <div class="search-results-header">
                    <p style="padding: 10px 15px; margin: 0; color: #80DEEA; font-weight: bold; border-bottom: 1px solid #333;">
                        Found ${results.length} book${results.length !== 1 ? 's' : ''} for "${query}"
                    </p>
                </div>
                <div class="search-results-list">
                    ${results.map(book => this.createSearchResultItem(book)).join('')}
                </div>
            `;
        }
        
        this.showSearchResults();
    }

    createSearchResultItem(book) {
        return `
            <div class="search-result-item" style="
                padding: 15px;
                border-bottom: 1px solid #333;
                cursor: pointer;
                transition: background-color 0.2s;
            " onmouseover="this.style.backgroundColor='#2a2a2a'" 
               onmouseout="this.style.backgroundColor='transparent'"
               onclick="window.location.href='book-${book.id}.html'">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <img src="${book.image}" alt="${book.title}" style="
                        width: 50px;
                        height: 70px;
                        object-fit: cover;
                        border-radius: 4px;
                    ">
                    <div style="flex: 1;">
                        <h4 style="margin: 0 0 5px 0; color: #80DEEA; font-size: 16px;">${book.title}</h4>
                        <p style="margin: 0 0 5px 0; color: #ccc; font-size: 14px;">by ${book.author}</p>
                        <p style="margin: 0; color: #999; font-size: 12px;">${book.category}</p>
                    </div>
                </div>
            </div>
        `;
    }

    showSearchResults() {
        this.searchResults.style.display = 'block';
    }

    hideSearchResults() {
        this.searchResults.style.display = 'none';
    }

    // Method to redirect to search results page (for future enhancement)
    redirectToSearchPage(query) {
        // Store search query in sessionStorage for search results page
        sessionStorage.setItem('searchQuery', query);
        window.location.href = 'search-results.html';
    }
}

// Initialize search manager
const searchManager = new SearchManager();

// Export for use in other files if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SearchManager;
}

