import * as ReactRedux from 'react-redux'
import selectors from 'redux/selectors'
import authActions from 'redux/actions/auth'
import SignUp from '..'

const mapStateToProp = state => ({
  authError: selectors.getAuthError(state),
})

const mapDispatchToProps = dispatch => ({
  signUp: credentials => dispatch(authActions.signUp(credentials)),
})

export default ReactRedux.connect(
  mapStateToProp,
  mapDispatchToProps
)(SignUp)
