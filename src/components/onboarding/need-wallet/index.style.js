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
  continue__button: {
    paddingTop: 40,
    paddingBottom: 20,
  },

  title: {
    flex: 0.2,

    flexDirection: 'column',
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
  welcome__msg: {
    marginTop: 10,
    color: STYLE.COLOR.BLUE,
    fontSize: 15,
    width: '110%',
    lineHeight: 1.5,
  },
  recommended__wallets__text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: STYLE.COLOR.BLUE,
    marginTop: 80,
    marginBottom: 0,
  },
  recommended__wallets__p: {
    marginTop: 0,
    marginBottom: 0,
  },

  composition: {
    position: 'relative',
    flex: 0.4,

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

  walletButton: {
    flex: 0.2,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 20,
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
