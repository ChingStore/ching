function getTotalPrice(order) {
  if (!order || !order.items) {
    return 0
  }

  return Object.values(order.items).reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  )
}

export default {
  getTotalPrice,
}
