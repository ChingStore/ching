// @flow

import type { BasicIconPropTypes } from 'constants/icon'

import React from 'react'

const Edit = ({ fill }: BasicIconPropTypes) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16 14H0V16H16V14Z" />
    <path d="M11.7 3.3C12.1 2.9 12.1 2.3 11.7 1.9L10.1 0.3C9.7 -0.1 9.1 -0.1 8.7 0.3L0 9V12H3L11.7 3.3Z" />
  </svg>
)

export default Edit
