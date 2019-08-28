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
    paddingTop: 40,
    paddingBottom: 20,
    paddingRight: 20,
  },

  title: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  title__text: {
    marginTop: 0,
    marginBottom: 0,
    fontWeight: STYLE.FONT.WEIGHT.BOLD,
    fontSize: 32,
    color: STYLE.COLOR.BLUE,
  },

  buttons: {
    flex: 1,
    display: 'flex',
    textAlign: 'center',
    fontWeight: STYLE.FONT.WEIGHT.BOLDEST,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingBottom: '20vh',
  },
}
