module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['import', 'prettier', 'jest'],
  rules: {
     "no-underscore-dangle": ["error", { "allow": ["_id"] }],
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['react'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
      },
    ],
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'consistent-return': 'off',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var'],
        next: '*',
      },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
    ],
    'no-shadow': 'off',
    'no-debugger': 'error',
    'no-unused-vars': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'no-magic-numbers': 'off',
    'no-use-before-define': 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state', 'self'],
      },
    ],
    'default-param-last': 'off',
  },
  settings: {
    'import/resolver': {
      alias: true,
      map: [['@', './src']],
    },
  },
};
