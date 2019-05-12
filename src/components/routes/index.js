// @flow

import type { IdType } from 'constants/firebase'

import * as React from 'react'
import * as ReactRedux from 'react-redux'
import * as ReactRouter from 'react-router-dom'
import * as Reselect from 'reselect'

import NavBar from 'components/nav-bar'
import Store from 'components/store/container'
import Sales from 'components/sales/container'
import AddEditItem from 'components/add-edit-item/container'
import Payment from 'components/payment'
import Home from 'components/onboarding/home'
import GetWallet from 'components/onboarding/get-wallet'
import Profile from 'components/profile/container'
import SignUp from 'components/onboarding/sign-up/container'
import SignIn from 'components/onboarding/sign-in/container'
import SignInOAuth from 'components/onboarding/sign-in-oauth/container'
import SignUpOAuth from 'components/onboarding/sign-up-oauth/container'
import SignUpStore from 'components/onboarding/sign-up-store/container'
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
          <Route path={ROUTE.PATH.SIGN_IN_OAUTH} component={SignInOAuth} />
          <Route path={ROUTE.PATH.SIGN_UP_OAUTH} component={SignUpOAuth} />
          <Route path={ROUTE.PATH.SIGN_UP} component={SignUp} />
          <Route path={ROUTE.PATH.SIGN_UP_STORE} component={SignUpStore} />

          {/* Payment */}
          <Route
            path="/payment/:address/:amount/:orderId"
            component={Payment}
          />

          {/* Redirect if logged out */}
          {!currentUserId && <Redirect to={ROUTE.PATH.HOME} />}

          {/* No NavBar */}
          <Route exact path={ROUTE.PATH.ADD_ITEM} component={AddEditItem} />
          <Route path={ROUTE.PATH.EDIT_ITEM} component={AddEditItem} />
          <Flex grow column>
            <Route path="/" component={NavBar} />
            <Switch>
              {/* With NavBar */}
              <Route exact path={ROUTE.PATH.STORE} component={Store} />
              <Route exact path={ROUTE.PATH.SALES} component={Sales} />
              <Route exact path={ROUTE.PATH.PROFILE} component={Profile} />
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
