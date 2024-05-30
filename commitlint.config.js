module.exports = {
  parserPreset: './parser.js',
  extends: [
    '@commitlint/config-conventional',
    '@commitlint/config-lerna-scopes'
  ],
  plugins: ['commitlint-plugin-function-rules'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test'
      ]
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [1, 'always'],
    'subject-case': [2, 'always', ['sentence-case', 'lower-case']],
    'subject-empty': [1, 'always'],
    'header-max-length': [2, 'always', 72],
    'scope-case': [2, 'always', 'lower-case'],
  },
};