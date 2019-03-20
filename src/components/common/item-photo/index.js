// @flow

import type { ItemType } from 'constants/firebase'

/** @jsx jsx */
import { jsx } from '@emotion/core'
import * as React from 'react'
import ReactSizeme from 'react-sizeme'

import Icon from 'components/common/icon'
import Flex from 'components/common/flex'
import SpinnerCircle from 'components/common/spinner-circle'

import style from './index.style'

type PropsType = {
  item: ?ItemType,
  children?: React.Node,
}

class ItemPhoto extends React.PureComponent<PropsType> {
  render = () => {
    const { item, children, ...otherProps } = this.props

    return (
      <Flex
        relative
        css={[
          style.base,
          item &&
            item.photo && {
              background: `url("${item.photo}")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            },
        ]}
        {...otherProps}
      >
        {this.isPhotoAvailable()
          ? this.renderGradientOverlay()
          : this.renderNoPhotoContents()}
        {!this.isLoading() && children}
      </Flex>
    )
  }

  renderGradientOverlay = () => {
    const { children, ...otherProps } = this.props
    return (
      <Flex absoluteFill css={{ overflow: 'hidden' }} {...otherProps}>
        <Flex absoluteFill css={style.gradient} />
      </Flex>
    )
  }

  renderNoPhotoContents = () => {
    return (
      <Flex absoluteFill center>
        <ReactSizeme.SizeMe>
          {({ size }) =>
            this.isLoading() ? (
              <SpinnerCircle size={this.getIconSize(size)} />
            ) : (
              <Icon.NoPhoto size={this.getIconSize(size)} />
            )
          }
        </ReactSizeme.SizeMe>
      </Flex>
    )
  }

  getIconSize = ({ width, height }: { width: number, height: number }) => {
    return Math.max(Math.min(width, height) / 4, 16)
  }

  isLoading = () => !this.props.item

  isPhotoAvailable = () => this.props.item && this.props.item.photo
}

export default ItemPhoto
