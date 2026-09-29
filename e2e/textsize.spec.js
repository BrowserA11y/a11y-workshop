import { test, expect } from "@playwright/test";
import {
  assertNoAxeViolations,
  contentFitsInsideContainer,
} from "./helpers.js";

/**
 * WCAG 1.4.4 Resize text — content must remain readable at 200% text size.
 * Similar to e2e/textsize.spec.ts in
 * https://codeberg.org/annam002/automated-accessibility-testing
 */
test.describe("Text size", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/showcases/reflow-resize-and-spacing.html");
  });

  test("ellipsis line fits at normal text size", async ({ page }) => {
    await assertNoAxeViolations(page);
    const ellipsis = page.locator(".demo-ellipsis");
    expect(await contentFitsInsideContainer(ellipsis)).toBeTruthy();
  });

  // Fixed-height overflow:hidden box clips when font scale reaches 200%.
  test.fail(
    "clip box should not overflow at 200% text size (intentional fail)",
    async ({ page }) => {
      // Playground: each click increases scale; reach ~200%.
      const increase = page.getByRole("button", { name: "Increase font" });
      for (let i = 0; i < 4; i++) {
        await increase.click();
      }
      await expect(page.locator("#playground-status")).toContainText("200%");

      await assertNoAxeViolations(page);

      const clipBox = page.locator(".demo-clip-box");
      expect(await contentFitsInsideContainer(clipBox)).toBeTruthy();
    }
  );

  // Ellipsis truncation hides content when text grows.
  test.fail(
    "ellipsis text should not be clipped at 200% text size (intentional fail)",
    async ({ page }) => {
      const increase = page.getByRole("button", { name: "Increase font" });
      for (let i = 0; i < 4; i++) {
        await increase.click();
      }

      await assertNoAxeViolations(page);

      const ellipsis = page.locator(".demo-ellipsis");
      // scrollWidth > clientWidth means truncated/clipped content
      const overflows = await ellipsis.evaluate(
        (el) => el.scrollWidth > el.clientWidth
      );
      expect(overflows).toBeFalsy();
    }
  );
});
