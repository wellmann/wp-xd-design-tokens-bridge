# WP XD Design Tokens Bridge

Node.js CLI script to inject the Adobe XD developer export variables into WordPress theme.json.

Inpired by https://github.com/Automattic/vip-design-system-bridge

## Command

The command must be run from the theme root.

### Without setup

`npx github:wellmann/wp-xd-design-tokens-bridge [options]`


### As a project dependency

Add a `.npmrc` file to your project root next to the package.json wiht the following contents:
```
@wellmann:registry=https://npm.pkg.github.com
```
Authentication to [GitHub Packages](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages).

Or just add it to your dependencies like so:
```json
{
  "dependencies": {
    "@wellmann/wp-xd-design-tokens-bridge": "github:wellmann/wp-xd-design-tokens-bridge#dev-master"
  }
}
```

`inject-design-tokens [options]`

## Options

| Flag | Alias | Description |
| :--- | :--- | :--- |
| `--help` | `-h` | display help for command
| `--tokenCssPath` |  | path to token CSS file relative to current working directory
| `--fontSizeDivisor` |  | calculate mobile font size based on provided deskto value