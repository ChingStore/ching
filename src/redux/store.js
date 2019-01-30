import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import * as Redux from 'redux'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import * as ReduxLogger from 'redux-logger'
import { default as ReduxThunk } from 'redux-thunk'
import * as ReduxDevtoolsExtension from 'redux-devtools-extension'

import rootReducer from 'redux/reducers'
import firebaseConfig from 'config/firebase'

firebase.initializeApp(firebaseConfig)
firebase.firestore().enablePersistence()

const reduxLogger = ReduxLogger.createLogger({
  collapsed: true,
  duration: true,
  logErrors: true,
  diff: true,
})

const store = Redux.createStore(
  rootReducer,
  ReduxDevtoolsExtension.composeWithDevTools(
    reduxFirestore(firebase),
    reactReduxFirebase(firebase),
    Redux.applyMiddleware(
      ReduxThunk.withExtraArgument({ getFirebase, getFirestore }),
      reduxLogger
    )
  )
)

export default store
