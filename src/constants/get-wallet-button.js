// @flow

import Icon from 'components/common/icon'
import STYLE from './style.js'

const TYPE = {
  COINBASE: 'Coinbase',
  STATUS: 'Status',
  TRUST: 'Trust',
}
const TYPES = Object.values(TYPE)

const LINK = {
  [TYPE.COINBASE]: 'https://wallet.coinbase.com/',
  [TYPE.STATUS]: 'https://get.status.im/',
  [TYPE.TRUST]: 'https://trustwallet.com/',
}

const ICON = {
  [TYPE.COINBASE]: Icon.Coinbase,
  [TYPE.STATUS]: Icon.Status,
  [TYPE.TRUST]: Icon.Trust,
}

const COLOR = {
  [TYPE.COINBASE]: STYLE.COLOR.COINBASE,
  [TYPE.STATUS]: STYLE.COLOR.STATUS,
  [TYPE.TRUST]: STYLE.COLOR.TRUST,
}

export default {
  TYPE,
  TYPES,
  LINK,
  ICON,
  COLOR,
}
