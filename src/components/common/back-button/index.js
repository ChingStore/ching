/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import * as ReactRouter from 'react-router-dom'

import Button from 'components/common/button'
import Flex from 'components/common/flex'
import vectorImg from 'components/common/icon/Vector.png'

import style from './index.style.js'

class BackButton extends React.Component {
  render() {
    const { history } = this.props
    return (
      <Flex css={style.base}>
        <Button
          css={style.button}
          {...this.props}
          onClick={() => history.goBack()}
        >
          <img src={vectorImg} alt="Go back" />
        </Button>
      </Flex>
    )
  }
}

export default ReactRouter.withRouter(BackButton)
