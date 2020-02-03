const functions = require('firebase-functions')
const admin = require('firebase-admin')
// CORS Express middleware to enable CORS Requests.
const cors = require('cors')({
  origin: true,
})

admin.initializeApp(functions.config().firebase)

const reportTransaction = (orderId, txHash, networkId) => {
  console.log('New transaction reported:', { orderId, txHash, networkId })
  return admin
    .firestore()
    .collection('orders')
    .doc(orderId)
    .update({ txHash, networkId })
    .then(() => {
      console.log('order updated')
      return 'OK'
    })
    .catch(err => {
      console.log('Error::', err.message)
      return 'BAD'
    })
}

exports.transactionBuffer = functions.https.onRequest((request, response) => {
  // NOTE: Request should be in the following form:
  // https://us-central1-daipos.cloudfunctions.net/transactionBuffer?orderId=0JFmycULnk9kAboK5ESg&txHash=0x8c831cd5cbc8786982817e43a0a77627ad0b12eaa92feff97fb3b7e91c263b1c&networkId=100

  console.log('The query:', request.query)

  return cors(request, response, () => {
    reportTransaction(
      request.query.orderId,
      request.query.txHash,
      request.query.networkId
    ).then(() => {
      response.end()
    })
  })
})

exports.orderDetails = functions.https.onRequest(async (request, response) => {
  // NOTE: Request should be in the following form:
  // https://us-central1-daipos.cloudfunctions.net/orderDetails?orderId=13VwSGhmVuwjpLKFmqd7
  cors(request, response, async () => {
    try {
      const order = await admin
        .firestore()
        .collection('orders')
        .doc(request.query.orderId)
        .get({ source: 'server' })
      const orderData = order.data()
      const mergedItems = await Promise.all(
        orderData.items.map(async orderItem => {
          const item = await admin
            .firestore()
            .collection('items')
            .doc(orderItem.id)
            .get({ source: 'server' })
          const itemData = item.data()
          return {
            ...itemData,
            ...orderItem,
          }
        })
      )
      console.log('mergedItems :', mergedItems)
      response.json({ items: mergedItems })
    } catch (error) {
      console.log('Error getting cached document:', error)
      response.status(500).send(error)
    }
  })
})

exports.itemDetails = functions.https.onRequest(async (request, response) => {
  // NOTE: Request should be in the following form:
  // https://us-central1-daipos.cloudfunctions.net/itemDetails?itemId=RHfVDGM5L2BKPaIwGOXA
  cors(request, response, async () => {
    try {
      const item = await admin
        .firestore()
        .collection('items')
        .doc(request.query.itemId)
        .get({ source: 'server' })
      const itemData = item.data()
      response.json({ items: itemData })
    } catch (error) {
      console.log('Error getting cached document:', error)
      response.status(500).send(error)
    }
  })
})
