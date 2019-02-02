const add = ({ name, photo, soldCount, quantity, price }) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore()
  const state = getState()
  try {
    await firestore.collection('items').add({
      name,
      photo,
      soldCount,
      quantity,
      price,
      userId: state.firebase.auth.uid,
      createdAt: new Date(),
    })
  } catch (err) {
    console.log('Error in item/add action', err.message)
  }
}

export default {
  add,
}
