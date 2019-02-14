// @flow

import type { IdType } from 'constants/firebase'
import type { DispatchType } from 'constants/redux'

import * as ReactRedux from 'react-redux'
import * as ReactRouter from 'react-router'
import * as Reselect from 'reselect'

import selectors from 'redux/selectors'
import authActions from 'redux/actions/auth'
import walletActions from 'redux/actions/wallet'

import * as Profile from '../index'

type OwnPropsType = ReactRouter.ContextRouter

const mapStateToProp = Reselect.createStructuredSelector({
  authError: selectors.getAuthError,
  email: selectors.users.current,
  walletAddress: selectors.wallet.address,
  storeId: selectors.users.currentStoreId,
})

const mapDispatchToProps = (dispatch: DispatchType) => ({
  signOut: () => dispatch(authActions.signOut()),
  onUpdateAddress: async ({
    walletAddress,
    storeId,
  }: {
    walletAddress: string,
    storeId: IdType,
  }) => {
    const data = { walletAddress }
    dispatch(walletActions.updateWalletAddress({ storeId, data }))
  },
})

export default ReactRedux.connect<Profile.PropsType, OwnPropsType, _, _, _, _>(
  mapStateToProp,
  mapDispatchToProps
)(Profile.default)
