import ACTIONS from 'redux/actionTypes'

const initState = {
  shopError: null,
}

const shopReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTIONS.SHOP_SIGNUP_SUCCESS:
      console.log(action.type)
      return {
        ...state,
        shopError: action.type,
      }
    case ACTIONS.SHOP_SIGNUP_ERROR:
      console.log('Error during shop creating')
      return {
        ...state,
        shopError: action.payload,
      }
    default:
      return state
  }
}

export default shopReducer
