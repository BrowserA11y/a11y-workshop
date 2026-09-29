module.exports = {
  root: true,
  plugins: ["@html-eslint"],
  overrides: [
    {
      files: ["*.html", "**/*.html"],
      parser: "@html-eslint/parser",
      rules: {
        // Prefer Prettier for layout; keep HTML a11y / correctness checks.
        "@html-eslint/element-newline": "off",
        "@html-eslint/indent": "off",
        "@html-eslint/no-extra-spacing-attrs": "off",
        "@html-eslint/no-multiple-empty-lines": "off",
        "@html-eslint/no-trailing-spaces": "off",
        "@html-eslint/quotes": "off",

        // Document / structure
        "@html-eslint/require-doctype": "error",
        "@html-eslint/require-lang": "error",
        "@html-eslint/require-title": "error",
        "@html-eslint/require-meta-charset": "error",
        "@html-eslint/require-meta-viewport": "error",
        "@html-eslint/require-closing-tags": [
          "error",
          { selfClosing: "always" },
        ],
        "@html-eslint/no-duplicate-attrs": "error",
        "@html-eslint/no-duplicate-id": "error",
        "@html-eslint/no-obsolete-tags": "error",
        "@html-eslint/require-li-container": "error",
        "@html-eslint/no-multiple-h1": "error",
        "@html-eslint/no-skip-heading-levels": "error",

        // Accessibility
        "@html-eslint/require-img-alt": "error",
        "@html-eslint/require-button-type": "error",
        "@html-eslint/require-frame-title": "error",
        "@html-eslint/no-abstract-roles": "error",
        "@html-eslint/no-accesskey-attrs": "error",
        "@html-eslint/no-aria-hidden-body": "error",
        "@html-eslint/no-non-scalable-viewport": "error",
        "@html-eslint/no-positive-tabindex": "error",
        "@html-eslint/no-target-blank": "error",
      },
    },
    {
      // Educational anti-patterns (intentional positive tabindex demos).
      files: ["showcases/keyboard-navigation.html"],
      rules: {
        "@html-eslint/no-positive-tabindex": "off",
      },
    },
    {
      // Educational anti-patterns (invalid list nesting / empty-state demos).
      files: ["showcases/semantic-html.html"],
      rules: {
        "@html-eslint/require-li-container": "off",
      },
    },
    {
      // Educational anti-patterns (broken images named via ARIA without alt).
      files: ["showcases/accessible-name-and-description.html"],
      rules: {
        "@html-eslint/require-img-alt": "off",
      },
    },
    {
      files: ["*.js", "**/*.js", "*.mjs", "**/*.mjs"],
      env: {
        browser: true,
        es2022: true,
        node: true,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      extends: ["eslint:recommended"],
      rules: {
        "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      },
    },
  ],
};
