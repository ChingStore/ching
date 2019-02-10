/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import * as ReactRouter from 'react-router-dom'

import Button from 'components/common/button'
import Spinner from './button-spinner'

import style from './index.style.js'

class FooterButton extends React.Component {
  render() {
    const { isApplying } = this.props
    return (
      <Button css={style.base} {...this.props}>
        {isApplying ? <Spinner /> : this.props.children}
      </Button>
    )
  }
}

export default ReactRouter.withRouter(FooterButton)
