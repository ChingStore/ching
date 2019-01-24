import STYLE from 'constants/style'

export default {
  base: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontWeight: STYLE.FONT.WEIGHT.BOLD,
    fontSize: 14,
    color: STYLE.COLOR.BLUE,
    marginBottom: 10,
  },
  input: {
    fontSize: 22,
    borderWidth: 0,
    placeholder: {
      color: 'red',
    },
  },

  line: {
    width: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: STYLE.COLOR.BLUE,
  },
}
