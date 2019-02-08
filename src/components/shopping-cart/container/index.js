// @flow

import type { DispatchType } from 'constants/redux'

import * as ReactRedux from 'react-redux'
import * as ReactRouter from 'react-router-dom'
import * as Reselect from 'reselect'

import selectors from 'redux/selectors'
import shoppingCartAction from 'redux/actions/shopping-cart'

import * as ShoppingCart from '../index'

type OwnPropsType = {
  location: ReactRouter.Location,
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

export default ReactRedux.connect<
  ShoppingCart.PropsType,
  OwnPropsType,
  _,
  _,
  _,
  _
>(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart.default)
