// @flow

import ACTIONS from 'redux/actionTypes'
import PROVIDER from 'constants/auth-provider'
import selectors from 'redux/selectors'

import type { ThunkActionType } from 'constants/redux'
import type { FirebaseAuthType, IdType } from 'constants/firebase'

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

const signInWithOAuth = (
  provider: string
): ThunkActionType<Promise<boolean>> => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase()
  try {
    const providerConstructorsMap = {
      [PROVIDER.FACEBOOK]: firebase.auth.FacebookAuthProvider,
      [PROVIDER.GITHUB]: firebase.auth.GithubAuthProvider,
      [PROVIDER.GOOGLE]: firebase.auth.GoogleAuthProvider,
    }

    const _provider = new providerConstructorsMap[provider]()

    await firebase.auth().signInWithRedirect(_provider)
    dispatch({ type: ACTIONS.LOGIN_SUCCESS })
    return true
  } catch (error) {
    dispatch({ type: ACTIONS.LOGIN_ERROR, error })
    return false
  }
}

const signInWithEmail = ({
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

const signUpWithEmail = ({
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

export default {
  setShoppingCartOrder,
  signInWithOAuth,
  signInWithEmail,
  signOut,
  signUpWithEmail,
}
