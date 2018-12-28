import ACTIONS from '../actionTypes'

export const signIn = (email, password) => {
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
  return dispatch => {
    dispatch({
      type: ACTIONS.SIGN_OUT,
    })
  }
}
