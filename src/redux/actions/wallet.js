import Web3DaiInfura from '../../singletons/web3/dai-infura'
import Web3XdaiInfura from '../../singletons/web3/xdai-infura'
import ACTIONS from '../actionTypes'
import selector from '../../redux/selectors'

const walletAddress = '0xf82B82b4ebC83479eF10271190A7cf5487240955'

const initialize = () => {
  return async dispatch => {
    setInterval(() => {
      dispatch(updateBalance())
    }, 1000)
  }
}

const updateBalance = () => {
  return async (dispatch, getState) => {
    const state = getState()
    const oldDaiBalance = selector.getDaiWalletBalance(state)
    const newDaiBalance = await Web3DaiInfura.getBalance(walletAddress)
    if (oldDaiBalance !== newDaiBalance) {
      dispatch({
        type: ACTIONS.UPDATE_DAIWALLET_BALANCE,
        payload: newDaiBalance,
      })
    }
    const oldXdaiBalance = selector.getXdaiWalletBalance(state)
    const newXdaiBalance = await Web3XdaiInfura.getBalance(walletAddress)
    if (oldXdaiBalance !== newXdaiBalance) {
      dispatch({
        type: ACTIONS.UPDATE_XDAIWALLET_BALANCE,
        payload: newXdaiBalance,
      })
    }
  }
}

export default { initialize }
