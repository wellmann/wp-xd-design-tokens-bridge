const extractDeclarations = require('../src/extractDeclarations.js');

for (let i = 1; i <= 1; i++) {
  test('extractDeclarations', async () => {
    const testName = expect.getState().currentTestName;
    const inputPath = `tests/data/${i}/${testName}/input.css`;
    const output = await extractDeclarations({ tokenCssPath: inputPath });
    const expectation = require(`./data/${i}/${testName}/output.json`);

    expect(output).toEqual(expectation);
  });
}