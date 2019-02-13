// @flow

/** @jsx jsx */
import { jsx } from '@emotion/core'
import _ from 'lodash'
import * as React from 'react'
import * as ReactRouter from 'react-router-dom'

import Flex from 'components/common/flex'
import InputField from 'components/common/input-field'
import ActionButton from 'components/common/action-button'
import ROUTE from 'constants/route'
import EditButton from 'components/common/edit-button'

import style from './index.style.js'

export type PropsType = {
  authError: Object,
  css?: Object,
  children?: React.Node,
  email?: string,
  password?: string,
  address?: string,
  signOut: () => Promise<any>,
  handleChange: {},
  onClick: () => void,
  ...ReactRouter.ContextRouter,
}

type StateType = {
  isEditingEmail: boolean,
  isEditingPassword: boolean,
  isEditingAddress: boolean,
  email: string,
  password: string,
  address?: string,
}

class Profile extends React.Component<PropsType, StateType> {
  state = {
    email: 'test@test.com',
    password: 'password',
    address: '0x 1234 4444 4444 ... 4444',
    isEditingAddress: false,
    isEditingPassword: false,
    isEditingEmail: false,
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

  onClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    this.setState({ [e.currentTarget.id]: !e.currentTarget.value })
  }

  ////////////////////
  // RENDER METHODS //
  ////////////////////

  render = () => {
    console.log('Profile props', this.props)

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
        {this.renderEmailField()}
        {this.renderPasswordField()}
        {this.renderWalletAddressField()}
      </Flex>
    )
  }

  renderEmailField = () => {
    const { isEditingEmail } = this.state

    return isEditingEmail ? (
      <Flex css={style.edit}>
        <InputField
          autoFocus
          css={style.inputField}
          onChange={this.handleChange}
          id="email"
          value={this.state.email}
          labelText="E-mail"
        />
        <EditButton id="isEditingEmail" onClick={e => this.onClick(e)} />
      </Flex>
    ) : (
      <Flex css={style.edit}>
        <InputField
          css={style.inputField}
          id="email"
          value={this.getEmail()}
          labelText="E-mail"
          readonly
        />
        <EditButton id="isEditingEmail" onClick={e => this.onClick(e)} />
      </Flex>
    )
  }

  renderPasswordField = () => {
    const { isEditingPassword } = this.state

    return isEditingPassword ? (
      <Flex css={style.edit}>
        <InputField
          autoFocus
          css={style.inputField}
          onChange={this.handleChange}
          id="password"
          value={this.state.password}
          labelText="Password"
          type="password"
        />
        <EditButton id="isEditingPassword" onClick={e => this.onClick(e)} />
      </Flex>
    ) : (
      <Flex css={style.edit}>
        <InputField
          css={style.inputField}
          id="password"
          value={this.getPassword()}
          labelText="Password"
          type="password"
          readonly
        />
        <EditButton id="isEditingPassword" onClick={e => this.onClick(e)} />
      </Flex>
    )
  }

  renderWalletAddressField = () => {
    const { isEditingAddress } = this.state
    return isEditingAddress ? (
      <Flex css={style.edit}>
        <InputField
          autoFocus
          css={style.inputField}
          onChange={this.handleChange}
          id="address"
          value={this.state.address}
          labelText="Ethereum address"
        />
        <EditButton id="isEditingAddress" onClick={e => this.onClick(e)} />
      </Flex>
    ) : (
      <Flex css={style.edit}>
        <InputField
          css={style.inputField}
          id="address"
          value={this.getAddress()}
          labelText="Ethereum address"
          readonly
        />
        <EditButton id="isEditingAddress" onClick={e => this.onClick(e)} />
      </Flex>
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

  /////////////
  // GETTERS //
  /////////////

  getEmail = () => _.get(this.state, 'email')

  getPassword = () => _.get(this.state, 'password')

  getAddress = () => _.get(this.state, 'address')
}

export default Profile
