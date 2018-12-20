import ACTIONS from '../actionTypes';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.ADD_ITEM: {
      const { id, ...itemFields } = action.payload;
      return {
        ...state,
        [id]: itemFields
      };
    }
    case ACTIONS.SELL_ITEM: {
      const { id, quantity } = action.payload;
      const newState = Object.assign({}, state);
      newState[id].soldCount += quantity;
      newState[id].count -= quantity;
      return Object.assign({}, newState);
    }
    default:
      return state;
  }
}
