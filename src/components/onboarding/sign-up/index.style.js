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

  backButton: {
    marginTop: 20,
    padding: 20,
    paddingLeft: 0,
  },

  title: {
    flex: 0.3,

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
    marginTop: 84,
    flex: 0.1,
    flexDirection: 'row-reverse',
  },

  spacer: {
    marginTop: 30,
  },
}
