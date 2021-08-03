module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
  ],
  // globals: {
  //   JSX: true,
  // },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    'jsx-a11y',
    '@typescript-eslint',
  ],
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    // 'react-hooks/rules-of-hooks': 'error',
    // 'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
      alias: {
        map: [
          ['root', './src'],
          ['assets', './src/assets'],
          ['store', './src/store'],
          ['components', './src/components'],
          ['containers', './src/containers'],
          ['utils', './src/utils'],
          ['theme', '../src/theme'],
          ['i18n', './src/i18n'],
          ['mocks', './src/mocks'],
          ['modals', './src/modals'],
        ],
        extensions: ['.ts', '.js', '.tsx', '.jsx', '.json'],
      },
    },
  },
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],

};
