const { humanizeSlug } = require('./utils');

const groupSectionMap = {
  color: {
    section: 'palette',
    valueKey: 'color'
  },
  'font-family': {
    section: 'fontFamilies',
    valueKey: 'fontFamily'
  },
  'font-size': {
    section: 'fontSizes',
    valueKey: 'size'
  }
};

function transformDesignTokens(options, designTokens) {
  let transformedDesignTokens = {
    palette: [],
    fontFamilies: [],
    fontSizes: [],
    custom: {}
  };

  Object.entries(designTokens).forEach(([group, groupDeclarations], tokenIndex) => {
    Object.entries(groupDeclarations).forEach(([key, value], groupIndex) => {
      if (!groupSectionMap[group]) {
        return;
      }

      const { section, valueKey } = groupSectionMap[group];

      transformedDesignTokens[section][groupIndex] = {
        name: humanizeSlug(key),
        slug: key,
        [valueKey]: value
      };

      if (group === 'font-size') {
        let min = parseInt(value) / parseFloat(options.fontSizeDivisor);

        transformedDesignTokens[section][groupIndex]['fluid'] = {
          min: Math.ceil(min >= 12 ? min : 12) + 'px',
          max: value
        };
      }

      delete designTokens[group];
    });
  });

  transformedDesignTokens.custom = designTokens; // Asssign remaining tokens to custom section

  return transformedDesignTokens;
}

module.exports = transformDesignTokens;