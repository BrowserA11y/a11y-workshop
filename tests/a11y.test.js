import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

describe("accessibility (vitest-axe)", () => {
  it("flags a button without an accessible name", async () => {
    const html = `<main><button type="button"></button></main>`;
    const results = await axe(html);
    expect(results.violations.some((v) => v.id === "button-name")).toBe(true);
  });

  it("passes for a labeled form with a skip link", async () => {
    const html = `
      <a href="#content">Skip to main content</a>
      <header>
        <nav aria-label="Accessible Reads">
          <ul>
            <li><a href="books.html">Books</a></li>
            <li><a href="about.html">About</a></li>
          </ul>
        </nav>
      </header>
      <main id="content">
        <h1>New book</h1>
        <form>
          <label>
            ISBN (required)
            <input name="isbn" inputmode="numeric" />
          </label>
          <label for="title">Title (required)</label>
          <input id="title" name="title" />
          <button type="submit">Add a new book</button>
        </form>
      </main>
    `;
    expect(await axe(html)).toHaveNoViolations();
  });

  it("passes for a book card with named controls", async () => {
    const html = `
      <main>
        <h1>Books</h1>
        <ul>
          <li>
            <article>
              <h2>Accessible CSS</h2>
              <button type="button" aria-pressed="false"
                aria-label="Add Accessible CSS to wishlist">Wishlist</button>
              <button type="button" aria-label="Remove Accessible CSS">Remove</button>
              <a href="details.html?isbn=1">
                Read more <span class="visually-hidden">about Accessible CSS</span>
              </a>
            </article>
          </li>
        </ul>
      </main>
    `;
    expect(await axe(html)).toHaveNoViolations();
  });

  it("passes for the mobile nav toggle pattern", async () => {
    const html = `
      <nav aria-label="Accessible Reads">
        <button type="button" id="menubutton"
          aria-label="Accessible Reads Quick Links"
          aria-controls="menuContent"
          aria-expanded="false">Menu</button>
        <ul id="menuContent">
          <li><a href="books.html" aria-current="page">Books</a></li>
          <li><a href="about.html">About</a></li>
        </ul>
      </nav>
    `;
    expect(await axe(html)).toHaveNoViolations();
  });
});
