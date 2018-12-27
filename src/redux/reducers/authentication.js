import ACTIONS from '../actionTypes'

const initialState = { authenticated: 'false' }

export default function(state = initialState, action) {
  console.log('AUTHENTICATION.JS!')
  switch (action.type) {
    case ACTIONS.SIGN_IN:
      return console.log('SIGN_IN')

    case ACTIONS.SIGN_UP:
      return console.log('SIGN_UP')

    default:
      return initialState
  }
}
