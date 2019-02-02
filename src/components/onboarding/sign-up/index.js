/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import ROUTE from 'constants/route'
import InputField from 'components/common/input-field'
import LinkButton from 'components/common/link-button'

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

  renderTitle = () => (
    <div css={style.title}>
      <p css={style.title__text}>Create your account.</p>
    </div>
  )

  renderForm = () => (
    <form onSubmit={this.handleSignUp}>
      {this.renderUsernameField()}
      <div css={style.spacer} />
      {this.renderPasswordField()}
      {this.renderContinueButton()}
    </form>
  )

  renderUsernameField = () => (
    <div>
      <InputField
        onChange={this.handleChange}
        id="email"
        placeholder="Enter your e-mail"
        labelText="E-mail"
      />
    </div>
  )

  renderPasswordField = () => (
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

  renderContinueButton = () => (
    <div css={style.button__location}>
      <LinkButton css={style.continue__button} to={ROUTE.PATH.SIGN_UP_STORE}>
        <div css={style.continue__text}>Continue</div>
        <div css={style.continue__circle}>
          <img css={style.vector} src={vectorImg} alt="Continue" />
        </div>
      </LinkButton>
    </div>
  )

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
