import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'

import Card from './inventoryCard.js'
import Add from './inventoryAdd.js'
import selectors from '../../redux/selectors'

class InventoryScene extends React.PureComponent {
  render() {
    console.log('items:', this.props.items)
    return (
      <div style={{flex:1, flexDirection: 'row'}}>
        {_.map(this.props.items, (item, id) =>
          <Card key={id} {...item}/>
        )}
        <Add />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  items: selectors.getItemsState(state)
})

export default connect(mapStateToProps)(InventoryScene)
