import _ from 'lodash'
import NETWORK from 'constants/network'
import web3DaiInfura from 'singletons/web3/dai-infura'
import web3XdaiInfura from 'singletons/web3/xdai-infura'
import selector from 'redux/selectors'

const add = ({ itemId, quantity }) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()
    const state = getState()
    const price = selector.getItemPrice(state, { itemId })
    const items = {
      [itemId]: { quantity, price },
    }
    try {
      const newOrder = await firestore.collection('orders').add({
        txHash: null,
        networkId: null,
        items: items,
        userId: state.firebase.auth.uid,
        createdAt: new Date(),
      })
      return newOrder.id
    } catch (err) {
      console.log('Error in order/add action', err.message)
    }
  }
}

const txStatusCheckAndUpdateOrder = order => {
  return async (dispatch, getState, { getFirestore }) => {
    if (order.txConfirmed) {
      return
    }

    if (!order.txConfirmed && order.txHash && order.networkId) {
      const firestore = getFirestore()
      let isTxConfirmed
      try {
        if (parseInt(order.networkId) === NETWORK.ID.MAINNET) {
          isTxConfirmed = await web3DaiInfura.isTxConfirmed(order.txHash)
        } else if (parseInt(order.networkId) === NETWORK.ID.XDAI) {
          isTxConfirmed = await web3XdaiInfura.isTxConfirmed(order.txHash)
        } else if (parseInt(order.networkId) === NETWORK.ID.KOVAN) {
          isTxConfirmed = await web3DaiInfura.isTxConfirmed(order.txHash)
        } else {
          console.log('Cannot update order. Undefined network ID')
          return
        }

        if (!(typeof isTxConfirmed === 'undefined')) {
          await firestore
            .collection('orders')
            .doc(order.id)
            .update({
              txConfirmed: isTxConfirmed,
            })
        }
        if (isTxConfirmed && !(typeof isTxConfirmed === 'undefined')) {
          // updating selling items
          const state = getState()
          const confirmedOrderItems = selector.getOrderItems(state, {
            orderId: order.id,
          })
          _.map(confirmedOrderItems, async (soldItem, soldItemId) => {
            const fbItem = selector.getItem(state, { itemId: soldItemId })

            await firestore
              .collection('items')
              .doc(soldItemId)
              .update({
                quantity: fbItem.quantity - soldItem.quantity,
                soldCount: fbItem.soldCount + soldItem.quantity,
              })
            console.log('Order updated. ID:', order.id)
          })
        }
      } catch (error) {
        console.log('Cannot update order:', order)
        console.log('Reason:', error.message)
      }
    }
  }
}

const initialize = () => {
  return async dispatch => {
    setInterval(function() {
      dispatch(processAllOrders())
    }, 10000)
  }
}

const processAllOrders = () => {
  return async (dispatch, getState) => {
    const state = getState()
    const orders = selector.getOrders(state)
    _.map(orders, order => {
      dispatch(txStatusCheckAndUpdateOrder(order))
    })
  }
}

export default {
  add,
  initialize,
}
