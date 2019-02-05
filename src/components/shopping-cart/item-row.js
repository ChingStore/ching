/** @jsx jsx */
import { jsx } from '@emotion/core'
import _ from 'lodash'
import React from 'react'

import Icon from 'components/common/icon'
import Flex from 'components/common/flex'
import SHOPPING_CART from 'constants/shopping-cart'
import style from './item-row.style'

export default class ShoppingCartItemRow extends React.PureComponent {
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
      >
        <Icon.Cross />
      </button>
    </Flex>
  )

  renderImage = () => (
    <Flex>
      <img
        src={this.getPhoto()}
        width={SHOPPING_CART.ROW_HEIGHT * SHOPPING_CART.IMAGE_ASPECT_RATIO}
        height={SHOPPING_CART.ROW_HEIGHT}
        alt={this.getName()}
      />
    </Flex>
  )

  renderDescription = () => (
    <Flex column auto css={style.description}>
      <Flex css={style.descriptionText}>{this.getName()}</Flex>
      <Flex css={style.descriptionText}>${this.getPrice()}</Flex>
    </Flex>
  )

  renderQuantity = () => (
    <Flex>
      <input
        css={style.quantity_input}
        defaultValue={this.getQuantity()}
        type="number"
        onBlur={this.handleQuantityInputBlur}
      />
    </Flex>
  )

  // ///////////
  // GETTERS //
  // ///////////

  getName = () => _.get(this.props, 'item.name', '...')

  getOrderItem = () => _.get(this.props, `order.items[${this.props.itemId}`)

  getPrice = () => _.get(this.getOrderItem(), 'price', 0).toFixed(2)

  getQuantity = () => _.get(this.getOrderItem(this.props), 'quantity', 0)

  getPhoto = () => _.get(this.props, 'item.photo')

  // //////////////////
  // EVENT HANDLERS //
  // //////////////////

  handleQuantityInputBlur = e => {
    this.props.updateQuantity({
      ...this.props,
      quantity: parseInt(e.target.value, 10),
    })
  }

  handleRemoveButtonClick = () => {
    this.props.remove(this.props)
  }
}
