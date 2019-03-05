import STYLE from 'constants/style'
import ORDER from 'constants/order'

export default {
  base: {
    borderRadius: 10,
    backgroundColor: STYLE.COLOR.LIGHTER_BLUE,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 40,
    marginTop: 22,
  },

  [`base__${ORDER.STATUS.CONFIRMED}`]: {
    backgroundColor: STYLE.COLOR.CYAN,
  },
  [`base__${ORDER.STATUS.FAILED}`]: {
    backgroundColor: STYLE.COLOR.RED,
  },

  status_icon: {
    flex: 115,
  },
  [`status_icon__${ORDER.STATUS.CONFIRMED}`]: {
    paddingLeft: 11,
  },

  status_text: {
    flex: 50,
    fontSize: 16,
    color: STYLE.COLOR.BLUE,
  },
  [`status_text__${ORDER.STATUS.CONFIRMED}`]: {
    color: STYLE.COLOR.WHITE,
  },
  [`status_text__${ORDER.STATUS.FAILED}`]: {
    color: STYLE.COLOR.WHITE,
  },

  status_bottomPadding: {
    flex: 47,
  },

  sellMoreItemsButton: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 15,
    background: STYLE.COLOR.WHITE,
    color: STYLE.COLOR.BLUE,
  },

  failedTransactionButtons: {
    padding: 15,
    paddingTop: 0,
  },
  failedTransactionButtons_sellMoreItems: {
    backgroundColor: STYLE.COLOR.TRANSPARENT,
    border: `1px solid ${STYLE.COLOR.WHITE}`,
    boxSizing: 'border-box',
    color: STYLE.COLOR.WHITE,
  },
  failedTransactionButtons_retry: {
    marginLeft: 15,
    backgroundColor: STYLE.COLOR.WHITE,
    color: STYLE.COLOR.BLUE,
  },
}
