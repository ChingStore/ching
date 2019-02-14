// @flow

import type {
  GetFirebaseType,
  GetFirestoreType,
  FirebaseStateType,
  FirestoreStateType,
} from 'constants/firebase'

export type StateType = {
  +auth: {
    +authError: ?string,
  },
  +firestore: FirestoreStateType,
  +firebase: FirebaseStateType,
  +wallet: {
    +daiBalance: ?number,
    +xdaiBalance: ?number,
    +walletAddress: ?string,
  },
  +shop: {
    +shopError: ?string,
  },
}

export type Action = { type: string }

export type DispatchType = (
  action: Action | ThunkActionType | PromiseActionType
) => any
export type GetStateType = () => StateType
export type ThunkActionType = (
  dispatch: DispatchType,
  getState: GetStateType,
  { getFirebase: GetFirebaseType, getFirestore: GetFirestoreType }
) => any
export type PromiseActionType = Promise<Action>
