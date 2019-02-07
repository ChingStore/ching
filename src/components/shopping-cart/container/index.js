// @flow

import type { DispatchType } from 'constants/redux'

import * as ReactRedux from 'react-redux'
import * as Reselect from 'reselect'

import selectors from 'redux/selectors'
import shoppingCartAction from 'redux/actions/shopping-cart'

import * as ShoppingCart from '../index'

type OwnPropsType = {||}

type PropsType = {
  ...OwnPropsType,
  ...ShoppingCart.PropsType,
}

const mapStateToProps = Reselect.createStructuredSelector({
  order: selectors.orders.shoppingCart,
  orderId: selectors.users.shoppingCartOrderId,
  walletAddress: selectors.wallet.address,
})

const mapDispatchToProps = (dispatch: DispatchType) => ({
  onResetShoppingCart: () => {
    dispatch(shoppingCartAction.reset())
  },
})

export default ReactRedux.connect<PropsType, OwnPropsType, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps
  // $FlowFixMe: onResetShoppingCart can't be optional
)(ShoppingCart.default)
