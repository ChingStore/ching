import ACTIONS from '../actionTypes'

const signIn = (email, password) => {
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

const signUp = (email, password, firstName, lastName, shopName) => {
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

export default {
  signIn,
  signUp,
}
