
import { getByIsbn } from "./books-store.js";

const params = new URLSearchParams(location.search);
const isbn = params.get("isbn");
const root = document.getElementById("details-root");

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderStars(selected) {
  return Array.from({ length: 5 }, (_, i) => {
    const n = i + 1;
    const filled = n <= selected ? " is-filled" : "";
    return `<input type="radio" name="rating" value="${n}" id="rating${n}" ${n === selected ? "checked" : ""} />
<label for="rating${n}" class="${filled.trim()}"><span class="visually-hidden">${n} star${n === 1 ? "" : "s"}</span></label>`;
  }).join("");
}

function paintFilled(selected) {
  document.querySelectorAll(".star-rating label").forEach((label, i) => {
    label.classList.toggle("is-filled", i < selected);
  });
}

if (!isbn) {
  root.innerHTML = `<div class="details-missing"><h1>Book not found</h1><p><a href="books.html">Back to books</a></p></div>`;
} else {
  const book = await getByIsbn(isbn);
  if (!book) {
    document.title = "Book Details";
    root.innerHTML = `<div class="details-missing"><h1>Book not found</h1><p><a href="books.html">Back to books</a></p></div>`;
  } else {
    document.title = book.title;
    const alt = book.cover ? `Cover of ${escapeHtml(book.title)}` : "";
    root.innerHTML = `
<div class="book-insights">
  <div>
    <h1 tabindex="-1">${escapeHtml(book.title)}</h1>
    <h2>ISBN - ${escapeHtml(book.isbn)}</h2>
    <p>${escapeHtml(book.abstract || "")} <i>${escapeHtml(book.author || "")}</i></p>
  </div>
  <div>
    ${book.cover ? `<img src="${escapeHtml(book.cover)}" alt="${alt}" />` : `<img alt="" />`}
  </div>
</div>
<fieldset class="star-rating">
  <legend>Rate this book:</legend>
  <div class="star-rating__options">${renderStars(0)}</div>
</fieldset>
<p><a href="books.html">Back to books</a></p>`;
    const options = root.querySelector(".star-rating__options");
    options.addEventListener("change", (e) => {
      if (e.target.name === "rating") paintFilled(Number(e.target.value));
    });
  }
}
