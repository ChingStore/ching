// @flow

import type { ThunkActionType } from 'constants/redux'

import selectors from 'redux/selectors'

const reset = (): ThunkActionType<Promise<void>> => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const state = getState()
  const userId = selectors.users.currentId(state)

  console.log('Resetting Shopping Cart...')

  const firestore = getFirestore()
  await firestore
    .collection('users')
    .doc(userId)
    .update({
      shoppingCartOrderId: null,
    })
}

const resetTransaction = (): ThunkActionType<Promise<void>> => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const state = getState()
  const orderId = selectors.users.shoppingCartOrderId(state)

  await getFirestore()
    .collection('orders')
    .doc(orderId)
    .update({
      txHash: null,
      txConfirmed: null,
    })
}

export default {
  reset,
  resetTransaction,
}
