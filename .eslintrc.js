module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
    'react-native/react-native': true,
    'jest/globals': true,
  },
  extends: [
    'plugin:react/recommended',
    'prettier',
    'eslint:recommended',
    'plugin:jest/recommended',
  ],

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  plugins: ['react', 'react-native', 'detox'],
  ignorePatterns: ['!.*', 'dist', 'node_modules'],
  rules: {
    'react/prop-types': 'off',
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        ignoredNodes: ['ConditionalExpression'],
      },
    ],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': ['error'],
    'no-unused-vars': ['error', {vars: 'all'}],
  },

  settings: {
    react: {
      version: 'detect',
    },
  },
};
