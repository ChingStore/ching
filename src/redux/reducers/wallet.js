import ACTIONS from '../actionTypes'

const initState = {
  daiBalance: '',
  xdaiBalance: '',
}

const walletReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_DAIWALLET_BALANCE:
      return {
        ...state,
        daiBalance: action.payload,
      }
    case ACTIONS.UPDATE_XDAIWALLET_BALANCE:
      return {
        ...state,
        xdaiBalance: action.payload,
      }
    default:
      return state
  }
}

export default walletReducer
