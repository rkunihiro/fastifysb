/** @type {import("prettier").Config} */
module.exports = {
    printWidth: 120, // default:80
    // tabWidth: 4, // default:2 // from .editorconfig
    // useTabs: false, // from .editorconfig
    semi: true,
    singleQuote: false,
    jsxSingleQuote: false,
    trailingComma: "all",
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: "always",
    quoteProps: "as-needed",

    overrides: [
        {
            files: ["*.go", "*.mk", "Makefile", "makefile"],
            options: {
                useTabs: true,
            },
        },
        {
            files: ["*.md", "*.yaml", "*.yml"],
            options: {
                tabWidth: 2,
            },
        },
    ],
};
