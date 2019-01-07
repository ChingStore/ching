import _ from 'lodash'
import React from 'react'
import * as ReactRedux from 'react-redux'
import * as ReactReduxFirebase from 'react-redux-firebase'
import * as Redux from 'redux'
import Card from './inventoryCard.js'
import Add from './inventoryAdd.js'
import QRDialog from './qrDialog'
import selectors from '../../redux/selectors'
import PropTypes from 'prop-types'

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

InventoryScene.propTypes = {
  items: PropTypes.object,
}

const mapDispatchToProps = dispatch => {
  return {
    sellItem: (id, quantity) => dispatch(itemActions.sell(id, quantity)),
  }
}

const mapStateToProps = state => {
  return {
    items: selectors.getItemsState(state),
  }
}

export default Redux.compose(
  ReactRedux.connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  ReactReduxFirebase.firestoreConnect(['items'])
)(InventoryScene)
