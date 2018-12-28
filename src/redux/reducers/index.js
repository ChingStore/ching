import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'

export default combineReducers({
  firestore: firestoreReducer,
})
