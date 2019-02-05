// @flow

import type { ItemType, IdType } from 'constants/firebase'

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
  // order: OrderType,
  // orderId: IdType,

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
    const { isEditing, itemId, item } = this.props
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
        ]}
        onClick={this.handlePhotoClick}
      >
        {isEditing && (
          <ActionButton to={`${ROUTE.PATH.EDIT_ITEM}/${itemId}`}>
            Edit
          </ActionButton>
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
}

export default ItemCard
