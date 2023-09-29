const css = require('css');
const fs = require('fs').promises;
const path = require('path');
const { printError } = require('./utils');

async function extractDeclarations(options) {
    const tokenCssPath = path.join(process.cwd(), options.tokenCssPath);

    try {
        await fs.access(tokenCssPath);
    } catch {
        printError('Could not read ' + tokenCssPath);
        process.exit(1);
    }

    const tokensCssBuffer = await fs.readFile(tokenCssPath);
    const tokensCssAst = css.parse(tokensCssBuffer.toString());

    if (!tokensCssAst?.stylesheet?.rules) {
        printError('Could not parse ' + tokenCssPath);
        process.exit(1);
    }

    let declarations = [];
    tokensCssAst.stylesheet.rules.forEach((rule) => {
        if (rule.type !== 'rule' && !rule.declarations) {
            return;
        }

        // Convert selector to comment so that we can group easier later
        if (rule.type === 'rule' && rule.selectors[0]) {
            declarations = [
                ...declarations,
                {
                    type: 'comment',
                    comment: rule.selectors[0]
                }
            ];
        }

        declarations = [
            ...declarations,
            ...rule.declarations
        ];
    });

    const designTokens = {};
    let groupPrefix;
    declarations.forEach((declaration, index) => {
        if (declaration.type === 'comment') {
            groupPrefix = commentToGroupPrefix(declaration.comment);
            return;
        }

        if (designTokens[groupPrefix] === undefined) {
            designTokens[groupPrefix] = {};
        }

        designTokens[groupPrefix][declaration.property] = declaration.value;
    });

    return designTokens;
}

function commentToGroupPrefix(comment) {
    switch(comment.trim()) {
        case 'Colors:':
            return 'color';
        case 'Font/text values':
            return 'typography';
        default:
            return comment.replace(/^\./, ''); // Remove leading dot
    }
}

module.exports = extractDeclarations;