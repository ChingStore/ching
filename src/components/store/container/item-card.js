// @flow

import type { IdType, ItemType } from 'constants/firebase'
import type { DispatchType } from 'constants/redux'

import * as ReactRedux from 'react-redux'
import * as Reselect from 'reselect'

import orderAction from 'redux/actions/order'
import selectors from 'redux/selectors'

import ItemCard from '../item-card'

type OwnPropsType = {
  item: ItemType,
  itemId: IdType,
  isFirstInRow: boolean,
  isEditing: boolean,
}

const mapStateToProps = Reselect.createStructuredSelector({
  order: selectors.orders.shoppingCart,
  orderId: selectors.users.shoppingCartOrderId,
})

const mapDispatchToProps = (
  dispatch: DispatchType,
  ownProps: OwnPropsType
) => ({
  onPhotoClick: async () => {
    const { itemId } = ownProps
    await dispatch(orderAction.upsertItem({ itemId }))
  },
})

// $FlowFixMe
export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemCard)
