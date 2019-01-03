import React from 'react'
import * as ReactRedux from 'react-redux'
import * as Redux from 'redux'
import * as ReactReduxFirebase from 'react-redux-firebase'
import PropTypes from 'prop-types'
import selectors from '../../redux/selectors'
import SalesTable from './sales-table'

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

SalesReport.propTypes = {
  items: PropTypes.obj,
}

export default Redux.compose(
  ReactRedux.connect(mapStateToProps),
  ReactReduxFirebase.firestoreConnect(['items'])
)(SalesReport)
