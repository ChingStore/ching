// @flow

import type { NetworkIdType } from 'constants/network'

export type IdType = string

export type DateType = Object

export type FirebaseStateType = Object

export type FirestoreStateType = {
  +data: {
    +items?: ItemsType,
    +orders?: {
      +[IdType]: OrderType,
    },
    +users?: {},
    +stores?: {
      +[IdType]: StoreType,
    },
  },
}

export type ItemsType = {
  +[IdType]: ItemType,
}

export type ItemType = {
  +createdAt: DateType,
  +name: string,
  +photo: string,
  +price: number,
  +quantity: number,
  +soldCount: number,
  +userId: IdType,
}

export type OrdersType = {
  +[IdType]: ItemType,
}

export type OrderType = {
  +createdAt: DateType,
  +items: OrderItemsType,
  +networkId: NetworkIdType,
  +txHash: string,
  +userId: IdType,
}

export type OrderItemsType = {
  +[IdType]: { +price: number, +quantity: number },
}

export type StoreType = {
  +storeName: string,
}
