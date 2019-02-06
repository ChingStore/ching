// @flow

import ACTIONS from 'redux/actionTypes'
import { actionTypes } from 'redux-firestore'

type SignInUpArgsType = {
  email: string,
  password: string,
}

const signIn = ({ email, password }: SignInUpArgsType) => async (
  dispatch: actionTypes,
  getState: actionTypes,
  { getFirebase }: actionTypes
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

const signOut = () => async (
  dispatch: actionTypes,
  getState: actionTypes,
  { getFirebase }: actionTypes
) => {
  const firebase = getFirebase()
  try {
    await firebase.auth().signOut()
    dispatch({ type: actionTypes.CLEAR_DATA })
  } catch (error) {
    console.log('cannot logout')
    console.log(error.message)
  }
}

const signUp = ({ email, password }: SignInUpArgsType) => async (
  dispatch: actionTypes,
  getState: actionTypes,
  { getFirebase }: actionTypes
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
