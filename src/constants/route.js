// @flow

const PATH = {
  // Tabbed
  TABS: '/tabs',
  SALES: '/tabs/sales-report',
  STORE: '/tabs/',
  ADD: '/tabs/add',
  EDIT: '/tabs/edit',
  ORDERS: '/tabs/orders',
  PROFILE: '/tabs/profile',

  // Full-screen
  HOME: '/home',
  GET_WALLET: '/get-wallet',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  SIGN_UP_STORE: '/sign-up-store',
  STORE_WELCOME: '/store-welcome',
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
