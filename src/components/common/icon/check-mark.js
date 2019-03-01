// @flow

import React from 'react'

import STYLE from 'constants/style'

import type { BasicIconPropTypes } from './svg'
import Svg from './svg'

const CheckMark = (props: BasicIconPropTypes) => (
  <Svg defaultSize={64} fill={STYLE.COLOR.WHITE} {...props}>
    <path d="M64 14.4L60.8 8C33.2 16 19.2 33.6 19.2 33.6L6.4 24L0 30.4L19.2 56C34 28.4 64 14.4 64 14.4Z" />
  </Svg>
)

export default CheckMark
