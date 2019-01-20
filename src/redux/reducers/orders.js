import ACTIONS from 'redux/actionTypes'

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.ADD_ORDER_SUCCESS: {
      console.log('order added')
      return {
        ...state,
      }
    }
    default:
      return state
  }
}
