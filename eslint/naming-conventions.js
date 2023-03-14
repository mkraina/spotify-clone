const nonFunctionTypes = ['boolean', 'string', 'number', 'array'];

const variables = [
  {
    selector: 'variable',
    types: nonFunctionTypes,
    format: ['camelCase'], //, 'UPPER_CASE'],
  },
  /*{
    //UPPER_CASE on exported variables
    selector: 'variable',
    types: nonFunctionTypes,
    format: ['UPPER_CASE'],
    modifiers: ['global', 'exported'],
  },*/
  {
    //no format on descrutured variables
    selector: 'variable',
    types: nonFunctionTypes,
    format: null,
    modifiers: ['destructured'],
  },
];

const functions = [
  {
    selector: 'variable',
    types: ['function'],
    format: ['camelCase', 'PascalCase'],
  },
  { selector: 'function', format: ['camelCase'] },
];

const parameters = [
  {
    selector: 'parameter',
    format: ['camelCase'],
    leadingUnderscore: 'allow',
  },
  {
    selector: 'parameter',
    format: null,
    modifiers: ['destructured'],
  },
];

const types = [{ selector: 'typeLike', format: ['PascalCase'] }];

// eslint-disable-next-line no-undef
module.exports = ['error', ...variables, ...functions, ...parameters, ...types];
