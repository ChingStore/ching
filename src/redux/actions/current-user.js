// @flow

import type { ThunkActionType } from 'constants/redux'
import type { FirebaseAuthType, IdType } from 'constants/firebase'

import ACTIONS from 'redux/actionTypes'
import selectors from 'redux/selectors'

const setShoppingCartOrder = (
  orderId: ?IdType
): ThunkActionType<Promise<void>> => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const state = getState()
  const currentUserId = selectors.users.currentId(state)
  await getFirebase()
    .collection('users')
    .doc(currentUserId)
    .update({
      shoppingCartOrderId: orderId,
    })
}

////////////////////
// AUTHENTICATION //
////////////////////

const signIn = ({
  email,
  password,
}: $Shape<FirebaseAuthType>): ThunkActionType<Promise<boolean>> => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase()
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password)
    dispatch({ type: ACTIONS.LOGIN_SUCCESS })
    return true
  } catch (error) {
    dispatch({ type: ACTIONS.LOGIN_ERROR, error })
    return false
  }
}

const signOut = (): ThunkActionType<Promise<void>> => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase()
  try {
    await firebase.auth().signOut()
    dispatch({ type: ACTIONS.CLEAR_DATA })
  } catch (error) {
    console.log('cannot logout')
    console.log(error.message)
  }
}

const signUp = ({
  email,
  password,
}: $Shape<FirebaseAuthType>): ThunkActionType<Promise<boolean>> => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase()
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    dispatch({ type: ACTIONS.SIGNUP_SUCCESS })
    return true
  } catch (error) {
    dispatch({ type: ACTIONS.SIGNUP_ERROR, error })
    return false
  }
}

export default { setShoppingCartOrder, signIn, signOut, signUp }
