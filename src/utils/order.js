function getTotalPrice(order) {
  if (!order || !order.items) {
    return 0
  }

  return order.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price
  }, 0)
}

export default {
  getTotalPrice,
}
