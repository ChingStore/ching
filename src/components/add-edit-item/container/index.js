// @flow

import type { ItemDataType } from 'constants/firebase'
import type { DispatchType, StateType } from 'constants/redux'

import * as ReactRedux from 'react-redux'
import * as ReactRouter from 'react-router-dom'

import itemAction from 'redux/actions/item'
import selectors from 'redux/selectors'

import * as AddEditItem from '..'

type OwnProps = ReactRouter.ContextRouter

const mapStateToProp = (state: StateType) => ({
  items: selectors.items.allOrdered(state),
})

const mapDispatchToProps = (dispatch: DispatchType) => ({
  addItem: (item: ItemDataType) => dispatch(itemAction.add(item)),
})

export default ReactRedux.connect<AddEditItem.PropsType, OwnProps, _, _, _, _>(
  mapStateToProp,
  mapDispatchToProps
)(AddEditItem.default)
