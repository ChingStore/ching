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

const ethUtil = require('ethereumjs-util')

export type PropsType = {
  authError: Object,
  css?: Object,
  children?: React.Node,
  storeId: IdType,
  store: Object,
  storeName: string,
  password?: string,
  walletAddress: string,
  signOut: () => Promise<any>,
  handleChange: {},
  onClick: () => void,
  onUpdateAddress: ({
    walletAddress: string,
    storeName: string,
    storeId: IdType,
  }) => void,
  ...ReactRouter.ContextRouter,
}

type StateType = {
  isEditingEmail: boolean,
  isEditingPassword: boolean,
  isEditingAddress: boolean,
  addressField: string,
}

class Profile extends React.Component<PropsType, StateType> {
  state = {
    isEditingAddress: false,
    isEditingPassword: false,
    isEditingEmail: false,
    addressField: this.props.walletAddress,
  }

  //////////////////////
  // LIFECYCLE EVENTS //
  //////////////////////

  componentDidMount() {
    const addressField = this.getWalletAddress()
    // debugger
    console.log('componentWillMount_addressField: ', addressField)
    this.setState({ addressField })
  }

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
    e.preventDefault()

    if (!e.currentTarget.value) {
      return
    }

    this.setState(
      {
        addressField: e.currentTarget.value,
      },
      () => {
        console.log('this.state:', this.state)
      }
    )
  }

  onClickEditAddress = (e: SyntheticEvent<HTMLButtonElement>) => {
    const eventId = e.currentTarget.id
    this.setState(prevState => {
      return {
        [eventId]: !prevState[eventId],
        addressField: this.props.store.walletAddress,
      }
    })
  }

  onClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    const eventId = e.currentTarget.id
    this.setState(prevState => {
      return {
        [eventId]: !prevState[eventId],
      }
    })
  }

  handleUpdateAddress = async () => {
    // console.log('this.state:', this.state)
    if (!this.state.addressField) {
      await this.props.onUpdateAddress({
        walletAddress: this.props.store.walletAddress,
        storeId: this.props.storeId,
        storeName: this.props.store.storeName,
      })
    }
    if (!ethUtil.isValidAddress(this.state.addressField)) {
      alert('The address entered is invalid')
      return
    }

    await this.props.onUpdateAddress({
      walletAddress: this.state.addressField,
      storeId: this.props.storeId,
      storeName: this.props.store.storeName,
    })

    this.setState({ isEditingAddress: false })
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
          onChange={e => this.handleChange(e)}
          id="addressField"
          value={this.state.addressField}
          labelText="Ethereum Address"
        />
        <EditButton
          css={style.edit_button}
          id="isEditingAddress"
          fill={STYLE.COLOR.RED}
          onClick={() => this.handleUpdateAddress()}
        />
      </Flex>
    ) : (
      <Flex css={style.edit}>
        <InputField
          css={style.inputField}
          id="addressField"
          value={
            !this.state.addressField
              ? this.props.walletAddress
              : this.state.addressField
          }
          labelText="Ethereum Address"
          readOnly
        />
        <EditButton
          css={style.edit_button}
          id="isEditingAddress"
          fill={STYLE.COLOR.GREEN}
          onClick={e => this.onClickEditAddress(e)}
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
