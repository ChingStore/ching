import STYLE from 'constants/style'

export default {
  base: {},

  label: {
    fontWeight: STYLE.FONT.WEIGHT.BOLD,
    fontSize: 14,
    color: STYLE.COLOR.BLUE,
    marginBottom: 10,
  },
  input: {
    fontSize: 22,
    borderWidth: 0,
  },

  line: {
    width: '100%',
    borderTopWidth: 0,
    borderStyle: 'solid',
    borderColor: STYLE.COLOR.BLUE,
  },
  password: {
    fontSize: 22,
    borderWidth: 0,
    fontFamily: 'cursive',
    '::placeholder': { fontFamily: 'Inter UI' },
  },
}
