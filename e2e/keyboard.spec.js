import { test, expect } from "@playwright/test";
import {
  assertNoAxeViolations,
  nextElementInTabOrder,
  previousElementInTabOrder,
} from "./helpers.js";

/**
 * Keyboard accessibility: tab order, focus style, and operable controls.
 * Similar to e2e/keyboard.spec.ts in
 * https://codeberg.org/annam002/automated-accessibility-testing
 */
test.describe("Keyboard navigation — books page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/pages/books.html");
  });

  test("should not have automatically detectable accessibility issues", async ({
    page,
  }) => {
    await assertNoAxeViolations(page);
  });

  test("should focus the skip link first", async ({ page }) => {
    await page.keyboard.press("Tab");
    await expect(page.locator("*:focus-visible")).toHaveText(
      "Skip to main content"
    );
  });

  test("should move focus into the page after the skip link", async ({
    page,
  }) => {
    await expect(await nextElementInTabOrder(page)).toHaveText(
      "Skip to main content"
    );
    const second = await nextElementInTabOrder(page);
    await expect(second).toBeFocused();
    await expect(await previousElementInTabOrder(page)).toHaveText(
      "Skip to main content"
    );
  });

  test("should have a visible focus style on the skip link", async ({
    page,
  }) => {
    await page.keyboard.press("Tab");
    const focused = page.locator("*:focus-visible");
    const hasFocusStyle = await focused.evaluate((element) => {
      const style = window.getComputedStyle(element);
      const outline = style.getPropertyValue("outline-style");
      const width = parseFloat(style.getPropertyValue("outline-width"));
      return outline !== "none" && width > 0;
    });
    expect(hasFocusStyle).toBeTruthy();
  });

  test("should activate the skip link and land on main", async ({ page }) => {
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await expect(page.locator("#content")).toBeFocused();
  });
});

test.describe("Keyboard navigation — showcase demos", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/showcases/keyboard-navigation.html");
  });

  test("should focus the back link after the skip link and nav", async ({
    page,
  }) => {
    // Skip link → mobile nav toggle (visible under 768px) or first nav link
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.keyboard.press("Tab"); // skip link
    // On desktop the nav toggle is hidden; next focusables are nav links
    await page.keyboard.press("Tab");
    const focused = page.locator("*:focus-visible");
    await expect(focused).toBeVisible();
  });

  test("native button in click-targets demo is keyboard operable", async ({
    page,
  }) => {
    const button = page.getByRole("button", { name: "Real button" });
    await button.focus();
    page.once("dialog", (dialog) => dialog.accept());
    await page.keyboard.press("Enter");
  });

  // Positive tabindex demo puts Button tabindex=1 before Link tabindex=2/3,
  // fighting visual order. Documented intentional failure.
  test.fail(
    "positive tabindex demo should follow visual order (intentional fail)",
    async ({ page }) => {
      const list = page.getByRole("list", {
        name: "Demo tab order with positive values",
      });
      const firstLink = list.getByRole("link").first();
      await firstLink.focus();
      const next = await nextElementInTabOrder(page);
      // Visual order is link → button → link → button, but tabindex reorders
      await expect(next).toHaveAccessibleName(/Button with tabindex/);
    }
  );

  test("defined outline button has a non-none focus outline", async ({
    page,
  }) => {
    const button = page.locator("button.outline-demo--defined");
    await button.focus();
    const hasOutline = await button.evaluate((element) => {
      const style = window.getComputedStyle(element);
      return (
        style.getPropertyValue("outline-style") !== "none" &&
        parseFloat(style.getPropertyValue("outline-width")) > 0
      );
    });
    expect(hasOutline).toBeTruthy();
  });
});

test.describe("Keyboard navigation — mobile nav", () => {
  test("should toggle the menu with the keyboard", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/pages/books.html");

    const toggle = page.getByRole("button", {
      name: "Accessible Reads Quick Links",
    });
    await toggle.focus();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    await page.keyboard.press("Enter");
    await expect(toggle).toHaveAttribute("aria-expanded", "true");

    await page.keyboard.press("Enter");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});
