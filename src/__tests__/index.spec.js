import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NumberBox from '../index'

Enzyme.configure({ adapter: new Adapter() })

describe('NumberBox', () => {
  let render
  let props = {
    onChange: jest.fn()
  }

  beforeEach(() => {
    render = (overrides = {}) =>
      shallow(<NumberBox {...props} {...overrides} />)
  })

  it('should not throw', () => {
    expect(render).not.toThrow()
  })

  describe('clamp', () => {
    it('should clamp value to min', () => {
      expect(NumberBox.clamp(-1, 0, 1)).toBe(0)
    })

    it('should clamp value to max', () => {
      expect(NumberBox.clamp(2, 0, 1)).toBe(1)
    })

    it('should let value pass through', () => {
      expect(NumberBox.clamp(0.5, 0, 1)).toBe(0.5)
    })
  })

  describe('isNumeric', () => {
    it('should return true for int', () => {
      expect(NumberBox.isNumeric(0)).toBe(true)
      expect(NumberBox.isNumeric('0')).toBe(true)
    })

    it('should return true for float', () => {
      expect(NumberBox.isNumeric('0.0')).toBe(true)
      expect(NumberBox.isNumeric(0.0)).toBe(true)
    })

    it('should return false for everything else', () => {
      expect(NumberBox.isNumeric('0.0.0')).toBe(false)
      expect(NumberBox.isNumeric('')).toBe(false)
      expect(NumberBox.isNumeric(null)).toBe(false)
    })
  })

  describe('roundToDecimal', () => {
    it('should return 0.5', () => {
      expect(NumberBox.roundToDecimal(0.49, 1)).toBe(0.5)
    })

    it('should return 0.42', () => {
      expect(NumberBox.roundToDecimal(0.419, 2)).toBe(0.42)
    })
  })

  describe('setValue', () => {
    it('should clamp value', () => {
      const wrapper = render({ value: 99 })
      wrapper.instance().setValue(-1)
      expect(wrapper.state('value')).toEqual(0)
      expect(props.onChange).toHaveBeenCalledWith(0)

      wrapper.instance().setValue(128)
      expect(wrapper.state('value')).toEqual(127)
      expect(props.onChange).toHaveBeenCalledWith(127)
    })

    it('should round value', () => {
      const wrapper = render({ value: 99 })
      wrapper.instance().setValue(0.5)
      expect(wrapper.state('value')).toEqual(1)
      expect(props.onChange).toHaveBeenCalledWith(1)
    })
  })

  describe('onMouseMove', () => {
    it('should set value according to previous/next clientY', () => {
      const wrapper = render({ value: 50 })
      wrapper.setState({ prevY: 100 })
      wrapper.instance().onMouseMove({ clientY: 90 })
      expect(wrapper.state('value')).toEqual(60)
      expect(props.onChange).toHaveBeenCalledWith(60)
    })
  })

  describe('onKeyDown', () => {
    it('should increment value', () => {
      render()
        .instance()
        .onKeyDown({ key: 'ArrowUp', preventDefault() {} })

      expect(props.onChange).toHaveBeenCalledWith(1)
    })

    it('should decrement value', () => {
      render({ value: 2 })
        .instance()
        .onKeyDown({ key: 'ArrowDown', preventDefault() {} })

      expect(props.onChange).toHaveBeenCalledWith(1)
    })
  })
})
