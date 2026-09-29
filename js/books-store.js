const STORAGE_KEY = "accessible-reads-books";
const WISHLIST_KEY = "accessible-reads-wishlist";

function dataUrl() {
  return new URL("../data/books.json", import.meta.url).href;
}

export async function loadBooks() {
  const cached = sessionStorage.getItem(STORAGE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      /* fall through */
    }
  }
  const res = await fetch(dataUrl());
  if (!res.ok) throw new Error(`Failed to load books: ${res.status}`);
  const books = await res.json();
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  return books;
}

function saveBooks(books) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

export async function getAll() {
  return loadBooks();
}

export async function getByIsbn(isbn) {
  const books = await loadBooks();
  return books.find((b) => b.isbn === isbn) || null;
}

export async function create(book) {
  const books = await loadBooks();
  const entry = {
    id: book.isbn,
    subtitle: "",
    userId: 1,
    available: true,
    genres: book.genres || ["Fiction"],
    publisher: book.publisher || "",
    numPages: book.numPages || 0,
    price: book.price || "$0.00",
    ...book,
  };
  books.unshift(entry);
  saveBooks(books);
  return entry;
}

export async function removeBook(isbn) {
  const books = await loadBooks();
  const next = books.filter((b) => b.isbn !== isbn);
  saveBooks(next);
  const wishlist = getWishlist();
  wishlist.delete(isbn);
  saveWishlist(wishlist);
  return next;
}

export function getWishlist() {
  try {
    const raw = sessionStorage.getItem(WISHLIST_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

export function saveWishlist(set) {
  sessionStorage.setItem(WISHLIST_KEY, JSON.stringify([...set]));
}

export function toggleWishlist(isbn) {
  const set = getWishlist();
  if (set.has(isbn)) set.delete(isbn);
  else set.add(isbn);
  saveWishlist(set);
  return set.has(isbn);
}
