/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: [
    // Base plugins
    'json',
    // React
    'react',
    'react-perf',
    'import',
    // Accessibility
    'jsx-a11y',
    // Testing
    'testing-library',
    // Documentation
    'markdown',
    'jsdoc',
  ],
  extends: [
    // Base config
    'eslint:recommended',
    'plugin:json/recommended-legacy',
    'prettier',
    // React
    'plugin:react/recommended',
    'plugin:import/react',
    'plugin:react-perf/recommended',
    // Accessibility
    'plugin:jsx-a11y/recommended',
    // Testing
    'plugin:testing-library/react',
    // Documentation
    'plugin:markdown/recommended-legacy',
    'plugin:jsdoc/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // Turning off React import in JSX as handled through transforms
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    // Force display names
    // Allow unused vars if they appear before the first used argument, or start with an underscore
    'no-unused-vars': ['error', { args: 'after-used', argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' }],
    'import/no-anonymous-default-export': ['error', { allowObject: true }],
    'import/no-extraneous-dependencies': 'error',
    'jsdoc/tag-lines': ['warn', 'never', { startLines: null }],
    'jsdoc/require-returns-description': 'off',
    'jsdoc/require-param-description': 'off',
    curly: ['error', 'all'],
  },
  overrides: [
    // JSX files, i.e. react components
    {
      files: ['**/*.jsx'],
      rules: {
        // Turning off params since that is documented through proptypes
        'jsdoc/require-param': 'off',
        // Turning off returns since since vast majority of functions in a jsx file should be React components
        'jsdoc/require-returns': 'off',
      },
    },

    // Test related files
    {
      files: ['**/*.test.*'],
      rules: {
        'react/prop-types': 'off',
        'jsdoc/require-jsdoc': 'off',
        'react-perf/jsx-no-new-object-as-prop': 'off',
        'react-perf/jsx-no-new-array-as-prop': 'off',
        'react-perf/jsx-no-new-function-as-prop': 'off',
        'react-perf/jsx-no-jsx-as-prop': 'off',
      },
    },
  ],
}
