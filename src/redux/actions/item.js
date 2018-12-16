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

export default {
  add
};
