import React from 'react'

/** @jsx jsx */
import { jsx } from '@emotion/core'

// import style from './index.style.js'

export default class FooterButton extends React.Component {
  render() {
    // const { children, onClick } = this.props

    // const buttonStyle = style[this.props.theme || FOOTER_BUTTON.THEME.GREEN]

    // <button css={{ color: 'green' }} onClick={onClick}>
    //   {children}
    // </button>

    return (
      <button
        css={{
          backgroundColor: 'green',
          height: 100,
          width: '90%',
        }}
      >
        {this.props.children}
      </button>
    )
  }
}
