// @flow

import type { IdType, OrderType } from 'constants/firebase'

/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import * as ReactRouter from 'react-router-dom'

import orderUtil from 'utils/order'
import Flex from 'components/common/flex'
import ORDER from 'constants/order'
import PaymentQR from 'components/payment-qr/container'

import ItemRow from './container/item-row'

import style from './index.style'

export type PropsType = {
  location: ReactRouter.Location,
  orderId?: IdType,
  order?: OrderType,
  walletAddress?: string,
  onResetShoppingCart: () => void,
}

type StateType = {
  isExpanded: boolean,
}

export default class ShoppingCart extends React.PureComponent<
  PropsType,
  StateType
> {
  state = {
    isExpanded: false,
  }

  render() {
    const { orderId } = this.props
    const { isExpanded } = this.state

    console.log('Rendering ShoppingCart...')

    if (!orderId) {
      return null
    }

    return (
      <Flex
        absoluteFill
        justifyEnd
        alignCenter
        column
        css={[style.baseWrapper, isExpanded && style.baseWrapper__expanded]}
        onClick={isExpanded ? this.handleHeaderClick : undefined}
      >
        <Flex
          column
          css={style.base}
          onClick={e => {
            e.stopPropagation()
            return false
          }}
        >
          {this.renderHeader()}
          {this.renderItemList()}
          {this.renderPayment()}
        </Flex>
      </Flex>
    )
  }

  renderHeader = () => {
    const itemCount = this.getItemsCount()
    const totalPrice = this.getTotalPrice()
    return (
      <Flex css={style.header} onClick={this.handleHeaderClick}>
        <p css={style.headerTitleText}>
          Checkout {itemCount} item{itemCount !== 1 ? 's' : ''}
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

    if (!this.state.isExpanded || !order) {
      return null
    }

    return (
      <Flex column css={style.itemsList}>
        <p css={style.itemsListTitleText}>Items</p>
        {itemIds.map(itemId => (
          <ItemRow
            {...{
              itemId,
              isEditable:
                orderUtil.txStatus(order) === ORDER.STATUS.WAITING_FOR_SCAN,
            }}
            key={itemId}
          />
        ))}
      </Flex>
    )
  }

  renderPayment = () => {
    const { location, order } = this.props

    if (!this.state.isExpanded || !order) {
      return null
    }

    return (
      <Flex css={style.qrCode__maxHeightWrapper}>
        <Flex css={style.qrCode__sqaureWrapper}>
          <Flex css={style.qrCode__innerFillWrapper}>
            <Flex css={style.qrCode}>
              <PaymentQR {...{ location }} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    )
  }

  /////////////////////
  // LIFECYCLE HOOKS //
  /////////////////////

  componentDidUpdate = (prevProps: PropsType) => {
    if (this.getItemsCount() === 0 && this.getItemsCount(prevProps) !== 0) {
      this.setState({ isExpanded: false })
    }
  }

  ////////////////////
  // EVENT HANDLERS //
  ////////////////////

  handleHeaderClick = (e: SyntheticEvent<HTMLDivElement>) => {
    e.stopPropagation()

    this.setState(prevState => ({
      isExpanded: !prevState.isExpanded,
    }))
  }

  handleSellMoreItemsClick = () => {
    this.setState({
      isExpanded: false,
    })
    this.props.onResetShoppingCart()
  }

  /////////////
  // GETTERS //
  /////////////

  getItemIds = (): Array<IdType> => orderUtil.getItemIds(this.props.order)

  getItemsCount = (props: PropsType = this.props): number =>
    orderUtil.getItemsCount(props.order)

  getTotalPrice = (): string =>
    orderUtil.getTotalPrice(this.props.order).toFixed(2)
}
