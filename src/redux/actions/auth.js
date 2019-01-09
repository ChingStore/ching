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
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    try {
      await firebase.auth().signOut()
      dispatch({ type: ACTIONS.SIGNOUT_SUCCESS })
    } catch (err) {
      console.log('cannot logout')
      console.log(err.message)
    }
  }
}

const signUp = ({ email, password, firstName, lastName, storeName }) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase()
    const firestore = getFirestore()
    try {
      const resp = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
      await firestore
        .collection('users')
        .doc(resp.user.uid)
        .set({ firstName: firstName, lastName: lastName, storeName: storeName })
      dispatch({ type: ACTIONS.SIGNUP_SUCCESS })
    } catch (err) {
      dispatch({ type: ACTIONS.SIGNUP_ERROR, err })
    }
  }
}

export default { signIn, signOut, signUp }
