const getItemsState = store => store.firestore.data.items
const getAuthState = store => store.firebase.auth
const getStores = store => store.firebase.data.stores
const getStoresUsers = store => store.firebase.data.storesUsers

export default {
  getItemsState,
  getAuthState,
  getStores,
  getStoresUsers,
}
