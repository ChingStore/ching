// @flow

import type { IdType, StoreType } from 'constants/firebase'
import type { ThunkActionType } from 'constants/redux'

import ACTIONS from 'redux/actionTypes'
import selectors from 'redux/selectors'

const create = ({
  storeName,
  walletAddress,
}: $Shape<StoreType>): ThunkActionType => async (
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

  if (!storeName || !walletAddress) {
    dispatch({
      type: ACTIONS.SHOP_SIGNUP_ERROR,
      payload: 'Store Name or wallet address is empty',
    })
    return false
  }

  try {
    const firestore = getFirestore()
    const newStore = await firestore.collection('stores').add({
      storeName,
      walletAddress,
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
}): ThunkActionType => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()
    await firestore
      .collection('stores')
      .doc(storeId)
      .set(data)
  }
}

export default { create, update }
