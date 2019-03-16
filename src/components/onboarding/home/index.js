/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import ROUTE from 'constants/route'
import Flex from 'components/common/flex'
import FooterButton from 'components/common/footer-button'
import LinkButton from 'components/common/link-button'
import Icon from 'components/common/icon'

import style from './index.style.js'

export default class HomeScene extends React.Component {
  render() {
    return (
      <Flex grow column css={style.base}>
        {this.renderTitle()}
        {this.renderArt()}
        {this.renderBecomeVendor()}
        {this.renderLogIn()}
      </Flex>
    )
  }

  renderTitle = () => (
    <Flex column justifyEnd alignStart css={style.title}>
      <p css={style.title__text}>Start accepting payments in DAI.</p>
    </Flex>
  )

  renderArt = () => (
    <Flex column justifyEnd alignCenter css={style.art}>
      <Icon.HomeArt />
    </Flex>
  )

  renderBecomeVendor = () => (
    <Flex column justifyEnd css={style.becomeVendor}>
      <FooterButton to={ROUTE.PATH.SIGN_UP}>Become a vendor</FooterButton>
    </Flex>
  )

  renderLogIn = () => (
    <Flex center css={style.logIn}>
      <LinkButton to={ROUTE.PATH.SIGN_IN_OAUTH}>
        <Icon.Login />
        <span css={style.logIn__text}>Log In</span>
      </LinkButton>
    </Flex>
  )
}
