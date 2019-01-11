const getItemsState = store => store.firestore.data.items
const getAuthState = store => store.firebase.auth
const getStores = store => store.firestore.data.stores
const getStoresUsers = store => store.firestore.data.storesUsers

export default {
  getItemsState,
  getAuthState,
  getStores,
  getStoresUsers,
}
