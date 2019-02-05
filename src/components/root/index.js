/** @jsx jsx */
import { jsx } from '@emotion/core'
import * as React from 'react'
import * as ReactRedux from 'react-redux'
import * as ReactReduxFirebase from 'react-redux-firebase'
import * as Redux from 'redux'
import { Route, HashRouter, Switch } from 'react-router-dom'

import NavBar from 'components/nav-bar'
import Inventory from 'components/inventory'
import SalesReport from 'components/sales-report'
import Add from 'components/add/container'
import Payment from 'components/payment'
import Home from 'components/onboarding/home'
import NeedWallet from 'components/onboarding/need-wallet'
import SignUp from 'components/onboarding/sign-up/container'
import SignIn from 'components/onboarding/sign-in/container'
import SignUpStore from 'components/onboarding/sign-up-store/container'
import StoreWelcome from 'components/store/store-welcome'
import Orders from 'components/orders'
import CONFIG from 'constants/config'
import ROUTE from 'constants/route'
import orderAction from 'redux/actions/order'
import selectors from 'redux/selectors'
import Flex from 'components/common/flex'

import style from './index.style'

class Root extends React.Component {
  componentDidMount() {
    this.props.orderInitialize()
  }

  render() {
    return (
      <HashRouter basename={CONFIG.PUBLIC_URL} id={110}>
        <Flex column style={style.base}>
          <Route exact path={ROUTE.PATH.HOME} component={Home} id={114} />
          <Route
            exact
            path={ROUTE.PATH.NEED_WALLET}
            component={NeedWallet}
            id={119}
          />
          <Route exact path={ROUTE.PATH.SIGN_UP} component={SignUp} id={115} />
          <Route exact path={ROUTE.PATH.SIGN_IN} component={SignIn} id={114} />
          <Route
            exact
            path={ROUTE.PATH.SIGN_UP_STORE}
            component={SignUpStore}
            id={117}
          />
          <Route
            exact
            path={ROUTE.PATH.STORE_WELCOME}
            component={StoreWelcome}
            id={118}
          />
          <Route exact path={ROUTE.PATH.ADD} component={Add} id={107} />
          <Route path={ROUTE.PATH.TABS} component={NavBar} id={116} />
          <Flex column auto>
            <Route exact path={ROUTE.PATH.HOME} component={Home} id={114} />
            <Switch id={109}>
              <Route
                exact
                path={ROUTE.PATH.STORE}
                component={Inventory}
                id={105}
              />
              <Route
                exact
                path={ROUTE.PATH.SALES}
                component={SalesReport}
                id={106}
              />

              <Route exact path={ROUTE.PATH.EDIT} component={Add} id={121} />
              <Route
                path="/payment/:address/:amount/:orderId"
                component={Payment}
                id={108}
              />
              <Route
                exact
                path={ROUTE.PATH.ORDERS}
                component={Orders}
                id={113}
              />
            </Switch>
          </Flex>
        </Flex>
      </HashRouter>
    )
  }
}

const mapStateToProps = state => ({
  auth: selectors.getAuthState(state),
})

const mapDispatchToProps = dispatch => ({
  orderInitialize: () => dispatch(orderAction.initialize()),
})

export default Redux.compose(
  ReactRedux.connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  ReactReduxFirebase.firestoreConnect(props => {
    if (!props.auth || !props.auth.uid) return []
    return [
      {
        collection: 'items',
        where: [['userId', '==', props.auth.uid]],
      },
      {
        collection: 'orders',
        orderBy: ['createdAt', 'desc'],
        where: [['userId', '==', props.auth.uid]],
      },
      {
        collection: 'users',
      },
      {
        collection: 'stores',
      },
    ]
  })
)(Root)
