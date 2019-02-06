import STYLE from 'constants/style'

import STORE from './constants'

export default {
  base: {
    marginTop: 30,
    paddingLeft: STORE.MIN_SPACE_BETWEEN_ITEMS,

    width: STORE.ITEM_WIDTH,
    height: STORE.ITEM_WIDTH,
    border: `1px solid ${STYLE.COLOR.GREY}`,
    borderRadius: 12,
  },
  base__first: {
    paddingLeft: 0,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: STYLE.FONT.WEIGHT.MEDIUM,
    color: STYLE.COLOR.BLUE,
  },
}
