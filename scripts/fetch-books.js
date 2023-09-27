let books;
fetch("http://localhost:4730/books")
  .then((response) => response.json())
  .then((data) => {
    books = data;
    displayResults(books);
  })
  .catch((error) => {
    console.error(error);
    const errorMessage = document.createElement("p");
    errorMessage.innerText =
      "An error occured when fetching books. Please try again later.";
    document.getElementById("content").appendChild(errorMessage);
  });

const searchInput = document.querySelector("input");
const searchStatus = document.getElementById("searchStatus");
searchInput.addEventListener("input", (e) => {
  //https://stackoverflow.com/questions/2977023/how-do-you-detect-the-clearing-of-a-search-html5-input
  let value = e.currentTarget.value;
  if (value && value.trim().length > 0) {
    searchTerm = value.trim().toLowerCase();
    const filteredBooks = books.filter((book) =>
      this.matchBook(book, searchTerm)
    );
    displayResults(filteredBooks);
    searchStatus.innerHTML = `<p role="status">We've found ${filteredBooks.length} books for "${searchTerm}"</p>`;
  } else {
    displayResults(books);
    searchStatus.innerHTML = "";
    return;
  }
});

function matchBook(book, searchTerm) {
  return Object.keys(book)
    .filter((key) => typeof book[key] === "string")
    .some((key) =>
      book[key].toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
}

function displayResults(books) {
  const articles = books
    .map((book) => {
      const title = `<div class="book__title"><h2>${book.title}</h2></div>`;
      const author = `<p class="book__text book__author">Author: ${book.author}</p>`;
      const abstract = `<p class="book__text book__abstract">${book.abstract}</p>`;
      const details = `<a class="book__text book__details" href='./pages/book-details.html?isbn=${book.isbn}' class="book__text">Details<span class="visually-hidden">${book.title}</span></a>`;
      return `<article>${title}${author}${abstract}${details}</article>`;
    })
    .join("");

  const booksElement = document.querySelector(".books");
  if (!booksElement) {
    const articleDiv = document.createElement("div");
    articleDiv.innerHTML = articles;
    articleDiv.className = "books";
    document.getElementById("content").appendChild(articleDiv);
  } else {
    booksElement.innerHTML = articles;
  }
}
