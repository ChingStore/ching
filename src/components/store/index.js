// @flow

/** @jsx jsx */
import { jsx } from '@emotion/core'
import _ from 'lodash'
import React from 'react'
import ReactResizeDetector from 'react-resize-detector'

import ShoppingCart from 'components/shopping-cart/container'
import Flex from 'components/common/flex'
import LinkButton from 'components/common/link-button'
import Icon from 'components/common/icon'

import style from './index.style'

type PropsType = {
  order: Object,
  store: Object,
  storeId: IdType,
  items: Object,
  onEditStoreName: ({ storeName: string, storeId: IdType }) => void,
}

type StateType = {
  isEditing: boolean,
  width: number,
}

class StoreScene extends React.PureComponent<PropsType, StateType> {
  state = {
    isEditing: false,
    isEditingStoreName: false,
    width: 0,
  }

  render = () => {
    console.log('Store props', this.props)
    return (
      <Flex grow column css={style.base}>
        {this.renderEditControls()}
        {this.renderStoreName()}
        {this.renderItems()}
        <ShoppingCart />
      </Flex>
    )
  }

  renderEditControls = () => {
    const { isEditing } = this.state

    return (
      <Flex spaceBetween>
        {isEditing && <div css={style.editControls}>Editing</div>}
        <LinkButton
          onClick={this.handleEditToggle}
          css={[
            style.editControls,
            isEditing
              ? style.editControls__endButton
              : style.editControls__startButton,
          ]}
        >
          {isEditing ? 'Done' : 'Edit inventory'}
        </LinkButton>
      </Flex>
    )
  }

  renderStoreName = () => {
    const { isEditing, isEditingStoreName } = this.state

    return isEditingStoreName ? (
      <input
        autoFocus
        type="text"
        placeholder="Enter store name..."
        defaultValue={this.getStoreName()}
        onBlur={this.handleStoreNameInputBlur}
        css={style.storeName}
      />
    ) : (
      <div css={style.storeName}>
        {this.getStoreName()}{' '}
        {isEditing && (
          <LinkButton onClick={this.handleEditStoreName}>
            <Icon.Edit />
          </LinkButton>
        )}
      </div>
    )
  }

  renderItems = () => (
    <Flex grow>
      abc
      <ReactResizeDetector
        handleWidth
        refreshMode="debounce"
        refreshRate={500}
        onResize={this.handleResize}
      />
    </Flex>
  )

  ////////////////////
  // EVENT HANDLERS //
  ////////////////////

  handleResize = (width: number) => {
    this.setState({ width })
  }

  handleEditToggle = () => {
    this.setState((prevState: StateType) => ({
      isEditing: !prevState.isEditing,
    }))
  }

  handleEditStoreName = () => {
    this.setState({
      isEditingStoreName: true,
    })
  }

  handleStoreNameInputBlur = async e => {
    await this.props.onEditStoreName({
      storeName: e.target.value,
      storeId: this.props.storeId,
    })
    this.setState({
      isEditingStoreName: false,
    })
  }

  getStoreName = () => _.get(this.props, 'store.storeName')
}

export default StoreScene
