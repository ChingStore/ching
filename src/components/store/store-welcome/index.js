/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import ROUTE from 'constants/route'
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
      </div>
    )
  }

  renderTitle() {
    return (
      <div css={style.title}>
        <p css={style.title__text}>StoreName</p>
        <p css={style.welcome__msg}>Welcome to your store!</p>
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
        <FooterButton to={ROUTE.PATH.SIGN_UP}>Add a first item</FooterButton>
      </div>
    )
  }
}
