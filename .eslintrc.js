module.exports = {
    env: {
      browser: true,
      es2021: true
    },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended"
    ],
    overrides: [],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    },
    plugins: [
      "@typescript-eslint"
    ],
    rules: {
        "comma-dangle": ["error", "never"],
        "import/extensions": 0,
        "import/no-unresolved": 0,
        "indent": ["error", 4],
        "keyword-spacing": 0,
        "space-in-parens": ["error", "always"]
        // "no-empty-catch": "error",
        // "no-fetch-without-return": "error"
      }
  }