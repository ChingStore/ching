import ACTIONS from 'redux/actionTypes'

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.ADD_ITEM_SUCCESS: {
      console.log('item added')
      return {
        ...state,
      }
    }
    case ACTIONS.SELL_ITEM: {
      const { id, quantity } = action.payload
      const newState = Object.assign({}, state)
      newState[id].soldCount += quantity
      newState[id].count -= quantity
      return Object.assign({}, newState)
    }
    case ACTIONS.ERROR: {
      console.log(action.err)
      return state
    }
    default:
      return state
  }
}
