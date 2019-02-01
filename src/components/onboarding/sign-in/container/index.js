import * as ReactRedux from 'react-redux'
import SignIn from '..'
import PropTypes from 'prop-types'
import authActions from 'redux/actions/auth'

SignIn.propTypes = {
  signIn: PropTypes.func,
  authError: PropTypes.string,
}

const mapStateToProp = state => ({
  authError: state.auth.authError,
})

const mapDispatchToProps = dispatch => ({
  signIn: credentials => dispatch(authActions.signIn(credentials)),
})

export default ReactRedux.connect(
  mapStateToProp,
  mapDispatchToProps
)(SignIn)
