import web3Infura from '../../singletons/web3/infura'
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
    const oldBalance = selector.getWalletBalance(state)
    const newBalance = await web3Infura.getBalance(walletAddress)
    if (oldBalance.toString() !== newBalance.toString()) {
      dispatch({ type: ACTIONS.UPDATE_WALLET_BALANCE, payload: newBalance })
    }
  }
}

export default { initialize }
