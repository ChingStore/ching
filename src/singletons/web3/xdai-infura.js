// curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' https://kovan.infura.io/v3/3059c072371d4397b84e9577f896d91c

import NETWORK from 'constants/network'
import DAIABI from 'constants/abi'

const Web3 = require('web3')

class Web3XdaiInfura {
  /**
   * Stores the initialization promise.
   */
  _initialized = null

  constructor() {
    this._initialized = this._initialize()
  }

  async _initialize() {
    this.web3 = new Web3(new Web3.providers.HttpProvider(NETWORK.URL.XDAI))
    this.getNetwork()
  }

  getNetwork() {
    const netId = parseInt(this.web3.version.network)
    console.log('Infura XDai initialized:', NETWORK.ID_NAME[netId])
  }

  async isTxConfirmed(hash) {
    await this._initialized
    const receipt = await this.web3.eth.getTransactionReceipt(hash)
    if (receipt) {
      return receipt.status
    }
  }

  getBalance = async walletAddress => {
    await this._initialized
    const contract = this.web3.eth
      .contract(DAIABI)
      .at(NETWORK.TOKEN_ADDRESS.MAINNET)
    let balance = this.web3.eth.getBalance(walletAddress)
    balance = balance.div(10 ** contract.decimals())
    balance = this.web3.fromWei('' + balance, 'ether')
    return parseFloat(balance).toFixed(2)
  }
}

export default new Web3XdaiInfura()
