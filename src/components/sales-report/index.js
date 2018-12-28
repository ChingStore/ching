import React from 'react'
import SalesTable from './salesTable'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

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
    items: state.firestore.data.items,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'items' }])
)(SalesReport)
