// @flow
import type { IdType } from 'constants/firebase'

import * as ReactRedux from 'react-redux'
import * as Reselect from 'reselect'

import selectors from 'redux/selectors'

import * as OrderRow from '../order-row'

type OwnPropsType = {|
  orderId: IdType,
|}

const mapStateToProps = Reselect.createStructuredSelector({
  orderFullItems: selectors.orders.fullItems,
  order: selectors.orders.order,
})

const mapDispatchToProps = null

export default ReactRedux.connect<OrderRow.PropsType, OwnPropsType, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps
)(OrderRow.default)
