/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import React from 'react'

import STYLE from 'constants/style'

class Cross extends React.Component {
  render() {
    return (
      <div>
        <svg
          viewbox="0 0 100 100"
          css={css`
            position: relative;
            top: 70%;
            left: 83%;
            width: 100%;
            height: 100%;
            transform: translate(-50%, -50%);
            stroke: ${STYLE.COLOR.RED};
            fill: transparent;
            stroke-linecap: round;
            stroke-width: 15;
          `}
        >
          <path className="close-x" d="M 10,10 L 90,90 M 90,10 L 10,90" />
        </svg>
      </div>
    )
  }
}

export default Cross
