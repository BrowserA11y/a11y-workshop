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
        "@html-eslint/require-closing-tags": [
          "error",
          { selfClosing: "always" },
        ],
        "@html-eslint/no-abstract-roles": "error",
        "@html-eslint/no-accesskey-attrs": "error",
        "@html-eslint/no-aria-hidden-body": "error",
        "@html-eslint/no-non-scalable-viewport": "error",
        "@html-eslint/no-positive-tabindex": "error",
        "@html-eslint/no-skip-heading-levels": "error",
        "@html-eslint/require-frame-title": "error",
        "@html-eslint/require-meta-viewport": "error",
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
