import * as ReactRedux from 'react-redux'
import itemAction from 'redux/actions/item'
import selectors from 'redux/selectors'

import Add from '..'

const mapStateToProp = state => ({
  items: selectors.items.allOrdered(state),
})

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(itemAction.add(item)),
})

export default ReactRedux.connect(
  mapStateToProp,
  mapDispatchToProps
)(Add)
