// @flow

import React from 'react'

import type { BasicIconPropTypes } from './svg'
import Svg from './svg'

const PlusIcon = (props: BasicIconPropTypes) => (
  <Svg defaultSize={20} {...props}>
    <path d="M0 13H7V20H13V13H20V7H13V0H7V7H0V13Z" />
  </Svg>
)

export default PlusIcon
