import NetworkIdName from 'constants/network-id-name'
import NetworkIdUrl from 'constants/network-id-url'
import NetworkTokenAddress from 'constants/network-token-address'
import DAIABI from 'constants/abi'

const TRANSACTION_BUFFER_URL =
  'https://us-central1-daipos.cloudfunctions.net/transactionBuffer?'

function encodeQueryData(data) {
  const ret = []
  for (let d in data)
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]))
  return ret.join('&')
}

const Web3 = require('web3')

class Web3Xdai {
  /**
   * Stores the initialization promise.
   */
  _initialized = null

  constructor() {
    this._initialized = this._initialize()
    console.log('Maker Web3Xdai initialized')
  }
  async _initialize() {
    this.web3 = new Web3(new Web3.providers.HttpProvider(NetworkIdUrl.URL.XDAI))
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
      .at(NetworkTokenAddress.XDAI.MAINNET)
    let balance = this.web3.eth.getBalance(walletAddress)
    balance = balance.div(10 ** contract.decimals())
    balance = this.web3.fromWei('' + balance, 'ether')
    return parseFloat(balance)
  }
}

export default new Web3Xdai()
