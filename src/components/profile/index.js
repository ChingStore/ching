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
  signOut: () => Promise<any>,
  handleChange: {},
} & ReactRouter.ContextRouter

type StateType = {
  isEditingUsername: boolean,
  isEditingPassword: boolean,
  isEditingAddress: boolean,
  email?: string,
  password?: string,
}

class Profile extends React.Component<PropsType, StateType> {
  state = {
    email: 'test@test.com',
    password: 'password',
    address: '0x 1234 4444 4444 ... 4444',
    isEditingAddress: false,
    isEditingPassword: false,
    isEditingUsername: false,
  }

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
        <EditButton
          onClick={() => {
            this.setState({ isEditingEmail: false })
          }}
        />
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
        <EditButton
          onClick={() => {
            this.setState({ isEditingEmail: true })
          }}
        />
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
        <EditButton
          onClick={() => {
            this.setState({ isEditingPassword: false })
          }}
        />
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
        <EditButton
          onClick={() => {
            this.setState({ isEditingPassword: true })
          }}
        />
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
        <EditButton
          onClick={() => {
            this.setState({ isEditingAddress: false })
          }}
        />
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
        <EditButton
          onClick={() => {
            this.setState({ isEditingAddress: true })
          }}
        />
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

  /////////////
  // GETTERS //
  /////////////

  getEmail = () => _.get(this.state, 'email')

  getPassword = () => _.get(this.state, 'password')

  getAddress = () => _.get(this.state, 'address')
}

export default Profile
