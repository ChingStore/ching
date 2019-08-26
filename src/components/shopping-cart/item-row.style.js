// @flow

import STYLE from 'constants/style'
import SHOPPING_CART from 'constants/shopping-cart'

const style = {
  base: {
    height: SHOPPING_CART.ROW_HEIGHT,
    marginBottom: 20,

    display: 'flex',
    flexDirection: 'row',
  },

  removeButton: {
    alignItems: 'center',

    paddingLeft: 5,
    paddingRight: 20,
    height: '100%',
  },

  photo: {
    width: SHOPPING_CART.ROW_HEIGHT * SHOPPING_CART.IMAGE_ASPECT_RATIO,
    height: SHOPPING_CART.ROW_HEIGHT,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: STYLE.COLOR.LIGHT_BLUE,
  },

  description: {
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
  },
  description_text: {
    fontWeight: STYLE.FONT.WEIGHT.MEDIUM,
    fontSize: 16,
    color: STYLE.COLOR.BLUE,
    margin: 0,
  },

  quantity_input: {
    border: `1px solid ${STYLE.COLOR.GREY}`,
    borderRadius: 7,
    width: 33,
    textAlign: 'center',
    fontWeight: STYLE.FONT.WEIGHT.MEDIUM,
  },
}

export default style
