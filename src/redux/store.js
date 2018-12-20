import { applyMiddleware, createStore, compose } from 'redux'
import ReduxLogger from 'redux-logger'

import rootReducer from './reducers'
import localStorageUtil from '../utils/localStorage'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const persistedState = localStorageUtil.loadState()

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk, ReduxLogger))
)

store.subscribe(() => {
  localStorageUtil.saveState(store.getState())
})

export default store
