// @flow

import type { ItemType, OrderItemType, IdType } from 'constants/firebase'

/** @jsx jsx */
import { jsx } from '@emotion/core'
import _ from 'lodash'
import React from 'react'

import ActionButton from 'components/common/action-button'
import Flex from 'components/common/flex'
import ROUTE from 'constants/route'

import style from './item-card.style'

type PropsType = {
  isFirstInRow: boolean,
  item: ItemType,
  itemId: IdType,
  isEditing: boolean,
  shoppingCartOrderItem: OrderItemType,

  onPhotoClick: () => void,
}

class ItemCard extends React.PureComponent<PropsType> {
  render = () => {
    const { isFirstInRow } = this.props
    return (
      <Flex column css={[style.base, isFirstInRow && style.base__first]}>
        {this.renderPhoto()}
        {this.renderName()}
        {this.renderPrice()}
      </Flex>
    )
  }

  renderPhoto = () => {
    const { isEditing, itemId, item, shoppingCartOrderItem } = this.props
    return (
      <Flex
        css={[
          style.photo,
          {
            background: `url("${item.photo}")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          },
          !!shoppingCartOrderItem && style.photo__selected,
        ]}
        onClick={!isEditing && this.handlePhotoClick}
      >
        {isEditing && (
          <ActionButton to={`${ROUTE.PATH.EDIT_ITEM}/${itemId}`}>
            Edit
          </ActionButton>
        )}
        {!!shoppingCartOrderItem && (
          <Flex center css={style.photo_badge}>
            {this.getShoppingCartQuantity()}
          </Flex>
        )}
      </Flex>
    )
  }

  renderName = () => <Flex css={style.itemName}>{this.getItemName()}</Flex>

  renderPrice = () => <Flex css={style.itemPrice}>${this.getItemPrice()}</Flex>

  ////////////////////
  // EVENT HANDLERS //
  ////////////////////

  handlePhotoClick = () => {
    const { onPhotoClick } = this.props
    onPhotoClick()
  }

  /////////////
  // GETTERS //
  /////////////

  getItemName = (): string => _.get(this.props, 'item.name')

  getItemPrice = (): string => _.get(this.props, 'item.price', 0).toFixed(2)

  getShoppingCartQuantity = (): number => {
    const { shoppingCartOrderItem } = this.props
    return _.get(shoppingCartOrderItem, 'quantity')
  }
}

export default ItemCard
