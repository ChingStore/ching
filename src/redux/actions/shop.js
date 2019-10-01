// @flow

import * as EthereumjsUtil from 'ethereumjs-util'

import type { IdType, StoreType } from 'constants/firebase'
import type { ThunkActionType } from 'constants/redux'

import ACTIONS from 'redux/actionTypes'
import selectors from 'redux/selectors'

const create = ({
  storeName,
  walletAddress,
  erc20Asset,
}: $Shape<StoreType>): ThunkActionType<Promise<boolean>> => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const state = getState()
  const uid = selectors.users.currentId(state)
  if (!uid) {
    dispatch({
      type: ACTIONS.SHOP_SIGNUP_ERROR,
      payload: 'First, you should login or signup user account',
    })
    return false
  }

  if (!storeName) {
    dispatch({
      type: ACTIONS.SHOP_SIGNUP_ERROR,
      payload: 'Store name is empty. Please type it in.',
    })
    return false
  }

  if (!walletAddress) {
    dispatch({
      type: ACTIONS.SHOP_SIGNUP_ERROR,
      payload: 'Wallet address is empty. Please type it in.',
    })
    return false
  }

  if (!erc20Asset) {
    dispatch({
      type: ACTIONS.SHOP_SIGNUP_ERROR,
      payload: 'ERC20 Asset address is empty. Please type it in.',
    })
    return false
  }

  if (!EthereumjsUtil.isValidAddress(walletAddress)) {
    dispatch({
      type: ACTIONS.SHOP_SIGNUP_ERROR,
      payload: 'Wallet address is invalid. Double check and try again.',
    })
    return false
  }

  try {
    const firestore = getFirestore()
    const newStore = await firestore.collection('stores').add({
      storeName,
      walletAddress,
      erc20Asset,
    })
    await firestore
      .collection('users')
      .doc(uid)
      .set({ storeId: newStore.id })
    dispatch({
      type: ACTIONS.SHOP_SIGNUP_SUCCESS,
    })
    return true
  } catch (error) {
    dispatch({ type: ACTIONS.SHOP_SIGNUP_SUCCESS, error })
    return false
  }
}

const update = ({
  storeId,
  data,
}: {
  storeId: IdType,
  data: $Shape<StoreType>,
}): ThunkActionType<Promise<void>> => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()
    await firestore
      .collection('stores')
      .doc(storeId)
      .update(data)
  }
}

export default { create, update }
