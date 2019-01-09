import ACTIONS from '../actionTypes'

const signIn = ({ email, password }) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      dispatch({ type: ACTIONS.LOGIN_SUCCESS })
    } catch (err) {
      dispatch({ type: ACTIONS.LOGIN_ERROR, err })
    }
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

const signUp = ({ email, password, firstName, lastName, storeName }) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase()
    const firestore = getFirestore()
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(resp => {
        return firestore
          .collection('users')
          .doc(resp.user.uid)
          .set({
            firstName: firstName,
            lastName: lastName,
            storeName: storeName,
          })
      })
      .then(() => {
        dispatch({ type: ACTIONS.SIGNUP_SUCCESS })
      })
      .catch(err => {
        dispatch({ type: ACTIONS.SIGNUP_ERROR, err })
      })
  }
}

export default { signIn, signOut, signUp }
