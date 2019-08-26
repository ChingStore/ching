import * as ReactRedux from 'react-redux'
import * as Reselect from 'reselect'
import currentUser from 'redux/actions/current-user'
import selectors from 'redux/selectors'
import SignInOAuth from '..'

const mapStateToProps = Reselect.createStructuredSelector({
  userId: selectors.users.currentId,
  storeId: selectors.users.currentStoreId,
})

const mapDispatchToProps = dispatch => ({
  signInWithOAuth: service => dispatch(currentUser.signInWithOAuth(service)),
})

export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInOAuth)
