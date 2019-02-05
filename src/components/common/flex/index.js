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
  innerRef?: React.Ref<'div'>,
  spaceBetween?: boolean,
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
      innerRef,
      spaceBetween,
      wrap,
      ...restProps
    } = this.props

    const flexStyle = {
      alignItems:
        (alignEnd && 'flex-end') || ((alignCenter || center) && 'center'),
      display: 'flex',
      flex: auto && 'auto',
      flexGrow: grow && 1,
      flexDirection: column && 'column',
      flexWrap: wrap && 'wrap',
      justifyContent:
        (spaceBetween && 'space-between') ||
        ((justifyCenter || center) && 'center'),
      position: (absoluteFill && 'absolute') || (relative && 'relative'),
      width: absoluteFill && '100%',
      height: absoluteFill && '100%',
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
