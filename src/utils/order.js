// @flow

import type { OrderType, OrderItemType } from 'constants/firebase'

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

function txStatus(order: OrderType): string {
  if (isWaitingForTransaction(order)) return 'waiting tx hash'
  if (isConfirming(order)) return 'confirming'
  if (isConfirmed(order)) return 'confirmed'
  if (isFailed(order)) return 'failed'
  return 'undefined'
}

export default {
  getTotalPrice,
  txStatus,
}
