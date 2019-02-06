// @flow

/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import ROUTE from 'constants/route'
import InputField from 'components/common/input-field'

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
        <p css={style.title__text}>Profile</p>
      </div>
    )
  }

  renderForm = () => {
    return (
      <form onSubmit={this.handleSignUp}>
        {this.renderUsernameField()}
        <div css={style.spacer} />
        {this.renderPasswordField()}
        <div css={style.spacer} />
        {this.renderWalletAddressField()}
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
          labelText="E-mail"
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

  renderWalletAddressField = () => {
    return (
      <div>
        <InputField
          onChange={this.handleChange}
          id="walletAddress"
          placeholder="0x 1234 4444 4444 ... 4444"
          labelText="Ethereum address"
        />
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
