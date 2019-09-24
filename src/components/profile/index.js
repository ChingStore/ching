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
  erc20Asset: string,
  walletAddress: string,
  signOut: () => Promise<any>,
  handleChange: {},
  onClick: () => void,
  onUpdateAddress: ({
    erc20Asset: string,
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
    erc20Asset: this.props.erc20Asset,
    addressField: this.props.walletAddress,
  }

  //////////////////////
  // LIFECYCLE EVENTS //
  //////////////////////

  // @DEV check to see if wallet address is loaded with this block of code
  // isLoaded = (): boolean => {
  //   const { store } = this.props
  //   return ReactReduxFirebase.isLoaded(store)
  // }

  componentDidMount() {
    const addressField = this.getWalletAddress()
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

  handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      addressField: e.currentTarget.value,
    })
  }

  handleFocus = (e: SyntheticEvent<HTMLInputElement>) => {
    e.currentTarget.select()
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

  onClickEditErc20Asset = (e: SyntheticEvent<HTMLButtonElement>) => {
    const eventId = e.currentTarget.id
    this.setState(prevState => {
      return {
        [eventId]: !prevState[eventId],
        erc20AssetField: this.props.store.erc20AssetField,
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

  handleUpdateErc20Asset = async () => {
    if (!this.state.erc20AssetField) {
      await this.props.onUpdateErc20Asset({
        erc20Asset: this.props.store.erc20Asset,
        storeId: this.props.storeId,
        storeName: this.props.store.storeName,
      })
    }
    // if (!ethUtil.isValidAddress(this.state.addressField)) {
    //   alert('The address entered is invalid')
    //   return
    // }

    await this.props.onUpdateErc20Asset({
      erc20Asset: this.state.erc20AssetField,
      storeId: this.props.storeId,
      storeName: this.props.store.storeName,
    })

    this.setState({ isEditingErc20Asset: false })
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

  getErc20Asset = () => {
    _.get(this.props, 'erc20Asset')
    console.log('getErc20Asset Fired!', this.props)
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
          onFocus={this.handleFocus}
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
        <Flex css={style.addressField}>
          <div css={style.addressField_lableText}>Ethereum Address</div>
          <input
            css={style.inputField}
            id="addressField"
            value={
              this.state.addressField
                ? this.state.addressField
                : this.props.walletAddress
            }
            readOnly
          />
        </Flex>
        <EditButton
          css={style.edit_button}
          id="isEditingAddress"
          fill={STYLE.COLOR.GREEN}
          onClick={e => this.onClickEditAddress(e)}
        />
      </Flex>
    )
  }

  // renderErc20AssetField vvv
  renderErc20AssetField = () => {
    const { isEditingErc20Asset } = this.state
    return isEditingErc20Asset ? (
      <Flex css={style.edit}>
        <InputField
          autoFocus
          onFocus={this.handleFocus}
          css={style.inputField}
          onChange={e => this.handleChange(e)}
          id="erc20AssetField"
          value={this.state.erc20AssetField}
          labelText="ERC20 Asset"
        />
        <EditButton
          css={style.edit_button}
          id="isEditingErc20Asset"
          fill={STYLE.COLOR.RED}
          onClick={() => this.handleUpdateErc20Asset()}
        />
      </Flex>
    ) : (
      <Flex css={style.edit}>
        <Flex css={style.erc20AssetField}>
          <div css={style.erc20AssetField_lableText}>ERC20 Asset</div>
          <input
            css={style.inputField}
            id="erc20AssetField"
            value={
              this.state.erc20AssetField
                ? this.state.erc20AssetField
                : this.props.erc20Asset
            }
            readOnly
          />
        </Flex>
        <EditButton
          css={style.edit_button}
          id="isEditingErc20Asset"
          fill={STYLE.COLOR.GREEN}
          onClick={e => this.onClickEditErc20Asset(e)}
        />
      </Flex>
    )
  }
  // renderErc20AssetField ^^^

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
