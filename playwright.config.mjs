import { defineConfig, devices } from "@playwright/test";

/** Delay between browser actions (ms). Set PW_SLOW_MO=500 for demos. */
const slowMo = Number.parseInt(process.env.PW_SLOW_MO ?? "", 10);

/**
 * Playwright E2E config for accessibility tests (axe, keyboard, semantics, reflow).
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://127.0.0.1:8080",
    // Local runs (incl. --ui): record every step so the UI can show page snapshots.
    // CI: traces only on retry to keep artifacts smaller.
    trace: process.env.CI ? "on-first-retry" : "on",
    launchOptions: Number.isFinite(slowMo) && slowMo > 0 ? { slowMo } : undefined,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "python3 -m http.server 8080",
    url: "http://127.0.0.1:8080/pages/books.html",
    reuseExistingServer: !process.env.CI,
  },
});
