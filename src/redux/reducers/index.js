import * as Redux from 'redux'
import * as ReduxFirestore from 'redux-firestore'
import * as ReactReduxFirebase from 'react-redux-firebase'

export default Redux.combineReducers({
  firestore: ReduxFirestore.firestoreReducer,
  firebase: ReactReduxFirebase.firebaseReducer,
})
