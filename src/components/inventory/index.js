import _ from 'lodash'
import React from 'react'
import * as ReactRedux from 'react-redux'
import * as ReactReduxFirebase from 'react-redux-firebase'
import * as Redux from 'redux'
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

const mapStateToProps = state => ({
  auth: selectors.getAuthState(state),
  items: selectors.getItemsState(state),
  storeUsers: selectors.getStoresUsers(state),
})

export default Redux.compose(
  ReactRedux.connect(mapStateToProps),
  ReactReduxFirebase.firestoreConnect(props => {
    if (!props.auth || !props.auth.uid) return []
    return [
      {
        collection: 'items',
        where: [['userId', '==', props.auth.uid]],
      },
    ]
  })
)(InventoryScene)
