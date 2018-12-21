import * as Redux from 'redux'
import ReduxLogger from 'redux-logger'
import rootReducer from './reducers'
import localStorageUtil from '../utils/localStorage'
import { default as ReduxThunk } from 'redux-thunk'
import * as ReduxDevtoolsExtension from 'redux-devtools-extension'
import { getFirebase } from 'react-redux-firebase'
import { getFirestore } from 'redux-firestore'

const persistedState = localStorageUtil.loadState()

const store = Redux.createStore(
  rootReducer,
  persistedState,
  ReduxDevtoolsExtension.composeWithDevTools(
    Redux.applyMiddleware(
      ReduxThunk.withExtraArgument({ getFirebase, getFirestore }),
      ReduxLogger
    )
  )
)

store.subscribe(() => {
  localStorageUtil.saveState(store.getState())
})

export default store
