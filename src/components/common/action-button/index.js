// @flow

import type { ButtonPropsType } from 'components/common/button'

/** @jsx jsx */
import { jsx } from '@emotion/core'
import * as React from 'react'
import * as ReactRouter from 'react-router-dom'

import Button from 'components/common/button'
import Flex from 'components/common/flex'

import style from './index.style.js'

export type ActionButtonPropsType = {
  Icon?: React.Node,
  iconProps?: *,
} & ButtonPropsType

class ActionButton extends React.PureComponent<ActionButtonPropsType> {
  render() {
    const { Icon, iconProps, children, ...restProps } = this.props
    return (
      <Button css={style.base} {...restProps}>
        {!!Icon && (
          <Flex center css={style.icon}>
            {/* $FlowFixMe */}
            <Icon {...iconProps} />
          </Flex>
        )}
        <div css={style.button_text}>{children}</div>
      </Button>
    )
  }
}

export default ReactRouter.withRouter(ActionButton)
