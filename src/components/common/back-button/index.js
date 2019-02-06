// @flow

/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import * as ReactRouter from 'react-router-dom'

import Button from 'components/common/button'
import Flex from 'components/common/flex'
import vectorImg from 'components/common/icon/Vector.png'

type PropsType = ReactRouter.ContextRouter

class BackButton extends React.Component<PropsType> {
  render() {
    const { history } = this.props
    return (
      <Flex>
        {/* $FlowFixMe */}
        <Button {...this.props} onClick={() => history.goBack()}>
          <img src={vectorImg} alt="Go back" />
        </Button>
      </Flex>
    )
  }
}

export default ReactRouter.withRouter(BackButton)
