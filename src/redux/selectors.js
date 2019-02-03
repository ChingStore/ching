import _ from 'lodash'

const getItemsState = store => store.firestore.data.items
const getAuthState = store => store.firebase.auth
const getStores = store => store.firestore.data.stores
const getStoresUsers = store => store.firestore.data.storesUsers
const getItemPrice = (store, { itemId }) =>
  store.firestore.data.items[itemId].price
const getXdaiWalletBalance = store => store.wallet.xdaiBalance
const getDaiWalletBalance = store => store.wallet.daiBalance
const getAuthError = store => store.auth.authError

const users = {
  currentId: store => _.get(store, 'firebase.auth.uid'),

  current: store => {
    const currentId = users.currentId(store)
    return _.get(store, `firestore.data.users[${currentId}]`)
  },

  shoppingCartOrderId: store => {
    const currentUser = users.current(store)
    return _.get(currentUser, 'shoppingCartOrderId')
  },
}

const orders = {
  shoppingCart: store => {
    const orderId = users.shoppingCartOrderId(store)
    return orders.order(store, { orderId })
  },

  all: store => _.get(store, 'firestore.ordered.orders'),

  order: (store, { orderId }) =>
    _.get(store, `firestore.data.orders[${orderId}]`),

  items: (store, { orderId }) =>
    _.get(store, `firestore.data.orders[${orderId}].items`),
}

const items = {
  item: (store, { itemId }) => _.get(store, `firestore.data.items[${itemId}]`),
}

const wallet = {
  // TODO: Use store wallet
  address: () => '0xf82B82b4ebC83479eF10271190A7cf5487240955',
}

export default {
  getItemsState,
  getAuthState,
  getItemPrice,
  getStores,
  getStoresUsers,
  getDaiWalletBalance,
  getXdaiWalletBalance,
  getAuthError,

  orders,
  users,
  items,
  wallet,
}
