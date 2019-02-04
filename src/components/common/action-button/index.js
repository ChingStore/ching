/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import * as ReactRouter from 'react-router-dom'

import Button from 'components/common/button'

import style from './index.style.js'

class ActionButton extends React.Component {
  render() {
    return (
      <Button
        css={style.base}
        {...this.props}
        action="externalLink"
        to={this.props.url}
      >
        <div css={style.icon}>{this.props.icon}</div>
        <div css={style.button__text}>{this.props.children}</div>
      </Button>
    )
  }
}

export default ReactRouter.withRouter(ActionButton)
