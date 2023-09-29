#!/usr/bin/env node

const { program } = require('commander');
const extractDeclarations = require('./src/extractDeclarations');
const packageJson = require('./package.json');
const path = require('path');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const transformDeclarations = require('./src/transformDeclarations');
const transformDesignTokens=require('./src/transformDesignTokens');
const writeThemeJson = require('./src/writeThemeJson');

program
    .name(Object.keys(packageJson.bin)[0])
    .version(packageJson.version, '-v, --version')
    .description(packageJson.description)
    .requiredOption('--tokenCssPath <path>', 'path to token CSS file relative to current working directory')
    .option('--fontSizeDivisor <value>', 'calculate mobile font size based on provided deskto value', '1.2')
	  .parse();

const themeJsonPath = path.join(process.cwd(), 'theme.json');
const rl = readline.createInterface({ input, output });
rl.question(`\x1b[2m This script will manipulate \x1b[0m${themeJsonPath}\x1b[2m. \x1b[1mProceed? \x1b[0m`, (answer) => {
  if (answer !='y' && answer !='yes') {
    process.exit();
  }

  run();

  rl.close();
});

async function run() {
    const declarations = await extractDeclarations(program.opts());
    const designTokens = transformDeclarations(program.opts(), declarations);
    const transformedDesignTokens = transformDesignTokens(program.opts(), designTokens);

    writeThemeJson(program.opts(), transformedDesignTokens);
};