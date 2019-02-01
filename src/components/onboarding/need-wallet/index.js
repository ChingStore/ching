/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import STYLE from 'constants/style'
import BackButton from 'components/common/back-button'
import ActionButton from 'components/common/action-button'
import Icon from 'components/common/icon'

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
      <div css={style.recommendedWallets__text}>
        <p css={style.recommendedWallets__p}>Recommended wallets</p>
      </div>
    )
  }

  renderDownloadStatus() {
    return (
      <div css={style.walletButton}>
        <ActionButton
          css={{ backgroundColor: STYLE.COLOR.STATUS }}
          icon={<Icon.Status />}
          url={'https://get.status.im/'}
        >
          Download Status
        </ActionButton>
      </div>
    )
  }
  renderDownloadCoinbase() {
    return (
      <div css={style.walletButton}>
        <ActionButton
          css={{ backgroundColor: STYLE.COLOR.COINBASE }}
          icon={<Icon.Coinbase />}
          url={'https://wallet.coinbase.com/'}
        >
          Download Coinbase
        </ActionButton>
      </div>
    )
  }
  renderDownloadTrust() {
    return (
      <div css={style.walletButton}>
        <ActionButton
          css={{ backgroundColor: STYLE.COLOR.TRUST }}
          icon={<Icon.Trust />}
          url={'https://trustwallet.com/'}
        >
          Download Trust
        </ActionButton>
      </div>
    )
  }
}
