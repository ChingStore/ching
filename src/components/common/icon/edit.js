// @flow

import React from 'react'

import type { BasicIconPropTypes } from './svg'
import Svg from './svg'

const Edit = (props: BasicIconPropTypes) => (
  <Svg defaultSize={16} {...props}>
    <path d="M16 14H0V16H16V14Z" />
    <path d="M11.7 3.3C12.1 2.9 12.1 2.3 11.7 1.9L10.1 0.3C9.7 -0.1 9.1 -0.1 8.7 0.3L0 9V12H3L11.7 3.3Z" />
  </Svg>
)

export default Edit
