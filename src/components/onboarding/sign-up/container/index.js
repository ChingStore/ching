import SignUp from '..'
import * as ReactRedux from 'react-redux'

const mapDispatchToProps = dispatch => ({
  signUp: (name, password) => {},
})

export default ReactRedux.connect(
  null,
  mapDispatchToProps
)(SignUp)
