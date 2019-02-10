// @flow

import type { DispatchType } from 'constants/redux'

import * as ReactRedux from 'react-redux'
import * as Reselect from 'reselect'

import selectors from 'redux/selectors'
import authActions from 'redux/actions/auth'

import Profile from '../index'

const mapStateToProp = Reselect.createStructuredSelector({
  authError: selectors.getAuthError,
})

const mapDispatchToProps = (dispatch: DispatchType) => ({
  signOut: () => dispatch(authActions.signOut()),
})

// $FlowFixMe
export default ReactRedux.connect(
  mapStateToProp,
  mapDispatchToProps
)(Profile)
