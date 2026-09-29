import { describe, expect, it } from "vitest";
import { applyFilters } from "../js/books-page.js";

const BOOKS = [
  {
    isbn: "1",
    title: "Accessible CSS",
    author: "Ada Lovelace",
    available: true,
    genres: ["Technical"],
  },
  {
    isbn: "2",
    title: "Fiction Night",
    author: "Sam",
    available: false,
    genres: ["Fiction"],
  },
  {
    isbn: "3",
    title: "Reference Handbook",
    author: "Pat",
    available: true,
    genres: ["Reference", "Technical"],
  },
];

function baseFilters(overrides = {}) {
  return {
    search: "",
    availableOnly: false,
    wishlistOnly: false,
    genres: { Technical: false, Reference: false, Fiction: false },
    ...overrides,
  };
}

describe("applyFilters", () => {
  it("returns all books when no filters are active", () => {
    expect(applyFilters(BOOKS, baseFilters(), new Set())).toHaveLength(3);
  });

  it("filters by search query on title or author", () => {
    expect(
      applyFilters(BOOKS, baseFilters({ search: "lovelace" }), new Set()).map(
        (b) => b.isbn
      )
    ).toEqual(["1"]);
    expect(
      applyFilters(BOOKS, baseFilters({ search: "night" }), new Set()).map(
        (b) => b.isbn
      )
    ).toEqual(["2"]);
  });

  it("filters to available books only", () => {
    expect(
      applyFilters(BOOKS, baseFilters({ availableOnly: true }), new Set()).map(
        (b) => b.isbn
      )
    ).toEqual(["1", "3"]);
  });

  it("filters to wishlist books only", () => {
    expect(
      applyFilters(
        BOOKS,
        baseFilters({ wishlistOnly: true }),
        new Set(["2", "9"])
      ).map((b) => b.isbn)
    ).toEqual(["2"]);
  });

  it("filters by selected genres", () => {
    expect(
      applyFilters(
        BOOKS,
        baseFilters({
          genres: { Technical: false, Reference: true, Fiction: false },
        }),
        new Set()
      ).map((b) => b.isbn)
    ).toEqual(["3"]);
  });
});
