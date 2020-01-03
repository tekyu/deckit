module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
 	 	'prettier',
    'airbnb-base',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
 	 	'@typescript-eslint',
 	 	'prettier'
  ],
  rules: {
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    "no-param-reassign": 0,
    "prettier/prettier": 2
  },
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".ts"]
      }
    }
  },
};
