module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module", // Add this to support ES Modules
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", { "allowTemplateLiterals": true }],
  },
  overrides: [
    {
      files: ["**/*.spec.*"], // For test files
      env: {
        mocha: true,
      },
      rules: {},
    },
    {
      files: ["*.mjs"], // Explicitly include .mjs files
      parserOptions: {
        sourceType: "module", // Ensure .mjs files are treated as ES Modules
      },
    },
  ],
  globals: {},
};