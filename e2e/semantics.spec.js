import { test, expect } from "@playwright/test";

/**
 * Asserting page semantics with role/name queries.
 * Similar to e2e/semantics.spec.ts in
 * https://codeberg.org/annam002/automated-accessibility-testing
 */
test.describe("Asserting semantics — books page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pages/books.html");
  });

  test("should have an appropriate h1", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Our books"
    );
  });

  test("should expose a labeled search landmark", async ({ page }) => {
    await expect(
      page.getByRole("search", { name: "Filter books" })
    ).toBeVisible();
    await expect(
      page.getByRole("searchbox", { name: "Search books" })
    ).toBeVisible();
  });

  test("should have a navigation landmark", async ({ page }) => {
    await expect(
      page.getByRole("navigation", { name: "Accessible Reads" })
    ).toBeVisible();
  });

  test("should have a skip link", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: "Skip to main content" })
    ).toBeAttached();
  });
});

test.describe("Asserting semantics — new book form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pages/new-book.html");
  });

  test("should have an appropriate h1", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "New book"
    );
  });

  test("should expose labeled ISBN and title fields", async ({ page }) => {
    await expect(
      page.getByRole("textbox", { name: /ISBN \(required\)/ })
    ).toBeVisible();
    await expect(
      page.getByRole("textbox", { name: /Title \(required\)/ })
    ).toBeVisible();
  });

  test("should have a submit button with an accessible name", async ({
    page,
  }) => {
    await expect(
      page.getByRole("button", { name: "Add a new book" })
    ).toBeVisible();
  });
});

test.describe("Asserting semantics — keyboard showcase", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/showcases/keyboard-navigation.html");
  });

  test("should have an appropriate h1", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Keyboard navigation"
    );
  });

  test("should have a real button in the click-targets demo", async ({
    page,
  }) => {
    await expect(
      page.getByRole("button", { name: "Real button" })
    ).toBeVisible();
  });

  test("alternative: first demo button has an accessible name", async ({
    page,
  }) => {
    await expect(
      page.getByRole("button", { name: "Focus this paragraph" })
    ).toHaveAccessibleName("Focus this paragraph");
  });
});
