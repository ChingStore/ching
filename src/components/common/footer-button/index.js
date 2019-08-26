/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import * as ReactRouter from 'react-router-dom'

import Button from 'components/common/button'

import style from './index.style.js'

class FooterButton extends React.Component {
  render() {
    return (
      <Button css={style.base} {...this.props}>
        {this.props.children}
      </Button>
    )
  }
}

export default ReactRouter.withRouter(FooterButton)
