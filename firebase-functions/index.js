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
