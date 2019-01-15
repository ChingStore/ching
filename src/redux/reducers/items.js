import ACTIONS from '../actionTypes'

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.ADD_ITEM: {
      console.log('item added')
      return {
        ...state,
      }
    }
    case ACTIONS.SELL_ITEM: {
      console.log('item sold')
      return {
        ...state,
      }
    }
    case ACTIONS.ERROR: {
      console.log(action.err)
      return state
    }
    default:
      return state
  }
}
