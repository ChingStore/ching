import * as ReactRedux from 'react-redux'
import * as Reselect from 'reselect'

import selectors from 'redux/selectors'
import ShoppingCart from '../index'

const mapStateToProps = Reselect.createStructuredSelector({
  order: selectors.orders.shoppingCart,
})

const mapDispatchToProps = null

export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart)
