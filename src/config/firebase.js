import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var config = {
  apiKey: 'AIzaSyAUBUzRsIYz7MGFCWIlIoMzjl_9IMa4bho',
  authDomain: 'daipos.firebaseapp.com',
  databaseURL: 'https://daipos.firebaseio.com',
  projectId: 'daipos',
  storageBucket: 'daipos.appspot.com',
  messagingSenderId: '949375951452',
}
firebase.initializeApp(config)
firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebase
