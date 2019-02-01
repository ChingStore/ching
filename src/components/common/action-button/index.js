/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import * as ReactRouter from 'react-router'

import style from './index.style.js'

class ActionButton extends React.Component {
  render() {
    return (
      <button css={style.base} {...this.props} onClick={this.handleClick}>
        <div css={style.icon}>{this.props.icon}</div>
        <div css={style.spacer} />
        <div>{this.props.children}</div>
      </button>
    )
  }

  handleClick = event => {
    const { history, to, onClick } = this.props
    console.log(this.props)
    onClick && onClick(event)
    to && history.push(to)
  }
}

export default ReactRouter.withRouter(ActionButton)
