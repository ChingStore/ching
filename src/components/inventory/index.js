import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import Maker from '@makerdao/dai';

import Card from './inventoryCard.js'
import Add from './inventoryAdd.js'
import QRDialog from './qrDialog'
import selectors from '../../redux/selectors'

const SERVER_URL = 'http://278b610e.ngrok.io'
const STATUS_UL = 'https://get.status.im/browse/'

class InventoryScene extends React.PureComponent {

  state = {}

  componentWillMount = () => {
    this.loadAddress()
  }

  getAddressFromWeb3 = async () => {
    const maker = Maker.create("browser");
    await maker.authenticate();
    const dai = maker.service('token').getToken("DAI");
    console.log(dai.toString())
    const account = await dai._web3.eth.getAccounts();
    return account;
  }

  loadAddress = async () => {

    const accounts = await this.getAddressFromWeb3()

    console.log({ accounts })

    this.setState({
      address: accounts[0]
    })
  }

  handleItemClick = (item) => {
    console.log({ item })
    const url = `${STATUS_UL}${SERVER_URL}/#/payment/${this.state.address}/${item.price}`
    this.setState({
      qrUrl: url
    })
  }

  handleCloseDialog = () => {
    this.setState({
      qrUrl: null
    })
  }

  render() {
    console.log('items:', this.props.items)
    return (
      <div style={{display: 'flex', flexWrap: "wrap", flex:1, flexDirection: 'row'}}>
        {_.map(this.props.items, (item, id) =>
          <Card key={id} {...item} onClick={() => this.handleItemClick(item) }/>
        )}
        <Add />
        <QRDialog url={this.state.qrUrl} onClose={() => this.setState({ qrUrl: null })}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  items: selectors.getItemsState(state)
})

export default connect(mapStateToProps)(InventoryScene)
