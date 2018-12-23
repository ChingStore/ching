import Maker from '@makerdao/dai'

const { DAI } = Maker

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

  async send({ address, amount }) {
    await this._initialized
    let balance
    balance = await this.dai.balanceOf(address)
    console.log(balance.toString())
    try {
      const tx = await this.dai.transfer(address, amount)
      console.log('tx', tx._state)
    } catch (err) {
      console.error(err)
    }
    balance = await this.dai.balanceOf(address)
    console.log(balance.toString())
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
