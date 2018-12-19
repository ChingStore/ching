import ACTIONS from '../actionTypes';

let nextItemId = 0;

const add = ({ name, photo, soldCount, count, price }) => ({
  type: ACTIONS.ADD_ITEM,
  payload: {
    id: ++nextItemId,
    name,
    photo,
    soldCount,
    count,
    price
  }
});

const sellItem = (id, item) => {
  return dispatch => {
    // async transaction calls here
    item.soldCount += 1;
    item.count -= 1;
    dispatch({ type: ACTIONS.SELL_ITEM, payload: { id, item } });
  };
};

export default {
  add,
  sellItem
};
