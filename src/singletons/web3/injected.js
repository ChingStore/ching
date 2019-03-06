// curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' https://kovan.infura.io/v3/3059c072371d4397b84e9577f896d91c

import _ from 'lodash'
import promisify from 'js-promisify'

import NETWORK from 'constants/network'
import DAIABI from 'constants/abi'

const Web3 = require('web3')

const TRANSACTION_BUFFER_URL =
  'https://us-central1-daipos.cloudfunctions.net/transactionBuffer?'

function encodeQueryData(data) {
  return _.map(
    data,
    (value, key) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
  ).join('&')
}

function getHttpRequest(yourUrl) {
  const Httpreq = new XMLHttpRequest() // a new request
  Httpreq.open('GET', yourUrl, false)
  Httpreq.send(null)
  return Httpreq.responseText
}

class Web3Injected {
  /**
   * Stores the initialization promise.
   */
  _initialized = null

  async initialize() {
    if (!this._initialized) {
      this._initialized = this._initialize()
    }
    await this._initialized
  }

  async _initialize() {
    try {
      await window.ethereum.enable()
      this.web3 = new Web3(window.web3.currentProvider)
      this.netId = await this.getNetworkId()
      console.log('DAI initialized at:', NETWORK.ID_NAME[this.netId])
    } catch (err) {
      console.log('there is no injected web3.')
    }
  }

  async getNetworkId() {
    try {
      console.log('web3 version:', this.web3.version.api)
      const netId = parseInt(this.web3.version.network, 10)
      console.log({ netId })
      return netId
    } catch (error) {
      console.log('Web3 version cannot be detected')
      return undefined
    }
  }

  sendTxHashToVendor({ orderId, txHash }) {
    fetch(
      TRANSACTION_BUFFER_URL +
        encodeQueryData({
          orderId,
          txHash,
          networkId: this.netId,
        })
    )
  }

  getGasPrice() {
    // making request to:
    // https://ethgasstation.info/json/ethgasAPI.json
    // {fastest: 200, safeLowWait: 23, fastestWait: 0.6, fast: 40,}
    const jsonObj = JSON.parse(
      getHttpRequest('https://ethgasstation.info/json/ethgasAPI.json')
    )
    const fixedPrice = this.web3.toWei(20, 'gwei')
    const gasPrice = this.web3.toWei(jsonObj.average, 'gwei') || fixedPrice
    return gasPrice
  }

  async sendDai({ address, amount, orderId }) {
    console.log('sending:', { address, amount, orderId })
    await this._initialized
    console.log('initialized')
    this.web3.eth.defaultAccount = this.web3.eth.accounts[0]
    const value = this.web3
      .toBigNumber(amount)
      .times(this.web3.toBigNumber(10).pow(18))

    let txHash = null
    try {
      if (this.netId === NETWORK.ID.MAINNET) {
        console.log('sending DAI')
        const contract = this.web3.eth
          .contract(DAIABI)
          .at(NETWORK.TOKEN_ADDRESS.MAINNET)
        console.log({ contract })
        txHash = await promisify(contract.transfer, [
          address,
          value,
          {
            gasPrice: this.getGasPrice(),
            gas: 80000,
          },
        ])
      } else if (this.netId === NETWORK.ID.XDAI) {
        console.log('sending XDAI')
        txHash = await promisify(this.web3.eth.sendTransaction, [
          {
            to: address,
            value,
            gasPrice: this.getGasPrice(),
            gas: 80000,
          },
        ])
      } else {
        alert(`Network not supported. Please switch to Mainnet or xDai chain`)
        return null
      }

      this.sendTxHashToVendor({ orderId, txHash })
    } catch (error) {
      console.error(error.message)
    }
    console.log({ txHash })
    return txHash
  }
}

export default new Web3Injected()
