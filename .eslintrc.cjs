module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended",
    "next/core-web-vitals",
  ],
  ignorePatterns: ["*.config.js", "config.js", ".eslintrc.cjs", "env.*.js"],
  overrides: [
    {
      files: [       
        "**/components/**/*.tsx",
        "**/src/presentation/**/*.tsx",
        "**/src/pages/**/*.tsx",
        "*.stories.tsx",
      ],
      rules: {
        "import/no-anonymous-default-export": "off",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["jsx-a11y", "simple-import-sort"],
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "none",
        argsIgnorePattern: "_",
        ignoreRestSiblings: false,
        varsIgnorePattern: "_",
      },
    ],
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/typedef": "error",
    "import/no-anonymous-default-export": "error",
    "react/jsx-boolean-value": ["error", "always"],
    "promise/always-return": "off",
    /**
     * eslint-plugin-tailwindcss
     */
    "tailwindcss/no-custom-classname": "off",
  },
  settings: {
    next: {
      rootDir: "packages/web",
    },
    react: {
      version: "18",
    },
  },
};
