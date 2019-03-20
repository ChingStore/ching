// @flow

import type { OrdersOrderedType, OrderOrderedType } from 'constants/firebase'

/** @jsx jsx */
import { jsx } from '@emotion/core'
import _ from 'lodash'
import * as React from 'react'
import ReactList from 'react-list'
import * as ReactReduxFirebase from 'react-redux-firebase'

import Flex from 'components/common/flex'
import Button from 'components/common/button'
import Spinner from 'components/common/spinner'
import orderUtil from 'utils/order'
import ORDER from 'constants/order'
import STYLE from 'constants/style'

import OrderRow from './container/order-row'
import style from './index.style.js'

export type PropsType = {|
  ordersOrdered: ?OrdersOrderedType,
|}

class Sales extends React.PureComponent<PropsType> {
  render() {
    const { ordersOrdered } = this.props

    if (!ReactReduxFirebase.isLoaded(ordersOrdered)) {
      return (
        <Flex column grow center>
          <Spinner fill={STYLE.COLOR.BLUE} />
        </Flex>
      )
    }

    return (
      <Flex grow relative>
        <Flex absoluteFill column alignCenter css={style.scroller}>
          <Flex column css={style.scrollerContents}>
            {this.renderTitle()}
            {this.renderLine()}
            {this.renderSalesStats()}
            {this.renderLine()}
            {this.renderOrders()}
          </Flex>
        </Flex>
      </Flex>
    )
  }

  renderTitle = () => {
    return (
      <Flex spaceBetween alignCenter css={style.title}>
        <Flex css={style.title_text}>Sales</Flex>
        {this.renderDownloadReport()}
      </Flex>
    )
  }

  renderDownloadReport = () => {
    return (
      <Button
        css={style.title_downloadReportButton}
        onClick={() => alert('Coming soon!')}
      >
        <Flex css={style.title_downloadReportButtonText}>Download report</Flex>
      </Button>
    )
  }

  renderSalesStats = () => (
    <Flex spaceBetween css={style.salesStats}>
      {this.renderSoldTotal()}
      {this.renderSoldItemsCount()}
      {this.renderTransactionsCount()}
    </Flex>
  )

  renderSoldTotal = () => {
    return (
      <Flex column grow spaceBetween alignCenter css={style.salesStats_metric}>
        <Flex css={style.salesStats_data}>
          ${this.getTotalSold().toFixed(0)}
        </Flex>
        <Flex css={style.salesStats_name}>Total sold</Flex>
      </Flex>
    )
  }

  renderSoldItemsCount = () => {
    return (
      <Flex column grow spaceBetween alignCenter css={style.salesStats_metric}>
        <Flex css={style.salesStats_data}>{this.getSoldItemsCount()}</Flex>
        <Flex css={style.salesStats_name}>Items</Flex>
      </Flex>
    )
  }

  renderTransactionsCount = () => {
    return (
      <Flex column grow spaceBetween alignCenter css={style.salesStats_metric}>
        <Flex css={style.salesStats_data}>{this.getTransactionsCount()}</Flex>
        <Flex css={style.salesStats_name}>Transactions</Flex>
      </Flex>
    )
  }

  renderLine = () => <Flex grow css={style.line} />

  renderOrders = () => {
    const { ordersOrdered } = this.props

    if (_.isEmpty(ordersOrdered)) {
      return (
        <Flex column grow css={style.emptyOrdersText}>
          No orders yet <br />
          Sell something to see the stats
        </Flex>
      )
    }
    return (
      <ReactList
        itemRenderer={this.renderOrderRow}
        length={_.size(ordersOrdered)}
        type="uniform"
        useTranslate3d
        threshold={3000}
      />
    )
  }

  renderOrderRow = (index: number, key: *) => {
    const { ordersOrdered } = this.props
    if (!ordersOrdered) {
      return 'Loading...'
    }
    const order = ordersOrdered[index]

    return <OrderRow {...{ orderId: order.id, key }} />
  }

  /////////////
  // GETTERS //
  /////////////

  getTotalSold = (): number => {
    const { ordersOrdered } = this.props

    if (_.isEmpty(ordersOrdered)) {
      return 0
    }

    // $FlowFixMe: undefined in incompatible with number
    return _.reduce(
      ordersOrdered,
      (totalSold: number, order: OrderOrderedType) => {
        const status = orderUtil.txStatus(order)
        return (
          totalSold +
          (status === ORDER.STATUS.CONFIRMED
            ? orderUtil.getTotalPrice(order)
            : 0)
        )
      },
      0
    )
  }

  getSoldItemsCount = () => {
    const { ordersOrdered } = this.props

    if (_.isEmpty(ordersOrdered)) {
      return 0
    }

    // $FlowFixMe: undefined in incompatible with number
    return _.reduce(
      ordersOrdered,
      (soldItemsCount: number, order: OrderOrderedType) => {
        const status = orderUtil.txStatus(order)
        return (
          soldItemsCount +
          (status === ORDER.STATUS.CONFIRMED
            ? orderUtil.getItemsCount(order)
            : 0)
        )
      },
      0
    )
  }

  getTransactionsCount = () => {
    const { ordersOrdered } = this.props

    if (_.isEmpty(ordersOrdered)) {
      return 0
    }

    // $FlowFixMe: undefined in incompatible with number
    return _.reduce(
      ordersOrdered,
      (transactionsCount: number, order: OrderOrderedType) => {
        const status = orderUtil.txStatus(order)
        return transactionsCount + (status === ORDER.STATUS.CONFIRMED ? 1 : 0)
      },
      0
    )
  }
}

export default Sales
