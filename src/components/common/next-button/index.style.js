import STYLE from 'constants/style'

export default {
  button__location: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  continue__button: {
    color: STYLE.COLOR.CYAN,
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    borderWidth: 0,
  },
  continue__buttonText: {
    marginRight: 20,
    fontWeight: STYLE.FONT.WEIGHT.BOLD,
    fontSize: 16,
  },
  continue__buttonCircle: {
    width: '48px',
    height: '48px',
    background: '#5EBAA0',
    borderRadius: '70px',

    display: 'grid',
    justifyContent: 'center',
    alignContent: 'center',
  },
}
