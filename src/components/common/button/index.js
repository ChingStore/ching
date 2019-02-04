/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import * as ReactRouter from 'react-router-dom'

import Flex from 'components/common/flex'

import style from './index.style.js'

class Button extends React.Component {
  render() {
    return (
      <Flex
        css={style.base}
        {...this.props}
        onClick={this.handleClick}
        type="button"
      />
    )
  }

  handleClick = event => {
    const { action, history, onClick, to } = this.props
    console.log(this.props)
    if (onClick) {
      onClick(event)
    }
    if (action === 'goBack') {
      history.goBack()
    }
    if (action === 'externalLink') {
      window.location = to
    }
    if (action === 'internalLink') {
      history.push(to)
    }
  }
}

export default ReactRouter.withRouter(Button)
