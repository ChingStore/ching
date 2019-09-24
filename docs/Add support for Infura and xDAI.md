# Add support for Infura and xDAI

## Description

Refactor web3Util and singleton to support Infura and injected web3, DAI and xDAI.

**Start Date : 22/01/2019**

**Expected Completion Date : 29/01/2019**

**Actual Completion Date : [TBD]**

## Goals

- Support getting balances for DAI and xDAI tokens (we are not tracking balances. Maybe not necessary)
- Support sending transactions on Mainnet and xDAI networks
- Support tracking transactions on Mainnet and xDAI networks
- Support injected web3 as well as Infura

## R&D

- How to get balances for DAI and xDAI?
  - Tokens are on different chains
  - Balance should be stored in Redux state
  - Solution: Connect to both chains by making separate web3 instances and call getBalance methods on each.
- How to send transaction in DAI and xDAI?
  - The wallet injects web3 object that has networkId on the current network
  - Solution: Depending on the network, call web3.eth.sendTransaction in DAI or xDAI
- How to track transactions on Mainnet and xDAI networks?
  - Solution:
    - Same approach as with balance update can be used - connect to both chains at the same time
    - Busy polling?
      - https://ethereum.stackexchange.com/questions/6883/waiting-for-a-transaction-to-be-confirmed
- How to manage connections to multiple networks?
  - Solution: Make an array of objects that each initialized to work with a specific network
- Support injected web3 as well as Infura
  - Solution: Use dai.js instead of web3js since we are only supporting DAI and ETH transactions for now
    - If web3 is present call `Maker.create('browser')`
    - Otherwise, call `Maker.create('http', { provider: { ... } })`
- How to structure actions?
  - Solution: It's best to abstract away web3js/daijs from the rest of the app
    - Make a generic say, `ethAction`, wrapper action
    - This way implementation can be swapped out later if needed
- How to structure Redux?
  - Should support data from multiple networks
  - Should be easy to add data from non-eth chains in the future
  - Solution: Add a domain with following schema
    - chains.eth.xdai.isConnected
    - chains.eth.xdai.account.balance
    - chains.eth.xdai.account.transactions
- For some transactions with 21000 gas got stuck in xDai chain, however this is exact the amount of gas they are using.
  - Can not find a way to see hanged transactions in the online chain scanners (EtherScan, etc)

## Sub-Features

- [ ] Actions
- [ ] Tests
- [ ] Constants
- [ ] Selectors
- [ ] Reducers

## API

### redux/actions/eth.js

```js

/**
 * Configures all networks
 */
async initialize() {

  // Add mainnent
  // Add xdai
  // Use injected web3 when provided

  // Store results in redux store
}

/**
 * Updates account balances on all networks.
 */
updateBalances() { }

/**
 * Monitors a transaction progress.
 */
monitorTransaction({ txHash, networkId }) {
  // Poll transaction and update progress in redux state under
  // chains.eth.[networkId].accounts.[walletAddress].transactions.[txHash]
  // Stop polling after transaction in confirmed
}
```

### redux/selectors.js

_TODO_ Add information about erc20Asset identifier

```js
const eth = {
  transaction: (state, { networkId, walletAddress, txHash }) =>
    _.get(state, `chains.eth[${networkId}].accounts[${walletAddress}].transactions[${txHash}]`)

  balance: (state, { network, walletAddress }) =>
    _.get(state, `chains.eth[${network}].accounts[${walletAddress}].balance`)
}

const store = {
  walletAddress: _.get(...)
}

const orders = {
  order: (state, { orderId }) => _.get(state, `orders[${orderId}]`)

  /**
   * Selects transaction by its orderId
   */
  transaction: (state, { orderId }) => {
    const order = orders.order(state, { orderId })
    const walletAddress = store.walletAddress(state, { orderId })

    const transaction = eth.transaction(state, {
      network: order.network,
      txHash: order.txHash,
      walletAddress,
    })

    return transaction
  }
}
```

### utils/transaction.js

```js

//////////////
// CHECKERS //
//////////////

function isSubmitted(transaction) {
  return true || false
}

function isConfirmed(transaction) {
  return true || false
}

/////////////
// GETTERS //
/////////////

function getConfirmationString(transaction) {
  ...
  return `${n}/${m} Confirmations` || 'Confirmed' || 'Not submitted'
}
```

### redux/reducers.js

```js
...
```

### constants/transaction.js

```js
const REQUIRED_CONFIRMATIONS_COUNT = {
  [ETH.NETWORK.MAINNET]: 2
  [ETH.NETWORK.XDAI]: 1
}
```

### constants/eth.js

```js
...
```
