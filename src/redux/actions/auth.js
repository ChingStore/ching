// @flow

import ACTIONS from 'redux/actionTypes'

import type { ThunkActionType } from 'constants/redux'

import type { FirebaseAuthType } from 'constants/firebase'

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

const signOut = (): ThunkActionType<> => async (
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

export default { signIn, signOut, signUp }
