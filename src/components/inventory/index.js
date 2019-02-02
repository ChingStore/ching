/* eslint-disable */
import _ from 'lodash'
import React from 'react'
import * as ReactRedux from 'react-redux'
import * as Redux from 'redux'
import PropTypes, { string } from 'prop-types'

import selectors from 'redux/selectors'
import orderAction from 'redux/actions/order'
import ShoppingCart from 'components/shopping-cart/container'
import Flex from 'components/common/flex'

import Card from './inventoryCard.js'
import Add from './inventoryAdd.js'
import QRDialog from './qrDialog'

class InventoryScene extends React.PureComponent {
  state = {}

  handleItemClick = async ({ id }) => {
    this.props.addItem({ itemId: id })
  }

  handleCloseDialog = () => {
    this.setState({
      qrUrl: null,
    })
  }

  render() {
    const { items, shoppingCartOrderId } = this.props

    return (
      <Flex column>
        <Flex wrap>
          {_.map(items, (item, id) => (
            <Card
              key={id}
              {...item}
              onClick={() => this.handleItemClick({ item, id })}
            />
          ))}
          <Add />
        </Flex>
        <QRDialog
          url={this.state.qrUrl}
          onClose={() => this.setState({ qrUrl: null })}
        />
        {shoppingCartOrderId && <ShoppingCart />}
      </Flex>
    )
  }
}

InventoryScene.propTypes = {
  addItem: PropTypes.func,
  items: PropTypes.object,
  selectItem: PropTypes.func,
  shoppingCartOrderId: string,
}

const mapDispatchToProps = dispatch => ({
  addItem: ({ itemId }) => dispatch(orderAction.upsertItem({ itemId })),
})

const mapStateToProps = state => ({
  auth: selectors.getAuthState(state),
  items: selectors.getItemsState(state),
  orders: selectors.orders.all(state),
  storeUsers: selectors.getStoresUsers(state),
  shoppingCartOrderId: selectors.users.shoppingCartOrderId(state),
})

export default Redux.compose(
  ReactRedux.connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(InventoryScene)
