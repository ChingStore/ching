/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import * as ReactRouter from 'react-router-dom'
import Coinbase from 'components/common/icon/coinbase'
import Status from 'components/common/icon/status'
import Trust from 'components/common/icon/trust'

import style from './index.style.js'

class WalletButton extends React.Component {
  render() {
    const { targetWallet } = this.props
    return (
      <a css={style.base} href={this.link(targetWallet)}>
        {this.wallet(targetWallet)}
      </a>
    )
  }

  wallet = targetWallet => {
    switch (targetWallet) {
      case 'Status':
        return <Status />
      case 'Trust':
        return <Trust />
      case 'Coinbase':
        return <Coinbase />
      default:
        return null
    }
  }

  link = targetWallet => {
    switch (targetWallet) {
      case 'Status':
        return 'https://dev.status.im/'
      case 'Trust':
        return 'https://trustwallet.com/'
      case 'Coinbase':
        return 'https://wallet.coinbase.com/'
      default:
        return null
    }
  }
}

export default ReactRouter.withRouter(WalletButton)
