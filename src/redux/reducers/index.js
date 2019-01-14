import * as Redux from 'redux'
import * as ReduxFirestore from 'redux-firestore'
import * as ReactReduxFirebase from 'react-redux-firebase'

import authReducer from './auth'

export default Redux.combineReducers({
  auth: authReducer,
  firestore: ReduxFirestore.firestoreReducer,
  firebase: ReactReduxFirebase.firebaseReducer,
})
