// curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' https://kovan.infura.io/v3/3059c072371d4397b84e9577f896d91c

import NetworkIdName from 'constants/network-id-name'
import NetworkIdUrl from 'constants/network-id-url'
import NetworkTokenAddress from 'constants/network-token-address'
import DAIABI from 'constants/abi'

const Web3 = require('web3')

class Web3Infura {
  /**
   * Stores the initialization promise.
   */
  _initialized = null

  constructor() {
    console.log('Infura Web3 initialized')
    // this.networkId()
    this._initialized = this._initialize()
  }

  async _initialize() {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(NetworkIdUrl.URL.KOVAN)
    )
    // const connection = await this.web3.currentProvider.connection
    this.getNetwork()
  }

  getNetwork() {
    const netId = parseInt(this.web3.version.network)
    console.log(NetworkIdName[netId])
  }

  async isTxConfirmed(hash) {
    await this._initialized
    const receipt = await this.web3.eth.getTransactionReceipt(hash)
    return receipt.status
  }

  getBalance = async walletAddress => {
    await this._initialized
    const contract = this.web3.eth
      .contract(DAIABI)
      .at(NetworkTokenAddress.DAI.KOVAN)
    let balance = await contract.balanceOf(walletAddress)
    balance = balance.div(10 ** contract.decimals())
    return balance
  }
}

export default new Web3Infura()
