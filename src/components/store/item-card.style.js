import STYLE from 'constants/style'

import STORE from './constants'

export default {
  base: {
    marginTop: 30,
    paddingLeft: STORE.MIN_SPACE_BETWEEN_ITEMS,
  },
  base__first: {
    paddingLeft: 0,
  },

  photo: {
    borderRadius: 12,
    width: STORE.ITEM_WIDTH,
    height: STORE.ITEM_WIDTH,
  },
  photo_gradient: {},
  photo_editButton: {},

  itemName: {
    marginTop: 15,
    color: STYLE.COLOR.BLUE,
    fontSize: 16,
    fontWeight: STYLE.FONT.WEIGHT.MEDIUM,
  },

  itemPrice: {
    marginTop: 5,
    color: STYLE.COLOR.BLUE,
    fontSize: 14,
    fontWeight: STYLE.FONT.WEIGHT.MEDIUM,
  },
}
