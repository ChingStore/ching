import _ from 'lodash'

const URL = {
  // OLYMPIC: ,
  MAINNET: 'https://mainnet.infura.io/v3/3059c072371d4397b84e9577f896d91c',
  // MORDEN: ,
  // ROPSTEN: ,
  // RINKEBY: ,
  // UBIQ: ,
  KOVAN: 'https://kovan.infura.io/v3/3059c072371d4397b84e9577f896d91c',
  // POASOKOL: ,
  // POACORE: ,
  XDAI: 'https://dai.poa.network',
  // TOBALABA: ,
  // MUSICOIN: ,
  // AQUACHAIN: ,
}

const URL_ID = {
  // [URL.OLYMPIC]: 0,
  [URL.MAINNET]: 1,
  // [URL.MORDEN]: 2,
  // [URL.ROPSTEN]: 3,
  // [URL.RINKEBY]: 4,
  // [URL.UBIQ]: 8,
  [URL.KOVAN]: 42,
  // [URL.POASOKOL]: 77,
  // [URL.POACORE]: 99,
  [URL.XDAI]: 100,
  // [URL.TOBALABA]: 401697,
  // [URL.MUSICOIN]: 7762959,
  // [URL.AQUACHAIN]: 61717561,
}

const NID_URL = _.invert(URL_ID)

export default { NID_URL, URL }
