# number-box

React HTML5 input with draggable number value.

## Install

```
npm i @lokua/number-box --save
```

## Usage

See [demo](https://lokua.github.io/number-box) or view demo code at [demo/src/index.js][demo/src/index.js]

## API / Props

NumberBox only renders a single `HTMLInputElement` and you can pass any props
that `input[type=text]` allows in addition to `decimal: number`, which specifies
the amount of decimal points a number should be rounded to (default is 1).

The only required prop is `onChange` which will be called with `value`.

##### Defaults (not required)

* `value = 0`
* `min = 0`
* `max = 127`
* `step = 1`
* `decimals = 0`

##### Required

* `onChange(value)`

##### Additional Input Props

Note that while you can supply any props to the underlying input,
certain handlers cannot be overriden in order for `NumberBox` to work correctly.
These include:

* `onBlur`
* `onMouseMove`
* `onMouseDown`
* `onMouseUp`
* `onKeyDown`

While they cannot be overridden you can still supply them in props,
and they will be called _after_ NumberBox has done its thing with its own
implementation.

## Styles

NumberBbox does not ship with any styles in order to make
customization as easy as possible.

## Priot Art

Most of the implementation is based on Dat GUI's [NumberControllerBox](https://github.com/dataarts/dat.gui/blob/master/src/dat/controllers/NumberControllerBox.js)
and NexusUI's [Number](https://github.com/nexus-js/ui/blob/master/lib/interfaces/number.js)

## License

MIT
