/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import BackButton from 'components/common/back-button'
import ActionButton from 'components/common/action-button'
import WALLET_BUTTON from 'constants/wallet_button'

import style from './index.style.js'

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
      <p css={style.title_text}>You need an Ethereum wallet</p>
      <p css={style.welcome_msg}>
        It’s an application to interact with the Ethereum blockchain. It stores
        your money.
      </p>
    </div>
  )

  renderRecommendedWallets = () => (
    <div css={style.recommendedWallets}>
      <p css={style.recommendedWallets_text}>Recommended wallets</p>
    </div>
  )

  renderWalletList = () =>
    WALLET_BUTTON.TYPES.map(type => (
      <div css={style.walletButton}>
        <ActionButton {...{ type, key: type }}>Download {type}</ActionButton>
      </div>
    ))
}
