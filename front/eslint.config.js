import eslint from "@eslint/js";
import eslintprettier from "eslint-config-prettier";
import unused from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // keep ignores here inside its own object
  // https://github.com/eslint/eslint/discussions/18304#discussioncomment-9069706
  {
    ignores: [
      ".git/*",
      ".idea/*",
      ".yarn/*",
      "node_modules/*",
      "coverage/*",
      "dist/*",
      ".prisma/*",
      "prisma/*",
    ],
  },
  eslint.configs.recommended,
  eslintprettier,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "unused-imports": unused,
    },
    rules: {
      "no-empty": "warn",
      "unused-imports/no-unused-imports": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      // this rule is stupid sometimes we need any because it's a JS world
      "@typescript-eslint/no-explicit-any": "off",
      // this rule is really stupid
      "@typescript-eslint/ban-ts-comment": "off",
      // this rule is stupid we need namespaces for type augmentation
      "@typescript-eslint/no-namespace": "off",
    },
  }
);
