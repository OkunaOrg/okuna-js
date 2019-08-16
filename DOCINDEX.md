# Okuna.js Documentation

Welcome to the Okuna.js documentation page! Okuna.js is a JavaScript library that allows you to interact with the [Okuna API](https://okuna.io). It can be used both in the browser and in Node.js.

## Getting Started

### Node.js

The first thing you need to do is to install the package. To do this, you can either run

```sh
npm i okuna
```

or, if you prefer Yarn:

```sh
yarn add okuna
```

Depending on your setup, you want to use one of these:

**CommonJS:**

```js
const { Client } = require('okuna');
const client = new Client();

const health = await client.health().getHealth();
```

**ES6 imports:**

```js
import { Client } from 'okuna';
const client = new Client();

const health = await client.health().getHealth();
```

### Browser

#### If you use a bundler (e.g.: Webpack)

The process is nearly identical to the one of Node.js. Install the library using the steps described in the Node.js setup and use the ES6 imports method for working with the library.

#### If you don't use a bundler

Import the bundled and minified script from the JSDelivr CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/okuna@0.1/dist/okuna.min.js"></script>
```

This will register the `Okuna` variable in your website's DOM. You can use the library like this:

```js
const { Client } = Okuna;
// or const client = new Okuna.Client();

const client = new Client();

const health = await client.health().getHealth();
// Note: older browsers don't support async/await.
```

**Note:** The `okuna.min.js` file has additional dependencies bundled in. These dependencies include [Axios](https://npmjs.com/axios), [isomorphic-fetch](https://npmjs.com/isomorphic-fetch), and [isomorphic-form-data](https://npmjs.com/isomorphic-form-data) to ensure that the library works. You may or may not have one or more of these libraries loaded in your web page already. Unless you know what you doing, you should **use a bundler** to reduce the size of your assets, have a better development experience, and remove potential conflicts.

## Working With the Library

This web page contains a documentation on how exactly the API of the library works and how you should use it in your projects. You should start by reading more about [the Okuna.js Client class](/classes/client.html).

## Questions?

Feel free to [open an issue in the library's Github repository](https://github.com/jozsefsallai/okuna.js/issues).
