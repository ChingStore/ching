/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import ROUTE from 'constants/route'
import LinkButton from 'components/common/link-button'
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
        <p css={style.title__text}>Set up your store.</p>
      </div>
    )
  }

  renderForm = () => {
    return (
      <form onSubmit={this.handleSignUp}>
        {this.renderUsernameField()}
        <div css={style.spacer} />
        {this.renderPasswordField()}
        {this.renderHelpLink()}
        {this.renderContinueButton()}
      </form>
    )
  }

  renderUsernameField = () => {
    return (
      <div>
        <InputField
          onChange={this.handleChange}
          id="storeName"
          placeholder="MyStore"
          labelText="Name"
        />
      </div>
    )
  }

  renderPasswordField = () => {
    return (
      <div>
        <InputField
          onChange={this.handleChange}
          id="ethereumAddress"
          placeholder="0x 1234 4444 4444 ... 4444"
          labelText="Ethereum address"
        />
      </div>
    )
  }

  renderHelpLink = () => {
    return (
      <div css={style.help__link__location}>
        <button css={style.help__link__button}>
          <div css={style.help__link__text}>What is it?</div>
        </button>
      </div>
    )
  }

  renderContinueButton = () => {
    return (
      <div css={style.button__location}>
        <LinkButton css={style.continue__button} to={ROUTE.PATH.STORE_WELCOME}>
          <div css={style.continue__text}>Continue</div>
          <div css={style.continue__circle}>
            <img css={style.vector} src={vectorImg} alt="" />
          </div>
        </LinkButton>
      </div>
    )
  }

  handleSignUp = () => {
    const { signUpStore } = this.props
    const { storeName, ethereumAddress } = this.state

    signUpStore({ storeName, ethereumAddress })
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }
}
