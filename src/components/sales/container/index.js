// @flow

import * as ReactRedux from 'react-redux'
import * as ReactRouter from 'react-router'
import * as Reselect from 'reselect'

import selectors from 'redux/selectors'

import * as Sales from '../index'

type OwnPropsType = ReactRouter.ContextRouter

const mapStateToProps = Reselect.createStructuredSelector({
  ordersOrdered: selectors.orders.allOrdered,
  store: selectors.shop.current,
})

const mapDispatchToProps = null

export default ReactRedux.connect<Sales.PropsType, OwnPropsType, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps
)(Sales.default)
