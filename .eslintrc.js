/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  plugins: [
    'react',
    'react-perf',
    'react-hooks',
    '@typescript-eslint',
    '@shopify',
    'import',
    'simple-import-sort',
    'prefer-arrow',
    'prettier',
    'typescript-sort-keys',
    'typescript-enum',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    requireConfigFile: false,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/naming-convention': require('./eslint/naming-conventions.js'),
        '@typescript-eslint/no-unnecessary-condition': 'error',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/prefer-optional-chain': 'error',
      },
    },
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    react: {
      version: 'detect',
    },
  },
  extends: [
    'plugin:react-perf/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:typescript-enum/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  ignorePatterns: ['node_modules/'],
  rules: {
    // code readibility
    complexity: ['error', 25], // https://eslint.org/docs/rules/complexity
    'max-nested-callbacks': ['error', 4], // https://eslint.org/docs/rules/max-nested-callbacks
    'max-params': ['error', 5], // https://eslint.org/docs/rules/max-params
    'max-depth': ['error', 3], // https://eslint.org/docs/rules/max-depth
    'max-len': ['error', 200], // https://eslint.org/docs/rules/max-len
    'max-lines': ['error', 300], // https://eslint.org/docs/rules/max-lines
    'max-statements': ['error', 10], // https://eslint.org/docs/rules/max-statements
    'max-lines-per-function': ['error', 50], //https://eslint.org/docs/rules/max-lines-per-function
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    'react/jsx-key': ['error', { checkFragmentShorthand: true, checkKeyMustBeforeSpread: true }],
    '@shopify/prefer-early-return': 'error',
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],
    'object-shorthand': ['error', 'always'],
    'typescript-sort-keys/interface': ['error', 'asc', { natural: false, requiredFirst: true }],
    'no-useless-concat': 'error',
    'prefer-template': 'error',
    'no-loop-func': 'error',
    'no-mixed-operators': [
      'error',
      {
        groups: [
          ['+', '-', '%', '&&', '||'],
          ['*', '/', '%', '&&', '||'],
        ],
      },
    ],
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        reservedFirst: true,
      },
    ],
    // Hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',

    // Promises
    'require-await': 'error',
    'no-void': ['error', { allowAsStatement: true }],

    //Localization
    'react/jsx-no-literals': [
      'error',
      {
        ignoreProps: true,
        noStrings: true,
        //allowedStrings: [...Object.keys(iconSet || {}), 'outline', 'solid', 'text', 'checkbox'],
      },
    ],

    'prettier/prettier': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-cycle': ['error', { maxDepth: 4 }],
    '@shopify/no-ancestor-directory-import': 'error',

    '@typescript-eslint/array-type': ['error', { default: 'array' }],
    'no-extra-boolean-cast': 'error',
    'no-negated-condition': 'error',
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsForRegex: [`.*[Rr]ef`] },
    ],

    'no-shadow': 'error',
    'no-catch-shadow': 'off',
    'no-warning-comments': 'warn',
    radix: ['error', 'as-needed'],

    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^\\u0000'], // Side effect imports.
          ['^react', '^@?\\w'], // Packages, packages starting "react" first
          ['^'], // Absolute imports
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'], // Parent imports. Put `..` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'], // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./styled'], // Styled
        ],
      },
    ],
    'simple-import-sort/exports': 'error',

    // enforce arrow functions
    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    'func-style': ['error', 'expression', { allowArrowFunctions: true }],
    '@typescript-eslint/no-use-before-define': 'error',
  },
};
