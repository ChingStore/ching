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

import style from './confirmation.style'

type PropsType = {
  order: OrderType,
  onSellMoreItemsClick: () => void,
}

class ShoppingCartQRCode extends React.PureComponent<PropsType> {
  render() {
    const { order } = this.props
    if (orderUtil.isWaitingForTransaction(order)) {
      return null
    }

    return (
      <Flex column grow css={style.base}>
        {this.renderConfirming()}
        {this.renderConfirmed()}
        {this.renderSellMoreItemsButton()}
      </Flex>
    )
  }

  renderConfirming = () => {
    const { order } = this.props
    if (!orderUtil.isConfirming(order)) {
      return null
    }

    return (
      <Flex column grow center>
        <Flex>
          <SpinnerCircle />
        </Flex>
      </Flex>
    )
  }

  renderConfirmed = () => {
    const { order } = this.props
    if (!orderUtil.isConfirmed(order)) {
      return null
    }

    return (
      <Flex column grow center>
        <Flex>
          <Checkmark />
        </Flex>
      </Flex>
    )
  }

  renderSellMoreItemsButton = () => {
    const { onSellMoreItemsClick } = this.props

    return (
      <Flex>
        <FooterButton
          onClick={onSellMoreItemsClick}
          css={style.sellMoreItemsButton}
        >
          Sell more items
        </FooterButton>
      </Flex>
    )
  }

  //////////////
  // CHECKERS //
  //////////////

  isWaitingForTransaction = () => !this.isConfirming() && !this.isConfirmed()

  isConfirming = () => {
    const { order } = this.props
    return order.txHash && !order.txConfirmed
  }

  isConfirmed = () => {
    const { order } = this.props
    return order.txConfirmed
  }
}

export default ShoppingCartQRCode
