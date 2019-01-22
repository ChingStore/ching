// curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' https://kovan.infura.io/v3/3059c072371d4397b84e9577f896d91c

const Web3 = require('web3')

const daiMainnetAddress = '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359'
const daiKovanAddress = '0xC4375B7De8af5a38a93548eb8453a498222C4fF2'
const INFURA_KOVAN_URI =
  'https://kovan.infura.io/v3/3059c072371d4397b84e9577f896d91c'

const walletAddress = '0xf82B82b4ebC83479eF10271190A7cf5487240955'

// The minimum ABI to get ERC20 Token balance
const minABI = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
  // decimals
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    type: 'function',
  },
]

class Web3Infura {
  /**
   * Stores the initialization promise.
   */
  _initialized = null

  constructor() {
    this._initialized = this._initialize()
    console.log('Init web3')
  }

  async _initialize() {
    this.web3 = new Web3(new Web3.providers.HttpProvider(INFURA_KOVAN_URI))
  }

  async isTxConfirmed(hash) {
    await this._initialized
    const receipt = await this.web3.eth.getTransactionReceipt(hash)
    return receipt.status
  }

  async getBalance() {
    await this._initialized
    const contract = this.web3.eth.contract(minABI).at(daiKovanAddress)
    let balance = await contract.balanceOf(walletAddress)
    balance = balance.div(10 ** contract.decimals())
    return balance

    // // Call balanceOf function
    // contract.balanceOf(walletAddress, (error, balance) => {
    //   // Get decimals
    //   contract.decimals((error, decimals) => {
    //     // calculate a balance
    //     balance = balance.div(10 ** decimals)
    //     console.log(balance.toString())
    //   })
    // })
  }
}

export default new Web3Infura()
