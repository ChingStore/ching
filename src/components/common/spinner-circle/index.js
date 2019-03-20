/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core'
import React from 'react'

import STYLE from 'constants/style'

const spin = keyframes`
    from  { transform: rotate(45deg); }
    to    { transform: rotate(405deg); }
`

class SpinnerCircle extends React.Component {
  static defaultProps = {
    fill: STYLE.COLOR.BLUE,
    size: 80,
  }

  render() {
    const { fill, size } = this.props
    return (
      <div
        css={css`
          content: '';
          box-sizing: border-box;
          height: ${size}px;
          width: ${size}px;
          border-radius: 50%;
          border: ${size / 10}px solid transparent;
          border-top-color: ${fill};
          border-bottom-color: ${fill};
          animation: ${spin} 0.7s ease infinite;
        `}
      />
    )
  }
}

export default SpinnerCircle
