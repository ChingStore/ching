import React, { Component } from 'react'
import * as ReactRedux from 'react-redux'
import authActions from '../../redux/actions/auth'
import PropTypes from 'prop-types'

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    storeName: '',
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }
  handleSubmit = e => {
    e.preventDefault() //  prevent reload of the page
    this.props.signUp(this.state)
  }
  render() {
    const { authError } = this.props
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="text">Sign up</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input
              type="firstName"
              id="firstName"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="storeName">Store Name</label>
            <input type="text" id="storeName" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn">Sign up</button>
            <div className="red-text center">
              {authError ? <p> {authError} </p> : null}
            </div>
          </div>
        </form>
      </div>
    )
  }
}

SignUp.propTypes = {
  signUp: PropTypes.func,
  authError: PropTypes.string,
}

const mapStateToProp = state => ({
  authError: state.auth.authError,
})

const mapDispatchToProp = dispatch => ({
  signUp: newUser => dispatch(authActions.signUp(newUser)),
})

export default ReactRedux.connect(
  mapStateToProp,
  mapDispatchToProp
)(SignUp)
