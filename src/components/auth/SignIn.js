import React, { Component } from 'react'
import * as ReactRedux from 'react-redux'
import { signIn } from '../../redux/actions/auth'

class SignIn extends Component {
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
            <div className="red-text center" />
            {authError ? <p> Login Failed! </p> : null}
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProp = state => {
  return {
    authError: state.auth.authError,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: credentials => dispatch(signIn(credentials)),
  }
}

export default ReactRedux.connect(
  mapStateToProp,
  mapDispatchToProps
)(SignIn)
