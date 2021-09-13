module.exports = {
  arrowParens: 'avoid',
  singleQuote: true,
  printWidth: 90,
  semi: true,
  trailingComma: 'all',
  svelteSortOrder: 'options-scripts-markup-styles',
  tabWidth: 2,
  plugins: ['prettier-plugin-svelte'],
  override: [{
    files: '*.svelte'
  }]
}