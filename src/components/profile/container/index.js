import * as ReactRedux from 'react-redux'
import PropTypes from 'prop-types'
import selectors from 'redux/selectors'
import authActions from 'redux/actions/auth'
import Profile from '..'

Profile.propTypes = {
  signOut: PropTypes.func,
  authError: PropTypes.string,
}

const mapStateToProp = state => ({
  authError: selectors.getAuthError(state),
})

const mapDispatchToProps = dispatch => ({
  signOut: dispatch(authActions.signOut()),
})

export default ReactRedux.connect(
  mapStateToProp,
  mapDispatchToProps
)(Profile)
