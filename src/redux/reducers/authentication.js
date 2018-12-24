import ACTIONS from "../actionTypes";

const initialState = { authenticated: "false" };

export default function(state = initialState, action) {
  console.log("AUTHENTICATION.JS!");
  switch (action.type) {
    case ACTIONS.SIGN_IN: {
      console.log("SIGN_IN");
      const { ...authenticationFields } = action.payload;
      const newState = Object.assign({}, state);
      newState.authenticated = "true";
      return Object.assign({}, newState);
    }
    case ACTIONS.SIGN_UP: {
      console.log("SIGN_UP");
      const { ...authenticationFields } = action.payload;
      const newState = Object.assign({}, state);
      newState.authenticated = "true";
      return Object.assign({}, newState);
    }
    default:
      return initialState;
  }
}
