import * as Redux from 'redux'
import * as ReduxFirestore from 'redux-firestore'
import items from './items'
import { signOut, signIn, signUp } from './authentication'

export default Redux.combineReducers({
  firestore: ReduxFirestore.firestoreReducer,
  items,
  authentication: Redux.combineReducers({
    signOut,
    signIn,
    signUp,
  }),
})
