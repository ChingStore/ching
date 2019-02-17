import STYLE from 'constants/style'

export default {
  base: {
    width: '120px',
  },
  label: {
    fontWeight: STYLE.FONT.WEIGHT.BOLD,
    fontSize: 14,
    color: STYLE.COLOR.BLUE,
    marginBottom: 10,
  },
  form: {},

  form_minus: {
    alignSelf: 'stretch',
    flex: 0.3,
  },

  form_input: {
    borderWidth: 0,
    width: 40,
    textAlign: 'center',
    fontSize: 22,
  },

  form_plus: {
    alignSelf: 'stretch',
    flex: 0.3,
  },

  line: {
    borderTopWidth: 0,
    width: '100%',
    borderStyle: 'solid',
    borderColor: STYLE.COLOR.BLUE,
  },
}
