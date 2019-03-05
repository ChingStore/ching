// @flow

import React from 'react'

import type { BasicIconPropTypes } from './svg'
import Svg from './svg'

const ProfileEdit = (props: BasicIconPropTypes) => (
  <Svg defaultSize={16} {...props}>
    <path d="M13.1 0.3C12.7 -0.1 12.1 -0.1 11.7 0.3L0 12V16H4L15.7 4.3C16.1 3.9 16.1 3.3 15.7 2.9L13.1 0.3Z" />
  </Svg>
)

export default ProfileEdit
