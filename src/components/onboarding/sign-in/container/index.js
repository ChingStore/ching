import * as ReactRedux from 'react-redux'
import PropTypes from 'prop-types'
import authActions from 'redux/actions/auth'
import selectors from 'redux/selectors'
import SignIn from '..'

SignIn.propTypes = {
  signIn: PropTypes.func,
  authError: PropTypes.string,
}

const mapStateToProp = state => ({
  authError: selectors.getAuthError(state),
})

const mapDispatchToProps = dispatch => ({
  signIn: credentials => dispatch(authActions.signIn(credentials)),
})

export default ReactRedux.connect(
  mapStateToProp,
  mapDispatchToProps
)(SignIn)
