import { combineReducers } from 'redux'
import items from './items'
import { firestoreReducer } from 'redux-firestore'

export default combineReducers({
  firestore: firestoreReducer,
})
