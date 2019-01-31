/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import * as ReactRouter from 'react-router'
import Status from './Status'
import Trust from './Trust'
import Coinbase from './Coinbase'

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

  handleClick = event => {
    const { history, to, onClick } = this.props
    console.log(this.props)
    onClick && onClick(event)
    to && history.push(to)
  }
}

export default ReactRouter.withRouter(WalletButton)
