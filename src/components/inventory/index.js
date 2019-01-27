import _ from 'lodash'
import React from 'react'
import * as ReactRedux from 'react-redux'
import * as Redux from 'redux'
import PropTypes from 'prop-types'
import Card from './inventoryCard.js'
import Add from './inventoryAdd.js'
import QRDialog from './qrDialog'
import selectors from 'redux/selectors'

import orderAction from 'redux/actions/order'

// const SERVER_URL = 'https://39143ec6.ngrok.io'
const SERVER_URL = '34-pr-daipos.surge.sh'
const STATUS_UL = 'https://get.status.im/browse/'

class InventoryScene extends React.PureComponent {
  state = {}

  handleItemClick = async ({ item, id }) => {
    let walletAddress = '0xf82B82b4ebC83479eF10271190A7cf5487240955'
    const orderId = await this.props.addOrder({ itemId: id, quantity: 1 })

    const url = `${STATUS_UL}${SERVER_URL}/#/payment/${walletAddress}/${
      item.price
    }/${orderId}`

    this.setState({
      qrUrl: url,
    })
  }

  handleCloseDialog = () => {
    this.setState({
      qrUrl: null,
    })
  }

  render() {
    const { items } = this.props

    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          flex: 1,
          flexDirection: 'row',
        }}
      >
        {_.map(items, (item, id) => (
          <Card
            key={id}
            {...item}
            onClick={() => this.handleItemClick({ item, id })}
          />
        ))}
        <Add />
        <QRDialog
          url={this.state.qrUrl}
          onClose={() => this.setState({ qrUrl: null })}
        />
      </div>
    )
  }
}

InventoryScene.propTypes = {
  addOrder: PropTypes.func,
  items: PropTypes.object,
}

const mapDispatchToProps = dispatch => ({
  addOrder: ({ itemId, quantity }) =>
    dispatch(orderAction.add({ itemId, quantity })),
})

const mapStateToProps = state => ({
  auth: selectors.getAuthState(state),
  items: selectors.getItemsState(state),
  orders: selectors.getOrders(state),
  storeUsers: selectors.getStoresUsers(state),
})

export default Redux.compose(
  ReactRedux.connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(InventoryScene)
