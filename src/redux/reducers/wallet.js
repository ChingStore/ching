import ACTIONS from 'redux/actionTypes'

const initState = {
  walletError: null,
  daiBalance: '',
  xdaiBalance: '',
  walletAddress: null,
}

const walletReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_DAIWALLET_BALANCE:
      console.log(action.type)
      return {
        ...state,
        daiBalance: action.payload,
      }
    case ACTIONS.UPDATE_XDAIWALLET_BALANCE:
      console.log(action.type)
      return {
        ...state,
        xdaiBalance: action.payload,
      }
    case ACTIONS.UPDATE_WALLET_ADDRESS_SUCCESS:
      console.log(action.type)
      return {
        ...state,
        walletAddress: action.payload,
      }
    case ACTIONS.UPDATE_WALLET_ADDRESS_ERROR:
      console.log('Error during address updating')
      return {
        ...state,
        walletAddress: action.payload,
      }
    default:
      return state
  }
}

export default walletReducer
