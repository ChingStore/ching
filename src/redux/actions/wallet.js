// @flow

import type { ThunkActionType } from 'constants/redux'

import Web3DaiInfura from '../../singletons/web3/dai-infura'
import Web3XdaiInfura from '../../singletons/web3/xdai-infura'
import ACTIONS from '../actionTypes'
import selector from '../selectors'

const initialize = (): ThunkActionType => async dispatch => {
  setInterval(() => {
    dispatch(updateBalance())
  }, 1000)
}

const updateBalance = (): ThunkActionType => async (dispatch, getState) => {
  const state = getState()
  const walletAddress = selector.wallet.address(state)
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

export default { initialize }
