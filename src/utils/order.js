// @flow

import type { OrderType, OrderItemType } from 'constants/firebase'

function getTotalPrice(order: OrderType): number {
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
  return !isConfirming(order) && !isConfirmed(order)
}

function isConfirming(order: OrderType): boolean {
  return !!order.txHash && !order.txConfirmed
}

function isConfirmed(order: OrderType): boolean {
  return order.txConfirmed
}

export default {
  getTotalPrice,
  isWaitingForTransaction,
  isConfirming,
  isConfirmed,
}
