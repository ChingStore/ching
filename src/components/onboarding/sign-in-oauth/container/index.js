import * as ReactRedux from 'react-redux'
import PropTypes from 'prop-types'
import currentUser from 'redux/actions/current-user'
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
  signIn: credentials => dispatch(currentUser.signIn(credentials)),
})

export default ReactRedux.connect(
  mapStateToProp,
  mapDispatchToProps
)(SignIn)
