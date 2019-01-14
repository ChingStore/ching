import ACTIONS from '../actionTypes'

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.ADD_ORDER: {
      console.log('order added')
      return {
        ...state,
      }
    }
    case ACTIONS.UPDATE_ORDER: {
      console.log('order updated')
      return {
        ...state,
      }
    }
    default:
      return state
  }
}
