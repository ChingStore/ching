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

const signUp = ({ email, password, firstName, lastName, storeName }) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase()
  const firestore = getFirestore()
  try {
    const resp = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
    await firestore
      .collection('users')
      .doc(resp.user.uid)
      .set({ firstName, lastName })

    const newstore = await firestore.collection('stores').add({
      storeName,
    })
    await firestore.collection('storesUsers').add({
      storeId: newstore.id,
      userId: resp.user.uid,
    })
    dispatch({ type: ACTIONS.SIGNUP_SUCCESS })
  } catch (err) {
    dispatch({ type: ACTIONS.SIGNUP_ERROR, err })
  }
}

export default { signIn, signOut, signUp }
