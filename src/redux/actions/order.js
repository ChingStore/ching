// @flow

import type { IdType, OrderType } from 'constants/firebase'
import type { ThunkActionType } from 'constants/redux'

import _ from 'lodash'
import NETWORK from 'constants/network'
import web3DaiInfura from 'singletons/web3/dai-infura'
import web3XdaiInfura from 'singletons/web3/xdai-infura'
import selector from 'redux/selectors'

const _getOrderAndOrderId = (
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
 * Updates or inserts an item in the order.
 * NOTE: When orderId is not specified current users shopping cart order id is used.
 * Otherwise, a new order is created and user is updated with the new shopping cart order id.
 *
 * TODO: Move increment item count logic to `incrementItemCount`
 */
const upsertItem = ({
  orderId: inputOrderId,
  itemId,
  quantity,
}: {
  orderId?: IdType,
  itemId: IdType,
  quantity?: number,
}): ThunkActionType<> => async (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore()
  const state = getState()
  const price = selector.items.price(state, { itemId })
  const currentUserId = selector.users.currentId(state)

  const { order, orderId } = dispatch(_getOrderAndOrderId(inputOrderId))

  // If quantity is not specified, just increment the current one
  const orderItem = { quantity, price }
  if (!orderItem.quantity) {
    const currentQuantity = _.get(order, `items[${itemId}].quantity`, 0)
    orderItem.quantity = currentQuantity + 1
  }
  const newOrderItems = { [itemId]: orderItem }

  if (!order) {
    console.log('Creating new order')
    try {
      // Use transaction to make sure
      console.time('transaction')
      await firestore.runTransaction(async transaction => {
        // Create new order
        const newOrderRef = await firestore.collection('orders').doc()
        await transaction.set(newOrderRef, {
          txHash: null,
          networkId: null,
          items: newOrderItems,
          userId: currentUserId,
          createdAt: firestore.FieldValue.serverTimestamp(),
        })
        // Update current user
        const currentUserRef = await firestore
          .collection('users')
          .doc(currentUserId)
        await transaction.update(currentUserRef, {
          shoppingCartOrderId: newOrderRef.id,
        })
      })
      console.timeEnd('transaction')
    } catch (err) {
      console.error('Error creating new order', err)
    }
  } else {
    console.log('Upserting into existing order')
    try {
      await firestore
        .collection('orders')
        .doc(orderId)
        .update({
          ...order,
          items: {
            ...order.items,
            ...newOrderItems,
          },
        })
    } catch (err) {
      console.error('Error updating an order', err)
    }
  }
}

const incrementItemCount = ({
  orderId,
  itemId,
}: {
  orderId?: IdType,
  itemId: IdType,
}): ThunkActionType<> => async dispatch => {
  await dispatch(upsertItem({ orderId, itemId }))
}

const removeItem = ({
  orderId: inputOrderId,
  itemId,
}: {
  orderId: IdType,
  itemId: IdType,
}): ThunkActionType<> => async (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore()
  const state = getState()

  const { order, orderId } = dispatch(_getOrderAndOrderId(inputOrderId))

  if (!order || !orderId) {
    throw Error('There is order passed and no shopping cart order currently')
  }

  if (!order.items[itemId]) {
    throw Error('The item doesn’t belong to the order')
  }

  const updatedOrderItems = _.omit(order.items, itemId)
  console.log({ itemId, order, updatedOrderItems })

  if (_.isEmpty(updatedOrderItems)) {
    const currentUserId = selector.users.currentId(state)

    await Promise.all([
      firestore
        .collection('users')
        .doc(currentUserId)
        .update({
          shoppingCartOrderId: null,
        }),
      firestore
        .collection('orders')
        .doc(orderId)
        .delete(),
    ])
  } else {
    await firestore.update(
      {
        collection: 'orders',
        doc: orderId,
      },
      {
        ...order,
        items: updatedOrderItems,
      }
    )
  }
}

const decrementItemCount = ({
  orderId: inputOrderId,
  itemId,
}: {
  orderId?: IdType,
  itemId: IdType,
}): ThunkActionType<> => async (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore()
  const { order, orderId } = dispatch(_getOrderAndOrderId(inputOrderId))

  if (!order || !orderId) {
    throw Error('There is order passed and no shopping cart order currently')
  }

  if (!order.items[itemId]) {
    throw Error('The item doesn’t belong to the order')
  }

  // Deep copy order items
  const updatedOrderItems = JSON.parse(JSON.stringify(order.items))
  updatedOrderItems[itemId].quantity -= 1

  if (updatedOrderItems[itemId].quantity === 0) {
    await dispatch(removeItem({ orderId, itemId }))
    return
  }

  await firestore
    .collection('orders')
    .doc(orderId)
    .update({
      items: updatedOrderItems,
    })
}

const txStatusCheckAndUpdateOrder = (order): ThunkActionType<> => async (
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
        _.map(confirmedOrderItems, async (soldItem, soldItemId) => {
          const fbItem = selector.items.item(state, { itemId: soldItemId })

          await firestore
            .collection('items')
            .doc(soldItemId)
            .update({
              quantity: fbItem.quantity - soldItem.quantity,
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

const _processAllOrders = (): ThunkActionType<> => async (
  dispatch,
  getState
) => {
  const state = getState()
  const orders = selector.orders.all(state)
  _.map(orders, order => {
    dispatch(txStatusCheckAndUpdateOrder(order))
  })
}

const initialize = (): ThunkActionType<> => async dispatch => {
  setInterval(() => {
    dispatch(_processAllOrders())
  }, 10000)
}

export default {
  initialize,

  upsertItem,
  removeItem,
  decrementItemCount,
  incrementItemCount,
}
