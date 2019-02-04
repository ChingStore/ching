import * as ReactRedux from 'react-redux'
import itemAction from 'redux/actions/item'

import AddScene from '..'

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(itemAction.add(item)),
})

export default ReactRedux.connect(
  null,
  mapDispatchToProps
)(AddScene)
