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

const signUp = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase()
    const firestore = getFirestore()
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(resp => {
        return firestore
          .collection('users')
          .doc(resp.user.uid)
          .set({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            storeName: newUser.storeName,
          })
      })
      .then(() => {
        dispatch({ type: ACTIONS.SIGNUP_SCCESS })
      })
      .catch(err => {
        dispatch({ type: ACTIONS.SIGNUP_ERROR, err })
      })
  }
}

export { signIn, signOut, signUp }
