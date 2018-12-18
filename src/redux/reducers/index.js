import { combineReducers } from 'redux';
import itemsReducer from './itemsReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  items: itemsReducer
});

export default rootReducer;
