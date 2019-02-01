/** @jsx jsx */
import { jsx } from '@emotion/core'
import _ from 'lodash'
import React from 'react'

import orderUtil from 'utils/order'
import Flex from 'components/common/flex'

import ItemRow from './container/item-row'
import QRCode from './qr-code'
import style from './index.style'

export default class ShoppingCart extends React.PureComponent {
  state = {
    isExpanded: false,
  }

  render() {
    return (
      <Flex
        column
        css={[
          style.baseWrapper,
          this.state.isExpanded && style.baseWrapper__expanded,
        ]}
        // onClick={this.handleHeaderClick}
      >
        <Flex column css={style.base}>
          {this.renderHeader()}
          {this.state.isExpanded && this.renderItemList()}
          {this.state.isExpanded && this.renderQRCode()}
        </Flex>
      </Flex>
    )
  }

  renderHeader = () => {
    const itemCount = this.getItemCount()
    const totalPrice = this.getTotalPrice()
    return (
      <Flex css={style.header} onClick={this.handleHeaderClick}>
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
    const itemIds = this.getItemIds()
    return (
      <Flex column css={style.itemsList}>
        <p css={style.itemsListTitleText}>Items</p>
        {itemIds.map(itemId => (
          <ItemRow {...{ itemId }} key={itemId} />
        ))}
      </Flex>
    )
  }

  renderQRCode = () => {
    return (
      <Flex css={style.qrCode__maxHeightWrapper}>
        <Flex css={style.qrCode__sqaureWrapper}>
          <Flex css={style.qrCode__innerFillWrapper}>
            <Flex css={style.qrCode}>
              <QRCode {...this.props} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    )
  }

  ////////////////////
  // EVENT HANDLERS //
  ////////////////////

  handleHeaderClick = () => {
    this.setState({
      isExpanded: !this.state.isExpanded,
    })
  }

  /////////////
  // GETTERS //
  /////////////

  getItemIds = () => Object.keys(_.get(this.props, 'order.items', {}))

  getItemCount = () =>
    Object.values(_.get(this.props, 'order.items')).reduce(
      (totalCount, item) => totalCount + item.quantity,
      0
    )

  getTotalPrice = () => orderUtil.getTotalPrice(this.props.order).toFixed(2)
}
