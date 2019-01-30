/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import ROUTE from 'constants/route'
import FooterButton from 'components/common/footer-button'

import style from './index.style.js'

export default class HomeScene extends React.Component {
  render() {
    return (
      <div css={style.base}>
        {this.renderTitle()}
        {this.renderDownloadStatus()}
        {this.renderDownloadCoinbase()}
        {this.renderDownloadTrust()}
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

  renderDownloadStatus() {
    return (
      <div css={style.addFirstItem}>
        <FooterButton to={ROUTE.PATH.SIGN_UP}>Download Status</FooterButton>
      </div>
    )
  }
  renderDownloadCoinbase() {
    return (
      <div css={style.addFirstItem}>
        <FooterButton to={ROUTE.PATH.SIGN_UP}>Download Coinbase</FooterButton>
      </div>
    )
  }
  renderDownloadTrust() {
    return (
      <div css={style.addFirstItem}>
        <FooterButton to={ROUTE.PATH.SIGN_UP}>Download Trust</FooterButton>
      </div>
    )
  }
}
