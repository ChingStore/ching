import ACTIONS from "../actionTypes";

let nextItemId = 0;

const addItem = ({ name, photo, soldCount, remainingCount, price }) => ({
  type: ACTIONS.ADD_ITEM,
  payload: {
    id: ++nextItemId,
    name,
    photo,
    soldCount,
    remainingCount,
    price,
  }
});

export default {
  addItem
}
