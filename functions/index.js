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
  response.send(
    'Your transaction hash received. Better interface is underconstruction'
  )
  // request should be in the form
  // https://us-central1-daipos.cloudfunctions.net/transactionBuffer?store=Asdasa&token=asa13c&order=5&txHash=1asdas1231
  console.log(request.query)
  reportTransaction(request.query.orderId, request.query.txHash)
})
