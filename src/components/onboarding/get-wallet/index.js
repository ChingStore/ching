/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import STYLE from 'constants/style'
import BackButton from 'components/common/back-button'
import ActionButton from 'components/common/action-button'
import Icon from 'components/common/icon'

import style from './index.style.js'

export default class GetWallet extends React.Component {
  render() {
    return (
      <div css={style.base}>
        <BackButton css={style.back_button} />
        {this.renderTitle()}
        {this.renderRecommendedWallets()}
        <div>
          {this.renderDownloadStatus()}
          {this.renderDownloadCoinbase()}
          {this.renderDownloadTrust()}
        </div>
      </div>
    )
  }

  renderTitle = () => (
    <div css={style.title}>
      <p css={style.title_text}>You need an Ethereum wallet</p>
      <p css={style.welcome_msg}>
        It’s an application to interact with the Ethereum blockchain. It stores
        your money.
      </p>
    </div>
  )

  renderRecommendedWallets = () => (
    <div css={style.recommendedWallets_text}>
      <p css={style.recommendedWallets_p}>Recommended wallets</p>
    </div>
  )

  renderDownloadStatus = () => (
    <div css={style.walletButton}>
      <ActionButton
        css={{ backgroundColor: STYLE.COLOR.STATUS }}
        icon={<Icon.Status />}
        to="https://get.status.im/"
      >
        Download Status
      </ActionButton>
    </div>
  )

  renderDownloadCoinbase = () => (
    <div css={style.walletButton}>
      <ActionButton
        css={{ backgroundColor: STYLE.COLOR.COINBASE }}
        icon={<Icon.Coinbase />}
        to="https://wallet.coinbase.com/"
      >
        Download Coinbase
      </ActionButton>
    </div>
  )

  renderDownloadTrust = () => (
    <div css={style.walletButton}>
      <ActionButton
        css={{ backgroundColor: STYLE.COLOR.TRUST }}
        icon={<Icon.Trust />}
        to="https://trustwallet.com/"
      >
        Download Trust
      </ActionButton>
    </div>
  )
}
