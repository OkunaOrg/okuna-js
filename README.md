# Okuna.js

[![Build Status](https://travis-ci.org/jozsefsallai/okuna.js.svg)](https://travis-ci.org/jozsefsallai/okuna.js) [![Coverage Status](https://coveralls.io/repos/github/jozsefsallai/okuna.js/badge.svg?branch=master)](https://coveralls.io/github/jozsefsallai/okuna.js?branch=master) [![npm version](https://img.shields.io/npm/v/okuna.svg?style=flat)](https://www.npmjs.com/package/okuna)

A library for Node.js and the browser to connect to the Okuna API. Currently very WIP.

## Docs

### Basic Usage

Node.js:

```js
const { Client } = require('okuna');
const client = new Client({
  authToken: 'your-token'
});

const health = await client.health().getHealth();
```

Browser (linked directly in the HTML):

```js
const { Client } = Okuna;
const client = new Client({
  authToken: 'your-token'
});

const health = await client.health().getHealth();
```

*Note: the usage of a bundler (e.g.: Webpack) is highly recommended as it makes the development process smoother.*

### This section is a WIP and will be moved to a separate page.

## Contribution

Contribution is always welcome and appreciated!

Clone the repository:

```sh
git clone git@github.com:jozsefsallai/okuna.js.git
cd okuna.js
```

Install the dependencies:

```sh
npm i -g yarn
yarn
```

To run a development build:

```
yarn watch
```

To make a single build of the files:

```
yarn build
```

To build for both Node and the browser, run:

```
yarn prepare
```

Make sure that your changes pass linting:

```
yarn lint
```

...and that your tests are okay:

```
yarn test
```
