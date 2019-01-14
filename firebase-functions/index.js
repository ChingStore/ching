const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

const reportTransaction = (orderId, txHash) => {
  console.log('New transaction reported:', { orderId, txHash })
  return admin
    .firestore()
    .collection('orders')
    .doc(orderId)
    .update({ txHash: txHash })
    .then(() => console.log('order updated'))
}

exports.transactionBuffer = functions.https.onRequest((request, response) => {
  // NOTE: Request should be in the followinig form:
  // https://us-central1-daipos.cloudfunctions.net/transactionBuffer?orderid=prJgCFcSRIJsOMFuM6Bo&txHash=0x2946052ac5fb89124ef233645cae8cdd4e150dcd86d94508a2f0e5487fe63cc4

  console.log('The query:', request.query)
  reportTransaction(request.query.orderId, request.query.txHash)
})
