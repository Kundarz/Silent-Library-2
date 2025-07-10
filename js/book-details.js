
document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);
  const bookId = parseInt(params.get('id'));
  const book = books.find(b => b.id === bookId);

  const container = document.getElementById('book-detail');

  if (!book) {
    container.innerHTML = '<p>Book not found.</p>';
    return;
  }

  container.innerHTML = `
    <div class="book-detail-card">
      <img src="${book.image}" alt="Cover of ${book.title}" class="book-cover" />
      <div class="book-text">
        <h2>${book.title}</h2>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Published:</strong> ${book.published}</p>
        <p><strong>Genre:</strong> ${book.category}</p>
        <p>${book.description}</p>
      </div>
    </div>
  `;
});
