function humanizeSlug(slug) {
  return slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (s) => s.toUpperCase());
}

function printError(message) {
  console.error('\x1b[1m\x1b[31m', 'x', message, '\x1b[0m');
}

function printSuccess(message) {
  console.log('\x1b[1m\x1b[32m', '✔︎', message, '\x1b[0m');
}

module.exports = {
  humanizeSlug,
  printError,
  printSuccess
};