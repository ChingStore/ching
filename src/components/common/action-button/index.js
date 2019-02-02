/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import * as ReactRouter from 'react-router-dom'

import style from './index.style.js'

class ActionButton extends React.Component {
  render() {
    return (
      <button
        css={style.base}
        {...this.props}
        onClick={this.handleClick}
        type="button"
      >
        <div css={style.icon}>{this.props.icon}</div>
        <div css={style.spacer} />
        <div>{this.props.children}</div>
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

export default ReactRouter.withRouter(ActionButton)
