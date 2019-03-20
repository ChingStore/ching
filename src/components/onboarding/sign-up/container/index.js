import * as ReactRedux from 'react-redux'
import PropTypes from 'prop-types'
import selectors from 'redux/selectors'
import currentUserAction from 'redux/actions/current-user'
import SignUp from '..'

SignUp.propTypes = {
  signUp: PropTypes.func,
  authError: PropTypes.string,
}

const mapStateToProp = state => ({
  authError: selectors.getAuthError(state),
})

const mapDispatchToProps = dispatch => ({
  signUp: credentials => dispatch(currentUserAction.signUp(credentials)),
})

export default ReactRedux.connect(
  mapStateToProp,
  mapDispatchToProps
)(SignUp)
