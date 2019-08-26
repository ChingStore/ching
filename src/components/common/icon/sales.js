// @flow

import React from 'react'

import type { BasicIconPropTypes } from './svg'
import Svg from './svg'

const SalesIcon = (props: BasicIconPropTypes) => (
  <Svg defaultSize={24} {...props}>
    <path d="M15 17C15 16.448 15.448 16 16 16H23V1C23 0.448 22.552 0 22 0H2C1.448 0 1 0.448 1 1V23C1 23.552 1.448 24 2 24H15V17ZM5 5H19V7H5V5ZM5 10H19V12H5V10ZM11 17H5V15H11V17Z" />
    <path d="M22.414 18H17V23.414L22.414 18Z" />
  </Svg>
)

export default SalesIcon
