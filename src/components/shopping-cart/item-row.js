import _ from 'lodash'
import React from 'react'

import Flex from 'components/common/flex'
import style from './item-row.style'

export default class ShoppingCartItemRow extends React.Component {
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
        onClick={this.props.handleRemoveButtonClick}
      >
        x
      </button>
    </Flex>
  )

  renderImage = () => {
    return (
      <Flex>
        <img src={this.getPhoto()} width="58px" height="44px" />
      </Flex>
    )
  }

  renderDescription = () => {
    return (
      <Flex column auto>
        <Flex css={style.descriptionText}>{this.getName()}</Flex>
        <Flex css={style.descriptionText}>${this.getPrice()}</Flex>
      </Flex>
    )
  }

  renderQuantity = () => {
    return (
      <Flex>
        <input
          css={style.quantityInput}
          type="number"
          onInput={this.handleQuantityInput}
        />
      </Flex>
    )
  }

  /////////////
  // GETTERS //
  /////////////

  getName = () => _.get(this.props, 'item.name', '...')

  getPrice = () => _.get(this.props, 'item.price', 0)

  getPhoto = () => _.get(this.props, 'item.photo')

  ////////////////////
  // EVENT HANDLERS //
  ////////////////////

  handleQuantityInput = e => {
    console.log({ e })
  }

  handleRemoveButtonClick = () => {}
}
