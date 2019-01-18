import * as React from 'react'
import * as ReactRedux from 'react-redux'
import * as ReactReduxFirebase from 'react-redux-firebase'
import * as Redux from 'redux'
import { Route, HashRouter, Switch } from 'react-router-dom'

import MenuAppBar from './components/menu-app-bar'
import Inventory from './components/inventory'
import SalesReport from './components/sales-report'
import Add from './components/add'
import Payment from './components/payment'

import CONFIG from './constants/config'
import ROUTE from './constants/route'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Orders from './components/orders'

import selectors from './redux/selectors'

const styles = {
  backgroundColor: 'cornflowerblue',
}

class Root extends React.Component {
  render() {
    return (
      <div className="App" style={styles}>
        <HashRouter basename={CONFIG.PUBLIC_URL} id={110}>
          <div id={'a'}>
            <MenuAppBar id={98} />
            <Switch id={109}>
              <Route
                exact
                path={ROUTE.PATH.INVENTORY}
                component={Inventory}
                id={105}
              />
              <Route
                exact
                path={ROUTE.PATH.SALES_REPORT}
                component={SalesReport}
                id={106}
              />
              <Route exact path={ROUTE.PATH.ADD} component={Add} id={107} />
              <Route exact path={ROUTE.PATH.EDIT} component={Add} id={121} />
              <Route
                path="/payment/:address/:amount/:orderId"
                component={Payment}
                id={108}
              />
              <Route
                exact
                path={ROUTE.PATH.SIGNIN}
                component={SignIn}
                id={111}
              />
              <Route
                exact
                path={ROUTE.PATH.SIGNUP}
                component={SignUp}
                id={112}
              />
              <Route
                exact
                path={ROUTE.PATH.ORDERS}
                component={Orders}
                id={113}
              />
            </Switch>
          </div>
        </HashRouter>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: selectors.getAuthState(state),
  items: selectors.getItemsState(state),
  orders: selectors.getOrders(state),
})

export default Redux.compose(
  ReactRedux.connect(mapStateToProps),
  ReactReduxFirebase.firestoreConnect(props => {
    if (!props.auth || !props.auth.uid) return []
    return [
      {
        collection: 'items',
        where: [['userId', '==', props.auth.uid]],
      },
    ]
  }),
  ReactReduxFirebase.firestoreConnect(props => {
    // TODO: Research possible performance issues for old accounts with lots of transactions
    if (!props.auth || !props.auth.uid) return []
    return [
      {
        collection: 'orders',
        orderBy: ['createdAt', 'desc'],
        where: [['userId', '==', props.auth.uid]],
      },
    ]
  })
)(Root)
