import STYLE from 'constants/style'

export default {
  base: {
    width: '100px',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    flex: 0.1,
    fontWeight: STYLE.FONT.WEIGHT.BOLD,
    fontSize: 14,
    color: STYLE.COLOR.BLUE,
    marginBottom: 10,
  },
  form: {
    flex: 0.5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  form_minus: {
    alignSelf: 'stretch',
    flex: 0.3,
  },

  form_input: {
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
