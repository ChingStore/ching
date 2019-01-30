const PATH = {
  // Tabbed
  TABS: '/tabs',
  INVENTORY: '/tabs/',
  SALES_REPORT: '/tabs/sales-report',
  ADD: '/tabs/add',
  EDIT: '/tabs/edit',
  SIGN_UP: '/signup',
  ORDERS: '/tabs/orders',
  SIGN_UP_STORE: '/signup-store',
  STORE_WELCOME: '/store-welcome',
  NEED_WALLET: '/need-wallet',

  // Full-screen
  HOME: '/home',
  SIGN_IN: '/signin',
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
  [PATH.STORE_WELCOME]: 'Welcome to Your Store',
  [PATH.NEED_WALLET]: 'Wallet Providers',
}

export default {
  PATH,
  PATH_TITLE,
}
