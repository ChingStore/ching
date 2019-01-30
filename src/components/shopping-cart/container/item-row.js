import * as ReactRedux from 'react-redux'
import * as Reselect from 'reselect'

import selectors from 'redux/selectors'
import ItemRow from '../item-row'
import orderAction from 'redux/actions/order'

const mapStateToProps = Reselect.createStructuredSelector({
  item: selectors.items.item,
})

const mapDispatchToProps = dispatch => ({
  handleRemoveButtonClick: ({ orderId, itemId }) => {
    dispatch(orderAction.removeItem({ orderId, itemId }))
  },
})

export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemRow)
