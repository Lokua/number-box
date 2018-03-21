import React, { Component } from 'react'
import { render } from 'react-dom'
import styled, { injectGlobal } from 'styled-components'
import NumberBox from '../../src'

injectGlobal`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  html,
  body,
  #demo {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    line-height: 24px;
  }

  a:link, 
  a:visited, 
  a:hover, 
  a:active {
    color: dodgerblue;
  }
`

const Container = styled.div`
  height: 100%;
  padding: 1rem 2rem;
  color: #444;
  background-color: rgba(0, 0, 0, 0.03);
  font-family: sans-serif;
`

const NBox = ({ isDragging, ...rest }) => <NumberBox {...rest} />
const Custom = styled(NBox)`
  width: 4rem;
  padding: 0.25rem 0.5rem;
  border: 2px solid #444;
  border-radius: 2px;
  color: #444;
  background-color: ${p => (p.isDragging ? 'lightgoldenrodyellow' : 'white')};
  font-family: monospace;
  font-weight: bold;
  font-size: 1.24rem;
  text-align: center;
  cursor: ns-resize;

  &:focus {
    outline: 0;
    box-shadow: none;
  }

  &::selection {
    background-color: transparent;
  }
`

class Demo extends Component {
  state = {
    default: 0,
    float: 0,
    custom: 0,
    customMouseDown: false,
    customMouseMoving: false
  }

  render() {
    return (
      <Container>
        <header>
          <h1>NumberBox</h1>
          <p>React HTML5 input with draggable number value</p>
          <aside>
            view source on{' '}
            <a href="https://github.com/lokua/number-box">github</a>
          </aside>
        </header>
        <h3>Default</h3>
        <NumberBox
          value={this.state.default}
          onChange={value => {
            this.setState({ default: value })
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
        <h3>Custom Styles</h3>
        <Custom
          value={this.state.custom}
          onChange={custom => {
            this.setState({ custom })
          }}
          onMouseDown={() => {
            this.setState({
              customMouseDown: true
            })
          }}
          onMouseUp={() => {
            this.setState({
              customMouseDown: false
            })
          }}
          isDragging={this.state.customMouseDown}
        />
      </Container>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
