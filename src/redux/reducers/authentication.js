import ACTIONS from "../actionTypes";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SIGN_IN: {
      const { ...authenticationFields } = action.payload;
      const newState = Object.assign({}, state);
      newState.authenticated = true;
      return Object.assign({}, newState);
    }
    case ACTIONS.SIGN_UP: {
      const { ...authenticationFields } = action.payload;
      const newState = Object.assign({}, state);
      newState.authenticated = true;
      return Object.assign({}, newState);
    }
    default:
      return (state.authenticated = false);
  }
}
