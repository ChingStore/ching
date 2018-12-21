import * as React from 'react'
import { Provider } from 'react-redux'

import './App.css'

import store from './redux/store'
import Root from './Root'

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
