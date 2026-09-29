/**
 * MCP-free accessibility scan fallback using Playwright + axe-core.
 *
 * Prerequisites:
 *   1. Serve the site: python3 -m http.server 8080
 *   2. npm install
 *   3. npx playwright install chromium
 *   4. npm run a11y:scan
 *
 * Env:
 *   BASE_URL  default http://127.0.0.1:8080
 */
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const BASE = process.env.BASE_URL || "http://127.0.0.1:8080";

const PATHS = [
  "/pages/books.html",
  "/pages/new-book.html",
  "/pages/about.html",
  "/showcases/index.html",
  "/showcases/keyboard-navigation.html",
  "/showcases/color-contrast-and-use-of-color.html",
];

async function scanPage(page, path) {
  const url = new URL(path, BASE).href;
  await page.goto(url, { waitUntil: "networkidle" });
  const results = await new AxeBuilder({ page }).analyze();
  return {
    path,
    url,
    violations: results.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      help: v.help,
      helpUrl: v.helpUrl,
      nodes: v.nodes.length,
    })),
  };
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const reports = [];

  try {
    for (const path of PATHS) {
      try {
        const report = await scanPage(page, path);
        reports.push(report);
        const n = report.violations.length;
        console.log(`\n${path}: ${n} violation group(s)`);
        for (const v of report.violations) {
          console.log(`  - [${v.impact}] ${v.id}: ${v.help} (${v.nodes} node(s))`);
        }
      } catch (err) {
        console.error(`\n${path}: FAILED — ${err.message}`);
        console.error("Is the static server running on", BASE, "?");
        process.exitCode = 1;
      }
    }
  } finally {
    await browser.close();
  }

  const total = reports.reduce((sum, r) => sum + r.violations.length, 0);
  console.log(`\nDone. ${total} violation group(s) across ${reports.length} page(s).`);
}

main();
