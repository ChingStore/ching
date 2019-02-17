import * as ReactRedux from 'react-redux'
import * as Reselect from 'reselect'

import selectors from 'redux/selectors'

import StoreWelcome from '..'

const mapStateToProp = Reselect.createStructuredSelector({
  store: selectors.shop.current,
})

const mapDispatchToProps = null

export default ReactRedux.connect(
  mapStateToProp,
  mapDispatchToProps
)(StoreWelcome)
