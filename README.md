# number-box

A React component offering a draggable number input, similar to what you'd find
in software like Ableton Live or MaxMSP. It is purposely left completely
unstyled.

# number-box

React HTML5 input with draggable number value.

**[demo](https://lokua.github.io/number-box)**

## Install

```sh
npm i @lokua/number-box
```

## Usage

```js
import NumberBox from '@lokua/number-box'

// Values below represent the default values
const numberBox = (
  <NumberBox
    value={value}
    min={0}
    max={100}
    step={1}
    // General amount of pixels it takes to drag from min to max
    pixelRange={150}
    onChange={(value) => {
      // store value
    }}
  />
)
```

## UX Notes

### Manual Input

To edit the value manually you need to double click the input which will
automatically put the input in focus and allow typing as implementation-wise
having to guess if a single click is to enter a value or begin dragging is a bit
tricky.

### Step Precision

The `step` prop represents what value the result of a drag operation will be
quantized or "snapped" to, otherwise if we strictly only allowed moving by
`step`, then for example a range of 100_000 and a step of 1 would take about 53
average computer screen's worth of dragging to get from min to max - not a great
user experience! Fortunately for precision - besides typing into the input
manually - you can hold shift while dragging to force moving exactly by `step`
increments.

## Styles

NumberBox does not ship with any styles in order to make customization as easy
as possible

## Prior Art

Implementation is loosely based on Dat GUI's
[NumberControllerBox](https://github.com/dataarts/dat.gui/blob/master/src/dat/controllers/NumberControllerBox.js)
and NexusUI's
[Number](https://github.com/nexus-js/ui/blob/master/lib/interfaces/number.js).

## License

MIT
