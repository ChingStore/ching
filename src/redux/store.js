import { applyMiddleware, createStore } from 'redux';
import ReduxLogger from 'redux-logger';

import rootReducer from './reducers';
import localStorageUtil from '../utils/localStorage';

const persistedState = localStorageUtil.loadState();

const store = createStore(rootReducer, persistedState, applyMiddleware(ReduxLogger));

store.subscribe(() => {
  localStorageUtil.saveState(store.getState());
});

export default store;
