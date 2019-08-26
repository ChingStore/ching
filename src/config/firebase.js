// @flow

import CONFIG from 'constants/config'

const PRODUCTION = {
  apiKey: 'AIzaSyAUBUzRsIYz7MGFCWIlIoMzjl_9IMa4bho',
  authDomain: 'daipos.firebaseapp.com',
  databaseURL: 'https://daipos.firebaseio.com',
  projectId: 'daipos',
  storageBucket: 'daipos.appspot.com',
  messagingSenderId: '949375951452',
}

const STAGING = {
  apiKey: 'AIzaSyCFyv9JBJolPI8yDaG6xtZv2eRFyqyK4XQ',
  authDomain: 'ching-staging.firebaseapp.com',
  databaseURL: 'https://ching-staging.firebaseio.com',
  projectId: 'ching-staging',
  storageBucket: 'ching-staging.appspot.com',
  messagingSenderId: '292907180547',
}

export default (CONFIG.IS_PRODUCTION ? PRODUCTION : STAGING)
