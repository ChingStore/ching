// @flow

import type { IdType } from 'constants/firebase'
import type { DispatchType } from 'constants/redux'

import * as ReactRedux from 'react-redux'
import * as ReactRouter from 'react-router'
import * as Reselect from 'reselect'

import shopAction from 'redux/actions/shop'
import selectors from 'redux/selectors'

import * as Store from '../index'

type OwnPropsType = ReactRouter.ContextRouter

const mapStateToProps = Reselect.createStructuredSelector({
  order: selectors.orders.shoppingCart,
  itemsOrdered: selectors.items.allOrdered,
  store: selectors.shop.current,
  storeId: selectors.users.currentStoreId,
})

const mapDispatchToProps = (dispatch: DispatchType) => ({
  onEditStoreName: async ({
    storeName,
    storeId,
  }: {
    walletAddress: string,
    storeName: string,
    storeId: IdType,
  }) => {
    const data = { storeName }
    await dispatch(shopAction.update({ storeId, data }))
  },

  onFinishOnboarding: async ({
    storeId,
  }: {
    storeId: IdType,
  }): Promise<void> => {
    const data = { isOnboardingDone: true }
    await dispatch(shopAction.update({ storeId, data }))
  },
})

export default ReactRedux.connect<Store.PropsType, OwnPropsType, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps
)(Store.default)
