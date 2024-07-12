/** @type {import('prettier').Config} */
export default {
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'auto',
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  bracketSameLine: true,
  jsxSingleQuote: false,
  printWidth: 120,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  requirePragma: false,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  vueIndentScriptAndStyle: false,
  // Settings for https://github.com/trivago/prettier-plugin-sort-imports
  // importOrder: ['^[rR]eact(.*)$', '<THIRD_PARTY_MODULES>', '^[../]', '^[./]'],
  // importOrderSeparation: false,
  // importOrderSortSpecifiers: true,
  // Settings for https://github.com/Siilwyn/prettier-plugin-css-order
  cssDeclarationSorterOrder: 'concentric-css',
  plugins: [
    // '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-css-order',
    './node_modules/prettier-plugin-jsdoc/dist/index.js',
    'prettier-plugin-packagejson',
    // '@trivago/prettier-plugin-sort-imports',
  ],
}
