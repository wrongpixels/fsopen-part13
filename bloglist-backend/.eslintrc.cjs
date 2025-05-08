module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: ['eslint:recommended'],
  rules: {
    // NO semicolons ✓
    semi: ['error', 'never'],
    // single quotes, but allow escaping
    quotes: ['error', 'single', { avoidEscape: true }],
  },
}
