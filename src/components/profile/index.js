// @flow

/** @jsx jsx */
import { jsx } from '@emotion/core'
import * as React from 'react'
import * as ReactRouter from 'react-router-dom'

import Flex from 'components/common/flex'
import InputField from 'components/common/input-field'
import ActionButton from 'components/common/action-button'
import ROUTE from 'constants/route'
import Icon from 'components/common/icon'

import style from './index.style.js'

export type PropsType = {
  authError: Object,
  css?: Object,
  children?: React.Node,
  email?: string,
  password?: string,
  signOut: () => Promise<any>,
  handleChange: {},
} & ReactRouter.ContextRouter

type StateType = {
  email?: string,
  password?: string,
}

class Profile extends React.Component<PropsType, StateType> {
  state = {
    email: 'test@test.com',
    password: 'password',
  }

  render = () => {
    console.log('Profile props', this.props)
    console.log('TODO : {}')

    console.log('Rendering...')

    const { authError } = this.props
    return (
      <Flex grow>
        <Flex column grow relative css={style.base}>
          <Flex>{authError}</Flex>
          {this.renderTitle()}
          {this.renderCollection()}
          {this.renderLogOut()}
        </Flex>
      </Flex>
    )
  }

  renderTitle = () => {
    return (
      <div css={style.title}>
        <div css={style.title__text}>Profile</div>
      </div>
    )
  }

  renderCollection = () => {
    return (
      <Flex column spaceBetween css={style.collection} key="renderFlex">
        {this.renderUsernameField()}
        {this.renderPasswordField()}
        {this.renderWalletAddressField()}
      </Flex>
    )
  }

  renderUsernameField = () => {
    return (
      <Flex>
        <InputField
          css={style.inputField}
          onChange={this.handleChange}
          id="email"
          placeholder="Enter your e-mail"
          labelText="E-mail"
        />

        <Icon.EditIcon fill="#3ECF8E" />
      </Flex>
    )
  }

  renderPasswordField = () => {
    return (
      <InputField
        css={style.inputField}
        onChange={this.handleChange}
        id="password"
        placeholder="Type in your password"
        labelText="Password"
        type="password"
      />
    )
  }

  renderWalletAddressField = () => {
    return (
      <InputField
        css={style.inputField}
        onChange={this.handleChange}
        id="walletAddress"
        placeholder="0x 1234 4444 4444 ... 4444"
        labelText="Ethereum address"
      />
    )
  }

  renderLogOut = () => {
    return (
      <ActionButton
        css={style.logOut}
        onClick={() => {
          this.handleLogOut()
        }}
      >
        <Flex>Log out</Flex>
      </ActionButton>
    )
  }

  ////////////////////
  // EVENT HANDLERS //
  ////////////////////

  handleLogOut = async () => {
    await this.props.signOut()
    this.props.history.push(ROUTE.PATH.HOME)
  }

  handleChange = (e: SyntheticEvent<HTMLButtonElement>) => {
    this.setState({
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }
}

export default Profile
