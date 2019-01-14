import ACTIONS from '../actionTypes'

const add = ({ name, picture, soldCount, quantity, price }) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()
    const state = getState()
    try {
      await firestore.collection('items').add({
        name,
        picture,
        soldCount,
        quantity,
        price,
        userId: state.firebase.auth.uid,
        createdAt: new Date(),
      })
      dispatch({
        type: ACTIONS.ADD_ITEM,
      })
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
