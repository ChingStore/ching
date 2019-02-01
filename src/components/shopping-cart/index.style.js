import STYLE from 'constants/style'
import SHOPPING_CART from 'constants/shopping-cart'

const style = {
  baseWrapper: {
    ...STYLE.ABSOLUTE_FILL,

    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 1,
    pointerEvents: 'none',
  },
  baseWrapper__expanded: {
    backgroundColor: STYLE.COLOR.TRANSLUCENT_BLACK,
    pointerEvents: 'auto',
  },
  base: {
    marginLeft: 10,
    marginRight: 10,
    width: 'calc(100% - 20px)',

    borderRadius: '20px 20px 0 0',
    backgroundColor: STYLE.COLOR.WHITE,
    boxShadow: `0 0 200px 5px ${STYLE.COLOR.TRANSLUCENT_BLACK}`,

    pointerEvents: 'auto',
  },

  header: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  headerTitleText: {
    fontSize: 18,
    color: STYLE.COLOR.BLUE,
  },
  headerTotalPrice: {
    borderRadius: 21,
    height: 42,
    minWidth: 83,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: STYLE.COLOR.BLUE,
  },
  headerTotalPriceText: {
    fontWeight: STYLE.FONT.WEIGHT.BOLD,
    fontSize: 16,
    color: STYLE.COLOR.WHITE,
  },

  itemsList: {
    borderTop: `1px dashed ${STYLE.COLOR.GREY}`,

    marginLeft: 30,
    marginRight: 30,
  },
  itemsListTitleText: {
    fontSize: 16,
    color: STYLE.COLOR.BLUE,
    fontWeight: STYLE.FONT.WEIGHT.MEDIUM,
  },

  // NOTE: This is make QR-code square and limits it's size
  // @see: https://stackoverflow.com/questions/21750091/max-height-on-border-boxed-div-with-padding-is-not-set
  qrCode__maxHeightWrapper: {
    maxHeight: SHOPPING_CART.QR_CODE_MAX_SIZE,
    overflow: 'hidden',
  },
  qrCode__sqaureWrapper: {
    borderTop: `1px solid ${STYLE.COLOR.GREY}`,

    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',
    paddingTop: '100%',
    position: 'relative',
  },
  qrCode__innerFillWrapper: {
    ...STYLE.ABSOLUTE_FILL,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: SHOPPING_CART.QR_CODE_MAX_SIZE,
  },
  qrCode: {
    maxWidth: SHOPPING_CART.QR_CODE_MAX_SIZE,
    height: '100%',
    flexGrow: 1,
  },
}

export default style
