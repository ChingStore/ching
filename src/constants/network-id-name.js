import _ from 'lodash'

const NETWORK = {
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

const NETWORK_ID = {
  [NETWORK.OLYMPIC]: 0,
  [NETWORK.MAINNET]: 1,
  [NETWORK.MORDEN]: 2,
  [NETWORK.ROPSTEN]: 3,
  [NETWORK.RINKEBY]: 4,
  [NETWORK.UBIQ]: 8,
  [NETWORK.KOVAN]: 42,
  [NETWORK.POASOKOL]: 77,
  [NETWORK.POACORE]: 99,
  [NETWORK.XDAI]: 100,
  [NETWORK.TOBALABA]: 401697,
  [NETWORK.MUSICOIN]: 7762959,
  [NETWORK.AQUACHAIN]: 61717561,
}

const NID_NAME = _.invert(NETWORK_ID)

export default NID_NAME
