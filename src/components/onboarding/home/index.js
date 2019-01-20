/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import FooterButton from '../../common/footer-button'
import Art from './icon'
import * as Icon from 'components/common/icon'

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
        <p>Start accepting payments in DAI</p>
      </div>
    )
  }

  renderArt() {
    return (
      <div>
        <Art />
      </div>
    )
  }

  renderBecomeVendor() {
    return <FooterButton>Become a vendor!</FooterButton>
  }

  renderLogIn() {
    return (
      <div>
        <a>
          <Icon.Login /> Log In
        </a>
      </div>
    )
  }
}
