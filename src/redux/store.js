import * as Redux from 'redux'
import ReduxLogger from 'redux-logger'
import rootReducer from './reducers'
import localStorageUtil from '../utils/localStorage'
import { default as ReduxThunk } from 'redux-thunk'
import * as ReduxDevtoolsExtension from 'redux-devtools-extension'

const persistedState = localStorageUtil.loadState()

const store = Redux.createStore(
  rootReducer,
  persistedState,
  ReduxDevtoolsExtension.composeWithDevTools(
    Redux.applyMiddleware(ReduxThunk, ReduxLogger)
  )
)

store.subscribe(() => {
  localStorageUtil.saveState(store.getState())
})

export default store
