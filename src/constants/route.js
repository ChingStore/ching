// @flow

const PATH = {
  // Tabbed
  TABS: '/tabs',
  SALES: '/tabs/sales-report',
  STORE: '/tabs/',
  ADD: '/tabs/add',
  EDIT_ITEM: '/tabs/store/edit-item',
  ORDERS: '/tabs/orders',
  PROFILE: '/tabs/profile',

  // Full-screen
  HOME: '/home',
  NEED_WALLET: '/need-wallet',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  SIGN_UP_STORE: '/sign-up-store',
  STORE_WELCOME: '/store-welcome',
}

const PATH_TITLE = {
  [PATH.SALES]: 'Sales Report',
  [PATH.ADD]: 'Add',
  [PATH.ORDERS]: 'Orders',
}

export default {
  PATH,
  PATH_TITLE,
}
