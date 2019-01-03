import ACTIONS from '../actionTypes'

const add = ({ name, picture, soldCount, quantity, price }) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore()
    firestore
      .collection('items')
      .add({
        name,
        picture,
        soldCount,
        quantity,
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
