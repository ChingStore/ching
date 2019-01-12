const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

const reportTransaction = transaction => {
  return admin.firestore
    .collection('transactions')
    .add(transaction)
    .then(doc => console.log('transaction added', transaction))
}

exports.transactionBuffer = functions.https.onRequest((request, response) => {
  response.send(
    'Your transaction hash received. Better interface is underconstruction'
  )
  // request should be in the form
  // https://us-central1-daipos.cloudfunctions.net/transactionBuffer?store=Asdasa&token=asa13c&order=5&txHash=1asdas1231
  console.log(request.query.store)
  console.log(request.query.token)
  console.log(request.query.order)
  console.log(request.query.txHash)
})
