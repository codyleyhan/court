## Getting Started

<!-- generated_getting_started_start -->

Install Jest using [`yarn`](https://yarnpkg.com/en/package/jest):

```bash
yarn add --dev jest
```

Or via [`npm`](https://www.npmjs.com/):

```bash
npm install --save-dev jest
```

The minimum supported Node version is `v6.0.0` by default. If you need to support Node 4, refer to the [Compatibility issues](https://jestjs.io/docs/en/troubleshooting#compatibility-issues) section.

## Running from command line

You can run Jest directly from the CLI (if it's globally available in your `PATH`, e.g. by `yarn global add jest`) with variety of useful options.

To run all tests:

```bash
npm test
```

To run specific tests:

```bash
npm test <ComponentToTest-test.js>
```

## Note

All tests will automatically be run as part of our continuous integration testing on any new commit or PR.
