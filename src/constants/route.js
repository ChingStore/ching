const PATH = {
  // Tabbed
  TABS: '/tabs',
  INVENTORY: '/tabs/',
  SALES_REPORT: '/tabs/sales-report',
  ADD: '/tabs/add',
  EDIT: '/tabs/edit',
  ORDERS: '/tabs/orders',

  // Full-screen
  HOME: '/home',
  NEED_WALLET: '/need-wallet',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  SIGN_UP_STORE: '/signup-store',
  STORE_WELCOME: '/store-welcome',
}

const PATH_TITLE = {
  [PATH.INVENTORY]: 'Inventory',
  [PATH.SALES_REPORT]: 'Sales Report',
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
