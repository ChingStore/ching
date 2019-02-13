// @flow

import type { IdType } from 'constants/firebase'

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
import STYLE from 'constants/style'

import style from './index.style.js'

export type PropsType = {
  authError: Object,
  css?: Object,
  children?: React.Node,
  storeId: IdType,
  password?: string,
  walletAddress?: string,
  signOut: () => Promise<any>,
  handleChange: {},
  onClick: () => void,
  onUpdateAddress: ({ walletAddress: string, storeId: IdType }) => void,
  ...ReactRouter.ContextRouter,
}

type StateType = {
  isEditingEmail: boolean,
  isEditingPassword: boolean,
  isEditingAddress: boolean,
}

class Profile extends React.Component<PropsType, StateType> {
  state = {
    isEditingAddress: false,
    isEditingPassword: false,
    isEditingEmail: false,
  }

  //////////////////////
  // LIFECYCLE EVENTS //
  //////////////////////

  componentDidUpdate() {
    console.log('state.isEditingAddress: ', this.state.isEditingAddress)
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
    const eventId = e.currentTarget.id
    this.setState(prevState => {
      return { [eventId]: !prevState[eventId] }
    })
  }

  handleUpdateAddress = (e: SyntheticEvent<HTMLButtonElement>) => {
    const { storeId, walletAddress } = this.props

    this.onClick(e)

    console.log('storeId', storeId)
    console.log('walletAddress', walletAddress)
  }

  /////////////
  // GETTERS //
  /////////////

  getEmail = () => _.get(this.state, 'email')

  getPassword = () => _.get(this.state, 'password')

  getWalletAddress = () => {
    _.get(this.props, 'walletAddress')
    console.log('getWalletAddress Fired!', this.props)
  }

  ////////////////////
  // RENDER METHODS //
  ////////////////////

  render = () => {
    console.log('Profile props', this.props)

    const { authError } = this.props
    return (
      <Flex grow>
        <Flex>{authError}</Flex>
        <Flex column grow relative css={style.base}>
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
        {/* {this.renderEmailField()}
        {this.renderPasswordField()}*/}
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
          value="?{this.state.email}"
          labeltext="E-mail"
        />
        <EditButton id="isEditingEmail" onClick={e => this.onClick(e)} />
      </Flex>
    ) : (
      <Flex css={style.edit}>
        <InputField
          css={style.inputField}
          id="email"
          value={this.getEmail()}
          labeltext="E-mail"
          readOnly
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
          value="?{this.state.password}"
          labeltext="Password"
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
          labeltext="Password"
          type="password"
          readOnly
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
          defaultValue={this.props.walletAddress}
          labeltext="Ethereum address"
        />
        <EditButton
          css={style.edit_button}
          id="isEditingAddress"
          fill={STYLE.COLOR.RED}
          onClick={e => this.handleUpdateAddress(e)}
        />
      </Flex>
    ) : (
      <Flex css={style.edit}>
        <InputField
          css={style.inputField}
          id="address"
          value={this.getWalletAddress()}
          labeltext="Ethereum Address"
          readOnly
        />
        <EditButton
          css={style.edit_button}
          id="isEditingAddress"
          fill={STYLE.COLOR.GREEN}
          onClick={e => this.onClick(e)}
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
}

export default Profile
