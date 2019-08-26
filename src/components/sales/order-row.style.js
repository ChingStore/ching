import STYLE from 'constants/style'

export default {
  base: {
    marginTop: 15,
    marginBottom: 15,
  },

  photo: { width: 44, height: 44, borderRadius: 12 },

  photo_statusDotWrapper: { position: 'absolute', bottom: -10, left: 10 },

  photo_statusDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    border: `3px solid ${STYLE.COLOR.WHITE}`,
    boxSizing: 'border-box',
  },

  details: {
    marginTop: 2,
    marginBottom: 2,
    marginLeft: 14,
  },

  details_title: {
    color: STYLE.COLOR.BLUE,
    fontSize: 16,
    fontWeight: STYLE.FONT.WEIGHT.MEDIUM,
  },

  details_totalPrice: {
    color: STYLE.COLOR.BLUE,
    fontSize: 16,
    fontWeight: STYLE.FONT.WEIGHT.SEMI_BOLD,
  },

  details_status: {
    color: STYLE.COLOR.GREY,
    fontSize: 12,
  },
}
