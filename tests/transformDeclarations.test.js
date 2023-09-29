const transformDeclarations = require('../src/transformDeclarations.js');

for (let i = 1; i <= 1; i++) {
  test('transformDeclarations', async () => {
    const testName = expect.getState().currentTestName;
    const input = require(`./data/${i}/${testName}/input.json`);
    const output = transformDeclarations({}, input);
    const expectation = require(`./data/${i}/${testName}/output.json`);

    expect(output).toEqual(expectation);
  });
}