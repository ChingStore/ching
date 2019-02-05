/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import * as ReactRouter from 'react-router-dom'

import Button from 'components/common/button'
import WALLET_BUTTON from 'constants/wallet_button'

import style from './index.style.js'

class ActionButton extends React.Component {
  render() {
    const { type } = this.props
    return (
      <Button
        css={[style.base, { backgroundColor: WALLET_BUTTON.COLOR[type] }]}
        {...this.props}
        action="externalLink"
        to={WALLET_BUTTON.LINK[type]}
      >
        <div css={style.icon}>{WALLET_BUTTON.ICON[type]}</div>
        <div css={style.button_text}>{this.props.children}</div>
      </Button>
    )
  }
}

export default ReactRouter.withRouter(ActionButton)
