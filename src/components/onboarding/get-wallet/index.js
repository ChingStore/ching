/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import BackButton from 'components/common/back-button'
import WALLET_BUTTON from 'constants/get-wallet-button'

import style from './index.style.js'
import GetWalletButton from './get-wallet-button'

export default class GetWalletScene extends React.Component {
  render() {
    return (
      <div css={style.base}>
        <BackButton css={style.back_button} />
        {this.renderTitle()}
        {this.renderRecommendedWallets()}
        {this.renderWalletList()}
      </div>
    )
  }

  renderTitle = () => (
    <div css={style.title}>
      <div css={style.title_text}>You need an Ethereum wallet</div>
      <div css={style.title_welcomeText}>
        It’s an application to interact with the Ethereum blockchain. It stores
        your money.
      </div>
    </div>
  )

  renderRecommendedWallets = () => (
    <div css={style.recommendedWallets}>Recommended wallets</div>
  )

  renderWalletList = () =>
    WALLET_BUTTON.TYPES.map(type => (
      <GetWalletButton css={style.walletButton} {...{ type, key: type }}>
        {`Download ${type}`}
      </GetWalletButton>
    ))
}
