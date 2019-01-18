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
    const firestore = getFirestore()

    if (order.txConfirmed) {
      return
    }

    if (!order.txConfirmed && order.txHash) {
      try {
        const isConfirmed = await web3Instance.isTxConfirmed(order.txHash)
        await firestore
          .collection('orders')
          .doc(order.id)
          .update({
            txConfirmed: isConfirmed,
          })
        if (!isConfirmed) {
          return
        } else {
          // updating selling items
          const confirmed_order = await firestore
            .collection('orders')
            .doc(order.id)
            .get()
          const items = confirmed_order.data().items
          _.map(items, async (soldItem, soldItemid) => {
            const fb_item = await firestore
              .collection('items')
              .doc(soldItemid)
              .get()

            await firestore
              .collection('items')
              .doc(soldItemid)
              .update({
                quantity: fb_item.data().quantity - soldItem.quantity,
                soldCount: fb_item.data().soldCount + soldItem.quantity,
              })
            console.log('Order updated. ID:', order.id)
          })
        }
      } catch (error) {
        console.log('Cannot update order. ID:', order.id)
      }
    }
  }
}

export default {
  add,
  txStatusCheckAndUpdateOrder,
}
