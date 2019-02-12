// @flow

import EmotionNormalize from 'emotion-normalize'
import * as Emotion from '@emotion/core'
import * as React from 'react'
import { Provider } from 'react-redux'
import * as ReactRouter from 'react-router-dom'

import store from 'redux/store'
import Root from 'components/root'
import CONFIG from 'constants/config'

import globalStyles from './global.style'

class App extends React.Component<{}> {
  render() {
    return (
      <div>
        <Emotion.Global styles={[EmotionNormalize, globalStyles]} />
        <Provider store={store}>
          <ReactRouter.HashRouter basename={CONFIG.PUBLIC_URL}>
            <Root />
          </ReactRouter.HashRouter>
        </Provider>
      </div>
    )
  }
}

export default App
