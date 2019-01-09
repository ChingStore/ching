const getItemsState = store => store.firestore.data.items
const getAuthState = store => store.firebase.auth

export default {
  getItemsState,
  getAuthState,
}
