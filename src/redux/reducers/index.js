import * as Redux from 'redux'
import * as ReduxFirestore from 'redux-firestore'

export default Redux.combineReducers({
  firestore: ReduxFirestore.firestoreReducer,
})
