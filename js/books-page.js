
import {
  getAll,
  removeBook,
  getWishlist,
  toggleWishlist,
} from "./books-store.js";

const CATALOG_GENRES = ["Technical", "Reference", "Fiction"];
const HEART = `<svg class="book__wishlist-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;

let books = [];
let wishlist = getWishlist();

function filters() {
  return {
    search: document.getElementById("book-search").value,
    availableOnly: document.getElementById("available-only").checked,
    wishlistOnly: document.getElementById("wishlist-only").checked,
    genres: Object.fromEntries(
      CATALOG_GENRES.map((g) => [g, document.getElementById(`genre-${g}`).checked])
    ),
  };
}

function applyFilters(list, f) {
  const query = f.search.trim().toLowerCase();
  const selected = CATALOG_GENRES.filter((g) => f.genres[g]);
  return list.filter((book) => {
    const matchesQuery =
      !query ||
      book.title.toLowerCase().includes(query) ||
      (book.author || "").toLowerCase().includes(query);
    const matchesAvailability = !f.availableOnly || book.available !== false;
    const matchesWishlist = !f.wishlistOnly || wishlist.has(book.isbn);
    const bookGenres = book.genres ?? [];
    const allSelected = selected.length === CATALOG_GENRES.length;
    const matchesGenre =
      selected.length === 0 ||
      allSelected ||
      bookGenres.some((g) => selected.includes(g));
    return matchesQuery && matchesAvailability && matchesWishlist && matchesGenre;
  });
}

function updateAllGenresCheckbox() {
  const cbs = CATALOG_GENRES.map((g) => document.getElementById(`genre-${g}`));
  const all = document.getElementById("genre-all");
  const checked = cbs.filter((c) => c.checked).length;
  all.checked = checked === cbs.length;
  all.indeterminate = checked > 0 && checked < cbs.length;
}

function updateStatus(count) {
  const el = document.getElementById("books-status");
  if (count === 0) {
    el.textContent = "No books match your filters.";
    el.classList.remove("visually-hidden");
    el.classList.add("books-empty--visible");
    el.setAttribute("aria-live", "assertive");
  } else {
    el.textContent = `${count} book${count === 1 ? "" : "s"} match your filters.`;
    el.classList.add("visually-hidden");
    el.classList.remove("books-empty--visible");
    el.setAttribute("aria-live", "polite");
  }
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function render() {
  const filtered = applyFilters(books, filters());
  updateStatus(filtered.length);
  const list = document.getElementById("books-list");
  list.innerHTML = filtered
    .map((book, index) => {
      const onWish = wishlist.has(book.isbn);
      const title = escapeHtml(book.title);
      return `<li id="book-${index}">
<article class="book-card" data-isbn="${escapeHtml(book.isbn)}">
  <div class="book__header">
    <h2 class="book__title"><span class="book__title-clamp">${title}</span></h2>
    <div class="book__header-actions">
      <button type="button" class="book__wishlist" aria-pressed="${onWish}"
        aria-label="${onWish ? "Remove" : "Add"} ${title} ${onWish ? "from" : "to"} wishlist">${HEART}</button>
      <button type="button" class="book__remove" aria-label="Remove ${title}">×</button>
    </div>
  </div>
  <p class="book__text book__author">Author: ${escapeHtml(book.author || "")}</p>
  <p class="book__text book__abstract"><span class="book__abstract-clamp">${escapeHtml(book.abstract || "")}</span></p>
  ${book.available === false ? '<p class="book__text book__availability">Currently unavailable</p>' : ""}
  <a class="book__text book__details" href="details.html?isbn=${encodeURIComponent(book.isbn)}">
    Read more <span class="visually-hidden">about ${title}</span>
  </a>
</article>
<dialog class="book__confirm-dialog" aria-labelledby="confirm-title-${index}">
  <h3 id="confirm-title-${index}">Remove book?</h3>
  <p>Remove “${title}” from the catalog?</p>
  <div class="book__confirm-actions">
    <button type="button" class="book__confirm-action book__confirm-cancel">Cancel</button>
    <button type="button" class="book__confirm-action book__confirm-action--danger book__confirm-ok">Confirm remove</button>
  </div>
</dialog>
</li>`;
    })
    .join("");

  list.querySelectorAll(".book-card").forEach((card) => {
    const li = card.closest("li");
    const isbn = card.dataset.isbn;
    const dialog = li.querySelector("dialog");
    const removeBtn = card.querySelector(".book__remove");

    card.querySelector(".book__wishlist").addEventListener("click", () => {
      toggleWishlist(isbn);
      wishlist = getWishlist();
      render();
    });

    removeBtn.addEventListener("click", () => dialog.showModal());
    dialog.querySelector(".book__confirm-cancel").addEventListener("click", () => dialog.close());
    dialog.querySelector(".book__confirm-ok").addEventListener("click", async () => {
      dialog.close();
      const index = [...list.children].indexOf(li);
      books = await removeBook(isbn);
      wishlist = getWishlist();
      render();
      const next =
        document.getElementById(`book-${index}`) ||
        document.getElementById(`book-${index - 1}`);
      const focusTarget =
        next?.querySelector(".book__remove") || document.getElementById("content");
      focusTarget?.focus();
    });
  });
}

function bindFilters() {
  ["book-search", "available-only", "wishlist-only"].forEach((id) => {
    document.getElementById(id).addEventListener("input", render);
    document.getElementById(id).addEventListener("change", render);
  });
  CATALOG_GENRES.forEach((g) => {
    document.getElementById(`genre-${g}`).addEventListener("change", () => {
      updateAllGenresCheckbox();
      render();
    });
  });
  document.getElementById("genre-all").addEventListener("change", (e) => {
    const on = e.target.checked;
    CATALOG_GENRES.forEach((g) => {
      document.getElementById(`genre-${g}`).checked = on;
    });
    updateAllGenresCheckbox();
    render();
  });
}

async function init() {
  books = await getAll();
  wishlist = getWishlist();
  bindFilters();
  updateAllGenresCheckbox();
  render();
}

init();
