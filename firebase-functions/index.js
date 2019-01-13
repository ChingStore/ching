const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

const reportTransaction = (orderId, txHash) => {
  console.log('!!!!!!!!!!!!reportTransaction!!!!!!!!!!', orderId, txHash)
  return admin
    .firestore()
    .collection('orders')
    .doc(orderId)
    .update({ txHash: txHash })
    .then(() => console.log('order updated'))
}

exports.transactionBuffer = functions.https.onRequest((request, response) => {
  console.log('The query:')
  console.log(request.query)
  reportTransaction(request.query.orderId, request.query.txHash)
})
