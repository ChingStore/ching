import React from 'react'

/** @jsx jsx */
import { jsx } from '@emotion/core'

import style from './index.style.js'

export default class FooterButton extends React.Component {
  render() {
    const { onClick } = this.props

    return (
      <button css={style.base} onClick={onClick}>
        {this.props.children}
      </button>
    )
  }
}
