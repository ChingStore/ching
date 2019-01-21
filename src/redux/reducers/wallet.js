import ACTIONS from '../actionTypes'

const initState = {
  balance: '',
}

const walletReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_WALLET_BALANCE:
      return {
        ...state,
        balance: action.payload,
      }
    default:
      return state
  }
}

export default walletReducer
