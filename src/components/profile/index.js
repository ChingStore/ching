// @flow

/** @jsx jsx */
import { jsx } from '@emotion/core'
import * as React from 'react'
import * as ReactRouter from 'react-router-dom'

import ROUTE from 'constants/route'
import InputField from 'components/common/input-field'

import style from './index.style.js'

export type ProfilePropsType = {
  authError?: Object,
  css?: Object,
  children?: React.Node,
  history?: ReactRouter.ContextRouter,
  email?: string,
  password?: string,
  signUp: ({}) => boolean,
  handleChange: {},
}

type StateType = {
  email?: string,
  password?: string,
}

export default class Profile extends React.Component<
  ProfilePropsType,
  StateType
> {
  state = {
    email: 'test@test.com',
    password: 'password',
  }

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
    const { signUp, history }: ProfilePropsType = this.props
    const { email, password } = this.state

    const isSigned = await signUp({ email, password })
    if (isSigned) {
      // $FlowFixMe Cannot call history.push because property push is missing in undefined [1].
      history.push(ROUTE.PATH.SIGN_UP_STORE)
    }
  }

  handleChange = (e: SyntheticEvent<HTMLButtonElement>) => {
    this.setState({
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }
}
