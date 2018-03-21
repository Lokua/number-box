import React, { Component } from 'react'
import PropTypes from 'prop-types'

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

  static clamp(n, min = 0, max = 1) {
    return n < min ? min : n > max ? max : n
  }

  static isNumeric(value) {
    return value !== '' && value != null && /^\d+\.?\d*$/.test(String(value))
  }

  static roundToDecimal(value, decimals) {
    const tenTo = Math.pow(10, decimals)

    return Math.round(value * tenTo) / tenTo
  }

  state = {
    value: this.props.value,
    prevY: 0
  }

  componentWillReceiveProps({ value }) {
    if (value !== this.state.value) {
      this.setState({ value })
    }
  }

  setValue(x) {
    if (NumberBox.isNumeric(x)) {
      const value = this.transformValue(parseFloat(x))

      this.setState({ value }, () => {
        this.props.onChange(value)
      })
    }
  }

  safeCall(key, ...args) {
    typeof this.props[key] === 'function' && this.props[key](...args)
  }

  transformValue(value) {
    return NumberBox.roundToDecimal(
      NumberBox.clamp(value, this.props.min, this.props.max),
      this.props.decimals
    )
  }

  onChange = e => {
    this.setValue(e.currentTarget.value)
    this.safeCall('onChange', e)
  }

  onBlur = e => {
    this.setValue(this.state.value)
    this.safeCall('onBlur', e)
  }

  onMouseMove = e => {
    const delta = this.state.prevY - e.clientY
    const value = parseFloat(this.state.value) + delta * this.props.step

    this.setState({ prevY: e.clientY }, () => {
      this.setValue(value)
    })

    this.safeCall('onMouseMove', e)
  }

  onMouseDown = e => {
    window.addEventListener('mousemove', this.onMouseMove)
    window.addEventListener('mouseup', this.onMouseUp)
    this.setState({ prevY: e.clientY })
    this.safeCall('onMouseDown', e)
  }

  onMouseUp = e => {
    window.removeEventListener('mousemove', this.onMouseMove)
    window.removeEventListener('mouseup', this.onMouseUp)
    this.safeCall('onMouseUp', e)
  }

  onKeyDown = e => {
    if (e.key === 'ArrowUp') {
      this.setValue(this.state.value + this.props.step)
      e.preventDefault()
    } else if (e.key === 'ArrowDown') {
      this.setValue(this.state.value - this.props.step)
      e.preventDefault()
    }

    this.safeCall('onKeyDown', e)
  }

  render() {
    const {
      value,
      min,
      max,
      step,
      decimals,
      onChange,
      onBlur,
      onMouseDown,
      onMouseUp,
      onKeyDown,
      ...rest
    } = this.props

    return (
      <input
        type="text"
        value={this.state.value}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onKeyDown={this.onKeyDown}
        {...rest}
      />
    )
  }
}
