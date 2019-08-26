// @flow

import type { ActionButtonPropsType } from 'components/common/action-button'

/** @jsx jsx */
import { jsx } from '@emotion/core'
import * as React from 'react'
import * as ReactRouter from 'react-router-dom'

import style from './index.style'

export type ButtonPropsType = {
  css?: Object,
  to?: string,
  url?: string,
  onClick?: (SyntheticEvent<HTMLButtonElement>) => void,
  children?: React.Node,
} & ReactRouter.ContextRouter &
  ActionButtonPropsType

class Button extends React.PureComponent<ButtonPropsType> {
  render() {
    const { staticContext, ...restProps } = this.props
    return (
      <button
        css={style.base}
        {...restProps}
        onClick={this.handleClick}
        type="button"
      />
    )
  }

  handleClick = e => {
    const { history, onClick, to, url } = this.props
    if (onClick) {
      onClick(e)
    }
    if (url) {
      window.location = url
    }
    if (to) {
      history.push(to)
    }
  }
}

export default ReactRouter.withRouter(Button)
