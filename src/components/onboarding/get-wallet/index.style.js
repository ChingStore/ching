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
  back_button: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingRight: 20,
  },
  title: {
    flex: 0.2,

    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title_text: {
    marginTop: 0,
    marginBottom: 0,
    fontWeight: STYLE.FONT.WEIGHT.BOLD,
    fontSize: 32,
    color: STYLE.COLOR.BLUE,
  },
  welcome_msg: {
    marginTop: 10,
    color: STYLE.COLOR.BLUE,
    fontSize: 15,
    width: '110%',
    lineHeight: 1.5,
    fontWeight: '500',
  },
  recommendedWallets: {
    fontSize: 14,
    fontWeight: 'bold',
    color: STYLE.COLOR.BLUE,
    marginTop: 80,
    marginBottom: 0,
  },
  recommendedWallets_text: {
    marginTop: 0,
    marginBottom: 0,
  },
  walletButton: {
    flex: 0.15,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
}
