import ACTIONS from '../actionTypes'

export const signIn = (email, password) => {
  console.log('signIn action fired')
  return dispatch => {
    // async transaction calls here
    dispatch({
      type: ACTIONS.SIGN_IN,
      payload: {
        email,
        password,
      },
    })
  }
}

export const signUp = (email, password, firstName, lastName, shopName) => {
  console.log('signUp action fired')
  return dispatch => {
    // async transaction calls here
    dispatch({
      type: ACTIONS.SIGN_UP,
      payload: {
        email,
        password,
        firstName,
        lastName,
        shopName,
      },
    })
  }
}

export const signOut = () => {
  console.log('signOut action fired')
  return dispatch => {
    dispatch({
      type: ACTIONS.SIGN_OUT,
    })
  }
}

export default { signIn, signUp, signOut }
