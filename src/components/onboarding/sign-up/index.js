/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import InputField from 'components/common/input-field'

import style from './index.style.js'

export default class SignUp extends React.Component {
  state = {}

  render() {
    return (
      <div>
        {this.renderTitle()}
        {this.renderForm()}
      </div>
    )
  }

  renderTitle = () => {
    return (
      <div css={style.title}>
        <p css={style.title__text}>Start accepting payments in DAI.</p>
      </div>
    )
  }

  renderForm = () => {
    return (
      <form onSubmit={this.handleSignUp}>
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
          onChange={e => this.setState({ email: e.target.value })}
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
          onChange={e => this.setState({ password: e.target.value })}
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

  handleSignUp = () => {
    const { signUp } = this.props
    const { username, password } = this.state

    signUp({ username, password })
  }

  // handleChange = ({ username, password }) => {
  //   this.setState({ username, password })
  // }
}
