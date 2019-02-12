/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core'
import React from 'react'

const spin = keyframes`
    from  { transform: rotate(45deg); }
    to    { transform: rotate(405deg); }
`

class SpinnerCircle extends React.Component {
  render() {
    return (
      <div
        css={css`
          content: '';
          box-sizing: border-box;
          position: absolute;
          top: 40%;
          left: 50%;
          height: 80px;
          width: 80px;
          margin-top: -40px;
          margin-left: -40px;
          border-radius: 50%;
          border: 4px solid transparent;
          border-top-color: #009688;
          border-bottom-color: #009688;
          animation: ${spin} 0.7s ease infinite;
        `}
      />
    )
  }
}

export default SpinnerCircle
