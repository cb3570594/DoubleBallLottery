module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['@typescript-eslint', 'import'],
  extends: ['airbnb-base', 'plugin:import/typescript'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/extensions': {
      node: ['.ts'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'import/no-unresolved': 'error',
  },
};
