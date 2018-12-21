import React from 'react'
import SalesTable from './salesTable'
import { connect } from 'react-redux'
import selectors from '../../redux/selectors'

class SalesReport extends React.PureComponent {
  render() {
    const { items } = this.props
    console.log(this.props)
    return (
      <div>
        <SalesTable items={items} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    items: selectors.getItemsState(state),
  }
}

export default connect(mapStateToProps)(SalesReport)
