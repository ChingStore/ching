/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import * as ReactRouter from 'react-router-dom'

import style from './index.style.js'

class FooterButton extends React.Component {
  render() {
    return (
      <button css={style.base} onClick={this.handleClick} type="button">
        {this.props.children}
      </button>
    )
  }

  handleClick = event => {
    const { history, to, onClick } = this.props

    if (onClick) {
      onClick(event)
    }
    if (to) {
      history.push(to)
    }
  }
}

export default ReactRouter.withRouter(FooterButton)
