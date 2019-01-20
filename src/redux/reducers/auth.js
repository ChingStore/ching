import ACTIONS from 'redux/actionTypes'

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
    case ACTIONS.SIGNUP_SUCCESS:
      console.log('Signing up')
      return {
        ...state,
        authError: null,
      }
    case ACTIONS.SIGNUP_ERROR:
      console.log('Signup error')
      return {
        ...state,
        authError: action.err.message,
      }
    default:
      return state
  }
}

export default authReducer
