// @flow

import type { IdType, OrderType, OrderItemType } from 'constants/firebase'
import type { ThunkActionType } from 'constants/redux'

import _ from 'lodash'

import NETWORK from 'constants/network'
import selector from 'redux/selectors'
import web3DaiInfura from 'singletons/web3/dai-infura'
import web3XdaiInfura from 'singletons/web3/xdai-infura'

const _getOrderOrShoppingCart = (
  inputOrderId?: IdType
): ThunkActionType<{ order: ?OrderType, orderId: ?IdType }> => (
  dispatch,
  getState
) => {
  const state = getState()
  const shoppingCartOrderId = selector.users.shoppingCartOrderId(state)

  let order = null
  let orderId = null
  if (inputOrderId) {
    orderId = inputOrderId
    order = selector.orders.order(state, { orderId })
  } else if (shoppingCartOrderId) {
    order = selector.orders.shoppingCart(state)
    orderId = shoppingCartOrderId
  }

  console.log({ orderId, shoppingCartOrderId, order })

  return { order, orderId }
}

/**
 * Updates an item in the order.
 * NOTE: If order is not specified, shopping cart order will be used.
 */
const updateItem = ({
  orderId: inputOrderId,
  itemId,
  quantity,
}: {
  orderId?: IdType,
  itemId: IdType,
  quantity: number,
}): ThunkActionType<Promise<void>> => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const { order, orderId } = dispatch(_getOrderOrShoppingCart(inputOrderId))

  if (!order || !orderId) {
    throw Error('No order specified and to shopping cart order found')
  }

  const orderItemIndex = _.findIndex(order.items, { id: itemId })
  if (orderItemIndex === -1) {
    throw Error('The item is not in the order specified nor in shopping cart')
  }

  if (quantity < 1) {
    await dispatch(removeAllItemsOfAKind({ orderId, itemId }))
    return
  }

  const updatedOrderItems = [...order.items]
  updatedOrderItems[orderItemIndex] = {
    ...order.items[orderItemIndex],
    quantity,
  }

  await getFirestore()
    .collection('orders')
    .doc(orderId)
    .update({
      items: updatedOrderItems,
    })
}

/**
 * Adds adds an item to an order.
 * NOTE: If order is not specified, shopping cart order will be used. If there is
 * no shopping cart order present, a new one will be created.
 */
const addItem = ({
  orderId: inputOrderId,
  itemId,
}: {
  orderId?: IdType,
  itemId: IdType,
}): ThunkActionType<Promise<void>> => async dispatch => {
  const { orderId } = dispatch(_getOrderOrShoppingCart(inputOrderId))

  if (orderId) {
    await dispatch(_addItemToExistingOrder({ orderId, itemId }))
  } else {
    await dispatch(_createOrderWithItem({ itemId }))
  }
}

const _addItemToExistingOrder = ({
  orderId,
  itemId,
}: {
  orderId: IdType,
  itemId: IdType,
}): ThunkActionType<Promise<void>> => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const order = selector.orders.order(getState(), { orderId })
  const orderItemIndex = _.findIndex(order.items, { id: itemId })

  if (orderItemIndex === -1) {
    console.log('Adding new item')
    const price = selector.items.price(getState(), { itemId })
    const orderItem = { quantity: 1, price, id: itemId }
    await getFirestore()
      .collection('orders')
      .doc(orderId)
      .update({
        items: [...order.items, orderItem],
      })
  } else {
    console.log('Incrementing item quantity')
    await dispatch(
      updateItem({
        orderId,
        itemId,
        quantity: order.items[orderItemIndex].quantity + 1,
      })
    )
  }
}

const _createOrderWithItem = ({
  itemId,
}: {
  itemId: IdType,
}): ThunkActionType<Promise<void>> => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const currentUserId = selector.users.currentId(getState())
  const price = selector.items.price(getState(), { itemId })
  const orderItem = { quantity: 1, price, id: itemId }

  console.time('transaction')
  await getFirestore().runTransaction(async transaction => {
    // Create new order
    const newOrderRef = await getFirestore()
      .collection('orders')
      .doc()
    await transaction.set(newOrderRef, {
      txHash: null,
      networkId: null,
      items: [orderItem],
      userId: currentUserId,
      createdAt: getFirestore().FieldValue.serverTimestamp(),
    })
    // Update current user
    const currentUserRef = await getFirestore()
      .collection('users')
      .doc(currentUserId)
    await transaction.update(currentUserRef, {
      shoppingCartOrderId: newOrderRef.id,
    })
  })
  console.timeEnd('transaction')
}

