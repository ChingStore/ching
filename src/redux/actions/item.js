// @flow

import type { ItemDataType } from 'constants/firebase'
import type { ThunkActionType } from 'constants/redux'

const add = ({
  name,
  photo,
  soldCount,
  quantity,
  price,
}: ItemDataType): ThunkActionType<Promise<void>> => async (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  const state = getState()
  const firestore = getFirestore()
  const firebase = getFirebase()
  const storageRef = firebase.storage().ref()

  try {
    const newItemRef = await firestore.collection('items').doc()
    const newImageStorageRef = storageRef.child(
      'images/'.concat(newItemRef.id, '.jpg')
    )
    const uploadTask = await newImageStorageRef.putString(photo, 'data_url')
    const url = await uploadTask.ref.getDownloadURL()
    console.log('URL:', url)
    newItemRef.set({
      name,
      photo: url,
      soldCount,
      quantity,
      price,
      userId: state.firebase.auth.uid,
      createdAt: firestore.FieldValue.serverTimestamp(),
    })
  } catch (err) {
    console.log('Error in item/add action', err.message)
  }
}

export default {
  add,
}
