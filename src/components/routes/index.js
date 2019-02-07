// @flow

import type { IdType } from 'constants/firebase'

import * as React from 'react'
import * as ReactRedux from 'react-redux'
import * as ReactRouter from 'react-router-dom'
import * as Reselect from 'reselect'

import NavBar from 'components/nav-bar'
import Store from 'components/store/container'
import Sales from 'components/sales'
import Add from 'components/add/container'
import Payment from 'components/payment'
import Home from 'components/onboarding/home'
import GetWallet from 'components/onboarding/get-wallet'
import SignUp from 'components/onboarding/sign-up/container'
import SignIn from 'components/onboarding/sign-in/container'
import SignUpStore from 'components/onboarding/sign-up-store/container'
import StoreWelcome from 'components/onboarding/store-welcome'
import Orders from 'components/orders'
import ROUTE from 'constants/route'
import Flex from 'components/common/flex'
import selectors from 'redux/selectors'

const { Redirect, Route, Switch } = ReactRouter

type OwnPropsType = {|
  location: ReactRouter.Location,
|}

type PropsType = {|
  ...OwnPropsType,
  currentUserId: IdType,
|}

class Routes extends React.Component<PropsType> {
  render = () => {
    const { currentUserId } = this.props

    return (
      <Flex grow column relative>
        <Switch>
          {/* On-boarding */}
          <Route path={ROUTE.PATH.HOME} component={Home} />
          <Route path={ROUTE.PATH.GET_WALLET} component={GetWallet} />
          <Route path={ROUTE.PATH.SIGN_IN} component={SignIn} />
          <Route path={ROUTE.PATH.SIGN_UP} component={SignUp} />
          <Route path={ROUTE.PATH.SIGN_UP_STORE} component={SignUpStore} />
          <Route path={ROUTE.PATH.STORE_WELCOME} component={StoreWelcome} />
          {/* Payment */}
          <Route
            path="/payment/:address/:amount/:orderId"
            component={Payment}
          />

          {/* Redirect if logged out */}
          {!currentUserId && <Redirect to={ROUTE.PATH.HOME} />}

          {/* No NavBar */}
          <Route exact path={ROUTE.PATH.ADD_ITEM} component={Add} />
          <Route exact path={ROUTE.PATH.EDIT_ITEM} component={Add} />
          <Flex grow column>
            <Route path="/" component={NavBar} />
            <Switch>
              {/* With NavBar */}
              <Route exact path={ROUTE.PATH.STORE} component={Store} />
              <Route exact path={ROUTE.PATH.SALES} component={Sales} />
              <Route exact path={ROUTE.PATH.ORDERS} component={Orders} />
              {/* Redirect if no match */}
              <Redirect to={ROUTE.PATH.STORE} />
            </Switch>
          </Flex>
        </Switch>
      </Flex>
    )
  }
}

const mapStateToProps = Reselect.createStructuredSelector({
  currentUserId: selectors.users.currentId,
})

export default ReactRedux.connect<PropsType, OwnPropsType, _, _, _, _>(
  mapStateToProps
)(Routes)
