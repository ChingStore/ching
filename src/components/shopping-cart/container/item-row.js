// @flow

import type { IdType } from 'constants/firebase'
import type { DispatchType } from 'constants/redux'

import * as ReactRedux from 'react-redux'
import * as Reselect from 'reselect'

import selectors from 'redux/selectors'
import orderAction from 'redux/actions/order'

import * as ItemRow from '../item-row'

type OwnPropsType = {
  isEditable: boolean,
  itemId: IdType,
  orderId: IdType,
}

const mapStateToProps = Reselect.createStructuredSelector({
  item: selectors.items.item,
  order: selectors.orders.shoppingCart,
})

const mapDispatchToProps = (
  dispatch: DispatchType,
  ownProps: OwnPropsType
) => ({
  remove: ({ itemId }) => {
    dispatch(orderAction.removeItem({ orderId: ownProps.orderId, itemId }))
  },
  updateQuantity: ({ itemId, quantity }) => {
    dispatch(
      orderAction.upsertItem({ orderId: ownProps.orderId, itemId, quantity })
    )
  },
})

export default ReactRedux.connect<ItemRow.PropsType, OwnPropsType, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps
)(ItemRow.default)
