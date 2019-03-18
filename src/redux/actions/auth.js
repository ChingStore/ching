// @flow

import ACTIONS from 'redux/actionTypes'
import PROVIDER from 'constants/auth-provider'

import type { ThunkActionType } from 'constants/redux'

import type { FirebaseAuthType } from 'constants/firebase'

const signInWithOAuth = (
  provider: string
): ThunkActionType<Promise<boolean>> => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase()
  try {
    let _provider
    if (provider === PROVIDER.FACEBOOK) {
      _provider = new firebase.auth.FacebookAuthProvider()
    }

    if (provider === PROVIDER.GITHUB) {
      _provider = new firebase.auth.GithubAuthProvider()
    }

    if (provider === PROVIDER.GOOGLE) {
      _provider = new firebase.auth.GoogleAuthProvider()
    }

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
  signInWithOAuth,
  signInWithEmail,
  signOut,
  signUpWithEmail,
}
