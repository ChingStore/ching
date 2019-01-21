/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import FooterButton from 'components/common/footer-button'
import Icon from 'components/common/icon'

import style from './index.style.js'

export default class HomeScene extends React.Component {
  render() {
    return (
      <div css={style.base}>
        {this.renderTitle()}
        {this.renderArt()}
        {this.renderBecomeVendor()}
        {this.renderLogIn()}
      </div>
    )
  }

  renderTitle() {
    return (
      <div css={style.title}>
        <p css={style.title__text}>Start accepting payments in DAI.</p>
      </div>
    )
  }

  renderArt() {
    return (
      <div css={style.art}>
        <Icon.HomeArt />
      </div>
    )
  }

  renderBecomeVendor() {
    return (
      <div css={style.becomeVendor}>
        <FooterButton>Become a vendor</FooterButton>
      </div>
    )
  }

  renderLogIn() {
    return (
      <div css={style.logIn}>
        <a css={style.logInLink} href="#">
          <Icon.Login />
          <span css={style.logInLink__text}>Log In</span>
        </a>
      </div>
    )
  }
}
