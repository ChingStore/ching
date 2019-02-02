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
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  title__text: {
    marginTop: 0,
    marginBottom: 0,
    fontWeight: 'bold',
    fontSize: 32,
    color: STYLE.COLOR.BLUE,
  },

  inputField: {
    flex: 0.1,
  },

  NextButton__location: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  forgot: {
    marginTop: 5,
    display: 'flex',
    justifyContent: 'flex-end',
  },

  forgot__text: {
    color: STYLE.COLOR.CYAN,
  },
}
