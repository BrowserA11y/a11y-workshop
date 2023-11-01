module.exports = {
  plugins: ["@html-eslint"],
  overrides: [
    {
      files: ["*.html"],
      parser: "@html-eslint/parser",
      extends: ["plugin:@html-eslint/recommended"],
      rules: { "@html-eslint/indent": "off" },
    },
  ],
  rules: {
    "@html-eslint/no-abstract-roles": "error",
    "@html-eslint/no-abstract-roles": "error",
    "@html-eslint/no-accesskey-attrs": "error",
    "@html-eslint/no-aria-hidden-body": "error",
    "@html-eslint/no-non-scalable-viewport": "error",
    "@html-eslint/no-positive-tabindex": "error",
    "@html-eslint/no-skip-heading-levels": "error",
    "@html-eslint/require-frame-title": "error",
    "@html-eslint/require-meta-viewport": "error",
    "@html-eslint/require-closing-tags": ["error", { selfClosing: "always" }],
    "@html-eslint/no-extra-spacing-attrs": [
      "error",
      { enforceBeforeSelfClose: true },
    ],
  },
};
