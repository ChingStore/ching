// @flow

import type { ButtonPropsType } from 'components/common/button'

/** @jsx jsx */
import { jsx } from '@emotion/core'
import * as React from 'react'
import * as ReactRouter from 'react-router-dom'

import Button from 'components/common/button'

import style from './index.style.js'

type PropsType = ButtonPropsType & {
  Icon?: React.Node,
  iconProps?: *,
}

class ActionButton extends React.PureComponent<PropsType> {
  render() {
    const { Icon, iconProps, children, ...restProps } = this.props
    return (
      <Button css={style.base} {...restProps}>
        {!!Icon && (
          <div css={style.icon}>
            {/* $FlowFixMe */}
            <Icon {...iconProps} />
          </div>
        )}
        <div css={style.button_text}>{children}</div>
      </Button>
    )
  }
}

export default ReactRouter.withRouter(ActionButton)
