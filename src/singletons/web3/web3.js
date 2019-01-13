import Maker from '@makerdao/dai'

const { DAI } = Maker
const TRANSACTION_BUFFER_URL =
  'https://us-central1-daipos.cloudfunctions.net/transactionBuffer?'

function encodeQueryData(data) {
  const ret = []
  for (let d in data)
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]))
  return ret.join('&')
}

class Web3 {
  /**
   * Stores the initialization promise.
   */
  _initialized = null

  /**
   * Maker DAI.js object.
   * @see https://makerdao.com/documentation/
   */
  _maker = null

  constructor() {
    this._initialized = this._initialize()
    console.log('Init web3')
  }

  async _initialize() {
    this._maker = Maker.create('browser')
    await this._maker.authenticate()
    this.dai = this._maker.service('token').getToken(DAI)
    this.accounts = await this.dai._web3.eth.getAccounts()
  }

  async send({ address, amount, orderId }) {
    await this._initialized
    try {
      const tx = await this.dai.transfer(address, amount)
      fetch(
        TRANSACTION_BUFFER_URL +
          encodeQueryData({
            orderId,
            txHash: tx.hash,
          })
      )
    } catch (err) {
      console.error(err)
    }
  }

  async getBalance() {
    await this._initialized
    return await this.dai.balanceOf(this.accounts[0])
  }

  async getWalletAddress() {
    await this._initialized
    return this.accounts[0]
  }
}

export default new Web3()
