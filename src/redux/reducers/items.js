import ACTIONS from '../actionTypes'

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.ADD_ITEM: {
      const { id, ...itemFields } = action.payload
      return {
        ...state,
        [id]: itemFields,
      }
    }
    case ACTIONS.SELL_ITEM: {
      const id = action.payload.id
      const changedItem = action.payload.item
      const newState = state
      newState[id] = changedItem
      return Object.assign({}, newState)
    }
    default:
      return state
  }
}
