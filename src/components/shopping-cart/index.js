/** @jsx jsx */
import { jsx } from '@emotion/core'
import _ from 'lodash'
import React from 'react'

import orderUtil from 'utils/order'
import Flex from 'components/common/flex'

import style from './index.style'

export default class ShoppingCart extends React.Component {
  render() {
    return (
      <Flex column css={style.baseWrapper}>
        <Flex column css={style.base}>
          {this.renderHeader()}
          {this.renderItemList()}
          {this.renderQRCode()}
        </Flex>
      </Flex>
    )
  }

  renderHeader = () => {
    const itemCount = this.getItemCount()
    const totalPrice = this.getTotalPrice()
    return (
      <Flex css={style.header}>
        <p css={style.headerTitleText}>
          Checkout {itemCount} item{itemCount != 1 ? 's' : ''}
        </p>
        <Flex css={style.headerTotalPrice}>
          <p css={style.headerTotalPriceText}>${totalPrice}</p>
        </Flex>
      </Flex>
    )
  }

  renderItemList = () => {
    const items = this.getItems()
    return (
      <Flex column css={style.itemsList}>
        <p css={style.itemsListTitleText}>Items</p>
        {items.map(item => item)}
      </Flex>
    )
  }

  renderQRCode = () => {
    return (
      <Flex css={style.qrCodeWrapper}>
        <Flex css={style.qrCode}>
          <p>QR</p>
        </Flex>
      </Flex>
    )
  }

  /////////////
  // GETTERS //
  /////////////

  getItems = () => Object.values(_.get(this.props, 'order.items', {}))

  getItemCount = () => this.getItems().length

  getTotalPrice = () => orderUtil.getTotalPrice(this.props.order)
}
