import React, { Component } from 'react'
import { render } from 'react-dom'

import NumberBox from '../../src'

class Demo extends Component {
  state = {
    integer: 0,
    float: 0
  }

  render() {
    return (
      <div style={{ fontFamily: 'monospace' }}>
        <h3>Default</h3>
        <NumberBox
          value={this.state.integer}
          onChange={integer => {
            this.setState({ integer })
          }}
        />
        <h3>Float</h3>
        <NumberBox
          min={0}
          max={1}
          step={0.01}
          decimals={2}
          value={this.state.float}
          onChange={float => {
            this.setState({ float })
          }}
        />
        <h3>Inline Styles</h3>
        <NumberBox
          value={this.state.integer}
          onChange={integer => {
            this.setState({ integer })
          }}
          style={{
            width: '4rem',
            padding: '0.25rem 0.5rem',
            border: '2px solid black',
            borderRadius: '2px',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            fontSize: '1.24rem',
            textAlign: 'center'
          }}
        />
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
