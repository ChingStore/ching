// @flow

import type { NetworkIdType } from 'constants/network'

export type GetFirebaseType = Object
export type GetFirestoreType = Object

export type IdType = string

export type FirebaseAuthType = $ReadOnly<{
  uid: IdType,
}>

export type DateType = Object

///////////
// ITEMS //
///////////

export type ItemType = $ReadOnly<{
  createdAt: DateType,
  name: string,
  photo: string,
  price: number,
  quantity: number,
  soldCount: number,
  userId: IdType,
}>

export type ItemsType = $ReadOnly<{
  [IdType]: ItemType,
}>

////////////
// ORDERS //
////////////

export type OrderItemType = $ReadOnly<{
  price: number,
  quantity: number,
}>

export type OrderItemsType = $ReadOnly<{
  [IdType]: OrderItemType,
}>

export type OrderType = $ReadOnly<{
  createdAt: DateType,
  txConfirmed: boolean,
  items: OrderItemsType,
  networkId: NetworkIdType,
  txHash: string,
  userId: IdType,
}>

export type OrdersType = $ReadOnly<{
  [IdType]: ItemType,
}>

////////////
// STORES //
////////////

export type StoreType = $ReadOnly<{
  storeName: string,
  walletAddress: string,
}>

/////////////////////
// FIRESTORE STATE //
/////////////////////

export type FirestoreStateType = $ReadOnly<{
  data: {
    items?: ItemsType,
    orders?: {
      [IdType]: OrderType,
    },
    users?: {},
    stores?: {
      [IdType]: StoreType,
    },
  },
}>

////////////////////
// FIREBASE STATE //
////////////////////

export type FirebaseStateType = Object
