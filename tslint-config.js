const customRules = {

  //
  // Temporary settings
  //
  // This section covers issues that needs additional work on investigation, extensive work, ...

  // allow multiline expressions in jsx such as ternars etc.
  'jsx-no-multiline-js': false,

  // allow arrow functions in render function of React component (event handlers etc)
  'jsx-no-lambda': false,

  // enable console logs
  'no-console': false,

  // doesn't work properly with else if
  'no-else-after-return': false,

  //
  // Permanent settings
  //

  // permanently disallow semicolons
  'semicolon': [true, 'never'],

  // line length of 120 chars, ignored template strings and urls
  'max-line-length': [
    true, {
      'ignore-pattern': '(http)|(`)|(import)',
      'limit': 140,
    },
  ],

  'no-shadowed-variable': true,

  // disable checking for imported names (doesn't support import _isEmpty from 'lodash/isEmpty)
  'import-name': false,

  // allow max 2 consecutive blank lines
  'no-consecutive-blank-lines': [true, 2],

  // support arrow function argument without parentheses
  'arrow-parens': false,
  'ter-arrow-parens': false,

  // support both Array<string> and string[] type notations
  'prefer-array-literal': false,

  // ban JS/TS keywords and reserved names, allow camelCase, PascalCase, UPPER_CASE and _leadingUnderscore
  'variable-name': [true, 'ban-keywords', 'check-format', 'allow-pascal-case', 'allow-leading-underscore'],

  // disable regex checking for function name, React components have capitalized name
  'function-name': false,

  // use jsx only attributeName, when boolean true instead of attributeName={true}
  'jsx-boolean-value': [true, 'never'],

  // disable ordering shorthand properties in object literal
  'object-shorthand-properties-first': false,

  'align': [true, 'elements', 'members', 'parameters', 'statements'],

  'whitespace': [
    true,
    'check-branch',
    'check-decl',
    'check-module',
    'check-separator',
    'check-rest-spread',
    'check-type',
    'check-operator',
    'check-type-operator',
    'check-preblock',
    'check-typecast',
  ],

  'jsx-wrap-multiline': true,
  'jsx-self-close': true,
  'jsx-no-string-ref': true,
  'jsx-key': true,

  'no-multi-spaces': true,

  // in favor of WebStorm incapability prefer array accessing 'array[0]' without spaces.
  // We could enable this rule with parameter ['warn', 'always', {singleValue: true}] when WebStorm could handle it:
  // const [ a, b, c ] = myArray; const value = myArray[0];
  // but const [ a ] = myArray can't handle neither ESLint, it is reformatted to: const [a] = myArray
  'array-bracket-spacing': [true, 'never'], // http://eslint.org/docs/rules/array-bracket-spacing

  'no-increment-decrement': false
}

module.exports = {

  // Installations

  // Rule "import/no-extraneous-dependencies"
  // The error: "'src' should be listed in the project's dependencies. Run 'npm i -S src' to add it"
  // is fixed with "settings": {"import/resolver": "webpack"}. See
  // https://github.com/benmosher/eslint-plugin-import/issues/496 It requires "eslint-import-resolver-webpack"


  plugins: [],

  extends: [
    'tslint-config-airbnb',
    'tslint-react',
    'tslint-eslint-rules',
    'tslint-react-hooks',
  ],

  linterOptions: {
    exclude: [
      '**/*-test.*',
      'static/**',
      '**/environment*',
    ],
  },

  defaultSeverity: 'warning',

  rules: customRules,
}
