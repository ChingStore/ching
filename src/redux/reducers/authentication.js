import ACTIONS from '../actionTypes'

const initialState = {}

export const signIn = (state = initialState, action) =>
  action.type === ACTIONS.SIGN_IN ? action.payload : state

export const signUp = (state = initialState, action) =>
  action.type === ACTIONS.SIGN_UP ? console.log('REDUCER - SIGN_UP') : state

export const signOut = (state = initialState, action) =>
  action.type === ACTIONS.SIGN_OUT ? console.log('REDUCER - SIGN_OUT') : state
