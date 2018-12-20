import Maker from '@makerdao/dai'

class Web3 {
  /**
   * Stores the initialization promise.
   */
  _initialized = null

  constructor() {
    this._initialized = this._initialize()
    console.log('Init web3')
  }

  async _initialize() {
    this.maker = Maker.create('browser')
    await this.maker.authenticate()
    this.dai = this.maker.service('token').getToken('DAI')
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

const web3Instance = new Web3()

export default web3Instance
