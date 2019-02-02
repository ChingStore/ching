/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import ROUTE from 'constants/route'
import InputField from 'components/common/input-field'
import NextButton from 'components/common/next-button'
import BackButton from 'components/common/back-button'
import LinkButton from 'components/common/link-button'
import style from './index.style.js'

export default class SignIn extends React.Component {
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

  renderTitle() {
    return (
      <div css={style.title}>
        <p css={style.title__text}>{`It's nice to have you back!`}</p>
      </div>
    )
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSignIn}>
        {this.renderUsernameField()}
        {this.renderPasswordField()}
        {this.renderForgot()}
        {this.renderContinueButton()}
      </form>
    )
  }
  renderUsernameField = () => {
    return (
      <div css={style.inputField}>
        <InputField
          onChange={this.handleChange}
          id="email"
          placeholder="E-mail"
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
          placeholder="Password"
          type="password"
        />
      </div>
    )
  }

  renderForgot = () => {
    return (
      <div css={style.forgot}>
        <LinkButton to={ROUTE.PATH.HOME}>
          <div css={style.forgot__text}>{'Forgot?'}</div>
        </LinkButton>
      </div>
    )
  }

  renderContinueButton = () => {
    return (
      <div css={style.NextButton__location}>
        <NextButton to={ROUTE.PATH.INVENTORY}>Continue</NextButton>
      </div>
    )
  }

  render() {
    const { authError } = this.props
    // return 0
    return (
      <div css={style.base}>
        <p>{authError}</p>
        <BackButton />
        {this.renderTitle()}
        {this.renderForm()}
      </div>
    )
  }
}
