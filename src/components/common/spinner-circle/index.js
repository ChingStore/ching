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
  }

  render() {
    const { fill } = this.props
    return (
      <div
        css={css`
          content: '';
          box-sizing: border-box;
          height: 80px;
          width: 80px;
          border-radius: 50%;
          border: 8px solid transparent;
          border-top-color: ${fill};
          border-bottom-color: ${fill};
          animation: ${spin} 0.7s ease infinite;
        `}
      />
    )
  }
}

export default SpinnerCircle
