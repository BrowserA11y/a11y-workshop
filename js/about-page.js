
import { getAll } from "./books-store.js";

function mapBooksToStats(books) {
  const authors = new Set();
  const publishers = new Set();
  let pages = 0;
  let value = 0;
  for (const b of books) {
    if (b.author) authors.add(b.author);
    if (b.publisher) publishers.add(b.publisher);
    pages += Number(b.numPages) || 0;
    const price = String(b.price || "$0").replace(/^[^0-9.]*/, "");
    value += Number(price) || 0;
  }
  return {
    numberOfBooks: books.length,
    numberOfAuthors: authors.size,
    numberOfPublishers: publishers.size,
    numberOfPages: pages,
    value,
  };
}

const books = await getAll();
const stats = mapBooksToStats(books);
document.getElementById("stat-books").textContent = String(stats.numberOfBooks);
document.getElementById("stat-authors").textContent = String(stats.numberOfAuthors);
document.getElementById("stat-publishers").textContent = String(stats.numberOfPublishers);
document.getElementById("stat-pages").textContent = String(stats.numberOfPages);
document.getElementById("stat-value").textContent = `${stats.value.toFixed(2)} $`;
