// @flow

import type { StateType } from 'constants/redux'
import type {
  IdType,
  ItemsType,
  ItemsOrderedType,
  ItemType,
  OrderItemType,
  OrderItemsType,
  OrderFullItemsType,
  OrdersType,
  OrderType,
  StoreType,
} from 'constants/firebase'

import _ from 'lodash'

const getItemsState = (state: StateType) => state.firestore.data.items
const getAuthState = (state: StateType) => state.firebase.auth
const getXdaiWalletBalance = (state: StateType) => state.wallet.xdaiBalance
const getDaiWalletBalance = (state: StateType) => state.wallet.daiBalance
const getAuthError = (state: StateType) => state.auth.authError
const getShopError = (state: StateType) => state.shop.shopError

const users = {
  currentId: (state: StateType): IdType => _.get(state, 'firebase.auth.uid'),

  current: (state: StateType) => {
    const currentId = users.currentId(state)
    return _.get(state, `firestore.data.users[${currentId}]`)
  },

  shoppingCartOrderId: (state: StateType): IdType => {
    const currentUser = users.current(state)
    return _.get(currentUser, 'shoppingCartOrderId')
  },

  currentStoreId: (state: StateType): IdType => {
    const currentUser = users.current(state)
    return _.get(currentUser, 'storeId')
  },
}

const orders = {
  shoppingCart: (state: StateType): ?OrderType => {
    const orderId = users.shoppingCartOrderId(state)
    return orders.order(state, { orderId })
  },

  shoppingCartItems: (state: StateType): ?OrderItemsType => {
    const orderId = users.shoppingCartOrderId(state)
    return orders.items(state, { orderId })
  },

  all: (state: StateType): OrdersType =>
    _.get(state, 'firestore.ordered.orders'),

  allOrdered: (state: StateType): OrdersType =>
    _.get(state, 'firestore.ordered.orders'),

  order: (state: StateType, { orderId }: { orderId: IdType }): OrderType =>
    _.get(state, `firestore.data.orders[${orderId}]`),

  items: (state: StateType, { orderId }: { orderId: IdType }): OrderItemsType =>
    _.get(state, `firestore.data.orders[${orderId}].items`),

  fullItems: (
    state: StateType,
    { orderId }: { orderId: IdType }
  ): OrderFullItemsType => {
    const orderItems = orders.items(state, { orderId })
    // $FlowFixMe
    return orderItems.map(orderItem => {
      const item = items.item(state, { itemId: orderItem.id })
      return { ...item, ...orderItem }
    })
  },
}

const items = {
  all: (state: StateType): ItemsType => _.get(state, 'firestore.data.items'),

  allOrdered: (state: StateType): ItemsOrderedType =>
    _.get(state, 'firestore.ordered.items'),

  item: (state: StateType, { itemId }: { itemId: IdType }): ItemType =>
    _.get(state, `firestore.data.items[${itemId}]`),

  price: (state: StateType, { itemId }: { itemId: IdType }): number =>
    _.get(state, `firestore.data.items[${itemId}].price`),

  shoppingCartOrderItem: (
    state: StateType,
    { itemId }: { itemId: IdType }
  ): ?OrderItemType => {
    const shoppingCartItems = orders.shoppingCartItems(state)
    return shoppingCartItems && _.find(shoppingCartItems, { id: itemId })
  },
}

const shop = {
  current: (state: StateType): StoreType => {
    const storeId = users.currentStoreId(state)
    return _.get(state, `firestore.data.stores[${storeId}]`)
  },
}

const wallet = {
  address: (state: StateType): string => {
    const currentStore = shop.current(state)
    return _.get(currentStore, 'walletAddress')
  },
  asset: (state: StateType): string => {
    const currentStore = shop.current(state)
    return _.get(currentStore, 'asset')
  },
}

export default {
  getItemsState,
  getAuthState,
  getDaiWalletBalance,
  getXdaiWalletBalance,
  getAuthError,
  getShopError,

  orders,
  users,
  items,
  wallet,
  shop,
}
