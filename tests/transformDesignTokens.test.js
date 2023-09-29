const transformDesignTokens = require('../src/transformDesignTokens.js');

for (let i = 1; i <= 1; i++) {
  test('transformDesignTokens', async () => {
    const testName = expect.getState().currentTestName;
    const input = require(`./data/${i}/${testName}/input.json`);
    const output = transformDesignTokens({ fontSizeDivisor: '1.2' }, input);
    const expectation = require(`./data/${i}/${testName}/output.json`);

    expect(output).toEqual(expectation);
  });
}