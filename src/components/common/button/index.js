// @flow

/** @jsx jsx */
import { jsx } from '@emotion/core'
import * as React from 'react'
import * as ReactRouter from 'react-router-dom'

export type ButtonPropsType = {
  css?: Object,
  to?: string,
  url?: string,
  onClick?: () => void,
  children?: React.Node,
} & ReactRouter.ContextRouter

class Button extends React.PureComponent<ButtonPropsType> {
  render() {
    const { staticContext, ...restProps } = this.props
    return <button {...restProps} onClick={this.handleClick} type="button" />
  }

  handleClick = () => {
    const { history, onClick, to, url } = this.props
    if (onClick) {
      onClick()
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
