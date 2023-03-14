module.exports = {
  extends: ['../../.eslintrc.js', '@react-native-community', '@react-native-community'],
  plugins: ['react-memo'],
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
  },
};
