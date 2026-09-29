/**
 * Shared helpers for Playwright accessibility e2e tests.
 * Patterns inspired by https://codeberg.org/annam002/automated-accessibility-testing
 */
import AxeBuilder from "@axe-core/playwright";
import { expect } from "@playwright/test";

/** @param {import('@playwright/test').Page} page */
export async function assertNoAxeViolations(page) {
  // Third-party embeds (e.g. YouTube) are out of scope for page-level checks.
  const results = await new AxeBuilder({ page }).exclude("iframe").analyze();
  expect(
    results.violations,
    formatViolations(results.violations)
  ).toEqual([]);
}

/** @param {import('axe-core').Result[]} violations */
function formatViolations(violations) {
  if (!violations.length) return "no axe violations";
  return violations
    .map(
      (v) =>
        `[${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} node(s))\n  ${v.helpUrl}`
    )
    .join("\n");
}

/**
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<import('@playwright/test').Locator>}
 */
export async function nextElementInTabOrder(page) {
  await page.keyboard.press("Tab");
  return page.locator("*:focus-visible");
}

/**
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<import('@playwright/test').Locator>}
 */
export async function previousElementInTabOrder(page) {
  await page.keyboard.press("Shift+Tab");
  return page.locator("*:focus-visible");
}

/**
 * @param {import('@playwright/test').Locator} locator
 */
export async function contentFitsInsideContainer(locator) {
  return locator.evaluate(
    (element) =>
      element.scrollHeight <= element.clientHeight &&
      element.scrollWidth <= element.clientWidth
  );
}
