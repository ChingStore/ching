import React from 'react'
import * as ReactRedux from 'react-redux'
import authActions from '../../redux/actions/auth'

const loginStatus = {
  backgroundColor: 'red',
  color: 'white',
  textAlignLast: 'center',
}

class SignIn extends React.Component {
  state = {
    email: '',
    password: '',
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }
  handleSubmit = e => {
    e.preventDefault() //  prevent reload of the page
    this.props.signIn(this.state)
  }
  render() {
    const { authError } = this.props
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="text">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn">Login</button>
            <div className="red-text center loginStatus">
              {authError ? <p style={loginStatus}> Login Failed! </p> : null}
            </div>
          </div>
        </form>
      </div>
    )
  }
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
