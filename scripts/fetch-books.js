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

function displayResults(books) {
  const articles = books
    .map((book) => {
      const title = `<div class="book__title"><h4>${book.title}</h4></div>`;
      const author = `<p class="book__text book__author">Author: ${book.author}</p>`;
      const abstract = `<p class="book__text book__abstract">${book.abstract}</p>`;
      const details = `<a class="book__text book__details" href='./pages/book-details.html?isbn=${book.isbn}' class="book__text">Details<span class="visually-hidden">${book.title}</span></a>`; return `<article>${title}${author}${abstract}${details}</article>`;
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
