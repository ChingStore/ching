/*  Newtork IDs
0: 'Olympic, Ethereum public pre - release testnet',
1: 'Frontier, Homestead, Metropolis, the Ethereum public main network',
2: 'Morden, the public Ethereum testnet, now Ethereum Classic testnet',
3: 'Ropsten, the public cross - client Ethereum testnet',
4: 'Rinkeby, the public Geth PoA testnet',
8: 'Ubiq, the public Gubiq main network with flux difficulty chain ID 8',
42: 'Kovan, the public Parity PoA testnet',
77: 'Sokol, the public POA Network testnet',
99: 'Core, the public POA Network main network',
100: 'xDai, the public MakerDAO / POA Network main network',
401697: 'Tobalaba, the public Energy Web Foundation testnet',
7762959: 'Musicoin, the music blockchain',
61717561: 'Aquachain, ASIC resistant chain',
*/

import _ from 'lodash'

const NETWORK = {
  OLYMPIC: 'Olympic',
  MAINNET: 'Mainnet',
  MORDEN: 'Morden',
  ROPSTEN: 'Ropsten',
  RINKEBY: 'Rinkeby',
  UBIQ: 'Ubiq',
  KOVAN: 'Kovan',
  POASOKOL: 'PoaSokol',
  POACORE: 'PoaCore',
  XDAI: 'xDai',
  TOBALABA: 'Tobalaba',
  MUSICOIN: 'Musicoin',
  AQUACHAIN: 'Aquachain',
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

const ID_NETWORK = _.invert(ID_NETWORK)

export default {
  ID_NETWORK,
  NETWORK_ID,
}
