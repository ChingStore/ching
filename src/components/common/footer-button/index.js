/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import * as ReactRouter from 'react-router'

import style from './index.style.js'

class FooterButton extends React.Component {
  render() {
    return (
      <button css={style.base} onClick={this.handleClick}>
        {this.props.children}
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

export default ReactRouter.withRouter(FooterButton)
