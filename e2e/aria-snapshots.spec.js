import { test, expect } from "@playwright/test";

/**
 * Aria snapshot assertions for structure and accessible names.
 * Similar to e2e/aria-snapshots.spec.ts in
 * https://codeberg.org/annam002/automated-accessibility-testing
 */
test.describe("Aria snapshots", () => {
  test("books page filter region has expected semantics", async ({ page }) => {
    await page.goto("/pages/books.html");
    await expect(
      page.getByRole("search", { name: "Filter books" })
    ).toMatchAriaSnapshot(`
      - search "Filter books":
        - text: Search books
        - searchbox "Search books"
        - paragraph: Results update as you type.
        - checkbox "Available only"
        - text: Available only
        - checkbox "On my wishlist"
        - text: On my wishlist
        - group "Genres":
          - checkbox "All genres" [checked]
          - text: All genres
          - checkbox "Technical" [checked]
          - text: Technical
          - checkbox "Reference" [checked]
          - text: Reference
          - checkbox "Fiction" [checked]
          - text: Fiction
    `);
  });

  test("keyboard showcase heading is an h1", async ({ page }) => {
    await page.goto("/showcases/keyboard-navigation.html");
    await expect(page.getByText("Keyboard navigation")).toMatchAriaSnapshot(`
      - heading "Keyboard navigation" [level=1]
    `);
  });

  test("showcases index lists topic links", async ({ page }) => {
    await page.goto("/showcases/index.html");
    // Partial snapshot: first tiles only; /url and later items may vary.
    await expect(page.locator(".showcases__grid")).toMatchAriaSnapshot(`
      - list:
        - listitem:
          - article:
            - heading "Accessible name and description" [level=2]:
              - link "Accessible name and description"
            - paragraph: Explore how browsers compute accessible names and descriptions for UI controls.
        - listitem:
          - article:
            - heading "Semantic HTML" [level=2]:
              - link "Semantic HTML"
            - paragraph: Use the right elements and required child order so assistive tech gets real meaning.
    `);
  });});
