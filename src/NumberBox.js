import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { clamp, isNumeric, roundToDecimal } from './util'

// prior art:
// https://github.com/dataarts/dat.gui/blob/master/src/dat/controllers/NumberControllerBox.js
// https://github.com/nexus-js/ui/blob/master/lib/interfaces/number.js
export default class NumberBox extends Component {
  static propTypes = {
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    decimals: PropTypes.number,
    onChange: PropTypes.func.isRequired
  }

  static defaultProps = {
    value: 0,
    min: 0,
    max: 127,
    step: 1,
    decimals: 0
  }

  state = {
    value: this.props.value,
    prevY: 0
  }

  transformValue(value) {
    return roundToDecimal(
      clamp(value, this.props.min, this.props.max),
      this.props.decimals
    )
  }

  setValue(x) {
    if (isNumeric(x)) {
      const value = this.transformValue(parseFloat(x))
      this.setState({ value: x }, this.props.onChange(value))
    } else {
      this.setState({ value: x })
    }
  }

  onChange = e => {
    this.setValue(e.currentTarget.value)
  }

  onBlur = e => {
    this.setValue(this.state.value)
  }

  onMouseMove = e => {
    const diff = this.state.prevY - e.clientY

    this.setState(state => ({
      value: this.transformValue(this.state.value + diff * this.props.step),
      prevY: e.clientY
    }))
  }

  onMouseDown = e => {
    window.addEventListener('mousemove', this.onMouseMove)
    window.addEventListener('mouseup', this.onMouseUp)
    this.setState({ prevY: e.clientY })
  }

  onMouseUp = () => {
    window.removeEventListener('mousemove', this.onMouseMove)
    window.removeEventListener('mouseup', this.onMouseUp)
  }

  render() {
    const { value, min, max, step, decimals, onChange, ...rest } = this.props

    return (
      <input
        value={this.state.value}
        type="string"
        onChange={this.onChange}
        onBlur={this.onBlur}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        {...rest}
      />
    )
  }
}
