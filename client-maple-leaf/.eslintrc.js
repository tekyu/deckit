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
    // 'jsx-a11y',
    '@typescript-eslint',
  ],
  rules: {
    'react/jsx-props-no-spreading': 'warn',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx', '.tsx'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
      },
    ],
    'import/named': 'warn',
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['warn'],
    // 'react-hooks/rules-of-hooks': 'error',
    // 'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'warn',
    'react/require-default-props': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        moduleDirectory: ['node_modules', 'src/'],
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
