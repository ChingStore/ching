// @flow

/** @jsx jsx */
import { jsx } from '@emotion/core'
import * as React from 'react'

type PropsType = {
  alignEnd?: boolean,
  auto?: boolean,
  children: React.Node,
  column?: boolean,
  grow?: boolean,
  innerRef?: React.Ref<'div'>,
  spaceBetween?: boolean,
  wrap?: boolean,
}

class Flex extends React.PureComponent<PropsType> {
  render = () => {
    const {
      alignEnd,
      auto,
      children,
      column,
      grow,
      innerRef,
      spaceBetween,
      wrap,
    } = this.props

    const flexStyle = {
      alignItems: alignEnd && 'flex-end',
      display: 'flex',
      flex: auto && 'auto',
      flexGrow: grow && 1,
      flexDirection: column && 'column',
      flexWrap: wrap && 'wrap',
      justifyContent: spaceBetween && 'space-between',
    }
    return (
      // NOTE: The style from parent component takes precedence here
      // @see https://emotion.sh/docs/css-prop#style-precedence
      <div css={flexStyle} ref={innerRef} {...this.props}>
        {children}
      </div>
    )
  }
}

export default Flex
