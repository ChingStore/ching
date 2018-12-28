import React from 'react'
import SalesTable from './salesTable'
import * as ReactRedux from 'react-redux'
import * as Redux from 'redux'
import * as ReactReduxFirebase from 'react-redux-firebase'

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

export default Redux.compose(
  ReactRedux.connect(mapStateToProps),
  ReactReduxFirebase.firestoreConnect([{ collection: 'items' }])
)(SalesReport)
