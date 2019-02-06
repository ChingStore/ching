/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import * as ReactRouter from 'react-router-dom'

import style from './index.style.js'

class LinkButton extends React.Component {
  render() {
    const { children, staticContext, ...restProps } = this.props
    return (
      <button
        css={style.base}
        {...restProps}
        onClick={this.handleClick}
        type="button"
      >
        {children}
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

export default ReactRouter.withRouter(LinkButton)
