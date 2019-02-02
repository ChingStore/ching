/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

class Flex extends React.Component {
  render = () => {
    const { column, children, auto, wrap } = this.props

    const flexStyle = {
      display: 'flex',
      flex: auto && 'auto',
      flexDirection: column && 'column',
      flexWrap: wrap && 'wrap',
    }
    return (
      // NOTE: The style from parent component takes precedence here
      // @see https://emotion.sh/docs/css-prop#style-precedence
      <div css={flexStyle} {...this.props}>
        {children}
      </div>
    )
  }
}

export default Flex
