// @flow

/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import * as ReactRouter from 'react-router-dom'

import Icon from 'components/common/icon'
import Button from 'components/common/button'
import Flex from 'components/common/flex'

export type PropsType = {
  id?: string,
  onClick: (e: SyntheticEvent<HTMLButtonElement>) => void,
  fill?: string,
  ...ReactRouter.ContextRouter,
}

class EditButton extends React.Component<PropsType> {
  render() {
    const { fill } = this.props
    return (
      <Flex>
        {/* $FlowFixMe */}
        <Button {...this.props}>
          <Icon.ProfileEdit fill={fill} />
        </Button>
      </Flex>
    )
  }
}

export default ReactRouter.withRouter(EditButton)
