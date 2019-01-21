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

  art: {
    flex: 0.4,

    display: 'flex',
    justifyContent: 'center',
  },

  becomeVendor: {
    flex: 0.2,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  logIn: {
    flex: 0.2,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logIn__text: {
    paddingLeft: 15,
  },
}
