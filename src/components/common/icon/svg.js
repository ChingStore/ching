// @flow

/** @jsx jsx */
import { jsx } from '@emotion/core'
import * as React from 'react'

import type { ColorType } from 'constants/style'

export type BasicIconPropTypes = {|
  fill?: ColorType,
  rotate?: number,
  size?: number,
  stroke?: ColorType,
  strokeLinecap?: 'butt' | 'square' | 'round',
  strokeWidth?: string,
|}

type PropsType = {|
  ...BasicIconPropTypes,

  /**
   * The children.
   */
  children: React.Node,

  /**
   * The default height the icon is rendered at.
   * This overrides the defaultSize from being applied on the height.
   */
  defaultHeight?: number,

  /**
   * The default size the icon is rendered at.
   */
  defaultSize: number,

  /**
   * The default width the icon is rendered at.
   * This overrides the defaultSize from being applied on the width.
   */
  defaultWidth?: number,
|}

const Svg = (props: PropsType) => {
  const {
    children,
    defaultHeight,
    defaultSize,
    defaultWidth,
    fill,
    rotate,
    size,
    stroke,
    strokeLinecap,
    strokeWidth,
  }: PropsType = props

  const scale = (size || defaultSize) / defaultSize
  const height = (defaultHeight || defaultSize) * scale
  const width = (defaultWidth || defaultSize) * scale

  const transform = rotate ? [{ rotate: `${rotate}deg` }] : undefined

  return (
    <div css={{ height, width, transform, pointerEvents: 'none' }}>
      <svg
        viewBox={`0 0 ${defaultWidth || defaultSize} ${defaultHeight ||
          defaultSize}`}
      >
        <g
          fill={fill}
          scale={scale}
          stroke={stroke}
          strokeLinecap={strokeLinecap}
          strokeWidth={strokeWidth}
        >
          {children}
        </g>
      </svg>
    </div>
  )
}

export default Svg
