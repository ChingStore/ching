import ACTIONS from 'redux/actionTypes'
import { actionTypes } from 'redux-firestore'

const signIn = ({ email, password }) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase()
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password)
    dispatch({ type: ACTIONS.LOGIN_SUCCESS })
  } catch (err) {
    dispatch({ type: ACTIONS.LOGIN_ERROR, err })
  }
}

const signOut = () => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase()
  try {
    await firebase.auth().signOut()
    dispatch({ type: actionTypes.CLEAR_DATA })
  } catch (err) {
    console.log('cannot logout')
    console.log(err.message)
  }
}

const signUp = ({ email, password }) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase()
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    dispatch({ type: ACTIONS.SIGNUP_SUCCESS })
    return true
  } catch (err) {
    dispatch({ type: ACTIONS.SIGNUP_ERROR, err })
    return false
  }
}

// const signUpStore = ({ firstName, lastName, storeName }) => async (
//   dispatch,
//   getState,
//   { getFirebase, getFirestore }
// ) => {}

export default { signIn, signOut, signUp }
