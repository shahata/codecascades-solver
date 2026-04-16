import globals from "globals";
import eslint from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import prettier from "eslint-plugin-prettier/recommended";
import { defineConfig } from "eslint/config";

export default defineConfig([
  eslint.configs.recommended,
  vitest.configs.recommended,
  prettier,
  { languageOptions: { globals: globals.browser } },
  { rules: { "prefer-template": "error" } },
]);
