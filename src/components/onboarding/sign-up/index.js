/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import ROUTE from 'constants/route'
import InputField from 'components/common/input-field'
import NextButton from 'components/common/next-button'

import style from './index.style.js'

export default class SignUp extends React.Component {
  state = {}

  render() {
    const { authError } = this.props
    return (
      <div css={style.base}>
        <p>{authError}</p>
        {this.renderTitle()}
        {this.renderForm()}
      </div>
    )
  }

  renderTitle = () => {
    return (
      <div css={style.title}>
        <p css={style.title__text}>Create your account.</p>
      </div>
    )
  }

  renderForm = () => {
    return (
      <form onSubmit={this.handleSignUp}>
        {this.renderUsernameField()}
        <div css={style.spacer} />
        {this.renderPasswordField()}
        {this.renderContinueButton()}
      </form>
    )
  }

  renderUsernameField = () => {
    return (
      <div>
        <InputField
          autoComplete="username"
          onChange={this.handleChange}
          id="email"
          placeholder="Enter your e-mail"
          labelText="E-mail"
          underline
        />
      </div>
    )
  }

  renderPasswordField = () => {
    return (
      <div>
        <InputField
          autoComplete="new-password"
          onChange={this.handleChange}
          id="password"
          placeholder="Type in your password"
          labelText="Password"
          type="password"
          underline
        />
      </div>
    )
  }

  renderContinueButton = () => {
    return (
      <div onClick={this.handleSignUp} css={style.button__location}>
        <NextButton>Continue</NextButton>
      </div>
    )
  }

  handleSignUp = async () => {
    const { signUp, history } = this.props
    const { email, password } = this.state

    const isSigned = await signUp({ email, password })
    if (isSigned) {
      history.push(ROUTE.PATH.SIGN_UP_STORE)
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }
}
