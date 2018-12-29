import ACTIONS from '../actionTypes'

export const signIn = credentials => {
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
