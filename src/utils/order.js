// @flow

import type { OrderType, OrderItemType } from 'constants/firebase'
import type { OrderStatusType } from 'constants/order'

import ORDER from 'constants/order'

function getTotalPrice(order?: OrderType): number {
  if (!order || !order.items) {
    return 0
  }

  return Object.values(order.items).reduce(
    // $FlowFixMe: OrderItemType is incompatible with mixed
    (totalPrice: number, item: OrderItemType) =>
      totalPrice + item.quantity * item.price,
    0
  )
}

function isWaitingForTransaction(order: OrderType): boolean {
  return !isConfirming(order) && !isConfirmed(order) && !isFailed(order)
}

function isConfirming(order: OrderType): boolean {
  return !!order.txHash && !isConfirmed(order) && !isFailed(order)
}

function isConfirmed(order: OrderType): boolean {
  return order.txConfirmed === '0x1'
}

function isFailed(order: OrderType): boolean {
  return order.txConfirmed === '0x0'
}

function txStatus(order: OrderType): OrderStatusType {
  if (isWaitingForTransaction(order)) return ORDER.STATUS.WAITING_FOR_SCAN
  if (isConfirming(order)) return ORDER.STATUS.CONFIRMING
  if (isConfirmed(order)) return ORDER.STATUS.CONFIRMED
  if (isFailed(order)) return ORDER.STATUS.FAILED
  return 'undefined'
}

export default {
  getTotalPrice,
  txStatus,
}
