/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import ROUTE from 'constants/route'
import FooterButton from 'components/common/footer-button'

import vectorImg from './Vector.png'
import style from './index.style.js'

export default class HomeScene extends React.Component {
  render() {
    return (
      <div css={style.base}>
        {this.renderBackButton()}
        {this.renderTitle()}
        {this.renderRecommendedWallets()}
        <div css={style.buttonCollection}>
          {this.renderDownloadStatus()}
          {this.renderDownloadCoinbase()}
          {this.renderDownloadTrust()}
        </div>
      </div>
    )
  }

  renderBackButton() {
    return (
      <div css={style.button__location}>
        <button css={style.continue__button}>
          <img css={style.vector} src={vectorImg} alt="" />
        </button>
      </div>
    )
  }

  renderTitle() {
    return (
      <div css={style.title}>
        <p css={style.title__text}>You need an Ethereum wallet</p>
        <p css={style.welcome__msg}>
          It’s an application to interact with the Ethereum blockchain. It
          stores your money.
        </p>
      </div>
    )
  }

  renderRecommendedWallets() {
    return (
      <div css={style.recommended__wallets__text}>
        <p css={style.recommended__wallets__p}>Recommended wallets</p>
      </div>
    )
  }

  renderDownloadStatus() {
    return (
      <div css={style.walletButton}>
        <FooterButton to={ROUTE.PATH.SIGN_UP}>Download Status</FooterButton>
      </div>
    )
  }
  renderDownloadCoinbase() {
    return (
      <div css={style.walletButton}>
        <FooterButton to={ROUTE.PATH.SIGN_UP}>Download Coinbase</FooterButton>
      </div>
    )
  }
  renderDownloadTrust() {
    return (
      <div css={style.walletButton}>
        <FooterButton to={ROUTE.PATH.SIGN_UP}>Download Trust</FooterButton>
      </div>
    )
  }
}
