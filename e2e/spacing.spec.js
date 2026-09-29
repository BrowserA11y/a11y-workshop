import { test, expect } from "@playwright/test";
import {
  assertNoAxeViolations,
  contentFitsInsideContainer,
} from "./helpers.js";

/**
 * WCAG 1.4.12 Text spacing — content must not overflow when spacing is increased.
 * Similar to e2e/spacing.spec.ts in
 * https://codeberg.org/annam002/automated-accessibility-testing
 */
test.describe("Spacing", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/showcases/reflow-resize-and-spacing.html");
  });

  test("clip box fits at default spacing", async ({ page }) => {
    await assertNoAxeViolations(page);
    // At 100% the clip-box height may already clip; assert the ellipsis line
    // which is single-line and fits at default size.
    const ellipsis = page.locator(".demo-ellipsis");
    expect(await contentFitsInsideContainer(ellipsis)).toBeTruthy();
  });

  // Applying WCAG text spacing to the playground makes the fixed clip box overflow.
  test.fail(
    "clip box should not overflow when text spacing is increased (intentional fail)",
    async ({ page }) => {
      await page.getByRole("button", { name: "Apply text spacing" }).click();
      await assertNoAxeViolations(page);

      const clipBox = page.locator(".demo-clip-box");
      expect(await contentFitsInsideContainer(clipBox)).toBeTruthy();
    }
  );
});
