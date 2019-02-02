import * as React from 'react'
import { Provider } from 'react-redux'

import store from 'redux/store'
import Root from 'components/root'

import './App.css'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    )
  }
}

export default App
