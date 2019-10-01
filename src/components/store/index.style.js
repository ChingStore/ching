import STYLE from 'constants/style'

export default {
  scroller: {
    overflow: 'scroll',

    '-webkitOverflowScrolling': 'touch',
  },

  editControls: {
    marginTop: 40,
    fontWeight: STYLE.FONT.WEIGHT.SEMI_BOLD,
    fontSize: 14,
    color: STYLE.COLOR.GREY,
    letterSpacing: STYLE.FONT.LETTER_SPACING.TINY,
  },
  editControls__startButton: {
    color: STYLE.COLOR.BLUE,
  },
  editControls__endButton: {
    color: STYLE.COLOR.RED,
  },

  itemsRow: {
    justifyContent: 'space-around',
  },

  storeName: {
    marginTop: 5,

    fontSize: 32,
    fontWeight: STYLE.FONT.WEIGHT.BOLD,
    letterSpacing: STYLE.FONT.LETTER_SPACING.TINY,
  },
  storeName__input: {
    padding: 0,
    // Compensate input border added by user agen   t
    margin: -2,
    marginTop: 3,
  },
}
