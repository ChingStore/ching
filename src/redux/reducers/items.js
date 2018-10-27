import ACTIONS from "../actionTypes";

const initialState = {
  items: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.ADD_ITEM: {
      const { id, ...itemFields } = action.payload;
      return {
        ...state,
        items: {
          ...state.items,
          [id]: itemFields
        }
      };
    }
    default:
      return state;
  }
}
