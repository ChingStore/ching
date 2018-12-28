import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import SignUpButton from '../SignUpButtonLink.js'
// import authenticationAction from "../../redux/actions/authentication";
// import * as Redux from "redux";
// import * as ReactRedux from "react-redux";
// import classNames from "classnames";
// import PropTypes from "prop-types";

// let _email, _password

// const SignIn = ({
//   email = '',
//   password = '',
//   onChange = f => f,
//   signIn = f => f,
//   router,
// }) => {

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  submit = e => {
    e.preventDefault()
    this.props.signIn({
      email: this.state.email,
      password: this.state.password,
    })
    console.log('Should have been sent to store: <this.state>')
  }
  render() {
    // refactor ^^^
    return (
      <div className="container">
        <form onSubmit={this.submit} className="white">
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
          </div>
          <div>
            {`Don't have an account?`}
            <SignUpButton />
          </div>
        </form>
      </div>
    )
    // refactor VVV
  }
}

SignIn.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  onChange: PropTypes.func,
  signIn: PropTypes.func,
  router: PropTypes.object,
}

export default SignIn
