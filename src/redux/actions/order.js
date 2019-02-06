import _ from 'lodash'
import NETWORK from 'constants/network'
import web3DaiInfura from 'singletons/web3/dai-infura'
import web3XdaiInfura from 'singletons/web3/xdai-infura'
import selector from 'redux/selectors'

/**
 * Updates or inserts an item in the order.
 * NOTE: When orderId is not specified current users shopping cart order id is used.
 * Otherwise, a new order is created and user is updated with the new shopping cart order id.
 */
const upsertItem = ({ orderId: inputOrderId, itemId, quantity }) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore()
  const state = getState()
  const price = selector.items.price(state, { itemId })
  const shoppingCartOrderId = selector.users.shoppingCartOrderId(state)
  const currentUserId = selector.users.currentId(state)

  let order
  let orderId
  if (inputOrderId) {
    order = selector.orders.order(state, { orderId })
    orderId = inputOrderId
  } else if (shoppingCartOrderId) {
    order = selector.orders.shoppingCart(state)
    orderId = shoppingCartOrderId
  } else {
    order = null
  }

  // If quantity is not specified, just increment the current one
  const orderItem = { quantity, price }
  if (!orderItem.quantity) {
    const currentQuantity = _.get(order, `items[${itemId}].quantity`, 0)
    orderItem.quantity = currentQuantity + 1
  }
  const newOrderItems = { [itemId]: orderItem }

  if (!order) {
    // Create new order
    try {
      // Use transaction to make sure
      console.time('transaction')
      await firestore.runTransaction(async transaction => {
        const newOrderRef = await firestore.collection('orders').doc()
        console.log({ transaction, newOrderRef })
        order = await transaction.set(newOrderRef, {
          txHash: null,
          networkId: null,
          items: newOrderItems,
          userId: currentUserId,
          createdAt: new Date(),
        })
        orderId = newOrderRef.id
        const currentUserRef = await firestore
          .collection('users')
          .doc(currentUserId)
        await transaction.update(currentUserRef, {
          shoppingCartOrderId: orderId,
        })
      })
      console.timeEnd('transaction')

      // console.time('add')
      // order = await firestore.collection('orders').add({
      //   txHash: null,
      //   networkId: null,
      //   items: newOrderItems,
      //   userId: currentUserId,
      //   createdAt: new Date(),
      // })
      // console.timeEnd('add')

      // orderId = order.id
      // // throw 123
      // console.time('update')

      // await firestore
      //   .collection('users')
      //   .doc(currentUserId)
      //   .update({
      //     shoppingCartOrderId: orderId,
      //   })

      // console.timeEnd('update')
    } catch (err) {
      console.error('Error creating new order', err)
    }
  } else {
    // Update existing order
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

const removeItem = ({ orderId, itemId }) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore()
  const state = getState()

  const order = selector.orders.order(state, { orderId })

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

const txStatusCheckAndUpdateOrder = order => async (
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

const processAllOrders = () => async (dispatch, getState) => {
  const state = getState()
  const orders = selector.orders.all(state)
  _.map(orders, order => {
    dispatch(txStatusCheckAndUpdateOrder(order))
  })
}

const initialize = () => async dispatch => {
  setInterval(() => {
    dispatch(processAllOrders())
  }, 10000)
}

export default {
  initialize,

  upsertItem,
  removeItem,
}
