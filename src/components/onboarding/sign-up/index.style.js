import STYLE from 'constants/style'

export default {
  base: {
    display: 'flex',
    flexDirection: 'column',

    position: 'absolute',
    height: '100%',
    left: 40,
    right: 40,
  },

  title: {
    flex: 0.2,

    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title__text: {
    fontWeight: 'bold',
    fontSize: 32,
    color: STYLE.COLOR.BLUE,
  },

  becomeVendor: {
    flex: 0.2,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  //
  // logIn: {
  //   flex: 0.2,
  //
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  logInLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logInLink__text: {
    paddingLeft: 15,

    fontWeight: 600,
    fontSize: 16,
    color: STYLE.COLOR.BLUE,
  },
  button__location: {
    marginTop: 98,
    flex: 1,
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  continue__button: {
    color: STYLE.COLOR.CYAN,
    display: 'flex',
    alignItems: 'center',
  },
  contnue__text: {
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
  spacer: {
    marginTop: 30,
  },
}
