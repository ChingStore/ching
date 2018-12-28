import { combineReducers } from 'redux'
import items from './items'
import { signOut, signIn, signUp } from './authentication'

export default combineReducers({
  items,
  authentication: combineReducers({
    signOut,
    signIn,
    signUp,
  }),
})
