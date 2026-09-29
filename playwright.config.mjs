import { defineConfig, devices } from "@playwright/test";

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
    trace: "on-first-retry",
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
