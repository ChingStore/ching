/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import * as ReactRouter from 'react-router-dom'
import Icon from 'components/common/icon'
import FooterButton from 'components/common/footer-button'

import style from './index.style.js'

class FacebookButton extends React.Component {
  render() {
    return (
      <FooterButton css={style.base} {...this.props}>
        <div css={style.icon}>
          <Icon.Facebook />
        </div>
        <div css={style.text}>{this.props.children}</div>
      </FooterButton>
    )
  }
}

export default ReactRouter.withRouter(FacebookButton)
