import { createStore } from "redux";
import rootReducer from "./reducers";
import localStorageUtil from "../utils/localStorage"

const persistedState = localStorageUtil.loadState()

const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
  localStorageUtil.saveState(store.getState())
})

export default store
