// @flow

import type { IdType, OrderItemType } from 'constants/firebase'

/** @jsx jsx */
import { jsx } from '@emotion/core'
import _ from 'lodash'
import React from 'react'

import Icon from 'components/common/icon'
import Flex from 'components/common/flex'
import SHOPPING_CART from 'constants/shopping-cart'
import style from './item-row.style'

export type PropsType = {
  isEditable: boolean,
  itemId: IdType,
  remove: ({ itemId: IdType }) => void,
  updateQuantity: ({ itemId: IdType, quantity: number }) => void,
}

export default class ShoppingCartItemRow extends React.PureComponent<PropsType> {
  render() {
    return (
      <Flex css={style.base}>
        {this.renderRemoveButton()}
        {this.renderImage()}
        {this.renderDescription()}
        {this.renderQuantity()}
      </Flex>
    )
  }

  renderRemoveButton = () => (
    <Flex>
      <button
        css={style.removeButton}
        onClick={this.handleRemoveButtonClick}
        type="button"
        disabled={!this.props.isEditable}
      >
        {this.props.isEditable && <Icon.Cross />}
      </button>
    </Flex>
  )

  renderImage = () => {
    const photo = this.getPhoto()
    return (
      <Flex center css={style.photo}>
        {photo ? (
          <img
            src={photo}
            width={SHOPPING_CART.ROW_HEIGHT * SHOPPING_CART.IMAGE_ASPECT_RATIO}
            height={SHOPPING_CART.ROW_HEIGHT}
            alt={this.getName()}
          />
        ) : (
          <Icon.NoPhoto size={16} />
        )}
      </Flex>
    )
  }

  renderDescription = () => (
    <Flex column auto css={style.description}>
      <Flex css={style.description_text}>{this.getName()}</Flex>
      <Flex css={style.description_text}>${this.getPrice()}</Flex>
    </Flex>
  )

  renderQuantity = () => (
    <Flex>
      <input
        css={style.quantity_input}
        defaultValue={this.getQuantity()}
        type="number"
        onBlur={this.handleQuantityInputBlur}
        onChange={this.handleQuantityInputBlur}
        disabled={!this.props.isEditable}
      />
    </Flex>
  )

  // ///////////
  // GETTERS //
  // ///////////

  getName = (): string => _.get(this.props, 'item.name', '...')

  getOrderItem = (): ?OrderItemType =>
    _.get(this.props, `order.items[${this.props.itemId}`)

  getPrice = (): number => _.get(this.getOrderItem(), 'price', 0).toFixed(2)

  getQuantity = (): number => _.get(this.getOrderItem(), 'quantity', 0)

  getPhoto = (): ?string => _.get(this.props, 'item.photo')

  // //////////////////
  // EVENT HANDLERS //
  // //////////////////

  handleQuantityInputBlur = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.props.updateQuantity({
      ...this.props,
      quantity: parseInt(e.target.value, 10),
    })
  }

  handleRemoveButtonClick = () => {
    this.props.remove(this.props)
  }
}
