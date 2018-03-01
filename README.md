# number-box

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]

<!-- [![npm][npm]][npm] -->

<!-- [![Coveralls][coveralls-badge]][coveralls] -->

React HTML5 input with draggable number value similar to MaxMSP GUI elements.
Code almost 100% based on Dat GUI's [NumberBoxController](https://github.com/dataarts/dat.gui/blob/master/src/dat/controllers/NumberControllerBox.js)

## Install

```
npm i @lokua/number-box --save
```

## Usage

See [demo/src/index.js][demo-source] for a simple usage example

## Notes

The `NumberBox` component does not ship with any styles in order to make
customization by consumers as easy as possible. All additional properties
are passed on to the native input element so inline styles, styled-components,
glamorous, or className extensions will all work.

[build-badge]: https://img.shields.io/travis/Lokua/number-box/master.png?style=flat-square
[build]: https://travis-ci.org/Lokua/number-box.svg?branch=master
[npm-badge]: https://img.shields.io/npm/v/@lokua/number-box.png?style=flat-square
[npm]: https://www.npmjs.org/package/@lokua/number-box

<!-- [coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square -->

<!-- [coveralls]: https://coveralls.io/github/user/repo -->

[demo-source]: demo/src/index.js
