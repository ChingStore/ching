// @flow

import type { BasicIconPropTypes } from 'constants/icon'

import React from 'react'

const PlusIcon = ({ fill }: BasicIconPropTypes) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 13H7V20H13V13H20V7H13V0H7V7H0V13Z" />
  </svg>
)

export default PlusIcon
