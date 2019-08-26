import * as ReactRedux from 'react-redux'
import PropTypes from 'prop-types'
import selectors from 'redux/selectors'
import SignIn from '..'
import currentUser from '../../../../redux/actions/current-user'

SignIn.propTypes = {
  signIn: PropTypes.func,
  authError: PropTypes.string,
}

const mapStateToProp = state => ({
  authError: selectors.getAuthError(state),
})

const mapDispatchToProps = dispatch => ({
  signIn: credentials => dispatch(currentUser.signInWithEmail(credentials)),
})

export default ReactRedux.connect(
  mapStateToProp,
  mapDispatchToProps
)(SignIn)
