import ACTIONS from '../actionTypes'
import web3Instance from '../../singletons/web3/web3'

const add = () => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()
    const state = getState()
    try {
      const newOrder = await firestore.collection('orders').add({
        txHash: null,
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

const txStatusCheckAndUpdate = order => {
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
        // if status is confirmed => update soldCount of items in the order
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
  txStatusCheckAndUpdate,
}
