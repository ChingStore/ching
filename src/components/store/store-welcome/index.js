/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import ROUTE from 'constants/route'
import FooterButton from 'components/common/footer-button'
import Icon from 'components/common/icon'

import style from './index.style.js'

export default class HomeScene extends React.Component {
  render() {
    return (
      <div css={style.base}>
        {this.renderTitle()}
        <div css={style.composition}>
          {this.renderBackground()}
          {this.renderTag()}
        </div>
        {this.renderAddFirstItem()}
      </div>
    )
  }

  renderTitle = () => (
    <div css={style.title}>
      <p css={style.title__text}>StoreName</p>
      <p css={style.welcome__msg}>Welcome to your store!</p>
    </div>
  )

  renderBackground = () => (
    <div css={style.background}>
      <Icon.StoreArtBackground />
    </div>
  )

  renderTag = () => (
    <div css={style.tag}>
      <Icon.StoreArtTag />
    </div>
  )

  renderAddFirstItem = () => (
    <div css={style.addFirstItem}>
      <FooterButton to={ROUTE.PATH.ADD}>Add a first item</FooterButton>
    </div>
  )
}
