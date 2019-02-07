// @flow

/** @jsx jsx */
import { jsx } from '@emotion/core'
import * as React from 'react'

import style from './index.style.js'

export type InputFieldPropsType = {
  css?: Object,
  labelText?: string,
  type?: string,
}

export default class InputField extends React.PureComponent<InputFieldPropsType> {
  render() {
    const { labelText, ...rest } = this.props
    return (
      <div css={style.base} {...this.props}>
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
