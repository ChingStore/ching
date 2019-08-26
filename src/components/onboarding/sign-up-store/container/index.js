import * as ReactRedux from 'react-redux'
import shopAction from 'redux/actions/shop'
import selectors from 'redux/selectors'
import SignUp from '..'

const mapStateToProp = state => ({
  shopError: selectors.getShopError(state),
})

const mapDispatchToProps = dispatch => ({
  signUpStore: data => dispatch(shopAction.create(data)),
})

export default ReactRedux.connect(
  mapStateToProp,
  mapDispatchToProps
)(SignUp)
