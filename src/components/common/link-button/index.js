/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import * as ReactRouter from 'react-router'

import style from './index.style.js'

class LinkButton extends React.Component {
  render() {
    return (
      <a css={style.base} onClick={this.handleClick}>
        {this.props.children}
      </a>
    )
  }

  handleClick = event => {
    const { history, to, onClick } = this.props
    console.log(this.props)
    onClick && onClick(event)
    to && history.push(to)
  }
}

export default ReactRouter.withRouter(LinkButton)
