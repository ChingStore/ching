import ACTIONS from '../actionTypes'

const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: ACTIONS.LOGIN_SUCCESS })
      })
      .catch(err => {
        dispatch({ type: ACTIONS.LOGIN_ERROR, err })
      })
  }
}

const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: ACTIONS.SIGNOUT_SUCCESS })
      })
  }
}

export { signIn, signOut }
