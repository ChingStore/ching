import STYLE from 'constants/style'

export default {
  button__location: {
    marginTop: 98,
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
  continue__text: {
    marginRight: 20,
    fontWeight: STYLE.FONT.WEIGHT.BOLD,
    fontSize: 16,
  },
  continue__circle: {
    width: '48px',
    height: '48px',
    left: '283px',
    top: '444px',
    background: '#5EBAA0',
    borderRadius: '70px',

    display: 'grid',
    justifyContent: 'center',
    alignContent: 'center',
  },
}
