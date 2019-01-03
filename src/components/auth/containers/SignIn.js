import SignInUI from '../ui/SignIn'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { signIn } from '../../../redux/actions/authentication'

const mapStateToProps = (state, props) => ({
  email: state.email,
  password: state.password,
  authenticated: state.authenticated,
  router: props.router,
})

const mapDispatchToProps = dispatch => ({
  signIn({ email, password }) {
    dispatch(signIn(email, password))
  },
  // does onChange go here?
})

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInUI)

export default withRouter(Container)
