// curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' https://kovan.infura.io/v3/3059c072371d4397b84e9577f896d91c

import NETWORK from 'constants/network'
import DAIABI from 'constants/abi'

const Web3 = require('web3')

const TRANSACTION_BUFFER_URL =
  'https://us-central1-daipos.cloudfunctions.net/transactionBuffer?'

function encodeQueryData(data) {
  const ret = []
  for (let d in data)
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]))
  return ret.join('&')
}

class Web3Injected {
  /**
   * Stores the initialization promise.
   */
  _initialized = null

  constructor() {
    this._initialized = this._initialize()
  }

  async _initialize() {
    this.web3 = new Web3(window.web3.currentProvider)
    this.getNetwork()
  }

  getNetwork() {
    const netId = parseInt(this.web3.version.network)
    console.log('DAI initialized at:', NETWORK.ID_NAME[netId])
    return netId
  }

  sendTxHashToVendor({ orderId, txHash, netId }) {
    fetch(
      TRANSACTION_BUFFER_URL +
        encodeQueryData({
          orderId,
          txHash,
          networkId: netId,
        })
    )
  }

  handleError({ error, orderId, txHash, netId }) {
    if (error) {
      console.log(error.message)
    } else {
      this.sendTxHashToVendor({ orderId, txHash, netId })
    }
  }

  async sendDai({ address, amount, orderId }) {
    await this._initialized
    await window.ethereum.enable()
    const netId = this.getNetwork()
    this.web3.eth.defaultAccount = this.web3.eth.accounts[0]

    if (netId === NETWORK.ID.MAINNET) {
      // sending DAI
      let contract = this.web3.eth
        .contract(DAIABI)
        .at(NETWORK.TOKEN_ADDRESS.MAINNET)
      contract.transfer(
        address,
        parseFloat(amount),
        { gas: 1000000 },
        (error, txHash) => {
          this.handleError({ error, orderId, txHash, netId })
        }
      )
    } else if (netId === NETWORK.ID.XDAI) {
      // sending XDAI
      let value = this.web3
        .toBigNumber(amount)
        .times(this.web3.toBigNumber(10).pow(18))
      this.web3.eth.sendTransaction(
        { to: address, value, gas: 10000000 },
        (error, txHash) => {
          this.handleError({ error, orderId, txHash, netId })
        }
      )
    }
  }
}

export default new Web3Injected()
