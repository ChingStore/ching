import ACTIONS from '../actionTypes';
import { dispatch } from 'rxjs/internal/observable/pairs';

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

const sell_item = item => {
  return (dispatch, getState) => {
    // async transaction calls here
    item.soldCount += 1;
    item.count -= 1;
    dispatch({ type: ACTIONS.SELL_ITEM, item });
  };
};

export default {
  add
};
