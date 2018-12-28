import ACTIONS from '../actionTypes'

const add = ({ name, photo, soldCount, count, price }) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore()
    firestore
      .collection('items')
      .add({
        name,
        photo,
        soldCount,
        count,
        price,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({
          type: ACTIONS.ADD_ITEM_SUCCESS,
        })
      })
      .catch(err => {
        dispatch({
          type: ACTIONS.ERROR,
          err,
        })
      })
  }
}

const sell = (id, quantity) => {
  return dispatch => {
    // async transaction calls here
    dispatch({ type: ACTIONS.SELL_ITEM, payload: { id, quantity } })
  }
}

export default {
  add,
  sell,
}
