// @flow

import type { ItemType, OrderItemType, IdType } from 'constants/firebase'

/** @jsx jsx */
import { jsx } from '@emotion/core'
import _ from 'lodash'
import React from 'react'
import * as ReactRouter from 'react-router-dom'

import Flex from 'components/common/flex'
import ROUTE from 'constants/route'

import style from './item-card.style'

type PropsType = {
  isFirstInRow: boolean,
  item: ItemType,
  itemId: IdType,
  isEditing: boolean,
  shoppingCartOrderItem: OrderItemType,

  onBadgeClick: () => void,
  onPhotoClick: () => void,

  ...ReactRouter.ContextRouter,
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
    const { isEditing, item } = this.props
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
          this.isItemSelected() && style.photo__selected,
        ]}
        onClick={this.handlePhotoClick}
      >
        {isEditing && this.renderPhotoEditButton()}
        {this.isItemSelected() && this.renderBadge()}
      </Flex>
    )
  }

  renderBadge = () => {
    return (
      <Flex center onClick={this.handleBadgeClick} css={style.photo_badge}>
        {this.getShoppingCartQuantity()}
      </Flex>
    )
  }

  renderPhotoEditButton = () => (
    <Flex grow center>
      <Flex css={style.photo_editButton}>Edit</Flex>
    </Flex>
  )

  renderName = () => <Flex css={style.itemName}>{this.getItemName()}</Flex>

  renderPrice = () => <Flex css={style.itemPrice}>${this.getItemPrice()}</Flex>

  ////////////////////
  // EVENT HANDLERS //
  ////////////////////

  handleBadgeClick = (e: SyntheticEvent<HTMLDivElement>) => {
    e.stopPropagation()
    this.props.onBadgeClick()
  }

  handlePhotoClick = () => {
    const { onPhotoClick, isEditing, itemId } = this.props

    if (isEditing) {
      const path = ReactRouter.generatePath(ROUTE.PATH.EDIT_ITEM, { itemId })
      this.props.history.push(path)
      return
    }

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

  //////////////
  // CHECKERS //
  //////////////

  isItemSelected = () => !!this.props.shoppingCartOrderItem
}

export default ReactRouter.withRouter(ItemCard)
