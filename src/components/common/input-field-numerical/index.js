/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import Flex from 'components/common/flex'

import style from './index.style.js'

export default class InputFieldNumerical extends React.Component {
  state = {
    value: this.props.defaultValue,
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state !== prevState) {
      this.props.onChange(parseFloat(this.state.value))
    }
  }

  decrement = () => {
    this.setState(prevState => ({
      value:
        parseFloat(prevState.value) - parseFloat(this.props.step) < 0
          ? 0
          : parseFloat(prevState.value) - parseFloat(this.props.step),
    }))
  }

  increment = () => {
    this.setState(prevState => ({
      value: parseFloat(prevState.value) + parseFloat(this.props.step),
    }))
  }

  onChange = e => {
    this.setState({
      value: e.target.value,
    })
  }

  render() {
    const { labelText } = this.props
    return (
      <Flex column css={style.base}>
        <label css={style.label}>{labelText}</label>
        <Flex spaceAround alignCenter css={style.form}>
          <button css={style.form_minus} type="button" onClick={this.decrement}>
            -
          </button>
          <input
            onChange={this.onChange}
            css={style.form_input}
            value={this.state.value}
          />
          <button css={style.form_plus} type="button" onClick={this.increment}>
            +
          </button>
        </Flex>
        <hr css={style.line} />
      </Flex>
    )
  }
}
