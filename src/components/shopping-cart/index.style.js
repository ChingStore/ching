import STYLE from 'constants/style'

const style = {
  baseWrapper: {
    ...STYLE.ABSOLUTE_FILL,

    justifyContent: 'flex-end',
    alignItems: 'center',

    backgroundColor: STYLE.COLOR.TRANSLUCENT_BLACK,
  },
  base: {
    marginLeft: 10,
    marginRight: 10,
    width: 'calc(100% - 20px)',

    borderRadius: '20px 20px 0 0',
    backgroundColor: STYLE.COLOR.WHITE,
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
    fontWeight: STYLE.FONT.WEIGHT.BOLD,
  },

  qrCodeWrapper: {
    borderTop: `1px solid ${STYLE.COLOR.GREY}`,

    width: '100%',
    paddingTop: '100%',
    position: 'relative',
  },
  qrCode: {
    ...STYLE.ABSOLUTE_FILL,
    justifyContent: 'center',
    alignItems: 'center',
  },
}

export default style
