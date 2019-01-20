import _ from 'lodash'
import web3Instance from '../../singletons/web3/web3'
import selector from '../selectors'

const add = ({ itemId, quantity }) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()
    const state = getState()
    const price = selector.getItemPrice(state, { itemId })
    const items = {
      [itemId]: { quantity, price },
    }
    try {
      const newOrder = await firestore.collection('orders').add({
        txHash: null,
        items: items,
        userId: state.firebase.auth.uid,
        createdAt: new Date(),
      })
      return newOrder.id
    } catch (err) {
      console.log('Error in order/add action', err.message)
    }
  }
}

const txStatusCheckAndUpdateOrder = order => {
  return async (dispatch, getState, { getFirestore }) => {
    if (order.txConfirmed) {
      return
    }

    if (!order.txConfirmed && order.txHash) {
      const firestore = getFirestore()
      try {
        const isTxConfirmed = await web3Instance.isTxConfirmed(order.txHash)
        await firestore
          .collection('orders')
          .doc(order.id)
          .update({
            txConfirmed: isTxConfirmed,
          })
        if (isTxConfirmed) {
          // updating selling items
          const state = getState()
          const confirmedOrderItems = selector.getOrderItems(state, {
            orderId: order.id,
          })
          _.map(confirmedOrderItems, async (soldItem, soldItemId) => {
            const fbItem = selector.getItem(state, { itemId: soldItemId })

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
        console.log('Cannot update order. ID:', order.id)
        console.log('Reason:', error.message)
      }
    }
  }
}

const initialize = () => {
  return async dispatch => {
    setInterval(function() {
      dispatch(processAllOrders())
    }, 1000)
  }
}

const processAllOrders = () => {
  return async (dispatch, getState) => {
    const state = getState()
    const orders = selector.getOrders(state)
    _.map(orders, order => {
      dispatch(txStatusCheckAndUpdateOrder(order))
    })
  }
}

export default {
  add,
  initialize,
}
