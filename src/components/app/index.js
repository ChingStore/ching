// @flow

import EmotionNormalize from 'emotion-normalize'
import * as Emotion from '@emotion/core'
import * as React from 'react'
import { Provider } from 'react-redux'

import store from 'redux/store'
import Root from 'components/root'

import globalStyles from './global.style'

class App extends React.Component<{}> {
  render() {
    return (
      <div>
        <Emotion.Global styles={[EmotionNormalize, globalStyles]} />
        <Provider store={store}>
          <Root />
        </Provider>
      </div>
    )
  }
}

export default App
