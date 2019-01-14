const getItemsState = store => store.firestore.data.items
const getAuthState = store => store.firebase.auth
const getStores = store => store.firestore.data.stores
const getStoresUsers = store => store.firestore.data.storesUsers
const getOrders = store => store.firestore.data.orders

export default {
  getItemsState,
  getAuthState,
  getStores,
  getStoresUsers,
  getOrders,
}
