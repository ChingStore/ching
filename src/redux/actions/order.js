import _ from 'lodash'
import ACTIONS from '../actionTypes'
import web3Instance from '../../singletons/web3/web3'
import selector from '../selectors'

const add = (itemId, quantity) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()
    const state = getState()
    const price = selector.getItemPrice(state, { itemId })
    let itemsToSale = {}
    itemsToSale[itemId] = { quantity, price }
    try {
      const newOrder = await firestore.collection('orders').add({
        txHash: null,
        items: itemsToSale,
        userId: state.firebase.auth.uid,
        createdAt: new Date(),
      })
      dispatch({
        type: ACTIONS.ADD_ORDER,
      })
      return newOrder.id
    } catch (err) {
      dispatch({
        type: ACTIONS.ERROR,
        err,
      })
    }
  }
}

const txStatusCheckAndUpdateOrder = order => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()

    if (!order.txConfirmed && order.txHash) {
      try {
        const status = await web3Instance.isTxConfirmed(order.txHash)
        await firestore
          .collection('orders')
          .doc(order.id)
          .update({
            txConfirmed: status,
          })
        if (status) {
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
          })
        }
        dispatch({ type: ACTIONS.UPDATE_ORDER })
      } catch (error) {
        console.log('Cannot update order', order.id)
        dispatch({ type: ACTIONS.ERROR })
      }
    }
  }
}

export default {
  add,
  txStatusCheckAndUpdateOrder,
}
