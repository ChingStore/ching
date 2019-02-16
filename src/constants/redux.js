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
  },
  +shop: {
    +shopError: ?string,
  },
}

export type Action = { type: string }

export type DispatchType = <T>(
  action: Action | ThunkActionType<T> | PromiseActionType
) => T
export type GetStateType = () => StateType
export type ThunkActionType<T = void | Promise<void>> = (
  dispatch: DispatchType,
  getState: GetStateType,
  { getFirebase: GetFirebaseType, getFirestore: GetFirestoreType }
) => T
export type PromiseActionType = Promise<Action>
