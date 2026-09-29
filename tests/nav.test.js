import { beforeEach, describe, expect, it } from "vitest";
import { initNav } from "../js/nav.js";

describe("initNav", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <nav>
        <button type="button" id="menubutton" aria-expanded="false"
          aria-controls="menuContent">Menu</button>
        <ul id="menuContent" class="nav__list">
          <li class="nav__item"><a href="new-book.html">New book</a></li>
          <li class="nav__item"><a href="books.html">Books</a></li>
          <li class="nav__item"><a href="about.html">About</a></li>
          <li class="nav__item"><a href="../showcases/index.html">Showcases</a></li>
        </ul>
      </nav>
    `;
    window.history.pushState({}, "", "/pages/books.html");
  });

  it("toggles aria-expanded and the open class on the menu button", () => {
    initNav();
    const toggle = document.getElementById("menubutton");
    const menu = document.getElementById("menuContent");

    toggle.click();
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(menu.classList.contains("nav__list--open")).toBe(true);

    toggle.click();
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(menu.classList.contains("nav__list--open")).toBe(false);
  });

  it("marks the current page with aria-current", () => {
    initNav();
    const current = document.querySelector('[aria-current="page"] a');
    expect(current?.getAttribute("href")).toBe("books.html");
  });
});
