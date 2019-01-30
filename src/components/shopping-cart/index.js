/** @jsx jsx */
import { jsx } from '@emotion/core'
import _ from 'lodash'
import React from 'react'

import orderUtil from 'utils/order'
import Flex from 'components/common/flex'

import ItemRow from './container/item-row'
import style from './index.style'

export default class ShoppingCart extends React.Component {
  render() {
    console.log('ShoppingCart render')
    console.log({ props: this.props })
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
    const { order } = this.props
    const itemIds = this.getItemIds()
    return (
      <Flex column css={style.itemsList}>
        <p css={style.itemsListTitleText}>Items</p>
        {itemIds.map(itemId => (
          <ItemRow {...{ order, itemId }} key={itemId} />
        ))}
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

  getItemIds = () => Object.keys(_.get(this.props, 'order.items', {}))

  getItemCount = () => this.getItemIds().length

  getTotalPrice = () => orderUtil.getTotalPrice(this.props.order)
}
