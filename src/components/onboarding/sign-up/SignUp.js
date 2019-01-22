import React, { Component } from 'react'
import * as ReactRedux from 'react-redux'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'

import authActions from 'redux/actions/auth'

const styles = {
  container: {
    backgroundColor: 'blue',
  },
  createYourAccount: {
    position: 'absolute',
    width: '271px',
    height: '77px',
    left: '40px',
    top: '80px',

    fontFamily: 'Inter UI',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 'normal',
    fontSize: '32px',
    letterSpacing: '-0.02em',

    color: '#333963',
  },
  email: {
    position: 'absolute',
    width: '42px',
    height: '17px',
    left: '40px',
    top: '197px',

    fontFamily: 'Inter UI',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 'normal',
    fontSize: '14px',
    letterSpacing: '-0.02em',

    color: '#333963',
  },
  enterYourEmail: {
    position: 'absolute',
    width: '172px',
    height: '27px',
    left: '39px',
    top: '224px',
    fontFamily: 'Inter UI',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 'normal',
    fontSize: '22px',
    letterSpacing: '-0.02em',
    color: '#C3C4CB',
  },
  line1: {
    position: 'absolute',
    width: '291px',
    height: '0px',
    left: '39px',
    top: '261px',
    border: '1px solid #333963',
  },
  password: {
    position: 'absolute',
    width: '65px',
    height: '17px',
    left: '40px',
    top: '296px',
    fontFamily: 'Inter UI',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 'normal',
    fontSize: '14px',
    letterSpacing: '-0.02em',
    color: '#333963',
  },
  enterYourPassword: {
    position: 'absolute',
    width: '226px',
    height: '27px',
    left: '39px',
    top: '323px',
    fontFamily: 'Inter UI',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 'normal',
    fontSize: '22px',
    letterSpacing: '-0.02em',
    color: '#C3C4CB',
  },
  line2: {
    position: 'absolute',
    width: '291px',
    height: '0px',
    left: '39px',
    top: '360px',
    border: '1px solid #C3C4CB',
  },
  continue: {
    position: 'absolute',
    width: '73px',
    height: '20px',
    left: '190px',
    top: '458px',
    fontFamily: 'Inter UI',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 'normal',
    fontSize: '16px',
    color: '#5EBAA0',
  },
  circle: {
    position: 'absolute',
    width: '48px',
    height: '48px',
    left: '283px',
    top: '444px',
    background: '#5EBAA0',
    borderRadius: '70px',
  },
  vector: {
    position: 'absolute',
    left: '79.2%',
    right: '17.14%',
    top: '57.6%',
    bottom: '40.71%',
    background: '#FFFFFF',
    transform: 'rotate(-45deg)',
  },
}

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
    const { classes } = this.props
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className={classes.createYourAccount}>Create Your Account</h5>
          <div className="input-field">
            <label htmlFor="email" className={classes.email}>
              Email
            </label>
            <input
              className={classes.enterYourEmail}
              type="email"
              id="email"
              onChange={this.handleChange}
            />
            <hr className={classes.line1} />
          </div>

          <div className="input-field">
            <label className={classes.password} htmlFor="password">
              Password
            </label>
            <input
              className={classes.enterYourPassword}
              type="password"
              id="password"
              onChange={this.handleChange}
            />
            <hr className={classes.line2} />
          </div>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input
              type="firstName"
              id="firstName"
              onChange={this.handleChange}
            />
          </div>

          <div className={classes.container}>
            <label className={classes.continue}>Continue</label>
            <button className={classes.circle}>
              <div className={classes.vector}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.6775 10.3995L13.0207 16.0563L11.6065 14.6421L15.5563 10.6922L0.999849 10.6922V8.69253L15.5563 8.69253L11.6065 4.74264L13.0207 3.32842L18.6775 8.98528C19.0678 9.3756 19.0678 10.0092 18.6775 10.3995Z"
                    fill="black"
                  />
                </svg>
              </div>
            </button>
            <div className="red-text center">
              {authError ? <p> {authError} </p> : null}
            </div>
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

export default compose(
  withStyles(styles),
  ReactRedux.connect(
    mapStateToProp,
    mapDispatchToProp
  )
)(SignUp)
