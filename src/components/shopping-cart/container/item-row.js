// @flow
import type { IdType } from 'constants/firebase'
import type { DispatchType } from 'constants/redux'

import * as ReactRedux from 'react-redux'
import * as Reselect from 'reselect'

import selectors from 'redux/selectors'
import orderAction from 'redux/actions/order'

import * as ItemRow from '../item-row'

type OwnPropsType = {|
  isEditable: boolean,
  itemId: IdType,
|}

const mapStateToProps = Reselect.createStructuredSelector({
  item: selectors.items.item,
  order: selectors.orders.shoppingCart,
})

const mapDispatchToProps = (
  dispatch: DispatchType,
  ownProps: OwnPropsType
) => ({
  onRemove: () => {
    dispatch(orderAction.removeAllItemsOfAKind({ itemId: ownProps.itemId }))
  },
  onChangeQuantity: (quantity: number) => {
    dispatch(
      orderAction.updateItem({
        itemId: ownProps.itemId,
        quantity,
      })
    )
  },
})

export default ReactRedux.connect<ItemRow.PropsType, OwnPropsType, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps
)(ItemRow.default)
