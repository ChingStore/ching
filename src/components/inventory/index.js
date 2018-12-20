import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import Maker from '@makerdao/dai'

import Card from './inventoryCard.js'
import Add from './inventoryAdd.js'
import QRDialog from './qrDialog'
import selectors from '../../redux/selectors'

import itemActions from '../../redux/actions/item'
import web3Instance from '../../singletons/web3/web3'

const SERVER_URL = 'https://14767e6d.ngrok.io'
const STATUS_UL = 'https://get.status.im/browse/'

class InventoryScene extends React.PureComponent {
  state = {}

  handleItemClick = async item => {
    let address = await web3Instance.getWalletAddress()
    const url = `${STATUS_UL}${SERVER_URL}/#/payment/${address}/${item.price}`
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
    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          flex: 1,
          flexDirection: 'row',
        }}
      >
        {_.map(this.props.items, (item, id) => (
          <Card key={id} {...item} onClick={() => this.handleItemClick(item)} />
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

const mapDispatchToProps = dispatch => {
  return {
    sellItem: (id, item) => dispatch(itemActions.sell(id, item)),
  }
}

const mapStateToProps = state => {
  return {
    items: selectors.getItemsState(state),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryScene)
