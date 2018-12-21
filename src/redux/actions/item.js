import ACTIONS from '../actionTypes'

let nextItemId = 0

const add = ({ name, photo, soldCount, count, price }) => {
  return dispatch => {
    dispatch({
      type: ACTIONS.ADD_ITEM,
      payload: {
        id: ++nextItemId,
        name,
        photo,
        soldCount,
        count,
        price,
      },
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
