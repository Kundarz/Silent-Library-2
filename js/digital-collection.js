
document.addEventListener("DOMContentLoaded", function () {
  const books = [
    { id: 1, title: "The Little Prince", author: "Antoine de Saint-Exupéry", published: "1943", category: "Story / Children", image: "../assets/book1.jpg", description: "A poetic and philosophical tale about friendship and love." },
    { id: 2, title: "Introduction to Algorithms", author: "Cormen et al.", published: "2009", category: "Academic / Computer Science", image: "../assets/book2.jpg", description: "Guide to algorithms and data structures." },
    { id: 3, title: "Sapiens", author: "Yuval Noah Harari", published: "2011", category: "History / Philosophy", image: "../assets/book3.jpg", description: "Narrative of human history and civilization." },
    { id: 4, title: "Discovering Dinosaurs", author: "Dr. Jane Smith", published: "2016", category: "Discovery / Educational", image: "../assets/book4.jpg", description: "Colorful journey through the world of dinosaurs." },
    { id: 5, title: "Neuromancer", author: "William Gibson", published: "1984", category: "Cyberpunk / Sci-Fi", image: "../assets/book5.jpg", description: "A classic of the cyberpunk genre." },
    { id: 6, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", published: "2011", category: "Psychology / Non-fiction", image: "../assets/book6.jpg", description: "How we think and make decisions." },
    { id: 7, title: "The Martian", author: "Andy Weir", published: "2014", category: "Science Fiction / Survival", image: "../assets/book7.jpg", description: "An astronaut's fight for survival on Mars." },
    { id: 8, title: "The Design of Everyday Things", author: "Don Norman", published: "1988", category: "Design / Usability", image: "../assets/book8.jpg", description: "Smart design improves our lives." },
    { id: 9, title: "Hidden Figures", author: "Margot Lee Shetterly", published: "2016", category: "History / Biography", image: "../assets/book9.jpg", description: "The untold story of NASA mathematicians." },
    { id: 10, title: "Astrophysics for People in a Hurry", author: "Neil deGrasse Tyson", published: "2017", category: "Science / Space", image: "../assets/book10.jpg", description: "Quick dive into the cosmos." },
    { id: 11, title: "1984", author: "George Orwell", published: "1949", category: "Dystopian / Political Fiction", image: "../assets/book11.jpg", description: "Totalitarianism and surveillance." },
    { id: 12, title: "Dune", author: "Frank Herbert", published: "1965", category: "Science Fiction / Epic", image: "../assets/book12.jpg", description: "Politics, prophecy, and spice." },
    { id: 13, title: "Educated", author: "Tara Westover", published: "2018", category: "Memoir / Education", image: "../assets/book13.jpg", description: "Escape from a survivalist family." },
    { id: 14, title: "The Power of Habit", author: "Charles Duhigg", published: "2012", category: "Self-help / Psychology", image: "../assets/book14.jpg", description: "Understanding and changing habits." }
  ];

  const grid = document.getElementById('book-grid');

  books.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
      <a href="book-details.html?id=${book.id}" class="book-link">
        <img src="${book.image}" alt="Cover of ${book.title}" />
        <div class="book-info">
          <h3>${book.title}</h3>
          <p><strong>Author:</strong> ${book.author}</p>
          <hr>
          <p><strong>Published:</strong> ${book.published}</p>
          <hr>
          <p><strong>Genre:</strong> ${book.category}</p>
          <hr>
          <p>${book.description}</p>
        </div>
      </a>
    `;
    grid.appendChild(card);
  });
});
