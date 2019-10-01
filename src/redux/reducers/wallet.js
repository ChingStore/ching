import ACTIONS from 'redux/actionTypes'

const initState = {
  daiBalance: '',
  xdaiBalance: '',
  walletError: null,
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
    case ACTIONS.UPDATE_ERC20_ASSET_SUCCESS:
      console.log(action.type)
      return {
        ...state,
        erc20Asset: action.payload,
      }
    case ACTIONS.UPDATE_WALLET_ADDRESS_ERROR:
      console.log('Error during address updating')
      return {
        ...state,
        walletAddress: action.payload,
      }
    case ACTIONS.UPDATE_ERC20_ASSET_ERROR:
      console.log('Error during ERC20 Asset updating')
      return {
        ...state,
        erc20Asset: action.payload,
      }
    default:
      return state
  }
}

export default walletReducer
