const fs = require('fs').promises;
const path = require('path');
const { humanizeSlug, printError, printSuccess } = require('./utils');

async function writeThemeJson(options, designTokens) {
  if (!designTokens) {
      printError('No design tokens to insert')
      process.exit(1);
  }

  const themeJsonPath = path.join(process.cwd(), 'theme.json');

  try {
      await fs.access(themeJsonPath);
  } catch {
      printError('Could not find theme.json in ' + process.cwd());
      process.exit(1);
  }

  const themeJsonBuffer = await fs.readFile(themeJsonPath);
  const themeJson = JSON.parse(themeJsonBuffer.toString());

  themeJson.settings.color.palette = designTokens.palette || [];
  themeJson.settings.typography.fontFamilies = designTokens.fontFamilies || [];
  themeJson.settings.typography.fontSizes = designTokens.fontSizes || [];
  themeJson.settings.custom = designTokens.custom || {};

  const updatedThemeJson = JSON.stringify(themeJson, null, 2);
  await fs.writeFile(themeJsonPath, updatedThemeJson);

  printSuccess('Injected tokens into theme.json successfully');
}

module.exports = writeThemeJson;