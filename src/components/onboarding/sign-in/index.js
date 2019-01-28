/** @jsx jsx */
import { jsx } from '@emotion/core'

import React from 'react'
import * as ReactRedux from 'react-redux'
import PropTypes from 'prop-types'
import InputField from 'components/common/input-field'
import authActions from 'redux/actions/auth'
import style from './index.style.js'

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
  handleSignIn = e => {
    e.preventDefault() //  prevent reload of the page
    this.props.signIn(this.state)
  }

  renderBackLink() {
    return <div css={style.backArrow}>back</div>
  }

  renderTitle() {
    return (
      <div css={style.title}>
        <p css={style.title__text}>It's nice to have you back!</p>
      </div>
    )
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSignIn}>
        {this.renderUsernameField()}
        {this.renderPasswordField()}
        {this.renderContinueButton()}
      </form>
    )
  }
  renderUsernameField = () => {
    return (
      <div>
        <InputField
          onChange={this.handleChange}
          id="email"
          placeholder="Enter your e-mail"
          labelText="Email"
        />
      </div>
    )
  }

  renderPasswordField = () => {
    return (
      <div>
        <InputField
          onChange={this.handleChange}
          id="password"
          placeholder="Type in your password"
          labelText="Password"
          type="password"
        />
      </div>
    )
  }

  renderContinueButton = () => {
    return (
      <div>
        <button>Continue</button>
      </div>
    )
  }

  render() {
    const { authError } = this.props

    return (
      <div css={style.base}>
        {this.renderBackLink()}
        {this.renderTitle()}
        {this.renderForm()}
      </div>
    )
  }
}

SignIn.propTypes = {
  signIn: PropTypes.func,
  authError: PropTypes.string,
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
