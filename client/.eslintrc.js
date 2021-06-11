module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react', "react-hooks"
  ],
  rules: {
    quotes: [2, "backtick"],
    "import/prefer-default-export": 0,
    "no-unused-vars": 1,
    "no-console": 1,
    "no-shadow": 0,
    "jsx-a11y/label-has-for": [
      0,
      {
        components: ["Label"],
        required: {
          every: ["nesting", "id"]
        },
        allowChildren: false
      }
    ],
    "react/prop-types": 1,
    "react/jsx-key": 1,
    "class-methods-use-this": 1,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "no-param-reassign": [
      "error",
      { props: true, ignorePropertyModificationsFor: ["draft"] }
    ],
    "import/named": 0
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["root", "./src"],
          ["assets", "./src/assets"],
          ["store", "./src/store"],
          ["components", "./src/components"],
          ["containers", "./src/containers"],
          ["utils", "./src/utils"],
          ["theme", "../src/theme"],
          ["i18n", "./src/i18n"],
          ["mocks", "./src/mocks"]
        ],
        extensions: [".ts", ".js", ".jsx", ".json"]
      }
    }
  }

};
