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

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'flex-end',
  },
  title__text: {
    // marginTop: 100,
    marginBottom: 0,
    fontWeight: 'bold',
    fontSize: 32,
    color: STYLE.COLOR.BLUE,
  },
  welcome__msg: {
    marginTop: 0,
    color: STYLE.COLOR.BLUE,
    fontSize: 22,
  },

  composition: {
    position: 'relative',
    flex: 0.45,

    display: 'block',

    marginTop: 40,
  },
  background: {
    position: 'absolute',
    zIndex: 0,
  },
  tag: {
    position: 'absolute',
    zIndex: 1,

    top: 17,
    left: 33,
  },

  addFirstItem: {
    flex: 0.25,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 61,
  },
}
