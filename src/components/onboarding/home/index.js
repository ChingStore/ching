/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import FooterButton from '../../common/footer-button'
import Icon from './icon'
import LogInIcon from './icon-login'

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
        <Icon />
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
          <LogInIcon /> Log In
        </a>
      </div>
    )
  }
}
