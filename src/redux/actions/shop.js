import ACTIONS from 'redux/actionTypes'
import selectors from 'redux/selectors'

const signUp = ({ storeName, walletAddress }) => async (
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

export default { signUp }
