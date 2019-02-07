/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import ROUTE from 'constants/route'
import LinkButton from 'components/common/link-button'
import NextButton from 'components/common/next-button'
import InputField from 'components/common/input-field'

import style from './index.style.js'

export default class SignUp extends React.Component {
  state = {}

  render() {
    const { shopError } = this.props
    return (
      <div css={style.base}>
        <p>{shopError}</p>
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
        {this.renderWalletAddressField()}
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
          underline
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
          underline
        />
      </div>
    )
  }

  renderHelpLink = () => {
    return (
      <div css={style.helpLink_wrapper}>
        <LinkButton css={style.helpLink_button} to={ROUTE.PATH.NEED_WALLET}>
          <div css={style.helpLink_text}>What is it?</div>
        </LinkButton>
      </div>
    )
  }

  renderContinueButton = () => {
    return (
      <div css={style.button__location}>
        <NextButton onClick={this.handleSignUp}>Continue</NextButton>
      </div>
    )
  }

  handleSignUp = async () => {
    const { signUpStore, history } = this.props
    const { storeName, walletAddress } = this.state

    const isStoreCreated = await signUpStore({ storeName, walletAddress })
    if (isStoreCreated) {
      history.push(ROUTE.PATH.STORE_WELCOME)
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }
}
