function transformDeclarations(options, declarations) {
  let transformedDeclarations = {};

  // Save CSS variables in a map to look up later
  let variables = {};
  Object.entries(declarations).forEach(([group, groupDeclarations], index) => {
    if (!['color', 'typography'].includes(group)) {
      return;
    }

    variables = {
      ...variables,
      ...groupDeclarations
    };
  });

  // Replace CSS variable references with actual values
  // Convert line-height + letter-spacing to relative units
  Object.entries(declarations).forEach(([group, groupDeclarations], index) => {
    if (['color', 'typography'].includes(group)) {
      return;
    }

    Object.entries(groupDeclarations).forEach(([key, value]) => {
      if (transformedDeclarations[group] === undefined) {
        transformedDeclarations[group] = {};
      }

      const variableKey = value.replace(/var\((.*)\)/i, '$1');
      let newValue = variables[variableKey] || value;

      if (newValue === '0px') {
        return;
      }

      const fontSize = parseInt(transformedDeclarations[group]['font-size']);

      switch(key) {
        case 'line-height':
          let lineHeight = parseInt(newValue);

          newValue = fontSize ? (lineHeight / fontSize).toString() : lineHeight;
          break;
        case 'letter-spacing':
          let letterSpacing = parseInt(newValue);

          newValue = (((100 / fontSize) * letterSpacing) / 100) + 'em';
          break;
      }

      transformedDeclarations[group][key] = newValue;
    });
  });

  // Remove double dash from color key
  Object.entries(declarations).forEach(([group, groupDeclarations], index) => {
    if (!['color'].includes(group)) {
      return;
    }

    Object.entries(groupDeclarations).forEach(([key, value]) => {
      if (transformedDeclarations[group] === undefined) {
        transformedDeclarations[group] = {};
      }

      const newKey = key.replace(/^--/, '');
      transformedDeclarations[group][newKey] = value;
    });
  });

  // Group font-families + font-sizes
  Object.entries(declarations).forEach(([group, groupDeclarations], index) => {
    if (!['typography'].includes(group)) {
      return;
    }

    Object.entries(groupDeclarations).forEach(([key, value]) => {

      let newKey;
      switch(true) {
        case key.includes('font-family'):
          transformedDeclarations['font-family'] = transformedDeclarations['font-family'] || {};

          newKey = key.replace('--unnamed-font-family-', '');
          transformedDeclarations['font-family'][newKey] = value + ', sans-serif';
          break;
        case key.includes('font-size'):
          transformedDeclarations['font-size'] = transformedDeclarations['font-size'] || {};

          newKey = key.replace('--unnamed-font-size-', '');
          transformedDeclarations['font-size'][newKey] = value;
          break;
      }
    });
  });

  return transformedDeclarations;
}

module.exports = transformDeclarations;