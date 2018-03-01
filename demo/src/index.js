import React, { Component } from 'react'
import { render } from 'react-dom'

import { NumberBox } from '../../src'

class Demo extends Component {
  state = {
    value: 0
  }

  render() {
    return (
      <div>
        <NumberBox
          min={0}
          max={1}
          step={0.01}
          decimals={2}
          value={this.state.value}
          onChange={value => {
            this.setState({ value })
          }}
        />
        <br />
        {this.state.value}
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