/**
 * Removes all items of the same kind as a specified item.
 * NOTE: If order is not specified, shopping cart order will be used.
 */
const removeAllItemsOfAKind = ({
  orderId: inputOrderId,
  itemId,
}: {
  orderId?: IdType,
  itemId: IdType,
}): ThunkActionType<Promise<void>> => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const { order, orderId } = dispatch(_getOrderOrShoppingCart(inputOrderId))

  if (!order || !orderId) {
    throw Error('No order found')
  }

  const orderItem = _.find(order.items, { id: itemId })
  if (!orderItem) {
    throw Error('The item is not in the order specified nor in shopping cart')
  }

  // If removing last item
  if (order.items.length === 1) {
    console.log('Deleting the order', { orderId })
    const currentUserId = selector.users.currentId(getState())
    console.log({ currentUserId })
    await Promise.all([
      getFirestore()
        .collection('users')
        .doc(currentUserId)
        .update({
          shoppingCartOrderId: null,
        }),
      getFirestore()
        .collection('orders')
        .doc(orderId)
        .delete(),
    ])
  } else {
    console.log('Removing last item of a kind from the order', {
      orderId,
      itemId,
    })
    await getFirestore()
      .collection('orders')
      .doc(orderId)
      .update({
        ...order,
        items: _.without(order.items, orderItem),
      })
  }
}

/**
 * Removes an item from an order.
 * NOTE: If order is not specified, shopping cart order will be used.
 */
const removeItem = ({
  orderId: inputOrderId,
  itemId,
}: {
  orderId?: IdType,
  itemId: IdType,
}): ThunkActionType<Promise<void>> => async dispatch => {
  const { order, orderId } = dispatch(_getOrderOrShoppingCart(inputOrderId))

  if (!order || !orderId) {
    throw Error('No order found')
  }

  const orderItem = _.find(order.items, { id: itemId })
  if (!orderItem) {
    throw Error('The item is not in the order specified nor in shopping cart')
  }

  await dispatch(
    updateItem({ orderId, itemId, quantity: orderItem.quantity - 1 })
  )
}

const _txStatusCheckAndUpdateOrder = (
  order
): ThunkActionType<Promise<void>> => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  if (order.txConfirmed) {
    return
  }

  if (!order.txConfirmed && order.txHash && order.networkId) {
    const firestore = getFirestore()
    const networkId = parseInt(order.networkId, 10)
    let isTxConfirmed
    try {
      if (networkId === NETWORK.ID.MAINNET) {
        isTxConfirmed = await web3DaiInfura.isTxConfirmed(order.txHash)
      } else if (networkId === NETWORK.ID.XDAI) {
        isTxConfirmed = await web3XdaiInfura.isTxConfirmed(order.txHash)
      } else if (networkId === NETWORK.ID.KOVAN) {
        isTxConfirmed = await web3DaiInfura.isTxConfirmed(order.txHash)
      } else {
        console.log('Cannot update order. Undefined network ID')
        return
      }

      if (!(typeof isTxConfirmed === 'undefined')) {
        await firestore
          .collection('orders')
          .doc(order.id)
          .update({
            txConfirmed: isTxConfirmed,
          })
      }
      if (isTxConfirmed && !(typeof isTxConfirmed === 'undefined')) {
        // updating selling items
        const state = getState()
        const confirmedOrderItems = selector.orders.items(state, {
          orderId: order.id,
        })
        confirmedOrderItems.map(async (soldItem: OrderItemType) => {
          const fbItem = selector.items.item(state, { itemId: soldItem.id })

          await firestore
            .collection('items')
            .doc(soldItem.id)
            .update({
              stockCount: fbItem.stockCount - soldItem.quantity,
              soldCount: fbItem.soldCount + soldItem.quantity,
            })
          console.log('Order updated. ID:', order.id)
        })
      }
    } catch (error) {
      console.log('Cannot update order:', order)
      console.log('Reason:', error.message)
    }
  }
}

const _processAllOrders = (): ThunkActionType<Promise<void>> => async (
  dispatch,
  getState
) => {
  const state = getState()
  const orders = selector.orders.all(state)
  _.map(orders, order => {
    dispatch(_txStatusCheckAndUpdateOrder(order))
  })
}

const initialize = (): ThunkActionType<Promise<void>> => async dispatch => {
  setInterval(() => {
    dispatch(_processAllOrders())
  }, 10000)
}

export default {
  initialize,

  addItem,
  removeAllItemsOfAKind,
  removeItem,
  updateItem,
}
