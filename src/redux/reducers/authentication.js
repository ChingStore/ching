import ACTIONS from "../actionTypes";

const initialState = { authenticated: "false" };

export default function(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SIGN_IN: {
      const { ...authenticationFields } = action.payload;
      const newState = Object.assign({}, state);
      newState.authenticated = "true";
      return Object.assign({}, newState);
    }
    case ACTIONS.SIGN_UP: {
      const { ...authenticationFields } = action.payload;
      const newState = Object.assign({}, state);
      newState.authenticated = "true";
      return Object.assign({}, newState);
    }
    default:
      return initialState;
  }
}
