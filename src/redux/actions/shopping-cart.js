// @flow

import type { ThunkActionType } from 'constants/redux'

import selectors from 'redux/selectors'

const reset = (): ThunkActionType => async (
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

export default {
  reset,
}
