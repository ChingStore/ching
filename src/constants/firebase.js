// @flow

import type { NetworkIdType } from 'constants/network'

export type GetFirebaseType = Object
export type GetFirestoreType = Object

export type IdType = string

export type DateType = Object

//////////
// AUTH //
//////////

export type FirebaseAuthType = $ReadOnly<{
  uid: IdType,
  email: string,
  password: string,
}>

///////////
// USERS //
///////////

export type UserType = $ReadOnly<{
  shoppingCartOrderId: IdType,
  storeId: IdType,
}>

///////////
// ITEMS //
///////////

export type ItemDataType = $ReadOnly<{
  name: string,
  photo?: ?string,
  price: number,
  quantity: number,
  soldCount: number,
}>

export type ItemType = ItemDataType &
  $ReadOnly<{
    createdAt: DateType,
    userId: IdType,
  }>

export type ItemOrderedType = ItemType &
  $ReadOnly<{
    id: IdType,
  }>

export type ItemsType = $ReadOnly<{
  [IdType]: ItemType,
}>

export type ItemsOrderedType = $ReadOnly<{
  [number]: ItemOrderedType,
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
  isOnboardingDone: boolean,
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
