// @flow

import type { StateType, DispatchType } from 'constants/redux'
import type { FirebaseAuthType } from 'constants/firebase'

/** @jsx jsx */
import { jsx } from '@emotion/core'
import * as React from 'react'
import * as ReactRedux from 'react-redux'
import * as ReactReduxFirebase from 'react-redux-firebase'
import * as ReactRouter from 'react-router-dom'
import * as Redux from 'redux'

import Routes from 'components/routes'
import Flex from 'components/common/flex'
import CONFIG from 'constants/config'
import orderAction from 'redux/actions/order'
import selectors from 'redux/selectors'

import style from './index.style'

type OwnPropsType = {||}

type PropsType = {|
  ...OwnPropsType,
  auth: FirebaseAuthType,
  orderInitialize: () => void,
|}

class Root extends React.Component<PropsType> {
  render() {
    if (!this.isLoaded()) {
      return (
        <Flex grow center>
          Loading Firebase...
        </Flex>
      )
    }

    return (
      <Flex column style={style.base}>
        <ReactRouter.BrowserRouter basename={CONFIG.PUBLIC_URL}>
          <Routes />
        </ReactRouter.BrowserRouter>
      </Flex>
    )
  }

  /////////////////////
  // LIFECYCLE HOOKS //
  /////////////////////

  componentDidMount() {
    this.props.orderInitialize()
  }

  //////////////
  // CHECKERS //
  //////////////

  isLoaded = (): boolean => {
    const { auth } = this.props
    return ReactReduxFirebase.isLoaded(auth)
  }
}

const mapStateToProps = (state: StateType) => ({
  auth: selectors.getAuthState(state),
})

const mapDispatchToProps = (dispatch: DispatchType) => ({
  orderInitialize: () => dispatch(orderAction.initialize()),
})

export default Redux.compose(
  ReactRedux.connect<PropsType, OwnPropsType, _, _, _, _>(
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
