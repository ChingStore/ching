// @flow

import type { IdType, ItemType, ItemDataType } from 'constants/firebase'
import type { ThunkActionType } from 'constants/redux'

import selectors from 'redux/selectors'

const add = ({
  name,
  photo,
  soldCount,
  quantity,
  price,
}: ItemDataType): ThunkActionType<Promise<void>> => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const state = getState()
  const firestore = getFirestore()

  try {
    const newItemRef = await firestore.collection('items').doc()
    const url = dispatch(
      _uploadImage({ base64Image: photo, itemId: newItemRef.id })
    )
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

const update = ({
  itemId,
  data: { name, photo, soldCount, quantity, price, userId },
}: {
  itemId: IdType,
  data: $Shape<ItemType>,
}): ThunkActionType<Promise<void>> => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const state = getState()
  const firestore = getFirestore()

  const oldItem = selectors.items.item(state, { itemId })
  if (!oldItem) {
    throw Error('Item not found')
  }

  let updatedUrl
  if (photo && photo !== oldItem.photo) {
    updatedUrl = dispatch(_uploadImage({ base64Image: photo, itemId }))
  }

  try {
    await firestore
      .collection('items')
      .doc(itemId)
      .update({
        name,
        photo: updatedUrl || photo,
        soldCount,
        quantity,
        price,
        userId,
      })
  } catch (err) {
    console.log('Error in item/add action', err.message)
  }
}

const _uploadImage = ({
  itemId,
  base64Image,
}: {
  itemId: IdType,
  base64Image: string,
}): ThunkActionType<Promise<string>> => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const storageRef = getFirebase()
    .storage()
    .ref()

  const newImageStorageRef = storageRef.child('images/'.concat(itemId, '.jpg'))
  const uploadTask = await newImageStorageRef.putString(base64Image, 'data_url')
  const url = uploadTask.ref.getDownloadURL()
  console.log('Image uploaded! URL:', url)
  return url
}

export default {
  add,
  update,
}
