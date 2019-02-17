// @flow

/** @jsx jsx */
import { jsx } from '@emotion/core'
import * as React from 'react'

type PropsType = {
  /**
   * Fills closes relatively positioned parent.
   */
  absoluteFill?: boolean,

  /**
   * Set position to relative.
   */
  relative?: boolean,
  alignCenter?: boolean,
  alignEnd?: boolean,
  auto?: boolean,
  center?: boolean,
  children: React.Node,
  column?: boolean,
  grow?: boolean,
  justifyCenter?: boolean,
  justifyEnd?: boolean,
  justifyStart?: boolean,
  innerRef?: React.Ref<'div'>,
  noShrink?: boolean,
  spaceBetween?: boolean,
  spaceAround?: boolean,
  wrap?: boolean,
}

class Flex extends React.PureComponent<PropsType> {
  render = () => {
    const {
      absoluteFill,
      relative,
      alignCenter,
      alignEnd,
      auto,
      children,
      column,
      grow,
      center,
      justifyCenter,
      justifyStart,
      justifyEnd,
      innerRef,
      noShrink,
      spaceBetween,
      spaceAround,
      wrap,
      // Remove react-router props
      // $FlowFixMe: missing in Props
      computedMatch,
      ...restProps
    } = this.props

    const flexStyle = {
      display: 'flex',

      alignItems:
        (alignEnd && 'flex-end') || ((alignCenter || center) && 'center'),
      flex: auto && 'auto',
      flexGrow: grow && 1,
      flexDirection: column && 'column',
      flexShrink: noShrink && 0,
      flexWrap: wrap && 'wrap',
      justifyContent:
        (spaceBetween && 'space-between') ||
        (spaceAround && 'space-around') ||
        ((justifyCenter || center) && 'center') ||
        (justifyEnd && 'flex-end') ||
        (justifyStart && 'flex-start'),

      position: (absoluteFill && 'absolute') || (relative && 'relative'),
      top: absoluteFill && 0,
      bottom: absoluteFill && 0,
      left: absoluteFill && 0,
      right: absoluteFill && 0,

      // width: absoluteFill && '100%',
      // height: absoluteFill && '100%',
    }

    return (
      // NOTE: The style from parent component takes precedence here
      // @see https://emotion.sh/docs/css-prop#style-precedence
      <div css={flexStyle} ref={innerRef} {...restProps}>
        {children}
      </div>
    )
  }
}

export default Flex
