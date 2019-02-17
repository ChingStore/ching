// @flow

import type { IdType, ItemDataType } from 'constants/firebase'
import type { DispatchType, StateType } from 'constants/redux'

import * as ReactRedux from 'react-redux'
import * as ReactRouter from 'react-router-dom'

import itemAction from 'redux/actions/item'
import selectors from 'redux/selectors'

import * as AddEditItem from '..'

type OwnPropsType = ReactRouter.ContextRouter

const mapStateToProp = (state: StateType, ownProps: OwnPropsType) => ({
  items: selectors.items.allOrdered(state),
  itemId: ownProps.match.params.itemId,
  item:
    ownProps.match.params.itemId &&
    selectors.items.item(state, { itemId: ownProps.match.params.itemId }),
})

const mapDispatchToProps = (dispatch: DispatchType) => ({
  addItem: (item: ItemDataType) => dispatch(itemAction.add(item)),

  updateItem: ({ itemId, data }: { itemId: IdType, data: ItemDataType }) =>
    dispatch(itemAction.update({ itemId, data })),
})

export default ReactRedux.connect<
  AddEditItem.PropsType,
  OwnPropsType,
  _,
  _,
  _,
  _
>(
  mapStateToProp,
  mapDispatchToProps
)(AddEditItem.default)
