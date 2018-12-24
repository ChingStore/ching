import React, { Component } from "react";
import SignUpButton from "./SignUpButtonLink.js";
import authenticationAction from "../../redux/actions/authentication";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault(); //  prevent reload of the page
    // @dev experimenting to pass login data to store
    // this.props.dispatch(authenticationAction.signIn());
    console.log(this.state);
  };

  render() {
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
          </div>
          <div>
            Don't have an account?
            <SignUpButton />
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
