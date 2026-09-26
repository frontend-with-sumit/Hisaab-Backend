import js from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import unusedImports from "eslint-plugin-unused-imports"
import globals from "globals"
import tseslint from "typescript-eslint"

export default tseslint.config(
  {
    ignores: ["node_modules/**", "dist/**", "build/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        Bun: "readonly",
      },
    },
    plugins: {
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off",

      // No unused variables/imports (autofixable)
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // Sort imports
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // Flag TODO/FIXME-style leftover comments; genuine cleanup still
      // needs a human read before commit (see /code-review).
      "no-warning-comments": [
        "warn",
        { terms: ["todo", "fixme", "xxx", "hack"], location: "start" },
      ],
    },
  },
  // Must stay last: turns off ESLint formatting rules (incl. `semi`) that
  // would conflict with Prettier, which now owns all formatting/semicolons.
  eslintConfigPrettier,
)
