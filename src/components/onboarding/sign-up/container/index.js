import * as ReactRedux from 'react-redux'
import PropTypes from 'prop-types'
import selectors from 'redux/selectors'
import SignUp from '..'

SignUp.propTypes = {
  signIn: PropTypes.func,
  authError: PropTypes.string,
}

const mapStateToProp = state => ({
  authError: state.auth.authError,
  daiWalletBalance: selectors.getDaiWalletBalance(state),
})

const mapDispatchToProps = dispatch => ({
  signUp: data => {
    console.log('data', data)
    return dispatch
  },
})

export default ReactRedux.connect(
  mapStateToProp,
  mapDispatchToProps
)(SignUp)
