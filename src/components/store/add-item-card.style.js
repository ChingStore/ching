import STYLE from 'constants/style'

import STORE from './constants'

export default {
  base: {
    marginTop: 30,
    marginLeft: STORE.MIN_SPACE_BETWEEN_ITEMS,
  },
  base__first: {
    marginLeft: 0,
  },
  button: {
    margin: 0,
    width: STORE.ITEM_WIDTH,
    height: STORE.ITEM_WIDTH,
    border: `1px solid ${STYLE.COLOR.GREY}`,
    borderRadius: 12,
  },
  button_text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: STYLE.FONT.WEIGHT.MEDIUM,
    color: STYLE.COLOR.BLUE,
  },
}
