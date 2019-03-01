// @flow

import type { OrderType, IdType } from 'constants/firebase'

/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import * as ReactRouter from 'react-router-dom'

import Flex from 'components/common/flex'
import orderUtil from 'utils/order'
import FooterButton from 'components/common/footer-button'
import SpinnerCircle from 'components/common/spinner-circle'
import Icon from 'components/common/icon'
import ORDER from 'constants/order'

import QRCode from './qr-code'
import style from './index.style'

export type PropsType = {
  location: ReactRouter.Location,
  order: OrderType,
  orderId: IdType,
  walletAddress: string,
  onSellMoreItems: () => void,
  onRetry: () => void,
}

const STATUS_ICON = {
  [ORDER.STATUS.CONFIRMING]: SpinnerCircle,
  [ORDER.STATUS.CONFIRMED]: Icon.CheckMark,
  [ORDER.STATUS.FAILED]: Icon.CrossBold,
}

const STATUS_TEXT = {
  [ORDER.STATUS.CONFIRMING]: 'Confirming...',
  [ORDER.STATUS.CONFIRMED]: 'Confirmed!',
  [ORDER.STATUS.FAILED]: 'Failed!',
}

class PaymentQR extends React.PureComponent<PropsType> {
  render() {
    const { order, orderId, walletAddress } = this.props
    const status = orderUtil.txStatus(order)

    if (status === ORDER.STATUS.WAITING_FOR_SCAN) {
      return <QRCode {...{ order, orderId, walletAddress }} />
    }

    // $FlowFixMe: waiting for scan is missing
    const StatusIcon = STATUS_ICON[status]
    // $FlowFixMe: waiting for scan is missing
    const statusText = STATUS_TEXT[status]

    return (
      <Flex column grow css={[style.base, style[`base__${status}`]]}>
        <Flex column grow center>
          <Flex
            column
            justifyEnd
            css={[style.status_icon, style[`status_icon__${status}`]]}
          >
            <StatusIcon />
          </Flex>
          <Flex
            column
            justifyEnd
            css={[style.status_text, style[`status_text__${status}`]]}
          >
            {statusText}
          </Flex>
          <Flex column css={style.status_bottomPadding} />
        </Flex>
        {status === ORDER.STATUS.FAILED
          ? this.renderFailedTransactionButtons()
          : this.renderSellMoreItemsButton()}
      </Flex>
    )
  }

  renderSellMoreItemsButton = () => {
    const { onSellMoreItems } = this.props

    return (
      <FooterButton onClick={onSellMoreItems} css={style.sellMoreItemsButton}>
        Sell more items
      </FooterButton>
    )
  }

  renderFailedTransactionButtons = () => {
    const { onSellMoreItems, onRetry } = this.props

    return (
      <Flex css={style.failedTransactionButtons}>
        <Flex column css={{ width: '50%' }}>
          <FooterButton
            onClick={onSellMoreItems}
            css={style.failedTransactionButtons_sellMoreItems}
          >
            Cancel
          </FooterButton>
        </Flex>
        <Flex column css={{ width: '50%' }}>
          <FooterButton
            onClick={onRetry}
            css={style.failedTransactionButtons_retry}
          >
            Retry
          </FooterButton>
        </Flex>
      </Flex>
    )
  }
}

export default PaymentQR
