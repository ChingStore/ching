// @flow

import type { IdType, ItemType, ItemDataType } from 'constants/firebase'
import type { ThunkActionType } from 'constants/redux'

import selectors from 'redux/selectors'
import jsUtil from 'utils/js'

const add = (data: ItemDataType): ThunkActionType<Promise<void>> => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  console.log('Adding item:', { data })

  const { name, photo, soldCount, quantity, price } = data
  const state = getState()
  const firestore = getFirestore()

  const newItemRef = await firestore.collection('items').doc()
  const url = await dispatch(
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
}

const update = ({
  itemId,
  data,
}: {
  itemId: IdType,
  data: $Shape<ItemType>,
}): ThunkActionType<Promise<void>> => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  console.log('Updating item:', { itemId, data })

  const { name, photo, soldCount, quantity, price, userId } = data
  const state = getState()
  const firestore = getFirestore()

  const oldItem = selectors.items.item(state, { itemId })
  if (!oldItem) {
    throw Error('Item not found')
  }

  let updatedUrl
  if (photo && photo !== oldItem.photo) {
    updatedUrl = await dispatch(_uploadImage({ base64Image: photo, itemId }))
  }

  await firestore
    .collection('items')
    .doc(itemId)
    .update(
      jsUtil.removeUndefined({
        name,
        photo: updatedUrl || photo,
        soldCount,
        quantity,
        price,
        userId,
      })
    )
}

const _uploadImage = ({
  base64Image,
  itemId,
}: {
  base64Image?: ?string,
  itemId: IdType,
}): ThunkActionType<Promise<?string>> => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  if (!base64Image) {
    return null
  }

  const storageRef = getFirebase()
    .storage()
    .ref()

  const newImageStorageRef = storageRef.child('images/'.concat(itemId, '.jpg'))
  const uploadTask = await newImageStorageRef.putString(base64Image, 'data_url')
  const url = await uploadTask.ref.getDownloadURL()
  console.log('Image uploaded! URL:', url)
  return url
}

export default {
  add,
  update,
}
