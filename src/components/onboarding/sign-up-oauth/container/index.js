import * as ReactRedux from 'react-redux'
import * as Reselect from 'reselect'
import PropTypes from 'prop-types'
import authActions from 'redux/actions/auth'
import selectors from 'redux/selectors'
import SignInOAuth from '..'

SignInOAuth.propTypes = {
  signInWithOAuth: PropTypes.func,
  authError: PropTypes.string,
}

const mapStateToProps = Reselect.createStructuredSelector({
  userId: selectors.users.currentId,
  storeId: selectors.users.currentStoreId,
})

const mapDispatchToProps = dispatch => ({
  signInWithOAuth: service => dispatch(authActions.signInWithOAuth(service)),
})

export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInOAuth)
