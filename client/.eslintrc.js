module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  plugins: ['jsx-a11y', 'prettier'],
  extends: [
    'eslint:recommended',
    'airbnb-base',
    //'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2019
  },
  rules: {
    quotes: [2, 'single', { avoidEscape: true }],
    'no-unused-vars': 1,
    'no-console': 1,
    'prettier/prettier': [2, { singleQuote: true, endOfLine: 'auto' }],
    'jsx-a11y/label-has-for': [
      0,
      {
        components: ['Label'],
        required: {
          every: ['nesting', 'id']
        },
        allowChildren: false
      }
    ],
    'react/prop-types': 1,
    'react/jsx-key': 1,
    'class-methods-use-this': 0
  },
  settings: {
    'import/resolver': {
      node: { 
        extensions: ['.js','.jsx'],
        paths: 'src' 
      }
    }
  }
};
