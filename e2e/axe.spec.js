import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { assertNoAxeViolations } from "./helpers.js";

/**
 * Automated axe-core scans via @axe-core/playwright.
 * App pages and “clean” showcases must pass. Demo pages that intentionally
 * break rules are marked with test.fail() so the suite documents them.
 */
const CLEAN_PAGES = [
  "/pages/books.html",
  "/pages/about.html",
  "/pages/new-book.html",
  "/showcases/index.html",
  "/showcases/high-contrast-mode.html",
  "/showcases/reflow-resize-and-spacing.html",
];

/** Showcase demos that intentionally include axe-detectable issues. */
const INTENTIONAL_VIOLATION_PAGES = [
  "/showcases/keyboard-navigation.html",
  "/showcases/accessible-name-and-description.html",
  "/showcases/semantic-html.html",
  "/showcases/aria.html",
  "/showcases/hiding-elements.html",
  "/showcases/live-regions.html",
  "/showcases/color-contrast-and-use-of-color.html",
];

test.describe("Axe scans — pages that should pass", () => {
  for (const path of CLEAN_PAGES) {
    test(`${path} should not have automatically detectable a11y issues`, async ({
      page,
    }) => {
      await page.goto(path);
      await assertNoAxeViolations(page);
    });
  }
});

test.describe("Axe scans — intentional showcase violations", () => {
  for (const path of INTENTIONAL_VIOLATION_PAGES) {
    test.fail(
      `${path} documents axe violations (intentional)`,
      async ({ page }) => {
        await page.goto(path);
        const results = await new AxeBuilder({ page })
          .exclude("iframe")
          .analyze();
        expect(results.violations).toEqual([]);
      }
    );
  }
});
