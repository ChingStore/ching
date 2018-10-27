
const getItemsState = store => store.items;

const getItemById = (store, id) =>
  getItemsState(store) ? { ...getItemsState(store)[id] } : {};

export default {
  getItemById
}
