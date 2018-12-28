import * as Redux from 'redux'
import ReduxLogger from 'redux-logger'
import rootReducer from './reducers'
import { default as ReduxThunk } from 'redux-thunk'
import * as ReduxDevtoolsExtension from 'redux-devtools-extension'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import firebaseConfig from '../config/firebase'

const store = Redux.createStore(
  rootReducer,
  ReduxDevtoolsExtension.composeWithDevTools(
    Redux.applyMiddleware(
      ReduxThunk.withExtraArgument({ getFirebase, getFirestore }),
      ReduxLogger
    ),
    reduxFirestore(firebaseConfig),
    reactReduxFirebase(firebaseConfig)
  )
)

export default store
