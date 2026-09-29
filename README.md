# Accessible Reads (vanilla HTML / CSS / JS)

Accessibility is back in, thanks to the Barrierefreiheitsstärkungsgesetz (BFSG)! By 2025 at the latest, we should be able to make our apps accessible.

This repository is a **vanilla HTML, CSS, and JavaScript** port of the Accessible Reads book-store workshop.

If you prefer Angular (CDK, router, forms, ESLint), see [a11y-angular-workshop](https://github.com/BrowserA11y/BrowserA11y.github.io).

## What you get

- A small book catalog (browse, details, wishlist, add a book) stored in the browser
- Interactive **showcases** under `showcases/` that demonstrate common a11y patterns and pitfalls
- Shared layout, design tokens, and navigation
- **AI + accessibility workshop materials** under [`workshop/`](workshop/) (agenda, prompts, rules, skills, broken lab, automation)
- ESLint (HTML + JS) and Prettier, with VS Code format-on-save

## Topics covered

- Semantic HTML
- Accessible name and description
- ARIA roles, nesting, `aria-hidden`, and live regions
- Hiding content (visually vs from assistive technology)
- Live regions (`output`, `aria-live`, `aria-busy`, offscreen announcers)
- Reflow, text resize, and spacing
- Color contrast and use of color
- High contrast / forced colors
- Keyboard navigation and focus styles

## Prerequisites

- A modern browser (Chrome, Firefox, Safari, or Edge)
- Optional: a local static file server (modules and some APIs work best over `http://`, not `file://`)
- For lint/format and the optional axe scan script: Node.js 18+
- Recommended editor extensions: [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Getting started

Serve the project root, then open the site:

```bash
# Python 3
python3 -m http.server 8080

# or Node
npx serve .
```

Navigate to `http://localhost:8080/` or `http://localhost:8080/books.html` (both redirect to `pages/books.html`), or open `showcases/index.html` directly. Root paths for `about.html`, `new-book.html`, and `details.html` also redirect into `pages/`.

## Lint and format

Install dependencies once, then use the scripts or rely on editor save:

```bash
npm install
npm run lint          # ESLint for HTML and JS
npm run lint:fix     # auto-fix what ESLint can
npm run format        # Prettier write
npm run format:check  # Prettier check only
```

Workspace settings in [`.vscode/settings.json`](.vscode/settings.json) turn on **format on save** (Prettier) and ESLint validation for **HTML and JavaScript**. HTML rules come from [`@html-eslint`](https://github.com/yeonjun-in/@html-eslint) (see [`.eslintrc.js`](.eslintrc.js)).

## AI + Accessibility workshop

Full-day, tool-agnostic materials for frontend, developers, and testers:

| Start here | Purpose |
|------------|---------|
| [`workshop/agenda.md`](workshop/agenda.md) | Day schedule, outcomes, lab pairing |
| [`workshop/prompts.md`](workshop/prompts.md) | Diagnose / remediate / review prompts |
| [`workshop/rules-a11y.md`](workshop/rules-a11y.md) | Always-on AI instructions |
| [`workshop/skills/`](workshop/skills/) | Audit, remediate, and PR-review playbooks |
| [`workshop/verification-checklist.md`](workshop/verification-checklist.md) | Tester gate |
| [`workshop/geo-notes.md`](workshop/geo-notes.md) | Short GEO module |
| [`workshop/automation.md`](workshop/automation.md) | MCP + Playwright/axe fallback |
| [`workshop/broken/`](workshop/broken/) | Intentional regressions for Labs A/B |

### Lab flow (diagnose → remediate → verify)

1. Serve the app (`python3 -m http.server 8080`).
2. Activate broken files: `./workshop/broken/apply.sh`
3. Lab A: find issues with AI + humans ([prompts](workshop/prompts.md), [expected failures](workshop/broken/EXPECTED_FAILURES.md) for facilitators).
4. Lab B: fix, re-scan, keyboard-check ([verification checklist](workshop/verification-checklist.md)).
5. Restore good files: `./workshop/broken/restore.sh`

Optional scan (server must be running):

```bash
npm install
npx playwright install chromium
npm run a11y:scan
```

MCP sample config: [`.mcp.json.example`](.mcp.json.example)

## Project layout

| Path | Purpose |
|------|---------|
| `index.html` | Redirects to the books page |
| `books.html`, `about.html`, `new-book.html`, `details.html` | Compatibility redirects into `pages/` |
| `pages/` | App pages (books, details, about, new book) |
| `showcases/` | Accessibility demos |
| `css/` | Tokens, layout, utilities, page styles |
| `js/` | Page behavior, nav, resource links, books store |
| `assets/` | Images and icons |
| `data/` | Seed book data |
| `workshop/` | AI + a11y workshop handouts and broken lab |
| `scripts/` | Optional Playwright + axe scan |
| `.eslintrc.js` / `.prettierrc.json` | Lint and format config |
| `.vscode/settings.json` | Format on save + ESLint for HTML/JS |
| `.mcp.json.example` | Sample MCP config for accessibility-scanner |

## License

This repository is licensed under the MIT License.

## Interested in a workshop on accessibility?

Contact me via [email](mailto:contact@browser-person.com).
