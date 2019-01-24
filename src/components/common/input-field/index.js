/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import style from './index.style.js'

export default class InputField extends React.Component {
  render() {
    const { labelText, ...rest } = this.props
    return (
      <div css={style.base}>
        <label css={style.label}>{labelText}</label>
        <input
          css={this.props.type === 'password' ? style.password : style.input}
          {...rest}
        />
        <hr css={style.line} />
      </div>
    )
  }
}
