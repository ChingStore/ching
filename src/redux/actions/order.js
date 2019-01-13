import ACTIONS from '../actionTypes'

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
        type: ACTIONS.ADD_ORDER_SUCCESS,
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

export default {
  add,
}
