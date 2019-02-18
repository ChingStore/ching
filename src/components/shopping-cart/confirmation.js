// @flow

import type { OrderType } from 'constants/firebase'

/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import Flex from 'components/common/flex'
import orderUtil from 'utils/order'
import FooterButton from 'components/common/footer-button'
import SpinnerCircle from 'components/common/spinner-circle'
import Checkmark from 'components/common/checkmark'
import Cross from 'components/common/cross'

import style from './confirmation.style'

type PropsType = {
  order: OrderType,
  onSellMoreItemsClick: () => void,
}

class ShoppingCartQRCode extends React.PureComponent<PropsType> {
  render() {
    const { order } = this.props
    if (orderUtil.txStatus(order) === 'waiting tx hash') {
      return null
    }

    return (
      <Flex column grow css={this.getStyle(order)}>
        {orderUtil.txStatus(order) === 'confirming' && this.renderConfirming()}
        {orderUtil.txStatus(order) === 'confirmed' && this.renderConfirmed()}
        {orderUtil.txStatus(order) === 'failed' && this.renderFailed()}
        {this.renderSellMoreItemsButton()}
      </Flex>
    )
  }

  getStyle = (order: OrderType) => {
    if (orderUtil.txStatus(order) === 'confirmed') {
      return style.base_success
    }
    return style.base_default
  }

  renderConfirming = () => {
    return (
      <Flex column grow justifyEnd>
        <Flex>
          <SpinnerCircle />
        </Flex>
        <Flex spaceAround>Waiting for transaction to confirm</Flex>
      </Flex>
    )
  }

  renderConfirmed = () => {
    return (
      <Flex column grow justifyEnd>
        <Flex>
          <Checkmark />
        </Flex>
        <Flex spaceAround css={style.status_text}>
          Confirmed!
        </Flex>
      </Flex>
    )
  }

  renderFailed = () => {
    return (
      <Flex column grow justifyEnd>
        <Flex>
          <Cross />
        </Flex>
        <Flex spaceAround>Failed!</Flex>
      </Flex>
    )
  }

  renderSellMoreItemsButton = () => {
    const { onSellMoreItemsClick } = this.props

    return (
      <Flex column justifyEnd>
        <FooterButton
          onClick={onSellMoreItemsClick}
          css={style.sellMoreItemsButton}
        >
          Sell more items
        </FooterButton>
      </Flex>
    )
  }
}

export default ShoppingCartQRCode
