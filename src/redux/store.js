import { applyMiddleware, createStore, compose } from 'redux';
import ReduxLogger from 'redux-logger';

import rootReducer from './reducers';
import localStorageUtil from '../utils/localStorage';

const persistedState = localStorageUtil.loadState();

const store = createStore(
  rootReducer,
  persistedState,
  compose(
    applyMiddleware(ReduxLogger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(() => {
  localStorageUtil.saveState(store.getState());
});

export default store;
