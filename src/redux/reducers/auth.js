import ACTIONS from '../actionTypes'

const initState = {
  authError: null,
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN_ERROR:
      console.log(action.type)
      return {
        ...state,
        authError: action.type,
      }
    case ACTIONS.LOGIN_SUCCESS:
      console.log(action.type)
      return {
        ...state,
        authError: null,
      }
    case ACTIONS.SIGNOUT_SUCCESS:
      console.log('Signing out')
      return state
    default:
      return state
  }
}

export default authReducer
