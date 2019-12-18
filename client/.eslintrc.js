module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  plugins: ['jsx-a11y', 'prettier', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier/react',
    'plugin:prettier/recommended',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2019
  },
  rules: {
    quotes: [2, 'backtick'],
    'no-console': 1,
    'import/prefer-default-export': 0,
    "no-shadow": 0,
    'prettier/prettier': [
      2,
      {
        endOfLine: 'auto'
      }
    ],
    "react-hooks/rules-of-hooks": 2,
    "react-hooks/exhaustive-deps": 2
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
        paths: 'src'
      }
    }
  }
};
