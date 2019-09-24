/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import Flex from 'components/common/flex'
import qrUtil from 'utils/qr'

import style from './qr-code.style'

export default class ShoppingCartQRCode extends React.PureComponent {
  render() {
    return (
      <Flex css={style.base}>
        <img css={style.qrCode} src={this.getQRImage()} alt="QR code" />
      </Flex>
    )
  }

  // ///////////
  // GETTERS //
  // ///////////

  getQRImage = () => {
    const { asset, order, orderId, walletAddress } = this.props
    return qrUtil.getImage({
      asset,
      order,
      orderId,
      walletAddress,
    })
  }

  // //////////////////
  // EVENT HANDLERS //
  // //////////////////

  handleQuantityInputChange = e => {
    console.log('change', { e, value: e.target.value })
    this.changedQuantity = e.target.value
  }

  handleQuantityInputBlur = e => {
    console.log('blur', { e, value: e.target.value })
    this.props.updateQuantity({ ...this.props, quantity: e.target.value })
  }

  handleRemoveButtonClick = () => {
    this.props.remove(this.props)
  }
}
