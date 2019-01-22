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
import web3Maker from 'singletons/web3/maker'
import web3Infura from 'singletons/web3/infura'

const SERVER_URL = 'https://7444e33a.ngrok.io'
const STATUS_UL = 'https://get.status.im/browse/'

class InventoryScene extends React.PureComponent {
  state = {}

  componentDidMount = () => {
    console.log(web3Infura.getBalance())
  }

  handleItemClick = async ({ item, id }) => {
    let address = await web3Maker.getWalletAddress()
    const orderId = await this.props.addOrder({ itemId: id, quantity: 1 })

    const url = `${STATUS_UL}${SERVER_URL}/#/payment/${address}/${
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
