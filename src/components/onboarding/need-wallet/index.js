/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import ROUTE from 'constants/route'
import WalletButton from 'components/common/wallet-button'
import BackButton from 'components/common/back-button'

import style from './index.style.js'

export default class HomeScene extends React.Component {
  render() {
    return (
      <div css={style.base}>
        <BackButton />
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
        <WalletButton targetWallet={'Status'} to={ROUTE.PATH.SIGN_UP} />
      </div>
    )
  }
  renderDownloadCoinbase() {
    return (
      <div css={style.walletButton}>
        <WalletButton targetWallet={'Coinbase'} to={ROUTE.PATH.SIGN_UP} />
      </div>
    )
  }
  renderDownloadTrust() {
    return (
      <div css={style.walletButton}>
        <WalletButton targetWallet={'Trust'} to={ROUTE.PATH.SIGN_UP} />
      </div>
    )
  }
}
