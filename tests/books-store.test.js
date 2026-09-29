import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  create,
  getAll,
  getByIsbn,
  getWishlist,
  removeBook,
  toggleWishlist,
} from "../js/books-store.js";

const SAMPLE_BOOKS = [
  {
    id: "9780000000001",
    isbn: "9780000000001",
    title: "Accessible CSS",
    author: "Ada",
    available: true,
    genres: ["Technical"],
  },
  {
    id: "9780000000002",
    isbn: "9780000000002",
    title: "Screen Reader Stories",
    author: "Sam",
    available: false,
    genres: ["Fiction"],
  },
];

describe("books-store", () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        json: async () => structuredClone(SAMPLE_BOOKS),
      }))
    );
  });

  it("loads books from fetch and caches them in sessionStorage", async () => {
    const books = await getAll();
    expect(books).toHaveLength(2);
    expect(fetch).toHaveBeenCalledOnce();

    const cached = await getAll();
    expect(cached).toHaveLength(2);
    expect(fetch).toHaveBeenCalledOnce();
  });

  it("finds a book by ISBN", async () => {
    const book = await getByIsbn("9780000000002");
    expect(book?.title).toBe("Screen Reader Stories");
    expect(await getByIsbn("missing")).toBeNull();
  });

  it("creates a book at the front of the catalog", async () => {
    const entry = await create({
      isbn: "9781111111111",
      title: "New Title",
      author: "Author",
    });
    expect(entry.id).toBe("9781111111111");
    expect(entry.available).toBe(true);
    expect(entry.genres).toEqual(["Fiction"]);

    const books = await getAll();
    expect(books[0].isbn).toBe("9781111111111");
    expect(books).toHaveLength(3);
  });

  it("removes a book and clears it from the wishlist", async () => {
    toggleWishlist("9780000000001");
    expect(getWishlist().has("9780000000001")).toBe(true);

    const next = await removeBook("9780000000001");
    expect(next.map((b) => b.isbn)).toEqual(["9780000000002"]);
    expect(getWishlist().has("9780000000001")).toBe(false);
  });

  it("toggles wishlist membership", () => {
    expect(toggleWishlist("9780000000001")).toBe(true);
    expect(getWishlist().has("9780000000001")).toBe(true);
    expect(toggleWishlist("9780000000001")).toBe(false);
    expect(getWishlist().has("9780000000001")).toBe(false);
  });
});
