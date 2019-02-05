// @flow

import * as ReactRedux from 'react-redux'
import * as Reselect from 'reselect'

import shopAction from 'redux/actions/shop'
import selectors from 'redux/selectors'
import Store from '../index'

const mapStateToProps = Reselect.createStructuredSelector({
  order: selectors.orders.shoppingCart,
  items: selectors.items.all,
  store: selectors.shop.current,
  storeId: selectors.users.currentStoreId,
})

const mapDispatchToProps = (dispatch: DispatchType) => ({
  onEditStoreName: async ({
    storeName,
    storeId,
  }: {
    storeName: string,
    storeId: IdType,
  }) => {
    const data = { storeName }
    await dispatch(shopAction.update({ storeId, data }))
  },
})

// $FlowFixMe
export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(Store)
