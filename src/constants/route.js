// @flow

const PATH = {
  // Tabbed
  SALES: '/sales-report',
  STORE: '/store',
  ADD_ITEM: '/store/add-item',
  EDIT_ITEM: '/store/edit-item/:itemId',
  ORDERS: '/orders',

  // Full-screen
  HOME: '/home',
  GET_WALLET: '/get-wallet',
  PROFILE: '/profile',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  SIGN_UP_STORE: '/sign-up-store',
  STORE_WELCOME: '/store-welcome',
}

const PATH_TITLE = {
  [PATH.SALES]: 'Sales Report',
  [PATH.ADD_ITEM]: 'Add',
  [PATH.ORDERS]: 'Orders',
}

export default {
  PATH,
  PATH_TITLE,
}
