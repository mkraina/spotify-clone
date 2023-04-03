module.exports = {
  extends: [
    '../../.eslintrc.js',
    '@react-native-community',
    '@react-native-community',
    'plugin:react-perf/recommended',
  ],
  plugins: ['react-perf', 'react-memo'],
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        'react-memo/require-memo': 'error',
      },
    },
  ],
  rules: {
    'react-memo/require-usememo': 'error',
    'react-native/no-inline-styles': 'off',
    'react-perf/jsx-no-new-function-as-prop': 'error',
    'react-perf/jsx-no-new-object-as-prop': 'error',
    'react-perf/jsx-no-new-array-as-prop': 'error',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          { name: 'react-native-paper', message: 'Please import from UI module instead.' },
          {
            name: 'react-native',
            importNames: ['Text'],
            message: 'Please use Text from UI module instead.',
          },
        ],
        patterns: [
          {
            group: [
              '@react-navigation/native',
              '@react-navigation/native/lib/typescript/src/theming/useTheme',
            ],
            importNames: ['useTheme', 'default'],
            message: 'Please use Text from UI module instead.',
          },
        ],
      },
    ],
  },
};
