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
    flex: 0.3,

    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  titleText: {
    flex: 0.3,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    fontWeight: 'bold',
    fontSize: 32,
    color: STYLE.COLOR.BLUE,
  },

  backLink: {
    flex: 0.15,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },

  inputField: {
    flex: 0.1,
    flexDirection: 'column',
  },

  forgot: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  forgotText: {
    color: STYLE.COLOR.CYAN,
  },
}
