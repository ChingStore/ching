/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import React from 'react'

import STYLE from 'constants/style'

class Checkmark extends React.Component {
  render() {
    return (
      <div>
        <svg
          id="svg"
          viewBox="0 0 100 100"
          css={css`
            height: 140px;
            width: 140px;
            left: 55%;
            top: 40%;
            position: absolute;
            transform: translate(-50%, -50%);
          `}
        >
          <path
            id="checkmark"
            className="check"
            fill="none"
            stroke={STYLE.COLOR.WHITE}
            strokeWidth="6"
            d="M64.5,32.4L32.6,64.3L18.4,50"
          />
        </svg>
      </div>
    )
  }
}

export default Checkmark
