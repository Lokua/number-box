# number-box

React HTML5 input with draggable number value.

**[demo](https://lokua.github.io/number-box)**

## Install

```
npm i @lokua/number-box --save
```

## Usage

```js
import NumberBox from '@lokua/number-box'
// ...
// default range of 0 - 127
<NumberBox
  value={this.state.value}
  onChange={value => {
    this.setState({ value })
  }}
/>
```

## API / Props

### Defaults (not required)

* `value = 0`
* `min = 0`
* `max = 127`
* `step = 1`
* `decimals = 0`

### Required

* `onChange(value)`

### Additional Input Props

NumberBox will pass virtually all props on to the underlying `HTMLInputElement`,
however certain handlers cannot be overriden in order for `NumberBox` to work
correctly, including:

* `onBlur`
* `onMouseMove`
* `onMouseDown`
* `onMouseUp`
* `onKeyDown`

You can still supply them in props, however,
and they will be called after NumberBox has done its thing with its own
implementation.

## Styles

NumberBox does not ship with any styles in order to make
customization as easy as possible. See the
**[demo](https://lokua.github.io/number-box)** for some possible inspiration

## Priot Art

Most of the implementation is based on Dat GUI's [NumberControllerBox](https://github.com/dataarts/dat.gui/blob/master/src/dat/controllers/NumberControllerBox.js)
and NexusUI's [Number](https://github.com/nexus-js/ui/blob/master/lib/interfaces/number.js).

## License

MIT
