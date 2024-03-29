<img alt="Okuna logo" src="https://i.snag.gy/FAgp8K.jpg" width="200">

[![npm version](https://img.shields.io/npm/v/okuna.svg?style=flat-square)](https://www.npmjs.com/package/okuna) [![CircleCI](https://circleci.com/gh/OkunaOrg/okuna-js/tree/master.svg?style=svg)](https://circleci.com/gh/OkunaOrg/okuna-js/tree/master) [![Maintainability](https://api.codeclimate.com/v1/badges/ac3ecb4e41ecfc2ecaf8/maintainability)](https://codeclimate.com/github/OkunaOrg/okuna-js/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/ac3ecb4e41ecfc2ecaf8/test_coverage)](https://codeclimate.com/github/OkunaOrg/okuna-js/test_coverage) [![gitmoji badge](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square)](https://github.com/carloscuesta/gitmoji)

Okuna.js (beta) - A library for Node.js and the browser to connect to the Okuna API.

This library is currently in **public beta**, so errors might appear here and there. If you've stumbled upon an error, please [report it in the library's issue tracker](https://github.com/OkunaOrg/okuna-js/issues/new).

## Table of Contents
- [Requirements](#requirements)
- [Installation](#installation)
- [Documentation](#documentation)
- [Contributing](#contributing)
    + [Code of Conduct](#code-of-conduct)
    + [License](#license)
    + [Other issues](#other-issues)
    + [Git commit message conventions](#git-commit-message-conventions)
- [Getting Started](#getting-started)

## Requirements
* [Node.js](https://nodejs.org/en/) (>=8.x is recommended)
* [okuna-api](https://github.com/OkunaOrg/okuna-api) for local development

## Installation

You can install the library using npm:

```
npm i okuna
```

or Yarn:

```
yarn add okuna
```

## Documentation

You can read the library documentation [here](https://okunaorg.github.io/okuna-js/).

## Contributing

There are many different ways to contribute to the project's development, just find the one that best fits with your skills and open an issue/pull request in the repository.

Examples of contributions we love include:

- **Code patches**
- **Bug reports**
- **Patch reviews**

#### Code of Conduct

Please read and follow our [Code of Conduct](https://github.com/OkunaOrg/okuna-js/blob/master/CODE_OF_CONDUCT.md).

#### License

Every contribution accepted is licensed under [MIT](https://opensource.org/licenses/MIT) or any later version. 
You must be careful to not include any code that can not be licensed under this license.

Please read carefully [our license](https://github.com/OkunaOrg/okuna-js/blob/master/LICENSE) and ask us if you have any questions.

#### Responsible disclosure

Cyber-hero? Check out our [Vulnerability Disclosure page](https://www.okuna.io/en/vulnerability-report).

#### Other issues

We're available almost 24/7 in the Okuna slack channel. [Join us!](https://join.slack.com/t/okunaorg/shared_invite/enQtNDI2NjI3MDM0MzA2LTYwM2E1Y2NhYWRmNTMzZjFhYWZlYmM2YTQ0MWEwYjYyMzcxMGI0MTFhNTIwYjU2ZDI1YjllYzlhOWZjZDc4ZWY)

#### Git commit message conventions

Help us keep the repository history consistent 🙏!

We use [gitmoji](https://gitmoji.carloscuesta.me/) as our git message convention.

If you're using git in your command line, you can download the handy tool [gitmoji-cli](https://github.com/carloscuesta/gitmoji-cli).

## Getting Started

#### Clone the repository:

```sh
git clone git@github.com:jozsefsallai/okuna.js.git
cd okuna.js
```

#### Install the dependencies:

```sh
npm install
```

#### To run a development build:

```sh
npm run watch
```

#### To make a single build of the files:

```sh
npm run build
```

#### To build for both Node and the browser, run:

```sh
npm run prepare
```

#### Make sure that your changes pass linting:

```sh
npm run lint
```

#### ...and that your tests are okay:

```sh
npm run test
```

#### Happy coding 🎉!
