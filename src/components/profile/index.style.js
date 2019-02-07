// @flow

import STYLE from 'constants/style'

export default {
  base: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 40,
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

  collection: {
    height: 250,
  },
}
