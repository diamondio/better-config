Simple Config Library
---------------------

[![npm package](https://nodei.co/npm/better-config.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/better-config/)

[![Build status](https://img.shields.io/travis/diamondio/better-config.svg?style=flat-square)](https://travis-ci.org/diamondio/better-config)
[![Dependency Status](https://img.shields.io/david/diamondio/better-config.svg?style=flat-square)](https://david-dm.org/diamondio/better-config)
[![Known Vulnerabilities](https://snyk.io/test/npm/better-config/badge.svg?style=flat-square)](https://snyk.io/test/npm/better-config)
[![Gitter](https://img.shields.io/badge/gitter-join_chat-blue.svg?style=flat-square)](https://gitter.im/diamondio/better-config?utm_source=badge)

This is a simple config library for use in NodeJS. Get started with:

```bash
npm install --save better-config
```

## Usage

```js
var config = require('better-config');
```

Here are the ways to set the config - For a big project you probably want to set the defaults, then set a config.json file (if they have one). If there is no file, the set call does nothing.

```js
// Plain vanilla object setting
config.message = 'hello world';

// Set using the set function
config.set({ message: 'this is the default value' });

// Set using a json file
config.set('./package.json');

// Set using a js file
config.set('./defaults.js');

// Set using a function
config.set(function () {
  return { sum: 1+1 }
});
```

You can simply access the config like you would any other object:
```js
// Plain vanilla object get
console.log(config.message)

// Get by function
console.log(config.get('some.deep.array[0].property'))
```

Contributions welcome!

### Credits
This library was initially made by the awesome team of engineers at [Diamond](https://diamond.io).

If you haven't already, make sure you install Diamond!
