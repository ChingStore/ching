// @flow

import _ from 'lodash'

const NAME = {
  OLYMPIC: 'Olympic, Ethereum public pre - release testnet',
  MAINNET: 'Mainnet, Homestead, Metropolis, the Ethereum public main network',
  MORDEN: 'Morden, the public Ethereum testnet, now Ethereum Classic testnet',
  ROPSTEN: 'Ropsten, the public cross - client Ethereum testnet',
  RINKEBY: 'Rinkeby, the public Geth PoA testnet',
  UBIQ: 'Ubiq, the public Gubiq main network with flux difficulty chain ID 8',
  KOVAN: 'Kovan, the public Parity PoA testnet',
  POASOKOL: 'Sokol, the public POA Network testnet',
  POACORE: 'Core, the public POA Network main network',
  XDAI: 'xDai, the public MakerDAO / POA Network main network',
  TOBALABA: 'Tobalaba, the public Energy Web Foundation testnet',
  MUSICOIN: 'Musicoin, the music blockchain',
  AQUACHAIN: 'Aquachain, ASIC resistant chain',
}

const NAME_ID = {
  [NAME.OLYMPIC]: 0,
  [NAME.MAINNET]: 1,
  [NAME.MORDEN]: 2,
  [NAME.ROPSTEN]: 3,
  [NAME.RINKEBY]: 4,
  [NAME.UBIQ]: 8,
  [NAME.KOVAN]: 42,
  [NAME.POASOKOL]: 77,
  [NAME.POACORE]: 99,
  [NAME.XDAI]: 100,
  [NAME.TOBALABA]: 401697,
  [NAME.MUSICOIN]: 7762959,
  [NAME.AQUACHAIN]: 61717561,
}

const ID = {
  OLYMPIC: 0,
  MAINNET: 1,
  MORDEN: 2,
  ROPSTEN: 3,
  RINKEBY: 4,
  UBIQ: 8,
  KOVAN: 42,
  POASOKOL: 77,
  POACORE: 99,
  XDAI: 100,
  TOBALABA: 401697,
  MUSICOIN: 7762959,
  AQUACHAIN: 61717561,
}
export type NetworkIdType = $Values<typeof ID>

const TOKEN_ADDRESS = {
  MAINNET: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
  KOVAN: '0xC4375B7De8af5a38a93548eb8453a498222C4fF2',
}

const URL = {
  MAINNET: 'https://mainnet.infura.io/v3/3059c072371d4397b84e9577f896d91c',
  KOVAN: 'https://kovan.infura.io/v3/3059c072371d4397b84e9577f896d91c',
  XDAI: 'https://dai.poa.network',
}

const ID_NAME = _.invert(NAME_ID)

export default { NAME_ID, ID_NAME, ID, URL, TOKEN_ADDRESS }
