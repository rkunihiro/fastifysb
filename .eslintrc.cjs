/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    // Specifying Environments
    // https://eslint.org/docs/user-guide/configuring/language-options#specifying-environments
    env: {
        // browser: true,
        node: true,
        commonjs: true,
        es2022: true,
        // jest: true,
    },
    plugins: [
        //
        "@typescript-eslint",
        "import",
        "unicorn",
        // "jest",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
    },
    settings: {
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"],
        },
        "import/resolver": {
            typescript: {
                project: ["tsconfig.json"],
            },
        },
    },
    extends: [
        // "eslint:all",
        "eslint:recommended",
        "plugin:import/recommended",
        "plugin:unicorn/recommended",
        // "plugin:jest/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],
    rules: {
        // --------------------------------------------------
        // ESLint rules
        // https://eslint.org/docs/rules/
        // --------------------------------------------------
        "array-callback-return": "error",
        "no-await-in-loop": "error",
        "no-constructor-return": "error",
        "no-duplicate-imports": ["error", { includeExports: true }],
        "no-promise-executor-return": "error",
        "no-self-compare": "error",
        "no-unreachable-loop": "error",
        "no-use-before-define": "error",

        "block-scoped-var": "error",
        camelcase: [
            "warn",
            {
                properties: "always",
                ignoreDestructuring: true,
                ignoreImports: true,
                ignoreGlobals: true,
            },
        ],
        "class-methods-use-this": "warn",
        curly: "error",
        "default-case": "warn",
        eqeqeq: "warn",
        "func-style": ["warn", "declaration", { allowArrowFunctions: true }],
        "no-console": "warn",

        "dot-notation": "off", // conflict TypeScript noPropertyAccessFromIndexSignature
        "no-unused-vars": "off",
        // "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],

        "@typescript-eslint/no-import-type-side-effects": "error",

        // --------------------------------------------------
        // Import order
        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
        // --------------------------------------------------
        // "sort-imports": "off",
        "import/order": [
            "error",
            {
                groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
                "newlines-between": "always",
                alphabetize: { order: "asc", caseInsensitive: false },
            },
        ],

        // --------------------------------------------------
        // Unicorn rules
        // https://github.com/sindresorhus/eslint-plugin-unicorn
        // --------------------------------------------------
        // ファイル名のケースルール
        "unicorn/filename-case": [
            "error",
            {
                cases: {
                    camelCase: true,
                    pascalCase: true,
                },
            },
        ],
        "unicorn/prefer-top-level-await": "off", // CommonJS not support top-level await
        "unicorn/prevent-abbreviations": [
            "error",
            {
                extendDefaultReplacements: true, // デフォルトのreplacementsを使用する
                replacements: {
                    props: false,
                },
                extendDefaultAllowList: true, // デフォルトのallowListを使用する
                allowList: {}, // 除外する識別子(完全一致)
                checkDefaultAndNamespaceImports: "internal",
                checkShorthandImports: "internal",
                checkShorthandProperties: true,
                checkProperties: false, // default:true
                checkVariables: true,
                checkFilenames: true,
                ignore: [],
            },
        ],
    },
    ignorePatterns: [
        //
        "/*.js",
        "node_modules/",
    ],
};
