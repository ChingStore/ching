import React from 'react'

import Flex from 'components/common/flex'

export default class ShoppingCartItemRow extends React.Component {
  render() {
    return (
      <Flex>
        {this.renderImage()}
        {this.renderDescription()}
        {this.renderQuantity()}
      </Flex>
    )
  }

  renderImage = () => {}

  renderDescription = () => {
    return (
      <Flex column>
        <p>{this.getName()}</p>
        <p>${this.getPrice()}</p>
      </Flex>
    )
  }

  renderQuantity = () => {}
}
