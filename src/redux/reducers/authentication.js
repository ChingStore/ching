import ACTIONS from '../actionTypes'

const initialState = {}

export const signIn = (state = initialState, action) =>
  action.type === ACTIONS.SIGN_IN ? action.payload : state

export const signUp = (state = initialState, action) =>
  action.type === ACTIONS.SIGN_UP ? action.payload : state

export const signOut = (state = initialState, action) =>
  action.type === ACTIONS.SIGN_OUT ? action.payload : state

export const authenticated = (state = false, action) => {
  console.log('authenticated reducer fired')
  switch (action.type) {
    case ACTIONS.SIGN_IN:
      return true

    case ACTIONS.SIGN_OUT:
      return false

    default:
      return state
  }
}
