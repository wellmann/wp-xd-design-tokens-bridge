#!/usr/bin/env node

const { program } = require('commander');
const extractDeclarations = require('./src/extractDeclarations');
const packageJson = require('./package.json');
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

(async function () {
    const declarations = await extractDeclarations(program.opts());
    const designTokens = transformDeclarations(program.opts(), declarations);
    const transformedDesignTokens = transformDesignTokens(program.opts(), designTokens);

    writeThemeJson(program.opts(), transformedDesignTokens);
})();