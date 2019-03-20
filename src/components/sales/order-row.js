// @flow

import type { OrderOrderedType, OrderFullItemsType } from 'constants/firebase'

/** @jsx jsx */
import { jsx } from '@emotion/core'
import * as React from 'react'

import Flex from 'components/common/flex'
import ItemPhoto from 'components/common/item-photo'
import STYLE from 'constants/style'
import ORDER from 'constants/order'
import orderUtil from 'utils/order'

import style from './order-row.style'

export type PropsType = {|
  order: OrderOrderedType,
  orderFullItems: OrderFullItemsType,
|}

class OrderRow extends React.PureComponent<PropsType> {
  render = () => {
    return (
      <Flex grow css={style.base}>
        {this.renderPhoto()}
        {this.renderDetails()}
      </Flex>
    )
  }

  renderPhoto = () => {
    const { orderFullItems } = this.props
    return (
      <ItemPhoto item={orderFullItems && orderFullItems[0]} css={style.photo}>
        {this.renderPhotoStatusDot()}
      </ItemPhoto>
    )
  }

  renderPhotoStatusDot = () => {
    const { order } = this.props

    const statusDotColorMap = {
      [ORDER.STATUS.WAITING_FOR_SCAN]: STYLE.COLOR.GREY,
      [ORDER.STATUS.CONFIRMING]: STYLE.COLOR.YELLOW,
      [ORDER.STATUS.CONFIRMED]: STYLE.COLOR.GREEN,
      [ORDER.STATUS.FAILED]: STYLE.COLOR.RED,
    }

    const orderStatus = orderUtil.txStatus(order)
    const backgroundColor = statusDotColorMap[orderStatus]

    if (!backgroundColor) {
      return null
    }

    return (
      <Flex css={style.photo_statusDotWrapper}>
        <Flex css={[style.photo_statusDot, { backgroundColor }]} />
      </Flex>
    )
  }

  renderDetails = () => {
    return (
      <Flex grow column css={style.details}>
        <Flex grow spaceBetween>
          {this.renderTitle()}
          {this.renderTotalPrice()}
        </Flex>
        {this.renderStatus()}
      </Flex>
    )
  }

  renderTitle = () => {
    return <Flex css={style.details_title}>{this.getOrderTitle()}</Flex>
  }

  renderTotalPrice = () => {
    return (
      <Flex css={style.details_totalPrice}>
        ${this.getOrderTotalPrice().toFixed(2)}
      </Flex>
    )
  }

  renderStatus = () => {
    return <Flex css={style.details_status}>{this.getOrderStatus()}</Flex>
  }

  getOrderTitle = () => {
    const { orderFullItems } = this.props
    let title = orderFullItems[0].name || ''
    if (orderFullItems.length > 1) {
      title += `, +${orderFullItems.length - 1} more`
    }
    return title
  }

  getOrderTotalPrice = () => {
    const { order } = this.props
    return orderUtil.getTotalPrice(order)
  }

  getOrderStatus = () => {
    const { order } = this.props
    return orderUtil.txStatusText(order)
  }
}

export default OrderRow
