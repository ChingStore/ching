/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import InputField from 'components/common/input-field'

import style from './index.style.js'
import vectorImg from './Vector.png'

export default class SignUp extends React.Component {
  state = {}

  render() {
    return (
      <div css={style.base}>
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

  renderContinueButton = () => {
    return (
      <div css={style.button__location}>
        <button css={style.continue__button}>
          <div css={style.contnue__text}>Continue</div>
          <div css={style.continue__circle}>
            <img css={style.vector} src={vectorImg} alt="" />
          </div>
        </button>
      </div>
    )
  }

  handleSignUp = () => {
    const { signUp } = this.props
    const { email, password } = this.state

    signUp({ email, password })
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }
}
