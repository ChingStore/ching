// @flow

import type { IdType } from 'constants/firebase'

import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import * as Reselect from 'reselect'

import NavBar from 'components/nav-bar'
import Store from 'components/store/container'
import SalesReport from 'components/sales-report'
import Add from 'components/add'
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

type OwnPropsType = {||}

type PropsType = {|
  ...OwnPropsType,
  currentUserId: IdType,
|}

class Routes extends React.Component<PropsType> {
  render = () => {
    const { currentUserId } = this.props

    console.log('Render routes', this.props)

    return (
      <Flex grow column relative>
        {currentUserId ? this.renderPrivateRoutes() : this.renderPublicRoutes()}
      </Flex>
    )
  }

  renderPublicRoutes = () => (
    <Switch>
      {/* On-boarding */}
      <Route path={ROUTE.PATH.HOME} component={Home} />
      <Route path={ROUTE.PATH.GET_WALLET} component={GetWallet} />
      <Route path={ROUTE.PATH.SIGN_IN} component={SignIn} />
      <Route path={ROUTE.PATH.SIGN_UP} component={SignUp} />
      <Route path={ROUTE.PATH.SIGN_UP_STORE} component={SignUpStore} />
      <Route path={ROUTE.PATH.STORE_WELCOME} component={StoreWelcome} />
      {/* Payment */}
      <Route path="/payment/:address/:amount/:orderId" component={Payment} />
      {/* Redirect if no match */}
      <Redirect to={ROUTE.PATH.HOME} />
    </Switch>
  )

  renderPrivateRoutes = () => (
    <Flex grow column relative>
      <Route path="/" component={NavBar} />
      <Switch>
        {/* Store */}
        <Route exact path={ROUTE.PATH.STORE} component={Store} />
        <Route exact path={ROUTE.PATH.ADD_ITEM} component={Add} />
        <Route exact path={ROUTE.PATH.EDIT_ITEM} component={Add} />
        {/* Sales */}
        <Route exact path={ROUTE.PATH.SALES} component={SalesReport} />
        {/* Orders */}
        <Route exact path={ROUTE.PATH.ORDERS} component={Orders} />
        {/* Redirect if no match */}
        <Redirect to={ROUTE.PATH.STORE} />
      </Switch>
    </Flex>
  )
}

const mapStateToProps = Reselect.createStructuredSelector({
  currentUserId: selectors.users.currentId,
})

export default ReactRedux.connect<PropsType, OwnPropsType, _, _, _, _>(
  mapStateToProps
)(Routes)
