import * as ReactRedux from 'react-redux'
import * as Reselect from 'reselect'

import selectors from 'redux/selectors'
import ItemRow from '../item-row'
import orderAction from 'redux/actions/order'

const mapStateToProps = Reselect.createStructuredSelector({
  item: selectors.items.item,
  order: selectors.orders.shoppingCart,
  orderId: selectors.users.shoppingCartOrderId,
})

const mapDispatchToProps = dispatch => ({
  remove: ({ orderId, itemId }) => {
    dispatch(orderAction.removeItem({ orderId, itemId }))
  },
  updateQuantity: ({ orderId, itemId, quantity }) => {
    dispatch(orderAction.upsertItem({ orderId, itemId, quantity }))
  },
})

export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemRow)
