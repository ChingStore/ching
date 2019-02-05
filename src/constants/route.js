// @flow

const PATH = {
  // Tabbed
  TABS: '/tabs',
  SALES: '/tabs/sales-report',
  STORE: '/tabs/',
  EDIT: '/tabs/edit',
  ORDERS: '/tabs/orders',
  PROFILE: '/tabs/profile',

  // Full-screen
  HOME: '/home',
  NEED_WALLET: '/need-wallet',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  SIGN_UP_STORE: '/sign-up-store',
  STORE_WELCOME: '/store-welcome',
  ADD: '/add',
}

const PATH_TITLE = {
  [PATH.STORE]: 'Inventory',
  [PATH.SALES]: 'Sales Report',
  [PATH.ADD]: 'Add',
  [PATH.EDIT]: 'Edit',
  [PATH.SIGN_IN]: 'Sign In',
  [PATH.SIGN_UP]: 'Sign Up',
  [PATH.ORDERS]: 'Orders',
  [PATH.SIGN_UP_STORE]: 'Sign Up Store',
}

export default {
  PATH,
  PATH_TITLE,
}
