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
    paddingRight: 120,
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
    marginTop: 54,
    flex: 1,
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  helpLink_wrapper: {
    marginTop: 5,
    flex: 1,
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  helpLink_button: {
    color: STYLE.COLOR.CYAN,
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    borderWidth: 0,
    paddingRight: 0,
  },
  helpLink_text: {
    marginRight: 0,
    fontWeight: STYLE.FONT.WEIGHT.BOLD,
    fontSize: 16,
  },
  spacer: {
    marginTop: 30,
  },
}
