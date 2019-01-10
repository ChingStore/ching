import ACTIONS from '../actionTypes'

const add = ({ name, picture, soldCount, quantity, price }) => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore()
    const firebase = getFirebase()
    const state = getState()
    try {
      await firestore.collection('items').add({
        name,
        picture,
        soldCount,
        quantity,
        price,
        userId: state.firebase.auth.uid,
        createdAt: new Date(),
      })
      dispatch({
        type: ACTIONS.ADD_ITEM_SUCCESS,
      })
    } catch (err) {
      dispatch({
        type: ACTIONS.ERROR,
        err,
      })
    }
  }
}

const testFunction = (id, quantity) => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const items = await getFirestore().collection('items')
    const test_item = items.where('name', '==', 'test').orderBy('createdAt')
    console.log(test_item)
  }
}

export default {
  add,
  testFunction,
}
