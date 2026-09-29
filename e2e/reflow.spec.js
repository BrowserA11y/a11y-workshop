import { test, expect } from "@playwright/test";
import { assertNoAxeViolations } from "./helpers.js";

/**
 * WCAG 1.4.10 Reflow — layout at ~320 CSS px without loss of content/function.
 * Similar to e2e/reflow.spec.ts in
 * https://codeberg.org/annam002/automated-accessibility-testing
 */
test.describe("Reflow — books page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pages/books.html");
    await page.setViewportSize({ width: 320, height: 256 });
  });

  test("should not have automatically detectable accessibility issues", async ({
    page,
  }) => {
    await assertNoAxeViolations(page);
  });

  test("should keep the searchbox fully in view", async ({ page }) => {
    const searchbox = page.getByRole("searchbox", { name: "Search books" });
    await searchbox.scrollIntoViewIfNeeded();
    await expect(searchbox).toBeInViewport({ ratio: 1 });
  });

  test("should be able to scroll the about CTA into view", async ({ page }) => {
    const cta = page.getByRole("link", { name: "Learn about us" });
    await cta.scrollIntoViewIfNeeded();
    await expect(cta).toBeInViewport({ ratio: 1 });
  });

  test("should not have a horizontal scrollbar", async ({ page }) => {
    const hasHorizontalScrollbar = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth
    );
    expect(hasHorizontalScrollbar).toBeFalsy();
  });
});

test.describe("Reflow — intentional breakages in showcase", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/showcases/reflow-resize-and-spacing.html");
    await page.setViewportSize({ width: 320, height: 256 });
  });

  // Fixed-width card and nowrap toolbar are designed to spill on narrow viewports.
  test.fail(
    "nowrap toolbar should stay fully in viewport (intentional fail)",
    async ({ page }) => {
      const toolbar = page.getByRole("toolbar", { name: "Broken actions" });
      await toolbar.scrollIntoViewIfNeeded();
      await expect(toolbar).toBeInViewport({ ratio: 1 });
    }
  );
});
