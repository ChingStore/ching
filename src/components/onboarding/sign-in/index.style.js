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

  backArrow: {
    flex: 0.05,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  title: {
    flex: 0.08,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '240px',
    height: '80px',
  },

  title__text: {
    fontWeight: 'bold',
    fontSize: 32,
    color: STYLE.COLOR.BLUE,
  },
}
